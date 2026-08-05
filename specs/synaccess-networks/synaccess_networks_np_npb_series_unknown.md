---
spec_id: admin/synaccess_networks_np_npb_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Synaccess Networks NP NPB Series Control Spec"
manufacturer: "Synaccess Networks"
model_family: "NP NPB Series"
aliases: []
compatible_with:
  manufacturers:
    - "Synaccess Networks"
  models:
    - "NP NPB Series"
    - "netBooter PDU Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.synaccess.com
  - synaccess.readme.io
  - synaccess-pdus.readme.io
source_urls:
  - https://cdn.synaccess.com/documents/1094_NPStartup_V20.pdf
  - https://synaccess.readme.io/reference/introduction-1
  - https://synaccess.readme.io/docs/getting-started
  - https://synaccess-pdus.readme.io/reference/http-api
  - https://synaccess-pdus.readme.io/reference/command-line-interface
retrieved_at: 2026-05-18T17:07:29.522Z
last_checked_at: 2026-07-22T01:31:29.418Z
generated_at: 2026-07-22T01:31:29.418Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "NPB-specific model numbers, outlet count, physical form factor not stated in source — manual covers netBooter PDU Series generically"
  - "device IP address, DHCP/static mode, outlet count - not stated in source"
  - "source does not describe unsolicited event notifications"
  - "no explicit multi-step macros described in source"
  - "no safety warnings, interlock procedures, or power sequencing requirements in source"
  - "HTTPS availability only confirmed for DU models; NPB/DU distinction not clarified in source"
  - "number of outlets, group configuration details not stated in source"
  - "login password/auth mechanism not described in source despite login command existing"
  - "$A5 temperature unit confirmed Celsius but no threshold/fault behavior described"
  - "email configuration command for setting recipient address(es) not documented - only `emailsend` test trigger"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:31:29.418Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions matched verbatim in source; source query commands enumerated in feedbacks; transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Synaccess Networks NP NPB Series Control Spec

## Summary
Synaccess Networks NP NPB Series (netBooter PDU) is a networked power distribution unit with individually controllable outlets. Control via RS-232 serial, Telnet (TCP port 23), or HTTP/HTTPS API. Supports outlet state querying, group power operations, and network configuration.

<!-- UNRESOLVED: NPB-specific model numbers, outlet count, physical form factor not stated in source — manual covers netBooter PDU Series generically -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 23  # Telnet default port; configurable via `tp` command
  base_url: "http://<ip>/cmd.cgi"  # HTTP API endpoint; HTTPS only for DU models
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff
auth:
  type: none  # inferred: no auth procedure in source; login command exists but no password requirement described
```

## Traits
```yaml
- powerable       # pset, ps, rb commands control outlet state
- routable        # group power operations (gpset, grb) allow batch control
- queryable       # pshow returns outlet states; $A5 returns status + current + temp
```

## Actions
```yaml
# CLI format: "CmdCode Arg1 Arg2" (space-separated). HTTP format: "/cmd.cgi?cmdCode Arg1 Arg2".
# Default network: static IP 192.168.1.100, mask 255.255.0.0, gateway 192.168.1.1.

# --- Power Outlet Operations ---

- id: pset
  label: Set Outlet State
  kind: action
  command: "pset {outlet} {state}"
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based, right-most = outlet 1 in status response)
    - name: state
      type: integer
      description: 0 = OFF, 1 = ON
  notes: CLI: pset <n> <v>; HTTP: /cmd.cgi?$A3 <n> <v>

- id: ps
  label: Set All Outlets
  kind: action
  command: "ps {state}"
  params:
    - name: state
      type: integer
      description: 0 = OFF, 1 = ON
  notes: CLI: ps <v>; HTTP: /cmd.cgi?$A7 <v>

- id: rb
  label: Reboot Outlet
  kind: action
  command: "rb {outlet}"
  params:
    - name: outlet
      type: integer
      description: Outlet number to reboot
  notes: CLI: rb <n>; HTTP: /cmd.cgi?$A4 <n>

- id: gpset
  label: Set Outlet Group
  kind: action
  command: "gpset {group} {state}"
  params:
    - name: group
      type: integer
      description: Group number
    - name: state
      type: integer
      description: 0 = OFF, 1 = ON
  notes: CLI: gpset <n> <v>

- id: grb
  label: Reboot Outlet Group
  kind: action
  command: "grb {group}"
  params:
    - name: group
      type: integer
      description: Group number to reboot
  notes: CLI: grb <n>

# --- HTTP-only API entrypoints (no CLI equivalent documented) ---

- id: http_set_outlet
  label: HTTP Set Outlet (API $A3)
  kind: action
  command: "/cmd.cgi?$A3 {outlet} {state}"
  params:
    - name: outlet
      type: integer
      description: Outlet number
    - name: state
      type: integer
      description: 0 = OFF, 1 = ON
  notes: HTTP GET only

- id: http_reboot_outlet
  label: HTTP Reboot Outlet (API $A4)
  kind: action
  command: "/cmd.cgi?$A4 {outlet}"
  params:
    - name: outlet
      type: integer
      description: Outlet number
  notes: HTTP GET only

- id: http_set_all_outlets
  label: HTTP Set All Outlets (API $A7)
  kind: action
  command: "/cmd.cgi?$A7 {state}"
  params:
    - name: state
      type: integer
      description: 0 = OFF, 1 = ON
  notes: HTTP GET only

# --- Networking and System Configuration ---

- id: nwset
  label: Reset Network Interface
  kind: action
  command: "nwset"
  params: []
  notes: CLI: nwset

- id: dhcp
  label: Set DHCP Mode
  kind: action
  command: "dhcp {enable}"
  params:
    - name: enable
      type: integer
      description: 1 = DHCP on, 0 = Static IP mode
  notes: CLI: dhcp <x>

- id: ip_set
  label: Set Static IP
  kind: action
  command: "ip {ip} {mask}"
  params:
    - name: ip
      type: string
      description: Static IP address
    - name: mask
      type: string
      description: Subnet mask
  notes: CLI: ip <ip> <mask> (only active in static mode)

- id: gw_set
  label: Set Gateway
  kind: action
  command: "gw {gateway}"
  params:
    - name: gateway
      type: string
      description: Gateway IP address
  notes: CLI: gw <gw> (only active in static mode)

- id: mask_set
  label: Set Subnet Mask
  kind: action
  command: "mask {mask}"
  params:
    - name: mask
      type: string
      description: Subnet mask
  notes: CLI: mask <m>

- id: web_toggle
  label: Toggle Web Access
  kind: action
  command: "web {state}"
  params:
    - name: state
      type: integer
      description: 1 = On, 0 = Off
  notes: CLI: web <v>

- id: http_port_set
  label: Set HTTP Port
  kind: action
  command: "hp {port}"
  params:
    - name: port
      type: integer
      description: HTTP port number
  notes: CLI: hp <port>

- id: telnet_port_set
  label: Set Telnet Port
  kind: action
  command: "tp {port}"
  params:
    - name: port
      type: integer
      description: Telnet port number
  notes: CLI: tp <port>

- id: emailsend
  label: Send Test Email
  kind: action
  command: "emailsend"
  params: []
  notes: CLI: emailsend - sends test mail to configured email address(es)

- id: help
  label: Help Menu
  kind: action
  command: "help"
  params: []
  notes: CLI: help - displays CLI command help menu

- id: login
  label: Login
  kind: action
  command: "login"
  params: []
  notes: CLI: login - no password argument described in source

- id: logout
  label: Logout
  kind: action
  command: "logout"
  params: []
  notes: CLI: logout

- id: ipsrc_set
  label: Set Filtered Source IP
  kind: action
  command: "Ipsrc {ip}"
  params:
    - name: ip
      type: string
      description: Allowed source IP address
  notes: CLI: Ipsrc <ip> - only this IP can access unit
```

## Feedbacks
```yaml
- id: pshow
  label: Outlet Status Display
  type: string
  description: Returns outlet states as binary sequence, right-most digit = outlet 1
  command: "pshow"
  example: "xxxx,cccc,cccc,tt" or "xxxx,cccc,tt"
  notes: Each x = outlet state (1=ON, 0=OFF); c = AC current (amps); t = temperature (Celsius)

- id: nwshow
  label: Network Settings Display
  type: string
  command: "nwshow"
  description: Returns IP address, gateway, MAC address, and network status

- id: sysshow
  label: System Information
  type: string
  command: "sysshow"
  description: Returns system information

- id: ver
  label: Firmware Version
  type: string
  command: "ver"
  description: Returns firmware version

- id: mac_addr
  label: MAC Address
  type: string
  command: "mac"
  description: Returns Ethernet port MAC address

- id: http_outlet_status
  label: HTTP Get Outlet Status (API $A5)
  type: string
  command: "/cmd.cgi?$A5"
  description: Returns "xxxx,cccc,cccc,tt" or "xxxx,cccc,tt" - outlet states + current draw + temperature

- id: return_code
  label: API Return Code
  type: enum
  values:
    - $A0  # OK - executed successfully
    - $AF  # Action failed or unknown
  description: All HTTP API calls return a code from this set
```

## Variables
```yaml
# UNRESOLVED: device IP address, DHCP/static mode, outlet count - not stated in source
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power sequencing requirements in source
```

## Notes
HTTP API format: `http://<ip>/cmd.cgi?<command_code> <arg1> <arg2>` — space-separated arguments after command code. HTTPS only available on DU models. Serial CLI format: `CmdCode Arg1 Arg2`. Default Telnet/HTTP port is 23 — user-configurable via `tp`/`hp` commands.

Default network configuration from source: static IP 192.168.1.100, subnet mask 255.255.0.0, gateway 192.168.1.1. Default serial port: 9600 baud, 8 data bits, 1 stop bit, no parity, XON/XOFF flow control.

<!-- UNRESOLVED: HTTPS availability only confirmed for DU models; NPB/DU distinction not clarified in source -->
<!-- UNRESOLVED: number of outlets, group configuration details not stated in source -->
<!-- UNRESOLVED: login password/auth mechanism not described in source despite login command existing -->
<!-- UNRESOLVED: $A5 temperature unit confirmed Celsius but no threshold/fault behavior described -->
<!-- UNRESOLVED: email configuration command for setting recipient address(es) not documented - only `emailsend` test trigger -->

## Provenance

```yaml
source_domains:
  - cdn.synaccess.com
  - synaccess.readme.io
  - synaccess-pdus.readme.io
source_urls:
  - https://cdn.synaccess.com/documents/1094_NPStartup_V20.pdf
  - https://synaccess.readme.io/reference/introduction-1
  - https://synaccess.readme.io/docs/getting-started
  - https://synaccess-pdus.readme.io/reference/http-api
  - https://synaccess-pdus.readme.io/reference/command-line-interface
retrieved_at: 2026-05-18T17:07:29.522Z
last_checked_at: 2026-07-22T01:31:29.418Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:31:29.418Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions matched verbatim in source; source query commands enumerated in feedbacks; transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "NPB-specific model numbers, outlet count, physical form factor not stated in source — manual covers netBooter PDU Series generically"
- "device IP address, DHCP/static mode, outlet count - not stated in source"
- "source does not describe unsolicited event notifications"
- "no explicit multi-step macros described in source"
- "no safety warnings, interlock procedures, or power sequencing requirements in source"
- "HTTPS availability only confirmed for DU models; NPB/DU distinction not clarified in source"
- "number of outlets, group configuration details not stated in source"
- "login password/auth mechanism not described in source despite login command existing"
- "$A5 temperature unit confirmed Celsius but no threshold/fault behavior described"
- "email configuration command for setting recipient address(es) not documented - only `emailsend` test trigger"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
