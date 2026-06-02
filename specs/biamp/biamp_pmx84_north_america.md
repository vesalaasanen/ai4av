---
spec_id: admin/biamp-pmx84-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Biamp Advantage PMX84 (North America) Control Spec"
manufacturer: Biamp
model_family: PMX84
aliases: []
compatible_with:
  manufacturers:
    - Biamp
  models:
    - PMX84
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - downloads.biamp.com
source_urls:
  - "https://downloads.biamp.com/assets/docs/default-source/discontinued/pmx84-rs-232-control-manual.pdf?sfvrsn=9af2bc3e_6"
retrieved_at: 2026-04-30T04:32:56.764Z
last_checked_at: 2026-06-02T17:21:43.680Z
generated_at: 2026-06-02T17:21:43.680Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range; voltage/current ratings; pinout of RS-232 DB connector"
  - "The PMX84 supports 50 user-programmable button macros (macro 0..49) executed via"
  - "firmware version compatibility range; PMX-Link electrical/pinout details; DB-9 or DB-25 connector pinout for the RS-232 port; power consumption / voltage specs; physical button labels that correspond to ASCII codes 'B'..'j' (source only gives numeric button IDs)."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:43.680Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 74 spec actions have literal command-character matches in the source; transport parameters confirmed verbatim; source catalogue is fully covered. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Biamp Advantage PMX84 (North America) Control Spec

## Summary
The Biamp Advantage PMX84 is a programmable 8x4 audio matrix switch with a built-in RS-232 serial interface for computer control. This spec covers three control methods over the serial port: Control Button Emulation (one-way ASCII characters that emulate remote buttons), the PMX-Link expansion port (one-way 8-bit serial key codes emulating 200 button events), and Advanced Computer Control (two-way pseudo-hex command protocol with full read/write access to the 32 matrix switches, 16 logic outputs, 50 button macros, and 1024 bytes of non-volatile configuration memory). Default serial parameters are 2400 baud, 8 data bits, no parity, 1 stop bit; 9600 baud is also supported via an internal jumper.

<!-- UNRESOLVED: firmware version compatibility range; voltage/current ratings; pinout of RS-232 DB connector -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 2400  # factory default; 9600 also supported via internal jumper strap
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # no hardware (DTR/RTS) or XON/XOFF handshaking; use character-echo flow control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from matrix assignment switch commands (set-matrix-status, do-matrix-action, virtual-macro)
- queryable  # inferred from query commands (get-matrix-status, get-logic-status, get-button-definition, get-macro-definition, get-version, read-memory)
```

## Actions
```yaml
# --- Control Button Emulation: 40 remote-1 buttons (one-way) ---
- id: button_emulation_01
  label: Button Emulation 1 (Remote 1)
  kind: action
  command: "B"  # ASCII 'B' (0x42); emulates button 1 of remote port 1
  params: []

- id: button_emulation_02
  label: Button Emulation 2 (Remote 1)
  kind: action
  command: "C"  # ASCII 'C' (0x43)
  params: []

- id: button_emulation_03
  label: Button Emulation 3 (Remote 1)
  kind: action
  command: "D"  # ASCII 'D' (0x44)
  params: []

- id: button_emulation_04
  label: Button Emulation 4 (Remote 1)
  kind: action
  command: "E"  # ASCII 'E' (0x45)
  params: []

- id: button_emulation_05
  label: Button Emulation 5 (Remote 1)
  kind: action
  command: "F"  # ASCII 'F' (0x46)
  params: []

- id: button_emulation_06
  label: Button Emulation 6 (Remote 1)
  kind: action
  command: "G"  # ASCII 'G' (0x47)
  params: []

- id: button_emulation_07
  label: Button Emulation 7 (Remote 1)
  kind: action
  command: "H"  # ASCII 'H' (0x48)
  params: []

- id: button_emulation_08
  label: Button Emulation 8 (Remote 1)
  kind: action
  command: "I"  # ASCII 'I' (0x49)
  params: []

- id: button_emulation_09
  label: Button Emulation 9 (Remote 1)
  kind: action
  command: "J"  # ASCII 'J' (0x4A)
  params: []

- id: button_emulation_10
  label: Button Emulation 10 (Remote 1)
  kind: action
  command: "K"  # ASCII 'K' (0x4B)
  params: []

- id: button_emulation_11
  label: Button Emulation 11 (Remote 1)
  kind: action
  command: "L"  # ASCII 'L' (0x4C)
  params: []

- id: button_emulation_12
  label: Button Emulation 12 (Remote 1)
  kind: action
  command: "M"  # ASCII 'M' (0x4D)
  params: []

- id: button_emulation_13
  label: Button Emulation 13 (Remote 1)
  kind: action
  command: "N"  # ASCII 'N' (0x4E)
  params: []

- id: button_emulation_14
  label: Button Emulation 14 (Remote 1)
  kind: action
  command: "O"  # ASCII 'O' (0x4F)
  params: []

- id: button_emulation_15
  label: Button Emulation 15 (Remote 1)
  kind: action
  command: "P"  # ASCII 'P' (0x50)
  params: []

- id: button_emulation_16
  label: Button Emulation 16 (Remote 1)
  kind: action
  command: "Q"  # ASCII 'Q' (0x51)
  params: []

- id: button_emulation_17
  label: Button Emulation 17 (Remote 1)
  kind: action
  command: "R"  # ASCII 'R' (0x52)
  params: []

- id: button_emulation_18
  label: Button Emulation 18 (Remote 1)
  kind: action
  command: "S"  # ASCII 'S' (0x53)
  params: []

- id: button_emulation_19
  label: Button Emulation 19 (Remote 1)
  kind: action
  command: "T"  # ASCII 'T' (0x54)
  params: []

- id: button_emulation_20
  label: Button Emulation 20 (Remote 1)
  kind: action
  command: "U"  # ASCII 'U' (0x55)
  params: []

- id: button_emulation_21
  label: Button Emulation 21 (Remote 1)
  kind: action
  command: "V"  # ASCII 'V' (0x56)
  params: []

- id: button_emulation_22
  label: Button Emulation 22 (Remote 1)
  kind: action
  command: "W"  # ASCII 'W' (0x57)
  params: []

- id: button_emulation_23
  label: Button Emulation 23 (Remote 1)
  kind: action
  command: "X"  # ASCII 'X' (0x58)
  params: []

- id: button_emulation_24
  label: Button Emulation 24 (Remote 1)
  kind: action
  command: "Y"  # ASCII 'Y' (0x59)
  params: []

- id: button_emulation_25
  label: Button Emulation 25 (Remote 1)
  kind: action
  command: "Z"  # ASCII 'Z' (0x5A)
  params: []

- id: button_emulation_26
  label: Button Emulation 26 (Remote 1)
  kind: action
  command: "["  # ASCII '[' (0x5B)
  params: []

- id: button_emulation_27
  label: Button Emulation 27 (Remote 1)
  kind: action
  command: "\\"  # ASCII '\' (0x5C)
  params: []

- id: button_emulation_28
  label: Button Emulation 28 (Remote 1)
  kind: action
  command: "]"  # ASCII ']' (0x5D)
  params: []

- id: button_emulation_29
  label: Button Emulation 29 (Remote 1)
  kind: action
  command: "^"  # ASCII '^' (0x5E)
  params: []

- id: button_emulation_30
  label: Button Emulation 30 (Remote 1)
  kind: action
  command: "_"  # ASCII '_' (0x5F)
  params: []

- id: button_emulation_31
  label: Button Emulation 31 (Remote 1)
  kind: action
  command: "`"  # ASCII '`' (0x60)
  params: []

- id: button_emulation_32
  label: Button Emulation 32 (Remote 1)
  kind: action
  command: "b"  # ASCII 'b' (0x62)
  params: []

- id: button_emulation_33
  label: Button Emulation 33 (Remote 1)
  kind: action
  command: "c"  # ASCII 'c' (0x63)
  params: []

- id: button_emulation_34
  label: Button Emulation 34 (Remote 1)
  kind: action
  command: "d"  # ASCII 'd' (0x64)
  params: []

- id: button_emulation_35
  label: Button Emulation 35 (Remote 1)
  kind: action
  command: "e"  # ASCII 'e' (0x65)
  params: []

- id: button_emulation_36
  label: Button Emulation 36 (Remote 1)
  kind: action
  command: "f"  # ASCII 'f' (0x66)
  params: []

- id: button_emulation_37
  label: Button Emulation 37 (Remote 1)
  kind: action
  command: "g"  # ASCII 'g' (0x67)
  params: []

- id: button_emulation_38
  label: Button Emulation 38 (Remote 1)
  kind: action
  command: "h"  # ASCII 'h' (0x68)
  params: []

- id: button_emulation_39
  label: Button Emulation 39 (Remote 1)
  kind: action
  command: "i"  # ASCII 'i' (0x69)
  params: []

- id: button_emulation_40
  label: Button Emulation 40 (Remote 1)
  kind: action
  command: "j"  # ASCII 'j' (0x6A)
  params: []

- id: button_emulation_repeat
  label: Control Button Repeat Code
  kind: action
  command: "@"  # ASCII '@' (0x40); repeat last button code; do NOT prefix with device-select
  params: []

# --- Device Select Prefix Codes (4-device addressing, Control Button Emulation) ---
- id: select_device_1
  label: Select Device 1
  kind: action
  command: "l"  # ASCII 'l' (0x6C); prefix immediately before next button code
  params: []

- id: select_device_2
  label: Select Device 2
  kind: action
  command: "m"  # ASCII 'm' (0x6D)
  params: []

- id: select_devices_1_2
  label: Select Devices 1 & 2
  kind: action
  command: "n"  # ASCII 'n' (0x6E)
  params: []

- id: select_device_3
  label: Select Device 3
  kind: action
  command: "o"  # ASCII 'o' (0x6F)
  params: []

- id: select_devices_1_3
  label: Select Devices 1 & 3
  kind: action
  command: "p"  # ASCII 'p' (0x70)
  params: []

- id: select_devices_2_3
  label: Select Devices 2 & 3
  kind: action
  command: "q"  # ASCII 'q' (0x71)
  params: []

- id: select_devices_1_2_3
  label: Select Devices 1, 2 & 3
  kind: action
  command: "r"  # ASCII 'r' (0x72)
  params: []

- id: select_device_4
  label: Select Device 4
  kind: action
  command: "s"  # ASCII 's' (0x73)
  params: []

- id: select_devices_1_4
  label: Select Devices 1 & 4
  kind: action
  command: "t"  # ASCII 't' (0x74)
  params: []

- id: select_devices_2_4
  label: Select Devices 2 & 4
  kind: action
  command: "u"  # ASCII 'u' (0x75)
  params: []

- id: select_devices_1_2_4
  label: Select Devices 1, 2 & 4
  kind: action
  command: "v"  # ASCII 'v' (0x76)
  params: []

- id: select_devices_3_4
  label: Select Devices 3 & 4
  kind: action
  command: "w"  # ASCII 'w' (0x77)
  params: []

- id: select_devices_1_3_4
  label: Select Devices 1, 3 & 4
  kind: action
  command: "x"  # ASCII 'x' (0x78)
  params: []

- id: select_devices_2_3_4
  label: Select Devices 2, 3 & 4
  kind: action
  command: "y"  # ASCII 'y' (0x79)
  params: []

- id: select_devices_1_2_3_4
  label: Select Devices 1, 2, 3 & 4
  kind: action
  command: "z"  # ASCII 'z' (0x7A)
  params: []

# --- Advanced Computer Control ---
# Every advanced command is preceded by parameter nibbles and ends with command character.
# Format: [params...] 08 {dd} {cmd} where 08 = PMX84 device-type bitmask, dd = device-number bitmask.
# nn = macro/button number, aa = action code, mmmm.. = matrix/macro data, llll = logic data,
# kk = button serial key code, bbbb = button definition, ss/ee = memory addresses, oo = options, cc = checksum.

- id: do_macro
  label: Do Macro (perform stored macro actions)
  kind: action
  command: "{nn}08{dd}!"  # example: 950820!  -> macro 21 (0x15+128=0x95), device 6
  params:
    - name: nn
      type: pseudo-hex byte
      description: Macro number + 128 (pseudo-hex); values 80..B1 select macros 0..49
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask (0x01..0xFF, one bit per device 1..8)

- id: get_macro_definition
  label: Get Macro Definition
  kind: query
  command: "{nn}08{dd}!"  # example: 1;0801!  -> macro 0x1B from device 1
  params:
    - name: nn
      type: pseudo-hex byte
      description: Macro number 0..49 (pseudo-hex, no +128 offset)
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: define_macro
  label: Define Macro (store new macro definition)
  kind: action
  command: "{mmmmmmmmmmmmmmmmmmmmmmmm}{nn}08{dd}\""  # example: 000000020000000000000002030801"
  params:
    - name: mmmmmmmmmmmmmmmmmmmmmmmm
      type: pseudo-hex
      description: Button Macro Data Structure (24 nibbles = 12 bytes; 8 bytes matrix actions + 4 bytes logic actions; each 2-bit field is NOP/turn-off/turn-on/toggle)
    - name: nn
      type: pseudo-hex byte
      description: Macro number 0..49
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: virtual_macro
  label: Virtual Macro (perform inline macro actions, not stored)
  kind: action
  command: "{mmmmmmmmmmmmmmmmmmmmmmmm}8008{dd}\""  # example: 000000020000000000000002800801"
  params:
    - name: mmmmmmmmmmmmmmmmmmmmmmmm
      type: pseudo-hex
      description: Button Macro Data Structure (24 nibbles)
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: do_button
  label: Do Button (perform actions for button's assigned macro)
  kind: action
  command: "{kk}?>08{dd}#"  # example: 32?>080?#  -> serial key 0x32, all 4 devices; do NOT use prefix codes
  params:
    - name: kk
      type: pseudo-hex byte
      description: Button serial key code 0x00..0xC7 (button events 0..199)
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: get_button_definition
  label: Get Button Definition
  kind: query
  command: "{kk}08{dd}#"  # example: 580801#  -> serial key 0x58, device 1
  params:
    - name: kk
      type: pseudo-hex byte
      description: Button serial key code 0x00..0xC7
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: define_button
  label: Define Button (set echo char + assign macro)
  kind: action
  command: "{bbbb}{kk}08{dd}$"  # example: 4213000801$  -> echo='B'(0x42), macro=0x13=19, button 0x00, device 1
  params:
    - name: bbbb
      type: pseudo-hex
      description: Button Definition Data Structure (4 nibbles = 2 bytes: high byte = echo char or 0x00 for none, low byte = macro number or 0xFF for NOP)
    - name: kk
      type: pseudo-hex byte
      description: Button serial key code 0..199
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: get_matrix_status
  label: Get Matrix Status (all 32 assignment switches)
  kind: query
  command: "08{dd}%"  # example: 0801%  -> device 1 returns 88442211
  params:
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: set_matrix_status
  label: Set Matrix Status (all 32 assignment switches)
  kind: action
  command: "{mmmmmmmm}08{dd}&"  # example: 000084210801&
  params:
    - name: mmmmmmmm
      type: pseudo-hex
      description: Matrix Status Data Structure (8 nibbles = 4 bytes); matrix[3] transmitted first. Bit layout: matrix[3]=sw8-4..8-1, matrix[2]=6-4..5-1, matrix[1]=4-4..3-1, matrix[0]=2-4..1-1
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: do_matrix_action
  label: Do Matrix Action (single switch: NOP/off/on/toggle)
  kind: action
  command: "{aa}{nn}08{dd}'"  # example: 020>0801'  -> action 'turn on' (0x02), switch in4->out3 (0x0E), device 1
  params:
    - name: aa
      type: pseudo-hex nibble
      description: Action code: 00=NOP, 01=turn off, 02=turn on, 03=toggle
    - name: nn
      type: pseudo-hex nibble
      description: Assignment switch number (pseudo-hex; see table - 0x00..0x1F = inputs 1..8 × outputs 1..4)
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: get_logic_status
  label: Get Logic Status (all 16 logic outputs)
  kind: query
  command: "08{dd}("  # example: 0801(  -> device 1 returns 0040
  params:
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: set_logic_status
  label: Set Logic Status (all 16 logic outputs)
  kind: action
  command: "{llll}08{dd})"  # example: 40030801)  -> outputs 1,2,15 on; logic[1] transmitted first
  params:
    - name: llll
      type: pseudo-hex
      description: Logic Status Data Structure (4 nibbles = 2 bytes); logic[1] transmitted first. Bit 0 of logic[0]=output 1; bit 7 of logic[1]=output 16
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: do_logic_action
  label: Do Logic Action (single output: NOP/off/on/toggle)
  kind: action
  command: "{aa}{nn}08{dd}*"  # example: 020<0801*  -> action 'turn on' (0x02), output 13 (0x0C), device 1
  params:
    - name: aa
      type: pseudo-hex nibble
      description: Action code: 00=NOP, 01=turn off, 02=turn on, 03=toggle
    - name: nn
      type: pseudo-hex nibble
      description: Logic output number 1..16 (pseudo-hex 0x00..0x0F)
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: sleep_for_10_seconds
  label: Sleep For 10 Seconds (ignore all serial)
  kind: action
  command: "{tt}{dd}+"  # example: ????+  -> all device types, all device numbers, sleep 10s
  params:
    - name: tt
      type: pseudo-hex byte
      description: Device Type Bitmask (use 08 for PMX84; ?? for all types)
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask (use ?? for all devices)

- id: read_memory
  label: Read Memory (non-volatile config memory)
  kind: query
  command: "{bb}{ee}{ss}08{dd},"  # example: 0006000801,  -> bank 0, addr 00..06, device 1
  params:
    - name: bb
      type: pseudo-hex nibble
      description: Memory bank select: 00=bank0, 01=bank1, 02=bank2, 03=bank3
    - name: ee
      type: pseudo-hex byte
      description: Ending memory address
    - name: ss
      type: pseudo-hex byte
      description: Starting memory address (must be <= ee)
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: write_memory
  label: Write Memory (non-volatile config memory, with checksum)
  kind: action
  command: "{xx..}{ss}{oo}{cc}08{dd}-"  # example: 0302010382740801-
  params:
    - name: xx..
      type: pseudo-hex
      description: Up to 16 data values (pseudo-hex); transmitted in reverse order (highest address first)
    - name: ss
      type: pseudo-hex byte
      description: Starting (lowest) memory address
    - name: oo
      type: pseudo-hex byte
      description: Options & byte count: bits 0..3 = (count-1), bits 5..6 = bank select (00..11), bit 7 = activate new config now
    - name: cc
      type: pseudo-hex byte
      description: Computed checksum = 1's complement of (8-bit sum of all data values + ss + oo); computed on raw 8-bit values before pseudo-hex conversion
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: set_factory_defaults
  label: Set Factory Defaults
  kind: action
  command: "<>{oo}08{dd}."  # example: <>84080?.  -> restore global config params, activate now, devices 1..4
  params:
    - name: oo
      type: pseudo-hex byte
      description: Option byte: bit0=set button-definition defaults, bit1=set button-macro defaults, bit2=set global-config defaults, bit7=activate new globals now
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask

- id: get_version
  label: Get Version (model id + firmware date)
  kind: query
  command: "08{dd}/"  # example: 0801/  -> device 1 returns "02 02:12:96"
  params:
    - name: dd
      type: pseudo-hex byte
      description: Device Number Bitmask
```

## Feedbacks
```yaml
- id: macro_definition
  type: string
  description: Response to get-macro-definition. 24 pseudo-hex nibbles (12 bytes) representing the Button Macro Data Structure; first 8 bytes = matrix switch actions, last 4 bytes = logic output actions. Terminated by ASCII CR (0x0D).

- id: button_definition
  type: string
  description: Response to get-button-definition. 4 pseudo-hex nibbles (2 bytes): high byte = echo character (0x00 = none), low byte = macro number (0xFF = NOP). Terminated by CR.

- id: matrix_status
  type: string
  description: Response to get-matrix-status. 8 pseudo-hex nibbles (4 bytes) for the 32 assignment switches; matrix[3] transmitted first. Terminated by CR.

- id: logic_status
  type: string
  description: Response to get-logic-status. 4 pseudo-hex nibbles (2 bytes) for the 16 logic outputs; logic[1] transmitted first. Terminated by CR.

- id: memory_contents
  type: string
  description: Response to read-memory. Up to 256 data values (pseudo-hex), sent in reverse order (highest address first). Terminated by CR.

- id: version_info
  type: string
  description: Response to get-version. Format: "02 mm:dd:yy" - literal ASCII "02" (model id 0x30 0x32), space (0x20), then decimal month, ':' separator, decimal day, ':' separator, decimal year. Terminated by CR. Example: "02 02:12:96".

- id: character_echo
  type: string
  description: All characters received on the standard RS-232 serial port are echoed back to the computer; this is the source's documented flow-control mechanism (wait-for-echo before next byte).
```

## Variables
```yaml
- name: matrix_switch
  description: One of 32 assignment switches (8 inputs x 4 outputs). Addressed by pseudo-hex 0x00..0x1F in do-matrix-action. Each bit in the 4-byte Matrix Status Data Structure represents one switch (1=on, 0=off).
  type: boolean
  count: 32

- name: logic_output
  description: One of 16 open-collector logic outputs. Addressed by pseudo-hex 0x00..0x0F in do-logic-action. Each bit in the 2-byte Logic Status Data Structure represents one output (1=on = low impedance, 0=off = high impedance).
  type: boolean
  count: 16

- name: button_definition
  description: Per-button event (200 events, serial key codes 0x00..0xC7). Holds one macro number (0..49, or 0xFF for NOP) and one optional echo character (or 0x00 for none). Stored in non-volatile memory banks 0 and 1.
  type: object
  count: 200

- name: button_macro
  description: User-defined macro (50 macros numbered 0..49). Each macro is 12 bytes: 8 bytes of matrix-switch actions (2 bits each: NOP/off/on/toggle) + 4 bytes of logic-output actions (2 bits each). Stored in non-volatile memory banks 1, 2, 3.
  type: object
  count: 50

- name: global_config_parameters
  description: 16 bytes (0x00..0x0F) at the start of memory bank 0. Retrieved and activated only on power-up, or after a write with bit 7 of the options byte set.
  type: object
  count: 16

- name: configuration_memory
  description: 1024 bytes of non-volatile memory, organized as 4 banks of 256 bytes each. Bank 0 = global config (0x00-0x0F) + button definitions 0..119 (0x10-0xFF). Bank 1 = button definitions 120..199 (0x00-0x9F) + macros 0..7 (0xA0-0xFF). Bank 2 = macros 8..28 (0x00-0xFB), 0xFC-0xFF unused. Bank 3 = macros 29..49 (0x00-0xFB), 0xFC-0xFF reserved.
  type: bytes
  count: 1024
```

## Events
```yaml
[]
# No unsolicited asynchronous notifications documented in source.
# The PMX84 transmits only in response to query commands and echoes all received characters.
```

## Macros
```yaml
# UNRESOLVED: The PMX84 supports 50 user-programmable button macros (macro 0..49) executed via
# the do-macro command. The source describes the macro data structure and storage layout but
# does not list any specific named macro sequences - macros are defined by the installer via
# define-macro / define-button / virtual-macro and their contents are application-specific.
```

## Safety
```yaml
[]
# No safety warnings, interlocks, or power-on sequencing requirements stated in source.
```

## Notes
- **Pseudo-hex notation (critical):** The PMX84 does NOT use standard ASCII-hex. Pseudo-hex uses ASCII `'0'..'9'` and `':', ';', '<', '=', '>', '?'` for nibble values 0..15. Convert by adding 0x30 to a 4-bit value: nibble 0 -> '0' (0x30), nibble 10 -> ':' (0x3A), nibble 15 -> '?' (0x3F). Lowercase 'a'..'f' are NOT used.
- **Device Type Bitmask:** For PMX84-only control, set the device-type bitmask to `08` (bit 3 = PMX84). Bits 0..7 correspond to DRC 4+4 (0x01), EQ28X (0x02), SPM522D (0x04), PMX84 (0x08), reserved (0x10/0x20/0x40/0x80).
- **Device Number Bitmask:** Bit n (0..7) corresponds to device number n+1. Use `01` for device 1, `FF` for all 8 devices.
- **Character echo as flow control:** Standard RS-232 port echoes every received byte; the host should wait for the echo before sending the next character (1-byte input buffer). The PMX-Link port has 8 bytes of buffer and does not echo; limit average rate to 20 chars/sec.
- **Sleep command caveat:** `+` (sleep-for-10-seconds) is also the Hayes `+++` modem escape; when controlling via auto-answer modem, issue this as the last command before hanging up so spurious hang-up garbage is ignored.
- **9600 baud:** Possible by moving an internal jumper strap; factory default is 2400.
- **Two control modes over same physical port:** Control Button Emulation and Advanced Computer Control both use the standard RS-232 port, but are distinct command dialects. PMX-Link is a separate (one-way) expansion port, also RS-232 voltage-compatible.
- **Get-version example decoded:** "02 02:12:96" -> model id "02", space, firmware release date Feb 12, 1996.
- **Checksum for write-memory:** Computed on raw 8-bit values BEFORE pseudo-hex conversion; algorithm = 1's complement of (sum mod 256) of all data bytes + starting address byte + options byte.

<!-- UNRESOLVED: firmware version compatibility range; PMX-Link electrical/pinout details; DB-9 or DB-25 connector pinout for the RS-232 port; power consumption / voltage specs; physical button labels that correspond to ASCII codes 'B'..'j' (source only gives numeric button IDs). -->

## Provenance

```yaml
source_domains:
  - downloads.biamp.com
source_urls:
  - "https://downloads.biamp.com/assets/docs/default-source/discontinued/pmx84-rs-232-control-manual.pdf?sfvrsn=9af2bc3e_6"
retrieved_at: 2026-04-30T04:32:56.764Z
last_checked_at: 2026-06-02T17:21:43.680Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:43.680Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 74 spec actions have literal command-character matches in the source; transport parameters confirmed verbatim; source catalogue is fully covered. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range; voltage/current ratings; pinout of RS-232 DB connector"
- "The PMX84 supports 50 user-programmable button macros (macro 0..49) executed via"
- "firmware version compatibility range; PMX-Link electrical/pinout details; DB-9 or DB-25 connector pinout for the RS-232 port; power consumption / voltage specs; physical button labels that correspond to ASCII codes 'B'..'j' (source only gives numeric button IDs)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
