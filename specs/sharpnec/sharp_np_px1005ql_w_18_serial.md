---
spec_id: admin/sharpnec-nppx1005qlw18
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PX1005QL W 18 Control Spec"
manufacturer: Sharp/NEC
model_family: "NP-PX1005QL W 18"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP-PX1005QL W 18"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:08:32.737Z
last_checked_at: 2026-06-18T08:53:44.066Z
generated_at: 2026-06-18T08:53:44.066Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "input terminal value codes referenced to an \"Appendix / Supplementary Information by Command\" not present in this refined excerpt"
  - "eco mode value codes referenced to an \"Appendix / Supplementary Information by Command\" not present in this refined excerpt"
  - "sub input setting values for PIP/PbP referenced to an \"Appendix / Supplementary Information by Command\" not present in this refined excerpt"
  - "flow control not stated in source (RTS/CTS pins wired but mode not specified)"
  - "no event/notification section in source"
  - "no macro sequences in source"
  - "no explicit interlock procedure in source"
  - "input terminal / eco mode / aspect / sub input / base model type value codes referenced to appendix absent from this excerpt"
  - "serial flow control setting not explicitly stated (RTS/CTS pins wired but mode unspecified)"
  - "ID2 model code value for this specific model not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:53:44.066Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PX1005QL W 18 Control Spec

## Summary
Sharp/NEC NP-PX1005QL W 18 projector control spec. Covers RS-232C serial control and wired/wireless LAN (TCP) control of power, input selection, picture/volume adjustment, lens control, lens memory, shutter, freeze, mute, eco mode, edge blending, PIP/PbP, and a broad set of status queries. Command protocol uses framed hex byte sequences with an additive low-byte checksum.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal value codes referenced to an "Appendix / Supplementary Information by Command" not present in this refined excerpt -->
<!-- UNRESOLVED: eco mode value codes referenced to an "Appendix / Supplementary Information by Command" not present in this refined excerpt -->
<!-- UNRESOLVED: sub input setting values for PIP/PbP referenced to an "Appendix / Supplementary Information by Command" not present in this refined excerpt -->

## Transport
```yaml
# Source documents BOTH serial (RS-232C) and LAN (TCP) connection methods.
# Both protocol groups emitted because both are explicitly described.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source: 115200/38400/19200/9600/4800 bps selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired but mode not specified)
addressing:
  port: 7142  # TCP port for sending/receiving commands over LAN (source: section 1.2)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands (015, 016)
  - queryable    # inferred from many status request commands
  - levelable    # inferred from picture/volume/lamp adjust commands
```

## Actions
```yaml
# Frame format (hex): bytes carry ID1 (control ID), ID2 (model code), and CKS
# (checksum = low-order byte of sum of all preceding bytes). Parameterized
# commands show {DATA??} placeholders and the trailing {CKS}.
# Response prefixes: 2xh = success ack, 3xh = success with data, Axh = error.
# Each entry below is one distinct command row from the source command list.

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
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (see Appendix "Supplementary Information by Command"). Example 06h = video port.

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
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
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
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect (see Appendix "Supplementary Information by Command")

- id: other_adjust_lamp_light
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {DATA03} {DATA04} {DATA05} {CKS}"
  params:
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
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: Key code high byte (WORD type; 00h for all listed keys)

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
      type: integer
      description: Lens target (06h = Periphery Focus per source table)
    - name: DATA02
      type: integer
      description: "Content/direction: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target to query (same targets as lens_control)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh = Stop)"
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
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET (applies to profile selected by LENS PROFILE SET)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
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

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
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
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
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

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP / Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
      type: integer
      description: Value set for the eco mode (see Appendix "Supplementary Information by Command")

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: projector_name
      type: string
      description: Projector name (up to 16 bytes), encoded across DATA01-DATA16

- id: pip_picture_by_picture_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (depends on item); MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT; SUB INPUT values per Appendix"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
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
      type: integer
      description: Input terminal (see Appendix "Supplementary Information by Command")
    - name: DATA02
      type: integer
      description: "Setting value: 00h=the terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response frame prefixes: 2xh success-no-data, 3xh success-with-data, Axh error.
# Successful command echoes the command's op bytes with high nibble 2/3; error
# returns Axh with ERR1/ERR2 codes.

- id: error_status
  type: bitmask
  description: Error status bitmap returned by command 009 (DATA01-DATA12). Bit=1 indicates error.

- id: power_state
  type: enum
  description: Running status DATA03 from command 078-2.
  values: [standby, power_on]

- id: cooling_process
  type: enum
  description: Running status DATA04 from command 078-2.
  values: [not_executed, during_execution]

- id: power_on_off_process
  type: enum
  description: Running status DATA05 from command 078-2.
  values: [not_executed, during_execution]

- id: operation_status
  type: enum
  description: Running status DATA06 from command 078-2.
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: picture_mute
  type: enum
  description: Mute status DATA01 from command 078-4.
  values: [off, on]

- id: sound_mute
  type: enum
  description: Mute status DATA02 from command 078-4.
  values: [off, on]

- id: onscreen_mute
  type: enum
  description: Mute status DATA03 from command 078-4.
  values: [off, on]

- id: forced_onscreen_mute
  type: enum
  description: Mute status DATA04 from command 078-4.
  values: [off, on]

- id: cover_status
  type: enum
  description: Cover status DATA01 from command 078-6.
  values: [normal_open, closed]

- id: lamp_usage_time
  type: integer
  description: Lamp usage time in seconds (command 037 / 037-4); updated at one-minute intervals.

- id: lamp_remaining_life
  type: integer
  description: Lamp remaining life percent (command 037-4, content 04h); negative if replacement deadline exceeded.

- id: filter_usage_time
  type: integer
  description: Filter usage time in seconds (command 037-3); -1 if undefined.

- id: projector_name
  type: string
  description: Projector name string (commands 037, 097-45).

- id: model_name
  type: string
  description: Model name string (command 078-5).

- id: serial_number
  type: string
  description: Serial number string (command 305-2).

- id: mac_address
  type: string
  description: MAC address, 6 bytes (command 097-155).

- id: eco_mode
  type: integer
  description: Eco mode value (command 097-8 / set via 098-8); code mapping per Appendix.

- id: edge_blending_mode
  type: enum
  description: Edge blending setting (command 097-243-1).
  values: [off, on]

- id: lens_operation_status
  type: bitmask
  description: Lens operation bitmap from command 053-7 (zoom/focus/shift/memory operation states).

- id: lens_profile
  type: enum
  description: Selected reference lens memory profile (command 053-11).
  values: [profile_1, profile_2]

- id: execution_result
  type: enum
  description: Generic 0000h/non-zero result returned by adjust commands (030-*, etc.).
  values: [success, error]

- id: command_error
  type: struct
  description: Error response (Axh frame) carrying ERR1/ERR2 codes (see error code list in source section 2.4).
```

## Variables
```yaml
# Settable parameters not already covered as discrete actions.
- id: picture_brightness
  type: integer
  description: Picture brightness (set via 030-1 DATA01=00h; query via 060-1).

- id: picture_contrast
  type: integer
  description: Picture contrast (set via 030-1 DATA01=01h; query via 060-1).

- id: picture_color
  type: integer
  description: Picture color (set via 030-1 DATA01=02h; query via 060-1).

- id: picture_hue
  type: integer
  description: Picture hue (set via 030-1 DATA01=03h; query via 060-1).

- id: picture_sharpness
  type: integer
  description: Picture sharpness (set via 030-1 DATA01=04h; query via 060-1).

- id: volume
  type: integer
  description: Sound volume (set via 030-2; query via 060-1 DATA01=05h).

- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust (set via 030-15 DATA01=96h; query via 060-1 DATA01=96h).

- id: aspect
  type: integer
  description: Aspect setting (set via 030-12; code mapping per Appendix).

- id: control_id
  type: integer
  description: ID1 control ID set on the projector (used in every command frame).
```

## Events
```yaml
# No unsolicited notifications documented in source. The projector responds only
# to commands; no event-push mechanism described.
# UNRESOLVED: no event/notification section in source
```

## Macros
```yaml
# No multi-step command sequences described as macros in source.
# UNRESOLVED: no macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes power-transition blocking (POWER ON/OFF accept no other command
# while in progress, including cooling time) and reports an "interlock switch
# open" condition in extended error status (009, DATA09 Bit1) plus cover errors,
# but documents NO explicit safety/interlock procedure or power-on sequencing
# requirement. Not populated to avoid inference.
# UNRESOLVED: no explicit interlock procedure in source
```

## Notes
- Command/response frames are hexadecimal byte sequences enclosed in a frame. Parameters appear in italics within brackets (`<ID1>`, `<DATA01>`, `<CKS>`).
- Checksum (CKS): sum all preceding bytes, take the low-order one byte (8 bits) of the result. Worked example: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- Common parameters: ID1 = control ID set on projector; ID2 = model code (varies by model); LEN = data length of bytes following LEN; ERR1/ERR2 = response error codes.
- Response prefixes: high nibble `2` = command succeeded with no data, `3` = succeeded with data, `A` = failed (carries ERR1/ERR2).
- Baud rate is selectable among 115200/38400/19200/9600/4800 bps; the controller software must match the projector's configured rate.
- TCP LAN control uses port 7142 (section 1.2).
- POWER ON/OFF block all other commands while power transition is in progress (POWER OFF includes the cooling period).
- PICTURE/SOUND/ONSCREEN mute auto-clear on input/video-signal switch; SOUND mute also auto-clears on volume adjustment.
- Lens drive: after sending `7Fh` (drive plus) or `81h` (drive minus), stop by sending `00h`.
- Lamp usage/filter usage update at one-minute intervals though reported in one-second units.
- Several value-code mappings (input terminal, eco mode, aspect, sub input for PIP/PbP, base model type) are referenced to an "Appendix / Supplementary Information by Command" not present in this refined excerpt.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal / eco mode / aspect / sub input / base model type value codes referenced to appendix absent from this excerpt -->
<!-- UNRESOLVED: serial flow control setting not explicitly stated (RTS/CTS pins wired but mode unspecified) -->
<!-- UNRESOLVED: ID2 model code value for this specific model not stated in source -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:08:32.737Z
last_checked_at: 2026-06-18T08:53:44.066Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:53:44.066Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "input terminal value codes referenced to an \"Appendix / Supplementary Information by Command\" not present in this refined excerpt"
- "eco mode value codes referenced to an \"Appendix / Supplementary Information by Command\" not present in this refined excerpt"
- "sub input setting values for PIP/PbP referenced to an \"Appendix / Supplementary Information by Command\" not present in this refined excerpt"
- "flow control not stated in source (RTS/CTS pins wired but mode not specified)"
- "no event/notification section in source"
- "no macro sequences in source"
- "no explicit interlock procedure in source"
- "input terminal / eco mode / aspect / sub input / base model type value codes referenced to appendix absent from this excerpt"
- "serial flow control setting not explicitly stated (RTS/CTS pins wired but mode unspecified)"
- "ID2 model code value for this specific model not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
