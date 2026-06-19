---
spec_id: admin/sharp-nec-led-fa019i2-165in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FA019I2 165IN Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FA019I2 165IN"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FA019I2 165IN"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:03:57.880Z
last_checked_at: 2026-06-18T08:20:50.948Z
generated_at: 2026-06-18T08:20:50.948Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source"
  - "exact input terminal value table (DATA01 values for 018/319-10) referenced as \"Appendix\" but not present in source"
  - "aspect value table, eco mode value table, sub input value table, base model type value table — all referenced to \"Appendix\" not present in source"
  - "serial connection uses cross cable to PC CONTROL (D-SUB 9P); specific flow_control (RTS/CTS hardware) not explicitly stated though RTS/CTS pins are wired"
  - "full input terminal value table not in source.\""
  - "value table in Appendix not present in source.\""
  - "value table in Appendix not present.\""
  - "base model type value table in Appendix not present.\""
  - "input terminal value table in Appendix not present.\""
  - "exact min/max from gain_parameter_request DATA02-05, source gives field layout not fixed limits"
  - "value table referenced to Appendix not present in source"
  - "source contains no explicit power-on sequencing procedure or"
  - "model code (ID2) value for LED FA019I2 165IN not stated"
  - "input terminal value table (Appendix) not present — affects 018 INPUT SW CHANGE and 319-10 AUDIO SELECT SET"
  - "aspect value table (Appendix) not present — affects 030-12"
  - "eco mode value table (Appendix) not present — affects 097-8 / 098-8"
  - "sub input setting value table (Appendix) not present — affects 097-198 / 098-198"
  - "base model type value table (Appendix) not present — affects 078-1 / 305-1"
  - "firmware version compatibility range not stated"
  - "exact numeric min/max adjustment limits not fixed in source (runtime-discoverable via gain_parameter_request)"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:20:50.948Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to hex sequences in source command catalogue; transport values fully supported; coverage 53/53. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FA019I2 165IN Control Spec

## Summary
Sharp/NEC LED FA019I2 165IN large-format LED projector. Controlled via RS-232C serial or wired/wireless LAN (TCP). Binary hex-framed command protocol; commands and responses are byte sequences with a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes). This spec covers the full BDT140013 Rev 7.1 command catalogue documented in the source.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: exact input terminal value table (DATA01 values for 018/319-10) referenced as "Appendix" but not present in source -->
<!-- UNRESOLVED: aspect value table, eco mode value table, sub input value table, base model type value table — all referenced to "Appendix" not present in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; using highest
  baud_rates_supported: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex"; flow_control scheme not specified
addressing:
  port: 7142  # TCP port for LAN command send/receive (stated in source)
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: serial connection uses cross cable to PC CONTROL (D-SUB 9P); specific flow_control (RTS/CTS hardware) not explicitly stated though RTS/CTS pins are wired -->

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: extensive status/info request commands present
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST present
  - routable     # inferred: INPUT SW CHANGE (input selection) command present
```

## Actions
```yaml
# All command payloads verbatim from source (hex bytes, space-separated).
# Frame: every command begins with a header byte and ends with <CKS> checksum
# (low-order 8 bits of sum of all preceding bytes). <ID1>=control ID, <ID2>=model code.

- id: error_status_request_009
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "009. ERROR STATUS REQUEST. Response returns DATA01-DATA12 error bitfield."

- id: power_on_015
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "015. POWER ON. No other command accepted while power turning on."

- id: power_off_016
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "016. POWER OFF. No other command accepted during power-off incl. cooling time."

- id: input_sw_change_018
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
  params:
    - name: input
      type: string
      description: "DATA01 input terminal hex value (e.g. 06h = video port). See Appendix - UNRESOLVED: full input terminal value table not in source."
  notes: "018. INPUT SW CHANGE. Example: 02h 03h 00h 00h 02h 01h 06h 0Eh (video). Response FFh in DATA01 = error/no signal switch."

- id: picture_mute_on_020
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "020. PICTURE MUTE ON. Cleared by input/video switch."

- id: picture_mute_off_021
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on_022
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "022. Cleared by input/video switch or volume adjust."

- id: sound_mute_off_023
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on_024
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off_025
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: string
      description: "DATA01: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: string
      description: "DATA02: 00h=absolute, 01h=relative"
    - name: value_lo
      type: string
      description: "DATA03 adjustment value low-order 8 bits"
    - name: value_hi
      type: string
      description: "DATA04 adjustment value high-order 8 bits"
  notes: "030-1. Example set brightness 10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Response DATA01+DATA02 0000h=ok."

- id: volume_adjust_030_2
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: string
      description: "DATA01: 00h=absolute, 01h=relative"
    - name: value_lo
      type: string
      description: "DATA02 adjustment value low 8 bits"
    - name: value_hi
      type: string
      description: "DATA03 adjustment value high 8 bits"
  notes: "030-2. Example set volume 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust_030_12
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {checksum}"
  params:
    - name: value
      type: string
      description: "DATA01 aspect value. UNRESOLVED: value table in Appendix not present in source."
  notes: "030-12. ASPECT ADJUST."

- id: other_adjust_030_15
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: string
      description: "DATA03: 00h=absolute, 01h=relative"
    - name: value_lo
      type: string
      description: "DATA04 low 8 bits"
    - name: value_hi
      type: string
      description: "DATA05 high 8 bits"
  notes: "030-15. OTHER ADJUST. DATA01=96h DATA02=FFh = LAMP/LIGHT ADJUST."

- id: information_request_037
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "037. Response DATA01-49 projector name, DATA83-86 lamp usage sec, DATA87-90 filter usage sec. Updated per minute."

- id: filter_usage_info_request_037_3
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "037-3. Response DATA01-04 filter usage sec, DATA05-08 filter alarm start sec. -1 if undefined."

- id: lamp_info_request_037_4
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: string
      description: "DATA01: 00h=Lamp1, 01h=Lamp2 (Lamp2 only on two-lamp models)"
    - name: content
      type: string
      description: "DATA02: 01h=usage time sec, 04h=remaining life %"
  notes: "037-4. Example get lamp1 usage: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if past deadline."

- id: carbon_savings_request_037_6
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {checksum}"
  params:
    - name: type
      type: string
      description: "DATA01: 00h=Total, 01h=During operation"
  notes: "037-6. Response DATA02-05 kg, DATA06-09 mg."

- id: remote_key_code_050
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: string
      description: "DATA01 key code low byte"
    - name: data02
      type: string
      description: "DATA02 key code high byte"
  notes: "050. REMOTE KEY CODE. Key codes (DATA01/DATA02): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO. Response DATA01 FFh = error."

- id: shutter_close_051
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: "051. SHUTTER CLOSE (lens shutter)."

- id: shutter_open_052
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control_053
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {target} {content} {checksum}"
  params:
    - name: target
      type: string
      description: "DATA01 target (06h = Periphery Focus in source row)"
    - name: content
      type: string
      description: "DATA02: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "053. Send 00h to stop after 7Fh/81h continuous drive. Response DATA01 FFh = error."

- id: lens_control_request_053_1
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: string
      description: "DATA01 lens target identifier"
  notes: "053-1. Response DATA02-07 upper/lower/current value (lo/hi bytes)."

- id: lens_control_2_053_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: string
      description: "DATA01: FFh=Stop (mode/value ignored)"
    - name: mode
      type: string
      description: "DATA02: 00h=absolute, 02h=relative"
    - name: value_lo
      type: string
      description: "DATA03 low 8 bits"
    - name: value_hi
      type: string
      description: "DATA04 high 8 bits"
  notes: "053-2. LENS CONTROL 2."

- id: lens_memory_control_053_3
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: string
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "053-3. LENS MEMORY CONTROL. Response FFh = error."

- id: reference_lens_memory_control_053_4
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: string
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "053-4. Controls profile number set via 053-10. Response FFh = error."

- id: lens_memory_option_request_053_5
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: string
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "053-5. Response DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set_053_6
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {setting} {checksum}"
  params:
    - name: option
      type: string
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: setting
      type: string
      description: "DATA02: 00h=OFF, 01h=ON"
  notes: "053-6. LENS MEMORY OPTION SET."

- id: lens_information_request_053_7
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "053-7. Response DATA01 bitfield: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift H, Bit4 Lens Shift V (0=Stop, 1=During operation)."

- id: lens_profile_set_053_10
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: string
      description: "DATA01: 00h=Profile 1, 01h=Profile 2"
  notes: "053-10. Selects reference lens memory profile number."

- id: lens_profile_request_053_11
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "053-11. Response DATA01: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_060_1
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: string
      description: "DATA01: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "060-1. Response DATA01 status (00h display-not-possible, 01h adjust-not-possible, 02h possible, FFh no such gain), DATA02-13 limits/defaults/current/widths."

- id: setting_request_078_1
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "078-1. Response DATA01-03 base model type, DATA04 sound function, DATA05 profile/clock/sleep."

- id: running_status_request_078_2
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "078-2. Response DATA03 power (00h Standby, 01h Power on), DATA04 cooling, DATA05 power process, DATA06 operation status (00h Standby Sleep, 04h Power on, 05h Cooling, 06h Standby error, 0Fh Power saving, 10h Network standby)."

- id: input_status_request_078_3
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "078-3. Response: DATA01 signal switch, DATA02 signal list number (value is list_no - 1), DATA03 selection signal type 1, DATA04 type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER1-5, 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER6-10), DATA05 list type, DATA06 test pattern, DATA09 content displayed."

- id: mute_status_request_078_4
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "078-4. Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h/01h)."

- id: model_name_request_078_5
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "078-5. Response DATA01-32 model name (NUL-terminated)."

- id: cover_status_request_078_6
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "078-6. Response DATA01: 00h Normal (cover opened), 01h Cover closed."

- id: freeze_control_079
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: string
      description: "DATA01: 01h=freeze on, 02h=freeze off"
  notes: "079. FREEZE CONTROL."

- id: information_string_request_084
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
  params:
    - name: type
      type: string
      description: "DATA01: 03h=horizontal sync freq, 04h=vertical sync freq"
  notes: "084. Response DATA02 string length, DATA03.. label/info string (NUL-terminated)."

- id: eco_mode_request_097_8
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "097-8. Response DATA01 eco mode value. UNRESOLVED: value table in Appendix not present."

- id: lan_projector_name_request_097_45
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "097-45. Response DATA01-17 projector name (NUL-terminated)."

- id: lan_mac_address_request_097_155
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "097-155. Response DATA01-06 MAC address."

- id: pip_pbp_request_097_198
  label: PIP/Picture-By-Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
  params:
    - name: item
      type: string
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "097-198. Response DATA02 setting (MODE: 00h PIP/01h PBP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub-input values per Appendix)."

- id: edge_blending_request_097_243_1
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "097-243-1. Response DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set_098_8
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: string
      description: "DATA01 eco mode value. UNRESOLVED: value table in Appendix not present."
  notes: "098-8. Sets Light/Lamp mode depending on model."

- id: lan_projector_name_set_098_45
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_01}-{name_16} 00h {checksum}"
  params:
    - name: name_01
      type: string
      description: "DATA01 name byte 1"
    - name: name_16
      type: string
      description: "DATA16 name byte 16 (up to 16 bytes total, NUL-terminated)"
  notes: "098-45."

- id: pip_pbp_set_098_198
  label: PIP/Picture-By-Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
  params:
    - name: item
      type: string
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: string
      description: "DATA02 setting (MODE: 00h PIP/01h PBP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub-input per Appendix)"
  notes: "098-198."

- id: edge_blending_set_098_243_1
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: string
      description: "DATA01: 00h=OFF, 01h=ON"
  notes: "098-243-1."

- id: base_model_type_request_305_1
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "305-1. Response DATA01-02 base model type, DATA03-11 model name, DATA12-13 base model type. UNRESOLVED: base model type value table in Appendix not present."

- id: serial_number_request_305_2
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "305-2. Response DATA01-16 serial number (NUL-terminated)."

- id: basic_information_request_305_3
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "305-3. Response DATA01 operation status, DATA02 content displayed, DATA03/04 selection signal type, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze."

- id: audio_select_set_319_10
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {setting} {checksum}"
  params:
    - name: input
      type: string
      description: "DATA01 input terminal. UNRESOLVED: input terminal value table in Appendix not present."
    - name: setting
      type: string
      description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  notes: "319-10. AUDIO SELECT SET. Response DATA02: 00h success, 01h error."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on]
  source: running_status_request_078_2 DATA03 (00h/01h)
- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request_078_2 DATA06
- id: cooling_in_progress
  type: enum
  values: [not_executed, during_execution]
  source: running_status_request_078_2 DATA04
- id: picture_mute
  type: enum
  values: [off, on]
  source: mute_status_request_078_4 DATA01
- id: sound_mute
  type: enum
  values: [off, on]
  source: mute_status_request_078_4 DATA02
- id: onscreen_mute
  type: enum
  values: [off, on]
  source: mute_status_request_078_4 DATA03
- id: forced_onscreen_mute
  type: enum
  values: [off, on]
  source: mute_status_request_078_4 DATA04
- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: cover_status_request_078_6 DATA01
- id: freeze_state
  type: enum
  values: [off, on]
  source: basic_information_request_305_3 DATA09
- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: edge_blending_request_097_243_1
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: lens_profile_request_053_11
- id: lamp_remaining_life_percent
  type: integer
  source: lamp_info_request_037_4 (content=04h); negative if past deadline
- id: lamp_usage_time_seconds
  type: integer
  source: lamp_info_request_037_4 (content=01h); updated per minute
- id: filter_usage_time_seconds
  type: integer
  source: filter_usage_info_request_037_3
- id: model_name
  type: string
  source: model_name_request_078_5
- id: serial_number
  type: string
  source: serial_number_request_305_2
- id: mac_address
  type: string
  source: lan_mac_address_request_097_155
- id: projector_name
  type: string
  source: lan_projector_name_request_097_45
- id: error_status
  type: bitfield
  source: error_status_request_009 DATA01-DATA12
  notes: "See source §3.1 for full bit-to-error mapping (cover, fan, temperature, lamp, formatter, FPGA, mirror cover, ballast, iris, interlock switch, system errors)."
```

## Variables
```yaml
- id: brightness
  type: integer
  range: null  # UNRESOLVED: exact min/max from gain_parameter_request DATA02-05, source gives field layout not fixed limits
  source: picture_adjust_030_1 (target 00h) / gain_parameter_request_060_1 (name 00h)
- id: contrast
  type: integer
  range: null  # UNRESOLVED
  source: picture_adjust_030_1 (target 01h)
- id: color
  type: integer
  range: null  # UNRESOLVED
  source: picture_adjust_030_1 (target 02h)
- id: hue
  type: integer
  range: null  # UNRESOLVED
  source: picture_adjust_030_1 (target 03h)
- id: sharpness
  type: integer
  range: null  # UNRESOLVED
  source: picture_adjust_030_1 (target 04h)
- id: volume
  type: integer
  range: null  # UNRESOLVED
  source: volume_adjust_030_2 / gain_parameter_request_060_1 (name 05h)
- id: lamp_adjust
  type: integer
  range: null  # UNRESOLVED
  source: other_adjust_030_15 / gain_parameter_request_060_1 (name 96h)
- id: eco_mode
  type: enum
  values: null  # UNRESOLVED: value table referenced to Appendix not present in source
  source: eco_mode_set_098_8 / eco_mode_request_097_8
- id: aspect
  type: enum
  values: null  # UNRESOLVED: value table referenced to Appendix not present in source
  source: aspect_adjust_030_12
```

## Events
```yaml
# No unsolicited notifications documented in source. Device is strictly
# request/response. Section intentionally empty.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source. Section intentionally empty.
```

## Safety
```yaml
confirmation_required_for:
  - power_off_016    # source: during power-off incl. cooling, no other command accepted
  - shutter_close_051  # obscures output
interlocks:
  - "POWER ON/OFF commands block all other commands during transition + cooling."
  - "Cover error, mirror cover, lens-not-installed, interlock switch open flagged in error_status bitfield (009)."
  - "Forced onscreen mute (mute_status DATA04) may block some display commands."
# UNRESOLVED: source contains no explicit power-on sequencing procedure or
# safety certification values. Voltage/current/power specs not present.
```

## Notes
- **Frame format:** every command is a hex byte series. Command header bytes encode the operation class (00h/01h/02h/03h = request/action variants); followed by 00h 00h; a length byte; data bytes; and a trailing checksum `<CKS>` = low-order 8 bits of the sum of all preceding bytes (worked example in source §2.2: 20h+81h+01h+60h+01h+00h = 103h → CKS=03h).
- **Responses:** echo header with high nibble changed (e.g. 02h→22h ack, A2h error; 03h→23h/A3h). Error responses carry `<ERR1> <ERR2>` per table §2.4 (00h/00h unrecognized, 00h/01h unsupported, 01h/00h invalid value, 02h/0Dh power off, etc.).
- **ID1 = control ID** set on projector; **ID2 = model code** (model-specific, value not in source).
- **Signal list number** returned by 078-3 is practical value − 1.
- **Usage times** update at one-minute intervals though stored in one-second units.
- **Lamp 2** commands effective only on two-lamp projector models.
- Both RS-232C (D-SUB 9P, cross cable) and LAN (RJ-45, TCP 7142) transports share the same command set.

<!-- UNRESOLVED: model code (ID2) value for LED FA019I2 165IN not stated -->
<!-- UNRESOLVED: input terminal value table (Appendix) not present — affects 018 INPUT SW CHANGE and 319-10 AUDIO SELECT SET -->
<!-- UNRESOLVED: aspect value table (Appendix) not present — affects 030-12 -->
<!-- UNRESOLVED: eco mode value table (Appendix) not present — affects 097-8 / 098-8 -->
<!-- UNRESOLVED: sub input setting value table (Appendix) not present — affects 097-198 / 098-198 -->
<!-- UNRESOLVED: base model type value table (Appendix) not present — affects 078-1 / 305-1 -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: exact numeric min/max adjustment limits not fixed in source (runtime-discoverable via gain_parameter_request) -->
```

Spec done. 53 actions enumerated — all command-bearing source rows. Appendix tables (input/aspect/eco-mode/sub-input/base-model) referenced but absent from refined source → marked UNRESOLVED, not fabricated.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:03:57.880Z
last_checked_at: 2026-06-18T08:20:50.948Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:20:50.948Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to hex sequences in source command catalogue; transport values fully supported; coverage 53/53. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source"
- "exact input terminal value table (DATA01 values for 018/319-10) referenced as \"Appendix\" but not present in source"
- "aspect value table, eco mode value table, sub input value table, base model type value table — all referenced to \"Appendix\" not present in source"
- "serial connection uses cross cable to PC CONTROL (D-SUB 9P); specific flow_control (RTS/CTS hardware) not explicitly stated though RTS/CTS pins are wired"
- "full input terminal value table not in source.\""
- "value table in Appendix not present in source.\""
- "value table in Appendix not present.\""
- "base model type value table in Appendix not present.\""
- "input terminal value table in Appendix not present.\""
- "exact min/max from gain_parameter_request DATA02-05, source gives field layout not fixed limits"
- "value table referenced to Appendix not present in source"
- "source contains no explicit power-on sequencing procedure or"
- "model code (ID2) value for LED FA019I2 165IN not stated"
- "input terminal value table (Appendix) not present — affects 018 INPUT SW CHANGE and 319-10 AUDIO SELECT SET"
- "aspect value table (Appendix) not present — affects 030-12"
- "eco mode value table (Appendix) not present — affects 097-8 / 098-8"
- "sub input setting value table (Appendix) not present — affects 097-198 / 098-198"
- "base model type value table (Appendix) not present — affects 078-1 / 305-1"
- "firmware version compatibility range not stated"
- "exact numeric min/max adjustment limits not fixed in source (runtime-discoverable via gain_parameter_request)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
