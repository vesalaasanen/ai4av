---
spec_id: admin/sharp-nec-xp-m401h-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp M401H W Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp M401H W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp M401H W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:13:00.289Z
last_checked_at: 2026-06-19T07:49:46.757Z
generated_at: 2026-06-19T07:49:46.757Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility, exact model code (ID2) value, flow control mode, and wireless LAN unit specifics not stated in source."
  - "RTS/CTS pins present in pinout but flow control mode not explicitly stated"
  - "source does not document unsolicited notifications; all responses are to commands."
  - "no multi-step sequences described in source."
  - "no power-on sequencing voltage/current specs stated in source."
  - "firmware version compatibility range not stated."
  - "model code (ID2) value for Xp M401H W not stated."
  - "flow_control mode (RTS/CTS wiring present but enablement not stated)."
  - "Appendix \"Supplementary Information by Command\" not present in source extract — several enum value tables undefined."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:49:46.757Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands match source RS-232/TCP protocol documentation with exact hex opcodes. Transport parameters (115200 baud, port 7142) confirmed. Complete coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp M401H W Control Spec

## Summary
Sharp/NEC Xp M401H W projector control spec covering RS-232C serial and TCP/IP (wired/wireless LAN) control. Commands are binary hex frames with a trailing checksum byte. Covers power, input switching, mute, picture/volume/aspect adjust, lens control, lens memory, status queries, eco mode, PIP/PbP, edge blending, and information requests.

<!-- UNRESOLVED: firmware version compatibility, exact model code (ID2) value, flow control mode, and wireless LAN unit specifics not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists supported rates: 115200 / 38400 / 19200 / 9600 / 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins present in pinout but flow control mode not explicitly stated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
# Note: RS-232C cross cable on PC CONTROL (D-SUB 9P); TxD/RxD and RTS/CTS cross-connected.
# Communication mode: Full duplex. Checksum = low-order one byte of sum of all preceding bytes.
# TCP port 7142 used for LAN command send/receive.
```

## Traits
```yaml
- powerable       # inferred from POWER ON / POWER OFF commands
- queryable       # inferred from numerous status request commands
- levelable       # inferred from PICTURE/VOLUME/LAMP adjust commands
- shutterable     # inferred from SHUTTER CLOSE / OPEN commands
```

## Actions
```yaml
# All payloads are hex bytes, verbatim from source. <CKS> = checksum (low-order one byte of the
# sum of all preceding bytes). <DATA??> are variable parameter bytes. Command frame structure:
# [CmdHi] [CmdLo] 00h 00h [LEN] [DATA...] [CKS]. Response frames set high bit on CmdHi (e.g.
# 20h/21h/22h/23h for success, A0h/A1h/A2h/A3h for error).

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
  notes: While turning on power, no other command accepted.

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: While turning off (including cooling time), no other command accepted.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} <CKS>"
  params:
    - name: input
      type: integer
      description: Input terminal (DATA01). Values defined in source Appendix "Supplementary Information by Command". Example 06h = video port.
  notes: "Example to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "DATA02 mode: 00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: DATA03 adjustment value (low-order 8 bits)
    - name: value_hi
      type: integer
      description: DATA04 adjustment value (high-order 8 bits)
  notes: "Brightness=10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} <CKS>"
  params:
    - name: mode
      type: integer
      description: "DATA01 mode: 00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: DATA02 adjustment value (low-order 8 bits)
    - name: value_hi
      type: integer
      description: DATA03 adjustment value (high-order 8 bits)
  notes: "Volume=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h <CKS>"
  params:
    - name: aspect
      type: integer
      description: DATA01 aspect value (see source Appendix "Supplementary Information by Command")

- id: other_adjust_lamp_light
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} <CKS>"
  params:
    - name: target_lo
      type: integer
      description: "DATA01: 96h for LAMP ADJUST / LIGHT ADJUST"
    - name: target_hi
      type: integer
      description: "DATA02: FFh for LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "DATA03 mode: 00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: DATA04 adjustment value (low-order 8 bits)
    - name: value_hi
      type: integer
      description: DATA05 adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals.

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time seconds (DATA01-04) and filter alarm start time seconds (DATA05-08). -1 if undefined.

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} <CKS>"
  params:
    - name: lamp
      type: integer
      description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "DATA02: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: Values reflect eco mode if enabled. Negative remaining life if replacement deadline exceeded.

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} <CKS>"
  params:
    - name: type
      type: integer
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} <CKS>"
  params:
    - name: key_lo
      type: integer
      description: "DATA01 key code low byte (e.g. 05h=AUTO, 06h=MENU, 07h=UP, 4Bh=COMPUTER1, 8Ah=FREEZE)"
    - name: key_hi
      type: integer
      description: DATA02 key code high byte (00h for all listed keys)
  notes: "AUTO example: 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
  command: "02h 18h 00h 00h 02h {target} {content} <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01: 06h=Periphery Focus"
    - name: content
      type: integer
      description: "DATA02: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
  notes: After 7Fh/81h, send 00h to stop. Lens can be controlled without stop while driving by re-issuing same command.

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h <CKS>"
  params:
    - name: target
      type: integer
      description: DATA01 lens target
  notes: Returns upper/lower limits and current value (16-bit each).

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01: FFh=Stop"
    - name: mode
      type: integer
      description: "DATA02: 00h=absolute, 02h=relative"
    - name: value_lo
      type: integer
      description: DATA03 adjustment value (low-order 8 bits)
    - name: value_hi
      type: integer
      description: DATA04 adjustment value (high-order 8 bits)
  notes: If Stop specified, mode/value not referenced.

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} <CKS>"
  params:
    - name: operation
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} <CKS>"
  params:
    - name: operation
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Controls profile number specified in LENS PROFILE SET.

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} <CKS>"
  params:
    - name: option
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} <CKS>"
  params:
    - name: option
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "DATA02: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns DATA01 bitfield: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift(H), bit4=Lens Shift(V) (0=Stop, 1=During operation).

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} <CKS>"
  params:
    - name: profile
      type: integer
      description: "DATA01: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: Returns DATA01 profile number (00h=Profile 1, 01h=Profile 2).

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h <CKS>"
  params:
    - name: name
      type: integer
      description: "DATA01 adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: Returns status, limits, default, current value, wide/narrow adjustment widths.

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep (DATA05).

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06).

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal types, test pattern, content displayed.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display flags.

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Returns model name string (DATA01-32, NUL terminated).

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} <CKS>"
  params:
    - name: state
      type: integer
      description: "DATA01: 01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h <CKS>"
  params:
    - name: type
      type: integer
      description: "DATA01: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns Light mode / Lamp mode value (see source Appendix).

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Returns projector name string (DATA01-17, NUL terminated).

- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Returns MAC address (DATA01-06).

- id: pip_pbp_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} <CKS>"
  params:
    - name: item
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} <CKS>"
  params:
    - name: value
      type: integer
      description: DATA01 eco mode value (see source Appendix "Supplementary Information by Command")

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name01} - {name16} 00h <CKS>"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, DATA01-16)
  notes: Sets projector name; NUL-terminated.

- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {value} <CKS>"
  params:
    - name: item
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "DATA02 setting value (MODE: 00h=PIP/01h=PICTURE BY PICTURE; START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub input values see Appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} <CKS>"
  params:
    - name: value
      type: integer
      description: "DATA01: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11).

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: Returns serial number string (DATA01-16, NUL terminated).

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Returns operation status, content displayed, selection signal types, signal type, video/sound/onscreen mute, freeze status.

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {setting} <CKS>"
  params:
    - name: input
      type: integer
      description: DATA01 input terminal (see source Appendix "Supplementary Information by Command")
    - name: setting
      type: integer
      description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Responses to queries; success response sets high bit on CmdHi (20h/23h), error uses A0h/A3h with ERR1/ERR2.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request DATA06; basic_information_request DATA01

- id: error_status
  type: bitmask
  description: 12-byte error information bitfield (DATA01-12). Bit=1 indicates error.
  fields:
    - DATA01 bit0: cover error
    - DATA01 bit3: fan error
    - DATA01 bit4: fan error
    - DATA01 bit5: power error
    - DATA01 bit6: lamp off / backlight off
    - DATA01 bit7: lamp replacement moratorium
    - DATA02 bit0: lamp usage time exceeded
    - DATA02 bit1: formatter error
    - DATA02 bit2: lamp 2 off
    - DATA03 bit1: FPGA error
    - DATA03 bit2: temperature error (sensor)
    - DATA03 bit3: lamp not present
    - DATA03 bit4: lamp data error
    - DATA03 bit5: mirror cover error
    - DATA03 bit6: lamp 2 replacement moratorium
    - DATA03 bit7: lamp 2 usage time exceeded
    - DATA04 bit0: lamp 2 not present
    - DATA04 bit1: lamp 2 data error
    - DATA04 bit2: temperature error due to dust
    - DATA04 bit3: foreign matter sensor error
    - DATA04 bit5: ballast communication error
    - DATA04 bit6: iris calibration error
    - DATA04 bit7: lens not installed properly
    - DATA09 bit1: interlock switch open
    - DATA09 bit2: system error (Slave CPU)
    - DATA09 bit3: system error (Formatter)

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: information_request DATA83-86; lamp_information_request_3 (DATA01=00h content=01h)

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: lamp_information_request_3 (content=04h)

- id: filter_usage_time
  type: integer
  unit: seconds
  source: filter_usage_information_request DATA01-04

- id: mute_status
  type: object
  fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, osd_display]
  source: mute_status_request

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: cover_status_request DATA01

- id: eco_mode
  type: integer
  source: eco_mode_request DATA01

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: edge_blending_mode_request DATA01

- id: model_name
  type: string
  source: model_name_request

- id: serial_number
  type: string
  source: serial_number_request

- id: mac_address
  type: string
  source: lan_mac_address_request_2 DATA01-06

- id: projector_name
  type: string
  source: lan_projector_name_request

- id: lens_operation_status
  type: bitmask
  description: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=stop,1=operating)
  source: lens_information_request DATA01
```

## Variables
```yaml
- id: volume
  type: integer
  description: Sound volume level
  read: gain_parameter_request_3 (name=05h)
  write: volume_adjust

- id: brightness
  type: integer
  description: Picture brightness
  read: gain_parameter_request_3 (name=00h)
  write: picture_adjust (target=00h)

- id: contrast
  type: integer
  read: gain_parameter_request_3 (name=01h)
  write: picture_adjust (target=01h)

- id: color
  type: integer
  read: gain_parameter_request_3 (name=02h)
  write: picture_adjust (target=02h)

- id: hue
  type: integer
  read: gain_parameter_request_3 (name=03h)
  write: picture_adjust (target=03h)

- id: sharpness
  type: integer
  read: gain_parameter_request_3 (name=04h)
  write: picture_adjust (target=04h)

- id: lamp_light_adjust
  type: integer
  read: gain_parameter_request_3 (name=96h)
  write: other_adjust_lamp_light
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications; all responses are to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # projector locks out commands during power-off cooling cycle
interlocks:
  - "During POWER ON, no other command is accepted."
  - "During POWER OFF (including cooling time), no other command is accepted."
  - "Picture/sound/onscreen mute auto-clear on input terminal switch or video signal switch."
  - "Error DATA09 bit1: interlock switch open (portrait cover side)."
# UNRESOLVED: no power-on sequencing voltage/current specs stated in source.
```

## Notes
- Command frame is binary hex: `[CmdHi] [CmdLo] 00h 00h [LEN] [DATA...] [CKS]`. The final byte is a checksum = low-order one byte of the sum of all preceding bytes. Example: `20h 81h 01h 60h 01h 00h` sums to 103h → checksum 03h.
- Success responses set the high bit of the leading byte (20h/21h/22h/23h); error responses use A0h/A1h/A2h/A3h and carry ERR1/ERR2 error codes (see source §2.4). Notable error codes: 02h 0Dh = "command cannot be accepted because the power is off"; 02h 0Fh = "no authority for the operation"; 00h 01h = "command not supported by the model in use".
- Usage-time fields update at 1-minute intervals though stored in 1-second units.
- Lens drive plus/minus continuous (7Fh/81h) must be stopped explicitly by sending 00h; same command can be re-issued during drive to continue motion.
- Serial: RS-232C cross cable on PC CONTROL (D-SUB 9P). LAN: TCP port 7142, 10/100 Mbps auto-switchable wired (IEEE 802.3/802.3u) or optional wireless LAN unit.
- Several DATA fields reference a source Appendix ("Supplementary Information by Command") not included in this refined extract — input terminal values, aspect values, eco mode values, sub-input values, and base model type codes are defined there.
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: model code (ID2) value for Xp M401H W not stated. -->
<!-- UNRESOLVED: flow_control mode (RTS/CTS wiring present but enablement not stated). -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not present in source extract — several enum value tables undefined. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:13:00.289Z
last_checked_at: 2026-06-19T07:49:46.757Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:49:46.757Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands match source RS-232/TCP protocol documentation with exact hex opcodes. Transport parameters (115200 baud, port 7142) confirmed. Complete coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility, exact model code (ID2) value, flow control mode, and wireless LAN unit specifics not stated in source."
- "RTS/CTS pins present in pinout but flow control mode not explicitly stated"
- "source does not document unsolicited notifications; all responses are to commands."
- "no multi-step sequences described in source."
- "no power-on sequencing voltage/current specs stated in source."
- "firmware version compatibility range not stated."
- "model code (ID2) value for Xp M401H W not stated."
- "flow_control mode (RTS/CTS wiring present but enablement not stated)."
- "Appendix \"Supplementary Information by Command\" not present in source extract — several enum value tables undefined."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
