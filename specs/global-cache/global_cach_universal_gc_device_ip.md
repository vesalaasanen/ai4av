---
spec_id: admin/global-cache-universal-gc-device
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
    - iTach
    - Flex
    - "Global Connect"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - globalcache.com
  - gcapi.docs.apiary.io
source_urls:
  - https://www.globalcache.com/files/docs/API-GlobalIRDB_ver1.pdf
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
  - https://gcapi.docs.apiary.io/
retrieved_at: 2026-05-27T13:27:53.895Z
last_checked_at: 2026-05-27T15:36:45.304Z
generated_at: 2026-05-27T15:36:45.304Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T15:36:45.304Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 spec actions matched literally to source commands; transport (TCP port 4998, no auth) verified; bidirectional coverage complete at 100%."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Global Caché Universal GC Device Control Spec

## Summary
Unified TCP API for Global Caché device family (GC-100, iTach, Flex, Global Connect). Provides IR transmission/learning, serial bridging, relay control, sensor monitoring, HDMI matrix switching, and CEC messaging over raw TCP socket on port 4998.

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
# - powerable       (no explicit power commands - device always on when reachable)
# - routable        (HDMI matrix setstate for Global Connect HM)
# - queryable       (getversion, getdevices, getstate, get_NET, get_SERIAL, get_IR, get_RELAY, get_SENSORNOTIFY, getactive)
# - levelable       (not applicable)
```

## Actions
```yaml
# --- Common commands ---

- id: getversion
  label: Get Device Version
  kind: query
  params:
    - name: module
      type: integer
      description: "Module address 0-9 (optional; omit for device-level version)"

- id: getdevices
  label: Get Device Capabilities
  kind: query
  params: []

- id: blink
  label: Blink Device LED
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=blink disabled, 1=blink enabled (GC-100 only)"
  notes: GC-100 only. No response sent.

- id: get_NET
  label: Get Network Configuration
  kind: query
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Port address"

- id: set_NET
  label: Set Network Configuration
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Port address"
    - name: cfglock
      type: string
      description: "UNLOCKED or LOCKED"
    - name: IPconfig
      type: string
      description: "STATIC or DHCP"
    - name: IPaddr
      type: string
      description: "IPv4 address"
    - name: subnet
      type: string
      description: "IPv4 subnet mask"
    - name: gateway
      type: string
      description: "IPv4 gateway"
  notes: Not supported for iTach, Flex, or Global Connect.

# --- IR commands ---

- id: get_IR
  label: Get IR Port Mode
  kind: query
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Port address"

- id: set_IR
  label: Set IR Port Mode
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Port address"
    - name: mode
      type: string
      description: "IR, BL2_BLASTER, IR_NOCARRIER, IR_BLASTER, IRTRIPORT, IRTRIPORT_BLASTER, SENSOR, SENSOR_NOTIFY, SERIAL, RECEIVER, LED_LIGHTING"
  notes: GC-100 resets after successful set_IR.

- id: sendir
  label: Transmit IR Code
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Port address (1-3)"
    - name: ID
      type: integer
      description: "Arbitrary ID 0-65535, echoed in completeir response"
    - name: freq
      type: integer
      description: "Carrier frequency in Hz"
    - name: repeat
      type: integer
      description: "Number of transmissions"
    - name: offset
      type: integer
      description: "Preamble offset when repeat > 1"
    - name: pulse_pairs
      type: string
      description: "Comma-separated on1,off1,on2,off2,… pulse pair counts"

- id: stopir
  label: Stop IR Transmission
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Port address"

- id: get_IRL
  label: Enable IR Learner
  kind: action
  params: []
  notes: Streams learned IR codes until stop_IRL sent or connection closed.

- id: stop_IRL
  label: Disable IR Learner
  kind: action
  params: []

- id: receiveIR
  label: Enable/Disable IR Receive
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: port
      type: integer
      description: "Port address (1-3)"
    - name: mode
      type: string
      description: "enabled or disabled"
  notes: Streams received IR codes while enabled. iTach, Flex, Global Connect only.

# --- Serial commands ---

- id: get_SERIAL
  label: Get Serial Port Configuration
  kind: query
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: port
      type: integer
      description: "Port address (1)"

- id: set_SERIAL
  label: Set Serial Port Configuration
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: port
      type: integer
      description: "Port address (1)"
    - name: baudrate
      type: string
      description: "1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200"
    - name: flowcontrol
      type: string
      description: "FLOW_NONE or FLOW_HARDWARE"
    - name: parity
      type: string
      description: "PARITY_NO, PARITY_ODD, PARITY_EVEN"
    - name: stopbits
      type: string
      description: "STOPBITS_1, STOPBITS_2 (Global Connect and Flex only; optional)"
    - name: cable_id
      type: string
      description: "CABLE_3 (RS232) or CABLE_4 (RS485) - Flex only; optional"

# --- Relay commands ---

- id: get_RELAY
  label: Get Configurable Relay Type
  kind: query
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: address
      type: integer
      description: "Relay address (1-4)"
  notes: Flex with Flex Link Relay & Sensor Cable only.

- id: set_RELAY
  label: Set Configurable Relay Type
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: address
      type: integer
      description: "Relay address (1-4)"
    - name: type
      type: string
      description: "SPST, SPDT, DPDT, Disabled"
  notes: Flex with Flex Link Relay & Sensor Cable only.

- id: getstate_relay
  label: Get Relay Output State
  kind: query
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Relay port address"
    - name: mode
      type: string
      description: "notify - enable state change notification (optional)"
  notes: State reverts to 0 (off/open) after reset or power-cycle.

- id: setstate_relay
  label: Set Relay Output State
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Relay port address"
    - name: state
      type: integer
      description: "0=off/open, 1=on/closed SPST or on1 SPDT/DPDT, 2=on2 SPDT/DPDT"
    - name: period
      type: integer
      description: "Pulse period in ms (1-4294967295); optional"
  notes: State reverts to 0 (off/open) after reset or power-cycle.

# --- Sensor commands ---

- id: getstate_sensor
  label: Get Sensor Input State
  kind: query
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Sensor port address (1-3)"
    - name: mode
      type: string
      description: "notify - enable state change notification (optional)"

- id: get_SENSORNOTIFY
  label: Get Sensor Notify Settings
  kind: query
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Sensor port address"
  notes: Flex and Global Connect only.

- id: set_SENSORNOTIFY
  label: Set Sensor Notify Settings
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address"
    - name: port
      type: integer
      description: "Sensor port address"
    - name: n_port
      type: integer
      description: "UDP port for notifications (0=disable all)"
    - name: n_interval
      type: integer
      description: "Periodic interval in seconds (0=disable periodic)"
    - name: debounce
      type: string
      description: "Min state duration (10us-1s, default 100ms); optional"
  notes: Flex and Global Connect only.

# --- HDMI Matrix/Switch commands ---

- id: getstate_hdmi
  label: Get HDMI Matrix I/O Selection
  kind: query
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: in_port
      type: integer
      description: "Input port address (1-3, or 0 to query)"
    - name: mode
      type: string
      description: "notify - enable state change notification (optional)"
  notes: Global Connect (HM) only.

- id: setstate_hdmi
  label: Set HDMI Matrix I/O Selection
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: in_port
      type: integer
      description: "Input port (1-3) or 0 to disable out_port"
    - name: out_port
      type: integer
      description: "Output port (1-N) or 0 to disable in_port"
  notes: Global Connect (HM) only. Selecting new I/O disables previous selection.

- id: getactive
  label: Get Active State of HDMI Ports
  kind: query
  params:
    - name: module
      type: integer
      description: "Module address (1)"
  notes: Global Connect (HM) only. Reports whether active HDMI device connected per port.

- id: CEC_TX
  label: Send HDMI CEC Message
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: out_port
      type: integer
      description: "Output port (1)"
    - name: message
      type: string
      description: "Colon-delimited ASCII hex bytes (max 16 bytes)"
  notes: Global Connect (SW) only. Unicast requires ACK. Broadcast to logical address F.

- id: CEC_RX_enable
  label: Enable/Disable HDMI CEC Receive
  kind: action
  params:
    - name: module
      type: integer
      description: "Module address (1)"
    - name: out_port
      type: integer
      description: "Output port (1)"
    - name: enable
      type: string
      description: "enabled/on/1 or disabled/off/0"
  notes: Global Connect (SW) only. Streams received CEC messages while enabled.
```

## Feedbacks
```yaml
- id: version_response
  type: string
  description: "Device version string (e.g. 3.2-12, 710-1005-XX)"

- id: device_list
  type: string
  description: "List of device capabilities: module, ports, type/subtype"

- id: net_config
  type: string
  description: "Network config: cfglock, IPconfig, IPaddr, subnet, gateway"

- id: ir_mode
  type: string
  description: "IR port mode setting"

- id: completeir
  type: string
  description: "IR transmit complete acknowledgment with module:port,ID"

- id: busyir
  type: string
  description: "IR port busy - different code transmitting"

- id: ir_learner_code
  type: string
  description: "Learned IR code in Global Caché format"

- id: serial_config
  type: string
  description: "Serial port config: baudrate, flowcontrol, parity, stopbits, cable_id"

- id: relay_type
  type: string
  description: "Configurable relay type (SPST, SPDT, DPDT, Disabled, Unavailable)"

- id: relay_state
  type: enum
  values: ["0", "1", "2"]
  description: "0=off/open, 1=on/closed (SPST) or on1 (SPDT/DPDT), 2=on2 (SPDT/DPDT)"

- id: sensor_state
  type: enum
  values: ["0", "1"]
  description: "0=off/open, 1=on/closed"

- id: sensor_notify_config
  type: string
  description: "Sensor notify settings: n_port, n_interval, debounce"

- id: hdmi_io_state
  type: string
  description: "HDMI matrix input-output selection state"

- id: hdmi_active_ports
  type: string
  description: "Active HDMI port list with true/false per port"

- id: cec_acknowledge
  type: string
  description: "CEC message acknowledgment: ACK, !ACK, NACK, or none"

- id: error_response
  type: string
  description: "Error response with prefix and code (ERR 001-007, IR001-IR021, SL001-SL007, RO001-RO004, SI001-SI003, SW001-SW011)"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables in source - all parameters are discrete action params
```

## Events
```yaml
- id: statechange_notification
  description: "TCP state change notification: statechange,<module>:<port>,<state>"
  notes: GC-100 (sensor only, via web config). iTach/Flex/Global Connect via getstate notify mode.

- id: udp_sensor_notification
  description: "UDP multicast sensor state change notification to configured port"
  notes: All products, sensor class only. Configurable via set_SENSORNOTIFY.

- id: ir_receive_stream
  description: "Streamed received IR code when receiveIR enabled"
  notes: iTach, Flex, Global Connect only.

- id: ir_learner_stream
  description: "Streamed learned IR code when IR learner enabled"
  notes: All products. Persists until stop_IRL or connection close.

- id: cec_rx_stream
  description: "Streamed received CEC messages when CEC RX enabled"
  notes: Global Connect (SW) only.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Unified API across GC-100, iTach, Flex, and Global Connect product lines; module/port addressing varies by product.
- Commands are case-sensitive, terminated with carriage return (ASCII 13).
- Serial bridge runs on separate TCP ports (4999+) for transparent bidirectional serial communication, independent of the API port 4998.
- GC-100 resets after successful `set_IR`. GC-100 sends no response to `blink` command.
- `set_NET` not supported on iTach, Flex, or Global Connect.
- Configurable relay types (SPST/SPDT/DPDT) available only on Flex with Flex Link Relay & Sensor Cable.
- IR compressed format replaces repeated pulse-pairs with single alphanumeric characters (A-O).
- Max TCP connections: GC-100=1, iTach/Flex/Global Connect=8.
<!-- UNRESOLVED: default serial baud rate not stated — configured per-product -->
<!-- UNRESOLVED: UDP notification port for sensor change — configurable, no default stated -->
<!-- UNRESOLVED: data_bits for serial not explicitly listed as configurable parameter (assumed 8 in examples but not stated) -->

## Provenance

```yaml
source_domains:
  - globalcache.com
  - gcapi.docs.apiary.io
source_urls:
  - https://www.globalcache.com/files/docs/API-GlobalIRDB_ver1.pdf
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
  - https://gcapi.docs.apiary.io/
retrieved_at: 2026-05-27T13:27:53.895Z
last_checked_at: 2026-05-27T15:36:45.304Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T15:36:45.304Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 spec actions matched literally to source commands; transport (TCP port 4998, no auth) verified; bidirectional coverage complete at 100%."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
