---
spec_id: admin/controlbyweb-fridgealert
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb Fridgealert Control Spec"
manufacturer: ControlByWeb
model_family: Fridgealert
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - Fridgealert
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/wp-content/uploads/2024/01/fridgealert-users-manual_v1.0.pdf
retrieved_at: 2026-06-30T15:14:47.546Z
last_checked_at: 2026-07-07T11:09:18.090Z
generated_at: 2026-07-07T11:09:18.090Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SNMP, MQTT, Remote Services, and ControlByWeb Cloud interfaces are documented in the source but are out of scope for this revision."
  - "no explicit power on/off command in source; relays are switched, device is always-on"
  - "no analog level-setting commands found; register values are settable but discrete"
  - "source describes SNMP traps (relay state change, sensor threshold, supply"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "SNMP v1/v2c/v3, MQTT 3.1.1 + Sparkplug B, Remote Services (TCP V1 connection with ACK), and ControlByWeb Cloud DAT URL interfaces are documented in the source but not covered in this revision."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:09:18.090Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions match literal source evidence; transport parameters verified; HTTP and Modbus command catalogues fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb Fridgealert Control Spec

## Summary
The ControlByWeb Fridgealert is a network-attached monitoring and relay-control device that exposes its I/O state and accepts control commands over HTTP GET requests, Modbus/TCP, SNMP, and MQTT. This spec covers the HTTP and Modbus/TCP control interfaces described in the vendor manual.

<!-- UNRESOLVED: SNMP, MQTT, Remote Services, and ControlByWeb Cloud interfaces are documented in the source but are out of scope for this revision. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 80  # stated default in source ("If the TCP port has been changed (not port 80)")
  base_url: /state.xml  # stated path pattern (also /state.json, /customState.xml, /customState.json)
auth:
  type: basic  # source describes optional HTTP Basic auth (Base64-encoded "name:password") when user account enabled
  notes: "When no User account is enabled on the module, GET requests require no auth. When enabled, HTTP Basic auth header is required; example credential none:webrelay encodes to bm9uZTp3ZWJyZWxheQ=="
```

## Traits
```yaml
powerable: false  # UNRESOLVED: no explicit power on/off command in source; relays are switched, device is always-on
routable: true  # inferred from relay control commands (relay1, relay2, ...)
queryable: true  # inferred from state.xml/state.json read commands and Modbus read functions
levelable: false  # UNRESOLVED: no analog level-setting commands found; register values are settable but discrete
```

## Actions
```yaml
# HTTP GET control commands documented in source
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

- id: set_relay1_off
  label: Turn Relay 1 OFF
  kind: action
  command: "GET /state.xml?relay1=0 HTTP/1.1\r\n\r\n"
  params: []

- id: set_relay1_on
  label: Turn Relay 1 ON
  kind: action
  command: "GET /state.xml?relay1=1 HTTP/1.1\r\n\r\n"
  params: []

- id: set_relay1_pulse
  label: Pulse Relay 1 (preset time)
  kind: action
  command: "GET /state.xml?relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: set_relay1_pulse_time
  label: Pulse Relay 1 for N seconds
  kind: action
  command: "GET /state.json?pulseTime1={seconds}&relay1=2 HTTP/1.1\r\n\r\n"
  params:
    - name: seconds
      type: integer
      description: Pulse duration in seconds (e.g. 5, 15). Note: pulseTime1 must come before relay1=2 in the URL.

- id: set_relay2_off
  label: Turn Relay 2 OFF
  kind: action
  command: "GET /state.xml?relay2=0 HTTP/1.1\r\n\r\n"
  params: []

- id: set_relay2_on
  label: Turn Relay 2 ON
  kind: action
  command: "GET /state.xml?relay2=1 HTTP/1.1\r\n\r\n"
  params: []

- id: set_relay2_pulse
  label: Pulse Relay 2 (preset time)
  kind: action
  command: "GET /state.xml?relay2=2 HTTP/1.1\r\n\r\n"
  params: []

- id: set_on_time
  label: Set onTime
  kind: action
  command: "GET /state.xml?onTime1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: number
      description: Time in seconds to set onTime1 (e.g. 0 to reset, 5, etc.)

- id: set_total_on_time
  label: Set totalOnTime
  kind: action
  command: "GET /state.xml?totalOnTime1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: number
      description: Time in seconds to set totalOnTime1

- id: set_counter
  label: Set Counter Value
  kind: action
  command: "GET /state.json?count1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: Counter value (e.g. 200)

- id: set_register
  label: Set Register Value
  kind: action
  command: "GET /state.xml?register1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: number
      description: Register value (e.g. 10.5, supports float)

- id: read_log_txt
  label: Read Data Log
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_log_txt
  label: Erase Data Log
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: read_syslog_txt
  label: Read System Log
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_syslog_txt
  label: Erase System Log
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

# Modbus/TCP commands documented in source (port 502)
- id: modbus_read_coils
  label: Modbus Read Coils (Function 0x01)
  kind: query
  command: "Modbus/TCP function 0x01 - Read Coils"
  params:
    - name: start_address
      type: integer
      description: Coil start address per Modbus map
    - name: coil_quantity
      type: integer
      description: Number of coils to read

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (Function 0x02)
  kind: query
  command: "Modbus/TCP function 0x02 - Read Discrete Inputs"
  params:
    - name: start_address
      type: integer
      description: Discrete input start address per Modbus map
    - name: input_quantity
      type: integer
      description: Number of discrete inputs to read

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (Function 0x03)
  kind: query
  command: "Modbus/TCP function 0x03 - Read Holding Registers (Vin, sensors, registers, counters, analog inputs)"
  params:
    - name: start_address
      type: integer
      description: Holding register start address (read in pairs of 2 for 32-bit floats)
    - name: register_quantity
      type: integer
      description: Number of registers to read (must be divisible by 2)

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (Function 0x05)
  kind: action
  command: "Modbus/TCP function 0x05 - Write Single Coil (0x00 = Off, 0xFF = On)"
  params:
    - name: start_address
      type: integer
      description: Coil start address per Modbus map
    - name: value
      type: integer
      description: 0x00 (Off) or 0xFF (On)

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (Function 0x0F)
  kind: action
  command: "Modbus/TCP function 0x0F - Write Multiple Coils (0x0000-0xFFFF bitmask)"
  params:
    - name: start_address
      type: integer
      description: Coil start address
    - name: output_quantity
      type: integer
      description: Number of coils to write
    - name: byte_count
      type: integer
      description: Output quantity divided by 8
    - name: value
      type: string
      description: Digital I/O value bitmask (e.g. 0xFFFF = all ON, 0xF0 = first 4 OFF, next 4 ON)

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (Function 0x10)
  kind: action
  command: "Modbus/TCP function 0x10 - Write Multiple Registers (IEEE 754 float, endianness per setup)"
  params:
    - name: start_address
      type: integer
      description: Register start address (must be paired for 32-bit values)
    - name: register_quantity
      type: integer
      description: Number of registers to write (must be divisible by 2)
    - name: value
      type: number
      description: IEEE 754 floating point value
```

## Feedbacks
```yaml
# One entry per observable state from state.xml/json. The Fridgealert only exposes
# I/O that have been assigned a 'Local I/O Number' - exact set is per-device.
- id: digital_input
  type: enum
  values: [0, 1]
  description: 0=off (no voltage applied), 1=on (voltage applied)

- id: relay_state
  type: enum
  values: [0, 1]
  description: 0=off (coil off), 1=on (coil energized)

- id: analog_input
  type: number
  description: Scaled value of analog input X (volts)

- id: vin
  type: number
  description: Scaled internal Vin measurement (always present in state.xml/json)

- id: register_value
  type: number
  description: Value of register X

- id: on_time
  type: number
  description: Time in seconds how long the input was on since last coming on

- id: total_on_time
  type: number
  description: Total time in seconds how long the input has been on

- id: count
  type: number
  description: Counter value associated with input X

- id: frequency
  type: number
  description: Frequency associated with input X

- id: utc_time
  type: integer
  description: Current UTC time in seconds since January 1, 1970

- id: timezone_offset
  type: integer
  description: Offset in seconds to apply to utcTime for local time

- id: serial_number
  type: string
  description: Device MAC/serial number (format 00:00:00:00:00:00)

- id: one_wire_sensor
  type: string
  description: "x.x = sensor unread; numeric value (e.g. 77.3) or with units (e.g. 77.3 F) when showUnits=1"
```

## Variables
```yaml
# Per-device setpoints configurable via state.xml/json or customState.xml/json.
# Tag names depend on which I/O have a Local I/O Number assigned.
- id: on_time
  type: number
  writable: true
  description: Seconds the input has been on since last coming on; settable via onTime1=

- id: total_on_time
  type: number
  writable: true
  description: Total seconds the input has been on; settable via totalOnTime1=

- id: count
  type: integer
  writable: true
  description: Counter value; settable via count1=

- id: register
  type: number
  writable: true
  description: Register value (supports float); settable via register1=
```

## Events
```yaml
# UNRESOLVED: source describes SNMP traps (relay state change, sensor threshold, supply
# voltage out of range) and MQTT publish events but does not enumerate their exact topic
# names, payload schemas, or triggering conditions beyond generic mention. Not included.
```

## Macros
```yaml
# Multi-command examples from source
- id: multiple_relay_command
  label: Multiple Relay Command (single GET)
  steps:
    - "GET /customState.xml?relay1=1&relay2=0"
    - "GET /state.json?relay1=1&relay2=0"
  description: Combine multiple XML/JSON arguments in a single command

- id: custom_named_register_set
  label: Set Custom-Named Register
  steps:
    - "GET /customState.xml?myRegister1=10"
    - "GET /customState.json?myRegister1=10"
  description: Use the Camel-case custom name shown in customState.xml tags (e.g. 'My Register 1' -> 'myRegister1')
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. The note about Modbus being disabled when
# the User account is enabled is an operational constraint, not a safety interlock.
notes:
  - "When the User account is enabled, Modbus/TCP communications are disabled (Modbus/TCP does not support password protection)."
  - "Two TCP sockets are available for Modbus/TCP; requests for more than two concurrent connections will be rejected."
  - "Modbus/TCP connections time out after 50 seconds of inactivity; send periodic reads to keep the connection open."
```

## Notes
- Default HTTP port is 80; alternative example in source uses port 8000 (`:8000/log.txt`) when the port has been changed.
- Default HTTP Basic credentials when User account is enabled: username `none`, password `webrelay` (Base64 `bm9uZTp3ZWJyZWxheQ==`).
- Modbus/TCP default port is 502 (configurable under Advanced Network tab).
- Modbus/TCP register values are 32-bit IEEE 754 floats; endianness (little- or big-endian) is configured in the Advanced Network tab. Little-endian example: 81.25 → `0x800042A2`. Big-endian: `0x42A2 0x8000`.
- Modbus/TCP sensor values must be read in pairs of 2 registers (32-bit). Uninstalled temperature/humidity sensors return `0xFFFFFFFF` (NaN).
- pulseTime argument MUST come before the relay1=2 argument in the URL.
- state.xml/json only shows I/O that have been assigned a Local I/O Number; exact tag set is per-device configuration.
- Modbus error responses: original function code + 0x80 (e.g. read coils error → 0x81), with exception codes 0x01 (unsupported) or 0x02 (bad address/quantity).

<!-- UNRESOLVED: SNMP v1/v2c/v3, MQTT 3.1.1 + Sparkplug B, Remote Services (TCP V1 connection with ACK), and ControlByWeb Cloud DAT URL interfaces are documented in the source but not covered in this revision. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/wp-content/uploads/2024/01/fridgealert-users-manual_v1.0.pdf
retrieved_at: 2026-06-30T15:14:47.546Z
last_checked_at: 2026-07-07T11:09:18.090Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:09:18.090Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions match literal source evidence; transport parameters verified; HTTP and Modbus command catalogues fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SNMP, MQTT, Remote Services, and ControlByWeb Cloud interfaces are documented in the source but are out of scope for this revision."
- "no explicit power on/off command in source; relays are switched, device is always-on"
- "no analog level-setting commands found; register values are settable but discrete"
- "source describes SNMP traps (relay state change, sensor threshold, supply"
- "source contains no explicit safety warnings, interlock procedures,"
- "SNMP v1/v2c/v3, MQTT 3.1.1 + Sparkplug B, Remote Services (TCP V1 connection with ACK), and ControlByWeb Cloud DAT URL interfaces are documented in the source but not covered in this revision."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
