---
schema_version: ai4av-public-spec-v1
device_id: global-cache/itachwf2-series
entity_id: global_cache_itachwf2_series
spec_id: admin/global-cache-itachwf2-series
revision: 1
author: admin
title: "Global Cache iTachWF2 Series Control Spec"
status: published
manufacturer: "Global Cache"
manufacturer_key: global-cache
model_family: "iTachWF2 Series"
aliases: []
compatible_with:
  manufacturers:
    - "Global Cache"
  models:
    - "iTachWF2 Series"
    - "WF2IR (710-1001-XX)"
    - "WF2SL (710-1007-XX)"
    - "WF2CC (710-1010-XX)"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: global_cache_itachwf2_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:44:23.596Z
retrieved_at: 2026-04-25T20:44:23.596Z
last_checked_at: 2026-04-25T20:44:23.596Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:44:23.596Z
  matched_actions: 25
  action_count: 25
  confidence: high
  summary: "All 25 spec actions matched literally in source; transport (TCP port 4998, no auth) verified; iTachWF2-focused subset of unified Global Cache API fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Global Cache iTachWF2 Series Control Spec

## Summary
The iTachWF2 Series is a WiFi-to-Ethernet gateway providing network-connected control of AV equipment via IR, serial, relay, and sensor modules. The device is controlled over raw TCP on port 4998 using Global Cache's unified TCP API. Module and port addressing follows the format `<module>:<port>`. No authentication is required.

<!-- UNRESOLVED: iTachWF2 Series specific module/port counts not enumerated separately in source; module ranges vary by product family -->

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
- queryable  # inferred from getversion, getdevices, get_IR, get_SERIAL, getstate, get_NET, getactive commands
- routable   # inferred from setstate matrix switching, IR send/receive commands
```

## Actions
```yaml
- id: getversion
  label: Get Device Version
  kind: action
  params:
    - name: module
      type: integer
      description: Module address (default 0)
- id: getdevices
  label: Get Device Capabilities
  kind: action
  params:
    - name: module
      type: integer
      description: Module address (default 0)
- id: blink
  label: Blink Device LED
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = blink disabled, 1 = blink enabled"
- id: get_NET
  label: Get Network Configuration
  kind: action
  params:
    - name: module
      type: integer
      description: Module address (default 0:1)
    - name: port
      type: integer
      description: Port address (default 1)
- id: set_NET
  label: Set Network Configuration
  kind: action
  params:
    - name: module
      type: integer
      description: Module address (default 0)
    - name: port
      type: integer
      description: Port address (default 1)
    - name: cfglock
      type: string
      description: "LOCKED or UNLOCKED"
    - name: IPconfig
      type: string
      description: "DHCP or STATIC"
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
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address (1–3)
- id: set_IR
  label: Set IR Port Mode
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address (1–3)
    - name: mode
      type: string
      description: "IR, IR_BLASTER, IRTRIPORT, IRTRIPORT_BLASTER, SENSOR, SENSOR_NOTIFY, SERIAL, RECEIVER, LED_LIGHTING"
- id: sendir
  label: Transmit IR Code
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address (1–3)
    - name: ID
      type: integer
      description: Code ID (0–65535)
    - name: freq
      type: integer
      description: Carrier frequency in Hz (15000–500000 for iTach/Flex/Global Connect)
    - name: repeat
      type: integer
      description: Repeat count (1–50 for iTach)
    - name: offset
      type: integer
      description: Preamble offset (1–383)
    - name: pulse_pairs
      type: array
      description: "On/off pulse count pairs (on1, off1, on2, off2, ...)"
- id: stopir
  label: Stop IR Transmission
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address (1–3)
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
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address
    - name: mode
      type: string
      description: "enabled or disabled"
- id: get_SERIAL
  label: Get Serial Port Configuration
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address
- id: set_SERIAL
  label: Set Serial Port Configuration
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address
    - name: baudrate
      type: integer
      description: Baud rate (300–115200 depending on product)
    - name: flowcontrol
      type: string
      description: "FLOW_NONE or FLOW_HARDWARE"
    - name: parity
      type: string
      description: "PARITY_NO, PARITY_ODD, or PARITY_EVEN"
    - name: stopbits
      type: string
      description: "STOPBITS_1 or STOPBITS_2 (optional)"
    - name: cable_id
      type: string
      description: "CABLE_3 (RS232) or CABLE_4 (RS485) (optional, Flex only)"
- id: get_RELAY
  label: Get Relay Configuration
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: address
      type: integer
      description: Logical relay address (1–4)
- id: set_RELAY
  label: Set Relay Configuration
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: address
      type: integer
      description: Logical relay address (1–4)
    - name: type
      type: string
      description: "SPST, SPDT, DPDT, or Disabled"
- id: getstate_relay
  label: Get Relay State
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address (1–3)
    - name: mode
      type: string
      description: "notify (optional, enables change notification)"
- id: setstate_relay
  label: Set Relay State
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address (1–3)
    - name: state
      type: integer
      description: "0 = off/open, 1 = on/closed, 2 = on2 (SPDT/DPDT only)"
    - name: period
      type: integer
      description: "Optional pulse period in milliseconds"
- id: getstate_sensor
  label: Get Sensor State
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address
    - name: mode
      type: string
      description: "notify (optional)"
- id: get_SENSORNOTIFY
  label: Get Sensor Notify Settings
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address
- id: set_SENSORNOTIFY
  label: Set Sensor Notify Settings
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: port
      type: integer
      description: Port address
    - name: n_port
      type: integer
      description: "UDP port for notifications (0 = disabled)"
    - name: n_interval
      type: integer
      description: "Notify interval in seconds (0 = disabled)"
    - name: debounce
      type: string
      description: "Optional debounce value (e.g., 100ms, 500us)"
- id: getstate_matrix
  label: Get Matrix Switcher State
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: in_port
      type: integer
      description: Input port address (1–3)
    - name: mode
      type: string
      description: "notify (optional)"
- id: setstate_matrix
  label: Set Matrix Switcher State
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: in_port
      type: integer
      description: "Input port (1–3), or 0 to disable"
    - name: out_port
      type: integer
      description: "Output port, or 0 to disable"
- id: getactive
  label: Get Active Matrix Port State
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
- id: CEC
  label: Send/Receive HDMI CEC Message
  kind: action
  params:
    - name: module
      type: integer
      description: Module address
    - name: out_port
      type: integer
      description: Output port address
    - name: mode
      type: string
      description: "TX (transmit) or RX (receive)"
    - name: message
      type: string
      description: "Colon-delimited ASCII hex bytes (max 16 bytes)"
    - name: enable
      type: string
      description: "For RX mode: enabled/on/1 or disabled/off/0"
```

## Feedbacks
```yaml
- id: version_response
  type: string
  description: Firmware version string
- id: device_response
  type: string
  description: "Module capabilities: device,<module>,<ports> <type>[subtype]"
- id: NET_response
  type: string
  description: "NET,<module>:<port>,<cfglock>,<IPconfig>,<IPaddr>,<subnet>,<gateway>"
- id: IR_response
  type: string
  description: "IR,<module>:<port>,<mode>"
- id: completeir
  type: string
  description: "completeir,<module>:<port>,<ID> — IR transmission complete"
- id: busyir
  type: string
  description: "busyir — port is busy transmitting different IR code"
- id: stopir_response
  type: string
  description: "stopir,<module>:<port> — IR transmission stopped"
- id: IR_learner_enabled
  type: string
  description: "IR Learner Enabled"
- id: IR_learner_disabled
  type: string
  description: "IR Learner Disabled"
- id: IR_code_learned
  type: string
  description: Learned IR code in Global Cache IR format
- id: receiveIR_response
  type: string
  description: "receiveIR,<module>:<port>,<mode>"
- id: SERIAL_response
  type: string
  description: "SERIAL,<module>:<port>,<baudrate>,<flowcontrol>,<parity>[,stopbits][,cable_id]"
- id: RELAY_response
  type: string
  description: "RELAY,<module>:<port>,<type>"
- id: relay_state
  type: string
  description: "state,<module>:<port>,<state>"
- id: sensor_state
  type: string
  description: "state,<module>:<port>,<state> — 0=off/open, 1=on/closed"
- id: SENSORNOTIFY_response
  type: string
  description: "SENSORNOTIFY,<module>:<port>,<n_port>,<n_interval>[,debounce]"
- id: matrix_state
  type: string
  description: "state,<module>:<in_port>,<state> — 0=disabled, 1=linked to output"
- id: active_response
  type: string
  description: "active,<module> with OUT:/IN: blocks listing port states"
- id: CEC_response
  type: string
  description: "CEC,<module>:<out_port>,<mode>,<message>,<acknowledge>"
- id: error_response
  type: string
  description: "Error in format <error_prefix><error_code> (e.g., ERR_1:1,014)"
- id: statechange_notification
  type: string
  description: "statechange,<module>:<port>,<state> — unsolicited change notification (GC-100, Flex, Global Connect)"
```

## Variables
```yaml
# UNRESOLVED: no discrete parameter variables found in source (all settable params are action-based)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event definitions specific to iTachWF2 Series;
# change notifications arrive via TCP connection or UDP multicast as documented in Appendix C
```

## Macros
```yaml
# UNRESOLVED: no explicit macro/sequence definitions in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "When reconfiguring logical relays (Flex with FLC-RS): set all affected ports to Disabled before changing relay type jumper settings"
  - "Smooth Continuous IR Repeat (iTach/Flex): choose minimal repeat count; if client connection is lost, IR transmission stops after remaining repeats complete"
# UNRESOLVED: power-on sequencing, voltage/current limits not stated in source
```

## Notes
- Command format: `<command>[,<module>:<port>[,<param1>[,<param2>]...]]` followed by carriage-return (ASCII 13)
- Responses echo the command with result parameters; errors return `<error_prefix><error_code>`
- IR carrier frequency range for iTachWF2: 15000–500000 Hz
- IR repeat count for iTachWF2 (WF2IR): 1–50
- iTachWF2 max simultaneous TCP connections: 8
- Serial module TCP port: 4999 (separate from main API port 4998)
- Change notification persistence: terminates when TCP connection closes
- No password, login, or authentication required for TCP API access
<!-- UNRESOLVED: iTachWF2-specific serial baud rate range not explicitly stated; source shows baud rates for other product families -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: WF2IR vs WF2SL vs WF2CC port counts and module ranges not separately enumerated for iTachWF2 Series -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: global_cache_itachwf2_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:44:23.596Z
retrieved_at: 2026-04-25T20:44:23.596Z
last_checked_at: 2026-04-25T20:44:23.596Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:44:23.596Z
matched_actions: 25
action_count: 25
confidence: high
summary: "All 25 spec actions matched literally in source; transport (TCP port 4998, no auth) verified; iTachWF2-focused subset of unified Global Cache API fully represented."
```

## Known Gaps

```yaml
[]
```
