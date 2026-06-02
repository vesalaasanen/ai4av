---
spec_id: admin/sony-vph-g70q-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony VPH-G70Q Series Control Spec"
manufacturer: Sony
model_family: VPH-G70Q
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - VPH-G70Q
    - VPH-G70QM
    - VPH-G70QMG
    - VPH-D50Q
    - VPH-D50QM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - projector-database.com
  - manualslib.com
source_urls:
  - https://www.projector-database.com/pdf/SonyD50-g70-serial-port.pdf
  - https://www.manualslib.com/manual/1691134/Sony-Vph-G70q.html
retrieved_at: 2026-05-04T15:15:59.741Z
last_checked_at: 2026-06-02T07:36:16.408Z
generated_at: 2026-06-02T07:36:16.408Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full command tables for active memory write (CMD1=32) reference many data byte formats whose exact byte-by-byte layouts are not enumerated in the source — verified as command existence only."
  - "flow control not explicitly stated in source"
  - "source describes no unsolicited notification/event stream; device is strictly"
  - "source does not enumerate multi-step macro sequences."
  - "per-MCU ROM version sub-codes (03..07) and their exact field offsets within the 16-byte response are documented in the source ROM version table but not byte-mapped here."
  - "flow control (XON/XOFF or RTS/CTS) is not stated in source — wiring table shows RTS/CTS pins used, but the protocol does not specify whether software or hardware flow control is required."
  - "factory baud rate is 38400 but the source does not specify which of the four rates the protocol manual was authored against."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:36:16.408Z
  matched_actions: 133
  action_count: 133
  confidence: medium
  summary: "All 133 spec actions verified against source; all CMD1/CMD2 pairs match command table; all transport parameters (baud, connector, parity, bits) present verbatim in source. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony VPH-G70Q Series Control Spec

## Summary
Serial (RS-232C / RS-422A) control protocol for Sony VPH-G70Q and VPH-D50Q family CRT/data projectors. Uses fixed-size binary command blocks with start/end markers and XOR checksum; the projector responds with ACK, NAK, or data return blocks.

<!-- UNRESOLVED: full command tables for active memory write (CMD1=32) reference many data byte formats whose exact byte-by-byte layouts are not enumerated in the source — verified as command existence only. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # factory default; 19200/9600/4800 also selectable via OSD
  data_bits: 8
  parity: even
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated in source
  connector: D-sub 9-pin female (D-9S)
  electrical: RS-232C or RS-422A (4-wire); cross-over wiring table provided in source
  inter_byte_gap_max_ms: 4
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: POWER REQUEST, POWER DIRECT SELECT, AC POWER ON/OFF
- routable        # inferred: INPUT CHANNEL SELECT, VIDEO/INPUT A/INPUT B SIGNAL SELECT
- queryable       # inferred: extensive status sense commands (CMD1=11)
- levelable       # inferred: COLOR UNIFORMITY, BRIGHTNESS UNIFORMITY, PICTURE CONTROL writes
```

## Actions

Command block format (B0..Bn+2):
`A5 01 00 01 00 01 03 00 01 00 01 {CMD1} {CMD2} 10 {SIZE_4_to_6} 00 {SIZE_6} {DATA} {CHECKSUM} 5A`

- B0 start = `A5`; B1..B5 receiver index (projector 01 0001); B6..B10 sender index (controller 03 0001); B13 projector category = `10` (CRT); B15 sub-cmd = `00`; Bn+2 end = `5A`.
- SIZE_4_to_6 = 5 + len(DATA) (sum of CMD1..CMD3, sub-cmd, size, data). SIZE_6 = len(DATA).
- CHECKSUM = XOR of B1..Bn.
- Projector replies with CMD1=`10` blocks: ACK (`10 10`), ACK WITH DATA (`10 20`), NAK (`10 11`), or ERROR DATA SET (`10 F0`).
- For data-bearing commands the DATA section is command-specific; use the source protocol table for each layout.

```yaml
# CMD1=10 - Return Data (controller <- projector). Listed as actions so a driver can pattern-match.
- id: return_data_ack
  label: Return Data (ACK)
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 10 10 10 05 00 00 {checksum} 5A"
  params: []
- id: return_data_ack_with_data
  label: Return Data (ACK With Data)
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 10 20 10 05 00 00 {checksum} 5A"
  params: []
- id: return_data_nak
  label: Return Data (NAK)
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 10 11 10 05 00 00 {checksum} 5A"
  params: []
- id: return_data_error_set
  label: Return Data - Error Data Set
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 10 F0 10 {size_4_to_6} 00 {size_6} {error_data} {checksum} 5A"
  params:
    - name: error_data
      type: bytes
      description: 4-byte error code set (see error codes)

# CMD1=11 - Status Sense (controller -> projector)
- id: device_type_request
  label: Device Type Request
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 00 10 05 00 00 {checksum} 5A"
  params: []
- id: software_ver_request
  label: Software Ver. Request
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 20 10 05 00 00 {checksum} 5A"
  params: []
- id: err_request
  label: ERR Request
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 08 10 05 00 00 {checksum} 5A"
  params: []
- id: power_status_sense
  label: Power Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 10 10 05 00 00 {checksum} 5A"
  params: []
- id: set_mode_status_sense
  label: Set Mode Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 0D 10 05 00 00 {checksum} 5A"
  params: []
- id: pole_status_sense
  label: Pole Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 0E 10 05 00 00 {checksum} 5A"
  params: []
- id: all_white_mode_status_sense
  label: All White Mode Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 0F 10 05 00 00 {checksum} 5A"
  params: []
- id: power_saving_status_sense
  label: Power Saving Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 10 10 05 00 00 {checksum} 5A"
  params: []
- id: picture_muting_status_sense
  label: Picture Muting Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 11 10 05 00 00 {checksum} 5A"
  params: []
- id: protection_status_sense
  label: Protection Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 17 10 05 00 00 {checksum} 5A"
  params: []
- id: fh_too_high_status_sense
  label: FH Too High Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 18 10 05 00 00 {checksum} 5A"
  params: []
- id: over_correction_status_sense
  label: Over Correction Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 19 10 05 00 00 {checksum} 5A"
  params: []
- id: comm_target_device_index_sense
  label: Comm Target Device Index Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 1A 10 05 00 00 {checksum} 5A"
  params: []
- id: nvm_imem_entry_load_from_sense
  label: NVM IMEM Entry Load From Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 1B 10 05 00 00 {checksum} 5A"
  params: []
- id: signal_stabilized_sense
  label: Signal Stabilized Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 1C 10 05 00 00 {checksum} 5A"
  params: []
- id: signal_act_sense
  label: Signal ACT Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 1D 10 05 00 00 {checksum} 5A"
  params: []
- id: power_saving_act_sense
  label: Power Saving ACT Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 2B 10 05 00 00 {checksum} 5A"
  params: []
- id: all_white_act_sense
  label: All White ACT Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 2C 10 05 00 00 {checksum} 5A"
  params: []
- id: pic_orbiting_sense
  label: Pic Orbiting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 30 10 05 00 00 {checksum} 5A"
  params: []
- id: crt_active_time_sense
  label: CRT Active Time Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 31 10 05 00 00 {checksum} 5A"
  params: []
- id: input_status_sense
  label: Input Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 40 10 05 00 00 {checksum} 5A"
  params: []
- id: channel_swer_sense
  label: Channel Switcher Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 43 10 05 00 00 {checksum} 5A"
  params: []
- id: fh_fv_sync_sense
  label: fH/fV/Sync Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 49 10 05 00 00 {checksum} 5A"
  params: []
- id: power_direct_status_sense
  label: Power Direct Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 50 10 05 00 00 {checksum} 5A"
  params: []
- id: power_on_delay_status_sense
  label: Power On Delay Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 51 10 05 00 00 {checksum} 5A"
  params: []
- id: bnc_old_swer_status_sense
  label: 5BNC Old Switcher Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 52 10 05 00 00 {checksum} 5A"
  params: []
- id: auto_back_ground_status_sense
  label: Auto Back Ground Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 55 10 05 00 00 {checksum} 5A"
  params: []
- id: abl_link_status_sense
  label: ABL Link Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 56 10 05 00 00 {checksum} 5A"
  params: []
- id: ir_in_status_sense
  label: IR In Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 57 10 05 00 00 {checksum} 5A"
  params: []
- id: osd_language_status_sense
  label: OSD Language Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 60 10 05 00 00 {checksum} 5A"
  params: []
- id: osd_show_status_sense
  label: OSD Show Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 61 10 05 00 00 {checksum} 5A"
  params: []
- id: input_status_sense_70
  label: Input Status Sense (CMD2 70)
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 70 10 05 00 00 {checksum} 5A"
  params: []
- id: video_setting_sense
  label: Video Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 74 10 05 00 00 {checksum} 5A"
  params: []
- id: input_a_setting_sense
  label: Input A Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 78 10 05 00 00 {checksum} 5A"
  params: []
- id: input_b_setting_sense
  label: Input B Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 7C 10 05 00 00 {checksum} 5A"
  params: []
- id: old_swer_all_setting_sense
  label: Old Switcher All Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 80 10 05 00 00 {checksum} 5A"
  params: []
- id: old_swer_setting_sense
  label: Old Switcher Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 81 10 05 00 00 {checksum} 5A"
  params: []
- id: screen_type_sense
  label: Screen Type Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 88 10 05 00 00 {checksum} 5A"
  params: []
- id: color_uniformity_setting_sense
  label: Color Uniformity Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 89 10 05 00 00 {checksum} 5A"
  params: []
- id: brightness_uniformity_setting_sense
  label: Brightness Uniformity Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 8A 10 05 00 00 {checksum} 5A"
  params: []
- id: color_temp_setting_sense
  label: Color Temp. Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 20 10 05 00 00 {checksum} 5A"
  params: []
- id: d_picture_setting_sense
  label: D Picture Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 20 10 05 00 00 {checksum} 5A"
  params: []
- id: vshift_setting_sense
  label: V.Shift Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 20 10 05 00 00 {checksum} 5A"
  params: []
- id: ntsc_setup_setting_sense
  label: NTSC Setup Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 20 10 05 00 00 {checksum} 5A"
  params: []
- id: component_video_memory_setting_sense
  label: Component Setting Sense / Video Memory Setting Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 11 F1 10 05 00 00 {checksum} 5A"
  params: []

# CMD1=13 - System Select (controller -> projector)
- id: power_request
  label: Power Request
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 0A 10 05 00 00 {checksum} 5A"
  params: []
- id: set_mode_act_select
  label: Set Mode ACT Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 0D 10 06 00 01 {mode} {checksum} 5A"
  params:
    - name: mode
      type: enum
      values: [user, service]  # 00 USER, 01 SERVICE
- id: pole_status_select
  label: Pole Status Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 0E 10 06 00 01 {pole} {checksum} 5A"
  params:
    - name: pole
      type: enum
      values: [normal, hinv, vinv, hvinv]  # 00..03
- id: picture_muting_status_select
  label: Picture Muting Status Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 11 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [off, on]  # 00..01
- id: all_white_mode_all_write
  label: All White Mode All Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 40 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
      description: All-white mode parameters (see source)
- id: all_white_mode_onoff_select
  label: All White Mode On/Off Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 41 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [off, on]
- id: all_white_mode_time_write
  label: All White Mode Time Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 42 10 06 00 01 {minutes} {checksum} 5A"
  params:
    - name: minutes
      type: integer
      description: 1 byte, 1 unit = 1 minute
- id: pic_orbiting_all_write
  label: Pic Orbiting All Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 43 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: pic_orbiting_onoff_select
  label: Pic Orbiting On/Off Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 44 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [off, on]
- id: pic_orbiting_time_write
  label: Pic Orbiting Time Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 45 10 06 00 01 {minutes} {checksum} 5A"
  params:
    - name: minutes
      type: integer
      description: 1 byte, 1 unit = 1 minute
- id: power_saving_all_select
  label: Power Saving All Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 49 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: power_saving_onoff_select
  label: Power Saving On/Off Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 4A 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [off, on]
- id: power_saving_time_write
  label: Power Saving Time Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 4B 10 06 00 01 {minutes} {checksum} 5A"
  params:
    - name: minutes
      type: integer
      description: 1 byte, 1 unit = 1 minute
- id: power_direct_select
  label: Power Direct Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 50 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [off, on]  # AC POWER ON/OFF
- id: power_on_delay_status_select
  label: Power On Delay Status Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 51 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [off, on]
- id: bnc_old_swer_status_select
  label: 5BNC Old Switcher Status Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 52 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [off, on]
- id: auto_back_ground_select
  label: Auto Back Ground Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 55 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [off, on]
- id: abl_link_status_select
  label: ABL Link Status Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 56 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [off, on]
- id: ir_in_status_select
  label: IR In Status Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 57 10 06 00 01 {mode} {checksum} 5A"
  params:
    - name: mode
      type: enum
      values: [front_rear, front, rear]  # 00..02
- id: osd_language_select
  label: OSD Language Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 60 10 06 00 01 {lang} {checksum} 5A"
  params:
    - name: lang
      type: enum
      values: [english, french, german, italian, spanish, japanese, chinese]
- id: osd_show_select
  label: OSD Show Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 61 10 06 00 01 {mode} {checksum} 5A"
  params:
    - name: mode
      type: enum
      values: [on, normal_off, all_off]  # 00..02
- id: input_all_select
  label: Input All Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 70 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: input_channel_select
  label: Input Channel Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 71 10 06 00 01 {channel} {checksum} 5A"
  params:
    - name: channel
      type: enum
      values: [video, input_a, input_b, old_swer]  # 00..03
- id: old_swer_channel_select
  label: Old Switcher Channel Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 72 10 06 00 01 {channel} {checksum} 5A"
  params:
    - name: channel
      type: integer
      description: 00..07 SW'er1-1..8; 10..17 SW'er2-1..8; 20 OTHER
- id: video_all_select
  label: Video All Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 74 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: video_signal_select
  label: Video Signal Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 75 10 06 00 01 {signal} {checksum} 5A"
  params:
    - name: signal
      type: enum
      values: [video, svideo]  # 10, 11
- id: video_col_sys_select
  label: Video COL SYS Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 76 10 06 00 01 {sys} {checksum} 5A"
  params:
    - name: sys
      type: enum
      values: [auto, ntsc, pal, secam, ntsc443, palm]  # 00,07,19,1D,05,2B
- id: video_idtv_use_select
  label: Video IDTV Use Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 77 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [not_use, use]
- id: input_a_all_select
  label: Input A All Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 78 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: input_a_signal_select
  label: Input A Signal Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 79 10 06 00 01 {signal} {checksum} 5A"
  params:
    - name: signal
      type: enum
      values: [video, svideo, rgb, comp, hdtvypbpr, hdtvgbr]  # 10,11,20,30,40,41
- id: input_a_col_sys_select
  label: Input A COL SYS Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 7A 10 06 00 01 {sys} {checksum} 5A"
  params:
    - name: sys
      type: enum
      values: [auto, ntsc, pal, secam, ntsc443, palm]
- id: input_a_idtv_use_select
  label: Input A IDTV Use Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 7B 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [not_use, use]
- id: input_b_all_select
  label: Input B All Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 7C 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: input_b_signal_select
  label: Input B Signal Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 7D 10 06 00 01 {signal} {checksum} 5A"
  params:
    - name: signal
      type: enum
      values: [video, svideo, rgb, comp, hdtvypbpr, hdtvgbr]
- id: input_b_col_sys_select
  label: Input B COL SYS Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 7E 10 06 00 01 {sys} {checksum} 5A"
  params:
    - name: sys
      type: enum
      values: [auto, ntsc, pal, secam, ntsc443, palm]
- id: input_b_idtv_use_select
  label: Input B IDTV Use Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 7F 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [not_use, use]
- id: old_swer_all_select
  label: Old Switcher All Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 80 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: old_swer_colsys_idtv_select
  label: Old Switcher COLSYS IDTV Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 81 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: old_swer_col_sys_select
  label: Old Switcher COL SYS Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 82 10 06 00 01 {sys} {checksum} 5A"
  params:
    - name: sys
      type: enum
      values: [auto, ntsc, pal, secam, ntsc443, palm]
- id: old_swer_idtv_use_select
  label: Old Switcher IDTV Use Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 83 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [not_use, use]
- id: screen_type_select
  label: Screen Type Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 88 10 06 00 01 {screen} {checksum} 5A"
  params:
    - name: screen
      type: enum
      values: [s1, s2]  # 00,01 (active memory write also lists S3=02)
- id: color_uniformity_setting_select
  label: Color Uniformity Setting Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 89 10 06 00 01 {mode} {checksum} 5A"
  params:
    - name: mode
      type: enum
      values: [off, adjust, preset_s1, preset_s2, preset_s3]
- id: brightness_uniformity_setting_select
  label: Brightness Uniformity Setting Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 8A 10 06 00 01 {mode} {checksum} 5A"
  params:
    - name: mode
      type: enum
      values: [off, adjust, preset_s1, preset_s2, preset_s3]
- id: color_temp_select
  label: Color Temp. Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 20 10 06 00 01 {temp} {checksum} 5A"
  params:
    - name: temp
      type: enum
      values: ["9300K", "6500K", "5400K", "3200K", preset]
- id: d_picture_select
  label: D Picture Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 20 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [off, on]
- id: vshift_select
  label: V.Shift Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 20 10 06 00 01 {mode} {checksum} 5A"
  params:
    - name: mode
      type: enum
      values: [wide, narrow]
- id: ntsc_setup_select
  label: NTSC Setup Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 20 10 06 00 01 {setup} {checksum} 5A"
  params:
    - name: setup
      type: enum
      values: ["0%", "7.5%"]
- id: component_video_memory_select
  label: Component Setting Select / Video Memory Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 F1 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: clamp_select
  label: CLAMP Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 F2 10 06 00 01 {clamp} {checksum} 5A"
  params:
    - name: clamp
      type: enum
      values: [auto, song, hc, hp, trilevels]  # 00..04
- id: sync_select
  label: SYNC Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 F3 10 06 00 01 {sync} {checksum} 5A"
  params:
    - name: sync
      type: enum
      values: [auto, internal, external, external_c, external_hv]  # source shows 00..03 with sub-encoding
- id: sync_osc_shift_setting_select
  label: SYNC OSC Shift Setting Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 13 F5 10 06 00 01 {shift} {checksum} 5A"
  params:
    - name: shift
      type: enum
      values: ["1", "2"]  # 00,01

# CMD1=15 - Internal Test Signal Generator
- id: osc_int_onoff_status_sense
  label: OSC INT On/Off Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 15 01 10 05 00 00 {checksum} 5A"
  params: []
- id: osc_internal_status_sense
  label: OSC Internal Status Sense
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 15 10 10 05 00 00 {checksum} 5A"
  params: []
- id: osc_int_onoff_select
  label: OSC INT On/Off Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 15 10 10 06 00 01 {state} {checksum} 5A"
  params:
    - name: state
      type: enum
      values: [off, on]
- id: osc_internal_select
  label: OSC Internal Select
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 15 20 10 06 00 01 {pattern} {checksum} 5A"
  params:
    - name: pattern
      type: integer
      description: 00..07 pattern number 1..8

# CMD1=16 - SIRCS Code Direct
- id: sircs_code_direct
  label: SIRCS Code Direct
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 16 20 10 08 00 03 {cmd2} {repeat} {sircs_code} {checksum} 5A"
  params:
    - name: cmd2
      type: integer
      description: SIRCS row/function nibble 0x0..0xF (see SIRCS table)
    - name: repeat
      type: enum
      values: [one_shot, repeat]  # 00,01
    - name: sircs_code
      type: integer
      description: SIRCS code value 0x00..0x7F

# CMD1=30 - Active Memory Read
- id: color_uniformity_data_read
  label: Color Uniformity Data Read
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 30 08 10 05 00 00 {checksum} 5A"
  params: []
- id: brightness_uniformity_direct_read
  label: Brightness Uniformity Read / Direct Read
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 30 10 10 05 00 00 {checksum} 5A"
  params: []
- id: cxa1839_00h_data_read
  label: CXA1839 00H Data Read
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 30 10 10 05 00 00 {checksum} 5A"
  params: []
- id: cxa1839_05h_data_read
  label: CXA1839 05H Data Read
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 30 20 10 05 00 00 {checksum} 5A"
  params: []
- id: cxa1839_08h_data_read
  label: CXA1839 08H Data Read
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 30 27 10 05 00 00 {checksum} 5A"
  params: []
- id: picture_control_data_read
  label: Picture Control Data Read
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 30 20 10 05 00 00 {checksum} 5A"
  params: []
- id: rgb_size_data_read
  label: RGB Size Data Read
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 30 52 10 05 00 00 {checksum} 5A"
  params: []
- id: rgb_shift_data_read
  label: RGB Shift Data Read
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 30 54 10 05 00 00 {checksum} 5A"
  params: []
- id: blanking_data_read
  label: Blanking Data Read
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 30 56 10 05 00 00 {checksum} 5A"
  params: []
- id: cent_data_read
  label: Centering Data Read
  kind: query
  command: "A5 01 00 01 00 01 03 00 01 00 01 30 58 10 05 00 00 {checksum} 5A"
  params: []

# CMD1=32 - Active Memory Write
- id: color_uniformity_data_all_write
  label: Color Uniformity Data All Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 08 10 0C 00 07 01 01 00 00 00 {checksum} 5A"
  params: []
  notes: "Source example: HG=0, VG=0, V=0; full data layout per source protocol table"
- id: color_uniformity_data_rgb_write
  label: Color Uniformity Data R/G/B Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 09 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: brt_uniformity_data_all_write
  label: BRT Uniformity Data All Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 0A 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: brt_uniformity_data_lr_tb_write
  label: BRT Uniformity Data LR/TB Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 0B 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: cxa1839_00h_data_write
  label: CXA1839 00H Data Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 10 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: cxa1839_05h_data_write
  label: CXA1839 05H Data Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 21 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: cxa1839_08h_data_write
  label: CXA1839 08H Data Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 29 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: format_write
  label: Format Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 20 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: picture_control_data_all_write
  label: Picture Control Data All Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 52 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: picture_control_data_write
  label: Picture Control Data Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 53 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: rgb_size_data_all_write
  label: RGB Size Data All Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 54 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: rgb_size_data_hv_write
  label: RGB Size Data H/V Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 55 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: rgb_shift_data_all_write
  label: RGB Shift Data All Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 56 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: rgb_shift_data_hv_write
  label: RGB Shift Data H/V Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 57 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: blanking_data_all_write
  label: Blanking Data All Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 58 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: blanking_data_write
  label: Blanking Data Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 59 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: cent_data_all_write
  label: Centering Data All Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 60 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
- id: cent_data_write
  label: Centering Data Write
  kind: action
  command: "A5 01 00 01 00 01 03 00 01 00 01 32 61 10 {size_4_to_6} 00 {size_6} {data} {checksum} 5A"
  params:
    - name: data
      type: bytes
```

## Feedbacks
```yaml
- id: ack_status
  label: ACK Status
  type: enum
  values: [ack, ack_with_data, nak]
- id: error_code
  label: Error Code
  type: enum
  values:
    - undefined_command
    - head_not_power_on
    - any_protect_on
    - size_error
    - select_error
    - range_over
    - sircs_busy
    - data_not_stabilized
    - checksum_error
    - framing_error
    - parity_error
    - over_error
    - other_error
- id: device_type
  label: Device Type
  type: bytes
  notes: Returned by 11 00 DEVICE TYPE REQUEST
- id: software_version
  label: Software Version
  type: bytes
  notes: "16 bytes total (MAIN+REGI+OSD+COMM MCU); per-MCU sense via 11 20 with sub-code 03..07"
- id: set_mode
  label: Set Mode
  type: enum
  values: [user, service, factory]
- id: pole
  label: Pole
  type: enum
  values: [normal, hinv, vinv, hvinv]
- id: all_white_mode
  label: All White Mode
  type: enum
  values: [off, on]
- id: power_saving
  label: Power Saving
  type: enum
  values: [off, on]
- id: picture_muting
  label: Picture Muting
  type: enum
  values: [off, on]
- id: fh_too_high
  label: FH Too High
  type: enum
  values: [normal, fh_too_high]
- id: over_correction
  label: Over Correction
  type: enum
  values: [normal, over_correction]
- id: signal_stabilized
  label: Signal Stabilized
  type: enum
  values: [instability, stability]
- id: input_channel
  label: Input Channel
  type: enum
  values: [video, input_a, input_b, old_swer]
- id: pic_orbiting
  label: Pic Orbiting
  type: enum
  values: [off, on]
- id: signal_request
  label: Signal Request
  type: enum
  values: [videocvbs, videoyc, rgb, comp, hdtvypbpr, hdtvgbr, idtv, idtvntsc]
- id: fh
  label: Horizontal Frequency
  type: integer
  notes: 4 bytes * 10 mSec
- id: fv
  label: Vertical Frequency
  type: integer
  notes: "Hz; (DATA#21*256+DATA#22)/10"
- id: sync_level
  label: Sync Level
  type: enum
  values: [unknown, level_2, level_3]
- id: h_c_sync
  label: H/C Sync
  type: enum
  values: [off, negative, positive]
- id: v_sync
  label: V Sync
  type: enum
  values: [off, negative, positive]
- id: col_sys
  label: Color System
  type: enum
  values: [invalid, ntsc, pal, secam, ntsc443, palm, bw60, bw50]
- id: high_scan
  label: High Scan
  type: enum
  values: [normal, int_2fh, int_2fhfv, int_edtvii, int_palplus, ext_2fh, ext_2fhfv, ext_edtvii, ext_palplus]
- id: power_state
  label: Power State
  type: enum
  values: [off, on]
- id: power_on_delay
  label: Power On Delay
  type: enum
  values: [off, on]
- id: bnc_old_swer
  label: 5BNC Old Switcher
  type: enum
  values: [off, on]
- id: auto_back_ground
  label: Auto Back Ground
  type: enum
  values: [off, on]
- id: abl_link
  label: ABL Link
  type: enum
  values: [off, on]
- id: ir_in
  label: IR In
  type: enum
  values: [front_rear, front, rear]
- id: osd_language
  label: OSD Language
  type: enum
  values: [english, french, german, italian, spanish, japanese, chinese]
- id: osd_show
  label: OSD Show
  type: enum
  values: [on, normal_off, all_off]
- id: video_signal
  label: Video Signal
  type: enum
  values: [video, svideo]
- id: input_ab_signal
  label: Input A/B Signal
  type: enum
  values: [video, svideo, rgb, comp, hdtvypbpr, hdtvgbr]
- id: idtv_use
  label: IDTV Use
  type: enum
  values: [not_use, use]
- id: old_swer_channel
  label: Old Switcher Channel
  type: integer
  notes: 00..07 / 10..17 / 20
- id: screen_type
  label: Screen Type
  type: enum
  values: [s1, s2]
- id: color_uniformity
  label: Color Uniformity
  type: enum
  values: [off, adjust, preset_s1, preset_s2, preset_s3]
- id: brightness_uniformity
  label: Brightness Uniformity
  type: enum
  values: [off, adjust, preset_s1, preset_s2, preset_s3]
- id: color_temp
  label: Color Temp
  type: enum
  values: ["9300K", "6500K", "5400K", "3200K", preset]
- id: d_picture
  label: D Picture
  type: enum
  values: [off, on]
- id: vshift
  label: V.Shift
  type: enum
  values: [wide, narrow]
- id: ntsc_setup
  label: NTSC Setup
  type: enum
  values: ["0%", "7.5%"]
- id: component_format
  label: Component Format
  type: enum
  values: [smpte_ebu_n10, betacam_7_5]
- id: video_memory
  label: Video Memory
  type: integer
  notes: 00 OFF; 01..0A = 1..10
- id: slot_no
  label: Slot Number
  type: integer
  notes: 00..07 = 1..8
- id: clamp
  label: CLAMP
  type: enum
  values: [auto, song, hc, hp, trilevels]
- id: sync
  label: SYNC
  type: enum
  values: [auto, internal, external, external_c, external_hv]
- id: sync_osc_shift
  label: SYNC OSC Shift
  type: enum
  values: ["1", "2"]
- id: osc_int_onoff
  label: OSC INT On/Off
  type: enum
  values: [off, on]
- id: osc_internal_pattern
  label: OSC Internal Pattern
  type: integer
  notes: 00..07 = 1..8
- id: rom_version
  label: ROM Version
  type: bytes
  notes: "Per-MCU (MAIN/REGI/OSD/COMM) and combined 16-byte read; sub-codes 03..07"
- id: mcu_error_status
  label: MCU Error Status
  type: enum
  values: [off, on]
- id: protection_status
  label: Protection Status
  type: enum
  values: [off, on]
- id: signal_act
  label: Signal ACT
  type: enum
  values: [off, on]
- id: power_saving_act
  label: Power Saving ACT
  type: enum
  values: [off, on]
- id: all_white_act
  label: All White ACT
  type: enum
  values: [off, on]
- id: crt_active_time
  label: CRT Active Time
  type: integer
  notes: Projector lamp/module cumulative active time
- id: comm_target_device_index
  label: Comm Target Device Index
  type: integer
- id: nvm_imem_entry_load_from
  label: NVM IMEM Entry Load Source
  type: integer
- id: channel_swer
  label: Channel Switcher
  type: integer
  notes: Internal channel-switcher state
```

## Variables
```yaml
- id: baud_rate
  label: Baud Rate
  type: enum
  values: ["38400", "19200", "9600", "4800"]
  notes: Settable via OSD "Service Setting for RS422A" (projector side)
- id: project_id
  label: Projector Index
  type: integer
  notes: Fixed at 01 (0001 hex) for VPH-G70 / D50
- id: controller_id
  label: Controller Index
  type: integer
  notes: Fixed at 03 (per CONTROLLER index table)
- id: sub_command
  label: Sub Command
  type: integer
  notes: Always 00 in this spec
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notification/event stream; device is strictly
# request/response.
```

## Macros
```yaml
# UNRESOLVED: source does not enumerate multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - system_select
  - active_memory_write
interlocks:
  - signal_not_stable
  - protection_status
notes: |
  USER mode picture disappearance and state changes possible when DATA WRITE COMMAND is sent
  (source §2-6). SYSTEM SELECT and ACTIVE MEMORY WRITE commands take ~800 ms before return data.
  SIRCS DIRECT commands require >180 ms between successive transmissions.
```

## Notes
- Source lists several duplicate CMD2 hex codes for distinct logical functions (CMD2=`20` for SOFTWARE VER / ERROR / NTSC SETUP / COLOR TEMP / D PICTURE / V.SHIFT, and CMD1=11 CMD2=`20` reused 5x, CMD1=13 CMD2=`20` reused 4x). They are listed as separate actions to preserve the source's row-by-row enumeration; on the wire the CMD2 byte alone does not disambiguate them — the controller must track which sense/select it issued.
- Projector category byte (B13) is fixed at `10` (CRT) for this family. `80` would indicate LCD, `B0` DMD.
- All multi-byte values in sense responses are returned in a CMD1=`10`, CMD2=`20` (ACK WITH DATA) block; the driver must parse that wrapper first.
- SIRCS codes 0x0..0xF high nibble = row group, low nibble = function per the SIRCS table; controller must compute the CMD2 byte from the desired function.
<!-- UNRESOLVED: per-MCU ROM version sub-codes (03..07) and their exact field offsets within the 16-byte response are documented in the source ROM version table but not byte-mapped here. -->
<!-- UNRESOLVED: flow control (XON/XOFF or RTS/CTS) is not stated in source — wiring table shows RTS/CTS pins used, but the protocol does not specify whether software or hardware flow control is required. -->
<!-- UNRESOLVED: factory baud rate is 38400 but the source does not specify which of the four rates the protocol manual was authored against. -->
```

Saved to `drafts/sony_vph_g70q_series.md`.

## Provenance

```yaml
source_domains:
  - projector-database.com
  - manualslib.com
source_urls:
  - https://www.projector-database.com/pdf/SonyD50-g70-serial-port.pdf
  - https://www.manualslib.com/manual/1691134/Sony-Vph-G70q.html
retrieved_at: 2026-05-04T15:15:59.741Z
last_checked_at: 2026-06-02T07:36:16.408Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:36:16.408Z
matched_actions: 133
action_count: 133
confidence: medium
summary: "All 133 spec actions verified against source; all CMD1/CMD2 pairs match command table; all transport parameters (baud, connector, parity, bits) present verbatim in source. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full command tables for active memory write (CMD1=32) reference many data byte formats whose exact byte-by-byte layouts are not enumerated in the source — verified as command existence only."
- "flow control not explicitly stated in source"
- "source describes no unsolicited notification/event stream; device is strictly"
- "source does not enumerate multi-step macro sequences."
- "per-MCU ROM version sub-codes (03..07) and their exact field offsets within the 16-byte response are documented in the source ROM version table but not byte-mapped here."
- "flow control (XON/XOFF or RTS/CTS) is not stated in source — wiring table shows RTS/CTS pins used, but the protocol does not specify whether software or hardware flow control is required."
- "factory baud rate is 38400 but the source does not specify which of the four rates the protocol manual was authored against."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
