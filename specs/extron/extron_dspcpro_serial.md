---
spec_id: admin/extron-dspcpro
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DMP 128 Plus Control Spec"
manufacturer: Extron
model_family: "DMP 128 Plus"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DMP 128 Plus"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/dmp_128_plus_68-2826-01_M.pdf
  - https://media.extron.com/public/download/files/userman/dmp_64_plus_68-3291-01_E.pdf
  - https://media.extron.com/public/download/files/userman/DMP_128_68-2036-01_revF.pdf
  - https://media.extron.com/public/download/files/userman/DMP64_68-1790-01_D.pdf
  - https://media.extron.com/public/download/files/userman/dmp_128_flexplus_68-3428-01_E.pdf
retrieved_at: 2026-07-02T04:10:33.065Z
last_checked_at: 2026-10-07T21:04:02.014Z
generated_at: 2026-10-07T21:04:02.014Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Power on/off commands are not documented in source; the device appears always-on when powered; no SIS power command exists."
  - "Firmware version compatibility range not stated in source."
  - "SKU variants (V / AT / C) are referenced throughout but the full model enumeration is not stated in the source excerpt."
  - "SIS-over-SSH reset-to-default port value was truncated in the source excerpt."
  - "the \"Reset SIS-over-SSH port map\" command was truncated in the"
  - "full version range not bounded in source"
  - "source documents no named multi-step macro sequences via SIS."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility range not stated in source."
  - "SKU variants (V / AT / C) referenced throughout but full model enumeration not stated in the source excerpt; only \"DMP 128 Plus\" base model confirmed."
  - "\"Reset SIS-over-SSH port map\" command truncated in source; default reset value (likely 22) not shown verbatim."
  - "\"Restore device configuration\" command (E 0*X2&XF}) row truncated in source; response shape not captured."
  - "CISG gateway X% symbol reused for both IP and gateway within one command — the source explicitly disambiguates by position, not by distinct symbol."
verification:
  verdict: verified
  checked_at: 2026-10-07T21:04:02.014Z
  matched_actions: 241
  action_count: 241
  confidence: medium
  summary: "All 241 action units match source command tables and transport values are supported; generic audio mute/unmute appear only in spec Notes, so coverage is near-complete. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Extron DMP 128 Plus Control Spec

## Summary
The Extron DMP 128 Plus is an 8x8 Digital Matrix Processor (audio DSP mixer) with mic/line inputs, aux inputs, virtual returns, and Dante (AT models) / expansion bus audio networking, plus VoIP telephony (V models) and file/tone playback. Control is via Extron's Simple Instruction Set (SIS) over rear-panel RS-232 (38400 baud), front-panel USB, or Ethernet (Telnet on port 23, web on port 80). SIS covers IP/NTP configuration, password security, file handling, preset recall, audio gain/mute control, mix-point routing, group masters, macros, signal level monitoring, automixer gate monitoring, VoIP call control, and Dante passthrough to remote AXI/NetPA devices.

<!-- UNRESOLVED: Power on/off commands are not documented in source; the device appears always-on when powered; no SIS power command exists. -->
<!-- UNRESOLVED: Firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: SKU variants (V / AT / C) are referenced throughout but the full model enumeration is not stated in the source excerpt. -->
<!-- UNRESOLVED: SIS-over-SSH reset-to-default port value was truncated in the source excerpt. -->

## Transport
```yaml
# Source: DMP 128 Plus User Guide, 68-2826-01, Rev. M, pp.6, 28-30.
# RS-232: "38400 baud, No parity, 1 stop bit, 8 data bits, No flow control" (verbatim, p.28).
# TCP:   "Communications ... is via Telnet, using port 23" (verbatim, p.28).
# Web:   "Port 80 is the default port for web browsers" (verbatim, p.31).
# Auth:  Optional admin/user password (IP connections only). Factory password = device serial #.
#        "Passwords only apply to IP connections and can be up to 128 characters in length." (verbatim, p.30)
#        "Connection via RS-232" default verbose mode is 1 (never password-prompted).
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
  type: password  # optional; applies to IP connections only
  notes: |
    Optional admin/user password. Factory password is the device serial number;
    case-sensitive, up to 128 chars. RS-232/USB connections are never
    password-protected. Telnet/Web connections are password-protected only if a
    password has been set; default after factory reset is no password.
```

## Traits
```yaml
# - queryable   (many query commands: I, 1I..4I, Q, *Q, **Q, X2*Q, N, E CI }, E CS },
#                 E CG }, E DH }, E CV }, E CT }, E CN }, E CP }, E CF }, E CA },
#                 E CU }, E CK }, E CC }, read gain/mute, view group fader, macro status, etc.)
# - levelable   (audio gain/trim/attenuation/group fader, 0.1 dB increments via 10x multiplier)
# - routable    (mix-point mute/unmute = signal routing between input and output OIDs)
# - macroable   (macros 1-64, run/kill/status/name/power-on)
traits:
  - queryable
  - levelable
  - routable
  - macroable
```

## Actions
```yaml
# All ASCII command strings copied verbatim from source Command and Response
# tables (DMP 128 Plus User Guide pp.38-53). Notation:
#   ]   = CR/LF terminator (device->host)
#   }   = soft carriage return (no line feed) terminator inside SIS commands
#   E   = Escape character (Hex 1B) command prefix
#   •   = space character (only where source marks it with bullet)
#   *   = asterisk (command character, not a variable)
#   Xn# = source-defined variable (see symbol key pp.32-37; params on each action)
#   .   = period command character (recall preset)
# Mix-point OID tables (pp.59-65) and the OID tables (pp.55-58) are parameter
# value spaces for the G/M opcodes below, NOT separate commands.

# ---------- Information Requests ----------
- id: query_general_information
  label: General Information
  kind: query
  command: "I"
  params: []
  notes: "Response: VnnXnn•A12x08•E16x16]"

- id: view_model_name
  label: Model Name
  kind: query
  command: "1I"
  params: []
  notes: "Response: DMP 128 Plus] (model varies)."

- id: view_model_description
  label: Model Description
  kind: query
  command: "2I"
  params: []
  notes: "Response: Digital audio matrix processor]"

- id: view_system_memory_usage
  label: System Memory Usage
  kind: query
  command: "3I"
  params: []
  notes: "Response: <number> Bytes Used out of <number> KBytes]"

- id: view_user_memory_usage
  label: User Memory Usage
  kind: query
  command: "4I"
  params: []
  notes: "Response: <number> Bytes Used out of <number> KBytes]"

- id: query_firmware_version
  label: Firmware Version
  kind: query
  command: "Q"
  params: []
  notes: "Response: {version x.xx}]"

- id: query_firmware_version_with_build
  label: Firmware Version With Build
  kind: query
  command: "*Q"
  params: []
  notes: "Response: {version x.xx.xxxx}]"

- id: query_kernel_library_version
  label: Kernel/Library Version
  kind: query
  command: "**Q"
  params: []
  notes: "Response: {version x.xx.xxxx LX}]"

- id: query_firmware_version_advanced
  label: Firmware Version (Advanced)
  kind: query
  command: "X2*Q"
  params:
    - name: query_type
      source_symbol: X2*
      type: integer
      description: "0=Detailed version info (all 2Q/3Q/4Q); 1=Firmware version; 2=Final stage bootloader; 3=Factory base code version; 4=Updated firmware version."
  notes: "Response: {specific version info}]"

- id: view_part_number
  label: Part Number
  kind: query
  command: "N"
  params: []
  notes: "Response: zz-zzzz-zz]"

# ---------- Ethernet Data Port ----------
- id: set_current_connected_port_timeout
  label: Set Current Connected Port Timeout
  kind: action
  command: "E 0* X2# TC }"
  params:
    - name: timeout
      source_symbol: X2#
      type: integer
      description: "1 to 65000, 1 step = 10 seconds, default = 30 (300 seconds)."

- id: view_current_connected_port_timeout
  label: View Current Connected Port Timeout
  kind: query
  command: "E 0TC }"
  params: []

- id: set_global_ip_port_timeout
  label: Set Global IP Port Timeout
  kind: action
  command: "E 1* X2# TC }"
  params:
    - name: timeout
      source_symbol: X2#
      type: integer
      description: "1 to 65000, 1 step = 10 seconds, default = 30 (300 seconds)."

- id: view_global_ip_port_timeout
  label: View Global IP Port Timeout
  kind: query
  command: "E 1TC }"
  params: []

# ---------- Serial Data Port ----------
- id: configure_serial_parameters
  label: Configure Serial Parameters
  kind: action
  command: "E X! * X1) , X1! , X1@ , X2% CP }"
  params:
    - name: port_number
      source_symbol: X!
      type: integer
      description: "01 (always 01 for DMP 128 Plus)."
    - name: baud_rate
      source_symbol: X1)
      type: integer
      description: "300,600,1200,1800,2400,3600,4800,7200,9600,14400,19200,28800,38400 (default),57600,115200."
    - name: parity
      source_symbol: X1!
      type: string
      description: "O=odd, E=even, N=none (default), S=space, M=mark. Only first letter needed."
    - name: data_bits
      source_symbol: X1@
      type: integer
      description: "7 or 8 (default 8)."
    - name: stop_bits
      source_symbol: X2%
      type: integer
      description: "1 or 2 (default 1)."

- id: view_serial_parameters
  label: View Serial Parameters
  kind: query
  command: "E X! CP }"
  params:
    - name: port_number
      source_symbol: X!
      type: integer

- id: view_serial_port_mode
  label: View Serial Port Mode
  kind: query
  command: "E X! CY }"
  params:
    - name: port_number
      source_symbol: X!
      type: integer
  notes: "Response: X1# = 0 (RS-232 default)."

- id: configure_flow_control
  label: Configure Flow Control
  kind: action
  command: "E X! * X1$ , X1% CF }"
  params:
    - name: port_number
      source_symbol: X!
      type: integer
    - name: flow_control
      source_symbol: X1$
      type: string
      description: "H=hardware, S=software, N=none (default). Only first letter needed."
    - name: data_pacing
      source_symbol: X1%
      type: integer
      description: "Milliseconds between bytes, 0000-1000 ms (default 0). Ignored for host ports."

- id: view_flow_control
  label: View Flow Control
  kind: query
  command: "E X! CF }"
  params:
    - name: port_number
      source_symbol: X!
      type: integer

# ---------- IP Setup Commands ----------
- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "E X# CN }"
  params:
    - name: name
      source_symbol: X#
      type: string
      description: "Up to 63 chars, A-Z, 0-9, and hyphen (-)."

- id: set_unit_name_to_factory_default
  label: Set Unit Name to Factory Default
  kind: action
  command: "E • CN }"
  params: []
  notes: "Sets to default name = model name + last 3 pairs of MAC address."

- id: view_unit_name
  label: View Unit Name
  kind: query
  command: "E CN }"
  params: []

- id: set_date_time
  label: Set Date and Time
  kind: action
  command: "E X$ CT }"
  params:
    - name: datetime
      source_symbol: X$
      type: string
      description: "MM/DD/YY-HH:MM:SS"

- id: view_date_time
  label: View Date and Time
  kind: query
  command: "E CT }"
  params: []

- id: view_date_time_in_hex
  label: View Date and Time in Hex
  kind: query
  command: "E *CT }"
  params: []
  notes: "Response: X2@ (7 hex bytes: month, day, year, hour, min, sec, day-of-week)."

- id: view_gmt_offset
  label: View GMT Offset
  kind: query
  command: "E CZ }"
  params: []
  notes: "Response: X@ (hh:mm offset from GMT)."

- id: set_dhcp_on
  label: Set DHCP On
  kind: action
  command: "E 1DH }"
  params: []

- id: set_dhcp_off
  label: Set DHCP Off
  kind: action
  command: "E 0DH }"
  params: []

- id: view_dhcp_mode
  label: View DHCP Mode
  kind: query
  command: "E DH }"
  params: []
  notes: "Response: X3$ = 0 (off/default) or 1 (on)."

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "E X% CI }"
  params:
    - name: ip
      source_symbol: X%
      type: string
      description: "xxx.xxx.xxx.xxx. Default 192.168.254.254."

- id: view_ip_address
  label: View IP Address
  kind: query
  command: "E CI }"
  params: []

- id: view_hardware_address_mac
  label: View Hardware Address (MAC)
  kind: query
  command: "E CH }"
  params: []
  notes: "Verbose mode 2/3 only. Response: X^ = 00-05-A6-xx-xx-xx."

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "E X& CS }"
  params:
    - name: mask
      source_symbol: X&
      type: string
      description: "xxx.xxx.xxx.xxx. Default 255.255.255.0."

- id: view_subnet_mask
  label: View Subnet Mask
  kind: query
  command: "E CS }"
  params: []

- id: set_gateway_ip_address
  label: Set Gateway IP Address
  kind: action
  command: "E X% CG }"
  params:
    - name: gateway
      source_symbol: X%
      type: string

- id: set_ip_only
  label: Set IP (IP Only)
  kind: action
  command: "E X2( * X% CISG }"
  params:
    - name: nic_number
      source_symbol: X2(
      type: integer
      description: "1=LAN 1, 2=LAN 2 (V models only)."
    - name: ip
      source_symbol: X%
      type: string
  notes: "First X% = IP address; X2( = NIC."

- id: set_ip_subnet
  label: Set IP/Subnet
  kind: action
  command: "E X2( * X% / X3) CISG }"
  params:
    - name: nic_number
      source_symbol: X2(
      type: integer
    - name: ip
      source_symbol: X%
      type: string
    - name: prefix
      source_symbol: X3)
      type: string
      description: "Subnet mask bits, e.g. /16 = 255.255.0.0."

- id: set_ip_subnet_gateway
  label: Set IP/Subnet/Gateway
  kind: action
  command: "E X2( * X% / X3) * X% CISG }"
  params:
    - name: nic_number
      source_symbol: X2(
      type: integer
    - name: ip
      source_symbol: X%
      type: string
    - name: prefix
      source_symbol: X3)
      type: string
    - name: gateway
      source_symbol: X%
      type: string
  notes: "In all CISG commands, first X% = IP, X3) = subnet, second X% = gateway."

- id: view_ip_subnet_gateway
  label: View IP/Subnet/Gateway
  kind: query
  command: "E X2( CISG }"
  params:
    - name: nic_number
      source_symbol: X2(
      type: integer

- id: set_dns_server_ip
  label: Set DNS Server IP Address
  kind: action
  command: "E X% DI }"
  params:
    - name: dns
      source_symbol: X%
      type: string

- id: view_dns_server_ip
  label: View DNS Server IP Address
  kind: query
  command: "E DI }"
  params: []

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E X( CV }"
  params:
    - name: mode
      source_symbol: X(
      type: integer
      description: "0=Clear/none (default for Telnet); 1=Verbose (default for USB/RS-232); 2=Tagged responses; 3=Verbose + tagged responses."

- id: view_verbose_mode
  label: View Verbose Mode
  kind: query
  command: "E CV }"
  params: []

- id: get_connection_count
  label: Get Connection Count
  kind: query
  command: "E CC }"
  params: []
  notes: "Response: {number of connections}]"

# ---------- Password and Security Settings ----------
- id: set_admin_password
  label: Set Admin Password
  kind: action
  command: "E X1^ CA }"
  params:
    - name: password
      source_symbol: X1^
      type: string
      description: "0-128 chars, all human-readable except |. Cannot be a single space. Case-sensitive."

- id: clear_admin_password
  label: Clear Admin Password
  kind: action
  command: "E • CA }"
  params: []

- id: view_admin_password
  label: View Admin Password
  kind: query
  command: "E CA }"
  params: []
  notes: "Response: X1& = **** if password exists, empty if not."

- id: set_user_password
  label: Set User Password
  kind: action
  command: "E X1^ CU }"
  params:
    - name: password
      source_symbol: X1^
      type: string

- id: clear_user_password
  label: Clear User Password
  kind: action
  command: "E • CU }"
  params: []

- id: view_user_password
  label: View User Password
  kind: query
  command: "E CU }"
  params: []

- id: view_session_security_level
  label: View Session Security Level
  kind: query
  command: "E CK }"
  params: []
  notes: "Response: X2) = 11 (User) or 12 (Administrator)."

# ---------- Directories ----------
- id: change_create_directory
  label: Change/Create Directory
  kind: action
  command: "E path/directory/CJ }"
  params:
    - name: path
      type: string
      description: "Directory path."
  notes: "Response: Dir•path/directory/]"

- id: back_to_root_directory
  label: Back to Root Directory
  kind: action
  command: "E / CJ }"
  params: []

- id: up_one_directory
  label: Up One Directory
  kind: action
  command: "E .. CJ }"
  params: []

- id: view_current_directory
  label: View Current Directory
  kind: query
  command: "E CJ }"
  params: []

# ---------- File Commands ----------
- id: erase_current_directory_files
  label: Erase Current Directory and Files
  kind: action
  command: "E / EF }"
  params: []
  notes: "Response: Ddl]"

- id: erase_current_directory_subdirs
  label: Erase Current Directory and Subdirectories
  kind: action
  command: "E // EF }"
  params: []

- id: list_files_current_directory
  label: List Files From Current Directory
  kind: query
  command: "E DF }"
  params: []
  notes: "Response: filenamex• date/time • length] (one per file)."

- id: list_files_current_directory_and_below
  label: List Files From Current Directory and Below
  kind: query
  command: "E LF }"
  params: []

- id: load_file_to_user_flash
  label: Load File to User Flash Memory
  kind: action
  command: "E +UF filesize , filename }"
  params:
    - name: filesize
      type: integer
    - name: filename
      type: string
  notes: "Response: Upl]"

- id: retrieve_file_from_user_flash
  label: Retrieve File From User Flash Memory
  kind: action
  command: "E filename SF }"
  params:
    - name: filename
      type: string
  notes: "Responds with 4 bytes of file size and unprocessed file data."

# ---------- Backup / Restore Device Configuration ----------
- id: save_device_configuration
  label: Save Device Configuration
  kind: action
  command: "E 1* X2& XF }"
  params:
    - name: config_type
      source_symbol: X2&
      type: integer
      description: "0=IP configuration, 2=Device-specific parameters."
  notes: "Response: Cnfg1* X2&]"

# ---------- NTP (Network Time Protocol) ----------
- id: enable_ntp
  label: Enable NTP
  kind: action
  command: "E 1 NTEN }"
  params: []
  notes: "Response: Nten1]"

- id: disable_ntp
  label: Disable NTP
  kind: action
  command: "E 0 NTEN }"
  params: []
  notes: "Response: Nten0]"

- id: sync_ntp_now
  label: Sync NTP Now
  kind: action
  command: "E 2 NTEN }"
  params: []
  notes: "Response: Nten2]"

- id: view_ntp_status
  label: View NTP Status
  kind: query
  command: "E NTEN }"
  params: []
  notes: "Response: X2^ = 0 (disabled/default) or 1 (enabled)."

- id: set_ntp_ip_address
  label: Set NTP IP Address
  kind: action
  command: "E X% NTIP }"
  params:
    - name: ntp_ip
      source_symbol: X%
      type: string
  notes: "Response: Ntip X%]"

- id: set_multiple_ntp_ip_addresses
  label: Set Multiple NTP IP Addresses
  kind: action
  command: "E X% * ... X% NTIP }"
  params:
    - name: ntp_ips
      source_symbol: X%
      type: string
      description: "Up to 4 NTP addresses separated by *. Can be URL or IP."
  notes: "Response: Ntip X% * ... X%]"

- id: clear_ntp_ip_address
  label: Clear NTP IP Address
  kind: action
  command: "E • NTIP }"
  params: []
  notes: "Response: Ntip]"

- id: view_ntp_ip_address
  label: View NTP IP Address
  kind: query
  command: "E NTIP }"
  params: []
  notes: "Response: X% * ... X%]"

# ---------- Port Assignment (LAN 1 legacy + per-NIC PMAP) ----------
- id: set_telnet_port_map_lan1
  label: Set Telnet Port Map (LAN 1)
  kind: action
  command: "E X5& MT }"
  params:
    - name: port
      source_symbol: X5&
      type: integer
      description: "0=Off, custom ports must be 1024 or higher."
  notes: "LAN 1 only. Response: Pmt X5&]"

- id: reset_telnet_port_map_lan1
  label: Reset Telnet Port Map (LAN 1)
  kind: action
  command: "E 23 MT }"
  params: []
  notes: "LAN 1 only. Response: Pmt00023]"

- id: disable_telnet_port_lan1
  label: Disable Telnet Port (LAN 1)
  kind: action
  command: "E 0 MT }"
  params: []
  notes: "LAN 1 only. Response: Pmt00000]"

- id: view_telnet_port_map_lan1
  label: View Telnet Port Map (LAN 1)
  kind: query
  command: "E MT }"
  params: []
  notes: "LAN 1 only."

- id: set_web_port_map_lan1
  label: Set Web Port Map (LAN 1)
  kind: action
  command: "E X5& MH }"
  params:
    - name: port
      source_symbol: X5&
      type: integer

- id: reset_web_port_map_lan1
  label: Reset Web Port Map (LAN 1)
  kind: action
  command: "E 80 MH }"
  params: []
  notes: "Response: Pmt00080]"

- id: disable_web_port_lan1
  label: Disable Web Port (LAN 1)
  kind: action
  command: "E 0 MH }"
  params: []

- id: view_web_port_map_lan1
  label: View Web Port Map (LAN 1)
  kind: query
  command: "E MH }"
  params: []

- id: set_telnet_port_map_per_nic
  label: Set Telnet Port Map (Per NIC)
  kind: action
  command: "E Z X5$ * X5& PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer
      description: "1=LAN 1, 2=LAN 2."
    - name: port
      source_symbol: X5&
      type: integer
  notes: "Response: Pmap Z• X5$ * X5&]"

- id: reset_telnet_port_map_per_nic
  label: Reset Telnet Port Map (Per NIC)
  kind: action
  command: "E Z X5$ * 23 PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer
  notes: "Reset port to default 23. Response: Pmap Z• X5$ * 00023]"

- id: disable_telnet_port_per_nic
  label: Disable Telnet Port (Per NIC)
  kind: action
  command: "E Z X5$ * 0 PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer

- id: view_telnet_port_map_per_nic
  label: View Telnet Port Map (Per NIC)
  kind: query
  command: "E Z X5$ PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer

- id: set_web_port_map_per_nic
  label: Set Web Port Map (Per NIC)
  kind: action
  command: "E W X5$ * X5& PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer
    - name: port
      source_symbol: X5&
      type: integer

- id: reset_web_port_map_per_nic
  label: Reset Web Port Map (Per NIC)
  kind: action
  command: "E W X5$ * 80 PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer
  notes: "Reset to default 80."

- id: disable_web_port_per_nic
  label: Disable Web Port (Per NIC)
  kind: action
  command: "E W X5$ * 0 PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer

- id: view_web_port_map_per_nic
  label: View Web Port Map (Per NIC)
  kind: query
  command: "E W X5$ PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer

- id: set_snmp_port_map
  label: Set SNMP Port Map
  kind: action
  command: "E A X5$ * X5& PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer
    - name: port
      source_symbol: X5&
      type: integer

- id: reset_snmp_port_map
  label: Reset SNMP Port Map
  kind: action
  command: "E A X5$ * 161 PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer
  notes: "Reset to default 161."

- id: disable_snmp_port
  label: Disable SNMP Port
  kind: action
  command: "E A X5$ * 0 PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer

- id: view_snmp_port_map
  label: View SNMP Port Map
  kind: query
  command: "E A X5$ PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer

- id: set_sis_over_ssh_port_map
  label: Set SIS-over-SSH Port Map
  kind: action
  command: "E B X5$ * X5& PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer
    - name: port
      source_symbol: X5&
      type: integer

- id: disable_sis_over_ssh_port
  label: Disable SIS-over-SSH Port
  kind: action
  command: "E B X5$ * 0 PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer

- id: view_sis_over_ssh_port_map
  label: View SIS-over-SSH Port Map
  kind: query
  command: "E B X5$ PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer

# UNRESOLVED: the "Reset SIS-over-SSH port map" command was truncated in the
# source excerpt; the default reset value (likely 22) is not shown verbatim.

- id: set_ssl_port_map
  label: Set SSL Port Map
  kind: action
  command: "E S X5$ * X5& PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer
    - name: port
      source_symbol: X5&
      type: integer

- id: reset_ssl_port_map
  label: Reset SSL Port Map
  kind: action
  command: "E S X5$ * 443 PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer
  notes: "Reset to default 443."

- id: disable_ssl_port
  label: Disable SSL Port
  kind: action
  command: "E S X5$ * 0 PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer

- id: view_ssl_port_map
  label: View SSL Port Map
  kind: query
  command: "E S X5$ PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer

# ---------- SNMP (Simple Network Management Protocol) ----------
- id: set_unit_contact
  label: Set Unit Contact
  kind: action
  command: "E C X3! SNMP }"
  params:
    - name: contact
      source_symbol: X3!
      type: string
      description: "Up to 64 characters."
  notes: "Response: SnmpC* X3!]"

- id: set_unit_contact_default
  label: Set Unit Contact to Default
  kind: action
  command: "E C • SNMP }"
  params: []
  notes: "Response: SnmpC* Not Specified]"

- id: view_unit_contact
  label: View Unit Contact
  kind: query
  command: "E C SNMP }"
  params: []

- id: set_unit_location
  label: Set Unit Location
  kind: action
  command: "E L X3! SNMP }"
  params:
    - name: location
      source_symbol: X3!
      type: string

- id: set_unit_location_default
  label: Set Unit Location to Default
  kind: action
  command: "E L • SNMP }"
  params: []

- id: view_unit_location
  label: View Unit Location
  kind: query
  command: "E L SNMP }"
  params: []

- id: set_community_public
  label: Set Community Public (Read-Only)
  kind: action
  command: "E P X3! SNMP }"
  params:
    - name: community
      source_symbol: X3!
      type: string

- id: set_community_public_default
  label: Set Community Public to Default
  kind: action
  command: "E P • SNMP }"
  params: []
  notes: "Response: SnmpP* public]"

- id: view_community_public
  label: View Community Public
  kind: query
  command: "E P SNMP }"
  params: []

- id: enable_snmp_access
  label: Enable SNMP Access
  kind: action
  command: "E E1 SNMP }"
  params: []
  notes: "Response: SnmpE*1]"

- id: disable_snmp_access
  label: Disable SNMP Access
  kind: action
  command: "E E0 SNMP }"
  params: []
  notes: "Response: SnmpE*0]"

- id: view_snmp_access_setting
  label: View SNMP Access Setting
  kind: query
  command: "E E SNMP }"
  params: []
  notes: "Response: X5^ = 0 (disabled/default) or 1 (enabled)."

# ---------- Reboot Commands ----------
- id: reboot_system
  label: Reboot System
  kind: action
  command: "E 1 BOOT }"
  params: []
  notes: "Response: Boot1]"

- id: reboot_network
  label: Reboot Network
  kind: action
  command: "E 2 BOOT }"
  params: []
  notes: "Response: Boot2]"

# ---------- Ping ----------
- id: execute_ping_test
  label: Execute Ping Test
  kind: action
  command: "E {address} PING }"
  params:
    - name: address
      type: string
      description: "IP address or hostname to ping."
  notes: "Response: {address}*{bytes}*{ttl}*{time}] or {address}*0*0*0] on failure."

# ---------- Time Zone and Daylight Settings ----------
- id: set_time_zone
  label: Set Time Zone
  kind: action
  command: "E {zone name} * TZON }"
  params:
    - name: zone_name
      type: string
  notes: "Response: Tzon• {timezone code, UTC offset and location name}]"

- id: view_current_time_zone
  label: View Current Time Zone
  kind: query
  command: "E TZON }"
  params: []

- id: list_all_time_zones
  label: List All Time Zones
  kind: query
  command: "E * TZON }"
  params: []
  notes: "Response: one line per zone, multiple ]]"

# ---------- Digital I/O ----------
- id: get_digital_input_status
  label: Get Digital Input Status
  kind: query
  command: "E X3# GPIT }"
  params:
    - name: channel
      source_symbol: X3#
      type: integer
      description: "1 through 8."
  notes: "Response: X3% * X3^] (action type * varies)."

- id: get_digital_output_status
  label: Get Digital Output Status
  kind: query
  command: "E X3# * X3& GPOT }"
  params:
    - name: channel
      source_symbol: X3#
      type: integer
    - name: output
      source_symbol: X3&
      type: integer
      description: "1 or 2."
  notes: "Response: X3* * X3(] (output mode * monitor varies)."

- id: get_state_for_input
  label: Get State for Input
  kind: query
  command: "E X3# GPI }"
  params:
    - name: channel
      source_symbol: X3#
      type: integer
  notes: "Response: Gpi X3# * X3@]. X3@ = 0 (low) or 1 (high)."

# ---------- Write Names ----------
- id: write_input_name
  label: Write Input Name
  kind: action
  command: "E X4! , X4^ NI }"
  params:
    - name: input_number
      source_symbol: X4!
      type: integer
      description: "1 through 20 (13-20 are Aux inputs)."
    - name: name
      source_symbol: X4^
      type: string

- id: write_virtual_return_name
  label: Write Virtual Return Name
  kind: action
  command: "E X4@ , X4^ NL }"
  params:
    - name: virtual_return
      source_symbol: X4@
      type: integer
      description: "1 through 16."
    - name: name
      source_symbol: X4^
      type: string

- id: write_exp_input_name
  label: Write EXP Input Name
  kind: action
  command: "E X4# , X4^ NE }"
  params:
    - name: exp_input
      source_symbol: X4#
      type: integer
      description: "1 through 16 (1 through 48 on AT models)."
    - name: name
      source_symbol: X4^
      type: string

- id: write_output_name
  label: Write Output Name
  kind: action
  command: "E X4$ , X4^ NO }"
  params:
    - name: output_number
      source_symbol: X4$
      type: integer
      description: "1 through 16 (9-16 are Aux outputs)."
    - name: name
      source_symbol: X4^
      type: string

- id: write_exp_output_name
  label: Write EXP Output Name
  kind: action
  command: "E X4% , X4^ NX }"
  params:
    - name: exp_output
      source_symbol: X4%
      type: integer
      description: "1 through 16."
    - name: name
      source_symbol: X4^
      type: string

- id: write_preset_name
  label: Write Preset Name
  kind: action
  command: "E X4) , X4^ NG }"
  params:
    - name: preset_number
      source_symbol: X4)
      type: integer
      description: "1 through 32."
    - name: name
      source_symbol: X4^
      type: string

# ---------- View Names ----------
- id: view_input_name
  label: View Input Name
  kind: query
  command: "E X4! NI }"
  params:
    - name: input_number
      source_symbol: X4!
      type: integer

- id: view_virtual_return_name
  label: View Virtual Return Name
  kind: query
  command: "E X4@ NL }"
  params:
    - name: virtual_return
      source_symbol: X4@
      type: integer

- id: view_exp_input_name
  label: View EXP Input Name
  kind: query
  command: "E X4# NE }"
  params:
    - name: exp_input
      source_symbol: X4#
      type: integer

- id: view_output_name
  label: View Output Name
  kind: query
  command: "E X4$ NO }"
  params:
    - name: output_number
      source_symbol: X4$
      type: integer

- id: view_exp_output_name
  label: View EXP Output Name
  kind: query
  command: "E X4% NX }"
  params:
    - name: exp_output
      source_symbol: X4%
      type: integer

- id: view_preset_name
  label: View Preset Name
  kind: query
  command: "E X4) NG }"
  params:
    - name: preset_number
      source_symbol: X4)
      type: integer

# ---------- Recall Presets ----------
- id: recall_preset
  label: Recall Preset
  kind: action
  command: "X4) ."
  params:
    - name: preset_number
      source_symbol: X4)
      type: integer
      description: "1 through 32."
  notes: "Command character is a period. Response: Rpr X4)]. Example: 5. recalls preset 5."

# ---------- Reset to Factory Default ----------
- id: reset_presets_and_names
  label: Reset Presets and Names
  kind: action
  command: "E ZG }"
  params: []
  notes: "Response: Zpg]"

- id: reset_individual_preset
  label: Reset Individual Preset
  kind: action
  command: "E X4) ZG }"
  params:
    - name: preset_number
      source_symbol: X4)
      type: integer
  notes: "Response: Zpg X4)]"

- id: partial_factory_reset
  label: Partial Factory Reset
  kind: action
  command: "E ZXXX }"
  params: []
  notes: "Response: Zpx]"

- id: reset_flash_file_system
  label: Reset Flash File System
  kind: action
  command: "E ZFFF }"
  params: []
  notes: "Response: Zpf]"

- id: full_factory_reset
  label: Full Factory Reset
  kind: action
  command: "E ZQQQ }"
  params: []
  notes: "Response: Zpq]"

- id: reset_all_device_settings_delete_files
  label: Reset All Device Settings and Delete Files
  kind: action
  command: "E ZY }"
  params: []
  notes: "Response: Zpy]. Excludes IP/subnet/gateway/unit name/DHCP/port mapping to preserve communication."

# ---------- Player File Management ----------
- id: set_player_file_slot
  label: Set File to Slot Association
  kind: action
  command: "E A X4* * X4& CPLY }"
  params:
    - name: player_id
      source_symbol: X4*
      type: integer
      description: "1 through 8."
    - name: filename
      source_symbol: X4&
      type: string
      description: "Valid chars A-Z, a-z, 0-9, _."
  notes: "Response: CplyA X4* * X4&]"

- id: clear_player_file_slot
  label: Clear File to Slot Association
  kind: action
  command: "E A X4* * • CPLY }"
  params:
    - name: player_id
      source_symbol: X4*
      type: integer

- id: view_player_file_slot
  label: View File to Slot Association
  kind: query
  command: "E A X4* CPLY }"
  params:
    - name: player_id
      source_symbol: X4*
      type: integer

# ---------- Player Commands ----------
- id: start_player_playback
  label: Start Playback on Player
  kind: action
  command: "E X4* * 1 PLAY }"
  params:
    - name: player_id
      source_symbol: X4*
      type: integer
  notes: "Response: Play X4* *1]"

- id: stop_player_playback
  label: Stop Playback on Player
  kind: action
  command: "E X4* * 0 PLAY }"
  params:
    - name: player_id
      source_symbol: X4*
      type: integer
  notes: "Response: Play X4* *0]"

- id: player_status
  label: Player Status
  kind: query
  command: "E X4* PLAY }"
  params:
    - name: player_id
      source_symbol: X4*
      type: integer
  notes: "Response: X5) = 0 (stopped) or 1 (playing)."

- id: set_player_repeat
  label: Set Player Repeat
  kind: action
  command: "E M X4* * X4( CPLY }"
  params:
    - name: player_id
      source_symbol: X4*
      type: integer
    - name: repeat
      source_symbol: X4(
      type: integer
      description: "0 = play once, 1 = repeat."
  notes: "Turning off repeat during playback stops after current iteration."

- id: get_player_repeat_status
  label: Get Player Repeat Status
  kind: query
  command: "E M X4* CPLY }"
  params:
    - name: player_id
      source_symbol: X4*
      type: integer

# ---------- Macro Commands ----------
- id: run_macro
  label: Run Macro
  kind: action
  command: "E R X5! MCRO }"
  params:
    - name: macro_number
      source_symbol: X5!
      type: integer
      description: "1 through 64. Response padded with leading 0."
  notes: "Response: McroR X5!]"

- id: kill_macro
  label: Kill Macro
  kind: action
  command: "E K X5! MCRO }"
  params:
    - name: macro_number
      source_symbol: X5!
      type: integer
  notes: "Response: McroK X5!]"

- id: get_macro_status
  label: Get Macro Status
  kind: query
  command: "E S X5! MCRO }"
  params:
    - name: macro_number
      source_symbol: X5!
      type: integer
  notes: "Response: X5@ = 0 (idle) or 1-32 (step)."

- id: set_macro_name
  label: Set Macro Name
  kind: action
  command: "E A X5! * X5# MCRO }"
  params:
    - name: macro_number
      source_symbol: X5!
      type: integer
    - name: name
      source_symbol: X5#
      type: string
      description: "Up to 24 chars, A-Z, a-z, 0-9, _."
  notes: "Response: McroA X5! * X5#]"

- id: get_macro_name
  label: Get Macro Name
  kind: query
  command: "E A X5! MCRO }"
  params:
    - name: macro_number
      source_symbol: X5!
      type: integer

- id: set_power_on_macro
  label: Set Power-On Macro
  kind: action
  command: "E P X5! MCRO }"
  params:
    - name: macro_number
      source_symbol: X5!
      type: integer
      description: "0 clears the power-on macro assignment."
  notes: "Response: McroP X5!]"

- id: get_power_on_macro
  label: Get Power-On Macro
  kind: query
  command: "E P MCRO }"
  params: []

# ---------- Dante Control and Configuration ----------
- id: query_available_remote_devices
  label: Query Available Remote Devices
  kind: query
  command: "E A EXPR }"
  params: []
  notes: "Returns list of Dante devices connected to the DMP. Verbose 2/3: ExprA• X*]... Requires Verbose mode 1/3."

- id: enable_remote_connection_listening
  label: Enable Remote Connection for Listening
  kind: action
  command: "E C X* * X2$ EXPR }"
  params:
    - name: dante_device_name
      source_symbol: X*
      type: string
      description: "Device names are not case sensitive."
    - name: remote_mode
      source_symbol: X2$
      type: integer
      description: "0 = disabled, 1 = enabled."
  notes: "All listening disabled when DMP Dante module rebooted."

- id: read_remote_connection_listening
  label: Read Remote Connection Listening Status
  kind: query
  command: "E C X* EXPR }"
  params:
    - name: dante_device_name
      source_symbol: X*
      type: string

- id: query_remote_devices_listened
  label: Query Remote Devices Being Listened To
  kind: query
  command: "E L EXPR }"
  params: []

- id: send_command_to_remote_device
  label: Send Command to Remote Device
  kind: action
  command: "{dante@ X* : X5* }"
  params:
    - name: dante_device_name
      source_symbol: X*
      type: string
    - name: sis_command
      source_symbol: X5*
      type: string
      description: "SIS command to send. Use w for Esc and | for CR."
  notes: "Verbose 2/3: {dante@ X* } X5(] (response tagged by DMP). Requires closing bracket }."

# ---------- USB Call Status ----------
- id: view_usb_call_status
  label: View USB 1 Call Status
  kind: query
  command: "E H1 UPHN }"
  params: []
  notes: "Response: X10) = 0 (inactive) or 1 (active). Verbose 2/3: UphnH1* X10)]"

# ---------- DSP Audio Level Control (gain/trim/mute) ----------
# Applies to all gain/trim/attenuation blocks via OID. X5% selects the OID.
- id: set_gain_level
  label: Set Gain Level
  kind: action
  command: "E G X5% * X6) AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer
      description: |
        Target OID. See Object ID (OID) Number Tables (pp.55-58):
          Mic/Line Input Gain:   40000-40011
          Mic/Line Pre-mixer:    40100-40111
          Aux Input Gain:        40012-40019
          Aux Input Pre-mixer:   40112-40119
          Virtual Return Pre:    50100-50115 (A-P)
          Expansion Bus Pre:     50200-50247 (AT In / EXP 1-48)
          Line Output Post-trim:60100-60107
          Aux Output Post-trim: 60108-60115
          EXP Output Post-trim: 60116-60131
          Line Output Atten:     60000-60007
          Aux Output Gain:       60008-60015
          EXP Output Atten:      60016-60031
        Mix-point OIDs (pp.59-65): 20000-23531 covering Mic/Line, Aux, Virtual
        Return, Expansion Bus inputs to Analog/Aux/EXP Output/Virtual Send mix matrices.
    - name: gain_value
      source_symbol: X6)
      type: integer
      description: |
        dB value using 10x multiplier, no decimals. E.g. +10.4 dB = 104, -3.2 dB = -32.
        Ranges:
          Mic/Line input (analog src): -18 to +80 dB
          Mic/Line input (digital src): -18 to +24 dB (use H param, not G)
          Pre-mixer / Virtual return:  -100 to +12 dB
          Post-mixer trim:             -12 to +12 dB (cannot be muted)
          Output attenuation:          -100 to 0 dB
  notes: "Verbose response: DsG X5% * X6)]. Example: E G40000*120AU} sets mic/line input 1 to +12.0 dB."

- id: read_gain_level
  label: Read Gain Level
  kind: query
  command: "E G X5% AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer
  notes: "Verbose response: DsG X5% * X6)]."

# ---------- Audio Group Master Commands ----------
- id: set_group_fader_value
  label: Set Group Fader Value
  kind: action
  command: "E D X6# * X6$ GRPM }"
  params:
    - name: group_number
      source_symbol: X6#
      type: integer
      description: "1 through 64."
    - name: fader_value
      source_symbol: X6$
      type: integer
      description: |
        dB in 0.1 dB increments via 10x multiplier, negatives, no decimals.
        Valid range depends on group gain-block type:
          -180 to 800 (-18.0 to +80.0 dB)
          -1000 to 120 (-100.0 to +12.0 dB)
          -120 to 120 (-12.0 to +12.0 dB)
          -1000 to 0 (-100.0 to 0.0 dB)
  notes: "Example: E D2*-239GRPM} sets group 2 to -29.3 dB. Response: GrpmD X6# * X6$]."

- id: increment_group_fader
  label: Increment Group Fader Value
  kind: action
  command: "E D X6# * X6% + GRPM }"
  params:
    - name: group_number
      source_symbol: X6#
      type: integer
    - name: increment
      source_symbol: X6%
      type: integer
      description: "dB x10 to raise. + after number."
  notes: "Response: GrpmD X6# * X6$]."

- id: decrement_group_fader
  label: Decrement Group Fader Value
  kind: action
  command: "E D X6# * X6% - GRPM }"
  params:
    - name: group_number
      source_symbol: X6#
      type: integer
    - name: decrement
      source_symbol: X6%
      type: integer
      description: "dB x10 to lower. - after number."

- id: view_group_fader_value
  label: View Group Fader Value
  kind: query
  command: "E D X6# GRPM }"
  params:
    - name: group_number
      source_symbol: X6#
      type: integer
  notes: "Verbose modes 0/1 simplified to X6$]."

- id: mute_group
  label: Mute a Group
  kind: action
  command: "E D X6# * 1 GRPM }"
  params:
    - name: group_number
      source_symbol: X6#
      type: integer
  notes: "Mutes all blocks in group. Response: GrpmD X6# *1]"

- id: unmute_group
  label: Unmute a Group
  kind: action
  command: "E D X6# * 0 GRPM }"
  params:
    - name: group_number
      source_symbol: X6#
      type: integer

- id: view_group_mute_value
  label: View Group Mute Value
  kind: query
  command: "E D X6# GRPM }"
  params:
    - name: group_number
      source_symbol: X6#
      type: integer
  notes: "Same opcode as view_group_fader_value; X6@ always unsigned/negative."

- id: set_group_soft_limits
  label: Set Group Soft Limits
  kind: action
  command: "E L X6# * X6^ [upper] * X6^ [lower] GRPM }"
  params:
    - name: group_number
      source_symbol: X6#
      type: integer
    - name: upper_limit
      source_symbol: X6^
      type: integer
      description: "dB x10."
    - name: lower_limit
      source_symbol: X6^
      type: integer
      description: "dB x10."
  notes: "Example: E L2*60*-60GRPM} sets upper +6.0 dB, lower -6.0 dB."

- id: view_soft_limits
  label: View Soft Limits
  kind: query
  command: "E L X6# GRPM }"
  params:
    - name: group_number
      source_symbol: X6#
      type: integer

- id: view_group_type
  label: View Group Type
  kind: query
  command: "E P X6# GRPM }"
  params:
    - name: group_number
      source_symbol: X6#
      type: integer
  notes: "Response: GrpmP X6# * X6&]. X6& = 6 (gain), 12 (mute), 21 (meter)."

- id: view_group_members
  label: View Group Members
  kind: query
  command: "E O X6# GRPM }"
  params:
    - name: group_number
      source_symbol: X6#
      type: integer
  notes: "Response: GrpmO X6# * X5%[1] * X5%[2] * ... * X5%[n]]"

# ---------- Unsolicited Meter Groups ----------
- id: set_unsolicited_meter_rate
  label: Set Unsolicited Meter Response Rate
  kind: action
  command: "E R X6* GRPU }"
  params:
    - name: rate
      source_symbol: X6*
      type: integer
      description: "1-10 (fw < v1.11.0000-b006); 1-25 (fw >= v1.11.0000-b006). Default 1."
  notes: "Global on old fw; session-based on newer fw."

- id: view_unsolicited_meter_rate
  label: View Unsolicited Meter Response Rate
  kind: query
  command: "E R GRPU }"
  params: []

- id: set_unsolicited_meter_group
  label: Set Unsolicited Meter Group
  kind: action
  command: "E G X6( GRPU }"
  params:
    - name: meter_group
      source_symbol: X6(
      type: integer
      description: "0 disables; 1-64 enables a meter group. 0 at power on."

- id: view_unsolicited_meter_group
  label: View Unsolicited Meter Group
  kind: query
  command: "E G GRPU }"
  params: []

- id: view_oid_members_in_meter_group
  label: View OID Members in Meter Group
  kind: query
  command: "E O X9* GRPM }"
  params:
    - name: meter_group_number
      source_symbol: X9*
      type: integer
      description: "1 through 64."

- id: enable_meters_in_meter_group
  label: Enable Meters in Meter Group
  kind: action
  command: "E D X9* * 1 GRPM }"
  params:
    - name: meter_group_number
      source_symbol: X9*
      type: integer

- id: disable_meters_in_meter_group
  label: Disable Meters in Meter Group
  kind: action
  command: "E D X9* * 0 GRPM }"
  params:
    - name: meter_group_number
      source_symbol: X9*
      type: integer

# ---------- Aux Input 1 through 8 ----------
- id: set_aux_input_source_mode
  label: Set Aux Input Source Mode
  kind: action
  command: "E D X5* * X7) AU }"
  params:
    - name: target_oid
      source_symbol: X5*
      type: integer
      description: "Aux input OID (40012-40019)."
    - name: source_mode
      source_symbol: X7)
      type: integer
      description: "0=Disabled; 1-8=File/Tone Player 1-8; 9-16=USB Rx channels; 17-24=VoIP Line 1-8 Rx."

- id: get_aux_input_source_mode
  label: Get Aux Input Source Mode
  kind: query
  command: "E D X5* AU }"
  params:
    - name: target_oid
      source_symbol: X5*
      type: integer

- id: set_aux_input_mute
  label: Set Aux Input Mute
  kind: action
  command: "E M X5* * X6) AU }"
  params:
    - name: target_oid
      source_symbol: X5*
      type: integer
    - name: mute
      source_symbol: X6)
      type: integer
      description: "1 = Off, 2 = Engaged."

- id: get_aux_input_mute_status
  label: Get Aux Input Mute Status
  kind: query
  command: "E M X5* AU }"
  params:
    - name: target_oid
      source_symbol: X5*
      type: integer

- id: set_aux_input_analog_gain
  label: Set Aux Input Analog Gain
  kind: action
  command: "E G X5* * X5( AU }"
  params:
    - name: target_oid
      source_symbol: X5*
      type: integer
    - name: gain_value
      source_symbol: X5(
      type: integer
      description: "dB x10 in 0.1 dB steps."

- id: read_aux_input_gain
  label: Read Aux Input Gain
  kind: query
  command: "E G X5* AU }"
  params:
    - name: target_oid
      source_symbol: X5*
      type: integer

# ---------- Aux Output 1 through 8 ----------
- id: set_aux_output_mode
  label: Set Aux Output Mode
  kind: action
  command: "E D X5% * X7# AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer
      description: "Aux output OID (60008-60015)."
    - name: output_mode
      source_symbol: X7#
      type: integer
      description: "0=Disabled; 1-8=USB Tx channels; 9-16=VoIP Line 1-8 Tx."

- id: get_aux_output_mode
  label: Get Aux Output Mode
  kind: query
  command: "E D X5% AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer

- id: set_aux_output_mute
  label: Set Aux Output Mute
  kind: action
  command: "E M X5% * X6@ AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer
    - name: mute
      source_symbol: X6@
      type: integer
      description: "1 = Off, 2 = Engaged."

- id: get_aux_output_mute_status
  label: Get Aux Output Mute Status
  kind: query
  command: "E M X5% AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer

- id: set_aux_output_attenuation
  label: Set Aux Output Attenuation
  kind: action
  command: "E G X5% * X6) AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer
    - name: gain_value
      source_symbol: X6)
      type: integer

- id: read_aux_output_attenuation
  label: Read Aux Output Attenuation Level
  kind: query
  command: "E G X5% AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer

# ---------- Automixer Gate Monitoring ----------
- id: get_automixer_gate_status
  label: Get Current Automixer Gate Status
  kind: query
  command: "E J X9( AU }"
  params:
    - name: target_oid
      source_symbol: X9(
      type: integer
      description: "Automixer OID (see Automixer OIDs, p.58)."
  notes: "Response: X7$ = 0 (disabled) or 1024 (enabled)."

# ---------- Signal Level Monitoring (SLM) ----------
- id: set_slm_status
  label: Set SLM Status
  kind: action
  command: "E J X5% * X7^ AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer
    - name: threshold
      source_symbol: X7^
      type: integer
      description: "0=disabled; 0001-2000 = -0.1 to -200.0 dBFS threshold."
  notes: "Response: DsJ X5% * X7^]"

- id: get_current_threshold_status
  label: Get Current Threshold Status
  kind: query
  command: "E J X5% AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer

# ---------- VoIP Call Control ----------
- id: voip_end_call
  label: End Call
  kind: action
  command: "E END X8) , X8! VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
      description: "1 through 8."
    - name: appearance
      source_symbol: X8!
      type: integer
      description: "1 through 8 (1 = originating two-party call)."
  notes: "Response: VoipEND X8) , X8! , X8#]"

- id: voip_end_call_all_appearances
  label: End Call on All Appearances
  kind: action
  command: "E END X8) VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
  notes: "Response: VoipEND X8) ,0, X8#]"

- id: voip_dial_string
  label: Dial String
  kind: action
  command: "E DIAL X8) , X8@ VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: phone_number
      source_symbol: X8@
      type: string
      description: "0-9, *, #. No spaces."
  notes: "Response: VoipDIAL X8) , X8@ , X8#]"

- id: voip_dial_digits
  label: Dial Digits
  kind: action
  command: "E DD X8) , X8! , X8@ VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: appearance
      source_symbol: X8!
      type: integer
    - name: phone_number
      source_symbol: X8@
      type: string
  notes: "Response: VoipDD X8) , X8! , X8@ , X8#]"

- id: voip_answer
  label: Answer
  kind: action
  command: "E ANS X8) , X8! VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: appearance
      source_symbol: X8!
      type: integer
  notes: "Response: VoipANS X8) , X8! , X8#]"

- id: voip_reject
  label: Reject
  kind: action
  command: "E REJ X8) , X8! VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: appearance
      source_symbol: X8!
      type: integer
  notes: "Response: VoipREJ X8) , X8! , X8#]"

- id: voip_hold
  label: Hold
  kind: action
  command: "E HOLD X8) , X8! , X8& VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: appearance
      source_symbol: X8!
      type: integer
    - name: hold_status
      source_symbol: X8&
      type: integer
      description: "0 = off, 1 = on hold."
  notes: "Response: VoipHOLD X8) , X8! , X8& , X8#]"

- id: voip_transfer
  label: Transfer
  kind: action
  command: "E XFER X8) , X8! , X8@ VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: appearance
      source_symbol: X8!
      type: integer
    - name: phone_number
      source_symbol: X8@
      type: string
  notes: "Response: VoipXFER X8) , X8! , X8@]"

# ---------- VoIP Call Settings ----------
- id: voip_set_do_not_disturb
  label: Set Do Not Disturb
  kind: action
  command: "E DND X8) , X8$ VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: operating_state
      source_symbol: X8$
      type: integer
      description: "0 = enable, 1 = disable."
  notes: "Response: VoipDND X8) , X8$]"

- id: voip_get_do_not_disturb
  label: Get Do Not Disturb Status
  kind: query
  command: "E DND X8) VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer

- id: voip_set_auto_answer
  label: Set Auto Answer
  kind: action
  command: "E AA X8) , X8% VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: auto_answer_mode
      source_symbol: X8%
      type: integer
      description: "0 = disabled, 1 = delay (seconds), 2 = follow SIP header."
  notes: "Response: VoipAA X8) , X8%]"

- id: voip_get_auto_answer
  label: Get Auto Answer Status
  kind: query
  command: "E AA X8) VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer

- id: voip_set_auto_answer_delay
  label: Set Auto Answer Delay
  kind: action
  command: "E AD X8) , X8^ VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: delay_value
      source_symbol: X8^
      type: integer
      description: "Time in seconds."
  notes: "Response: VoipAD X8) , X8^]"

- id: voip_get_auto_answer_delay
  label: Get Auto Answer Delay Status
  kind: query
  command: "E AD X8) VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer

# ---------- VoIP Line Status Queries ----------
- id: voip_registration_status
  label: Registration Status
  kind: query
  command: "E RS X8) VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
  notes: "Response: VoipRS X8) , X9)]. X9) = 0 unregistered, 1 1st proxy, 2 2nd proxy, 3 none, 4 failed."

- id: voip_line_status
  label: Line Status
  kind: query
  command: "E LS X8) , X8! VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: appearance
      source_symbol: X8!
      type: integer
  notes: "Response: VoipLS X8) , X8! , X9!]. X9! = 0 none, 1 inactive, 2 active, 3 on hold, 4 incoming, 5 outgoing."

- id: voip_line_status_no_index
  label: Line Status (Without Index)
  kind: query
  command: "E LS X8) VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
  notes: "Returns 8 X9! appearance entries."

- id: voip_caller_name
  label: Caller Name
  kind: query
  command: "E NAME X8) , X8! VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: appearance
      source_symbol: X8!
      type: integer
  notes: "Response: VoipNAME X8) , X8! , X8* , X9&]"

- id: voip_duration
  label: Duration
  kind: query
  command: "E DUR X8) , X8! VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: appearance
      source_symbol: X8!
      type: integer
  notes: "Response: VoipDUR X8) , X8! , X9@]. X9@ = HH:MM:SS."

- id: voip_codec
  label: Codec
  kind: query
  command: "E CD X8) , X8! VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: appearance
      source_symbol: X8!
      type: integer
  notes: "Response: VoipCD X8) , X8! , X9#]"

- id: voip_jitter_rx
  label: Jitter Rx
  kind: query
  command: "E JR X8) , X8! VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
    - name: appearance
      source_symbol: X8!
      type: integer
  notes: "Response: VoipJR X8) , X8! , X9$ , X9% , X9^] (jitter ms, packet drops, total packets)."

- id: voip_line_extension
  label: Line Extension
  kind: query
  command: "E LE X8) VOIP }"
  params:
    - name: line_number
      source_symbol: X8)
      type: integer
  notes: "Response: VoipLE X8) , X9& , X8*]"

- id: restore_device_configuration
  label: Restore Device Configuration
  kind: action
  command: "E 0* X2& XF }"
  params:
    - name: config_type
      source_symbol: X2&
      type: integer
      description: "0 = IP configuration   2 = Device-specific parameters"
  notes: "Response: Cnfg0* X2&]. The complete source supplies the restore row referenced as truncated in the retained original notes."

- id: enable_phantom_power
  label: Enable Phantom Power
  kind: action
  command: "E Z X5% *1AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer
      description: "See Object ID (OID) Number Tables on page 55."
  notes: "Phantom power is only available on mic/line inputs 1 through 8. Response: DsZ X5% *1 ]"

- id: disable_phantom_power
  label: Disable Phantom Power
  kind: action
  command: "E Z X5% *0AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer
      description: "See Object ID (OID) Number Tables on page 55."
  notes: "Phantom power is only available on mic/line inputs 1 through 8. Response: DsZ X5% *0 ]"

- id: phantom_power_status
  label: Phantom Power Status
  kind: query
  command: "E Z X5% AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer
      description: "See Object ID (OID) Number Tables on page 55."
  notes: "Phantom power is only available on mic/line inputs 1 through 8. Response: DsZ X5% * X6!]. X6! = 0 = Disabled (default)  1 = Enabled"

- id: read_meter_level
  label: Read Meter Level
  kind: query
  command: "E V X5% AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer
      description: "See Object ID (OID) Number Tables on page 55."
  notes: "Metering is available on all input gain and output attenuation blocks. Response: X7! * X7@]. X7@ = -150.0 dBFS to 0.0 dBFS (1500 to 0000)."

- id: enable_meter_updates
  label: Enable Meter Updates
  kind: action
  command: "E V X5% * X7! AU }"
  params:
    - name: target_oid
      source_symbol: X5%
      type: integer
      description: "See Object ID (OID) Number Tables on page 55."
    - name: update_status
      source_symbol: X7!
      type: integer
      description: "1 = Disabled  2 = Enabled"
  notes: "Metering is available on all input gain and output attenuation blocks. Response: DsV X5% * X7!]. The Metering table defines X7! as 1/2; the general symbol key elsewhere defines it as 0/1."

- id: reset_sis_over_ssh_port_map
  label: Reset SIS-over-SSH Port Map
  kind: action
  command: "E B X5$ *22023PMAP }"
  params:
    - name: nic
      source_symbol: X5$
      type: integer
      description: "1 = LAN 1   2 = LAN 2"
  notes: "Reset port to default 22023. Response: PmapB• X5$ *22023 ]. The complete source supplies this value despite the retained original truncation notes."
```

## Feedbacks
```yaml
# Query-response feedbacks (representative states; the corresponding query
# actions above carry the verbatim ASCII request).
- id: firmware_version_state
  type: string
  values: ["x.xx"]  # UNRESOLVED: full version range not bounded in source
  query: query_firmware_version
  query_command: "Q"

- id: dhcp_state
  type: enum
  values: ["0", "1"]
  query: view_dhcp_mode
  query_command: "EDH}"

- id: verbose_mode_state
  type: enum
  values: ["0", "1", "2", "3"]
  query: view_verbose_mode
  query_command: "ECV}"

- id: ntp_status_state
  type: enum
  values: ["0", "1"]
  query: view_ntp_status
  query_command: "E NTEN }"

- id: snmp_access_state
  type: enum
  values: ["0", "1"]
  query: view_snmp_access_setting
  query_command: "E ESNMP }"

- id: session_security_level
  type: enum
  values: ["11", "12"]   # 11=user, 12=administrator
  query: view_session_security_level
  query_command: "E CK }"

- id: macro_status_state
  type: integer
  query: get_macro_status
  query_command: "E S X5! MCRO }"

- id: player_play_state
  type: enum
  values: ["0", "1"]
  query: player_status
  query_command: "EX4* PLAY }"

- id: player_repeat_state
  type: enum
  values: ["0", "1"]
  query: get_player_repeat_status
  query_command: "E M X4* CPLY }"

- id: usb_call_status
  type: enum
  values: ["0", "1"]
  query: view_usb_call_status
  query_command: "E H1UPHN }"

- id: gain_level
  type: integer
  query: read_gain_level
  query_command: "E G X5% AU }"

- id: group_fader_value
  type: integer
  query: view_group_fader_value
  query_command: "E D X6# GRPM }"

- id: group_mute_state
  type: enum
  values: ["0", "1"]
  query: view_group_mute_value
  query_command: "E D X6# GRPM }"

- id: group_type
  type: enum
  values: ["6", "12", "21"]   # 6=gain, 12=mute, 21=meter
  query: view_group_type
  query_command: "E P X6# GRPM }"

- id: automixer_gate_status
  type: enum
  values: ["0", "1024"]
  query: get_automixer_gate_status
  query_command: "E J X9( AU }"

- id: aux_input_mute_state
  type: enum
  values: ["0", "1"]
  query: get_aux_input_mute_status
  query_command: "E M X5* AU }"

- id: aux_output_mute_state
  type: enum
  values: ["0", "1"]
  query: get_aux_output_mute_status
  query_command: "E M X5% AU }"

- id: voip_registration_state
  type: enum
  values: ["0", "1", "2", "3", "4"]
  query: voip_registration_status
  query_command: "E RS X8) VOIP }"

- id: voip_call_status
  type: enum
  values: ["0", "1", "2", "3", "4", "5"]
  query: voip_line_status
  query_command: "E LS X8) , X8! VOIP }"
```

## Variables
```yaml
# Settable parameters that are not discrete actions.
- id: unit_name
  type: string
  max_length: 63
  set: set_unit_name

- id: ip_address
  type: string
  default: "192.168.254.254"
  set: set_ip_address

- id: subnet_mask
  type: string
  default: "255.255.255.0"
  set: set_subnet_mask

- id: gateway_ip
  type: string
  default: "0.0.0.0"
  set: set_gateway_ip_address

- id: dns_server_ip
  type: string
  set: set_dns_server_ip

- id: serial_baud_rate
  type: integer
  default: 38400
  set: configure_serial_parameters

- id: connection_timeout_seconds
  type: integer
  range: "10 to 650000 (1 step = 10 s; param range 1-65000)"
  default: 300
  set: set_global_ip_port_timeout

- id: admin_password
  type: string
  max_length: 128
  set: set_admin_password

- id: user_password
  type: string
  max_length: 128
  set: set_user_password

- id: verbose_mode
  type: enum
  values: ["0", "1", "2", "3"]
  set: set_verbose_mode

- id: audio_gain
  type: integer
  unit: "dB x10 (10x multiplier, no decimals)"
  set: set_gain_level

- id: group_fader
  type: integer
  unit: "dB x10 (0.1 dB increments)"
  set: set_group_fader_value

- id: ntp_ip_address
  type: string
  set: set_ntp_ip_address
```

## Events
```yaml
# Unsolicited messages the device sends. See "Device-Initiated Power-Up Message"
# (p.30), "Unsolicited Responses" (VoIP p.53), "Asynchronous Macro Responses"
# (p.46), "Playback finished" (p.46), and unsolicited meter/SLM/automixer
# responses (pp.49-52).

- id: power_up_copyright_message
  trigger: "First power-on over RS-232, or first Telnet connection opened."
  payload: "© Copyright 2016-2022, Extron Electronics DMP 128 Plus {model}, V {x.xx}, 60-{nnnn}-{nn} ]"
  notes: "{model} = full model name; V{x.xx} = firmware; 60-{nnnn}-{nn} = part number. Date/time line follows on Telnet only."

- id: password_prompt
  trigger: "Telnet/Web connection when a password is configured."
  payload: "] Password"
  notes: "Repeated until correct admin or user password is entered."

- id: login_administrator
  trigger: "Successful administrator password entry."
  payload: "] Login Administrator ]"

- id: login_user
  trigger: "Successful user password entry."
  payload: "] Login User ]"

# Asynchronous macro responses:
- id: macro_started
  payload: "McroSTARTED X5!]"
- id: macro_finished
  payload: "McroFINISHED X5!]"
- id: macro_failed
  payload: "McroFAILED X5! * X5@]"
- id: macro_killed
  payload: "McroKILLED X5! * X5@]"

# Player unsolicited:
- id: playback_finished
  payload: "Play X4* *0 ]"

# Unsolicited meter group values (verbose modes 1/3 only):
- id: unsolicited_meter_group_values
  payload: "GrpmV X6# * <val>1 * <val>2 * ... * <val>n ]"
  notes: "Values 0-1500 (0.0 to -150.0 dBFS). Order = numerical OID order in group."

# Signal Level Monitoring (SLM) unsolicited:
- id: slm_meter_value
  payload: "DsV X5% * X7% * X7& * X7*]"
  notes: "OID, meter on/off, level (0.0 to -200.0 dBFS), above/below threshold."

# Automixer gate unsolicited:
- id: automixer_gate_status_update
  payload: "DsV X5% * X7% * X7( * X10!]"
  notes: "OID, meter on/off, gate signal level, gate status (closed/opened)."

# VoIP unsolicited responses:
- id: voip_busy
  payload: "VoipBusy X8) , X8!]"
- id: voip_rejected
  payload: "VoipRejected X8) , X8!]"
- id: voip_unreachable
  payload: "VoipUnreachable X8) , X8!]"
- id: voip_terminated
  payload: "VoipTerminated X8) , X8!]"
- id: voip_incoming
  payload: "VoipIncoming X8) , X8! , X8* , X9& , X8(]"
- id: voip_registration_status_event
  payload: "VoipRS X8) , X9)]"
- id: voip_line_status_event
  payload: "VoipLS X8) , X9! , X9! , X9! , X9! , X9! , X9! , X9! , X9!]"
  notes: "8 X9! appearance entries."
- id: voip_remote_cancel
  payload: "VoipRemoteCancel X8) , X8!]"

# Error responses (issued when a command cannot be executed):
- id: error_e10
  code: E10
  meaning: Unrecognized command
- id: error_e12
  code: E12
  meaning: Invalid port number
- id: error_e13
  code: E13
  meaning: Invalid parameter
- id: error_e14
  code: E14
  meaning: Not valid for this configuration
- id: error_e17
  code: E17
  meaning: Invalid command for signal type
- id: error_e18
  code: E18
  meaning: System timed out
- id: error_e22
  code: E22
  meaning: Busy when not set
- id: error_e24
  code: E24
  meaning: Privilege violation
- id: error_e25
  code: E25
  meaning: Device not present
- id: error_e26
  code: E26
  meaning: Maximum connections exceeded
- id: error_e27
  code: E27
  meaning: Bad filename or file not found
- id: error_e28
  code: E28
  meaning: Bad file name or file not found
- id: error_e31
  code: E31
  meaning: Attempt to break port pass-through
```

## Macros
```yaml
# The DMP 128 Plus exposes a macro subsystem (run/kill/status/name/power-on, see
# Macro Commands above) but the source documents no named multi-step macro
# sequences. Macro step contents are authored in DSP Configurator, not via SIS.
# UNRESOLVED: source documents no named multi-step macro sequences via SIS.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Destructive reset commands execute
# immediately on receipt:
#   - Full factory reset (E ZQQQ }) deletes all user content and reverts to default.
#   - Partial factory reset (E ZXXX }), flash reset (E ZFFF }), and
#     "reset all device settings" (E ZY }) execute without confirmation.
# Reset Modes (rear-panel button, p.9) also delete content at certain hold times.
```

## Notes
- The "Plus" family differs from the legacy DMP 128: adds VoIP (V models), Dante/AT expansion bus, virtual returns A-P (16), aux inputs/outputs (8 each), file/tone players (8), macros (64), NTP, SNMP, per-NIC port mapping (PMAP), Signal Level Monitoring, and unsolicited meter groups. RS-232 baud is **38400** (higher than most Extron products) for both families.
- SIS framing: `E ... }` (Esc + payload + soft-CR `}`). Device responses end with CR/LF `]`. No start delimiter required beyond the Esc prefix. Commands case-insensitive except where noted.
- RS-232 default verbose mode = 1 (verbose); Telnet default = 0 (clear). Use verbose 1 or 3 on Telnet to receive unsolicited change notices from other sockets/serial.
- Default IP: 192.168.254.254 (LAN 1); 192.168.1.254 (LAN 2 on V models). Default subnet 255.255.255.0, gateway 0.0.0.0, DHCP off.
- Auth is **IP-only**: factory password = device serial number; up to 128 chars; case-sensitive; cannot contain `|`; cannot be a single space. RS-232/USB connections never prompt. Default after factory reset = no password.
- Default connection timeout 5 minutes; Extron recommends leaving at default and periodically issuing `Q` to keep connection alive.
- Audio dB encoding: **direct 10x multiplier, no offset** (unlike legacy DMP 128's +2048 offset). E.g. +10.4 dB = `104`, -3.2 dB = `-32`. Gain ranges vary by block type.
- Digital I/O (8 channels) supports action types 0-16 (mutes, group mutes, macros, presets) via X3% with trigger modes (level/edge/toggle). See symbol key pp.33-34.
- Dante passthrough: use `w` for Esc and `|` for CR inside remote commands; closing `}` required. Requires Verbose mode 1/3.
- HTML reserved characters rejected in names/passwords/filenames: `{space (OK for names)} + ~ , @ = ' { } [ ] < > \` " ; : \\ ?` (verbatim, p.31).
- Mix-point routing is achieved by mute/unmute of the mix-point OID; there is no separate "route" opcode. To route input N to output M, look up the mix-point address (pp.59-65) and send `E M{oid}*0AU}` (unmute = route) or `E M{oid}*1AU}` (mute = break).
- On AT models, the last 16 channels can be set as AT Inputs (AT In 33-48) or Expansion Inputs (EXP 1-16).

<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: SKU variants (V / AT / C) referenced throughout but full model enumeration not stated in the source excerpt; only "DMP 128 Plus" base model confirmed. -->
<!-- UNRESOLVED: "Reset SIS-over-SSH port map" command truncated in source; default reset value (likely 22) not shown verbatim. -->
<!-- UNRESOLVED: "Restore device configuration" command (E 0*X2&XF}) row truncated in source; response shape not captured. -->
<!-- UNRESOLVED: CISG gateway X% symbol reused for both IP and gateway within one command — the source explicitly disambiguates by position, not by distinct symbol. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/dmp_128_plus_68-2826-01_M.pdf
  - https://media.extron.com/public/download/files/userman/dmp_64_plus_68-3291-01_E.pdf
  - https://media.extron.com/public/download/files/userman/DMP_128_68-2036-01_revF.pdf
  - https://media.extron.com/public/download/files/userman/DMP64_68-1790-01_D.pdf
  - https://media.extron.com/public/download/files/userman/dmp_128_flexplus_68-3428-01_E.pdf
retrieved_at: 2026-07-02T04:10:33.065Z
last_checked_at: 2026-10-07T21:04:02.014Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T21:04:02.014Z
matched_actions: 241
action_count: 241
confidence: medium
summary: "All 241 action units match source command tables and transport values are supported; generic audio mute/unmute appear only in spec Notes, so coverage is near-complete. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Power on/off commands are not documented in source; the device appears always-on when powered; no SIS power command exists."
- "Firmware version compatibility range not stated in source."
- "SKU variants (V / AT / C) are referenced throughout but the full model enumeration is not stated in the source excerpt."
- "SIS-over-SSH reset-to-default port value was truncated in the source excerpt."
- "the \"Reset SIS-over-SSH port map\" command was truncated in the"
- "full version range not bounded in source"
- "source documents no named multi-step macro sequences via SIS."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility range not stated in source."
- "SKU variants (V / AT / C) referenced throughout but full model enumeration not stated in the source excerpt; only \"DMP 128 Plus\" base model confirmed."
- "\"Reset SIS-over-SSH port map\" command truncated in source; default reset value (likely 22) not shown verbatim."
- "\"Restore device configuration\" command (E 0*X2&XF}) row truncated in source; response shape not captured."
- "CISG gateway X% symbol reused for both IP and gateway within one command — the source explicitly disambiguates by position, not by distinct symbol."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
