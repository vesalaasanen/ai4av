---
spec_id: admin/sharpnec-xp-v801u-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp V801U B Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp V801U B"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp V801U B"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:42:10.332Z
last_checked_at: 2026-06-19T07:53:02.028Z
generated_at: 2026-06-19T07:53:02.028Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value not stated for this model — varies by model, must be read from device"
  - "control ID (ID1) default not stated"
  - "appendix \"Supplementary Information by Command\" (input terminal enums, aspect values, base model types, eco mode values, sub input values) not in source — several DATA fields reference it"
  - "RTS/CTS pins wired in pin assignment, but flow control mode not stated in source"
  - "enum values in source appendix, not in refined source"
  - "no unsolicited notifications documented in source. All responses are command-elicited."
  - "no multi-step sequences described in source."
  - "source contains no explicit power-on sequencing procedure beyond per-command interlocks above."
  - "appendix \"Supplementary Information by Command\" missing — affects INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, BASE MODEL TYPE, PIP SUB INPUT, AUDIO SELECT enums"
  - "ID1 (control ID) default and ID2 (model code) for Xp V801U B not stated"
  - "flow_control mode (RTS/CTS hardware handshake) not stated despite pins being wired"
  - "firmware version compatibility not stated"
  - "full key code list (050 REMOTE KEY CODE) — source lists 26 keys; others may exist"
  - "response timing / inter-command delay not specified"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:53:02.028Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source. Every hex command literal found verbatim in BDT140013 Rev 7.1 manual. Transport parameters (baud, port, data bits, parity, stop bits) all verified. Complete command coverage; no extra source commands. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC Xp V801U B Control Spec

## Summary
Projector. Binary hex protocol over RS-232C serial and TCP/IP LAN (port 7142). Source: "Projector Control Command Reference Manual" BDT140013 Rev 7.1. 53 enumerated commands covering power, input switching, mutes, picture/volume/aspect/lens adjust, shutter, lens memory, eco mode, edge blending, PIP/PbP, status requests.

<!-- UNRESOLVED: model code (ID2) value not stated for this model — varies by model, must be read from device -->
<!-- UNRESOLVED: control ID (ID1) default not stated -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" (input terminal enums, aspect values, base model types, eco mode values, sub input values) not in source — several DATA fields reference it -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # all five stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins wired in pin assignment, but flow control mode not stated in source
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred: 015 POWER ON / 016 POWER OFF
- queryable      # inferred: 009, 037 family, 078 family, 305 family, 097 family requests
- levelable      # inferred: 030-1 picture, 030-2 volume, 030-15 gain adjust
- routable       # inferred: 018 INPUT SW CHANGE
```

## Actions
```yaml
# Each command payload verbatim from source. Responses prefixed per source:
#   02h cmd → 22h ack / A2h err
#   03h cmd → 23h ack / A3h err
#   00h cmd → 20h ack / A0h err
#   01h cmd → 21h ack / A1h err
# Checksum (CKS) = low byte of sum of all preceding bytes.

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. Example: 06h = video port. Full enum in source appendix (not in refined source)."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video switch."

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input/video switch or volume adjust."

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input/video switch."

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative."
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. Enum in source appendix (not in refined source)."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte. Source: DATA01=96h, DATA02=FFh → LAMP ADJUST / LIGHT ADJUST."
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh with DATA01=96h)."
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative."
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90). Updated 1-min intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time sec (DATA01-04) and filter alarm start time sec (DATA05-08). -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)."
    - name: DATA02
      type: integer
      description: "Content: 01h usage time sec, 04h remaining life %."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See key code list, e.g. 02h POWER ON, 05h AUTO, 06h MENU, 07h UP, 4Bh COMPUTER1, D7h SOURCE, EEh LAMP MODE/ECO."
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed keys)."

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. Source documents 06h = Periphery Focus (other targets referenced but only 06h shown in refined source)."
    - name: DATA02
      type: integer
      description: "Content: 00h Stop, 01h drive 1s plus, 02h drive 0.5s plus, 03h drive 0.25s plus, 7Fh drive plus (continuous), 81h drive minus (continuous), FDh drive 0.25s minus, FEh drive 0.5s minus, FFh drive 1s minus."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (matches DATA01 of 053 LENS CONTROL)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh = Stop, skips mode/value)."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET."

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET. Operates on profile selected via 053-10."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
    - name: DATA02
      type: integer
      description: "Setting value: 00h OFF, 01h ON."

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmask: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift H, Bit4 Lens Shift V (0=Stop, 1=During operation)."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h Profile 1, 01h Profile 2."

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h freeze on, 02h freeze off."

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h Horizontal sync frequency, 04h Vertical sync frequency."

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value. Enum in source appendix (not in refined source)."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01-16} 00h {CKS}"
  params:
    - name: DATA01_16
      type: string
      description: "Projector name, up to 16 bytes (NUL terminated)."

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
    - name: DATA02
      type: integer
      description: "Setting value. For MODE: 00h PIP, 01h PBP. For START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h OFF, 01h ON."

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. Enum in source appendix (not in refined source)."
    - name: DATA02
      type: integer
      description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER."
```

## Feedbacks
```yaml
# All commands return a framed response. Success response opcode = cmd[0]+20h.
# Failure response opcode = cmd[0]+0A0h (A0h/A1h/A2h/A3h) carrying ERR1 ERR2.

- id: command_ack
  type: raw
  format: "{ack_opcode}h {cmd_low}h <ID1> <ID2> {LEN} <DATA...> <CKS>"
  description: "Per-command success ack. ack_opcode: 02h→22h, 03h→23h, 00h→20h, 01h→21h."

- id: command_error
  type: raw
  format: "{err_opcode}h {cmd_low}h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  description: "Per-command failure. err_opcode: 02h→A2h, 03h→A3h, 00h→A0h, 01h→A1h."

- id: error_codes
  type: enum_pair
  description: "ERR1/ERR2 combinations per source error code table."
  values:
    - "00h/00h: command not recognized"
    - "00h/01h: command not supported by model"
    - "01h/00h: specified value invalid"
    - "01h/01h: specified input terminal invalid"
    - "01h/02h: specified language invalid"
    - "02h/00h: memory allocation error"
    - "02h/02h: memory in use"
    - "02h/03h: specified value cannot be set"
    - "02h/04h: forced onscreen mute on"
    - "02h/06h: viewer error"
    - "02h/07h: no signal"
    - "02h/08h: test pattern or filter displayed"
    - "02h/09h: no PC card inserted"
    - "02h/0Ah: memory operation error"
    - "02h/0Ch: entry list displayed"
    - "02h/0Dh: command not accepted (power off)"
    - "02h/0Eh: command execution failed"
    - "02h/0Fh: no authority for operation"
    - "03h/00h: specified gain number incorrect"
    - "03h/01h: specified gain invalid"
    - "03h/02h: adjustment failed"

- id: error_status_bitfield
  type: bitfield
  source: "009. ERROR STATUS REQUEST response DATA01-12"
  description: "12-byte error bitmap. Bit=0 normal, Bit=1 error. Notable bits: DATA01 Bit0 Cover err, Bit3/Bit4 Fan err, Bit5 Power err, Bit6 Lamp off, Bit7 Lamp replace moratorium; DATA02 Bit0 Lamp usage exceeded, Bit1 Formatter err, Bit2 Lamp2 off, Bit7 extended status; DATA03 Bit1 FPGA err, Bit2 Temp sensor err, Bit3 Lamp not present, Bit4 Lamp data err, Bit5 Mirror cover err, Bit6 Lamp2 moratorium, Bit7 Lamp2 usage exceeded; DATA04 Bit0 Lamp2 not present, Bit1 Lamp2 data err, Bit2 Dust temp err, Bit3 Foreign matter sensor err, Bit5 Ballast comm err, Bit6 Iris calibration err, Bit7 Lens not installed; DATA09 Bit0 portrait cover up, Bit1 interlock switch open, Bit2 Slave CPU system err, Bit3 Formatter system err."

- id: power_status
  type: enum
  source: "078-2 RUNNING STATUS REQUEST DATA03"
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "FFh: Not supported"

- id: operation_status
  type: enum
  source: "078-2 RUNNING STATUS REQUEST DATA06"
  values:
    - "00h: Standby (Sleep)"
    - "04h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"

- id: cover_status
  type: enum
  source: "078-6 COVER STATUS REQUEST DATA01"
  values:
    - "00h: Normal (cover opened)"
    - "01h: Cover closed"
```

## Variables
```yaml
- id: brightness
  source: "030-1 PICTURE ADJUST, target 00h"
  type: integer
  query_command: "03h 05h 00h 00h 03h 00h 00h 00h {CKS}"
  set_command: "03h 10h 00h 00h 05h 00h FFh {mode} {val_lo} {val_hi} {CKS}"

- id: contrast
  source: "030-1 PICTURE ADJUST, target 01h"
  type: integer
  query_command: "03h 05h 00h 00h 03h 01h 00h 00h {CKS}"

- id: color
  source: "030-1 PICTURE ADJUST, target 02h"
  type: integer
  query_command: "03h 05h 00h 00h 03h 02h 00h 00h {CKS}"

- id: hue
  source: "030-1 PICTURE ADJUST, target 03h"
  type: integer
  query_command: "03h 05h 00h 00h 03h 03h 00h 00h {CKS}"

- id: sharpness
  source: "030-1 PICTURE ADJUST, target 04h"
  type: integer
  query_command: "03h 05h 00h 00h 03h 04h 00h 00h {CKS}"

- id: volume
  source: "030-2 VOLUME ADJUST, target 05h"
  type: integer
  query_command: "03h 05h 00h 00h 03h 05h 00h 00h {CKS}"
  set_command: "03h 10h 00h 00h 05h 05h 00h {mode} {val_lo} {val_hi} {CKS}"

- id: lamp_usage_time_seconds
  source: "037 INFORMATION REQUEST DATA83-86 / 037-4 with DATA02=01h"
  type: integer
  description: "Updated 1-minute intervals."

- id: filter_usage_time_seconds
  source: "037-3 FILTER USAGE INFORMATION REQUEST DATA01-04"
  type: integer

- id: lamp_remaining_life_percent
  source: "037-4 LAMP INFORMATION REQUEST 3 with DATA02=04h"
  type: integer
  notes: "Negative if replacement deadline exceeded."

- id: projector_name
  source: "097-45 / 098-45 LAN PROJECTOR NAME"
  type: string
  max_length: 16

- id: eco_mode
  source: "097-8 / 098-8 ECO MODE"
  type: integer
  # UNRESOLVED: enum values in source appendix, not in refined source

- id: edge_blending_mode
  source: "097-243-1 / 098-243-1 EDGE BLENDING MODE"
  type: enum
  values: [off, on]

- id: lens_profile
  source: "053-10 / 053-11 LENS PROFILE"
  type: enum
  values: [profile_1, profile_2]
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source. All responses are command-elicited.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted while power-on in progress."
  - "POWER OFF (016): no other command accepted during power-off including cooling time."
  - "078-6 / 009 bit: interlock switch open (DATA09 Bit1) reported as error status."
  - "009 bit: cover error (DATA01 Bit0), mirror cover error (DATA03 Bit5) reported in error status."
# UNRESOLVED: source contains no explicit power-on sequencing procedure beyond per-command interlocks above.
```

## Notes
Binary protocol. All commands framed hex bytes. Format: `{cmd_hi}h {cmd_low}h {00h} {00h} {LEN} {DATA...} {CKS}` where cmd_hi selects command class (00h info req, 01h control, 02h action, 03h set/query-with-data). CKS = low byte of sum of all preceding bytes. Example from source: `20h 81h 01h 60h 01h 00h` → sum 103h → CKS 03h.

Two ID bytes (`<ID1>` control ID, `<ID2>` model code) appear in responses only, not in commands. ID1 set on projector; ID2 model-dependent. Both must be read or known before parsing responses — command bytes do not include them.

Lens drive (053 LENS CONTROL): send 7Fh/81h to start continuous drive, then 00h to stop.

Usage times returned in seconds, updated at 1-minute intervals. Convert /3600 for hours.

Edge blending, eco mode, aspect, input terminal, base model type, sub input enums all referenced to an appendix "Supplementary Information by Command" that is NOT in this refined source. Implementor must obtain full manual.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" missing — affects INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, BASE MODEL TYPE, PIP SUB INPUT, AUDIO SELECT enums -->
<!-- UNRESOLVED: ID1 (control ID) default and ID2 (model code) for Xp V801U B not stated -->
<!-- UNRESOLVED: flow_control mode (RTS/CTS hardware handshake) not stated despite pins being wired -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: full key code list (050 REMOTE KEY CODE) — source lists 26 keys; others may exist -->
<!-- UNRESOLVED: response timing / inter-command delay not specified -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:42:10.332Z
last_checked_at: 2026-06-19T07:53:02.028Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:53:02.028Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source. Every hex command literal found verbatim in BDT140013 Rev 7.1 manual. Transport parameters (baud, port, data bits, parity, stop bits) all verified. Complete command coverage; no extra source commands. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value not stated for this model — varies by model, must be read from device"
- "control ID (ID1) default not stated"
- "appendix \"Supplementary Information by Command\" (input terminal enums, aspect values, base model types, eco mode values, sub input values) not in source — several DATA fields reference it"
- "RTS/CTS pins wired in pin assignment, but flow control mode not stated in source"
- "enum values in source appendix, not in refined source"
- "no unsolicited notifications documented in source. All responses are command-elicited."
- "no multi-step sequences described in source."
- "source contains no explicit power-on sequencing procedure beyond per-command interlocks above."
- "appendix \"Supplementary Information by Command\" missing — affects INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, BASE MODEL TYPE, PIP SUB INPUT, AUDIO SELECT enums"
- "ID1 (control ID) default and ID2 (model code) for Xp V801U B not stated"
- "flow_control mode (RTS/CTS hardware handshake) not stated despite pins being wired"
- "firmware version compatibility not stated"
- "full key code list (050 REMOTE KEY CODE) — source lists 26 keys; others may exist"
- "response timing / inter-command delay not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
