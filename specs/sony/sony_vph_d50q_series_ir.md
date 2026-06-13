---
spec_id: admin/sony-vph-d50q-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony VPH-D50Q/D50QM and VPH-G70Q/G70QM/G70QMG Control Spec"
manufacturer: Sony
model_family: VPH-D50Q
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - VPH-D50Q
    - VPH-D50QM
    - VPH-G70Q
    - VPH-G70QM
    - VPH-G70QMG
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pdf.textfiles.com
  - idoc.pub
  - remotecentral.com
source_urls:
  - "http://pdf.textfiles.com/manuals/STARINMANUALS/Sony%20Video/Manuals/Archive/VPH-D50Q%20-%20Protocol.pdf"
  - https://idoc.pub/documents/sony-projector-vph-d50-protocol-manu-19n0y55995lv
  - https://www.remotecentral.com/cgi-bin/codes/sony/vph-d50q/
retrieved_at: 2026-06-12T01:57:49.010Z
last_checked_at: 2026-06-12T19:58:15.043Z
generated_at: 2026-06-12T19:58:15.043Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact cable pinout for RS-232C controller side not fully specified beyond the RS-232C-to-RS-422A recommendation table"
  - "flow control not stated; RS-422A 4-wire assumed"
  - "active memory write data fields (convergence, geometry, uniformity adjustments)"
  - "no macro sequences described in source"
  - "projector protection/fault behavior when PROTECT is ON (error code 02) not fully detailed"
  - "exact data byte layout for active memory read/write commands not fully specified"
  - "CMD2=20 collision across multiple settings (color temp, D picture, V.shift, NTSC setup) — differentiation mechanism unclear"
  - "CMD2=10/20 collisions in active memory read group — differentiation unclear"
  - "full SIRCS code table mapping (high nibble row groups) only partially documented"
  - "data byte mapping for color/brightness uniformity read/write operations"
  - "horizontal frequency dependency for active memory write data ranges"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:58:15.043Z
  matched_actions: 129
  action_count: 129
  confidence: medium
  summary: "All 129 spec actions match source command tables exactly; transport parameters (38400 baud, 8 data bits, even parity, 1 stop bit, D-9S connector) are confirmed verbatim in the source. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Sony VPH-D50Q/D50QM and VPH-G70Q/G70QM/G70QMG Control Spec

## Summary

Sony VPH-D50Q/D50QM and VPH-G70Q/G70QM/G70QMG CRT projectors controlled via RS-232C/RS-422A serial binary protocol. External controller sends command blocks; projector responds with return data. Supports power control, input routing, picture adjustment, color/brightness uniformity, geometry correction, SIRCS remote emulation, and active memory read/write.

<!-- UNRESOLVED: exact cable pinout for RS-232C controller side not fully specified beyond the RS-232C-to-RS-422A recommendation table -->

## Transport

```yaml
protocols:
  - serial
serial:
  baud_rate: 38400
  data_bits: 8
  parity: even
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; RS-422A 4-wire assumed
  connector: "9-pin D-subminiature female (D-9S)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
traits:
  - powerable    # power on/off via CMD1=13 CMD2=0A and CMD2=50
  - queryable    # extensive status sense commands CMD1=11
  - routable     # input channel select CMD1=13 CMD2=71
  - levelable    # picture control (contrast, brightness, hue, sharpness, color)
```

## Actions

```yaml
# Command frame: A5 01 00 01 00 01 03 00 01 00 01 {CMD1} {CMD2} {CMD3} {size} 00 {size} {data} {checksum} 5A
# CMD3=10 for CRT projectors (VPH-G70/D50). Command field below shows CMD1 CMD2 CMD3 bytes only.
# Full frame structure documented in source section 2-2. Byte interval within frame <= 4ms.
# Must wait for return data (CMD1=10) before sending next command.

# --- STATUS SENSE (CMD1=11) - queries ---

- id: device_type_request
  label: Device Type Request
  kind: query
  command: "11 00 10"
  params: []

- id: err_request
  label: Error Request
  kind: query
  command: "11 08 10"
  params: []

- id: power_status_sense
  label: Power Status Sense
  kind: query
  command: "11 10 10"
  params: []
  note: "CMD2=10 collision: source's first CMD1=10,11 table assigns 11 10 to POWER STATUS SENSE, while the later STATUS SENSE (CMD1=11) table assigns the same 11 10 to POWER SAVING STATUS SENSE. Differentiation mechanism is unclear from source."

- id: power_saving_status_sense
  label: Power Saving Status Sense
  kind: query
  command: "11 10 10"
  params: []
  note: "CMD2=10 collision: source's later STATUS SENSE (CMD1=11) table lists POWER SAVING STATUS SENSE at 11 10, but the earlier CMD1=10,11 table lists POWER STATUS SENSE at the same hex. Source distinguishes 00=OFF, 01=ON."

- id: set_mode_status_sense
  label: Set Mode Status Sense
  kind: query
  command: "11 0D 10"
  params: []

- id: pole_status_sense
  label: Pole Status Sense
  kind: query
  command: "11 0E 10"
  params: []

- id: all_white_mode_status_sense
  label: All White Mode Status Sense
  kind: query
  command: "11 0F 10"
  params: []

- id: picture_muting_status_sense
  label: Picture Muting Status Sense
  kind: query
  command: "11 11 10"
  params: []

- id: protection_status_sense
  label: Protection Status Sense
  kind: query
  command: "11 17 10"
  params: []

- id: fh_too_high_status_sense
  label: FH Too High Status Sense
  kind: query
  command: "11 18 10"
  params: []

- id: over_correction_status_sense
  label: Over Correction Status Sense
  kind: query
  command: "11 19 10"
  params: []

- id: comm_target_device_index_sense
  label: Comm Target Device Index Sense
  kind: query
  command: "11 1A 10"
  params: []

- id: nvm_imem_entry_load_from_sense
  label: NVM IMEM Entry Load From Sense
  kind: query
  command: "11 1B 10"
  params: []

- id: signal_stabilized_sense
  label: Signal Stabilized Sense
  kind: query
  command: "11 1C 10"
  params: []

- id: signal_act_sense
  label: Signal Act Sense
  kind: query
  command: "11 1D 10"
  params: []

- id: software_ver_request
  label: Software Version Request
  kind: query
  command: "11 20 10"
  params: []

- id: power_saving_act_sense
  label: Power Saving Act Sense
  kind: query
  command: "11 2B 10"
  params: []

- id: all_white_act_sense
  label: All White Act Sense
  kind: query
  command: "11 2C 10"
  params: []

- id: pic_orbiting_sense
  label: Picture Orbiting Sense
  kind: query
  command: "11 30 10"
  params: []

- id: crt_active_time_sense
  label: CRT Active Time Sense
  kind: query
  command: "11 31 10"
  params: []

- id: input_status_signal_sense
  label: Input Status Sense (Signal)
  kind: query
  command: "11 40 10"
  params: []

- id: channel_switcher_sense
  label: Channel Switcher Sense
  kind: query
  command: "11 43 10"
  params: []

- id: fh_fv_sync_sense
  label: fH/fV/Sync Sense
  kind: query
  command: "11 49 10"
  params: []

- id: power_direct_status_sense
  label: Power Direct Status Sense
  kind: query
  command: "11 50 10"
  params: []

- id: power_on_delay_status_sense
  label: Power On Delay Status Sense
  kind: query
  command: "11 51 10"
  params: []

- id: bnc_old_switcher_status_sense
  label: 5BNC Old Switcher Status Sense
  kind: query
  command: "11 52 10"
  params: []

- id: auto_background_status_sense
  label: Auto Background Status Sense
  kind: query
  command: "11 55 10"
  params: []

- id: abl_link_status_sense
  label: ABL Link Status Sense
  kind: query
  command: "11 56 10"
  params: []

- id: ir_in_status_sense
  label: IR In Status Sense
  kind: query
  command: "11 57 10"
  params: []

- id: osd_language_status_sense
  label: OSD Language Status Sense
  kind: query
  command: "11 60 10"
  params: []

- id: osd_show_status_sense
  label: OSD Show Status Sense
  kind: query
  command: "11 61 10"
  params: []

- id: input_status_settings_sense
  label: Input Status Sense (Settings)
  kind: query
  command: "11 70 10"
  params: []

- id: video_setting_sense
  label: Video Setting Sense
  kind: query
  command: "11 74 10"
  params: []

- id: input_a_setting_sense
  label: Input A Setting Sense
  kind: query
  command: "11 78 10"
  params: []

- id: input_b_setting_sense
  label: Input B Setting Sense
  kind: query
  command: "11 7C 10"
  params: []

- id: old_switcher_all_setting_sense
  label: Old Switcher All Setting Sense
  kind: query
  command: "11 80 10"
  params: []

- id: old_switcher_setting_sense
  label: Old Switcher Setting Sense
  kind: query
  command: "11 81 10"
  params: []

- id: screen_type_sense
  label: Screen Type Sense
  kind: query
  command: "11 88 10"
  params: []

- id: color_uniformity_setting_sense
  label: Color Uniformity Setting Sense
  kind: query
  command: "11 89 10"
  params: []

- id: brightness_uniformity_setting_sense
  label: Brightness Uniformity Setting Sense
  kind: query
  command: "11 8A 10"
  params: []

- id: color_temp_setting_sense
  label: Color Temperature Setting Sense
  kind: query
  command: "11 20 10"
  params: []
  note: "CMD2=20 collision with software_ver_request; source lists as separate row in settings table. May be differentiated by data payload."

- id: d_picture_setting_sense
  label: D Picture Setting Sense
  kind: query
  command: "11 20 10"
  params: []
  note: "CMD2=20 collision; see color_temp_setting_sense note."

- id: vshift_setting_sense
  label: V.Shift Setting Sense
  kind: query
  command: "11 20 10"
  params: []
  note: "CMD2=20 collision; see color_temp_setting_sense note."

- id: ntsc_setup_sense
  label: NTSC Setup Sense
  kind: query
  command: "11 20 10"
  params: []
  note: "CMD2=20 collision; see color_temp_setting_sense note."

- id: component_video_memory_setting_sense
  label: Component Setting / Video Memory Setting Sense
  kind: query
  command: "11 F1 10"
  params: []

# --- SYSTEM SELECT (CMD1=13) - actions ---

- id: power_request
  label: Power Request
  kind: action
  command: "13 0A 10 {power}"
  params:
    - name: power
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON

- id: set_mode_act_select
  label: Set Mode Act Select
  kind: action
  command: "13 0D 10 {mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"  # USER
        - "01"  # SERVICE

- id: pole_status_select
  label: Pole Status Select
  kind: action
  command: "13 0E 10 {pole}"
  params:
    - name: pole
      type: enum
      values:
        - "00"  # NORMAL
        - "01"  # HINV
        - "02"  # VINV
        - "03"  # HVINV

- id: picture_muting_status_select
  label: Picture Muting Status Select
  kind: action
  command: "13 11 10 {muting}"
  params:
    - name: muting
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON

- id: all_white_mode_all_write
  label: All White Mode All Write
  kind: action
  command: "13 40 10"
  params: []

- id: all_white_mode_onoff_select
  label: All White Mode On/Off Select
  kind: action
  command: "13 41 10 {state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON

- id: all_white_mode_time_write
  label: All White Mode Time Write
  kind: action
  command: "13 42 10 {minutes}"
  params:
    - name: minutes
      type: integer
      description: "Duration in minutes (1 byte, * 1 Min)"

- id: pic_orbiting_all_write
  label: Picture Orbiting All Write
  kind: action
  command: "13 43 10"
  params: []

- id: pic_orbiting_onoff_select
  label: Picture Orbiting On/Off Select
  kind: action
  command: "13 44 10 {state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON

- id: pic_orbiting_time_write
  label: Picture Orbiting Time Write
  kind: action
  command: "13 45 10 {minutes}"
  params:
    - name: minutes
      type: integer
      description: "Duration in minutes (1 byte, * 1 Min)"

- id: power_saving_all_select
  label: Power Saving All Select
  kind: action
  command: "13 49 10"
  params: []

- id: power_saving_onoff_select
  label: Power Saving On/Off Select
  kind: action
  command: "13 4A 10 {state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON

- id: power_saving_time_write
  label: Power Saving Time Write
  kind: action
  command: "13 4B 10 {minutes}"
  params:
    - name: minutes
      type: integer
      description: "Duration in minutes (1 byte, * 1 Min)"

- id: power_direct_select
  label: Power Direct Select
  kind: action
  command: "13 50 10 {power}"
  params:
    - name: power
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON

- id: power_on_delay_status_select
  label: Power On Delay Status Select
  kind: action
  command: "13 51 10 {state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON

- id: bnc_old_switcher_status_select
  label: 5BNC Old Switcher Status Select
  kind: action
  command: "13 52 10 {state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON

- id: auto_background_select
  label: Auto Background Select
  kind: action
  command: "13 55 10 {state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON

- id: abl_link_status_select
  label: ABL Link Status Select
  kind: action
  command: "13 56 10 {state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON

- id: ir_in_status_select
  label: IR In Status Select
  kind: action
  command: "13 57 10 {mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"  # FRONT+REAR
        - "01"  # FRONT
        - "02"  # REAR

- id: osd_language_select
  label: OSD Language Select
  kind: action
  command: "13 60 10 {language}"
  params:
    - name: language
      type: enum
      values:
        - "00"  # ENGLISH
        - "01"  # FRENCH
        - "02"  # GERMAN
        - "03"  # ITALIAN
        - "04"  # SPANISH
        - "05"  # JAPANESE
        - "06"  # CHINESE

- id: osd_show_select
  label: OSD Show Select
  kind: action
  command: "13 61 10 {mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"  # ON
        - "01"  # NORMAL OFF
        - "02"  # ALL OFF

- id: input_all_select
  label: Input All Select
  kind: action
  command: "13 70 10"
  params: []

- id: input_channel_select
  label: Input Channel Select
  kind: action
  command: "13 71 10 {channel}"
  params:
    - name: channel
      type: enum
      values:
        - "00"  # VIDEO
        - "01"  # INPUT A
        - "02"  # INPUT B
        - "03"  # OLD SWITCHER

- id: old_switcher_channel_select
  label: Old Switcher Channel Select
  kind: action
  command: "13 72 10 {channel}"
  params:
    - name: channel
      type: integer
      description: "00-07=Switcher1-1 to 1-8, 10-17=Switcher2-1 to 2-8, 20=OTHER"

- id: video_all_select
  label: Video All Select
  kind: action
  command: "13 74 10"
  params: []

- id: video_signal_select
  label: Video Signal Select
  kind: action
  command: "13 75 10 {signal}"
  params:
    - name: signal
      type: enum
      values:
        - "10"  # VIDEO (CVBS)
        - "11"  # S-VIDEO

- id: video_col_sys_select
  label: Video Color System Select
  kind: action
  command: "13 76 10 {system}"
  params:
    - name: system
      type: enum
      values:
        - "00"  # AUTO
        - "07"  # NTSC
        - "19"  # PAL
        - "1D"  # SECAM
        - "05"  # NTSC443
        - "2B"  # PAL-M

- id: video_idtv_use_select
  label: Video IDTV Use Select
  kind: action
  command: "13 77 10 {use}"
  params:
    - name: use
      type: enum
      values:
        - "00"  # NOT USE
        - "01"  # USE

- id: input_a_all_select
  label: Input A All Select
  kind: action
  command: "13 78 10"
  params: []

- id: input_a_signal_select
  label: Input A Signal Select
  kind: action
  command: "13 79 10 {signal}"
  params:
    - name: signal
      type: enum
      values:
        - "10"  # VIDEO
        - "11"  # S-VIDEO
        - "20"  # RGB
        - "30"  # COMPONENT
        - "40"  # HDTV YPbPr
        - "41"  # HDTV GBR

- id: input_a_col_sys_select
  label: Input A Color System Select
  kind: action
  command: "13 7A 10 {system}"
  params:
    - name: system
      type: enum
      values:
        - "00"  # AUTO
        - "07"  # NTSC
        - "19"  # PAL
        - "1D"  # SECAM
        - "05"  # NTSC443
        - "2B"  # PAL-M

- id: input_a_idtv_use_select
  label: Input A IDTV Use Select
  kind: action
  command: "13 7B 10 {use}"
  params:
    - name: use
      type: enum
      values:
        - "00"  # NOT USE
        - "01"  # USE

- id: input_b_all_select
  label: Input B All Select
  kind: action
  command: "13 7C 10"
  params: []

- id: input_b_signal_select
  label: Input B Signal Select
  kind: action
  command: "13 7D 10 {signal}"
  params:
    - name: signal
      type: enum
      values:
        - "10"  # VIDEO
        - "11"  # S-VIDEO
        - "20"  # RGB
        - "30"  # COMPONENT
        - "40"  # HDTV YPbPr
        - "41"  # HDTV GBR

- id: input_b_col_sys_select
  label: Input B Color System Select
  kind: action
  command: "13 7E 10 {system}"
  params:
    - name: system
      type: enum
      values:
        - "00"  # AUTO
        - "07"  # NTSC
        - "19"  # PAL
        - "1D"  # SECAM
        - "05"  # NTSC443
        - "2B"  # PAL-M

- id: input_b_idtv_use_select
  label: Input B IDTV Use Select
  kind: action
  command: "13 7F 10 {use}"
  params:
    - name: use
      type: enum
      values:
        - "00"  # NOT USE
        - "01"  # USE

- id: old_switcher_all_select
  label: Old Switcher All Select
  kind: action
  command: "13 80 10"
  params: []

- id: old_switcher_colsys_idtv_select
  label: Old Switcher Colsys IDTV Select
  kind: action
  command: "13 81 10"
  params: []

- id: old_switcher_col_sys_select
  label: Old Switcher Color System Select
  kind: action
  command: "13 82 10 {system}"
  params:
    - name: system
      type: enum
      values:
        - "00"  # AUTO
        - "07"  # NTSC
        - "19"  # PAL
        - "1D"  # SECAM
        - "05"  # NTSC443
        - "2B"  # PAL-M

- id: old_switcher_idtv_use_select
  label: Old Switcher IDTV Use Select
  kind: action
  command: "13 83 10 {use}"
  params:
    - name: use
      type: enum
      values:
        - "00"  # NOT USE
        - "01"  # USE

- id: screen_type_select
  label: Screen Type Select
  kind: action
  command: "13 88 10 {type}"
  params:
    - name: type
      type: enum
      values:
        - "00"  # S1
        - "01"  # S2

- id: color_uniformity_setting_select
  label: Color Uniformity Setting Select
  kind: action
  command: "13 89 10 {setting}"
  params:
    - name: setting
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ADJUST
        - "02"  # PRESET S1
        - "03"  # PRESET S2
        - "04"  # PRESET S3

- id: brightness_uniformity_setting_select
  label: Brightness Uniformity Setting Select
  kind: action
  command: "13 8A 10 {setting}"
  params:
    - name: setting
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ADJUST
        - "02"  # PRESET S1
        - "03"  # PRESET S2
        - "04"  # PRESET S3

- id: color_temp_select
  label: Color Temperature Select
  kind: action
  command: "13 20 10 {temp}"
  params:
    - name: temp
      type: enum
      values:
        - "00"  # 9300K
        - "01"  # 6500K
        - "02"  # 5400K
        - "03"  # 3200K
        - "04"  # PRESET
  note: "CMD2=20 collision with other settings commands; may be differentiated by data payload."

- id: d_picture_select
  label: D Picture Select
  kind: action
  command: "13 20 10 {state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON
  note: "CMD2=20 collision; see color_temp_select note."

- id: vshift_select
  label: V.Shift Select
  kind: action
  command: "13 20 10 {mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"  # WIDE
        - "01"  # NARROW
  note: "CMD2=20 collision; see color_temp_select note."

- id: ntsc_setup_select
  label: NTSC Setup Select
  kind: action
  command: "13 20 10 {setup}"
  params:
    - name: setup
      type: enum
      values:
        - "00"  # 0%
        - "01"  # 7.5%
  note: "CMD2=20 collision; see color_temp_select note."

- id: component_video_memory_select
  label: Component Setting / Video Memory Select
  kind: action
  command: "13 F1 10"
  params: []

- id: clamp_select
  label: Clamp Select
  kind: action
  command: "13 F2 10 {clamp}"
  params:
    - name: clamp
      type: enum
      values:
        - "00"  # AUTO
        - "01"  # SONG
        - "02"  # HC
        - "03"  # HP
        - "04"  # TRILEVELS

- id: sync_select
  label: Sync Select
  kind: action
  command: "13 F3 10 {sync}"
  params:
    - name: sync
      type: enum
      values:
        - "00"  # AUTO
        - "01"  # INTERNAL
        - "02"  # EXTERNAL
        - "03"  # EXTERNAL HV

- id: sync_osc_shift_setting_select
  label: Sync OSC Shift Setting Select
  kind: action
  command: "13 F5 10 {shift}"
  params:
    - name: shift
      type: enum
      values:
        - "00"  # 1
        - "01"  # 2

# --- INTERNAL TEST SIGNAL (CMD1=15) ---

- id: osc_int_onoff_status_sense
  label: OSC Int On/Off Status Sense
  kind: query
  command: "15 01 10"
  params: []

- id: osc_internal_status_sense
  label: OSC Internal Status Sense
  kind: query
  command: "15 10 10"
  params: []
  note: "CMD2=10 collision with osc_int_onoff_select."

- id: osc_int_onoff_select
  label: OSC Int On/Off Select
  kind: action
  command: "15 10 10 {state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # OFF
        - "01"  # ON
  note: "CMD2=10 collision with osc_internal_status_sense; source lists as separate rows."

- id: osc_internal_select
  label: OSC Internal Select
  kind: action
  command: "15 20 10 {pattern}"
  params:
    - name: pattern
      type: integer
      description: "Test pattern 0-7 (1-8)"

# --- SIRCS CODE DIRECT (CMD1=16) ---

- id: sircs_code_direct
  label: SIRCS Code Direct
  kind: action
  command: "16 20 10 {sircs_code} {repeat}"
  params:
    - name: sircs_code
      type: integer
      description: "SIRCS code value 0x00-0xFF; high nibble=row group, low nibble=function"
    - name: repeat
      type: enum
      values:
        - "00"  # ONE SHOT (press once)
        - "01"  # REPEAT (hold pressing)
  note: "Minimum 180ms interval between consecutive SIRCS commands. Error codes: 04=SIZE ERROR, 05=SELECT ERROR, 07=SIRCS BUSY ERROR."

# --- ACTIVE MEMORY READ (CMD1=30) - queries ---

- id: color_uniformity_data_read
  label: Color Uniformity Data Read
  kind: query
  command: "30 08 10"
  params: []

- id: cxa1839_00h_data_read
  label: CXA1839 00H Data Read
  kind: query
  command: "30 10 10"
  params: []
  note: "CMD2=10 collision with brightness_uniformity_read."

- id: brightness_uniformity_read
  label: Brightness Uniformity Read / Direct Read
  kind: query
  command: "30 10 10"
  params: []
  note: "CMD2=10 collision with cxa1839_00h_data_read; source lists as separate row."

- id: cxa1839_05h_data_read
  label: CXA1839 05H Data Read
  kind: query
  command: "30 20 10"
  params: []
  note: "CMD2=20 collision with picture_control_data_read."

- id: picture_control_data_read
  label: Picture Control Data Read
  kind: query
  command: "30 20 10"
  params: []
  note: "CMD2=20 collision with cxa1839_05h_data_read; source lists as separate row."

- id: cxa1839_08h_data_read
  label: CXA1839 08H Data Read
  kind: query
  command: "30 27 10"
  params: []

- id: rgb_size_data_read
  label: RGB Size Data Read
  kind: query
  command: "30 52 10"
  params: []

- id: rgb_shift_data_read
  label: RGB Shift Data Read
  kind: query
  command: "30 54 10"
  params: []

- id: blanking_data_read
  label: Blanking Data Read
  kind: query
  command: "30 56 10"
  params: []

- id: cent_data_read
  label: Centering Data Read
  kind: query
  command: "30 58 10"
  params: []

# --- ACTIVE MEMORY WRITE (CMD1=32) - actions ---

- id: color_uniformity_data_all_write
  label: Color Uniformity Data All Write
  kind: action
  command: "32 08 10"
  params: []

- id: color_uniformity_data_rgb_write
  label: Color Uniformity Data R/G/B Write
  kind: action
  command: "32 09 10"
  params:
    - name: color
      type: enum
      values:
        - "00"  # R
        - "01"  # G
        - "02"  # B

- id: brightness_uniformity_data_all_write
  label: Brightness Uniformity Data All Write
  kind: action
  command: "32 0A 10"
  params: []

- id: brightness_uniformity_data_lrtb_write
  label: Brightness Uniformity Data LR/TB Write
  kind: action
  command: "32 0B 10"
  params: []

- id: cxa1839_00h_data_write
  label: CXA1839 00H Data Write
  kind: action
  command: "32 10 10"
  params: []

- id: cxa1839_05h_data_write
  label: CXA1839 05H Data Write
  kind: action
  command: "32 21 10"
  params: []

- id: cxa1839_08h_data_write
  label: CXA1839 08H Data Write
  kind: action
  command: "32 29 10"
  params: []

- id: format_write
  label: Format Write
  kind: action
  command: "32 20 10"
  params:
    - name: format
      type: enum
      values:
        - "00"  # ORDINARY
        - "01"  # RGB
        - "02"  # COMP

- id: picture_control_data_all_write
  label: Picture Control Data All Write
  kind: action
  command: "32 52 10"
  params: []

- id: picture_control_data_write
  label: Picture Control Data Write
  kind: action
  command: "32 53 10"
  params:
    - name: picture_type
      type: enum
      values:
        - "00"  # CONTRAST
        - "01"  # BRIGHTNESS
        - "02"  # HUE
        - "03"  # SHARPNESS
        - "04"  # COLOR

- id: rgb_size_data_all_write
  label: RGB Size Data All Write
  kind: action
  command: "32 54 10"
  params: []

- id: rgb_size_data_hv_write
  label: RGB Size Data H/V Write
  kind: action
  command: "32 55 10"
  params:
    - name: size_type
      type: enum
      values:
        - "00"  # H COARSE
        - "01"  # H FINE
        - "02"  # V COARSE
        - "03"  # V FINE

- id: rgb_shift_data_all_write
  label: RGB Shift Data All Write
  kind: action
  command: "32 56 10"
  params: []

- id: rgb_shift_data_hv_write
  label: RGB Shift Data H/V Write
  kind: action
  command: "32 57 10"
  params:
    - name: shift_type
      type: enum
      values:
        - "00"  # H COARSE
        - "01"  # H FINE
        - "02"  # V

- id: blanking_data_all_write
  label: Blanking Data All Write
  kind: action
  command: "32 58 10"
  params: []

- id: blanking_data_write
  label: Blanking Data Write
  kind: action
  command: "32 59 10"
  params:
    - name: position
      type: enum
      values:
        - "00"  # LEFT
        - "01"  # RIGHT
        - "02"  # TOP
        - "03"  # BOTTOM
    - name: blanking_type
      type: enum
      values:
        - "00"  # H COARSE
        - "01"  # H FINE SERVICEMAN
        - "02"  # H FINE
        - "09"  # H COARSE INVERT
        - "0A"  # H FINE SERVICEMAN INVERT
        - "0B"  # H FINE INVERT
        - "12"  # V COARSE
        - "13"  # V FINE SERVICEMAN
        - "14"  # V FINE

- id: cent_data_all_write
  label: Centering Data All Write
  kind: action
  command: "32 60 10"
  params: []

- id: cent_data_write
  label: Centering Data Write
  kind: action
  command: "32 61 10"
  params: []
```

## Feedbacks

```yaml
- id: return_ack
  type: enum
  values: [ack]
  description: "Return Data ACK (CMD1=10, CMD2=10)"

- id: return_ack_with_data
  type: string
  description: "Return Data ACK with data payload (CMD1=10, CMD2=20)"

- id: return_nak
  type: enum
  values: [nak]
  description: "Return Data NAK (CMD1=10, CMD2=11). Indicates communication error or unrecognized command."

- id: error_data_set
  type: object
  description: "Error data set response (CMD1=10, CMD2=F0). Contains serial code (32-bit), power BCD, comm MCU error BCD, OSD MCU error BCD, regi MCU error BCD."
  fields:
    - name: serial_code
      type: string
      description: "4-byte serial code"
    - name: power_error
      type: integer
      description: "Power status BCD (00-99)"
    - name: comm_mcu_error
      type: integer
      description: "Comm MCU error BCD (00-99)"
    - name: osd_mcu_error
      type: integer
      description: "OSD MCU error BCD (00-99)"
    - name: regi_mcu_error
      type: integer
      description: "Regi MCU error BCD (00-99)"

- id: error_code
  type: enum
  values:
    - "00"  # UNDEFINED COMMAND
    - "01"  # PROJECTOR HEAD IS NOT POWER ON
    - "02"  # ANY PROTECT IS ON
    - "03"  # SIZE ERROR
    - "04"  # SELECT ERROR
    - "05"  # RANGE OVER
    - "06"  # SIRCS BUSY
    - "07"  # DATA NOT STABILIZED
    - "08"  # CHECK SUM ERROR
    - "10"  # FRAMING ERROR
    - "20"  # PARITY ERROR
    - "30"  # OVER ERROR
    - "40"  # OTHER ERROR
  description: "Error codes returned in NAK or error responses"

- id: set_mode_status
  type: enum
  values: ["00", "01", "02"]
  description: "00=USER, 01=SERVICE, 02=FACTORY"

- id: pole_status
  type: enum
  values: ["00", "01", "02", "03"]
  description: "00=NORMAL, 01=HINV, 02=VINV, 03=HVINV"

- id: power_status
  type: enum
  values: ["00", "01"]
  description: "00=OFF, 01=ON"

- id: input_status
  type: enum
  values: ["00", "01", "02", "03"]
  description: "00=VIDEO, 01=INPUT A, 02=INPUT B, 03=OLD SWITCHER"

- id: signal_stabilized
  type: enum
  values: ["00", "01"]
  description: "00=INSTABILITY, 01=STABILITY"

- id: signal_req
  type: enum
  values: ["10", "11", "20", "30", "40", "41", "50", "52"]
  description: "10=VIDEO CVBS, 11=VIDEO YC, 20=RGB, 30=COMP, 40=HDTV YPbPr, 41=HDTV GBR, 50=IDTV, 52=IDTV NTSC"

- id: col_sys_status
  type: enum
  values: ["00", "07", "19", "1D", "05", "2B", "02", "10"]
  description: "00=INVALID, 07=NTSC, 19=PAL, 1D=SECAM, 05=NTSC443, 2B=PAL-M, 02=BW60, 10=BW50"

- id: screen_type_status
  type: enum
  values: ["00", "01"]
  description: "00=S1, 01=S2"

- id: color_temp_status
  type: enum
  values: ["00", "01", "02", "03", "04"]
  description: "00=9300K, 01=6500K, 02=5400K, 03=3200K, 04=PRESET"

- id: osd_language_status
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06"]
  description: "00=ENGLISH, 01=FRENCH, 02=GERMAN, 03=ITALIAN, 04=SPANISH, 05=JAPANESE, 06=CHINESE"

- id: osc_int_onoff_status
  type: enum
  values: ["00", "01"]
  description: "00=OFF, 01=ON"

- id: osc_internal_pattern
  type: integer
  description: "Test pattern number 0-7 (1-8)"

- id: component_format_status
  type: enum
  values: ["00", "01"]
  description: "Component format (returned by 13 F1 / 11 F1): 00=SMPTE/EBU-N10, 01=BETACAM 7.5"

- id: video_memory_status
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A"]
  description: "Video memory slot (returned by 13 F1 / 11 F1): 00=OFF, 01-0A=1-10"

- id: slot_no_status
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "07"]
  description: "Slot number (returned by 11 F1): 00-07=1-8"
```

## Variables

```yaml
# UNRESOLVED: active memory write data fields (convergence, geometry, uniformity adjustments)
# are structured multi-byte payloads whose exact byte mapping is not fully specified in the
# source. The source provides parameter type enums but not the complete byte-level data layout
# for each write operation. These would need device-level testing or additional Sony internal
# documentation to map accurately.
```

## Events

```yaml
# Source describes no unsolicited notifications. All communication is request-response.
# Projector only sends return data after receiving a command from the controller.
```

## Macros

```yaml
# UNRESOLVED: no macro sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: "Controller must not send next command until return data received from projector"
  - description: "Data transmitted while 7-SEG LED indicates '10' (signal not stable) is not recognized"
  - description: "DATA WRITE commands in USER mode may cause displayed picture to disappear"
# UNRESOLVED: projector protection/fault behavior when PROTECT is ON (error code 02) not fully detailed
```

## Notes

- Binary serial protocol. Command frame: `A5 {receiver_idx} {sender_idx} {CMD1} {CMD2} {CMD3=10} {data_size} 00 {data_size} {data} {checksum} 5A`
- Default indexes: receiver=01/00/01/00/01 (peripheral/group/device), sender=03/00/01/00/01 (controller)
- CMD3 fixed at 10 hex for CRT projectors (VPH-G70/D50)
- Checksum: XOR of bytes B1 through Bn (excluding start A5 and end 5A)
- Byte transfer interval within a command block must not exceed 4 ms
- SYSTEM SELECT and ACTIVE MEMORY WRITE commands take ~800 ms for return data
- SIRCS DIRECT commands require >= 180 ms interval between consecutive transmissions
- Factory default baud rate is 38400 bps; configurable via projector OSD service menu
- Connector: 9-pin D-subminiature female (RS-422A on projector side)
- Several CMD2 values appear in multiple command table rows with different functions (notably CMD2=20 and CMD2=10 under CMD1=11 and CMD1=13). Differentiation mechanism is unclear from source documentation — may involve data payload context or sub-command bytes.
- ROM version query supports: 03=ALL MCU, 04=MAIN MCU, 05=REGI MCU, 06=OSD MCU, 07=COMM MCU

<!-- UNRESOLVED: exact data byte layout for active memory read/write commands not fully specified -->
<!-- UNRESOLVED: CMD2=20 collision across multiple settings (color temp, D picture, V.shift, NTSC setup) — differentiation mechanism unclear -->
<!-- UNRESOLVED: CMD2=10/20 collisions in active memory read group — differentiation unclear -->
<!-- UNRESOLVED: full SIRCS code table mapping (high nibble row groups) only partially documented -->
<!-- UNRESOLVED: data byte mapping for color/brightness uniformity read/write operations -->
<!-- UNRESOLVED: horizontal frequency dependency for active memory write data ranges -->

## Provenance

```yaml
source_domains:
  - pdf.textfiles.com
  - idoc.pub
  - remotecentral.com
source_urls:
  - "http://pdf.textfiles.com/manuals/STARINMANUALS/Sony%20Video/Manuals/Archive/VPH-D50Q%20-%20Protocol.pdf"
  - https://idoc.pub/documents/sony-projector-vph-d50-protocol-manu-19n0y55995lv
  - https://www.remotecentral.com/cgi-bin/codes/sony/vph-d50q/
retrieved_at: 2026-06-12T01:57:49.010Z
last_checked_at: 2026-06-12T19:58:15.043Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:58:15.043Z
matched_actions: 129
action_count: 129
confidence: medium
summary: "All 129 spec actions match source command tables exactly; transport parameters (38400 baud, 8 data bits, even parity, 1 stop bit, D-9S connector) are confirmed verbatim in the source. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact cable pinout for RS-232C controller side not fully specified beyond the RS-232C-to-RS-422A recommendation table"
- "flow control not stated; RS-422A 4-wire assumed"
- "active memory write data fields (convergence, geometry, uniformity adjustments)"
- "no macro sequences described in source"
- "projector protection/fault behavior when PROTECT is ON (error code 02) not fully detailed"
- "exact data byte layout for active memory read/write commands not fully specified"
- "CMD2=20 collision across multiple settings (color temp, D picture, V.shift, NTSC setup) — differentiation mechanism unclear"
- "CMD2=10/20 collisions in active memory read group — differentiation unclear"
- "full SIRCS code table mapping (high nibble row groups) only partially documented"
- "data byte mapping for color/brightness uniformity read/write operations"
- "horizontal frequency dependency for active memory write data ranges"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
