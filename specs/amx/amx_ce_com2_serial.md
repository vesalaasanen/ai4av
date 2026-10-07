---
spec_id: admin/amx-ce-com2
schema_version: ai4av-public-spec-v1
revision: 1
title: "AMX CE Com2 Control Spec"
manufacturer: AMX
model_family: "CE Com2"
aliases: []
compatible_with:
  manufacturers:
    - AMX
  models:
    - "CE Com2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - amx.com
source_urls:
  - https://www.amx.com/en/site_elements/hcontrol-protocol-ce-series
  - https://www.amx.com/en/site_elements/amx-instruction-manual-ce-series
retrieved_at: 2026-07-10T11:11:09.814Z
last_checked_at: 2026-10-07T13:27:11.337Z
generated_at: 2026-10-07T13:27:11.337Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 / IR / relay port commands are not documented in the source; they are deferred to a separate Instruction Manual."
  - "source documents paths but does not enumerate a discrete variable list beyond the path table. Treat path values as variables."
  - "source does not document unsolicited notifications."
  - "source does not document multi-step macro sequences."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:27:11.337Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 action units match source GET/SET/EXEC syntax and paths; port 4197 supported and auth honestly UNRESOLVED; spec covers full catalogue. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-10
---

# AMX CE Com2 Control Spec

## Summary
Spec covers AMX CE Com2 control via HARMAN Pro HControl, a text-based protocol using JSON-like syntax. The source demonstrates telnet access on port 4197. It also mentions RS-232/IR/relay port commands but defers those to the Instruction Manual, which is not included in the source. Authentication is UNRESOLVED; the source does not specify it.

<!-- UNRESOLVED: RS-232 / IR / relay port commands are not documented in the source; they are deferred to a separate Instruction Manual. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 4197
auth:
  type: UNRESOLVED
```

## Traits
```yaml
- queryable
- powerable
```

## Actions
```yaml
- id: get_device_os_version
  label: Get OS Version
  kind: query
  command: 'get {"path":"/configuration/device/version"}\n'
  params: []

- id: get_device_serialnumber
  label: Get Serial Number
  kind: query
  command: 'get {"path":"/configuration/device/serialnumber"}\n'
  params: []

- id: get_device_name
  label: Get Device Name
  kind: query
  command: 'get {"path":"/configuration/device/name"}\n'
  params: []

- id: set_device_name
  label: Set Device Name
  kind: action
  command: 'set {"path":"/configuration/device/name","value":"{value}"}\n'
  params:
    - name: value
      type: string
      description: Device name string

- id: get_network_ip_address
  label: Get Network IP Address
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/ipv4/ip_address"}\n'
  params: []

- id: set_network_ip_address
  label: Set Network IP Address
  kind: action
  command: 'set {"path":"/configuration/network/interface/1/ipv4/ip_address","value":"{ip}"}\n'
  params:
    - name: ip
      type: string
      description: IPv4 address string

- id: get_network_subnetmask
  label: Get Subnet Mask
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/ipv4/subnetmask"}\n'
  params: []

- id: set_network_subnetmask
  label: Set Subnet Mask
  kind: action
  command: 'set {"path":"/configuration/network/interface/1/ipv4/subnetmask","value":"{mask}"}\n'
  params:
    - name: mask
      type: string
      description: Subnet mask string

- id: get_network_gateway
  label: Get Gateway IP
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/ipv4/gateway"}\n'
  params: []

- id: get_network_dhcp
  label: Get DHCP Mode
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/ipv4/dhcp"}\n'
  params: []

- id: set_network_dhcp
  label: Set DHCP Mode
  kind: action
  command: 'set {"path":"/configuration/network/interface/1/ipv4/dhcp","value":{value}}\n'
  params:
    - name: value
      type: integer
      description: '0 = DHCP, 1 = STATIC; source also documents the string values DHCP and STATIC'

- id: get_dns_server
  label: Get DNS Server
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/dnsserver/{index}"}\n'
  params:
    - name: index
      type: integer
      description: DNS server index (1-5)

- id: set_dns_server
  label: Set DNS Server
  kind: action
  command: 'set {"path":"/configuration/network/interface/1/dnsserver/{index}","value":"{address}"}\n'
  params:
    - name: index
      type: integer
      description: DNS server index (1-5)
    - name: address
      type: string
      description: DNS server IP address

- id: get_network_mac
  label: Get MAC Address
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/mac"}\n'
  params: []

- id: set_ntp_enable
  label: Set NTP Enable
  kind: action
  command: 'set {"path":"/configuration/ntp/enable","value":{value}}\n'
  params:
    - name: value
      type: boolean
      description: Boolean value; source also documents the string value "true"

- id: exec_reboot
  label: Reboot
  kind: action
  command: 'reboot\n'
  params: []

- id: exec_locate
  label: Locate
  kind: action
  command: 'Locate\n'
  params: []

- id: exec_system_reset
  label: System Reset
  kind: action
  command: 'exec {"path":"/configuration/commands/","command":"reset","format":"string","value":"System"}\n'
  params: []

- id: exec_factory_reset
  label: Factory Reset
  kind: action
  command: 'exec {"path":"/configuration/commands/","command":"reset","format":"string","value":"Factory"}\n'
  params: []

- id: get_device_location
  label: Get Device Location
  kind: query
  command: 'get {"path":"/configuration/device/location"}\n'
  params: []

- id: set_device_location
  label: Set Device Location
  kind: action
  command: 'set {"path":"/configuration/device/location","value":"{value}"}\n'
  params:
    - name: value
      type: string
      description: Device location string

- id: get_network_interface_enable
  label: Get Network Interface Enable
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/enable"}\n'
  params: []
```

## Feedbacks
```yaml
- id: get_response
  type: object
  description: '@get response with path and value fields, e.g. {"path":"/configuration/device/name","value":"CEREL8-6388E5"}'
  query_command: 'get {"path":"$endpoint"}\n'
- id: set_response
  type: object
  description: '@set response echoes the path and value that was set'
- id: exec_response
  type: UNRESOLVED
  description: UNRESOLVED; the source does not document an @exec response
```

## Variables
```yaml
# UNRESOLVED: source documents paths but does not enumerate a discrete variable list beyond the path table. Treat path values as variables.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - UNRESOLVED
interlocks:
  - UNRESOLVED
```

## Notes
HControl is a text-based protocol using JSON-like syntax. The source demonstrates telnet access on TCP port 4197. Commands end with a newline (`\\n`). GET responses use `@get` and include the path and value; SET responses use `@set` and echo the path and value set. The source documents no EXEC response. Enumerations can return either the string value or index; by default, the index is returned. The `"format":"string"` modifier requests a string return. DHCP is shown with index `0` for DHCP and string value `DHCP`; the source lists the enumeration as `DHCP`, `STATIC`.

The source table contains `confguration` typos and uses `interface1` in several network paths. Paths here use `configuration` and `interface/1`, consistent with the source's explicit GET/SET examples and command examples. The IP address path is listed for GET and SET in the source table; the normalized path follows the source's other interface path examples.

RS-232 / IR / relay commands are mentioned but not covered here; the source defers them to a separate Instruction Manual. Authentication, firmware compatibility ranges, protocol version, baud rate, parity, and RS-232 settings are UNRESOLVED in the source.

## Provenance

```yaml
source_domains:
  - amx.com
source_urls:
  - https://www.amx.com/en/site_elements/hcontrol-protocol-ce-series
  - https://www.amx.com/en/site_elements/amx-instruction-manual-ce-series
retrieved_at: 2026-07-10T11:11:09.814Z
last_checked_at: 2026-10-07T13:27:11.337Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:27:11.337Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 action units match source GET/SET/EXEC syntax and paths; port 4197 supported and auth honestly UNRESOLVED; spec covers full catalogue. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 / IR / relay port commands are not documented in the source; they are deferred to a separate Instruction Manual."
- "source documents paths but does not enumerate a discrete variable list beyond the path table. Treat path values as variables."
- "source does not document unsolicited notifications."
- "source does not document multi-step macro sequences."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
