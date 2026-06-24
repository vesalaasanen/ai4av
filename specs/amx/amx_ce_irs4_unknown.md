---
spec_id: admin/amx-ce-irs4
schema_version: ai4av-public-spec-v1
revision: 1
title: "AMX CE IRS4 Control Spec"
manufacturer: AMX
model_family: "CE IRS4"
aliases: []
compatible_with:
  manufacturers:
    - AMX
  models:
    - "CE IRS4"
    - "CE Series Universal Control Extenders"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - amx.com
source_urls:
  - https://www.amx.com/en/site_elements/hcontrol-protocol-ce-series
  - https://www.amx.com/en/site_elements/amx-instruction-manual-ce-series
retrieved_at: 2026-05-15T00:44:44.125Z
last_checked_at: 2026-06-23T09:10:18.595Z
generated_at: 2026-06-23T09:10:18.595Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "port-level protocols (RS-232, IR, relays) not covered — see Instruction Manual per source"
  - "authentication procedure not described in source"
  - "populate from source, or remove section if not applicable"
  - "no unsolicited notification events described in source"
  - "no multi-step sequences described in source"
  - "complete list of HControl endpoints beyond those shown in the source table is not documented; additional paths may exist"
  - "authentication/login mechanism not described; assumed none based on plain Telnet example"
verification:
  verdict: verified
  checked_at: 2026-06-23T09:10:18.595Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions match source commands exactly; transport port 4197 confirmed; no undocumented source commands omitted. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# AMX CE IRS4 Control Spec

## Summary
The AMX CE IRS4 is part of the CE Series Universal Control Extenders by HARMAN Pro. This spec covers the HControl protocol — a text-based, JSON-like TCP/IP protocol available for third-party queries to configure and control certain aspects of the device. The protocol supports GET, SET, and EXEC command types over a TCP connection. RS-232, IR, relay, and other port-level control protocols are documented separately in the Instruction Manual and are not covered here.

<!-- UNRESOLVED: port-level protocols (RS-232, IR, relays) not covered — see Instruction Manual per source -->
<!-- UNRESOLVED: authentication procedure not described in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 4197
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from GET query command examples
```

## Actions
```yaml
- id: get_device_version
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
  command: 'set {"path":"/configuration/device/name","value":"{name}"}\n'
  params:
    - name: name
      type: string
      description: Device name string

- id: get_device_location
  label: Get Device Location
  kind: query
  command: 'get {"path":"/configuration/device/location"}\n'
  params: []

- id: set_device_location
  label: Set Device Location
  kind: action
  command: 'set {"path":"/configuration/device/location","value":"{location}"}\n'
  params:
    - name: location
      type: string
      description: Device location string

- id: get_network_ip_address
  label: Get Network IP Address
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/ipv4/ip_address"}\n'
  params: []

- id: set_network_ip_address
  label: Set Network IP Address
  kind: action
  command: 'set {"path":"/configuration/network/interface/1/ipv4/ip_address","value":"{ip_address}"}\n'
  params:
    - name: ip_address
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
  command: 'set {"path":"/configuration/network/interface/1/ipv4/subnetmask","value":"{subnetmask}"}\n'
  params:
    - name: subnetmask
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
  notes: Returns index by default (0=DHCP, 1=STATIC). Use format="string" for string value.

- id: set_network_dhcp
  label: Set DHCP Mode
  kind: action
  command: 'set {"path":"/configuration/network/interface/1/ipv4/dhcp","value":{value}}\n'
  params:
    - name: value
      type: integer
      description: 0 for DHCP, 1 for STATIC; or use string variant with format="string"

- id: get_network_interface_enable
  label: Get Network Interface Enable
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/enable"}\n'
  params: []

- id: get_network_dnsserver
  label: Get DNS Server Address
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/dnsserver/{index}"}\n'
  params:
    - name: index
      type: integer
      description: DNS server index, 1-5

- id: set_network_dnsserver
  label: Set DNS Server Address
  kind: action
  command: 'set {"path":"/configuration/network/interface/1/dnsserver/{index}","value":"{dns_address}"}\n'
  params:
    - name: index
      type: integer
      description: DNS server index, 1-5
    - name: dns_address
      type: string
      description: DNS server IP address string

- id: get_network_mac
  label: Get MAC Address
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/mac"}\n'
  params: []

- id: get_ntp_enable
  label: Get NTP Enable
  kind: query
  command: 'get {"path":"/configuration/ntp/enable"}\n'
  params: []

- id: set_ntp_enable
  label: Set NTP Enable
  kind: action
  command: 'set {"path":"/configuration/ntp/enable","value":{value}}\n'
  params:
    - name: value
      type: boolean
      description: true to enable NTP, false to disable

- id: reboot
  label: Reboot Device
  kind: action
  command: "reboot\n"
  params: []

- id: locate
  label: Locate Device
  kind: action
  command: "Locate\n"
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
```

## Feedbacks
```yaml
- id: get_response
  type: string
  description: >
    Response to any GET command. Syntax:
    @get {"path":"$endpoint","value":"$value"}
    Value type depends on the queried endpoint (string, boolean, or enum index/string).

- id: set_response
  type: string
  description: >
    Acknowledgement of any SET command. Syntax:
    @set {"path":"$endpoint","value":"$value"}
    Echoes back the path and value that was set.
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - exec_factory_reset
interlocks: []
# Factory Reset irreversibly restores device to factory defaults. No other safety warnings stated in source.
```

## Notes
- The HControl protocol uses a JSON-like text syntax over TCP port 4197, confirmed by the Telnet example in the source (`telnet 10.35.92.85 4197`).
- All commands are terminated with `\n` (newline).
- GET responses are prefixed with `@get`; SET acknowledgements with `@set`.
- Enumeration fields (e.g. DHCP mode) can return either the index value (default) or the string value when `"format":"string"` is added to the command.
- Port-level protocols (RS-232, IR, relays, etc.) are NOT covered by HControl — they are documented in the separate CE Series Instruction Manual.
- The source document refers to the device series as "CE Series Universal Control Extenders"; the CE IRS4 model is one unit in this series (IR-output extender).
<!-- UNRESOLVED: complete list of HControl endpoints beyond those shown in the source table is not documented; additional paths may exist -->
<!-- UNRESOLVED: authentication/login mechanism not described; assumed none based on plain Telnet example -->

## Provenance

```yaml
source_domains:
  - amx.com
source_urls:
  - https://www.amx.com/en/site_elements/hcontrol-protocol-ce-series
  - https://www.amx.com/en/site_elements/amx-instruction-manual-ce-series
retrieved_at: 2026-05-15T00:44:44.125Z
last_checked_at: 2026-06-23T09:10:18.595Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T09:10:18.595Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions match source commands exactly; transport port 4197 confirmed; no undocumented source commands omitted. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "port-level protocols (RS-232, IR, relays) not covered — see Instruction Manual per source"
- "authentication procedure not described in source"
- "populate from source, or remove section if not applicable"
- "no unsolicited notification events described in source"
- "no multi-step sequences described in source"
- "complete list of HControl endpoints beyond those shown in the source table is not documented; additional paths may exist"
- "authentication/login mechanism not described; assumed none based on plain Telnet example"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
