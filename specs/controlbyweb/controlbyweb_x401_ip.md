---
spec_id: admin/controlbyweb-x401
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X401 Control Spec"
manufacturer: ControlByWeb
model_family: X401
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X401
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/05/400-series-users-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T14:45:14.095Z
last_checked_at: 2026-07-07T11:14:50.608Z
generated_at: 2026-07-07T11:14:50.608Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the generic X-400 Series; X401-specific I/O counts (relay count, analog input count, digital input count) are not enumerated in the source and must be confirmed per-device."
  - "source does not describe multi-step macros. Remove section if not applicable."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:14:50.608Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched literally to source commands. Transport parameters (port 80, port 502, basic auth) verified. Full protocol coverage confirmed. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X401 Control Spec

## Summary
The X401 is a ControlByWeb 400 Series I/O controller exposing relays, digital inputs, analog inputs, registers, and 1-Wire sensors over TCP/IP. This spec covers HTTP GET (XML/JSON), Modbus/TCP, SNMP, and MQTT/Sparkplug B interfaces as documented for the 400 Series product family.

<!-- UNRESOLVED: source describes the generic X-400 Series; X401-specific I/O counts (relay count, analog input count, digital input count) are not enumerated in the source and must be confirmed per-device. -->

## Transport
```yaml
protocols:
  - tcp  # HTTP, Modbus/TCP, MQTT (all over TCP)
addressing:
  port: 80  # default; port 502 for Modbus/TCP per source line 293; configurable under Advanced Network tab
  # Modbus/TCP default port per source: 502
auth:
  type: basic  # Base64-encoded user:password in HTTP Authorization header when User account enabled (source line 25)
  # When User account disabled (default), no password required (source line 11 "No Password")
```

## Traits
```yaml
- queryable  # inferred from query command examples (state.xml/json reads, Modbus register/coil reads)
- routable  # inferred from relay/output routing commands (relay1=0/1/2, Modbus Write Single Coil)
- powerable  # inferred from pulse relay and on/off relay commands (inferred from relay control examples)
```

## Actions
```yaml
# HTTP GET control (Section 1.1)
- id: read_state_xml
  label: Read state.xml
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []

- id: read_state_json
  label: Read state.json
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []

- id: read_custom_state_xml
  label: Read customState.xml
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []

- id: read_custom_state_json
  label: Read customState.json
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

- id: set_register_value
  label: Set Register (HTTP)
  kind: action
  command: "GET /state.xml?register1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: register_number
      type: integer
      description: 1-based register number per source example "register1"
    - name: value
      type: number
      description: Numeric register value (example: register1=25 or register1=10.5)

- id: relay_off
  label: Turn Relay Off
  kind: action
  command: "GET /state.xml?relay{relay}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: 1-based relay number (e.g. 1, 2)

- id: relay_on
  label: Turn Relay On
  kind: action
  command: "GET /state.xml?relay{relay}=1 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: 1-based relay number

- id: relay_pulse
  label: Pulse Relay (default duration)
  kind: action
  command: "GET /state.xml?relay{relay}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: 1-based relay number

- id: relay_pulse_custom_duration
  label: Pulse Relay (custom duration)
  kind: action
  command: "GET /state.json?pulseTime{relay}={seconds}&relay{relay}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: 1-based relay number
    - name: seconds
      type: number
      description: Pulse duration in seconds (example: 5, 15). MUST precede relay=2 (source line 100)

- id: set_on_time
  label: Set onTime counter reset
  kind: action
  command: "GET /state.xml?onTime{counter}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: counter
      type: integer
      description: 1-based counter number

- id: set_total_on_time
  label: Set totalOnTime counter reset
  kind: action
  command: "GET /state.xml?totalOnTime{counter}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: counter
      type: integer
      description: 1-based counter number

- id: set_counter_value
  label: Set counter value
  kind: action
  command: "GET /state.json?count{counter}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: counter
      type: integer
      description: 1-based counter number
    - name: value
      type: number
      description: Counter value (example: 200)

- id: combined_commands
  label: Multiple I/O commands in one request
  kind: action
  command: "GET /customState.xml?relay1=1&relay2=0 HTTP/1.1\r\n\r\n"
  params: []

- id: erase_log_txt
  label: Erase log.txt
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: erase_syslog_txt
  label: Erase syslog.txt
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

# Modbus/TCP (Section 2.1)
- id: modbus_read_coils
  label: Modbus Read Coils (FC 01 / 0x01)
  kind: query
  command: "Modbus FC 0x01 - Read Coils (relays and digital I/O configured as outputs)"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: coil_quantity
      type: integer
      description: From Modbus map in setup pages

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02 / 0x02)
  kind: query
  command: "Modbus FC 0x02 - Read Discrete Inputs (digital inputs and digital I/O configured as inputs)"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: input_quantity
      type: integer
      description: From Modbus map in setup pages

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03 / 0x03)
  kind: query
  command: "Modbus FC 0x03 - Read Holding Registers (Vin, sensors, registers, counters, analog inputs)"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: register_quantity
      type: integer
      description: From Modbus map in setup pages. Must be even (32-bit pairs). IEEE 754 floats.

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05 / 0x05)
  kind: action
  command: "Modbus FC 0x05 - Write Single Coil, value 0x00 (Off) or 0xFF (On)"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: output_value
      type: enum
      values: ["0x00", "0xFF"]
      description: 0x00=Off, 0xFF=On

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15 / 0x0F)
  kind: action
  command: "Modbus FC 0x0F - Write Multiple Coils, value range 0x0000 to 0xFFFF"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: output_value
      type: integer
      description: Bit-mask 0x0000 to 0xFFFF; 1 bit per coil

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16 / 0x10)
  kind: action
  command: "Modbus FC 0x10 - Write Multiple Registers (IEEE 754 floats, register count must be even)"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: register_quantity
      type: integer
      description: Must be even (32-bit pairs). Endianness per Advanced Network setup.

- id: modbus_pulse_relay
  label: Modbus Pulse Relay (FC 16, addresses 512-513)
  kind: action
  command: "Modbus FC 0x10 - Write 32-bit float pulse duration (seconds) to register pair 512-513 (PLC address 40513-40514) for relay 1"
  params:
    - name: duration_seconds
      type: number
      description: 32-bit float pulse duration in seconds

# SNMP (Section 3)
- id: snmp_get_request
  label: SNMP GetRequest
  kind: query
  command: "SNMP GetRequest - standard RFC1213 objects (_system.sysDescr, _system.sysObjectID, _system.sysUpTime, _system.sysName) and module-defined I/O"
  params: []

- id: snmp_set_request
  label: SNMP SetRequest
  kind: action
  command: "SNMP SetRequest - set configured I/O values"
  params: []

- id: snmp_trap
  label: SNMP Trap (unsolicited)
  kind: event
  command: "SNMP Trap - sent when relay changes state, sensor threshold reached, or vin out of range (configured via Conditional/Scheduled tasks)"
  params: []

- id: snmp_notification
  label: SNMP Notification (v2c/v3)
  kind: event
  command: "SNMP Notification - requires acknowledgment from SNMP manager; retries on no response"
  params: []

# MQTT / Sparkplug B (Section 4)
- id: mqtt_publish
  label: MQTT Publish
  kind: action
  command: "MQTT Publish - topic and payload tokens per source (e.g. ${relay1}, ${vin}, ${register1}, ${mac}, ${ver}, ${uptime}, ${dateTime})"
  params:
    - name: topic
      type: string
      description: MQTT topic; Sparkplug B topic structure defined by spec
    - name: payload
      type: string
      description: JSON/XML payload using tokens from source Table 4.1.4

- id: mqtt_subscribe
  label: MQTT Subscribe
  kind: action
  command: "MQTT Subscribe - receive I/O data published by other devices on configured broker"
  params:
    - name: topic
      type: string
      description: MQTT topic filter

# Remote Services (Section 5)
- id: remote_services_connection_open
  label: Remote Services TCP connection (device-initiated)
  kind: event
  command: "Device opens TCP connection per Connection Interval; sends state.xml with user-defined Connection String; expects 3-char ACK within 10 seconds"
  params: []

- id: cloud_dat_url_state
  label: Cloud DAT URL - Read state
  kind: query
  command: "GET https://api.controlbyweb.cloud/{dat_url}/state.json HTTP/1.1\r\n\r\n"
  params:
    - name: dat_url
      type: string
      description: Generated ControlByWeb Cloud DAT URL token
```

## Feedbacks
```yaml
# Observable state read via state.xml/json (Section 1.1.2)
- id: relay_state
  type: enum
  values: [0, 1, 2]  # 0=off, 1=on, 2=pulse
  description: <relayX> tag in state.xml/json

- id: digital_input_state
  type: enum
  values: [0, 1]
  description: <digitalInputX> / "digitalInputX" - 0=off, 1=on

- id: digital_io_state
  type: enum
  values: [0, 1]
  description: <digitalIOX> / "digitalIOX" - configured direction

- id: on_time
  type: number
  description: <onTimeX> seconds since last on

- id: total_on_time
  type: number
  description: <totalOnTimeX> cumulative on seconds

- id: count
  type: number
  description: <countX> counter value

- id: frequency
  type: number
  description: <frequencyX> frequency value

- id: analog_input
  type: number
  description: <analogInputX> / "analogInputX" - analog input X value

- id: vin
  type: number
  description: <vin> / "vin" - scaled internal Vin measurement

- id: frequency_input_x420
  type: number
  description: <frequencyInput> / "frequencyInput" - X-420 specific

- id: register
  type: number
  description: <registerX> / "registerX" - register value (IEEE 754 float; example: register1=10.5)

- id: utc_time
  type: integer
  description: <utcTime> / "utcTime" - seconds since Jan 1 1970

- id: timezone_offset
  type: integer
  description: <timezoneOffset> - offset for local time

- id: serial_number
  type: string
  description: <serialNumber> - MAC-format device serial

- id: one_wire_sensor
  type: string
  description: <oneWireSensorX> / "oneWireSensorX" - "x.x" if not read; numeric value (optionally with "showUnits=1")

- id: latitude
  type: string
  description: "lat" - GPS latitude (if device supports GPS)

- id: longitude
  type: string
  description: "long" - GPS longitude (if device supports GPS)

- id: min_rec_refresh
  type: integer
  description: "minRecRefresh" - minimum recording refresh interval

# Modbus error responses (Section 2.1)
- id: modbus_error_code
  type: integer
  description: Returned function code = original code + 0x80 (e.g. 0x81, 0x82, 0x83, 0x85, 0x8F, 0x90)

- id: modbus_exception_code
  type: integer
  description: 0x01=function not supported, 0x02=incorrect address/quantity, 0x03=padding/byte count out of range

# Remote Services (Section 5)
- id: remote_services_ack
  type: string
  description: 3-character ACK expected from external server after each connection string (within 10s)

# SNMP (Section 3)
- id: sys_descr
  type: string
  description: _system.sysDescr - "X-4xx"

- id: sys_object_id
  type: string
  description: _system.sysObjectID - "X4xx"

- id: sys_up_time
  type: integer
  description: _system.sysUpTime - hundredths of seconds since last powered

- id: sys_name
  type: string
  description: _system.sysName - "X-4xx" (configurable)
```

## Variables
```yaml
# Settable parameters documented in source
- id: register
  type: number
  description: General-purpose register (e.g. register1) settable via state.xml?register1={value} or Modbus FC 16
```

## Events
```yaml
- id: state_xml_pushed
  description: Device sends state.xml over Remote Services TCP connection when a logic event triggers "send state" action
- id: connection_string_sent
  description: Device periodically sends Connection String per Connection Interval setting when Remote Services enabled
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macros. Remove section if not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Source document is the generic ControlByWeb 400 Series protocol/integration manual; X401-specific I/O counts (relays, digital inputs, analog inputs) are not enumerated and must be verified against the per-device setup pages.
- Default HTTP port is 80; default Modbus/TCP port is 502. Both are configurable under the Advanced Network tab per source.
- When the User account is enabled on the device, HTTP requests must include `Authorization: Basic <base64(name:password)>` header (source line 35). Default credentials shown in example are `none:webrelay` (Base64: `bm9uZTp3ZWJyZWxheQ==`).
- When the User account is enabled, Modbus/TCP communication is disabled (source line 295).
- HTTP GET commands for the same connection may be combined: `/state.json?relay1=1&relay2=0` (source line 147).
- For `pulseTime` parameter: must precede the corresponding `relayN=2` command in the query string (source line 100).
- Modbus idle TCP connection times out after 50 seconds (source line 314); only 2 concurrent Modbus TCP connections supported.
- IEEE 754 32-bit floats used for holding registers; endianness configurable in Advanced Network tab (source line 398).
- Uninstalled temperature/humidity sensors return `0xFFFFFFFF` (NaN) in Modbus reads (source line 402).
- `oneWireSensorX` returns `x.x` when sensor cannot be read; pass `showUnits=1` query param to append unit (e.g. `77.3 F`).
- SNMP community strings default to `webrelay` for both read and write (source line 500).
- Remote Services connection: device expects 3-char ACK within 10 seconds; closes connection if no ACK (source line 574).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/05/400-series-users-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T14:45:14.095Z
last_checked_at: 2026-07-07T11:14:50.608Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:14:50.608Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched literally to source commands. Transport parameters (port 80, port 502, basic auth) verified. Full protocol coverage confirmed. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the generic X-400 Series; X401-specific I/O counts (relay count, analog input count, digital input count) are not enumerated in the source and must be confirmed per-device."
- "source does not describe multi-step macros. Remove section if not applicable."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
