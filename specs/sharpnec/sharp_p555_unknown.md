---
spec_id: admin/sharpnec-p555
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P555 Control Spec"
manufacturer: Sharp/NEC
model_family: P555
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - P555
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:25:55.898Z
last_checked_at: 2026-06-18T09:02:51.310Z
generated_at: 2026-06-18T09:02:51.310Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "input terminal DATA01 values reference external Appendix not in source"
  - "aspect adjustment DATA01 values reference external Appendix not in source"
  - "eco mode DATA01 values reference external Appendix not in source"
  - "base model type DATA01-02 values reference external Appendix not in source"
  - "input terminal DATA01 values not in source (referenced Appendix missing)"
  - "aspect DATA01 values not in source"
  - "eco mode values not in source"
  - "input terminal DATA01 values not in source"
  - "eco mode enum values not in source"
  - "base model type enum values not in source"
  - "aspect enum values not in source"
  - "source describes no unsolicited notifications. All responses are command-driven."
  - "source describes no multi-step macro sequences."
  - "no explicit safety warnings or power-on sequencing requirements stated in source beyond command acceptance locks."
  - "external Appendix \"Supplementary Information by Command\" not in source. Missing values for: input terminal, aspect, eco mode, base model type, sub input."
  - "firmware version compatibility not stated"
  - "protocol version number not stated"
  - "ID2 model code value not stated (varies by model)"
  - "control ID (ID1) default value not stated"
verification:
  verdict: verified
  checked_at: 2026-06-18T09:02:51.310Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P555 Control Spec

## Summary
Sharp/NEC P555 projector control spec. Binary command protocol over RS-232C serial and TCP/IP (wired/wireless LAN). Hex byte commands with checksum (low byte of sum of preceding bytes). Source: BDT140013 Revision 7.1 command reference manual.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal DATA01 values reference external Appendix not in source -->
<!-- UNRESOLVED: aspect adjustment DATA01 values reference external Appendix not in source -->
<!-- UNRESOLVED: eco mode DATA01 values reference external Appendix not in source -->
<!-- UNRESOLVED: base model type DATA01-02 values reference external Appendix not in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # selectable: 4800/9600/19200/38400/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON/OFF commands (015/016)
  - queryable       # inferred: numerous REQUEST commands
  - levelable       # inferred: PICTURE/VOLUME/lens adjustment commands
  - routable        # inferred: INPUT SW CHANGE (018) and audio select (319-10)
```

## Actions
```yaml
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
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal (values in external Appendix)"
  # UNRESOLVED: input terminal DATA01 values not in source (referenced Appendix missing)

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Value set for the aspect (values in external Appendix)"
  # UNRESOLVED: aspect DATA01 values not in source

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA03
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: byte
      description: Adjustment value (high-order 8 bits)

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
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: byte
      description: "Content: 01h=Lamp usage time (sec), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Key code (WORD low byte). See key code list in source."
    - name: DATA02
      type: byte
      description: "Key code (WORD high byte). See key code list in source."

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target: 06h=Periphery Focus"
    - name: DATA02
      type: byte
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target: 06h=Periphery Focus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (FFh=Stop)"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: byte
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
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "01h=Freeze on, 02h=Freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Value set for eco mode (values in external Appendix)"
  # UNRESOLVED: eco mode values not in source

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}..{DATA16} 00h {CKS}"
  params:
    - name: projector_name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value (varies by DATA01 - see source tables)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
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
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal (values in external Appendix)"
    - name: DATA02
      type: byte
      description: "Setting value: 00h=specified terminal, 01h=BNC, 02h=COMPUTER"
  # UNRESOLVED: input terminal DATA01 values not in source
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: "12-byte error status. Bit set to 1 indicates error. See Error information list in source."

- id: running_status
  type: enum
  description: "Operation status from 078-2. 00h=Standby (Sleep), 04h=Power on, 05h=Cooling, 06h=Standby (error), 0Fh=Standby (Power saving), 10h=Network standby"

- id: power_status
  type: enum
  values: [standby, power_on]
  description: "From 078-2 DATA03: 00h=Standby, 01h=Power on"

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]

- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution]

- id: input_signal_status
  type: composite
  description: "Signal switch process, signal list number, selection signal types, content displayed"

- id: picture_mute_state
  type: enum
  values: [off, on]
  description: "From 078-4 DATA01"

- id: sound_mute_state
  type: enum
  values: [off, on]
  description: "From 078-4 DATA02"

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  description: "From 078-4 DATA03"

- id: forced_onscreen_mute_state
  type: enum
  values: [off, on]
  description: "From 078-4 DATA04"

- id: cover_status
  type: enum
  values: [normal_cover_opened, cover_closed]
  description: "From 078-6 DATA01"

- id: model_name
  type: string
  description: "NUL-terminated model name string from 078-5"

- id: eco_mode_value
  type: byte
  description: "From 097-8 DATA01 (values in external Appendix)"
  # UNRESOLVED: eco mode enum values not in source

- id: lan_projector_name
  type: string
  description: "NUL-terminated projector name from 097-45"

- id: lan_mac_address
  type: string
  description: "6-byte MAC address from 097-155"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "From 097-243-1 DATA01"

- id: base_model_type
  type: composite
  description: "Base model type bytes + model name from 305-1"
  # UNRESOLVED: base model type enum values not in source

- id: serial_number
  type: string
  description: "NUL-terminated serial number from 305-2"

- id: lens_information
  type: bitmask
  description: "Lens operation status from 053-7 DATA01. Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V)"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "From 053-11 DATA01"

- id: lamp_usage_time
  type: integer
  description: "Lamp usage time in seconds from 037-4. Updated at 1-minute intervals."

- id: lamp_remaining_life
  type: integer
  description: "Lamp remaining life (%) from 037-4. Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  description: "Filter usage time in seconds from 037-3. -1 if no time defined."

- id: filter_alarm_start_time
  type: integer
  description: "Filter alarm start time in seconds from 037-3. -1 if no time defined."

- id: lamp_usage_time_info_request
  type: integer
  description: "Lamp usage time in seconds from 037 INFORMATION REQUEST DATA83-86. Updated at 1-minute intervals."

- id: filter_usage_time_info_request
  type: integer
  description: "Filter usage time in seconds from 037 INFORMATION REQUEST DATA87-90. Updated at 1-minute intervals."

- id: carbon_savings_total
  type: float
  description: "Total Carbon Savings in kg from 037-6. Max 99999 kg + 999999 mg."

- id: carbon_savings_operation
  type: float
  description: "Carbon Savings during operation in kg from 037-6. Max 99999 kg + 999999 mg."

- id: horizontal_sync_frequency
  type: string
  description: "Horizontal synchronous frequency string from 084"

- id: vertical_sync_frequency
  type: string
  description: "Vertical synchronous frequency string from 084"

- id: sound_function
  type: enum
  values: [not_available, available]
  description: "From 078-1 DATA04"

- id: profile_number
  type: enum
  description: "From 078-1 DATA05: 00h=Not available, 01h=Clock, 02h=Sleep timer, 03h=Clock+Sleep timer"
```

## Variables
```yaml
- id: brightness
  type: integer
  description: "Brightness (PICTURE ADJUST target 00h, GAIN PARAMETER REQUEST 3 target 00h)"

- id: contrast
  type: integer
  description: "Contrast (PICTURE ADJUST target 01h, GAIN PARAMETER REQUEST 3 target 01h)"

- id: color
  type: integer
  description: "Color (PICTURE ADJUST target 02h, GAIN PARAMETER REQUEST 3 target 02h)"

- id: hue
  type: integer
  description: "Hue (PICTURE ADJUST target 03h, GAIN PARAMETER REQUEST 3 target 03h)"

- id: sharpness
  type: integer
  description: "Sharpness (PICTURE ADJUST target 04h, GAIN PARAMETER REQUEST 3 target 04h)"

- id: volume
  type: integer
  description: "Sound volume (VOLUME ADJUST, GAIN PARAMETER REQUEST 3 target 05h)"

- id: lamp_light_adjust
  type: integer
  description: "Lamp/Light Adjust (OTHER ADJUST target 96h, GAIN PARAMETER REQUEST 3 target 96h)"

- id: aspect_value
  type: byte
  description: "Aspect setting (ASPECT ADJUST DATA01)"
  # UNRESOLVED: aspect enum values not in source

- id: eco_mode
  type: byte
  description: "Eco mode setting (098-8 DATA01)"
  # UNRESOLVED: eco mode enum values not in source

- id: projector_name
  type: string
  description: "Projector name (098-45, up to 16 bytes)"

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  description: "PIP/PBP mode (098-198 with DATA01=00h)"

- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  description: "PIP/PBP start position (098-198 with DATA01=01h)"

- id: edge_blending_mode_setting
  type: enum
  values: [off, on]
  description: "Edge blending mode (098-243-1)"

- id: lens_memory_load_by_signal
  type: enum
  values: [off, on]
  description: "Lens memory LOAD BY SIGNAL option (053-6)"

- id: lens_memory_forced_mute
  type: enum
  values: [off, on]
  description: "Lens memory FORCED MUTE option (053-6)"
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All responses are command-driven.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While POWER ON is turning on power, no other command can be accepted."
  - command: power_off
    note: "While POWER OFF is turning off power (including cooling time), no other command can be accepted."
# UNRESOLVED: no explicit safety warnings or power-on sequencing requirements stated in source beyond command acceptance locks.
```

## Notes
Binary protocol. Frame format: `20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>`. Checksum = low-order byte of sum of all preceding bytes.

Error response format (failed execution): `A{x}h {cmd} <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>`. ERR1/ERR2 combinations defined in source error code list (00h-03h range).

Common parameters:
- ID1: control ID set on projector
- ID2: model code (varies by model)
- CKS: checksum
- LEN: data length following LEN

ID1/ID2/CKS placeholders `<ID1> <ID2> <CKS>` filled at runtime; not literal payload bytes. Response codes: `2{x}h` prefix = success response, `A{x}h` prefix = error response.

Lamp usage/filter info updated at 1-minute intervals despite second-precision. Lamp remaining life negative if deadline exceeded. Filter returns -1 if no time defined.

Wireless LAN connection requires separate wireless LAN unit (model-dependent).

<!-- UNRESOLVED: external Appendix "Supplementary Information by Command" not in source. Missing values for: input terminal, aspect, eco mode, base model type, sub input. -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: protocol version number not stated -->
<!-- UNRESOLVED: ID2 model code value not stated (varies by model) -->
<!-- UNRESOLVED: control ID (ID1) default value not stated -->
````

Spec done. 50+ actions enumerated — all source command rows covered. External Appendix values marked UNRESOLVED (not in refined source).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:25:55.898Z
last_checked_at: 2026-06-18T09:02:51.310Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:02:51.310Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "input terminal DATA01 values reference external Appendix not in source"
- "aspect adjustment DATA01 values reference external Appendix not in source"
- "eco mode DATA01 values reference external Appendix not in source"
- "base model type DATA01-02 values reference external Appendix not in source"
- "input terminal DATA01 values not in source (referenced Appendix missing)"
- "aspect DATA01 values not in source"
- "eco mode values not in source"
- "input terminal DATA01 values not in source"
- "eco mode enum values not in source"
- "base model type enum values not in source"
- "aspect enum values not in source"
- "source describes no unsolicited notifications. All responses are command-driven."
- "source describes no multi-step macro sequences."
- "no explicit safety warnings or power-on sequencing requirements stated in source beyond command acceptance locks."
- "external Appendix \"Supplementary Information by Command\" not in source. Missing values for: input terminal, aspect, eco mode, base model type, sub input."
- "firmware version compatibility not stated"
- "protocol version number not stated"
- "ID2 model code value not stated (varies by model)"
- "control ID (ID1) default value not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
