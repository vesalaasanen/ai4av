---
spec_id: admin/rotel-rsp-1098
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RSP-1098 Control Spec"
manufacturer: Rotel
model_family: RSP-1098
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RSP-1098
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RSP1098%20Protocol.pdf"
retrieved_at: 2026-05-27T13:50:44.120Z
last_checked_at: 2026-10-07T10:35:28.226Z
generated_at: 2026-10-07T10:35:28.226Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "FE 03 A0 10 53 06"
  - "FE 03 A0 10 5F 12"
  - "Zone 3 not documented in source"
  - "device sends display data (OSD) back to controller - string-based"
  - "treble/bass are adjusted via increment/decrement commands only (no absolute set)."
  - "unsolicited display data packets are documented (RSP1098→PC) but"
  - "no multi-step macro sequences documented in source."
  - "no explicit safety warnings or interlock procedures for power sequencing."
  - "query commands (PW?, MV?, etc.) not present in source — no readback of current power/volume/state"
verification:
  verdict: verified
  checked_at: 2026-10-07T10:35:28.226Z
  matched_actions: 123
  action_count: 123
  confidence: medium
  summary: "All 123 hex actions match source tables 1-6 and the 1A/5A/6A exceptions. Transport is supported. Only two alias keys are unrepresented, and the volume_set descriptions are loosely worded. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Rotel RSP-1098 Control Spec

## Summary
Rotel RSP-1098 Dolby Digital audio/video processor with multi-zone RS-232C control. Supports main zone power/volume/source, Zone 2 control, record source selection, volume direct commands, and display feedback. Serial communication at 19200 baud, 8N1, no handshake.
<!-- UNRESOLVED: Zone 3 not documented in source -->

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
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable
- routable
- levelable
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
  hex: FE 03 A0 10 0A BD

- id: power_on
  label: Power On
  kind: action
  params: []
  hex: FE 03 A0 10 4B FD 01

- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: FE 03 A0 10 4A FD 00

- id: volume_up
  label: Volume Up
  kind: action
  params: []
  hex: FE 03 A0 10 0B BE

- id: volume_down
  label: Volume Down
  kind: action
  params: []
  hex: FE 03 A0 10 0C BF

- id: mute
  label: Mute
  kind: action
  params: []
  hex: FE 03 A0 10 1E D1

- id: source_cd
  label: Source CD
  kind: action
  params: []
  hex: FE 03 A0 10 02 B5

- id: source_tuner
  label: Source Tuner
  kind: action
  params: []
  hex: FE 03 A0 10 03 B6

- id: source_tape
  label: Source Tape
  kind: action
  params: []
  hex: FE 03 A0 10 04 B7

- id: source_video1
  label: Source Video 1
  kind: action
  params: []
  hex: FE 03 A0 10 05 B8

- id: source_video2
  label: Source Video 2
  kind: action
  params: []
  hex: FE 03 A0 10 06 B9

- id: source_video3
  label: Source Video 3
  kind: action
  params: []
  hex: FE 03 A0 10 07 BA

- id: source_video4
  label: Source Video 4
  kind: action
  params: []
  hex: FE 03 A0 10 08 BB

- id: source_video5
  label: Source Video 5
  kind: action
  params: []
  hex: FE 03 A0 10 09 BC

- id: treble_up
  label: Treble Up
  kind: action
  params: []
  hex: FE 03 A0 10 0D C0

- id: treble_down
  label: Treble Down
  kind: action
  params: []
  hex: FE 03 A0 10 0E C1

- id: bass_up
  label: Bass Up
  kind: action
  params: []
  hex: FE 03 A0 10 0F C2

- id: bass_down
  label: Bass Down
  kind: action
  params: []
  hex: FE 03 A0 10 10 C3

- id: stereo
  label: Stereo
  kind: action
  params: []
  hex: FE 03 A0 10 11 C4

- id: dolby3_stereo
  label: 3 Stereo
  kind: action
  params: []
  hex: FE 03 A0 10 12 C5

- id: dolby_pro_logic
  label: Dolby Pro Logic
  kind: action
  params: []
  hex: FE 03 A0 10 13 C6

- id: dolby_pro_logic_cinema
  label: PLII Cinema
  kind: action
  params: []
  hex: FE 03 A0 10 5D 10

- id: dolby_pro_logic_music
  label: PLII Music
  kind: action
  params: []
  hex: FE 03 A0 10 5E 11

- id: plii_panorama
  label: PLII Panorama
  kind: action
  params: []
  hex: FE 03 A0 10 62 15

- id: plii_dimension_up
  label: PLII Dimension Up
  kind: action
  params:
    - name: value
      type: integer
      description: Dimension level 0-6
  hex: FE 03 A0 10 63 16

- id: plii_dimension_down
  label: PLII Dimension Down
  kind: action
  params:
    - name: value
      type: integer
      description: Dimension level 0-6
  hex: FE 03 A0 10 64 17

- id: plii_center_width_up
  label: PLII Center Width Up
  kind: action
  params:
    - name: value
      type: integer
      description: Center width level 0-7
  hex: FE 03 A0 10 65 18

- id: plii_center_width_down
  label: PLII Center Width Down
  kind: action
  params:
    - name: value
      type: integer
      description: Center width level 0-7
  hex: FE 03 A0 10 66 19

- id: dsp
  label: DSP Music
  kind: action
  params: []
  hex: FE 03 A0 10 14 C7

- id: multi_input
  label: Multi Input
  kind: action
  params: []
  hex: FE 03 A0 10 15 C8

- id: dynamic_range
  label: Dynamic Range
  kind: action
  params: []
  hex: FE 03 A0 10 16 C9

- id: record
  label: Record
  kind: action
  params: []
  hex: FE 03 A0 10 17 CA

- id: osd_menu
  label: OSD Menu
  kind: action
  params: []
  hex: FE 03 A0 10 18 CB

- id: osd_enter
  label: OSD Enter
  kind: action
  params: []
  hex: FE 03 A0 10 19 CC

- id: osd_right
  label: OSD Right(+)
  kind: action
  params: []
  hex: FE 03 A0 10 1A CD

- id: osd_left
  label: OSD Left(-)
  kind: action
  params: []
  hex: FE 03 A0 10 1B CE

- id: osd_up
  label: OSD Up
  kind: action
  params: []
  hex: FE 03 A0 10 1C CF

- id: osd_down
  label: OSD Down / Dynamic
  kind: action
  params: []
  hex: FE 03 A0 10 1D D0

- id: digital_in_select
  label: Digital Input Select
  kind: action
  params: []
  hex: FE 03 A0 10 1F D2

- id: surround_next
  label: Surround+ Next Surround Mode
  kind: action
  params: []
  hex: FE 03 A0 10 22 D5

- id: zone_main
  label: Zone 2 / Main
  kind: action
  params: []
  hex: FE 03 A0 10 23 D6

- id: center_channel
  label: Center
  kind: action
  params: []
  hex: FE 03 A0 10 4C FF

- id: subwoofer
  label: Subwoofer
  kind: action
  params: []
  hex: FE 03 A0 10 4D 00

- id: surround_channel
  label: Surround
  kind: action
  params: []
  hex: FE 03 A0 10 4E 01

- id: cinema_eq
  label: Filter(EQ) Cinema EQ
  kind: action
  params: []
  hex: FE 03 A0 10 4F 02

- id: fl_display_toggle
  label: FL On/Off Display Toggle
  kind: action
  params: []
  hex: FE 03 A0 10 52 05

- id: dts_neo6
  label: dts Neo:6
  kind: action
  params: []
  hex: FE 03 A0 10 54 07

- id: dts_neo6_music
  label: dts Neo:6 Music
  kind: action
  params: []
  hex: FE 03 A0 10 60 13

- id: dts_neo6_cinema
  label: dts Neo:6 Cinema
  kind: action
  params: []
  hex: FE 03 A0 10 61 14

- id: dd_ex_on_off
  label: DD EX On/Off
  kind: action
  params: []
  hex: FE 03 A0 10 68 1B

- id: plii_game
  label: PLII Game
  kind: action
  params: []
  hex: FE 03 A0 10 74 27

- id: tone_controls
  label: Shift(Treble Bass) Tone Controls
  kind: action
  params: []
  hex: FE 03 A0 10 67 1A

- id: display_refresh
  label: Display Refresh
  kind: action
  params: []
  hex: FE 03 A0 10 FF B2

- id: music1
  label: Music 1
  kind: action
  params: []
  hex: FE 03 A0 10 57 0A

- id: music2
  label: Music 2
  kind: action
  params: []
  hex: FE 03 A0 10 58 0B

- id: music3
  label: Music 3
  kind: action
  params: []
  hex: FE 03 A0 10 59 0C

- id: music4
  label: Music 4
  kind: action
  params: []
  hex: FE 03 A0 10 5A 0D

- id: 5ch_stereo
  label: 5Ch Stereo
  kind: action
  params: []
  hex: FE 03 A0 10 5B 0E

- id: 7ch_stereo
  label: 7Ch Stereo
  kind: action
  params: []
  hex: FE 03 A0 10 5C 0F

- id: rmc_vol_up
  label: RMC Vol+ Remote Volume Up
  kind: action
  params: []
  hex: FE 03 A0 10 00 B3

- id: rmc_vol_down
  label: RMC Vol- Remote Volume Down
  kind: action
  params: []
  hex: FE 03 A0 10 01 B4

# Table 2: Type 14 Main Zone (discrete)
- id: main_zone_cd
  label: Main Zone Source CD
  kind: action
  params: []
  hex: FE 03 A0 14 02 B9

- id: main_zone_tuner
  label: Main Zone Source Tuner
  kind: action
  params: []
  hex: FE 03 A0 14 03 BA

- id: main_zone_tape
  label: Main Zone Source Tape
  kind: action
  params: []
  hex: FE 03 A0 14 04 BB

- id: main_zone_video1
  label: Main Zone Source Video 1
  kind: action
  params: []
  hex: FE 03 A0 14 05 BC

- id: main_zone_video2
  label: Main Zone Source Video 2
  kind: action
  params: []
  hex: FE 03 A0 14 06 BD

- id: main_zone_video3
  label: Main Zone Source Video 3
  kind: action
  params: []
  hex: FE 03 A0 14 07 BE

- id: main_zone_video4
  label: Main Zone Source Video 4
  kind: action
  params: []
  hex: FE 03 A0 14 08 BF

- id: main_zone_video5
  label: Main Zone Source Video 5
  kind: action
  params: []
  hex: FE 03 A0 14 09 C0

- id: main_zone_power_toggle
  label: Main Zone Power Toggle
  kind: action
  params: []
  hex: FE 03 A0 14 0A C1

- id: main_zone_mute
  label: Main Zone Mute
  kind: action
  params: []
  hex: FE 03 A0 14 1E D5

- id: main_zone_mute_on
  label: Main Zone Mute On
  kind: action
  params: []
  hex: FE 03 A0 14 6C 23

- id: main_zone_mute_off
  label: Main Zone Mute Off
  kind: action
  params: []
  hex: FE 03 A0 14 6D 24

- id: main_zone_rmc_vol_up
  label: RMC Vol+ Main Zone
  kind: action
  params: []
  hex: FE 03 A0 14 00 B7

- id: main_zone_rmc_vol_down
  label: RMC Vol- Main Zone
  kind: action
  params: []
  hex: FE 03 A0 14 01 B8

# Table 3: Type 15 Record Source
- id: record_source_cd
  label: Record Source CD
  kind: action
  params: []
  hex: FE 03 A0 15 02 BA

- id: record_source_tuner
  label: Record Source Tuner
  kind: action
  params: []
  hex: FE 03 A0 15 03 BB

- id: record_source_tape
  label: Record Source Tape
  kind: action
  params: []
  hex: FE 03 A0 15 04 BC

- id: record_source_video1
  label: Record Source Video 1
  kind: action
  params: []
  hex: FE 03 A0 15 05 BD

- id: record_source_video2
  label: Record Source Video 2
  kind: action
  params: []
  hex: FE 03 A0 15 06 BE

- id: record_source_video3
  label: Record Source Video 3
  kind: action
  params: []
  hex: FE 03 A0 15 07 BF

- id: record_source_video4
  label: Record Source Video 4
  kind: action
  params: []
  hex: FE 03 A0 15 08 C0

- id: record_source_video5
  label: Record Source Video 5
  kind: action
  params: []
  hex: FE 03 A0 15 09 C1

- id: record_source_select
  label: Record Source Select
  kind: action
  params: []
  hex: FE 03 A0 15 6B 23

# Table 4: Type 16 Zone 2
- id: zone2_vol_up
  label: Zone 2 Volume Up
  kind: action
  params: []
  hex: FE 03 A0 16 00 B9

- id: zone2_vol_down
  label: Zone 2 Volume Down
  kind: action
  params: []
  hex: FE 03 A0 16 01 BA

- id: zone2_source_cd
  label: Zone 2 Source CD
  kind: action
  params: []
  hex: FE 03 A0 16 02 BB

- id: zone2_source_tuner
  label: Zone 2 Source Tuner
  kind: action
  params: []
  hex: FE 03 A0 16 03 BC

- id: zone2_source_tape
  label: Zone 2 Source Tape
  kind: action
  params: []
  hex: FE 03 A0 16 04 BD

- id: zone2_source_video1
  label: Zone 2 Source Video 1
  kind: action
  params: []
  hex: FE 03 A0 16 05 BE

- id: zone2_source_video2
  label: Zone 2 Source Video 2
  kind: action
  params: []
  hex: FE 03 A0 16 06 BF

- id: zone2_source_video3
  label: Zone 2 Source Video 3
  kind: action
  params: []
  hex: FE 03 A0 16 07 C0

- id: zone2_source_video4
  label: Zone 2 Source Video 4
  kind: action
  params: []
  hex: FE 03 A0 16 08 C1

- id: zone2_source_video5
  label: Zone 2 Source Video 5
  kind: action
  params: []
  hex: FE 03 A0 16 09 C2

- id: zone2_power_toggle
  label: Zone 2 Power Toggle
  kind: action
  params: []
  hex: FE 03 A0 16 0A C3

- id: zone2_mute
  label: Zone 2 Mute
  kind: action
  params: []
  hex: FE 03 A0 16 1E D7

- id: zone2_power_off
  label: Zone 2 Power Off
  kind: action
  params: []
  hex: FE 03 A0 16 4A 03

- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  params: []
  hex: FE 03 A0 16 4B 04

- id: zone2_source_follow_main
  label: Zone 2 Source Follow Main
  kind: action
  params: []
  hex: FE 03 A0 16 6B 24

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []
  hex: FE 03 A0 16 6C 25

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []
  hex: FE 03 A0 16 6D 26

# Table 5: Type 30 Volume Direct (Main Zone)
- id: volume_min
  label: Volume Min
  kind: action
  params: []
  hex: FE 03 A0 30 00 D3

- id: volume_set
  label: Volume Direct Set
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 1-95 (max). Values 0, 16, 32, 48, 64, 80, 95, 96 are direct commands; other values use 2-byte key+volume pattern.
  hex_prefix: FE 03 A0 30

- id: volume_16
  label: Volume 16
  kind: action
  params: []
  hex: FE 03 A0 30 10 E3

- id: volume_32
  label: Volume 32
  kind: action
  params: []
  hex: FE 03 A0 30 20 F3

- id: volume_43
  label: Volume 43
  kind: action
  params: []
  hex: FE 03 A0 30 2A FD 00  # byte-stuff exception: FD→FD 00, FE→FD 01

- id: volume_44
  label: Volume 44
  kind: action
  params: []
  hex: FE 03 A0 30 2B FD 01  # byte-stuff exception

- id: volume_48
  label: Volume 48
  kind: action
  params: []
  hex: FE 03 A0 30 30 03

- id: volume_64
  label: Volume 64
  kind: action
  params: []
  hex: FE 03 A0 30 40 13

- id: volume_80
  label: Volume 80
  kind: action
  params: []
  hex: FE 03 A0 30 50 23

- id: volume_95
  label: Volume 95
  kind: action
  params: []
  hex: FE 03 A0 30 5F 32

- id: volume_max
  label: Volume Max
  kind: action
  params: []
  hex: FE 03 A0 30 60 33

# Table 6: Type 32 Zone 2 Volume Direct
- id: zone2_volume_min
  label: Zone 2 Volume Min
  kind: action
  params: []
  hex: FE 03 A0 32 00 D5

- id: zone2_volume_set
  label: Zone 2 Volume Direct Set
  kind: action
  params:
    - name: level
      type: integer
      description: Zone 2 volume level 1-89 (max)
  hex_prefix: FE 03 A0 32

- id: zone2_volume_16
  label: Zone 2 Volume 16
  kind: action
  params: []
  hex: FE 03 A0 32 10 E5

- id: zone2_volume_32
  label: Zone 2 Volume 32
  kind: action
  params: []
  hex: FE 03 A0 32 20 F5

- id: zone2_volume_40
  label: Zone 2 Volume 40
  kind: action
  params: []
  hex: FE 03 A0 32 28 FD 00  # byte-stuff exception

- id: zone2_volume_41
  label: Zone 2 Volume 41
  kind: action
  params: []
  hex: FE 03 A0 32 29 FD 01  # byte-stuff exception

- id: zone2_volume_48
  label: Zone 2 Volume 48
  kind: action
  params: []
  hex: FE 03 A0 32 30 05

- id: zone2_volume_64
  label: Zone 2 Volume 64
  kind: action
  params: []
  hex: FE 03 A0 32 40 15

- id: zone2_volume_80
  label: Zone 2 Volume 80
  kind: action
  params: []
  hex: FE 03 A0 32 50 25

- id: zone2_volume_89
  label: Zone 2 Volume 89
  kind: action
  params: []
  hex: FE 03 A0 32 5F 34

- id: zone2_volume_max
  label: Zone 2 Volume Max
  kind: action
  params: []
  hex: FE 03 A0 32 60 35
```

## Feedbacks
```yaml
# UNRESOLVED: device sends display data (OSD) back to controller - string-based
# display packets with 0xFE start byte, 0x17 count, 0xA0 device ID, 0x20 type,
# but no full decode of flag bits provided in source. Feedback section not
# populated due to incomplete flag decode documentation.
```

## Variables
```yaml
# UNRESOLVED: treble/bass are adjusted via increment/decrement commands only (no absolute set).
# No query commands returning current treble/bass values documented.
```

## Events
```yaml
# UNRESOLVED: unsolicited display data packets are documented (RSP1098→PC) but
# detailed flag decode not provided.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Firmware note: some RS232 commands only available on units with serial #s beyond 079/979-3411001. Units before this serial require software update and EPROM.
# UNRESOLVED: no explicit safety warnings or interlock procedures for power sequencing.
```

## Notes
Device supports two-byte byte-stuffing for any command string containing 0xFE or 0xFD: FD→FD 00, FE→FD 01. Used for Power On (FE→FD 01), Power Off (FD→FD 00 for checksum byte), Volume 43/44, Zone 2 Volume 40/41.

Main zone discrete commands (Type 14) recommended for multi-zone installations to avoid zone conflicts.

<!-- UNRESOLVED: query commands (PW?, MV?, etc.) not present in source — no readback of current power/volume/state -->
<!-- UNRESOLVED:Zone 3 not documented in source -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RSP1098%20Protocol.pdf"
retrieved_at: 2026-05-27T13:50:44.120Z
last_checked_at: 2026-10-07T10:35:28.226Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T10:35:28.226Z
matched_actions: 123
action_count: 123
confidence: medium
summary: "All 123 hex actions match source tables 1-6 and the 1A/5A/6A exceptions. Transport is supported. Only two alias keys are unrepresented, and the volume_set descriptions are loosely worded. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "FE 03 A0 10 53 06"
- "FE 03 A0 10 5F 12"
- "Zone 3 not documented in source"
- "device sends display data (OSD) back to controller - string-based"
- "treble/bass are adjusted via increment/decrement commands only (no absolute set)."
- "unsolicited display data packets are documented (RSP1098→PC) but"
- "no multi-step macro sequences documented in source."
- "no explicit safety warnings or interlock procedures for power sequencing."
- "query commands (PW?, MV?, etc.) not present in source — no readback of current power/volume/state"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
