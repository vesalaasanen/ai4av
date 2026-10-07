---
spec_id: admin/controlbyweb-x418
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X418 Control Spec"
manufacturer: ControlByWeb
model_family: "X-400 Series"
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - "X-400 Series"
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
retrieved_at: 2026-06-30T15:33:50.795Z
last_checked_at: 2026-10-07T13:16:27.889Z
generated_at: 2026-10-07T13:16:27.889Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "customState.xml?myRegister1=10"
  - GetNextRequest
  - GetBulkRequest
  - SetRequest
  - "X418 model not named in source. Document references X-400 Series generically; X-420, X-4xx shown as family placeholders."
  - "HTTP base URL — source shows `http://192.168.1.2/` as example only; device IP is user-assigned."
  - "Modbus/TCP port stated (502) but is configurable — see Modbus section."
  - "MQTT/SNMP ports not stated in source."
  - "source does not document multi-step sequences or named macros; Remote Services ACK loop is the closest construct but is event-driven, not a stored macro."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
  - "X418-specific I/O counts (number of relays, digital inputs, analog inputs, registers). Source describes family, not X418 specifics."
  - "MQTT/SNMP default ports."
  - "Full Modbus address map — source defers to setup pages View Modbus Address Table."
  - "HTTPS support referenced (${httpsport} token) but TLS details not in source."
  - "Firmware version constraints on which feature works (e.g. Remote Services v1)."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:16:27.889Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 action units match source literals and transport supported; source covers the X-400 family generically (X418 not named), so confidence medium. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X418 Control Spec

## Summary
ControlByWeb X-400 Series is a family of industrial I/O controllers with relays, digital/analog inputs, counters, registers, and 1-Wire sensors. Spec covers HTTP GET (XML/JSON), Modbus/TCP, SNMP v1/v2c/v3, MQTT 3.1.1, and Sparkplug B integration interfaces. Source document describes the X-400 Series family; X418 model name not explicitly mentioned.

<!-- UNRESOLVED: X418 model not named in source. Document references X-400 Series generically; X-420, X-4xx shown as family placeholders. -->
<!-- UNRESOLVED: HTTP base URL — source shows `http://192.168.1.2/` as example only; device IP is user-assigned. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 80  # source shows example with no port (defaults to 80) and example `http://192.168.1.2:8000/...` for non-default
auth:
  type: basic  # source: Base64 Basic auth when User account enabled; optional, disabled by default
  notes: "Source shows `Authorization: Basic <base64>` header. Default community string for SNMP v1/v2c is `webrelay`. Modbus disabled when User account enabled."
```

<!-- UNRESOLVED: Modbus/TCP port stated (502) but is configurable — see Modbus section. -->
<!-- UNRESOLVED: MQTT/SNMP ports not stated in source. -->

## Traits
```yaml
- powerable       # inferred: relay on/off commands present
- routable        # inferred: relay control commands present
- queryable       # inferred: state.xml/json read, Modbus read coils/registers present
- levelable       # inferred: register set, analog input read, pulseTime variable
```

## Actions
```yaml
# HTTP GET-based control over state.xml / state.json
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

- id: relay_off
  label: Relay OFF
  kind: action
  command: "GET /state.xml?relay{relay}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number

- id: relay_on
  label: Relay ON
  kind: action
  command: "GET /state.xml?relay{relay}=1 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number

- id: relay_pulse
  label: Relay PULSE
  kind: action
  command: "GET /state.xml?relay{relay}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (pulse uses configured Pulse Duration)

- id: relay_pulse_custom
  label: Relay PULSE custom duration
  kind: action
  command: "GET /state.json?pulseTime{relay}={seconds}&relay{relay}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number
    - name: seconds
      type: integer
      description: Pulse duration in seconds (pulseTime must precede relay=X=2)

- id: set_on_time
  label: Set onTime counter
  kind: action
  command: "GET /state.xml?onTime{io}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: I/O number

- id: set_total_on_time
  label: Set totalOnTime counter
  kind: action
  command: "GET /state.xml?totalOnTime{io}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: I/O number

- id: set_counter
  label: Set count
  kind: action
  command: "GET /state.json?count{io}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: Counter number

- id: set_register
  label: Set register
  kind: action
  command: "GET /state.xml?register{io}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: Register number
    - name: value
      type: float
      description: Numeric register value

- id: multi_relay_command
  label: Multiple commands in one URL
  kind: action
  command: "GET /state.json?relay1=1&relay2=0 HTTP/1.1\r\n\r\n"
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

# Modbus/TCP function codes
- id: modbus_read_coils
  label: Modbus Read Coils (FC 01)
  kind: query
  command: "Modbus/TCP FC 0x01 - Read relays and digital I/O configured as outputs"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: quantity
      type: integer
      description: From Modbus map in setup pages

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02)
  kind: query
  command: "Modbus/TCP FC 0x02 - Read digital inputs and digital I/O configured as inputs"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: quantity
      type: integer
      description: From Modbus map in setup pages

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "Modbus/TCP FC 0x03 - Read Vin, sensors, registers, counters, analog inputs"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: quantity
      type: integer
      description: From Modbus map; must be divisible by 2 for 32-bit pairs

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "Modbus/TCP FC 0x05 - Write relay or digital I/O output"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: value
      type: integer
      description: 0x00 (Off) or 0xFF (On)

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15)
  kind: action
  command: "Modbus/TCP FC 0x0F - Write multiple digital outputs/relays"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: quantity
      type: integer
      description: From Modbus map
    - name: byte_count
      type: integer
      description: Quantity divided by 8
    - name: values
      type: integer
      description: Bitfield 0x0000-0xFFFF

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16)
  kind: action
  command: "Modbus/TCP FC 0x10 - Write registers/analog outputs (IEEE 754 float, configured endianness)"
  params:
    - name: start_address
      type: integer
      description: From Modbus map in setup pages
    - name: quantity
      type: integer
      description: Must be even (32-bit pairs)

# SNMP
- id: snmp_get_system_descr
  label: SNMP Get sysDescr
  kind: query
  command: "SNMP GetRequest _system.sysDescr_ → returns \"X-4xx\""
  params: []

- id: snmp_get_system_object_id
  label: SNMP Get sysObjectID
  kind: query
  command: "SNMP GetRequest _system.sysObjectID_ → returns \"X4xx\""
  params: []

- id: snmp_get_system_uptime
  label: SNMP Get sysUpTime
  kind: query
  command: "SNMP GetRequest _system.sysUpTime_ → hundredths of seconds since last powered"
  params: []

- id: snmp_get_system_name
  label: SNMP Get sysName
  kind: query
  command: "SNMP GetRequest _system.sysName_ → \"X-4xx*\""
  params: []

# MQTT publish payloads (publish-side variables)
- id: mqtt_publish
  label: MQTT publish I/O state
  kind: action
  command: "MQTT publish with payload tokens (${mac}, ${ver}, ${ser}, ${uptime}, ${ip}, ${port}, ${httpsport}, ${dateTime}, ${name}, ${model}, ${clientID}, ${digitalInput1..4}, ${relay1..4}, ${vin}, ${register1})"
  params: []

- id: read_log_txt
  label: Read log.txt
  kind: query
  command: "http://192.168.1.2/log.txt"
  params: []

- id: read_syslog_txt
  label: Read syslog.txt
  kind: query
  command: "http://192.168.1.2/syslog.txt"
  params: []
```

## Feedbacks
```yaml
- id: relay_state
  type: integer
  values: [0, 1]
  description: "0 = off (coil off), 1 = on (coil energized)"
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: digital_input_state
  type: integer
  values: [0, 1]
  description: "0 = off (voltage not applied), 1 = on (voltage applied)"
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: digital_io_state
  type: integer
  values: [0, 1]
  description: "0 = off, 1 = on (when configured as input or output)"
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: vin
  type: float
  description: Scaled internal Vin measurement
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: utc_time
  type: integer
  description: UTC seconds since Jan 1 1970
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: timezone_offset
  type: integer
  description: Offset applied to utcTime for local time
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: serial_number
  type: string
  description: Device MAC/serial (00:0C:C8:xx:xx:xx format in examples)
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: analog_input
  type: float
  description: Value of analog input X
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: frequency_input
  type: float
  description: Value of X-420 frequency input
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: on_time
  type: float
  description: Seconds input was on since last coming on
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: total_on_time
  type: float
  description: Total seconds input has been on
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: count
  type: integer
  description: Count value associated with input X
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: frequency
  type: float
  description: Frequency associated with input X
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: register_value
  type: float
  description: Value of register X
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: one_wire_sensor
  type: string
  description: "x.x = unread, 77.3 = current value, 77.3 F = value with units (showUnits=1)"
  query_command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: min_rec_refresh
  type: string
  description: Minimum recording refresh interval (from state.json example)
  query_command: "http://192.168.1.2/state.json"
```

## Variables
```yaml
- name: pulseTime
  type: integer
  description: One-shot pulse duration in seconds; must precede relay{N}=2 in query string
- name: onTime
  type: float
  description: Settable counter, time input has been on
- name: totalOnTime
  type: float
  description: Settable counter, total on time
- name: count
  type: integer
  description: Settable counter value
- name: register
  type: float
  description: Settable register value (32-bit IEEE 754 over Modbus)
```

## Events
```yaml
# Source describes unsolicited notifications:
- id: snmp_trap
  protocol: snmp
  description: "Sent when a relay changes state, sensor threshold reached, or supply voltage out of range. Configured as actions in Conditional and Scheduled tasks."

- id: snmp_notification
  protocol: snmp
  description: "SNMPv2c/v3 notification requiring acknowledgment; retries if no response."

- id: remote_services_connection_string
  protocol: tcp
  description: "Periodic state.xml push from device to external server when Remote Services enabled. Connection String consists of static device info + user-defined string + state.xml. Expects 3-char ACK response within 10s or connection closes."

- id: remote_services_state_push
  protocol: tcp
  description: "When logic event triggers 'send state' action and connection is open, state.xml is sent."
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences or named macros; Remote Services ACK loop is the closest construct but is event-driven, not a stored macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Source document covers the **X-400 Series** family; the specific **X418** model is not named in the supplied text. X-420 and X-4xx appear as placeholders. Spec produced as best-effort family-level draft.
- Default HTTP port is 80 (no port in `http://192.168.1.2/state.xml` examples). Source shows `:8000` example for non-default configuration but does not state X418 default port.
- Modbus/TCP defaults to port **502** (source: "open a connection with the module on port 502 (configurable under Advanced Network tab)"). Listed under Modbus notes since HTTP is primary protocol.
- **Modbus disabled when User account enabled** — Modbus/TCP has no password mechanism, so source mandates User account disabled for Modbus use.
- **Modbus 50-second timeout**: connection closes after 50s of no data; send periodic reads to keep open.
- **Two TCP sockets** available for Modbus/TCP; third connection rejected.
- Modbus error responses = original function code ORed with `0x80` (e.g. 0x01 → 0x81). Exception codes 0x01 (unsupported), 0x02 (bad address/quantity), 0x03 (padding/byte-count).
- Modbus 32-bit values returned as IEEE 754 float; little-endian or big-endian per Advanced Network setting. NaN sensor value = `0xFFFFFFFF`.
- **Modbus pulse example**: Pulse Relay 1 as 32-bit float via FC 16 at addresses 512–513 (PLC 40513–40514).
- **SNMP community strings** default to `webrelay` (both read and write). SNMPv3 uses USM with separate auth/privacy protocols + passwords + security username.
- **MQTT** supports v3.1.1; Sparkplug B supported as alternative payload structure.
- **DAT URL** Cloud API example: `https://api.controlbyweb.cloud/{generated DAT url}/state.json?relay1=1&relay2=1`
- **Direct Server Control**: external server opens TCP connection on demand. **Remote Services**: device initiates outbound TCP V1 connection at Connection Interval; version 2.0 reserved for ControlByWeb.Cloud.
- **Pulse timing**: pulseTime arg must precede relay1=2; does not modify stored Pulse Duration.

<!-- UNRESOLVED: X418-specific I/O counts (number of relays, digital inputs, analog inputs, registers). Source describes family, not X418 specifics. -->
<!-- UNRESOLVED: MQTT/SNMP default ports. -->
<!-- UNRESOLVED: Full Modbus address map — source defers to setup pages View Modbus Address Table. -->
<!-- UNRESOLVED: HTTPS support referenced (${httpsport} token) but TLS details not in source. -->
<!-- UNRESOLVED: Firmware version constraints on which feature works (e.g. Remote Services v1). -->
```

Write to drafts.jsonl + run scraper next, or correct any field first?

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/05/400-series-users-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
retrieved_at: 2026-06-30T15:33:50.795Z
last_checked_at: 2026-10-07T13:16:27.889Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:16:27.889Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 action units match source literals and transport supported; source covers the X-400 family generically (X418 not named), so confidence medium. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "customState.xml?myRegister1=10"
- GetNextRequest
- GetBulkRequest
- SetRequest
- "X418 model not named in source. Document references X-400 Series generically; X-420, X-4xx shown as family placeholders."
- "HTTP base URL — source shows `http://192.168.1.2/` as example only; device IP is user-assigned."
- "Modbus/TCP port stated (502) but is configurable — see Modbus section."
- "MQTT/SNMP ports not stated in source."
- "source does not document multi-step sequences or named macros; Remote Services ACK loop is the closest construct but is event-driven, not a stored macro."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
- "X418-specific I/O counts (number of relays, digital inputs, analog inputs, registers). Source describes family, not X418 specifics."
- "MQTT/SNMP default ports."
- "Full Modbus address map — source defers to setup pages View Modbus Address Table."
- "HTTPS support referenced (${httpsport} token) but TLS details not in source."
- "Firmware version constraints on which feature works (e.g. Remote Services v1)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
