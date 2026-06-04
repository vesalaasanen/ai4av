---
spec_id: admin/juice-goose-ip-15-snmp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Juice Goose iP 15 SNMP Series Control Spec"
manufacturer: "Juice Goose"
model_family: "iP 15 SNMP Series"
aliases: []
compatible_with:
  manufacturers:
    - "Juice Goose"
  models:
    - "iP 15 SNMP Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - juicegoose.com
source_urls:
  - https://www.juicegoose.com/resources/manuals/ip-series-manual-rev-6-2023/download
retrieved_at: 2026-04-30T04:33:08.696Z
last_checked_at: 2026-06-03T07:13:06.889Z
generated_at: 2026-06-03T07:13:06.889Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 data bits, parity, stop bits, and flow control not stated in source"
  - "SNMP port not explicitly stated in source"
  - "whether relay 4 exists on this model (source says 1,2,3 or 4 but only pods 1-3 documented)"
  - "SNMP port not explicitly stated in source (standard is 161)"
  - "not stated in source"
  - "SNMP GET/getnext queries for reading relay state not documented in source"
  - "no continuously variable parameters documented in source (relay states are discrete on/off/cycle)"
  - "SEQUP and SEQDOWN are multi-step sequences but parameters are embedded in command; not broken out as macro steps in source"
  - "no voltage/current ratings or load limits stated in source"
  - "firmware version compatibility not stated in source"
  - "SNMP GET/read operations not documented — only snmpset described"
  - "whether relay/pod 4 exists on the iP 15 hardware (source mentions 1,2,3 or 4 but only 3 pods shown in RS232 commands)"
  - "RS-232 data bits, parity, stop bits, flow control parameters not stated"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:13:06.889Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 actions verified (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Juice Goose iP 15 SNMP Series Control Spec

## Summary

The Juice Goose iP 15 SNMP Series is an SNMP-controlled AC power distribution unit with three individually controllable relay pods. It supports control via SNMP v1/v2c (over Ethernet) and RS-232 serial console. SNMP provides relay on/off/cycle commands; RS-232 adds power sequencing, network configuration, and device management commands.

<!-- UNRESOLVED: RS-232 data bits, parity, stop bits, and flow control not stated in source -->
<!-- UNRESOLVED: SNMP port not explicitly stated in source -->
<!-- UNRESOLVED: whether relay 4 exists on this model (source says 1,2,3 or 4 but only pods 1-3 documented) -->

## Transport
```yaml
protocols:
  - udp
  - serial
addressing:
  default_ip: 192.168.1.77
  port: null  # UNRESOLVED: SNMP port not explicitly stated in source (standard is 161)
  snmp_version: "2c"  # also supports v1 via "-v 1c"
  snmp_pen: 47857
  oid_base: "1.3.6.4.47857.101"
serial:
  baud_rate: 19200
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
  connector: RJ-11
  eol: CR  # CR, LF+CR, or CR+LF accepted; firmware waits for CR
auth:
  type: community  # SNMP v2c community string; default "public"
  community: public  # configurable via RS232 SETCOMMUN command; max 8 chars, lowercase alphanumeric
```

## Traits
```yaml
traits:
  - powerable  # inferred: relay on/off/cycle commands present
  - queryable  # inferred: INFO query command returns current settings
```

## Actions
```yaml
# SNMP Actions (snmpset via UDP)
- id: relay_on
  label: Relay On
  kind: action
  transport: udp
  command: "snmpset -v 2c -c {community} {ip} 1.3.6.4.47857.101.{relay} i 1"
  params:
    - name: relay
      type: integer
      description: "Relay number (1-3, possibly 4)"
    - name: community
      type: string
      description: "SNMP community string"
    - name: ip
      type: string
      description: "Device IP address"

- id: relay_off
  label: Relay Off
  kind: action
  transport: udp
  command: "snmpset -v 2c -c {community} {ip} 1.3.6.4.47857.101.{relay} i 0"
  params:
    - name: relay
      type: integer
      description: "Relay number (1-3, possibly 4)"
    - name: community
      type: string
      description: "SNMP community string"
    - name: ip
      type: string
      description: "Device IP address"

- id: relay_cycle
  label: Relay Power Cycle
  kind: action
  transport: udp
  command: "snmpset -r 0 -t 10 -v 2c -c {community} {ip} 1.3.6.4.47857.101.{relay} i 2"
  description: "Power cycles relay: OFF, wait 3 seconds, ON. Use -r 0 to prevent multiple cycles from retries."
  params:
    - name: relay
      type: integer
      description: "Relay number (1-3, possibly 4)"
    - name: community
      type: string
      description: "SNMP community string"
    - name: ip
      type: string
      description: "Device IP address"

# RS-232 Serial Actions
- id: deactivate
  label: Deactivate Front Panel Switch
  kind: action
  transport: serial
  command: DEACTIVATE
  description: "Disables the sequence up/down switch on the front panel. Must be issued first to ensure switch position does not override RS232 commands."

- id: activate
  label: Activate Front Panel Switch
  kind: action
  transport: serial
  command: ACTIVATE
  description: "Enables the sequence up/down switch on the front panel."

- id: pod_on
  label: Pod On
  kind: action
  transport: serial
  command: "POD{relay}ON"
  params:
    - name: relay
      type: integer
      description: "Pod number (1-3)"

- id: pod_off
  label: Pod Off
  kind: action
  transport: serial
  command: "POD{relay}OFF"
  params:
    - name: relay
      type: integer
      description: "Pod number (1-3)"

- id: all_on
  label: All Pods On
  kind: action
  transport: serial
  command: ALLON
  description: "Turns all pods on without sequencing."

- id: all_off
  label: All Pods Off
  kind: action
  transport: serial
  command: ALLOFF
  description: "Turns all pods off without sequencing."

- id: seq_up
  label: Sequence Up
  kind: action
  transport: serial
  command: "SEQUP{delay}"
  description: "Sequences all pods ON from 1 to 3 with delay between each."
  params:
    - name: delay
      type: integer
      description: "Seconds between sequence events (e.g. SEQUP2 for 2 seconds)"

- id: seq_down
  label: Sequence Down
  kind: action
  transport: serial
  command: "SEQDOWN{delay}"
  description: "Sequences all pods OFF from 3 to 1 with delay between each."
  params:
    - name: delay
      type: integer
      description: "Seconds between sequence events (e.g. SEQDOWN2 for 2 seconds)"

- id: dhcp_on
  label: Enable DHCP
  kind: action
  transport: serial
  command: DHCPON

- id: dhcp_off
  label: Disable DHCP
  kind: action
  transport: serial
  command: DHCPOFF
  description: "Disable DHCP before entering network settings via RS232 or changes will be lost."

- id: set_ip
  label: Set IP Address
  kind: action
  transport: serial
  command: "SETIP {address}"
  params:
    - name: address
      type: string
      description: "IP address in dotted decimal (XXX.XXX.XXX.XXX)"

- id: set_mask
  label: Set Subnet Mask
  kind: action
  transport: serial
  command: "SETMASK {mask}"
  params:
    - name: mask
      type: string
      description: "Subnet mask in dotted decimal"

- id: set_gateway
  label: Set Gateway
  kind: action
  transport: serial
  command: "SETGATEIP {gateway}"
  params:
    - name: gateway
      type: string
      description: "Gateway IP address in dotted decimal"

- id: set_primary_dns
  label: Set Primary DNS
  kind: action
  transport: serial
  command: "SETPDNS"

- id: set_secondary_dns
  label: Set Secondary DNS
  kind: action
  transport: serial
  command: "SETSDNS"

- id: set_community
  label: Set SNMP Community
  kind: action
  transport: serial
  command: "SETCOMMUN={value}"
  description: "Sets the SNMP community string. Max 8 characters, lowercase alphanumeric only. Requires RESTART to take effect."
  params:
    - name: value
      type: string
      description: "New community string (max 8 chars, lowercase alphanumeric)"

- id: restart
  label: Restart Device
  kind: action
  transport: serial
  command: RESTART
  description: "Restarts/reboots the device. Use after making configuration changes."
```

## Feedbacks
```yaml
- id: info
  label: Device Info
  type: string
  transport: serial
  command: INFO
  description: "Returns all current settings including IP address, network config, and relay states."

# UNRESOLVED: SNMP GET/getnext queries for reading relay state not documented in source
```

## Variables
```yaml
# UNRESOLVED: no continuously variable parameters documented in source (relay states are discrete on/off/cycle)
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: SEQUP and SEQDOWN are multi-step sequences but parameters are embedded in command; not broken out as macro steps in source
```

## Safety
```yaml
confirmation_required_for:
  - relay_cycle  # initiates a power cycle; new SNMP commands during the 3-second cycle are ignored
  - restart  # reboots the device
  - all_off  # cuts power to all connected equipment
interlocks:
  - DEACTIVATE must be issued before RS232 relay commands to prevent front panel switch from overriding serial control
  - SNMP cycle commands must use -r 0 (no retries) to prevent multiple power cycles
  - DHCPOFF must be issued before setting network parameters via RS232 or changes will be lost on network connection
  # UNRESOLVED: no voltage/current ratings or load limits stated in source
```

## Notes

- SNMP relay control uses OID `1.3.6.4.47857.101.{N}` with integer values: 0=OFF, 1=ON, 2=CYCLE (3-second off-wait-on).
- The power cycle duration is hard-coded at 3 seconds and cannot be changed.
- If a new SNMP command is received while a cycle is in progress, the new command is ignored.
- Factory reset restores IP to 192.168.1.77, baud rate to 19200, and enables DHCP.
- RS-232 EOL can be CR, LF+CR, or CR+LF; the firmware waits for CR to detect end of command.
- SNMP community string is limited to 8 characters, lowercase alphanumeric only.
- IP address changes via RS-232 require a power cycle to take effect.
- SNMP community changes via RS-232 require a RESTART to take effect.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: SNMP GET/read operations not documented — only snmpset described -->
<!-- UNRESOLVED: whether relay/pod 4 exists on the iP 15 hardware (source mentions 1,2,3 or 4 but only 3 pods shown in RS232 commands) -->
<!-- UNRESOLVED: RS-232 data bits, parity, stop bits, flow control parameters not stated -->

## Provenance

```yaml
source_domains:
  - juicegoose.com
source_urls:
  - https://www.juicegoose.com/resources/manuals/ip-series-manual-rev-6-2023/download
retrieved_at: 2026-04-30T04:33:08.696Z
last_checked_at: 2026-06-03T07:13:06.889Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:13:06.889Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 actions verified (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 data bits, parity, stop bits, and flow control not stated in source"
- "SNMP port not explicitly stated in source"
- "whether relay 4 exists on this model (source says 1,2,3 or 4 but only pods 1-3 documented)"
- "SNMP port not explicitly stated in source (standard is 161)"
- "not stated in source"
- "SNMP GET/getnext queries for reading relay state not documented in source"
- "no continuously variable parameters documented in source (relay states are discrete on/off/cycle)"
- "SEQUP and SEQDOWN are multi-step sequences but parameters are embedded in command; not broken out as macro steps in source"
- "no voltage/current ratings or load limits stated in source"
- "firmware version compatibility not stated in source"
- "SNMP GET/read operations not documented — only snmpset described"
- "whether relay/pod 4 exists on the iP 15 hardware (source mentions 1,2,3 or 4 but only 3 pods shown in RS232 commands)"
- "RS-232 data bits, parity, stop bits, flow control parameters not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
