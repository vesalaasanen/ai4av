---
spec_id: admin/controlbyweb-x4xx
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X-4xx Series Control Spec"
manufacturer: ControlByWeb
model_family: X-4xx
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X-4xx
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/02/analog_um_v1.3.pdf
  - https://controlbyweb.com/legacy/analog-module/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:01:11.730Z
last_checked_at: 2026-07-11T20:42:19.271Z
generated_at: 2026-07-11T20:42:19.271Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model \"Analog Module\" not named in source; the manual covers the X-400 Series family broadly. Per-channel I/O counts depend on configured Local I/O Numbers."
  - "specific TCP port (HTTP) configurable via Advanced Network; default 80 stated in URL examples, Modbus/TCP default 502 stated. Other protocols (SNMP 161, MQTT 1883) not explicitly numbered in source."
  - "no multi-step command sequences explicitly documented in source beyond"
  - "source does not document safety warnings, interlocks, or power-on"
  - "HTTPS port and certificate handling not specified. SNMP/MQTT specific TCP/UDP port numbers not stated in source. Firmware-version-dependent features (e.g. GPS lat/long, minRecRefresh) not version-pinned."
verification:
  verdict: verified
  checked_at: 2026-07-11T20:42:19.271Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions match literal command documentation; transport supported. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X-4xx Series Control Spec

## Summary
The ControlByWeb X-4xx series are industrial I/O modules with relays, digital inputs, analog inputs, counters, and registers. This spec covers integration via HTTP GET requests against the built-in web server, Modbus/TCP slave operation, SNMP v1/v2c/v3, and MQTT v3.1.1 (including Sparkplug B).

<!-- UNRESOLVED: specific model "Analog Module" not named in source; the manual covers the X-400 Series family broadly. Per-channel I/O counts depend on configured Local I/O Numbers. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 80  # default HTTP; port 502 used for Modbus/TCP; example shown on :8000
auth:
  type: basic  # HTTP Basic with Base64; optional, disabled by default
  # when User account is enabled, password is required and sent as Authorization: Basic <base64>
```

<!-- UNRESOLVED: specific TCP port (HTTP) configurable via Advanced Network; default 80 stated in URL examples, Modbus/TCP default 502 stated. Other protocols (SNMP 161, MQTT 1883) not explicitly numbered in source. -->

## Traits
```yaml
- powerable       # inferred from relay on/off command examples
- routable        # inferred from relay/digital I/O output control commands
- queryable       # inferred from state.xml/json read and Modbus read function codes
- levelable       # inferred from register value set commands (analog-like)
```

## Actions
```yaml
# HTTP GET control via state.xml / state.json
- id: relay_off
  label: Turn Relay Off
  kind: action
  command: "GET /state.xml?relay{relay}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)

- id: relay_on
  label: Turn Relay On
  kind: action
  command: "GET /state.xml?relay{relay}=1 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)

- id: relay_pulse
  label: Pulse Relay (preset duration)
  kind: action
  command: "GET /state.xml?relay{relay}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)
  notes: Pulses for Pulse Duration set in relay setup page (default 1.5s).

- id: relay_pulse_custom
  label: Pulse Relay (custom duration)
  kind: action
  command: "GET /state.json?pulseTime{relay}={seconds}&relay{relay}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)
    - name: seconds
      type: integer
      description: Pulse duration in seconds (pulseTime must precede relay=2)

- id: set_on_time
  label: Set onTime (since-last-on)
  kind: action
  command: "GET /state.xml?onTime{io}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: Local I/O number
    - name: value
      type: number
      description: Seconds to set

- id: set_total_on_time
  label: Set totalOnTime (cumulative)
  kind: action
  command: "GET /state.xml?totalOnTime{io}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: Local I/O number
    - name: value
      type: number
      description: Seconds to set

- id: set_counter
  label: Set Counter Value
  kind: action
  command: "GET /state.json?count{io}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: Local I/O number
    - name: value
      type: number
      description: Counter value

- id: set_register
  label: Set Register Value
  kind: action
  command: "GET /state.xml?register{reg}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: reg
      type: integer
      description: Register number (1-based)
    - name: value
      type: number
      description: Numeric value (e.g. 10.5)

- id: custom_state_set
  label: Set Custom-Named I/O
  kind: action
  command: "GET /customState.xml?{tagName}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: tagName
      type: string
      description: Camel-case tag name from customState.xml
    - name: value
      type: number
      description: Value to set

- id: multi_command_xml
  label: Multiple XML Commands (combined)
  kind: action
  command: "GET /customState.xml?{arg1}&{arg2} HTTP/1.1\r\n\r\n"
  params:
    - name: arg1
      type: string
      description: First argument (e.g. relay1=1)
    - name: arg2
      type: string
      description: Second argument (e.g. relay2=0)

- id: erase_data_log
  label: Erase log.txt
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"

- id: erase_syslog
  label: Erase syslog.txt
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"

# Modbus/TCP (port 502, slave)
- id: modbus_read_coils
  label: Read Coils (FC 01)
  kind: query
  command: "Modbus FC 0x01  # Read relays and digital I/O configured as outputs"
  notes: Start address and quantity from Modbus map in setup pages.

- id: modbus_read_discrete_inputs
  label: Read Discrete Inputs (FC 02)
  kind: query
  command: "Modbus FC 0x02  # Read digital inputs and digital I/O configured as inputs"

- id: modbus_read_holding_registers
  label: Read Holding Registers (FC 03)
  kind: query
  command: "Modbus FC 0x03  # Read Vin, sensors, registers, counters, analog inputs (32-bit float pairs, IEEE 754)"
  notes: Little- or big-endian per Advanced Network setting. Missing sensor returns 0xFFFFFFFF (NaN).

- id: modbus_write_single_coil
  label: Write Single Coil (FC 05)
  kind: action
  command: "Modbus FC 0x05  # value 0x00=Off, 0xFF=On"

- id: modbus_write_multiple_coils
  label: Write Multiple Coils (FC 15)
  kind: action
  command: "Modbus FC 0x0F  # output value 0x0000-0xFFFF (up to 16 outputs)"

- id: modbus_write_multiple_registers
  label: Write Multiple Registers (FC 16)
  kind: action
  command: "Modbus FC 0x10  # 32-bit float pairs, IEEE 754; used for analog outputs, registers, pulse count"

- id: modbus_pulse_relay
  label: Pulse Relay via Modbus (FC 16)
  kind: action
  command: "Modbus FC 0x10, addresses 512-513  # 32-bit float = pulse duration in seconds"
- id: read_state
  label: Read Device State
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  notes: Returns all configured I/O currently assigned a Local I/O Number as XML; state.json returns the JSON equivalent.

- id: read_custom_state
  label: Read Custom-Named I/O State
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  notes: Returns configured I/O using the user-configured Camel-case tag names; customState.json returns the JSON equivalent.

- id: read_data_log
  label: Read log.txt
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  notes: Retrieves the data log file; setup password required if the User account is enabled. Use the configured TCP port in the URL if not port 80.

- id: read_syslog
  label: Read syslog.txt
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  notes: Retrieves the system log file, format "MM/DD/YYYY HH:MM:SS, category: message"; setup username/password required.

- id: snmp_get_request
  label: SNMP Get Request
  kind: query
  command: "SNMP GetRequest  # Retrieve a single MIB object value"
  params:
    - name: oid
      type: string
      description: MIB object identifier (see the module-generated MIB file)

- id: snmp_get_next_request
  label: SNMP Get Next Request
  kind: query
  command: "SNMP GetNextRequest  # Retrieve the next MIB object in sequence"
  params:
    - name: oid
      type: string
      description: MIB object identifier to walk from (see the module-generated MIB file)

- id: snmp_get_bulk_request
  label: SNMP Get Bulk Request
  kind: query
  command: "SNMP GetBulkRequest  # Retrieve multiple MIB object values in one request (SNMP v2c/v3 only)"
  params:
    - name: oid
      type: string
      description: MIB object identifier(s) to bulk-retrieve (see the module-generated MIB file)

- id: snmp_set_request
  label: SNMP Set Request
  kind: action
  command: "SNMP SetRequest  # Write a MIB object value"
  params:
    - name: oid
      type: string
      description: MIB object identifier to write (see the module-generated MIB file)
    - name: value
      type: UNRESOLVED
      description: Value to write; per-object type/range not specified in source
```

## Feedbacks
```yaml
- id: relay_state
  type: enum
  values: [0, 1]
  description: 0=off (coil off), 1=on (coil energized). Tag: relayX

- id: digital_input
  type: enum
  values: [0, 1]
  description: 0=off (no voltage), 1=on (voltage applied). Tag: digitalInputX

- id: digital_io
  type: enum
  values: [0, 1]
  description: Bidirectional digital I/O state. Tag: digitalIOX

- id: on_time
  type: number
  description: Seconds since the input last came on. Tag: onTimeX

- id: total_on_time
  type: number
  description: Total seconds the input has been on. Tag: totalOnTimeX

- id: counter
  type: number
  description: Count value associated with input X. Tag: countX

- id: frequency
  type: number
  description: Frequency value for input X. Tag: frequencyX

- id: analog_input
  type: number
  description: Value of analog input X. Tag: analogInputX

- id: vin
  type: number
  description: Scaled internal Vin measurement. Tag: vin

- id: frequency_input
  type: number
  description: Value of the X-420 frequency input. Tag: frequencyInput

- id: register
  type: number
  description: Value of register X. Tag: registerX

- id: one_wire_sensor
  type: string
  description: "x.x = read error; 77.3 = value; 77.3 F = value with units (showUnits=1). Tag: oneWireSensorX"

- id: utc_time
  type: integer
  description: UTC seconds since 1970-01-01. Tag: utcTime

- id: timezone_offset
  type: integer
  description: Offset to apply to utcTime for local time. Tag: timezoneOffset

- id: serial_number
  type: string
  description: Device serial number (MAC format 00:00:00:00:00:00). Tag: serialNumber

- id: latitude
  type: string
  description: GPS latitude (xx.xxx). Tag: lat

- id: longitude
  type: string
  description: GPS longitude (xxx.xxxx). Tag: long

- id: min_rec_refresh
  type: integer
  description: Minimum recording refresh (JSON only). Tag: minRecRefresh
```

## Variables
```yaml
- id: register
  type: number
  description: Settable numeric register (e.g. register1). Set via /state.xml?register1={value} or Modbus FC 16.

- id: counter
  type: number
  description: Settable counter value (countX). Set via /state.json?countX={value}.

- id: on_time
  type: number
  description: Settable "since last on" timer (onTimeX). Set via /state.xml?onTimeX={value}.

- id: total_on_time
  type: number
  description: Settable cumulative on-time (totalOnTimeX). Set via /state.xml?totalOnTimeX={value}.
```

## Events
```yaml
- id: mqtt_publish
  description: Device publishes I/O state changes to configured MQTT broker. Payloads use token substitution (${relay1}, ${vin}, etc.). Supports Sparkplug B topic/payload structure.

- id: snmp_trap
  description: SNMP v1/v2c/v3 traps sent on relay state change, sensor threshold, or supply voltage out-of-range. Configured as actions in Conditional/Scheduled tasks.

- id: snmp_notification
  description: SNMP v2c/v3 notifications requiring acknowledgement from the manager (with retries).

- id: remote_services_state
  description: When Remote Services enabled and logic event fires, device sends state.xml over the persistent TCP connection to the configured external server.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences explicitly documented in source beyond
# the multi-argument HTTP GET pattern (/state.xml?relay1=1&relay2=0), which is
# covered as the multi_command_xml action.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on
# sequencing requirements. Modbus/TCP is auto-disabled when User account is
# enabled (security note, not a safety interlock).
```

## Notes
- HTTP `state.xml` and `state.json` are equivalent; `customState.xml/json` use user-configured Camel-case tag names instead of I/O-type-based names.
- Multiple arguments can be combined into a single HTTP GET: `/state.json?relay1=1&relay2=0`.
- For `pulseTimeX`, the argument must precede the `relayX=2` argument in the query string.
- Modbus/TCP defaults to port 502, configurable in Advanced Network tab. Disabled when User account is enabled (no password mechanism in Modbus).
- Modbus/TCP has 2 concurrent TCP sockets; 50-second idle timeout.
- Modbus error responses: function code | 0x80. Exception codes 0x01 (unsupported), 0x02 (bad address/qty), 0x03 (padding/byte count).
- 32-bit float values in Modbus respect configured endianness; IEEE 754. Missing sensor returns 0xFFFFFFFF (NaN).
- SNMP default community strings: `webrelay` (read and write). v3 uses USM with separate auth and privacy protocols.
- MQTT supports v3.1.1, with Sparkplug B as an alternative payload format.
- Remote Services connection expects 3-char "ACK" within 10s, else device closes the connection. Reserved version "2.0" is for ControlByWeb.Cloud only.
- HTTPS / TLS support implied by separate `${httpsport}` MQTT token but not detailed in this excerpt.

<!-- UNRESOLVED: HTTPS port and certificate handling not specified. SNMP/MQTT specific TCP/UDP port numbers not stated in source. Firmware-version-dependent features (e.g. GPS lat/long, minRecRefresh) not version-pinned. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/02/analog_um_v1.3.pdf
  - https://controlbyweb.com/legacy/analog-module/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:01:11.730Z
last_checked_at: 2026-07-11T20:42:19.271Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-11T20:42:19.271Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions match literal command documentation; transport supported. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model \"Analog Module\" not named in source; the manual covers the X-400 Series family broadly. Per-channel I/O counts depend on configured Local I/O Numbers."
- "specific TCP port (HTTP) configurable via Advanced Network; default 80 stated in URL examples, Modbus/TCP default 502 stated. Other protocols (SNMP 161, MQTT 1883) not explicitly numbered in source."
- "no multi-step command sequences explicitly documented in source beyond"
- "source does not document safety warnings, interlocks, or power-on"
- "HTTPS port and certificate handling not specified. SNMP/MQTT specific TCP/UDP port numbers not stated in source. Firmware-version-dependent features (e.g. GPS lat/long, minRecRefresh) not version-pinned."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
