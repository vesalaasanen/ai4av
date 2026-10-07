---
spec_id: admin/globalcache-ip2cc
schema_version: ai4av-public-spec-v1
revision: 2
title: "Global Caché iTach IP2CC Control Spec"
manufacturer: "Global Caché"
model_family: "iTach IP2CC"
aliases: []
compatible_with:
  manufacturers:
    - "Global Caché"
  models:
    - "iTach IP2CC"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - globalcache.com
source_urls:
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
  - https://www.globalcache.com/files/docs/datasheet_itach_ip.pdf
  - https://www.globalcache.com/files/docs/QS_iTachIP_distrib.pdf
retrieved_at: 2026-09-26T14:23:20.829Z
last_checked_at: 2026-09-26T14:23:20.829Z
generated_at: 2026-09-26T14:23:20.829Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:20.829Z
  matched_actions: 7
  action_count: 7
  confidence: high
  summary: "Seven IP2CC-supported requests match exact family matrices and learner hardware evidence; seven response feedbacks add no action units; unsupported IDs retired."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-26
---

# Global Caché iTach IP2CC Control Spec

## Summary

Exact iTach IP2CC catalog from Global Caché Unified TCP API v1.1.2, PN 200113-01, effective April 25, 2024. The manufacturer iTach IP datasheet and quick-start establish three contact-closure outputs and an internal IR learner. The seven supported requests below comprise three common queries, relay query/set and learner enable/disable. The API identifies IP2CC firmware by the family prefix 710-1008-XX but supplies no exact minimum firmware version.

Relay control uses module 1, ports 1–3, and states 0/open or 1/closed. IP2CC has no documented serial or IR output port; its internal IR learner is a separate capability. Family-specific exclusions are explicit below. Despite the historical slug, this is a local TCP API, not the Control Tower cloud API.

## Transport
```yaml
protocols:
  - "tcp"
tcp:
  port: 4998
  encoding: "printable ASCII text"
  request_terminator_hex: "0D"
  response_terminator_hex: "0D"
  maximum_simultaneous_connections: 8
  connection_modes:
    - "momentary: request, response, disconnect"
    - "persistent: multiple requests and responses"
auth:
  type: "UNRESOLVED"
  notes: "The source specifies no authentication procedure and does not explicitly establish its absence."
notes: "Command names and parameters are case sensitive. Commas delimit positional arguments; a colon separates module and port. Every template below includes CR as \\r. Multiple response lines are individually CR-terminated."
```

## Traits
```yaml
- "queryable"
```

## Actions
```yaml
- id: "relay_getstate"
  label: "Get Relay State"
  kind: "query"
  params:
    - name: "port"
      type: "integer"
      min: 1
      max: 3
  command: "getstate,1:{port}\r"
  response_format: "state,1:{port},{state}\r"
  notes: "Response state 0 means off/open and 1 means on/closed. The optional notify mode is not supported in the iTach relay column."
- id: "relay_setstate"
  label: "Set Relay State"
  kind: "action"
  params:
    - name: "port"
      type: "integer"
      min: 1
      max: 3
    - name: "state"
      type: "integer"
      min: 0
      max: 1
      description: "0 = off/open; 1 = on/closed (SPST)."
  command: "setstate,1:{port},{state}\r"
  response_format: "state,1:{port},{state}\r"
  notes: "Relay state is not persistent through reset or power-cycle and reverts to 0/off/open. State 2 and the optional timed period belong to Flex, not iTach IP2CC."
- id: "get_version"
  label: "Get Device Firmware Version"
  kind: "query"
  params: []
  command: "getversion\r"
  response_format: "{version}\r"
  notes: "The iTach reply is a bare version string; the IP2CC family pattern is 710-1008-XX. The version,<module>,<version> wrapper and optional module selector belong to GC-100 and are not used here. XX is source notation, not a literal firmware value."
- id: "get_devices"
  label: "Get Device Capabilities"
  kind: "query"
  params: []
  command: "getdevices\r"
  notes: "Each module produces device,<module>,<ports> <type> followed by CR; the last line is endlistdevices followed by CR. There is one ASCII space before the type. The iTach column permits modules 0..1 and port counts 0..3; IP2CC uses Ethernet and relay hardware. Exact IP2CC enumeration output is not supplied as a source example and is not invented here. Subtypes belong to Global Connect in this source."
- id: "get_network_config"
  label: "Get Network Configuration"
  kind: "query"
  params: []
  command: "get_NET,0:1\r"
  response_format: "NET,0:1,{cfglock},{ipconfig},{ipaddr},{subnet},{gateway}\r"
  notes: "cfglock is UNLOCKED or LOCKED; ipconfig is STATIC or DHCP. IP address, subnet and gateway are IPv4 values. Source defaults are UNLOCKED and DHCP. Companion set_NET is not supported on iTach; configure network settings using the device web pages."
- id: "get_IRL"
  label: "Enable Internal IR Learner"
  kind: "action"
  params: []
  command: "get_IRL\r"
  response_format: "IR Learner Enabled\r"
  notes: "While enabled, captured IR sequences stream to this originating client as complete Global Caché sendir-format code strings, each CR-terminated, with module and port fixed at 1. This is learned-code data, not an IP2CC IR transmission capability. Learning remains enabled until this client sends stop_IRL or its connection closes."
- id: "stop_IRL"
  label: "Disable Internal IR Learner"
  kind: "action"
  params: []
  command: "stop_IRL\r"
  response_format: "IR Learner Disabled\r"
  notes: "Use the client connection that enabled the learner."
```

## Feedbacks
```yaml
- id: "relay_state"
  type: "enum"
  values: ["0", "1"]
  response_format: "state,1:{port},{state}\r"
  source_actions: ["relay_getstate", "relay_setstate"]
  notes: "0=open, 1=closed. This is a command reply; no relay subscription/unsolicited statechange support is claimed for IP2CC."
- id: "network_config"
  type: "object"
  response_format: "NET,0:1,{cfglock},{ipconfig},{ipaddr},{subnet},{gateway}\r"
  source_action: "get_network_config"
  notes: "cfglock UNLOCKED|LOCKED; ipconfig STATIC|DHCP; three IPv4 fields."
- id: "device_capabilities"
  type: "object"
  response_format: "device,{module},{ports} {type}\r"
  terminator: "endlistdevices\r"
  source_action: "get_devices"
  notes: "Collect all module lines through endlistdevices. IP2CC has Ethernet networking and three relay outputs; an exact model-specific reply transcript is not supplied. Global Connect subtype extensions are not claimed."
- id: "ir_learned_code"
  type: "string"
  response_format: "sendir,1:1,{id},{freq},{repeat},{offset},{pulse_pairs}\r"
  source_action: "get_IRL"
  notes: "The source example begins sendir,1:1,1,36429,..., not IR <IR_code>. Module/port are fixed1; code ID is a separate field. Preserve the complete learned string for use with a supported IR transmitter. IP2CC cannot transmit it."
- id: "device_version"
  type: "string"
  response_format: "{version}\r"
  source_action: "get_version"
  notes: "IP2CC firmware family pattern710-1008-XX; no GC-100 version wrapper."
- id: "learner_status"
  type: "string"
  values: ["IR Learner Enabled", "IR Learner Disabled"]
  notes: "Each status line ends with CR."
- id: "api_error"
  type: "object"
  response_format: "ERR_{module}:{port},{code}\r"
  notes: "Use the iTach error codes below. The address may be0:0 when a request is incomplete; source example getversion without CR returns ERR_0:0,016."
```

## Variables
```yaml
[]
```

## Events
```yaml
- id: "ir_learner_code"
  response_format: "sendir,1:1,{id},{freq},{repeat},{offset},{pulse_pairs}\r"
  description: "Captured code sent to the client that enabled get_IRL; stream ends when that client sends stop_IRL or disconnects."
```

## Macros
```yaml
[]
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: "The manufacturer rates IP2CC normally-open contacts at24V AC/DC,0.5A and describes isolated low-voltage switching. Relay outputs reset open. These are physical limits, not documented API confirmation or interlock mechanisms."
```

## Notes

### Source applicability and connection setup

The API support matrices, not the generic family introduction, determine command availability. Common requests getversion/getdevices/get_NET are marked for iTach. The relay table explicitly names WF2CC/IP2CC; get_IRL/stop_IRL are marked for iTach and the manufacturer quick-start states every iTach has an internal learner. Its short-distance learning function is distinct from receiveIR, which the API assigns only to Global Connect IR modules.

The iTach IP quick-start specifies DHCP by default and address192.168.1.70 for defaulted devices without DHCP. iHelp discovers device multicast beacons and displays details within one minute. This is discovery guidance, not an invented wire discovery API. Use Ethernet and appropriate device power, then its web configuration as needed. No HTTP control endpoints or authentication scheme are inferred from the web UI.

The IR learner requires a remote held within about2.5cm/1inch of the learner; the quick-start identifies the small hole to the right of the power connector. No passive long-range IR receiver or IR output port is documented for IP2CC. The learner emits data in the Global Caché IR format; this does not make sendir a callable IP2CC command.

### Learned-code fields

API p15 references sendir parameter definitions on p13 for returned code data. In the iTach column, code ID is0..65535; carrier frequency15000..500000Hz; repeat1..50; offset1..383; on/off pulse counts1..50000. AppendixA requires an odd offset (used when repeat is greater than1), equal on/off counts and each on/off duration at least80microseconds (pulse count divided by frequency). These are source format constraints for understanding learned data, not an IP2CC transmit API. The module and port values in learned codes are fixed at1. Preserve the complete returned data; do not replace it with an invented IR prefix or assume a universal fixed ID/frequency.

### iTach error inventory

The iTach prefix is `ERR_<module>:<port>,`, followed by a three-digit code and CR. It is not the `ERR ` prefix used by Flex/Global Connect. The unified API lists these common iTach codes:

| Code | Meaning |
| --- | --- |
| 001 | invalid command (unknown) |
| 002 | invalid module address |
| 003 | invalid port address |
| 016 | no carriage return |
| 023 | invalid parameter |
| 027 | settings locked |

For completeness, the same iTach column also lists class-specific codes:014 invalid port mode;004 invalid ID;005 invalid frequency;006 invalid repeat;007 invalid offset;008 invalid pulsecount;010 uneven pulsecounts;020 code too long;018 not a sensor or relay. These are family error definitions, not evidence that IP2CC exposes the corresponding IR-output/sensor commands or that the learner returns every one of them. No IP2CC-specific relay error matrix is supplied. The RO/IR/SL/SI/SW-prefixed Flex/Global Connect codes from the old draft are not mapped onto iTach.

### Commands excluded by model

- blink and network setter set_NET: GC-100-only in the applicable support matrices.
- Relay notify mode: Flex/Global Connect; timed period and state2: Flex only. IP2CC provides only its documented polling/set requests.
- get_RELAY/set_RELAY configurable logical relays: Flex FLC-RS only; IP2CC has fixed SPST contact closures.
- get_SERIAL/set_SERIAL and TCP serial bridging: iTach IP2SL/WF2SL, not IP2CC. No duplex or baud parameters are exposed here.
- get_IR/set_IR/sendir/stopir and IR-port sensor getstate: iTach IP2IR/WF2IR, not IP2CC.
- receiveIR and HDMI getactive/CEC/switch routing: Global Connect modules, not IP2CC.
- get_SENSORNOTIFY/set_SENSORNOTIFY: Flex/Global Connect; IP2CC is not a sensor-input device.

### Removed legacy IDs

| Section | ID | Source-backed reason |
| --- | --- | --- |
| Actions | relay_getstate_notify | iTach relay notify cell is blank. |
| Actions | relay_setstate_pulse | Timed period is only in the Flex column. |
| Actions | get_serial_config | Serial settings apply to IP2SL/WF2SL. |
| Actions | set_serial_config | Serial settings apply to IP2SL/WF2SL. |
| Actions | get_ir_mode | IR-port settings apply to IP2IR/WF2IR. |
| Actions | set_ir_mode | IR-port settings apply to IP2IR/WF2IR. |
| Actions | send_ir | IR transmission applies to IP2IR/WF2IR. |
| Actions | stop_ir | IR transmission applies to IP2IR/WF2IR. |
| Actions | receive_ir | receiveIR is Global Connect-only. |
| Feedbacks | serial_config | Reply to unsupported serial commands. |
| Feedbacks | ir_port_mode | Reply to unsupported IR-port commands. |
| Feedbacks | ir_transmit_status | Reply to unsupported IR-output commands. |
| Events | relay_state_change | No iTach relay subscription in the table. |
| Events | ir_received_code | Formerly assigned to unsupported receiveIR; internal learner stream has a separate event ID. |

Seven prior action IDs and four prior feedback IDs remain. Corrected get_NET address0:1, bare version reply, learner sendir-format data and iTach error mappings replace unsupported old representations. Source does not specify command timeout/retry values or establish authentication absence. No hardware testing was performed.

### Sources

- Global Caché Unified TCP API v1.1.2, PN200113-01, effective April25,2024: https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf (full primary PDF/layout; especially pp2–3,6,8–10,13–15,21,41–42).
- iTach IP datasheet PN060110-01 ver.1: https://www.globalcache.com/files/docs/datasheet_itach_ip.pdf (IP2CC hardware scope, ratings and internal IR learning in every unit).
- iTach IP Quick Start PN120209-02 ver.6: https://www.globalcache.com/files/docs/QS_iTachIP_distrib.pdf (network setup and internal learner).

## Provenance

```yaml
source_domains:
  - globalcache.com
source_urls:
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
  - https://www.globalcache.com/files/docs/datasheet_itach_ip.pdf
  - https://www.globalcache.com/files/docs/QS_iTachIP_distrib.pdf
retrieved_at: 2026-09-26T14:23:20.829Z
last_checked_at: 2026-09-26T14:23:20.829Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:20.829Z
matched_actions: 7
action_count: 7
confidence: high
summary: "Seven IP2CC-supported requests match exact family matrices and learner hardware evidence; seven response feedbacks add no action units; unsupported IDs retired."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
