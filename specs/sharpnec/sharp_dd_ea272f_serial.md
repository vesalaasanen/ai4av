---
spec_id: admin/sharp-nec-dd-ea272f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Dd Ea272F Control Spec"
manufacturer: Sharp/NEC
model_family: "Dd Ea272F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Dd Ea272F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:27:44.723Z
last_checked_at: 2026-06-17T19:42:02.386Z
generated_at: 2026-06-17T19:42:02.386Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value not stated in source; Appendix \"Supplementary Information by Command\" values not included (not in source); firmware version compatibility not stated"
  - "eco mode enum values in Appendix not in source"
  - "no explicit safety interlock procedures or power-on sequencing"
  - "ID2 model code value not stated in source"
  - "input terminal DATA01 values only partially documented (example 06h=video; full list in Appendix not included)"
  - "eco mode enum values referenced in Appendix but not in source"
  - "sub input setting values for PIP/PbP referenced in Appendix but not in source"
  - "aspect values referenced in Appendix but not in source"
  - "base model type values referenced in Appendix but not in source"
  - "flow_control not explicitly stated in source (inferred none)"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:42:02.386Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source commands; full bidirectional coverage with no discrepancies in shapes or transport parameters. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Dd Ea272F Control Spec

## Summary
Sharp/NEC projector supporting RS-232C serial and TCP/IP LAN control via a binary command protocol with checksum. Covers power, input switching, mute, picture/volume/lens adjustment, lamp/filter diagnostics, lens memory, eco mode, edge blending, and PIP/PbP control. 53 documented commands.

<!-- UNRESOLVED: model code (ID2) value not stated in source; Appendix "Supplementary Information by Command" values not included (not in source); firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source states: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: no flow control config stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - routable        # inferred: INPUT SW CHANGE command present
  - queryable       # inferred: numerous status request commands present
  - levelable       # inferred: VOLUME ADJUST, PICTURE ADJUST commands present
```

## Actions
```yaml
# Frame format: <header> <command-bytes> <params> <checksum>
# Checksum = low-order byte of sum of all preceding bytes.
# Header prefixes: 00h-03h = command, 20h/21h/22h/23h = success response,
#                  A0h/A1h/A2h/A3h = error response.
# <ID1> = control ID, <ID2> = model code (value not in source).

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
  notes: "No other command accepted while power-on in progress."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time."

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (see Appendix in source for full list). Example: 06h = video port."
  notes: "Response DATA01=FFh means ended with error (no signal switch made)."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Auto-off on input terminal switch or video signal switch."

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
  notes: "Auto-off on input switch, video signal switch, or volume adjustment."

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
  notes: "Auto-off on input terminal switch or video signal switch."

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
  notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: Volume Adjust
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
  notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the aspect (see Appendix in source for values)"

- id: other_adjust
  label: Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Must be FFh for LAMP ADJUST / LIGHT ADJUST"
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
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time (DATA83-86, seconds), filter usage time (DATA87-90, seconds)."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04, seconds) and filter alarm start time (DATA05-08, seconds). -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Type: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte. Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: "Key code high byte (always 00h in source key list)"
  notes: "Response DATA01=FFh means ended with error."

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
    - name: DATA01
      type: integer
      description: "Lens target (e.g. 06h=Periphery Focus; other values in Appendix)"
    - name: DATA02
      type: integer
      description: "Direction/duration: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous plus, 81h=continuous minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "Send 00h to stop after continuous drive (7Fh/81h). Can re-issue same command during drive without stop."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (same values as lens_control DATA01)"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh=Stop; other values in Appendix). When Stop, DATA02-04 not referenced."
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
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number specified by LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns lens operation status bitmap: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) (0=Stop, 1=During operation)."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
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
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type, test pattern display, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status."

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
  notes: "Returns cover status: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
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
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
    - name: DATA01
      type: integer
      description: "Eco mode value (see Appendix in source for values)"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: DATA01-16
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value depends on DATA01 target (MODE: 00h=PIP/01h=PbP; START POSITION: 00h-03h corners; SUB INPUT: see Appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11)."

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
  notes: "Returns operation status, content displayed, signal types, mute states, freeze status."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (see Appendix in source for values)"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Error response frame (all commands on failure):
#   A0h/A1h/A2h/A3h <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Error codes (ERR1/ERR2):
#   00h 00h = command not recognized
#   00h 01h = command not supported by model
#   01h 00h = specified value invalid
#   01h 01h = specified input terminal invalid
#   01h 02h = specified language invalid
#   02h 00h = memory allocation error
#   02h 02h = memory in use
#   02h 03h = specified value cannot be set
#   02h 04h = forced onscreen mute on
#   02h 06h = viewer error
#   02h 07h = no signal
#   02h 08h = test pattern or filter displayed
#   02h 09h = no PC card inserted
#   02h 0Ah = memory operation error
#   02h 0Ch = entry list displayed
#   02h 0Dh = command cannot be accepted (power off)
#   02h 0Eh = command execution failed
#   02h 0Fh = no authority for operation
#   03h 00h = specified gain number incorrect
#   03h 01h = specified gain invalid
#   03h 02h = adjustment failed

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request DATA06

- id: error_status
  type: bitmap
  source: error_status_request DATA01-12
  description: "Error information across 12 bytes; bit set to 1 = error. Covers cover/fan/temperature/power/lamp/formatter/mirror/lens errors."

- id: mute_state
  type: enum
  values: [picture_on, picture_off, sound_on, sound_off, onscreen_on, onscreen_off]
  source: mute_status_request DATA01-03
```

## Variables
```yaml
- id: brightness
  type: integer
  adjust_target: 00h
  source: picture_adjust DATA01=00h, gain_parameter_request_3 DATA01=00h

- id: contrast
  type: integer
  adjust_target: 01h
  source: picture_adjust DATA01=01h, gain_parameter_request_3 DATA01=01h

- id: color
  type: integer
  adjust_target: 02h
  source: picture_adjust DATA01=02h, gain_parameter_request_3 DATA01=02h

- id: hue
  type: integer
  adjust_target: 03h
  source: picture_adjust DATA01=03h, gain_parameter_request_3 DATA01=03h

- id: sharpness
  type: integer
  adjust_target: 04h
  source: picture_adjust DATA01=04h, gain_parameter_request_3 DATA01=04h

- id: volume
  type: integer
  adjust_target: 05h
  source: volume_adjust, gain_parameter_request_3 DATA01=05h

- id: lamp_adjust
  type: integer
  adjust_target: 96h
  source: other_adjust DATA01=96h, gain_parameter_request_3 DATA01=96h

- id: eco_mode
  type: integer
  source: eco_mode_set / eco_mode_request
  # UNRESOLVED: eco mode enum values in Appendix not in source

- id: projector_name
  type: string
  max_length: 16
  source: lan_projector_name_set / lan_projector_name_request

- id: edge_blending
  type: enum
  values: [off, on]
  source: edge_blending_mode_set / edge_blending_mode_request

- id: freeze
  type: enum
  values: [off, on]
  source: freeze_control

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: lens_profile_set / lens_profile_request
```

## Events
```yaml
# No unsolicited notifications documented in source. Device only responds to commands.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "No other command accepted while power-on in progress."
  - command: power_off
    note: "No other command accepted during power-off including cooling time."
  - command: lens_control
    note: "After continuous drive (7Fh/81h), must send 00h to stop lens."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing
# requirements beyond command-level interlocks stated in source.
```

## Notes
- Command frame format: `<header> <cmd1> <cmd2> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Header 00h-03h = command direction; response prefixes 20h/21h/22h/23h = success, A0h/A1h/A2h/A3h = error.
- Checksum = low-order byte (8 bits) of sum of all preceding bytes.
- ID1 = control ID set on projector; ID2 = model code (varies by model).
- Lamp/filter usage time returned in seconds, updated at 1-minute intervals.
- Lamp remaining life (%) returns negative value if replacement deadline exceeded.
- Serial cable: cross cable, D-SUB 9P. Pin 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- LAN: wired (RJ-45, 10/100 Mbps auto) or wireless (via optional wireless LAN unit).

<!-- UNRESOLVED: ID2 model code value not stated in source -->
<!-- UNRESOLVED: input terminal DATA01 values only partially documented (example 06h=video; full list in Appendix not included) -->
<!-- UNRESOLVED: eco mode enum values referenced in Appendix but not in source -->
<!-- UNRESOLVED: sub input setting values for PIP/PbP referenced in Appendix but not in source -->
<!-- UNRESOLVED: aspect values referenced in Appendix but not in source -->
<!-- UNRESOLVED: base model type values referenced in Appendix but not in source -->
<!-- UNRESOLVED: flow_control not explicitly stated in source (inferred none) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:27:44.723Z
last_checked_at: 2026-06-17T19:42:02.386Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:42:02.386Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source commands; full bidirectional coverage with no discrepancies in shapes or transport parameters. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value not stated in source; Appendix \"Supplementary Information by Command\" values not included (not in source); firmware version compatibility not stated"
- "eco mode enum values in Appendix not in source"
- "no explicit safety interlock procedures or power-on sequencing"
- "ID2 model code value not stated in source"
- "input terminal DATA01 values only partially documented (example 06h=video; full list in Appendix not included)"
- "eco mode enum values referenced in Appendix but not in source"
- "sub input setting values for PIP/PbP referenced in Appendix but not in source"
- "aspect values referenced in Appendix but not in source"
- "base model type values referenced in Appendix but not in source"
- "flow_control not explicitly stated in source (inferred none)"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
