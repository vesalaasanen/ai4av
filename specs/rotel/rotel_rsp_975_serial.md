---
spec_id: admin/rotel-rsp-975
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RSP 975 Control Spec"
manufacturer: Rotel
model_family: "RSP 975"
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - "RSP 975"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RSP1098%20Protocol.pdf"
retrieved_at: 2026-07-01T14:26:25.147Z
last_checked_at: 2026-07-07T12:36:14.475Z
generated_at: 2026-07-07T12:36:14.475Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document references RSP 1098 throughout. RSP 975 compatibility not confirmed in available material. Treat RSP 1098 protocol as best available proxy; verify against RSP 975 service documentation before deployment."
  - "response acknowledgement bytes not explicitly enumerated for every command"
  - "source documents commands but no named settable parameters beyond"
  - "source describes unsolicited Display Data frames (FE 17 A0 20...)"
  - "no multi-step sequences documented in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source; checksum algorithm not documented in source; RSP 975 vs RSP 1098 protocol compatibility not confirmed."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:36:14.475Z
  matched_actions: 153
  action_count: 153
  confidence: medium
  summary: "All 153 spec commands verified against source tables with exact hex match; transport parameters confirmed; one-to-one complete coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Rotel RSP 975 Control Spec

## Summary
RS-232C control protocol for the Rotel RSP 975 surround sound processor. Source document catalogues byte-level commands across main zone, record source, Zone 2, and volume-direct command groups using a fixed 6-byte frame (`FE 03 A0 {Type} {Key} {Chk}`).

<!-- UNRESOLVED: source document references RSP 1098 throughout. RSP 975 compatibility not confirmed in available material. Treat RSP 1098 protocol as best available proxy; verify against RSP 975 service documentation before deployment. -->

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
- powerable       # inferred from Power Toggle / Power On / Power Off commands
- routable        # inferred from Source / Record Source / Zone 2 Source commands
- queryable       # inferred from Display Refresh command
- levelable       # inferred from Vol+, Vol-, Volume Direct commands
```

## Actions
```yaml
# Frame format: FE 03 A0 {Type} {Key} {Chk}
# Type 0x10 = primary, 0x14 = main zone, 0x15 = record, 0x16 = zone 2,
# 0x30 = main volume direct, 0x32 = zone 2 volume direct

# --- Type 0x10 Primary Commands ---
- id: rmc_vol_up
  label: Remote Volume Up
  kind: action
  command: "FE 03 A0 10 00 B3"
  params: []
- id: rmc_vol_down
  label: Remote Volume Down
  kind: action
  command: "FE 03 A0 10 01 B4"
  params: []
- id: source_cd
  label: Source CD
  kind: action
  command: "FE 03 A0 10 02 B5"
  params: []
- id: source_tuner
  label: Source Tuner
  kind: action
  command: "FE 03 A0 10 03 B6"
  params: []
- id: source_tape
  label: Source Tape
  kind: action
  command: "FE 03 A0 10 04 B7"
  params: []
- id: source_video1
  label: Source Video 1
  kind: action
  command: "FE 03 A0 10 05 B8"
  params: []
- id: source_video2
  label: Source Video 2
  kind: action
  command: "FE 03 A0 10 06 B9"
  params: []
- id: source_video3
  label: Source Video 3
  kind: action
  command: "FE 03 A0 10 07 BA"
  params: []
- id: source_video4
  label: Source Video 4
  kind: action
  command: "FE 03 A0 10 08 BB"
  params: []
- id: source_video5
  label: Source Video 5
  kind: action
  command: "FE 03 A0 10 09 BC"
  params: []
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "FE 03 A0 10 0A BD"
  params: []
- id: vol_up
  label: Volume Up
  kind: action
  command: "FE 03 A0 10 0B BE"
  params: []
- id: vol_down
  label: Volume Down
  kind: action
  command: "FE 03 A0 10 0C BF"
  params: []
- id: treble_up
  label: Treble Up
  kind: action
  command: "FE 03 A0 10 0D C0"
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  command: "FE 03 A0 10 0E C1"
  params: []
- id: bass_up
  label: Bass Up
  kind: action
  command: "FE 03 A0 10 0F C2"
  params: []
- id: bass_down
  label: Bass Down
  kind: action
  command: "FE 03 A0 10 10 C3"
  params: []
- id: mode_stereo
  label: Stereo
  kind: action
  command: "FE 03 A0 10 11 C4"
  params: []
- id: mode_3stereo
  label: Dolby 3 Stereo
  kind: action
  command: "FE 03 A0 10 12 C5"
  params: []
- id: mode_pro_logic
  label: Dolby Pro Logic
  kind: action
  command: "FE 03 A0 10 13 C6"
  params: []
- id: mode_dsp
  label: DSP Music
  kind: action
  command: "FE 03 A0 10 14 C7"
  params: []
- id: multi_input
  label: Multi Input (5.1CH)
  kind: action
  command: "FE 03 A0 10 15 C8"
  params: []
- id: dynamic_range
  label: Dynamic Range
  kind: action
  command: "FE 03 A0 10 16 C9"
  params: []
- id: record
  label: Record
  kind: action
  command: "FE 03 A0 10 17 CA"
  params: []
- id: osd_menu
  label: OSD Menu
  kind: action
  command: "FE 03 A0 10 18 CB"
  params: []
- id: osd_enter
  label: OSD Enter
  kind: action
  command: "FE 03 A0 10 19 CC"
  params: []
- id: osd_right
  label: OSD Right (+)
  kind: action
  command: "FE 03 A0 10 1A CD"
  params: []
- id: osd_left
  label: OSD Left (-)
  kind: action
  command: "FE 03 A0 10 1B CE"
  params: []
- id: osd_up
  label: OSD Up
  kind: action
  command: "FE 03 A0 10 1C CF"
  params: []
- id: osd_down
  label: OSD Down / Dynamic
  kind: action
  command: "FE 03 A0 10 1D D0"
  params: []
- id: mute
  label: Mute
  kind: action
  command: "FE 03 A0 10 1E D1"
  params: []
- id: digital_in_select
  label: Digital Input Select
  kind: action
  command: "FE 03 A0 10 1F D2"
  params: []
- id: surround_next
  label: Next Surround Mode
  kind: action
  command: "FE 03 A0 10 22 D5"
  params: []
- id: zone_2_main_toggle
  label: Zone 2 / Main
  kind: action
  command: "FE 03 A0 10 23 D6"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "FE 03 A0 10 4A FD 00"
  params: []
  notes: "Exception: FD byte in payload must be escaped as FD 00 (see source Table 1A)"
- id: power_on
  label: Power On
  kind: action
  command: "FE 03 A0 10 4B FD 01"
  params: []
  notes: "Exception: FE byte in payload must be escaped as FD 01 (see source Table 1A)"
- id: speaker_center
  label: Center
  kind: action
  command: "FE 03 A0 10 4C FF"
  params: []
- id: speaker_subwoofer
  label: Subwoofer
  kind: action
  command: "FE 03 A0 10 4D 00"
  params: []
- id: speaker_surround
  label: Surround
  kind: action
  command: "FE 03 A0 10 4E 01"
  params: []
- id: cinema_eq
  label: Cinema EQ (Filter)
  kind: action
  command: "FE 03 A0 10 4F 02"
  params: []
- id: fl_display_toggle
  label: FL Display Toggle
  kind: action
  command: "FE 03 A0 10 52 05"
  params: []
- id: pl_3stereo
  label: Pro Logic / 3 Stereo
  kind: action
  command: "FE 03 A0 10 53 06"
  params: []
- id: dts_neo6
  label: dts Neo:6
  kind: action
  command: "FE 03 A0 10 54 07"
  params: []
- id: music_1
  label: Music 1
  kind: action
  command: "FE 03 A0 10 57 0A"
  params: []
- id: music_2
  label: Music 2
  kind: action
  command: "FE 03 A0 10 58 0B"
  params: []
- id: music_3
  label: Music 3
  kind: action
  command: "FE 03 A0 10 59 0C"
  params: []
- id: music_4
  label: Music 4
  kind: action
  command: "FE 03 A0 10 5A 0D"
  params: []
- id: mode_5ch_stereo
  label: 5 Channel Stereo
  kind: action
  command: "FE 03 A0 10 5B 0E"
  params: []
- id: mode_7ch_stereo
  label: 7 Channel Stereo
  kind: action
  command: "FE 03 A0 10 5C 0F"
  params: []
- id: plii_cinema
  label: Dolby PLII Cinema
  kind: action
  command: "FE 03 A0 10 5D 10"
  params: []
- id: plii_music
  label: Dolby PLII Music
  kind: action
  command: "FE 03 A0 10 5E 11"
  params: []
- id: pro_logic_secondary
  label: Dolby Pro Logic
  kind: action
  command: "FE 03 A0 10 5F 12"
  params: []
- id: dts_neo6_music
  label: dts Neo:6 Music
  kind: action
  command: "FE 03 A0 10 60 13"
  params: []
- id: dts_neo6_cinema
  label: dts Neo:6 Cinema
  kind: action
  command: "FE 03 A0 10 61 14"
  params: []
- id: plii_panorama
  label: PLII Panorama
  kind: action
  command: "FE 03 A0 10 62 15"
  params: []
- id: plii_dimension_up
  label: PLII Dimension Up
  kind: action
  command: "FE 03 A0 10 63 16"
  params: []
- id: plii_dimension_down
  label: PLII Dimension Down
  kind: action
  command: "FE 03 A0 10 64 17"
  params: []
- id: plii_center_width_up
  label: PLII Center Width Up
  kind: action
  command: "FE 03 A0 10 65 18"
  params: []
- id: plii_center_width_down
  label: PLII Center Width Down
  kind: action
  command: "FE 03 A0 10 66 19"
  params: []
- id: shift_tone_controls
  label: Tone Controls (Shift Treble/Bass)
  kind: action
  command: "FE 03 A0 10 67 1A"
  params: []
- id: dd_ex_toggle
  label: DD EX / XS On/Off
  kind: action
  command: "FE 03 A0 10 68 1B"
  params: []
- id: plii_game
  label: Dolby PLII Game
  kind: action
  command: "FE 03 A0 10 74 27"
  params: []
- id: display_refresh
  label: Display Refresh
  kind: action
  command: "FE 03 A0 10 FF B2"
  params: []

# --- Type 0x14 Main Zone Commands ---
- id: main_vol_up
  label: Main Zone Volume Up
  kind: action
  command: "FE 03 A0 14 00 B7"
  params: []
- id: main_vol_down
  label: Main Zone Volume Down
  kind: action
  command: "FE 03 A0 14 01 B8"
  params: []
- id: main_source_cd
  label: Main Zone Source CD
  kind: action
  command: "FE 03 A0 14 02 B9"
  params: []
- id: main_source_tuner
  label: Main Zone Source Tuner
  kind: action
  command: "FE 03 A0 14 03 BA"
  params: []
- id: main_source_tape
  label: Main Zone Source Tape
  kind: action
  command: "FE 03 A0 14 04 BB"
  params: []
- id: main_source_video1
  label: Main Zone Source Video 1
  kind: action
  command: "FE 03 A0 14 05 BC"
  params: []
- id: main_source_video2
  label: Main Zone Source Video 2
  kind: action
  command: "FE 03 A0 14 06 BD"
  params: []
- id: main_source_video3
  label: Main Zone Source Video 3
  kind: action
  command: "FE 03 A0 14 07 BE"
  params: []
- id: main_source_video4
  label: Main Zone Source Video 4
  kind: action
  command: "FE 03 A0 14 08 BF"
  params: []
- id: main_source_video5
  label: Main Zone Source Video 5
  kind: action
  command: "FE 03 A0 14 09 C0"
  params: []
- id: main_power_toggle
  label: Main Zone Power Toggle
  kind: action
  command: "FE 03 A0 14 0A C1"
  params: []
- id: main_mute
  label: Main Zone Mute
  kind: action
  command: "FE 03 A0 14 1E D5"
  params: []
- id: main_mute_on
  label: Main Zone Mute On
  kind: action
  command: "FE 03 A0 14 6C 23"
  params: []
- id: main_mute_off
  label: Main Zone Mute Off
  kind: action
  command: "FE 03 A0 14 6D 24"
  params: []

# --- Type 0x15 Record Source Commands ---
- id: record_cd
  label: Record Source CD
  kind: action
  command: "FE 03 A0 15 02 BA"
  params: []
- id: record_tuner
  label: Record Source Tuner
  kind: action
  command: "FE 03 A0 15 03 BB"
  params: []
- id: record_tape
  label: Record Source Tape
  kind: action
  command: "FE 03 A0 15 04 BC"
  params: []
- id: record_video1
  label: Record Source Video 1
  kind: action
  command: "FE 03 A0 15 05 BD"
  params: []
- id: record_video2
  label: Record Source Video 2
  kind: action
  command: "FE 03 A0 15 06 BE"
  params: []
- id: record_video3
  label: Record Source Video 3
  kind: action
  command: "FE 03 A0 15 07 BF"
  params: []
- id: record_video4
  label: Record Source Video 4
  kind: action
  command: "FE 03 A0 15 08 C0"
  params: []
- id: record_video5
  label: Record Source Video 5
  kind: action
  command: "FE 03 A0 15 09 C1"
  params: []
- id: record_source
  label: Record Source (toggle)
  kind: action
  command: "FE 03 A0 15 6B 23"
  params: []

# --- Type 0x16 Zone 2 Commands ---
- id: zone2_vol_up
  label: Zone 2 Volume Up
  kind: action
  command: "FE 03 A0 16 00 B9"
  params: []
- id: zone2_vol_down
  label: Zone 2 Volume Down
  kind: action
  command: "FE 03 A0 16 01 BA"
  params: []
- id: zone2_source_cd
  label: Zone 2 Source CD
  kind: action
  command: "FE 03 A0 16 02 BB"
  params: []
- id: zone2_source_tuner
  label: Zone 2 Source Tuner
  kind: action
  command: "FE 03 A0 16 03 BC"
  params: []
- id: zone2_source_tape
  label: Zone 2 Source Tape
  kind: action
  command: "FE 03 A0 16 04 BD"
  params: []
- id: zone2_source_video1
  label: Zone 2 Source Video 1
  kind: action
  command: "FE 03 A0 16 05 BE"
  params: []
- id: zone2_source_video2
  label: Zone 2 Source Video 2
  kind: action
  command: "FE 03 A0 16 06 BF"
  params: []
- id: zone2_source_video3
  label: Zone 2 Source Video 3
  kind: action
  command: "FE 03 A0 16 07 C0"
  params: []
- id: zone2_source_video4
  label: Zone 2 Source Video 4
  kind: action
  command: "FE 03 A0 16 08 C1"
  params: []
- id: zone2_source_video5
  label: Zone 2 Source Video 5
  kind: action
  command: "FE 03 A0 16 09 C2"
  params: []
- id: zone2_power_toggle
  label: Zone 2 Power Toggle
  kind: action
  command: "FE 03 A0 16 0A C3"
  params: []
- id: zone2_mute
  label: Zone 2 Mute
  kind: action
  command: "FE 03 A0 16 1E D7"
  params: []
- id: zone2_power_off
  label: Zone 2 Power Off
  kind: action
  command: "FE 03 A0 16 4A 03"
  params: []
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "FE 03 A0 16 4B 04"
  params: []
- id: zone2_follow_main_source
  label: Zone 2 Follow Main Source
  kind: action
  command: "FE 03 A0 16 6B 24"
  params: []
- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "FE 03 A0 16 6C 25"
  params: []
- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "FE 03 A0 16 6D 26"
  params: []

# --- Type 0x30 Main Volume Direct Commands ---
- id: vol_direct_min
  label: Volume Min
  kind: action
  command: "FE 03 A0 30 00 D3"
  params: []
- id: vol_direct_1
  label: Volume 1
  kind: action
  command: "FE 03 A0 30 01 D4"
  params: []
- id: vol_direct_2
  label: Volume 2
  kind: action
  command: "FE 03 A0 30 02 D5"
  params: []
- id: vol_direct_3
  label: Volume 3
  kind: action
  command: "FE 03 A0 30 03 D6"
  params: []
- id: vol_direct_4
  label: Volume 4
  kind: action
  command: "FE 03 A0 30 04 D7"
  params: []
- id: vol_direct_5
  label: Volume 5
  kind: action
  command: "FE 03 A0 30 05 D8"
  params: []
- id: vol_direct_6
  label: Volume 6
  kind: action
  command: "FE 03 A0 30 06 D9"
  params: []
- id: vol_direct_7
  label: Volume 7
  kind: action
  command: "FE 03 A0 30 07 DA"
  params: []
- id: vol_direct_8
  label: Volume 8
  kind: action
  command: "FE 03 A0 30 08 DB"
  params: []
- id: vol_direct_9
  label: Volume 9
  kind: action
  command: "FE 03 A0 30 09 DC"
  params: []
- id: vol_direct_10
  label: Volume 10
  kind: action
  command: "FE 03 A0 30 0A DD"
  params: []
- id: vol_direct_11
  label: Volume 11
  kind: action
  command: "FE 03 A0 30 0B DE"
  params: []
- id: vol_direct_12
  label: Volume 12
  kind: action
  command: "FE 03 A0 30 0C DF"
  params: []
- id: vol_direct_13
  label: Volume 13
  kind: action
  command: "FE 03 A0 30 0D E0"
  params: []
- id: vol_direct_14
  label: Volume 14
  kind: action
  command: "FE 03 A0 30 0E E1"
  params: []
- id: vol_direct_15
  label: Volume 15
  kind: action
  command: "FE 03 A0 30 0F E2"
  params: []
- id: vol_direct_16
  label: Volume 16
  kind: action
  command: "FE 03 A0 30 10 E3"
  params: []
- id: vol_direct_32
  label: Volume 32
  kind: action
  command: "FE 03 A0 30 20 F3"
  params: []
- id: vol_direct_43
  label: Volume 43
  kind: action
  command: "FE 03 A0 30 2A FD 00"
  params: []
  notes: "Exception: FD byte in payload must be escaped as FD 00 (see source Table 5A)"
- id: vol_direct_44
  label: Volume 44
  kind: action
  command: "FE 03 A0 30 2B FD 01"
  params: []
  notes: "Exception: FE byte in payload must be escaped as FD 01 (see source Table 5A)"
- id: vol_direct_48
  label: Volume 48
  kind: action
  command: "FE 03 A0 30 30 03"
  params: []
- id: vol_direct_64
  label: Volume 64
  kind: action
  command: "FE 03 A0 30 40 13"
  params: []
- id: vol_direct_80
  label: Volume 80
  kind: action
  command: "FE 03 A0 30 50 23"
  params: []
- id: vol_direct_95
  label: Volume 95
  kind: action
  command: "FE 03 A0 30 5F 32"
  params: []
- id: vol_direct_max
  label: Volume Max
  kind: action
  command: "FE 03 A0 30 60 33"
  params: []

# --- Type 0x32 Zone 2 Volume Direct Commands ---
- id: zone2_vol_direct_min
  label: Zone 2 Volume Min
  kind: action
  command: "FE 03 A0 32 00 D5"
  params: []
- id: zone2_vol_direct_1
  label: Zone 2 Volume 1
  kind: action
  command: "FE 03 A0 32 01 D6"
  params: []
- id: zone2_vol_direct_2
  label: Zone 2 Volume 2
  kind: action
  command: "FE 03 A0 32 02 D7"
  params: []
- id: zone2_vol_direct_3
  label: Zone 2 Volume 3
  kind: action
  command: "FE 03 A0 32 03 D8"
  params: []
- id: zone2_vol_direct_4
  label: Zone 2 Volume 4
  kind: action
  command: "FE 03 A0 32 04 D9"
  params: []
- id: zone2_vol_direct_5
  label: Zone 2 Volume 5
  kind: action
  command: "FE 03 A0 32 05 DA"
  params: []
- id: zone2_vol_direct_6
  label: Zone 2 Volume 6
  kind: action
  command: "FE 03 A0 32 06 DB"
  params: []
- id: zone2_vol_direct_7
  label: Zone 2 Volume 7
  kind: action
  command: "FE 03 A0 32 07 DC"
  params: []
- id: zone2_vol_direct_8
  label: Zone 2 Volume 8
  kind: action
  command: "FE 03 A0 32 08 DD"
  params: []
- id: zone2_vol_direct_9
  label: Zone 2 Volume 9
  kind: action
  command: "FE 03 A0 32 09 DE"
  params: []
- id: zone2_vol_direct_10
  label: Zone 2 Volume 10
  kind: action
  command: "FE 03 A0 32 0A DF"
  params: []
- id: zone2_vol_direct_11
  label: Zone 2 Volume 11
  kind: action
  command: "FE 03 A0 32 0B E0"
  params: []
- id: zone2_vol_direct_12
  label: Zone 2 Volume 12
  kind: action
  command: "FE 03 A0 32 0C E1"
  params: []
- id: zone2_vol_direct_13
  label: Zone 2 Volume 13
  kind: action
  command: "FE 03 A0 32 0D E2"
  params: []
- id: zone2_vol_direct_14
  label: Zone 2 Volume 14
  kind: action
  command: "FE 03 A0 32 0E E3"
  params: []
- id: zone2_vol_direct_15
  label: Zone 2 Volume 15
  kind: action
  command: "FE 03 A0 32 0F E4"
  params: []
- id: zone2_vol_direct_16
  label: Zone 2 Volume 16
  kind: action
  command: "FE 03 A0 32 10 E5"
  params: []
- id: zone2_vol_direct_32
  label: Zone 2 Volume 32
  kind: action
  command: "FE 03 A0 32 20 F5"
  params: []
- id: zone2_vol_direct_40
  label: Zone 2 Volume 40
  kind: action
  command: "FE 03 A0 32 28 FD 00"
  params: []
  notes: "Exception: FD byte in payload must be escaped as FD 00 (see source Table 6A)"
- id: zone2_vol_direct_41
  label: Zone 2 Volume 41
  kind: action
  command: "FE 03 A0 32 29 FD 01"
  params: []
  notes: "Exception: FE byte in payload must be escaped as FD 01 (see source Table 6A)"
- id: zone2_vol_direct_48
  label: Zone 2 Volume 48
  kind: action
  command: "FE 03 A0 32 30 05"
  params: []
- id: zone2_vol_direct_64
  label: Zone 2 Volume 64
  kind: action
  command: "FE 03 A0 32 40 15"
  params: []
- id: zone2_vol_direct_80
  label: Zone 2 Volume 80
  kind: action
  command: "FE 03 A0 32 50 25"
  params: []
- id: zone2_vol_direct_89
  label: Zone 2 Volume 89
  kind: action
  command: "FE 03 A0 32 5F 34"
  params: []
- id: zone2_vol_direct_max
  label: Zone 2 Volume Max
  kind: action
  command: "FE 03 A0 32 60 35"
  params: []
```

## Feedbacks
```yaml
- id: display_data
  label: Display Data (RSP->PC)
  type: bytes
  description: "23-byte display frame from device: FE 17 A0 20 {char1..char13} {flag1..flag8} {checksum}. Encodes 13 ASCII chars (main display, RDS/RBDS/RT/TP/TA/PTY/St/Tuned), decoded dot bits per char, and 8 flag bytes covering Dolby modes, input type (Optical/Coaxial/Multi/Tapem), DSP info (MPEG/dts/dts ES/THX/Sur/EX/SBL/SBR), and speaker presence (FL/C/FR/SL/SR/LFE/S/CB)."
# UNRESOLVED: response acknowledgement bytes not explicitly enumerated for every command
```

## Variables
```yaml
# UNRESOLVED: source documents commands but no named settable parameters beyond
# the discrete volume-direct keys. Treat volume as a discrete selection rather
# than a settable variable.
```

## Events
```yaml
# UNRESOLVED: source describes unsolicited Display Data frames (FE 17 A0 20...)
# from RSP->PC but does not enumerate trigger conditions. See Feedbacks.display_data.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements
```

## Notes
- **Model mismatch**: source document titled and indexed for **RSP 1098**, not RSP 975. RSP 975 compatibility unverified. Verify against RSP 975-specific documentation before deployment.
- **Serial compatibility note (source line 62)**: commands in Tables 1A, 2, 3, 4, 5, 5A, 6, 6A require units with serial numbers beyond `079/979-3411001`; earlier units need EPROM/software update.
- **Byte escaping (source line 196)**: payload bytes `FD` and `FE` must be escaped as `FD 00` and `FD 01` respectively when they appear outside the start byte position. Applies to: Power Off, Power On, Volume 43, Volume 44, Zone 2 Volume 40, Zone 2 Volume 41.
- **Frame format**: every command is exactly 6 bytes — `FE 03 A0 {Type} {Key} {Chk}` — where `Chk` is the trailing byte shown in each table row.
- **Checksum**: source presents `Chk` as a precomputed byte alongside each command; algorithm not documented in refined source. Treat checksum value as literal (copy verbatim) until algorithm confirmed.
- **Source does not specify**: cable pinout, DB9/DB25 connector, full duplex direction, AC voltage, current draw, or any electrical/firmware-version data.

<!-- UNRESOLVED: firmware version compatibility not stated in source; checksum algorithm not documented in source; RSP 975 vs RSP 1098 protocol compatibility not confirmed. -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RSP1098%20Protocol.pdf"
retrieved_at: 2026-07-01T14:26:25.147Z
last_checked_at: 2026-07-07T12:36:14.475Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:36:14.475Z
matched_actions: 153
action_count: 153
confidence: medium
summary: "All 153 spec commands verified against source tables with exact hex match; transport parameters confirmed; one-to-one complete coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document references RSP 1098 throughout. RSP 975 compatibility not confirmed in available material. Treat RSP 1098 protocol as best available proxy; verify against RSP 975 service documentation before deployment."
- "response acknowledgement bytes not explicitly enumerated for every command"
- "source documents commands but no named settable parameters beyond"
- "source describes unsolicited Display Data frames (FE 17 A0 20...)"
- "no multi-step sequences documented in source"
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source; checksum algorithm not documented in source; RSP 975 vs RSP 1098 protocol compatibility not confirmed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
