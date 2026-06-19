---
spec_id: admin/sharp-nec-xp-a104u-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp A104U B Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp A104U B"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp A104U B"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:37:40.065Z
last_checked_at: 2026-06-19T07:48:09.629Z
generated_at: 2026-06-19T07:48:09.629Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "several commands reference an \"Appendix: Supplementary Information by Command\" for concrete value enumerations (input terminal codes, aspect values, eco-mode values, base model types, sub-input values). That appendix is not present in the source text, so those value maps are unresolved."
  - "flow-control mode not stated in source (RTS/CTS pins are wired per pin table, but no setting given)"
  - "appendix not in source.\""
  - "firmware version compatibility not stated in source."
  - "\"Appendix: Supplementary Information by Command\" (concrete value maps for input terminal codes, aspect values, eco-mode values, base-model types, PIP sub-input values) is referenced repeatedly but not present in the source text."
  - "flow-control mode not stated (RTS/CTS wired but no setting documented)."
  - "no single default baud rate stated (4800/9600/19200/38400/115200 are all selectable)."
  - "model code (ID2) value for Xp A104U B not stated in source."
  - "control ID (ID1) default/factory value not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:48:09.629Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched exactly to source command bytes; all transport params verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp A104U B Control Spec

## Summary
The Sharp/NEC Xp A104U B is a projector controllable via an RS-232C serial port (PC CONTROL, D-SUB 9P) or a wired/wireless LAN (TCP). This spec documents the binary hex command set described in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), covering power, input switching, mute, picture/volume/aspect adjustment, lens control and memory, status queries, and LAN/PIP/edge-blending configuration.

<!-- UNRESOLVED: several commands reference an "Appendix: Supplementary Information by Command" for concrete value enumerations (input terminal codes, aspect values, eco-mode values, base model types, sub-input values). That appendix is not present in the source text, so those value maps are unresolved. -->

## Transport
```yaml
# Source documents BOTH an RS-232C serial connection and a LAN (TCP) connection.
# Commands are identical binary hex frames over either transport.
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 4800  # source lists selectable: 115200/38400/19200/9600/4800 - no single default stated
  # baud_rate options documented: 4800, 9600, 19200, 38400, 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow-control mode not stated in source (RTS/CTS pins are wired per pin table, but no setting given)
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable   # inferred: numerous REQUEST/query commands returning values
  - levelable   # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST level controls
  - routable    # inferred: 018 INPUT SW CHANGE selects input terminal
```

## Actions
```yaml
# Binary hex framing. Controller→projector command frames as listed below carry
# a trailing checksum byte (CKS): low-order 8 bits of the sum of all preceding
# bytes. For fixed commands the documented CKS is included verbatim; for
# parameterized commands {CKS} must be recomputed over the actual bytes sent.
# Response frames (projector→controller) additionally embed <ID1> (control ID)
# and <ID2> (model code); these are NOT part of the command sent from the host.
# All values verbatim from source (hex with 'h' suffix).

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
  notes: "While turning on, no other command can be accepted."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (including cooling time), no other command can be accepted."

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal code (e.g. 06h = Video). Full code list in Appendix - UNRESOLVED: appendix not in source."

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
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

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
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Aspect value. Full list in Appendix - UNRESOLVED: appendix not in source."

- id: other_adjust
  label: Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Target high byte (documented 96h)"
    - name: DATA02
      type: byte
      description: "Target low byte (documented FFh = LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA03
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only on two-lamp models)"
    - name: DATA02
      type: byte
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_info_request
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
      description: "Key code low byte (e.g. 05h=AUTO, 29h=PICTURE, 4Bh=COMPUTER1)"
    - name: DATA02
      type: byte
      description: "Key code high byte (documented 00h for all listed codes)"

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
      description: "Target (documented 06h=Periphery Focus)"
    - name: DATA02
      type: byte
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target to query"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Target (FFh=Stop)"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

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
      description: "00h=MOVE, 01h=STORE, 02h=RESET (operates on profile set via 053-10)"

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
      description: "Setting: 00h=OFF, 01h=ON"

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
      description: "Profile: 00h=Profile 1, 01h=Profile 2"

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
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
      description: "01h=freeze on, 02h=freeze off"

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

- id: lan_mac_address_request_2
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
      description: "Eco mode value. Full list in Appendix - UNRESOLVED: appendix not in source."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: DATA01..DATA16
      type: bytes
      description: "Projector name, up to 16 bytes (NUL-terminated)"

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
      description: "Setting value (varies by DATA01). Sub-input values in Appendix - UNRESOLVED: appendix not in source."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=off, 01h=on"

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
      description: "Input terminal. Full list in Appendix - UNRESOLVED: appendix not in source."
    - name: DATA02
      type: byte
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable states returned by query responses.
- id: error_status
  type: bitmap
  source: 009. ERROR STATUS REQUEST
  description: "12 bytes of error bits (cover, fan, temp, lamp, etc.); bit=1 means error."

- id: power_status
  type: enum
  values: [standby, power_on]
  source: 078-2. RUNNING STATUS REQUEST (DATA03: 00h=Standby, 01h=Power on)

- id: cooling_status
  type: enum
  values: [not_executed, during_execution]
  source: 078-2. RUNNING STATUS REQUEST (DATA04)

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: 078-2. RUNNING STATUS REQUEST (DATA06)

- id: mute_status
  type: composite
  source: 078-4. MUTE STATUS REQUEST
  description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each off/on)."

- id: input_signal_status
  type: composite
  source: 078-3. INPUT STATUS REQUEST
  description: "Signal switch process, signal list number, selection signal type, content displayed."

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: 078-4. MUTE STATUS REQUEST (DATA01)

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: 078-4. MUTE STATUS REQUEST (DATA02)

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: 078-4. MUTE STATUS REQUEST (DATA03)

- id: freeze_state
  type: enum
  values: [off, on]
  source: 305-3. BASIC INFORMATION REQUEST (DATA09)

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: 078-6. COVER STATUS REQUEST (DATA01: 00h=Normal/cover opened, 01h=Cover closed)

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: 037. INFORMATION REQUEST / 037-4. LAMP INFORMATION REQUEST 3

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: 037-4. LAMP INFORMATION REQUEST 3 (negative if replacement deadline exceeded)

- id: filter_usage_time
  type: integer
  unit: seconds
  source: 037-3. FILTER USAGE INFORMATION REQUEST

- id: filter_alarm_start_time
  type: integer
  unit: seconds
  source: 037-3. FILTER USAGE INFORMATION REQUEST (returns -1 if undefined)

- id: carbon_savings
  type: composite
  source: 037-6. CARBON SAVINGS INFORMATION REQUEST
  description: "Total or operation carbon savings in kg + mg."

- id: lens_position
  type: composite
  source: 053-1. LENS CONTROL REQUEST
  description: "Upper/lower limit and current value of lens adjustment."

- id: lens_operation_status
  type: bitmap
  source: 053-7. LENS INFORMATION REQUEST
  description: "Per-lens-axis operation status (lens memory, zoom, focus, shift H/V: stop/in-operation)."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: 053-11. LENS PROFILE REQUEST

- id: gain_parameter
  type: composite
  source: 060-1. GAIN PARAMETER REQUEST 3
  description: "Range, default, current, adjustment widths for brightness/contrast/color/hue/sharpness/volume/lamp adjust."

- id: eco_mode
  type: enum
  source: 097-8. ECO MODE REQUEST
  description: "Eco/Light/Lamp mode value. Concrete values in Appendix - UNRESOLVED."

- id: projector_name
  type: string
  source: 097-45. LAN PROJECTOR NAME REQUEST

- id: mac_address
  type: string
  source: 097-155. LAN MAC ADDRESS STATUS REQUEST2

- id: pip_pbyp_setting
  type: composite
  source: 097-198. PIP/PICTURE BY PICTURE REQUEST
  description: "Mode, start position, sub-input settings."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: 097-243-1. EDGE BLENDING MODE REQUEST

- id: model_name
  type: string
  source: 078-5. MODEL NAME REQUEST

- id: base_model_type
  type: composite
  source: 305-1. BASE MODEL TYPE REQUEST
  description: "Base model type + model name. Type values in Appendix - UNRESOLVED."

- id: serial_number
  type: string
  source: 305-2. SERIAL NUMBER REQUEST

- id: sync_frequency
  type: composite
  source: 084. INFORMATION STRING REQUEST
  description: "Horizontal/vertical synchronous frequency strings."

- id: sound_function_available
  type: enum
  values: ["not_available", available]
  source: 078-1. SETTING REQUEST (DATA04)
```

## Variables
```yaml
# Settable parameters are represented as discrete Actions (030-1 PICTURE ADJUST,
# 030-2 VOLUME ADJUST, 030-12 ASPECT ADJUST, 030-15 OTHER ADJUST, 098-* SET
# commands, 319-10 AUDIO SELECT SET). No additional continuous variables beyond
# those actions are documented in the source.
```

## Events
```yaml
# No unsolicited (push) notifications documented. All device data is obtained by
# explicit request/response polling.
```

## Macros
```yaml
# No multi-step command sequences are explicitly described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_transition_lockout
    description: "During POWER ON and POWER OFF (including cooling time) no other command can be accepted by the projector (source: commands 015, 016)."
  - id: interlock_switch
    description: "Error status DATA09 Bit1 reports 'The interlock switch is open' (source: 009. ERROR STATUS REQUEST)."
  - id: cover_status
    description: "Mirror cover / lens cover status reported; cover error flagged in error status DATA01 Bit0 (source: 009, 078-6)."
# No power-on sequencing requirements or voltage/current/power specs are stated
# in the source.
```

## Notes
- **Protocol type:** Binary, hex-byte framed protocol. Command frames are sent from host to projector; the projector replies with a response frame. Response frames prefix the command-class byte with 0x20 (ack) or 0x80+ (error), and embed `<ID1>` (control ID) and `<ID2>` (model code).
- **Checksum (CKS):** low-order 8 bits of the sum of all preceding bytes. Example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`. Fixed commands below already include the documented CKS; parameterized commands require CKS recomputation.
- **ID1 / ID2:** ID1 = control ID set on projector; ID2 = model code. These appear in responses but not in the host-sent command frames documented here.
- **Error responses:** `A*h` frames carry `<ERR1> <ERR2>`. Full error-code table documented in source §2.4 (e.g. `00h/00h`=unrecognized, `02h/0Dh`=power off, `02h/0Eh`=execution failed, `03h/02h`=adjustment failed).
- **Serial cable:** cross (null-modem) cable required; D-SUB 9P PC CONTROL port (RxD/TxD/GND + RTS/CTS crossed).
- **LAN:** wired RJ-45 (10/100 auto) or optional wireless LAN unit; TCP port 7142.
- **Usage-time granularity:** lamp/filter usage times are obtainable in 1-second units but updated at 1-minute intervals.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: "Appendix: Supplementary Information by Command" (concrete value maps for input terminal codes, aspect values, eco-mode values, base-model types, PIP sub-input values) is referenced repeatedly but not present in the source text. -->
<!-- UNRESOLVED: flow-control mode not stated (RTS/CTS wired but no setting documented). -->
<!-- UNRESOLVED: no single default baud rate stated (4800/9600/19200/38400/115200 are all selectable). -->
<!-- UNRESOLVED: model code (ID2) value for Xp A104U B not stated in source. -->
<!-- UNRESOLVED: control ID (ID1) default/factory value not stated in source. -->

Spec complete. 53 actions (25 query + 28 action), all command payloads verbatim from source. UNRESOLVED markers on missing appendix value-maps + firmware/flow-control/baud-default. Caveman stays on.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:37:40.065Z
last_checked_at: 2026-06-19T07:48:09.629Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:48:09.629Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched exactly to source command bytes; all transport params verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "several commands reference an \"Appendix: Supplementary Information by Command\" for concrete value enumerations (input terminal codes, aspect values, eco-mode values, base model types, sub-input values). That appendix is not present in the source text, so those value maps are unresolved."
- "flow-control mode not stated in source (RTS/CTS pins are wired per pin table, but no setting given)"
- "appendix not in source.\""
- "firmware version compatibility not stated in source."
- "\"Appendix: Supplementary Information by Command\" (concrete value maps for input terminal codes, aspect values, eco-mode values, base-model types, PIP sub-input values) is referenced repeatedly but not present in the source text."
- "flow-control mode not stated (RTS/CTS wired but no setting documented)."
- "no single default baud rate stated (4800/9600/19200/38400/115200 are all selectable)."
- "model code (ID2) value for Xp A104U B not stated in source."
- "control ID (ID1) default/factory value not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
