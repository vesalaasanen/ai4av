---
spec_id: admin/extron-ipl-t-cr48
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron IPL T CR48 Control Spec"
manufacturer: Extron
model_family: "IPL T CR48"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "IPL T CR48"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - manua.ls
  - manualshelf.com
  - manualmachine.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-738-05_D_IPL_T_CR48_UG.pdf
  - https://www.extron.com/download/files/catalog/ipltcr48_09en-cat.pdf
  - https://www.manua.ls/extron/ipl-t-cr48/manual
  - https://www.manualshelf.com/manual/extron-electronic/ipl-t-cr48/user-guide-english.html
  - https://manualmachine.com/extronelectronic/ipltcr48/1351142-user-manual/
retrieved_at: 2026-07-25T14:03:20.506Z
last_checked_at: 2026-08-05T08:20:42.242Z
generated_at: 2026-08-05T08:20:42.242Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source provides a comprehensive SIS command reference but does not list per-port (1-99) enumerated action variants beyond the parameterized template; spec keeps the parameterization. Firmware version not stated."
  - "not stated; no serial/RS-232 port on this device"
  - "source describes event scripting framework (start/stop events, event memory read/write, event buffers 0=receive/1=user-absolute/2=user-relative/3=NVRAM) but does not document a fixed unsolicited notification schema. Event actions above are pull-based via SIS queries, not push notifications over Telnet/HTTP."
  - "source references event scripts that can be authored and stored on-device but does not document a fixed macro catalogue."
  - "firmware version compatibility ranges not stated. Per-port (1-99) parameterized via X! in command templates — source does not enumerate each as a separate row."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:20:42.242Z
  matched_actions: 77
  action_count: 77
  confidence: medium
  summary: "All 77 spec actions map one-to-one to SIS commands in the source's Command and Response Table, with verbatim opcode tokens and shapes; transport parameters match source verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Extron IPL T CR48 Control Spec

## Summary
Extron IPL T CR48 IP Link Ethernet control interface. Exposes four contact-closure inputs and eight relay outputs controllable via SIS (Simple Instruction Set) commands over Telnet (TCP port 23) or URL-encoded web browser commands (HTTP port 80). Also supports ARP/ICMP/Ping/DHCP/SMTP for network management. Passwords default to device serial number, or no password after a full reset.

<!-- UNRESOLVED: source provides a comprehensive SIS command reference but does not list per-port (1-99) enumerated action variants beyond the parameterized template; spec keeps the parameterization. Firmware version not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 23  # Telnet default; remappable via SIS (MT) and must be >= 1024 when remapped
  base_url: "http://{ip}/"  # Web browser commands use {base_url}?cmd= with URL-encoded SIS
auth:
  type: password  # Telnet/Web prompt "Password:"; factory default = device serial number, or no password after full reset
serial:
  baud_rate: null  # UNRESOLVED: not stated; no serial/RS-232 port on this device
  data_bits: null
  parity: null
  stop_bits: null
  flow_control: null
```

## Traits
```yaml
- powerable       # inferred from reset / power-on sequencing
- routable        # inferred from input contact-closure and relay routing commands
- queryable       # inferred from numerous ?/Q/I style status queries
- levelable       # pulse-time parameter on relay control
```

## Actions
```yaml
# Relay functions (port = X!, 01-99; pulse time X6# in 20 ms/count)
- id: pulse_relay
  label: Pulse Relay
  kind: action
  command: "X! *3* X6# O"
  params:
    - name: port
      type: integer
      description: Specific port number (01-99)
    - name: pulse_time
      type: integer
      description: Pulse time in 20 ms per count

- id: toggle_relay
  label: Toggle Relay
  kind: action
  command: "X! *2O"
  params:
    - name: port
      type: integer
      description: Specific port number (01-99)

- id: relay_on
  label: Turn Relay ON
  kind: action
  command: "X! *1O"
  params:
    - name: port
      type: integer
      description: Specific port number (01-99)

- id: relay_off
  label: Turn Relay OFF
  kind: action
  command: "X! *0O"
  params:
    - name: port
      type: integer
      description: Specific port number (01-99)

- id: view_relay_status
  label: View Relay Status
  kind: query
  command: "X! O"
  params:
    - name: port
      type: integer
      description: Specific port number (01-99)

# Input contact closure
- id: view_input_state
  label: View Input Contact Closure State
  kind: query
  command: "X! }"
  params:
    - name: port
      type: integer
      description: Specific port number (01-99)

# Firmware / system info queries
- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "Q"

- id: query_verbose_version_info
  label: Query Verbose Version Information
  kind: query
  command: "0Q"

- id: query_firmware_version_alt
  label: Query Firmware Version (1Q)
  kind: query
  command: "1Q"

- id: query_bootstrap_version
  label: Query Bootstrap Version
  kind: query
  command: "2Q"

- id: query_factory_firmware_version
  label: Query Factory Firmware Version
  kind: query
  command: "3Q"

- id: query_updated_firmware_version
  label: Query Updated Firmware Version
  kind: query
  command: "4Q"

- id: request_part_number
  label: Request Part Number
  kind: query
  command: "N"

- id: request_model_number
  label: Request Model Number
  kind: query
  command: "1I"

- id: request_model_description
  label: Request Model Description
  kind: query
  command: "2I"

- id: request_system_memory_usage
  label: Request System Memory Usage
  kind: query
  command: "3I"

- id: request_user_memory_usage
  label: Request User Memory Usage
  kind: query
  command: "4I"

# IP setup
- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "E X1@ CN }"  # Telnet; web: W [X1@] CN [|
  params:
    - name: name
      type: string
      description: Up to 24 chars; alphabet/digits/hyphen; no spaces

- id: set_unit_name_default
  label: Set Unit Name to Factory Default
  kind: action
  command: "E • CN }"  # Telnet; web: W %20 CN [|

- id: read_unit_name
  label: Read Unit Name
  kind: query
  command: "E CN }"  # Telnet; web: W CN [|

- id: set_time_date
  label: Set Time and Date
  kind: action
  command: "E X1# CT }"  # Telnet; web: W [X1#] CT [|
  params:
    - name: datetime
      type: string
      description: "Format MM/DD/Y-HH:MM:SS"

- id: read_time_date
  label: Read Time and Date
  kind: query
  command: "E CT }"  # Telnet; web: CT [|

- id: set_gmt_offset
  label: Set GMT Offset
  kind: action
  command: "E X# CZ }"  # Telnet; web: W [X#] CZ [|
  params:
    - name: offset
      type: number
      description: "-12.0 to +14.0"

- id: read_gmt_offset
  label: Read GMT Offset
  kind: query
  command: "E CZ }"  # Telnet; web: W CZ [|

- id: set_daylight_saving
  label: Set Daylight Saving Time
  kind: action
  command: "E X3$ CX }"  # Telnet; web: W [X3$] CX [|
  params:
    - name: dst
      type: integer
      description: "0 = off, 1 = on (USA), 2 = on (Europe), 3 = on (Brazil)"

- id: read_daylight_saving
  label: Read Daylight Saving Time
  kind: query
  command: "E CX }"  # Telnet; web: W CX [|

- id: set_dhcp_on
  label: Set DHCP On
  kind: action
  command: "E 1DH }"  # Telnet; web: W 1DH [|

- id: set_dhcp_off
  label: Set DHCP Off
  kind: action
  command: "E 0DH }"  # Telnet; web: W 0DH [|

- id: view_dhcp_mode
  label: View DHCP Mode
  kind: query
  command: "E DH }"  # Telnet; web: W DH [|

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "E X1$ CI }"  # Telnet; web: W [X1$] CI [|
  params:
    - name: ip
      type: string
      description: IP address

- id: read_ip_address
  label: Read IP Address
  kind: query
  command: "E CI }"  # Telnet; web: W CI [|

- id: read_mac_address
  label: Read Hardware (MAC) Address
  kind: query
  command: "E CH }"  # Telnet; web: W CH [|

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "E X1( CS }"  # Telnet; web: W [X1(] CS [|
  params:
    - name: mask
      type: string
      description: Subnet mask

- id: read_subnet_mask
  label: Read Subnet Mask
  kind: query
  command: "E CS }"  # Telnet; web: W CS [|

- id: set_gateway
  label: Set Gateway IP Address
  kind: action
  command: "E X1$ CG }"  # Telnet; web: W [X1$] CG [|
  params:
    - name: ip
      type: string
      description: IP address

- id: read_gateway
  label: Read Gateway IP Address
  kind: query
  command: "E CG }"  # Telnet; web: W CG [|

# Password / verbose / connection
- id: set_admin_password
  label: Set Administrator Password
  kind: action
  command: "E X3# CA }"  # Telnet; web: W [X3#] CA [|
  params:
    - name: password
      type: string
      description: Max 12 chars, no special chars

- id: clear_admin_password
  label: Clear Administrator Password
  kind: action
  command: "E • CA }"  # Telnet; web: W %20 CA [|

- id: read_admin_password
  label: Read Administrator Password
  kind: query
  command: "E CA }"  # Telnet; web: W CA [|

- id: set_user_password
  label: Set User Password
  kind: action
  command: "E X3# CU }"  # Telnet; web: W [X3#] CU [|
  params:
    - name: password
      type: string
      description: Max 12 chars, no special chars

- id: clear_user_password
  label: Clear User Password
  kind: action
  command: "E • CU }"  # Telnet; web: W %20 CU [|

- id: read_user_password
  label: Read User Password
  kind: query
  command: "E CU }"  # Telnet; web: W CU [|

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E X2@ CV }"  # Telnet; web: W [X2@] CV [|
  params:
    - name: mode
      type: integer
      description: "0 = clear (default Telnet), 1 = verbose, 2 = tagged responses for queries, 3 = verbose + tagged"

- id: read_verbose_mode
  label: Read Verbose Mode
  kind: query
  command: "E CV }"  # Telnet; web: W CV [|

- id: read_connection_security_level
  label: Read Connection Security Level
  kind: query
  command: "E CK }"  # Telnet; web: W CK [|

- id: configure_broadcast_mode
  label: Configure Broadcast Mode
  kind: action
  command: "E X6$ EB }"  # Telnet; web: W [X6$] EB [|
  params:
    - name: rate
      type: integer
      description: "Broadcast repetition rate in seconds 0-255 (0 = disable)"

- id: view_broadcast_mode
  label: View Broadcast Mode
  kind: query
  command: "E EB }"  # Telnet; web: W EB [|

- id: get_connection_count
  label: Get Connection Count
  kind: query
  command: "E CC }"  # Telnet; web: W CC [|

# File commands (port 80 / Telnet)
- id: load_file_blink_http
  label: Load File to User Blink Memory (HTTP)
  kind: action
  command: "POST {base_url}?cmd=<delimited data>"
  notes: HTTP POST on port 80 with delimited data for blink file memory.

- id: retrieve_file_blink_http
  label: Retrieve File from User Blink Memory (HTTP)
  kind: query
  command: "GET {base_url}mypage.html?cmd=WSF |"
  notes: "Response is raw file data. URL form per source example: http://192.168.254.254/mypage.html?cmd=WSF |"

- id: load_file_blink_telnet
  label: Load File to User Blink Memory (Telnet)
  kind: action
  command: "EWF{delimiter}X4*{delimiter}"
  notes: "Web equivalent: WEWF%7B...%7D..."

- id: retrieve_file_blink_telnet
  label: Retrieve File from User Blink Memory (Telnet)
  kind: query
  command: "ERF{X4*}"
  notes: Web equivalent: WERF...

# Port re-map
- id: set_telnet_port
  label: Set Telnet Port Map
  kind: action
  command: "E port# MT }"  # Telnet; web: W port# MT [|
  params:
    - name: port
      type: integer
      description: "Telnet port; remapped value must be >= 1024; 0 disables; 23 resets to default"

- id: reset_telnet_port
  label: Reset Telnet Port Map
  kind: action
  command: "E 23MT }"  # Telnet; web: W 23MT [|

- id: disable_telnet_port
  label: Disable Telnet Port Map
  kind: action
  command: "E 0MT }"  # Telnet; web: W 0MT [|

- id: read_telnet_port
  label: Read Telnet Port Map
  kind: query
  command: "E MT }"  # Telnet; web: W MT [|

- id: set_web_port
  label: Set Web Port Map
  kind: action
  command: "E port# MH }"  # Telnet; web: W port# MH [|
  params:
    - name: port
      type: integer
      description: "Web port; remapped value must be >= 1024; 0 disables; 80 resets to default"

- id: reset_web_port
  label: Reset Web Port Map
  kind: action
  command: "E 80MH }"  # Telnet; web: W 80MH [|

- id: disable_web_port
  label: Disable Web Port Map
  kind: action
  command: "E 0MH }"  # Telnet; web: W 0MH [|

- id: read_web_port
  label: Read Web Port Map
  kind: query
  command: "E MH }"  # Telnet; web: W MH [|

# Web browser specific
- id: read_url_response
  label: Read Response from Last URL Cmd
  kind: query
  command: "E UB }"  # Telnet; web: W UB [|

# Email
- id: configure_email_events
  label: Configure E-mail Events
  kind: action
  command: "E X4%,X4^,X4& CR }"  # Telnet; web: W [X4%] %2C [X4^] %2C [X4&] CR [|
  params:
    - name: recipient_no
      type: integer
      description: "X4% - E-mail recipient number 1-64"
    - name: recipient_addr
      type: string
      description: "X4^ - E-mail address, max 31 chars"
    - name: filename
      type: string
      description: "X4& - Name of e-mail file to be sent"

- id: read_email_events
  label: Read E-mail Events
  kind: query
  command: "E X4% CR }"  # Telnet; web: W [X4%] CR [|
  params:
    - name: recipient_no
      type: integer
      description: "X4% - E-mail recipient number 1-64"

- id: send_email
  label: Send E-mail (Event)
  kind: action
  command: "E X4% SM }"  # Telnet; web: W [X4%] SM [|
  params:
    - name: recipient_no
      type: integer
      description: "X4% - E-mail recipient number 1-64"

- id: set_mail_server
  label: Set Mail Server IP / Domain Name
  kind: action
  command: "E X1$,X1% CM }"  # Telnet; web: W [X1$] %2C [X1%] CM [|
  params:
    - name: ip
      type: string
      description: X1$ - Mail server IP
    - name: domain
      type: string
      description: X1% - Mail domain name

- id: read_mail_server
  label: Read Mail Server IP / Domain Name
  kind: query
  command: "E CM }"  # Telnet; web: W CM [|

# Event control
- id: read_event_buffer_memory
  label: Read Event Buffer Memory
  kind: query
  command: "E X3%,X3^,X3&,X3* E }"  # Telnet; web: W [X3%] %2C [X3^] %2C [X3&] %2C [X3*] E [|
  params:
    - name: event_no
      type: integer
      description: "X3% - Event number 0-99"
    - name: buffer
      type: integer
      description: "X3^ - 0=receive, 1=user (absolute), 2=user (relative), 3=NVRAM"
    - name: offset
      type: integer
      description: "X3& - Event buffer offset 0-MaxBufferSize"
    - name: data_size
      type: string
      description: "X3* - bit, Byte, Short, Long (first letter only)"

- id: write_event_memory
  label: Write Event Memory
  kind: action
  command: "E X3%,X3^,X3&,X3(,X3* E }"  # Telnet; web: W [X3%] %2C [X3^] %2C [X3&] %2C [X3(] %2C [X3*] E [|
  params:
    - name: event_no
      type: integer
      description: "X3% - Event number 0-99"
    - name: buffer
      type: integer
      description: "X3^ - 0=receive, 1=user (absolute), 2=user (relative), 3=NVRAM"
    - name: offset
      type: integer
      description: "X3& - Event buffer offset 0-MaxBufferSize"
    - name: data
      type: string
      description: "X3( - Event data to write"
    - name: data_size
      type: string
      description: "X3* - bit, Byte, Short, Long (first letter only)"

- id: read_string_event_memory
  label: Read String from Event Memory
  kind: query
  command: "E X3%,X3^,X3&,X4$ FE }"  # Telnet; web: W [X3%] %2C [X3^] %2C [X3&] %2C [X4$] FE [|
  params:
    - name: event_no
      type: integer
      description: "X3% - Event number 0-99"
    - name: buffer
      type: integer
      description: "X3^ - 0=receive, 1=user (absolute), 2=user (relative), 3=NVRAM"
    - name: offset
      type: integer
      description: "X3& - Event buffer offset 0-MaxBufferSize"
    - name: num_bytes
      type: integer
      description: "X4$ - Number of bytes to read"

- id: write_string_event_memory
  label: Write String to Event Memory
  kind: action
  command: "E string*X3%,X3^,X3& FE }"  # Telnet; web: W string %2A [X3%] %2C [X3^] %2C [X3&] FE [|
  params:
    - name: string
      type: string
      description: Text to write
    - name: event_no
      type: integer
      description: "X3% - Event number 0-99"
    - name: buffer
      type: integer
      description: "X3^ - 0=receive, 1=user (absolute), 2=user (relative), 3=NVRAM"
    - name: offset
      type: integer
      description: "X3& - Event buffer offset 0-MaxBufferSize"

- id: start_events
  label: Start Events
  kind: action
  command: "E 1AE }"  # Telnet; web: W 1AE [|

- id: stop_events
  label: Stop Events
  kind: action
  command: "E 0AE }"  # Telnet; web: W 0AE [|

- id: read_events_running
  label: Read Number of Events Running
  kind: query
  command: "E AE }"  # Telnet; web: W AE [|

# Reset
- id: erase_file
  label: Erase User-Supplied Web Page or File
  kind: action
  command: "E filename EF }"  # Telnet; web: W filename EF [|
  params:
    - name: filename
      type: string
      description: Name of file to erase

- id: erase_blink_memory
  label: Erase Blink Memory
  kind: action
  command: "E ZFFF }"  # Telnet; web: W ZFFF [|

- id: reset_all_settings_factory
  label: Reset All Device Settings to Factory
  kind: action
  command: "E ZXXX }"  # Telnet; web: W ZXXX [|

- id: reset_retain_ip
  label: Absolute System Reset, Retain IP
  kind: action
  command: "E ZY }"  # Telnet; web: W ZY [|
  notes: Equivalent to ZQQQ except retains IP address, subnet mask, gateway, DHCP, and port mappings.
```

## Feedbacks
```yaml
- id: relay_state
  type: enum
  values: [on, off]
  description: Per-port relay state from `X! O`; X% = 0 (off) or 1 (on).

- id: input_state
  type: integer
  description: 12-bit A/D value 0-4095 from contact closure input (`X! }`); 0 = open, 1 = closed (via threshold), full range = 4095.

- id: firmware_version
  type: string
  description: From `Q` / `1Q` / `3Q` / `4Q`; suffix `*` = running, `?` = factory only, `^` = Mode 1 reset, `!` = corrupted.

- id: bootstrap_version
  type: string
  description: From `2Q`.

- id: dhcp_mode
  type: enum
  values: [off, on]
  description: 0 = off, 1 = on (from `E DH }`).

- id: ip_address
  type: string
  description: Current IP address (from `E CI }`).

- id: mac_address
  type: string
  description: Hardware (MAC) address (from `E CH }`).

- id: subnet_mask
  type: string
  description: Current subnet mask (from `E CS }`).

- id: gateway
  type: string
  description: Current gateway IP (from `E CG }`).

- id: connection_security_level
  type: enum
  values: [not_logged_in, user, administrator]
  description: "X5@: 0 = not logged in, 11 = user, 12 = administrator (from `E CK }`)."

- id: verbose_mode
  type: enum
  values: [clear, verbose, tagged_queries, verbose_and_tagged]
  description: "X2@: 0, 1, 2, 3 (from `E CV }`)."

- id: broadcast_mode_rate
  type: integer
  description: "X6$ - broadcast repetition rate in seconds 0-255 (from `E EB }`). 0 = disabled."

- id: connection_count
  type: integer
  description: Number of active connections (from `E CC }`).

- id: gmt_offset
  type: number
  description: "-12.0 to +14.0 (from `E CZ }`)."

- id: daylight_saving
  type: enum
  values: [off, usa, europe, brazil]
  description: "X3$ - 0 = off, 1 = USA, 2 = Europe, 3 = Brazil (from `E CX }`)."

- id: mail_server
  type: object
  description: Mail server IP and domain name (from `E CM }`).

- id: events_running_count
  type: integer
  description: Number of currently running events (from `E AE }`).
```

## Variables
```yaml
# Section omitted - all settable parameters in source are discrete actions.
```

## Events
```yaml
# UNRESOLVED: source describes event scripting framework (start/stop events, event memory read/write, event buffers 0=receive/1=user-absolute/2=user-relative/3=NVRAM) but does not document a fixed unsolicited notification schema. Event actions above are pull-based via SIS queries, not push notifications over Telnet/HTTP.
```

## Macros
```yaml
# UNRESOLVED: source references event scripts that can be authored and stored on-device but does not document a fixed macro catalogue.
```

## Safety
```yaml
confirmation_required_for:
  - reset_all_settings_factory  # E ZXXX / ZQQQ
  - reset_retain_ip  # E ZY
  - erase_blink_memory  # E ZFFF
  - erase_file  # E filename EF
interlocks: []
# Source warning: "Review the reset modes carefully. Using the wrong reset mode may result in unintended loss of blink memory programming, port reassignment, or processor reboot."
# Port mapping rule: remapped Telnet/Web ports other than default (23/80) or disabled (0) must be >= 1024; duplicate assignments return E13.
```

## Notes
- SIS = Extron Simple Instruction Set. Both Telnet (port 23) and URL-encoded web browser (port 80) accept the same command set. Telnet uses `Esc`/`W` as the prefix and CR/`|` as the terminator; web uses only `W` and `|`. Non-alphanumeric chars must be URL-encoded as `%xx` for web.
- Default unit name format: model name + last 3 pairs of MAC address.
- Relay state is volatile — relays default to OPEN (LED off) at power-on.
- Factory password = device serial number; full system reset (Mode 5 or `ZQQQ`) sets password to none.
- Web GET form example from source: `http://192.168.254.254/mypage.html?cmd=WSF |`
- Reset modes: 1 = revert to factory firmware (retain settings); 3 = toggle events; 4 = enable ARP + reset IP/subnet/gateway/ports, DHCP off, events off; 5 = full reset to factory defaults except firmware.
- Error codes: E10 invalid command, E12 invalid port, E13 invalid parameter, E14 invalid for config, E17 timeout, E22 busy, E24 privilege, E25 device not present, E26 max connections, E27 invalid event, E28 file not found, E31 break port pass-through.
- `[24]` prefix = admin-only (E24 privilege violation otherwise); `[27]` = may give E27 invalid event number; `[28]` = may give E28 file not found.

<!-- UNRESOLVED: firmware version compatibility ranges not stated. Per-port (1-99) parameterized via X! in command templates — source does not enumerate each as a separate row. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - manua.ls
  - manualshelf.com
  - manualmachine.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-738-05_D_IPL_T_CR48_UG.pdf
  - https://www.extron.com/download/files/catalog/ipltcr48_09en-cat.pdf
  - https://www.manua.ls/extron/ipl-t-cr48/manual
  - https://www.manualshelf.com/manual/extron-electronic/ipl-t-cr48/user-guide-english.html
  - https://manualmachine.com/extronelectronic/ipltcr48/1351142-user-manual/
retrieved_at: 2026-07-25T14:03:20.506Z
last_checked_at: 2026-08-05T08:20:42.242Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:20:42.242Z
matched_actions: 77
action_count: 77
confidence: medium
summary: "All 77 spec actions map one-to-one to SIS commands in the source's Command and Response Table, with verbatim opcode tokens and shapes; transport parameters match source verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source provides a comprehensive SIS command reference but does not list per-port (1-99) enumerated action variants beyond the parameterized template; spec keeps the parameterization. Firmware version not stated."
- "not stated; no serial/RS-232 port on this device"
- "source describes event scripting framework (start/stop events, event memory read/write, event buffers 0=receive/1=user-absolute/2=user-relative/3=NVRAM) but does not document a fixed unsolicited notification schema. Event actions above are pull-based via SIS queries, not push notifications over Telnet/HTTP."
- "source references event scripts that can be authored and stored on-device but does not document a fixed macro catalogue."
- "firmware version compatibility ranges not stated. Per-port (1-99) parameterized via X! in command templates — source does not enumerate each as a separate row."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
