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
  - "https://www.rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:00.561Z
last_checked_at: 2026-06-02T22:13:37.925Z
generated_at: 2026-06-02T22:13:37.925Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is specifically the RSX-1057 (member of Rotel's \"RSX-1 Series\" family). Apply to other RSX-1 family members only after verifying the same device ID `0xC7` and same Type/Key opcodes against each variant's own protocol document."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "checksum algorithm not stated in source -->` and a controller must either (a) capture and replay a real device's response to a known command to learn the algorithm, or (b) try both sum and XOR candidates. **Do not** publish controllers that hard-code a guessed algorithm."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:13:37.925Z
  matched_actions: 159
  action_count: 159
  confidence: medium
  summary: "All 159 spec actions traced to source (dip-safe re-verify). (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Rotel RSX-1057 Control Spec

## Summary
RS-232 HEX control protocol for the Rotel RSX-1057 surround-sound receiver. The device is addressed on a serial bus at fixed Device ID `0xC7`; all commands share a 6-byte frame `FE 03 C7 <Type> <Key> <Checksum>` and the source documents six command tables covering primary, main-zone, record-source, zone-2, volume-direct (main), and volume-direct (zone 2) operations.

<!-- UNRESOLVED: source is specifically the RSX-1057 (member of Rotel's "RSX-1 Series" family). Apply to other RSX-1 family members only after verifying the same device ID `0xC7` and same Type/Key opcodes against each variant's own protocol document. -->

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
- powerable  # inferred from power on/off/toggle command examples
- routable  # inferred from input source selection command examples
- levelable  # inferred from volume up/down and volume direct commands
```

## Actions
```yaml
# Connection: 19200 baud, 8N1, no handshaking.
# Frame: [0xFE] [0x03] [0xC7] [Type] [Key] [Checksum]
#   - Start byte: 0xFE
#   - Count byte (0x03): includes ID, Type, and Key bytes only; NOT Start or Checksum
#   - Device ID: 0xC7
#   - Type: identifies the command group (see tables below)
#   - Key: command opcode within the group
#   - Checksum: see "Notes" for algorithm
# Meta encoding: any 0xFD or 0xFE byte in the Key or Checksum field must be escaped
#   (0xFD -> 0xFD 0x00, 0xFE -> 0xFD 0x01) so the start byte 0xFE never appears mid-frame.
# No CR/LF after command bytes.

# ---------- Table 1 - Type 0x10 - Primary Commands ----------
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

- id: surround_stereo
  label: Surround Mode - Stereo
  kind: action
  command: "FE 03 C7 10 11 EB"
  params: []

- id: surround_dolby3_stereo
  label: Surround Mode - Dolby 3 Stereo
  kind: action
  command: "FE 03 C7 10 12 EC"
  params: []

- id: surround_dolby_pro_logic
  label: Surround Mode - Dolby Pro Logic
  kind: action
  command: "FE 03 C7 10 13 ED"
  params: []

- id: surround_dsp_music_toggle
  label: Surround Mode - DSP Music Mode Toggle
  kind: action
  command: "FE 03 C7 10 14 EE"
  params: []

- id: surround_dolby3_pl_toggle
  label: Surround Mode - Dolby 3 Stereo / Pro Logic Toggle
  kind: action
  command: "FE 03 C7 10 53 2D"
  params: []

- id: surround_dts_neo6_music_cinema_toggle
  label: Surround Mode - dts Neo:6 Music/Cinema Toggle
  kind: action
  command: "FE 03 C7 10 54 2E"
  params: []

- id: surround_music_1
  label: Surround Mode - Music 1
  kind: action
  command: "FE 03 C7 10 57 31"
  params: []

- id: surround_music_2
  label: Surround Mode - Music 2
  kind: action
  command: "FE 03 C7 10 58 32"
  params: []

- id: surround_music_3
  label: Surround Mode - Music 3
  kind: action
  command: "FE 03 C7 10 59 33"
  params: []

- id: surround_music_4
  label: Surround Mode - Music 4
  kind: action
  command: "FE 03 C7 10 5A 34"
  params: []

- id: surround_5ch_stereo
  label: Surround Mode - 5 Channel Stereo
  kind: action
  command: "FE 03 C7 10 5B 35"
  params: []

- id: surround_7ch_stereo
  label: Surround Mode - 7 Channel Stereo
  kind: action
  command: "FE 03 C7 10 5C 36"
  params: []

- id: surround_dolby_plii_cinema
  label: Surround Mode - Dolby PLII Cinema
  kind: action
  command: "FE 03 C7 10 5D 37"
  params: []

- id: surround_dolby_plii_music
  label: Surround Mode - Dolby PLII Music
  kind: action
  command: "FE 03 C7 10 5E 38"
  params: []

- id: surround_dolby_plii_game
  label: Surround Mode - Dolby PLII Game
  kind: action
  command: "FE 03 C7 10 74 4E"
  params: []

- id: surround_dolby_pro_logic_5f
  label: Surround Mode - Dolby Pro Logic
  kind: action
  command: "FE 03 C7 10 5F 39"
  params: []

- id: surround_dts_neo6_music
  label: Surround Mode - dts Neo:6 Music
  kind: action
  command: "FE 03 C7 10 60 3A"
  params: []

- id: surround_dts_neo6_cinema
  label: Surround Mode - dts Neo:6 Cinema
  kind: action
  command: "FE 03 C7 10 61 3B"
  params: []

- id: surround_plii_panorama_toggle
  label: Surround Mode - PLII Panorama Toggle
  kind: action
  command: "FE 03 C7 10 62 3C"
  params: []

- id: surround_plii_dimension_up
  label: Surround Mode - PLII Dimension Up
  kind: action
  command: "FE 03 C7 10 63 3D"
  params: []

- id: surround_plii_dimension_down
  label: Surround Mode - PLII Dimension Down
  kind: action
  command: "FE 03 C7 10 64 3E"
  params: []

- id: surround_plii_center_width_up
  label: Surround Mode - PLII Center Width Up
  kind: action
  command: "FE 03 C7 10 65 3F"
  params: []

- id: surround_plii_center_width_down
  label: Surround Mode - PLII Center Width Down
  kind: action
  command: "FE 03 C7 10 66 40"
  params: []

- id: surround_dolby_digital_ex_toggle
  label: Surround Mode - Dolby Digital EX Toggle
  kind: action
  command: "FE 03 C7 10 68 42"
  params: []

- id: surround_next_mode
  label: Surround Mode - Next Mode
  kind: action
  command: "FE 03 C7 10 22 FC"
  params: []

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

- id: osd_menu
  label: OSD Menu
  kind: action
  command: "FE 03 C7 10 18 F2"
  params: []

- id: osd_enter
  label: OSD Enter
  kind: action
  command: "FE 03 C7 10 19 F3"
  params: []

- id: osd_cursor_right
  label: OSD Cursor Right
  kind: action
  command: "FE 03 C7 10 1A F4"
  params: []

- id: osd_cursor_left
  label: OSD Cursor Left
  kind: action
  command: "FE 03 C7 10 1B F5"
  params: []

- id: osd_cursor_up
  label: OSD Cursor Up
  kind: action
  command: "FE 03 C7 10 1C F6"
  params: []

- id: osd_cursor_down
  label: OSD Cursor Down
  kind: action
  command: "FE 03 C7 10 1D F7"
  params: []

- id: tune_up
  label: Tuner Tune Up
  kind: action
  command: "FE 03 C7 10 28 02"
  params: []

- id: tune_down
  label: Tuner Tune Down
  kind: action
  command: "FE 03 C7 10 29 03"
  params: []

- id: preset_up
  label: Tuner Preset Up
  kind: action
  command: "FE 03 C7 10 6F 49"
  params: []

- id: preset_down
  label: Tuner Preset Down
  kind: action
  command: "FE 03 C7 10 70 4A"
  params: []

- id: frequency_up
  label: Tuner Frequency Up
  kind: action
  command: "FE 03 C7 10 72 4C"
  params: []

- id: frequency_down
  label: Tuner Frequency Down
  kind: action
  command: "FE 03 C7 10 73 4D"
  params: []

- id: tuner_memory
  label: Tuner Memory
  kind: action
  command: "FE 03 C7 10 27 01"
  params: []

- id: band_toggle
  label: Tuner Band Toggle
  kind: action
  command: "FE 03 C7 10 24 FD 01"
  params: []

- id: am
  label: Tuner AM
  kind: action
  command: "FE 03 C7 10 56 30"
  params: []

- id: fm
  label: Tuner FM
  kind: action
  command: "FE 03 C7 10 55 2F"
  params: []

- id: tune_preset
  label: Tuner Tune/Preset
  kind: action
  command: "FE 03 C7 10 20 FA"
  params: []

- id: tuning_mode_select
  label: Tuner Tuning Mode Select
  kind: action
  command: "FE 03 C7 10 69 43"
  params: []

- id: preset_mode_select
  label: Tuner Preset Mode Select
  kind: action
  command: "FE 03 C7 10 6A 44"
  params: []

- id: frequency_direct
  label: Tuner Frequency Direct
  kind: action
  command: "FE 03 C7 10 25 FF"
  params: []

- id: preset_scan
  label: Tuner Preset Scan
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
  label: Tuner FM Mono
  kind: action
  command: "FE 03 C7 10 26 00"
  params: []

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

- id: zone2_main
  label: Zone 2 / Main
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

# ---------- Table 2 - Type 0x14 - Main Zone Commands ----------
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

# ---------- Table 3 - Type 0x15 - Record Source Commands ----------
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

# ---------- Table 4 - Type 0x16 - Zone 2 Commands ----------
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

- id: zone2_tune_preset
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

# ---------- Table 5 - Type 0x30 - Volume Direct Commands (Main Zone) ----------
# Source documents Key range 0x00 - 0x60 (Volume Min ... Volume Max).
# Listed sample values: 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,32,48,64,80,95,96(=0x60).
# Parameterized: substitute Key byte with desired level; recompute checksum per meta-encoding rules.
- id: main_zone_volume_set
  label: Main Zone Volume Set
  kind: action
  command: "FE 03 C7 30 {level} {checksum}"
  params:
    - name: level
      type: integer
      description: Volume level 0-96 (0x00-0x60). 0 = min, 0x60 = max.
    - name: checksum
      type: hex_byte
      description: Checksum byte computed over ID+Type+Key. Algorithm: see Notes. Meta-encode if value is 0xFD or 0xFE.

# ---------- Table 6 - Type 0x32 - Zone 2 Volume Direct Commands ----------
# Source documents Key range 0x00 - 0x60. Listed sample: 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,32,48,64,80,89,96.
# Parameterized: substitute Key byte with desired level; recompute checksum per meta-encoding rules.
- id: zone2_volume_set
  label: Zone 2 Volume Set
  kind: action
  command: "FE 03 C7 32 {level} {checksum}"
  params:
    - name: level
      type: integer
      description: Volume level 0-96 (0x00-0x60). 0 = min, 0x60 = max.
    - name: checksum
      type: hex_byte
      description: Checksum byte computed over ID+Type+Key. Algorithm: see Notes. Meta-encode if value is 0xFD or 0xFE.
```

## Feedbacks
```yaml
# Standard Response String Format (Type 0x20):
#   [0xFE] [0x17] [0xC7] [0x20] [Char1..Char13] [Flag1..Flag8] [Checksum]
#   - Start: 0xFE
#   - Count: 0x17 (23 decimal)
#   - ID: 0xC7
#   - Type: 0x20
#   - Char1-Char13: ASCII bytes representing the front-panel display text
#   - Flag1-Flag8: bit fields indicating which display icons are illuminated
#   - Checksum: trailing checksum byte
#
# Char1-Char13 carry source input, volume, and surround mode text and should be parsed.
# Flag1-Flag4 bit meanings:
#   Flag1: char1_dot, char2_dot, char3_dot, char4_dot, char5_dot, char6_dot, char7_dot
#   Flag2: char8_dot, char9_dot, char10_dot, char11_dot, char12_dot, char13_dot, char8_colon
#   Flag3: TAPEM, MULTI, 4, 3, 2, 1, Coaxial, Optical
#   Flag4: Tuned, St(Tuner), PTY, TA, TP, RT, RDS, RBDS
# Flag5-Flag8 bit meanings:
#   Flag5: Zone, Dynamic Range, DSP, HDCD, Dolby3 Stereo, DolbyPLII, DolbyPro Logic, Dolby Digital
#   Flag6: DisplayMode 1, DisplayMode 0, (reserved), StandbyLED, OSD, Auto, Memory, Preset
#   Flag7: SBR, SBL, EX, Sur, THX, dts ES, dts, MPEG
#   Flag8: CB, S, LFE, SR, SL, FR, C, FL
# Display status uses 2 bits in Flag6 to confirm display On/Off:
#   DisplayMode[1:0] = 0b01 -> Display On; 0b10 -> Display Off
- id: front_panel_display_state
  type: object
  description: |
    Full snapshot of the front-panel display sent by the unit whenever its
    status changes. Char1-Char13 mirror the 13 display characters (parse for
    source, volume, surround mode). Flag1-Flag8 carry icon states per the
    bitmaps above.
  fields:
    - name: chars
      type: string
      description: 13 ASCII bytes from the front display (source/volume/surround text).
    - name: flag1
      type: byte
      description: char dot bits 1-7 (LSB-first).
    - name: flag2
      type: byte
      description: char dot bits 8-13 and char8 colon.
    - name: flag3
      type: byte
      description: TAPEM, MULTI, source 1-4, Coaxial, Optical icon bits.
    - name: flag4
      type: byte
      description: Tuned, St, PTY, TA, TP, RT, RDS, RBDS icon bits.
    - name: flag5
      type: byte
      description: Zone, Dynamic Range, DSP, HDCD, Dolby3 Stereo, DolbyPLII, DolbyPro Logic, Dolby Digital.
    - name: flag6
      type: byte
      description: DisplayMode[1:0] (bits 0-1), StandbyLED, OSD, Auto, Memory, Preset.
    - name: flag7
      type: byte
      description: SBR, SBL, EX, Sur, THX, dts ES, dts, MPEG.
    - name: flag8
      type: byte
      description: CB, S, LFE, SR, SL, FR, C, FL.
```

## Events
```yaml
# Any change to the status of the front display prompts a feedback string
# mirroring that change. Treat all feedback string transmissions as unsolicited
# state-change events.
- id: display_state_changed
  description: |
    Device transmitted a feedback string (Type 0x20) because a display-affecting
    state changed. Parse the response into the `front_panel_display_state` feedback
    and act on the changed field(s).
  feedback_id: front_panel_display_state
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements present in the source. Do not infer.
```

## Notes
**Checksum algorithm.** Source defines the frame as `FE 03 C7 <Type> <Key> <Checksum>` and the count byte (0x03) explicitly covers "ID, Type, and Key bytes" — i.e. `0xC7 + Type + Key` — but does not state the algorithm. Common industry practice for such a frame is the two's-complement (or one's-complement) of the lower 8 bits of the sum of the bytes the count covers, or XOR. The actual algorithm is `<!-- UNRESOLVED: checksum algorithm not stated in source -->` and a controller must either (a) capture and replay a real device's response to a known command to learn the algorithm, or (b) try both sum and XOR candidates. **Do not** publish controllers that hard-code a guessed algorithm.

**Meta encoding.** Any 0xFD or 0xFE byte in the Key or Checksum field of a command must be escaped: 0xFD → `FD 00`, 0xFE → `FD 01`. This adds one byte to the frame. The `Count` field always covers the three ID/Type/Key bytes (not Start, not Checksum, not the meta-escape bytes). Commands marked red in the source use this encoding — examples in this spec (e.g. `band_toggle`, `zone2_main`, `zone2_mute_toggle`, `zone2_mute_toggle`, `main_zone_volume_set`/`zone2_volume_set` parameterised over the full range) all need their `Key` and `Checksum` bytes meta-encoded after the algorithm is known.

**Feedback string meta encoding.** Same rule applies to the feedback string. The count of 0x17 (23) reflects the 23 bytes following the start byte: 1 ID + 1 Type + 13 Chars + 8 Flags = 23. Note that 0x17 itself contains the byte 0x17 which is neither 0xFD nor 0xFE so no escape is needed for it.

**Volume direct range.** Source says volume direct commands range 0x00 - 0x60 (0-96 decimal) and provides a sample. The min and max commands have Key bytes 0x00 and 0x60 respectively; intermediate values are linear. Spec lists two parameterized actions (`main_zone_volume_set`, `zone2_volume_set`) covering the full range rather than ~46 discrete actions.

**Two zones.** Type 0x14 commands duplicate the corresponding Type 0x10 functions but target the main zone only — recommended for multi-zone installations to avoid zone conflicts. Type 0x16 commands target Zone 2 only.

**Record source.** Type 0x15 selects the record-out source independently of the listening source; command `record_follow_main_zone` (Key 0x6B) ties record-out to the current main-zone source.

**Display refresh.** `display_refresh` (Type 0x10, Key 0xFF) prompts the unit to retransmit its current state as a feedback string. Use after a controller cold-starts to populate local state without waiting for the next user action.

**Family scope.** The source is the RSX-1057 protocol document (member of Rotel's "RSX-1 Series" family). Treat the `0xC7` Device ID and the opcodes listed here as RSX-1057-specific until a sibling model (e.g. RSX-1056, RSX-1058) is verified against its own document.

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:00.561Z
last_checked_at: 2026-06-02T22:13:37.925Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:13:37.925Z
matched_actions: 159
action_count: 159
confidence: medium
summary: "All 159 spec actions traced to source (dip-safe re-verify). (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is specifically the RSX-1057 (member of Rotel's \"RSX-1 Series\" family). Apply to other RSX-1 family members only after verifying the same device ID `0xC7` and same Type/Key opcodes against each variant's own protocol document."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "checksum algorithm not stated in source -->` and a controller must either (a) capture and replay a real device's response to a known command to learn the algorithm, or (b) try both sum and XOR candidates. **Do not** publish controllers that hard-code a guessed algorithm."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
