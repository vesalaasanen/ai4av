---
spec_id: admin/controlbyweb-x408
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X-408 Control Spec"
manufacturer: ControlByWeb
model_family: X-408
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X-408
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
  - controlbyweb.cloud
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.cloud
retrieved_at: 2026-06-30T15:29:33.075Z
last_checked_at: 2026-07-07T12:27:14.800Z
generated_at: 2026-07-07T12:27:14.800Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-relay pulse duration default (1.5s example given) and pulseTime parameter maximum not stated; firmware version compatibility not stated"
  - "source does not document a named macro/sequence system on the X-408 itself;"
  - "source does not contain explicit safety warnings, interlock procedures,"
  - "per-channel X numbering on the X-408 is configured in setup (Local I/O Number) and not enumerated in the source; firmware version compatibility not stated; default pulse duration source-example value 1.5s but underlying default not stated."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:27:14.800Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 HTTP GET endpoint commands verified with exact literal matches in source; transport parameters (port 80, basic auth, HTTP/TCP) confirmed. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X-408 Control Spec

## Summary
The ControlByWeb X-408 is an Ethernet-based relay/IO control module in the X-400 Series. It exposes a built-in web server that responds to HTTP GET requests, a Modbus/TCP slave on port 502, SNMP v1/v2c/v3, MQTT 3.1.1 (with Sparkplug B), and an optional ControlByWeb Cloud HTTP API. This spec covers the HTTP GET control interface as documented in the source; Modbus, SNMP, MQTT, and Cloud variants are noted but each requires a separate control surface.

<!-- UNRESOLVED: per-relay pulse duration default (1.5s example given) and pulseTime parameter maximum not stated; firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  port: 80
auth:
  type: basic  # Base64 encoded "name:password" when user account enabled; no auth by default
```

Notes on transport:
- The default TCP port is 80. The source documents port 8000 as an example of a user-changed port (`http://192.168.1.2:8000/log.txt`), so 80 is the stated default.
- For Modbus/TCP, the module listens on port 502 (configurable under Advanced Network tab). This is the Modbus/TCP IANA-registered port and is stated in the source. Modbus is disabled whenever the user account is enabled.
- For SNMP, the device supports v1, v2c, and v3. Default community strings are `webrelay` for both read and write (v1/v2c only).
- For MQTT, the device supports version 3.1.1 with optional Sparkplug B.

## Traits
```yaml
# powerable       inferred from relay on/off command examples
# routable        inferred from relay1/relay2... selectable outputs
# queryable       inferred from state.xml/json read endpoints
```

## Actions
```yaml
# HTTP GET endpoints (default port 80; user account may be enabled)
# NOTE: The source documents these against an X-400 Series example. The X-408
# is an 8-relay variant; the I/O number is configured in the device setup
# (Local I/O Number). Replace X with the assigned number 1-8.
#
# All GET requests terminate with \r\n\r\n as stated in the source.

- id: read_state_xml
  label: Read State (XML)
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []

- id: read_state_json
  label: Read State (JSON)
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []

- id: read_custom_state_xml
  label: Read Custom State (XML)
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []

- id: read_custom_state_json
  label: Read Custom State (JSON)
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

- id: relay_off
  label: Turn Relay Off
  kind: action
  command: "GET /state.xml?relay{X}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number (assigned local I/O number, typically 1-8 for X-408)

- id: relay_on
  label: Turn Relay On
  kind: action
  command: "GET /state.xml?relay{X}=1 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number (assigned local I/O number, typically 1-8 for X-408)

- id: relay_pulse
  label: Pulse Relay (default duration)
  kind: action
  command: "GET /state.xml?relay{X}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number (assigned local I/O number, typically 1-8 for X-408)
  # Uses the Pulse Duration configured in the relay setup page (1.5s shown in source example).

- id: relay_pulse_duration
  label: Pulse Relay (specified duration)
  kind: action
  command: "GET /state.xml?pulseTime{X}={seconds}&relay{X}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number (assigned local I/O number)
    - name: seconds
      type: integer
      description: Pulse duration in seconds (pulseTime argument MUST precede relay command per source)

- id: set_on_time
  label: Set On Time Counter
  kind: action
  command: "GET /state.xml?onTime{X}={seconds} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: I/O number
    - name: seconds
      type: integer
      description: On-time value in seconds (0 to reset, or any positive value)

- id: set_total_on_time
  label: Set Total On Time Counter
  kind: action
  command: "GET /state.xml?totalOnTime{X}={seconds} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: I/O number
    - name: seconds
      type: integer
      description: Total on-time value in seconds (0 to reset)

- id: set_counter
  label: Set Counter Value
  kind: action
  command: "GET /state.xml?count{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: I/O number
    - name: value
      type: integer
      description: Counter value to set

- id: set_register
  label: Set Register Value
  kind: action
  command: "GET /state.xml?register{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Register number
    - name: value
      type: number
      description: Register value (numeric; e.g. 10.5)

- id: set_custom_register
  label: Set Custom-Named Register
  kind: action
  command: "GET /customState.xml?{camelName}{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: camelName
      type: string
      description: User-configured camelCase name for the I/O (e.g. myRegister)
    - name: X
      type: integer
      description: I/O number
    - name: value
      type: number
      description: Register value

- id: multiple_commands
  label: Send Multiple Commands in One Request
  kind: action
  command: "GET /state.xml?{param1}={val1}&{param2}={val2} HTTP/1.1\r\n\r\n"
  params:
    - name: param1
      type: string
      description: First I/O parameter (e.g. relay1, register1, count1)
    - name: val1
      type: string
      description: Value for first parameter
    - name: param2
      type: string
      description: Second I/O parameter
    - name: val2
      type: string
      description: Value for second parameter

- id: read_log_txt
  label: Read Data Log File
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_log_txt
  label: Erase Data Log File
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: read_syslog_txt
  label: Read System Log File
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []
  # Requires setup username and password per source.

- id: erase_syslog_txt
  label: Erase System Log File
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []
  # Requires setup username and password per source.
```

## Feedbacks
```yaml
- id: relay_state
  type: enum
  values: [0, 1]
  description: relayX element in state.xml/json; 0=off (coil off), 1=on (coil energized)
- id: digital_input_state
  type: enum
  values: [0, 1]
  description: digitalInputX element; 0=off (no voltage), 1=on (voltage applied)
- id: digital_io_state
  type: enum
  values: [0, 1]
  description: digitalIOX element; 0=off, 1=on
- id: on_time
  type: number
  description: onTimeX - time in seconds the input was on since last coming on
- id: total_on_time
  type: number
  description: totalOnTimeX - total time in seconds the input has been on
- id: count
  type: number
  description: countX - count value associated with input X
- id: frequency
  type: number
  description: frequencyX - frequency associated with input X
- id: analog_input
  type: number
  description: analogInputX - value of analog input X
- id: vin
  type: number
  description: Scaled internal Vin measurement (always present in state.xml/json)
- id: register
  type: number
  description: registerX - value of the register X
- id: one_wire_sensor
  type: string
  description: oneWireSensorX; "x.x" = sensor not readable, "77.3" = current value, "77.3 F" = value with units (showUnits=1)
- id: utc_time
  type: integer
  description: utcTime - UTC seconds since January 1, 1970
- id: timezone_offset
  type: integer
  description: timezoneOffset - offset to apply to utcTime for local time
- id: serial_number
  type: string
  description: serialNumber - MAC/serial of the X-400 Series device
- id: min_rec_refresh
  type: integer
  description: minRecRefresh - present in state.json
```

## Variables
```yaml
# Registers are settable numeric parameters retained by the device.
- id: register
  type: number
  description: General-purpose register value, set via state.xml?registerX= or customState.xml?{name}X=
```

## Events
```yaml
# Unsolicited device-pushed notifications:
- id: snmp_trap
  description: SNMP Trap sent when a relay changes state, when a sensor value threshold is reached, or when supply voltage goes out of range. Configured as actions in Conditional and Scheduled tasks. Sent only for v1/v2c with community strings; v2c/v3 use Notifications which require acknowledgement.
- id: remote_services_state_push
  description: When Remote Services is enabled, the device opens a TCP V1 connection to an external server and sends the connection string (static info + user-defined string) followed by state.xml at the configured Connection Interval. A 3-character "ACK" is expected within 10 seconds or the device closes the connection.
- id: ack_response
  description: 3-character "ACK" expected from the external server in response to each connection string push.
```

## Macros
```yaml
# UNRESOLVED: source does not document a named macro/sequence system on the X-408 itself;
# multiple-command batch GETs (see actions.multiple_commands) can be used to combine
# relay and register changes into a single request.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings, interlock procedures,
# or power-on sequencing requirements for the X-408.
```

## Notes
- The X-408 is an 8-relay member of the X-400 Series. The source refines all examples against the series generically; per-channel numbering on the X-408 itself is set by the Local I/O Number assigned in device setup.
- HTTP requests are terminated with `\r\n\r\n` per the source.
- When the User account is enabled on the device, requests must include an `Authorization: Basic` header whose value is the Base64 encoding of `username:password` (e.g. `none:webrelay` → `bm9uZTp3ZWJyZWxheQ==`).
- For Modbus/TCP, the device is a slave on port 502 (configurable). Modbus is disabled when the User account is enabled. The Modbus address map is dynamic per installed I/O and must be retrieved from the device's setup pages (Advanced Network tab → View Modbus Address Table). Up to two TCP sockets may be open concurrently; further connection requests are rejected. Idle connection timeout: 50 seconds.
- Pulse Duration for `relayX=2` is configured per-relay in the relay setup page; the `pulseTimeX=` argument overrides it for a single command only and is not persisted. The `pulseTimeX` argument MUST precede the `relayX=2` argument in the query string.
- Modbus/TCP function codes supported: 01 (Read Coils), 02 (Read Discrete Inputs), 03 (Read Holding Registers), 05 (Write Single Coil), 15/0x0F (Write Multiple Coils), 16/0x10 (Write Multiple Registers). 32-bit floating-point values use IEEE 754; endianness (little/big) is configured in the Advanced Network tab.
- SNMP: v1, v2c, v3. Default community strings are `webrelay`/`webrelay` (read/write). v3 uses the User-Based Security Model with separate auth and privacy protocols.
- MQTT: version 3.1.1; Sparkplug B is supported as an alternative. The source documents payload tokens for common system variables and I/O (e.g. `${relay1}`, `${vin}`, `${mac}`, `${ver}`).
- ControlByWeb Cloud: HTTP GET to `https://api.controlbyweb.cloud/{DAT URL}/state.json[?...]` works the same as direct state.json access. Version 2.0 of Remote Services is reserved for ControlByWeb.Cloud and not for other use.

<!-- UNRESOLVED: per-channel X numbering on the X-408 is configured in setup (Local I/O Number) and not enumerated in the source; firmware version compatibility not stated; default pulse duration source-example value 1.5s but underlying default not stated. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
  - controlbyweb.cloud
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.cloud
retrieved_at: 2026-06-30T15:29:33.075Z
last_checked_at: 2026-07-07T12:27:14.800Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:27:14.800Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 HTTP GET endpoint commands verified with exact literal matches in source; transport parameters (port 80, basic auth, HTTP/TCP) confirmed. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-relay pulse duration default (1.5s example given) and pulseTime parameter maximum not stated; firmware version compatibility not stated"
- "source does not document a named macro/sequence system on the X-408 itself;"
- "source does not contain explicit safety warnings, interlock procedures,"
- "per-channel X numbering on the X-408 is configured in setup (Local I/O Number) and not enumerated in the source; firmware version compatibility not stated; default pulse duration source-example value 1.5s but underlying default not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
