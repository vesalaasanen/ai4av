---
schema_version: ai4av-public-spec-v1
device_id: globalcache/ip2cc
entity_id: globalcache_ip2cc
spec_id: admin/globalcache-ip2cc
revision: 1
author: admin
title: "GlobalCache IP2CC Control Spec"
status: published
manufacturer: GlobalCache
manufacturer_key: globalcache
model_family: IP2CC
aliases: []
compatible_with:
  manufacturers:
    - GlobalCache
  models:
    - IP2CC
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: globalcache_ip2cc_cloud.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T09:04:45.495Z
retrieved_at: 2026-04-27T09:04:45.495Z
last_checked_at: 2026-04-27T09:04:45.495Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:04:45.495Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions match source command tokens exactly; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# GlobalCache IP2CC Control Spec

## Summary
GlobalCache IP2CC (iTach IP2CC) is a network-to-CC (Control Crawler) gateway device. Controls equipment via IR transmission, and also provides relay and sensor I/O. The API is a unified TCP socket protocol on port 4998.

<!-- UNRESOLVED: IP2CC-specific command subset not enumerated separately in source; spec covers full iTach family. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 4998
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
queryable  # inferred: getversion, getdevices, getstate, get_IR, get_SERIAL commands present
routable   # inferred: HDMI matrix switch commands present
```

## Actions
```yaml
- id: getversion
  label: Get Device Version
  kind: action
  params:
    - name: module
      type: integer
      description: Module address 0-9 (optional; omits all modules)

- id: getdevices
  label: Get Device Capabilities
  kind: action
  params: []

- id: blink
  label: Blink Device LED
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=blink disabled, 1=blink enabled

- id: get_NET
  label: Get Network Configuration
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port (e.g., "0:1")

- id: set_NET
  label: Set Network Configuration
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port
    - name: cfglock
      type: string
      description: UNLOCKED or LOCKED
    - name: IPconfig
      type: string
      description: STATIC or DHCP
    - name: IPaddr
      type: string
      description: IPv4 address
    - name: subnet
      type: string
      description: IPv4 subnet mask
    - name: gateway
      type: string
      description: IPv4 gateway

- id: get_IR
  label: Get IR Port Mode
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port

- id: set_IR
  label: Set IR Port Mode
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port
    - name: mode
      type: string
      description: IR, BL2_BLASTER, IR_NOCARRIER, IR_BLASTER, IRTRIPORT, IRTRIPORT_BLASTER, SENSOR, SENSOR_NOTIFY, SERIAL, RECEIVER, LED_LIGHTING

- id: sendir
  label: Transmit IR Code
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port
    - name: ID
      type: integer
      description: "0-65535"
    - name: freq
      type: integer
      description: Carrier frequency Hz (15000-500000)
    - name: repeat
      type: integer
      description: "1-50"
    - name: offset
      type: integer
      description: "1-383"
    - name: pulses
      type: string
      description: "on1,off1,on2,off2,...,onN,offN"

- id: stopir
  label: Stop IR Transmission
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port

- id: get_IRL
  label: Enable IR Learner
  kind: action
  params: []

- id: stop_IRL
  label: Disable IR Learner
  kind: action
  params: []

- id: receiveIR
  label: Enable/Disable IR Input
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port
    - name: mode
      type: string
      description: enabled or disabled

- id: get_SERIAL
  label: Get Serial Port Configuration
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port

- id: set_SERIAL
  label: Set Serial Port Configuration
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port
    - name: baudrate
      type: integer
      description: 1200-115200
    - name: flowcontrol
      type: string
      description: FLOW_NONE or FLOW_HARDWARE
    - name: parity
      type: string
      description: PARITY_NO, PARITY_ODD, PARITY_EVEN
    - name: stopbits
      type: string
      description: STOPBITS_1 or STOPBITS_2 (optional)
    - name: cable_id
      type: string
      description: CABLE_3 or CABLE_4 (Flex only, optional)

- id: getstate_relay
  label: Get Relay State
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port
    - name: mode
      type: string
      description: notify (optional, enable notifications)

- id: setstate_relay
  label: Set Relay State
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port
    - name: state
      type: integer
      description: "0=off/open, 1=on/closed, 2=on2 (SPDT/DPDT)"
    - name: period
      type: integer
      description: Pulse period in ms 1-4294967295 (optional)

- id: getstate_sensor
  label: Get Sensor State
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port
    - name: mode
      type: string
      description: notify (optional, enable notifications)

- id: get_SENSORNOTIFY
  label: Get Sensor Notify Settings
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port

- id: set_SENSORNOTIFY
  label: Set Sensor Notify Settings
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:port
    - name: n_port
      type: integer
      description: UDP port (0=disabled)
    - name: n_interval
      type: integer
      description: Interval seconds (0=disabled)
    - name: debounce
      type: string
      description: Duration (10us-1s, optional)

- id: getstate_matrix
  label: Get Matrix Switch State
  kind: action
  params:
    - name: module_inport
      type: string
      description: Module:in_port
    - name: mode
      type: string
      description: notify (optional)

- id: setstate_matrix
  label: Set Matrix Switch Routing
  kind: action
  params:
    - name: module_inport
      type: string
      description: Module:in_port
    - name: out_port
      type: integer
      description: Output port (0=disable)

- id: getactive
  label: Get Active Matrix Ports
  kind: action
  params:
    - name: module
      type: integer
      description: Module address (1)

- id: CEC_TX
  label: Send CEC Message
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:out_port
    - name: message
      type: string
      description: Colon-delimited hex bytes

- id: CEC_RX
  label: Receive CEC Messages
  kind: action
  params:
    - name: module_port
      type: string
      description: Module:out_port
    - name: enable
      type: string
      description: enabled/on/1 or disabled/off/0
```

## Feedbacks
```yaml
- id: version_response
  label: Version Response
  type: string
  description: "version,<module>,<version>"

- id: device_response
  label: Device Capability Response
  type: string
  description: "device,<module>,<ports> <type>[_subtype] ... endlistdevices"

- id: IR_response
  label: IR Port Mode Response
  type: string
  description: "IR,<module>:<port>,<mode>"

- id: completeir
  label: IR Transmission Complete
  type: string
  description: "completeir,<module>:<port>,<ID>"

- id: busyir
  label: IR Port Busy
  type: string
  description: "busyir"

- id: stopir_response
  label: Stop IR Response
  type: string
  description: Echo of stopir request

- id: IRL_response
  label: IR Learner Response
  type: string
  description: "IR Learner Enabled", "IR,<IR_code>", "IR Learner Disabled"

- id: receiveIR_response
  label: IR Receive Response
  type: string
  description: "receiveIR,<module>:<port>,<mode>" followed by "IR,<IR_code>"

- id: SERIAL_response
  label: Serial Config Response
  type: string
  description: "SERIAL,<module>:<port>,<baudrate>,<flowcontrol/duplex>,<parity>[,stopbits][,cable_id]"

- id: state_response
  label: State Response
  type: string
  description: "state,<module>:<port>,<state>"

- id: NET_response
  label: Network Config Response
  type: string
  description: "NET,<module>:<port>,<cfglock>,<IPconfig>,<IPaddr>,<subnet>,<gateway>"

- id: RELAY_response
  label: Relay Config Response
  type: string
  description: "RELAY,<module>:<port>,<type>"

- id: SENSORNOTIFY_response
  label: Sensor Notify Response
  type: string
  description: "SENSORNOTIFY,<module>:<port>,<n_port>,<n_interval>[,debounce]"

- id: active_response
  label: Active Ports Response
  type: string
  description: "active,<module> OUT: <out_port1>,<state> ... IN: <in_port1>,<state> ... endactive,<module>"

- id: CEC_response
  label: CEC Response
  type: string
  description: "CEC,<module>:<port>,TX,<message>,<acknowledge>"

- id: statechange_notification
  label: State Change Notification
  type: string
  description: "statechange,<module>:<port>,<state>"

- id: error
  label: Error Response
  type: string
  description: "<error_prefix><error_code>"
```

## Variables
```yaml
# Network config
- id: network_cfglock
  label: Config Lock
  type: enum
  values: [UNLOCKED, LOCKED]

- id: network_IPconfig
  label: IP Configuration
  type: enum
  values: [STATIC, DHCP]

- id: network_IPaddr
  label: IP Address
  type: string

- id: network_subnet
  label: Subnet Mask
  type: string

- id: network_gateway
  label: Gateway
  type: string

# IR config
- id: IR_mode
  label: IR Port Mode
  type: enum
  values: [IR, BL2_BLASTER, IR_NOCARRIER, IR_BLASTER, IRTRIPORT, IRTRIPORT_BLASTER, SENSOR, SENSOR_NOTIFY, SERIAL, RECEIVER, LED_LIGHTING]

# Serial config
- id: serial_baudrate
  label: Baud Rate
  type: integer
  values: [1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]

- id: serial_flowcontrol
  label: Flow Control
  type: enum
  values: [FLOW_NONE, FLOW_HARDWARE]

- id: serial_parity
  label: Parity
  type: enum
  values: [PARITY_NO, PARITY_ODD, PARITY_EVEN]

- id: serial_stopbits
  label: Stop Bits
  type: enum
  values: [STOPBITS_1, STOPBITS_2]

# Relay config
- id: relay_type
  label: Relay Type
  type: enum
  values: [SPST, SPDT, DPDT, Disabled, Unavailable]

- id: relay_state
  label: Relay State
  type: enum
  values: [0, 1, 2]

# Sensor notify
- id: sensor_notify_port
  label: Notify Port
  type: integer
  description: UDP port for notifications (0=disabled)

- id: sensor_notify_interval
  label: Notify Interval
  type: integer
  description: Seconds between periodic notifications (0=disabled)

- id: sensor_debounce
  label: Debounce
  type: string
  description: Minimum duration for valid state (10us-1s)
```

## Events
```yaml
- id: IR_code_received
  label: IR Code Received
  description: Streamed IR code from receiveIR or IR learner
  params:
    - name: IR_code
      type: string
      description: IR code in GlobalCache format

- id: relay_state_change
  label: Relay State Change
  description: Notification when relay state changes
  params:
    - name: module_port
      type: string
    - name: state
      type: integer

- id: sensor_state_change
  label: Sensor State Change
  description: Notification when sensor state changes
  params:
    - name: module_port
      type: string
    - name: state
      type: integer
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings in source
```

## Notes
The Global Caché Unified TCP API spans multiple product families (GC-100, iTach, Flex, Global Connect). The IP2CC is an iTach family device supporting IR, serial, and relay functionality. Serial bridging runs on port 4999. No login or authentication required.

<!-- UNRESOLVED: IP2CC-specific command restrictions not enumerated separately in source. -->
<!-- UNRESOLVED: recommended retry/timeout values not stated. -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: globalcache_ip2cc_cloud.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T09:04:45.495Z
retrieved_at: 2026-04-27T09:04:45.495Z
last_checked_at: 2026-04-27T09:04:45.495Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:04:45.495Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions match source command tokens exactly; transport parameters verified."
```

## Known Gaps

```yaml
[]
```
