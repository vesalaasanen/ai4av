---
spec_id: admin/extron-dmp-128
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DMP 128 Control Spec"
manufacturer: Extron
model_family: "DMP 128"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DMP 128"
    - "DMP 128 AT"
    - "DMP 128 C"
    - "DMP 128 C AT"
    - "DMP 128 C P"
    - "DMP 128 C P AT"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - manualmachine.com
  - manualshelf.com
  - manualsdir.com
source_urls:
  - https://www.extron.com/download/files/userman/DMP_128_68-2036-01_revF.pdf
  - https://manualmachine.com/extronelectronic/dmp128/1270492-user-manual/
  - https://www.manualshelf.com/manual/extron-electronic/dmp128/user-guide-english.html
  - https://www.manualsdir.com/manuals/311668/extron-electronics-dmp-128-user-guide.html
  - https://www.extron.com/product/dmp128
retrieved_at: 2026-06-15T20:28:03.911Z
last_checked_at: 2026-06-22T13:58:50.184Z
generated_at: 2026-06-22T13:58:50.184Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Power on/off commands are not documented in the source — the device appears to be always-on when powered; no SIS power command exists."
  - "Firmware version compatibility not stated in source."
  - "\"Set single digit interval\" telephone command appears in source but"
  - "full version range not bounded in source"
  - "source documents no named multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility range not stated in source."
  - "the \"Set single digit interval\" telephone command appears in the source but its ASCII command column was truncated in the refined excerpt."
  - "a \"Reset (clear) user password\" command is implied by symmetry with the administrator reset but its row was truncated in the refined excerpt."
  - "the View I/O mode / View I/O state commands share an identical ASCII opcode `X!}` in the source — the response field is the only differentiator. Real-world behavior of these two rows needs device verification."
verification:
  verdict: verified
  checked_at: 2026-06-22T13:58:50.184Z
  matched_actions: 111
  action_count: 111
  confidence: medium
  summary: "All 111 spec actions matched verbatim to source command table entries; mix-point address tables are parameter spaces, not separate commands; transport fully confirmed. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Extron DMP 128 Control Spec

## Summary
The Extron DMP 128 is an 8x12 Digital Matrix Processor (audio DSP mixer) with mic/line inputs and eight outputs, available in six variants (DMP 128, AT, C, C AT, C P, C P AT). Control is via Extron's Simple Instruction Set (SIS) over rear-panel RS-232, USB (front-panel mini-B), or Ethernet (Telnet on port 23 or web browser on port 80). SIS covers IP configuration, file handling, preset recall, audio level/mute control, mix-point routing, group masters, a PIN-protected configuration, and (on P models) a telephone/modem interface.

<!-- UNRESOLVED: Power on/off commands are not documented in the source — the device appears to be always-on when powered; no SIS power command exists. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->

## Transport
```yaml
# Source: DMP 128 User Guide, 68-2036-01, Rev. F, pp. 16-18, 44.
# RS-232 config: "38400 baud, no parity, 1 stop bit, 8 data bits, no flow control" (verbatim).
# TCP port: "using port 23" (verbatim). Web browser port 80 stated: "Port 80 is default for web browsers."
# Auth: optional password protection (admin/user). Factory password = device serial number.
#       "If the device is reset, the password reverts to the original password configuration, which is no password."
#       RS-232 connection is never password-protected: "Connection via any RS-232 port is not password-protected."
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 23        # Telnet default (TCP). Web browser default port 80 also stated.
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # optional; default after reset is "no password"
  notes: |
    Optional admin/user password. Factory password is the device serial number;
    case-sensitive. RS-232 connections are never password-protected. Telnet/Web
    connections are password-protected only if a password has been set.
```

## Traits
```yaml
# - queryable       (many query commands: Q, N, I, 1I..4I, E CI }, E CS }, E CG }, E DH },
#                     E CV }, E CT }, E CZ }, E CX }, E CN }, E TC }, E CP }, E CE },
#                     E CA }, E CU }, view verbose mode, view group fader, read mute, etc.)
# - levelable       (audio gain/trim/volume/group fader commands, 0.1 dB increments)
# - routable        (mix-point mute/unmute = signal routing between input and output)
traits:
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# All ASCII command strings are copied verbatim from the source Command and Response
# tables (DMP 128 User Guide pp. 44-53, 72-73). Notation:
#   ]   = CR/LF terminator
#   }   = soft carriage return (no line feed) - terminator used inside SIS commands
#   E   = Escape character (Hex 1B) - command prefix
#   Xn# = source-defined variable (see params on each action)
# The source presents commands in two equivalent forms (Telnet and web/URL-encoded);
# the forms below are the Telnet/serial ASCII forms.
#
# Mix-point address tables (Tables 3-10, pp. 77-98) and the audio dB→SIS conversion
# table (Table 2, pp. 57-60) are parameter value spaces for the G/M opcodes below,
# NOT separate commands - they are documented in the corresponding action's params/notes.

# ---------- Information Requests ----------
- id: query_firmware_version
  label: Firmware Version
  kind: query
  command: "Q"
  params: []
  notes: Response is "X(]" where X( = firmware version x.xx.

- id: query_firmware_and_build_version
  label: Firmware and Build Version
  kind: query
  command: "*Q"
  params: []
  notes: Adds four-digit build number (x.xx.xxxx).

- id: query_kernel_firmware_version
  label: Kernel Firmware and Build Version
  kind: query
  command: "**Q"
  params: []

- id: query_verbose_version_info
  label: Verbose Version Info
  kind: query
  command: "0Q"
  params: []
  notes: Response is "Sum of 2Q-3Q-4Q]".

- id: query_firmware_version_1
  label: Firmware Version (slot 1)
  kind: query
  command: "1Q"
  params: []

- id: query_bootstrap_version
  label: Bootstrap Version
  kind: query
  command: "2Q"
  params: []

- id: query_factory_firmware_version
  label: Factory Firmware Version
  kind: query
  command: "3Q"
  params: []
  notes: "Response: X( plus Web ver.-desc-UL date/time]"

- id: query_updated_firmware_version
  label: Updated Firmware Version
  kind: query
  command: "4Q"
  params: []
  notes: "Response: X( plus Web ver.-desc-UL date/time]"

- id: view_part_number
  label: View Part Number
  kind: query
  command: "N"
  params: []
  notes: |
    Response is the device part number, e.g. "DMP 128: 60-1211-01", "DMP 128 AT:
    60-1211-10", "DMP 128 C: 60-1178-01", "DMP 128 C AT: 60-1178-10",
    "DMP 128 C P: 60-1179-01", "DMP 128 C P AT: 60-1179-10".

- id: view_model_name
  label: View Model Name
  kind: query
  command: "I"
  params: []
  notes: "Response: V00x00 • A12x08]"

- id: view_model_name_1
  label: View Model Name (long form)
  kind: query
  command: "1I"
  params: []
  notes: |
    Response is one of "DMP • 128 •]", "DMP • 128 • AT]", "DMP • 128 • C]",
    "DMP • 128 • C • AT]", "DMP • 128 • C • P]", "DMP • 128 • C • P • AT]".

- id: view_model_description
  label: View Model Description
  kind: query
  command: "2I"
  params: []
  notes: "Response: Digital • Matrix • Processor]"

- id: view_system_memory_usage
  label: View System Memory Usage
  kind: query
  command: "3I"
  params: []
  notes: "Response: #Bytes used out of #KBytes]"

- id: view_user_memory_usage
  label: View User-Memory Usage
  kind: query
  command: "4I"
  params: []
  notes: "Response: #Bytes used out of #KBytes]"

# ---------- IP Setup Commands ----------
- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "E X1@ CN }"
  params:
    - name: name
      source_symbol: X1@
      type: string
      description: "Alphanumeric up to 24 characters. No special characters except hyphen (-)."

- id: view_unit_name
  label: View Unit Name
  kind: query
  command: "E CN }"
  params: []

- id: reset_unit_name_to_factory
  label: Set Unit Name to Factory Default
  kind: action
  command: "E• CN }"
  params: []
  notes: "Sets the unit name to the default: combination of model name + last three pairs of MAC address."

- id: set_time_and_date
  label: Set Time and Date
  kind: action
  command: "E X1# CT }"
  params:
    - name: time_date
      source_symbol: X1#
      type: string
      description: Time and date string.

- id: view_time_and_date
  label: View Time and Date
  kind: query
  command: "E CT }"
  params: []

- id: set_gmt_offset
  label: Set GMT Offset
  kind: action
  command: "E X1^ CZ }"
  params:
    - name: offset
      source_symbol: X1^
      type: string
      description: "GMT offset (-12:00 to 14:00) as HH:MM."

- id: view_gmt_offset
  label: View GMT Offset
  kind: query
  command: "E CZ }"
  params: []

- id: set_daylight_savings_time
  label: Set Daylight Savings Time
  kind: action
  command: "E X3$ CX }"
  params:
    - name: dst_mode
      source_symbol: X3$
      type: integer
      description: "0=off/ignore; 1=USA; 2=Europe; 3=Brazil."

- id: read_daylight_savings_time
  label: Read Daylight Savings Time
  kind: query
  command: "E CX }"
  params: []

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "E X1$ CI }"
  params:
    - name: ip
      source_symbol: X1$
      type: string
      description: "IP address. Default 192.168.254.254."

- id: read_ip_address
  label: Read IP Address
  kind: query
  command: "E CI }"
  params: []

- id: read_hardware_address_mac
  label: Read Hardware Address (MAC)
  kind: query
  command: "E CH }"
  params: []
  notes: "Response X1* = 00-05-A6-xx-xx-xx."

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "E X1( CS }"
  params:
    - name: mask
      source_symbol: X1(
      type: string
      description: "Subnet mask. Default 255.255.0.0."

- id: read_subnet_mask
  label: Read Subnet Mask
  kind: query
  command: "E CS }"
  params: []

- id: set_gateway_ip_address
  label: Set Gateway IP Address
  kind: action
  command: "E X1$ CG }"
  params:
    - name: gateway
      source_symbol: X1$
      type: string
      description: Gateway IP address.

- id: view_gateway_ip_address
  label: View Gateway IP Address
  kind: query
  command: "E CG }"
  params: []

- id: set_dhcp_on
  label: Set DHCP On
  kind: action
  command: "E 1DH }"
  params: []
  notes: "Changing DHCP from On to Off resets IP to factory default 192.168.254.254."

- id: set_dhcp_off
  label: Set DHCP Off
  kind: action
  command: "E 0DH }"
  params: []
  notes: "Resets IP to factory default 192.168.254.254."

- id: view_dhcp_status
  label: View DHCP Status
  kind: query
  command: "E DH }"
  params: []
  notes: "Response X% = 0 (off) or 1 (on)."

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E X2@ CV }"
  params:
    - name: mode
      source_symbol: X2@
      type: integer
      description: "0=clear (default for IP); 1=verbose (default for serial/USB); 2=tagged responses; 3=verbose + tagged."

- id: view_verbose_mode
  label: View Verbose Mode
  kind: query
  command: "E CV }"
  params: []

# ---------- Password and Security Settings ----------
- id: set_administrator_password
  label: Set Administrator Password
  kind: action
  command: "E X3# CA }"
  params:
    - name: password
      source_symbol: X3#
      type: string
      description: Password string.

- id: view_administrator_password
  label: View Administrator Password
  kind: query
  command: "E CA }"
  params: []

- id: reset_administrator_password
  label: Reset (Clear) Administrator Password
  kind: action
  command: "E• CA }"
  params: []

- id: set_user_password
  label: Set User Password
  kind: action
  command: "E X3# CU }"
  params:
    - name: password
      source_symbol: X3#
      type: string
      description: Password string.

- id: view_user_password
  label: View User Password
  kind: query
  command: "E CU }"
  params: []

# ---------- Ethernet Data Port ----------
- id: set_current_port_timeout
  label: Set Current Port Timeout
  kind: action
  command: "E 0*X1% TC}"
  params:
    - name: timeout
      source_symbol: X1%
      type: integer
      description: "1 to 65000 steps, 1 step = 10 seconds, default = 30 (300 seconds)."

- id: view_current_port_timeout
  label: View Current Port Timeout
  kind: query
  command: "E 0TC}"
  params: []

- id: set_global_ip_port_timeout
  label: Set Global IP Port Timeout
  kind: action
  command: "E 1*X1% TC}"
  params:
    - name: timeout
      source_symbol: X1%
      type: integer
      description: "1 to 65000 steps, 1 step = 10 seconds, default = 30 (300 seconds)."

- id: view_global_ip_port_timeout
  label: View Global IP Port Timeout
  kind: query
  command: "E 1TC}"
  params: []

# ---------- File Commands ----------
- id: erase_user_web_page_file
  label: Erase User-Supplied Web Page File
  kind: action
  command: "E _filename_EF}"
  params:
    - name: filename
      type: string
      description: File name to erase.

- id: erase_current_directory
  label: Erase Current Directory
  kind: action
  command: "E/EF}"
  params: []

- id: erase_current_directory_and_subdirs
  label: Erase Current Directory and Sub-directories
  kind: action
  command: "E//EF}"
  params: []
  notes: Also deletes files inside the directory.

- id: list_files_current_directory
  label: List Files From Current Directory
  kind: query
  command: "EDF}"
  params: []

- id: list_files_current_directory_and_below
  label: List Files From Current Directory and Below
  kind: query
  command: "ELF}"
  params: []

# ---------- Serial Port ----------
- id: send_serial_data_string
  label: Send Data String (Serial Port 1)
  kind: action
  command: "E 1*X1&`*`X2)`*`X2! RS}"
  params:
    - name: command_string_wait_time
      source_symbol: X1&
      type: integer
      description: "0-32767 in tens of milliseconds."
    - name: character_wait_time
      source_symbol: X2)
      type: integer
      description: "0-32767 in tens of milliseconds."
    - name: length_or_delimiter
      source_symbol: X2!
      type: string
      description: "L=byte count (00-32767), D=decimal ASCII value (0-00255)."

- id: configure_serial_port_parameters
  label: Configure Serial Port Parameters
  kind: action
  command: "E 1*X2%,X2^,X2&,X2* CP}"
  params:
    - name: baud_rate
      source_symbol: X2%
      type: integer
      description: "300,600,1200,1800,2400,3600,4800,7200,9600,14400,19200,38400,57600,115200 (default 9600)."
    - name: parity
      source_symbol: X2^
      type: string
      description: "0=odd, E=even, N=none (default), M=mark, S=space."
    - name: data_bits
      source_symbol: X2&
      type: integer
      description: "7 or 8 (default 8)."
    - name: stop_bits
      source_symbol: X2*
      type: integer
      description: "1 or 2 (default 1)."

- id: view_serial_port_parameters
  label: View Serial Port Parameters
  kind: query
  command: "E 1CP}"
  params: []

- id: configure_serial_receive_timeout
  label: Configure Receive Timeout
  kind: action
  command: "E 1*X1&`*`X2)`*`X2#`*`X2! CE}"
  params:
    - name: command_string_wait_time
      source_symbol: X1&
      type: integer
    - name: character_wait_time
      source_symbol: X2)
      type: integer
    - name: priority_status
      source_symbol: X2#
      type: integer
      description: "0=Send data string command parameters if they exist (default); 1=Configure receive timeout command parameters."
    - name: length_or_delimiter
      source_symbol: X2!
      type: string

- id: view_serial_receive_timeout
  label: View Receive Timeout
  kind: query
  command: "E 1CE}"
  params: []

# ---------- Digital I/O Port ----------
- id: view_io_mode
  label: View I/O Mode
  kind: query
  command: "X!}"
  params: []
  notes: "Response X4) = 0 (input) or 1 (output)."

- id: view_io_state
  label: View I/O State
  kind: query
  command: "X!}"
  params: []
  notes: |
    Source lists this with the same ASCII opcode as "View I/O mode" but a
    different response field (X4# = 0 off / 1 on). Treat as a distinct query
    whose response shape differs from view_io_mode.

# ---------- Event Control ----------
- id: read_event_buffer_memory
  label: Read Event Buffer Memory
  kind: query
  command: "E X3% , X3^ , X3& , X3* E }"
  params:
    - name: event_number
      source_symbol: X3%
      type: integer
      description: "00 to 99."
    - name: event_buffer
      source_symbol: X3^
      type: integer
      description: "0=receive, 1=Unified, 2=data, 3=NVRAM."
    - name: buffer_offset
      source_symbol: X3&
      type: integer
    - name: data_size
      source_symbol: X3*
      type: string
      description: "b=bit, B=Byte (8-bit), S=short (16-bit), L=long (32-bit). Case sensitive."

- id: write_event_buffer_memory
  label: Write Event Buffer Memory
  kind: action
  command: "E X3% , X3^ , X3( , X3* E }"
  params:
    - name: event_number
      source_symbol: X3%
      type: integer
    - name: event_buffer
      source_symbol: X3^
      type: integer
    - name: event_data
      source_symbol: X3(
      type: integer
      description: Event data to write.
    - name: data_size
      source_symbol: X3*
      type: string

- id: read_string_from_event_buffer
  label: Read String From Event Buffer
  kind: query
  command: "E X3% , X3^ , X3& X4$ FE }"
  params:
    - name: event_number
      source_symbol: X3%
      type: integer
    - name: event_buffer
      source_symbol: X3^
      type: integer
    - name: buffer_offset
      source_symbol: X3&
      type: integer
    - name: bytes_to_read
      source_symbol: X4$
      type: integer
      description: "1 to 127."
  notes: "F must be capitalized."

- id: write_string_to_event_buffer
  label: Write String to Event Buffer
  kind: action
  command: "E { string }* X3% , X3^ , X3& FE }"
  params:
    - name: string
      type: string
    - name: event_number
      source_symbol: X3%
      type: integer
    - name: event_buffer
      source_symbol: X3^
      type: integer
    - name: buffer_offset
      source_symbol: X3&
      type: integer
  notes: "F must be capitalized."

- id: start_events
  label: Start Events
  kind: action
  command: "E  1AE  }"
  params: []
  notes: "Response Ego ]"

- id: stop_events
  label: Stop Events
  kind: action
  command: "E  0AE  }"
  params: []
  notes: "Response Est ]"

- id: view_number_of_running_events
  label: View Number of Running Events
  kind: query
  command: "E  AE  }"
  params: []
  notes: "Response ##### ] (5 digit number)."

# ---------- Presets, I/O Names ----------
- id: write_preset_name
  label: Write Preset Name
  kind: action
  command: "E X1) , X1! NG }"
  params:
    - name: preset_number
      source_symbol: X1)
      type: integer
      description: "Preset number (0 = current configuration; 32 maximum)."
    - name: name
      source_symbol: X1!
      type: string
      description: "Up to 12 characters."

- id: read_preset_name
  label: Read Preset Name
  kind: query
  command: "E X1) NG }"
  params:
    - name: preset_number
      source_symbol: X1)
      type: integer

- id: recall_preset
  label: Recall a Preset
  kind: action
  command: "X1) . Rpr"
  params:
    - name: preset_number
      source_symbol: X1)
      type: integer
  notes: "Command character is a period. Example: 5. recalls preset 5."

- id: write_input_name
  label: Write Input Name
  kind: action
  command: "E X# , X1! NI }"
  params:
    - name: input_number
      source_symbol: X#
      type: integer
      description: "01 to 12 (C P / C P AT: 01 to 13)."
    - name: name
      source_symbol: X1!
      type: string
      description: "Up to 12 characters."

- id: read_input_name
  label: Read Input Name
  kind: query
  command: "E X# NI }"
  params:
    - name: input_number
      source_symbol: X#
      type: integer

- id: write_output_name
  label: Write Output Name
  kind: action
  command: "E X@ , X1! NO }"
  params:
    - name: output_number
      source_symbol: X@
      type: integer
      description: "01 to 08 (C P / C P AT: 01 to 09)."
    - name: name
      source_symbol: X1!
      type: string
      description: "Up to 12 characters."

- id: read_output_name
  label: Read Output Name
  kind: query
  command: "E X@ NO }"
  params:
    - name: output_number
      source_symbol: X@
      type: integer

# ---------- Resets ----------
- id: reset_presets_and_names
  label: Reset Presets and Names
  kind: action
  command: "E ZG }"
  params: []
  notes: Clears all presets and their names.

- id: reset_individual_preset
  label: Reset an Individual Preset
  kind: action
  command: "E X1) ZG }"
  params:
    - name: preset_number
      source_symbol: X1)
      type: integer

- id: reset_group
  label: Reset a Group
  kind: action
  command: "E Z X6% GRPM }"
  params:
    - name: group_number
      source_symbol: X6%
      type: integer
      description: "01 to 32."
  notes: Deletes all members from group, resets parameters and soft limits.

- id: reset_flash
  label: Reset Flash
  kind: action
  command: "E ZFFF }"
  params: []
  notes: Erases user-supplied files.

- id: system_reset_factory_defaults
  label: System Reset (Factory Defaults)
  kind: action
  command: "E ZXXX }"
  params: []
  notes: Resets all processors, level controls and mixers to default.

- id: reset_all_device_settings
  label: Reset All Device Settings and Delete Files
  kind: action
  command: "E ZY }"
  params: []
  notes: |
    Excludes IP settings (IP address, subnet mask, gateway IP, unit name, DHCP
    setting, port mapping) to preserve communication. Recommended after a firmware update.

# ---------- DSP Audio Level Control (gain/trim/mute) ----------
# Applies to blocks A (mic/line input gain), B (pre-mixer gain), C (virtual return gain),
# D (post-mixer trim), E (output volume), and to all mix-points (output mix matrix,
# virtual send bus mix matrix, expansion output mix matrix). X6) selects the block/mix-point.
- id: set_trim_or_gain
  label: Set a Trim or Gain
  kind: action
  command: "E G X6) * X6! AU }"
  params:
    - name: control
      source_symbol: X6)
      type: integer
      description: |
        Gain/trim/mix-point address. See Table 1 (Level Control, p.55):
          A Mic/line input gain: 40000-40011, Telephone Rx 40012
          B Pre-mixer gain:     40100-40111, Telephone Rx 40112
          C Virtual return gain: 50000-50007
          D Post-mixer trim:    60100-60107
          E Output volume:      60000-60007, Telephone Tx 60008
        Mix-point addresses (Tables 3-10, pp.77-98): 20000-22024 for mic/line,
        virtual returns, EXP inputs to outputs; 20009-21216 etc. for virtual sends.
    - name: level_value
      source_symbol: X6!
      type: integer
      description: |
        SIS level value. Conversion: (desired dB x 10) + 2048.
        Valid ranges by block:
          A: -18.0 to +80.0 dB (1868 to 2848)
          B: -100.0 to +12.0 dB (1048 to 2168)
          C: -100.0 to +12.0 dB (1048 to 2168)
          D: -12.0 to +12.0 dB (1928 to 2168)
          E: -100.0 to +0.0 dB (1048 to 2048)
          Mix-points: -35.0 to +25.0 dB.
  notes: "Verbose response: DsG X6) * X6!]"

- id: read_trim_or_gain
  label: Read a Trim or Gain
  kind: query
  command: "E G X6) AU }"
  params:
    - name: control
      source_symbol: X6)
      type: integer
  notes: "Verbose response: DsG X6) * X6!]"

- id: audio_mute
  label: Audio Mute
  kind: action
  command: "E M X6) *1AU }"
  params:
    - name: control
      source_symbol: X6)
      type: integer
  notes: "Post-mixer trim cannot be muted. Verbose response: DsM X6) *1 ]"

- id: audio_unmute
  label: Audio Unmute
  kind: action
  command: "E M X6) *0AU }"
  params:
    - name: control
      source_symbol: X6)
      type: integer
  notes: "Verbose response: DsM X6) *0 ]"

- id: read_mute_status
  label: Read Mute Status
  kind: query
  command: "E M X6) AU }"
  params:
    - name: control
      source_symbol: X6)
      type: integer
  notes: "Verbose response: DsM X6) * X6$], X6$ = 0 (unmute) or 1 (mute)."

# ---------- Audio Group Master Commands ----------
- id: set_group_fader_control
  label: Set a Group Fader Control
  kind: action
  command: "E D X6% * X6^ GRPM }"
  params:
    - name: group_number
      source_symbol: X6%
      type: integer
      description: "01 to 32."
    - name: fader_value
      source_symbol: X6^
      type: integer
      description: |
        dB value x10 (negative numbers, no decimal). Valid range depends on group
        type: A -180..800, B/C -1000..120, D -120..120, E -1000..000.

- id: raise_group_fader
  label: Raise a Group Fader
  kind: action
  command: "E D X6% * X6& +GRPM }"
  params:
    - name: group_number
      source_symbol: X6%
      type: integer
    - name: increment
      source_symbol: X6&
      type: integer
      description: dB value x10 to raise.

- id: lower_group_fader
  label: Lower a Group Fader
  kind: action
  command: "E D X6% * X6& -GRPM }"
  params:
    - name: group_number
      source_symbol: X6%
      type: integer
    - name: decrement
      source_symbol: X6&
      type: integer
      description: dB value x10 to lower.

- id: view_group_fader_level
  label: View the Group Fader Control Level
  kind: query
  command: "E D X6% GRPM }"
  params:
    - name: group_number
      source_symbol: X6%
      type: integer
  notes: "In verbose modes 1 and 2 the response simplifies to X6^]."

- id: mute_group
  label: Mute a Group Mute Control
  kind: action
  command: "E D X6% *1GRPM }"
  params:
    - name: group_number
      source_symbol: X6%
      type: integer
  notes: "Mutes all blocks in the group. Response: GrpmD X6% *+00001 ]"

- id: unmute_group
  label: Clear (Unmute) a Group Mute Control
  kind: action
  command: "E D X6% *0GRPM }"
  params:
    - name: group_number
      source_symbol: X6%
      type: integer
  notes: "Unmutes all blocks in the group. Response: GrpmD X6% *+00000 ]"

- id: view_group_mute
  label: View a Group Mute Control
  kind: query
  command: "E D X6% GRPM }"
  params:
    - name: group_number
      source_symbol: X6%
      type: integer
  notes: "Same opcode as view_group_fader_level; X6$ is always a 5-digit value for group masters."

- id: set_group_soft_limits
  label: Set Soft Limits
  kind: action
  command: "E L X6% * X6* [upper] * X6* [lower] GRPM }"
  params:
    - name: group_number
      source_symbol: X6%
      type: integer
    - name: upper_limit
      source_symbol: X6*
      type: integer
      description: dB value x10.
    - name: lower_limit
      source_symbol: X6*
      type: integer
      description: dB value x10.

# ---------- Protected Configuration ----------
- id: save_protected_configuration
  label: Save the Protected Configuration
  kind: action
  command: "E  S X7)  PCFG }"
  params:
    - name: pin
      source_symbol: X7)
      type: string
      description: "Four numeric digits; default 0000."
  notes: "Saves all processing and levels (except IP address) to protected memory. Response: PcfgS ]"

- id: recall_protected_configuration
  label: Recall the Protected Configuration
  kind: action
  command: "E  RPCFG }"
  params: []
  notes: "Response: PcfgR ]"

- id: change_protected_configuration_pin
  label: Change the PIN
  kind: action
  command: "E  P X7) [old] * X7) [new] PCFG }"
  params:
    - name: old_pin
      source_symbol: X7)
      type: string
      description: "Four numeric digits."
    - name: new_pin
      source_symbol: X7)
      type: string
      description: "Four numeric digits."

- id: view_protected_configuration_status
  label: View Configuration Saved Status
  kind: query
  command: "E  QPCFG }"
  params: []
  notes: "Response X7! = 0 (none saved) or 1 (saved)."

# ---------- Telephone Commands (DMP 128 P models only; fw >= 1.05) ----------
- id: dial_number_string
  label: Dial Number String
  kind: action
  command: "E  D  X@, PHON }"
  params:
    - name: dtmf_string
      source_symbol: X@
      type: string
      description: "Numeric string: 0-9, *, #. No spaces."
  notes: "DMP 128 P models only. Requires firmware >= 1.05. Set verbose mode 3 for proper responses."

- id: phone_off_hook
  label: Off Hook
  kind: action
  command: "E  OFFHOOK, PHON }"
  params: []
  notes: Connects line. Response: PhonOffHook ]

- id: phone_on_hook
  label: On Hook
  kind: action
  command: "E  ONHOOK, PHON }"
  params: []
  notes: Disconnects line. Response: PhonOnHook ]

- id: phone_flash
  label: Flash
  kind: action
  command: "E  F, PHON }"
  params: []
  notes: "Response: PhonFlash ]"

- id: phone_state
  label: Phone State
  kind: query
  command: "E  O, PHON }"
  params: []
  notes: "Response: PhonSts X! ]"

- id: dial_single_digit
  label: Dial Single Digit
  kind: action
  command: "E  S  X# , PHON }"
  params:
    - name: digit
      source_symbol: X#
      type: string
      description: Single DTMF pulse.
  notes: "Response: PhonDialDigit ]"

- id: enable_auto_hangup
  label: Enable Auto Hang-up
  kind: action
  command: "E  AH  X$ , PHON }"
  params:
    - name: setting
      source_symbol: X$
      type: string

- id: view_auto_hangup_status
  label: View Auto Hang-up Status
  kind: query
  command: "E  AH, PHON }"
  params: []
  notes: "Response: PhonAH X$ ]"

# UNRESOLVED: "Set single digit interval" telephone command appears in source but
# its ASCII command column was truncated in the refined excerpt.
- id: reset_user_password
  label: Reset (Clear) User Password
  kind: action
  command: "E• CU }"
  params: []
  notes: "Clears the user password. Response: Ipu •]"

- id: view_session_security_level
  label: View Session Security Level
  kind: query
  command: "E CK }"
  params: []
  notes: "Response X5@ = 0 (anonymous), 11 (user), 12 (administrator)."

- id: view_soft_limits
  label: View Soft Limits
  kind: query
  command: "E L X6% GRPM }"
  params:
    - name: group_number
      source_symbol: X6%
      type: integer
      description: "01 to 32."
  notes: "Response: GrpmL X6% * X6* * X6* ]. In verbose modes 0 and 1, simplified to X6* X6*]."

- id: view_group_type
  label: View Group Type
  kind: query
  command: "E P X6% GRPM }"
  params:
    - name: group_number
      source_symbol: X6%
      type: integer
      description: "01 to 32."
  notes: "Response: GrpmP X6% * X6(]. X6( = 6 (gain) or 12 (mute). In verbose modes 0 and 1, simplified to X6(]."

- id: set_single_digit_gain
  label: Set Single Digit Gain
  kind: action
  command: "E  DG  X% ,PHON }"
  params:
    - name: gain
      source_symbol: X%
      type: integer
      description: "0 to 1000, default 0400 (4-digit response)."
  notes: "DMP 128 P models only. Response: PhonDG X% ]"

- id: view_single_digit_gain
  label: View Single Digit Gain
  kind: query
  command: "E  DG,PHON }"
  params: []
  notes: "DMP 128 P models only. Response: PhonDG X% ]"

- id: set_ring_gain
  label: Set Ring Gain
  kind: action
  command: "E  RG  X% ,PHON }"
  params:
    - name: gain
      source_symbol: X%
      type: integer
      description: "0 to 1000, default 0400 (4-digit response)."
  notes: "DMP 128 P models only. Response: PhonRG X% ]"

- id: view_ring_gain
  label: View Ring Gain
  kind: query
  command: "E  RG,PHON }"
  params: []
  notes: "DMP 128 P models only. Response: PhonRG X% ]"

- id: set_ring_tone
  label: Set Incoming Ring Tone
  kind: action
  command: "E  RT  X$ ,PHON }"
  params:
    - name: setting
      source_symbol: X$
      type: integer
      description: "0 = disable, 1 = enable."
  notes: "DMP 128 P models only. Response: PhonRT X$ ]"

- id: view_ring_tone
  label: View Incoming Ring Tone
  kind: query
  command: "E  RT,PHON }"
  params: []
  notes: "DMP 128 P models only. Response: PhonRT X$ ]"
```

## Feedbacks
```yaml
# Query-response feedbacks (selected representative states; the corresponding
# query actions above carry the verbatim ASCII request).
- id: firmware_version_state
  type: string
  values: ["x.xx"]  # UNRESOLVED: full version range not bounded in source
  query: query_firmware_version

- id: part_number_state
  type: enum
  values:
    - "60-1211-01"   # DMP 128
    - "60-1211-10"   # DMP 128 AT
    - "60-1178-01"   # DMP 128 C
    - "60-1178-10"   # DMP 128 C AT
    - "60-1179-01"   # DMP 128 C P
    - "60-1179-10"   # DMP 128 C P AT
  query: view_part_number

- id: dhcp_state
  type: enum
  values: ["0", "1"]
  query: view_dhcp_status

- id: verbose_mode_state
  type: enum
  values: ["0", "1", "2", "3"]
  query: view_verbose_mode

- id: mute_state
  type: enum
  values: ["0", "1"]
  query: read_mute_status

- id: protected_configuration_status
  type: enum
  values: ["0", "1"]
  query: view_protected_configuration_status

- id: io_mode
  type: enum
  values: ["0", "1"]
  query: view_io_mode

- id: io_state
  type: enum
  values: ["0", "1"]
  query: view_io_state

- id: group_fader_level
  type: integer
  query: view_group_fader_level

- id: group_mute_state
  type: enum
  values: ["0", "1"]
  query: view_group_mute
```

## Variables
```yaml
# Settable parameters that are not discrete actions (gains/levels/addresses).
- id: unit_name
  type: string
  max_length: 24
  set: set_unit_name

- id: ip_address
  type: string
  default: "192.168.254.254"
  set: set_ip_address

- id: subnet_mask
  type: string
  default: "255.255.0.0"
  set: set_subnet_mask

- id: gateway_ip
  type: string
  default: "0.0.0.0"
  set: set_gateway_ip_address

- id: gmt_offset
  type: string
  range: "-12:00 to 14:00 (HH:MM)"
  set: set_gmt_offset

- id: daylight_savings_mode
  type: enum
  values: ["0", "1", "2", "3"]
  set: set_daylight_savings_time

- id: connection_timeout_seconds
  type: integer
  range: "10 to 650000 (1 step = 10 s; param range 1-65000)"
  default: 300
  set: set_global_ip_port_timeout

- id: administrator_password
  type: string
  set: set_administrator_password

- id: user_password
  type: string
  set: set_user_password

- id: audio_level
  type: integer
  unit: "SIS value (dB x10 + 2048)"
  set: set_trim_or_gain
```

## Events
```yaml
# Unsolicited messages sent by the device. See "Device-Initiated Power-Up Message"
# (p.43) and "Telephone Responses (unsolicited)" (p.53) of the source.
- id: copyright_message
  trigger: "First power-on, or first IP/Telnet connection established."
  payload: "© Copyright 20{yy}, Extron Electronics, DMP 128 {string}, V{x.xx}, 60-{nnnn}-{nn} ]"
  notes: "{string} = full model number; V{x.xx} = firmware; 60-{nnnn}-{nn} = part number. Followed by day/date/time line on Telnet only."

- id: password_prompt
  trigger: "Telnet/Web connection when a password is configured."
  payload: "] Password"
  notes: "Repeated until the correct admin or user password is entered."

- id: login_administrator
  trigger: "Successful administrator password entry."
  payload: "] Login Administrator ]"

- id: login_user
  trigger: "Successful user password entry."
  payload: "] Login User ]"

# Error responses (issued when a command cannot be executed):
- id: error_e11
  code: E11
  meaning: Invalid preset
- id: error_e12
  code: E12
  meaning: Invalid port number
- id: error_e13
  code: E13
  meaning: Invalid parameter (number is out of range)
- id: error_e14
  code: E14
  meaning: Not valid for this configuration
- id: error_e17
  code: E17
  meaning: System timed out
- id: error_e22
  code: E22
  meaning: Busy
- id: error_e24
  code: E24
  meaning: Privilege violation
- id: error_e25
  code: E25
  meaning: Device is not present
- id: error_e26
  code: E26
  meaning: Maximum connections exceeded
- id: error_e27
  code: E27
  meaning: Invalid event number
- id: error_e28
  code: E28
  meaning: Bad filename or file not found

# Telephone unsolicited responses (DMP 128 P models, verbose mode 3):
- id: phon_dial_tone
  payload: "PhonDial_Tone ]"
  meaning: Line is off hook, dial tone present.
- id: phon_ringing_tone
  payload: "PhonRinging_Tone ]"
  meaning: Far end ringing.
- id: phon_busy_tone
  payload: "PhonBusy_Tone ]"
  meaning: Far end busy.
- id: phon_line_intr
  payload: "PhonLine_Intr ]"
  meaning: Far end has terminated the call.
- id: phon_error
  payload: "PhonError ]"
  meaning: Unrecognized phone command.
- id: phon_ring
  payload: "PhonRING ]"
  meaning: Incoming call.
- id: phon_date
  payload: "PhonDATE = X^ ]"
  meaning: Caller ID date (mmdd).
- id: phon_time
  payload: "PhonTIME = X& ]"
  meaning: Caller ID time (hhss).
- id: phon_name
  payload: "PhonNAME = X* ]"
  meaning: Caller ID name (up to 10 chars).
- id: phon_nmbr
  payload: "PhonNMBR = X@ ]"
  meaning: Caller ID phone number.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. No destructive-command confirmation flow
# is described; the system reset (E ZXXX }), flash reset (E ZFFF }), and
# "reset all device settings" (E ZY }) commands execute immediately on receipt.
```

## Notes
- Six hardware variants share one command set: DMP 128, DMP 128 AT (Axpander), DMP 128 C, DMP 128 C AT, DMP 128 C P (Plus), DMP 128 C P AT. Telephone/modem commands apply to P models only.
- SIS commands are case-insensitive except where noted (event data size `b/B/S/L`, web-encoding rules). No start-of-command or end-of-command delimiter is required beyond the trailing `}` (soft CR) inside `E ... }` framed commands and `]` (CR/LF) terminator on responses.
- Inter-character pause of 10 seconds or longer aborts the current command silently (no error returned).
- The DMP 128 exposes two SIS command subsets: **basic SIS** (global configuration — IP, time, files, presets, resets, events, serial port, digital I/O, telephone) documented pp.44–48, and **DSP SIS** (audio processing — gain/trim/mute, group masters, protected configuration, mix-points) documented pp.49–53 and 72–73. Both use identical framing.
- Telnet connections can monitor changes issued from other sockets or the serial port by enabling verbose mode 1 or 3.
- Default connection timeout is 5 minutes; Extron recommends leaving it at the default and periodically issuing the `Q` query to keep the connection alive.
- Audio dB↔SIS conversion formula: `SIS_value = (desired_dB × 10) + 2048`.
- Mix-point routing is achieved by mute/unmute of the mix-point address; there is no separate "route" opcode. To route input N to output M, look up the mix-point address (Tables 3–10, pp.77–98) and send `E M{addr}*0AU}` (unmute = route) or `E M{addr}*1AU}` (mute = break).
- HTML reserved characters rejected in preset names, device name, passwords, and file names: `{space (spaces are OK for names)} + ~ , @ = ' [ ] { } < > ' " ; : > \ ?` (verbatim from source, p.43).

<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: the "Set single digit interval" telephone command appears in the source but its ASCII command column was truncated in the refined excerpt. -->
<!-- UNRESOLVED: a "Reset (clear) user password" command is implied by symmetry with the administrator reset but its row was truncated in the refined excerpt. -->
<!-- UNRESOLVED: the View I/O mode / View I/O state commands share an identical ASCII opcode `X!}` in the source — the response field is the only differentiator. Real-world behavior of these two rows needs device verification. -->
````

## Provenance

```yaml
source_domains:
  - extron.com
  - manualmachine.com
  - manualshelf.com
  - manualsdir.com
source_urls:
  - https://www.extron.com/download/files/userman/DMP_128_68-2036-01_revF.pdf
  - https://manualmachine.com/extronelectronic/dmp128/1270492-user-manual/
  - https://www.manualshelf.com/manual/extron-electronic/dmp128/user-guide-english.html
  - https://www.manualsdir.com/manuals/311668/extron-electronics-dmp-128-user-guide.html
  - https://www.extron.com/product/dmp128
retrieved_at: 2026-06-15T20:28:03.911Z
last_checked_at: 2026-06-22T13:58:50.184Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-22T13:58:50.184Z
matched_actions: 111
action_count: 111
confidence: medium
summary: "All 111 spec actions matched verbatim to source command table entries; mix-point address tables are parameter spaces, not separate commands; transport fully confirmed. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Power on/off commands are not documented in the source — the device appears to be always-on when powered; no SIS power command exists."
- "Firmware version compatibility not stated in source."
- "\"Set single digit interval\" telephone command appears in source but"
- "full version range not bounded in source"
- "source documents no named multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility range not stated in source."
- "the \"Set single digit interval\" telephone command appears in the source but its ASCII command column was truncated in the refined excerpt."
- "a \"Reset (clear) user password\" command is implied by symmetry with the administrator reset but its row was truncated in the refined excerpt."
- "the View I/O mode / View I/O state commands share an identical ASCII opcode `X!}` in the source — the response field is the only differentiator. Real-world behavior of these two rows needs device verification."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
