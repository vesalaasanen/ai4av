---
spec_id: admin/sharpnec-ld-fe122-u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fe122 U Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fe122 U"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fe122 U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:47:46.159Z
last_checked_at: 2026-06-17T20:05:36.500Z
generated_at: 2026-06-17T20:05:36.500Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal / aspect / eco-mode / sub-input / base-model-type value enumerations live in an \"Appendix: Supplementary Information by Command\" not included in the refined source. Parameter values for these fields are therefore unresolved."
  - "flow control not in the comm-conditions table; RTS/CTS pins are cross-wired in the D-SUB 9P pinout but the setting is not specified"
  - "full value list is in source Appendix 'Supplementary Information by Command' not present here. CKS computed.\""
  - "value list in source Appendix not present here.\""
  - "eco-mode value enumeration is in source Appendix not present here"
  - none
  - "populate from source, or remove section if not applicable"
  - "input-terminal, aspect, eco-mode, sub-input, and base-model-type value enumerations are in a source Appendix (\"Supplementary Information by Command\") not present in the refined input."
  - "flow_control setting not specified in the comm-conditions table."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:05:36.500Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source hex sequences; all transport parameters confirmed; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fe122 U Control Spec

## Summary
Sharp/NEC Ld Fe122 U projector. Binary hex control protocol over RS-232C serial and wired/wireless LAN (TCP). Commands are framed byte sequences with a trailing checksum (CKS = low-order byte of the sum of all preceding bytes). Source: Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: input terminal / aspect / eco-mode / sub-input / base-model-type value enumerations live in an "Appendix: Supplementary Information by Command" not included in the refined source. Parameter values for these fields are therefore unresolved. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not in the comm-conditions table; RTS/CTS pins are cross-wired in the D-SUB 9P pinout but the setting is not specified
addressing:
  port: 7142  # stated for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands (015, 016)
  - queryable    # inferred: numerous status/information request commands
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST (030-1/2/15)
  - routable     # inferred: INPUT SW CHANGE / AUDIO SELECT SET / PIP sub-input (018, 319-10, 098-198)
```

## Actions
```yaml
# Framing note: a command's trailing byte <CKS> is the checksum = low-order one
# byte of the sum of ALL preceding bytes (incl. the leading type/opcode bytes and
# any ID1/ID2 shown as 00h 00h). Literal commands below carry the documented CKS
# verbatim; parameterized commands show <CKS> as a computed field.

- id: error_status_request
  label: "009. Error Status Request"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. Power On"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: "016. Power Off"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: "018. Input SW Change"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Input terminal value (e.g. 06h = video port). UNRESOLVED: full value list is in source Appendix 'Supplementary Information by Command' not present here. CKS computed."

- id: picture_mute_on
  label: "020. Picture Mute On"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: "021. Picture Mute Off"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. Sound Mute On"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: "023. Sound Mute Off"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. Onscreen Mute On"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: "025. Onscreen Mute Off"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. Picture Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: "030-2. Volume Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: "030-12. Aspect Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Value set for the aspect. UNRESOLVED: value list in source Appendix not present here."

- id: other_adjust
  label: "030-15. Other Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: string
      description: "Fixed FFh per source table"
    - name: DATA03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: "037. Information Request"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: "037-3. Filter Usage Information Request"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: "037-4. Lamp Information Request 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: string
      description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. Carbon Savings Information Request"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. Remote Key Code"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Key code low byte (WORD). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: string
      description: "Key code high byte (00h for all listed codes)"

- id: shutter_close
  label: "051. Shutter Close"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. Shutter Open"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. Lens Control"
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Target: 06h=Periphery Focus"
    - name: DATA02
      type: string
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: "053-1. Lens Control Request"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Target lens axis (see source adjustment-target table)"

- id: lens_control_2
  label: "053-2. Lens Control 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Target; FFh=Stop (mode/value ignored)"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: "053-3. Lens Memory Control"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. Reference Lens Memory Control"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: "053-5. Lens Memory Option Request"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. Lens Memory Option Set"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. Lens Information Request"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. Lens Profile Set"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. Lens Profile Request"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. Gain Parameter Request 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: "078-1. Setting Request"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: "078-2. Running Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: "078-3. Input Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: "078-4. Mute Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: "078-5. Model Name Request"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: "078-6. Cover Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: "079. Freeze Control"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "01h=Freeze On, 02h=Freeze Off"

- id: information_string_request
  label: "084. Information String Request"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: "097-8. Eco Mode Request"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN Projector Name Request"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC Address Status Request 2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/Picture by Picture Request"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. Edge Blending Mode Request"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. Eco Mode Set"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Eco mode value. UNRESOLVED: value list in source Appendix not present here."

- id: lan_projector_name_set
  label: "098-45. LAN Projector Name Set"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/Picture by Picture Set"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: string
      description: "Setting value (MODE: 00h=PIP/01h=PICTURE BY PICTURE; START POSITION: 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT; sub-input values in source Appendix)"

- id: edge_blending_mode_set
  label: "098-243-1. Edge Blending Mode Set"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. Base Model Type Request"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: "305-2. Serial Number Request"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: "305-3. Basic Information Request"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: "319-10. Audio Select Set"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Input terminal. UNRESOLVED: value list in source Appendix not present here."
    - name: DATA02
      type: string
      description: "Setting value: 00h=the terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable states returned by the request (query) commands above.
- id: error_status
  type: bitfield
  values: [cover_error, fan_error, temperature_error_bimetallic, power_error, lamp_off, lamp_replacement_moratorium, lamp_usage_time_exceeded, formatter_error, fpga_error, temperature_error_sensor, lamp_not_present, mirror_cover_error, foreign_matter_sensor_error, ballast_communication_error, iris_calibration_error, lens_not_installed, interlock_switch_open, system_error_slave_cpu, system_error_formatter]
  source: "009. Error Status Request (DATA01-DATA12)"

- id: power_status
  type: enum
  values: [standby, power_on, standby_power_saving, network_standby, cooling, standby_error]
  source: "078-2. Running Status Request"

- id: cooling_status
  type: enum
  values: [not_executed, during_execution]
  source: "078-2. Running Status Request"

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: "078-4. Mute Status Request"

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: "078-4. Mute Status Request"

- id: onscreen_mute_state
  type: enum
  values: [off, on, forced_on]
  source: "078-4. Mute Status Request"

- id: input_signal_status
  type: object
  values: [signal_switch_process, signal_list_number, selection_signal_type, signal_list_type, test_pattern_display, content_displayed]
  source: "078-3. Input Status Request"

- id: cover_status
  type: enum
  values: [normal_cover_open, cover_closed]
  source: "078-6. Cover Status Request"

- id: model_name
  type: string
  source: "078-5. Model Name Request"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037/037-4 (updated at one-minute intervals)"

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4. Lamp Information Request 3 (negative if replacement deadline exceeded)"

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037-3. Filter Usage Information Request (-1 if undefined)"

- id: carbon_savings
  type: number
  unit: kilogram
  source: "037-6. Carbon Savings Information Request (max 99999 kg)"

- id: eco_mode
  type: string
  source: "097-8. Eco Mode Request"
  # UNRESOLVED: eco-mode value enumeration is in source Appendix not present here

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1. Edge Blending Mode Request"

- id: projector_name
  type: string
  source: "097-45. LAN Projector Name Request"

- id: mac_address
  type: string
  source: "097-155. LAN MAC Address Status Request 2"

- id: serial_number
  type: string
  source: "305-2. Serial Number Request"

- id: lens_operation_status
  type: bitfield
  values: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]
  source: "053-7. Lens Information Request"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: "053-11. Lens Profile Request"

- id: gain_parameter
  type: object
  values: [status, upper_limit, lower_limit, default_value, current_value, wide_adjustment_width, narrow_adjustment_width]
  source: "060-1. Gain Parameter Request 3"
```

## Variables
```yaml
# Settable continuous parameters are exercised via the 030-*/098-* SET actions
# above (volume, brightness, contrast, color, hue, sharpness, lamp/light adjust,
# eco mode, edge blending, lens memory options). No additional stand-alone
# variables beyond those actions.
# UNRESOLVED: none
```

## Events
```yaml
# No unsolicited notifications documented; the device responds only to requests.
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Macros
```yaml
# No multi-step sequences described in source.
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_lockout
    description: "While POWER ON is executing, no other command can be accepted."
    source: "015. POWER ON"
  - id: power_off_lockout
    description: "While POWER OFF is executing (including cooling time), no other command can be accepted."
    source: "016. POWER OFF"
  - id: interlock_switch
    description: "Error bit DATA09 Bit1: the interlock switch is open (reported in error status)."
    source: "009. ERROR STATUS REQUEST"
  - id: command_not_accepted_power_off
    description: "ERR1=02h/ERR2=0Dh: the command cannot be accepted because the power is off."
    source: "2.4 Error code list"
# No power-on sequencing procedure, voltage/current specs, or forced interlock
# steps are stated in this refined source beyond the lockout/error notes above.
```

## Notes
- Wire format: each command/response is a frame of hex bytes. Request frames use leading type bytes (00h-03h); success responses use 20h/21h/22h/23h with echoed `<ID1> <ID2>`; error responses use A0h/A1h/A2h/A3h with `<ERR1> <ERR2> <CKS>`.
- Checksum (CKS) = low-order one byte of the sum of all preceding bytes in the frame. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- `ID1` = control ID set on the projector; `ID2` = model code (varies by model). Commands show these as `00h 00h` (defaults); responses echo actual values.
- Lamp usage time is obtainable in one-second units but updated at one-minute intervals.
- `01h` (Lamp 2) in lamp commands is effective only on two-lamp projector models.
<!-- UNRESOLVED: input-terminal, aspect, eco-mode, sub-input, and base-model-type value enumerations are in a source Appendix ("Supplementary Information by Command") not present in the refined input. -->
<!-- UNRESOLVED: flow_control setting not specified in the comm-conditions table. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
```

Spec cooked. 53 action, all row from source command list. Hex byte verbatim, checksum kept. Transport dual: serial+tcp(7142). UNRESOLVED flag on appendix enum + flow_control + firmware.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:47:46.159Z
last_checked_at: 2026-06-17T20:05:36.500Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:05:36.500Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source hex sequences; all transport parameters confirmed; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal / aspect / eco-mode / sub-input / base-model-type value enumerations live in an \"Appendix: Supplementary Information by Command\" not included in the refined source. Parameter values for these fields are therefore unresolved."
- "flow control not in the comm-conditions table; RTS/CTS pins are cross-wired in the D-SUB 9P pinout but the setting is not specified"
- "full value list is in source Appendix 'Supplementary Information by Command' not present here. CKS computed.\""
- "value list in source Appendix not present here.\""
- "eco-mode value enumeration is in source Appendix not present here"
- none
- "populate from source, or remove section if not applicable"
- "input-terminal, aspect, eco-mode, sub-input, and base-model-type value enumerations are in a source Appendix (\"Supplementary Information by Command\") not present in the refined input."
- "flow_control setting not specified in the comm-conditions table."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
