---
spec_id: admin/extron-ipl-t-pcs4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron IPL T PCS4 / IPL T PCS4i Control Spec"
manufacturer: Extron
model_family: "IPL T PCS4"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "IPL T PCS4"
    - "IPL T PCS4i"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - aca.im
source_urls:
  - https://media.extron.com/public/download/files/userman/68-738-07_C_IPL_T_PCS4_UG.pdf
  - https://www.extron.com/product/ipltpcs4i
  - https://www.extron.com/download/control-system-drivers
  - https://aca.im/driver_docs/Extron/PDU_IPL_T_PCS4.pdf
  - https://www.extron.com/download/files/userman/68-738-07_C_IPL_T_PCS4_UG.pdf
retrieved_at: 2026-06-14T23:37:15.832Z
last_checked_at: 2026-06-16T07:05:19.221Z
generated_at: 2026-06-16T07:05:19.221Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full scheduling sub-table truncated in source extraction (X71!/X71@ enumerations incomplete)."
  - "source table truncated)\""
  - "full X71!/X71@ parameter enumerations truncated in source extraction."
  - "none documented."
  - "no explicit voltage/current interlock sequences documented in source text."
  - "full scheduling sub-table (X71!/X71@ enumerations) truncated in source PDF extraction."
  - "firmware version compatibility not stated in source (banner shows Vn.nn placeholder)."
  - "voltage/current specs for receptacles not stated in refined source (110/220 VAC mentioned in model description only)."
  - "protocol version number not stated."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:05:19.221Z
  matched_actions: 99
  action_count: 99
  confidence: medium
  summary: "All 99 actions matched exactly against source command tables; transport parameters fully documented; spec comprehensively represents source command catalogue. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Extron IPL T PCS4 / IPL T PCS4i Control Spec

## Summary
Extron IPL T PCS4 / PCS4i is an IP Link power control interface providing four switched 110/220 VAC receptacles with current-threshold sensing. Control is via Extron Simple Instruction Set (SIS) over Telnet (TCP port 23) or a web browser (HTTP, TCP port 80). Part numbers: 60-544-07 / 60-544-09.

<!-- UNRESOLVED: full scheduling sub-table truncated in source extraction (X71!/X71@ enumerations incomplete). -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23        # Telnet (TCP) - stated in source
  web_port: 80    # HTTP (TCP) - stated in source (web browser)
  default_ip: "192.168.254.254"  # factory default; stated
auth:
  type: password  # source: factory pw = device serial number; default 'extron' after absolute reset
  levels: [administrator, user]
  notes: >
    Password prompt appears only if a password is defined. Admin pw required
    for [24]-tagged commands. User pw cannot be set if admin pw absent.
    Min 4 / max 12 chars, no special chars.
```

## Traits
```yaml
# - powerable    (receptacle on/off + power up delay)  - inferred from power command examples
# - queryable    (many ?/view commands return state)   - inferred from query command examples
# - levelable    (current-threshold set/clear)         - inferred from threshold commands
traits:
  - powerable
  - queryable
  - levelable
```

## Actions
```yaml
# Commands shown in Telnet (ASCII) form. Web form = prefix 'W', '%2A' for '*',
# pipe '|' for CR. See source Command-and-Response table.
# Symbols: E=ESC(0x1B)/W for web, }=CR(0x0D), ]=CRLF(0x0D 0A), *=cmd char,
# X!=receptacle 1-4, etc. (see Notes).

# ---- Power Receptacle Control / Current Sense ----
- id: receptacle_power_on
  label: Receptacle Power On
  kind: action
  command: "E X!*1PC}"
  params:
    - name: receptacle
      type: integer
      description: Port receptacle 1-4 (X!)
  response: "Cpn X!•Ppc1 ]"

- id: receptacle_power_off
  label: Receptacle Power Off
  kind: action
  command: "E X!*0PC}"
  params:
    - name: receptacle
      type: integer
      description: Port receptacle 1-4 (X!)
  response: "Cpn X!•Ppc0 ]"

- id: receptacle_power_status
  label: View Receptacle Power Status
  kind: query
  command: "E X!PC}"
  params:
    - name: receptacle
      type: integer
      description: Port receptacle 1-4 (X!)
  response: "X% ]"

- id: receptacle_current_status
  label: View Receptacle Current Status
  kind: query
  command: "E X!PS}"
  params:
    - name: receptacle
      type: integer
      description: Port receptacle 1-4 (X!)
  response: "X( ]"

- id: group_receptacles
  label: Group Receptacles
  kind: action
  command: "E X1)[1]X1)[2]X1)[3]X1)[4]GP}"
  params:
    - name: group_per_port
      type: string
      description: "Per-port group number 0-3 (0=none,1=yellow,2=green,3=red); exponents designate ports 1-4"
  response: "Pgp X1)[1]X1)[2]X1)[3]X1)[4] ]"

- id: ungroup_receptacles
  label: Ungroup Receptacles
  kind: action
  command: "E 0000GP}"
  params: []
  response: "Pgp0000 ]"

- id: view_receptacle_grouping
  label: View Receptacles Grouping
  kind: query
  command: "E GP}"
  params: []
  response: "X1)[1]X1)[2]X1)[3]X1)[4] ]"

- id: set_power_up_delay
  label: Set Power Up Delay
  kind: action
  command: "E X1^DT}"
  params:
    - name: delay
      type: integer
      description: "Delay in 1/3-sec increments, 1-255; default 3 (=1 sec)"
  response: "Pdt X1^ ]"

- id: view_power_up_delay
  label: View Power Up Delay
  kind: query
  command: "E DT}"
  params: []
  response: "X1^ ]"

- id: set_full_threshold
  label: Set Individual Full Threshold
  kind: action
  command: "E X!*2TH}"
  params:
    - name: receptacle
      type: integer
      description: Port receptacle 1-4 (X!)
  response: "Ptf X! ]"

- id: set_standby_threshold
  label: Set Individual Standby Threshold
  kind: action
  command: "E X!*1TH}"
  params:
    - name: receptacle
      type: integer
      description: Port receptacle 1-4 (X!)
  response: "Pts X! ]"

- id: clear_threshold
  label: Clear Individual Threshold
  kind: action
  command: "E X!*0TH}"
  params:
    - name: receptacle
      type: integer
      description: Port receptacle 1-4 (X!)
  response: "Ptc X! ]"

- id: view_threshold_settings
  label: View Threshold Setting For All Ports
  kind: query
  command: "E TH}"
  params: []
  response: "X([1],X([2],X([3],X([4] ]"

# ---- Executive Mode ----
- id: exec_mode_on
  label: Set Executive Mode On
  kind: action
  command: "1X"
  params: []
  response: "Exe1 ]"

- id: exec_mode_off
  label: Set Executive Mode Off
  kind: action
  command: "0X"
  params: []
  response: "Exe0 ]"

- id: view_exec_mode
  label: View Executive Mode
  kind: query
  command: "X"
  params: []
  response: "X% ]"

# ---- Power Receptacle Monitoring and Alarm Functions ----
- id: set_alarm_conditions
  label: Set Alarm Conditions
  kind: action
  command: "E X!*X70!*X70@*X70#SA}"
  params:
    - name: receptacle
      type: integer
      description: "Port receptacle 1-4 (X!)"
    - name: condition
      type: integer
      description: "X70! - 0=off,1=on,2=ref:None,3=ref:Standby,4=ref:Full,5=any change"
    - name: use_relay
      type: integer
      description: "X70@ - 0=no,1=yes"
    - name: email_id
      type: integer
      description: "X70# - e-mail 61-64"
  response: "Ast X!*X70!*X70@*X70#*X70$*X70% ]"

- id: view_alarm_conditions
  label: View Alarm Conditions
  kind: query
  command: "E X!SA}"
  params:
    - name: receptacle
      type: integer
      description: Port receptacle 1-4 (X!)
  response: "X70!*X70@*X70#*X70$*X70% ]"

- id: set_monitoring_enable
  label: Monitoring Enable/Disable
  kind: action
  command: "E X!*X70$SA}"
  params:
    - name: receptacle
      type: integer
      description: "Port receptacle 1-4 (X!)"
    - name: mode
      type: integer
      description: "X70$ - 0=disable,1=enable,2=enable with e-mail"
  response: "Ast X!*X70!*X70@*X70#*X70$*X70% ]"

- id: set_alarm_mode
  label: Set Alarm Mode
  kind: action
  command: "E X70^*X70&*X70**X70**X71)MA}"
  params:
    - name: clear_value
      type: integer
      description: "X70^ - 0-7 (see source KEY)"
    - name: relay_polarity
      type: integer
      description: "X70& - 0=normally open,1=normally closed"
    - name: hold_time_min
      type: integer
      description: "X70* - 0=never,1-7=minutes"
    - name: off_timed_value
      type: integer
      description: "X71) - 00-15 (250 ms increments)"
  response: "Arl X70^*X70&*X70**X70**X71) ]"

- id: view_alarm_mode
  label: View Alarm Mode
  kind: query
  command: "E MA}"
  params: []
  response: "X70^*X70&*X70**X70**X71) ]"

# ---- Power Receptacle Scheduling ----
- id: set_scheduling
  label: Set Scheduling
  kind: action
  command: "E X!*X71!*X%*X71@SS}"
  params:
    - name: receptacle
      type: integer
      description: "Port receptacle 1-4 (X!)"
    - name: day_field
      type: string
      description: "X71! - day-of-week bitmap (full enumeration UNRESOLVED: source table truncated)"
    - name: on_off
      type: integer
      description: "X% - 0=off,1=on"
    - name: time_field
      type: string
      description: "X71@ - time field (full enumeration UNRESOLVED: source table truncated)"
  # UNRESOLVED: full X71!/X71@ parameter enumerations truncated in source extraction.

# ---- Alarm Relay Functions ----
- id: alarm_relay_on
  label: Turn Alarm Relay ON
  kind: action
  command: "1*1O}"
  params: []
  response: "Cpn1•Rly1 ]"

- id: alarm_relay_off
  label: Turn Alarm Relay OFF
  kind: action
  command: "1*0O}"
  params: []
  response: "Cpn1•Rly0 ]"

- id: view_alarm_relay_state
  label: View Alarm Relay State
  kind: query
  command: "1O}"
  params: []
  response: "X% ]"

- id: pulse_relay
  label: Pulse Relay
  kind: action
  command: "1*3*X6#O}"
  params:
    - name: pulse_time
      type: integer
      description: "X6# - pulse time in 20 ms counts; missing/0=500 ms (default 25); max 35565 ms"
  response: "Cpn1•Rly1 ] or Cpn1•Rly0 ]"

- id: toggle_relay
  label: Toggle Relay
  kind: action
  command: "1*2O}"
  params: []
  response: "Cpn1•Rly1 ] or Cpn1•Rly0 ]"

# ---- Ethernet Data Port Commands ----
- id: set_connected_port_timeout
  label: Set Current Connected Port Timeout
  kind: action
  command: "E 0*X6(TC}"
  params:
    - name: timeout_sec
      type: integer
      description: "X6( - seconds before IP timeout (min 1, max 6500, default 30=300s, step 10)"
  response: "Pti0*X6( ]"

- id: view_connected_port_timeout
  label: View Current Connected Port Timeout
  kind: query
  command: "E 0TC}"
  params: []
  response: "X6( ]"

- id: set_global_ip_timeout
  label: Set Global IP Port Timeout
  kind: action
  command: "E 1*X6(TC}"
  params:
    - name: timeout_sec
      type: integer
      description: "X6( - seconds (min 1, max 6500, default 30=300s, step 10)"
  response: "Pti1*X6( ]"

- id: view_global_ip_timeout
  label: View Global IP Port Timeout
  kind: query
  command: "E 1TC}"
  params: []
  response: "X6( ]"

# ---- Firmware / Part Number / Information ----
- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "Q"
  params: []
  response: "X1! ]"

- id: query_firmware_info
  label: Query Firmware Information
  kind: query
  command: "1Q"
  params: []
  response: "X1! ]"

- id: query_bootstrap_version
  label: Query Bootstrap Version
  kind: query
  command: "2Q"
  params: []
  response: "X1! ]"

- id: query_factory_firmware_version
  label: Query Factory Firmware Version
  kind: query
  command: "3Q"
  params: []
  response: "X1! plus (web version - model - UL - date and time) ]"

- id: query_updated_firmware_version
  label: Query Updated Firmware Version
  kind: query
  command: "4Q"
  params: []
  response: "X1! plus (web version - model - UL - date and time) ]"

- id: query_verbose_version
  label: Query Verbose Version Information
  kind: query
  command: "0Q"
  params: []
  response: "Sum of responses from 2Q, 3Q, and 4Q ]"

- id: request_part_number
  label: Request Interface Part Number
  kind: query
  command: "N"
  params: []
  response: "60-544-07 or 60-544-09 ]"

- id: request_model_name
  label: Request Model Name
  kind: query
  command: "1I"
  params: []
  response: "IPL T PCS4 or IPL T PCS4i ]"

- id: request_model_description
  label: Request Model Description
  kind: query
  command: "2I"
  params: []
  response: "Lists four switched 110 VAC or 220 VAC receptacles with current threshold sensing. ]"

- id: request_system_memory_usage
  label: Request System Memory Usage
  kind: query
  command: "3I"
  params: []
  response: "Number of bytes and Kbytes used out of total Kbytes ]"

- id: request_user_memory_usage
  label: Request User Memory Usage
  kind: query
  command: "4I"
  params: []
  response: "Number of bytes and Kbytes used out of total Kbytes ]"

# ---- E-mail Commands ----
- id: configure_email_events
  label: Configure E-mail Events (Mailbox)
  kind: action
  command: "E X4%,X4^,X4&CR}"
  params:
    - name: mailbox_number
      type: integer
      description: "X4% - e-mail mailbox number"
    - name: recipient
      type: string
      description: "X4^ - e-mail recipient address"
    - name: file_name
      type: string
      description: "X4& - e-mail file name (e.g. 7.eml)"
  response: "Ipr X4%,X4^,X4& ]"

- id: view_email_events
  label: View E-mail Events (Mailbox)
  kind: query
  command: "E X4%CR}"
  params:
    - name: mailbox_number
      type: integer
      description: "X4% - e-mail mailbox number"
  response: "X4^,X4& ]"

- id: send_email_events
  label: Send E-mail Events (File Named in Mailbox)
  kind: action
  command: "E X4%SM}"
  params:
    - name: mailbox_number
      type: integer
      description: "X4% - e-mail mailbox number"
  response: "Eml X4^ ]"

- id: send_email_alt_file
  label: Send E-mail (Using Different File)
  kind: action
  command: "E X4%,X7),X4&SM}"
  params:
    - name: mailbox_number
      type: integer
      description: "X4% - e-mail mailbox number"
    - name: alt_value
      type: integer
      description: "X7) - alternate value"
    - name: file_name
      type: string
      description: "X4& - e-mail file name"
  response: "Eml X4^ ]"

# ---- Web Browser-specific ----
- id: read_last_url_response
  label: Read Response From Last URL Command
  kind: query
  command: "E UB}"
  params: []
  response: "Response from command ]"

# ---- Mail Server Setup ----
- id: set_mail_server
  label: Set Mail Server IP, Unit Domain Name
  kind: action
  command: "E X1$,X1%CM}"
  params:
    - name: mail_server_ip
      type: string
      description: "X1$ - IP address (nnn.nnn.nnn.nnn)"
    - name: domain_name
      type: string
      description: "X1% - e-mail domain name"
  response: "Ipm •X1$,X1% ]"

- id: view_mail_server
  label: View Mail Server IP, Unit Domain Name
  kind: query
  command: "E CM}"
  params: []
  response: "X1$,X1% ]"

# ---- IP Setup Commands ----
- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "E X1@CN}"
  params:
    - name: name
      type: string
      description: "X1@ - up to 24 chars [A-Z,0-9,-]; first=letter, last!=hyphen, no spaces"
  response: "Ipn •X1@ ]"

- id: reset_unit_name
  label: Set Unit Name To Factory Default
  kind: action
  command: "E CN}"
  params: []
  response: "Ipn •X4( ]"

- id: view_unit_name
  label: View Unit Name
  kind: query
  command: "E CN}"
  params: []
  response: "X1@ ]"

- id: set_date_time
  label: Set Date And Time
  kind: action
  command: "E X1#CT}"
  params:
    - name: datetime
      type: string
      description: "X1# - format MM/DD/YY-HH:MM:SS"
  response: "Ipn •X1# ]"

- id: view_date_time
  label: View Date And Time
  kind: query
  command: "E CT}"
  params: []
  response: "X1# ]"

- id: set_gmt_offset
  label: Set GMT Offset
  kind: action
  command: "E X#CZ}"
  params:
    - name: offset
      type: string
      description: "X# - GMT offset"
  response: "Ipz X# ]"

- id: view_gmt_offset
  label: View GMT Offset
  kind: query
  command: "E CZ}"
  params: []
  response: "X# ]"

- id: set_dst
  label: Set Daylight Savings Time
  kind: action
  command: "E X3$CX}"
  params:
    - name: dst
      type: integer
      description: "X3$ - DST setting"
  response: "Ipx X3$ ]"

- id: view_dst
  label: View Daylight Savings Time
  kind: query
  command: "E CX}"
  params: []
  response: "X3$ ]"

- id: dhcp_on
  label: Set DHCP On
  kind: action
  command: "E 1DH}"
  params: []
  response: "Idh 1 ]"

- id: dhcp_off
  label: Set DHCP Off
  kind: action
  command: "E 0DH}"
  params: []
  response: "Idh 0 ]"

- id: view_dhcp_mode
  label: View DHCP Mode
  kind: query
  command: "E DH}"
  params: []
  response: "X% ]"

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "E X1$CI}"
  params:
    - name: ip
      type: string
      description: "X1$ - IP address nnn.nnn.nnn.nnn"
  response: "Ipi •X1$ ]"

- id: view_ip_address
  label: View IP Address
  kind: query
  command: "E CI}"
  params: []
  response: "X1$ ]"

- id: view_mac_address
  label: View Hardware (MAC) Address
  kind: query
  command: "E CH}"
  params: []
  response: "X1* ]"

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "E X1(CS}"
  params:
    - name: mask
      type: string
      description: "X1( - subnet mask nnn.nnn.nnn.nnn"
  response: "Ips •X1( ]"

- id: view_subnet_mask
  label: View Subnet Mask
  kind: query
  command: "E CS}"
  params: []
  response: "X1( ]"

- id: set_gateway_ip
  label: Set Gateway IP Address
  kind: action
  command: "E X1$CG}"
  params:
    - name: gateway
      type: string
      description: "X1$ - gateway IP nnn.nnn.nnn.nnn"
  response: "Ipg •X1$ ]"

- id: view_gateway_ip
  label: View Gateway IP Address
  kind: query
  command: "E CG}"
  params: []
  response: "X1$ ]"

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E X2@CV}"
  params:
    - name: mode
      type: integer
      description: "X2@ - 0=None(default),1=verbose,2=tagged,3=verbose+tagged"
  response: "Vrb X2@ ]"

- id: view_verbose_mode
  label: View Verbose Mode Status
  kind: query
  command: "E CV}"
  params: []
  response: "X2@ ]"

- id: get_connection_listing
  label: Get Connection Listing
  kind: query
  command: "E CC}"
  params: []
  response: "Number of connections"

# ---- Password and Security ----
- id: set_admin_password
  label: Set Administrator Password
  kind: action
  command: "E X3#CA}"
  params:
    - name: password
      type: string
      description: "X3# - 4-12 chars, no special chars"
  response: "Ipa •X4! ]"

- id: clear_admin_password
  label: Clear Administrator Password
  kind: action
  command: "E CA}"
  params: []
  response: "Ipa • ]"

- id: view_admin_password
  label: View Administrator Password
  kind: query
  command: "E CA}"
  params: []
  response: "X4! ]"

- id: set_user_password
  label: Set User Password
  kind: action
  command: "E X3#CU}"
  params:
    - name: password
      type: string
      description: "X3# - 4-12 chars, no special chars"
  response: "Ipu •X4! ]"

- id: clear_user_password
  label: Clear User Password
  kind: action
  command: "E CU}"
  params: []
  response: "Ipu • ]"

- id: view_user_password
  label: View User Password
  kind: query
  command: "E CU}"
  params: []
  response: "X4! ]"

- id: query_security_level
  label: Query Session Security Level
  kind: query
  command: "E CK}"
  params: []
  response: "X5@ ] (11=user, 12=admin)"

# ---- Remapping Port Designations ----
- id: set_telnet_port_map
  label: Set Telnet Port Map
  kind: action
  command: "E port#MT}"
  params:
    - name: port
      type: integer
      description: Telnet port number
  response: "Pmt port# ]"

- id: reset_telnet_port_map
  label: Reset Telnet Port Map
  kind: action
  command: "E 23MT}"
  params: []
  response: "Pmt 00023 ]"

- id: disable_telnet_port_map
  label: Disable Telnet Port Map
  kind: action
  command: "E 0MT}"
  params: []
  response: "Pmt 00000 ]"

- id: view_telnet_port_map
  label: View Telnet Port Map
  kind: query
  command: "E MT}"
  params: []
  response: "port# ]"

- id: set_web_port_map
  label: Set Web Port Map
  kind: action
  command: "E port#MH}"
  params:
    - name: port
      type: integer
      description: Web port number
  response: "Pmh port# ]"

- id: reset_web_port_map
  label: Reset Web Port Map
  kind: action
  command: "E 80MH}"
  params: []
  response: "Pmh 00080 ]"

- id: disable_web_port_map
  label: Disable Web Port Map
  kind: action
  command: "E 0MH}"
  params: []
  response: "Pmh 00000 ]"

- id: view_web_port_map
  label: View Web Port Map
  kind: query
  command: "E MH}"
  params: []
  response: "port# ]"

# ---- Directory Commands ----
- id: change_create_directory
  label: Change Or Create A Directory
  kind: action
  command: "E path/directory/CJ}"
  params:
    - name: path
      type: string
      description: Directory path
  response: "Dir •path/directory/ ]"

- id: move_to_root_directory
  label: Move Back To Root Directory
  kind: action
  command: "E /CJ}"
  params: []
  response: "Dir •/ ]"

- id: move_up_directory
  label: Move Up One Directory
  kind: action
  command: "E ..CJ}"
  params: []
  response: "-"

# ---- File Erase Commands ----
- id: erase_file
  label: Erase User-supplied Web Page Or File
  kind: action
  command: "E filename EF}"
  params:
    - name: filename
      type: string
      description: File to erase
  response: "Del •filename ]"

- id: erase_current_directory
  label: Erase Current Directory And Its Files
  kind: action
  command: "E /EF}"
  params: []
  response: "Ddl ]"

- id: erase_directory_recursive
  label: Erase Current Directory And Subdirectories
  kind: action
  command: "E //EF}"
  params: []
  response: "Ddl ]"

# ---- File Listing Commands ----
- id: list_files
  label: List Files From Current Directory
  kind: query
  command: "E DF}"
  params: []
  response: "filename x • date/time • length ] (per line)"

- id: list_files_recursive
  label: List Files From Current Directory And Below
  kind: query
  command: "E LF}"
  params: []
  response: "path/directory/filename x • date/time • length ] (per line)"

# ---- Stream Files via Telnet ----
- id: load_file_to_user_memory
  label: Load File To User Memory
  kind: action
  command: "E +UF filesize,filename}"
  params:
    - name: filesize
      type: integer
      description: File size in bytes
    - name: filename
      type: string
      description: File name
  response: "Upl ]"

- id: retrieve_file_from_flash
  label: Retrieve File From User Flash Memory
  kind: query
  command: "E filename SF}"
  params:
    - name: filename
      type: string
      description: File name
  response: "ESC filename SF CR, then four bytes of file size + raw data"

# ---- Reset (Zap) and Erase ----
- id: erase_user_flash
  label: Erase User Flash Memory (Files Only)
  kind: action
  command: "E ZFFF}"
  params: []
  response: "Zpf ]"

- id: factory_reset_all
  label: Reset All Device Settings To Factory Default
  kind: action
  command: "E ZXXX}"
  params: []
  response: "Zpx ]"

- id: absolute_system_reset
  label: Absolute System Reset
  kind: action
  command: "E ZQQQ}"
  params: []
  response: "Zpq ]"
```

## Feedbacks
```yaml
# Error responses documented in source (E-codes):
- id: error_e12
  type: enum
  values: ["E12 - Invalid port number"]
- id: error_e13
  type: enum
  values: ["E13 - Invalid value (out of range/too large)"]
- id: error_e14
  type: enum
  values: ["E14 - Not valid for this configuration"]
- id: error_e17
  type: enum
  values: ["E17 - System timed out"]
- id: error_e22
  type: enum
  values: ["E22 - Busy"]
- id: error_e24
  type: enum
  values: ["E24 - Privilege violation"]
- id: error_e25
  type: enum
  values: ["E25 - Device is not present"]
- id: error_e26
  type: enum
  values: ["E26 - Maximum connections exceeded"]
- id: error_e27
  type: enum
  values: ["E27 - Invalid event number"]
- id: error_e28
  type: enum
  values: ["E28 - Bad filename or file not found"]

# Receptacle power state (returned by X!PC):
- id: receptacle_power_state
  type: enum
  values: [off, on]   # X% - 0=off, 1=on

# Receptacle current threshold sense (returned by X!PS):
- id: receptacle_threshold_state
  type: enum
  values: [none, standby, full]   # X( - 0=clear/none, 1=standby, 2=full

# Connection security level:
- id: security_level
  type: enum
  values: [user, administrator]   # X5@ - 11=user, 12=admin
```

## Variables
```yaml
# Settable parameters not covered as discrete actions are parameterized inline above.
# Top-level settable: unit_name (X1@), ip_address (X1$), subnet_mask (X1(),
# gateway (X1$), gmt_offset (X#), dst (X3$), dhcp (X%), verbose_mode (X2@),
# admin_password (X3#), user_password (X3#), mail_server_ip (X1$),
# domain_name (X1%), power_up_delay (X1^), telnet_port, web_port.
# See Actions for command templates.
```

## Events
```yaml
# Unsolicited PCS4-initiated messages documented in source:
- id: boot_banner
  description: >
    Sent when unit first powers on and connects via Telnet/TCP. Format:
    "© Copyright 20nn, Extron Electronics, IPL T PCS4 [or -PCS4i], Vn.nn, 60-544-nn ]"
    followed by "Www, DD Mmm 2011 HH:MM:SS ]"
- id: password_prompt
  description: "] Password:" prompt (only if a password is defined)
- id: verbose_unsolicited
  description: >
    Verbose-mode unsolicited notices (e.g. power level change). Disabled by
    default over Ethernet; must be re-enabled each reconnect.
```

## Macros
```yaml
# No multi-step macros documented as discrete sequences in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for:
  - absolute_system_reset          # E ZQQQ} - breaks all TCP/IP sockets, factory reset
  - factory_reset_all              # E ZXXX} - resets all settings to factory default
  - erase_user_flash               # E ZFFF} - erases user files
  - erase_directory_recursive      # E //EF} - recursive delete
  - erase_current_directory        # E /EF} - directory + files delete
interlocks:
  - "Reset modes break all TCP/IP connections by closing all sockets (source ATTENTION note)."
  - "Mode 4 reset requires physical Reset button hold (~6s) + momentary press (<1s)."
  - "User password cannot be assigned if admin password absent; clearing admin pw also removes user pw."
# UNRESOLVED: no explicit voltage/current interlock sequences documented in source text.
```

## Notes
- Two transport paths share the same SIS command set: Telnet (TCP 23) uses ASCII with `E`=ESC and `}`=CR; web browser (TCP 80) uses `W` prefix, `%2A` for `*`, and `|` for CR.
- Symbol legend: `]`=CR/LF (0x0D 0A), `}`=CR (0x0D), `E`=ESC (0x1B), `W`=web equivalent of ESC, `|`=pipe (URL equiv of CR), `•`=space, `*`=command char (not a variable).
- Numbers may be entered as 1/2/3 digits (e.g. `8V`=`08V`=`008V`); commands can be sent back-to-back without spaces (e.g. `2!65V1Z`).
- Variable reference (see source "Variable Reference KEY consolidated" for full X## legend): X!=receptacle 1-4, X%=on/off, X(=threshold sense, X1^=power-up delay, X1$=IP, X1(=mask, X1@=unit name, X2@=verbose, X3#=password, X4%=mailbox, X6#=pulse time, X6(=IP timeout, X70!-X70*=alarm fields, X71)/X71!/X71@=scheduling fields.
- Error codes E12-E28 documented (see Feedbacks).
- Default IP `192.168.254.254`, mask `255.255.0.0`, gateway `0.0.0.0`, DHCP off.
- Factory passwords default to device serial number; revert to `extron` after absolute reset.
- Part numbers: 60-544-07 / 60-544-09.

<!-- UNRESOLVED: full scheduling sub-table (X71!/X71@ enumerations) truncated in source PDF extraction. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source (banner shows Vn.nn placeholder). -->
<!-- UNRESOLVED: voltage/current specs for receptacles not stated in refined source (110/220 VAC mentioned in model description only). -->
<!-- UNRESOLVED: protocol version number not stated. -->
````

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - aca.im
source_urls:
  - https://media.extron.com/public/download/files/userman/68-738-07_C_IPL_T_PCS4_UG.pdf
  - https://www.extron.com/product/ipltpcs4i
  - https://www.extron.com/download/control-system-drivers
  - https://aca.im/driver_docs/Extron/PDU_IPL_T_PCS4.pdf
  - https://www.extron.com/download/files/userman/68-738-07_C_IPL_T_PCS4_UG.pdf
retrieved_at: 2026-06-14T23:37:15.832Z
last_checked_at: 2026-06-16T07:05:19.221Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:05:19.221Z
matched_actions: 99
action_count: 99
confidence: medium
summary: "All 99 actions matched exactly against source command tables; transport parameters fully documented; spec comprehensively represents source command catalogue. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full scheduling sub-table truncated in source extraction (X71!/X71@ enumerations incomplete)."
- "source table truncated)\""
- "full X71!/X71@ parameter enumerations truncated in source extraction."
- "none documented."
- "no explicit voltage/current interlock sequences documented in source text."
- "full scheduling sub-table (X71!/X71@ enumerations) truncated in source PDF extraction."
- "firmware version compatibility not stated in source (banner shows Vn.nn placeholder)."
- "voltage/current specs for receptacles not stated in refined source (110/220 VAC mentioned in model description only)."
- "protocol version number not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
