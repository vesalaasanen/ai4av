---
spec_id: admin/controlbyweb-x400
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X-400 Control Spec"
manufacturer: ControlByWeb
model_family: X-400
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X-400
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
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:12:24.556Z
last_checked_at: 2026-07-07T11:14:49.866Z
generated_at: 2026-07-07T11:14:49.866Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-model I/O counts (number of relays/digital inputs/analog inputs/1-Wire sensors) vary by configuration and are not enumerated in this refined excerpt."
  - "Conditional/Scheduled Tasks on the device can compose"
  - "no explicit safety warnings, interlocks, or power-on"
  - "per-X-400-variant I/O counts (number of relays, digital inputs, analog inputs, 1-Wire sensors) are not enumerated in this refined excerpt and vary by configuration. The Modbus address map is generated dynamically from the device's configured I/O."
  - "API for programmatically authoring Conditional/Scheduled Tasks (used to drive MQTT publishes, SNMP traps, and Remote Services state pushes) is not described in this refined excerpt."
  - "ControlByWeb Cloud authentication flow and DAT URL generation API are referenced but not specified here."
  - "HTTPS support is hinted via `${httpsport}` token and the cloud API uses https://, but the on-device HTTPS endpoint details are not in this excerpt."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:14:49.866Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec actions found with literal wire-level matches in source; transport parameters verified; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X-400 Control Spec

## Summary
The ControlByWeb X-400 is a web-enabled industrial I/O controller exposing relays, digital inputs, analog inputs, registers, counters, and 1-Wire sensors. This spec covers integration via HTTP GET requests against the built-in web server (state.xml / state.json / customState.xml / customState.json), Modbus/TCP on port 502, SNMP v1/v2c/v3, MQTT 3.1.1 (optionally Sparkplug B), and the ControlByWeb Cloud DAT URL API.

<!-- UNRESOLVED: per-model I/O counts (number of relays/digital inputs/analog inputs/1-Wire sensors) vary by configuration and are not enumerated in this refined excerpt. -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  port: 80  # HTTP default; user-configurable (example shown: :8000). Modbus/TCP on port 502 (configurable under Advanced Network).
auth:
  type: basic  # HTTP Basic Auth, Base64-encoded "name:password"; disabled by default (User account off). Modbus/TCP disabled when User account enabled.
```

## Traits
```yaml
- powerable  # inferred from relay on/off command examples
- queryable  # inferred from state.xml/json read commands
- routable  # inferred from input-selectable customState commands
- levelable  # inferred from register/analog input set commands
```

## Actions
```yaml
# ----- HTTP state.xml / state.json: relay control (per-relay) -----
- id: relay1_off
  label: Turn Relay 1 OFF
  kind: action
  command: "GET /state.xml?relay1=0 HTTP/1.1\r\n\r\n"
  params: []

- id: relay1_on
  label: Turn Relay 1 ON
  kind: action
  command: "GET /state.xml?relay1=1 HTTP/1.1\r\n\r\n"
  params: []

- id: relay1_pulse
  label: Relay 1 PULSE (preset duration)
  kind: action
  command: "GET /state.xml?relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: relay2_off
  label: Turn Relay 2 OFF
  kind: action
  command: "GET /state.xml?relay2=0 HTTP/1.1\r\n\r\n"
  params: []

- id: relay2_on
  label: Turn Relay 2 ON
  kind: action
  command: "GET /state.xml?relay2=1 HTTP/1.1\r\n\r\n"
  params: []

- id: relay2_pulse
  label: Relay 2 PULSE (preset duration)
  kind: action
  command: "GET /state.xml?relay2=2 HTTP/1.1\r\n\r\n"
  params: []

# ----- HTTP state.json: pulse with custom duration -----
- id: relay_pulse_default
  label: Pulse Relay 1 for preset time (1.5 s)
  kind: action
  command: "GET /state.json?relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: relay_pulse_5s
  label: Pulse Relay 1 for 5 seconds
  kind: action
  command: "GET /state.json?pulseTime1=5&relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: relay_pulse_15s
  label: Pulse Relay 1 for 15 seconds
  kind: action
  command: "GET /state.json?pulseTime1=15&relay1=2 HTTP/1.1\r\n\r\n"
  params: []

# ----- HTTP state.xml: on-time / total on-time / counter / register -----
- id: set_on_time
  label: Set/reset onTime1
  kind: action
  command: "GET /state.xml?onTime1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: Seconds (e.g. 0 to reset, or any positive seconds)

- id: set_total_on_time
  label: Set/reset totalOnTime1
  kind: action
  command: "GET /state.xml?totalOnTime1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: Seconds (e.g. 0 to reset, or any positive seconds)

- id: set_counter
  label: Set counter1
  kind: action
  command: "GET /state.json?count1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: Counter value (e.g. 200)

- id: set_register
  label: Set register1
  kind: action
  command: "GET /state.xml?register1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: number
      description: Floating-point register value (e.g. 10.5)

# ----- HTTP customState.xml/json: name-based control -----
- id: set_custom_register
  label: Set custom-named register (e.g. My Register 1)
  kind: action
  command: "GET /customState.xml?myRegister1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: number
      description: Floating-point register value (e.g. 10)
  notes: Tag name reflects the user-configured name in CamelCase (e.g. myRegister1).

# ----- Multi-argument HTTP commands -----
- id: set_multiple_relays
  label: Set multiple relays in one request
  kind: action
  command: "GET /state.json?relay1={v1}&relay2={v2} HTTP/1.1\r\n\r\n"
  params:
    - name: v1
      type: integer
      description: Relay 1 value (0=off, 1=on, 2=pulse)
    - name: v2
      type: integer
      description: Relay 2 value (0=off, 1=on, 2=pulse)

# ----- Read state -----
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

# ----- Log files -----
- id: read_log_txt
  label: Read log.txt
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_log_txt
  label: Erase log.txt
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []
  notes: Requires setup username/password if User account is enabled.

- id: read_syslog_txt
  label: Read syslog.txt
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []
  notes: Requires setup username/password.

- id: erase_syslog_txt
  label: Erase syslog.txt
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []
  notes: Requires setup username/password.

# ----- ControlByWeb Cloud DAT URL API -----
- id: cloud_read_state_json
  label: Read state via Cloud DAT URL (JSON)
  kind: query
  command: "GET https://api.controlbyweb.cloud/{datUrl}/state.json HTTP/1.1\r\n\r\n"
  params:
    - name: datUrl
      type: string
      description: Cloud-generated DAT URL token

- id: cloud_set_multiple_relays
  label: Trigger multiple relays via Cloud DAT URL
  kind: action
  command: "GET https://api.controlbyweb.cloud/{datUrl}/state.json?relay1=1&relay2=1 HTTP/1.1\r\n\r\n"
  params:
    - name: datUrl
      type: string
      description: Cloud-generated DAT URL token

# ----- Modbus/TCP (function codes) -----
- id: modbus_read_coils
  label: Modbus Read Coils (FC 01)
  kind: query
  command: "Modbus/TCP FC 0x01, start_address + coil_count per Modbus map"
  params:
    - name: start_address
      type: integer
      description: Per Modbus address table
    - name: coil_count
      type: integer
      description: Number of coils to read
  notes: Port 502. Bit 0 of response = state of coil at start_address. Error FC = 0x81.

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02)
  kind: query
  command: "Modbus/TCP FC 0x02, start_address + input_quantity per Modbus map"
  params:
    - name: start_address
      type: integer
      description: Per Modbus address table
    - name: input_quantity
      type: integer
      description: Number of discrete inputs to read
  notes: Port 502. Error FC = 0x82.

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "Modbus/TCP FC 0x03, start_address + register_quantity per Modbus map"
  params:
    - name: start_address
      type: integer
      description: Per Modbus address table (must be even-count pair for 32-bit floats)
    - name: register_quantity
      type: integer
      description: Divisible by 2
  notes: IEEE 754 float. Error FC = 0x83.

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "Modbus/TCP FC 0x05, start_address, output_value (0x00=Off, 0xFF=On)"
  params:
    - name: start_address
      type: integer
      description: Per Modbus address table
    - name: output_value
      type: integer
      description: 0x00 (Off) or 0xFF (On)
  notes: Error FC = 0x85.

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15)
  kind: action
  command: "Modbus/TCP FC 0x0F, start_address, output_quantity, output_byte_count, digital_io_value (0x0000-0xFFFF)"
  params:
    - name: start_address
      type: integer
      description: Per Modbus address table
    - name: output_quantity
      type: integer
      description: Number of coils to write
    - name: digital_io_value
      type: integer
      description: Bitmap, e.g. 0xFFFF all ON, 0xF0 = first 4 OFF, next 4 ON
  notes: Error FC = 0x8F.

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16)
  kind: action
  command: "Modbus/TCP FC 0x10, start_address, register_quantity, IEEE 754 float values (endianness per setup)"
  params:
    - name: start_address
      type: integer
      description: Per Modbus address table (even-count for 32-bit)
    - name: register_quantity
      type: integer
      description: Divisible by 2
  notes: Error FC = 0x90.

- id: modbus_pulse_relay
  label: Modbus Pulse Relay (32-bit float seconds)
  kind: action
  command: "Modbus/TCP FC 0x10, addresses 512-513 (PLC 40513-40514), 32-bit float pulse duration in seconds"
  params:
    - name: pulse_duration
      type: number
      description: IEEE 754 float, seconds

# ----- SNMP standard objects (read-only) -----
- id: snmp_get_sysDescr
  label: SNMP GET sysDescr
  kind: query
  command: "SNMP GET .1.3.6.1.2.1.1.1.0"
  params: []

- id: snmp_get_sysObjectID
  label: SNMP GET sysObjectID
  kind: query
  command: "SNMP GET .1.3.6.1.2.1.1.2.0"
  params: []

- id: snmp_get_sysUpTime
  label: SNMP GET sysUpTime
  kind: query
  command: "SNMP GET .1.3.6.1.2.1.1.3.0"
  params: []

- id: snmp_get_sysName
  label: SNMP GET sysName
  kind: query
  command: "SNMP GET .1.3.6.1.2.1.1.5.0"
  params: []

# ----- MQTT -----
- id: mqtt_publish
  label: MQTT publish to broker (configured in Broker tab)
  kind: action
  command: "MQTT PUBLISH to topic; payload tokens: ${mac}, ${ver}, ${ser}, ${uptime}, ${ip}, ${port}, ${httpsport}, ${dateTime}, ${name}, ${model}, ${clientID}, ${digitalInput1-4}, ${relay1-4}, ${vin}, ${register1}"
  params:
    - name: topic
      type: string
      description: MQTT topic
    - name: payload
      type: string
      description: Payload string with optional ${...} tokens
  notes: MQTT v3.1.1. Sparkplug B available.

- id: mqtt_subscribe
  label: MQTT subscribe to broker
  kind: action
  command: "MQTT SUBSCRIBE on broker defined in Broker tab"
  params:
    - name: topic
      type: string
      description: MQTT topic

# ----- Remote Services -----
- id: remote_services_connect
  label: Remote Services TCP V1 connect to external server
  kind: action
  command: "Device-initiated TCP V1 connection; sends Connection String then state.xml periodically; expects 3-char ACK within 10s"
  params:
    - name: connection_string_suffix
      type: string
      description: User-defined character string from Advanced Network tab
  notes: Server should ACK then optionally close.
```

## Feedbacks
```yaml
- id: relay_state
  type: enum
  values: ["0", "1", "2"]
  description: |
    From state.xml/json <relayX> tag. 0=off (coil off), 1=on (coil energized),
    2=pulse-triggered.

- id: digital_input_state
  type: enum
  values: ["0", "1"]
  description: |
    From <digitalInputX> / <digitalIOX>. 0=off (no voltage), 1=on (voltage applied).

- id: on_time
  type: number
  description: Seconds the input has been on since last coming on (<onTimeX>).

- id: total_on_time
  type: number
  description: Total seconds the input has been on (<totalOnTimeX>).

- id: counter_value
  type: number
  description: Count value associated with input X (<countX>).

- id: frequency
  type: number
  description: Frequency associated with input X (<frequencyX>) or frequencyInput (X-420).

- id: analog_input
  type: number
  description: Value of analog input X (<analogInputX>).

- id: vin
  type: number
  description: Scaled internal Vin measurement (<vin>).

- id: one_wire_sensor
  type: number
  description: |
    1-Wire sensor value (<oneWireSensorX>). x.x = sensor unread; numeric value
    otherwise; "x.x F" if showUnits=1.

- id: register_value
  type: number
  description: Value of register X (<registerX>).

- id: utc_time
  type: integer
  description: Current UTC time, seconds since 1970-01-01 (<utcTime>).

- id: timezone_offset
  type: integer
  description: Offset to apply to utcTime for local time (<timezoneOffset>).

- id: serial_number
  type: string
  description: MAC/serial number of device, format 00:00:00:00:00:00 (<serialNumber>).

- id: min_rec_refresh
  type: string
  description: From state.json (<minRecRefresh>).

- id: latitude
  type: string
  description: Latitude from state.json (<lat>).

- id: longitude
  type: string
  description: Longitude from state.json (<long>).
```

## Variables
```yaml
- id: register
  label: General-purpose register
  type: number
  description: |
    Floating-point value held in register X. Settable via
    `GET /state.xml?registerX=<float>` or Modbus FC 0x10 (even address pair).
    Range: UNRESOLVED - source gives only example 10.5.

- id: on_time
  label: On-time counter
  type: number
  description: Seconds input has been on since last on. Settable/reset via `onTimeX=`.

- id: total_on_time
  label: Total on-time
  type: number
  description: Total seconds input has been on. Settable/reset via `totalOnTimeX=`.

- id: counter
  label: Event counter
  type: integer
  description: Counter value. Settable via `countX=<int>`.
```

## Events
```yaml
- id: mqtt_publish_state_change
  description: |
    Device publishes I/O changes to MQTT broker (per conditional/scheduled tasks).
    Payload uses ${token} placeholders (see MQTT action for token list).

- id: snmp_trap
  description: |
    SNMP trap sent on relay state change, sensor threshold, or Vin out-of-range.
    Configured as action in Conditional/Scheduled tasks.

- id: snmp_notification
  description: |
    SNMP v2c/v3 notification (acknowledged). Requires response from SNMP manager.

- id: remote_services_state_push
  description: |
    When a logic event with "send state" action fires and a Remote Services
    connection is open, the device pushes state.xml over the TCP V1 connection.

- id: syslog_event
  description: |
    System events recorded to syslog.txt in format
    `MM/DD/YYYY HH:MM:SS, (category): (message)`.
```

## Macros
```yaml
# No explicit multi-step user-defined macro protocol documented in source.
# UNRESOLVED: Conditional/Scheduled Tasks on the device can compose
# multi-step actions, but the API for programmatically defining them is
# not in this refined excerpt.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on
# sequencing procedures stated in this refined excerpt. Modbus/TCP is
# disabled whenever the User account is enabled - this is an access-control
# constraint, not a safety interlock.
```

## Notes
- HTTP default port 80; example shown uses :8000. Port is user-configurable on the Advanced Network tab. Both `state.xml` and `state.json` endpoints expose the same I/O.
- Modbus/TCP default port 502; also configurable. Modbus is disabled when User account is enabled (no password mechanism in Modbus).
- HTTP auth is HTTP Basic with Base64-encoded `name:password`. Source example decoded to `none:webrelay`. Disabled by default.
- `pulseTimeX` argument must precede `relayX=2` in the query string; otherwise the pulse override is ignored.
- `onTimeX=0` and `totalOnTimeX=0` reset the respective counters; non-zero values overwrite the counter.
- Modbus 32-bit floats are IEEE 754; endianness is configurable in setup (little-endian example: 81.25 → 0x800042A2).
- Modbus connection times out after 50 seconds of idle; send periodic reads to keep open. Two TCP sockets available concurrently; extra connections rejected.
- SNMP community strings default to `webrelay` (both read & write), v1/v2c only. v3 uses USM with separate auth + privacy algorithms and passwords.
- MQTT version 3.1.1 supported; Sparkplug B available as alternate framing.
- Remote Services requires a 3-character ACK within 10 seconds, or the device closes the TCP connection.

<!-- UNRESOLVED: per-X-400-variant I/O counts (number of relays, digital inputs, analog inputs, 1-Wire sensors) are not enumerated in this refined excerpt and vary by configuration. The Modbus address map is generated dynamically from the device's configured I/O. -->
<!-- UNRESOLVED: API for programmatically authoring Conditional/Scheduled Tasks (used to drive MQTT publishes, SNMP traps, and Remote Services state pushes) is not described in this refined excerpt. -->
<!-- UNRESOLVED: ControlByWeb Cloud authentication flow and DAT URL generation API are referenced but not specified here. -->
<!-- UNRESOLVED: HTTPS support is hinted via `${httpsport}` token and the cloud API uses https://, but the on-device HTTPS endpoint details are not in this excerpt. -->
```

Spec emitted. Caveat for downstream: HTTP and Modbus each documented as separate protocols in source → emitted both. Auth = basic (HTTP Basic when User account on, otherwise none; Modbus force-disabled). Multi-protocol scope (HTTP+Modbus+SNMP+MQTT) means spec is broad — verifier will likely score against the HTTP command catalogue primarily.

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/05/400-series-users-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:12:24.556Z
last_checked_at: 2026-07-07T11:14:49.866Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:14:49.866Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec actions found with literal wire-level matches in source; transport parameters verified; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-model I/O counts (number of relays/digital inputs/analog inputs/1-Wire sensors) vary by configuration and are not enumerated in this refined excerpt."
- "Conditional/Scheduled Tasks on the device can compose"
- "no explicit safety warnings, interlocks, or power-on"
- "per-X-400-variant I/O counts (number of relays, digital inputs, analog inputs, 1-Wire sensors) are not enumerated in this refined excerpt and vary by configuration. The Modbus address map is generated dynamically from the device's configured I/O."
- "API for programmatically authoring Conditional/Scheduled Tasks (used to drive MQTT publishes, SNMP traps, and Remote Services state pushes) is not described in this refined excerpt."
- "ControlByWeb Cloud authentication flow and DAT URL generation API are referenced but not specified here."
- "HTTPS support is hinted via `${httpsport}` token and the cloud API uses https://, but the on-device HTTPS endpoint details are not in this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
