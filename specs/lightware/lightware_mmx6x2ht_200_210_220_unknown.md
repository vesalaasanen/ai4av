---
spec_id: admin/lightware-mmx6x2ht-200-210-220
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware MMX6x2-HT200/210/220 Control Spec"
manufacturer: Lightware
model_family: MMX6x2-HT200
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - MMX6x2-HT200
    - MMX6x2-HT210
    - MMX6x2-HT220
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.prod.pim.lightware.com
  - manualslib.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/MMX6x2-HT_series_UserManual.pdf
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/HTML/MMX6x2-HT_series/UM.html
  - https://www.manualslib.com/manual/1189332/Lightware-Mmx6x2-Ht200.html
retrieved_at: 2026-05-14T20:19:00.560Z
last_checked_at: 2026-09-12T22:18:31.455Z
generated_at: 2026-09-12T22:18:31.455Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "preset run/save/delete protocol commands are referenced (\"presets can be run... by sending protocol commands, too\") but the actual commands are not documented in this source"
  - "HTTP interface exists (factory default TCP port 80, \"built-in website\") but no HTTP API commands are documented"
  - "LW3 Event Manager configuration commands referenced but not detailed in this source"
  - "HTTP API base URL / paths not documented in source"
  - "flow control not stated in source"
  - "no additional settable variables outside the Actions section are documented in source."
  - "the specific LW3 commands for configuring Event Manager entries are not documented in this source"
  - "no explicit multi-step protocol macro sequences documented in source."
  - "firmware version compatibility range not stated in source (released packages: v1.1.0b1, v1.1.4b3, v1.1.5b11, v1.2.0b2)"
  - "HTTP control API (port 80) exists but no endpoints documented in source"
  - "LW3 preset run/save/delete protocol commands referenced but not documented"
  - "LW3 Event Manager configuration command syntax not documented"
  - "serial flow control not stated in source"
  - "LW2 {RS232_LINK_FORMAT=?} query form not explicitly given in source"
verification:
  verdict: verified
  checked_at: 2026-09-12T22:18:31.455Z
  matched_actions: 130
  action_count: 130
  confidence: medium
  summary: "All 130 spec actions have wire-literal tokens that appear verbatim in the source's LW2 and LW3 command catalogues; transport values match. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Lightware MMX6x2-HT200/210/220 Control Spec

## Summary
The Lightware MMX6x2-HT series (HT200/HT210/HT220) is a 6-input, 2-output HDMI/TPS (HDBaseT) matrix switcher with mirrored HDMI+TPS output pairs (4 video outputs in the crosspoint), analog audio breakout, EDID management, and HDCP control. This spec covers the two documented control protocols: LW2 (ASCII commands in curly brackets sent RAW over TCP port 10001, responses in round brackets) and LW3 (case-sensitive ASCII tree protocol over TCP port 6107), plus the local RS-232 control port (Phoenix connector, factory default 57600 8N1, LW2).

<!-- UNRESOLVED: preset run/save/delete protocol commands are referenced ("presets can be run... by sending protocol commands, too") but the actual commands are not documented in this source -->
<!-- UNRESOLVED: HTTP interface exists (factory default TCP port 80, "built-in website") but no HTTP API commands are documented -->
<!-- UNRESOLVED: LW3 Event Manager configuration commands referenced but not detailed in this source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 10001  # LW2 protocol default TCP port; LW3 protocol default TCP port is 6107; HTTP default port 80 (all stated as factory defaults in source)
  base_url: null  # UNRESOLVED: HTTP API base URL / paths not documented in source
serial:
  baud_rate: 57600  # factory default; supported values 4800/7200/9600/14400/19200/38400/57600/115200
  data_bits: 8  # factory default; 8 or 9 supported
  parity: none  # factory default; none/odd/even supported
  stop_bits: 1  # factory default; 1/1.5/2 supported
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - routable  # inferred from crosspoint switch commands (LW2 {<in>@<out>}, LW3 XP:switch)
  - queryable  # inferred from status query commands (VC, getsize, SourcePortStatus, etc.)
  - levelable  # inferred from volume/gain/balance commands on analog audio ports
```

## Actions
```yaml
# ==================== LW2 protocol (raw TCP 10001; commands in { }, responses in ( ) ) ====================
# LW2 commands are converted to uppercase by the device; responses may contain upper and lower case.

# --- General LW2 commands ---
- id: lw2_get_product_type
  label: Viewing Product Type
  kind: query
  command: '{I}'
  params: []
- id: lw2_get_serial_number
  label: Viewing Serial Number
  kind: query
  command: '{s}'
  params: []
- id: lw2_query_control_protocol
  label: Querying Control Protocol
  kind: query
  command: '{P_?}'
  params: []
- id: lw2_get_cpu_firmware
  label: Viewing Firmware Version of the CPU
  kind: query
  command: '{f}'
  params: []
- id: lw2_ping
  label: Connection Test
  kind: query
  command: '{PING}'
  params: []
- id: lw2_get_compile_time
  label: Compile Time
  kind: query
  command: '{CT}'
  params: []
- id: lw2_get_boards
  label: Viewing Installed Board(s)
  kind: query
  command: '{is}'
  params: []
- id: lw2_get_controller_firmware
  label: Viewing Firmware for all Controllers
  kind: query
  command: '{FC}'
  params: []
- id: lw2_restart
  label: Restarting the Matrix Router
  kind: action
  command: '{RST}'
  params: []
- id: lw2_get_health_status
  label: Querying Health Status
  kind: query
  command: '{ST}'
  params: []
- id: lw2_factory_reset
  label: Restoring Factory Default Settings
  kind: action
  command: '{FACTORY=ALL}'
  params: []
- id: lw2_list_commands
  label: Listing All Commands
  kind: query
  command: '{LCMD}'
  params: []

# --- LW2 Port and Crosspoint Settings ---
- id: lw2_switch_input_to_output
  label: Switching One Input to One Output
  kind: action
  command: '{<in>@<out>}'
  params:
    - name: in
      type: integer
      description: 'Input number in 1- or 2-digit ASCII format (01, 5, 07, 16); video inputs 1-6; 0 = disconnect'
    - name: out
      type: integer
      description: 'Output number in 1- or 2-digit ASCII format; video outputs 1-4'
- id: lw2_switch_input_to_all_outputs
  label: Switching One Input to All Outputs
  kind: action
  command: '{<in>@O}'
  params:
    - name: in
      type: integer
      description: 'Input number in 1- or 2-digit ASCII format (1-6)'
- id: lw2_disconnect_output
  label: Disconnecting an Input
  kind: action
  command: '{0@<out>}'
  params:
    - name: out
      type: integer
      description: 'Output number; using 0 as input disconnects, no signal appears on the output'
- id: lw2_mute_output
  label: Muting Specified Output
  kind: action
  command: '{#<out>}'
  params:
    - name: out
      type: integer
      description: 'Output number; muting does not change crosspoint state, only disables the output'
- id: lw2_unmute_output
  label: Unmuting Specified Output
  kind: action
  command: '{+<out>}'
  params:
    - name: out
      type: integer
      description: 'Output number; unmuting restores previous connection'
- id: lw2_lock_output
  label: Locking the Output
  kind: action
  command: '{#><out>}'
  params:
    - name: out
      type: integer
      description: 'Output number; locked output state cannot be changed until unlocking'
- id: lw2_unlock_output
  label: Unlocking the Output
  kind: action
  command: '{+<<out>}'
  params:
    - name: out
      type: integer
      description: 'Output number'
- id: lw2_get_connection_state
  label: Viewing Connection State on the Output
  kind: query
  command: '{VC}'
  params: []
- id: lw2_get_crosspoint_size
  label: Viewing Crosspoint Size
  kind: query
  command: '{getsize}'
  params: []
- id: lw2_batch_switch
  label: Batch Switching Outputs
  kind: action
  command: '{<in>@<out>}{<in>@<out>}'
  params:
    - name: commands
      type: string
      description: 'Concatenated switch commands; delay between two } characters must be below 10 ms, no other command or junk character between them, affected outputs must not be locked'
- id: lw2_set_autoselect
  label: Changing the Autoselect Mode
  kind: action
  command: '{AS_V<out>=<state>;<mode>}'
  params:
    - name: out
      type: integer
      description: 'Output port number'
    - name: state
      type: enum
      description: 'E = enabled, D = disabled'
    - name: mode
      type: enum
      description: 'F = First detect, P = Priority detect, L = Last detect'
- id: lw2_query_autoselect
  label: Querying the Autoselect Mode
  kind: query
  command: '{AS_V<out>=?}'
  params:
    - name: out
      type: integer
      description: 'Output port number'
- id: lw2_set_input_priorities
  label: Changing the Video Input Priorities
  kind: action
  command: '{PRIO_V<out>=<in1_prio>;<in2_prio>;...;<inn_prio>}'
  params:
    - name: out
      type: integer
      description: 'The output port number (V1/V3 and V2/V4 are common)'
    - name: priorities
      type: string
      description: 'Priority number per input, semicolon-separated; all ports must be set or the change is not executed'

# --- LW2 Network Configuration ---
- id: lw2_get_ip_status
  label: Querying the Current IP Status
  kind: query
  command: '{IP_STAT=?}'
  params: []
- id: lw2_get_ip_address
  label: Querying the IP Address
  kind: query
  command: '{IP_ADDRESS=?}'
  params: []
- id: lw2_set_ip_address
  label: Setting the IP Address
  kind: action
  command: '{IP_ADDRESS=<type>;<ip_address>}'
  params:
    - name: type
      type: enum
      description: '0 = static, 1 = DHCP'
    - name: ip_address
      type: string
      description: 'IP address, four decimal octets separated by dots'
- id: lw2_get_netmask
  label: Querying the Subnet Mask
  kind: query
  command: '{IP_NETMASK=?}'
  params: []
- id: lw2_set_netmask
  label: Setting the Subnet Mask
  kind: action
  command: '{IP_NETMASK=<subnet_mask>}'
  params:
    - name: subnet_mask
      type: string
      description: 'Subnet mask, four decimal octets separated by dots'
- id: lw2_get_gateway
  label: Querying the Gateway Address
  kind: query
  command: '{IP_GATEWAY=?}'
  params: []
- id: lw2_set_gateway
  label: Setting the Gateway Address
  kind: action
  command: '{IP_GATEWAY=<gateway_addr>}'
  params:
    - name: gateway_addr
      type: string
      description: 'Gateway address, four decimal octets separated by dots'
- id: lw2_apply_network
  label: Applying the Network Settings
  kind: action
  command: '{IP_APPLY}'
  params: []
- id: lw2_get_lw2_port
  label: Querying the LW2 TCP/IP Port
  kind: query
  command: '{LW2_PORT=?}'
  params: []
- id: lw2_set_lw2_port
  label: Setting the LW2 TCP/IP Port
  kind: action
  command: '{LW2_PORT=<port_nr>}'
  params:
    - name: port_nr
      type: integer
      description: 'TCP port number (default 10001)'
- id: lw2_get_lw3_port
  label: Querying the LW3 TCP/IP Port
  kind: query
  command: '{LW3_PORT=?}'
  params: []
- id: lw2_set_lw3_port
  label: Setting the LW3 TCP/IP Port
  kind: action
  command: '{LW3_PORT=<port_nr>}'
  params:
    - name: port_nr
      type: integer
      description: 'TCP port number (default 6107)'
- id: lw2_get_eth_enable
  label: Querying the Status of Ethernet Ports
  kind: query
  command: '{ETH_ENABLE=?}'
  params: []
- id: lw2_set_eth_enable
  label: Setting the Status of Ethernet Ports
  kind: action
  command: '{ETH_ENABLE=<cpu>;<ctrl_tps_link>;<ctrl_lan>;<tps_eth>;<tpsin1_eth>;<tpsin2_eth>;<tpsout1_eth>;<tpsout2_eth>}'
  params:
    - name: ports
      type: string
      description: 'Eight 0/1 values (cpu; ctrl_tps_link; ctrl_lan; tps_eth; tpsin1_eth; tpsin2_eth; tpsout1_eth; tpsout2_eth); all ports must be defined'

# --- LW2 Serial Port Configuration ---
- id: lw2_set_rs232_mode
  label: Serial Port Format Setting / Control Mode (Link port)
  kind: action
  command: '{RS232=<mode>}'
  params:
    - name: mode
      type: enum
      description: 'PASS = pass-through, CONTROL = control mode, CI = command injection. Source DIFFERENCE note: available for MMX4x2-HT200 model only (verbatim)'
- id: lw2_get_rs232_mode
  label: Querying RS-232 Mode (Link port)
  kind: query
  command: '{RS232=?}'
  params: []
- id: lw2_set_rs232_local_format
  label: Serial Port Format Setting (Local port)
  kind: action
  command: '{RS232_LOCAL_FORMAT=<baud_rate>;<data_bit>;<parity>;<stop_bit>}'
  params:
    - name: baud_rate
      type: enum
      description: '4800; 7200; 9600; 14400; 19200; 38400; 57600; 115200 (optional; X = skip)'
    - name: data_bit
      type: enum
      description: '8; 9 (optional; X = skip)'
    - name: parity
      type: enum
      description: 'N; E; O (optional; X = skip)'
    - name: stop_bit
      type: enum
      description: '1; 1.5; 2 (optional; X = skip)'
- id: lw2_get_rs232_local_format
  label: Querying Local Serial Port Format
  kind: query
  command: '{RS232_LOCAL_FORMAT=?}'
  params: []
- id: lw2_set_rs232_link_format
  label: Serial Port Format Setting (Link port)
  kind: action
  command: '{RS232_LINK_FORMAT=<baud_rate>;<data_bit>;<parity>;<stop_bit>}'
  params:
    - name: baud_rate
      type: enum
      description: '4800-115200; X = skip'
    - name: data_bit
      type: enum
      description: '8; 9; X = skip'
    - name: parity
      type: enum
      description: 'N; E; O; X = skip'
    - name: stop_bit
      type: enum
      description: '1; 1.5; 2; X = skip'
- id: lw2_set_rs232_local_protocol
  label: Serial Port Protocol Setting (Local port)
  kind: action
  command: '{RS232_LOCAL_PROT=<protocol>}'
  params:
    - name: protocol
      type: enum
      description: 'LW2 = Lightware 2 Protocol, LW3 = Lightware 3 Protocol'
- id: lw2_get_rs232_local_protocol
  label: Querying Local Serial Port Protocol
  kind: query
  command: '{RS232_LOCAL_PROT=?}'
  params: []
- id: lw2_set_rs232_link_protocol
  label: Serial Port Protocol Setting (Link port)
  kind: action
  command: '{RS232_LINK_PROT=<protocol>}'
  params:
    - name: protocol
      type: enum
      description: 'LW2 or LW3. Source DIFFERENCE note: available for MMX4x2-HT200 model only (verbatim)'

# ==================== LW3 protocol (raw TCP 6107; ASCII tree, CrLf terminated, case-sensitive, max 800 bytes/line) ====================

# --- LW3 protocol-level primitives ---
- id: lw3_get
  label: GET Command
  kind: query
  command: 'GET <node_path>'
  params:
    - name: node_path
      type: string
      description: 'Node path; use dot (.) to address a property, e.g. GET /.SerialNumber'
- id: lw3_getall
  label: GETALL Command
  kind: query
  command: 'GETALL <node_path>'
  params:
    - name: node_path
      type: string
      description: 'Returns all child nodes, properties and methods of a node'
- id: lw3_set
  label: SET Command
  kind: action
  command: 'SET <property_path>=<value>'
  params:
    - name: property_path
      type: string
      description: 'Property path with dot notation'
    - name: value
      type: string
      description: 'Value to set'
- id: lw3_call
  label: CALL Command
  kind: action
  command: 'CALL <method_path>(<parameters>)'
  params:
    - name: method_path
      type: string
      description: 'Method path with colon notation'
    - name: parameters
      type: string
      description: 'Method parameters'
- id: lw3_man
  label: MAN Command
  kind: query
  command: 'MAN <node_path>'
  params:
    - name: node_path
      type: string
      description: 'Returns the manual (short description) of the node/property/method'
- id: lw3_subscribe
  label: Subscribe to a Node
  kind: action
  command: 'OPEN <node_path>'
  params:
    - name: node_path
      type: string
      description: 'Node to subscribe; wildcard * subscribes to multiple nodes'
- id: lw3_unsubscribe
  label: Unsubscribe from a Node
  kind: action
  command: 'CLOSE <node_path>'
  params:
    - name: node_path
      type: string
      description: 'Node to unsubscribe; wildcard * for multiple nodes'

# --- LW3 System Commands ---
- id: lw3_get_product_name
  label: Querying the Product Name
  kind: query
  command: 'GET /.ProductName'
  params: []
- id: lw3_set_device_label
  label: Setting the Device Label
  kind: action
  command: 'SET /MANAGEMENT/UID.DeviceLabel=<custom_name>'
  params:
    - name: custom_name
      type: string
      description: 'Max 39 ASCII characters, longer names truncated; default format LW_<product_name>_<serial_no>'
- id: lw3_get_serial_number
  label: Querying the Serial Number
  kind: query
  command: 'GET /.SerialNumber'
  params: []
- id: lw3_set_lcd_backlight
  label: Setting the Background Light of the LCD Screen
  kind: action
  command: 'SET /MANAGEMENT/UI.LcdMenuBackLightMode=<parameter>'
  params:
    - name: parameter
      type: enum
      description: '0 = Off, 1 = On'
- id: lw3_lcd_message
  label: Setting the Displayed Text on the LCD Screen
  kind: action
  command: 'CALL /MANAGEMENT/UI:LcdMenuMessage(<time>;<1stline_text>;<2ndline_text>)'
  params:
    - name: time
      type: integer
      description: 'Display time; 100 means 1 second'
    - name: line1_text
      type: string
      description: 'Max 19 ASCII characters'
    - name: line2_text
      type: string
      description: 'Max 19 ASCII characters'
- id: lw3_identify
  label: Identifying the Device
  kind: action
  command: 'CALL /MANAGEMENT/UI:identifyMe()'
  params: []
- id: lw3_reset
  label: Resetting the Matrix
  kind: action
  command: 'CALL /SYS:Reset()'
  params: []
- id: lw3_factory_defaults
  label: Restoring the Factory Default Settings
  kind: action
  command: 'CALL /SYS:factoryDefaults()'
  params: []

# --- LW3 Video Port and Crosspoint Settings ---
- id: lw3_get_source_port_status
  label: Querying the Status of Source Port
  kind: query
  command: 'GET /MEDIA/VIDEO/XP.SourcePortStatus'
  params: []
- id: lw3_get_destination_port_status
  label: Querying the Status of Destination Port
  kind: query
  command: 'GET /MEDIA/XP/VIDEO.DestinationPortStatus'
  params: []
- id: lw3_get_crosspoint
  label: Querying the Video Crosspoint Setting
  kind: query
  command: 'GET /MEDIA/VIDEO/XP.DestinationConnectionList'
  params: []
- id: lw3_switch
  label: Switching Video Input
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:switch(<in>:<out>)'
  params:
    - name: in
      type: string
      description: 'Input port I1-I6; 0 = disconnect'
    - name: out
      type: string
      description: 'Output port O1-O4'
- id: lw3_switch_all
  label: Switching an Input to All Outputs
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:switchAll(<in>)'
  params:
    - name: in
      type: string
      description: 'Input port I1-I6; 0 disconnects all outputs'
- id: lw3_disconnect_output
  label: Disconnecting a Video Input
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:switch(0:<out>)'
  params:
    - name: out
      type: string
      description: 'Output port O1-O4'
- id: lw3_disconnect_all
  label: Disconnecting an Input from All Outputs
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:switchAll(0)'
  params: []
- id: lw3_set_input_hdcp
  label: Setting the HDCP (Input Port)
  kind: action
  command: 'SET /MEDIA/VIDEO/<In>.HdcpEnable=<logical_value>'
  params:
    - name: in
      type: string
      description: 'Input port I1-I6'
    - name: logical_value
      type: enum
      description: 'true = HDCP capability enabled, false = disabled'
- id: lw3_set_output_hdcp
  label: Setting the HDCP (Output Port)
  kind: action
  command: 'SET /MEDIA/VIDEO/<out>.HdcpModeSetting=<parameter>'
  params:
    - name: out
      type: string
      description: 'Output port O1-O4'
    - name: parameter
      type: enum
      description: '0 = Auto, 1 = Always'
- id: lw3_get_autoselect
  label: Querying the Video Autoselect Settings
  kind: query
  command: 'GET /MEDIA/VIDEO/XP.DestinationPortAutoselect'
  params: []
- id: lw3_set_autoselect
  label: Changing the Autoselect Mode
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:setDestinationPortAutoselect(<On>:<On_set>)'
  params:
    - name: on
      type: string
      description: 'Output port e.g. O1'
    - name: on_set
      type: enum
      description: 'Two-letter code: 1st letter E (enabled) / D (disabled); 2nd letter F (First detect) / P (Priority detect) / L (Last detect), e.g. EF'
- id: lw3_get_port_priority
  label: Querying the Input Port Priority
  kind: query
  command: 'GET /MEDIA/VIDEO/XP.PortPriorityList'
  params: []
- id: lw3_set_port_priority
  label: Changing the Input Port Priority
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:setAutoselectionPriority(<in>(<out>):<prio>)'
  params:
    - name: expression
      type: string
      description: 'Port(priority):value pairs, semicolon-separated, e.g. I1(O1):31;I2(O1):1; prio 0 (highest) to 31 (31 = port skipped)'
- id: lw3_mute_source
  label: Muting the Input Port
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:muteSource(<in>)'
  params:
    - name: in
      type: string
      description: 'Input port I1-I6'
- id: lw3_unmute_source
  label: Unmuting the Input Port
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:unmuteSource(<in>)'
  params:
    - name: in
      type: string
      description: 'Input port I1-I6'
- id: lw3_lock_source
  label: Locking the Input Port
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:lockSource(<in>)'
  params:
    - name: in
      type: string
      description: 'Input port I1-I6'
- id: lw3_unlock_source
  label: Unlocking the Input Port
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:unlockSource(<in>)'
  params:
    - name: in
      type: string
      description: 'Input port I1-I6'
- id: lw3_mute_destination
  label: Muting the Output Port
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:muteDestination(<out>)'
  params:
    - name: out
      type: string
      description: 'Output port O1-O4'
- id: lw3_unmute_destination
  label: Unmuting the Output Port
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:unmuteDestination(<out>)'
  params:
    - name: out
      type: string
      description: 'Output port O1-O4'
- id: lw3_lock_destination
  label: Locking the Output Port
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:lockDestination(<out>)'
  params:
    - name: out
      type: string
      description: 'Output port O1-O4'
- id: lw3_unlock_destination
  label: Unlocking the Output Port
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:unlockDestination(<out>)'
  params:
    - name: out
      type: string
      description: 'Output port O1-O4'
- id: lw3_set_tpg_mode
  label: Test Pattern Generator - Mode
  kind: action
  command: 'SET /MEDIA/VIDEO/<out>.TpgMode=<mode>'
  params:
    - name: out
      type: string
      description: 'Output port O1-O4'
    - name: mode
      type: enum
      description: '0 = off, 1 = pattern if no video received, 2 = pattern always'
- id: lw3_set_tpg_clock
  label: Test Pattern Generator - Clock Source
  kind: action
  command: 'SET /MEDIA/VIDEO/<On>.TpgClockSource=<clock_source>'
  params:
    - name: on
      type: string
      description: 'Output port (identifier verbatim from source)'
    - name: clock_source
      type: enum
      description: '480 = 480p, 576 = 576p, EXT = external clock (from actual TMDS source)'
- id: lw3_set_tpg_pattern
  label: Test Pattern Generator - Pattern setting
  kind: action
  command: 'SET /MEDIA/VIDEO/<On>.TpgPattern=<pattern>'
  params:
    - name: on
      type: string
      description: 'Output port (identifier verbatim from source)'
    - name: pattern
      type: enum
      description: 'RED / GREEN / BLUE / BLACK / WHITE / RAMP / CHESS / BAR / CYCLE (cycle changes patterns approx. every 2 seconds)'
- id: lw3_get_tps_mode
  label: Querying the Current TPS Mode
  kind: query
  command: 'GET /REMOTE/<source>|<destination>.tpsMode'
  params:
    - name: source
      type: enum
      description: 'TPS input port S1 (TPS in 1) or S2 (TPS in 2)'
    - name: destination
      type: enum
      description: 'TPS output port D1 (TPS out 1) or D2 (TPS out 2)'
- id: lw3_set_tps_mode
  label: Setting the TPS Mode on TPS Ports
  kind: action
  command: 'SET /REMOTE/<source>|<destination>.tpsModeSetting=<TPS_mode>'
  params:
    - name: source
      type: enum
      description: 'TPS input port S1 or S2'
    - name: destination
      type: enum
      description: 'TPS output port D1 or D2'
    - name: tps_mode
      type: enum
      description: 'A = Auto, H = HDBaseT, L = Longreach, 1 = LPPF1, 2 = LPPF2'
- id: lw3_set_hdmi_mode
  label: Setting the HDMI Mode (Output Ports)
  kind: action
  command: 'SET /MEDIA/VIDEO/<out>.HdmiModeSetting=<HDMI_mode>'
  params:
    - name: out
      type: string
      description: 'Output port O1-O4'
    - name: hdmi_mode
      type: enum
      description: '0 = Auto, 1 = DVI, 2 = HDMI'

# --- LW3 Audio Port Settings ---
- id: lw3_set_audio_mode
  label: Selecting the Signal Source (Audio Mode)
  kind: action
  command: 'SET /MEDIA/VIDEO/<in>|<out>.AudioMode=<audio_mode>'
  params:
    - name: port
      type: string
      description: 'Input port I1-I6 or output port O1-O4'
    - name: audio_mode
      type: enum
      description: '0 = Embedded, 1 = AUX1, 2 = AUX2, 3 = AUX3, 4 = AUX4'
- id: lw3_set_input_volume
  label: Setting the Analog Audio Input Level - Volume
  kind: action
  command: 'SET /MEDIA/AUDIO/<in>.Volume=<volume>'
  params:
    - name: in
      type: string
      description: 'Analog audio input port I7-I10'
    - name: volume
      type: number
      description: 'Input volume (attenuation) between -95.625 dB and 0 dB in steps of 0.375 dB; value rounded up to match step'
- id: lw3_set_input_balance
  label: Setting the Analog Audio Input Level - Balance
  kind: action
  command: 'SET /MEDIA/AUDIO/<in>.Balance=<balance>'
  params:
    - name: in
      type: string
      description: 'Analog audio input port I7-I10'
    - name: balance
      type: integer
      description: '0 = left, 100 = right, step 1, center 50 (default)'
- id: lw3_set_input_gain
  label: Setting the Analog Audio Input Level - Gain
  kind: action
  command: 'SET /MEDIA/AUDIO/<in>.Gain=<gain>'
  params:
    - name: in
      type: string
      description: 'Analog audio input port I7-I10'
    - name: gain
      type: number
      description: 'Input gain 0-21 dB in steps of 0.75 dB; value rounded down to match step'
- id: lw3_set_output_volume
  label: Setting the Analog Audio Output Level - Volume
  kind: action
  command: 'SET /MEDIA/AUDIO/<out>.Volume=<volume>'
  params:
    - name: out
      type: string
      description: 'Analog audio output port O5-O6'
    - name: volume
      type: number
      description: 'Output volume (attenuation) between 0 dB and -57 dB in steps of 1 dB; value rounded up to match step'
- id: lw3_set_output_balance
  label: Setting the Analog Audio Output Level - Balance
  kind: action
  command: 'SET /MEDIA/AUDIO/<out>.Balance=<balance>'
  params:
    - name: out
      type: string
      description: 'Analog audio output port O5-O6'
    - name: balance
      type: integer
      description: '0 = left, 100 = right, step 1, center 50 (default)'
- id: lw3_set_output_gain
  label: Setting the Analog Audio Output Level - Gain
  kind: action
  command: 'SET /MEDIA/AUDIO/<out>.Gain=<gain>'
  params:
    - name: out
      type: string
      description: 'Analog audio output port O5-O6'
    - name: gain
      type: enum
      description: 'Output gain 0, 1, 2 or 3 dB; value rounded down to match step'
- id: lw3_set_audio_mute
  label: Muting/Unmuting the Analog Audio Output
  kind: action
  command: 'SET /MEDIA/AUDIO/<out>.MuteSetting=<logical_value>'
  params:
    - name: out
      type: string
      description: 'Analog audio output port O5-O6'
    - name: logical_value
      type: enum
      description: 'true = muted, false = unmuted'

# --- LW3 RS-232 Port Configuration (ports P1-P5, see port numbering) ---
- id: lw3_set_uart_protocol
  label: Setting the Serial Control Protocol
  kind: action
  command: 'SET /MEDIA/UART/<port>.ControlProtocol=<number>'
  params:
    - name: port
      type: string
      description: 'Serial port P1-P5'
    - name: number
      type: enum
      description: '0 = LW2, 1 = LW3'
- id: lw3_set_uart_baud
  label: Setting the BAUD Rate
  kind: action
  command: 'SET /MEDIA/UART/<port>.Baudrate=<number>'
  params:
    - name: port
      type: string
      description: 'Serial port P1-P5'
    - name: number
      type: enum
      description: '0=4800, 1=7200, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200'
- id: lw3_set_uart_databits
  label: Setting the Databits
  kind: action
  command: 'SET /MEDIA/UART/<port>.DataBits=<databits>'
  params:
    - name: port
      type: string
      description: 'Serial port P1-P5'
    - name: databits
      type: enum
      description: '8 or 9'
- id: lw3_set_uart_stopbits
  label: Setting the Stopbits
  kind: action
  command: 'SET /MEDIA/UART/<port>.StopBits=<number>'
  params:
    - name: port
      type: string
      description: 'Serial port P1-P5'
    - name: number
      type: enum
      description: '0=1, 1=1.5, 2=2'
- id: lw3_set_uart_parity
  label: Setting the Parity
  kind: action
  command: 'SET /MEDIA/UART/<port>.Parity=<number>'
  params:
    - name: port
      type: string
      description: 'Serial port P1-P5'
    - name: number
      type: enum
      description: '0=None, 1=Odd, 2=Even'
- id: lw3_set_uart_mode
  label: Setting the RS-232 Operation Mode
  kind: action
  command: 'SET /MEDIA/UART/<port>.Rs232Mode=<number>'
  params:
    - name: port
      type: string
      description: 'Serial port P1-P5'
    - name: number
      type: enum
      description: '0=Disconnect, 1=Control, 2=Command injection'
- id: lw3_set_uart_ci_enable
  label: Setting the Command Injection Mode
  kind: action
  command: 'SET /MEDIA/UART/<port>.CommandInjectionEnable=<logical_value>'
  params:
    - name: port
      type: string
      description: 'Serial port P1-P5'
    - name: logical_value
      type: enum
      description: 'true = command injection enabled, false = disabled'

# --- LW3 Message Sending via Ethernet Port ---
- id: lw3_tcp_message
  label: Sending a TCP Message (ASCII) via Ethernet
  kind: action
  command: 'CALL /MEDIA/ETHERNET:tcpMessage(<IP_address>:<port_no>=<message>)'
  params:
    - name: ip_address
      type: string
      description: 'Destination IP address'
    - name: port_no
      type: integer
      description: 'Destination TCP port'
    - name: message
      type: string
      description: 'ASCII message; control-character escaping allowed, e.g. C00\x0a\x0d'
- id: lw3_tcp_text
  label: Sending a TCP Text (ASCII) via Ethernet
  kind: action
  command: 'CALL /MEDIA/ETHERNET:tcpText(<IP_address>:<port_no>=<text>)'
  params:
    - name: ip_address
      type: string
      description: 'Destination IP address'
    - name: port_no
      type: integer
      description: 'Destination TCP port'
    - name: text
      type: string
      description: 'Text message; control and non-printable characters not allowed'
- id: lw3_tcp_binary
  label: Sending a TCP Binary Message (HEX) via Ethernet
  kind: action
  command: 'CALL /MEDIA/ETHERNET:tcpBinary(<IP_address>:<port_no>=<HEX_message>)'
  params:
    - name: ip_address
      type: string
      description: 'Destination IP address'
    - name: port_no
      type: integer
      description: 'Destination TCP port'
    - name: hex_message
      type: string
      description: 'Hexadecimal message, e.g. 433030; no separator characters needed'
- id: lw3_udp_message
  label: Sending a UDP Message (ASCII) via Ethernet
  kind: action
  command: 'CALL /MEDIA/ETHERNET:udpMessage(<IP_address>:<port_no>=<message>)'
  params:
    - name: ip_address
      type: string
      description: 'Destination IP address'
    - name: port_no
      type: integer
      description: 'Destination UDP port'
    - name: message
      type: string
      description: 'ASCII message; control-character escaping allowed'
- id: lw3_udp_text
  label: Sending a UDP Text (ASCII) via Ethernet
  kind: action
  command: 'CALL /MEDIA/ETHERNET:udpText(<IP_address>:<port_no>=<text>)'
  params:
    - name: ip_address
      type: string
      description: 'Destination IP address'
    - name: port_no
      type: integer
      description: 'Destination UDP port'
    - name: text
      type: string
      description: 'Text message; control and non-printable characters not allowed'
- id: lw3_udp_binary
  label: Sending a UDP Binary Message (HEX) via Ethernet
  kind: action
  command: 'CALL /MEDIA/ETHERNET:udpBinary(<IP_address>:<port_no>=<HEX_message>)'
  params:
    - name: ip_address
      type: string
      description: 'Destination IP address'
    - name: port_no
      type: integer
      description: 'Destination UDP port'
    - name: hex_message
      type: string
      description: 'Hexadecimal message; no separator characters needed'

# --- LW3 Message Sending via RS-232 Serial Port ---
- id: lw3_serial_send_text
  label: Sending a Text (ASCII) via Serial Port
  kind: action
  command: 'CALL /MEDIA/UART/<port>:sendText(<message>)'
  params:
    - name: port
      type: string
      description: 'Serial port P1-P5'
    - name: message
      type: string
      description: 'Text message; control and non-printable characters not allowed'
- id: lw3_serial_send_binary
  label: Sending a Binary Message (HEX) via Serial Port
  kind: action
  command: 'CALL /MEDIA/UART/<port>:sendBinaryMessage(<message>)'
  params:
    - name: port
      type: string
      description: 'Serial port P1-P5'
    - name: message
      type: string
      description: 'Hexadecimal message, e.g. 433030; escaping not required'
- id: lw3_serial_send_message
  label: Sending a Message (ASCII) via Serial Port
  kind: action
  command: 'CALL /MEDIA/UART/<port>:sendMessage(<message>)'
  params:
    - name: port
      type: string
      description: 'Serial port P1-P5'
    - name: message
      type: string
      description: 'ASCII message; control-character escaping allowed, e.g. PWR0\x0d\x0a'

# --- LW3 Infrared Port Configuration ---
- id: lw3_set_ir_ci_enable
  label: IR Enabling/Disabling Command Injection Mode
  kind: action
  command: 'SET /MEDIA/IR/<source>|<destination>.CommandInjectionEnable=<logical_value>'
  params:
    - name: source
      type: string
      description: 'IR TPS input port S1-S4'
    - name: destination
      type: string
      description: 'IR TPS output port D1-D4'
    - name: logical_value
      type: enum
      description: 'true = enabled, false = disabled'
- id: lw3_set_ir_modulation
  label: IR Enabling/Disabling Output Signal Modulation
  kind: action
  command: 'SET /MEDIA/IR/<destination>.EnableModulation=<logical_value>'
  params:
    - name: destination
      type: string
      description: 'IR TPS output port D1-D4'
    - name: logical_value
      type: enum
      description: 'true = modulation enabled (default), false = disabled'
- id: lw3_set_ir_ci_port
  label: IR Changing Command Injection Port Number
  kind: action
  command: 'SET /MEDIA/IR/<source>|<destination>.CommandInjectionPort=<port_no>'
  params:
    - name: source
      type: string
      description: 'IR TPS input port S1-S4'
    - name: destination
      type: string
      description: 'IR TPS output port D1-D4'
    - name: port_no
      type: integer
      description: 'TCP port number for command injection (default 9001/9002 per source)'

# --- LW3 Network Configuration ---
- id: lw3_get_dhcp
  label: Querying the DHCP State
  kind: query
  command: 'GET /MANAGEMENT/NETWORK.DhcpEnabled'
  params: []
- id: lw3_set_dhcp
  label: Changing the DHCP State
  kind: action
  command: 'SET /MANAGEMENT/NETWORK.DhcpEnabled=<logical_value>'
  params:
    - name: logical_value
      type: enum
      description: 'true = DHCP enabled, false = disabled'
- id: lw3_get_ip_address
  label: Querying the IP Address
  kind: query
  command: 'GET /MANAGEMENT/NETWORK.IpAddress'
  params: []
- id: lw3_set_static_ip
  label: Changing the IP Address (Static)
  kind: action
  command: 'SET /MANAGEMENT/NETWORK.StaticIpAddress=<IP_address>'
  params:
    - name: ip_address
      type: string
      description: 'Static IP address'
- id: lw3_get_netmask
  label: Querying the Subnet Mask
  kind: query
  command: 'GET /MANAGEMENT/NETWORK.NetworkMask'
  params: []
- id: lw3_set_static_netmask
  label: Changing the Subnet Mask (Static)
  kind: action
  command: 'SET /MANAGEMENT/NETWORK.StaticNetworkMask=<netmask>'
  params:
    - name: netmask
      type: string
      description: 'Network mask'
- id: lw3_get_gateway
  label: Querying the Gateway Address
  kind: query
  command: 'GET /MANAGEMENT/NETWORK.GatewayAddress'
  params: []
- id: lw3_set_static_gateway
  label: Changing the Gateway Address (Static)
  kind: action
  command: 'SET /MANAGEMENT/NETWORK.StaticGatewayAddress=<gw_address>'
  params:
    - name: gw_address
      type: string
      description: 'Gateway address'

# --- LW3 EDID Management ---
- id: lw3_get_edid_status
  label: Querying the Emulated EDIDs
  kind: query
  command: 'GET /EDID.EdidStatus'
  params: []
- id: lw3_get_dynamic_edid_validity
  label: Querying the Validity of a Dynamic EDID
  kind: query
  command: 'GET /EDID/D/<Dn>.Validity'
  params:
    - name: dn
      type: string
      description: 'Dynamic EDID memory place D1-D2'
- id: lw3_edid_switch
  label: Emulating an EDID to an Input Port
  kind: action
  command: 'CALL /EDID:switch(<source>:<destination>)'
  params:
    - name: source
      type: string
      description: 'Source EDID memory place: Factory (Fn) / User (Un) / Dynamic (Dn)'
    - name: destination
      type: string
      description: 'Emulated EDID memory of the input port (E1-E6)'
- id: lw3_edid_copy
  label: Copying an EDID to User Memory
  kind: action
  command: 'CALL /EDID:copy(<Dn>|<En>|<Fn>|<Un>:<Um>)'
  params:
    - name: source
      type: string
      description: 'Source EDID memory (Dn, En, Fn or Un)'
    - name: um
      type: string
      description: 'Target user memory slot U1-U12'
- id: lw3_edid_delete
  label: Deleting an EDID from User Memory
  kind: action
  command: 'CALL /EDID:delete(<Un>)'
  params:
    - name: un
      type: string
      description: 'User memory slot U1-U12'
- id: lw3_edid_reset
  label: Resetting the Emulated EDIDs
  kind: action
  command: 'CALL /EDID:reset(1)'
  params: []
```

## Feedbacks
```yaml
# LW2 responses (round brackets, CrLf terminated)
- id: lw2_product_type_response
  type: string
  description: 'Response to {I}: (I:MMX6x2-HT220)CrLf - device name'
- id: lw2_serial_number_response
  type: string
  description: 'Response to {s}: (SN:7A000941)CrLf - 8-digit serial number'
- id: lw2_protocol_response
  type: string
  description: 'Response to {P_?}: (CURRENT PROTOCOL = #<protocol>)CrLf; #1 = LW2 protocol'
- id: lw2_fw_response
  type: string
  description: 'Response to {f}: (FW:1.1.3b1 r9)CrLf - CPU firmware version; <s>=r indicates standard version'
- id: lw2_pong_response
  type: string
  description: 'Response to {PING}: (PONG!)CrLf - connection test'
- id: lw2_compile_time_response
  type: string
  description: 'Response to {CT}: (Compiled: Oct 10 2017 16:33:59)CrLf'
- id: lw2_boards_response
  type: string
  description: 'Response to {is}: (SL# 0 MMX6x2-HT220 V12_AAA0)CrLf (SL END)CrLf - installed boards'
- id: lw2_controller_fw_response
  type: string
  description: 'Response to {FC}: (CF MMX6x2-HT220 1.1.3b1 r9)CrLf ... (CF END)CrLf'
- id: lw2_health_response
  type: string
  description: 'Response to {ST}: (ST CPU 1.03V 1.03V ... 35.40C ...) - internal voltages and temperatures'
- id: lw2_switch_response
  type: string
  description: 'Response to {<in>@<out>}: (O01 I02)CrLf - output/input numbers in 2-digit ASCII; does not show mute state'
- id: lw2_switch_all_response
  type: string
  description: 'Response to {<in>@O}: (I02 ALL)CrLf'
- id: lw2_mute_response
  type: string
  description: 'Response to {#<out>}: (1MT01)CrLf - output muted'
- id: lw2_unmute_response
  type: string
  description: 'Response to {+<out>}: (0MT01)CrLf - output unmuted'
- id: lw2_lock_response
  type: string
  description: 'Response to {#><out>}: (1LO01)CrLf - output locked'
- id: lw2_unlock_response
  type: string
  description: 'Response to {+<<out>}: (0LO01)CrLf - output unlocked'
- id: lw2_connection_state_response
  type: string
  description: 'Response to {VC}: (ALL 03 04 03 04)CrLf - per-output input number in 2-digit ASCII; L prefix = locked (L01), M = muted (M01), U = locked and muted (U01); O1/O3 and O2/O4 are mirrored'
- id: lw2_size_response
  type: string
  description: 'Response to {getsize}: (SIZE=6x4)CrLf - physical crosspoint size (6 inputs, 4 outputs)'
- id: lw2_autoselect_response
  type: string
  description: 'Response to autoselect set/query: (AS_V1=E;P)CrLf'
- id: lw2_priority_response
  type: string
  description: 'Response to priority set: (PRIO_V1=1;0;2;3;4;5)CrLf; also returned as current setting if change is rejected'
- id: lw2_ip_stat_response
  type: string
  description: 'Response to {IP_STAT=?}: (IP_STAT=0;192.168.0.95;255.255.255.0;192.168.0.1)CrLf - type;ip;mask;gateway'
- id: lw2_ip_address_response
  type: string
  description: 'Response to {IP_ADDRESS=?}: (IP_ADDRESS=0;192.168.0.110)CrLf - type;ip'
- id: lw2_netmask_response
  type: string
  description: 'Response to {IP_NETMASK=?}: (IP_NETMASK=255.255.255.0)CrLf'
- id: lw2_gateway_response
  type: string
  description: 'Response to {IP_GATEWAY=?}: (IP_GATEWAY=192.168.0.50)CrLf'
- id: lw2_port_response
  type: string
  description: 'Responses to {LW2_PORT=?} / {LW3_PORT=?}: (LW2_PORT=10001) / (LW3_PORT=6107)CrLf'
- id: lw2_eth_enable_response
  type: string
  description: 'Response to {ETH_ENABLE=?}: (ETH_ENABLE=1;1;1;1;1;1;1;1)CrLf - 8 port enable values'
- id: lw2_lcmd_response
  type: string
  description: 'Response to {LCMD}: (LCMD# I: Device name)CrLf ... (LCMD END)CrLf - list of all available LW2 commands'
# LW3 responses (prefix-coded)
- id: lw3_prefix_pr
  type: string
  description: 'pr - read-only property response, e.g. pr /.SerialNumber=87654321'
- id: lw3_prefix_pw
  type: string
  description: 'pw - read-write property response (echo of SET), e.g. pw /MEDIA/VIDEO/O1.HdcpModeSetting=1'
- id: lw3_prefix_mo
  type: string
  description: 'mO - response after successful method execution, e.g. mO /MEDIA/VIDEO/XP:switch'
- id: lw3_prefix_mf
  type: string
  description: 'mF - response after failed method execution'
- id: lw3_prefix_me
  type: string
  description: 'mE - error for a method, e.g. mE /MEDIA/VIDEO/XP:switch %E004:Invalid value; each error has a unique error number'
- id: lw3_prefix_n
  type: string
  description: 'n- (node), ns (child node), nE (node error), nm (node manual), m- (method), mm (method manual), pm (property manual), pE (property error)'
- id: lw3_source_port_status_response
  type: string
  description: 'pr /MEDIA/VIDEO/XP.SourcePortStatus=T00AF;T00AA;... - 5 ASCII chars per port: char1 mute/lock state, next 4 chars 2-byte HEX (byte1: embedded audio/HDCP status bits, byte2: signal present/connection status bits)'
- id: lw3_destination_port_status_response
  type: string
  description: 'pr /MEDIA/VIDEO/XP.DestinationPortStatus=M00AA;T00AA;... - same 5-char encoding as source status'
- id: lw3_connection_list_response
  type: string
  description: 'pr /MEDIA/VIDEO/XP.DestinationConnectionList=I1;I3;I1;I3 - input connected to each output'
- id: lw3_autoselect_response
  type: string
  description: 'pr /MEDIA/VIDEO/XP.DestinationPortAutoselect=EL;DP;EL;DP - per-output two-letter code (E/D enable, F/P/L mode)'
- id: lw3_priority_list_response
  type: string
  description: 'pr /MEDIA/VIDEO/XP.PortPriorityList=5,4,3,2,1,0;0,1,2,3,4,5;... - four semicolon-separated groups of six priorities (O1-O4); 0 highest, 30 lowest, 31 skipped; equal numbers resolved by lowest port number first'
- id: lw3_dhcp_response
  type: string
  description: 'pw /MANAGEMENT/NETWORK.DhcpEnabled=true|false'
- id: lw3_network_response
  type: string
  description: 'pr /MANAGEMENT/NETWORK.IpAddress=192.168.0.102, /MANAGEMENT/NETWORK.NetworkMask=255.255.255.0, /MANAGEMENT/NETWORK.GatewayAddress=192.168.0.1'
- id: lw3_edid_status_response
  type: string
  description: 'pr /EDID.EdidStatus=F47:E1;F47:E2;... - emulated EDID memory per input (E1-E6)'
- id: lw3_edid_validity_response
  type: enum
  values: [true, false]
  description: 'pr /EDID/D/D1.Validity=true|false - validity of a dynamic EDID'
```

## Variables
```yaml
# All settable parameters in this source are expressed as discrete protocol commands (LW2 set
# commands / LW3 SET-property actions) and are enumerated under Actions.
# UNRESOLVED: no additional settable variables outside the Actions section are documented in source.
```

## Events
```yaml
- id: lw3_property_change_notification
  description: 'CHG <property>=<value>, e.g. CHG /EDID.EdidStatus=F48:E1 - asynchronous notification sent to connections subscribed (OPEN) to the node when a property changes; format similar to GET response. Subscriptions are per-connection and deleted when the connection terminates.'
- id: lw3_event_manager
  description: 'Device-internal Event Manager: configurable condition/action pairs (settable via LDC or LW3 protocol commands); a condition (e.g. signal detected on a port) can trigger actions (e.g. crosspoint switch, RS-232 message send) with optional delay modes (no delay / simple delay / still true after / continuously true). Number of configurable events depends on the device.'
  # UNRESOLVED: the specific LW3 commands for configuring Event Manager entries are not documented in this source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step protocol macro sequences documented in source.
# Batch switching (multiple LW2 {<in>@<out>} commands sent with <10 ms inter-command delay) is
# documented and captured as the lw2_batch_switch action.
# Preset run/save/delete "by sending protocol commands" is referenced in source but the commands
# themselves are not documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - 'Thermal protection (explicit source text): if the measured internal temperature is above 80°C (Very High Temperature) for more than 60 seconds, the matrix shuts down automatically to avoid damage.'
  - 'Firmware update (explicit source text): while firmware is being updated, normal operation mode is suspended (bootload mode) and signal processing is not performed; the update must not be interrupted.'
  - 'Configuration restore (source WARNING): settings are permanently overwritten with the restored parameters; withdrawal is not possible.'
  - 'Factory defaults (source WARNING): loading factory default settings erases all presets saved in device memory.'
```

## Notes
- **Two control protocols over the same TCP stack.** LW2: RAW TCP port 10001, commands surrounded by `{ }`, responses surrounded by `( )` terminated with CrLf (0x0D 0xA); all input commands are converted to uppercase, responses may contain upper and lower case. LW3: RAW TCP port 6107, ASCII tree of nodes/properties/methods; nodes separated by `/`, properties addressed with `.`, methods with `:`; all commands and responses CrLf-terminated; case-sensitive; max line length 800 bytes; command types GET / GETALL / SET / CALL / MAN; optional 4-digit hex signature prefix groups a command with its responses (`1700#GET /EDID.*` → `{1700 ... }`).
- **LW3 escaping.** Control characters `\ { } # % ( ) \r \n \t` must be escaped with a backslash inside values/parameters (e.g. `sendMessage(Set\(01\))`); `\x` sequences encode HEX bytes; message strings to other devices use the form `<command1><\x0d\x0a><command2><\x0d\x0a>`.
- **LW3 subscription.** `OPEN <node>` subscribes, `CLOSE <node>` unsubscribes; property changes generate async `CHG` notifications; subscriptions are deleted when the connection closes and must be re-sent after reconnect.
- **Default network settings (factory):** IP 192.168.0.100, mask 255.255.255.0, gateway 192.168.0.1, LW2 port 10001, LW3 port 6107, HTTP port 80, DHCP disabled.
- **Mirrored outputs.** HDMIOUT1 and TPSOUT1 carry the same AV signal (LW2 outputs 1/3 = LW3 O1/O3), likewise HDMIOUT2/TPSOUT2 (O2/O4). Many settings (lock, autoselect, TPG clock/pattern) are common across mirrored pairs.
- **Mute semantics (LW2).** Muting does not change the crosspoint state — it disables the output; switching a muted output does not unmute it; unmuting restores the previous connection. LW2 switch response does not report mute state (query `{VC}` for that).
- **LW2 batch switching.** Multiple `{<in>@<out>}` commands arriving with <10 ms between `}` characters are executed simultaneously; LAN delays can break batching; locked outputs break batching.
- **Autoselect.** Modes: First detect (F), Priority detect (P), Last detect (L); enable letter E/D. LW2 autoselect query form `{AS_V<out>=?}`; priority values 0-31 (31 = skip port); LW2 `{PRIO_V<out>=...}` requires setting all input priorities at once or the change is rejected and current setting returned.
- **Port numbering (from source appendix):**

| Port name | LW2 video | LW3 video | Audio | EDID | RS-232 | IR in | IR out |
|---|---|---|---|---|---|---|---|
| TPS input #1 | 1 | I1 | I1 | E1 | P2 | S1 | D1 |
| TPS input #2 | 2 | I2 | I2 | E2 | P3 | S2 | D2 |
| HDMI input #3 | 3 | I3 | I3 | E3 | - | - | - |
| HDMI input #4 | 4 | I4 | I4 | E4 | - | - | - |
| HDMI input #5 | 5 | I5 | I5 | E5 | - | - | - |
| HDMI input #6 | 6 | I6 | I6 | E6 | - | - | - |
| HDMI output #1 | 1 | O1 | O1 | D1 | - | - | - |
| HDMI output #2 | 2 | O2 | O2 | D2 | - | - | - |
| TPS output #1 | 3 | O3 | O3 | D3 | P4 | S3 | D3 |
| TPS output #2 | 4 | O4 | O4 | D4 | P5 | S4 | D4 |
| Analog audio input #1-4 | - | - | I7-I10 | - | - | - | - |
| Analog audio output #1-2 | - | - | O5-O6 | - | - | - | - |
| Local RS-232 | - | - | - | - | P1 | - | - |

- **Model differences (source DIFFERENCE notes):** TPS output #1 (O3/P4/S3/D3) exists only on MMX6x2-HT210 and MMX6x2-HT220; TPS output #2 (O4/P5/S4/D4) only on MMX6x2-HT220. LW2 commands `{RS232=<mode>}`, `{RS232_LINK_FORMAT=...}` and `{RS232_LINK_PROT=...}` are marked "available for MMX4x2-HT200 model only" (verbatim from source; possibly an erratum for MMX6x2-HT200).
- **Preset count contradiction in source:** LCD menu section states 4 user-programmable presets; LDC Preset Settings section states six presets (Preset 1-6); front panel section states eight memory slots available via Source buttons. Presets survive power down (non-volatile memory). Factory default crosspoint: I3 @ O1&O3, I4 @ O2&O4; default emulated EDID F47 (changed since firmware 1.1.0; firmware 1.0.0 default was D1 dynamic).
- **EDID memory:** 119 factory presets (F1-F120 list in source), 12 user-programmable slots (U1-U12), dynamic memories D1-D2, emulated per input E1-E6. On EDID change the HOTPLUG signal toggles for 2 seconds; some sources must be restarted to re-read EDID.
- **RS-232 defaults (factory):** control protocol LW2, 57600 baud, 8 data bits, no parity, 1 stop bit, operation mode Command Injection (local and link ports); CI TCP ports: local 8001, TPSIN1 8002, TPSIN2 8003, TPSOUT1 8004, TPSOUT2 8005; IR command injection TCP 9001/9002.
- **Other service ports (source appendix):** TFTP firmware update UDP 69/49990/49995; device discovery mDNS UDP 224.0.0.251:5353; LDC remote IP UDP 230.76.87.82:37421; Find me (LMDMP) UDP 230.76.87.82:37422.
- **LW2 path inconsistency in source:** section 7.5.2 heading uses `GET /MEDIA/XP/VIDEO.DestinationPortStatus` while its example uses `GET /MEDIA/VIDEO/XP.DestinationPortStatus`; both spellings appear verbatim.

<!-- UNRESOLVED: firmware version compatibility range not stated in source (released packages: v1.1.0b1, v1.1.4b3, v1.1.5b11, v1.2.0b2) -->
<!-- UNRESOLVED: HTTP control API (port 80) exists but no endpoints documented in source -->
<!-- UNRESOLVED: LW3 preset run/save/delete protocol commands referenced but not documented -->
<!-- UNRESOLVED: LW3 Event Manager configuration command syntax not documented -->
<!-- UNRESOLVED: serial flow control not stated in source -->
<!-- UNRESOLVED: LW2 {RS232_LINK_FORMAT=?} query form not explicitly given in source -->

## Provenance

```yaml
source_domains:
  - assets.prod.pim.lightware.com
  - manualslib.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/MMX6x2-HT_series_UserManual.pdf
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/HTML/MMX6x2-HT_series/UM.html
  - https://www.manualslib.com/manual/1189332/Lightware-Mmx6x2-Ht200.html
retrieved_at: 2026-05-14T20:19:00.560Z
last_checked_at: 2026-09-12T22:18:31.455Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-12T22:18:31.455Z
matched_actions: 130
action_count: 130
confidence: medium
summary: "All 130 spec actions have wire-literal tokens that appear verbatim in the source's LW2 and LW3 command catalogues; transport values match. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "preset run/save/delete protocol commands are referenced (\"presets can be run... by sending protocol commands, too\") but the actual commands are not documented in this source"
- "HTTP interface exists (factory default TCP port 80, \"built-in website\") but no HTTP API commands are documented"
- "LW3 Event Manager configuration commands referenced but not detailed in this source"
- "HTTP API base URL / paths not documented in source"
- "flow control not stated in source"
- "no additional settable variables outside the Actions section are documented in source."
- "the specific LW3 commands for configuring Event Manager entries are not documented in this source"
- "no explicit multi-step protocol macro sequences documented in source."
- "firmware version compatibility range not stated in source (released packages: v1.1.0b1, v1.1.4b3, v1.1.5b11, v1.2.0b2)"
- "HTTP control API (port 80) exists but no endpoints documented in source"
- "LW3 preset run/save/delete protocol commands referenced but not documented"
- "LW3 Event Manager configuration command syntax not documented"
- "serial flow control not stated in source"
- "LW2 {RS232_LINK_FORMAT=?} query form not explicitly given in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
