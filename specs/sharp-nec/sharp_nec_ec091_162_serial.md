---
spec_id: admin/sharp-nec-ec091-162
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp-NEC Ec091 162 Control Spec"
manufacturer: Sharp-NEC
model_family: "Ec091 162"
aliases: []
compatible_with:
  manufacturers:
    - Sharp-NEC
  models:
    - "Ec091 162"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-08-30T13:02:24.403Z
last_checked_at: 2026-08-30T22:17:36.807Z
generated_at: 2026-08-30T22:17:36.807Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value table, aspect value table, eco mode value table, sub-input setting values, base model type values referenced in \"Appendix: Supplementary Information by Command\" not included in source text"
  - "flow control not stated in source (RTS/CTS pins wired in cable pinout)"
  - "source documents no unsolicited notifications; protocol is request/response only"
  - "no multi-step sequences documented in source"
  - "no explicit safety warnings or interlock procedures in source."
  - "appendix value tables not in source text (input terminal values, aspect values, eco mode values, sub input setting values, base model type values)"
  - "firmware version compatibility not stated in source"
  - "ID2 model code value for Ec091 162 not stated in source"
  - "default baud rate not stated; source lists 115200/38400/19200/9600/4800 as supported"
verification:
  verdict: verified
  checked_at: 2026-08-30T22:17:36.807Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match literal hex commands in the source Command List; transport parameters are supported; bidirectional coverage is complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-30
---

# Sharp-NEC Ec091 162 Control Spec

## Summary
Sharp-NEC Ec091 162 projector, controlled via RS-232C serial (PC CONTROL D-SUB 9P) or wired/wireless LAN (TCP port 7142). Covers binary framed command protocol from vendor "Projector Control Command Reference Manual" (BDT140013 Revision 7.1): power, input switching, mutes, picture/volume/aspect adjust, lens control and memory, status/information queries, eco mode, edge blending, PIP/PbP, audio select.

<!-- UNRESOLVED: input-terminal value table, aspect value table, eco mode value table, sub-input setting values, base model type values referenced in "Appendix: Supplementary Information by Command" not included in source text -->

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
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired in cable pinout)
  mode: full_duplex
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF commands
  - routable        # inferred: 018 INPUT SW CHANGE command
  - queryable       # inferred: extensive request command set (009, 037, 078, 097, 305)
  - levelable       # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST commands
```

## Actions
```yaml
# Frame format: <Destination> <Command code> 00h 00h <LEN> <DATA...> <CKS>
# CKS = low-order byte of sum of all preceding bytes.
# ID1 = projector control ID, ID2 = model code (values in responses, set per device).
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

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value; e.g. 06h = Video port. Full value table in Appendix 'Supplementary Information by Command' (not in source text)"
  notes: "Example (switch to video): 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01=FFh means ended with error (no signal switch made)."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example set brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value; table in Appendix 'Supplementary Information by Command' (not in source text)"

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01_DATA02
      type: string
      description: "Adjustment target: DATA01=96h DATA02=FFh -> LAMP ADJUST / LIGHT ADJUST"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response: DATA01-49 projector name, DATA83-86 lamp usage time (seconds), DATA87-90 filter usage time (seconds). Updated at one-minute intervals."

- id: filter_usage_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response: DATA01-04 filter usage time (seconds), DATA05-08 filter alarm start time (seconds); -1 if undefined."

- id: lamp_info_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: "Example get lamp usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life returned if replacement deadline exceeded."

- id: carbon_savings_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01_DATA02
      type: integer
      description: "Key code (WORD type). Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO"
  notes: "Example send AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01=FFh means ended with error."

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
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "06h=Periphery Focus (only value documented in source)"
    - name: DATA02
      type: integer
      description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
  notes: "After 7Fh/81h continuous drive, send DATA02=00h to stop. Issuing same command while lens drives continues without stop."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (same values as 053 LENS CONTROL DATA01)"
  notes: "Response: upper/lower adjustment range limits and current value (16-bit little-endian pairs)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "FFh=Stop (mode/value not referenced when Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute value, 02h=relative value"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Response DATA02 setting value: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bit flags: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop, 1=during operation)."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
  notes: "Example get brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Response: DATA01 status (00h display not possible, 01h adjustment not possible, 02h adjustment possible, FFh gain not exist), DATA02-13 range/default/current/wide/narrow widths, DATA14 default validity."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response: DATA01-03 base model type, DATA04 sound function (00h not available, 01h available), DATA05 profile number."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

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
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=horizontal synchronous frequency, 04h=vertical synchronous frequency"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns 'Light mode' or 'Lamp mode' value depending on projector. Value table in Appendix (not in source text)."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value; table in Appendix 'Supplementary Information by Command' (not in source text)"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "When MODE: 00h=PIP, 01h=PICTURE BY PICTURE. When START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. When SUB INPUT: sub input setting value (Appendix table, not in source text)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

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
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value; table in Appendix 'Supplementary Information by Command' (not in source text)"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# All feedbacks are responses to queries. General response frame:
#   <Ack code> <Command code> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Error response frame (any command):
#   <Ack|20h..A3h per command> <Command code> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
- id: error_response
  type: enum
  description: "ERR1/ERR2 error code pairs: 00h 00h command not recognized; 00h 01h not supported by model; 01h 00h invalid value; 01h 01h invalid input terminal; 01h 02h invalid language; 02h 00h memory allocation error; 02h 02h memory in use; 02h 03h value cannot be set; 02h 04h forced onscreen mute on; 02h 06h viewer error; 02h 07h no signal; 02h 08h test pattern or filter displayed; 02h 09h no PC card inserted; 02h 0Ah memory operation error; 02h 0Ch entry list displayed; 02h 0Dh power is off; 02h 0Eh command execution failed; 02h 0Fh no operation authority; 03h 00h incorrect gain number; 03h 01h invalid gain; 03h 02h adjustment failed"
  trigger: "returned when command execution fails"

- id: error_status
  type: bitmask
  description: "12 bytes from 009 ERROR STATUS REQUEST. Bit=1 means error. DATA01: cover, temperature (bimetallic), fan, power, lamp off/backlight off, lamp replacement moratorium. DATA02: lamp usage time exceeded, formatter error, lamp 2 off. DATA03: FPGA error, temperature sensor, lamp not present, lamp data error, mirror cover error, lamp 2 moratorium, lamp 2 usage exceeded. DATA04: lamp 2 not present, lamp 2 data error, dust temperature error, foreign matter sensor, ballast comm error, iris calibration error, lens not installed properly. DATA09 extended: portrait cover side up, interlock switch open, system error (slave CPU/formatter)."
  trigger: "009. ERROR STATUS REQUEST"

- id: power_status
  type: enum
  values: [standby, power_on, not_supported]
  description: "DATA03 from 078-2 RUNNING STATUS REQUEST: 00h=Standby, 01h=Power on, FFh=Not supported"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "DATA06 from 078-2: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: input_signal_status
  type: object
  description: "078-3 INPUT STATUS REQUEST: signal switch process, signal list number (returned value + 1 = actual), selection signal type 1/2 (COMPUTER/VIDEO/S-VIDEO/COMPONENT/VIEWER/DVI-D/HDMI/DisplayPort), signal list type, test pattern display, content displayed"

- id: mute_status
  type: object
  description: "078-4 MUTE STATUS REQUEST: DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (each 00h=Off, 01h=On)"

- id: model_name
  type: string
  description: "078-5 MODEL NAME REQUEST, NUL-terminated"

- id: cover_status
  type: enum
  values: [normal_cover_opened, cover_closed]
  description: "078-6 COVER STATUS REQUEST: 00h=Normal (cover opened), 01h=Cover closed"

- id: basic_information
  type: object
  description: "305-3 BASIC INFORMATION REQUEST: operation status, content displayed, selection signal type 1/2, display signal type (NTSC/PAL/SECAM variants etc.), video mute, sound mute, onscreen mute, freeze status"

- id: lamp_usage_time
  type: integer
  description: "037-4 LAMP INFORMATION REQUEST 3 DATA03-06, seconds; updated at one-minute intervals; reflects eco mode"

- id: lamp_remaining_life
  type: integer
  description: "037-4 DATA02=04h, percent; negative if replacement deadline exceeded"

- id: filter_usage_time
  type: integer
  description: "037-3 FILTER USAGE INFORMATION REQUEST DATA01-04, seconds"

- id: projector_name
  type: string
  description: "037 (DATA01-49) / 097-45 (DATA01-17) / 098-45 set echo, NUL-terminated"

- id: serial_number
  type: string
  description: "305-2 SERIAL NUMBER REQUEST DATA01-16, NUL-terminated"

- id: mac_address
  type: string
  description: "097-155 LAN MAC ADDRESS STATUS REQUEST2 DATA01-06"

- id: eco_mode_value
  type: integer
  description: "097-8 ECO MODE REQUEST DATA01; value table in Appendix (not in source text)"

- id: edge_blending_mode
  type: enum
  values: ["off", "on"]
  description: "097-243-1 DATA01: 00h=OFF, 01h=ON"

- id: pip_pbp_value
  type: object
  description: "097-198: MODE (PIP/PICTURE BY PICTURE), START POSITION (four corners), SUB INPUT 1-3 values"

- id: sync_frequency_info
  type: string
  description: "084 INFORMATION STRING REQUEST: horizontal (DATA01=03h) or vertical (DATA01=04h) synchronous frequency, label + NUL-terminated string"

- id: lens_operation_status
  type: bitmask
  description: "053-7 LENS INFORMATION REQUEST DATA01: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "053-11 LENS PROFILE REQUEST DATA01: 00h=Profile 1, 01h=Profile 2"
```

## Variables
```yaml
- id: picture_adjustments
  description: "030-1 PICTURE ADJUST targets: brightness, contrast, color, hue, sharpness; absolute or relative 16-bit values"
- id: volume
  description: "030-2 VOLUME ADJUST; absolute or relative 16-bit value"
- id: lamp_light_adjust
  description: "030-15 OTHER ADJUST target 96h FFh (LAMP ADJUST / LIGHT ADJUST); absolute or relative 16-bit value"
- id: aspect
  description: "030-12 ASPECT ADJUST; value table in Appendix (not in source text)"
- id: eco_mode
  description: "098-8 ECO MODE SET; value table in Appendix (not in source text)"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; protocol is request/response only
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# Note: interlock switch state exists as error feedback bit (009 ERROR STATUS DATA09 Bit1) but no operator interlock procedure documented.
```

## Notes
- Command frame format: `<Destination> <Command code> 00h 00h <LEN> <DATA...> <CKS>`. Response frames echo command code with high bit set (e.g. 02h→22h ack, A2h error; 03h→23h ack, A3h error).
- Checksum: add all preceding bytes, use low-order byte. Example: 20h+81h+01h+60h+01h+00h=103h → CKS=03h.
- ID1 = control ID set on projector; ID2 = model code, varies by model.
- POWER ON/OFF: no other command accepted while power transitioning on/off (including cooling time).
- Picture mute, onscreen mute auto-cancel on input terminal switch or video signal switch; sound mute also cancels on volume adjustment.
- Lamp/filter usage times updated at one-minute intervals though obtainable in one-second units.
- Serial cable must be cross (null-modem) wired: RxD↔TxD, RTS↔CTS, GND straight.
- LAN: TCP port 7142 for command send/receive; 10/100 Mbps auto-switchable wired, IEEE802.3/802.3u.
<!-- UNRESOLVED: appendix value tables not in source text (input terminal values, aspect values, eco mode values, sub input setting values, base model type values) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: ID2 model code value for Ec091 162 not stated in source -->
<!-- UNRESOLVED: default baud rate not stated; source lists 115200/38400/19200/9600/4800 as supported -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-08-30T13:02:24.403Z
last_checked_at: 2026-08-30T22:17:36.807Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-30T22:17:36.807Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match literal hex commands in the source Command List; transport parameters are supported; bidirectional coverage is complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value table, aspect value table, eco mode value table, sub-input setting values, base model type values referenced in \"Appendix: Supplementary Information by Command\" not included in source text"
- "flow control not stated in source (RTS/CTS pins wired in cable pinout)"
- "source documents no unsolicited notifications; protocol is request/response only"
- "no multi-step sequences documented in source"
- "no explicit safety warnings or interlock procedures in source."
- "appendix value tables not in source text (input terminal values, aspect values, eco mode values, sub input setting values, base model type values)"
- "firmware version compatibility not stated in source"
- "ID2 model code value for Ec091 162 not stated in source"
- "default baud rate not stated; source lists 115200/38400/19200/9600/4800 as supported"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
