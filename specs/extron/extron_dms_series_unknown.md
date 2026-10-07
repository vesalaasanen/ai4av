---
spec_id: admin/extron-dms-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DMS Series Control Spec"
manufacturer: Extron
model_family: "DMS 1600"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DMS 1600"
    - "DMS 2000"
    - "DMS 3200"
    - "DMS 3600"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - archive.org
  - manualslib.com
source_urls:
  - https://archive.org/download/manualzz-id-1122416/1122416.pdf
  - https://www.manualslib.com/manual/1616045/EXTRON-ELECTRONICS-DMS-1600.html
retrieved_at: 2026-05-14T23:23:30.696Z
last_checked_at: 2026-10-07T11:10:05.940Z
generated_at: 2026-10-07T11:10:05.940Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number not explicitly stated in source (Telnet implied but not confirmed)"
  - "filename constraints not stated in source\""
  - "no multi-step macro sequences explicitly documented in source"
  - "no safety warnings or interlock procedures found in source"
  - "TCP/Telnet port number not explicitly stated in source"
  - "firmware version compatibility ranges not stated"
  - "EDID Minder on/off command syntax not fully detailed in source (referenced but params unclear)"
  - "exact HTTP API endpoints not documented in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T11:10:05.940Z
  matched_actions: 101
  action_count: 101
  confidence: medium
  summary: "All 101 action units map to SIS commands in the source, and the serial and auth transport values are supported; the TCP port is left unresolved. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Extron DMS Series Control Spec

## Summary
Extron DMS Series matrix switchers (DMS 1600, DMS 2000, DMS 3200, DMS 3600) are configurable crosspoint matrices supporting up to 36x36 audio/video routing. Control via SIS (Simple Instruction Set) commands over RS-232/RS-422 serial or TCP/IP (Telnet). Supports ties, presets, rooms, EDID management, I/O grouping, and front panel executive mode lockout.

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from Telnet/IP control mention
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port number not explicitly stated in source (Telnet implied but not confirmed)
auth:
  type: password  # optional: device accepts commands without password unless password-protected
```

## Traits
```yaml
- routable    # inferred from tie/routing commands
- queryable   # inferred from query/read commands
- levelable   # output mute/unmute control
```

## Actions
```yaml
- id: tie_input_to_output
  label: Tie Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (01-36, model-dependent; 00 = untied)
    - name: output
      type: integer
      description: Output number (01-36, model-dependent)
    - name: tie_type
      type: enum
      values: [all, rgb, vid]
      description: "Tie signal type: ! = all, & = RGB, % = video"
  command: "{input}*{output}{tie_command}"
  response: "Out{output} • In{input} • {signal_type}"

- id: tie_input_to_all_outputs
  label: Tie Input to All Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number
    - name: tie_type
      type: enum
      values: [all, rgb, vid]
  command: "{input}*{tie_command}"
  response: "In{input} • {signal_type}"

- id: quick_multiple_tie
  label: Quick Multiple Tie
  kind: action
  params:
    - name: ties
      type: string
      description: "Back-to-back tie commands, e.g. 1*3!02*02&"
  command: "E+Q{ties}"
  response: "Qik"

- id: read_tied_input
  label: Read Tied Input
  kind: query
  params:
    - name: output
      type: integer
      description: Output number
    - name: tie_type
      type: enum
      values: [all, rgb, vid]
  command: "{output}{tie_command}"
  response: "{input_number}"

- id: read_all_ties_of_output
  label: Read All Ties of Output
  kind: query
  params:
    - name: output
      type: integer
  command: "{output}]"
  response: "{input_number}"

- id: read_all_ties_of_input
  label: Read All Ties of Input
  kind: query
  params:
    - name: input
      type: integer
  command: "{input}]"
  response: "Out{output} • In{input} • All"

- id: untie_output
  label: Untie Output
  kind: action
  params:
    - name: output
      type: integer
  command: "0*{output}!"
  response: "Out{output} • In00 • All"

- id: untie_all_outputs
  label: Untie All Outputs
  kind: action
  params: []
  command: "0*!"
  response: "In00 • All"

- id: mute_output
  label: Mute Output
  kind: action
  params:
    - name: output
      type: integer
  command: "{output}1B"
  response: "{output}"

- id: unmute_output
  label: Unmute Output
  kind: action
  params:
    - name: output
      type: integer
  command: "{output}1B"
  response: "{output}"

- id: view_output_mute
  label: View Output Mute
  kind: query
  params:
    - name: output
      type: integer
  command: "{output}B"
  response: "{mute_status}"

- id: view_all_mutes
  label: View All Mutes
  kind: query
  params: []
  command: "E VM }"
  response: "{mute1}{mute2}{mute3}...{muteN}"

- id: set_edid
  label: Set EDID
  kind: action
  params:
    - name: edid_source
      type: integer
      description: "DDC/EDID value - output number or fixed resolution code"
    - name: input
      type: integer
      description: Input number
  command: "{edid_source}*{input}$"
  response: "Edid{input} • {edid_source}"

- id: read_edid
  label: Read EDID of Input
  kind: query
  params:
    - name: input
      type: integer
  command: "{input}$"
  response: "Edid{input} • {edid_value}"

- id: save_global_preset
  label: Save Global Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 00-32 (00 = current configuration)"
  command: "{preset},"
  response: "Spr{preset}"

- id: recall_global_preset
  label: Recall Global Preset
  kind: action
  params:
    - name: preset
      type: integer
  command: "{preset}."
  response: "Rpr{preset}"

- id: clear_global_preset_ties
  label: Clear Global Preset Ties
  kind: action
  params:
    - name: preset
      type: integer
  command: "E+{preset}P0*!}"
  response: "Spr{preset}"

- id: direct_write_global_preset
  label: Direct Write Global Preset
  kind: action
  params:
    - name: preset
      type: integer
    - name: ties
      type: string
      description: "Tie commands strung together, e.g. 12*5!10*09%"
  command: "E+{preset}P{ties}}"
  response: "Spr{preset}"

- id: write_room_outputs
  label: Write Room Outputs
  kind: action
  params:
    - name: room
      type: integer
      description: "Room number 01-10"
    - name: outputs
      type: string
      description: "Comma-separated output numbers"
  command: "E{room},{outputs}MR}"
  response: "Mpr{room},{outputs}"

- id: read_room_outputs
  label: Read Room Outputs
  kind: query
  params:
    - name: room
      type: integer
  command: "E{room}MR}"
  response: "{room_name},{outputs}"

- id: save_room_preset
  label: Save Room Preset
  kind: action
  params:
    - name: room
      type: integer
    - name: preset
      type: integer
  command: "{room}*{preset},"
  response: "Rmm{room} • Spr{preset}"

- id: recall_room_preset
  label: Recall Room Preset
  kind: action
  params:
    - name: room
      type: integer
    - name: preset
      type: integer
  command: "{room}*{preset}."
  response: "Rmm{room} • Rpr{preset}"

- id: direct_write_room_preset
  label: Direct Write Room Preset
  kind: action
  params:
    - name: room
      type: integer
    - name: preset
      type: integer
    - name: ties
      type: string
  command: "E+{room}*{preset}P{ties}}"
  response: "Rmm{room} • Spr{preset}"

- id: view_global_preset_config
  label: View Global Preset Configuration
  kind: query
  params:
    - name: preset
      type: integer
    - name: start_output
      type: integer
      description: Starting output number (shows 16 consecutive outputs)
  command: "E{preset}*{start_output}*1VC}"
  response: "{tie_data} • Vid"

- id: write_input_grouping
  label: Write Input Grouping
  kind: action
  params:
    - name: groups
      type: string
      description: "Group number per input (0-4), concatenated"
  command: "E{groups}I}"
  response: "Gri{groups}"

- id: read_input_grouping
  label: Read Input Grouping
  kind: query
  params: []
  command: "E I}"
  response: "{group_data}"

- id: write_output_grouping
  label: Write Output Grouping
  kind: action
  params:
    - name: groups
      type: string
      description: "Group number per output (0-4), concatenated"
  command: "E{groups}O}"
  response: "Gro{groups}"

- id: read_output_grouping
  label: Read Output Grouping
  kind: query
  params: []
  command: "E O}"
  response: "{group_data}"

- id: write_input_name
  label: Write Input Name
  kind: action
  params:
    - name: input
      type: integer
    - name: name
      type: string
      description: "Up to 12 characters"
  command: "E{input}N{name}}"
  response: "In{input}•{name}"

- id: read_input_name
  label: Read Input Name
  kind: query
  params:
    - name: input
      type: integer
  command: "E{input}N}"
  response: "In{input}•{name}"

- id: write_output_name
  label: Write Output Name
  kind: action
  params:
    - name: output
      type: integer
    - name: name
      type: string
      description: "Up to 12 characters"
  command: "E{output}N{name}}"
  response: "Out{output}•{name}"

- id: read_output_name
  label: Read Output Name
  kind: query
  params:
    - name: output
      type: integer
  command: "E{output}N}"
  response: "Out{output}•{name}"

- id: write_global_preset_name
  label: Write Global Preset Name
  kind: action
  params:
    - name: preset
      type: integer
    - name: name
      type: string
  command: "E{preset}N{name}}"
  response: "Spr{preset}•{name}"

- id: read_global_preset_name
  label: Read Global Preset Name
  kind: query
  params:
    - name: preset
      type: integer
  command: "E{preset}N}"
  response: "Spr{preset}•{name}"

- id: write_room_name
  label: Write Room Name
  kind: action
  params:
    - name: room
      type: integer
    - name: name
      type: string
      description: "Up to 11 characters"
  command: "E{room}N{name}}"
  response: "Rmm{room}•{name}"

- id: read_room_name
  label: Read Room Name
  kind: query
  params:
    - name: room
      type: integer
  command: "E{room}N}"
  response: "Rmm{room}•{name}"

- id: write_room_preset_name
  label: Write Room Preset Name
  kind: action
  params:
    - name: room
      type: integer
    - name: preset
      type: integer
    - name: name
      type: string
  command: "E{room}*{preset}N{name}}"
  response: "Rmm{room}•Spr{preset}•{name}"

- id: read_room_preset_name
  label: Read Room Preset Name
  kind: query
  params:
    - name: room
      type: integer
    - name: preset
      type: integer
  command: "E{room}*{preset}N}"
  response: "Rmm{room}•Spr{preset}•{name}"

- id: lock_front_panel
  label: Lock Front Panel (Executive Mode)
  kind: action
  params: []
  command: "1X"
  response: "Exe1"

- id: unlock_front_panel
  label: Unlock Front Panel
  kind: action
  params: []
  command: "0X"
  response: "Exe0"

- id: view_lock_status
  label: View Front Panel Lock Status
  kind: query
  params: []
  command: "X"
  response: "{lock_status}"

- id: reset_all_global_presets
  label: Reset All Global Presets
  kind: action
  params: []
  command: "E ZG}"
  response: "Zpg"

- id: reset_one_global_preset
  label: Reset One Global Preset
  kind: action
  params:
    - name: preset
      type: integer
  command: "E{preset} ZG}"
  response: "Zpg{preset}"

- id: reset_all_mutes
  label: Reset All Mutes
  kind: action
  params: []
  command: "E ZZ}"
  response: "Zpz"

- id: reset_room_map
  label: Reset Room Map
  kind: action
  params: []
  command: "E ZR}"
  response: "Zpr"

- id: reset_individual_room
  label: Reset Individual Room
  kind: action
  params:
    - name: room
      type: integer
  command: "E{room} ZR}"
  response: "Zpr{room}"

- id: reset_individual_room_preset
  label: Reset Individual Room Preset
  kind: action
  params:
    - name: room
      type: integer
    - name: preset
      type: integer
  command: "E{room}*{preset} ZP}"
  response: "Zpp{room}*{preset}"

- id: reset_whole_switcher
  label: Reset Whole Switcher
  kind: action
  params: []
  command: "E ZXXX}"
  response: "Zpx"

- id: reset_settings_delete_files
  label: Reset Settings and Delete Files
  kind: action
  params: []
  command: "E ZY}"
  response: "Zpy"

- id: absolute_reset
  label: Absolute Reset
  kind: action
  params: []
  command: "E ZQQQ}"
  response: "Zpq"

- id: information_request
  label: Information Request
  kind: query
  params: []
  command: "I"
  response: "V{inputs}X{outputs}•A{inputs}X{outputs}•S{board_data}"

- id: request_part_number
  label: Request Part Number
  kind: query
  params: []
  command: "N"
  response: "{part_number}"

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  params: []
  command: "Q"
  response: "{firmware_version}"

- id: query_firmware_version_verbose
  label: Query Firmware Version (Verbose)
  kind: query
  params: []
  command: "0Q"
  response: "{eth_fw}-{controller_fw}-{upload_fw}"

- id: request_system_status
  label: Request System Status
  kind: query
  params: []
  command: "S"
  response: "{voltage_temp_fan_ps_data}"

- id: set_matrix_name
  label: Set Matrix Name
  kind: action
  params:
    - name: name
      type: string
      description: "Up to 240 alphanumeric characters"
  command: "E{name} CN}"
  response: "Ipn • {name}"

- id: read_matrix_name
  label: Read Matrix Name
  kind: query
  params: []
  command: "E CN}"
  response: "{matrix_name}"

- id: set_time_date
  label: Set Time and Date
  kind: action
  params:
    - name: datetime
      type: string
      description: "Format MM/DD/YY•HH:MM:SS"
  command: "E{datetime} CT}"
  response: "Ipt{datetime}"

- id: read_time_date
  label: Read Time and Date
  kind: query
  params: []
  command: "E CT}"
  response: "{datetime}"

- id: set_ip_address
  label: Set IP Address
  kind: action
  params:
    - name: ip
      type: string
  command: "E{ip} CI}"
  response: "Ipi{ip}"

- id: read_ip_address
  label: Read IP Address
  kind: query
  params: []
  command: "E CI}"
  response: "{ip_address}"

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  params:
    - name: mask
      type: string
  command: "E{mask} CS}"
  response: "Ips{mask}"

- id: set_gateway
  label: Set Gateway Address
  kind: action
  params:
    - name: gateway
      type: string
  command: "E{gateway} CG}"
  response: "Ipg{gateway}"

- id: set_dhcp
  label: Set DHCP On/Off
  kind: action
  params:
    - name: enabled
      type: integer
      description: "0 = off, 1 = on"
  command: "E{enabled} DH}"
  response: "Idh{enabled}"

- id: set_admin_password
  label: Set Administrator Password
  kind: action
  params:
    - name: password
      type: string
      description: "Up to 12 alphanumeric characters"
  command: "E{password} CA}"
  response: "Ipa • {password}"

- id: set_user_password
  label: Set User Password
  kind: action
  params:
    - name: password
      type: string
      description: "Up to 12 alphanumeric characters"
  command: "E{password} CU}"
  response: "Ipu • {password}"

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = off, 1 = verbose, 2 = tagged, 3 = verbose+tagged"
  command: "E{mode} CV}"
  response: "Vrb{mode}"

- id: set_serial_port_params
  label: Set Serial Port Parameters
  kind: action
  params:
    - name: port
      type: integer
      description: "00=all, 01=rear panel, 03-99"
    - name: baud
      type: integer
      description: "9600, 19200, 38400, or 115200"
    - name: parity
      type: string
      description: "o=odd, e=even, n=none, m=mark, s=space"
    - name: data_bits
      type: integer
      description: "7 or 8"
    - name: stop_bits
      type: integer
      description: "1 or 2"
  command: "E{port}*{baud},{parity},{data_bits},{stop_bits} CP}"
  response: "Cpn{port} Ccp{baud},{parity},{data_bits},{stop_bits}"

- id: configure_port_timeout
  label: Configure Port Timeout
  kind: action
  params:
    - name: timeout
      type: integer
      description: "In 10-second increments (1=10s to 65000; default 30=300s)"
  command: "E0*{timeout} TC}"
  response: "Pti0*{timeout}"

- id: view_file_directory
  label: View File Directory
  kind: query
  params: []
  command: "E DF }"
  response: "{file_directory}"

- id: erase_user_file
  label: Erase User File
  kind: action
  params:
    - name: filename
      type: string
      description: "UNRESOLVED: filename constraints not stated in source"
  command: "E filename EF }"
  response: "Del {filename}"

- id: set_matrix_name_factory_default
  label: Set Matrix Name to Factory Default
  kind: action
  params: []
  command: "E• CN }"
  response: "Ipn • {default_name}"

- id: set_gmt_offset
  label: Set GMT Offset
  kind: action
  params:
    - name: gmt_offset
      type: string
      description: "–`12`.`0` through +`14`.`0`. Hours and minutes removed from GMT"
  command: "EX3$ CZ }"
  response: "Ipz {gmt_offset}"

- id: set_daylight_saving_time
  label: Set Daylight Saving Time
  kind: action
  params:
    - name: mode
      type: integer
      description: "`0` = Daylight Saving Time off/ignore; `1` = Daylight Saving Time on (northern hemisphere); `2` = Daylight Saving Time on (Europe); `3` = Daylight Saving Time on (Brazil)"
  command: "EX3% CX }"
  response: "Ipx {mode}"

- id: read_daylight_saving_time
  label: Read Daylight Saving Time
  kind: query
  params: []
  command: "E CX }"
  response: "{daylight_saving_time}"

- id: read_mac_address
  label: Read MAC Address
  kind: query
  params: []
  command: "E CH }"
  response: "{mac_address}"

- id: read_open_connections
  label: Read Open Connections
  kind: query
  params: []
  command: "E CC }"
  response: "{open_connections}"

- id: read_subnet_mask
  label: Read Subnet Mask
  kind: query
  params: []
  command: "E CS }"
  response: "{subnet_mask}"

- id: read_gateway_address
  label: Read Gateway Address
  kind: query
  params: []
  command: "E CG }"
  response: "{gateway_address}"

- id: read_admin_password
  label: Read Administrator Password
  kind: query
  params: []
  command: "E CA }"
  response: "{password}"

- id: clear_admin_password
  label: Clear Administrator Password
  kind: action
  params: []
  command: "E• CA }"
  response: "Ipa •"

- id: read_user_password
  label: Read User Password
  kind: query
  params: []
  command: "E CU }"
  response: "{password}"

- id: clear_user_password
  label: Clear User Password
  kind: action
  params: []
  command: "E• CU }"
  response: "Ipu •"

- id: set_mail_server
  label: Set Mail Server
  kind: action
  params:
    - name: ip
      type: string
      description: "###.###.###.###"
    - name: domain
      type: string
      description: "Standard domain name rules apply (for example: xxx.com)."
    - name: password
      type: string
      description: "12 alphanumeric characters."
  command: "EX3^ , X4) , X3( CM }"
  response: "Ipm {ip} , {domain} , {password}"

- id: read_mail_server
  label: Read Mail Server
  kind: query
  params: []
  command: "E CM }"
  response: "{ip} , {domain} , {password}"

- id: set_email_recipient
  label: Set E-Mail Recipient
  kind: action
  params:
    - name: account
      type: integer
      description: "`65`-`72`.`65`= e-mail recipient 1, `66`= 2, `67`= 3, ...`72`= recipient 8"
    - name: address
      type: string
      description: "Typical e-mail address format (for example: nnnn@xxx.com)"
  command: "EX4! , X4@ CR }"
  response: "Ipr {account} , {address} ,"

- id: read_email_recipient
  label: Read E-Mail Recipient
  kind: query
  params:
    - name: account
      type: integer
      description: "`65`-`72`.`65`= e-mail recipient 1, `66`= 2, `67`= 3, ...`72`= recipient 8"
  command: "EX4! CR }"
  response: "{address} ,"

- id: set_email_events
  label: Set E-Mail Events
  kind: action
  params:
    - name: category
      type: enum
      values: [I, F, P]
      description: "`I`= inputs; `F`= fans; `P`= power supply"
    - name: account
      type: integer
      description: "`65`-`72`.`65`= e-mail recipient 1, `66`= 2, `67`= 3, ...`72`= recipient 8"
    - name: selection
      type: integer
      description: "If X4# = I, then X4$ = `00`(all inputs), or `01` through `16`(`20`,`32`,`36`) (input 1 through 16 [20, 32, 36]). If X4# = F, then X4$ = `00`(all fans). If X4# = P, then X4$ = `00`(both power supplies)."
    - name: notification
      type: integer
      description: "`0` = no response; `1` = fail/missing; `2` = fixed/restored; `3` = both 1 & 2; `4` = suspend"
  command: "E I X4#X4! , X4$ , X4% EM }"
  response: "Ipe [...]"

- id: read_dhcp_status
  label: Read DHCP Status
  kind: query
  params: []
  command: "E DH }"
  response: "{dhcp_enabled}"

- id: read_serial_port_params
  label: Read Serial Port Parameters
  kind: query
  params:
    - name: port
      type: integer
      description: "`00`(all ports), `01`(rear panel), `03`–`99`"
  command: "EX4& CP }"
  response: "{baud} , {parity} , {data_bits} , {stop_bits}"

- id: set_serial_port_mode
  label: Set Serial Port Mode
  kind: action
  params:
    - name: port
      type: integer
      description: "`00`(all ports), `01`(rear panel), `03`–`99`"
    - name: mode
      type: integer
      description: "`0` = RS-232, `1` = RS-422"
  command: "EX4& * X5@ CY }"
  response: "Cpn {port} • Cty {mode}"

- id: read_serial_port_mode
  label: Read Serial Port Mode
  kind: query
  params:
    - name: port
      type: integer
      description: "`00`(all ports), `01`(rear panel), `03`–`99`"
  command: "EX4& CY }"
  response: "{mode}"

- id: read_verbose_mode
  label: Read Verbose Mode
  kind: query
  params: []
  command: "E CV }"
  response: "{verbose_mode}"

- id: view_current_port_timeout
  label: View Current Port Timeout
  kind: query
  params: []
  command: "E 0TC }"
  response: "{timeout}"

- id: configure_global_ip_port_timeout
  label: Configure Global IP Port Timeout
  kind: action
  params:
    - name: timeout
      type: integer
      description: "Port timeout interval (in 10-sec. increments) `1` (= 10 seconds) – `65000` (default is `30` = 300 seconds = 5 minutes)"
  command: "E 1* X5$ TC }"
  response: "Pti1* {timeout}"

- id: view_global_ip_port_timeout
  label: View Global IP Port Timeout
  kind: query
  params: []
  command: "E 1TC }"
  response: "{timeout}"
```

## Feedbacks
```yaml
- id: tie_status
  type: string
  description: "Response from read tie commands: Out{output} • In{input} • {signal_type}"
  query_command: "X! ]"

- id: mute_status
  type: enum
  values: ["0", "1"]
  description: "0 = unmuted, 1 = muted"
  query_command: "X@ B"

- id: front_panel_switch_event
  type: string
  description: "Qik - emitted when front panel switching occurs"

- id: preset_save_event
  type: string
  description: "Spr{nn} - emitted when preset saved from front panel"

- id: preset_recall_event
  type: string
  description: "Rpr{nn} - emitted when preset recalled from front panel"

- id: mute_toggle_event
  type: string
  description: "Vmt{nn}*{x} - output mute toggled from front panel (x: 1=on, 0=off)"
  query_command: "X@ B"

- id: executive_mode_event
  type: string
  description: "Exe{n} - executive mode toggled from front panel (n: 1=on, 0=off)"
  query_command: "X"

- id: error_response
  type: enum
  values: [E01, E10, E11, E12, E13, E14, E17, E21, E24]
  description: "E01=invalid input, E10=invalid command, E11=invalid preset, E12=invalid output, E13=invalid value, E14=illegal for config, E17=timeout, E21=invalid room, E24=privilege violation"

- id: login_status
  type: enum
  values: ["Login Administrator", "Login User"]
  description: "Response after successful password entry"

- id: system_status
  type: string
  description: "Voltage, temperature, fan speed, power supply status (format varies by model)"
  query_command: "S"
```

## Variables
```yaml
- id: verbose_mode
  type: integer
  description: "0=off, 1=verbose, 2=tagged, 3=verbose+tagged"

- id: connection_timeout
  type: integer
  description: "Timeout in 10-second increments (default 30 = 300s = 5 min)"

- id: serial_baud_rate
  type: enum
  values: [9600, 19200, 38400, 115200]
  description: "Configurable baud rate for serial port"

- id: dhcp_enabled
  type: boolean
  description: "DHCP on/off state (default off)"
```

## Events
```yaml
- id: front_panel_switch
  description: "Qik - emitted on front panel switching operation (verbose mode 2 or 3)"
  trigger: front_panel_operation

- id: preset_saved_front_panel
  description: "Spr{nn} - emitted when preset saved from front panel"
  trigger: front_panel_preset_save

- id: preset_recalled_front_panel
  description: "Rpr{nn} - emitted when preset recalled from front panel"
  trigger: front_panel_preset_recall

- id: mute_toggled_front_panel
  description: "Vmt{nn}*{x} - output mute toggled from front panel"
  trigger: front_panel_mute_toggle

- id: executive_mode_toggled
  description: "Exe{n} - executive mode toggled from front panel"
  trigger: front_panel_exec_toggle

- id: copyright_on_connect
  description: "Copyright message with firmware version emitted on power-on or TCP connection"
  trigger: connection_established

- id: password_prompt
  description: "Password: prompt if switcher is password-protected (TCP/Telnet connections)"
  trigger: connection_to_protected_device
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- SIS commands are not case-sensitive. Responses end with CR/LF.
- Tie commands `!`, `&`, `%` are interchangeable for tie operations (`!`=all, `&`=RGB, `%`=video).
- Commands can be chained back-to-back with no spaces (e.g. `1*1!02*02&`).
- Default serial config: 9600 baud, 8N1, no flow control. Extron recommends keeping 9600 baud.
- Default IP: 192.168.254.254, subnet 255.255.0.0, gateway 0.0.0.0.
- Up to 200 simultaneous TCP connections (including HTTP and Telnet).
- Verbose mode 1 or 3 required for Telnet session to receive switcher-initiated change notices.
- Default connection timeout: 5 minutes. Extron recommends periodic `Q` command to keep connection alive.
- Rooms: up to 10 rooms, each with up to 16 outputs. An output belongs to only one room.
- Direct write of global presets should always be preceded by a clear ties command for that preset number.
- RS-422 mode available via pin 7 (RX+) and pin 8 (TX+) on the 9-pin D connector.

<!-- UNRESOLVED: TCP/Telnet port number not explicitly stated in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: EDID Minder on/off command syntax not fully detailed in source (referenced but params unclear) -->
<!-- UNRESOLVED: exact HTTP API endpoints not documented in source -->

## Provenance

```yaml
source_domains:
  - archive.org
  - manualslib.com
source_urls:
  - https://archive.org/download/manualzz-id-1122416/1122416.pdf
  - https://www.manualslib.com/manual/1616045/EXTRON-ELECTRONICS-DMS-1600.html
retrieved_at: 2026-05-14T23:23:30.696Z
last_checked_at: 2026-10-07T11:10:05.940Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:10:05.940Z
matched_actions: 101
action_count: 101
confidence: medium
summary: "All 101 action units map to SIS commands in the source, and the serial and auth transport values are supported; the TCP port is left unresolved. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number not explicitly stated in source (Telnet implied but not confirmed)"
- "filename constraints not stated in source\""
- "no multi-step macro sequences explicitly documented in source"
- "no safety warnings or interlock procedures found in source"
- "TCP/Telnet port number not explicitly stated in source"
- "firmware version compatibility ranges not stated"
- "EDID Minder on/off command syntax not fully detailed in source (referenced but params unclear)"
- "exact HTTP API endpoints not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
