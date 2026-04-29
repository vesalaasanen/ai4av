---
schema_version: ai4av-public-spec-v1
device_id: rotel/rsx-1057
entity_id: rotel_rsx_1_series
spec_id: admin/rotel-rsx_1_series
revision: 1
author: admin
title: "Rotel RSX-1057 Control Spec"
status: published
manufacturer: Rotel
manufacturer_key: rotel
model_family: RSX-1057
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RSX-1057
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: rotel_rsx_1_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:24:47.493Z
retrieved_at: 2026-04-23T08:24:47.493Z
last_checked_at: 2026-04-23T08:24:47.493Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:24:47.493Z
  matched_actions: 151
  action_count: 151
  confidence: high
  summary: "All 151 spec actions matched to hex commands in source; transport parameters (19200 baud, 8 bits, no parity, 1 stop) verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Rotel RSX-1057 Control Spec

## Summary
Rotel RSX-1057 multi-zone A/V receiver. Serial RS-232 control at 19200 baud, HEX-based protocol. Commands for power, volume, source selection, surround mode, tone control, tuner, OSD navigation, and dual-zone operation. Feedback mirrors front-panel display as ASCII + flag bytes.

<!-- UNRESOLVED: device family coverage — source documents RSX-1057 only; other RSX-1 Series models unconfirmed -->

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
- powerable
- levelable
- routable
- queryable
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_on
  label: Power On
  kind: action
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []
- id: source_cd
  label: Source CD
  kind: action
  params: []
- id: source_tuner
  label: Source Tuner
  kind: action
  params: []
- id: source_tape
  label: Source Tape
  kind: action
  params: []
- id: source_video_1
  label: Source Video 1
  kind: action
  params: []
- id: source_video_2
  label: Source Video 2
  kind: action
  params: []
- id: source_video_3
  label: Source Video 3
  kind: action
  params: []
- id: source_video_4
  label: Source Video 4
  kind: action
  params: []
- id: source_video_5
  label: Source Video 5
  kind: action
  params: []
- id: source_multi_input
  label: Source Multi Input
  kind: action
  params: []
- id: surround_stereo
  label: Stereo
  kind: action
  params: []
- id: surround_dolby3_stereo
  label: Dolby3 Stereo
  kind: action
  params: []
- id: surround_dolby_pro_logic
  label: DolbyPro Logic
  kind: action
  params: []
- id: surround_dsp_music_mode_toggle
  label: DSP Music Mode Toggle
  kind: action
  params: []
- id: surround_dolby3_stereo_pl_toggle
  label: Dolby3 Stereo/Pro Logic Toggle
  kind: action
  params: []
- id: surround_dts_neo6_toggle
  label: dts Neo:6 Music/Cinema Toggle
  kind: action
  params: []
- id: surround_music_1
  label: Music 1
  kind: action
  params: []
- id: surround_music_2
  label: Music 2
  kind: action
  params: []
- id: surround_music_3
  label: Music 3
  kind: action
  params: []
- id: surround_music_4
  label: Music 4
  kind: action
  params: []
- id: surround_5_channel_stereo
  label: 5 Channel Stereo
  kind: action
  params: []
- id: surround_7_channel_stereo
  label: 7 Channel Stereo
  kind: action
  params: []
- id: surround_dolby_plii_cinema
  label: DolbyPLII Cinema
  kind: action
  params: []
- id: surround_dolby_plii_music
  label: DolbyPLII Music
  kind: action
  params: []
- id: surround_dolby_plii_game
  label: DolbyPLII Game
  kind: action
  params: []
- id: surround_dolby_pro_logic_mode
  label: DolbyPro Logic (mode)
  kind: action
  params: []
- id: surround_dts_neo6_music
  label: dts Neo:6 Music
  kind: action
  params: []
- id: surround_dts_neo6_cinema
  label: dts Neo:6 Cinema
  kind: action
  params: []
- id: surround_plii_panorama_toggle
  label: PLII Panorama Toggle
  kind: action
  params: []
- id: surround_plii_dimension_up
  label: PLII Dimension Up
  kind: action
  params: []
- id: surround_plii_dimension_down
  label: PLII Dimension Down
  kind: action
  params: []
- id: surround_plii_center_width_up
  label: PLII Center Width Up
  kind: action
  params: []
- id: surround_plii_center_width_down
  label: PLII Center Width Down
  kind: action
  params: []
- id: surround_dolby_digital_ex_toggle
  label: DolbyDigital EX Toggle
  kind: action
  params: []
- id: surround_next_mode
  label: Next Surround Mode
  kind: action
  params: []
- id: treble_up
  label: Treble Up
  kind: action
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  params: []
- id: bass_up
  label: Bass Up
  kind: action
  params: []
- id: bass_down
  label: Bass Down
  kind: action
  params: []
- id: tone_control_select
  label: Tone Control Select
  kind: action
  params: []
- id: osd_menu
  label: OSD Menu
  kind: action
  params: []
- id: osd_enter
  label: Enter
  kind: action
  params: []
- id: osd_cursor_right
  label: Cursor Right
  kind: action
  params: []
- id: osd_cursor_left
  label: Cursor Left
  kind: action
  params: []
- id: osd_cursor_up
  label: Cursor Up
  kind: action
  params: []
- id: osd_cursor_down
  label: Cursor Down
  kind: action
  params: []
- id: tuner_tune_up
  label: Tune Up
  kind: action
  params: []
- id: tuner_tune_down
  label: Tune Down
  kind: action
  params: []
- id: tuner_preset_up
  label: Preset Up
  kind: action
  params: []
- id: tuner_preset_down
  label: Preset Down
  kind: action
  params: []
- id: tuner_frequency_up
  label: Frequency Up
  kind: action
  params: []
- id: tuner_frequency_down
  label: Frequency Down
  kind: action
  params: []
- id: tuner_memory
  label: Memory
  kind: action
  params: []
- id: tuner_band_toggle
  label: Band Toggle
  kind: action
  params: []
- id: tuner_am
  label: AM
  kind: action
  params: []
- id: tuner_fm
  label: FM
  kind: action
  params: []
- id: tuner_tune_preset
  label: Tune/Preset
  kind: action
  params: []
- id: tuner_tuning_mode_select
  label: Tuning Mode Select
  kind: action
  params: []
- id: tuner_preset_mode_select
  label: Preset Mode Select
  kind: action
  params: []
- id: tuner_frequency_direct
  label: Frequency Direct
  kind: action
  params: []
- id: tuner_preset_scan
  label: Preset Scan
  kind: action
  params: []
- id: tuner_display
  label: Tuner Display
  kind: action
  params: []
- id: tuner_rds_pty
  label: RDS PTY
  kind: action
  params: []
- id: tuner_rds_tp
  label: RDS TP
  kind: action
  params: []
- id: tuner_rds_ta
  label: RDS TA
  kind: action
  params: []
- id: tuner_fm_mono
  label: FM Mono
  kind: action
  params: []
- id: number_0
  label: Number 0
  kind: action
  params: []
- id: number_1
  label: Number 1
  kind: action
  params: []
- id: number_2
  label: Number 2
  kind: action
  params: []
- id: number_3
  label: Number 3
  kind: action
  params: []
- id: number_4
  label: Number 4
  kind: action
  params: []
- id: number_5
  label: Number 5
  kind: action
  params: []
- id: number_6
  label: Number 6
  kind: action
  params: []
- id: number_7
  label: Number 7
  kind: action
  params: []
- id: number_8
  label: Number 8
  kind: action
  params: []
- id: number_9
  label: Number 9
  kind: action
  params: []
- id: record_function_select
  label: Record Function Select
  kind: action
  params: []
- id: dynamic_range
  label: Dynamic Range
  kind: action
  params: []
- id: digital_input_select
  label: Digital Input Select
  kind: action
  params: []
- id: zone2_main_toggle
  label: Zone 2/Main Toggle
  kind: action
  params: []
- id: temp_center_trim
  label: Temporary Center Trim
  kind: action
  params: []
- id: temp_subwoofer_trim
  label: Temporary Subwoofer Trim
  kind: action
  params: []
- id: temp_surround_trim
  label: Temporary Surround Trim
  kind: action
  params: []
- id: cinema_eq_toggle
  label: Cinema EQ Toggle
  kind: action
  params: []
- id: front_display_on_off
  label: Front Display On/Off
  kind: action
  params: []
- id: display_refresh
  label: Display Refresh
  kind: action
  params: []
- id: main_zone_power_toggle
  label: Main Zone Power Toggle
  kind: action
  params: []
- id: main_zone_power_off
  label: Main Zone Power Off
  kind: action
  params: []
- id: main_zone_power_on
  label: Main Zone Power On
  kind: action
  params: []
- id: main_zone_volume_up
  label: Main Zone Volume Up
  kind: action
  params: []
- id: main_zone_volume_down
  label: Main Zone Volume Down
  kind: action
  params: []
- id: main_zone_mute_toggle
  label: Main Zone Mute Toggle
  kind: action
  params: []
- id: main_zone_mute_on
  label: Main Zone Mute On
  kind: action
  params: []
- id: main_zone_mute_off
  label: Main Zone Mute Off
  kind: action
  params: []
- id: main_zone_source_cd
  label: Main Zone Source CD
  kind: action
  params: []
- id: main_zone_source_tuner
  label: Main Zone Source Tuner
  kind: action
  params: []
- id: main_zone_source_tape
  label: Main Zone Source Tape
  kind: action
  params: []
- id: main_zone_source_video_1
  label: Main Zone Source Video 1
  kind: action
  params: []
- id: main_zone_source_video_2
  label: Main Zone Source Video 2
  kind: action
  params: []
- id: main_zone_source_video_3
  label: Main Zone Source Video 3
  kind: action
  params: []
- id: main_zone_source_video_4
  label: Main Zone Source Video 4
  kind: action
  params: []
- id: main_zone_source_video_5
  label: Main Zone Source Video 5
  kind: action
  params: []
- id: record_source_cd
  label: Record Source CD
  kind: action
  params: []
- id: record_source_tuner
  label: Record Source Tuner
  kind: action
  params: []
- id: record_source_tape
  label: Record Source Tape
  kind: action
  params: []
- id: record_source_video_1
  label: Record Source Video 1
  kind: action
  params: []
- id: record_source_video_2
  label: Record Source Video 2
  kind: action
  params: []
- id: record_source_video_3
  label: Record Source Video 3
  kind: action
  params: []
- id: record_source_video_4
  label: Record Source Video 4
  kind: action
  params: []
- id: record_source_video_5
  label: Record Source Video 5
  kind: action
  params: []
- id: record_follow_main_zone
  label: Record Follow Main Zone Source
  kind: action
  params: []
- id: zone2_power_toggle
  label: Zone 2 Power Toggle
  kind: action
  params: []
- id: zone2_power_off
  label: Zone 2 Power Off
  kind: action
  params: []
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  params: []
- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  params: []
- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []
- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []
- id: zone2_source_cd
  label: Zone 2 Source CD
  kind: action
  params: []
- id: zone2_source_tuner
  label: Zone 2 Source Tuner
  kind: action
  params: []
- id: zone2_source_tape
  label: Zone 2 Source Tape
  kind: action
  params: []
- id: zone2_source_video_1
  label: Zone 2 Source Video 1
  kind: action
  params: []
- id: zone2_source_video_2
  label: Zone 2 Source Video 2
  kind: action
  params: []
- id: zone2_source_video_3
  label: Zone 2 Source Video 3
  kind: action
  params: []
- id: zone2_source_video_4
  label: Zone 2 Source Video 4
  kind: action
  params: []
- id: zone2_source_video_5
  label: Zone 2 Source Video 5
  kind: action
  params: []
- id: zone2_follow_main_zone
  label: Zone 2 Follow Main Zone Source
  kind: action
  params: []
- id: zone2_tune_up
  label: Zone 2 Tune Up
  kind: action
  params: []
- id: zone2_tune_down
  label: Zone 2 Tune Down
  kind: action
  params: []
- id: zone2_preset_up
  label: Zone 2 Preset Up
  kind: action
  params: []
- id: zone2_preset_down
  label: Zone 2 Preset Down
  kind: action
  params: []
- id: zone2_frequency_up
  label: Zone 2 Frequency Up
  kind: action
  params: []
- id: zone2_frequency_down
  label: Zone 2 Frequency Down
  kind: action
  params: []
- id: zone2_band_toggle
  label: Zone 2 Band Toggle
  kind: action
  params: []
- id: zone2_am
  label: Zone 2 AM
  kind: action
  params: []
- id: zone2_fm
  label: Zone 2 FM
  kind: action
  params: []
- id: zone2_tune_preset
  label: Zone 2 Tune/Preset
  kind: action
  params: []
- id: zone2_tuning_mode_select
  label: Zone 2 Tuning Mode Select
  kind: action
  params: []
- id: zone2_preset_mode_select
  label: Zone 2 Preset Mode Select
  kind: action
  params: []
- id: zone2_preset_scan
  label: Zone 2 Preset Scan
  kind: action
  params: []
- id: zone2_fm_mono
  label: Zone 2 FM Mono
  kind: action
  params: []
- id: zone2_number_0
  label: Zone 2 Number 0
  kind: action
  params: []
- id: zone2_number_1
  label: Zone 2 Number 1
  kind: action
  params: []
- id: zone2_number_2
  label: Zone 2 Number 2
  kind: action
  params: []
- id: zone2_number_3
  label: Zone 2 Number 3
  kind: action
  params: []
- id: zone2_number_4
  label: Zone 2 Number 4
  kind: action
  params: []
- id: zone2_number_5
  label: Zone 2 Number 5
  kind: action
  params: []
- id: zone2_number_6
  label: Zone 2 Number 6
  kind: action
  params: []
- id: zone2_number_7
  label: Zone 2 Number 7
  kind: action
  params: []
- id: zone2_number_8
  label: Zone 2 Number 8
  kind: action
  params: []
- id: zone2_number_9
  label: Zone 2 Number 9
  kind: action
  params: []
- id: volume_direct
  label: Volume Direct (0–96)
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0 (min) to 96 (max), hex 0x00–0x60
- id: zone2_volume_direct
  label: Zone 2 Volume Direct (0–96)
  kind: action
  params:
    - name: level
      type: integer
      description: Zone 2 volume level 0 (min) to 96 (max), hex 0x00–0x60
```

## Feedbacks
```yaml
- id: display_state
  label: Front Display State
  type: object
  properties:
    chars:
      type: string
      description: 13 ASCII characters mirroring front-panel display text (Char1–Char13)
    flags:
      type: object
      description: 8 flag bytes (Flag1–Flag8) indicating illuminated front-panel icons
    display_status:
      type: object
      description: Display on/off state encoded in Flag6 bits
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented as variables.
# All controllable parameters are exposed as Actions above.
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited feedback on any front-panel change
# (source states: "Any change to the status of the front display on the unit
# will prompt a feedback string mirroring that change"), but no explicit
# event list or trigger definitions are provided in the source.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on
# sequencing requirements stated in source.
```

## Notes

**Command string encoding:** All commands are raw HEX bytes — no spaces, no delimiter, no carriage return/line feed after the command. Start byte is `0xFE`. Meta encoding rule: if bytes `0xFD` or `0xFE` appear in the command payload (after start byte), replace `0xFD` with `0xFD 0x00` and `0xFE` with `0xFD 0x01`.

**Checksum:** Modulo-256 sum of ID + Type + Key bytes. Does not include Start byte or Checksum byte itself.

**Device ID:** Fixed at `0xC7` for RSX-1057.

**Multi-zone operation:** Type 14 commands are main-zone-specific duplicates of Type 10 primary commands — use Type 14 in multi-zone installations to avoid zone conflicts. Type 16 controls Zone 2.

**Volume direct ranges:** Type 30 (Main Zone) and Type 32 (Zone 2) accept hex values `0x00`–`0x60` (0–96 decimal).

<!-- UNRESOLVED: protocol version not stated in source -->
<!-- UNRESOLVED: response timing / latency specs not stated in source -->
<!-- UNRESOLVED: firmware compatibility across RSX-1 Series models not confirmed -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: rotel_rsx_1_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:24:47.493Z
retrieved_at: 2026-04-23T08:24:47.493Z
last_checked_at: 2026-04-23T08:24:47.493Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:24:47.493Z
matched_actions: 151
action_count: 151
confidence: high
summary: "All 151 spec actions matched to hex commands in source; transport parameters (19200 baud, 8 bits, no parity, 1 stop) verified."
```

## Known Gaps

```yaml
[]
```
