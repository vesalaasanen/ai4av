---
spec_id: admin/global-cache-itachwf2-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Global Cache iTach WF2 Series Control Spec"
manufacturer: "Global Cache"
model_family: "iTach WF2IR"
aliases: []
compatible_with:
  manufacturers:
    - "Global Cache"
  models:
    - "iTach WF2IR"
    - "iTach WF2SL"
    - "iTach WF2CC"
    - "iTach IP2IR"
    - "iTach IP2SL"
    - "iTach IP2CC"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - globalcache.com
source_urls:
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
retrieved_at: 2026-04-30T04:31:02.945Z
last_checked_at: 2026-06-02T01:48:10.257Z
generated_at: 2026-06-02T01:48:10.257Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the unified Global Cache TCP API v1.1.2 which covers GC-100, iTach, Flex, and Global Connect families; commands that are not supported on the iTach product family are listed in source but excluded from this spec."
  - "cfglock/IPconfig/IPaddr/subnet/gateway field structures not enumerated in summary form."
  - "source does not enumerate variable slots as discrete settable parameters;"
  - "iTach-specific support for UDP change notification not"
  - "receiveIR is listed in source as supported"
  - "source does not describe any multi-step sequences that should"
  - "source does not document safety warnings, interlock procedures,"
verification:
  verdict: verified
  checked_at: 2026-06-02T01:48:10.257Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 spec actions are present verbatim in source; iTach-inapplicable commands (set_NET, get_RELAY, receiveIR, getactive, CEC) correctly excluded; transport port 4998 confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Global Cache iTach WF2 Series Control Spec

## Summary
The iTach family (WiFi and wired Ethernet variants WF2IR/WF2SL/WF2CC and IP2IR/IP2SL/IP2CC) is a line of network-attached control endpoints exposing IR, serial, and contact-closure ports. This spec covers the unified TCP API used to discover devices, configure modules, and control I/O. Primary transport is raw TCP to port 4998; a secondary raw-TCP serial bridge listens on port 4999 for SL variants (with multiport mode enabled).

<!-- UNRESOLVED: source document is the unified Global Cache TCP API v1.1.2 which covers GC-100, iTach, Flex, and Global Connect families; commands that are not supported on the iTach product family are listed in source but excluded from this spec. -->

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
- queryable  # inferred from getversion/getdevices/get_NET/get_IR/get_SERIAL/getstate query commands
- routable   # inferred from setstate input/output selection and set_IR mode selection
```

## Actions
```yaml
- id: getversion
  label: Get device version
  kind: query
  command: "getversion"
  params: []

- id: getdevices
  label: Get device capabilities
  kind: query
  command: "getdevices"
  params: []

- id: blink_enable
  label: Blink device LED (enable)
  kind: action
  command: "blink,1"
  params: []

- id: blink_disable
  label: Blink device LED (disable)
  kind: action
  command: "blink,0"
  params: []

- id: get_NET
  label: Get network configuration
  kind: query
  command: "get_NET,{module}:{port}"
  params:
    - name: module
      type: integer
      description: Module address (always 0 for network config on iTach)
    - name: port
      type: integer
      description: Port/connector address (always 1 for network config)

- id: get_IR
  label: Get IR port mode
  kind: query
  command: "get_IR,{module}:{port}"
  params:
    - name: module
      type: integer
      description: Module address (1 for iTach IR module)
    - name: port
      type: integer
      description: Port/connector address (1-3)

- id: set_IR
  label: Set IR port mode
  kind: action
  command: "set_IR,{module}:{port},{mode}"
  params:
    - name: module
      type: integer
      description: Module address (1 for iTach IR module)
    - name: port
      type: integer
      description: Port/connector address (1-3)
    - name: mode
      type: enum
      values: [IR, IR_BLASTER, SENSOR, SENSOR_NOTIFY, LED_LIGHTING]
      description: |
        Port I/O mode. IR_BLASTER supported only on port 3.
        LED_LIGHTING is iTach-specific. SENSOR/SENSOR_NOTIFY for polled/notify sensor mode.

- id: sendir
  label: Transmit IR code
  kind: action
  command: "sendir,{module}:{port},{ID},{freq},{repeat},{offset},{on1},{off1},{on2},{off2},...,{onN},{offN}"
  params:
    - name: module
      type: integer
      description: Module address (1 for iTach IR module)
    - name: port
      type: integer
      description: Port/connector address (1-3)
    - name: ID
      type: integer
      description: Code ID echoed in completeir response (0-65535)
    - name: freq
      type: integer
      description: Carrier frequency in Hz (15000-500000)
    - name: repeat
      type: integer
      description: Repeat count (1-50 for iTach)
    - name: offset
      type: integer
      description: Preamble offset (1-383); must be odd when repeat > 1
    - name: on_off_sequence
      type: string
      description: Alternating on/off pulse counts; equal count of on and off values

- id: stopir
  label: Stop IR transmission
  kind: action
  command: "stopir,{module}:{port}"
  params:
    - name: module
      type: integer
      description: Module address (1 for iTach IR module)
    - name: port
      type: integer
      description: Port/connector address (1-3)

- id: get_IRL
  label: Enable IR Learner
  kind: action
  command: "get_IRL"
  params: []

- id: stop_IRL
  label: Disable IR Learner
  kind: action
  command: "stop_IRL"
  params: []

- id: get_SERIAL
  label: Get serial port configuration
  kind: query
  command: "get_SERIAL,{module}:{port}"
  params:
    - name: module
      type: integer
      description: Module address (1 for iTach serial module)
    - name: port
      type: integer
      description: Port/connector address (1)

- id: set_SERIAL
  label: Set serial port configuration
  kind: action
  command: "set_SERIAL,{module}:{port},{baudrate},{flowcontrol},{parity},{stopbits}"
  params:
    - name: module
      type: integer
      description: Module address (1 for iTach serial module)
    - name: port
      type: integer
      description: Port/connector address (1)
    - name: baudrate
      type: integer
      description: Baud rate (300-115200; all values in range supported on iTach)
    - name: flowcontrol
      type: enum
      values: [FLOW_NONE, FLOW_HARDWARE]
      description: Flow control mode
    - name: parity
      type: enum
      values: [PARITY_NO, PARITY_ODD, PARITY_EVEN]
      description: Parity bit mode
    - name: stopbits
      type: enum
      values: [STOPBITS_1, STOPBITS_2]
      description: Stop bit mode

- id: getstate_relay
  label: Get state of relay output (CC variant)
  kind: query
  command: "getstate,{module}:{port}[,{mode}]"
  params:
    - name: module
      type: integer
      description: Module address (1 for iTach CC/relay module)
    - name: port
      type: integer
      description: Port/connector address (1-3)
    - name: mode
      type: enum
      values: [notify]
      description: Optional; pass "notify" to enable TCP change notifications

- id: setstate_relay
  label: Set state of relay output (CC variant)
  kind: action
  command: "setstate,{module}:{port},{state}"
  params:
    - name: module
      type: integer
      description: Module address (1 for iTach CC/relay module)
    - name: port
      type: integer
      description: Port/connector address (1-3)
    - name: state
      type: enum
      values: ["0", "1"]
      description: 0 = off (open), 1 = on (closed) for SPST

- id: getstate_sensor
  label: Get state of sensor input (IR port in SENSOR mode)
  kind: query
  command: "getstate,{module}:{port}[,{mode}]"
  params:
    - name: module
      type: integer
      description: Module address (1 for iTach IR module when port is in SENSOR mode)
    - name: port
      type: integer
      description: Port/connector address (1-3)
    - name: mode
      type: enum
      values: [notify]
      description: Optional; pass "notify" to enable TCP change notifications
```

## Feedbacks
```yaml
- id: version
  type: string
  description: Firmware version string returned by getversion (e.g. "710-2000-XX")

- id: device_capability
  type: string
  description: Multi-line response from getdevices; one line per module in the format `device,<module>,<ports> <type>`. Response terminated by `endlistdevices`. Example iTach IP2IR: `device,0,0 ETHERNET` and `device,1,3 IR`.

- id: network_config
  type: string
  description: Response from get_NET in the format `NET,<module>:<port>,<cfglock>,<IPconfig>,<IPaddr>,<subnet>,<gateway>`. UNRESOLVED: cfglock/IPconfig/IPaddr/subnet/gateway field structures not enumerated in summary form.

- id: ir_port_mode
  type: string
  description: Response from get_IR/set_IR in the format `IR,<module>:<port>,<mode>`

- id: serial_config
  type: string
  description: Response from get_SERIAL/set_SERIAL in the format `SERIAL,<module>:<port>,<baudrate>,<flowcontrol>,<parity>[,stopbits]`

- id: relay_state
  type: enum
  values: ["0", "1"]
  description: State of relay output; 0 = off (open), 1 = on (closed)

- id: sensor_state
  type: enum
  values: ["0", "1"]
  description: State of sensor input; 0 = off (open), 1 = on (closed)

- id: completeir
  type: string
  description: Response when sendir completes successfully: `completeir,<module>:<port>,<ID>`

- id: busyir
  type: string
  description: Response when sendir is rejected because the port is busy transmitting a different IR code

- id: ir_learner_status
  type: enum
  values: [IR Learner Enabled, IR Learner Disabled]
  description: Response confirming get_IRL / stop_IRL activation

- id: stopir_echo
  type: string
  description: Echo of the stopir request from the device (for all products except GC-100): `stopir,<module>:<port>`

- id: ir_code_stream
  type: string
  description: Streamed IR code strings in Global Cache IR Format while IR Learner is active (module/port always "1")
```

## Variables
```yaml
# UNRESOLVED: source does not enumerate variable slots as discrete settable parameters;
# all device configuration is performed via the command set above (get_NET/set_NET,
# get_IR/set_IR, get_SERIAL/set_SERIAL, getstate/setstate).
```

## Events
```yaml
- id: statechange_tcp
  description: |
    TCP state change notification. Streamed in the format
    `statechange,<module>:<port>,<state>` when notify mode is enabled on a
    sensor or relay port. Notification persists for the life of the TCP
    connection of the client that enabled it. Source: Appendix C.

- id: sensor_statechange_udp
  description: |
    UDP change notification for sensor class modules. Delivered as a
    multicast UDP message in the same format as the sensor getstate response.
    Configured via set_SENSORNOTIFY (notify port, interval, debounce).
    UNRESOLVED: iTach-specific support for UDP change notification not
    explicitly confirmed in source tables (set_SENSORNOTIFY row lists
    Flex and Global Connect only).

- id: receiveIR_stream
  description: |
    Streamed IR code strings (Global Cache IR Format) from receiveIR
    receive mode. UNRESOLVED: receiveIR is listed in source as supported
    only on Global Connect IR product line per the parameter table;
    applicability to iTach WF2IR not confirmed.
```

## Macros
```yaml
# UNRESOLVED: source does not describe any multi-step sequences that should
# be encoded as macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures,
# or power-on sequencing requirements. Smooth Continuous IR Repeat section
# warns of runaway-volume scenarios when an IR repeat request is interrupted
# mid-transmission, but this is a usage guideline, not a device interlock.
```

## Notes
- Source is the unified Global Cache TCP API v1.1.2 which covers GC-100, iTach, Flex, and Global Connect product lines. The IR/Serial/Relay class commands that are explicitly not supported on iTach (e.g. `get_RELAY`/`set_RELAY`, `set_NET`, `receiveIR`, `CEC`, `getactive`) are excluded from the Actions section per the source's compatibility tables.
- The iTach supports up to 8 simultaneous TCP API connections on port 4998.
- For SL variants, raw TCP connections to port 4999 provide a transparent network-to-serial bridge. iTach supports 4 simultaneous connections on this bridge only when multiport mode is enabled via the device's web configuration. The IP2SL/WF2SL hardware exposes a single serial port.
- IR module default mode on iTach: ports 1 and 2 default to `IR` (emitter); port 3 defaults to `IR_BLASTER`.
- For set_SERIAL on iTach, all baud rates in the range 300-115200 are supported (Flex and Global Connect support a restricted subset of specific values).
- `set_SERIAL` on iTach does not accept a `cable_id` parameter (that is Flex-only).
- `setstate` on iTach CC does not accept the optional `period` (pulse) parameter (that is Flex-only).
- For state values on iTach CC, only `0` and `1` are valid. State `2` (on2 for SPDT/DPDT) is Flex-only.
- A `completeir` response is sent when IR transmission completes. `busyir` is returned if a different IR code is currently transmitting on the requested port.
- `set_NET` is not supported on iTach; network configuration must be performed via the device's web configuration pages.</mm:think>Spec drafted from refined Unified TCP API v1.1.2. iTach-only commands kept; Flex/GC-100/GC-only rows excluded.

## Provenance

```yaml
source_domains:
  - globalcache.com
source_urls:
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
retrieved_at: 2026-04-30T04:31:02.945Z
last_checked_at: 2026-06-02T01:48:10.257Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T01:48:10.257Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 spec actions are present verbatim in source; iTach-inapplicable commands (set_NET, get_RELAY, receiveIR, getactive, CEC) correctly excluded; transport port 4998 confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the unified Global Cache TCP API v1.1.2 which covers GC-100, iTach, Flex, and Global Connect families; commands that are not supported on the iTach product family are listed in source but excluded from this spec."
- "cfglock/IPconfig/IPaddr/subnet/gateway field structures not enumerated in summary form."
- "source does not enumerate variable slots as discrete settable parameters;"
- "iTach-specific support for UDP change notification not"
- "receiveIR is listed in source as supported"
- "source does not describe any multi-step sequences that should"
- "source does not document safety warnings, interlock procedures,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
