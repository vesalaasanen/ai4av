---
spec_id: admin/global-cach-universal-gc-device
schema_version: ai4av-public-spec-v1
revision: 1
title: "Global Caché Universal GC Device Control Spec"
manufacturer: "Global Caché"
model_family: GC-100
aliases: []
compatible_with:
  manufacturers:
    - "Global Caché"
  models:
    - GC-100
    - GC-100-06
    - GC-100-12
    - GC-100-18
    - iTach
    - "iTach IP2IR"
    - "iTach IP2SL"
    - "iTach IP2CC"
    - "iTach WF2IR"
    - "iTach WF2SL"
    - "iTach WF2CC"
    - "Flex WiFi"
    - "Flex Ethernet"
    - "Global Connect IR"
    - "Global Connect SL"
    - "Global Connect RL"
    - "Global Connect SW"
    - "Global Connect HM"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - globalcache.com
  - gcapi.docs.apiary.io
source_urls:
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
  - https://gcapi.docs.apiary.io/
  - https://www.globalcache.com/downloads/
retrieved_at: 2026-05-27T13:27:53.895Z
last_checked_at: 2026-06-02T01:48:09.249Z
generated_at: 2026-06-02T01:48:09.249Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-product port counts and per-product feature availability require source lookup against each model variant"
  - "source documents no multi-step sequences beyond individual command examples"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "per-product command support matrix requires cross-referencing the Product Family column in the source against each listed compatible model; this spec captures the unified command surface but cannot guarantee every command works on every model without per-model verification."
  - "maximum simultaneous TCP connections per serial port (Flex/Global Connect = 8; iTach = 4 if multiport mode enabled; GC-100 = 1) is per-product and not encoded in Transport."
  - "error code prefix varies by product (GC-100 uses `unknowncommand ` and `ERR_<module>:<port>,`; iTach/Flex/Global Connect use `ERR `). Error responses documented in source Section 5."
verification:
  verdict: verified
  checked_at: 2026-06-02T01:48:09.249Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched verbatim to source command entries; transport parameters (ports 4998, 4999) confirmed; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Global Caché Universal GC Device Control Spec

## Summary
Unified TCP API spec for Global Caché networked control devices (GC-100, iTach, Flex, Global Connect families). Covers IR, serial, relay, sensor, and HDMI matrix/switch control via raw TCP socket on port 4998. Serial-bridging uses dedicated TCP port 4999.

<!-- UNRESOLVED: per-product port counts and per-product feature availability require source lookup against each model variant -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 4998  # API control port
auth:
  type: none  # inferred: no auth procedure in source
```

```yaml
# Secondary TCP service for transparent serial bridging (per Section 4.4.2)
protocols:
  - tcp
  - serial
addressing:
  port: 4999  # Serial bridge port (5000 also used on GC-100-12/18)
serial:
  baud_rate: 9600  # default; configurable via set_SERIAL
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # inferred from getversion, getdevices, get_NET, get_IR, get_SERIAL, get_RELAY, getstate, get_SENSORNOTIFY, getactive queries
- routable        # inferred from getstate/setstate on HDMI matrix/switch module
- powerable       # inferred indirectly (relay/switch state controls power on attached loads)
```

## Actions
```yaml
# ===== COMMON COMMANDS =====
- id: getversion
  label: Get device firmware version
  kind: query
  command: "getversion[,{module}]\r"
  params:
    - name: module
      type: integer
      required: false
      description: Module number 0-9 (omit for default module)
  notes: "Terminate with CR (ASCII 13). Response: version,<module>,<version>"

- id: getdevices
  label: Enumerate device capabilities
  kind: query
  command: "getdevices\r"
  params: []
  notes: "Returns device list with module, ports, type, subtype"

- id: blink
  label: Blink power LED (GC-100 only)
  kind: action
  command: "blink,{mode}\r"
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=blink disabled, 1=blink enabled"
  notes: "GC-100 only; no response"

- id: get_NET
  label: Get network configuration
  kind: query
  command: "get_NET,{module}:{port}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
  notes: "Response: NET,<module>:<port>,<cfglock>,<IPconfig>,<IPaddr>,<subnet>,<gateway>"

- id: set_NET
  label: Set network configuration
  kind: action
  command: "set_NET,{module}:{port},{cfglock},{IPconfig},{IPaddr},{subnet},{gateway}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
    - name: cfglock
      type: enum
      values: [UNLOCKED, LOCKED]
    - name: IPconfig
      type: enum
      values: [STATIC, DHCP]
    - name: IPaddr
      type: string
      description: IPv4 address
    - name: subnet
      type: string
      description: IPv4 subnet
    - name: gateway
      type: string
      description: IPv4 gateway
  notes: "Not currently supported for iTach, Flex, or Global Connect"

# ===== IR COMMANDS =====
- id: get_IR
  label: Get IR port mode
  kind: query
  command: "get_IR,{module}:{port}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
  notes: "Response: IR,<module>:<port>,<mode>"

- id: set_IR
  label: Set IR port mode
  kind: action
  command: "set_IR,{module}:{port},{mode}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
    - name: mode
      type: enum
      values: [IR, BL2_BLASTER, IR_NOCARRIER, IR_BLASTER, IRTRIPORT, IRTRIPORT_BLASTER, SENSOR, SENSOR_NOTIFY, SERIAL, RECEIVER, LED_LIGHTING]
  notes: "GC-100 resets after successful set_IR"

- id: sendir
  label: Transmit IR code
  kind: action
  command: "sendir,{module}:{port},{ID},{freq},{repeat},{offset},{on1},{off1},...,{onN},{offN}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
    - name: ID
      type: integer
      description: "0-65535, echoed in completeir response"
    - name: freq
      type: integer
      description: "Carrier frequency Hz. GC-100: 20000-500000; others: 15000-500000"
    - name: repeat
      type: integer
      description: "GC-100: 1-31; iTach: 1-50; Flex/Global Connect: 1-20"
    - name: offset
      type: integer
      description: "Preamble offset (odd). GC-100: 1-255; others: 1-383"
    - name: on_pulses
      type: array
      description: "Variable number of on pulse counts (1-50000 GC-100; 4-50000 Flex/Global Connect)"
    - name: off_pulses
      type: array
      description: "Variable number of off pulse counts (1-50000 GC-100; 4-50000 Flex/Global Connect)"
  notes: "Response: completeir,<module>:<port>,<ID> or busyir"

- id: stopir
  label: Stop IR transmission
  kind: action
  command: "stopir,{module}:{port}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true

- id: get_IRL
  label: Enable IR learner
  kind: action
  command: "get_IRL\r"
  params: []
  notes: "Streams IR code strings until stop_IRL or connection close"

- id: stop_IRL
  label: Disable IR learner
  kind: action
  command: "stop_IRL\r"
  params: []

- id: receiveIR
  label: Enable/disable IR input
  kind: action
  command: "receiveIR,{module}:{port},{mode}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
    - name: mode
      type: enum
      values: [enabled, disabled]
  notes: "iTach, Flex, Global Connect only"

# ===== SERIAL COMMANDS =====
- id: get_SERIAL
  label: Get serial port configuration
  kind: query
  command: "get_SERIAL,{module}:{port}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
  notes: "Response: SERIAL,<module>:<port>,<baudrate>,<flowcontrol/duplex>,<parity>[,stopbits][,cable_id]"

- id: set_SERIAL
  label: Set serial port configuration
  kind: action
  command: "set_SERIAL,{module}:{port},{baudrate},{flow_or_duplex},{parity}[,{stopbits}][,{cable_id}]\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
    - name: baudrate
      type: enum
      values: [1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]
    - name: flow_or_duplex
      type: enum
      values: [FLOW_NONE, FLOW_HARDWARE, DUPLEX_HALF, DUPLEX_FULL]
    - name: parity
      type: enum
      values: [PARITY_NO, PARITY_ODD, PARITY_EVEN]
    - name: stopbits
      type: enum
      required: false
      values: [STOPBITS_1, STOPBITS_2]
    - name: cable_id
      type: enum
      required: false
      values: [CABLE_3, CABLE_4]
      description: "Flex only. CABLE_3=RS232, CABLE_4=RS485"

# ===== RELAY COMMANDS =====
- id: get_RELAY
  label: Get relay type
  kind: query
  command: "get_RELAY,{module}:{address}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: address
      type: integer
      required: true
      description: "1-4"
  notes: "Flex with Flex Link Relay & Sensor Cable only"

- id: set_RELAY
  label: Set relay type
  kind: action
  command: "set_RELAY,{module}:{address},{type}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: address
      type: integer
      required: true
    - name: type
      type: enum
      values: [SPST, SPDT, DPDT, Disabled]

- id: setstate_relay
  label: Set relay/sensor state
  kind: action
  command: "setstate,{module}:{port},{state}[,{period}]\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
    - name: state
      type: enum
      values: [0, 1, 2]
      description: "0=off/open, 1=on/closed SPST or on1 SPDT/DPDT, 2=on2 SPDT/DPDT"
    - name: period
      type: integer
      required: false
      description: "1-4294967295 ms pulse period"
  notes: "State not persistent through reset/power-cycle (reverts to 0)"

# ===== SENSOR COMMANDS =====
- id: getstate_sensor
  label: Get sensor input state
  kind: query
  command: "getstate,{module}:{port}[,{mode}]\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
    - name: mode
      type: enum
      required: false
      values: [notify]
      description: "Enable state change notification"
  notes: "Response: state,<module>:<port>,<state> where state is 0=off/open, 1=on/closed"

- id: get_SENSORNOTIFY
  label: Get sensor-notify settings
  kind: query
  command: "get_SENSORNOTIFY,{module}:{port}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
  notes: "Flex/Global Connect only"

- id: set_SENSORNOTIFY
  label: Set sensor-notify settings
  kind: action
  command: "set_SENSORNOTIFY,{module}:{port},{n_port},{n_interval}[,{debounce}]\r"
  params:
    - name: module
      type: integer
      required: true
    - name: port
      type: integer
      required: true
    - name: n_port
      type: integer
      description: "0=disable all notifications; 1-65535=UDP port"
    - name: n_interval
      type: integer
      description: "0=disable periodic; 1-65535 seconds"
    - name: debounce
      type: string
      required: false
      description: "Minimum duration 10us-1s. Default 100ms. Units: us, ms, s"
  notes: "Flex/Global Connect only"

# ===== HDMI MATRIX / SWITCH COMMANDS =====
- id: getstate_matrix
  label: Get matrix switcher input-output state
  kind: query
  command: "getstate,{module}:{in_port}[,{mode}]\r"
  params:
    - name: module
      type: integer
      required: true
    - name: in_port
      type: integer
      required: true
      description: "1-3 input port; 0 to disable"
    - name: mode
      type: enum
      required: false
      values: [notify]
  notes: "Global Connect (HM) only"

- id: setstate_matrix
  label: Set matrix switcher input-output
  kind: action
  command: "setstate,{module}:{in_port},{out_port}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: in_port
      type: integer
      required: true
    - name: out_port
      type: integer
      required: true
      description: "1-N output port; 0 to disable"
  notes: "Global Connect (HM) only. Selecting new input/output disables previous."

- id: getactive
  label: Get active state of matrix ports
  kind: query
  command: "getactive,{module}\r"
  params:
    - name: module
      type: integer
      required: true
  notes: "Global Connect (HM) only. Returns true/false per port based on connected device power"

# ===== CEC COMMANDS =====
- id: CEC_TX
  label: Send HDMI CEC message
  kind: action
  command: "CEC,{module}:{out_port},TX,{message}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: out_port
      type: integer
      required: true
      description: "Always 1"
    - name: message
      type: string
      required: true
      description: "Colon-delimited ASCII hex bytes (N<=16)"
  notes: "Global Connect (SW) only. Response: ACK, !ACK, NACK, or none"

- id: CEC_RX
  label: Enable/disable CEC receive monitoring
  kind: action
  command: "CEC,{module}:{out_port},RX,{enable}\r"
  params:
    - name: module
      type: integer
      required: true
    - name: out_port
      type: integer
      required: true
    - name: enable
      type: enum
      values: [enabled, on, "1", disabled, off, "0"]
  notes: "Global Connect (SW) only"
```

## Feedbacks
```yaml
- id: version
  type: string
  description: "Firmware version string from getversion response"

- id: devices
  type: array
  description: "Port capability list from getdevices response"

- id: network_config
  type: object
  description: "NET fields: cfglock, IPconfig, IPaddr, subnet, gateway"

- id: ir_mode
  type: enum
  values: [IR, BL2_BLASTER, IR_NOCARRIER, IR_BLASTER, IRTRIPORT, IRTRIPORT_BLASTER, SENSOR, SENSOR_NOTIFY, SERIAL, RECEIVER, LED_LIGHTING]
  description: "Current IR port mode"

- id: serial_config
  type: object
  description: "SERIAL fields: baudrate, flowcontrol/duplex, parity, stopbits, cable_id"

- id: relay_type
  type: enum
  values: [SPST, SPDT, DPDT, Disabled, Unavailable]
  description: "Logical relay type"

- id: io_state
  type: integer
  description: "0=off/open, 1=on/closed, 2=on2 for SPDT/DPDT"

- id: completeir
  type: string
  description: "IR transmit completion notification with module:port,ID"

- id: busyir
  type: string
  description: "Returned when port busy with different IR code"

- id: sensor_notify
  type: object
  description: "SENSORNOTIFY fields: n_port, n_interval, debounce"

- id: matrix_active
  type: object
  description: "Active state per HDMI port: IN/OUT lists with true/false"

- id: cec_ack
  type: enum
  values: [ACK, "!ACK", NACK, "none"]
  description: "CEC transmit acknowledge result"

- id: statechange
  type: string
  description: "Unsolicited TCP state change notification: statechange,<module>:<port>,<state>"
```

## Variables
```yaml
- id: serial_baudrate
  type: enum
  values: [1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]
  description: "Serial port baud rate (Flex supports 300-115200)"

- id: serial_flow_duplex
  type: enum
  values: [FLOW_NONE, FLOW_HARDWARE, DUPLEX_HALF, DUPLEX_FULL]

- id: serial_parity
  type: enum
  values: [PARITY_NO, PARITY_ODD, PARITY_EVEN]

- id: serial_stopbits
  type: enum
  values: [STOPBITS_1, STOPBITS_2]

- id: serial_cable
  type: enum
  values: [CABLE_3, CABLE_4]
  description: "Flex only. CABLE_3=RS232, CABLE_4=RS485"

- id: ir_carrier_freq
  type: integer
  description: "IR carrier Hz. GC-100: 20000-500000; others: 15000-500000"

- id: ir_repeat
  type: integer
  description: "GC-100: 1-31; iTach: 1-50; Flex/Global Connect: 1-20"

- id: sensor_debounce
  type: string
  description: "10us-1s, default 100ms. Units: us, ms, s"
```

## Events
```yaml
- id: statechange
  description: "Unsolicited TCP state change: statechange,<module>:<port>,<state>. GC-100 supports this for sensor class only. iTach/Flex/Global Connect requires getstate with mode=notify first."

- id: udp_sensor_notify
  description: "UDP multicast change notification (IGMP) for sensor class modules. Sent to configured n_port at n_interval. Format matches getstate response."

- id: completeir
  description: "IR transmission complete: completeir,<module>:<port>,<ID>"

- id: ir_code_received
  description: "Learned IR code stream: IR,<IR_code> (after get_IRL or receiveIR enabled)"
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences beyond individual command examples
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
All requests terminate with carriage return (ASCII 13). Commands and parameters case-sensitive. Connections can be momentary or persistent.

GC-100 supports 1 simultaneous TCP connection; iTach, Flex, and Global Connect support up to 8. Devices acquire IP via DHCP with static fallback.

Serial bridge uses dedicated TCP port 4999 (and 5000 on GC-100-12/18) for transparent raw data passthrough, separate from the control API on 4998. Flex and Global Connect serial also support stop bits 2; GC-100 and iTach are STOPBITS_1 only.

IR port mode set persists per port. GC-100 resets device after successful set_IR. Flex port parameter for set_IR is always 1.

Relay state is non-persistent: setstate output reverts to 0 (off/open) on reset or power-cycle. Pulse mode (period parameter) is transient.

CEC unicast messages are retried up to 2 additional times (3 total) before returning !ACK. Broadcast messages use logical address `F`.

Change notification requires `mode=notify` parameter on getstate for iTach/Flex/Global Connect. Notification persists for the life of the TCP connection. GC-100 requires web config enablement.

<!-- UNRESOLVED: per-product command support matrix requires cross-referencing the Product Family column in the source against each listed compatible model; this spec captures the unified command surface but cannot guarantee every command works on every model without per-model verification. -->
<!-- UNRESOLVED: maximum simultaneous TCP connections per serial port (Flex/Global Connect = 8; iTach = 4 if multiport mode enabled; GC-100 = 1) is per-product and not encoded in Transport. -->
<!-- UNRESOLVED: error code prefix varies by product (GC-100 uses `unknowncommand ` and `ERR_<module>:<port>,`; iTach/Flex/Global Connect use `ERR `). Error responses documented in source Section 5. -->

## Provenance

```yaml
source_domains:
  - globalcache.com
  - gcapi.docs.apiary.io
source_urls:
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
  - https://gcapi.docs.apiary.io/
  - https://www.globalcache.com/downloads/
retrieved_at: 2026-05-27T13:27:53.895Z
last_checked_at: 2026-06-02T01:48:09.249Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T01:48:09.249Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched verbatim to source command entries; transport parameters (ports 4998, 4999) confirmed; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-product port counts and per-product feature availability require source lookup against each model variant"
- "source documents no multi-step sequences beyond individual command examples"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "per-product command support matrix requires cross-referencing the Product Family column in the source against each listed compatible model; this spec captures the unified command surface but cannot guarantee every command works on every model without per-model verification."
- "maximum simultaneous TCP connections per serial port (Flex/Global Connect = 8; iTach = 4 if multiport mode enabled; GC-100 = 1) is per-product and not encoded in Transport."
- "error code prefix varies by product (GC-100 uses `unknowncommand ` and `ERR_<module>:<port>,`; iTach/Flex/Global Connect use `ERR `). Error responses documented in source Section 5."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
