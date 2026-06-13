---
spec_id: admin/extron-smd101-smd202
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron SMD 101 / SMD 202 Control Spec"
manufacturer: Extron
model_family: "SMD 101"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "SMD 101"
    - "SMD 202"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - manualshelf.com
  - manua.ls
source_urls:
  - https://www.extron.com/download/files/userman/smd101-68-2231-01_E.pdf
  - "https://www.extron.com/download/get/?path=/download/files/userman/68-2231-50_A.pdf&amp;path=/download/files/userman/68-2231-50_A.pdf"
  - https://www.extron.com/download/
  - https://www.manualshelf.com/manual/extron-electronics/smd-101/user-guide-english.html
  - https://www.manua.ls/extron/smd-101/manual
retrieved_at: 2026-06-11T05:13:20.693Z
last_checked_at: 2026-06-11T13:42:37.021Z
generated_at: 2026-06-11T13:42:37.021Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "E 1ZQQQ"
  - "exact electrical specs (voltage/current/power) not in source; specific differences between SMD 101 and SMD 202 not stated in refined doc."
  - "specific unsolicited message formats beyond the copyright/banner"
  - "remove section if not applicable"
  - "detailed SMD 202 vs SMD 101 capability diffs; specific SMB/CIFS share options field parsing; UPGS status query command (X58% is defined but its command is not in the refined excerpt); firmware version 2.05 mentioned as a threshold for CEC and SMB but exact supported range not specified."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:42:37.021Z
  matched_actions: 264
  action_count: 264
  confidence: medium
  summary: "All 264 spec actions have literal wire-level matches in source command tables; transport confirmed; only one minor extra (E 1ZQQQ network-reset variant). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Extron SMD 101 / SMD 202 Control Spec

## Summary
The Extron SMD 101 and SMD 202 are H.264 Streaming Media Decoders. They accept SIS (Simple Instruction Set) commands over rear-panel RS-232, front-panel USB configuration, and rear-panel Ethernet (Telnet/TCP, SSH, HTTP/HTTPS, SNMP). The decoder streams H.264 video and decodes to HDMI output, with playback, file management, EDID, HDCP, and CEC controls.

<!-- UNRESOLVED: exact electrical specs (voltage/current/power) not in source; specific differences between SMD 101 and SMD 202 not stated in refined doc. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # Telnet/SIS default; HTTP=80, HTTPS=443, SSH=22023, SNMP=161, SFTP=22022, Serial pass-through=2001
auth:
  type: password  # Source: Password Information section; password prompt described for telnet connections; defaults to device serial number; reset clears passwords
```

**Notes on auth:** The device sends a copyright message followed by a `Password:` prompt. Correct entry replies with `Login User` or `Login Administrator`. Factory passwords = device serial number. Some resets revert to "no password" configuration.

**Notes on serial:** Defaults are 9600, N, 8, 1, no flow control. Configurable via SIS (`CP` command) — baud 300–115200, parity O/E/N/M/S, data 7 or 8, stop 1 or 2. Port also usable as pass-through (`HSTM` mode 02).

**Notes on TCP:** Telnet port 23 is the default SIS port and is reconfigurable (`MT` command). SSH at 22023. Web/HTTP at 80, HTTPS at 443. SNMP at 161. Serial pass-through at 2001. SFTP at 22022.

## Traits
```yaml
- powerable       # inferred from power save/standby PSAV/PTIM commands
- routable        # inferred from input selection commands (decoder vs HDMI)
- queryable       # inferred from Q, *Q, 2Q-4Q, I/i, plus all "View" commands
- levelable       # inferred from output volume commands (V, +V, -V) and audio delay
```

## Actions
```yaml
# --- Information requests ---
- id: firmware_version
  label: Firmware Version
  kind: query
  command: "Q"
  params: []
- id: firmware_and_patch_version
  label: Firmware and Patch Version
  kind: query
  command: "*Q"
  params: []
- id: verbose_version_info
  label: Verbose Version Info
  kind: query
  command: "0Q"
  params: []
- id: bootstrap_version
  label: Bootstrap Version
  kind: query
  command: "2Q"
  params: []
- id: factory_firmware_version
  label: Factory Firmware Version
  kind: query
  command: "3Q"
  params: []
- id: updated_firmware_version
  label: Updated Firmware Version
  kind: query
  command: "4Q"
  params: []
- id: query_part_number
  label: Query Part Number
  kind: query
  command: "N"
  params: []
- id: query_model_number
  label: Query Model Number
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
- id: view_processor_usage
  label: View Processor Usage
  kind: query
  command: "11I"
  params: []
- id: view_processor_idle
  label: View Processor Idle
  kind: query
  command: "12I"
  params: []
- id: view_eth0_link_status
  label: View eth0 Link Status
  kind: query
  command: "13I"
  params: []
- id: view_telnet_connections
  label: View Telnet Connections
  kind: query
  command: "E CC"
  params: []
- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E X2@ CV"
  params:
    - name: mode
      type: integer
      description: "0=off, 1=verbose, 2=tagged, 3=verbose+tagged"
- id: view_verbose_mode
  label: View Verbose Mode
  kind: query
  command: "E CV"
  params: []

# --- System / Configuration / IR ---
- id: save_box_configuration
  label: Save Box Configuration
  kind: action
  command: "E 1*{config type}XF"
  params: []
- id: restore_box_configuration
  label: Restore Box Configuration
  kind: action
  command: "E 0*{config type}XF"
  params: []
- id: set_ir_input
  label: Set IR Input
  kind: action
  command: "E X60@ IREN"
  params:
    - name: ir_input
      type: integer
      description: "0=disabled, 1=front (default), 2=rear"
- id: view_ir_input
  label: View IR Input
  kind: query
  command: "E IREN"
  params: []

# --- Power Save / Standby ---
- id: set_power_save_mode
  label: Set Power Save Mode
  kind: action
  command: "E X60# PSAV"
  params:
    - name: psav
      type: integer
      description: "0=inactive (default), 1=active"
- id: view_power_save_mode
  label: View Power Save Mode
  kind: query
  command: "E PSAV"
  params: []
- id: set_standby_timer
  label: Set Standby Timer
  kind: action
  command: "E X60$ PTIM"
  params:
    - name: minutes
      type: integer
      description: "0-500 minutes; 0=off (default)"
- id: view_standby_timer
  label: View Standby Timer
  kind: query
  command: "E PTIM"
  params: []
- id: internal_temperature
  label: Internal Temperature
  kind: query
  command: "E 20STAT"
  params: []

# --- Resets ---
- id: reboot_system
  label: Reboot System
  kind: action
  command: "E 1BOOT"
  params: []
- id: restart_network
  label: Restart Network
  kind: action
  command: "E 2BOOT"
  params: []
- id: reset_flash
  label: Reset Flash
  kind: action
  command: "E ZFFF"
  params: []
- id: system_reset_factory_defaults
  label: System Reset (Factory Defaults)
  kind: action
  command: "E ZXXX"
  params: []
- id: reset_settings_delete_files
  label: Reset All Settings and Delete Files
  kind: action
  command: "E ZY"
  params: []
- id: absolute_reset
  label: Absolute Reset
  kind: action
  command: "E ZQQQ"
  params: []

# --- Port Assignment ---
- id: set_telnet_port
  label: Set Telnet Port
  kind: action
  command: "E [port#]MT"
  params:
    - name: port
      type: integer
      description: "telnet port (default 23, must be 1024+ unless resetting/disabling)"
- id: reset_telnet_port
  label: Reset Telnet Port
  kind: action
  command: "E 23MT"
  params: []
- id: disable_telnet_port
  label: Disable Telnet Port
  kind: action
  command: "E 0MT"
  params: []
- id: view_telnet_port
  label: View Telnet Port
  kind: query
  command: "E MT"
  params: []
- id: set_web_port
  label: Set Web Port
  kind: action
  command: "E [port#]MH"
  params:
    - name: port
      type: integer
      description: "web port (default 80, must be 1024+ unless resetting/disabling)"
- id: reset_web_port
  label: Reset Web Port
  kind: action
  command: "E 80MH"
  params: []
- id: disable_web_port
  label: Disable Web Port
  kind: action
  command: "E 0MH"
  params: []
- id: view_web_port
  label: View Web Port
  kind: query
  command: "E MH"
  params: []
- id: set_snmp_port
  label: Set SNMP Port
  kind: action
  command: "E A[port#]PMAP"
  params:
    - name: port
      type: integer
      description: "SNMP port (default 161, 0=disabled)"
- id: reset_snmp_port
  label: Reset SNMP Port
  kind: action
  command: "E A 161PMAP"
  params: []
- id: disable_snmp_port
  label: Disable SNMP Port
  kind: action
  command: "E A 0PMAP"
  params: []
- id: view_snmp_port
  label: View SNMP Port
  kind: query
  command: "E A PMAP"
  params: []
- id: set_ssh_port
  label: Set SSH Port
  kind: action
  command: "E B[port#]PMAP"
  params:
    - name: port
      type: integer
      description: "SSH port (default 22023, 0=disabled)"
- id: reset_ssh_port
  label: Reset SSH Port
  kind: action
  command: "E B 22023PMAP"
  params: []
- id: disable_ssh_port
  label: Disable SSH Port
  kind: action
  command: "E B 0PMAP"
  params: []
- id: view_ssh_port
  label: View SSH Port
  kind: query
  command: "E B PMAP"
  params: []
- id: set_ssl_port
  label: Set SSL Port
  kind: action
  command: "E S[port#]PMAP"
  params:
    - name: port
      type: integer
      description: "SSL port (default 443, 0=disabled)"
- id: reset_ssl_port
  label: Reset SSL Port
  kind: action
  command: "E S 443PMAP"
  params: []
- id: disable_ssl_port
  label: Disable SSL Port
  kind: action
  command: "E S 0PMAP"
  params: []
- id: view_ssl_port
  label: View SSL Port
  kind: query
  command: "E S PMAP"
  params: []
- id: set_direct_access_port
  label: Set Direct Access Port
  kind: action
  command: "E [port#]MD"
  params:
    - name: port
      type: integer
      description: "direct access port (default 2001, 0=disabled)"
- id: reset_direct_access_port
  label: Reset Direct Access Port
  kind: action
  command: "E 2001MD"
  params: []
- id: disable_direct_access_port
  label: Disable Direct Access Port
  kind: action
  command: "E 0MD"
  params: []
- id: view_direct_access_port
  label: View Direct Access Port
  kind: query
  command: "E MD"
  params: []
- id: set_serial_passthrough_port
  label: Set Serial Pass-through Port
  kind: action
  command: "E A[port#]PXMAP"
  params:
    - name: port
      type: integer
      description: "serial pass-through port (default 2001, 0=disabled)"
- id: reset_serial_passthrough_port
  label: Reset Serial Pass-through Port
  kind: action
  command: "E A 2001PXMAP"
  params: []
- id: disable_serial_passthrough_port
  label: Disable Serial Pass-through Port
  kind: action
  command: "E A 0PXMAP"
  params: []
- id: view_serial_passthrough_port
  label: View Serial Pass-through Port
  kind: query
  command: "E A PXMAP"
  params: []
- id: set_sftp_port
  label: Set SFTP Port
  kind: action
  command: "E 22[port#]PMAP"
  params:
    - name: port
      type: integer
      description: "SFTP port (default 22022, 0=disabled)"
- id: reset_sftp_port
  label: Reset SFTP Port
  kind: action
  command: "E 22 22022PMAP"
  params: []
- id: disable_sftp_port
  label: Disable SFTP Port
  kind: action
  command: "E 22 0PMAP"
  params: []
- id: view_sftp_port
  label: View SFTP Port
  kind: query
  command: "E 22 PMAP"
  params: []

# --- IP Setup / Communications ---
- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "E X1@ CN"
  params:
    - name: name
      type: string
      description: "up to 63 chars, RFC1123 host name"
- id: set_unit_name_factory
  label: Set Unit Name to Factory Default
  kind: action
  command: "E • CN"
  params: []
- id: view_unit_name
  label: View Unit Name
  kind: query
  command: "E CN"
  params: []
- id: set_date_time
  label: Set Date and Time
  kind: action
  command: "E MM/DD/YY-HH:MM:SS CT"
  params: []
- id: view_date_time
  label: View Date / Time
  kind: query
  command: "E CT"
  params: []
- id: set_time_zone
  label: Set Time Zone
  kind: action
  command: "E X60( * TZON"
  params:
    - name: zone
      type: string
      description: "2-6 letter zone abbreviation (e.g. PST)"
- id: view_time_zone
  label: View Time Zone
  kind: query
  command: "E TZON"
  params: []
- id: view_all_time_zones
  label: View All Time Zones
  kind: query
  command: "E * TZON"
  params: []
- id: set_dhcp_on
  label: Set DHCP On
  kind: action
  command: "E 1DH"
  params: []
- id: set_dhcp_off
  label: Set DHCP Off
  kind: action
  command: "E 0DH"
  params: []
- id: view_dhcp_mode
  label: View DHCP Mode
  kind: query
  command: "E DH"
  params: []
- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "E X1$ CI"
  params:
    - name: ip
      type: string
      description: "dotted decimal xxx.xxx.xxx.xxx"
- id: view_ip_address
  label: View IP Address
  kind: query
  command: "E CI"
  params: []
- id: view_mac_address
  label: View Hardware MAC Address
  kind: query
  command: "E CH"
  params: []
- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "E X1( CS"
  params:
    - name: mask
      type: string
      description: "dotted decimal subnet mask"
- id: view_subnet_mask
  label: View Subnet Mask
  kind: query
  command: "E CS"
  params: []
- id: set_gateway
  label: Set Gateway IP
  kind: action
  command: "E X1% CG"
  params:
    - name: gateway
      type: string
      description: "dotted decimal gateway IP"
- id: view_gateway
  label: View Gateway IP
  kind: query
  command: "E CG"
  params: []
- id: set_dns_server
  label: Set DNS Server IP
  kind: action
  command: "E X1$ DI"
  params:
    - name: dns
      type: string
      description: "dotted decimal DNS IP"
- id: view_dns_server
  label: View DNS Server IP
  kind: query
  command: "E DI"
  params: []
- id: set_ip_subnet_gateway
  label: Set IP, Subnet, Gateway (CISG)
  kind: action
  command: "E X57^ * X1$ * X1( * X1% CISG"
  params:
    - name: interface_id
      type: integer
      description: "Network interface ID (first NIC=1)"
    - name: ip
      type: string
    - name: mask
      type: string
    - name: gateway
      type: string
- id: view_ip_subnet_gateway
  label: View IP, Subnet, Gateway
  kind: query
  command: "E X57^ CISG"
  params: []
- id: ping_remote
  label: Ping Remote IP/URI
  kind: action
  command: "E X58^ PING"
  params:
    - name: target
      type: string
      description: "IP address or URI"
- id: set_global_port_timeout
  label: Set Global IP Port Timeout
  kind: action
  command: "E 1* X6( TC"
  params:
    - name: seconds
      type: integer
      description: "port timeout in seconds, 0-padded (default 30=300s)"
- id: set_current_port_timeout
  label: Set Current Port Timeout
  kind: action
  command: "E 0 * X6( TC"
  params:
    - name: seconds
      type: integer
- id: view_current_port_timeout
  label: View Current Port Timeout
  kind: query
  command: "E 0 TC"
  params: []
- id: view_global_port_timeout
  label: View Global IP Port Timeout
  kind: query
  command: "E 1 TC"
  params: []

# --- RS-232 (Communications) ---
- id: set_rs232_port_mode
  label: Set RS-232 Port Mode
  kind: action
  command: "E X5) HSTM"
  params:
    - name: mode
      type: integer
      description: "00=disabled, 01=host control (default), 02=direct access pass-through"
- id: view_rs232_port_mode
  label: View RS-232 Port Mode
  kind: query
  command: "E HSTM"
  params: []
- id: configure_serial_port
  label: Configure Serial Port Parameters
  kind: action
  command: "E 1* X2%, X2^, X2&, X2* CP"
  params:
    - name: baud
      type: integer
      description: "300-115200 bps, default 9600"
    - name: parity
      type: string
      description: "O/E/N(default)/S/M"
    - name: data_bits
      type: integer
      description: "7 or 8 (default 8)"
    - name: stop_bits
      type: integer
      description: "1 (default) or 2"
- id: reset_serial_port
  label: Reset Serial Port
  kind: action
  command: "E 1*9600,n,8,1 CP"
  params: []
- id: view_serial_port_settings
  label: View Serial Port Settings
  kind: query
  command: "E 1CP"
  params: []

# --- SNMP ---
- id: set_snmp_unit_contact
  label: Set SNMP Unit Contact
  kind: action
  command: "E C X60% SNMP"
  params:
    - name: contact
      type: string
      description: "up to 64 chars"
- id: set_snmp_unit_contact_default
  label: Set SNMP Unit Contact to Default
  kind: action
  command: "E C • SNMP"
  params: []
- id: view_snmp_unit_contact
  label: View SNMP Unit Contact
  kind: query
  command: "E CSNMP"
  params: []
- id: set_snmp_unit_location
  label: Set SNMP Unit Location
  kind: action
  command: "E L X60^ SNMP"
  params:
    - name: location
      type: string
      description: "up to 64 chars"
- id: set_snmp_unit_location_default
  label: Set SNMP Unit Location to Default
  kind: action
  command: "E L • SNMP"
  params: []
- id: view_snmp_unit_location
  label: View SNMP Unit Location
  kind: query
  command: "E LSNMP"
  params: []
- id: set_snmp_public_password
  label: Set SNMP Public Password
  kind: action
  command: "E P X60& SNMP"
  params: []
- id: set_snmp_public_password_default
  label: Set SNMP Public Password to Default
  kind: action
  command: "E P • SNMP"
  params: []
- id: view_snmp_public_password
  label: View SNMP Public Password
  kind: query
  command: "E PSNMP"
  params: []
- id: set_snmp_private_password
  label: Set SNMP Private Password
  kind: action
  command: "E X X60* SNMP"
  params: []
- id: set_snmp_private_password_default
  label: Set SNMP Private Password to Default
  kind: action
  command: "E X • SNMP"
  params: []
- id: enable_snmp_access
  label: Enable SNMP Access
  kind: action
  command: "E E1SNMP"
  params: []
- id: disable_snmp_access
  label: Disable SNMP Access
  kind: action
  command: "E E0SNMP"
  params: []
- id: view_snmp_state
  label: View SNMP State
  kind: query
  command: "E ESNMP"
  params: []

# --- Password and Security ---
- id: set_admin_password
  label: Set Administrator Password
  kind: action
  command: "E X3# CA"
  params:
    - name: password
      type: string
      description: "up to 128 printable chars, no '|'"
- id: view_admin_password
  label: View Administrator Password
  kind: query
  command: "E CA"
  params: []
- id: reset_admin_password
  label: Reset Administrator Password
  kind: action
  command: "E • CA"
  params: []
- id: set_user_password
  label: Set User Password
  kind: action
  command: "E X3# CU"
  params: []
- id: view_user_password
  label: View User Password
  kind: query
  command: "E CU"
  params: []
- id: reset_user_password
  label: Reset User Password
  kind: action
  command: "E • CU"
  params: []
- id: view_session_security_level
  label: View Session Security Level
  kind: query
  command: "E CK"
  params: []

# --- File Commands ---
- id: view_local_storage_free_space
  label: View Local Storage Free Space
  kind: query
  command: "15I"
  params: []
- id: change_or_create_directory
  label: Change or Create Directory
  kind: action
  command: "E path/directory/ CJ"
  params: []
- id: return_to_root_directory
  label: Return to Root Directory
  kind: action
  command: "E /CJ"
  params: []
- id: up_one_directory
  label: Up One Directory
  kind: action
  command: "E .. CJ"
  params: []
- id: view_current_directory
  label: View Current Directory
  kind: query
  command: "E CJ"
  params: []
- id: erase_user_file
  label: Erase User-Supplied File
  kind: action
  command: "E filename EF"
  params: []
- id: erase_current_directory
  label: Erase Current Directory and Files
  kind: action
  command: "E /EF"
  params: []
- id: erase_current_directory_subdirs
  label: Erase Current Directory and Sub-directories
  kind: action
  command: "E // EF"
  params: []
- id: list_files_current_directory
  label: List Files in Current Directory
  kind: query
  command: "E DF"
  params: []
- id: list_files_recursive
  label: List Files (Recursive)
  kind: query
  command: "E LF"
  params: []
- id: append_local_file_to_list
  label: Append Local File to List
  kind: action
  command: "E F filename EF"
  params: []
- id: remove_file_from_list
  label: Remove File from List
  kind: action
  command: "E F EF"
  params: []
- id: set_still_image_display_time
  label: Set Still Image Display Time
  kind: action
  command: "E T X2) SSHW"
  params:
    - name: ms
      type: integer
      description: "milliseconds"
- id: query_still_image_display_time
  label: Query Still Image Display Time
  kind: query
  command: "E TSSHW"
  params: []
- id: set_slide_show_fade_duration
  label: Set Slide Show Fade Duration
  kind: action
  command: "E D X62) SSHW"
  params: []
- id: query_slide_show_fade_duration
  label: Query Slide Show Fade Duration
  kind: query
  command: "E D SSHW"
  params: []
- id: set_slide_show_transition_effect
  label: Set Slide Show Transition Effect
  kind: action
  command: "E E X62) SSHW"
  params: []
- id: query_slide_show_transition_effect
  label: Query Slide Show Transition Effect
  kind: query
  command: "E E SSHW"
  params: []

# --- Input Selection ---
- id: select_input
  label: Select Input
  kind: action
  command: "X50!"
  params:
    - name: input
      type: integer
      description: "1=Decoder, 2=HDMI"
- id: view_input
  label: View Input
  kind: query
  command: ""
  params: []
- id: input_information
  label: Input Information
  kind: query
  command: "I/i"
  params: []

# --- Input EDID (Input 2 only) ---
- id: assign_edid_to_input2
  label: Assign EDID to Input 2
  kind: action
  command: "E A 2* X52! EDID"
  params:
    - name: edid_code
      type: integer
      description: "See EDID resolution table (e.g. 00=Auto, 45=1080p@60Hz)"
- id: view_edid_on_input2
  label: View EDID on Input 2
  kind: query
  command: "E A 2 EDID"
  params: []
- id: save_display_edid_to_user_slot
  label: Save Display EDID to User Slot
  kind: action
  command: "E S 1 * 2 EDID"
  params: []
- id: export_edid
  label: Export EDID File
  kind: action
  command: "E E2,<filename> EDID"
  params: []
- id: import_edid
  label: Import EDID File
  kind: action
  command: "E I2,<filename> EDID"
  params: []

# --- Input Configuration (aspect) ---
- id: set_aspect_zoom
  label: Set Aspect Zoom (Fit)
  kind: action
  command: "E 1*0ASPR"
  params: []
- id: set_aspect_fill
  label: Set Aspect Fill
  kind: action
  command: "E 1*1ASPR"
  params: []
- id: set_aspect_follow
  label: Set Aspect Follow
  kind: action
  command: "E 1*2ASPR"
  params: []
- id: view_aspect_setting
  label: View Aspect Setting
  kind: query
  command: "E 1 ASPR"
  params: []

# --- Audio (input) ---
- id: audio_input_none
  label: Audio Input None (Mute)
  kind: action
  command: "E I X50! *0 AFMT"
  params: []
- id: audio_input_lpcm
  label: Audio Input LPCM-2Ch
  kind: action
  command: "E I X50! *1AFMT"
  params: []
- id: audio_input_multich
  label: Audio Input Multi-Ch
  kind: action
  command: "E I X50! *2AFMT"
  params: []
- id: set_static_audio_delay
  label: Set Static Audio Delay
  kind: action
  command: "E S X55( ADLY"
  params:
    - name: delay
      type: integer
      description: "milliseconds"
- id: view_static_audio_delay
  label: View Static Audio Delay
  kind: query
  command: "E SADLY"
  params: []

# --- Streaming queries ---
- id: query_peak_video_bitrate
  label: Current Source Peak Video Bit Rate
  kind: query
  command: "E MBITR"
  params: []
- id: query_audio_bitrate
  label: Current Source Audio Bit Rate
  kind: query
  command: "E ABITR"
  params: []
- id: query_audio_sample_rate
  label: Current Source Audio Sample Rate
  kind: query
  command: "E AUSR"
  params: []
- id: query_video_bitrate
  label: Current Source Video Bit Rate
  kind: query
  command: "E VBITR"
  params: []
- id: query_total_bitrate
  label: Current Source Total Bit Rate
  kind: query
  command: "E SBITR"
  params: []
- id: query_stream_mode
  label: Current Source Stream Mode
  kind: query
  command: "E SMOD"
  params: []

# --- Playback ---
- id: start_playback
  label: Start Playback
  kind: action
  command: "E S X59! * X59# PLYR"
  params:
    - name: channel
      type: integer
      description: "playback channel (always 1 for single-channel devices)"
    - name: speed
      type: integer
      description: "1=normal speed"
- id: pause_playback
  label: Pause Playback
  kind: action
  command: "E E X59! PLYR"
  params: []
- id: stop_playback
  label: Stop Playback
  kind: action
  command: "E O X59! PLYR"
  params: []
- id: view_playback_state
  label: View Playback State
  kind: query
  command: "E Y X59! PLYR"
  params: []
- id: loop_play_on
  label: Loop Play On
  kind: action
  command: "E R X59! *1PLYR"
  params: []
- id: loop_play_off
  label: Loop Play Off
  kind: action
  command: "E R X59! *0PLYR"
  params: []
- id: view_loop_play_status
  label: View Loop Play Status
  kind: query
  command: "E R X59! PLYR"
  params: []
- id: enable_subtitles
  label: Enable Subtitles
  kind: action
  command: "E E X59! *1SUBT"
  params: []
- id: disable_subtitles
  label: Disable Subtitles
  kind: action
  command: "E E X59! *0SUBT"
  params: []
- id: view_subtitle_status
  label: View Subtitle Status
  kind: query
  command: "E E X59! SUBT"
  params: []
- id: select_next_track
  label: Select Next Track
  kind: action
  command: "E N X59! PLYR"
  params: []
- id: select_previous_track
  label: Select Previous Track
  kind: action
  command: "E P X59! PLYR"
  params: []
- id: view_current_timecode
  label: View Current Timecode
  kind: query
  command: "E K X59! PLYR"
  params: []
- id: view_current_clip_length
  label: View Current Clip Length
  kind: query
  command: "E Z X59! PLYR"
  params: []
- id: seek_by_offset
  label: Seek by Offset
  kind: action
  command: "E J X59! * X1) PLYR"
  params:
    - name: seconds
      type: integer
- id: seek_to_timecode
  label: Seek to Timecode
  kind: action
  command: "E K X59! * X59$ PLYR"
  params: []
- id: load_playlist
  label: Load Playlist
  kind: action
  command: "E L X59! * X59^ PLYR"
  params: []
- id: view_current_playlist
  label: View Current Playlist
  kind: query
  command: "E L X59! PLYR"
  params: []
- id: view_files_in_playlist
  label: View Files in Playlist
  kind: query
  command: "E G X59* PLST"
  params: []
- id: clear_playlist_and_source
  label: Clear Playlist and Source
  kind: action
  command: "E X X59! PLYR"
  params: []
- id: load_media_item_path
  label: Load Media Item Path
  kind: action
  command: "E U X59! * X59^ PLYR"
  params: []
- id: view_current_media_path
  label: View Current Media Path
  kind: query
  command: "E U X59! PLYR"
  params: []

# --- Channel Preset (Short Form) ---
- id: view_current_preset_short
  label: View Current Preset (Short)
  kind: query
  command: "T"
  params: []
- id: recall_preset_by_reference_short
  label: Recall Preset (Short)
  kind: action
  command: "X59& T"
  params:
    - name: preset
      type: integer
      description: "1-999"
- id: next_preset_short
  label: Next Preset (Short)
  kind: action
  command: "+T"
  params: []
- id: previous_preset_short
  label: Previous Preset (Short)
  kind: action
  command: "-T"
  params: []

# --- Channel Preset (Long Form) ---
- id: view_current_preset_long
  label: View Current Preset (Long)
  kind: query
  command: "E T X59! TVPR"
  params: []
- id: recall_preset_by_reference_long
  label: Recall Preset (Long)
  kind: action
  command: "E T X59! * X59& TVPR"
  params: []
- id: next_preset_long
  label: Next Preset (Long)
  kind: action
  command: "E T X59! +TVPR"
  params: []
- id: previous_preset_long
  label: Previous Preset (Long)
  kind: action
  command: "E T X59! -TVPR"
  params: []
- id: view_all_presets
  label: View All Presets
  kind: query
  command: "E GTVPR"
  params: []
- id: save_uri_to_preset
  label: Save URI to Preset
  kind: action
  command: "E U X59& * X59* TVPR"
  params: []
- id: save_current_uri_to_preset
  label: Save Current URI to Preset
  kind: action
  command: "E S X59! * X59& TVPR"
  params: []
- id: import_channel_preset
  label: Import Channel Preset
  kind: action
  command: "E I* X59^ TVPR"
  params: []
- id: export_channel_preset
  label: Export Channel Preset
  kind: action
  command: "E E* X59^ TVPR"
  params: []
- id: delete_preset
  label: Delete Preset
  kind: action
  command: "E X X59& TVPR"
  params: []
- id: delete_all_presets
  label: Delete All Presets
  kind: action
  command: "E X*0TVPR"
  params: []

# --- Discovered Streams and Custom Keys ---
- id: view_discovered_streams
  label: View Discovered Streams
  kind: query
  command: "E XSAP"
  params: []
- id: import_custom_key
  label: Import Custom Key
  kind: action
  command: "E E MKEY"
  params: []
- id: view_custom_key_state
  label: View Custom Key State
  kind: query
  command: "E I [File location] MKEY"
  params: []
- id: view_custom_keys
  label: View Custom Keys
  kind: query
  command: "E E MKEY"
  params: []
- id: delete_custom_key
  label: Delete Custom Key
  kind: action
  command: "E D [Key Name] MKEY"
  params: []
- id: delete_all_custom_keys
  label: Delete All Custom Keys
  kind: action
  command: "E D MKEY"
  params: []

# --- Favorites ---
- id: get_all_favorites
  label: Get All Favorites
  kind: query
  command: "E GFAVS"
  params: []
- id: get_favorite_item
  label: Get Favorite Item
  kind: query
  command: "E G X61% FAVS"
  params: []
- id: add_uri_to_favorites
  label: Add URI to Favorites
  kind: action
  command: "E A X59* FAVS"
  params: []
- id: add_favorite_folder
  label: Add Favorite Folder
  kind: action
  command: "E F 0 * X61* FAVS"
  params: []
- id: move_favorite_to_folder
  label: Move Favorite to Folder
  kind: action
  command: "E M X61% * X61^ FAVS"
  params: []
- id: save_channel_uri_as_favorite
  label: Save Channel URI as Favorite
  kind: action
  command: "E S X59! FAVS"
  params: []
- id: save_current_channel_uri_as_favorite
  label: Save Current Channel URI as Favorite (Short)
  kind: action
  command: "E SFAVS"
  params: []
- id: save_current_uri_to_folder
  label: Save Current URI to Folder
  kind: action
  command: "E T X61^ * X61* FAVS"
  params: []
- id: name_and_add_uri_to_folder
  label: Name and Add URI to Folder
  kind: action
  command: "E U X61^ * X61* * X59* FAVS"
  params: []
- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "E X X61% FAVS"
  params: []
- id: delete_all_favorites
  label: Delete All Favorites
  kind: action
  command: "E X*0FAVS"
  params: []

# --- History ---
- id: get_history_all
  label: Get History (All)
  kind: query
  command: "E GHIST"
  params: []
- id: get_history_start
  label: Get History (Start)
  kind: query
  command: "E G X60) HIST"
  params: []
- id: get_history_range
  label: Get History (Range)
  kind: query
  command: "E G X60) * X60! HIST"
  params: []
- id: delete_history_range
  label: Delete History (Range)
  kind: action
  command: "E X X60) * X60! HIST"
  params: []

# --- OSD ---
- id: set_osd_window_timeout
  label: Set OSD Window Timeout
  kind: action
  command: "E D X58* * X52* WNDW"
  params: []
- id: view_osd_window_timeout
  label: View OSD Window Timeout
  kind: query
  command: "E D X58* WNDW"
  params: []
- id: set_osd_window_location
  label: Set OSD Window Location
  kind: action
  command: "E L X58* * X58( WNDW"
  params: []
- id: view_osd_window_location
  label: View OSD Window Location
  kind: query
  command: "E L X58* WNDW"
  params: []
- id: set_osd_window_visibility
  label: Set OSD Window Visibility
  kind: action
  command: "E V X58* * X59) WNDW"
  params: []
- id: view_osd_window_visibility
  label: View OSD Window Visibility
  kind: query
  command: "E V X58* WNDW"
  params: []
- id: hide_url
  label: Hide URL
  kind: action
  command: "E H 2 *1WNDW"
  params: []
- id: reveal_url
  label: Reveal URL
  kind: action
  command: "E H 2 *0 WNDW"
  params: []
- id: view_url_status
  label: View URL Status
  kind: query
  command: "E H 2 WNDW"
  params: []

# --- Screen Saver ---
- id: set_screensaver_timeout
  label: Set Screen Saver Timeout
  kind: action
  command: "E T X52* SSAV"
  params: []
- id: view_screensaver_timeout
  label: View Screen Saver Timeout
  kind: query
  command: "E TSSAV"
  params: []
- id: set_screensaver_mode
  label: Set Screen Saver Mode
  kind: action
  command: "E M X54) SSAV"
  params: []
- id: view_screensaver_mode
  label: View Screen Saver Mode
  kind: query
  command: "E MSSAV"
  params: []
- id: view_screensaver_status
  label: View Screen Saver Status
  kind: query
  command: "E SSSAV"
  params: []

# --- Outputs - Decoder (HDMI) ---
- id: set_decoder_hdmi_format
  label: Set Decoder HDMI Video Format
  kind: action
  command: "E X3^ VTPO"
  params:
    - name: format
      type: integer
      description: "0=Auto, 1=DVI, 2=HDMI 444 RGB, 4=HDMI 444 YUV, 6=HDMI 422 YUV"
- id: view_decoder_hdmi_format
  label: View Decoder HDMI Format
  kind: query
  command: "E VTPO"
  params: []
- id: set_decoder_rate
  label: Set Decoder Rate
  kind: action
  command: "E X52! RATE"
  params:
    - name: rate_code
      type: integer
      description: "see video output rate table"
- id: view_decoder_rate
  label: View Decoder Rate
  kind: query
  command: "E RATE"
  params: []

# --- HDMI Output (mute) ---
- id: mute_to_black
  label: HDMI Mute to Black
  kind: action
  command: "1B"
  params: []
- id: mute_sync_and_video
  label: HDMI Mute Sync and Video
  kind: action
  command: "2B"
  params: []
- id: unmute_output
  label: HDMI Unmute Output
  kind: action
  command: "0B"
  params: []
- id: view_mute_status
  label: View Mute Status
  kind: query
  command: "B"
  params: []

# --- Stream Encryption ---
- id: enable_encrypted_streaming
  label: Enable Encrypted Streaming
  kind: action
  command: "E E1STRM"
  params: []
- id: disable_encrypted_streaming
  label: Disable Encrypted Streaming
  kind: action
  command: "E E0STRM"
  params: []
- id: view_encrypted_streaming_mode
  label: View Encrypted Streaming Mode
  kind: query
  command: "E ESTRM"
  params: []

# --- HDCP Input Encryption Support ---
- id: enable_hdcp_input
  label: Enable HDCP Input Encryption
  kind: action
  command: "E E X50! *1HDCP"
  params: []
- id: disable_hdcp_input
  label: Disable HDCP Input Encryption
  kind: action
  command: "E E X50! *0HDCP"
  params: []
- id: query_hdcp_encryption_status
  label: Query HDCP Encryption Status
  kind: query
  command: "E E X50! HDCP"
  params: []

# --- HDCP Notification ---
- id: set_hdcp_notification
  label: Set HDCP Notification
  kind: action
  command: "E N X54& HDCP"
  params: []
- id: query_hdcp_notification
  label: Query HDCP Notification
  kind: query
  command: "E NHDCP"
  params: []

# --- HDCP Status ---
- id: query_hdcp_input_status
  label: Query HDCP Input Status
  kind: query
  command: "E I X50! HDCP"
  params: []
- id: query_hdcp_output_status
  label: Query HDCP Output Status
  kind: query
  command: "E OHDCP"
  params: []

# --- HDCP Output Mode ---
- id: set_hdcp_output_mode
  label: Set HDCP Output Mode
  kind: action
  command: "E S X54^ HDCP"
  params:
    - name: mode
      type: integer
      description: "0=Follow input (10s), 1=Encrypt output (10s), 2=Follow input (cont), 3=Encrypt output (cont), 4=No auth"
- id: query_hdcp_output_mode
  label: Query HDCP Output Mode
  kind: query
  command: "E SHDCP"
  params: []

# --- Test pattern ---
- id: select_test_pattern
  label: Select Test Pattern
  kind: action
  command: "E X52@ TEST"
  params:
    - name: pattern
      type: integer
      description: "00=Off, 02=Alt pixels, 03=Alt lines, 04=Crosshatch, 05=4x4 crosshatch, 06=Color bars, 07=Grayscale, 08=Ramp, 09=White field"
- id: stop_test_pattern
  label: Stop Test Pattern
  kind: action
  command: "E O 1PLYR"
  params: []
- id: view_test_pattern
  label: View Test Pattern
  kind: query
  command: "E TEST"
  params: []

# --- Audio (output) ---
- id: audio_output_dual_mono
  label: Set Output Audio Dual Mono
  kind: action
  command: "E O1AFMT"
  params: []
- id: audio_output_stereo
  label: Set Output Audio Stereo
  kind: action
  command: "E O2AFMT"
  params: []
- id: view_audio_format
  label: View Audio Format
  kind: query
  command: "E OAFMT"
  params: []
- id: set_output_volume
  label: Set Output Volume
  kind: action
  command: "X55) V"
  params:
    - name: volume_db
      type: integer
      description: "0 to -100 dB, 1 dB steps, -30 default, -100=mute, 3-digit zero-padded"
- id: increment_volume
  label: Increment Volume
  kind: action
  command: "+V"
  params: []
- id: decrement_volume
  label: Decrement Volume
  kind: action
  command: "-V"
  params: []
- id: view_output_volume
  label: View Output Volume
  kind: query
  command: "V"
  params: []
- id: mute_on
  label: Mute On
  kind: action
  command: "1Z"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "0Z"
  params: []
- id: view_mute
  label: View Mute Status
  kind: query
  command: "Z"
  params: []

# --- Output CEC Mode ---
- id: set_cec_mode_output
  label: Set CEC Mode for Output
  kind: action
  command: "E O 1 * X# CCEC"
  params:
    - name: mode
      type: integer
      description: "0=Disable (default), 2=Enable insertion"
- id: query_cec_mode_output
  label: Query CEC Mode for Output
  kind: query
  command: "E O 1 CCEC"
  params: []
```

## Feedbacks
```yaml
# Observed state values returned by query commands.
- id: verbose_mode
  type: enum
  values: [off, verbose, tagged, verbose_tagged]
- id: power_save_state
  type: enum
  values: [inactive, active]
- id: ir_input_source
  type: enum
  values: [disabled, front, rear]
- id: input_selection
  type: enum
  values: [decoder, hdmi]
- id: video_mute
  type: enum
  values: [unmute, mute_black, mute_video_sync]
- id: audio_mute
  type: enum
  values: [off, on]
- id: audio_format_input
  type: enum
  values: [none, lpcm_2ch, multich]
- id: audio_format_output
  type: enum
  values: [dual_mono, stereo]
- id: aspect_ratio
  type: enum
  values: [fit, fill, follow]
- id: player_state
  type: enum
  values: [stop, play, pause]
- id: stream_mode
  type: enum
  values: [audio_video, video_only]
- id: rs232_port_mode
  type: enum
  values: [disabled, host_control, direct_access_passthrough]
- id: hdcp_output_mode
  type: enum
  values: [follow_input_10s, encrypt_output_10s, follow_input_cont, encrypt_output_cont, no_auth]
- id: cec_output_mode
  type: enum
  values: [disabled, enabled_insertion]
- id: screensaver_mode
  type: enum
  values: [custom_color, black, blue_with_osd]
- id: screensaver_status
  type: enum
  values: [active_reset, active_timer_running, expired_muted]
- id: session_security_level
  type: enum
  values: [user, admin]
- id: snmp_state
  type: enum
  values: [disabled, enabled]
- id: dhcp_state
  type: enum
  values: [off, on]
- id: test_pattern
  type: enum
  values: [off, alt_pixels, alt_lines, crosshatch, crosshatch_4x4, color_bars, grayscale, ramp, white_field]
- id: hdcp_status
  type: enum
  values: [none_detected, with_hdcp, without_hdcp]
```

## Variables
```yaml
- id: output_volume_db
  label: Output Volume
  type: integer
  range: [-100, 0]
  step: 1
  default: -30
  unit: dB
  description: "Analog audio output volume (3-digit zero-padded response)"
- id: internal_temperature
  label: Internal Temperature
  type: number
  unit: celsius
  description: "Internal device temperature"
- id: static_audio_delay_ms
  label: Static Audio Delay
  type: integer
  description: "Positive values 3-digit padded, negative 2-digit (00-99) or 3-digit (100-255)"
- id: standby_timer_minutes
  label: Standby Timer
  type: integer
  range: [0, 500]
  default: 0
  description: "0=off"
- id: port_timeout_seconds
  label: IP Port Timeout
  type: integer
  description: "In tens of seconds, zero-padded (default 00030 = 300s)"
- id: serial_baud_rate
  label: Serial Baud Rate
  type: integer
  range: [300, 115200]
  default: 9600
  unit: bps
- id: serial_parity
  label: Serial Parity
  type: enum
  values: [O, E, N, M, S]
  default: N
- id: serial_data_bits
  label: Serial Data Bits
  type: integer
  range: [7, 8]
  default: 8
- id: serial_stop_bits
  label: Serial Stop Bits
  type: integer
  range: [1, 2]
  default: 1
- id: hdmi_output_format
  label: HDMI Output Format
  type: enum
  values: [auto, dvi, hdmi_444_rgb, hdmi_444_yuv, hdmi_422_yuv]
  default: auto
- id: osd_window_timeout_seconds
  label: OSD Window Timeout
  type: integer
  range: [0, 501]
  default: 5
  description: "0=disabled, 5=default, 501=never"
- id: still_image_display_time_ms
  label: Still Image Display Time
  type: integer
  unit: ms
  description: "In milliseconds (1000=1s)"
```

## Events
```yaml
# SMD 101-initiated messages: when a local event (e.g. front panel adjustment) occurs,
# the device sends a message to the host. No response is required.
# Source: "SMD 101-initiated Messages" section.
# UNRESOLVED: specific unsolicited message formats beyond the copyright/banner
# not enumerated in the refined source.
```

## Macros
```yaml
# Multi-step sequences not explicitly described as named macros in source.
# UNRESOLVED: remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source describes CEC-triggered display power on/off behavior (firmware 2.05+).
# When the SMD powers on or returns from standby, it sends CEC "Image View On"
# and "Active Source" (Show Me) to logical address 0 (TV).
# When transitioning to standby, SMD sends CEC "Standby" to display.
# The SMD does not support external control of CEC communication, and
# CEC communication is not supported on the HDMI input source.
# Display CEC default logical addresses: SMD = 14, display = 0.
# No additional safety warnings or interlocks in refined source.
```

## Notes
- **Connection model:** All three transports (RS-232, USB config, LAN) accept the same SIS command set; behavior is consistent across them.
- **Boot/copyright:** On Telnet connect or RS-232 power-cycle, device emits a banner containing copyright, product name, firmware version, part number, and (Telnet only) date/time.
- **Response terminator:** Every SIS response ends with `CR/LF` (the source notation `]`). A line that ends with `}` is host-to-device with carriage return only (no LF).
- **Verbose modes:** 0=off (default Telnet), 1=verbose (default RS-232/USB), 2=tagged query responses, 3=verbose+tagged.
- **Timeouts:** Ethernet idle timeout default 5 minutes. Recommend periodic `Q` to keep alive, or close/reopen socket.
- **Defaults:** IP 192.168.254.254, gateway 0.0.0.0, subnet 255.255.0.0, DHCP off. RS-232 9600/N/8/1/no flow.
- **Caveat — first clip after standby:** "When the SMD 101 comes out of standby mode, the first clip can fail to load or play automatically. Any 'set' command causes the SMD 101 to resume full power state, but command execution could be delayed. For best results, before sending any other commands, always send a `0psav` SIS command to bring the SMD 101 out of standby."
- **Caveat — port remap:** "Remapping of port# assignments must be to ports 1024 or higher (unless resetting to the default port number or disabling the port by setting it to 0)."
- **Supported media:** H.264/flv/m2t/m2ts/mov/mp4/sdp/ts; audio aac/m4a/wav; still bmp/gif/jpg/tif/png; playlists m3u/m3u8/pls/jspf/xspf.
- **Network shares:** CIFS/SMB (vers 1.0/2.0/2.1/3.0) and NFS. SMB 1.0 default; firmware 2.05+ adds 2.0/2.1/3.0/3.02.
- **Firewall:** SMB uses ports 445 (direct IP) and 137–139 (NetBIOS name).
- **Differences between SMD 101 and SMD 202:** refined source documents SMD 101 only; SMD 202 differences not enumerated here.

<!-- UNRESOLVED: detailed SMD 202 vs SMD 101 capability diffs; specific SMB/CIFS share options field parsing; UPGS status query command (X58% is defined but its command is not in the refined excerpt); firmware version 2.05 mentioned as a threshold for CEC and SMB but exact supported range not specified. -->

## Provenance

```yaml
source_domains:
  - extron.com
  - manualshelf.com
  - manua.ls
source_urls:
  - https://www.extron.com/download/files/userman/smd101-68-2231-01_E.pdf
  - "https://www.extron.com/download/get/?path=/download/files/userman/68-2231-50_A.pdf&amp;path=/download/files/userman/68-2231-50_A.pdf"
  - https://www.extron.com/download/
  - https://www.manualshelf.com/manual/extron-electronics/smd-101/user-guide-english.html
  - https://www.manua.ls/extron/smd-101/manual
retrieved_at: 2026-06-11T05:13:20.693Z
last_checked_at: 2026-06-11T13:42:37.021Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:42:37.021Z
matched_actions: 264
action_count: 264
confidence: medium
summary: "All 264 spec actions have literal wire-level matches in source command tables; transport confirmed; only one minor extra (E 1ZQQQ network-reset variant). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "E 1ZQQQ"
- "exact electrical specs (voltage/current/power) not in source; specific differences between SMD 101 and SMD 202 not stated in refined doc."
- "specific unsolicited message formats beyond the copyright/banner"
- "remove section if not applicable"
- "detailed SMD 202 vs SMD 101 capability diffs; specific SMB/CIFS share options field parsing; UPGS status query command (X58% is defined but its command is not in the refined excerpt); firmware version 2.05 mentioned as a threshold for CEC and SMB but exact supported range not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
