---
spec_id: admin/global-cache-unified-tcp-api
schema_version: ai4av-public-spec-v1
revision: 1
title: "Global Caché Unified TCP API Control Spec"
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
  - redocly.github.io
source_urls:
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
  - https://gcapi.docs.apiary.io/
  - "https://redocly.github.io/redoc/?url=https://dl.dropbox.com/s/bnkx6ov4g5z4bxe/GCapi_generated3.yaml?dl=1&nocors"
  - https://www.globalcache.com/files/docs/API-GC-IRL.pdf
  - https://www.globalcache.com/files/docs/API_GC-IRE.pdf
retrieved_at: 2026-06-02T02:55:57.411Z
last_checked_at: 2026-06-02T08:25:11.879Z
generated_at: 2026-06-02T08:25:11.879Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-model firmware version compatibility ranges; protocol version number for the Unified TCP API itself."
  - "API port is TCP, not serial; serial data is bridged via a separate TCP port (4999/5000), not configured here"
  - "serial baud rate, flow control, parity, stop bits, cable type are set via set_SERIAL; network config via set_NET; sensor notify via set_SENSORNOTIFY. These are command payloads rather than continuous variables; not enumerated here."
  - "source does not document multi-step control sequences; remove or populate from operator-supplied procedures."
  - "per-model firmware version compatibility ranges; protocol version of the Unified TCP API; maximum TCP socket idle timeout; exact mapping of Flex Link cable model numbers to cable_id."
verification:
  verdict: verified
  checked_at: 2026-06-02T08:25:11.879Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions have literal wire-level matches in the source and the spec covers the full command catalogue with no extra commands remaining. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Global Caché Unified TCP API Control Spec

## Summary
Unified TCP control API for the Global Caché GC-100, iTach, Flex, and Global Connect product families. The API exposes network configuration, IR transmit/learn/receive, serial port bridging, relay control, sensor input, and HDMI matrix/CEC operations over a raw TCP socket on port 4998.

<!-- UNRESOLVED: per-model firmware version compatibility ranges; protocol version number for the Unified TCP API itself. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 4998
serial:
  baud_rate: 0  # UNRESOLVED: API port is TCP, not serial; serial data is bridged via a separate TCP port (4999/5000), not configured here
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # inferred from getstate, get_NET, get_IR, get_SERIAL, get_RELAY, get_SENSORNOTIFY, getactive, getversion, getdevices, get_IRL, receiveIR, CEC RX
- routable        # inferred from HDMI matrix setstate input/output selection
```

## Actions
```yaml
- id: getversion
  label: Get device version
  kind: query
  command: "getversion[,{module}]\r"
  params:
    - name: module
      type: integer
      description: Module address (0-9). Optional; omitted for module 0.

- id: getdevices
  label: Get device capabilities
  kind: query
  command: "getdevices\r"
  params: []

- id: blink
  label: Blink device LED (GC-100)
  kind: action
  command: "blink,{mode}\r"
  params:
    - name: mode
      type: integer
      description: "0 = disable blink, 1 = enable blink"
  notes: "GC-100 only. No response is sent."

- id: get_NET
  label: Get network configuration
  kind: query
  command: "get_NET,{module}:{port}\r"
  params:
    - name: module
      type: integer
      description: Module address (0; GC-100: 0|1)
    - name: port
      type: integer
      description: "Port address (0; GC-100: 0|1)"

- id: set_NET
  label: Set network configuration
  kind: action
  command: "set_NET,{module}:{port},{cfglock},{IPconfig},{IPaddr},{subnet},{gateway}\r"
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address
    - name: cfglock
      type: string
      description: "UNLOCKED or LOCKED"
    - name: IPconfig
      type: string
      description: "STATIC or DHCP"
    - name: IPaddr
      type: string
      description: IPv4 address
    - name: subnet
      type: string
      description: IPv4 subnet mask
    - name: gateway
      type: string
      description: IPv4 gateway
  notes: "Not supported on iTach, Flex, or Global Connect."

- id: get_IR
  label: Get IR port mode
  kind: query
  command: "get_IR,{module}:{port}\r"
  params:
    - name: module
      type: integer
      description: Module address (GC-100: 2|4|5; iTach/Flex/Global Connect: 1)
    - name: port
      type: integer
      description: Port address (GC-100: 1-3; iTach: 1-3; Flex: 1; Global Connect: 1-3)

- id: set_IR
  label: Set IR port mode
  kind: action
  command: "set_IR,{module}:{port},{mode}\r"
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address
    - name: mode
      type: string
      description: "IR, BL2_BLASTER, IR_NOCARRIER, IR_BLASTER, IRTRIPORT, IRTRIPORT_BLASTER, SENSOR, SENSOR_NOTIFY, SERIAL, RECEIVER, LED_LIGHTING"
  notes: "GC-100 resets after a successful set_IR. For Flex, port parameter is ignored and must be 1."

- id: sendir
  label: Transmit IR code
  kind: action
  command: "sendir,{module}:{port},{ID},{freq},{repeat},{offset},{on1},{off1},...,{onN},{offN}\r"
  params:
    - name: module
      type: integer
      description: Module address (GC-100: 2|4|5; iTach/Flex/Global Connect: 1)
    - name: port
      type: integer
      description: Port address (1-3)
    - name: ID
      type: integer
      description: Arbitrary ID 0-65535 echoed in completeir response
    - name: freq
      type: integer
      description: "Carrier frequency Hz (GC-100: 20000-500000; others: 15000-500000)"
    - name: repeat
      type: integer
      description: "Repeat count (GC-100: 1-31; iTach: 1-50; Flex/Global Connect: 1-20)"
    - name: offset
      type: integer
      description: "Preamble offset (GC-100: 1-255; others: 1-383); used only if repeat > 1, must be odd"
    - name: onX
      type: integer
      description: "On pulse count (GC-100: 1-50000; Flex/Global Connect: 4-50000)"
    - name: offX
      type: integer
      description: "Off pulse count (GC-100: 1-50000; Flex/Global Connect: 4-50000)"

- id: stopir
  label: Stop IR transmission
  kind: action
  command: "stopir,{module}:{port}\r"
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address (1-3)

- id: get_IRL
  label: Enable IR Learner
  kind: action
  command: "get_IRL\r"
  params: []
  notes: "Streams IR codes to originating client until stop_IRL or connection close."

- id: stop_IRL
  label: Disable IR Learner
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
      description: "Module address (1; iTach/Flex/Global Connect only)"
    - name: port
      type: integer
      description: "Port address (1-3)"
    - name: mode
      type: string
      description: "enabled or disabled"

- id: get_SERIAL
  label: Get serial port configuration
  kind: query
  command: "get_SERIAL,{module}:{port}\r"
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: port
      type: integer
      description: "Port address (1)"

- id: set_SERIAL
  label: Set serial port configuration
  kind: action
  command: "set_SERIAL,{module}:{port},{baudrate},{flowcontrol/duplex},{parity}[,{stopbits}][,{cable_id}]\r"
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: port
      type: integer
      description: "Port address (1)"
    - name: baudrate
      type: integer
      description: "1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200 (Flex: 300-115200)"
    - name: flowcontrol_or_duplex
      type: string
      description: "FLOW_NONE, FLOW_HARDWARE, DUPLEX_HALF, DUPLEX_FULL"
    - name: parity
      type: string
      description: "PARITY_NO, PARITY_ODD, PARITY_EVEN"
    - name: stopbits
      type: string
      description: "STOPBITS_1, STOPBITS_2 (Global Connect and Flex only)"
    - name: cable_id
      type: string
      description: "CABLE_3 (RS232), CABLE_4 (RS485) - Flex only"

- id: get_RELAY
  label: Get configurable relay type (Flex)
  kind: query
  command: "get_RELAY,{module}:{address}\r"
  params:
    - name: module
      type: integer
      description: "Module address (1; Flex with Flex Link Relay & Sensor Cable only)"
    - name: address
      type: integer
      description: "Logical relay address (1-4)"

- id: set_RELAY
  label: Set configurable relay type (Flex)
  kind: action
  command: "set_RELAY,{module}:{address},{type}\r"
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: address
      type: integer
      description: "Logical relay address (1-4)"
    - name: type
      type: string
      description: "SPST, SPDT, DPDT, Disabled (Unavailable is response-only)"

- id: getstate_relay
  label: Get state of relay output
  kind: query
  command: "getstate,{module}:{port}[,{mode}]\r"
  params:
    - name: module
      type: integer
      description: "Module address (GC-100: 3; iTach: 1; Flex: 1; Global Connect: 1)"
    - name: port
      type: integer
      description: "Port address (GC-100: 1-3; iTach: 1-3; Flex: 1-4; Global Connect: 1-6)"
    - name: mode
      type: string
      description: "Optional: notify enables state change notification"

- id: setstate_relay
  label: Set state of relay output
  kind: action
  command: "setstate,{module}:{port},{state}[,{period}]\r"
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Port address"
    - name: state
      type: integer
      description: "0=off/open, 1=on/closed (SPST; on1 SPDT/DPDT), 2=on2 (SPDT/DPDT)"
    - name: period
      type: integer
      description: "Optional pulse period in ms (1-4294967295)"

- id: getstate_sensor
  label: Get state of sensor input
  kind: query
  command: "getstate,{module}:{port}[,{mode}]\r"
  params:
    - name: module
      type: integer
      description: "Module address (GC-100: 3|4; iTach: 1; Flex: 2; Global Connect: 1)"
    - name: port
      type: integer
      description: "Port address (1-3)"
    - name: mode
      type: string
      description: "Optional: notify enables state change notification"

- id: get_SENSORNOTIFY
  label: Get sensor-notify settings
  kind: query
  command: "get_SENSORNOTIFY,{module}:{port}\r"
  params:
    - name: module
      type: integer
      description: "Module address (Flex: 2; Global Connect: 1)"
    - name: port
      type: integer
      description: "Port address (Flex: 1-4; Global Connect: 1-3)"

- id: set_SENSORNOTIFY
  label: Set sensor-notify settings
  kind: action
  command: "set_SENSORNOTIFY,{module}:{port},{n_port},{n_interval}[,{debounce}]\r"
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Port address"
    - name: n_port
      type: integer
      description: "UDP destination port (0=all notifications disabled; 1-65535=UDP port)"
    - name: n_interval
      type: integer
      description: "Periodic notification interval in seconds (0=disabled; 1-65535)"
    - name: debounce
      type: string
      description: "Minimum state duration (10us-1s); e.g. 100ms, 500us, 1s; default 100ms; unit defaults to s"

- id: getstate_matrix
  label: Get state of matrix switcher input-output selection
  kind: query
  command: "getstate,{module}:{in_port}[,{mode}]\r"
  params:
    - name: module
      type: integer
      description: "Module address (1; Global Connect HM only)"
    - name: in_port
      type: integer
      description: "Input port address (1-3)"
    - name: mode
      type: string
      description: "Optional: notify enables state change notification"

- id: setstate_matrix
  label: Set matrix switcher input-output selection
  kind: action
  command: "setstate,{module}:{in_port},{out_port}\r"
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: in_port
      type: integer
      description: "Input port address (1-3); 0 disables the specified out_port"
    - name: out_port
      type: integer
      description: "Output port address (1-N); 0 disables the specified in_port"

- id: getactive
  label: Get active state of matrix switcher ports
  kind: query
  command: "getactive,{module}\r"
  params:
    - name: module
      type: integer
      description: "Module address (1; Global Connect HM only)"

- id: cec_tx
  label: Send HDMI CEC message
  kind: action
  command: "CEC,{module}:{out_port},TX,{message}\r"
  params:
    - name: module
      type: integer
      description: "Module address (1; Global Connect SW only)"
    - name: out_port
      type: integer
      description: "Output port address (1)"
    - name: message
      type: string
      description: "Colon-delimited ASCII hex bytes (e.g. 40:04); max 16 bytes"

- id: cec_rx
  label: Enable/disable HDMI CEC receive
  kind: action
  command: "CEC,{module}:{out_port},RX,{enable}\r"
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: out_port
      type: integer
      description: "Output port address (1)"
    - name: enable
      type: string
      description: "enabled/on/1 enables monitoring; disabled/off/0 disables"
```

## Feedbacks
```yaml
- id: version
  type: string
  description: "Firmware version string returned by getversion (e.g. 3.2-12, 710-2000-20)"

- id: devices_list
  type: string
  description: "Multi-line device list returned by getdevices, terminated by endlistdevices"

- id: network_config
  type: string
  description: "NET,<module>:<port>,<cfglock>,<IPconfig>,<IPaddr>,<subnet>,<gateway>"

- id: ir_mode
  type: string
  description: "IR,<module>:<port>,<mode>"

- id: serial_config
  type: string
  description: "SERIAL,<module>:<port>,<baudrate>,<flowcontrol/duplex>,<parity>[,<stopbits>][,<cable_id>]"

- id: relay_type
  type: string
  description: "RELAY,<module>:<port>,<type> (SPST, SPDT, DPDT, Disabled, Unavailable)"

- id: relay_state
  type: enum
  values: [0, 1, 2]
  description: "state,<module>:<port>,<state>; 0=off, 1=on/on1, 2=on2"

- id: sensor_state
  type: enum
  values: [0, 1]
  description: "state,<module>:<port>,<state>; 0=off/open, 1=on/closed"

- id: sensor_notify_config
  type: string
  description: "SENSORNOTIFY,<module>:<port>,<n_port>,<n_interval>,[debounce]"

- id: matrix_state
  type: integer
  description: "state,<module>:<in_port>,<state>; state=0 means input port disabled"

- id: matrix_active
  type: string
  description: "Multi-line active port listing from getactive, terminated by endactive"

- id: ir_complete
  type: string
  description: "completeir,<module>:<port>,<ID> (or busyir)"

- id: ir_learner_status
  type: string
  description: "'IR Learner Enabled' or 'IR Learner Disabled'"

- id: ir_learned_code
  type: string
  description: "Streamed IR code strings in Global Caché IR Format while IR learner is enabled"

- id: received_ir
  type: string
  description: "Streamed IR codes from receiveIR mode"

- id: cec_tx_ack
  type: string
  description: "CEC,<module>:<port>,TX,<message>,<acknowledge> (ACK, !ACK, NACK, or none for broadcast accepted)"

- id: cec_rx_message
  type: string
  description: "CEC,<module>:<port>,RX,<message>,<acknowledge>"

- id: error_response
  type: string
  description: "<error_prefix><error_code> per the API Errors tables (e.g. ERR_1:1,014; ERR SL001; ERR RO002; ERR SW011; unknowncommand 21)"
```

## Variables
```yaml
# UNRESOLVED: serial baud rate, flow control, parity, stop bits, cable type are set via set_SERIAL; network config via set_NET; sensor notify via set_SENSORNOTIFY. These are command payloads rather than continuous variables; not enumerated here.
```

## Events
```yaml
- id: statechange
  type: string
  description: "statechange,<module>:<port>,<state> (GC-100 TCP change notification for Sensor class modules)"

- id: udp_statechange
  type: string
  description: "IGMP multicast UDP statechange for sensor ports (Sensor class only), follows getstate response format"

- id: tcp_statechange
  type: string
  description: "<state_response>,<module>:<port>,<state> streamed to the client that enabled notify on getstate (iTach, Flex, Global Connect)"

- id: cec_rx_event
  type: string
  description: "CEC,<module>:<port>,RX,<message>,<acknowledge> streamed while CEC RX is enabled"
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step control sequences; remove or populate from operator-supplied procedures.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- TCP API port is **4998** for control; serial data is bridged on TCP ports **4999**/**5000** (per-product, see Serial section).
- Commands are case sensitive and each request is a single line of printable text terminated with carriage return (ASCII 13).
- Required parameters use `<>`; optional use `[]`; parameters are comma-delimited.
- Devices acquire IP via DHCP; fallback to default static IP if no DHCP server.
- GC-100 resets after a successful `set_IR` request.
- For iTach default: ports 1-2 are `IR`, port 3 is `IR_BLASTER`; `IR_BLASTER` is supported only on port 3 for iTach and Global Connect.
- For Flex, the port parameter on `set_IR`/`get_IR` is ignored and must be `1`.
- `set_NET` is not supported on iTach, Flex, or Global Connect.
- Relay state is not persistent through reset/power-cycle and reverts to `0` (off/open).
- Sensor debounce default is `100ms`; unit abbreviations `us`/`ms`/`s`; bare integer assumed seconds.
- CEC unicast messages retry up to 2 times (3 total attempts) and return `!ACK` plus `ERR SW011` on final failure.
- IR sendir `offset` value must always be odd when `repeat > 1`.
- IR `<on>`/`<off>` states have an 80μS minimum duration; on a 60kHz carrier that is ≥ 4.8 pulse counts (round up to 5+).

<!-- UNRESOLVED: per-model firmware version compatibility ranges; protocol version of the Unified TCP API; maximum TCP socket idle timeout; exact mapping of Flex Link cable model numbers to cable_id. -->

## Provenance

```yaml
source_domains:
  - globalcache.com
  - gcapi.docs.apiary.io
  - redocly.github.io
source_urls:
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
  - https://gcapi.docs.apiary.io/
  - "https://redocly.github.io/redoc/?url=https://dl.dropbox.com/s/bnkx6ov4g5z4bxe/GCapi_generated3.yaml?dl=1&nocors"
  - https://www.globalcache.com/files/docs/API-GC-IRL.pdf
  - https://www.globalcache.com/files/docs/API_GC-IRE.pdf
retrieved_at: 2026-06-02T02:55:57.411Z
last_checked_at: 2026-06-02T08:25:11.879Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:25:11.879Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions have literal wire-level matches in the source and the spec covers the full command catalogue with no extra commands remaining. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-model firmware version compatibility ranges; protocol version number for the Unified TCP API itself."
- "API port is TCP, not serial; serial data is bridged via a separate TCP port (4999/5000), not configured here"
- "serial baud rate, flow control, parity, stop bits, cable type are set via set_SERIAL; network config via set_NET; sensor notify via set_SENSORNOTIFY. These are command payloads rather than continuous variables; not enumerated here."
- "source does not document multi-step control sequences; remove or populate from operator-supplied procedures."
- "per-model firmware version compatibility ranges; protocol version of the Unified TCP API; maximum TCP socket idle timeout; exact mapping of Flex Link cable model numbers to cable_id."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
