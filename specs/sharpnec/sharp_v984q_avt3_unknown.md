---
spec_id: admin/sharp-nec-v984q-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC V984Q Avt3 Control Spec"
manufacturer: Sharp/NEC
model_family: "V984Q Avt3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "V984Q Avt3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:13:09.669Z
last_checked_at: 2026-06-19T07:43:58.551Z
generated_at: 2026-06-19T07:43:58.551Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value not stated for this specific model"
  - "flow control not stated; source mentions RTS/CTS pins but specifies full-duplex communication mode only"
  - "exact enum values referenced in Appendix, not in this excerpt"
  - "source describes no unsolicited notifications / push events."
  - "source describes no explicit multi-step sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "ID2 model code value for V984Q Avt3 not stated in source"
  - "Appendix \"Supplementary Information by Command\" not included — exact enum values for input terminal, aspect, eco mode, sub input, base model type are missing"
  - "default baud rate not stated (source lists 5 supported values)"
  - "flow control scheme not explicitly stated"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:43:58.551Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source with exact command sequence matches; transport parameters confirmed; comprehensive one-to-one coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC V984Q Avt3 Control Spec

## Summary
Sharp/NEC V984Q Avt3 projector control spec covering RS-232C serial and TCP/IP (wired/wireless LAN) control via binary framed hex commands on TCP port 7142. Includes power, input switching, mute, lens, picture/volume adjust, status queries, and PIP/edge blending controls.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value not stated for this specific model -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 as supported values; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; source mentions RTS/CTS pins but specifies full-duplex communication mode only
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable  # inferred: many request commands (009, 037, 078, 097, 305) return state
  - levelable  # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST present
  - routable  # inferred: 018 INPUT SW CHANGE switches input terminal
```

## Actions
```yaml
# Frame format: command bytes are literal hex; <ID1>=control ID, <ID2>=model code,
# <CKS>=checksum (low byte of sum of all preceding bytes).
# Response frames use 20h/21h/22h/23h prefix; error responses use A0h/A1h/A2h/A3h.

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
  notes: While powering on, no other command accepted.

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off (including cooling time), no other command accepted.

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (see Appendix "Supplementary Information by Command"; e.g. 06h = video port)

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
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect (see Appendix "Supplementary Information by Command")

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target hi-byte: 96h=LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
    - name: DATA02
      type: integer
      description: "Adjustment target lo-byte (FFh when DATA01=96h)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (see Key code list; e.g. 05h=AUTO, 29h=PICTURE)"
    - name: DATA02
      type: integer
      description: Key code high byte (typically 00h)

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
      description: "Adjustment target (e.g. 06h=Periphery Focus)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

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
  notes: Controls profile specified by 053-10 LENS PROFILE SET.

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

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

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

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
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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

- id: lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
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
      description: Value set for the eco mode (see Appendix "Supplementary Information by Command")

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01_DATA16
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01 - see source)"

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
      description: Input terminal (see Appendix "Supplementary Information by Command")
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: 078-2 RUNNING STATUS REQUEST DATA06 / 305-3 DATA01

- id: cooling_in_progress
  type: enum
  values: [not_executed, during_execution]
  source: 078-2 DATA04

- id: power_process_in_progress
  type: enum
  values: [not_executed, during_execution]
  source: 078-2 DATA05

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA01

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA02

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA03

- id: forced_onscreen_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA04

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: 078-6 DATA01

- id: error_status
  type: bitmask
  description: 12-byte error information bitmap (cover/fan/temp/lamp/etc.)
  source: 009 ERROR STATUS REQUEST DATA01-DATA12

- id: command_error
  type: enum
  values: [unrecognized_command, not_supported, invalid_value, invalid_input_terminal, invalid_language, memory_allocation_error, memory_in_use, value_cannot_be_set, forced_onscreen_mute_on, viewer_error, no_signal, test_pattern_displayed, no_pc_card, memory_operation_error, entry_list_displayed, power_off, execution_failed, no_authority, incorrect_gain_number, invalid_gain, adjustment_failed]
  source: ERR1/ERR2 combinations per "2.4 Error code list"
```

## Variables
```yaml
- id: brightness
  type: integer
  source: 030-1 PICTURE ADJUST (DATA01=00h); readable via 060-1 (DATA01=00h)

- id: contrast
  type: integer
  source: 030-1 PICTURE ADJUST (DATA01=01h); readable via 060-1 (DATA01=01h)

- id: color
  type: integer
  source: 030-1 PICTURE ADJUST (DATA01=02h); readable via 060-1 (DATA01=02h)

- id: hue
  type: integer
  source: 030-1 PICTURE ADJUST (DATA01=03h); readable via 060-1 (DATA01=03h)

- id: sharpness
  type: integer
  source: 030-1 PICTURE ADJUST (DATA01=04h); readable via 060-1 (DATA01=04h)

- id: volume
  type: integer
  source: 030-2 VOLUME ADJUST; readable via 060-1 (DATA01=05h)

- id: lamp_adjust
  type: integer
  source: 030-15 OTHER ADJUST (DATA01=96h); readable via 060-1 (DATA01=96h)

- id: eco_mode
  type: integer  # UNRESOLVED: exact enum values referenced in Appendix, not in this excerpt
  source: 098-8 ECO MODE SET / 097-8 ECO MODE REQUEST

- id: projector_name
  type: string
  source: 098-45 LAN PROJECTOR NAME SET / 097-45 LAN PROJECTOR NAME REQUEST (max 16 bytes)

- id: aspect
  type: integer  # UNRESOLVED: exact enum values referenced in Appendix, not in this excerpt
  source: 030-12 ASPECT ADJUST

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: 053-10 LENS PROFILE SET / 053-11 LENS PROFILE REQUEST

- id: lens_memory_load_by_signal
  type: enum
  values: [off, on]
  source: 053-6 LENS MEMORY OPTION SET (DATA01=00h)

- id: lens_memory_forced_mute
  type: enum
  values: [off, on]
  source: 053-6 LENS MEMORY OPTION SET (DATA01=01h)

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: 098-243-1 EDGE BLENDING MODE SET

- id: freeze
  type: enum
  values: [off, on]
  source: 079 FREEZE CONTROL

- id: pip_pbyp_mode
  type: enum
  values: [pip, picture_by_picture]
  source: 098-198 PIP/PICTURE BY PICTURE SET (DATA01=00h)

- id: pip_pbyp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  source: 098-198 (DATA01=01h)
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events.
# All responses are direct command replies.
```

## Macros
```yaml
# UNRESOLVED: source describes no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "015. POWER ON"
    note: "While powering on, no other command can be accepted."
  - command: "016. POWER OFF"
    note: "During power-off (including cooling time), no other command can be accepted."
  - command: "053. LENS CONTROL"
    note: "After sending 7Fh/+continuous or 81h/-continuous, must send 00h to stop lens drive."
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond command-level acceptance notes above.
```

## Notes
- Binary framed protocol. All command/response frames use hex byte notation with `h` suffix.
- Response prefixes: `20h`/`21h`/`22h`/`23h` = success response (varies by command class); `A0h`/`A1h`/`A2h`/`A3h` = error response.
- Common parameters in every frame: `<ID1>` = control ID set on projector; `<ID2>` = model code (model-specific, not in source); `<CKS>` = checksum (low-order byte of sum of all preceding bytes).
- Checksum example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → checksum = `03h`.
- Usage-time fields (lamp, filter) update at one-minute intervals though reported in one-second units.
- Lamp remaining life (%) returns negative value if replacement deadline exceeded.
- Signal list number returned is 1 less than practical value (add 1 to obtain actual).
- Many DATA values reference an "Appendix — Supplementary Information by Command" not present in this excerpt.

<!-- UNRESOLVED: ID2 model code value for V984Q Avt3 not stated in source -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included — exact enum values for input terminal, aspect, eco mode, sub input, base model type are missing -->
<!-- UNRESOLVED: default baud rate not stated (source lists 5 supported values) -->
<!-- UNRESOLVED: flow control scheme not explicitly stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:13:09.669Z
last_checked_at: 2026-06-19T07:43:58.551Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:43:58.551Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source with exact command sequence matches; transport parameters confirmed; comprehensive one-to-one coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value not stated for this specific model"
- "flow control not stated; source mentions RTS/CTS pins but specifies full-duplex communication mode only"
- "exact enum values referenced in Appendix, not in this excerpt"
- "source describes no unsolicited notifications / push events."
- "source describes no explicit multi-step sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "ID2 model code value for V984Q Avt3 not stated in source"
- "Appendix \"Supplementary Information by Command\" not included — exact enum values for input terminal, aspect, eco mode, sub input, base model type are missing"
- "default baud rate not stated (source lists 5 supported values)"
- "flow control scheme not explicitly stated"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
