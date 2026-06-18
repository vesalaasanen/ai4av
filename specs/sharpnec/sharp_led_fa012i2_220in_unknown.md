---
spec_id: admin/sharp-nec-led-fa012i2-220in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FA012I2 220IN Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FA012I2 220IN"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FA012I2 220IN"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:50:41.365Z
last_checked_at: 2026-06-17T20:12:56.201Z
generated_at: 2026-06-17T20:12:56.201Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"LED FA012I2 220IN\" taken from device name supplied to formatter; the source manual is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) and does not print the product model."
  - "ID2 (model code) value not stated; varies by model in use."
  - "Appendix \"Supplementary Information by Command\" referenced for input terminal, aspect, eco mode, base model type, and sub-input enum values is not included in the refined source excerpt."
  - "source states \"Full duplex\" communication mode and wires RTS/CTS on the D-SUB 9P, but does not name a flow-control setting."
  - "appendix not in excerpt.\""
  - "appendix not in excerpt).\""
  - "source describes no unsolicited notifications / push events."
  - "source describes no named multi-step command sequences."
  - "no explicit safety-interlock procedure, power-on sequencing requirement,"
  - "source Appendix \"Supplementary Information by Command\" not present in refined excerpt — input terminal enum, aspect enum, eco mode enum, base model type enum, and sub-input enum values missing."
  - "ID2 model code value for LED FA012I2 220IN not stated."
  - "flow_control setting not named (RTS/CTS pins wired but only \"Full duplex\" stated)."
  - "wireless LAN unit models / wireless communication parameters not specified in source (deferred to projector operation manual)."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:12:56.201Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match literal command sequences in source §3 detailed sections; all transport parameters verified in §1.2 connection specifications. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC LED FA012I2 220IN Control Spec

## Summary
Sharp/NEC large-format LED projector (BDT140013 Rev 7.1 control command reference). Supports RS-232C serial control and wired/wireless LAN (TCP) control. Binary frame protocol with per-command hex opcodes, ID1/ID2 model/control parameters, and a trailing additive checksum byte. Spec enumerates all 56 documented commands including power, mute, input switch, lens control/memory, picture/volume/aspect adjust, and status/error/lamp/filter information queries.

<!-- UNRESOLVED: model name "LED FA012I2 220IN" taken from device name supplied to formatter; the source manual is a generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1) and does not print the product model. -->
<!-- UNRESOLVED: ID2 (model code) value not stated; varies by model in use. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal, aspect, eco mode, base model type, and sub-input enum values is not included in the refined source excerpt. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists supported rates: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode and wires RTS/CTS on the D-SUB 9P, but does not name a flow-control setting.
addressing:
  port: 7142  # TCP port for command send/receive per source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: 015 POWER ON / 016 POWER OFF present
  - queryable     # inferred: 009/037/037-3/037-4/037-6/053-1/053-5/053-7/053-11/060-1/078-1..6/084/097-8/097-45/097-155/097-198/097-243-1/305-1/305-2/305-3 query commands present
  - levelable     # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST present
  - routable      # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
actions:
  - id: cmd_009_error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response frame: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>. DATA1-12 = bit-packed error flags (0=normal, 1=error)."

  - id: cmd_015_power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on sequence runs. Ack: 22h 00h <ID1> <ID2> 00h <CKS>."

  - id: cmd_016_power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time. Ack: 22h 01h <ID1> <ID2> 00h <CKS>."

  - id: cmd_018_input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Input terminal code (e.g. 06h = video). Full enum in source Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in excerpt."
    notes: "Ack: 22h 03h <ID1> <ID2> 01h <DATA01> <CKS>; FFh = ended with error (no switch made)."

  - id: cmd_020_picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video switch."

  - id: cmd_021_picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: cmd_022_sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Cleared by input/video switch or volume adjustment."

  - id: cmd_023_sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: cmd_024_onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Cleared by input/video switch."

  - id: cmd_025_onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: cmd_030_1_picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Ack DATA01-02=0000h success, else error. Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

  - id: cmd_030_2_volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: cmd_030_12_aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Aspect value - full enum in source Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in excerpt)."

  - id: cmd_030_15_other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjustment target high byte (source: 96h for LAMP ADJUST / LIGHT ADJUST)."
      - name: data02
        type: integer
        description: "Adjustment target low byte (source: FFh)."
      - name: data03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)."

  - id: cmd_037_information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA1-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-min intervals."

  - id: cmd_037_3_filter_usage_info_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "DATA1-4 filter usage seconds; DATA5-8 filter alarm start seconds. -1 if undefined."

  - id: cmd_037_4_lamp_info_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: data02
        type: integer
        description: "Content: 01h=usage seconds, 04h=remaining life %."

  - id: cmd_037_6_carbon_savings_info_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    notes: "DATA2-5 kg (max 99999), DATA6-9 mg (max 999999)."

  - id: cmd_050_remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD type). See source key-code list (e.g. 05h=AUTO, 06h=MENU, 29h=PICTURE)."
      - name: data02
        type: integer
        description: "Key code high byte (00h for all listed keys)."
    notes: "Ack DATA01=FFh = ended with error. Full 28-entry key code list documented in source (POWER ON/OFF, AUTO, MENU, arrows, ENTER, EXIT, MAGNIFY, MUTE, PICTURE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, FREEZE, ASPECT, SOURCE, LAMP MODE/ECO)."

  - id: cmd_051_shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: cmd_052_shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: cmd_053_lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Target (source documents 06h = Periphery Focus; other lens targets per Appendix - UNRESOLVED)."
      - name: data02
        type: integer
        description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    notes: "After 7Fh/81h, send 00h to stop. Same command can be reissued during drive without stop."

  - id: cmd_053_1_lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Lens target (matches DATA01 of cmd_053_lens_control)."

  - id: cmd_053_2_lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Target (FFh=Stop, per source)."
      - name: data02
        type: integer
        description: "Mode: 00h=absolute, 02h=relative."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "When DATA01=FFh (Stop), mode/value ignored."

  - id: cmd_053_3_lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."

  - id: cmd_053_4_reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Acts on profile number set via cmd_053_10_lens_profile_set."

  - id: cmd_053_5_lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

  - id: cmd_053_6_lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: data02
        type: integer
        description: "Setting: 00h=OFF, 01h=ON."

  - id: cmd_053_7_lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) (0=Stop, 1=During operation)."

  - id: cmd_053_10_lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Profile: 00h=Profile 1, 01h=Profile 2."

  - id: cmd_053_11_lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: cmd_060_1_gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    notes: "Returns range limits, default, current, wide/narrow adjustment widths."

  - id: cmd_078_1_setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "DATA1-3 base model type, DATA4 sound function, DATA5 profile/clock/sleep-timer function."

  - id: cmd_078_2_running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "DATA3 power (00h standby, 01h on), DATA4 cooling, DATA5 power on/off process, DATA6 operation status."

  - id: cmd_078_3_input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: cmd_078_4_mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "DATA1 picture mute, DATA2 sound mute, DATA3 onscreen mute, DATA4 forced onscreen mute, DATA5 onscreen display."

  - id: cmd_078_5_model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cmd_078_6_cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "DATA1: 00h=Normal (cover opened), 01h=Cover closed."

  - id: cmd_079_freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "01h=freeze on, 02h=freeze off."

  - id: cmd_084_information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: integer
        description: "03h=horizontal sync frequency, 04h=vertical sync frequency."

  - id: cmd_097_8_eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode or Lamp mode depending on projector."

  - id: cmd_097_45_lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: cmd_097_155_lan_mac_address_request_2
    label: LAN MAC Address Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: cmd_097_198_pip_pbypb_request
    label: PIP / Picture-by-Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: cmd_097_243_1_edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: cmd_098_8_eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Eco mode value - full enum in source Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in excerpt)."

  - id: cmd_098_45_lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: data01_16
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated."

  - id: cmd_098_198_pip_pbypb_set
    label: PIP / Picture-by-Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: data02
        type: integer
        description: "MODE value (00h=PIP, 01h=PICTURE BY PICTURE); START POSITION (00h TOP-LEFT .. 03h BOTTOM-RIGHT); or sub-input value per Appendix."

  - id: cmd_098_243_1_edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Setting: 00h=OFF, 01h=ON."

  - id: cmd_305_1_base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: cmd_305_2_serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: cmd_305_3_basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "DATA1 operation status, DATA2 content displayed, DATA3-5 signal type, DATA6-9 mute/freeze flags."

  - id: cmd_319_10_audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Input terminal - full enum in source Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in excerpt)."
      - name: data02
        type: integer
        description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: cmd_078_2 DATA06 / cmd_305_3 DATA01
  - id: cooling_process
    type: enum
    values: [not_executed, during_execution]
    source: cmd_078_2 DATA04
  - id: error_status
    type: bitmask
    description: "12-byte error bitfield returned by cmd_009; cover/fan/temperature/power/lamp/mirror-cover/interlock/system errors."
  - id: picture_mute
    type: enum
    values: [off, on]
    source: cmd_078_4 DATA01
  - id: sound_mute
    type: enum
    values: [off, on]
    source: cmd_078_4 DATA02
  - id: onscreen_mute
    type: enum
    values: [off, on]
    source: cmd_078_4 DATA03
  - id: cover_status
    type: enum
    values: [normal_open, closed]
    source: cmd_078_6 DATA01
  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: cmd_037 / cmd_037_4
  - id: filter_usage_time
    type: integer
    unit: seconds
    source: cmd_037_3 DATA01-04
  - id: freeze_state
    type: enum
    values: [off, on]
    source: cmd_305_3 DATA09
  - id: lens_status
    type: bitmask
    description: "Lens memory/zoom/focus/lens-shift-H/lens-shift-V operation state from cmd_053_7 DATA01."
  - id: execution_result
    type: enum
    values: [success, error]
    description: "Common ack DATA01-02: 0000h success, else error. ERR1/ERR2 code per source §2.4."
```

## Variables
```yaml
variables:
  - id: picture_brightness
    type: integer
    source: cmd_030_1 DATA01=00h / cmd_060_1 DATA01=00h
  - id: picture_contrast
    type: integer
    source: cmd_030_1 DATA01=01h / cmd_060_1 DATA01=01h
  - id: picture_color
    type: integer
    source: cmd_030_1 DATA01=02h / cmd_060_1 DATA01=02h
  - id: picture_hue
    type: integer
    source: cmd_030_1 DATA01=03h / cmd_060_1 DATA01=03h
  - id: picture_sharpness
    type: integer
    source: cmd_030_1 DATA01=04h / cmd_060_1 DATA01=04h
  - id: volume
    type: integer
    source: cmd_030_2 / cmd_060_1 DATA01=05h
  - id: lamp_light_adjust
    type: integer
    source: cmd_030_15 / cmd_060_1 DATA01=96h
  - id: eco_mode
    type: integer
    source: cmd_097_8 / cmd_098_8
  - id: projector_name
    type: string
    max_length: 16
    source: cmd_097_45 / cmd_098_45
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: cmd_097_243_1 / cmd_098_243_1
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    source: cmd_053_10 / cmd_053_11
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events.
# All responses are direct replies to commands (see §2.3 Responses).
```

## Macros
```yaml
# UNRESOLVED: source describes no named multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "During POWER ON sequence, no other command accepted (cmd_015)."
  - description: "During POWER OFF (incl. cooling time), no other command accepted (cmd_016)."
  - description: "Forced onscreen mute may block certain commands (error code 02h 04h)."
  - description: "Power-off state rejects most commands (error code 02h 0Dh)."
  - description: "Interlock switch open reported in cmd_009 DATA09 Bit1 (error condition)."
# UNRESOLVED: no explicit safety-interlock procedure, power-on sequencing requirement,
# or hot-swap instruction stated in the source beyond the per-command interlock notes above.
```

## Notes
- **Frame format** (source §2.1): every command/response is a hex byte series. Command frames carry leading opcodes followed by `<ID1> <ID2>` (control ID, model code) and a trailing `<CKS>` checksum.
- **Checksum** (`<CKS>`, source §2.2): sum of all preceding bytes, low-order 8 bits. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- **Response framing**: success with no data uses leading byte `2xh`; success with data uses `2xh` + LEN + DATA; failure uses `Axh` + `<ERR1> <ERR2> <CKS>`.
- **ID1** = projector control ID (must match projector setting). **ID2** = model code (varies by model; value not in source).
- **Error codes**: full ERR1/ERR2 table in source §2.4 (unrecognized command, unsupported model, invalid value, invalid input terminal, memory errors, no signal, power off, no authority, etc.).
- **Refresh granularity**: lamp/filter usage time returned in 1-second units but updated only at 1-minute intervals (cmd_037, cmd_037_4).
- **Two-lamp models**: lamp 2 selectors (DATA01=01h) in cmd_037_4 effective only on two-lamp projectors.
- Serial cable must be cross (null-modem); LAN cable straight or cross per network admin.

<!-- UNRESOLVED: source Appendix "Supplementary Information by Command" not present in refined excerpt — input terminal enum, aspect enum, eco mode enum, base model type enum, and sub-input enum values missing. -->
<!-- UNRESOLVED: ID2 model code value for LED FA012I2 220IN not stated. -->
<!-- UNRESOLVED: flow_control setting not named (RTS/CTS pins wired but only "Full duplex" stated). -->
<!-- UNRESOLVED: wireless LAN unit models / wireless communication parameters not specified in source (deferred to projector operation manual). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:50:41.365Z
last_checked_at: 2026-06-17T20:12:56.201Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:12:56.201Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match literal command sequences in source §3 detailed sections; all transport parameters verified in §1.2 connection specifications. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"LED FA012I2 220IN\" taken from device name supplied to formatter; the source manual is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) and does not print the product model."
- "ID2 (model code) value not stated; varies by model in use."
- "Appendix \"Supplementary Information by Command\" referenced for input terminal, aspect, eco mode, base model type, and sub-input enum values is not included in the refined source excerpt."
- "source states \"Full duplex\" communication mode and wires RTS/CTS on the D-SUB 9P, but does not name a flow-control setting."
- "appendix not in excerpt.\""
- "appendix not in excerpt).\""
- "source describes no unsolicited notifications / push events."
- "source describes no named multi-step command sequences."
- "no explicit safety-interlock procedure, power-on sequencing requirement,"
- "source Appendix \"Supplementary Information by Command\" not present in refined excerpt — input terminal enum, aspect enum, eco mode enum, base model type enum, and sub-input enum values missing."
- "ID2 model code value for LED FA012I2 220IN not stated."
- "flow_control setting not named (RTS/CTS pins wired but only \"Full duplex\" stated)."
- "wireless LAN unit models / wireless communication parameters not specified in source (deferred to projector operation manual)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
