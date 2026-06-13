---
spec_id: admin/extron-dtp3-t-203
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DTP3 T 203 Control Spec"
manufacturer: Extron
model_family: "DTP3 T 203"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DTP3 T 203"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/DTP3_T_203_68-3702-01_F.pdf
  - https://www.extron.com/download/files/userman/DTP3_T_203_68-3702-01_F.pdf
  - https://www.extron.com/download/files/userman/dtp3_t_203_ports_protocols_68-3702-51_A.pdf
  - https://media.extron.com/public/download/files/userman/dtp3_cp_series_68-3058-50_E.pdf
  - https://media.extron.com/public/download/files/userman/DTP3_TR_331_68-3892-01_A.pdf
retrieved_at: 2026-06-11T05:26:38.344Z
last_checked_at: 2026-06-11T13:42:34.830Z
generated_at: 2026-06-11T13:42:34.830Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated; verified against source revision DTP System User Guide 68-3702-01 Rev. F 12 25"
  - "source documents no explicit safety interlock procedures; only \"do not tin the wires\" pin-out note"
  - "firmware version range compatibility not stated; baud rate enumerations beyond Port 1 (fixed 9600) not tested by spec author."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:42:34.830Z
  matched_actions: 113
  action_count: 113
  confidence: medium
  summary: "All 113 spec actions matched verbatim in source. Transport (9600 baud, 8-bit, TCP port 22023) confirmed. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Extron DTP3 T 203 Control Spec

## Summary
The Extron DTP3 T 203 is a three-input DTP/HDBT-capable switcher/extender with two outputs. This spec covers the SIS (Simple Instruction Set) command protocol exposed over the rear-panel RS-232 port (9600/8/N/1, no flow control) and the LAN port (TCP via SSH on port 22023; Telnet on port 23 is disabled by default and must be remapped via SIS). Authentication is required for both administrator and user accounts.

<!-- UNRESOLVED: firmware version not stated; verified against source revision DTP System User Guide 68-3702-01 Rev. F 12 25 -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 22023  # SIS-over-SSH on LAN; default
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # admin + user accounts, default = device serial number
  username: ["administrator", "user"]  # inferred: two account types named in source
  default_password: "<device-serial-number>"  # factory default; "extron" after full reset
```

**Notes on transport:**
- Rear panel RS-232 (3-pole captive screw): Rx/Tx/G; 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control.
- LAN: open TCP socket to port 22023; device sends a copyright banner (product name, firmware version, part number, date/time); user then enters administrator or user password.
- Telnet on port 23 is disabled by default; enable with `E Z23PMAP }`, disable with `E Z0PMAP }`.
- Idle TCP connection times out after 5 minutes (configurable); use the `Q` (query) command to keep alive.

## Traits
```yaml
- powerable       # power toggle described (RPWR, remote 48 VDC)
- routable        # input select, auto-switch modes
- queryable       # extensive status query commands
- levelable       # inferred: not applicable - no level commands in source
```

## Actions
```yaml
- id: view_signal_status
  label: View Signal Status (unsolicited)
  kind: query
  command: "E 0LS }"
  params: []
- id: view_input_hdcp_status
  label: View Input HDCP Status
  kind: query
  command: "E IHDCP }"
  params: []
- id: view_output_hdcp_status
  label: View Output HDCP Status
  kind: query
  command: "E OHDCP }"
  params: []
- id: view_output_hdcp_encryption_status
  label: View Output HDCP Encryption Status
  kind: query
  command: "E B X@ HDCP }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
- id: view_usbc_power_delivery_status
  label: View USB-C Power Delivery Status
  kind: query
  command: "E 35STAT }"
  params: []
- id: set_hdcp_authorization_per_input
  label: Set HDCP Authorization Per Input
  kind: action
  command: "E E X2* * X! HDCP }"
  params:
    - name: input
      type: integer
      description: Input number (1-3)
    - name: status
      type: integer
      description: "0 = off, 1 = on (default)"
- id: set_hdcp_authorization_all_inputs
  label: Set HDCP Authorization All Inputs
  kind: action
  command: "E E X! HDCP }"
  params:
    - name: status
      type: integer
      description: "0 = off, 1 = on (default)"
- id: view_hdcp_authorization
  label: View HDCP Authorization
  kind: query
  command: "E EHDCP }"
  params: []
- id: set_output_hdcp_mode_per_output
  label: Set Output HDCP Mode Per Output
  kind: action
  command: "E S X@ * X$ HDCP }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: mode
      type: integer
      description: "1 = encrypt as required (default), 2 = always encrypt"
- id: set_output_hdcp_mode_all
  label: Set Output HDCP Mode All Outputs
  kind: action
  command: "E S X$ HDCP }"
  params:
    - name: mode
      type: integer
      description: "1 = encrypt as required (default), 2 = always encrypt"
- id: view_output_hdcp_mode
  label: View Output HDCP Mode
  kind: query
  command: "E SHDCP }"
  params: []
- id: set_hdcp_notification
  label: Set HDCP Notification
  kind: action
  command: "E N X@ * X* HDCP }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: notification
      type: integer
      description: "0 = black screen, 1 = green screen (default)"
- id: view_hdcp_notification
  label: View HDCP Notification
  kind: query
  command: "E N X@ HDCP }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
- id: select_input
  label: Select Input
  kind: action
  command: "X2* !"
  params:
    - name: input
      type: integer
      description: Input number (0-3)
- id: view_selected_input
  label: View Selected Input
  kind: query
  command: "!"
  params: []
- id: set_video_mute_per_output
  label: Set Video Mute Per Output
  kind: action
  command: "X@ * X! B"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: mute
      type: integer
      description: "0 = off (default), 1 = on, 2 = video sync mute"
- id: set_video_mute_all_outputs
  label: Set Video Mute All Outputs
  kind: action
  command: "X! B"
  params:
    - name: mute
      type: integer
      description: "0 = off (default), 1 = on, 2 = video sync mute"
- id: view_video_mute_status
  label: View Video Mute Status
  kind: query
  command: "B"
  params: []
- id: set_output_tmds_format_per_output
  label: Set Output TMDS Format Per Output
  kind: action
  command: "E X@ * X% VTPO }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: format
      type: integer
      description: "1 = auto (default), 2 = DVI RGB 444, 3 = HDMI RGB Full, 4 = HDMI RGB Limited, 5 = HDMI YUV 444 Limited, 6 = HDMI YUV 422 Limited"
- id: set_output_tmds_format_all
  label: Set Output TMDS Format All Outputs
  kind: action
  command: "E X% VTPO }"
  params:
    - name: format
      type: integer
      description: "1 = auto (default), 2 = DVI RGB 444, 3 = HDMI RGB Full, 4 = HDMI RGB Limited, 5 = HDMI YUV 444 Limited, 6 = HDMI YUV 422 Limited"
- id: view_output_tmds_format
  label: View Output TMDS Format
  kind: query
  command: "E VTPO }"
  params: []
- id: set_5v_output_mode_per_output
  label: Set 5V Output Mode Per Output
  kind: action
  command: "E M X@ * X1) HPLG }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: mode
      type: integer
      description: "1 = auto 5V (default varies), 2 = 5V always enabled (default)"
- id: view_5v_output_mode
  label: View 5V Output Mode
  kind: query
  command: "E MHPLG }"
  params: []
- id: upload_file_to_unit
  label: Upload File to Unit
  kind: action
  command: "E +UFsize,<filename> }"
  params:
    - name: size
      type: integer
      description: "128 or 256"
    - name: filename
      type: string
      description: Target filename on the unit
- id: import_edid_to_input_slot
  label: Import EDID to Input Slot
  kind: action
  command: "E I X( ,<filename>EDID }"
  params:
    - name: slot
      type: integer
      description: Slot on EDID look-up table
    - name: filename
      type: string
      description: Source EDID filename (.bin)
- id: export_edid_from_slot
  label: Export EDID From Slot
  kind: action
  command: "E E X( ,<filename>EDID }"
  params:
    - name: slot
      type: integer
      description: Slot on EDID look-up table
    - name: filename
      type: string
      description: Destination filename
- id: view_assigned_edid_hex
  label: View Assigned EDID (HEX)
  kind: query
  command: "E R X2* EDID }"
  params:
    - name: input
      type: integer
      description: Input number (1-3)
- id: view_assigned_edid_native_rate
  label: View Assigned EDID Native Rate
  kind: query
  command: "E N X2* EDID }"
  params:
    - name: input
      type: integer
      description: Input number (1-3)
- id: set_auto_switch_mode
  label: Set Auto-Switch Mode
  kind: action
  command: "E X2& AUSW }"
  params:
    - name: mode
      type: integer
      description: "0 = disabled (default), 1 = user defined priority, 2 = input memory priority"
- id: view_auto_switch_mode
  label: View Auto-Switch Mode
  kind: query
  command: "E AUSW }"
  params: []
- id: set_user_priority_order_mode1
  label: Set User Priority Order (Mode 1)
  kind: action
  command: "E P X2*•X2*•X2* AUSW }"
  params:
    - name: priority
      type: string
      description: Three input numbers (e.g. 3*2*1 highest to lowest default)
- id: view_user_priority_order
  label: View User Priority Order
  kind: query
  command: "E PAUSW }"
  params: []
- id: view_machine_priority_mode1
  label: View Machine Priority (Mode 1)
  kind: query
  command: "E OAUSW }"
  params: []
- id: set_auto_switch_timeout_mode2
  label: Set Auto-Switch Timeout (Mode 2)
  kind: action
  command: "E T X2( AUSW }"
  params:
    - name: timeout
      type: integer
      description: "0-500 seconds (1 s intervals), default 3"
- id: view_auto_switch_timeout
  label: View Auto-Switch Timeout
  kind: query
  command: "E TAUSW }"
  params: []
- id: set_contact_tally_behavior
  label: Set Contact/Tally Behavior
  kind: action
  command: "E X3@ * X3# MUTM }"
  params:
    - name: closure_behavior
      type: integer
      description: "0 = stays on current input (default), 1 = select 0 if re-selected"
    - name: tally_pin_mode
      type: integer
      description: "0 = always on (default), 1 = off when muted, 2 = blinking when mute"
- id: view_contact_tally_mode
  label: View Contact/Tally Mode
  kind: query
  command: "E MUTM }"
  params: []
- id: set_audio_mute_per_output
  label: Set Audio Mute Per Output
  kind: action
  command: "X@ * X! Z"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: mute
      type: integer
      description: "0 = off (default), 1 = on"
- id: set_audio_mute_all_outputs
  label: Set Audio Mute All Outputs
  kind: action
  command: "X! Z"
  params:
    - name: mute
      type: integer
      description: "0 = off (default), 1 = on"
- id: view_audio_mute_status
  label: View Audio Mute Status
  kind: query
  command: "Z"
  params: []
- id: set_output_uart_mode
  label: Set Output UART Mode
  kind: action
  command: "E O X1( LRPT }"
  params:
    - name: mode
      type: integer
      description: "0 = RS-232 pass through (default), 1 = Ethernet to RS-232 insertion, 2 = Host mode"
- id: view_output_uart_setting
  label: View Output UART Setting
  kind: query
  command: "E OLRPT }"
  params: []
- id: set_serial_port_parameters
  label: Set Serial Port Parameters
  kind: action
  command: "E X2) * X2! , X2@ , X2# , X2$ CP }"
  params:
    - name: port
      type: integer
      description: "01 = Remote RS-232, 02 = Unused, 03 = Output B over DTP UART"
    - name: baud
      type: integer
      description: "300..115200; port 1 fixed at 9600"
    - name: parity
      type: string
      description: "off / even / none / mark / space (first letter ok)"
    - name: data_bits
      type: integer
      description: "7 or 8 (8 default)"
    - name: stop_bits
      type: integer
      description: "1 or 2 (1 default)"
- id: view_serial_port_status
  label: View Serial Port Status
  kind: query
  command: "E X2) CP }"
  params:
    - name: port
      type: integer
      description: Port number (01-03)
- id: configure_receive_timeout
  label: Configure Receive Timeout
  kind: action
  command: "E X3^ * X3& * X3* * X4) * X3( CE }"
  params:
    - name: port
      type: integer
      description: Specific port (01-99)
    - name: inter_char_timeout
      type: integer
      description: Terminating timeout, 10s of ms (1-32767; default 10 = 100ms)
    - name: inter_char_gap
      type: integer
      description: Between-char timeout, 10s of ms (0-32767; default 2 = 20ms)
    - name: priority
      type: integer
      description: "0 = use send-data params, 1 = use these params (default 0)"
    - name: terminator
      type: string
      description: Length (e.g. 3L) or Delimiter (e.g. 10D)
- id: view_receive_timeout
  label: View Receive Timeout
  kind: query
  command: "E X3^ CE }"
  params:
    - name: port
      type: integer
      description: Port number (01-99)
- id: set_uart_start_point
  label: Set UART Start Point
  kind: action
  command: "E X2^ MD }"
  params:
    - name: start_point
      type: integer
      description: Start point (default 3001)
- id: read_uart_start_point
  label: Read UART Start Point
  kind: query
  command: "E MD }"
  params: []
- id: set_date_time
  label: Set Date and Time
  kind: action
  command: "E X4! CT }"
  params:
    - name: datetime
      type: string
      description: "MM/DD/YY-HH:MM:SS"
- id: view_date_time
  label: View Date and Time
  kind: query
  command: "E CT }"
  params: []
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
- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "E X4@ CI }"
  params:
    - name: ip
      type: string
      description: IPv4 dotted-decimal; default 192.168.254.254
- id: view_ip_address
  label: View IP Address
  kind: query
  command: "E CI }"
  params: []
- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "E X4# CS }"
  params:
    - name: mask
      type: string
      description: Dotted-decimal; default 255.255.255.0
- id: view_subnet_mask
  label: View Subnet Mask
  kind: query
  command: "E CS }"
  params: []
- id: set_gateway_ip
  label: Set Gateway IP
  kind: action
  command: "E X4@ CG }"
  params:
    - name: ip
      type: string
      description: Default 0.0.0.0
- id: view_gateway_ip
  label: View Gateway IP
  kind: query
  command: "E CG }"
  params: []
- id: set_dns_server_ip
  label: Set DNS Server IP
  kind: action
  command: "E X4@ DI }"
  params:
    - name: ip
      type: string
      description: Default 0.0.0.0
- id: view_dns_server_ip
  label: View DNS Server IP
  kind: query
  command: "E DI }"
  params: []
- id: view_hardware_mac
  label: View Hardware MAC Address
  kind: query
  command: "E CH }"
  params: []
- id: view_connection_listing
  label: View Connection Listing
  kind: query
  command: "E CC }"
  params: []
- id: set_administrator_password
  label: Set Administrator Password
  kind: action
  command: "E X4% CA }"
  params:
    - name: password
      type: string
      description: "0-128 ASCII chars except |; case-sensitive"
- id: clear_administrator_password
  label: Clear Administrator Password
  kind: action
  command: "E• CA }"
  params: []
- id: view_administrator_password
  label: View Administrator Password
  kind: query
  command: "E CA }"
  params: []
- id: set_user_password
  label: Set User Password
  kind: action
  command: "E X4% CU }"
  params:
    - name: password
      type: string
      description: "0-128 ASCII chars except |; case-sensitive"
- id: clear_user_password
  label: Clear User Password
  kind: action
  command: "E• CU }"
  params: []
- id: view_user_password
  label: View User Password
  kind: query
  command: "E CU }"
  params: []
- id: set_ip_subnet_gateway_cisg
  label: Set IP/Subnet/Gateway (CISG)
  kind: action
  command: "E 1* X4@ / X4^ * X4@ CSIG }"
  params:
    - name: ip
      type: string
      description: IPv4 address
    - name: prefix
      type: integer
      description: "Subnet prefix bits (e.g. /16 = 255.255.255.0)"
    - name: gateway
      type: string
      description: IPv4 gateway
- id: view_ip_subnet_gateway_cisg
  label: View IP/Subnet/Gateway (CISG)
  kind: query
  command: "E 1CISG }"
  params: []
- id: enable_ntp
  label: Enable NTP
  kind: action
  command: "E 1NTEN }"
  params: []
- id: disable_ntp
  label: Disable NTP
  kind: action
  command: "E 0NTEN }"
  params: []
- id: view_ntp_status
  label: View NTP Status
  kind: query
  command: "E NTEN }"
  params: []
- id: set_port_timeout
  label: Set Port Timeout
  kind: action
  command: "E 0* X2% TC }"
  params:
    - name: timeout
      type: integer
      description: "1-65000 in 10s intervals; default 30 = 300s"
- id: view_port_timeout
  label: View Port Timeout
  kind: query
  command: "E 0TC }"
  params: []
- id: set_ssh_port_mapping
  label: Set SIS-over-SSH Port Mapping
  kind: action
  command: "E B{port number}PMAP }"
  params:
    - name: port
      type: integer
      description: Port number
- id: disable_ssh_port
  label: Disable SIS-over-SSH Port
  kind: action
  command: "E B0PMAP }"
  params: []
- id: view_ssh_port_mapping
  label: View SIS-over-SSH Port Mapping
  kind: query
  command: "E BPMAP }"
  params: []
- id: set_telnet_port_map
  label: Set Telnet Port Map
  kind: action
  command: "E Z{port number}PMAP }"
  params:
    - name: port
      type: integer
      description: Port number
- id: reset_telnet_port_map
  label: Reset Telnet Port Map
  kind: action
  command: "E Z23PMAP }"
  params: []
- id: disable_telnet_port
  label: Disable Telnet Port
  kind: action
  command: "E Z0PMAP }"
  params: []
- id: view_telnet_port_mapping
  label: View Telnet Port Mapping
  kind: query
  command: "E ZPMAP }"
  params: []
- id: view_dtp_hdbt_toggle
  label: View DTP/HDBT Toggle Switch Status
  kind: query
  command: "E OHDBT }"
  params: []
- id: view_send_power_toggle
  label: View Send Power Toggle Status
  kind: query
  command: "E RPWR }"
  params: []
- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E X1# CV }"
  params:
    - name: mode
      type: integer
      description: "0 = clear/none (LAN default), 1 = verbose (RS-232 default), 2 = tagged responses, 3 = verbose + tagged"
- id: view_verbose_mode
  label: View Verbose Mode
  kind: query
  command: "E CV }"
  params: []
- id: request_part_number
  label: Request Part Number
  kind: query
  command: "N/n"
  params: []
- id: view_firmware_version
  label: View Firmware Version
  kind: query
  command: "Q/q"
  params: []
- id: view_firmware_version_with_patch
  label: View Firmware Version With Patch
  kind: query
  command: "*Q/q"
  params: []
- id: view_detailed_firmware_version
  label: View Detailed Firmware Version
  kind: query
  command: "0Q/q"
  params: []
- id: view_model_name
  label: View Model Name
  kind: query
  command: "1I"
  params: []
- id: view_model_description
  label: View Model Description
  kind: query
  command: "2I"
  params: []
- id: view_active_signal_info
  label: View Active Signal Information
  kind: query
  command: "33I"
  params: []
- id: set_front_panel_lockout
  label: Set Front Panel Lockout (Executive Mode)
  kind: action
  command: "X! X/x"
  params:
    - name: mode
      type: integer
      description: "0 = off, 1 = on"
- id: view_front_panel_lockout
  label: View Front Panel Lockout
  kind: query
  command: "X/x"
  params: []
- id: partial_factory_reset
  label: Partial Factory Reset
  kind: action
  command: "E ZXXX }"
  params: []
- id: reset_network_settings
  label: Reset Network Settings
  kind: action
  command: "E 1ZQQQ }"
  params: []
- id: full_factory_reset
  label: Full Factory Reset
  kind: action
  command: "E ZQQQ }"
  params: []
- id: reboot_system
  label: Reboot System
  kind: action
  command: "E 1BOOT }"
  params: []
- id: enable_disable_input_cec
  label: Enable/Disable One Input CEC
  kind: action
  command: "E I X2* * X4& CCEC }"
  params:
    - name: input
      type: integer
      description: Input number (1-3)
    - name: mode
      type: integer
      description: "0 = disabled (default), 2 = unidirectional, 4 = bidirectional (recommended)"
- id: enable_disable_all_inputs_cec
  label: Enable/Disable All Inputs CEC
  kind: action
  command: "E I X4& *CCEC }"
  params:
    - name: mode
      type: integer
      description: "0 = disabled (default), 2 = unidirectional, 4 = bidirectional"
- id: view_input_cec_status
  label: View Input CEC Status
  kind: query
  command: "E I X2* CCEC }"
  params:
    - name: input
      type: integer
      description: Input number (1-3)
- id: enable_disable_output_cec
  label: Enable/Disable One Output CEC
  kind: action
  command: "E O X@ * X4& CCEC }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: mode
      type: integer
      description: "0 = disabled (default), 2 = unidirectional, 4 = bidirectional (recommended)"
- id: view_output_cec_status
  label: View Output CEC Status
  kind: query
  command: "E O X@ CCEC }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
- id: send_cec_data_to_input
  label: Send CEC Data to Input
  kind: action
  command: "E I X2* * X5! DCEC }"
  params:
    - name: input
      type: integer
      description: Input number (1-3)
    - name: command_or_data
      type: string
      description: "CEC command (e.g. \"PwrOn\") or hex data (e.g. %2A%07%FF)"
- id: send_cec_data_to_output
  label: Send CEC Data to Output
  kind: action
  command: "E O X@ * X5! DCEC }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: command_or_data
      type: string
      description: "CEC command or hex data"
- id: broadcast_cec_to_input
  label: Broadcast CEC to Input
  kind: action
  command: "E I X2* *15* X5! DCEC }"
  params:
    - name: input
      type: integer
      description: Input number (1-3)
    - name: command_or_data
      type: string
      description: "CEC command or hex data"
- id: broadcast_cec_to_output
  label: Broadcast CEC to Output
  kind: action
  command: "E O X@ *15* X5! DCEC }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: command_or_data
      type: string
      description: "CEC command or hex data"
- id: list_cec_device_presence
  label: List CEC Device Presence
  kind: query
  command: "E LQCEC }"
  params: []
- id: rediscover_cec_input
  label: Rediscover CEC Device on Input
  kind: action
  command: "E I X2* QCEC }"
  params:
    - name: input
      type: integer
      description: Input number (1-3)
- id: rediscover_cec_output
  label: Rediscover CEC Device on Output
  kind: action
  command: "E O X@ QCEC }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
- id: report_cec_physical_address
  label: Report CEC Physical Address of Output
  kind: query
  command: "E O X@ PCEC }"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  # source: View Send Power toggle (E RPWR }) -> X1!; 0=off, 1=DTP3 48VDC
- id: signal_status
  type: object
  description: "Per-input + per-output signal presence, 0=undetected/1=detected"
  # source: E 0LS } -> X!•X!•X! * X!•X!
- id: input_hdcp_status
  type: enum
  values_per_input: [no_source, hdcp_source, non_hdcp_source]
  # source: E IHDCP } -> X^ per input
- id: output_hdcp_status
  type: enum
  values_per_output: [no_sink, hdcp_sink, non_hdcp_sink]
  # source: E OHDCP } -> X& per output
- id: hdcp_authorization
  type: enum
  values: [off, on]
- id: hdcp_authorization_per_input
  type: enum
  values_per_input: [off, on]
- id: output_hdcp_mode
  type: enum
  values_per_output: [encrypt_as_required, always_encrypt]
- id: hdcp_notification
  type: enum
  values_per_output: [black_screen, green_screen]
- id: selected_input
  type: integer
  description: "0-3"
  # source: ! -> X2*
- id: video_mute_status
  type: enum
  values_per_output: [off, on, video_sync_mute]
- id: output_tmds_format
  type: enum
  values_per_output: [auto, dvi_rgb_444, hdmi_rgb_full, hdmi_rgb_limited, hdmi_yuv_444_limited, hdmi_yuv_422_limited]
- id: five_v_output_mode
  type: enum
  values_per_output: [auto, always_on]
- id: auto_switch_mode
  type: enum
  values: [disabled, user_defined_priority, input_memory_priority]
- id: user_priority_order
  type: string
  description: "Three input numbers separated by • (e.g. 3•2•1)"
- id: machine_priority_order
  type: string
  description: "Three input numbers separated by •"
- id: auto_switch_timeout
  type: integer
  description: "Seconds, 0-500"
- id: contact_tally_mode
  type: object
  description: "closure_behavior + tally_pin_mode per port"
- id: audio_mute_status
  type: enum
  values_per_output: [off, on]
- id: output_uart_mode
  type: enum
  values: [rs232_pass_through, ethernet_to_rs232_insertion, host_mode]
- id: serial_port_status
  type: object
  description: "baud, parity, data_bits, stop_bits per port"
- id: receive_timeout
  type: object
  description: "inter_char_timeout, inter_char_gap, priority, terminator per port"
- id: uart_start_point
  type: integer
  description: "Default 3001"
- id: date_time
  type: string
  description: "Read = day-of-week date month year HH:MM:SS"
- id: dhcp_mode
  type: enum
  values: [off, on]
- id: ip_address
  type: string
  description: "Default 192.168.254.254"
- id: subnet_mask
  type: string
  description: "Default 255.255.255.0"
- id: gateway_ip
  type: string
  description: "Default 0.0.0.0"
- id: dns_server_ip
  type: string
  description: "Default 0.0.0.0"
- id: mac_address
  type: string
  description: "Format 00-05-A6-NN-NN-NN"
- id: port_timeout
  type: integer
  description: "1-65000 in 10s intervals; default 30 = 300s"
- id: ssh_port_mapping
  type: integer
  description: "SIS-over-SSH port; default 22023"
- id: telnet_port_mapping
  type: integer
  description: "Telnet port; 0 = disabled; default 0"
- id: dtp_hdbt_toggle
  type: enum
  values: [dtp, hdbt]
- id: send_power_toggle
  type: enum
  values: [no_remote_power, dtp3_48vdc]
- id: verbose_mode
  type: enum
  values: [none, verbose, tagged, verbose_and_tagged]
- id: part_number
  type: string
  description: "Source example 60-1885-52"
- id: firmware_version
  type: string
  description: "major.minor"
- id: firmware_version_patch
  type: string
  description: "major.minor.patch"
- id: detailed_firmware_version
  type: string
  description: "bootloader-factory-updated"
- id: model_name
  type: string
  description: "Source example DTP3 T 203"
- id: model_description
  type: string
  description: "Source example DTP3 T 203 EXTENDER"
- id: active_signal_info
  type: object
  description: "H_Active*V_Active*V_Freq*Pixel_Clock"
- id: front_panel_lockout
  type: enum
  values: [off, on]
- id: input_cec_status
  type: object
  description: "CEC mode, source logical address, destination logical address per input"
- id: output_cec_status
  type: object
  description: "CEC mode, source logical address, destination logical address per output"
- id: cec_device_presence
  type: object
  description: "Per port, 0-F = device address, X = missing, - = port off"
- id: cec_physical_address
  type: string
  description: "4 hex digits"
```

## Variables
```yaml
# All SIS commands are stateless byte-stream exchanges; no persistent variable storage model documented in source.
```

## Events
```yaml
- id: input_selection_change
  description: "In X2*• All ] - emitted when input changes externally"
- id: input_signal_status_change
  description: "Sig ... - emitted on signal state change"
- id: input_hdcp_status_change
  description: "HdcpI ... - emitted on input HDCP state change"
- id: output_hdcp_status_change
  description: "HdcpO ... - emitted on output HDCP state change"
- id: output_hdcp_blocked_state_change
  description: "HdcpB X@ * X!] - emitted on encryption state change"
- id: usbc_power_delivery_status_change
  description: "Stat35* X!] - emitted on USB-C PD state change"
- id: hdcp_authorization_change
  description: "HdcpE ... - emitted on HDCP authorization change"
- id: output_hdcp_mode_change
  description: "HdcpS ... - emitted on HDCP mode change"
- id: hdcp_notification_change
  description: "HdcpN ... - emitted on HDCP notification change"
- id: dtp_hdbt_toggle_change
  description: "HdbtO X1$] - emitted on toggle change"
- id: send_power_toggle_change
  description: "PwrR X1!] - emitted on power toggle change"
- id: auto_switch_mode_change
  description: "Ausw X2&] - emitted on auto-switch mode change"
- id: contact_tally_mode_change
  description: "MUTM ... - emitted on mode change"
- id: video_mute_change
  description: "Vmt ... - emitted on video mute change"
- id: audio_mute_change
  description: "Amt ... - emitted on audio mute change"
- id: output_tmds_format_change
  description: "Vtpo ... - emitted on TMDS format change"
- id: five_v_output_mode_change
  description: "HplgM ... - emitted on 5V output mode change"
- id: auto_switch_priority_change
  description: "AuswP ... - emitted on priority change"
- id: machine_priority_change
  description: "AuswO ... - emitted on machine priority change"
- id: auto_switch_timeout_change
  description: "AuswT ... - emitted on timeout change"
- id: cec_received_input
  description: "Ceci X2* * X5^X5% * X5@] - async CEC data from input"
- id: cec_received_output
  description: "Ceco X@ * X5^X5% * X5@] - async CEC data from output"
- id: cec_rediscover_progress
  description: "QcecI X2* *N] / QcecO X@ *N] - emitted during rediscovery"
- id: verbose_mode_change
  description: "Vrb X1#] - emitted on verbose mode change"
- id: front_panel_lockout_change
  description: "Exe X!] - emitted on lockout change"
- id: output_uart_mode_change
  description: "LrptO X1(] - emitted on UART mode change"
- id: uart_start_point_change
  description: "Pmd X2^] - emitted on start point change"
- id: ip_subnet_gateway_change
  description: "Ipi/Ips/Ipg] - emitted on LAN config change"
- id: dhcp_change
  description: "Idh1/Idh0] - emitted on DHCP state change"
- id: ntp_change
  description: "Nten1/Nten0] - emitted on NTP state change"
- id: port_timeout_change
  description: "Pti0* X2%] - emitted on timeout change"
- id: ssh_port_mapping_change
  description: "PmapB{port}] - emitted on SSH port change"
- id: telnet_port_mapping_change
  description: "PmapZ{port}] - emitted on Telnet port change"
- id: powerup_banner
  description: "Copyright 20yy, Extron DTP3 T 203, V x.xx, 60-nnnn-nn - emitted at session connect"
- id: error_e01
  description: "Invalid input number (too large)"
- id: error_e06
  description: "Auto-switch, cannot select input via SIS"
- id: error_e10
  description: "Invalid command"
- id: error_e13
  description: "Invalid parameter"
- id: error_e14
  description: "Invalid for this configuration"
- id: error_e17
  description: "Invalid command for signal type"
- id: error_e24
  description: "Privilege violation"
- id: error_e28
  description: "Bad filename/File not found"
```

## Safety
```yaml
confirmation_required_for:
  - full_factory_reset
  - reset_network_settings
  - partial_factory_reset
interlocks: []
# UNRESOLVED: source documents no explicit safety interlock procedures; only "do not tin the wires" pin-out note
```

## Notes
- Symbols in source: `}` = soft carriage return (no LF). Pressing `<Enter>` (CR+LF) also accepted.
- All SIS responses terminate with CR/LF (`]`).
- Command character pause of 10+ seconds between ASCII chars causes a silent timeout/abort.
- 5-minute idle TCP timeout (configurable). Extron recommends periodic `Q` queries to keep alive.
- Telnet port 23 is disabled by default; remap via SIS to enable. SSH port 22023 is the primary control channel.
- Default passwords: device serial number for both user and administrator; full factory reset reverts both to `extron`.
- Verbose modes 2/3 cause the device to push change-notice messages to the socket; required for unsolicited event handling.
- Source: Extron DTP3 T 203 User Guide (DTP System), 68-3702-01 Rev. F 12 25.

<!-- UNRESOLVED: firmware version range compatibility not stated; baud rate enumerations beyond Port 1 (fixed 9600) not tested by spec author. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/DTP3_T_203_68-3702-01_F.pdf
  - https://www.extron.com/download/files/userman/DTP3_T_203_68-3702-01_F.pdf
  - https://www.extron.com/download/files/userman/dtp3_t_203_ports_protocols_68-3702-51_A.pdf
  - https://media.extron.com/public/download/files/userman/dtp3_cp_series_68-3058-50_E.pdf
  - https://media.extron.com/public/download/files/userman/DTP3_TR_331_68-3892-01_A.pdf
retrieved_at: 2026-06-11T05:26:38.344Z
last_checked_at: 2026-06-11T13:42:34.830Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:42:34.830Z
matched_actions: 113
action_count: 113
confidence: medium
summary: "All 113 spec actions matched verbatim in source. Transport (9600 baud, 8-bit, TCP port 22023) confirmed. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated; verified against source revision DTP System User Guide 68-3702-01 Rev. F 12 25"
- "source documents no explicit safety interlock procedures; only \"do not tin the wires\" pin-out note"
- "firmware version range compatibility not stated; baud rate enumerations beyond Port 1 (fixed 9600) not tested by spec author."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
