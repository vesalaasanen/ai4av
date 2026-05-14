---
spec_id: admin/biamp-pmx84
schema_version: ai4av-public-spec-v1
revision: 1
title: "Biamp Advantage PMX84 Control Spec"
manufacturer: Biamp
model_family: "Advantage PMX84"
aliases: []
compatible_with:
  manufacturers:
    - Biamp
  models:
    - "Advantage PMX84"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - downloads.biamp.com
source_urls:
  - "https://downloads.biamp.com/assets/docs/default-source/discontinued/pmx84-rs-232-control-manual.pdf?sfvrsn=9af2bc3e_6"
retrieved_at: 2026-04-30T04:32:56.764Z
last_checked_at: 2026-04-26T11:21:13.968Z
generated_at: 2026-04-26T11:21:13.968Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T11:21:13.968Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions matched verbatim; transport confirmed; comprehensive coverage of Advanced Computer Control, Control Button Emulation, and PMX-Link protocols."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Biamp Advantage PMX84 Control Spec

## Summary
The Biamp Advantage PMX84 is an 8×4 programmable audio matrix switch with RS-232 serial control. It supports three control methods: Control Button Emulation (one-way ASCII), PMX-Link (one-way binary), and Advanced Computer Control (two-way pseudo-hex commands). Advanced commands allow querying and setting matrix routing, logic output states, button/macro definitions, and firmware version.

<!-- UNRESOLVED: no power on/off commands documented -->
<!-- UNRESOLVED: no TCP/IP or network interface documented -->
<!-- UNRESOLVED: no firmware version compatibility range stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 2400  # factory default; 9600 possible via internal jumper
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: echo  # wait for each character echo before sending next
addressing:
  # UNRESOLVED: no network addressing applicable; serial connection only
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable    # 8×4 matrix assignment switch commands present
- queryable   # get-matrix-status, get-logic-status, get-version, get-button-definition, get-macro-definition commands present
```

## Actions
```yaml
# === Advanced Computer Control Commands ===
# All commands use pseudo-hex encoding: nibbles '0'-'9' and ':'-'?'
# Format: <params> 08 <device_number_bitmask> <command_char>
# 08 = PMX84 device type bitmask (bit 3)
# Responses terminated with CR (0x0D)

- id: do_macro
  label: Do Macro
  kind: action
  description: Look up and perform the actions for the specified button macro
  params:
    - name: macro_number
      type: integer
      description: Macro number (0-49), value transmitted as macro_number + 128 in pseudo-hex
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{macro_number_pseudohex}08{device_mask}!"

- id: get_macro_definition
  label: Get Macro Definition
  kind: query
  description: Retrieve the definition of the specified button macro (12-byte macro data structure)
  params:
    - name: macro_number
      type: integer
      description: Macro number (0-49) in pseudo-hex
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{macro_number_pseudohex}08{device_mask}!"
  response: 24 pseudo-hex nibbles (Button Macro Data Structure) + CR

- id: define_macro
  label: Define Macro
  kind: action
  description: Store a new button macro definition for the specified macro number
  params:
    - name: macro_data
      type: string
      description: 24 pseudo-hex nibbles (12-byte Button Macro Data Structure)
    - name: macro_number
      type: integer
      description: Macro number (0-49) in pseudo-hex
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{macro_data}{macro_number_pseudohex}08{device_mask}\""

- id: virtual_macro
  label: Virtual Macro
  kind: action
  description: Immediately perform macro actions without storing in non-volatile memory
  params:
    - name: macro_data
      type: string
      description: 24 pseudo-hex nibbles (12-byte Button Macro Data Structure)
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{macro_data}8008{device_mask}\""

- id: do_button
  label: Do Button
  kind: action
  description: Look up and perform the button definition for the specified serial key code
  params:
    - name: serial_key_code
      type: integer
      description: Button serial key code (0-199) in pseudo-hex
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{serial_key_code}?>08{device_mask}#"

- id: get_button_definition
  label: Get Button Definition
  kind: query
  description: Retrieve the button definition for the specified serial key code
  params:
    - name: serial_key_code
      type: integer
      description: Button serial key code (0-199) in pseudo-hex
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{serial_key_code}08{device_mask}#"
  response: 4 pseudo-hex nibbles (Button Definition Data Structure) + CR

- id: define_button
  label: Define Button
  kind: action
  description: Store a new button definition for the specified serial key code
  params:
    - name: button_data
      type: string
      description: 4 pseudo-hex nibbles (Button Definition Data Structure)
    - name: serial_key_code
      type: integer
      description: Button serial key code (0-199) in pseudo-hex
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{button_data}{serial_key_code}08{device_mask}$"

- id: set_matrix_status
  label: Set Matrix Status
  kind: action
  description: Set the on/off status of all 32 matrix assignment switches (8 inputs × 4 outputs)
  params:
    - name: matrix_data
      type: string
      description: 8 pseudo-hex nibbles (4-byte Matrix Status Data Structure)
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{matrix_data}08{device_mask}&"

- id: do_matrix_action
  label: Do Matrix Action
  kind: action
  description: Perform an action (NOP/off/on/toggle) on a single matrix assignment switch
  params:
    - name: action_code
      type: integer
      description: "00=NOP, 01=turn off, 02=turn on, 03=toggle (pseudo-hex)"
    - name: switch_number
      type: integer
      description: "Assignment switch number (pseudo-hex). 00=in1→out1, 01=in1→out2, ... 1?=in8→out4"
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{action_code}{switch_number}08{device_mask}'"

- id: set_logic_status
  label: Set Logic Status
  kind: action
  description: Set the on/off status of all 16 logic outputs
  params:
    - name: logic_data
      type: string
      description: 4 pseudo-hex nibbles (2-byte Logic Status Data Structure)
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{logic_data}08{device_mask})"

- id: do_logic_action
  label: Do Logic Action
  kind: action
  description: Perform an action (NOP/off/on/toggle) on a single logic output
  params:
    - name: action_code
      type: integer
      description: "00=NOP, 01=turn off, 02=turn on, 03=toggle (pseudo-hex)"
    - name: logic_output
      type: integer
      description: "Logic output number (pseudo-hex). 00=output 1, ... 0?=output 16"
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{action_code}{logic_output}08{device_mask}*"

- id: sleep_10_seconds
  label: Sleep for 10 Seconds
  kind: action
  description: Cause the PMX84 to ignore all serial data for 10 seconds (for modem hang-up)
  params:
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "08{device_mask}+"

- id: read_memory
  label: Read Memory
  kind: query
  description: Read one or more locations from non-volatile configuration memory (4 banks × 256 bytes)
  params:
    - name: bank
      type: integer
      description: "Memory bank (00=bank 0, 01=bank 1, 02=bank 2, 03=bank 3) pseudo-hex"
    - name: end_address
      type: integer
      description: Ending memory address (pseudo-hex)
    - name: start_address
      type: integer
      description: Starting memory address (pseudo-hex)
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{bank}{end_address}{start_address}08{device_mask},"
  response: up to 256 data values (pseudo-hex, reversed order) + CR

- id: write_memory
  label: Write Memory
  kind: action
  description: Store up to 16 data values in non-volatile configuration memory
  params:
    - name: data_values
      type: string
      description: Up to 16 data values (pseudo-hex, highest address first)
    - name: start_address
      type: integer
      description: Starting (lowest) memory address (pseudo-hex)
    - name: options
      type: integer
      description: "Options & byte count (pseudo-hex). Bits 3-0: count-1. Bits 6-5: bank. Bit 7: activate config."
    - name: checksum
      type: integer
      description: 1's complement of 8-bit sum of data + address + options (pseudo-hex)
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "{data_values}{start_address}{options}{checksum}08{device_mask}-"

- id: set_factory_defaults
  label: Set Factory Defaults
  kind: action
  description: Reset configuration to factory defaults
  params:
    - name: options
      type: integer
      description: "Bit 0=button defs, bit 1=macro defs, bit 2=global config, bit 7=activate now (pseudo-hex)"
    - name: device_mask
      type: integer
      description: Device Number Bitmask (pseudo-hex)
  command_format: "<>{options}08{device_mask}."

# === Control Button Emulation ===
- id: control_button_emulation
  label: Control Button Emulation
  kind: action
  description: "Send a single ASCII character to emulate a remote control button on remote port 1. Buttons 1-40 map to ASCII chars 'B'-'`' (0x42-0x60) and 'b'-'j' (0x62-0x6A)."
  params:
    - name: button_number
      type: integer
      description: Button number 1-40

- id: device_select_prefix
  label: Device Select Prefix
  kind: action
  description: "Send a device select prefix before a button emulation character to address devices 1-4 individually or in combination. Prefix chars 'l'-'z' (0x6C-0x7A)."
  params:
    - name: device_selection
      type: string
      description: "Device selection bitmask (e.g. 'l'=device 1, 'm'=device 2, 'z'=all 1-4)"
- id: pmx_link_serial_key_code
  label: PMX-Link Serial Key Code
  kind: action
  description: "Emulate any of the 200 PMX84 button events by transmitting the corresponding 8-bit serial key code to the PMX-Link port."
  params:
    - name: serial_key_code
      type: integer
      description: "8-bit serial key code (0x00-0xC7). 0x00-0x27=Remote 1 buttons 1-40; 0x28-0x4F=Remote 2; 0x50-0x77=Remote 3; 0x78-0x9F=Remote 4; 0xA0-0xBF=Logic input contact events; 0xC0-0xC6=Group all-opened; 0xC7=Power-up/Reset."

- id: control_button_repeat
  label: Control Button Emulation Repeat Code
  kind: action
  description: "Transmit the ASCII '@' character (0x40) to repeat the most recently emulated remote control button."
  command_format: "@"
```

## Feedbacks
```yaml
- id: matrix_status
  type: binary
  description: On/off status of all 32 matrix assignment switches (8 inputs × 4 outputs)
  query_command: "08{device_mask}%"
  response_format: 8 pseudo-hex nibbles (4-byte Matrix Status Data Structure) + CR
  structure: |
    matrix[3]: in8→out4, in8→out3, in8→out2, in8→out1, in7→out4, in7→out3, in7→out2, in7→out1
    matrix[2]: in6→out4, in6→out3, in6→out2, in6→out1, in5→out4, in5→out3, in5→out2, in5→out1
    matrix[1]: in4→out4, in4→out3, in4→out2, in4→out1, in3→out4, in3→out3, in3→out2, in3→out1
    matrix[0]: in2→out4, in2→out3, in2→out2, in2→out1, in1→out4, in1→out3, in1→out2, in1→out1

- id: logic_status
  type: binary
  description: On/off status of all 16 open-collector logic outputs
  query_command: "08{device_mask}("
  response_format: 4 pseudo-hex nibbles (2-byte Logic Status Data Structure) + CR
  structure: |
    logic[1]: outputs 16-9 (bit 7=16, bit 0=9)
    logic[0]: outputs 8-1 (bit 7=8, bit 0=1)

- id: version
  type: string
  description: Model identification and firmware version date
  query_command: "08{device_mask}/"
  response_format: "02 mm:dd:yy" + CR (decimal digits, colon-separated)

- id: macro_definition
  type: binary
  description: Button macro definition (12-byte data structure with matrix and logic action codes)
  query_command: "{macro_number}08{device_mask}!"
  response_format: 24 pseudo-hex nibbles + CR

- id: button_definition
  type: binary
  description: Button definition (echo character + macro assignment)
  query_command: "{serial_key_code}08{device_mask}#"
  response_format: 4 pseudo-hex nibbles + CR
  structure: |
    byte[1]: echo character (0x00 = no echo)
    byte[0]: macro number assignment (0xFF = NOP, no macro assigned)
```

## Variables
```yaml
# UNRESOLVED: no continuous variable controls (volume, gain, etc.) documented in source
```

## Events
```yaml
# The PMX84 echoes every received character back to the computer, but does not
# send unsolicited notifications. All feedback requires explicit query commands.
```

## Macros
```yaml
- id: pmx84_button_macro
  description: |
    The PMX84 supports 50 button macros (0-49). Each macro is a 12-byte structure:
    - 8 bytes for 32 matrix assignment switch actions (2 bits each: 00=NOP, 01=off, 10=on, 11=toggle)
    - 4 bytes for 16 logic output actions (2 bits each: same action codes)
    Macros are assigned to button events via button definitions. A single macro can be
    assigned to multiple buttons.
  storage: non-volatile memory, banks 1-3
```

## Safety
```yaml
confirmation_required_for:
  - set_factory_defaults
  - write_memory
interlocks: []
notes: |
  The sleep-for-10-seconds command causes the device to ignore ALL serial data for 10 seconds.
  The set-factory-defaults command uses dummy prefix characters '<' and '>' to prevent accidental activation.
  The write-memory command includes a checksum (1's complement of 8-bit sum) to ensure data integrity.
```

## Notes
- The PMX84 uses a proprietary **pseudo-hex** encoding instead of standard ASCII-hex: nibbles are represented as '0'-'9' (0x30-0x39) and ':'-'?' (0x3A-0x3F). To convert a binary nibble to pseudo-hex, add 0x30.
- The device type bitmask for PMX84 is **0x08** (bit 3). Up to 8 PMX84s can share a serial bus, each with a unique device number (1-8) selected via the device number bitmask.
- The single-character input buffer requires **echo-based flow control**: wait for each character's echo before sending the next character.
- Control Button Emulation and PMX-Link are **one-way only** (no status queries). Advanced Computer Control is required for two-way communication.
- The PMX-Link operates at 2400 bps fixed, with a maximum average rate of ~20 characters/second and an 8-byte input buffer.
- Spaces, tabs, CR, LF, and other control characters can be sent at any time (even between pseudo-hex nibbles) with no effect — the PMX84 echoes and ignores them.
- The matrix has 8 audio inputs × 4 audio outputs = 32 assignable crosspoints.
- 16 open-collector logic outputs can be independently controlled.
- 200 button events are supported (40 buttons × 4 remote ports + 16 logic inputs × 2 states + 7 group events + power-up/reset).

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: no power on/off commands documented -->
<!-- UNRESOLVED: exact physical connector pinout not documented in this source -->
<!-- UNRESOLVED: PMX-Link port pinout and wiring not documented in this source -->
<!-- UNRESOLVED: global configuration parameter addresses and meanings not fully documented -->

## Provenance

```yaml
source_domains:
  - downloads.biamp.com
source_urls:
  - "https://downloads.biamp.com/assets/docs/default-source/discontinued/pmx84-rs-232-control-manual.pdf?sfvrsn=9af2bc3e_6"
retrieved_at: 2026-04-30T04:32:56.764Z
last_checked_at: 2026-04-26T11:21:13.968Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T11:21:13.968Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions matched verbatim; transport confirmed; comprehensive coverage of Advanced Computer Control, Control Button Emulation, and PMX-Link protocols."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
