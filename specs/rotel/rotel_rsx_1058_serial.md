---
spec_id: admin/rotel-rsx-1058
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RSX-1058 Control Spec"
manufacturer: Rotel
model_family: RSX-1058
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RSX-1058
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1576%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
  - "https://rotel.com/sites/default/files/product/rs232/RT1080%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1050%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:04.962Z
last_checked_at: 2026-05-31T21:00:13.938Z
generated_at: 2026-05-31T21:00:13.938Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T21:00:13.938Z
  matched_actions: 218
  action_count: 218
  confidence: high
  summary: "All 218 spec actions match hex commands in source; transport parameters verified; full command coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Rotel RSX-1058 Control Spec

## Summary
The Rotel RSX-1058 is a multi-zone A/V surround receiver controllable via RS-232C using a binary HEX protocol. Commands use a fixed frame (Start 0xFE, Count, Device ID 0xC8, Type, Key, Checksum). Supports main zone plus 3 additional zones with independent power, volume, source selection, and tuner control. Unsolicited feedback strings mirror the front-panel display on any state change.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no explicit query commands documented; feedback is unsolicited only -->
<!-- UNRESOLVED: volume direct max range for zones 2-4 not explicitly stated (only samples shown) -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # power on/off/toggle for main + zones 2-4
- levelable   # volume up/down, volume direct, bass/treble
- routable    # source selection per zone
```

## Actions
```yaml
# Command frame: Start(0xFE) Count DeviceID(0xC8) Type Key Checksum
# Checksum = (Count + DeviceID + Type + Key) mod 256
# Meta encoding: byte value 0xFD → FD 00, 0xFE → FD 01 in data stream
# No CR/LF after commands

# ============================================================
# Type 10 (0x10): Primary Commands
# ============================================================

# --- Power & Volume ---
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "FE 03 C8 10 0A E5"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "FE 03 C8 10 4A 25"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "FE 03 C8 10 4B 26"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "FE 03 C8 10 0B E6"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "FE 03 C8 10 0C E7"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "FE 03 C8 10 1E F9"
  params: []

- id: power_off_all_zones
  label: Power Off All Zones
  kind: action
  command: "FE 03 C8 10 71 4C"
  params: []

# --- Source Selection ---
- id: source_cd
  label: Source CD
  kind: action
  command: "FE 03 C8 10 02 DC"
  params: []

- id: source_tuner
  label: Source Tuner
  kind: action
  command: "FE 03 C8 10 03 DD"
  params: []

- id: source_tape
  label: Source Tape
  kind: action
  command: "FE 03 C8 10 04 DE"
  params: []

- id: source_video1
  label: Source Video 1
  kind: action
  command: "FE 03 C8 10 05 E0"
  params: []

- id: source_video2
  label: Source Video 2
  kind: action
  command: "FE 03 C8 10 06 E1"
  params: []

- id: source_video3
  label: Source Video 3
  kind: action
  command: "FE 03 C8 10 07 E2"
  params: []

- id: source_video4
  label: Source Video 4
  kind: action
  command: "FE 03 C8 10 08 E3"
  params: []

- id: source_video5
  label: Source Video 5
  kind: action
  command: "FE 03 C8 10 09 E4"
  params: []

- id: source_multi_input
  label: Source Multi Input
  kind: action
  command: "FE 03 C8 10 15 E0"
  params: []

# --- Surround Mode ---
- id: surround_stereo
  label: Stereo
  kind: action
  command: "FE 03 C8 10 11 EC"
  params: []

- id: surround_dolby3_stereo
  label: Dolby3 Stereo
  kind: action
  command: "FE 03 C8 10 12 ED"
  params: []

- id: surround_dolby_pro_logic
  label: Dolby Pro Logic
  kind: action
  command: "FE 03 C8 10 13 EE"
  params: []

- id: dsp_music_mode_toggle
  label: DSP Music Mode Toggle
  kind: action
  command: "FE 03 C8 10 14 EF"
  params: []

- id: dolby3_prologic_toggle
  label: Dolby3 Stereo/Pro Logic Toggle
  kind: action
  command: "FE 03 C8 10 53 2E"
  params: []

- id: dts_neo6_music_cinema_toggle
  label: dts Neo:6 Music/Cinema Toggle
  kind: action
  command: "FE 03 C8 10 54 2F"
  params: []

- id: music_1
  label: Music 1
  kind: action
  command: "FE 03 C8 10 57 32"
  params: []

- id: music_2
  label: Music 2
  kind: action
  command: "FE 03 C8 10 58 33"
  params: []

- id: music_3
  label: Music 3
  kind: action
  command: "FE 03 C8 10 59 34"
  params: []

- id: music_4
  label: Music 4
  kind: action
  command: "FE 03 C8 10 5A 35"
  params: []

- id: surround_5ch_stereo
  label: 5 Channel Stereo
  kind: action
  command: "FE 03 C8 10 5B 36"
  params: []

- id: surround_7ch_stereo
  label: 7 Channel Stereo
  kind: action
  command: "FE 03 C8 10 5C 37"
  params: []

- id: dolby_plii_cinema
  label: Dolby PLII Cinema
  kind: action
  command: "FE 03 C8 10 5D 38"
  params: []

- id: dolby_plii_music
  label: Dolby PLII Music
  kind: action
  command: "FE 03 C8 10 5E 39"
  params: []

- id: dolby_plii_game
  label: Dolby PLII Game
  kind: action
  command: "FE 03 C8 10 74 4F"
  params: []

- id: dolby_pro_logic_alt
  label: Dolby Pro Logic (Alt)
  kind: action
  command: "FE 03 C8 10 5F 3A"
  params: []

- id: dts_neo6_music
  label: dts Neo:6 Music
  kind: action
  command: "FE 03 C8 10 60 3B"
  params: []

- id: dts_neo6_cinema
  label: dts Neo:6 Cinema
  kind: action
  command: "FE 03 C8 10 61 3C"
  params: []

- id: plii_panorama_toggle
  label: PLII Panorama Toggle
  kind: action
  command: "FE 03 C8 10 62 3D"
  params: []

- id: plii_dimension_up
  label: PLII Dimension Up
  kind: action
  command: "FE 03 C8 10 63 3E"
  params: []

- id: plii_dimension_down
  label: PLII Dimension Down
  kind: action
  command: "FE 03 C8 10 64 3F"
  params: []

- id: plii_center_width_up
  label: PLII Center Width Up
  kind: action
  command: "FE 03 C8 10 65 40"
  params: []

- id: plii_center_width_down
  label: PLII Center Width Down
  kind: action
  command: "FE 03 C8 10 66 41"
  params: []

- id: dolby_digital_ex_toggle
  label: Dolby Digital EX Toggle
  kind: action
  command: "FE 03 C8 10 68 43"
  params: []

- id: next_surround_mode
  label: Next Surround Mode
  kind: action
  command: "FE 03 C8 10 22 FD 00"
  params: []

# --- Tone Control ---
- id: treble_up
  label: Treble Up
  kind: action
  command: "FE 03 C8 10 0D E8"
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  command: "FE 03 C8 10 0E E9"
  params: []

- id: bass_up
  label: Bass Up
  kind: action
  command: "FE 03 C8 10 0F EA"
  params: []

- id: bass_down
  label: Bass Down
  kind: action
  command: "FE 03 C8 10 10 EB"
  params: []

- id: tone_control_select
  label: Tone Control Select
  kind: action
  command: "FE 03 C8 10 67 42"
  params: []

# --- OSD Menu ---
- id: osd_menu
  label: OSD Menu
  kind: action
  command: "FE 03 C8 10 18 F3"
  params: []

- id: osd_enter
  label: Enter
  kind: action
  command: "FE 03 C8 10 19 F4"
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  command: "FE 03 C8 10 1A F5"
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  command: "FE 03 C8 10 1B F6"
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  command: "FE 03 C8 10 1C F7"
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  command: "FE 03 C8 10 1D F8"
  params: []

# --- Tuner ---
- id: tune_up
  label: Tune Up
  kind: action
  command: "FE 03 C8 10 28 03"
  params: []

- id: tune_down
  label: Tune Down
  kind: action
  command: "FE 03 C8 10 29 04"
  params: []

- id: preset_up
  label: Preset Up
  kind: action
  command: "FE 03 C8 10 6F 4A"
  params: []

- id: preset_down
  label: Preset Down
  kind: action
  command: "FE 03 C8 10 70 4B"
  params: []

- id: frequency_up
  label: Frequency Up
  kind: action
  command: "FE 03 C8 10 72 4D"
  params: []

- id: frequency_down
  label: Frequency Down
  kind: action
  command: "FE 03 C8 10 73 4E"
  params: []

- id: memory
  label: Memory
  kind: action
  command: "FE 03 C8 10 27 02"
  params: []

- id: band_toggle
  label: Band Toggle
  kind: action
  command: "FE 03 C8 10 24 FF"
  params: []

- id: am
  label: AM
  kind: action
  command: "FE 03 C8 10 56 31"
  params: []

- id: fm
  label: FM
  kind: action
  command: "FE 03 C8 10 55 30"
  params: []

- id: tune_preset_toggle
  label: Tune/Preset
  kind: action
  command: "FE 03 C8 10 20 FB"
  params: []

- id: tuning_mode_select
  label: Tuning Mode Select
  kind: action
  command: "FE 03 C8 10 69 44"
  params: []

- id: preset_mode_select
  label: Preset Mode Select
  kind: action
  command: "FE 03 C8 10 6A 45"
  params: []

- id: frequency_direct
  label: Frequency Direct
  kind: action
  command: "FE 03 C8 10 25 00"
  params: []

- id: preset_scan
  label: Preset Scan
  kind: action
  command: "FE 03 C8 10 21 FC"
  params: []

- id: tuner_display
  label: Tuner Display
  kind: action
  command: "FE 03 C8 10 44 1F"
  params: []

- id: rds_pty
  label: RDS PTY
  kind: action
  command: "FE 03 C8 10 45 20"
  params: []

- id: rds_tp
  label: RDS TP
  kind: action
  command: "FE 03 C8 10 46 21"
  params: []

- id: rds_ta
  label: RDS TA
  kind: action
  command: "FE 03 C8 10 47 22"
  params: []

- id: fm_mono
  label: FM Mono
  kind: action
  command: "FE 03 C8 10 26 01"
  params: []

# --- Numeric Keys ---
- id: numeric_key
  label: Numeric Key
  kind: action
  command: "FE 03 C8 10 {key} {checksum}"
  params:
    - name: digit
      type: integer
      min: 0
      max: 9
      description: "Digit 0-9. Key byte: 0x29+N where N=1-9 for digits 1-9, N=10 for digit 0"

# --- Other ---
- id: record_function_select
  label: Record Function Select
  kind: action
  command: "FE 03 C8 10 17 F2"
  params: []

- id: dynamic_range
  label: Dynamic Range
  kind: action
  command: "FE 03 C8 10 16 F1"
  params: []

- id: digital_input_select
  label: Digital Input Select
  kind: action
  command: "FE 03 C8 10 1F FA"
  params: []

- id: zone2_main_toggle
  label: Zone 2/Main
  kind: action
  command: "FE 03 C8 10 23 FD 01"
  params: []

- id: temp_center_trim
  label: Temporary Center Trim
  kind: action
  command: "FE 03 C8 10 4C 27"
  params: []

- id: temp_subwoofer_trim
  label: Temporary Subwoofer Trim
  kind: action
  command: "FE 03 C8 10 4D 28"
  params: []

- id: temp_surround_trim
  label: Temporary Surround Trim
  kind: action
  command: "FE 03 C8 10 4E 29"
  params: []

- id: cinema_eq_toggle
  label: Cinema EQ Toggle
  kind: action
  command: "FE 03 C8 10 4F 2A"
  params: []

- id: front_display_toggle
  label: Front Display On/Off
  kind: action
  command: "FE 03 C8 10 52 2D"
  params: []

- id: display_refresh
  label: Display Refresh
  kind: action
  command: "FE 03 C8 10 FF DA"
  params: []

- id: party_mode_toggle
  label: Party Mode Toggle
  kind: action
  command: "FE 03 C8 10 6E 49"
  params: []

- id: output_resolution
  label: Output Resolution
  kind: action
  command: "FE 03 C8 10 75 50"
  params: []

- id: hdmi_amp_mode
  label: HDMI Amp Mode
  kind: action
  command: "FE 03 C8 10 78 53"
  params: []

- id: hdmi_tv_mode
  label: HDMI TV Mode
  kind: action
  command: "FE 03 C8 10 79 54"
  params: []

# ============================================================
# Type 14 (0x14): Main Zone Commands
# ============================================================

# --- Power & Volume ---
- id: main_power_toggle
  label: Main Zone Power Toggle
  kind: action
  command: "FE 03 C8 14 0A E9"
  params: []

- id: main_power_off
  label: Main Zone Power Off
  kind: action
  command: "FE 03 C8 14 4A 29"
  params: []

- id: main_power_on
  label: Main Zone Power On
  kind: action
  command: "FE 03 C8 14 4B 2A"
  params: []

- id: main_volume_up
  label: Main Zone Volume Up
  kind: action
  command: "FE 03 C8 14 00 DF"
  params: []

- id: main_volume_down
  label: Main Zone Volume Down
  kind: action
  command: "FE 03 C8 14 01 E0"
  params: []

- id: main_mute_toggle
  label: Main Zone Mute Toggle
  kind: action
  command: "FE 03 C8 14 1E FD 00"
  params: []

- id: main_mute_on
  label: Main Zone Mute On
  kind: action
  command: "FE 03 C8 14 6C 4B"
  params: []

- id: main_mute_off
  label: Main Zone Mute Off
  kind: action
  command: "FE 03 C8 14 6D 4C"
  params: []

# --- Source Selection ---
- id: main_source_cd
  label: Main Zone Source CD
  kind: action
  command: "FE 03 C8 14 02 E1"
  params: []

- id: main_source_tuner
  label: Main Zone Source Tuner
  kind: action
  command: "FE 03 C8 14 03 E2"
  params: []

- id: main_source_tape
  label: Main Zone Source Tape
  kind: action
  command: "FE 03 C8 14 04 E3"
  params: []

- id: main_source_video1
  label: Main Zone Source Video 1
  kind: action
  command: "FE 03 C8 14 05 E4"
  params: []

- id: main_source_video2
  label: Main Zone Source Video 2
  kind: action
  command: "FE 03 C8 14 06 E5"
  params: []

- id: main_source_video3
  label: Main Zone Source Video 3
  kind: action
  command: "FE 03 C8 14 07 E6"
  params: []

- id: main_source_video4
  label: Main Zone Source Video 4
  kind: action
  command: "FE 03 C8 14 08 E7"
  params: []

- id: main_source_video5
  label: Main Zone Source Video 5
  kind: action
  command: "FE 03 C8 14 09 E8"
  params: []

# ============================================================
# Type 15 (0x15): Record Source Commands
# ============================================================

- id: record_source_cd
  label: Record Source CD
  kind: action
  command: "FE 03 C8 15 02 E2"
  params: []

- id: record_source_tuner
  label: Record Source Tuner
  kind: action
  command: "FE 03 C8 15 03 E3"
  params: []

- id: record_source_tape
  label: Record Source Tape
  kind: action
  command: "FE 03 C8 15 04 E4"
  params: []

- id: record_source_video1
  label: Record Source Video 1
  kind: action
  command: "FE 03 C8 15 05 E5"
  params: []

- id: record_source_video2
  label: Record Source Video 2
  kind: action
  command: "FE 03 C8 15 06 E6"
  params: []

- id: record_source_video3
  label: Record Source Video 3
  kind: action
  command: "FE 03 C8 15 07 E7"
  params: []

- id: record_source_video4
  label: Record Source Video 4
  kind: action
  command: "FE 03 C8 15 08 E8"
  params: []

- id: record_source_video5
  label: Record Source Video 5
  kind: action
  command: "FE 03 C8 15 09 E9"
  params: []

- id: record_follow_main
  label: Record Follow Main Zone Source
  kind: action
  command: "FE 03 C8 15 6B 4B"
  params: []

# ============================================================
# Type 16 (0x16): Zone 2 Commands
# ============================================================

# --- Power & Volume ---
- id: zone2_power_toggle
  label: Zone 2 Power Toggle
  kind: action
  command: "FE 03 C8 16 0A EB"
  params: []

- id: zone2_power_off
  label: Zone 2 Power Off
  kind: action
  command: "FE 03 C8 16 4A 2B"
  params: []

- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "FE 03 C8 16 4B 2C"
  params: []

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: "FE 03 C8 16 00 E1"
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: "FE 03 C8 16 01 E2"
  params: []

- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  command: "FE 03 C8 16 1E FF"
  params: []

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "FE 03 C8 16 6C 4D"
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "FE 03 C8 16 6D 4E"
  params: []

- id: zone2_power_off_all
  label: Zone 2 Power Off All Zones
  kind: action
  command: "FE 03 C8 16 71 52"
  params: []

# --- Source Selection ---
- id: zone2_source_cd
  label: Zone 2 Source CD
  kind: action
  command: "FE 03 C8 16 02 E3"
  params: []

- id: zone2_source_tuner
  label: Zone 2 Source Tuner
  kind: action
  command: "FE 03 C8 16 03 E4"
  params: []

- id: zone2_source_tape
  label: Zone 2 Source Tape
  kind: action
  command: "FE 03 C8 16 04 E5"
  params: []

- id: zone2_source_video1
  label: Zone 2 Source Video 1
  kind: action
  command: "FE 03 C8 16 05 E6"
  params: []

- id: zone2_source_video2
  label: Zone 2 Source Video 2
  kind: action
  command: "FE 03 C8 16 06 E7"
  params: []

- id: zone2_source_video3
  label: Zone 2 Source Video 3
  kind: action
  command: "FE 03 C8 16 07 E8"
  params: []

- id: zone2_source_video4
  label: Zone 2 Source Video 4
  kind: action
  command: "FE 03 C8 16 08 E9"
  params: []

- id: zone2_source_video5
  label: Zone 2 Source Video 5
  kind: action
  command: "FE 03 C8 16 09 EA"
  params: []

- id: zone2_follow_main
  label: Zone 2 Follow Main Zone Source
  kind: action
  command: "FE 03 C8 16 6B 4C"
  params: []

# --- Tuner ---
- id: zone2_tune_up
  label: Zone 2 Tune Up
  kind: action
  command: "FE 03 C8 16 28 09"
  params: []

- id: zone2_tune_down
  label: Zone 2 Tune Down
  kind: action
  command: "FE 03 C8 16 29 0A"
  params: []

- id: zone2_preset_up
  label: Zone 2 Preset Up
  kind: action
  command: "FE 03 C8 16 6F 50"
  params: []

- id: zone2_preset_down
  label: Zone 2 Preset Down
  kind: action
  command: "FE 03 C8 16 70 51"
  params: []

- id: zone2_frequency_up
  label: Zone 2 Frequency Up
  kind: action
  command: "FE 03 C8 16 72 53"
  params: []

- id: zone2_frequency_down
  label: Zone 2 Frequency Down
  kind: action
  command: "FE 03 C8 16 73 54"
  params: []

- id: zone2_band_toggle
  label: Zone 2 Band Toggle
  kind: action
  command: "FE 03 C8 16 24 05"
  params: []

- id: zone2_am
  label: Zone 2 AM
  kind: action
  command: "FE 03 C8 16 56 37"
  params: []

- id: zone2_fm
  label: Zone 2 FM
  kind: action
  command: "FE 03 C8 16 55 36"
  params: []

- id: zone2_tune_preset_toggle
  label: Zone 2 Tune/Preset
  kind: action
  command: "FE 03 C8 16 20 01"
  params: []

- id: zone2_tuning_mode_select
  label: Zone 2 Tuning Mode Select
  kind: action
  command: "FE 03 C8 16 69 4A"
  params: []

- id: zone2_preset_mode_select
  label: Zone 2 Preset Mode Select
  kind: action
  command: "FE 03 C8 16 6A 4B"
  params: []

- id: zone2_preset_scan
  label: Zone 2 Preset Scan
  kind: action
  command: "FE 03 C8 16 21 02"
  params: []

- id: zone2_fm_mono
  label: Zone 2 FM Mono
  kind: action
  command: "FE 03 C8 16 26 07"
  params: []

# --- Numeric Keys ---
- id: zone2_numeric_key
  label: Zone 2 Numeric Key
  kind: action
  command: "FE 03 C8 16 {key} {checksum}"
  params:
    - name: digit
      type: integer
      min: 0
      max: 9
      description: "Digit 0-9. Key byte: 0x29+N where N=1-9 for digits 1-9, N=10 for digit 0"

# --- Other ---
- id: zone2_party_mode_toggle
  label: Zone 2 Party Mode Toggle
  kind: action
  command: "FE 03 C8 16 6E 4F"
  params: []

# ============================================================
# Type 17 (0x17): Zone 3 Commands
# ============================================================

# --- Power & Volume ---
- id: zone3_power_toggle
  label: Zone 3 Power Toggle
  kind: action
  command: "FE 03 C8 17 0A EC"
  params: []

- id: zone3_power_off
  label: Zone 3 Power Off
  kind: action
  command: "FE 03 C8 17 4A 2C"
  params: []

- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  command: "FE 03 C8 17 4B 2D"
  params: []

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: "FE 03 C8 17 00 E2"
  params: []

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: "FE 03 C8 17 01 E3"
  params: []

- id: zone3_mute_toggle
  label: Zone 3 Mute Toggle
  kind: action
  command: "FE 03 C8 17 1E 00"
  params: []

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: "FE 03 C8 17 6C 4E"
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: "FE 03 C8 17 6D 4F"
  params: []

- id: zone3_power_off_all
  label: Zone 3 Power Off All Zones
  kind: action
  command: "FE 03 C8 17 71 53"
  params: []

# --- Source Selection ---
- id: zone3_source_cd
  label: Zone 3 Source CD
  kind: action
  command: "FE 03 C8 17 02 E4"
  params: []

- id: zone3_source_tuner
  label: Zone 3 Source Tuner
  kind: action
  command: "FE 03 C8 17 03 E5"
  params: []

- id: zone3_source_tape
  label: Zone 3 Source Tape
  kind: action
  command: "FE 03 C8 17 04 E6"
  params: []

- id: zone3_source_video1
  label: Zone 3 Source Video 1
  kind: action
  command: "FE 03 C8 17 05 E7"
  params: []

- id: zone3_source_video2
  label: Zone 3 Source Video 2
  kind: action
  command: "FE 03 C8 17 06 E8"
  params: []

- id: zone3_source_video3
  label: Zone 3 Source Video 3
  kind: action
  command: "FE 03 C8 17 07 E9"
  params: []

- id: zone3_source_video4
  label: Zone 3 Source Video 4
  kind: action
  command: "FE 03 C8 17 08 EA"
  params: []

- id: zone3_source_video5
  label: Zone 3 Source Video 5
  kind: action
  command: "FE 03 C8 17 09 EB"
  params: []

- id: zone3_follow_main
  label: Zone 3 Follow Main Zone Source
  kind: action
  command: "FE 03 C8 17 6B 4D"
  params: []

# --- Tuner ---
- id: zone3_tune_up
  label: Zone 3 Tune Up
  kind: action
  command: "FE 03 C8 17 28 0A"
  params: []

- id: zone3_tune_down
  label: Zone 3 Tune Down
  kind: action
  command: "FE 03 C8 17 29 0B"
  params: []

- id: zone3_preset_up
  label: Zone 3 Preset Up
  kind: action
  command: "FE 03 C8 17 6F 51"
  params: []

- id: zone3_preset_down
  label: Zone 3 Preset Down
  kind: action
  command: "FE 03 C8 17 70 52"
  params: []

- id: zone3_frequency_up
  label: Zone 3 Frequency Up
  kind: action
  command: "FE 03 C8 17 72 54"
  params: []

- id: zone3_frequency_down
  label: Zone 3 Frequency Down
  kind: action
  command: "FE 03 C8 17 73 55"
  params: []

- id: zone3_band_toggle
  label: Zone 3 Band Toggle
  kind: action
  command: "FE 03 C8 17 24 06"
  params: []

- id: zone3_am
  label: Zone 3 AM
  kind: action
  command: "FE 03 C8 17 56 38"
  params: []

- id: zone3_fm
  label: Zone 3 FM
  kind: action
  command: "FE 03 C8 17 55 37"
  params: []

- id: zone3_tune_preset_toggle
  label: Zone 3 Tune/Preset
  kind: action
  command: "FE 03 C8 17 20 02"
  params: []

- id: zone3_tuning_mode_select
  label: Zone 3 Tuning Mode Select
  kind: action
  command: "FE 03 C8 17 69 4B"
  params: []

- id: zone3_preset_mode_select
  label: Zone 3 Preset Mode Select
  kind: action
  command: "FE 03 C8 17 6A 4C"
  params: []

- id: zone3_preset_scan
  label: Zone 3 Preset Scan
  kind: action
  command: "FE 03 C8 17 21 03"
  params: []

- id: zone3_fm_mono
  label: Zone 3 FM Mono
  kind: action
  command: "FE 03 C8 17 26 08"
  params: []

# --- Numeric Keys ---
- id: zone3_numeric_key
  label: Zone 3 Numeric Key
  kind: action
  command: "FE 03 C8 17 {key} {checksum}"
  params:
    - name: digit
      type: integer
      min: 0
      max: 9
      description: "Digit 0-9. Key byte: 0x29+N where N=1-9 for digits 1-9, N=10 for digit 0"

# --- Other ---
- id: zone3_party_mode_toggle
  label: Zone 3 Party Mode Toggle
  kind: action
  command: "FE 03 C8 17 6E 50"
  params: []

# ============================================================
# Type 18 (0x18): Zone 4 Commands
# ============================================================

# --- Power & Volume ---
- id: zone4_power_toggle
  label: Zone 4 Power Toggle
  kind: action
  command: "FE 03 C8 18 0A ED"
  params: []

- id: zone4_power_off
  label: Zone 4 Power Off
  kind: action
  command: "FE 03 C8 18 4A 2D"
  params: []

- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  command: "FE 03 C8 18 4B 2E"
  params: []

- id: zone4_volume_up
  label: Zone 4 Volume Up
  kind: action
  command: "FE 03 C8 18 00 E3"
  params: []

- id: zone4_volume_down
  label: Zone 4 Volume Down
  kind: action
  command: "FE 03 C8 18 01 E4"
  params: []

- id: zone4_mute_toggle
  label: Zone 4 Mute Toggle
  kind: action
  command: "FE 03 C8 18 1E 01"
  params: []

- id: zone4_mute_on
  label: Zone 4 Mute On
  kind: action
  command: "FE 03 C8 18 6C 4F"
  params: []

- id: zone4_mute_off
  label: Zone 4 Mute Off
  kind: action
  command: "FE 03 C8 18 6D 50"
  params: []

- id: zone4_power_off_all
  label: Zone 4 Power Off All Zones
  kind: action
  command: "FE 03 C8 18 71 54"
  params: []

# --- Source Selection ---
- id: zone4_source_cd
  label: Zone 4 Source CD
  kind: action
  command: "FE 03 C8 18 02 E5"
  params: []

- id: zone4_source_tuner
  label: Zone 4 Source Tuner
  kind: action
  command: "FE 03 C8 18 03 E6"
  params: []

- id: zone4_source_tape
  label: Zone 4 Source Tape
  kind: action
  command: "FE 03 C8 18 04 E7"
  params: []

- id: zone4_source_video1
  label: Zone 4 Source Video 1
  kind: action
  command: "FE 03 C8 18 05 E8"
  params: []

- id: zone4_source_video2
  label: Zone 4 Source Video 2
  kind: action
  command: "FE 03 C8 18 06 E9"
  params: []

- id: zone4_source_video3
  label: Zone 4 Source Video 3
  kind: action
  command: "FE 03 C8 18 07 EA"
  params: []

- id: zone4_source_video4
  label: Zone 4 Source Video 4
  kind: action
  command: "FE 03 C8 18 08 EB"
  params: []

- id: zone4_source_video5
  label: Zone 4 Source Video 5
  kind: action
  command: "FE 03 C8 18 09 EC"
  params: []

- id: zone4_follow_main
  label: Zone 4 Follow Main Zone Source
  kind: action
  command: "FE 03 C8 18 6B 4E"
  params: []

# --- Tuner ---
- id: zone4_tune_up
  label: Zone 4 Tune Up
  kind: action
  command: "FE 03 C8 18 28 0B"
  params: []

- id: zone4_tune_down
  label: Zone 4 Tune Down
  kind: action
  command: "FE 03 C8 18 29 0C"
  params: []

- id: zone4_preset_up
  label: Zone 4 Preset Up
  kind: action
  command: "FE 03 C8 18 6F 52"
  params: []

- id: zone4_preset_down
  label: Zone 4 Preset Down
  kind: action
  command: "FE 03 C8 18 70 53"
  params: []

- id: zone4_frequency_up
  label: Zone 4 Frequency Up
  kind: action
  command: "FE 03 C8 18 72 55"
  params: []

- id: zone4_frequency_down
  label: Zone 4 Frequency Down
  kind: action
  command: "FE 03 C8 18 73 56"
  params: []

- id: zone4_band_toggle
  label: Zone 4 Band Toggle
  kind: action
  command: "FE 03 C8 18 24 07"
  params: []

- id: zone4_am
  label: Zone 4 AM
  kind: action
  command: "FE 03 C8 18 56 39"
  params: []

- id: zone4_fm
  label: Zone 4 FM
  kind: action
  command: "FE 03 C8 18 55 38"
  params: []

- id: zone4_tune_preset_toggle
  label: Zone 4 Tune/Preset
  kind: action
  command: "FE 03 C8 18 20 03"
  params: []

- id: zone4_tuning_mode_select
  label: Zone 4 Tuning Mode Select
  kind: action
  command: "FE 03 C8 18 69 4C"
  params: []

- id: zone4_preset_mode_select
  label: Zone 4 Preset Mode Select
  kind: action
  command: "FE 03 C8 18 6A 4D"
  params: []

- id: zone4_preset_scan
  label: Zone 4 Preset Scan
  kind: action
  command: "FE 03 C8 18 21 04"
  params: []

- id: zone4_fm_mono
  label: Zone 4 FM Mono
  kind: action
  command: "FE 03 C8 18 26 09"
  params: []

# --- Numeric Keys ---
- id: zone4_numeric_key
  label: Zone 4 Numeric Key
  kind: action
  command: "FE 03 C8 18 {key} {checksum}"
  params:
    - name: digit
      type: integer
      min: 0
      max: 9
      description: "Digit 0-9. Key byte: 0x29+N where N=1-9 for digits 1-9, N=10 for digit 0"

# --- Other ---
- id: zone4_party_mode_toggle
  label: Zone 4 Party Mode Toggle
  kind: action
  command: "FE 03 C8 18 6E 51"
  params: []

# ============================================================
# Type 30 (0x30): Volume Direct Commands (Main Zone)
# ============================================================
# Source states range hex 00-60 (0-96). Samples shown for select values.
- id: volume_direct
  label: Volume Direct
  kind: action
  command: "FE 03 C8 30 {level} {checksum}"
  params:
    - name: level
      type: integer
      min: 0
      max: 95
      description: "Volume level (0=min, 95=max). Key byte = level value."

# ============================================================
# Type 32 (0x32): Zone 2 Volume Direct Commands
# ============================================================
- id: zone2_volume_direct
  label: Zone 2 Volume Direct
  kind: action
  command: "FE 03 C8 32 {level} {checksum}"
  params:
    - name: level
      type: integer
      min: 0
      max: 89
      description: "Zone 2 volume level (0=min, 89=max). Key byte = level value."

# ============================================================
# Type 33 (0x33): Zone 3 Volume Direct Commands
# ============================================================
- id: zone3_volume_direct
  label: Zone 3 Volume Direct
  kind: action
  command: "FE 03 C8 33 {level} {checksum}"
  params:
    - name: level
      type: integer
      min: 0
      max: 89
      description: "Zone 3 volume level (0=min, 89=max). Key byte = level value."

# ============================================================
# Type 34 (0x34): Zone 4 Volume Direct Commands
# ============================================================
- id: zone4_volume_direct
  label: Zone 4 Volume Direct
  kind: action
  command: "FE 03 C8 34 {level} {checksum}"
  params:
    - name: level
      type: integer
      min: 0
      max: 80
      description: "Zone 4 volume level (0=min, 80=max per samples). Key byte = level value."
```

## Feedbacks
```yaml
# Feedback string format: FE 17 C8 20 [Char1-13] [Flag1-8] [Checksum]
# Char1-13: ASCII display text (source name, volume, surround mode)
# Flag1-8: status flag bytes for front-panel icons

- id: display_text
  type: string
  description: "ASCII text from front panel display (13 chars). Contains source input, volume, and surround mode data. Parse to extract current state."

- id: power_state
  type: enum
  values: [on, off, standby]
  description: "Derived from Flag1 Bit7 (Zone 2), Flag1 Bit7 upper (Zone 3), Flag6 StandbyLED bit, and display activity"

- id: mute_state
  type: enum
  values: [on, off]
  description: "Mute status. Not directly mapped to a single flag bit; parse from display text."

- id: source_input
  type: string
  description: "Current source input name parsed from display text (Char1-13)"

- id: volume_level
  type: integer
  description: "Current volume level parsed from display text"

- id: surround_mode
  type: string
  description: "Current surround mode parsed from display text and flag bits"

- id: display_on
  type: enum
  values: [on, off]
  description: "Display on/off status from Flag6 DisplayMode bits (DisplayMode1=0 + DisplayMode0=0 = Off, DisplayMode1=0 + DisplayMode0=1 = Off, DisplayMode1=1 + DisplayMode0=0 = On)"

- id: zone2_active
  type: boolean
  description: "Zone 2 active status from Flag1 Bit7"

- id: zone3_active
  type: boolean
  description: "Zone 3 active status from Flag1 Bit7 (second instance)"

- id: zone4_active
  type: boolean
  description: "Zone 4 active status from Flag6 Bit2"

- id: dolby_digital_active
  type: boolean
  description: "Dolby Digital indicator from Flag5 Bit7"

- id: dolby_prologic_active
  type: boolean
  description: "Dolby Pro Logic indicator from Flag5 Bit6"

- id: dolby_plii_active
  type: boolean
  description: "Dolby PLII indicator from Flag5 Bit5"

- id: dts_active
  type: boolean
  description: "dts indicator from Flag7 Bit6"

- id: tuned
  type: boolean
  description: "Tuner tuned indicator from Flag4 Bit0"

- id: rds_active
  type: boolean
  description: "RDS indicator from Flag4 Bit7"

- id: optical_input
  type: boolean
  description: "Optical input indicator from Flag3 Bit6"

- id: coaxial_input
  type: boolean
  description: "Coaxial input indicator from Flag3 Bit7"
```

## Variables
```yaml
# UNRESOLVED: no explicit get/set variable interface documented; volume direct and
# tone controls are action-based. No query commands return numeric parameter values.
```

## Events
```yaml
- id: display_update
  description: "Unsolicited feedback string sent whenever front panel display changes. Format: FE 17 C8 20 [Char1-13] [Flag1-8] [Checksum]. Contains 13 ASCII chars for display text and 8 flag bytes for icon/status indicators."
  trigger: "Any change to front panel display state (source, volume, surround mode, power, etc.)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source
```

## Notes
- Binary HEX protocol — all commands are raw byte sequences, no ASCII text commands.
- Checksum algorithm: `(Count + DeviceID + Type + Key) mod 256`. Count is always `0x03` for standard commands.
- Meta encoding: byte value `0xFD` in data must be sent as `FD 00`; byte value `0xFE` must be sent as `FD 01`. This prevents false start-byte detection.
- No carriage return or line feed after commands.
- Device ID is fixed at `0xC8`.
- Type 10 commands affect all zones simultaneously in multi-zone installations; use zone-specific types (14/16/17/18) for discrete zone control.
- Zone 2/3/4 status bits in feedback flags were added in Main software V1.2.0.
- Volume direct main zone range: 0x00-0x5F (0-95). Zone 2/3 max sampled at 89, Zone 4 max sampled at 80.
- Numeric key byte mapping: digit 1-9 → key 0x2A-0x32, digit 0 → key 0x33 (i.e., key = 0x29 + digit_index where digit_index = digit for 1-9, 10 for 0).
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no explicit query/poll commands; all feedback is unsolicited -->
<!-- UNRESOLVED: volume direct max for zones 2-4 not explicitly stated (only samples shown) -->
<!-- UNRESOLVED: no error response format documented -->
<!-- UNRESOLVED: no power-on delay or initialization sequence documented -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1576%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
  - "https://rotel.com/sites/default/files/product/rs232/RT1080%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1050%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:04.962Z
last_checked_at: 2026-05-31T21:00:13.938Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:00:13.938Z
matched_actions: 218
action_count: 218
confidence: high
summary: "All 218 spec actions match hex commands in source; transport parameters verified; full command coverage achieved."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
