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
  - "https://rotel.com/sites/default/files/product/rs232/RSP1068%20Protocol.pdf"
retrieved_at: 2026-07-01T14:24:48.768Z
last_checked_at: 2026-07-07T12:32:44.914Z
generated_at: 2026-07-07T12:32:44.914Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is titled RSP-1068; entity bootstrap requests RSP-966. Model coverage mismatch flagged for operator review."
  - "no named variable parameters exposed in source. Volume, tone,"
  - "no multi-step sequences documented in source."
  - "no safety warnings, interlocks, or power-on sequencing requirements"
  - "firmware version compatibility not stated in source"
  - "checksum algorithm not stated in source (XOR-of-body inferred from Rotel convention, not from this document)"
verification:
  verdict: verified
  checked_at: 2026-07-07T12:32:44.914Z
  matched_actions: 105
  action_count: 105
  confidence: medium
  summary: "All 105 spec actions matched verbatim against source command tables; transport parameters (19200 baud, 8 data bits, no parity, 1 stop bit, no flow control) verified in source; full bidirectional coverage with Tables 1-6. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Rotel RSP-1068 Control Spec

## Summary
HEX-based RS-232C control protocol for the Rotel RSP-1068 surround sound processor. Commands are 6-byte frames (Start/Count/DeviceID/Type/Key/Checksum) sent at 19200 baud, with feedback strings mirroring the front-panel display.

<!-- UNRESOLVED: source document is titled RSP-1068; entity bootstrap requests RSP-966. Model coverage mismatch flagged for operator review. -->

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
- powerable  # inferred from power on/off/toggle commands
- routable  # inferred from source selection commands (main zone, record, zone 2)
- queryable  # inferred from front-display feedback string mirroring state
- levelable  # inferred from volume up/down/direct and tone control commands
```

## Actions
```yaml
# Table 1 - Type 10 Primary Commands (Type byte 0x10)

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "FE 03 A1 10 0A BE"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "FE 03 A1 10 4A FD 01"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "FE 03 A1 10 4B FF"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "FE 03 A1 10 0B BF"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "FE 03 A1 10 0C C0"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "FE 03 A1 10 1E D2"
  params: []

- id: source_cd
  label: Source CD
  kind: action
  command: "FE 03 A1 10 02 B6"
  params: []

- id: source_tuner
  label: Source Tuner
  kind: action
  command: "FE 03 A1 10 03 B7"
  params: []

- id: source_tape
  label: Source Tape
  kind: action
  command: "FE 03 A1 10 04 B8"
  params: []

- id: source_video_1
  label: Source Video 1
  kind: action
  command: "FE 03 A1 10 05 B9"
  params: []

- id: source_video_2
  label: Source Video 2
  kind: action
  command: "FE 03 A1 10 06 BA"
  params: []

- id: source_video_3
  label: Source Video 3
  kind: action
  command: "FE 03 A1 10 07 BB"
  params: []

- id: source_video_4
  label: Source Video 4
  kind: action
  command: "FE 03 A1 10 08 BC"
  params: []

- id: source_video_5
  label: Source Video 5
  kind: action
  command: "FE 03 A1 10 09 BD"
  params: []

- id: source_multi_input
  label: Source Multi Input
  kind: action
  command: "FE 03 A1 10 15 C9"
  params: []

- id: surround_stereo
  label: Stereo
  kind: action
  command: "FE 03 A1 10 11 C5"
  params: []

- id: surround_dolby3_stereo
  label: Dolby 3 Stereo
  kind: action
  command: "FE 03 A1 10 12 C6"
  params: []

- id: surround_dolby_pro_logic
  label: Dolby Pro Logic
  kind: action
  command: "FE 03 A1 10 13 C7"
  params: []

- id: dsp_music_mode_toggle
  label: DSP Music Mode Toggle
  kind: action
  command: "FE 03 A1 10 14 C8"
  params: []

- id: dolby3_pl_toggle
  label: Dolby 3 Stereo / Pro Logic Toggle
  kind: action
  command: "FE 03 A1 10 53 07"
  params: []

- id: dts_neo6_music_cinema_toggle
  label: dts Neo:6 Music/Cinema Toggle
  kind: action
  command: "FE 03 A1 10 54 08"
  params: []

- id: music_1
  label: Music 1
  kind: action
  command: "FE 03 A1 10 57 0B"
  params: []

- id: music_2
  label: Music 2
  kind: action
  command: "FE 03 A1 10 58 0C"
  params: []

- id: music_3
  label: Music 3
  kind: action
  command: "FE 03 A1 10 59 0D"
  params: []

- id: music_4
  label: Music 4
  kind: action
  command: "FE 03 A1 10 5A 0E"
  params: []

- id: surround_5ch_stereo
  label: 5 Channel Stereo
  kind: action
  command: "FE 03 A1 10 5B 0F"
  params: []

- id: surround_7ch_stereo
  label: 7 Channel Stereo
  kind: action
  command: "FE 03 A1 10 5C 10"
  params: []

- id: dolby_plii_cinema
  label: Dolby PLII Cinema
  kind: action
  command: "FE 03 A1 10 5D 11"
  params: []

- id: dolby_plii_music
  label: Dolby PLII Music
  kind: action
  command: "FE 03 A1 10 5E 12"
  params: []

- id: dolby_plii_game
  label: Dolby PLII Game
  kind: action
  command: "FE 03 A1 10 74 28"
  params: []

- id: dolby_pro_logic_5f
  label: Dolby Pro Logic
  kind: action
  command: "FE 03 A1 10 5F 13"
  params: []

- id: dts_neo6_music
  label: dts Neo:6 Music
  kind: action
  command: "FE 03 A1 10 60 14"
  params: []

- id: dts_neo6_cinema
  label: dts Neo:6 Cinema
  kind: action
  command: "FE 03 A1 10 61 15"
  params: []

- id: plii_panorama_toggle
  label: PLII Panorama Toggle
  kind: action
  command: "FE 03 A1 10 62 16"
  params: []

- id: plii_dimension_up
  label: PLII Dimension Up
  kind: action
  command: "FE 03 A1 10 63 17"
  params: []

- id: plii_dimension_down
  label: PLII Dimension Down
  kind: action
  command: "FE 03 A1 10 64 18"
  params: []

- id: plii_center_width_up
  label: PLII Center Width Up
  kind: action
  command: "FE 03 A1 10 65 19"
  params: []

- id: plii_center_width_down
  label: PLII Center Width Down
  kind: action
  command: "FE 03 A1 10 66 1A"
  params: []

- id: dolby_digital_ex_toggle
  label: Dolby Digital EX Toggle
  kind: action
  command: "FE 03 A1 10 68 1C"
  params: []

- id: next_surround_mode
  label: Next Surround Mode
  kind: action
  command: "FE 03 A1 10 22 D6"
  params: []

- id: treble_up
  label: Treble Up
  kind: action
  command: "FE 03 A1 10 0D C1"
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  command: "FE 03 A1 10 0E C2"
  params: []

- id: bass_up
  label: Bass Up
  kind: action
  command: "FE 03 A1 10 0F C3"
  params: []

- id: bass_down
  label: Bass Down
  kind: action
  command: "FE 03 A1 10 10 C4"
  params: []

- id: tone_control_select
  label: Tone Control Select
  kind: action
  command: "FE 03 A1 10 67 1B"
  params: []

- id: osd_menu
  label: OSD Menu
  kind: action
  command: "FE 03 A1 10 18 CC"
  params: []

- id: osd_enter
  label: Enter
  kind: action
  command: "FE 03 A1 10 19 CD"
  params: []

- id: osd_cursor_right
  label: Cursor Right
  kind: action
  command: "FE 03 A1 10 1A CE"
  params: []

- id: osd_cursor_left
  label: Cursor Left
  kind: action
  command: "FE 03 A1 10 1B CF"
  params: []

- id: osd_cursor_up
  label: Cursor Up
  kind: action
  command: "FE 03 A1 10 1C D0"
  params: []

- id: osd_cursor_down
  label: Cursor Down
  kind: action
  command: "FE 03 A1 10 1D D1"
  params: []

- id: record_function_select
  label: Record Function Select
  kind: action
  command: "FE 03 A1 10 17 CB"
  params: []

- id: dynamic_range
  label: Dynamic Range
  kind: action
  command: "FE 03 A1 10 16 CA"
  params: []

- id: digital_input_select
  label: Digital Input Select
  kind: action
  command: "FE 03 A1 10 1F D3"
  params: []

- id: zone2_main_toggle
  label: Zone 2 / Main Toggle
  kind: action
  command: "FE 03 A1 10 23 D7"
  params: []

- id: temp_center_trim
  label: Temporary Center Trim
  kind: action
  command: "FE 03 A1 10 4C 00"
  params: []

- id: temp_subwoofer_trim
  label: Temporary Subwoofer Trim
  kind: action
  command: "FE 03 A1 10 4D 01"
  params: []

- id: temp_surround_trim
  label: Temporary Surround Trim
  kind: action
  command: "FE 03 A1 10 4E 02"
  params: []

- id: cinema_eq_toggle
  label: Cinema EQ Toggle
  kind: action
  command: "FE 03 A1 10 4F 03"
  params: []

- id: front_display_on_off
  label: Front Display On/Off
  kind: action
  command: "FE 03 A1 10 52 06"
  params: []

- id: display_refresh
  label: Display Refresh
  kind: action
  command: "FE 03 A1 10 FF B3"
  params: []

# Table 2 - Type 14 Main Zone Commands (Type byte 0x14)

- id: main_zone_power_toggle
  label: Main Zone Power Toggle
  kind: action
  command: "FE 03 A1 14 0A C2"
  params: []

- id: main_zone_power_off
  label: Main Zone Power Off
  kind: action
  command: "FE 03 A1 14 4A 02"
  params: []

- id: main_zone_power_on
  label: Main Zone Power On
  kind: action
  command: "FE 03 A1 14 4B 03"
  params: []

- id: main_zone_volume_up
  label: Main Zone Volume Up
  kind: action
  command: "FE 03 A1 14 00 B8"
  params: []

- id: main_zone_volume_down
  label: Main Zone Volume Down
  kind: action
  command: "FE 03 A1 14 01 B9"
  params: []

- id: main_zone_mute_toggle
  label: Main Zone Mute Toggle
  kind: action
  command: "FE 03 A1 14 1E D6"
  params: []

- id: main_zone_mute_on
  label: Main Zone Mute On
  kind: action
  command: "FE 03 A1 14 6C 24"
  params: []

- id: main_zone_mute_off
  label: Main Zone Mute Off
  kind: action
  command: "FE 03 A1 14 6D 25"
  params: []

- id: main_zone_source_cd
  label: Main Zone Source CD
  kind: action
  command: "FE 03 A1 14 02 BA"
  params: []

- id: main_zone_source_tuner
  label: Main Zone Source Tuner
  kind: action
  command: "FE 03 A1 14 03 BB"
  params: []

- id: main_zone_source_tape
  label: Main Zone Source Tape
  kind: action
  command: "FE 03 A1 14 04 BC"
  params: []

- id: main_zone_source_video_1
  label: Main Zone Source Video 1
  kind: action
  command: "FE 03 A1 14 05 BD"
  params: []

- id: main_zone_source_video_2
  label: Main Zone Source Video 2
  kind: action
  command: "FE 03 A1 14 06 BE"
  params: []

- id: main_zone_source_video_3
  label: Main Zone Source Video 3
  kind: action
  command: "FE 03 A1 14 07 BF"
  params: []

- id: main_zone_source_video_4
  label: Main Zone Source Video 4
  kind: action
  command: "FE 03 A1 14 08 C0"
  params: []

- id: main_zone_source_video_5
  label: Main Zone Source Video 5
  kind: action
  command: "FE 03 A1 14 09 C1"
  params: []

# Table 3 - Type 15 Record Source Commands (Type byte 0x15)

- id: record_source_cd
  label: Record Source CD
  kind: action
  command: "FE 03 A1 15 02 BB"
  params: []

- id: record_source_tuner
  label: Record Source Tuner
  kind: action
  command: "FE 03 A1 15 03 BC"
  params: []

- id: record_source_tape
  label: Record Source Tape
  kind: action
  command: "FE 03 A1 15 04 BD"
  params: []

- id: record_source_video_1
  label: Record Source Video 1
  kind: action
  command: "FE 03 A1 15 05 BE"
  params: []

- id: record_source_video_2
  label: Record Source Video 2
  kind: action
  command: "FE 03 A1 15 06 BF"
  params: []

- id: record_source_video_3
  label: Record Source Video 3
  kind: action
  command: "FE 03 A1 15 07 C0"
  params: []

- id: record_source_video_4
  label: Record Source Video 4
  kind: action
  command: "FE 03 A1 15 08 C1"
  params: []

- id: record_source_video_5
  label: Record Source Video 5
  kind: action
  command: "FE 03 A1 15 09 C2"
  params: []

- id: record_follow_main
  label: Record Follow Main Zone Source
  kind: action
  command: "FE 03 A1 15 6B 24"
  params: []

# Table 4 - Type 16 Zone 2 Commands (Type byte 0x16)

- id: zone2_power_toggle
  label: Zone 2 Power Toggle
  kind: action
  command: "FE 03 A1 16 0A C4"
  params: []

- id: zone2_power_off
  label: Zone 2 Power Off
  kind: action
  command: "FE 03 A1 16 4A 04"
  params: []

- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "FE 03 A1 16 4B 05"
  params: []

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: "FE 03 A1 16 00 BA"
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: "FE 03 A1 16 01 BB"
  params: []

- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  command: "FE 03 A1 16 1E D8"
  params: []

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "FE 03 A1 16 6C 26"
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "FE 03 A1 16 6D 27"
  params: []

- id: zone2_source_cd
  label: Zone 2 Source CD
  kind: action
  command: "FE 03 A1 16 02 BC"
  params: []

- id: zone2_source_tuner
  label: Zone 2 Source Tuner
  kind: action
  command: "FE 03 A1 16 03 BD"
  params: []

- id: zone2_source_tape
  label: Zone 2 Source Tape
  kind: action
  command: "FE 03 A1 16 04 BE"
  params: []

- id: zone2_source_video_1
  label: Zone 2 Source Video 1
  kind: action
  command: "FE 03 A1 16 05 BF"
  params: []

- id: zone2_source_video_2
  label: Zone 2 Source Video 2
  kind: action
  command: "FE 03 A1 16 06 C0"
  params: []

- id: zone2_source_video_3
  label: Zone 2 Source Video 3
  kind: action
  command: "FE 03 A1 16 07 C1"
  params: []

- id: zone2_source_video_4
  label: Zone 2 Source Video 4
  kind: action
  command: "FE 03 A1 16 08 C2"
  params: []

- id: zone2_source_video_5
  label: Zone 2 Source Video 5
  kind: action
  command: "FE 03 A1 16 09 C3"
  params: []

- id: zone2_follow_main
  label: Zone 2 Follow Main Zone Source
  kind: action
  command: "FE 03 A1 16 6B 25"
  params: []

# Table 5 - Type 30 Volume Direct Commands (Type byte 0x30)
# Source documents range 0x00-0x60 as a continuous scale; only sample values listed.
# Implemented as a single parameterized action.

- id: volume_set
  label: Volume Set (Main Zone)
  kind: action
  command: "FE 03 A1 30 {level} {checksum}"
  params:
    - name: level
      type: integer
      description: Volume level (hex 0x00 = Min, 0x60 = Max; range 0x00-0x60)
    - name: checksum
      type: string
      description: Computed checksum byte (see Notes for algorithm). For values whose raw low byte equals 0xFD or 0xFE, source requires Meta Encoding (FD 00 for FD, FD 01 for FE) - checksum byte itself may need escaping.

# Table 6 - Type 32 Zone 2 Volume Direct Commands (Type byte 0x32)

- id: zone2_volume_set
  label: Volume Set (Zone 2)
  kind: action
  command: "FE 03 A1 32 {level} {checksum}"
  params:
    - name: level
      type: integer
      description: Volume level (hex 0x00 = Min, 0x60 = Max; range 0x00-0x60)
    - name: checksum
      type: string
      description: Computed checksum byte. Meta Encoding rules apply for raw bytes equal to 0xFD or 0xFE.
```

## Feedbacks
```yaml
# Standard Response String Format (Section 2 of source):
# FE 31 A1 20 [Char1..Char42] [Flag1..Flag5] [Checksum]
#
# Char1-Char42: ASCII representation of the 2-line front display
#   (source input, volume, surround mode, etc.)
# Flag1-Flag5: front-panel icon state; see Flag1-Flag5 table in source.
# Display On/Off status encoded in 2 bits of Flag3.
#
# Any front-display status change causes the unit to emit an unsolicited
# feedback string mirroring that change. No dedicated query command exists
# in the source - feedback is push-only.

- id: display_text
  type: string
  description: ASCII text from the unit's 2-line front display (42 bytes), including source, volume, and surround mode.

- id: display_flags
  type: object
  description: 5-byte front-panel icon flag bitmap (Flag1-Flag5). See source Section 2 for per-bit icon mapping.
```

## Variables
```yaml
# UNRESOLVED: no named variable parameters exposed in source. Volume, tone,
# source selection, etc. are all driven via discrete actions (UP/DOWN/direct-set),
# not via read/write variable protocol messages.
```

## Events
```yaml
# The unit pushes unsolicited feedback strings mirroring any front-display
# change. No event subscription handshake is documented.

- id: display_change
  description: Emitted whenever the front display status changes. Payload is the standard response string (FE 31 A1 20 ... Checksum).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements
# stated in the source document.
```

## Notes

**Model mismatch:** Operator's entity bootstrap requested `rotel_rsp_966`, but the source document title is `Rotel RSP-1068 RS232 HEX Protocol`. All commands, flags, and feedback format in this spec describe the RSP-1068. Confirm with operator whether the RSP-966 shares this protocol family before merging.

**Frame format:** Every command is exactly 6 bytes: `FE 03 A1 [Type] [Key] [Checksum]`. The Count byte (`0x03`) covers ID + Type + Key only; it does NOT include Start or Checksum.

**Checksum:** Source documents only the byte position, not the algorithm. Standard Rotel convention is to compute the XOR of ID + Type + Key bytes (a single-byte XOR sum), but this is **inferred**, not stated in the source.

**Meta Encoding:** Any byte in the body equal to `0xFD` must be escaped as `FD 00`, and any byte equal to `0xFE` must be escaped as `FD 01`. Commands affected are highlighted red in the source; examples in this spec preserve the escaped form (`FE 03 A1 10 4A FD 01` for Power Off, `FE 03 A1 30 2A FD 01` for Volume 42, etc.). Escape applies to any byte including Checksum.

**No CR/LF:** Source explicitly states not to append carriage returns or line feeds after commands.

**Volume direct range:** Documented range is `0x00`–`0x60` (0–96). Source lists sample values only; full 97-step ladder implied but not enumerated.

**Feedback flags:** Flag3 bits `DisplayMode0` and `DisplayMode1` encode front-display On/Off state. Full 5×8 bit mapping is in source Section 2.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: checksum algorithm not stated in source (XOR-of-body inferred from Rotel convention, not from this document) -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RSP1068%20Protocol.pdf"
retrieved_at: 2026-07-01T14:24:48.768Z
last_checked_at: 2026-07-07T12:32:44.914Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:32:44.914Z
matched_actions: 105
action_count: 105
confidence: medium
summary: "All 105 spec actions matched verbatim against source command tables; transport parameters (19200 baud, 8 data bits, no parity, 1 stop bit, no flow control) verified in source; full bidirectional coverage with Tables 1-6. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is titled RSP-1068; entity bootstrap requests RSP-966. Model coverage mismatch flagged for operator review."
- "no named variable parameters exposed in source. Volume, tone,"
- "no multi-step sequences documented in source."
- "no safety warnings, interlocks, or power-on sequencing requirements"
- "firmware version compatibility not stated in source"
- "checksum algorithm not stated in source (XOR-of-body inferred from Rotel convention, not from this document)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
