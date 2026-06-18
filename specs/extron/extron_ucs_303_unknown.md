---
spec_id: admin/extron-ucs-303
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron UCS 303 Control Spec"
manufacturer: Extron
model_family: "UCS 303"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "UCS 303"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - manuals.plus
  - manua.ls
  - manuals.co.uk
  - support.displaymanager.net
source_urls:
  - https://media.extron.com/public/download/files/userman/68-3538-01_C_UCS_303_User_Guide.pdf
  - https://manuals.plus/extron/ucs-303-collaboration-switcher-manual.pdf
  - https://www.manua.ls/extron/ucs-303/manual
  - https://www.manuals.co.uk/extron/ucs-303/manual
  - https://support.displaymanager.net/hc/en-gb/articles/22750870424733-Troubleshooting-Guide-for-Extron-Control-Systems
retrieved_at: 2026-06-14T06:42:49.534Z
last_checked_at: 2026-06-14T16:14:03.927Z
generated_at: 2026-06-14T16:14:03.927Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "E CN } (view unit name)"
  - "E X3&*X3) CISG } (set IP address only, no subnet prefix)"
  - "firmware version compatibility not stated in source; contact-closure and tally hardware-only behavior is documented but not part of the SIS command surface."
  - "source mentions CAUTION (risk of minor personal injury) and"
  - "full device specifications (voltage, current, weight) not in protocol-relevant section; complete verbose-mode tier semantics (0/1/2/3 detail) not fully reproduced; firmware compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-06-14T16:14:03.927Z
  matched_actions: 109
  action_count: 109
  confidence: medium
  summary: "All 109 spec actions confirmed verbatim in the source command tables; 2 minor source commands (view-unit-name and CISG IP-only variant) not in spec but coverage ratio 109/111=0.98 exceeds 0.9 threshold. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Extron UCS 303 Control Spec

## Summary
The Extron UCS 303 is a three-input, one-output multi-format video and USB collaboration switcher (HDMI 2.0b, DisplayPort 1.2, USB-C, USB 3.2) with built-in display control. It exposes an Ethernet control interface (SIS commands over SSH on port 22023, plus HTTP/HTTPS/DHCP/SNMP and an internal web server) and a rear-panel RS-232 display-control port configurable for pass-through insertion. This spec covers the Simple Instruction Set (SIS) command and response surface plus the CEC insertion commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source; contact-closure and tally hardware-only behavior is documented but not part of the SIS command surface. -->

## Transport
```yaml
protocols:
  - tcp
  - http
# inferred: TCP from explicit SSH/port-22023 SIS communication; HTTP from
# explicit "Built-in web pages" and "Web port" PMAP commands.
addressing:
  port: 22023
  # Source: "use 22023 as the port number" (LAN) and
  # "203.0.113.22 @ port 22023" (front-panel USB-C CONFIG).
  # Telnet port 23 is disabled by default; remap to 00000 to disable,
  # remap to 00023 to enable.
auth:
  type: password
  # Source: "User name - admin"; "Password - The UCS 303 unit serial number".
  # In-source password commands: E X2& CA }, E • CA }.
  user: admin
```

**Notes on transport parameters (source-stated):**
- Rear panel LAN default IP: `192.168.254.254`, Subnet `255.255.255.0`, Gateway `0.0.0.0`, DNS `127.0.0.1`, DHCP Off.
- Front panel USB-C CONFIG IP: `203.0.113.22`, port `22023`.
- Ethernet interfaces support 10/100/1000 Mbps.
- Web port default `80`; Telnet port default `23` (disabled); SSH port `22023`.
- RS-232 display port supports up to 115200 baud; default 9600 baud.

## Traits
```yaml
- routable      # inferred: input selection commands (!, %, ^) and auto-switch commands
- powerable     # inferred: power save mode and CEC PwrOn/PwrOff commands
- queryable     # inferred: status view commands (Sig, HDCP, DH, CI, CV, etc.)
```

## Actions
```yaml
# All commands below are SIS (ASCII) commands. Escape prefix E may be the
# literal character ESC (0x1B) or "W" per source: "E or `W` = Escape".
# Soft CR/LF after each command; response terminator is CR/LF (0D 0A).

# --- Signal status ---
- id: view_signal_status
  label: View input/output signal status
  kind: query
  command: "E 0LS }"
  # Verbose 2/3 form: "Sig X#•X#•X# * X#]"

- id: view_input_hdcp_status
  label: View HDCP status of inputs
  kind: query
  command: "E I HDCP }"
  # X1@ values: 0=no source, 1=HDCP detected, 2=non-HDCP source

- id: view_output_hdcp_status
  label: View HDCP status of output
  kind: query
  command: "E O HDCP }"
  # X1#: 0/1

# --- Input selection ---
- id: select_input_all
  label: Select all inputs (video, audio, USB)
  kind: action
  command: "X! !"
  params:
    - name: input
      type: integer
      description: Input number 0-3 (0=break tie)

- id: select_input_av
  label: Select input (video and audio only)
  kind: action
  command: "X! %"
  params:
    - name: input
      type: integer
      description: Input number 0-3

- id: view_selected_input_av
  label: View selected input (AV)
  kind: query
  command: "%"

- id: select_input_usb
  label: Select input (USB only)
  kind: action
  command: "X! ^"
  params:
    - name: input
      type: integer
      description: Input number 0-3

- id: view_selected_input_usb
  label: View selected input (USB)
  kind: query
  command: "^"

# --- Auto-switch mode ---
- id: set_auto_switch_mode
  label: Set auto-switch mode
  kind: action
  command: "E X1^ AUSW }"
  params:
    - name: mode
      type: integer
      description: "0=off (default), 1=user-priority, 2=input-memory-priority"

- id: view_auto_switch_mode
  label: View auto-switch mode
  kind: query
  command: "E AUSW }"

- id: set_auto_switch_user_priority
  label: Set user-defined auto-switch priority (mode 1)
  kind: action
  command: "E P X1&•X1&•...X1& AUSW }"
  params:
    - name: priority_order
      type: string
      description: Sequence of input numbers defining priority

- id: view_auto_switch_user_priority
  label: View user-defined auto-switch priority
  kind: query
  command: "E PAUSW }"

- id: view_auto_switch_machine_priority
  label: View auto-switch machine priority (mode 2)
  kind: query
  command: "E O AUSW }"

- id: set_auto_switch_timeout
  label: Set auto-switch timeout (mode 2)
  kind: action
  command: "E T X1* AUSW }"
  params:
    - name: seconds
      type: integer
      description: "0-500 seconds, 1-second increments; default 3"

- id: view_auto_switch_timeout
  label: View auto-switch timeout
  kind: query
  command: "E TAUSW }"

# --- Mute ---
- id: mute_output
  label: Mute the output
  kind: action
  command: "X@ B"
  params:
    - name: mute
      type: integer
      description: "0=off (default), 1=on, 2=video+sync mute"

- id: view_mute_status
  label: View output mute status
  kind: query
  command: "B"

# --- Input HDCP authorization ---
- id: set_input_hdcp_authorization
  label: Set HDCP authorization per input
  kind: action
  command: "E E X! * X# HDCP }"
  params:
    - name: input
      type: integer
      description: Input number 0-3
    - name: authorized
      type: integer
      description: "0=off, 1=on"

- id: set_all_inputs_hdcp_authorization
  label: Set HDCP authorization for all inputs
  kind: action
  command: "E E X# HDCP }"
  params:
    - name: authorized
      type: integer
      description: "0=off, 1=on"

- id: view_hdcp_authorization_status
  label: View HDCP authorization status (all inputs)
  kind: query
  command: "E EHDCP }"

# --- Output HDCP mode ---
- id: set_output_hdcp_mode
  label: Set output HDCP mode
  kind: action
  command: "E S X$ HDCP }"
  params:
    - name: mode
      type: integer
      description: "1=encrypt as required by input (default); 2=always encrypt"

- id: view_output_hdcp_mode
  label: View output HDCP mode
  kind: query
  command: "E SHDCP }"

# --- Output format / TMDS ---
- id: set_output_tmds_format
  label: Set output TMDS format
  kind: action
  command: "E X% VTPO }"
  params:
    - name: format
      type: integer
      description: "1=Auto (default), 2=DVI RGB 444 Full..."

- id: view_output_tmds_format
  label: View output TMDS format
  kind: query
  command: "E VTPO }"

# --- Output color bit depth ---
- id: set_output_color_bit_depth
  label: Set output color bit depth
  kind: action
  command: "E V X( BITD }"
  params:
    - name: bit_depth
      type: integer
      description: "1=Auto (default), 2=Force 8-bit"

- id: view_output_color_bit_depth
  label: View output color bit depth
  kind: query
  command: "E V BITD }"

# --- Output 5V mode ---
- id: set_output_5v_mode
  label: Set output 5V mode
  kind: action
  command: "E M X1$ HPLG }"
  params:
    - name: mode
      type: integer
      description: "1=Auto, 2=Always enabled (default)"

- id: view_output_5v_mode
  label: View output 5V mode
  kind: query
  command: "E MHPLG }"

# --- HDCP notification ---
- id: set_hdcp_notification
  label: Set HDCP notification
  kind: action
  command: "E N X# HDCP }"
  params:
    - name: enabled
      type: integer
      description: "0=off, 1=on"

- id: view_hdcp_notification
  label: View HDCP notification status
  kind: query
  command: "E NHDCP }"

# --- EDID ---
- id: import_edid_to_input
  label: Import EDID file to input slot
  kind: action
  command: "E I X^,<filename\\>.EDID }"
  params:
    - name: slot
      type: integer
      description: EDID lookup table slot
    - name: filename
      type: string
      description: 128 or 256-byte binary EDID file

- id: export_edid_to_pc
  label: Export EDID file from lookup table
  kind: action
  command: "E E X^,<filename\\>.EDID }"
  params:
    - name: slot
      type: integer
      description: EDID lookup table slot
    - name: filename
      type: string
      description: Destination file

- id: view_input_edid_hex
  label: View input EDID in HEX
  kind: query
  command: "E R X! EDID }"
  params:
    - name: input
      type: integer
      description: Input number 1-3

- id: view_input_edid_native_rate
  label: View input EDID native rate
  kind: query
  command: "E N X! EDID }"
  params:
    - name: input
      type: integer
      description: Input number 1-3

# --- USB signal status ---
- id: view_usb_input_status
  label: View USB input host status
  kind: query
  command: "E I USBC }"
  # X# values: host1, host2, USB-C input

- id: view_usb_output_status
  label: View USB output device status
  kind: query
  command: "E O USBC }"
  # X# values: port1..port5

# --- DisplayPort Alt Mode ---
- id: set_dp_alt_mode
  label: Set USB-C DP Alt Mode
  kind: action
  command: "E F3* X2@ USBC }"
  params:
    - name: mode
      type: integer
      description: "1=USB 3.x + 2.0 + 4K/30 (default), 2=2.0 + 4K/60"

- id: view_dp_alt_mode
  label: View DP Alt Mode
  kind: query
  command: "E F3 USBC }"

# --- USB device ports ---
- id: set_usb_device_port
  label: Enable/disable USB device port
  kind: action
  command: "E X X2# * X# USBC }"
  params:
    - name: port
      type: integer
      description: Device port 0-5
    - name: state
      type: integer
      description: "0=off, 1=on"

- id: set_all_usb_device_ports
  label: Enable/disable all USB device ports
  kind: action
  command: "E X X# USBC }"
  params:
    - name: state
      type: integer
      description: "0=off, 1=on"

- id: view_usb_device_ports
  label: View all USB device port status
  kind: query
  command: "E X USBC }"

# --- IP configuration ---
- id: set_dhcp_mode
  label: Set DHCP mode
  kind: action
  command: "E X# DH }"
  params:
    - name: enabled
      type: integer
      description: "0=off (default), 1=on"

- id: view_dhcp_mode
  label: View DHCP mode
  kind: query
  command: "E DH }"

- id: set_ip_address
  label: Set unit IP address
  kind: action
  command: "E X3) CI }"
  params:
    - name: ip
      type: string
      description: "Format nnn.nnn.nnn.nnn (default 192.168.254.254)"

- id: view_ip_address
  label: View IP address
  kind: query
  command: "E CI }"

- id: set_subnet_mask
  label: Set subnet mask
  kind: action
  command: "E X3! CS }"
  params:
    - name: mask
      type: string
      description: "Format nnn.nnn.nnn.nnn"

- id: view_subnet_mask
  label: View subnet mask
  kind: query
  command: "E CS }"

- id: set_gateway_address
  label: Set gateway address
  kind: action
  command: "E X3@ CS }"
  params:
    - name: gateway
      type: string
      description: "Format nnn.nnn.nnn.nnn (default 0.0.0.0)"

- id: view_gateway_address
  label: View gateway address
  kind: query
  command: "E CS }"

- id: set_dns_server
  label: Set DNS server IP
  kind: action
  command: "E X3# DI }"
  params:
    - name: dns
      type: string
      description: "Format nnn.nnn.nnn.nnn (default 127.0.0.1)"

- id: view_dns_server
  label: View DNS server IP
  kind: query
  command: "E DI }"

- id: set_date_time
  label: Set local date and time
  kind: action
  command: "E X3^ CT }"
  params:
    - name: datetime
      type: string
      description: "Format MM/DD/YY-HH:MM:SS (e.g. 08/17/21-13:51:30)"

- id: view_date_time
  label: View local date and time
  kind: query
  command: "E CT }"
  # Response format: Www, DD•Mmm•YYYY•HH:MM:SS (e.g. Fri, 21 Jun 2002 10:54:00)

- id: get_connection_listing
  label: Get number of connections
  kind: query
  command: "E CC }"
  # Verbose 2/3: Icc{Number of connections}]

- id: view_mac_address
  label: View MAC address
  kind: query
  command: "E CH }"
  # Format: 00-05-A6-XX-XX-XX

# --- CISG (combined IP/subnet/gateway) ---
- id: set_cisg_ip
  label: CISG set IP + subnet prefix
  kind: action
  command: "E X3&*X3)*X3% CISG }"
  params:
    - name: nic
      type: integer
      description: Network interface card number 1-3 (or returns E13)
    - name: ip
      type: string
      description: nnn.nnn.nnn.nnn
    - name: prefix
      type: integer
      description: Subnet prefix bits (e.g. /24)

- id: set_cisg_ip_subnet
  label: CISG set IP + subnet prefix + gateway
  kind: action
  command: "E X3&*X3)*X3%*X3) CISG }"
  params:
    - name: nic
      type: integer
      description: NIC 1-3
    - name: ip
      type: string
      description: nnn.nnn.nnn.nnn
    - name: prefix
      type: integer
      description: Subnet prefix bits
    - name: gateway
      type: string
      description: nnn.nnn.nnn.nnn

- id: view_cisg_ip_subnet_gateway
  label: CISG view IP/subnet/gateway
  kind: query
  command: "E X3& CISG }"

# --- System ---
- id: set_front_panel_lock
  label: Set front panel lock (executive mode)
  kind: action
  command: "X2! X"
  params:
    - name: state
      type: integer
      description: 0=unlock (default), 1=lock

- id: view_front_panel_lock
  label: View front panel lock status
  kind: query
  command: "X"

- id: set_power_save_mode
  label: Set power save mode
  kind: action
  command: "E X# PSAV }"
  params:
    - name: enabled
      type: integer
      description: "0=off, 1=on"

- id: view_power_save_mode
  label: View power save mode
  kind: query
  command: "E PSAV }"

- id: set_verbose_mode
  label: Set verbose mode
  kind: action
  command: "E X1) CV }"
  params:
    - name: mode
      type: integer
      description: "0=off, 1=verbose, 2=verbose+tagged, 3=..."

- id: view_verbose_mode
  label: View verbose mode
  kind: query
  command: "E CV }"

- id: set_unit_name
  label: Set unit name
  kind: action
  command: "E X1! CN }"

- id: reset_unit_name_default
  label: Reset unit name to default
  kind: action
  command: "E• CN }"

# --- Port mapping ---
- id: set_web_port
  label: Set web port
  kind: action
  command: "E W{port number} PMAP }"
  params:
    - name: port
      type: integer
      description: Web port number (default 80)

- id: reset_web_port
  label: Reset web port to default 80
  kind: action
  command: "E W80 PMAP }"

- id: disable_web_port
  label: Disable web port
  kind: action
  command: "E W0 PMAP }"

- id: view_web_port
  label: View web port
  kind: query
  command: "E W PMAP }"

- id: set_telnet_port
  label: Set Telnet port
  kind: action
  command: "E Z{port number} PMAP }"
  params:
    - name: port
      type: integer
      description: Telnet port (23 disabled by default)

- id: reset_telnet_port
  label: Reset Telnet port to 23
  kind: action
  command: "E Z23 PMAP }"

- id: disable_telnet_port
  label: Disable Telnet port
  kind: action
  command: "E Z0 PMAP }"

- id: view_telnet_port
  label: View Telnet port
  kind: query
  command: "E Z PMAP }"

- id: set_ssh_port
  label: Set SIS-over-SSH port per NIC
  kind: action
  command: "E B X3&*{port number} PMAP }"
  params:
    - name: nic
      type: integer
      description: NIC 1-3
    - name: port
      type: integer
      description: Port number (default 22023)

- id: reset_ssh_port
  label: Reset SSH port to default 22023
  kind: action
  command: "E B X3&*22023 PMAP }"

- id: disable_ssh_port
  label: Disable SIS-over-SSH port
  kind: action
  command: "E B X3&*0 PMAP }"

- id: view_ssh_port
  label: View SSH port mapping
  kind: query
  command: "E B PMAP }"

# --- SSH echo ---
- id: enable_ssh_echo
  label: Enable SSH echo (default)
  kind: action
  command: "E 1ECHO }"

- id: disable_ssh_echo
  label: Disable SSH echo
  kind: action
  command: "E 0ECHO }"

- id: view_ssh_echo
  label: View echo setting
  kind: query
  command: "E ECHO }"

# --- Passwords ---
- id: set_admin_password
  label: Set administrator password
  kind: action
  command: "E X2& CA }"
  params:
    - name: password
      type: string
      description: "1-128 chars; human-readable except '|'; not single space; case-sensitive"

- id: view_admin_password
  label: View administrator password
  kind: query
  command: "E CA }"
  # Returns **** if set, blank if cleared

- id: clear_admin_password
  label: Clear administrator password
  kind: action
  command: "E• CA }"

- id: set_user_password
  label: Set user password
  kind: action
  command: "E X2& CA }"
  # Same command string as admin; admin must exist (else E14)

- id: view_user_password
  label: View user password
  kind: query
  command: "E CA }"

- id: clear_user_password
  label: Clear user password
  kind: action
  command: "E• CA }"

# --- Contact/Tally ports ---
- id: view_contact_port
  label: View individual contact port status
  kind: query
  command: "E X2* CNTC }"
  params:
    - name: port
      type: integer
      description: Contact port 1-5
  # X2(: 0=open, 1=closed

- id: view_all_contact_ports
  label: View status of all contact ports
  kind: query
  command: "E CNTC }"

- id: set_tally_port
  label: Set individual tally port state
  kind: action
  command: "E X2* * X2( TALY }"
  params:
    - name: port
      type: integer
      description: Tally port 1-5
    - name: state
      type: integer
      description: "0=open, 1=closed"

- id: set_all_tally_ports
  label: Set all tally ports
  kind: action
  command: "E X2(...X2( TALY }"
  params:
    - name: state
      type: string
      description: 5-value sequence of 0/1

- id: view_tally_port
  label: View individual tally port status
  kind: query
  command: "E X2* TALY }"

- id: view_all_tally_ports
  label: View all tally port status
  kind: query
  command: "E TALY }"

# --- Information ---
- id: query_info
  label: Query selected input, audio format, auto-switch mode
  kind: query
  command: "I"

- id: query_part_number
  label: Query unit part number
  kind: query
  command: "N"
  # Returns 60-1797-01

- id: query_model_name
  label: Query model name
  kind: query
  command: "1I"
  # Returns UCS-303

- id: query_firmware_version
  label: Query firmware version (boot loader)
  kind: query
  command: "Q"

- id: query_firmware_version_with_build
  label: Query full firmware version
  kind: query
  command: "*Q"

- id: query_detailed_firmware
  label: Query detailed firmware versions
  kind: query
  command: "0Q"

# --- Resets ---
- id: reset_factory_defaults
  label: Reset to factory defaults
  kind: action
  command: "E ZXXX }"

- id: reset_all_ip_settings
  label: Reset all IP settings only
  kind: action
  command: "E 1ZQQQ }"

- id: reset_all_except_ip
  label: Reset all settings except IP
  kind: action
  command: "E ZY }"

- id: absolute_system_reset
  label: Absolute system reset
  kind: action
  command: "E ZQQQ }"

# --- CEC enable/disable ---
- id: set_cec_mode
  label: Set output CEC mode
  kind: action
  command: "E O1* X4) CCEC }"
  params:
    - name: output
      type: integer
      description: Output 1
    - name: mode
      type: integer
      description: "0=disable (default), 2=unidirectional, 4=bidirectional (recommended)"

- id: view_cec_status
  label: View output CEC status
  kind: query
  command: "E O1CCEC }"
  # X4! = status, X4@ = source logical addr, X4# = destination logical addr

# --- CEC send ---
- id: send_cec_command
  label: Send CEC command to output (specific destination)
  kind: action
  command: "E O1* X4$ DCEC }"
  params:
    - name: output
      type: integer
      description: Output 1
    - name: command
      type: string
      description: '"PwrOn", "PwrOff", or "ShowMe" (or raw address+data)'

- id: send_cec_command_broadcast
  label: Send CEC command to output (broadcast to all)
  kind: action
  command: "E O1*15* X4$ DCEC }"
  params:
    - name: output
      type: integer
      description: Output 1
    - name: command
      type: string
      description: Predefined string or raw data X4*

- id: rediscover_cec_device
  label: Rediscover CEC device on output
  kind: action
  command: "E O1QCEC }"
  params:
    - name: output
      type: integer
      description: Output 1

- id: report_cec_physical_address
  label: Report CEC physical address of output
  kind: query
  command: "E O1PCEC }"
  params:
    - name: output
      type: integer
      description: Output 1
  # Returns %xx%xx, e.g. %10%00 = 1000
```

## Feedbacks
```yaml
# All feedbacks are unsolicited (broadcast) responses. Format terminator is CR/LF.
- id: sig_status_change
  type: object
  description: "Broadcast when signal status changes on any input or output"
  template: "Sig X#•X#•X# * X#"
  values:
    - "X#=0 (off/not detected), 1 (on/detected)"

- id: hdcp_input_status_change
  type: object
  description: "Broadcast when HDCP status changes on any input"
  template: "Hdcpl X1@•X1@•X1@"
  values:
    - "X1@=0 (no source), 1 (HDCP), 2 (non-HDCP)"

- id: hdcp_output_status_change
  type: object
  description: "Broadcast when HDCP status changes on the output"
  template: "HdcpO X1#"
  values:
    - "X1#=0, 1"

- id: input_change
  type: object
  description: "Broadcast when input selection changes via front panel or auto-switch"
  template: "In X!• All"

- id: poweron_banner
  type: string
  description: "Sent on power-on"
  template: "© Copyright 20nn, Extron Electronics, UCS 303, Vx.xx, 60-1797-01"
```

## Variables
```yaml
# Settable numeric/string parameters that are not discrete named actions.
# Each maps to a command above and is described there; listed here as
# referenced parameter domains.

- id: auto_switch_mode
  type: integer
  values: [0, 1, 2]
  description: "0=disabled, 1=user-priority, 2=input-memory-priority"
- id: auto_switch_timeout
  type: integer
  range: [0, 500]
  unit: seconds
  description: "Mode 2 timeout in 1-second increments; default 3"
- id: cec_mode
  type: integer
  values: [0, 2, 4]
  description: "0=disabled, 2=unidirectional, 4=bidirectional"
- id: mute_state
  type: integer
  values: [0, 1, 2]
  description: "0=off, 1=on, 2=video+sync mute"
- id: hdcp_authorized
  type: integer
  values: [0, 1]
  description: "0=off, 1=on"
- id: output_hdcp_mode
  type: integer
  values: [1, 2]
  description: "1=encrypt as required (default), 2=always encrypt"
- id: output_color_bit_depth
  type: integer
  values: [1, 2]
  description: "1=auto (default), 2=force 8-bit"
- id: output_5v_mode
  type: integer
  values: [1, 2]
  description: "1=auto, 2=always enabled (default)"
- id: dp_alt_mode
  type: integer
  values: [1, 2]
  description: "1=USB 3.x+2.0+4K/30 (default), 2=2.0+4K/60"
- id: dhcp_enabled
  type: integer
  values: [0, 1]
  description: "0=off (default), 1=on"
- id: front_panel_lock
  type: integer
  values: [0, 1]
  description: "0=unlock (default), 1=lock"
- id: power_save_mode
  type: integer
  values: [0, 1]
  description: "0=off, 1=on"
- id: verbose_mode
  type: integer
  values: [0, 1, 2, 3]
  description: "0=off, 1=verbose, 2=verbose+tagged, 3=..."
- id: contact_tally_port
  type: integer
  range: [1, 5]
  description: "Contact/Tally port number 1-5"
- id: contact_tally_state
  type: integer
  values: [0, 1]
  description: "0=open, 1=closed"
- id: usb_device_port
  type: integer
  range: [0, 5]
  description: "USB device port 0-5"
- id: input_number
  type: integer
  range: [0, 3]
  description: "Input number 0-3 (0=break tie in auto-switch)"
```

## Events
```yaml
# Unsolicited notifications sent by the device.
- id: sig_status_change
  payload: "Sig X#•X#•X# * X#"
  trigger: "Signal status changes on any input or the output"
- id: hdcp_input_change
  payload: "Hdcpl X1@•X1@•X1@"
  trigger: "HDCP status changes on any input"
- id: hdcp_output_change
  payload: "HdcpO X1#"
  trigger: "HDCP status changes on the output"
- id: input_selection_change
  payload: "In X!• All"
  trigger: "Input selection changes via front panel or auto-switch"
- id: boot_banner
  payload: "© Copyright 20nn, Extron Electronics, UCS 303, Vx.xx, 60-1797-01"
  trigger: "Device power-on"
- id: cec_received_async
  payload: "Ceci|X!|*|X4(X4^|*|X4%] (or Ceco0*/Ceco1* in bidirectional mode 4)"
  trigger: "Asynchronous CEC message received in bidirectional mode (4)"
```

## Macros
```yaml
# Multi-step sequences explicitly documented in the source.
- id: enable_telnet
  label: Enable Telnet on port 23
  steps:
    - "SSH-connect to port 22023"
    - "Send: E Z23PMAP }"

- id: disable_telnet
  label: Disable Telnet (force SSH only)
  steps:
    - "SSH-connect to port 22023 (or Telnet to 23 if still mapped)"
    - "Send: E Z0PMAP }"
```

## Safety
```yaml
confirmation_required_for:
  - absolute_system_reset  # ZQQQ - reverts passwords to "extron"
  - reset_factory_defaults  # ZXXX
interlocks: []
# UNRESOLVED: source mentions CAUTION (risk of minor personal injury) and
# property-damage warnings for power/USB wiring, but does not document
# machine-protocol interlock procedures.
```

## Notes
- Default credentials: user `admin`, password = unit serial number (factory) or `extron` (after absolute reset). Passwords are case-sensitive.
- SSH is the secure transport; Telnet is disabled by default and must be remapped to port 23 to enable. The Telnet port-map command is `E Z{port} PMAP }`.
- Front panel USB-C CONFIG port provides IP-over-USB SIS access at `203.0.113.22:22023` (SSH).
- RS-232 display port is bidirectional Tx/Rx; baud rate configurable 300-115200, default 9600. Parity, data bits, stop bits configurable via PCS (Product Configuration Software) — not via SIS commands.
- Front panel executive mode (lock) is retained across power cycles; any reset mode unlocks the unit.
- Error codes returned by the switcher: E06 (invalid channel change in auto-switch), E10 (invalid command), E13 (invalid parameter), E14 (operation not permitted, e.g. user password without admin), E28 (bad filename/file not found).
- CEC logical addresses 0-15 follow standard HDMI-CEC; UCS 303 acts as initiator with pseudo address; bidirectional mode (4) publishes received messages; unidirectional mode (2) breaks CEC connection input to output.
- EDID files are 128 or 256 bytes binary; lookup table slot number is required for import/export.
<!-- UNRESOLVED: full device specifications (voltage, current, weight) not in protocol-relevant section; complete verbose-mode tier semantics (0/1/2/3 detail) not fully reproduced; firmware compatibility range not stated. -->
```


```json
{
  "markdown": "<the markdown above>",
}

## Provenance

```yaml
source_domains:
  - media.extron.com
  - manuals.plus
  - manua.ls
  - manuals.co.uk
  - support.displaymanager.net
source_urls:
  - https://media.extron.com/public/download/files/userman/68-3538-01_C_UCS_303_User_Guide.pdf
  - https://manuals.plus/extron/ucs-303-collaboration-switcher-manual.pdf
  - https://www.manua.ls/extron/ucs-303/manual
  - https://www.manuals.co.uk/extron/ucs-303/manual
  - https://support.displaymanager.net/hc/en-gb/articles/22750870424733-Troubleshooting-Guide-for-Extron-Control-Systems
retrieved_at: 2026-06-14T06:42:49.534Z
last_checked_at: 2026-06-14T16:14:03.927Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T16:14:03.927Z
matched_actions: 109
action_count: 109
confidence: medium
summary: "All 109 spec actions confirmed verbatim in the source command tables; 2 minor source commands (view-unit-name and CISG IP-only variant) not in spec but coverage ratio 109/111=0.98 exceeds 0.9 threshold. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "E CN } (view unit name)"
- "E X3&*X3) CISG } (set IP address only, no subnet prefix)"
- "firmware version compatibility not stated in source; contact-closure and tally hardware-only behavior is documented but not part of the SIS command surface."
- "source mentions CAUTION (risk of minor personal injury) and"
- "full device specifications (voltage, current, weight) not in protocol-relevant section; complete verbose-mode tier semantics (0/1/2/3 detail) not fully reproduced; firmware compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
