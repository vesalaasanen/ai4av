---
spec_id: admin/sharpnec-np-p502hl-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP P502HL 2 Control Spec"
manufacturer: Sharp/NEC
model_family: "NP P502HL 2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP P502HL 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:01:33.281Z
last_checked_at: 2026-06-18T08:47:49.461Z
generated_at: 2026-06-18T08:47:49.461Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "input terminal value mappings are referenced to an \"Appendix: Supplementary Information by Command\" not included in the refined source"
  - "flow control not stated in source (RTS/CTS pins are wired per pin assignment but no software flow-control setting documented)"
  - "appendix not in source.\""
  - "specific enum values in Appendix not in source\""
  - "specific enum values in Appendix not in source"
  - "source documents no unsolicited notifications. All responses are"
  - "source documents no multi-step command sequences."
  - "no explicit safety warnings or power-on sequencing requirements in source."
  - "input terminal value map not in source (referenced appendix missing)"
  - "aspect adjustment value map not in source (referenced appendix missing)"
  - "eco mode enum values not in source (referenced appendix missing)"
  - "base model type values not in source (referenced appendix missing)"
  - "sub-input setting values for PIP/PbP not in source (referenced appendix missing)"
  - "serial flow_control setting not stated in source"
  - "ID1 (control ID) and ID2 (model code) default/expected values not stated"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:47:49.461Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP P502HL 2 Control Spec

## Summary
The Sharp/NEC NP P502HL 2 is a projector controllable via RS-232C serial or TCP/IP LAN (port 7142). The protocol is binary, frame-based with hexadecimal command bytes and a trailing checksum byte. This spec covers all 53 documented commands: power control, input switching, mute control, picture/volume/aspect/lens adjustment, lens memory, status queries, eco mode, edge blending, PIP/PbP, and system information requests.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal value mappings are referenced to an "Appendix: Supplementary Information by Command" not included in the refined source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 bps; 9600 shown as one option
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins are wired per pin assignment but no software flow-control setting documented)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power on/off commands (015, 016)
- queryable  # inferred from numerous status request commands
- levelable  # inferred from volume, brightness, contrast, color, hue, sharpness adjustments
- routable   # inferred from input switch command (018)
```

## Actions
```yaml
# Command frame format: bytes are hexadecimal with 'h' suffix.
# Byte 0 = command class, Byte 1 = command code, Bytes 2-3 = ID1/ID2 (00h 00h as
# placeholders; actual control ID and model code set on projector), Byte 4 = data
# length (LEN), remaining bytes = data + checksum (CKS).
# Checksum = low-order byte of the sum of all preceding bytes.
# Responses: 2xh prefix = success, Axh prefix = error (carries ERR1/ERR2).

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal value (hex). Example: 06h = video port. Full value list in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Value set for the aspect. Full value list in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment target high byte: 96h (paired with DATA02=FFh for LAMP ADJUST / LIGHT ADJUST)"
    - name: data02
      type: string
      description: "Adjustment target low byte: FFh (for LAMP ADJUST / LIGHT ADJUST)"
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Key code low byte (see key code list)"
    - name: data02
      type: string
      description: "Key code high byte (see key code list). Key codes: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO"

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 06h=Periphery Focus"
    - name: data02
      type: string
      description: "Content: 00h=Stop, 01h=Drive 1s plus, 02h=Drive 0.5s plus, 03h=Drive 0.25s plus, 7Fh=Drive plus (continuous), 81h=Drive minus (continuous), FDh=Drive 0.25s minus, FEh=Drive 0.5s minus, FFh=Drive 1s minus"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens adjustment target (same values as lens_control DATA01)"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment target: FFh=Stop (mode/value ignored)"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute value, 02h=relative value"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET. Controls profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "01h=Freeze On, 02h=Freeze Off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Value set for the eco mode. Full value list in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: data01_to_data16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value. For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: see Appendix - UNRESOLVED: appendix not in source."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal. Full value list in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source."
    - name: data02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Each query action returns a structured binary response. Response frame prefix:
#   20h/21h/22h/23h = success (carries data), A0h/A1h/A2h/A3h = error (carries ERR1/ERR2).
# Below are key observable states mapped from query responses.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST (DATA03/DATA06), 305-3 BASIC INFORMATION REQUEST (DATA01)"

- id: error_status
  type: bitmask
  description: "12-byte error bitmap from 009 ERROR STATUS REQUEST. Covers cover error, fan error, temperature error, power error, lamp errors, formatter error, FPGA error, mirror cover error, interlock switch open, system errors, etc."
  source: "009 ERROR STATUS REQUEST (DATA01-DATA12)"

- id: input_signal_status
  type: composite
  description: "Signal switch process, signal list number, selection signal type 1 and 2, test pattern display, content displayed"
  source: "078-3 INPUT STATUS REQUEST (DATA01-DATA16)"

- id: mute_status
  type: composite
  description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each on/off)"
  source: "078-4 MUTE STATUS REQUEST (DATA01-DATA05)"

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: "078-6 COVER STATUS REQUEST (DATA01)"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037 INFORMATION REQUEST (DATA83-86), 037-4 LAMP INFORMATION REQUEST 3 (DATA03-06)"

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4 LAMP INFORMATION REQUEST 3 (DATA03-06, content 04h)"

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037-3 FILTER USAGE INFORMATION REQUEST (DATA01-04)"

- id: eco_mode
  type: string
  source: "097-8 ECO MODE REQUEST (DATA01) - UNRESOLVED: specific enum values in Appendix not in source"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 EDGE BLENDING MODE REQUEST (DATA01)"

- id: lens_operation_status
  type: bitmask
  description: "Lens memory, zoom, focus, lens shift (H/V) operation status (stop/during operation)"
  source: "053-7 LENS INFORMATION REQUEST (DATA01)"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: "053-11 LENS PROFILE REQUEST (DATA01)"

- id: model_name
  type: string
  source: "078-5 MODEL NAME REQUEST (DATA01-32)"

- id: serial_number
  type: string
  source: "305-2 SERIAL NUMBER REQUEST (DATA01-16)"

- id: lan_projector_name
  type: string
  source: "097-45 LAN PROJECTOR NAME REQUEST (DATA01-17)"

- id: mac_address
  type: string
  source: "097-155 LAN MAC ADDRESS STATUS REQUEST 2 (DATA01-06)"

- id: carbon_savings
  type: composite
  description: "Carbon savings in kg (DATA02-05) and mg (DATA06-09)"
  source: "037-6 CARBON SAVINGS INFORMATION REQUEST"

- id: sync_frequency
  type: composite
  description: "Horizontal and vertical synchronous frequency (information strings)"
  source: "084 INFORMATION STRING REQUEST (DATA01: 03h/04h)"
```

## Variables
```yaml
- id: brightness
  type: integer
  description: "Picture brightness adjustment"
  read: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)"
  write: "030-1 PICTURE ADJUST (DATA01=00h)"

- id: contrast
  type: integer
  description: "Picture contrast adjustment"
  read: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=01h)"
  write: "030-1 PICTURE ADJUST (DATA01=01h)"

- id: color
  type: integer
  description: "Picture color adjustment"
  read: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=02h)"
  write: "030-1 PICTURE ADJUST (DATA01=02h)"

- id: hue
  type: integer
  description: "Picture hue adjustment"
  read: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=03h)"
  write: "030-1 PICTURE ADJUST (DATA01=03h)"

- id: sharpness
  type: integer
  description: "Picture sharpness adjustment"
  read: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=04h)"
  write: "030-1 PICTURE ADJUST (DATA01=04h)"

- id: volume
  type: integer
  description: "Sound volume adjustment"
  read: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=05h)"
  write: "030-2 VOLUME ADJUST"

- id: lamp_light_adjust
  type: integer
  description: "Lamp/Light adjust gain"
  read: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=96h)"
  write: "030-15 OTHER ADJUST (DATA01=96h, DATA02=FFh)"

- id: eco_mode_setting
  type: string
  description: "Eco mode setting"
  read: "097-8 ECO MODE REQUEST"
  write: "098-8 ECO MODE SET"
  # UNRESOLVED: specific enum values in Appendix not in source

- id: edge_blending
  type: enum
  description: "Edge blending on/off"
  values: [off, on]
  read: "097-243-1 EDGE BLENDING MODE REQUEST"
  write: "098-243-1 EDGE BLENDING MODE SET"

- id: lan_projector_name_var
  type: string
  description: "Projector name on LAN (up to 16 bytes)"
  read: "097-45 LAN PROJECTOR NAME REQUEST"
  write: "098-45 LAN PROJECTOR NAME SET"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are
# solicited (command → response). No event push mechanism described.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes behavioral constraints (not safety interlocks):
# - Power On (015): no other command accepted while power is turning on.
# - Power Off (016): no other command accepted during power-off including cooling time.
# - Picture/Sound/Onscreen mute auto-clears on input terminal switch or video signal switch.
# - Sound mute also auto-clears on volume adjustment.
# These are timing/behavior notes, not safety interlock procedures.
# UNRESOLVED: no explicit safety warnings or power-on sequencing requirements in source.
```

## Notes
- **Document reference:** BDT140013 Revision 7.1 — Projector Control Command Reference Manual. This manual is generic across multiple NEC/Sharp projector models; the NP P502HL 2 is the target model.
- **Binary protocol:** Commands are raw hex bytes. Frame structure: `[class] [code] [ID1] [ID2] [LEN] [DATA...] [CKS]`. ID1 = control ID set on projector, ID2 = model code (both sent as `00h 00h` in documented examples; actual values depend on projector configuration).
- **Checksum (CKS):** Low-order one byte of the sum of all preceding bytes. Example: `20h + 81h + 01h + 60h + 01h + 00h = 103h → CKS = 03h`.
- **Response framing:** Success responses use prefix `2xh` (20h/21h/22h/23h depending on command class). Error responses use prefix `Axh` (A0h/A1h/A2h/A3h) and carry ERR1 + ERR2 error codes.
- **Error codes:** 25 ERR1/ERR2 combinations documented (section 2.4), covering unrecognized command, unsupported command, invalid value, invalid input terminal, memory errors, power-off rejection, no authority, gain errors, etc.
- **Serial connection:** RS-232C via PC CONTROL port (D-SUB 9P, cross cable). Baud rate configurable: 115200/38400/19200/9600/4800 bps. 8 data bits, no parity, 1 stop bit, full duplex.
- **LAN connection:** TCP port 7142. Supports wired (10/100 Mbps auto-negotiation, RJ-45) and wireless LAN.
- **Usage time resolution:** Lamp and filter usage times are in seconds but updated at one-minute intervals.
- **Lamp remaining life:** Returns negative percentage if replacement deadline is exceeded.
- **Missing appendix:** Several commands reference an "Appendix: Supplementary Information by Command" for input terminal values, aspect values, eco mode values, base model types, and sub-input setting values. This appendix is not in the refined source.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal value map not in source (referenced appendix missing) -->
<!-- UNRESOLVED: aspect adjustment value map not in source (referenced appendix missing) -->
<!-- UNRESOLVED: eco mode enum values not in source (referenced appendix missing) -->
<!-- UNRESOLVED: base model type values not in source (referenced appendix missing) -->
<!-- UNRESOLVED: sub-input setting values for PIP/PbP not in source (referenced appendix missing) -->
<!-- UNRESOLVED: serial flow_control setting not stated in source -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) default/expected values not stated -->
```

53 commands enumerated, all hex payloads verbatim from source. Missing appendix values marked UNRESOLVED throughout. Ready for ingest.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:01:33.281Z
last_checked_at: 2026-06-18T08:47:49.461Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:47:49.461Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "input terminal value mappings are referenced to an \"Appendix: Supplementary Information by Command\" not included in the refined source"
- "flow control not stated in source (RTS/CTS pins are wired per pin assignment but no software flow-control setting documented)"
- "appendix not in source.\""
- "specific enum values in Appendix not in source\""
- "specific enum values in Appendix not in source"
- "source documents no unsolicited notifications. All responses are"
- "source documents no multi-step command sequences."
- "no explicit safety warnings or power-on sequencing requirements in source."
- "input terminal value map not in source (referenced appendix missing)"
- "aspect adjustment value map not in source (referenced appendix missing)"
- "eco mode enum values not in source (referenced appendix missing)"
- "base model type values not in source (referenced appendix missing)"
- "sub-input setting values for PIP/PbP not in source (referenced appendix missing)"
- "serial flow_control setting not stated in source"
- "ID1 (control ID) and ID2 (model code) default/expected values not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
