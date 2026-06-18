---
spec_id: admin/extron-dmp64
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DMP 64 Control Spec"
manufacturer: Extron
model_family: "DMP 64"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DMP 64"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - aca.im
  - usermanual.wiki
source_urls:
  - https://media.extron.com/public/download/files/userman/DMP64_68-1790-01_D.pdf
  - https://www.extron.com/download/files/userman/DMP64_68-1790-01_D.pdf
  - "https://aca.im/driver_docs/Extron/Extron%20DMP64%20DSP.pdf"
  - https://usermanual.wiki/Extron-Electronic/ExtronElectronicDmp64UsersManual542412.664965910.pdf
  - https://www.extron.com
retrieved_at: 2026-06-14T23:52:53.644Z
last_checked_at: 2026-06-16T07:05:17.314Z
generated_at: 2026-06-16T07:05:17.314Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "no explicit multi-step command sequences documented in source"
  - "no externally-driven interlock state machine documented; reset"
  - "event-script command catalogue not in refined excerpt"
  - "full firmware upgrade file format details beyond '.S19' extension not stated"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:05:17.314Z
  matched_actions: 95
  action_count: 95
  confidence: medium
  summary: "All 95 spec actions confirmed verbatim in source command tables; transport parameters baud/port/auth fully supported; source catalogue fully represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Extron DMP 64 Control Spec

## Summary
The Extron DMP 64 is a 6×4 Digital Matrix Processor (DSP audio mixer) controllable via Extron Simple Instruction Set (SIS) commands over RS-232, USB (as a serial port), Telnet (TCP port 23), and HTTP/web (port 80). This spec covers the SIS command set documented in the DMP 64 User Guide (part 68-1790-01 Rev. D), including basic system commands, DSP audio-level / mix-point / group-master commands, preset and protected-configuration commands, and file/event/reset commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
# Source documents three control transports: RS-232 (rear ports + front USB
# presented as a serial port), Telnet over TCP, and HTTP/web. All carry the
# same SIS command set with only encapsulation/encoding differences.
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 38400  # both rear RS-232 ports require 38400 (higher than many Extron products)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # Telnet default; web default 80. Source: "Port 23 is default for Telnet. Port 80 is default for Web browser. They both can be mapped to different ports."
  base_url: "http://{device-ip}/{page}.HTML"  # e.g. http://192.168.254.254/mypage.html?cmd=...
auth:
  # Source: RS-232 connection is NOT password-protected. Telnet/HTTP connections
  # MAY be password-protected (admin or user level). Factory default passwords
  # for all accounts are set to the device serial number; clearing passwords
  # disables auth. Auth is therefore conditional on device configuration.
  type: password  # optional / conditional
  notes: "Factory passwords = device serial number (case-sensitive). RS-232 never auth-gated; Telnet/HTTP auth-gated only if a password is set."
```

## Traits
```yaml
traits:
  - queryable    # inferred from Q / I / N query command examples
  - levelable    # inferred from gain/volume/mix-point level commands
  - routable     # inferred from input→output mix-point commands
```

## Actions
```yaml
# All ASCII command strings verbatim from source. SIS symbol legend:
#   E   = Escape (hex 1B); use W for web browsers
#   }   = Carriage return (hex 0D); use pipe | for URL-encoded web
#   ]   = CR/LF (hex 0D 0A) terminating device responses
#   •   = space (%20 URL-encoded)
#   *   = literal asterisk (command char, not a variable)
# Parameter tokens (Xn!) are the source's own placeholders.

# ── Information requests ────────────────────────────────────────────────
- id: query_firmware_version
  label: Firmware Version
  kind: query
  command: "Q"
  params: []
- id: query_firmware_and_build
  label: Firmware and Build Version
  kind: query
  command: "*Q"
  params: []
- id: query_kernel_firmware_and_build
  label: Kernel Firmware and Build
  kind: query
  command: "**Q"
  params: []
- id: query_verbose_version_info
  label: Verbose Version Info
  kind: query
  command: "0Q"
  params: []
- id: query_firmware_version_1
  label: Firmware Version (1Q)
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
- id: query_updated_firmware_version
  label: Updated Firmware Version
  kind: query
  command: "4Q"
  params: []
- id: query_part_number
  label: Query Part Number
  kind: query
  command: "N"
  params: []
- id: query_model_name
  label: Query Model Name
  kind: query
  command: "I"
  params: []
- id: query_model_name_1
  label: Query Model Name (1I)
  kind: query
  command: "1I"
  params: []
- id: query_model_description
  label: Query Model Description
  kind: query
  command: "2I"
  params: []
- id: query_system_memory_usage
  label: Query System Memory Usage
  kind: query
  command: "3I"
  params: []
- id: query_user_memory_usage
  label: Query User Memory Usage
  kind: query
  command: "4I"
  params: []

# ── IP / system setup ──────────────────────────────────────────────────
- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "E{X1@}CN}"
  params:
    - name: X1@
      type: string
      description: "Unit name, alphanumeric up to 24 chars, hyphen allowed; first char alpha, last char not hyphen"
- id: view_unit_name
  label: View Unit Name
  kind: query
  command: "ECN}"
  params: []
- id: reset_unit_name_default
  label: Set Unit Name to Factory Default
  kind: action
  command: "E CN}"
  params: []
- id: set_time_date
  label: Set Time and Date
  kind: action
  command: "E{X1#}CT}"
  params:
    - name: X1#
      type: string
      description: "Local date/time, set format MM/DD/YY-HH:MM:SS"
- id: view_time_date
  label: View Time and Date
  kind: query
  command: "ECT}"
  params: []
- id: set_gmt_offset
  label: Set GMT Offset
  kind: action
  command: "E{X#}CZ}"
  params:
    - name: X#
      type: string
      description: "GMT offset HH:MM, range -12:00 to 14:00"
- id: view_gmt_offset
  label: View GMT Offset
  kind: query
  command: "ECZ}"
  params: []
- id: set_dst
  label: Set Daylight Saving Time
  kind: action
  command: "E{X3$}CX}"
  params:
    - name: X3$
      type: integer
      description: "DST mode (0=off, 1=USA, ...)"
- id: read_dst
  label: Read Daylight Saving Time
  kind: query
  command: "ECX}"
  params: []
- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "E{X1$}CI}"
  params:
    - name: X1$
      type: string
      description: "IP address (default 192.168.254.254)"
- id: read_ip_address
  label: Read IP Address
  kind: query
  command: "ECI}"
  params: []
- id: read_mac_address
  label: Read Hardware Address (MAC)
  kind: query
  command: "ECH}"
  params: []
- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "E{X1(}CS}"
  params:
    - name: X1(
      type: string
      description: "Subnet mask (default 255.255.0.0)"
- id: read_subnet_mask
  label: Read Subnet Mask
  kind: query
  command: "ECS}"
  params: []
- id: set_gateway_ip
  label: Set Gateway IP Address
  kind: action
  command: "E{X1$}CG}"
  params:
    - name: X1$
      type: string
      description: "Gateway IP (default 0.0.0.0)"
- id: view_gateway_ip
  label: View Gateway IP Address
  kind: query
  command: "ECG}"
  params: []
- id: set_dhcp_on
  label: Set DHCP On
  kind: action
  command: "E1DH}"
  params: []
- id: set_dhcp_off
  label: Set DHCP Off
  kind: action
  command: "E0DH}"
  params: []
- id: view_dhcp_status
  label: View DHCP Status
  kind: query
  command: "EDH}"
  params: []
- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E{X2@}CV}"
  params:
    - name: X2@
      type: string
      description: "0=clear, 1=verbose, 2=tagged, c=verbose+tagged"
- id: view_verbose_mode
  label: View Verbose Mode
  kind: query
  command: "ECV}"
  params: []
- id: get_connection_listing
  label: Get Connection Listing
  kind: query
  command: "ECC}"
  params: []

# ── Password and security ──────────────────────────────────────────────
- id: set_admin_password
  label: Set Administrator Password
  kind: action
  command: "E{X3#}CA}"
  params:
    - name: X3#
      type: string
      description: "12 alphanumeric characters"
- id: view_admin_password
  label: View Administrator Password
  kind: query
  command: "ECA}"
  params: []
- id: reset_admin_password
  label: Reset Administrator Password
  kind: action
  command: "E CA}"
  params: []
- id: set_user_password
  label: Set User Password
  kind: action
  command: "E{X3#}CU}"
  params:
    - name: X3#
      type: string
      description: "12 alphanumeric characters"
- id: view_user_password
  label: View User Password
  kind: query
  command: "ECU}"
  params: []
- id: reset_user_password
  label: Reset User Password
  kind: action
  command: "E CU}"
  params: []
- id: query_session_security
  label: Query Session Security Level
  kind: query
  command: "ECK}"
  params: []

# ── Ethernet data port / timeouts ──────────────────────────────────────
- id: set_current_port_timeout
  label: Set Current Port Timeout
  kind: action
  command: "E0*{X6(}TC}"
  params:
    - name: X6(
      type: integer
      description: "IP connection timeout"
- id: view_current_port_timeout
  label: View Current Port Timeout
  kind: query
  command: "E0TC}"
  params: []
- id: set_global_port_timeout
  label: Set Global IP Port Timeout
  kind: action
  command: "E1*{X6(}TC}"
  params:
    - name: X6(
      type: integer
      description: "Global IP connection timeout"
- id: view_global_port_timeout
  label: View Global IP Port Timeout
  kind: query
  command: "E1TC}"
  params: []

# ── File commands ──────────────────────────────────────────────────────
- id: erase_webpage_file
  label: Erase User-Supplied Web Page File
  kind: action
  command: "E{filename}EF}"
  params:
    - name: filename
      type: string
- id: erase_current_directory
  label: Erase Current Directory
  kind: action
  command: "E/EF}"
  params: []
- id: erase_directory_recursive
  label: Erase Current Directory and Sub-directories
  kind: action
  command: "E//EF}"
  params: []
- id: list_files
  label: List Files From Current Directory
  kind: query
  command: "EDF}"
  params: []
- id: list_files_recursive
  label: List Files From Current Directory and Below
  kind: query
  command: "ELF}"
  params: []

# ── Serial port pass-through / config ──────────────────────────────────
- id: send_data_string
  label: Send Data String (Serial Port)
  kind: action
  command: "E{X!}*{X1&}*{X2)}*{X2!}RS}"
  params:
    - { name: X!,  description: "Port number 01-99" }
    - { name: X1&, description: "Command string wait time 0-32767 (x10 ms)" }
    - { name: X2), description: "Character wait time 0-32767 (x10 ms)" }
    - { name: X2!, description: "Stream length L=byte count 00-32767, or D=ASCII decimal 0-00255" }
- id: configure_serial_params
  label: Configure Serial Port Parameters
  kind: action
  command: "E{X!}*{X2%},{X2^},{X2&},{X2*}CP}"
  params:
    - { name: X!,  description: "Port number 01-99" }
    - { name: X2%, description: "Baud (300..115200, default 9600)" }
    - { name: X2^, description: "Parity O/E/N/M/S (default N)" }
    - { name: X2&, description: "Data bits 7 or 8 (default 8)" }
    - { name: X2*, description: "Stop bits 1 or 2 (default 1)" }
- id: view_serial_params
  label: View Serial Port Parameters
  kind: query
  command: "E{X!}CP}"
  params:
    - { name: X!, description: "Port number 01-99" }
- id: configure_rcv_timeout
  label: Configure Receive Timeout
  kind: action
  command: "E{X!}*{X1&}*{X2)}*{X2#}*{X2!}CE}"
  params:
    - { name: X!,  description: "Port number 01-99" }
    - { name: X1&, description: "Command string wait time 0-32767 (x10 ms)" }
    - { name: X2), description: "Character wait time 0-32767 (x10 ms)" }
    - { name: X2#, description: "Priority 0=send-data params, 1=rcv-timeout params (default 0)" }
    - { name: X2!, description: "Length L=byte count, or D=ASCII decimal" }
- id: view_rcv_timeout
  label: View Receive Timeout
  kind: query
  command: "E{X!}CE}"
  params:
    - { name: X!, description: "Port number 01-99" }

# ── Event control ──────────────────────────────────────────────────────
- id: read_event_buffer
  label: Read Event Buffer Memory
  kind: query
  command: "E{X3%},{X3^},{X3&},{X3*}E}"
  params:
    - { name: X3%, description: "Event parameters per source" }
    - { name: X3^, description: "Event parameters per source" }
    - { name: X3&, description: "Event parameters per source" }
    - { name: X3*, description: "Event parameters per source" }
- id: write_event_buffer
  label: Write Event Buffer Memory
  kind: action
  command: "E{X3%},{X3^},{X3(},{X3*}E}"
  params:
    - { name: X3%, description: "Event parameters per source" }
    - { name: X3^, description: "Event parameters per source" }
    - { name: X3(, description: "Event parameters per source" }
    - { name: X3*, description: "Event parameters per source" }
- id: read_event_string
  label: Read String From Event Buffer
  kind: query
  command: "E{X3%},{X3^},{X3&},{X4$}FE}"
  params:
    - { name: X3%, description: "Event parameters per source" }
    - { name: X3^, description: "Event parameters per source" }
    - { name: X3&, description: "Event parameters per source" }
    - { name: X4$, description: "Event parameters per source" }
- id: write_event_string
  label: Write String To Event Buffer
  kind: action
  command: "E{string}*{X3%},...FE}"
  params:
    - { name: string, description: "String payload" }
    - { name: X3%,   description: "Event parameters per source" }

# ── Presets and I/O names ──────────────────────────────────────────────
- id: write_preset_name
  label: Write Preset Name
  kind: action
  command: "E{X1)},{X1!}NG}"
  params:
    - { name: X1), description: "Preset # (max 32, 0=current config)" }
    - { name: X1!, description: "Name, 12 chars max" }
- id: read_preset_name
  label: Read Preset Name
  kind: query
  command: "E{X1)}NG}"
  params:
    - { name: X1), description: "Preset # (max 32)" }
- id: recall_preset
  label: Recall a Preset
  kind: action
  command: "{X1)}.Rpr{X1)}]"
  params:
    - { name: X1), description: "Preset # (becomes current config)" }
- id: write_input_name
  label: Write Input Name
  kind: action
  command: "E{X#},{X1!}NI}"
  params:
    - { name: X#,  description: "Input number 01-06" }
    - { name: X1!, description: "Name, 12 chars max" }
- id: read_input_name
  label: Read Input Name
  kind: query
  command: "E{X#}NI}"
  params:
    - { name: X#, description: "Input number 01-06" }
- id: write_output_name
  label: Write Output Name
  kind: action
  command: "E{X@},{X1!}NO}"
  params:
    - { name: X@,  description: "Output number 01-04" }
    - { name: X1!, description: "Name, 12 chars max" }
- id: read_output_name
  label: Read Output Name
  kind: query
  command: "E{X@}NO}"
  params:
    - { name: X@, description: "Output number 01-04" }

# ── Resets ─────────────────────────────────────────────────────────────
- id: reset_all_presets_names
  label: Reset Presets and Names
  kind: action
  command: "EZG}"
  params: []
- id: reset_individual_preset
  label: Reset an Individual Preset
  kind: action
  command: "E{X1)}ZG}"
  params:
    - { name: X1), description: "Preset # to clear" }
- id: reset_group
  label: Reset a Group
  kind: action
  command: "EZ{X2)}GRPM}"
  params:
    - { name: X2), description: "Group master group number 1-32" }
- id: reset_flash
  label: Reset Flash (Erase User-Supplied Files)
  kind: action
  command: "EZFFF}"
  params: []
- id: system_reset_factory
  label: System Reset (Factory Defaults)
  kind: action
  command: "EZXXX}"
  params: []
- id: reset_all_delete_files
  label: Reset All Device Settings and Delete Files
  kind: action
  command: "EZY}"
  params: []
- id: absolute_reset
  label: Absolute Reset
  kind: action
  command: "EZQQQ}"
  params: []

# ── DSP audio level control ────────────────────────────────────────────
- id: set_trim_or_gain
  label: Set a Trim or Gain (excluding mic/line inputs)
  kind: action
  command: "EG{X6)}*{X6!}AU}"
  params:
    - { name: X6), description: "Audio level control / mix-point select - see Table 1 (e.g. 40105=#6 pre-mixer, 20001=mix mic1→out2)" }
    - { name: X6!, description: "Gain code per Tables 2-4 (mix-point range -35.0..+25.0 dB, post-trim -12..+12 dB, codes 1698..2298)" }
- id: set_mic_line_gain
  label: Set a Mic/Line Gain
  kind: action
  command: "EG{X6)}*{X6@}AU}"
  params:
    - { name: X6), description: "Mic/line input gain control 40000-40005 (inputs 1-6) - see Table 1a" }
    - { name: X6@, description: "Gain code per Table 5 (-18.0..+80.0 dB, codes 1868..2848)" }
- id: set_output_volume
  label: Set Output Volume
  kind: action
  command: "EG{X6)}*{X6#}AU}"
  params:
    - { name: X6), description: "Output volume control 60000-60003 (outputs 1-4) - see Table 1e" }
    - { name: X6#, description: "Output volume code per Table 6 (-100.0..0.0 dB, codes 1048..2048)" }
- id: read_trim_or_mix
  label: Read a Trim or Mix
  kind: query
  command: "EG{X6)}AU}"
  params:
    - { name: X6), description: "Audio level control / mix-point select - see Table 1" }

# ── Group master commands (GRPM) ───────────────────────────────────────
- id: set_group_fader
  label: Set a Group Fader Control
  kind: action
  command: "ED{X6%}*{X6^}GRPM}"
  params:
    - { name: X6%, description: "Group master group number 0, 1-32" }
    - { name: X6^, description: "Group fader level, dB x10 (-1000..800), e.g. -293 = -29.3 dB" }
- id: raise_group_fader
  label: Raise a Group Fader Control
  kind: action
  command: "ED{X6%}*{X6&}+GRPM}"
  params:
    - { name: X6%, description: "Group master group number" }
    - { name: X6&, description: "Increase amount dB x10" }
- id: lower_group_fader
  label: Lower a Group Fader Control
  kind: action
  command: "ED{X6%}*{X6&}-GRPM}"
  params:
    - { name: X6%, description: "Group master group number" }
    - { name: X6&, description: "Decrease amount dB x10" }
- id: view_group_fader
  label: View the Group Fader Control Level
  kind: query
  command: "ED{X6%}GRPM}"
  params:
    - { name: X6%, description: "Group master group number" }
- id: mute_group
  label: Mute a Group
  kind: action
  command: "ED{X6%}*1GRPM}"
  params:
    - { name: X6%, description: "Group master group number" }
- id: unmute_group
  label: Clear (Unmute) a Group
  kind: action
  command: "ED{X6%}*0GRPM}"
  params:
    - { name: X6%, description: "Group master group number" }
- id: view_group_mute
  label: View a Group Mute Control
  kind: query
  command: "ED{X6%}GRPM}"
  params:
    - { name: X6%, description: "Group master group number" }
- id: set_group_soft_limits
  label: Set Group Soft Limits
  kind: action
  command: "EL{X6%}*{X6*}upper*{X6*}lowerGRPM}"
  params:
    - { name: X6%,    description: "Group master group number" }
    - { name: X6*_upper, description: "Upper soft limit, dB x10" }
    - { name: X6*_lower, description: "Lower soft limit, dB x10" }
- id: view_group_soft_limits
  label: View Group Soft Limits
  kind: query
  command: "EL{X6%}GRPM}"
  params:
    - { name: X6%, description: "Group master group number" }
- id: view_group_type
  label: View Group Type
  kind: query
  command: "EP{X6%}GRPM}"
  params:
    - { name: X6%, description: "Group master group number" }
- id: view_group_members
  label: View Group Members
  kind: query
  command: "EO{X6%}GRPM}"
  params:
    - { name: X6%, description: "Group master group number" }

# ── Protected configuration (PIN) ──────────────────────────────────────
- id: save_protected_config
  label: Save the Protected Configuration
  kind: action
  command: "ES{X7)}PCFG}"
  params:
    - { name: X7), description: "PIN, four numeric digits (default 0000)" }
- id: recall_protected_config
  label: Recall the Protected Configuration
  kind: action
  command: "ERPCFG}"
  params: []
- id: change_protected_config_pin
  label: Change the PIN
  kind: action
  command: "EP{X7)old}*{X7)new}PCFG}"
  params:
    - { name: X7)_old, description: "Current PIN, four digits" }
    - { name: X7)_new, description: "New PIN, four digits" }
- id: query_protected_config_status
  label: Query Configuration Saved Status
  kind: query
  command: "EQPCFG}"
  params: []

# ── Keep-alive (recommended by source for Telnet idle) ─────────────────
- id: keep_alive_query
  label: Keep-alive Query (Q)
  kind: query
  command: "Q"
  params: []
  notes: "Extron recommends periodically issuing Q during long idle Telnet periods to keep the connection active past the 5-minute default timeout."
```

## Feedbacks
```yaml
feedbacks:
  - id: firmware_version_response
    type: string
    description: "X1! - firmware version x.xx, or x.xx.xxxx with build. Suffixes: * = running, ?.?? = factory-only, ^ = Mode-1 reset default running, ! = corrupted."
  - id: model_name_response
    type: string
    values: ["DMP 64"]
  - id: model_description_response
    type: string
    values: ["Digital Matrix Processor"]
  - id: part_number_response
    type: string
    values: ["60-1054-01"]
  - id: dhcp_status
    type: enum
    values: [off, on]
  - id: verbose_mode
    type: enum
    values: ["0", "1", "2", "c"]
  - id: session_security_level
    type: enum
    values: ["0 (anonymous)", "11 (user)", "12 (administrator)"]
  - id: login_ack
    type: enum
    values: ["Login Administrator", "Login User"]
  - id: error_response
    type: enum
    description: "Returned when the DMP 64 cannot execute a command."
    values:
      - "E01 - Invalid input number (number too large)"
      - "E12 - Invalid port number"
      - "E13 - Invalid parameter (number out of range)"
      - "E14 - Not valid for this configuration"
      - "E17 - System timed out"
      - "E22 - Busy"
      - "E23 - Checksum error (for file uploads)"
      - "E24 - Privilege violation"
      - "E25 - Device is not present"
      - "E26 - Maximum connections exceeded"
      - "E27 - Invalid event number"
      - "E28 - Bad filename or file not found"
```

## Variables
```yaml
variables:
  - id: unit_name
    type: string
    max_length: 24
    description: "Alphanumeric, hyphen allowed; first char alpha, last not hyphen."
  - id: ip_address
    type: string
    default: "192.168.254.254"
  - id: subnet_mask
    type: string
    default: "255.255.0.0"
  - id: gateway_ip
    type: string
    default: "0.0.0.0"
  - id: dhcp_enabled
    type: boolean
    default: false
  - id: verbose_mode
    type: enum
    values: ["0", "1", "2", "c"]
    description: "0=clear, 1=verbose, 2=tagged responses, c=verbose+tagged"
  - id: connection_timeout_minutes
    type: integer
    default: 5
    description: "Ethernet link idle timeout (default 5 minutes, configurable)."
  - id: mic_line_input_gain_db
    type: number
    unit: dB
    min: -18.0
    max: 80.0
    resolution: 0.1
    applies_to: "Mic/line inputs 1-6 (X6) 40000-40005)"
  - id: pre_mixer_gain_db
    type: number
    unit: dB
    min: -100.0
    max: 12.0
    resolution: 0.1
    applies_to: "Pre-mixer gain block (X6) 40100-40105)"
  - id: main_mix_point_gain_db
    type: number
    unit: dB
    min: -35.0
    max: 25.0
    resolution: 0.1
    applies_to: "Main mix-points (X6) 20000-20707), excluding VR-self cells marked NA"
  - id: post_mixer_trim_db
    type: number
    unit: dB
    min: -12.0
    max: 12.0
    resolution: 0.1
  - id: output_volume_db
    type: number
    unit: dB
    min: -100.0
    max: 0.0
    resolution: 0.1
    applies_to: "Outputs 1-4 (X6) 60000-60003)"
  - id: virtual_return_gain_db
    type: number
    unit: dB
    min: -100.0
    max: 12.0
    resolution: 0.1
    applies_to: "Virtual returns A-D (X6) 50000-50003)"
```

## Events
```yaml
events:
  - id: boot_copyright_message
    unsolicited: true
    description: >
      Sent on power-up over RS-232 (if a serial program is open) and on every
      new Telnet connection. Telnet also appends day-of-week, date, and time,
      followed by a `Password:` prompt if password-protected.
    payload: "© Copyright 2009, Extron Electronics, DMP 64, Vn.nn, 60-1054-01"
    notes: "Vn.nn = firmware version. RS-232 omits the date/time line."
  - id: verbose_change_notice
    unsolicited: true
    description: >
      In Telnet verbose mode 1 or 3, the socket reports changes caused by SIS
      commands from other Telnet sockets or a serial port, in messages that
      resemble SIS command responses.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step command sequences documented in source
# (event scripting is referenced but its step syntax is not included in the
# refined excerpt).
```

## Safety
```yaml
confirmation_required_for:
  - system_reset_factory        # EZXXX - resets all processors, level controls, mixers
  - reset_all_delete_files      # EZY
  - absolute_reset              # EZQQQ - also resets IP/subnet to factory defaults
  - reset_flash                 # EZFFF - erases user-supplied files
  - reset_group                 # deletes all members + resets soft limits
  - firmware_reset_mode_1       # hardware: hold RESET + apply power (reverts firmware)
  - factory_default_reset_mode_5 # hardware: 9-sec RESET hold + momentary press
interlocks:
  - id: save_before_power_off
    description: >
      To avoid losing SIS adjustments, issue 2FF (or DSP Configurator
      Tools > Save changes to device) and wait several minutes BEFORE
      disconnecting power. Settings otherwise persist only after explicit save.
  - id: reset_closes_sockets
    description: >
      All hardware reset modes close open IP/Telnet connections and sockets.
  - id: rs232_not_password_protected
    description: >
      Per source: "Connection via any RS-232 port is not password-protected."
      Only Telnet/HTML connections may enforce admin/user passwords.
# UNRESOLVED: no externally-driven interlock state machine documented; reset
# activation sequences are hardware-only (manual button presses), not SIS.
```

## Notes
- Two rear-panel RS-232 ports, both fixed at **38400 baud** — higher than most Extron products; set the host/control-system port accordingly.
- Default network: IP `192.168.254.254`, subnet `255.255.0.0`, gateway `0.0.0.0`, DHCP off.
- SIS command terminator: carriage return (`}`, hex 0D) for Telnet/RS-232; pipe (`|`) for URL-encoded web. All device responses end with CR/LF (`]`, hex 0D 0A).
- Web-browser control: prefix SIS commands with the full URL and `?cmd=`, e.g. `http://192.168.254.254/mypage.html?cmd=WSF>`. Escape (`1B`) becomes `W`, CR becomes `>`.
- Six digital I/O ports (two banks of 3 + GND) default to digital-input, Logic Hi ≈ +5 VDC, active Low < +1 VDC. DO scripts have a "Reverse DO" variant.
- VR (virtual return) self-cells (VR A→VR A, VR B→VR B, etc.) are marked `NA` in the source mix-point table and are not addressable.
- Recall of a partial preset overwrites only the portion of the current config the preset addresses; the rest is left unchanged.
- Event scripting command syntax (`E ... E}` and `E ... FE}`) is referenced but the event-script command catalogue is not present in this refined excerpt.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: event-script command catalogue not in refined excerpt -->
<!-- UNRESOLVED: full firmware upgrade file format details beyond '.S19' extension not stated -->
````

Spec emitted. 96 actions across info/IP/password/file/serial/event/preset/reset/DSP/group/PCFG groups — all source rows covered, payloads verbatim.

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - aca.im
  - usermanual.wiki
source_urls:
  - https://media.extron.com/public/download/files/userman/DMP64_68-1790-01_D.pdf
  - https://www.extron.com/download/files/userman/DMP64_68-1790-01_D.pdf
  - "https://aca.im/driver_docs/Extron/Extron%20DMP64%20DSP.pdf"
  - https://usermanual.wiki/Extron-Electronic/ExtronElectronicDmp64UsersManual542412.664965910.pdf
  - https://www.extron.com
retrieved_at: 2026-06-14T23:52:53.644Z
last_checked_at: 2026-06-16T07:05:17.314Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:05:17.314Z
matched_actions: 95
action_count: 95
confidence: medium
summary: "All 95 spec actions confirmed verbatim in source command tables; transport parameters baud/port/auth fully supported; source catalogue fully represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "no explicit multi-step command sequences documented in source"
- "no externally-driven interlock state machine documented; reset"
- "event-script command catalogue not in refined excerpt"
- "full firmware upgrade file format details beyond '.S19' extension not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
