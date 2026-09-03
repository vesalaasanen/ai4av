---
spec_id: admin/amx-ce-rel8
schema_version: ai4av-public-spec-v1
revision: 1
title: "AMX CE-REL8 Control Spec"
manufacturer: AMX
model_family: CE-REL8
aliases: []
compatible_with:
  manufacturers:
    - AMX
  models:
    - CE-REL8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - amx.com
source_urls:
  - https://www.amx.com/en/site_elements/hcontrol-protocol-ce-series
  - https://www.amx.com/en/products/ce-rel8
retrieved_at: 2026-09-02T18:27:32.601Z
last_checked_at: 2026-09-02T22:16:11.584Z
generated_at: 2026-09-02T22:16:11.584Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "port/IR/relay commands not covered; firmware version not stated"
  - "source documents endpoints as GET/SET commands; no separate Variables entries"
  - "source describes no unsolicited notifications"
  - "source describes no multi-step sequences"
  - "no explicit safety warnings in HControl source excerpt"
  - "firmware version compatibility not stated; full endpoint catalogue may extend beyond device/network config shown"
verification:
  verdict: verified
  checked_at: 2026-09-02T22:16:11.584Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions match literals in the refined source; transport port 4197 and TCP protocol confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# AMX CE-REL8 Control Spec

## Summary
The AMX CE-REL8 is a CE-Series control endpoint exposing the HARMAN Pro HControl text/JSON protocol over TCP/IP. This spec covers GET/SET/EXEC commands for device configuration, network configuration, and system maintenance. Port/IR/relay commands are documented in the Instruction Manual, not here.

<!-- UNRESOLVED: port/IR/relay commands not covered; firmware version not stated -->

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
- queryable  # inferred from GET command examples
```

## Actions
```yaml
- id: get_configuration
  label: Get Configuration Value
  kind: query
  command: 'get {"path":"$endpoint"}'
  params:
    - name: endpoint
      type: string
      description: Configuration path (e.g. "/configuration/device/name")
  notes: Response format: @get {"path":"$endpoint","value":"$value"}

- id: set_configuration
  label: Set Configuration Value
  kind: action
  command: 'set {"path":"$endpoint","value":"$value"}'
  params:
    - name: endpoint
      type: string
      description: Configuration path (e.g. "/configuration/device/name")
    - name: value
      type: string
      description: Value to set; can be string, number, boolean, or enum index

- id: get_device_version
  label: Get OS Version
  kind: query
  command: 'get {"path":"/configuration/device/version"}'
  params: []

- id: get_device_serialnumber
  label: Get Serial Number
  kind: query
  command: 'get {"path":"/configuration/device/serialnumber"}'
  params: []

- id: get_device_name
  label: Get Device Name
  kind: query
  command: 'get {"path":"/configuration/device/name"}'
  params: []

- id: set_device_name
  label: Set Device Name
  kind: action
  command: 'set {"path":"/configuration/device/name","value":"$value"}'
  params:
    - name: value
      type: string
      description: New device name (e.g. "CEREL8-6388E5")

- id: get_network_ipv4_ip_address
  label: Get IPv4 IP Address
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/ipv4/ip_address"}'
  params: []

- id: set_network_ipv4_ip_address
  label: Set IPv4 IP Address
  kind: action
  command: 'set {"path":"/configuration/network/interface/1/ipv4/ip_address","value":"$value"}'
  params:
    - name: value
      type: string
      description: IPv4 address string

- id: get_network_ipv4_subnetmask
  label: Get Subnet Mask
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/ipv4/subnetmask"}'
  params: []

- id: set_network_ipv4_subnetmask
  label: Set Subnet Mask
  kind: action
  command: 'set {"path":"/configuration/network/interface/1/ipv4/subnetmask","value":"$value"}'
  params:
    - name: value
      type: string
      description: Subnet mask (e.g. "255.255.255.0")

- id: get_network_ipv4_gateway
  label: Get Gateway IP
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/ipv4/gateway"}'
  params: []

- id: get_network_ipv4_dhcp
  label: Get DHCP/Static Mode
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/ipv4/dhcp"}'
  params: []
  notes: Returns index by default (0=DHCP, 1=STATIC); pass format:"string" for enum string

- id: set_network_ipv4_dhcp
  label: Set DHCP/Static Mode
  kind: action
  command: 'set {"path":"/configuration/network/interface/1/ipv4/dhcp","value":"$value"}'
  params:
    - name: value
      type: string
      description: "DHCP or STATIC (string) or 0/1 (index)"

- id: get_network_dnsserver
  label: Get DNS Server
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/dnsserver/$index"}'
  params:
    - name: index
      type: integer
      description: "DNS server slot (1-5)"

- id: set_network_dnsserver
  label: Set DNS Server
  kind: action
  command: 'set {"path":"/configuration/network/interface/1/dnsserver/$index","value":"$value"}'
  params:
    - name: index
      type: integer
      description: "DNS server slot (1-5)"
    - name: value
      type: string
      description: DNS server IP address

- id: get_network_mac
  label: Get MAC Address
  kind: query
  command: 'get {"path":"/configuration/network/interface/1/mac"}'
  params: []

- id: reboot
  label: Reboot
  kind: action
  command: "reboot"
  params: []

- id: locate
  label: Locate Device
  kind: action
  command: "Locate"
  params: []
  notes: Capitalized "Locate" as shown in source

- id: reset_system
  label: System Reset
  kind: action
  command: 'exec {"path":"/configuration/commands/","command":"reset","format":"string","value":"System"}'
  params: []

- id: reset_factory
  label: Factory Reset
  kind: action
  command: 'exec {"path":"/configuration/commands/","command":"reset","format":"string","value":"Factory"}'
  params: []
```

## Feedbacks
```yaml
- id: get_response
  type: string
  description: "@get {path,value} response to a GET command"

- id: set_response
  type: string
  description: "@set {path,value} response echoing the set value"
```

## Variables
```yaml
# UNRESOLVED: source documents endpoints as GET/SET commands; no separate Variables entries
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences
```

## Safety
```yaml
confirmation_required_for:
  - reset_factory  # Factory Reset wipes device configuration
interlocks: []
# UNRESOLVED: no explicit safety warnings in HControl source excerpt
```

## Notes
HControl is a JSON-like text protocol over TCP port 4197. Commands end with `\n` (literal newline). Use telnet to experiment. Enumerations accept either index (default) or string when `format:"string"` is supplied. Port/IR/relay commands are in the Instruction Manual, not HControl.

<!-- UNRESOLVED: firmware version compatibility not stated; full endpoint catalogue may extend beyond device/network config shown -->

## Provenance

```yaml
source_domains:
  - amx.com
source_urls:
  - https://www.amx.com/en/site_elements/hcontrol-protocol-ce-series
  - https://www.amx.com/en/products/ce-rel8
retrieved_at: 2026-09-02T18:27:32.601Z
last_checked_at: 2026-09-02T22:16:11.584Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-02T22:16:11.584Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions match literals in the refined source; transport port 4197 and TCP protocol confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "port/IR/relay commands not covered; firmware version not stated"
- "source documents endpoints as GET/SET commands; no separate Variables entries"
- "source describes no unsolicited notifications"
- "source describes no multi-step sequences"
- "no explicit safety warnings in HControl source excerpt"
- "firmware version compatibility not stated; full endpoint catalogue may extend beyond device/network config shown"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
