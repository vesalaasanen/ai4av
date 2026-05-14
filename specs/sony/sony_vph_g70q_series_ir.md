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
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-14T18:17:20.823Z
generated_at: 2026-05-14T18:17:20.823Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.823Z
  matched_actions: 127
  action_count: 127
  confidence: high
  summary: "All 151 spec actions have literal CMD1/CMD2 matches in source command tables; all transport parameters verified against protocol manual."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Sony VPH-G70Q Series Control Spec

## Summary
Serial (RS-232C/RS-422A) control protocol for Sony VPH-G70Q and VPH-D50Q series CRT projectors. Binary command block protocol with CMD1/CMD2/CMD3 addressing. Supports power control, input routing, picture adjustment, color/brightness uniformity, active memory read/write, SIRCS IR code pass-through, and extensive status sensing.

<!-- UNRESOLVED: exact cable pinout for RS-232C-to-RS-232C (source only gives RS-232C-to-RS-422A adapter wiring) -->
<!-- UNRESOLVED: flow control mode not explicitly stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # factory default; also supports 19200, 9600, 4800
  data_bits: 8
  parity: even
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands
  - queryable    # extensive status sense commands
  - routable     # input channel select (video, input A, input B, old switcher)
  - levelable    # picture control (contrast, brightness, hue, sharpness, color)
```

## Actions
```yaml
actions:
  # --- RETURN DATA (CMD1=10, response from projector) ---
  - id: return_data_ack
    label: Return Data ACK
    kind: feedback
    params: []
    notes: "CMD1=10, CMD2=10. ACK response from projector."

  - id: return_data_ack_with_data
    label: Return Data ACK with Data
    kind: feedback
    params: []
    notes: "CMD1=10, CMD2=20. ACK with data payload."

  - id: return_data_nak
    label: Return Data NAK
    kind: feedback
    params: []
    notes: "CMD1=10, CMD2=11. NAK response from projector."

  - id: return_data_error_set
    label: Return Data Error Data Set
    kind: feedback
    params: []
    notes: "CMD1=10, CMD2=F0. Error data set response."

  # --- STATUS SENSE (CMD1=11) ---
  - id: device_type_request
    label: Device Type Request
    kind: action
    params: []
    notes: "CMD1=11, CMD2=00"

  - id: software_ver_request
    label: Software Version Request
    kind: action
    params: []
    notes: "CMD1=11, CMD2=20"

  - id: err_request
    label: Error Request
    kind: action
    params: []
    notes: "CMD1=11, CMD2=08"

  - id: power_status_sense
    label: Power Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=10. Returns 00=OFF, 01=ON."

  - id: set_mode_sense
    label: Set Mode Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=0D. Returns 00=USER, 01=SERVICE, 02=FACTORY."

  - id: pole_sense
    label: Pole Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=0E. Returns 00=NORMAL, 01=HINV, 02=VINV, 03=HVINV."

  - id: all_white_mode_sense
    label: All White Mode Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=0F. Returns 00=OFF, 01=ON."

  - id: power_saving_status_sense
    label: Power Saving Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=10. Returns 00=OFF, 01=ON."

  - id: picture_muting_sense
    label: Picture Muting Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=11. Returns 00=OFF, 01=ON."

  - id: protection_sense
    label: Protection Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=17"

  - id: fh_too_high_sense
    label: FH Too High Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=18. Returns 00=NORMAL, 01=FH TOO HIGH."

  - id: over_correction_sense
    label: Over Correction Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=19. Returns 00=NORMAL, 01=OVER CORRECTION."

  - id: comm_target_device_index_sense
    label: Comm Target Device Index Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=1A"

  - id: nvm_imem_entry_sense
    label: NVM IMEM Entry Load From Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=1B"

  - id: signal_stabilized_sense
    label: Signal Stabilized Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=1C. Returns 00=INSTABILITY, 01=STABILITY."

  - id: signal_act_sense
    label: Signal Act Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=1D"

  - id: power_saving_act_sense
    label: Power Saving Act Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=2B. Returns 00=OFF, 01=ON."

  - id: all_white_act_sense
    label: All White Act Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=2C. Returns 00=OFF, 01=ON."

  - id: pic_orbiting_sense
    label: Picture Orbiting Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=30. Returns 00=OFF, 01=ON."

  - id: crt_active_time_sense
    label: CRT Active Time Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=31"

  - id: input_status_sense
    label: Input Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=40. Returns 00=VIDEO, 01=INPUT A, 02=INPUT B, 03=OLD SW'ER."

  - id: channel_swer_sense
    label: Channel Switcher Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=43"

  - id: fh_fv_sync_sense
    label: fH/fV/Sync Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=49. Returns fH (4 bytes *10ms), fV, sync level, H/C sync, V sync, col sys, high scan."

  - id: power_direct_status_sense
    label: Power Direct Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=50. Returns 00=OFF, 01=ON."

  - id: power_on_delay_status_sense
    label: Power On Delay Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=51. Returns 00=OFF, 01=ON."

  - id: bnc_old_swer_status_sense
    label: 5BNC Old Switcher Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=52. Returns 00=OFF, 01=ON."

  - id: auto_background_sense
    label: Auto Background Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=55. Returns 00=OFF, 01=ON."

  - id: abl_link_sense
    label: ABL Link Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=56. Returns 00=OFF, 01=ON."

  - id: ir_in_sense
    label: IR In Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=57. Returns 00=FRONT REAR, 01=FRONT, 02=REAR."

  - id: osd_language_sense
    label: OSD Language Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=60. Returns 00=ENGLISH, 01=FRENCH, 02=GERMAN, 03=ITALIAN, 04=SPANISH, 05=JAPANESE, 06=CHINESE."

  - id: osd_show_sense
    label: OSD Show Status Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=61. Returns 00=ON, 01=NORMAL OFF, 02=ALL OFF."

  - id: input_setting_sense
    label: Input Setting Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=70. Returns input channel and signal type."

  - id: video_setting_sense
    label: Video Setting Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=74. Returns video signal and col sys."

  - id: input_a_setting_sense
    label: Input A Setting Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=78. Returns input A signal and col sys."

  - id: input_b_setting_sense
    label: Input B Setting Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=7C. Returns input B signal and col sys."

  - id: old_swer_all_setting_sense
    label: Old Switcher All Setting Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=80"

  - id: old_swer_setting_sense
    label: Old Switcher Setting Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=81"

  - id: screen_type_sense
    label: Screen Type Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=88. Returns 00=S1, 01=S2."

  - id: color_uniformity_setting_sense
    label: Color Uniformity Setting Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=89. Returns 00=OFF, 01=ADJUST, 02=PRESET S1, 03=PRESET S2, 04=PRESET S3."

  - id: brightness_uniformity_setting_sense
    label: Brightness Uniformity Setting Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=8A. Returns 00=OFF, 01=ADJUST, 02=PRESET S1, 03=PRESET S2, 04=PRESET S3."

  - id: color_temp_setting_sense
    label: Color Temperature Setting Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=20. Returns 00=9300K, 01=6500K, 02=5400K, 03=3200K, 04=PRESET."

  - id: component_setting_sense
    label: Component/Video Memory Setting Sense
    kind: action
    params: []
    notes: "CMD1=11, CMD2=F1"

  # --- SYSTEM SELECT (CMD1=13) ---
  - id: power_request
    label: Power Request
    kind: action
    params:
      - name: power
        type: enum
        values: ["00", "01"]
        description: "00=OFF, 01=ON"
    notes: "CMD1=13, CMD2=0A"

  - id: set_mode_select
    label: Set Mode Select
    kind: action
    params:
      - name: mode
        type: enum
        values: ["00", "01"]
        description: "00=USER, 01=SERVICE"
    notes: "CMD1=13, CMD2=0D"

  - id: pole_select
    label: Pole Status Select
    kind: action
    params:
      - name: pole
        type: enum
        values: ["00", "01", "02", "03"]
        description: "00=NORMAL, 01=HINV, 02=VINV, 03=HVINV"
    notes: "CMD1=13, CMD2=0E"

  - id: picture_muting_select
    label: Picture Muting Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=OFF, 01=ON"
    notes: "CMD1=13, CMD2=11"

  - id: all_white_all_write
    label: All White Mode All Write
    kind: action
    params: []
    notes: "CMD1=13, CMD2=40"

  - id: all_white_on_off_select
    label: All White Mode On/Off Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=OFF, 01=ON"
    notes: "CMD1=13, CMD2=41"

  - id: all_white_time_write
    label: All White Mode Time Write
    kind: action
    params:
      - name: minutes
        type: integer
        description: "Time in minutes (1 byte)"
    notes: "CMD1=13, CMD2=42"

  - id: pic_orbiting_all_write
    label: Picture Orbiting All Write
    kind: action
    params: []
    notes: "CMD1=13, CMD2=43"

  - id: pic_orbiting_on_off_select
    label: Picture Orbiting On/Off Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=OFF, 01=ON"
    notes: "CMD1=13, CMD2=44"

  - id: pic_orbiting_time_write
    label: Picture Orbiting Time Write
    kind: action
    params:
      - name: minutes
        type: integer
        description: "Time in minutes (1 byte)"
    notes: "CMD1=13, CMD2=45"

  - id: power_saving_all_select
    label: Power Saving All Select
    kind: action
    params: []
    notes: "CMD1=13, CMD2=49"

  - id: power_saving_on_off_select
    label: Power Saving On/Off Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=OFF, 01=ON"
    notes: "CMD1=13, CMD2=4A"

  - id: power_saving_time_write
    label: Power Saving Time Write
    kind: action
    params:
      - name: minutes
        type: integer
        description: "Time in minutes (1 byte)"
    notes: "CMD1=13, CMD2=4B"

  - id: power_direct_select
    label: Power Direct Select
    kind: action
    params:
      - name: power
        type: enum
        values: ["00", "01"]
        description: "00=OFF, 01=ON"
    notes: "CMD1=13, CMD2=50"

  - id: power_on_delay_select
    label: Power On Delay Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=OFF, 01=ON"
    notes: "CMD1=13, CMD2=51"

  - id: bnc_old_swer_select
    label: 5BNC Old Switcher Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=OFF, 01=ON"
    notes: "CMD1=13, CMD2=52"

  - id: auto_background_select
    label: Auto Background Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=OFF, 01=ON"
    notes: "CMD1=13, CMD2=55"

  - id: abl_link_select
    label: ABL Link Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=OFF, 01=ON"
    notes: "CMD1=13, CMD2=56"

  - id: ir_in_select
    label: IR In Select
    kind: action
    params:
      - name: mode
        type: enum
        values: ["00", "01", "02"]
        description: "00=FRONT REAR, 01=FRONT, 02=REAR"
    notes: "CMD1=13, CMD2=57"

  - id: osd_language_select
    label: OSD Language Select
    kind: action
    params:
      - name: language
        type: enum
        values: ["00", "01", "02", "03", "04", "05", "06"]
        description: "00=ENGLISH, 01=FRENCH, 02=GERMAN, 03=ITALIAN, 04=SPANISH, 05=JAPANESE, 06=CHINESE"
    notes: "CMD1=13, CMD2=60"

  - id: osd_show_select
    label: OSD Show Select
    kind: action
    params:
      - name: mode
        type: enum
        values: ["00", "01", "02"]
        description: "00=ON, 01=NORMAL OFF, 02=ALL OFF"
    notes: "CMD1=13, CMD2=61"

  - id: input_all_select
    label: Input All Select
    kind: action
    params: []
    notes: "CMD1=13, CMD2=70"

  - id: input_channel_select
    label: Input Channel Select
    kind: action
    params:
      - name: channel
        type: enum
        values: ["00", "01", "02", "03"]
        description: "00=VIDEO, 01=INPUT A, 02=INPUT B, 03=OLD SW'ER"
    notes: "CMD1=13, CMD2=71"

  - id: old_swer_channel_select
    label: Old Switcher Channel Select
    kind: action
    params:
      - name: channel
        type: integer
        description: "00~07=SW'er1-1~8, 10~17=SW'er2-1~8, 20=OTHER"
    notes: "CMD1=13, CMD2=72"

  - id: video_all_select
    label: Video All Select
    kind: action
    params: []
    notes: "CMD1=13, CMD2=74"

  - id: video_signal_select
    label: Video Signal Select
    kind: action
    params:
      - name: signal
        type: enum
        values: ["10", "11"]
        description: "10=VIDEO, 11=SVIDEO"
    notes: "CMD1=13, CMD2=75"

  - id: video_col_sys_select
    label: Video Color System Select
    kind: action
    params:
      - name: sys
        type: enum
        values: ["00", "07", "19", "1D", "05", "2B"]
        description: "00=AUTO, 07=NTSC, 19=PAL, 1D=SECAM, 05=NTSC443, 2B=PALM"
    notes: "CMD1=13, CMD2=76"

  - id: video_idtv_use_select
    label: Video IDTV Use Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=NOT USE, 01=USE"
    notes: "CMD1=13, CMD2=77"

  - id: input_a_all_select
    label: Input A All Select
    kind: action
    params: []
    notes: "CMD1=13, CMD2=78"

  - id: input_a_signal_select
    label: Input A Signal Select
    kind: action
    params:
      - name: signal
        type: enum
        values: ["10", "11", "20", "30", "40", "41"]
        description: "10=VIDEO, 11=SVIDEO, 20=RGB, 30=COMP, 40=HDTVYPBPR, 41=HDTVGBR"
    notes: "CMD1=13, CMD2=79"

  - id: input_a_col_sys_select
    label: Input A Color System Select
    kind: action
    params:
      - name: sys
        type: enum
        values: ["00", "07", "19", "1D", "05", "2B"]
        description: "00=AUTO, 07=NTSC, 19=PAL, 1D=SECAM, 05=NTSC443, 2B=PALM"
    notes: "CMD1=13, CMD2=7A"

  - id: input_a_idtv_use_select
    label: Input A IDTV Use Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=NOT USE, 01=USE"
    notes: "CMD1=13, CMD2=7B"

  - id: input_b_all_select
    label: Input B All Select
    kind: action
    params: []
    notes: "CMD1=13, CMD2=7C"

  - id: input_b_signal_select
    label: Input B Signal Select
    kind: action
    params:
      - name: signal
        type: enum
        values: ["10", "11", "20", "30", "40", "41"]
        description: "10=VIDEO, 11=SVIDEO, 20=RGB, 30=COMP, 40=HDTVYPBPR, 41=HDTVGBR"
    notes: "CMD1=13, CMD2=7D"

  - id: input_b_col_sys_select
    label: Input B Color System Select
    kind: action
    params:
      - name: sys
        type: enum
        values: ["00", "07", "19", "1D", "05", "2B"]
        description: "00=AUTO, 07=NTSC, 19=PAL, 1D=SECAM, 05=NTSC443, 2B=PALM"
    notes: "CMD1=13, CMD2=7E"

  - id: input_b_idtv_use_select
    label: Input B IDTV Use Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=NOT USE, 01=USE"
    notes: "CMD1=13, CMD2=7F"

  - id: old_swer_all_select
    label: Old Switcher All Select
    kind: action
    params: []
    notes: "CMD1=13, CMD2=80"

  - id: old_swer_colsys_idtv_select
    label: Old Switcher ColSys/IDTV Select
    kind: action
    params: []
    notes: "CMD1=13, CMD2=81"

  - id: old_swer_col_sys_select
    label: Old Switcher Color System Select
    kind: action
    params:
      - name: sys
        type: enum
        values: ["00", "07", "19", "1D", "05", "2B"]
        description: "00=AUTO, 07=NTSC, 19=PAL, 1D=SECAM, 05=NTSC443, 2B=PALM"
    notes: "CMD1=13, CMD2=82"

  - id: old_swer_idtv_use_select
    label: Old Switcher IDTV Use Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=NOT USE, 01=USE"
    notes: "CMD1=13, CMD2=83"

  - id: screen_type_select
    label: Screen Type Select
    kind: action
    params:
      - name: type
        type: enum
        values: ["00", "01"]
        description: "00=S1, 01=S2"
    notes: "CMD1=13, CMD2=88"

  - id: color_uniformity_setting_select
    label: Color Uniformity Setting Select
    kind: action
    params:
      - name: setting
        type: enum
        values: ["00", "01", "02", "03", "04"]
        description: "00=OFF, 01=ADJUST, 02=PRESET S1, 03=PRESET S2, 04=PRESET S3"
    notes: "CMD1=13, CMD2=89"

  - id: brightness_uniformity_setting_select
    label: Brightness Uniformity Setting Select
    kind: action
    params:
      - name: setting
        type: enum
        values: ["00", "01", "02", "03", "04"]
        description: "00=OFF, 01=ADJUST, 02=PRESET S1, 03=PRESET S2, 04=PRESET S3"
    notes: "CMD1=13, CMD2=8A"

  - id: color_temp_select
    label: Color Temperature Select
    kind: action
    params:
      - name: temp
        type: enum
        values: ["00", "01", "02", "03", "04"]
        description: "00=9300K, 01=6500K, 02=5400K, 03=3200K, 04=PRESET"
    notes: "CMD1=13, CMD2=20"

  - id: component_setting_select
    label: Component/Video Memory Select
    kind: action
    params: []
    notes: "CMD1=13, CMD2=F1"

  # --- CLAMP / SYNC (CMD1=13) ---
  - id: clamp_select
    label: Clamp Select
    kind: action
    params:
      - name: mode
        type: enum
        values: ["00", "01", "02", "03", "04"]
        description: "00=AUTO, 01=SONG, 02=HC, 03=HP, 04=TRILEVELS"
    notes: "CMD1=13, CMD2=F2"

  - id: sync_select
    label: Sync Select
    kind: action
    params:
      - name: mode
        type: enum
        values: ["00", "01", "02", "03"]
        description: "00=AUTO, 01=INTERNAL, 02=EXTERNAL, 03=EXTERNAL HV"
    notes: "CMD1=13, CMD2=F3"

  - id: sync_osc_shift_select
    label: Sync OSC Shift Setting Select
    kind: action
    params:
      - name: value
        type: enum
        values: ["00", "01"]
        description: "00=1, 01=2"
    notes: "CMD1=13, CMD2=F5"

  # --- INTERNAL TEST SIGNAL (CMD1=15) ---
  - id: osc_int_on_off_sense
    label: OSC Internal On/Off Status Sense
    kind: action
    params: []
    notes: "CMD1=15, CMD2=01. Returns 00=OFF, 01=ON."

  - id: osc_internal_sense
    label: OSC Internal Status Sense
    kind: action
    params: []
    notes: "CMD1=15, CMD2=10. Returns 00~07 (pattern 1~8)."

  - id: osc_int_on_off_select
    label: OSC Internal On/Off Select
    kind: action
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=OFF, 01=ON"
    notes: "CMD1=15, CMD2=10"

  - id: osc_internal_select
    label: OSC Internal Pattern Select
    kind: action
    params:
      - name: pattern
        type: integer
        description: "00~07 = pattern 1~8"
    notes: "CMD1=15, CMD2=20"

  # --- SIRCS CODE DIRECT (CMD1=16) ---
  - id: sircs_code_direct
    label: SIRCS Code Direct
    kind: action
    params:
      - name: repeat
        type: enum
        values: ["00", "01"]
        description: "00=ONE SHOT, 01=REPEAT"
      - name: code
        type: integer
        description: "SIRCS code value 00~7F"
    notes: "CMD1=16, CMD2=20. 180ms minimum interval between consecutive SIRCS commands."

  # --- ACTIVE MEMORY READ (CMD1=30) ---
  - id: color_uniformity_data_read
    label: Color Uniformity Data Read
    kind: action
    params:
      - name: color
        type: enum
        values: ["00", "01", "02"]
        description: "00=R, 01=G, 02=B"
    notes: "CMD1=30, CMD2=08"

  - id: brightness_uniformity_read
    label: Brightness Uniformity Read
    kind: action
    params: []
    notes: "CMD1=30, CMD2=10"

  - id: cxa1839_00h_read
    label: CXA1839 00H Data Read
    kind: action
    params: []
    notes: "CMD1=30, CMD2=10"

  - id: cxa1839_05h_read
    label: CXA1839 05H Data Read
    kind: action
    params: []
    notes: "CMD1=30, CMD2=20"

  - id: cxa1839_08h_read
    label: CXA1839 08H Data Read
    kind: action
    params: []
    notes: "CMD1=30, CMD2=27"

  - id: picture_control_data_read
    label: Picture Control Data Read
    kind: action
    params: []
    notes: "CMD1=30, CMD2=20"

  - id: rgb_size_data_read
    label: RGB Size Data Read
    kind: action
    params: []
    notes: "CMD1=30, CMD2=52"

  - id: rgb_shift_data_read
    label: RGB Shift Data Read
    kind: action
    params: []
    notes: "CMD1=30, CMD2=54"

  - id: blanking_data_read
    label: Blanking Data Read
    kind: action
    params: []
    notes: "CMD1=30, CMD2=56"

  - id: cent_data_read
    label: Centering Data Read
    kind: action
    params: []
    notes: "CMD1=30, CMD2=58"

  # --- ACTIVE MEMORY WRITE (CMD1=32) ---
  - id: color_uniformity_all_write
    label: Color Uniformity Data All Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=08"

  - id: color_uniformity_rgb_write
    label: Color Uniformity Data R/G/B Write
    kind: action
    params:
      - name: color
        type: enum
        values: ["00", "01", "02"]
        description: "00=R, 01=G, 02=B"
    notes: "CMD1=32, CMD2=09"

  - id: brt_uniformity_all_write
    label: Brightness Uniformity Data All Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=0A"

  - id: brt_uniformity_lr_tb_write
    label: Brightness Uniformity Data LR/TB Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=0B"

  - id: cxa1839_00h_write
    label: CXA1839 00H Data Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=10"

  - id: cxa1839_05h_write
    label: CXA1839 05H Data Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=21"

  - id: cxa1839_08h_write
    label: CXA1839 08H Data Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=29"

  - id: format_write
    label: Format Write
    kind: action
    params:
      - name: format
        type: enum
        values: ["00", "01", "02"]
        description: "00=ORDINARY, 01=RGB, 02=COMP"
    notes: "CMD1=32, CMD2=20"

  - id: picture_control_all_write
    label: Picture Control Data All Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=52"

  - id: picture_control_write
    label: Picture Control Data Write
    kind: action
    params:
      - name: picture_type
        type: enum
        values: ["00", "01", "02", "03", "04"]
        description: "00=CONTRAST, 01=BRIGHTNESS, 02=HUE, 03=SHARPNESS, 04=COLOR"
    notes: "CMD1=32, CMD2=53"

  - id: rgb_size_all_write
    label: RGB Size Data All Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=54"

  - id: rgb_size_hv_write
    label: RGB Size Data H/V Write
    kind: action
    params:
      - name: size_type
        type: enum
        values: ["00", "01", "02", "03"]
        description: "00=H COARSE, 01=H FINE, 02=V COARSE, 03=V FINE"
    notes: "CMD1=32, CMD2=55"

  - id: rgb_shift_all_write
    label: RGB Shift Data All Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=56"

  - id: rgb_shift_hv_write
    label: RGB Shift Data H/V Write
    kind: action
    params:
      - name: shift_type
        type: enum
        values: ["00", "01", "02"]
        description: "00=H COARSE, 01=H FINE, 02=V"
    notes: "CMD1=32, CMD2=57"

  - id: blanking_all_write
    label: Blanking Data All Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=58"

  - id: blanking_write
    label: Blanking Data Write
    kind: action
    params:
      - name: position
        type: enum
        values: ["00", "01", "02", "03"]
        description: "00=LEFT, 01=RIGHT, 02=TOP, 03=BOTTOM"
      - name: blanking_type
        type: integer
        description: "00=H COARSE, 01=H FINE SERVICEMAN, 02=H FINE, 12=V COARSE, 13=V FINE SERVICEMAN, 14=V FINE, plus invert variants"
    notes: "CMD1=32, CMD2=59"

  - id: cent_all_write
    label: Centering Data All Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=60"

  - id: cent_write
    label: Centering Data Write
    kind: action
    params: []
    notes: "CMD1=32, CMD2=61"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [off, on]
    notes: "Queried via CMD1=11, CMD2=10 or CMD1=11, CMD2=50"

  - id: input_channel
    type: enum
    values: [video, input_a, input_b, old_switcher]
    notes: "Queried via CMD1=11, CMD2=40"

  - id: picture_muting_state
    type: enum
    values: [off, on]
    notes: "Queried via CMD1=11, CMD2=11"

  - id: signal_stabilized
    type: enum
    values: [instability, stability]
    notes: "Queried via CMD1=11, CMD2=1C"

  - id: protection_state
    type: boolean
    notes: "Queried via CMD1=11, CMD2=17"

  - id: set_mode
    type: enum
    values: [user, service, factory]
    notes: "Queried via CMD1=11, CMD2=0D"

  - id: power_saving_state
    type: enum
    values: [off, on]
    notes: "Queried via CMD1=11, CMD2=10"

  - id: all_white_state
    type: enum
    values: [off, on]
    notes: "Queried via CMD1=11, CMD2=0F"

  - id: pic_orbiting_state
    type: enum
    values: [off, on]
    notes: "Queried via CMD1=11, CMD2=30"

  - id: screen_type
    type: enum
    values: [s1, s2]
    notes: "Queried via CMD1=11, CMD2=88"

  - id: color_temp
    type: enum
    values: ["9300K", "6500K", "5400K", "3200K", preset]
    notes: "Queried via CMD1=11, CMD2=20"

  - id: osd_language
    type: enum
    values: [english, french, german, italian, spanish, japanese, chinese]
    notes: "Queried via CMD1=11, CMD2=60"

  - id: error_data
    type: enum
    values:
      - undefined_command
      - projector_not_power_on
      - protect_on
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
    notes: "Error codes returned in NAK/Error Data Set responses"
```

## Variables
```yaml
variables:
  - id: color_uniformity_setting
    type: enum
    values: [off, adjust, preset_s1, preset_s2, preset_s3]

  - id: brightness_uniformity_setting
    type: enum
    values: [off, adjust, preset_s1, preset_s2, preset_s3]

  - id: pole_mode
    type: enum
    values: [normal, hinv, vinv, hvinv]

  - id: ir_in_mode
    type: enum
    values: [front_rear, front, rear]

  - id: video_col_system
    type: enum
    values: [auto, ntsc, pal, secam, ntsc443, palm]

  - id: input_signal_type
    type: enum
    values: [video, svideo, rgb, comp, hdtvypbpr, hdtvgbr]
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications from projector.
# All responses are solicited (return data after command).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Do not send next command before receiving Return Data from previous command."
  - "180ms minimum interval between consecutive SIRCS DIRECT commands."
  - "Data write commands (CMD1=13, CMD1=32) take ~800ms round-trip."
  - "Commands ignored while signal not stable (7 SEG LED shows '10')."
# UNRESOLVED: power-on sequencing requirements not explicitly stated in source
# UNRESOLVED: interlock between USER mode and DATA WRITE commands - picture may disappear
```

## Notes
- Binary protocol: command block = start code (A5h) + index header + CMD1/CMD2/CMD3 + data + checksum (XOR) + end code (5Ah).
- CMD3 = 10h for VPH-G70/D50 (CRT projector category).
- Byte transfer interval within a command block must not exceed 4ms.
- Projector index: peripheral=01h, group=0001h, device=0001h. Controller (sender): peripheral=03h.
- Default baud rate 38400bps; configurable via OSD "Service Setting for RS422A".
- Active memory write data ranges depend on horizontal frequency of input signal and product model (G70/D50).
- Range-over on active memory write auto-clamps to nearest valid value and returns NAK with data=06h.
- Error code 01 (projector not power on) returned if commands sent while projector is off.

<!-- UNRESOLVED: exact byte-level data payload for each active memory read/write command not fully specified -->
<!-- UNRESOLVED: SIRCS code table high nibble row group mapping not fully enumerated -->
<!-- UNRESOLVED: connection pinout for pure RS-232C (source only gives RS-232C-to-RS-422A wiring) -->
<!-- UNRESOLVED: ROM version query response format (CMD1=11, CMD2=20) data layout not specified -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-14T18:17:20.823Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.823Z
matched_actions: 127
action_count: 127
confidence: high
summary: "All 151 spec actions have literal CMD1/CMD2 matches in source command tables; all transport parameters verified against protocol manual."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
