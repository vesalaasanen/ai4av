---
spec_id: admin/controlbyweb-x22s
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X22S Control Spec"
manufacturer: ControlByWeb
model_family: X22S
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X22S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/X-22s_manual_v2.0.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/communication-protocols/communicating-with-standalone-products/
retrieved_at: 2026-06-30T15:31:33.922Z
last_checked_at: 2026-07-07T11:12:34.012Z
generated_at: 2026-07-07T11:12:34.012Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the X-400 Series integration manual; X22S-specific I/O counts, port defaults, and any RS-232 payload details are not explicitly stated. Known protocol was given as RS-232C, but the source documents only IP-based protocols (HTTP, Modbus/TCP, SNMP, MQTT); no RS-232 commands, baud rate, or framing appear."
  - "exact MQTT topic and publish command format not specified in source - only token list."
  - "source describes SNMP traps generically (Section 3.1.3) but does not enumerate event IDs."
  - "source does not define multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "X22S-specific channel/relay counts; RS-232C commands, baud, framing; firmware version compatibility; any X22S-only command set or quirks."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:12:34.012Z
  matched_actions: 22
  action_count: 22
  confidence: medium
  summary: "All 22 spec actions verified against source; HTTP GET commands, Modbus function codes, and transport parameters (port 502, HTTP auth basic) all confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X22S Control Spec

## Summary
The ControlByWeb X22S is a network-connected industrial I/O module (relay, digital, analog) from the X-400 Series family. This spec covers control and monitoring via HTTP GET requests against the on-board web server, Modbus/TCP, SNMP, and MQTT/Sparkplug B. The supplied source document is a generic X-400 Series integration guide; X22S-specific behavior (e.g. relay count, I/O mix) is not separately confirmed in the source.

<!-- UNRESOLVED: source document is the X-400 Series integration manual; X22S-specific I/O counts, port defaults, and any RS-232 payload details are not explicitly stated. Known protocol was given as RS-232C, but the source documents only IP-based protocols (HTTP, Modbus/TCP, SNMP, MQTT); no RS-232 commands, baud rate, or framing appear. -->

## Transport
```yaml
protocols:
  - http
  - tcp  # inferred: Modbus/TCP and HTTP both ride TCP; port stated below for Modbus
addressing:
  port: 502  # Modbus/TCP port per source (Section 2.1)
  base_url: "http://<device-ip>/"  # inferred: source shows http://192.168.1.2/state.xml patterns; path segments follow
auth:
  type: basic  # inferred: source describes HTTP Basic auth via Base64-encoded "name:password" when User account enabled; otherwise no auth
```

**Note:** HTTP port is configurable on the device; source uses port 80 default and shows `:8000` as an example of a changed port. Default TCP port for HTTP not explicitly fixed in source — `base_url` shown above uses port 80 by omission.

## Traits
```yaml
# - queryable       (inferred: state.xml/json read commands present)
# - powerable       (inferred: relay on/off commands present, per relay trait)
# - routable        # not applicable - this is a relay/digital I/O module, no source/video routing
```

## Actions
```yaml
# HTTP GET-based control of X-400 Series I/O. Apply to X22S pending device-specific confirmation.
# Each `command` is the literal request line from the source. Variable parts are shown as {placeholders}.
# Server response is the state.xml/json document (see Feedbacks).

- id: get_state_xml
  label: Read state (XML)
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []

- id: get_state_json
  label: Read state (JSON)
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []

- id: get_custom_state_xml
  label: Read custom state (XML)
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []

- id: get_custom_state_json
  label: Read custom state (JSON)
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

# Relay control - X22S relay count is not stated in source; parameterize relay number.
- id: relay_off
  label: Turn Relay Off
  kind: action
  command: "GET /state.xml?relay{n}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Relay number (1-based)

- id: relay_on
  label: Turn Relay On
  kind: action
  command: "GET /state.xml?relay{n}=1 HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Relay number (1-based)

- id: relay_pulse_default
  label: Pulse Relay (default duration)
  kind: action
  command: "GET /state.json?relay{n}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Relay number (1-based)

- id: relay_pulse_5s
  label: Pulse Relay 1 for 5 seconds
  kind: action
  command: "GET /state.json?pulseTime{n}=5&relay{n}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Relay number (1-based)

- id: relay_pulse_15s
  label: Pulse Relay 1 for 15 seconds
  kind: action
  command: "GET /state.json?pulseTime{n}=15&relay{n}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Relay number (1-based)

- id: set_on_time
  label: Set onTime (seconds)
  kind: action
  command: "GET /state.xml?onTime{n}={seconds} HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Input/relay number (1-based)
    - name: seconds
      type: number
      description: On-time in seconds (e.g. 0 to reset, 5)

- id: set_total_on_time
  label: Set totalOnTime (seconds)
  kind: action
  command: "GET /state.xml?totalOnTime{n}={seconds} HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Input/relay number (1-based)
    - name: seconds
      type: number
      description: Total on-time in seconds

- id: set_counter
  label: Set counter value
  kind: action
  command: "GET /state.json?count{n}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Input number (1-based)
    - name: value
      type: number
      description: Counter value (e.g. 200)

- id: set_register
  label: Set register value
  kind: action
  command: "GET /state.xml?register{n}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Register number (1-based)
    - name: value
      type: number
      description: Numeric register value (supports decimals, e.g. 10.5)

- id: multi_command_state
  label: Multiple commands via state.xml/json
  kind: action
  command: "GET /state.json?relay1=1&relay2=0 HTTP/1.1\r\n\r\n"
  params: []

- id: erase_log_txt
  label: Erase data log file
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: erase_syslog
  label: Erase system log file
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

# Modbus/TCP function codes (Section 2.1.1). MBAP header is implied; payload = function code + data.
- id: modbus_read_coils
  label: Modbus Read Coils (FC 01)
  kind: query
  command: "0x01 {startAddr} {quantity}"
  params:
    - name: startAddr
      type: integer
      description: Starting coil address (from device Modbus map)
    - name: quantity
      type: integer
      description: Number of coils to read

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02)
  kind: query
  command: "0x02 {startAddr} {quantity}"
  params:
    - name: startAddr
      type: integer
      description: Starting discrete input address
    - name: quantity
      type: integer
      description: Number of inputs to read

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "0x03 {startAddr} {quantity}"
  params:
    - name: startAddr
      type: integer
      description: Starting register address (must be even for 32-bit values)
    - name: quantity
      type: integer
      description: Number of registers to read (must be divisible by 2)

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "0x05 {startAddr} {0x00|0xFF}"
  params:
    - name: startAddr
      type: integer
      description: Coil address
    - name: value
      type: enum
      values: [0x00, 0xFF]
      description: 0x00 = Off, 0xFF = On

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15)
  kind: action
  command: "0x0F {startAddr} {quantity} {byteCount} {valueBytes}"
  params:
    - name: startAddr
      type: integer
      description: Starting coil address
    - name: quantity
      type: integer
      description: Number of outputs to write
    - name: byteCount
      type: integer
      description: Quantity / 8
    - name: valueBytes
      type: string
      description: Bit-packed output value (0x0000-0xFFFF)

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16)
  kind: action
  command: "0x10 {startAddr} {quantity} {byteCount} {registers}"
  params:
    - name: startAddr
      type: integer
      description: Starting register address (must be even)
    - name: quantity
      type: integer
      description: Number of registers to write (must be even)
    - name: registers
      type: string
      description: IEEE 754 32-bit float values, little- or big-endian per device config

# MQTT publish payloads (Section 4.1.4). Token strings are placeholders the device substitutes.
# UNRESOLVED: exact MQTT topic and publish command format not specified in source - only token list.
```

## Feedbacks
```yaml
# state.xml/json document fields as enumerated in the source.
- id: digital_input
  type: integer
  description: "0 = off, 1 = on. Element name pattern: digitalInputX (1-based)."
  values: [0, 1]

- id: relay_state
  type: integer
  description: "0 = off (coil off), 1 = on (coil energized). Element name pattern: relayX."
  values: [0, 1]

- id: digital_io
  type: integer
  description: "0 = off, 1 = on. Element name pattern: digitalIOX."
  values: [0, 1]

- id: on_time
  type: number
  description: "Time in seconds the input was on since last coming on. Pattern: onTimeX."

- id: total_on_time
  type: number
  description: "Total time in seconds the input has been on. Pattern: totalOnTimeX."

- id: count
  type: number
  description: "Count value associated with input X. Pattern: countX."

- id: frequency
  type: number
  description: "Frequency associated with input X. Pattern: frequencyX."

- id: analog_input
  type: number
  description: "Value of analog input X. Pattern: analogInputX."

- id: vin
  type: number
  description: "Scaled internal Vin measurement. Element name: vin."

- id: frequency_input
  type: number
  description: "Value of the X-420 frequency input. Element name: frequencyInput."

- id: register
  type: number
  description: "Value of register X. Pattern: registerX."

- id: utc_time
  type: integer
  description: "Current UTC time, seconds since 1970-01-01. Element name: utcTime."

- id: one_wire_sensor
  type: string
  description: "1-Wire sensor value. 'x.x' = read failure. '77.3' = current value. '77.3 F' = value with units (showUnits=1). Pattern: oneWireSensorX."

- id: timezone_offset
  type: integer
  description: "Offset to add to utcTime for local time. Element name: timezoneOffset."

- id: serial_number
  type: string
  description: "Device serial number (MAC format, e.g. 00:0C:C8:00:00:00). Element name: serialNumber."
```

## Variables
```yaml
# Settable parameters covered by Actions above. Listed here for variable tracking.
- name: register{n}
  type: number
  description: "Writable register value, IEEE 754 float. Set via state.xml?register{n}={value} or Modbus FC 16."
- name: onTime{n}
  type: number
  description: "Per-input on-time counter (seconds). Set via state.xml?onTime{n}={seconds}."
- name: totalOnTime{n}
  type: number
  description: "Per-input total on-time (seconds). Set via state.xml?totalOnTime{n}={seconds}."
- name: count{n}
  type: number
  description: "Per-input counter value. Set via state.json?count{n}={value}."
- name: pulseTime{n}
  type: number
  description: "Per-pulse override duration (seconds). Must precede relay{n}=2 in same request."
```

## Events
```yaml
# UNRESOLVED: source describes SNMP traps generically (Section 3.1.3) but does not enumerate event IDs.
# MQTT publishes (Section 4.1.4) include a token list but not a definitive topic/payload schema for events.
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Source document is the X-400 Series "Integrating with ControlByWeb Devices" guide, not an X22S-specific manual. The X22S is part of the X-400 Series family per ControlByWeb product naming, but X22S-specific I/O counts, channel counts, and any X22S-only behavior are not in this source.
- The Known protocol was given as **RS-232C**, but the supplied source documents only IP-based protocols (HTTP, Modbus/TCP, SNMP, MQTT/Sparkplug B). No RS-232 commands, baud rate, data bits, parity, stop bits, or framing are present. RS-232 fields are left UNRESOLVED.
- Modbus/TCP uses port 502 (Section 2.1). Connection times out after 50 seconds of idle; send a periodic read to keep open. Up to two concurrent Modbus/TCP sockets supported.
- Modbus function codes supported: 01 (Read Coils), 02 (Read Discrete Inputs), 03 (Read Holding Registers), 05 (Write Single Coil), 15 (Write Multiple Coils), 16 (Write Multiple Registers). 32-bit sensor values must be read/written in pairs (even register counts). 32-bit float values follow IEEE 754, little- or big-endian per device configuration.
- Modbus/TCP is disabled whenever the User account is enabled on the device (no Modbus password mechanism).
- Modbus error responses: function code + 0x80 (e.g. FC 01 → 0x81), with exception codes 0x01 (not supported) or 0x02 (bad start address/quantity).
- HTTP auth: by default no password. If User account is enabled, requests must include `Authorization: Basic <base64(user:pass)>` header.
- HTTP port is configurable; default is 80. Log file access may require setup username/password.
- MQTT supports version 3.1.1 with Sparkplug B. Sparkplug B is an alternative protocol on top of MQTT with defined topic structure.
- SNMP versions 1, 2c, and 3 supported. Default community strings are `webrelay` (both read and write) for v1/v2c. v3 uses USM with separate auth and privacy algorithms and passwords.
- Remote Services (Section 5): device can initiate outbound TCP connection to an external server. Server must send a 3-character "ACK" within 10 seconds or the device closes the connection. Version 2.0 of Remote Services is reserved for ControlByWeb.Cloud.
- ControlByWeb.Cloud (Section 6): DAT URLs allow HTTP GET integration without port forwarding. Example: `https://api.controlbyweb.cloud/{datUrl}/state.json?relay1=1&relay2=1`.

<!-- UNRESOLVED: X22S-specific channel/relay counts; RS-232C commands, baud, framing; firmware version compatibility; any X22S-only command set or quirks. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/X-22s_manual_v2.0.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/communication-protocols/communicating-with-standalone-products/
retrieved_at: 2026-06-30T15:31:33.922Z
last_checked_at: 2026-07-07T11:12:34.012Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:12:34.012Z
matched_actions: 22
action_count: 22
confidence: medium
summary: "All 22 spec actions verified against source; HTTP GET commands, Modbus function codes, and transport parameters (port 502, HTTP auth basic) all confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the X-400 Series integration manual; X22S-specific I/O counts, port defaults, and any RS-232 payload details are not explicitly stated. Known protocol was given as RS-232C, but the source documents only IP-based protocols (HTTP, Modbus/TCP, SNMP, MQTT); no RS-232 commands, baud rate, or framing appear."
- "exact MQTT topic and publish command format not specified in source - only token list."
- "source describes SNMP traps generically (Section 3.1.3) but does not enumerate event IDs."
- "source does not define multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "X22S-specific channel/relay counts; RS-232C commands, baud, framing; firmware version compatibility; any X22S-only command set or quirks."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
