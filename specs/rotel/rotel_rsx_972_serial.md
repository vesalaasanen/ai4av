---
spec_id: admin/rotel-rsx-1057
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RSX-1057 Control Spec"
manufacturer: Rotel
model_family: RSX-1057
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RSX-1057
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
retrieved_at: 2026-07-04T01:13:20.248Z
last_checked_at: 2026-07-07T12:36:15.976Z
generated_at: 2026-07-07T12:36:15.976Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ENTITY/DOMAIN MISMATCH — entity_id is `rotel_rsx_972` and the requested device is \"Rotel RSX 972\", but the supplied source document is the **RSX-1057** RS232 HEX protocol. The two are different models. This spec faithfully reflects the RSX-1057 source; its applicability to the RSX-972 is UNVERIFIED and must be confirmed against RSX-972-specific documentation before use."
  - "command-to-checksum algorithm not stated in source (checksum bytes shown but formula not documented)."
  - "device ID 0xC7 is fixed per source; multi-device addressing / ID assignment not explained."
  - "checksum computation algorithm not stated in source (only literal checksum bytes are given per command)."
  - "command pacing / inter-byte timing not stated in source."
  - "computation algorithm not stated in source; use the literal checksum byte documented for the chosen level where available, otherwise compute per device (unverified).\""
  - "computation algorithm not stated in source.\""
  - "exact bit ordering / MSB-LSB convention per flag byte not explicitly stated."
  - "whether DisplayStatus occupies Flag6 bits 2-3 (\"2 bits in Flag6\") - source says yes but table layout ambiguous."
  - "get/variable semantics for source, surround mode, mute not separable from display string parsing."
  - "no multi-step sequences described explicitly in source."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "ENTITY/DOMAIN MISMATCH — entity_id `rotel_rsx_972` / requested device \"Rotel RSX 972\", but the supplied source is the **RSX-1057** RS232 HEX protocol. RSX-972 compatibility UNVERIFIED; this spec reflects the RSX-1057 source verbatim."
  - "checksum computation algorithm not stated in source (only literal checksum bytes documented per command)."
  - "command/byte timing, response latency, and feedback-string pacing not stated in source."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:36:15.976Z
  matched_actions: 159
  action_count: 159
  confidence: medium
  summary: "All 159 spec actions matched verbatim against source hex command tokens; transport parameters (19200 baud, 8 bits, no parity) confirmed; bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Rotel RSX-1057 Control Spec

## Summary
Rotel RSX-1057 A/V surround receiver controlled via a binary HEX-over-RS-232 protocol. Spec covers power, volume, source selection, surround modes, tone, tuner, OSD, per-zone (Main / Zone 2) and record-source commands, plus a fixed-format display feedback string.

<!-- UNRESOLVED: ENTITY/DOMAIN MISMATCH — entity_id is `rotel_rsx_972` and the requested device is "Rotel RSX 972", but the supplied source document is the **RSX-1057** RS232 HEX protocol. The two are different models. This spec faithfully reflects the RSX-1057 source; its applicability to the RSX-972 is UNVERIFIED and must be confirmed against RSX-972-specific documentation before use. -->
<!-- UNRESOLVED: command-to-checksum algorithm not stated in source (checksum bytes shown but formula not documented). -->
<!-- UNRESOLVED: device ID 0xC7 is fixed per source; multi-device addressing / ID assignment not explained. -->

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
# Transport notes (verbatim facts from source):
# - HEX based communication protocol; Data Type: String.
# - Standard command frame: Start(0xFE) Count(0x03) DeviceID(0xC7) Type(0xXX) Key(0xXX) Checksum(0xXX).
#   Count byte covers only ID, Type, Key (not Start or Checksum).
# - Send raw bytes only - no spaces, delimiters, carriage returns, or line feeds.
# - Spaces shown between hex bytes in the source are for clarity only.
# - Meta encoding (byte stuffing): any occurrence of 0xFD or 0xFE inside a command string must be
#   replaced with "FD 00" (for 0xFD) or "FD 01" (for 0xFE) so 0xFE appears only as the start byte.
# - Feedback/response frame: Start(0xFE) Count(0x17) ID(0xC7) Type(0x20) Char1..Char13 Flag1..Flag8 Checksum(0xXX).
# UNRESOLVED: checksum computation algorithm not stated in source (only literal checksum bytes are given per command).
# UNRESOLVED: command pacing / inter-byte timing not stated in source.
```

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off/toggle commands present
  - levelable    # inferred: volume direct + bass/treble trim commands present
  - routable     # inferred: source-selection and record-source routing commands present
```

## Actions
```yaml
# Standard frame for all Type 10/14/15/16 commands: FE 03 C7 {type} {key} {checksum}
# Volume Direct (Type 30) and Zone 2 Volume Direct (Type 32) are parameterized ranges (00-60).
# All payloads verbatim from source. Spaces are display-only; send raw bytes.

# ===== Table 1 - Type 10 Primary Commands: POWER & VOLUME =====
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "FE 03 C7 10 0A E4"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "FE 03 C7 10 4A 24"
  params: []
- id: power_on
  label: Power On
  kind: action
  command: "FE 03 C7 10 4B 25"
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  command: "FE 03 C7 10 0B E5"
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  command: "FE 03 C7 10 0C E6"
  params: []
- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "FE 03 C7 10 1E F8"
  params: []

# ===== Table 1 - Type 10 Primary Commands: SOURCE SELECTION =====
- id: source_cd
  label: Source CD
  kind: action
  command: "FE 03 C7 10 02 DC"
  params: []
- id: source_tuner
  label: Source Tuner
  kind: action
  command: "FE 03 C7 10 03 DD"
  params: []
- id: source_tape
  label: Source Tape
  kind: action
  command: "FE 03 C7 10 04 DE"
  params: []
- id: source_video_1
  label: Source Video 1
  kind: action
  command: "FE 03 C7 10 05 DF"
  params: []
- id: source_video_2
  label: Source Video 2
  kind: action
  command: "FE 03 C7 10 06 E0"
  params: []
- id: source_video_3
  label: Source Video 3
  kind: action
  command: "FE 03 C7 10 07 E1"
  params: []
- id: source_video_4
  label: Source Video 4
  kind: action
  command: "FE 03 C7 10 08 E2"
  params: []
- id: source_video_5
  label: Source Video 5
  kind: action
  command: "FE 03 C7 10 09 E3"
  params: []
- id: source_multi_input
  label: Source Multi Input
  kind: action
  command: "FE 03 C7 10 15 EF"
  params: []

# ===== Table 1 - Type 10 Primary Commands: SURROUND MODE =====
- id: surround_stereo
  label: Stereo
  kind: action
  command: "FE 03 C7 10 11 EB"
  params: []
- id: surround_dolby3_stereo
  label: Dolby3 Stereo
  kind: action
  command: "FE 03 C7 10 12 EC"
  params: []
- id: surround_dolby_pro_logic
  label: DolbyPro Logic
  kind: action
  command: "FE 03 C7 10 13 ED"
  params: []
- id: surround_dsp_music_mode_toggle
  label: DSP Music Mode Toggle
  kind: action
  command: "FE 03 C7 10 14 EE"
  params: []
- id: surround_dolby3_prologic_toggle
  label: Dolby3 Stereo/Pro Logic Toggle
  kind: action
  command: "FE 03 C7 10 53 2D"
  params: []
- id: surround_dts_neo6_music_cinema_toggle
  label: dts Neo:6 Music/Cinema Toggle
  kind: action
  command: "FE 03 C7 10 54 2E"
  params: []
- id: surround_music_1
  label: Music 1
  kind: action
  command: "FE 03 C7 10 57 31"
  params: []
- id: surround_music_2
  label: Music 2
  kind: action
  command: "FE 03 C7 10 58 32"
  params: []
- id: surround_music_3
  label: Music 3
  kind: action
  command: "FE 03 C7 10 59 33"
  params: []
- id: surround_music_4
  label: Music 4
  kind: action
  command: "FE 03 C7 10 5A 34"
  params: []
- id: surround_5ch_stereo
  label: 5 Channel Stereo
  kind: action
  command: "FE 03 C7 10 5B 35"
  params: []
- id: surround_7ch_stereo
  label: 7 Channel Stereo
  kind: action
  command: "FE 03 C7 10 5C 36"
  params: []
- id: surround_dolbyplii_cinema
  label: DolbyPLII Cinema
  kind: action
  command: "FE 03 C7 10 5D 37"
  params: []
- id: surround_dolbyplii_music
  label: DolbyPLII Music
  kind: action
  command: "FE 03 C7 10 5E 38"
  params: []
- id: surround_dolbyplii_game
  label: DolbyPLII Game
  kind: action
  command: "FE 03 C7 10 74 4E"
  params: []
- id: surround_dolby_pro_logic_alt
  label: DolbyPro Logic (alt)
  kind: action
  command: "FE 03 C7 10 5F 39"
  params: []
- id: surround_dts_neo6_music
  label: dts Neo:6 Music
  kind: action
  command: "FE 03 C7 10 60 3A"
  params: []
- id: surround_dts_neo6_cinema
  label: dts Neo:6 Cinema
  kind: action
  command: "FE 03 C7 10 61 3B"
  params: []
- id: plii_panorama_toggle
  label: PLII Panorama Toggle
  kind: action
  command: "FE 03 C7 10 62 3C"
  params: []
- id: plii_dimension_up
  label: PLII Dimension Up
  kind: action
  command: "FE 03 C7 10 63 3D"
  params: []
- id: plii_dimension_down
  label: PLII Dimension Down
  kind: action
  command: "FE 03 C7 10 64 3E"
  params: []
- id: plii_center_width_up
  label: PLII Center Width Up
  kind: action
  command: "FE 03 C7 10 65 3F"
  params: []
- id: plii_center_width_down
  label: PLII Center Width Down
  kind: action
  command: "FE 03 C7 10 66 40"
  params: []
- id: dolby_digital_ex_toggle
  label: DolbyDigital EX Toggle
  kind: action
  command: "FE 03 C7 10 68 42"
  params: []
- id: next_surround_mode
  label: Next Surround Mode
  kind: action
  command: "FE 03 C7 10 22 FC"
  params: []

# ===== Table 1 - Type 10 Primary Commands: TONE CONTROL =====
- id: treble_up
  label: Treble Up
  kind: action
  command: "FE 03 C7 10 0D E7"
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  command: "FE 03 C7 10 0E E8"
  params: []
- id: bass_up
  label: Bass Up
  kind: action
  command: "FE 03 C7 10 0F E9"
  params: []
- id: bass_down
  label: Bass Down
  kind: action
  command: "FE 03 C7 10 10 EA"
  params: []
- id: tone_control_select
  label: Tone Control Select
  kind: action
  command: "FE 03 C7 10 67 41"
  params: []

# ===== Table 1 - Type 10 Primary Commands: OSD MENU =====
- id: osd_menu
  label: OSD Menu
  kind: action
  command: "FE 03 C7 10 18 F2"
  params: []
- id: osd_enter
  label: Enter
  kind: action
  command: "FE 03 C7 10 19 F3"
  params: []
- id: cursor_right
  label: Cursor Right
  kind: action
  command: "FE 03 C7 10 1A F4"
  params: []
- id: cursor_left
  label: Cursor Left
  kind: action
  command: "FE 03 C7 10 1B F5"
  params: []
- id: cursor_up
  label: Cursor Up
  kind: action
  command: "FE 03 C7 10 1C F6"
  params: []
- id: cursor_down
  label: Cursor Down
  kind: action
  command: "FE 03 C7 10 1D F7"
  params: []

# ===== Table 1 - Type 10 Primary Commands: TUNER =====
- id: tune_up
  label: Tune Up
  kind: action
  command: "FE 03 C7 10 28 02"
  params: []
- id: tune_down
  label: Tune Down
  kind: action
  command: "FE 03 C7 10 29 03"
  params: []
- id: preset_up
  label: Preset Up
  kind: action
  command: "FE 03 C7 10 6F 49"
  params: []
- id: preset_down
  label: Preset Down
  kind: action
  command: "FE 03 C7 10 70 4A"
  params: []
- id: frequency_up
  label: Frequency Up
  kind: action
  command: "FE 03 C7 10 72 4C"
  params: []
- id: frequency_down
  label: Frequency Down
  kind: action
  command: "FE 03 C7 10 73 4D"
  params: []
- id: tuner_memory
  label: Memory
  kind: action
  command: "FE 03 C7 10 27 01"
  params: []
- id: band_toggle
  label: Band Toggle
  kind: action
  command: "FE 03 C7 10 24 FD 01"
  params: []
- id: tuner_am
  label: AM
  kind: action
  command: "FE 03 C7 10 56 30"
  params: []
- id: tuner_fm
  label: FM
  kind: action
  command: "FE 03 C7 10 55 2F"
  params: []
- id: tune_preset_toggle
  label: Tune/Preset
  kind: action
  command: "FE 03 C7 10 20 FA"
  params: []
- id: tuning_mode_select
  label: Tuning Mode Select
  kind: action
  command: "FE 03 C7 10 69 43"
  params: []
- id: preset_mode_select
  label: Preset Mode Select
  kind: action
  command: "FE 03 C7 10 6A 44"
  params: []
- id: frequency_direct
  label: Frequency Direct
  kind: action
  command: "FE 03 C7 10 25 FF"
  params: []
- id: preset_scan
  label: Preset Scan
  kind: action
  command: "FE 03 C7 10 21 FB"
  params: []
- id: tuner_display
  label: Tuner Display
  kind: action
  command: "FE 03 C7 10 44 1E"
  params: []
- id: rds_pty
  label: RDS PTY
  kind: action
  command: "FE 03 C7 10 45 1F"
  params: []
- id: rds_tp
  label: RDS TP
  kind: action
  command: "FE 03 C7 10 46 20"
  params: []
- id: rds_ta
  label: RDS TA
  kind: action
  command: "FE 03 C7 10 47 21"
  params: []
- id: fm_mono
  label: FM Mono
  kind: action
  command: "FE 03 C7 10 26 00"
  params: []

# ===== Table 1 - Type 10 Primary Commands: NUMERIC KEY =====
- id: number_1
  label: Number 1
  kind: action
  command: "FE 03 C7 10 2A 04"
  params: []
- id: number_2
  label: Number 2
  kind: action
  command: "FE 03 C7 10 2B 05"
  params: []
- id: number_3
  label: Number 3
  kind: action
  command: "FE 03 C7 10 2C 06"
  params: []
- id: number_4
  label: Number 4
  kind: action
  command: "FE 03 C7 10 2D 07"
  params: []
- id: number_5
  label: Number 5
  kind: action
  command: "FE 03 C7 10 2E 08"
  params: []
- id: number_6
  label: Number 6
  kind: action
  command: "FE 03 C7 10 2F 09"
  params: []
- id: number_7
  label: Number 7
  kind: action
  command: "FE 03 C7 10 30 0A"
  params: []
- id: number_8
  label: Number 8
  kind: action
  command: "FE 03 C7 10 31 0B"
  params: []
- id: number_9
  label: Number 9
  kind: action
  command: "FE 03 C7 10 32 0C"
  params: []
- id: number_0
  label: Number 0
  kind: action
  command: "FE 03 C7 10 33 0D"
  params: []

# ===== Table 1 - Type 10 Primary Commands: OTHER =====
- id: record_function_select
  label: Record Function Select
  kind: action
  command: "FE 03 C7 10 17 F1"
  params: []
- id: dynamic_range
  label: Dynamic Range
  kind: action
  command: "FE 03 C7 10 16 F0"
  params: []
- id: digital_input_select
  label: Digital Input Select
  kind: action
  command: "FE 03 C7 10 1F F9"
  params: []
- id: zone2_main_toggle
  label: Zone 2/Main
  kind: action
  command: "FE 03 C7 10 23 FD 00"
  params: []
- id: temporary_center_trim
  label: Temporary Center Trim
  kind: action
  command: "FE 03 C7 10 4C 26"
  params: []
- id: temporary_subwoofer_trim
  label: Temporary Subwoofer Trim
  kind: action
  command: "FE 03 C7 10 4D 27"
  params: []
- id: temporary_surround_trim
  label: Temporary Surround Trim
  kind: action
  command: "FE 03 C7 10 4E 28"
  params: []
- id: cinema_eq_toggle
  label: Cinema EQ Toggle
  kind: action
  command: "FE 03 C7 10 4F 29"
  params: []
- id: front_display_on_off
  label: Front Display On/Off
  kind: action
  command: "FE 03 C7 10 52 2C"
  params: []
- id: display_refresh
  label: Display Refresh
  kind: action
  command: "FE 03 C7 10 FF D9"
  params: []

# ===== Table 2 - Type 14 Main Zone Commands =====
- id: main_zone_power_toggle
  label: Main Zone Power Toggle
  kind: action
  command: "FE 03 C7 14 0A E8"
  params: []
- id: main_zone_power_off
  label: Main Zone Power Off
  kind: action
  command: "FE 03 C7 14 4A 28"
  params: []
- id: main_zone_power_on
  label: Main Zone Power On
  kind: action
  command: "FE 03 C7 14 4B 29"
  params: []
- id: main_zone_volume_up
  label: Main Zone Volume Up
  kind: action
  command: "FE 03 C7 14 00 DE"
  params: []
- id: main_zone_volume_down
  label: Main Zone Volume Down
  kind: action
  command: "FE 03 C7 14 01 DF"
  params: []
- id: main_zone_mute_toggle
  label: Main Zone Mute Toggle
  kind: action
  command: "FE 03 C7 14 1E FC"
  params: []
- id: main_zone_mute_on
  label: Main Zone Mute On
  kind: action
  command: "FE 03 C7 14 6C 4A"
  params: []
- id: main_zone_mute_off
  label: Main Zone Mute Off
  kind: action
  command: "FE 03 C7 14 6D 4B"
  params: []
- id: main_zone_source_cd
  label: Main Zone Source CD
  kind: action
  command: "FE 03 C7 14 02 E0"
  params: []
- id: main_zone_source_tuner
  label: Main Zone Source Tuner
  kind: action
  command: "FE 03 C7 14 03 E1"
  params: []
- id: main_zone_source_tape
  label: Main Zone Source Tape
  kind: action
  command: "FE 03 C7 14 04 E2"
  params: []
- id: main_zone_source_video_1
  label: Main Zone Source Video 1
  kind: action
  command: "FE 03 C7 14 05 E3"
  params: []
- id: main_zone_source_video_2
  label: Main Zone Source Video 2
  kind: action
  command: "FE 03 C7 14 06 E4"
  params: []
- id: main_zone_source_video_3
  label: Main Zone Source Video 3
  kind: action
  command: "FE 03 C7 14 07 E5"
  params: []
- id: main_zone_source_video_4
  label: Main Zone Source Video 4
  kind: action
  command: "FE 03 C7 14 08 E6"
  params: []
- id: main_zone_source_video_5
  label: Main Zone Source Video 5
  kind: action
  command: "FE 03 C7 14 09 E7"
  params: []

# ===== Table 3 - Type 15 Record Source Commands =====
- id: record_source_cd
  label: Record Source CD
  kind: action
  command: "FE 03 C7 15 02 E1"
  params: []
- id: record_source_tuner
  label: Record Source Tuner
  kind: action
  command: "FE 03 C7 15 03 E2"
  params: []
- id: record_source_tape
  label: Record Source Tape
  kind: action
  command: "FE 03 C7 15 04 E3"
  params: []
- id: record_source_video_1
  label: Record Source Video 1
  kind: action
  command: "FE 03 C7 15 05 E4"
  params: []
- id: record_source_video_2
  label: Record Source Video 2
  kind: action
  command: "FE 03 C7 15 06 E5"
  params: []
- id: record_source_video_3
  label: Record Source Video 3
  kind: action
  command: "FE 03 C7 15 07 E6"
  params: []
- id: record_source_video_4
  label: Record Source Video 4
  kind: action
  command: "FE 03 C7 15 08 E7"
  params: []
- id: record_source_video_5
  label: Record Source Video 5
  kind: action
  command: "FE 03 C7 15 09 E8"
  params: []
- id: record_follow_main_zone
  label: Record Follow Main Zone Source
  kind: action
  command: "FE 03 C7 15 6B 4A"
  params: []

# ===== Table 4 - Type 16 Zone 2 Commands: POWER & VOLUME =====
- id: zone2_power_toggle
  label: Zone 2 Power Toggle
  kind: action
  command: "FE 03 C7 16 0A EA"
  params: []
- id: zone2_power_off
  label: Zone 2 Power Off
  kind: action
  command: "FE 03 C7 16 4A 2A"
  params: []
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "FE 03 C7 16 4B 2B"
  params: []
- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: "FE 03 C7 16 00 E0"
  params: []
- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: "FE 03 C7 16 01 E1"
  params: []
- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  command: "FE 03 C7 16 1E FD 01"
  params: []
- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "FE 03 C7 16 6C 4C"
  params: []
- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "FE 03 C7 16 6D 4D"
  params: []

# ===== Table 4 - Type 16 Zone 2 Commands: SOURCE SELECTION =====
- id: zone2_source_cd
  label: Zone 2 Source CD
  kind: action
  command: "FE 03 C7 16 02 E2"
  params: []
- id: zone2_source_tuner
  label: Zone 2 Source Tuner
  kind: action
  command: "FE 03 C7 16 03 E3"
  params: []
- id: zone2_source_tape
  label: Zone 2 Source Tape
  kind: action
  command: "FE 03 C7 16 04 E4"
  params: []
- id: zone2_source_video_1
  label: Zone 2 Source Video 1
  kind: action
  command: "FE 03 C7 16 05 E5"
  params: []
- id: zone2_source_video_2
  label: Zone 2 Source Video 2
  kind: action
  command: "FE 03 C7 16 06 E6"
  params: []
- id: zone2_source_video_3
  label: Zone 2 Source Video 3
  kind: action
  command: "FE 03 C7 16 07 E7"
  params: []
- id: zone2_source_video_4
  label: Zone 2 Source Video 4
  kind: action
  command: "FE 03 C7 16 08 E8"
  params: []
- id: zone2_source_video_5
  label: Zone 2 Source Video 5
  kind: action
  command: "FE 03 C7 16 09 E9"
  params: []
- id: zone2_follow_main_zone
  label: Zone 2 Follow Main Zone Source
  kind: action
  command: "FE 03 C7 16 6B 4B"
  params: []

# ===== Table 4 - Type 16 Zone 2 Commands: TUNER =====
- id: zone2_tune_up
  label: Zone 2 Tune Up
  kind: action
  command: "FE 03 C7 16 28 08"
  params: []
- id: zone2_tune_down
  label: Zone 2 Tune Down
  kind: action
  command: "FE 03 C7 16 29 09"
  params: []
- id: zone2_preset_up
  label: Zone 2 Preset Up
  kind: action
  command: "FE 03 C7 16 6F 4F"
  params: []
- id: zone2_preset_down
  label: Zone 2 Preset Down
  kind: action
  command: "FE 03 C7 16 70 50"
  params: []
- id: zone2_frequency_up
  label: Zone 2 Frequency Up
  kind: action
  command: "FE 03 C7 16 72 52"
  params: []
- id: zone2_frequency_down
  label: Zone 2 Frequency Down
  kind: action
  command: "FE 03 C7 16 73 53"
  params: []
- id: zone2_band_toggle
  label: Zone 2 Band Toggle
  kind: action
  command: "FE 03 C7 16 24 04"
  params: []
- id: zone2_am
  label: Zone 2 AM
  kind: action
  command: "FE 03 C7 16 56 36"
  params: []
- id: zone2_fm
  label: Zone 2 FM
  kind: action
  command: "FE 03 C7 16 55 35"
  params: []
- id: zone2_tune_preset_toggle
  label: Zone 2 Tune/Preset
  kind: action
  command: "FE 03 C7 16 20 00"
  params: []
- id: zone2_tuning_mode_select
  label: Zone 2 Tuning Mode Select
  kind: action
  command: "FE 03 C7 16 69 49"
  params: []
- id: zone2_preset_mode_select
  label: Zone 2 Preset Mode Select
  kind: action
  command: "FE 03 C7 16 6A 4A"
  params: []
- id: zone2_preset_scan
  label: Zone 2 Preset Scan
  kind: action
  command: "FE 03 C7 16 21 01"
  params: []
- id: zone2_fm_mono
  label: Zone 2 FM Mono
  kind: action
  command: "FE 03 C7 16 26 06"
  params: []

# ===== Table 4 - Type 16 Zone 2 Commands: NUMERIC KEY =====
- id: zone2_number_1
  label: Zone 2 Number 1
  kind: action
  command: "FE 03 C7 16 2A 0A"
  params: []
- id: zone2_number_2
  label: Zone 2 Number 2
  kind: action
  command: "FE 03 C7 16 2B 0B"
  params: []
- id: zone2_number_3
  label: Zone 2 Number 3
  kind: action
  command: "FE 03 C7 16 2C 0C"
  params: []
- id: zone2_number_4
  label: Zone 2 Number 4
  kind: action
  command: "FE 03 C7 16 2D 0D"
  params: []
- id: zone2_number_5
  label: Zone 2 Number 5
  kind: action
  command: "FE 03 C7 16 2E 0E"
  params: []
- id: zone2_number_6
  label: Zone 2 Number 6
  kind: action
  command: "FE 03 C7 16 2F 0F"
  params: []
- id: zone2_number_7
  label: Zone 2 Number 7
  kind: action
  command: "FE 03 C7 16 30 10"
  params: []
- id: zone2_number_8
  label: Zone 2 Number 8
  kind: action
  command: "FE 03 C7 16 31 11"
  params: []
- id: zone2_number_9
  label: Zone 2 Number 9
  kind: action
  command: "FE 03 C7 16 32 12"
  params: []
- id: zone2_number_0
  label: Zone 2 Number 0
  kind: action
  command: "FE 03 C7 16 33 13"
  params: []

# ===== Table 5 - Type 30 Volume Direct (Main Zone) =====
# Source: "Volume direct commands range from hex 00 - 60"; table is a SAMPLE.
# Parameterized per policy: one action covering the 0x00-0x60 level range.
- id: volume_direct_set
  label: Volume Direct Set
  kind: action
  command: "FE 03 C7 30 {level} {checksum}"
  params:
    - name: level
      type: integer
      description: "Volume level, hex 0x00 (Min) through 0x60 (Max). Source sample: 0x00=Min, 0x10=16, 0x20=32, 0x30=48, 0x40=64, 0x50=80, 0x5F=95, 0x60=Max."
    - name: checksum
      type: string
      description: "Frame checksum byte. UNRESOLVED: computation algorithm not stated in source; use the literal checksum byte documented for the chosen level where available, otherwise compute per device (unverified)."

# ===== Table 6 - Type 32 Zone 2 Volume Direct =====
# Source: Zone 2 volume direct, hex 0x00-0x60; sample shown (Zone 2 Max at 0x60, note "Zone 2 Volume 89" at 0x5F).
- id: zone2_volume_direct_set
  label: Zone 2 Volume Direct Set
  kind: action
  command: "FE 03 C7 32 {level} {checksum}"
  params:
    - name: level
      type: integer
      description: "Zone 2 volume level, hex 0x00 (Min) through 0x60 (Max). Source sample: 0x00=Min, 0x10=16, 0x20=32, 0x30=48, 0x40=64, 0x50=80, 0x5F=89, 0x60=Max."
    - name: checksum
      type: string
      description: "Frame checksum byte. UNRESOLVED: computation algorithm not stated in source."
```

## Feedbacks
```yaml
# Source documents a single fixed-format "feedback string" that mirrors the unit's front-panel
# display and is emitted unsolicited whenever the front-panel status changes. There are no
# explicit query/response commands in the source; the device pushes this frame on change.
- id: display_feedback_string
  type: binary
  description: >-
    Fixed-format display mirror frame: Start(0xFE) Count(0x17) ID(0xC7) Type(0x20)
    Char1..Char13 Flag1..Flag8 Checksum(0xXX). 23 data/flag bytes + checksum.
  fields:
    start: "0xFE"
    count: "0x17"
    device_id: "0xC7"
    type: "0x20"
    char_1_to_13: "ASCII text shown on front display (source input / volume / surround mode); parse to extract state"
    flag_1: "bits: char1_dot, char2_dot, char3_dot, char4_dot, char5_dot, char6_dot, char7_dot"
    flag_2: "bits: char8_dot, char9_dot, char10_dot, char11_dot, char12_dot, char13_dot, char8_colon"
    flag_3: "bits: TAPEM, MULTI, 4, 3, 2, 1, Coaxial, Optical"
    flag_4: "bits: Tuned, St(Tuner), PTY, TA, TP, RT, RDS, RBDS"
    flag_5: "bits: Zone, Dynamic Range, DSP, HDCD, Dolby3 Stereo, DolbyPLII, DolbyPro Logic, Dolby"
    flag_6: "bits: DisplayMode1, DisplayMode0, (reserved), StandbyLED, OSD, Auto, Memory, Preset; plus DisplayStatus (DisplayOn/DisplayOff)"
    flag_7: "bits: SBR, SBL, EX, Sur(dts?), THX, dts ES, dts, MPEG"
    flag_8: "bits: CB, S, LFE, SR, SL, FR, C, FL"
    checksum: "0xXX"
# UNRESOLVED: exact bit ordering / MSB-LSB convention per flag byte not explicitly stated.
# UNRESOLVED: whether DisplayStatus occupies Flag6 bits 2-3 ("2 bits in Flag6") - source says yes but table layout ambiguous.
```

## Variables
```yaml
# Discrete state reflected by the feedback string (no explicit set/query variable commands
# beyond the volume-direct actions and toggles above).
- id: main_zone_volume
  type: integer
  min: 0   # hex 0x00
  max: 96  # hex 0x60
  unit: level
  access: set  # via volume_direct_set
- id: zone2_volume
  type: integer
  min: 0
  max: 96
  unit: level
  access: set  # via zone2_volume_direct_set
# UNRESOLVED: get/variable semantics for source, surround mode, mute not separable from display string parsing.
```

## Events
```yaml
# Unsolicited push: display_feedback_string (see Feedbacks). Emitted on any front-panel
# status change. No other unsolicited event types documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Hex protocol over RS-232. Send raw bytes only — no spaces, delimiters, CR, or LF. Spaces in the source tables are for readability.
- Byte stuffing ("Meta Encoding"): inside a command string, replace any 0xFD with `FD 00` and any 0xFE with `FD 01` so 0xFE only ever appears as the start byte. Examples in source that already apply this: `Band Toggle` (FE 03 C7 10 24 FD 01), `Zone 2/Main` (FE 03 C7 10 23 FD 00), `Zone 2 Mute Toggle` (FE 03 C7 16 1E FD 01), and Volume-Direct levels 0x03/0x04 (e.g. FE 03 C7 30 03 FD 00).
- Type 14 (Main Zone) and Type 16 (Zone 2) commands are zone-discrete equivalents of the Type 10 primary commands. Source recommends using the zone-specific commands in multi-zone installations to avoid zone conflicts.
- Volume Direct (Type 30) and Zone 2 Volume Direct (Type 32) tables in the source are explicitly samples of a 0x00–0x60 range; represented here as parameterized actions, not enumerated levels.
- Device ID 0xC7 is fixed in every documented command; no multi-drop addressing procedure is described.

<!-- UNRESOLVED: ENTITY/DOMAIN MISMATCH — entity_id `rotel_rsx_972` / requested device "Rotel RSX 972", but the supplied source is the **RSX-1057** RS232 HEX protocol. RSX-972 compatibility UNVERIFIED; this spec reflects the RSX-1057 source verbatim. -->
<!-- UNRESOLVED: checksum computation algorithm not stated in source (only literal checksum bytes documented per command). -->
<!-- UNRESOLVED: command/byte timing, response latency, and feedback-string pacing not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
retrieved_at: 2026-07-04T01:13:20.248Z
last_checked_at: 2026-07-07T12:36:15.976Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:36:15.976Z
matched_actions: 159
action_count: 159
confidence: medium
summary: "All 159 spec actions matched verbatim against source hex command tokens; transport parameters (19200 baud, 8 bits, no parity) confirmed; bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ENTITY/DOMAIN MISMATCH — entity_id is `rotel_rsx_972` and the requested device is \"Rotel RSX 972\", but the supplied source document is the **RSX-1057** RS232 HEX protocol. The two are different models. This spec faithfully reflects the RSX-1057 source; its applicability to the RSX-972 is UNVERIFIED and must be confirmed against RSX-972-specific documentation before use."
- "command-to-checksum algorithm not stated in source (checksum bytes shown but formula not documented)."
- "device ID 0xC7 is fixed per source; multi-device addressing / ID assignment not explained."
- "checksum computation algorithm not stated in source (only literal checksum bytes are given per command)."
- "command pacing / inter-byte timing not stated in source."
- "computation algorithm not stated in source; use the literal checksum byte documented for the chosen level where available, otherwise compute per device (unverified).\""
- "computation algorithm not stated in source.\""
- "exact bit ordering / MSB-LSB convention per flag byte not explicitly stated."
- "whether DisplayStatus occupies Flag6 bits 2-3 (\"2 bits in Flag6\") - source says yes but table layout ambiguous."
- "get/variable semantics for source, surround mode, mute not separable from display string parsing."
- "no multi-step sequences described explicitly in source."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "ENTITY/DOMAIN MISMATCH — entity_id `rotel_rsx_972` / requested device \"Rotel RSX 972\", but the supplied source is the **RSX-1057** RS232 HEX protocol. RSX-972 compatibility UNVERIFIED; this spec reflects the RSX-1057 source verbatim."
- "checksum computation algorithm not stated in source (only literal checksum bytes documented per command)."
- "command/byte timing, response latency, and feedback-string pacing not stated in source."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
