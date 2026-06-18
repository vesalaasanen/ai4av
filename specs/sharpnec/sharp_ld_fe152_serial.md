---
spec_id: admin/sharp-nec-ld-fe152
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fe152 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fe152"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fe152"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:21:16.495Z
last_checked_at: 2026-06-17T20:07:10.664Z
generated_at: 2026-06-17T20:07:10.664Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-name / firmware-version compatibility not stated in source. The manual is a shared Sharp/NEC projector command reference; some commands are model-dependent (two-lamp, periphery focus, lens memory) and may not all apply to the Ld Fe152 specifically. Flow control setting not stated in the source communication table."
  - "flow control not stated in source communication table (RTS/CTS pins wired but mode not specified)"
  - "per-parameter adjustment ranges (min/max/default) are returned"
  - "none expected (protocol is strictly request/response)."
  - "source documents no explicit multi-step macro sequences."
  - "no explicit power-on sequencing requirements or safety warnings"
  - "flow_control setting not stated in source communication table."
  - "input terminal value table, aspect value table, eco mode value table, base model type values, sub input values are referenced to an Appendix (\"Supplementary Information by Command\") not present in this refined source."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:07:10.664Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands matched literal hex byte sequences in source document sections 3.1-3.53; transport parameters verified against communication table. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fe152 Control Spec

## Summary
Sharp/NEC Ld Fe152 projector control spec covering the binary control protocol described in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device is controllable over RS-232C serial and over a wired/wireless LAN using TCP port 7142. Commands are fixed-length hex byte frames terminated by a one-byte additive checksum (low-order 8 bits of the sum of all preceding bytes). This spec enumerates all 53 documented commands including power, input switching, mute, picture/volume/aspect/lamp adjustment, lens control and memory, shutter, freeze, status queries (power, error, lamp, filter, carbon, settings, input, mute, model, serial, eco, MAC, PIP, edge blending), remote key emulation, and audio select.

<!-- UNRESOLVED: model-name / firmware-version compatibility not stated in source. The manual is a shared Sharp/NEC projector command reference; some commands are model-dependent (two-lamp, periphery focus, lens memory) and may not all apply to the Ld Fe152 specifically. Flow control setting not stated in the source communication table. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated for LAN command send/receive
serial:
  baud_rate: 115200  # selectable: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source communication table (RTS/CTS pins wired but mode not specified)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (015 POWER ON / 016 POWER OFF)
# - queryable       (009/037/037-x/053-1/060-1/078-x/084/097-x/305-x status queries)
# - levelable       (030-1 PICTURE / 030-2 VOLUME / 030-15 LAMP-LIGHT ADJUST)
# - routable        (018 INPUT SW CHANGE, 319-10 AUDIO SELECT SET)
traits:
  - powerable       # inferred from power command examples
  - queryable       # inferred from query command examples
  - levelable       # inferred from picture/volume/lamp level commands
  - routable        # inferred from input/audio routing commands
```

## Actions
```yaml
# General frame: command bytes ... <CKS> where CKS = low-order 8 bits of the
# sum of all preceding bytes. <ID1> = control ID, <ID2> = model code (set on
# projector). Success responses begin 20h/21h/22h/23h; error responses begin
# A0h/A1h/A2h/A3h and carry <ERR1> <ERR2>.

# --- 009. ERROR STATUS REQUEST ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

# --- 015. POWER ON ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

# --- 018. INPUT SW CHANGE ---
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"  # DATA01 = input terminal value; CKS computed
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (see Appendix "Supplementary Information by Command"; e.g. 06h = video port)

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

# --- 021. PICTURE MUTE OFF ---
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

# --- 022. SOUND MUTE ON ---
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

# --- 023. SOUND MUTE OFF ---
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

# --- 024. ONSCREEN MUTE ON ---
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

# --- 025. ONSCREEN MUTE OFF ---
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- 030-1. PICTURE ADJUST ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: aspect_value
      type: integer
      description: Aspect value (see Appendix "Supplementary Information by Command")

# --- 030-15. OTHER ADJUST (LAMP / LIGHT ADJUST) ---
- id: other_adjust_lamp_light
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"  # DATA01=96h DATA02=FFh -> LAMP/LIGHT ADJUST
  params:
    - name: target
      type: integer
      description: "96h (LAMP ADJUST / LIGHT ADJUST); DATA02=FFh"
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: integer
      description: "WORD key code split across DATA01/DATA02; e.g. 05h 00h=AUTO, 02h 00h=POWER ON, 06h 00h=MENU, 0Ah 00h=LEFT, 0Bh 00h=ENTER (see Key code list)"

# --- 051. SHUTTER CLOSE ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

# --- 052. SHUTTER OPEN ---
- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

# --- 053. LENS CONTROL ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: integer
      description: "Target; e.g. 06h=Periphery Focus"
    - name: content
      type: integer
      description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: integer
      description: Lens control target axis

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "Target; FFh=Stop (mode/value not referenced when Stop)"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET (operates on profile set via 053-10)"

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

# --- 078-5. MODEL NAME REQUEST ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

# --- 078-6. COVER STATUS REQUEST ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: state
      type: integer
      description: "01h=freeze on, 02h=freeze off"

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: info_type
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pbypicture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: value
      type: integer
      description: Eco/Light/Lamp mode value (see Appendix "Supplementary Information by Command")

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01>..<DATA16> 00h <CKS>"  # up to 16 bytes name + NUL terminator
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbypicture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "MODE: 00h=PIP/01h=PICTURE BY PICTURE; START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub input value otherwise"

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

# --- 305-1. BASE MODEL TYPE REQUEST ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

# --- 305-2. SERIAL NUMBER REQUEST ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

# --- 305-3. BASIC INFORMATION REQUEST ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (see Appendix "Supplementary Information by Command")
    - name: setting
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Responses are binary frames. Success responses begin 20h/21h/22h/23h with
# echoed command code and <ID1> <ID2>; error responses begin A0h/A1h/A2h/A3h
# with <ERR1> <ERR2>. Key observable states decoded from query responses:

- id: power_state
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST -> DATA06; 305-3 -> DATA01"

- id: cooling_in_progress
  type: boolean
  source: "078-2 -> DATA04 (01h = during execution)"

- id: error_status
  type: bitmask
  description: 12-byte error bitmask (DATA01-12) from 009 ERROR STATUS REQUEST; bit=1 indicates error (cover, fan, temperature, lamp, formatter, etc.)

- id: picture_mute
  type: enum
  values: [off, on]
  source: "078-4 -> DATA01"

- id: sound_mute
  type: enum
  values: [off, on]
  source: "078-4 -> DATA02"

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 -> DATA03"

- id: input_signal
  type: object
  description: Selection signal type 1/2, signal list number, content displayed (078-3 / 305-3)

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037 / 037-4 -> DATA03-06"

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4 content=04h (negative if replacement deadline exceeded)"

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037-3 -> DATA01-04"

- id: model_name
  type: string
  source: "078-5 / 305-1"

- id: serial_number
  type: string
  source: "305-2"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: "078-6"

- id: eco_mode
  type: enum
  source: "097-8"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: "053-11"

- id: error_code
  type: object
  description: "ERR1/ERR2 pair; e.g. 00h/00h=unrecognized command, 00h/01h=not supported, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Eh=execution failed (see Error code list)"
```

## Variables
```yaml
# Settable parameters are represented as discrete Actions above (eco mode set,
# projector name set, edge blending set, PIP/PbP set, lens memory option set,
# audio select set). No additional continuous variables beyond those actions.
# UNRESOLVED: per-parameter adjustment ranges (min/max/default) are returned
# dynamically by 060-1 GAIN PARAMETER REQUEST 3 and are not statically listed.
```

## Events
```yaml
# Source documents no unsolicited notifications. The device only responds to
# commands; all state changes are polled via the request commands.
# UNRESOLVED: none expected (protocol is strictly request/response).
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON is executing, no other command is accepted (015)."
  - "While POWER OFF is executing (including cooling time), no other command is accepted (016)."
  - "Many commands return error ERR1=02h ERR2=0Dh when power is off."
  - "Forced onscreen mute (ERR1=02h ERR2=04h) blocks some commands."
# UNRESOLVED: no explicit power-on sequencing requirements or safety warnings
# beyond command-acceptance interlocks stated above.
```

## Notes
- Checksum: `<CKS>` = low-order 8 bits of the sum of all preceding bytes in the frame (including command bytes and any DATA bytes). Example: `20h + 81h + 01h + 60h + 01h + 00h = 103h -> CKS = 03h`.
- Frame parameters: `<ID1>` = control ID set on projector; `<ID2>` = model code (model-dependent); both appear in responses. `<LEN>` = data length in bytes of the DATA part following LEN.
- Success responses start with `20h/21h/22h/23h`; error responses start with `A0h/A1h/A2h/A3h` and carry `<ERR1> <ERR2> <CKS>`.
- Usage times (lamp/filter) are obtainable in 1-second units but are only refreshed at 1-minute intervals.
- Lamp remaining life returns a negative value once the replacement deadline is exceeded.
- Two-lamp and periphery-focus/lens-memory commands are model-dependent; some may not apply to the Ld Fe152 specifically.
- Supported serial baud rates: 115200, 38400, 19200, 9600, 4800 bps (projector-selectable).
- LAN: wired (10/100 Mbps auto) or wireless LAN unit; TCP port 7142 for command traffic.
- Pin assignment: PC CONTROL port D-SUB 9P cross cable (RxD/TxD cross on pins 2/3, RTS/CTS on pins 7/8, GND pin 5).
<!-- UNRESOLVED: flow_control setting not stated in source communication table. -->
<!-- UNRESOLVED: input terminal value table, aspect value table, eco mode value table, base model type values, sub input values are referenced to an Appendix ("Supplementary Information by Command") not present in this refined source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:21:16.495Z
last_checked_at: 2026-06-17T20:07:10.664Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:07:10.664Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands matched literal hex byte sequences in source document sections 3.1-3.53; transport parameters verified against communication table. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-name / firmware-version compatibility not stated in source. The manual is a shared Sharp/NEC projector command reference; some commands are model-dependent (two-lamp, periphery focus, lens memory) and may not all apply to the Ld Fe152 specifically. Flow control setting not stated in the source communication table."
- "flow control not stated in source communication table (RTS/CTS pins wired but mode not specified)"
- "per-parameter adjustment ranges (min/max/default) are returned"
- "none expected (protocol is strictly request/response)."
- "source documents no explicit multi-step macro sequences."
- "no explicit power-on sequencing requirements or safety warnings"
- "flow_control setting not stated in source communication table."
- "input terminal value table, aspect value table, eco mode value table, base model type values, sub input values are referenced to an Appendix (\"Supplementary Information by Command\") not present in this refined source."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
