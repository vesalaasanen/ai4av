---
spec_id: admin/synaccess-networks-np-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Synaccess Networks NP Series Control Spec"
manufacturer: "Synaccess Networks"
model_family: "NP Series (netBooter PDU)"
aliases: []
compatible_with:
  manufacturers:
    - "Synaccess Networks"
  models:
    - "NP Series (netBooter PDU)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.synaccess.com
  - synaccess.readme.io
  - github.com
source_urls:
  - https://cdn.synaccess.com/documents/1094_NPStartup_V20.pdf
  - https://synaccess.readme.io/docs/switching-an-outlet-on-or-off
  - https://synaccess.readme.io/docs/getting-started
  - https://synaccess.readme.io/reference/introduction-1
  - https://github.com/synaccess-networks/API-Examples/blob/master/examples.sh
retrieved_at: 2026-05-15T06:27:52.847Z
last_checked_at: 2026-06-02T22:15:30.172Z
generated_at: 2026-06-02T22:15:30.172Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source mentions login/logout CLI commands but no auth procedure or credential format"
  - "no settable continuous variables documented in source"
  - "no unsolicited notification protocol documented in source"
  - "no multi-step sequences documented in source"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing"
  - "login/logout command credential flow not documented"
  - "outlet group configuration method not documented"
  - "HTTP API auth mechanism not documented"
  - "email configuration method not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:15:30.172Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Synaccess Networks NP Series Control Spec

## Summary

Synaccess Networks netBooter NP Series is a networked power distribution unit (PDU) with per-outlet switching and group control. Supports serial (RS-232/USB), Telnet (TCP port 23), and HTTP/HTTPS (`cmd.cgi`) control interfaces. This spec covers CLI and HTTP API commands documented in the user manual.

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff  # source states "Hardware Handshaking: None" and "Flow Control: XON/XOFF"
addressing:
  port: 23  # Telnet default stated in source
  base_url: "http://{device_ip}/cmd.cgi"  # HTTPS on DU models only
auth:
  type: null  # UNRESOLVED: source mentions login/logout CLI commands but no auth procedure or credential format
```

## Traits
```yaml
- powerable   # outlet on/off/reboot commands present
- queryable   # pshow, $A5 status query commands present
```

## Actions
```yaml
# CLI commands (serial/Telnet)
- id: pset
  label: Set Outlet State
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number
    - name: state
      type: integer
      description: "0 = OFF, 1 = ON"

- id: ps
  label: Set All Outlets
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = OFF, 1 = ON"

- id: rb
  label: Reboot Outlet
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number

- id: gpset
  label: Set Outlet Group State
  kind: action
  params:
    - name: group
      type: integer
      description: Outlet group number
    - name: state
      type: integer
      description: "0 = OFF, 1 = ON"

- id: grb
  label: Reboot Outlet Group
  kind: action
  params:
    - name: group
      type: integer
      description: Outlet group number

- id: nwshow
  label: Show Network Settings
  kind: action
  params: []

- id: nwset
  label: Reset Network Interface
  kind: action
  params: []

- id: dhcp
  label: Set DHCP Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1 = DHCP, 0 = Static"

- id: ip_set
  label: Set Static IP
  kind: action
  params:
    - name: ip
      type: string
      description: IP address
    - name: mask
      type: string
      description: Subnet mask

- id: gw_set
  label: Set Gateway
  kind: action
  params:
    - name: gateway
      type: string
      description: Gateway IP address

- id: mac_show
  label: Show MAC Address
  kind: action
  params: []

- id: web_set
  label: Enable/Disable Web Access
  kind: action
  params:
    - name: enabled
      type: integer
      description: "1 = On, 0 = Off"

- id: mask_set
  label: Set Subnet Mask
  kind: action
  params:
    - name: mask
      type: string
      description: Subnet mask

- id: emailsend
  label: Send Test Email
  kind: action
  params: []

- id: hp_set
  label: Set HTTP Port
  kind: action
  params:
    - name: port
      type: integer
      description: HTTP port number

- id: tp_set
  label: Set Telnet Port
  kind: action
  params:
    - name: port
      type: integer
      description: Telnet port number

- id: ipsrc_set
  label: Set Allowed Source IP
  kind: action
  params:
    - name: ip
      type: string
      description: Only this IP may access the unit

- id: login
  label: Login
  kind: action
  params: []

- id: logout
  label: Logout
  kind: action
  params: []

- id: sysshow
  label: Show System Info
  kind: action
  params: []

- id: ver
  label: Show Firmware Version
  kind: action
  params: []

- id: help
  label: Help Menu
  kind: action
  params: []

# HTTP API commands
- id: http_set_outlet
  label: Set Outlet ON/OFF (HTTP)
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number
    - name: state
      type: integer
      description: "0 = OFF, 1 = ON"
  transport_hint: "GET /cmd.cgi?$A3 {outlet} {state}"

- id: http_reboot
  label: Reboot Outlet (HTTP)
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number
  transport_hint: "GET /cmd.cgi?$A4 {outlet}"

- id: http_set_all
  label: Set All Outlets ON/OFF (HTTP)
  kind: action
  params:
    - name: state
      type: integer
      description: "1 = ON, 0 = OFF"
  transport_hint: "GET /cmd.cgi?$A7 {state}"
```

## Feedbacks
```yaml
- id: outlet_status_cli
  type: string
  description: "CLI pshow command returns outlet status"

- id: outlet_status_http
  type: string
  description: >
    HTTP $A5 returns: xxxx,cccc,cccc,tt or xxxx,cccc,tt
    x = outlet state (1=ON, 0=OFF), rightmost x = outlet 1
    c = AC current draw (amps)
    t = temperature (Celsius)

- id: http_return_code
  type: enum
  values:
    - $A0
    - $AF
  description: "$A0 = OK, $AF = Action failed or unknown"

- id: network_status
  type: string
  description: "nwshow returns IP, gateway, MAC, network settings"

- id: system_info
  type: string
  description: "sysshow returns system information"

- id: firmware_version
  type: string
  description: "ver returns firmware version string"

- id: mac_address
  type: string
  description: "mac returns Ethernet MAC address"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing
```

## Notes
- CLI command format: `CmdCode Arg1 Arg2` (space-delimited).
- HTTP API mirrors CLI via `GET /cmd.cgi?cmdCode Arg1 Arg2` URL pattern.
- HTTPS supported on DU models only (per source footnote).
- Default static IP: 192.168.1.100, mask 255.255.0.0, gateway 192.168.1.1.
- Outlet group assignments not documented in source — `gpset`/`grb` assume groups pre-configured via web UI.
<!-- UNRESOLVED: login/logout command credential flow not documented -->
<!-- UNRESOLVED: outlet group configuration method not documented -->
<!-- UNRESOLVED: HTTP API auth mechanism not documented -->
<!-- UNRESOLVED: email configuration method not documented -->

## Provenance

```yaml
source_domains:
  - cdn.synaccess.com
  - synaccess.readme.io
  - github.com
source_urls:
  - https://cdn.synaccess.com/documents/1094_NPStartup_V20.pdf
  - https://synaccess.readme.io/docs/switching-an-outlet-on-or-off
  - https://synaccess.readme.io/docs/getting-started
  - https://synaccess.readme.io/reference/introduction-1
  - https://github.com/synaccess-networks/API-Examples/blob/master/examples.sh
retrieved_at: 2026-05-15T06:27:52.847Z
last_checked_at: 2026-06-02T22:15:30.172Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:15:30.172Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source mentions login/logout CLI commands but no auth procedure or credential format"
- "no settable continuous variables documented in source"
- "no unsolicited notification protocol documented in source"
- "no multi-step sequences documented in source"
- "source contains no safety warnings, interlock procedures, or power-on sequencing"
- "login/logout command credential flow not documented"
- "outlet group configuration method not documented"
- "HTTP API auth mechanism not documented"
- "email configuration method not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
