---
spec_id: admin/synaccess_networks-np_0801_02bh_10du
schema_version: ai4av-public-spec-v1
revision: 1
title: "Synaccess Networks NP-0801 02BH 10DU Control Spec"
manufacturer: "Synaccess Networks"
model_family: "NP-0801 02BH 10DU"
aliases: []
compatible_with:
  manufacturers:
    - "Synaccess Networks"
  models:
    - "NP-0801 02BH 10DU"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.synaccess.com
  - synaccess.readme.io
  - synaccess.com
source_urls:
  - https://cdn.synaccess.com/documents/1094_NPStartup_V20.pdf
  - https://synaccess.readme.io/reference/introduction-1
  - https://synaccess.readme.io/docs/getting-started
  - https://www.synaccess.com/pdu-support-hub
retrieved_at: 2026-05-14T02:04:37.459Z
last_checked_at: 2026-07-22T01:31:28.437Z
generated_at: 2026-07-22T01:31:28.437Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP/HTTPS port not stated in source"
  - "HTTP port not stated (explicit default 80 assumed)"
  - "no discrete settable parameters found beyond outlet state"
  - "no unsolicited notification protocol described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:31:28.437Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched literal wire tokens in source; all transport parameters verified in source documentation. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Synaccess Networks NP-0801 02BH 10DU Control Spec

## Summary
8-outlet power distribution unit (PDU) with dual control interfaces: RS-232 serial and TCP/IP (Telnet + HTTP). Supports individual outlet control, group control, and outlet status monitoring (state, current draw, temperature). Control via CLI over Telnet/serial or HTTP API at `/cmd.cgi`. No authentication described.

<!-- UNRESOLVED: HTTP/HTTPS port not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet; HTTP API on same IP:80 # UNRESOLVED: HTTP port not stated (explicit default 80 assumed)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # individual and group outlet on/off commands present
- routable        # outlet grouping commands present
- queryable       # status query commands (pshow, nwshow, sysshow, ver, mac, $A5) returning state/current/temp/info
```

## Actions
```yaml
# --- Power Outlet Operations (CLI) ---
- id: pset
  label: Set Outlet State
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based)
    - name: state
      type: integer
      enum: [0, 1]
      description: 0=OFF, 1=ON
  examples:
    - "pset 2 1"  # outlet 2 ON
    - "$A3 1 0"   # HTTP API: outlet 1 OFF

- id: ps
  label: Set All Outlets
  kind: action
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0=OFF, 1=ON
  examples:
    - "ps 1"   # all outlets ON
    - "$A7 0"  # HTTP API: all outlets OFF

- id: rb
  label: Reboot Outlet
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based)
  examples:
    - "rb 3"
    - "$A4 2"  # HTTP API: reboot outlet 2

- id: gpset
  label: Set Outlet Group
  kind: action
  params:
    - name: group
      type: integer
      description: Group number
    - name: state
      type: integer
      enum: [0, 1]
      description: 0=OFF, 1=ON
  examples:
    - "gpset 1 0"  # group 1 OFF

- id: grb
  label: Reboot Outlet Group
  kind: action
  params:
    - name: group
      type: integer
      description: Group number
  examples:
    - "grb 1"

- id: pshow
  label: Show Outlet Status
  kind: query
  command: "pshow"
  params: []
  returns: "xxxx,cccc,cccc,tt (8 outlets) or xxxx,cccc,tt (4 outlets)"

# --- Networking and System Configuration (CLI) ---
- id: nwshow
  label: Show Network Settings
  kind: query
  command: "nwshow"
  params: []
  description: Displays network settings and status, including IP address, gateway, MAC address

- id: nwset
  label: Reset Network Interface
  kind: action
  command: "nwset"
  params: []
  description: Resets the network interface

- id: dhcp
  label: Set IP Mode
  kind: action
  command: "dhcp {mode}"
  params:
    - name: mode
      type: integer
      enum: [0, 1]
      description: 0=Static, 1=DHCP

- id: ip
  label: Set Static IP
  kind: action
  params:
    - name: ip
      type: string
    - name: mask
      type: string

- id: gw
  label: Set Gateway
  kind: action
  params:
    - name: gateway
      type: string

- id: mac
  label: Show MAC Address
  kind: query
  command: "mac"
  params: []
  description: Displays the Ethernet Port MAC address

- id: web
  label: Set Web Access
  kind: action
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: mask
  label: Set Subnet Mask
  kind: action
  params:
    - name: mask
      type: string

- id: emailsend
  label: Send Test Email
  kind: action
  command: "emailsend"
  params: []
  description: Sends a test mail to the configured email(s)

- id: hp
  label: Set HTTP Port
  kind: action
  params:
    - name: port
      type: integer

- id: tp
  label: Set Telnet Port
  kind: action
  params:
    - name: port
      type: integer

- id: Ipsrc
  label: Set Filtered Source IP
  kind: action
  command: "Ipsrc {ip}"
  params:
    - name: ip
      type: string
      description: Source IP to filter; only this IP is allowed to access the unit

- id: help
  label: Help Menu
  kind: action
  command: "help"
  params: []
  description: Displays the help menu

- id: login
  label: Login
  kind: action
  params: []

- id: logout
  label: Logout
  kind: action
  params: []

- id: sysshow
  label: Show System Information
  kind: query
  command: "sysshow"
  params: []
  description: Shows system information

- id: ver
  label: Show Firmware Version
  kind: query
  command: "ver"
  params: []
  description: Shows version of firmware

# --- HTTP API (cmd.cgi) commands with explicit codes ---
- id: http_set_outlet
  label: HTTP Set Outlet ON/OFF
  kind: action
  command: "$A3 {outlet} {state}"
  params:
    - name: outlet
      type: integer
      description: Outlet number
    - name: state
      type: integer
      enum: [0, 1]
      description: 0=OFF, 1=ON

- id: http_reboot_outlet
  label: HTTP Reboot Outlet
  kind: action
  command: "$A4 {outlet}"
  params:
    - name: outlet
      type: integer
      description: Outlet number

- id: http_get_outlet_status
  label: HTTP Get Outlet Status
  kind: query
  command: "$A5"
  params: []
  returns: "xxxx,cccc,cccc,tt (8 outlets) or xxxx,cccc,tt (4 outlets)"

- id: http_set_all_outlets
  label: HTTP Set All Outlets ON/OFF
  kind: action
  command: "$A7 {state}"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0=OFF, 1=ON
```

## Feedbacks
```yaml
- id: outlet_status
  label: Outlet Status
  type: structured
  returns: "xxxx,cccc,cccc,tt (8 outlets) or xxxx,cccc,tt (4 outlets)"
  fields:
    - name: outlet_states
      type: string
      description: Binary string of outlet states (1=ON, 0=OFF), rightmost = outlet 1
    - name: current_draw
      type: string
      description: "c" = AC current in amps per outlet
    - name: temperature
      type: string
      description: "t" = temperature in Celsius

- id: system_status
  label: System Info
  type: structured
  fields:
    - IP address, gateway, MAC address (nwshow)
    - Firmware version (ver)
    - System information (sysshow)
    - MAC address (mac)
    - All outlet states (pshow)

- id: return_code
  label: Command Return Code
  type: enum
  values:
    - $A0  # OK - executed successfully
    - $AF  # Action failed or unknown
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found beyond outlet state
# Network config (ip, mask, gw, dhcp, hp, tp, Ipsrc, web) listed under Actions as they are CLI commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Telnet and serial share the same CLI command format: `CmdCode Arg1 Arg2`
- Default Telnet port: 23 (explicitly stated in source). HTTP API: `http://<ip>/cmd.cgi?cmdCode Arg1 Arg2`
- HTTPS only available on *DU* models — this is a DU model so HTTPS applicable (source: "HTTPS is applicable only for *DU* models")
- Outlet numbering: rightmost bit = outlet 1 in status response string
- Flow control: XON/XOFF (software), hardware handshaking = None
- HTTP port default assumed as 80 (not explicitly stated — port 23 for Telnet is explicit)
- `nwset` resets the network interface; `dhcp <x>` sets IP mode (corrected: prior spec conflated these)
- Static IP/gateway settings only active when DHCP mode is disabled (per source notes on `ip` and `gw` commands)

## Provenance

```yaml
source_domains:
  - cdn.synaccess.com
  - synaccess.readme.io
  - synaccess.com
source_urls:
  - https://cdn.synaccess.com/documents/1094_NPStartup_V20.pdf
  - https://synaccess.readme.io/reference/introduction-1
  - https://synaccess.readme.io/docs/getting-started
  - https://www.synaccess.com/pdu-support-hub
retrieved_at: 2026-05-14T02:04:37.459Z
last_checked_at: 2026-07-22T01:31:28.437Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:31:28.437Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched literal wire tokens in source; all transport parameters verified in source documentation. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP/HTTPS port not stated in source"
- "HTTP port not stated (explicit default 80 assumed)"
- "no discrete settable parameters found beyond outlet state"
- "no unsolicited notification protocol described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
