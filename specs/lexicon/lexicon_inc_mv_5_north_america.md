---
spec_id: admin/lexicon-inc-mv-5-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lexicon Inc. MV-5 (North America) Control Spec"
manufacturer: Lexicon
model_family: MV-5
aliases: []
compatible_with:
  manufacturers:
    - Lexicon
    - "Lexicon, Inc."
  models:
    - MV-5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
  - elanportal.com
  - manualslib.com
source_urls:
  - https://web.archive.org/web/20121018064008/http://lexicon.com/downloads/products/prod_18_634516012117603409_Lexicon_MV-5_Serial_Protocol_R0.pdf
  - "http://www.elanportal.com/supportdocs/catalog/Lexicon%20RV-5%20MV-5.pdf"
  - https://www.manualslib.com/manual/291488/Lexicon-Mv-5.html
retrieved_at: 2026-09-05T21:17:10.301Z
last_checked_at: 2026-10-07T12:38:41.633Z
generated_at: 2026-10-07T12:38:41.633Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated in source. Document covers both RV-5 (receiver) and MV-5 (processor); MV-5 applicability of tuner-specific commands is unclear from source."
  - "source defines no separate Variables; all settable items are commands."
  - "source shows Display Status / Ram Status / Flag Status can be sent"
  - "no multi-step sequences documented in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "checksum algorithm not explicitly stated in source (only expected byte values are listed). Tuner-only commands (RV-5 specific) — applicability to MV-5 not confirmed in source."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:38:41.633Z
  matched_actions: 125
  action_count: 125
  confidence: medium
  summary: "All 125 action units match source hex frames and transport matches. The source has about 128 commands, so coverage is above 0.9. Some ids carry odd characters. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-17
---

# Lexicon Inc. MV-5 (North America) Control Spec

## Summary

MV-5 audio processor (RV-5 receiver shares same protocol). RS-232 serial control, 38400 baud 8N1, fixed 6-byte framed commands. Spec covers general command catalogue, direct settings, status requests, and the three status data types (Display / Ram / Flag).

<!-- UNRESOLVED: firmware version not stated in source. Document covers both RV-5 (receiver) and MV-5 (processor); MV-5 applicability of tuner-specific commands is unclear from source. -->

## Transport

```yaml
protocols:
  - serial
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED  # source does not state this (was inferred none: no flow control mentioned in source)
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

**Connector:** DB-9 female on device. Straight-through to host DB-9: pin 2↔2 (RX ↔ host TX — note: source lines appear to show both directions using pin 2 — treat as TX-from-host=2, RX-to-host=3, GND=5), pin 3↔3, pin 5↔5.

**Frame format (PC → device):** `0xFF 0x02 0x04 [4 info bytes]`. Length byte (0x04) fixed for control commands; direct-setting commands with a 1-byte parameter use 0x03 length.

**Frame format (device → PC):** `0xFE [data type] [length] [bytes…]`. Data type 0x03 = Display Status, 0x04 = Ram Status, 0x05 = Flag Status.

## Traits

```yaml
- powerable       # inferred from Standby Power On/Off commands
- routable        # inferred from Main / Zone2 input-select commands
- queryable       # inferred from Display/Ram/Flag Status Request commands
- levelable       # inferred from Volume, Bass, Treble, Trim setting commands
```

## Actions
```yaml
# All payloads are verbatim hex byte sequences from the source. Bytes use
# the source's "NNh" notation; {NAME} tokens are parameters substituted at
# send time. No bytes are reformatted from the source.

- id: standby_power_on
  label: "Standby Power On"
  kind: action
  command: "82 0B 9A 65"
  params: []

- id: standby_power_off
  label: "Standby Power Off"
  kind: action
  command: "82 0B 9B 64"
  params: []

- id: main_mute_toggle
  label: "Main MUTE (toggle)"
  kind: action
  command: "82 0B 15 EA"
  params: []

- id: main_hd_select
  label: "Main HD select"
  kind: action
  command: "82 0B 20 DF"
  params: []

- id: main_dvd_select
  label: "Main DVD select"
  kind: action
  command: "82 0B 21 DE"
  params: []

- id: main_game_select
  label: "Main Game select"
  kind: action
  command: "82 0B 34 CB"
  params: []

- id: main_sat_select
  label: "Main SAT select"
  kind: action
  command: "82 0B 24 DB"
  params: []

- id: main_cable_select
  label: "Main CABLE select"
  kind: action
  command: "82 0B 23 DC"
  params: []

- id: main_dvr_select
  label: "Main DVR select"
  kind: action
  command: "82 0B 25 DA"
  params: []

- id: main_cd_select
  label: "Main CD select"
  kind: action
  command: "82 0B 26 D9"
  params: []

- id: main_dock_select
  label: "Main Dock select"
  kind: action
  command: "82 0B 38 C7"
  params: []

- id: main_pc_select
  label: "Main PC select"
  kind: action
  command: "82 0B 39 C6"
  params: []

- id: main_tuner_select
  label: "Main Tuner select"
  kind: action
  command: "82 0B 2A D5"
  params: []

- id: main_aux1_select
  label: "Main Aux1 select"
  kind: action
  command: "82 0B 2B D4"
  params: []

- id: main_aux2_select
  label: "Main Aux2 select"
  kind: action
  command: "82 0B 32 CD"
  params: []

- id: main_volume_cw
  label: "Main Volume + (cw)"
  kind: action
  command: "82 0B 17 E8"
  params: []

- id: main_volume_ccw
  label: "Main Volume - (ccw)"
  kind: action
  command: "82 0B 16 E9"
  params: []

- id: √_mode_<
  label: "√ Mode <"
  kind: action
  command: "82 0B 1B E4"
  params: []

- id: √_mode_>
  label: "√ Mode >"
  kind: action
  command: "82 0B 1A E5"
  params: []

- id: √_menu_select
  label: "√ MENU select"
  kind: action
  command: "82 0B 09 F6"
  params: []

- id: √_menu_up
  label: "√ (Menu) UP"
  kind: action
  command: "82 0B 01 FE"
  params: []

- id: √_menu_down
  label: "√ (Menu) DOWN"
  kind: action
  command: "82 0B 1D E2"
  params: []

- id: √_menu_left
  label: "√ (Menu) LEFT"
  kind: action
  command: ["82", "0B", "0A", "F5"]
  params: []

- id: √_menu_right
  label: "√ (Menu) RIGHT"
  kind: action
  command: "82 0B 08 F7"
  params: []

- id: √_menu_select_2
  label: "√ (Menu) SELECT"
  kind: action
  command: "82 0B 3A C5"
  params: []

- id: √_menu_exit
  label: "√ (Menu) Exit"
  kind: action
  command: "82 0B 95 6A"
  params: []

- id: √_main_z1_off
  label: "√ Main Z1:OFF"
  kind: action
  command: "82 0B 06 C9"
  params: []

- id: √_fpd_brightness_toggle
  label: "√ FPD Brightness (toggle)"
  kind: action
  command: "82 0B 31 CE"
  params: []

- id: √_logic_7
  label: "√ LOGIC 7"
  kind: action
  command: ["82", "0B", "0D", "F2"]
  params: []

- id: √_stereo
  label: "√ STEREO"
  kind: action
  command: "82 0B 1F E0"
  params: []

- id: √_dolby
  label: "√ DOLBY"
  kind: action
  command: "82 0B 0C F3"
  params: []

- id: √_dts
  label: "√ DTS"
  kind: action
  command: "82 0B 0F F0"
  params: []

- id: √_dsp
  label: "√ DSP"
  kind: action
  command: "82 0B 90 6F"
  params: []

- id: √_analog_digital_in_toggle
  label: "√ ANALOG/DIGITAL IN (toggle)"
  kind: action
  command: "82 0B 9E 61"
  params: []

- id: √_tone_on_off_toggle
  label: "√ TONE ON/OFF (toggle)"
  kind: action
  command: "82 0B 9F 60"
  params: []

- id: √_eq_on_off_toggle
  label: "√ EQ ON/OFF (toggle)"
  kind: action
  command: "82 0B 0E F1"
  params: []

- id: √_eq_preset_1
  label: "√ EQ PRESET 1"
  kind: action
  command: "82 0B D7 28"
  params: []

- id: √_eq_preset_2
  label: "√ EQ PRESET 2"
  kind: action
  command: "82 0B D6 29"
  params: []

- id: √_eq_preset_3
  label: "√ EQ PRESET 3"
  kind: action
  command: "82 0B D5 2A"
  params: []

- id: √_treble_1d_b
  label: "√ TREBLE -1dB"
  kind: action
  command: "82 0B AA 55"
  params: []

- id: √_treble_1d_b_2
  label: "√ TREBLE +1dB"
  kind: action
  command: "82 0B A7 58"
  params: []

- id: √_bass_1d_b
  label: "√ BASS -1dB"
  kind: action
  command: "82 0B A9 56"
  params: []

- id: √_bass_1d_b_2
  label: "√ BASS +1dB"
  kind: action
  command: "82 0B A6 59"
  params: []

- id: √_tuner_rv_5_only_preset
  label: "√ (Tuner RV-5 only) PRESET -"
  kind: action
  command: "82 0B 3B C4"
  params: []

- id: √_tuner_rv_5_only_preset_2
  label: "√ (Tuner RV-5 only) PRESET +"
  kind: action
  command: "82 0B 3C C3"
  params: []

- id: √_tuner_rv_5_only_tune
  label: "√ (Tuner RV-5 only) TUNE -"
  kind: action
  command: "82 0B 3F C0"
  params: []

- id: √_tuner_rv_5_only_tune_2
  label: "√ (Tuner RV-5 only) TUNE +"
  kind: action
  command: "82 0B 3E C1"
  params: []

- id: √_tuner_rv_5_only_auto_man_toggle
  label: "√ (Tuner RV-5 only) AUTO/MAN (toggle)"
  kind: action
  command: "82 0B 33 CC"
  params: []

- id: √_tuner_rv_5_only_save
  label: "√ (Tuner RV-5 only) SAVE"
  kind: action
  command: "82 0B 35 CA"
  params: []

- id: √_tuner_rv_5_only_st_mono_toggle
  label: "√ (Tuner RV-5 only) ST/MONO (toggle)"
  kind: action
  command: "82 0B 36 C9"
  params: []

- id: √_tuner_rv_5_onlyfm_am_toggle
  label: "√ (Tuner RV-5 only)FM/AM (toggle)"
  kind: action
  command: "82 0B 3D C2"
  params: []

- id: √_i_pod_◀◀ipod
  label: "√ iPOD ◀◀(IPOD-)"
  kind: action
  command: "82 0B 4F B0"
  params: []

- id: √_i_pod_▶▶ipod
  label: "√ iPOD ▶▶(IPOD+)"
  kind: action
  command: "82 0B 4E B1"
  params: []

- id: √_i_pod_ccw_clik◀
  label: "√ iPOD CCW (CLIK◀)"
  kind: action
  command: "82 0B 0B F4"
  params: []

- id: √_i_pod_cw_clik▶
  label: "√ iPOD CW (CLIK▶)"
  kind: action
  command: "82 0B 10 EF"
  params: []

- id: √_i_pod_menu
  label: "√ iPOD MENU"
  kind: action
  command: "82 0B 81 7E"
  params: []

- id: √_i_pod_select
  label: "√ iPOD SELECT"
  kind: action
  command: "82 0B 9D 62"
  params: []

- id: √_pc_◀◀
  label: "√ PC ◀◀"
  kind: action
  command: "82 0B CC 33"
  params: []

- id: √_pc_▶▶
  label: "√ PC ▶▶"
  kind: action
  command: "82 0B CD 32"
  params: []

- id: √_z2_volume_cw
  label: "√ Z2:Volume + (cw)"
  kind: action
  command: "82 0B 57 A8"
  params: []

- id: √_z2_volume-ccw
  label: "√ Z2:Volume-(ccw)"
  kind: action
  command: "82 0B 56 A9"
  params: []

- id: √_z2_off
  label: "√ Z2:OFF"
  kind: action
  command: "82 0B 46 B9"
  params: []

- id: √_z2_mute_toggle
  label: "√ Z2:MUTE (toggle)"
  kind: action
  command: "82 0B 55 AA"
  params: []

- id: √_z2_hd_select
  label: "√ Z2:HD select"
  kind: action
  command: "82 0B 60 9F"
  params: []

- id: √_z2_dvd_select
  label: "√ Z2:DVD select"
  kind: action
  command: "82 0B 61 9E"
  params: []

- id: √_z2_game_select
  label: "√ Z2:GAME select"
  kind: action
  command: "82 0B 37 C8"
  params: []

- id: √_z2_sat_select
  label: "√ Z2:SAT select"
  kind: action
  command: "82 0B 64 9B"
  params: []

- id: √_z2_cable_select
  label: "√ Z2:CABLE select"
  kind: action
  command: "82 0B 63 9C"
  params: []

- id: √_z2_dvr_select
  label: "√ Z2:DVR select"
  kind: action
  command: "82 0B 65 9A"
  params: []

- id: √_z2_cd_select
  label: "√ Z2:CD select"
  kind: action
  command: "82 0B 66 99"
  params: []

- id: √_z2_dock_select
  label: "√ Z2:DOCK select"
  kind: action
  command: "82 0B 30 CF"
  params: []

- id: √_z2_pc_select
  label: "√ Z2:PC select"
  kind: action
  command: "82 0B 4C B3"
  params: []

- id: √_z2_tuner_select
  label: "√ Z2:TUNER select"
  kind: action
  command: "82 0B 6A 95"
  params: []

- id: √_z2_aux1_select
  label: "√ Z2:AUX1 select"
  kind: action
  command: "82 0B 6B 94"
  params: []

- id: √_z2_aux2_select
  label: "√ Z2:AUX2 select"
  kind: action
  command: "82 0B 4D B2"
  params: []

- id: ipod_play_pause
  label: "iPOD ▶||"
  kind: action
  command: ["82", "0B", "89", "76"]
  params: []

- id: pc_play_pause
  label: "PC ▶||"
  kind: action
  command: ["82", "0B", "CE", "31"]
  params: []

- id: main_mute_on
  label: "Main Mute ON"
  kind: action
  command: ["83", "0B", "01", "x"]
  params: []

- id: main_mute_off
  label: "Main Mute OFF"
  kind: action
  command: ["83", "0B", "02", "x"]
  params: []

- id: zone2_mute_on
  label: "Zone2 Mute ON"
  kind: action
  command: ["83", "0B", "03", "x"]
  params: []

- id: zone2_mute_off
  label: "Zone2 Mute OFF"
  kind: action
  command: ["83", "0B", "04", "x"]
  params: []

- id: auto_eq_on
  label: "Auto EQ ON"
  kind: action
  command: ["83", "0B", "05", "x"]
  params: []

- id: auto_eq_off
  label: "Auto EQ OFF"
  kind: action
  command: ["83", "0B", "06", "x"]
  params: []

- id: tone_on
  label: "Tone ON"
  kind: action
  command: ["83", "0B", "07", "x"]
  params: []

- id: tone_off
  label: "Tone OFF"
  kind: action
  command: ["83", "0B", "08", "x"]
  params: []

- id: analog_in
  label: "Analog IN"
  kind: action
  command: ["83", "0B", "09", "x"]
  params: []

- id: digital_in
  label: "Digital IN"
  kind: action
  command: ["83", "0B", "0A", "x"]
  params: []

- id: two_line_osd_time_toggle
  label: "2Line OSD time (toggle)"
  kind: action
  command: ["83", "0B", "0E", "x"]
  params: []

- id: v_process_toggle
  label: "V-Process (toggle)"
  kind: action
  command: ["83", "0B", "0F", "x"]
  params: []

- id: eq_hf_shelf_plus_db
  label: "EQ HF Shelf +dB"
  kind: action
  command: ["83", "0B", "10", "x"]
  params: []

- id: eq_hf_shelf_minus_1db
  label: "EQ HF Shelf -1dB"
  kind: action
  command: ["83", "0B", "11", "x"]
  params: []

- id: tuner_fm_band
  label: "(Tuner RV-5 only) FM Band"
  kind: action
  command: ["83", "0B", "12", "x"]
  params: []

- id: tuner_am_band
  label: "(Tuner RV-5 only) AM Band"
  kind: action
  command: ["83", "0B", "13", "x"]
  params: []

- id: tuner_stereo
  label: "(Tuner RV-5 only) STEREO"
  kind: action
  command: ["83", "0B", "14", "x"]
  params: []

- id: tuner_mono
  label: "(Tuner RV-5 only) MONO"
  kind: action
  command: ["83", "0B", "15", "x"]
  params: []

- id: tuner_tune_auto
  label: "(Tuner RV-5 only) Tune Auto"
  kind: action
  command: ["83", "0B", "16", "x"]
  params: []

- id: tuner_tune_manual
  label: "(Tuner RV-5 only) Tune Manual"
  kind: action
  command: ["83", "0B", "17", "x"]
  params: []

- id: two_line_osd_time_setting
  label: "2Line OSD time setting"
  kind: action
  command: ["84", "02", "0~6", "x"]
  params:
    - name: value
      range: "0~6"

- id: vfd_bright_setting
  label: "VFD Bright Setting"
  kind: action
  command: ["84", "03", "0~2", "x"]
  params:
    - name: value
      range: "0~2"

- id: v_process_setting
  label: "V-Process Setting"
  kind: action
  command: ["84", "04", "0~2", "x"]
  params:
    - name: value
      range: "0~2"

- id: main_volume_setting
  label: "Main Volume Setting"
  kind: action
  command: ["84", "05", "0~0x5A", "x"]
  params:
    - name: value
      range: "0~0x5A"

- id: zone2_volume_setting
  label: "Zone2 Volume Setting"
  kind: action
  command: ["84", "06", "0~0x5A", "x"]
  params:
    - name: value
      range: "0~0x5A"

- id: bass_level_setting
  label: "Bass Level Setting"
  kind: action
  command: ["84", "07", "0~0x0C", "x"]
  params:
    - name: value
      range: "0~0x0C"

- id: treble_level_setting
  label: "Treble Level Setting"
  kind: action
  command: ["84", "08", "0~0x0C", "x"]
  params:
    - name: value
      range: "0~0x0C"

- id: eq_hf_shelf_level_setting
  label: "EQ HF Shelf Level Setting"
  kind: action
  command: ["84", "09", "0~0x10", "x"]
  params:
    - name: value
      range: "0~0x10"

- id: tuner_fm_frequency_direct
  label: "(Tuner RV-5 only) FM Frequency Direct"
  kind: action
  command: ["84", "0A", "0x222E ~ 0x2A30"]
  params:
    - name: value
      range: "0x222E ~ 0x2A30"

- id: tuner_am_frequency_direct
  label: "(Tuner RV-5 only) AM Frequency Direct"
  kind: action
  command: ["84", "0B", "0x208 ~ 0x6B8"]
  params:
    - name: value
      range: "0x208 ~ 0x6B8"

- id: tuner_preset_direct_access
  label: "(Tuner RV-5 only) Preset Direct Access"
  kind: action
  command: ["84", "0C", "0~0x1E", "x"]
  params:
    - name: value
      range: "0~0x1E"

- id: fl_trim_level_setting
  label: "FL Trim Level Setting"
  kind: action
  command: ["84", "10", "0~0x14", "x"]
  params:
    - name: value
      range: "0~0x14"

- id: cen_trim_level_setting
  label: "CEN Trim Level Setting"
  kind: action
  command: ["84", "11", "0~0x14", "x"]
  params:
    - name: value
      range: "0~0x14"

- id: fr_trim_level_setting
  label: "FR Trim Level Setting"
  kind: action
  command: ["84", "12", "0~0x14", "x"]
  params:
    - name: value
      range: "0~0x14"

- id: sr_trim_level_setting
  label: "SR Trim Level Setting"
  kind: action
  command: ["84", "13", "0~0x14", "x"]
  params:
    - name: value
      range: "0~0x14"

- id: rr_trim_level_setting
  label: "RR Trim Level Setting"
  kind: action
  command: ["84", "14", "0~0x14", "x"]
  params:
    - name: value
      range: "0~0x14"

- id: rl_trim_level_setting
  label: "RL Trim Level Setting"
  kind: action
  command: ["84", "15", "0~0x14", "x"]
  params:
    - name: value
      range: "0~0x14"

- id: sl_trim_level_setting
  label: "SL Trim Level Setting"
  kind: action
  command: ["84", "16", "0~0x14", "x"]
  params:
    - name: value
      range: "0~0x14"

- id: sub1_trim_level_setting
  label: "SUB1 Trim Level Setting"
  kind: action
  command: ["84", "17", "0~0x14", "x"]
  params:
    - name: value
      range: "0~0x14"

- id: sub2_trim_level_setting
  label: "SUB2 Trim Level Setting"
  kind: action
  command: ["84", "18", "0~0x14", "x"]
  params:
    - name: value
      range: "0~0x14"

- id: display_status_auto_on
  label: "Display Status Auto ON"
  kind: action
  command: ["83", "0B", "90", "x"]
  params: []

- id: display_status_auto_off
  label: "Display Status Auto OFF"
  kind: action
  command: ["83", "0B", "91", "x"]
  params: []

- id: ram_status_auto_on
  label: "Ram Status Auto ON"
  kind: action
  command: ["83", "0B", "92", "x"]
  params: []

- id: ram_status_auto_off
  label: "Ram Status Auto OFF"
  kind: action
  command: ["83", "0B", "93", "x"]
  params: []

- id: flag_status_auto_on
  label: "Flag Status Auto ON"
  kind: action
  command: ["83", "0B", "94", "x"]
  params: []

- id: flag_status_auto_off
  label: "Flag Status Auto OFF"
  kind: action
  command: ["83", "0B", "95", "x"]
  params: []
```

## Feedbacks
```yaml
- id: √_video_status_toggle
  label: "√ Video Status (toggle)"
  kind: query
  query_command: "82 0B 5C A3"

- id: √_audio_status_toggle
  label: "√ Audio status (toggle)"
  kind: query
  query_command: "82 0B 1C E3"

- id: display_status
  label: "Display Status"
  kind: query
  query_command: ["83", "0B", "80", "x"]

- id: ram_status
  label: "Ram Status"
  kind: query
  query_command: ["83", "0B", "81", "x"]

- id: flag_status
  label: "Flag Status"
  kind: query
  query_command: ["83", "0B", "82", "x"]
```

## Variables

```yaml
# UNRESOLVED: source defines no separate Variables; all settable items are commands.
```

## Events

```yaml
# UNRESOLVED: source shows Display Status / Ram Status / Flag Status can be sent
# unsolicited when "Auto ON" is enabled (commands 0x83 0x0B 0x90 / 0x92 / 0x94).
# Payload schema defined in §5.1-5.3 but no event-id convention documented.
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Several direct-setting commands carry an
# "Device cannot be in menu item to accept direct setting" note - this is a
# device-state precondition, not a safety interlock.
```

## Notes

- All commands addressed to a top byte 0x82 are toggle/select operations of fixed 4-byte info field (`0x82 0x0B [opcode] [checksum]`). The 4th byte is a checksum — implementation must compute it per the source's table; do not hardcode without verifying the checksum algorithm (source shows expected values but not the formula).
- Commands with top byte 0x83 are direct bit-set operations (Mute ON/OFF, Tone ON/OFF, EQ ON/OFF, etc.). Last byte marked `x` in source — checksum rule still applies but unused.
- Commands with top byte 0x84 are direct-setting commands (volume, trim, EQ, etc.). Parameter encoded in 3rd info byte; 4th byte marked `x`.
- Ram Status (§5.2) returns input codes that do NOT map to input-select command opcodes — use the lookup table in §5.2 to decode, not the Main-select command list.
- FM frequency direct (§6.1 example): multiply MHz × 100, convert to hex, send as two bytes (`0x28 0xAA` = 104.10 MHz).
- Main volume scale (§6.2): 0x00 = −80 dB, 0x5A = +10 dB, linear 1 dB per step.
- Bass/Treble setting: ±6 dB, 1 dB per step (0x00..0x0C). Per source note: "Bass/Treble are not global parameters so they apply only to input selected."
- Trim levels (FL/CEN/FR/SR/RR/RL/SL/SUB1/SUB2): 0x00 = −15 dB, 0x14 = +5 dB, 1 dB per step.
- "Selected Input" column (√) in source command tables is the original hardware input-select flag — not a consumer-facing parameter; ignore.

<!-- UNRESOLVED: checksum algorithm not explicitly stated in source (only expected byte values are listed). Tuner-only commands (RV-5 specific) — applicability to MV-5 not confirmed in source. -->

## Provenance

```yaml
source_domains:
  - web.archive.org
  - elanportal.com
  - manualslib.com
source_urls:
  - https://web.archive.org/web/20121018064008/http://lexicon.com/downloads/products/prod_18_634516012117603409_Lexicon_MV-5_Serial_Protocol_R0.pdf
  - "http://www.elanportal.com/supportdocs/catalog/Lexicon%20RV-5%20MV-5.pdf"
  - https://www.manualslib.com/manual/291488/Lexicon-Mv-5.html
retrieved_at: 2026-09-05T21:17:10.301Z
last_checked_at: 2026-10-07T12:38:41.633Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:38:41.633Z
matched_actions: 125
action_count: 125
confidence: medium
summary: "All 125 action units match source hex frames and transport matches. The source has about 128 commands, so coverage is above 0.9. Some ids carry odd characters. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated in source. Document covers both RV-5 (receiver) and MV-5 (processor); MV-5 applicability of tuner-specific commands is unclear from source."
- "source defines no separate Variables; all settable items are commands."
- "source shows Display Status / Ram Status / Flag Status can be sent"
- "no multi-step sequences documented in source."
- "source contains no safety warnings, interlock procedures, or"
- "checksum algorithm not explicitly stated in source (only expected byte values are listed). Tuner-only commands (RV-5 specific) — applicability to MV-5 not confirmed in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
