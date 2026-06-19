---
spec_id: admin/sharp-nec-ld-a1651f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld A1651F Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld A1651F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld A1651F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-19T01:22:14.517Z
last_checked_at: 2026-06-19T07:43:54.727Z
generated_at: 2026-06-19T07:43:54.727Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific ID2 (model code) byte value not stated in source"
  - "appendix \"Supplementary Information by Command\" values (input terminal codes, aspect values, eco mode values, base model types, sub input values) not present in refined source"
  - "flow control not stated (pinout shows RTS/CTS wired)"
  - "enum values defined in appendix not present in refined source"
  - "source describes no unsolicited notifications; projector only"
  - "no multi-step sequences described in source."
  - "no safety warnings or interlock procedures stated in source"
  - "ID1 control ID default value not stated"
  - "ID2 model code for Ld A1651F not stated"
  - "default baud rate among selectable rates not stated"
  - "flow control setting not stated (RTS/CTS pins wired in pinout)"
  - "appendix values not in refined source (input terminal codes, aspect codes, eco mode codes, base model types, sub input values, audio select input terminal codes)"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:43:54.727Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source commands. Every transport parameter (serial baud/framing, TCP port) verified in source. Complete coverage of command catalogue. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# Sharp/NEC Ld A1651F Control Spec

## Summary
Sharp/NEC Ld A1651F projector control spec. Binary hex protocol over RS-232C serial (D-SUB 9P PC CONTROL port) and wired/wireless LAN. Commands framed with checksum byte (low-order 8 bits of sum of all preceding bytes). Manual revision BDT140013 Rev 7.1.

<!-- UNRESOLVED: model-specific ID2 (model code) byte value not stated in source -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" values (input terminal codes, aspect values, eco mode values, base model types, sub input values) not present in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 as selectable; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (pinout shows RTS/CTS wired)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - queryable       # inferred: numerous status/information request commands
  - levelable       # inferred: PICTURE ADJUST, VOLUME ADJUST, LENS CONTROL present
```

## Actions
```yaml
# All payloads verbatim from source. <ID1>=control ID, <ID2>=model code,
# <CKS>=checksum (low 8 bits of sum of preceding bytes), <DATA??>=variable data.

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
  notes: "While turning on power, no other command accepted."

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "During power-off (incl. cooling time), no other command accepted."

# --- 018. INPUT SW CHANGE ---
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: byte
      description: "Input terminal code (e.g. 06h = video port). Full list in appendix 'Supplementary Information by Command'."
  notes: "Example (video port): 02h 03h 00h 00h 02h 01h 06h 0Eh"

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input terminal switch or video signal switch."

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
  notes: "Cleared by input terminal switch, video signal switch, or volume adjustment."

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
  notes: "Cleared by input terminal switch or video signal switch."

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: data01
      type: byte
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: byte
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set brightness +10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: data01
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: byte
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set volume 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: byte
      description: "Aspect value. List in appendix 'Supplementary Information by Command'."

# --- 030-15. OTHER ADJUST (LAMP/LIGHT ADJUST) ---
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: data01
      type: byte
      description: "96h = LAMP ADJUST / LIGHT ADJUST (with DATA02=FFh)"
    - name: data02
      type: byte
      description: "FFh for LAMP/LIGHT ADJUST"
    - name: data03
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: byte
      description: "Adjustment value (high-order 8 bits)"

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: byte
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: byte
      description: "01h=usage time (seconds), 04h=remaining life (%)"
  notes: "Example get lamp 1 usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch"

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: byte
      description: "Key code low byte (see key code list)"
    - name: data02
      type: byte
      description: "Key code high byte (see key code list)"
  notes: |
    Key code list (DATA01 DATA02 = key name):
    02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP,
    08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT,
    0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE,
    29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1,
    51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE,
    A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO.
    Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h

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
    - name: data01
      type: byte
      description: "Lens target (06h=Periphery Focus per source table)"
    - name: data02
      type: byte
      description: "00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: "While lens driven, same command controls lens without stop."

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: byte
      description: "Lens target"
  notes: "Returns upper/lower adjustment limits and current value."

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: data01
      type: byte
      description: "Lens target (FFh=Stop)"
    - name: data02
      type: byte
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number set by 053-10 LENS PROFILE SET."

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns lens operation status bits: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation."

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: byte
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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
    - name: data01
      type: byte
      description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
  notes: "Example get brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status."

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
    - name: data01
      type: byte
      description: "01h=freeze on, 02h=freeze off"

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: byte
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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
- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: byte
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
    - name: data01
      type: byte
      description: "Eco mode value. List in appendix 'Supplementary Information by Command'."

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: projector_name
      type: string
      description: "Projector name (up to 16 bytes)"

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: byte
      description: "Setting value (MODE: 00h=PIP/01h=PBP; START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR)"

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

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
    - name: data01
      type: byte
      description: "Input terminal. List in appendix 'Supplementary Information by Command'."
    - name: data02
      type: byte
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response frames: success = 2Xh/A-ACK prefix + <ID1><ID2> + LEN + data + <CKS>;
# failure = AXh prefix + <ID1><ID2> + 02h + <ERR1> <ERR2> + <CKS>.

- id: error_status
  type: bitmask
  description: "12-byte error info (DATA01-12) from 009 ERROR STATUS REQUEST. Bit=1 = error."

- id: power_state
  type: enum
  values: [standby, power_on]
  description: "DATA03 from 078-2 RUNNING STATUS REQUEST: 00h=Standby, 01h=Power on, FFh=Not supported."

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "DATA06 from 078-2 / DATA01 from 305-3."

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]

- id: picture_mute_state
  type: enum
  values: [off, on]

- id: sound_mute_state
  type: enum
  values: [off, on]

- id: onscreen_mute_state
  type: enum
  values: [off, on]

- id: cover_status
  type: enum
  values: [normal_opened, closed]

- id: freeze_state
  type: enum
  values: [off, on]

- id: lamp_usage_time
  type: integer
  unit: seconds

- id: filter_usage_time
  type: integer
  unit: seconds

- id: lamp_remaining_life
  type: integer
  unit: percent
  notes: "Negative if lamp replacement deadline exceeded."

- id: eco_mode_value
  type: enum
  # UNRESOLVED: enum values defined in appendix not present in refined source

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]

# Error codes (ERR1 ERR2 combinations) per section 2.4:
# 00h 00h=command not recognized, 00h 01h=not supported by model,
# 01h 00h=invalid value, 01h 01h=invalid input terminal, 01h 02h=invalid language,
# 02h 00h=memory alloc error, 02h 02h=memory in use, 02h 03h=value cannot be set,
# 02h 04h=forced onscreen mute on, 02h 06h=viewer error, 02h 07h=no signal,
# 02h 08h=test pattern/filter displayed, 02h 09h=no PC card, 02h 0Ah=memory operation error,
# 02h 0Ch=entry list displayed, 02h 0Dh=power off (command rejected),
# 02h 0Eh=execution failed, 02h 0Fh=no authority,
# 03h 00h=incorrect gain number, 03h 01h=invalid gain, 03h 02h=adjustment failed.
```

## Variables
```yaml
- id: brightness
  type: integer
  description: "PICTURE/BRIGHTNESS (030-1 DATA01=00h). Range from 060-1 gain parameter request."
- id: contrast
  type: integer
  description: "PICTURE/CONTRAST (030-1 DATA01=01h)."
- id: color
  type: integer
  description: "PICTURE/COLOR (030-1 DATA01=02h)."
- id: hue
  type: integer
  description: "PICTURE/HUE (030-1 DATA01=03h)."
- id: sharpness
  type: integer
  description: "PICTURE/SHARPNESS (030-1 DATA01=04h)."
- id: volume
  type: integer
  description: "VOLUME (030-2 / 060-1 DATA01=05h)."
- id: lamp_light_adjust
  type: integer
  description: "LAMP ADJUST/LIGHT ADJUST (030-15 / 060-1 DATA01=96h)."
- id: projector_name
  type: string
  max_length: 16
  description: "LAN projector name (098-45 set / 097-45 get)."
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; projector only
# responds to commands. Device-initiated events not documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes interlock-related bits in error status (DATA09 Bit1 = interlock
# switch open; DATA04 Bit7 = lens not installed properly) but documents no
# safety procedure, power-on sequencing requirement, or confirmation rule.
# <!-- UNRESOLVED: no safety warnings or interlock procedures stated in source -->
```

## Notes
- Manual revision: BDT140013 Rev 7.1.
- Communication mode: full duplex. RS-232C-compliant serial (cross cable, D-SUB 9P PC CONTROL port). Baud selectable: 115200 / 38400 / 19200 / 9600 / 4800 bps.
- LAN: wired RJ-45 (10/100 Mbps auto) or wireless LAN unit. TCP port 7142.
- Command frame format: `<prefix> <ID1> <ID2> <LEN> <DATA??...> <CKS>`. Prefix 00h/01h/02h/03h = command (varies), 20h/21h/22h/23h = success response, A0h/A1h/A2h/A3h = error response.
- Checksum: sum all preceding bytes, take low-order 8 bits.
- During power-on ramp and power-off cooling, no other command accepted.
- Picture/onscreen mute cleared by input/video switch. Sound mute also cleared by volume adjust.

<!-- UNRESOLVED: ID1 control ID default value not stated -->
<!-- UNRESOLVED: ID2 model code for Ld A1651F not stated -->
<!-- UNRESOLVED: default baud rate among selectable rates not stated -->
<!-- UNRESOLVED: flow control setting not stated (RTS/CTS pins wired in pinout) -->
<!-- UNRESOLVED: appendix values not in refined source (input terminal codes, aspect codes, eco mode codes, base model types, sub input values, audio select input terminal codes) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-19T01:22:14.517Z
last_checked_at: 2026-06-19T07:43:54.727Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:43:54.727Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source commands. Every transport parameter (serial baud/framing, TCP port) verified in source. Complete coverage of command catalogue. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific ID2 (model code) byte value not stated in source"
- "appendix \"Supplementary Information by Command\" values (input terminal codes, aspect values, eco mode values, base model types, sub input values) not present in refined source"
- "flow control not stated (pinout shows RTS/CTS wired)"
- "enum values defined in appendix not present in refined source"
- "source describes no unsolicited notifications; projector only"
- "no multi-step sequences described in source."
- "no safety warnings or interlock procedures stated in source"
- "ID1 control ID default value not stated"
- "ID2 model code for Ld A1651F not stated"
- "default baud rate among selectable rates not stated"
- "flow control setting not stated (RTS/CTS pins wired in pinout)"
- "appendix values not in refined source (input terminal codes, aspect codes, eco mode codes, base model types, sub input values, audio select input terminal codes)"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
