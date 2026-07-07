---
spec_id: admin/controlbyweb-x405
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X-405 Control Spec"
manufacturer: ControlByWeb
model_family: X-405
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X-405
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:04:57.849Z
last_checked_at: 2026-07-07T12:27:13.303Z
generated_at: 2026-07-07T12:27:13.303Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document is the 400-Series Integration & Communication Protocols manual, not an X-405-specific datasheet. I/O counts and feature set inferred from generic 400-Series examples."
  - "RS-232/serial interface not mentioned for the X-405; if present, transport parameters must be sourced separately."
  - "explicit unit/slave ID not stated in source"
  - "not clearly an input/output router; omit if not applicable"
  - "range not stated in source"
  - "range not stated"
  - "source describes I/O control primitives only; no explicit multi-step macros documented."
  - "no safety warnings, interlocks, or power-on sequencing requirements stated in source."
  - "X-405-specific voltage, current, power, and environmental ratings not present in this source; pull from X-405 datasheet."
  - "HTTPS support mentioned implicitly (MQTT payload token ${httpsport}) but not documented in the integration protocol sections above."
  - "Cloud / ControlByWeb Cloud remote-access auth flow not detailed in this source."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:27:13.303Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions matched verbatim in source; transport parameters confirmed; one-to-one coverage with no omissions. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X-405 Control Spec

## Summary
The ControlByWeb X-405 is an Ethernet-attached industrial I/O module exposing relays, digital inputs, analog inputs, registers, counters, and a Vin supply reading. This spec covers its TCP/IP integration surface: HTTP GET (XML/JSON) control/monitor, Modbus/TCP slave, SNMP v1/v2c/v3, and MQTT v3.1.1 (with Sparkplug B).

<!-- UNRESOLVED: Source document is the 400-Series Integration & Communication Protocols manual, not an X-405-specific datasheet. I/O counts and feature set inferred from generic 400-Series examples. -->
<!-- UNRESOLVED: RS-232/serial interface not mentioned for the X-405; if present, transport parameters must be sourced separately. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 80  # default HTTP port per source ("not port 80" implies default is 80)
auth:
  type: none  # inferred: no auth procedure in source for HTTP/Modbus/SNMP v1/v2c paths (User account must be disabled for Modbus/SNMP)
```

```yaml
# Modbus/TCP sub-protocol on the same TCP transport
modbus:
  port: 502  # default Modbus port per source; configurable under Advanced Network tab
  unit_id: 1  # UNRESOLVED: explicit unit/slave ID not stated in source
  max_concurrent_connections: 2
```

```yaml
# HTTP basic auth used when User account is enabled (HTTP/XML/JSON paths only)
http_basic_auth:
  encoding: base64
  default_credentials: "none:webrelay"  # Base64 = bm9uZTp3ZWJyZWxheQ==
```

## Traits
```yaml
- powerable   # inferred from relay on/off and pulse commands
- queryable   # inferred from state.xml/json and Modbus read function codes
- routable    # UNRESOLVED: not clearly an input/output router; omit if not applicable
- levelable   # inferred from register/analog set commands
```

## Actions
```yaml
# HTTP GET (XML) control - XML state file
- id: relay_off_xml
  label: Turn Relay Off (XML)
  kind: action
  command: "GET /state.xml?relay{N}=0 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
- id: relay_on_xml
  label: Turn Relay On (XML)
  kind: action
  command: "GET /state.xml?relay{N}=1 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
- id: relay_pulse_xml
  label: Pulse Relay (XML)
  kind: action
  command: "GET /state.xml?relay{N}=2 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
- id: relay_pulse_xml_custom_duration
  label: Pulse Relay with Custom Duration (XML)
  kind: action
  command: "GET /state.xml?pulseTime{N}={seconds}&relay{N}=2 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
    - name: seconds
      type: number
      description: Pulse duration in seconds (must precede relay{N}=2)
- id: relay_pulse_if_off_xml
  label: Pulse Relay Only If Currently Off (firmware >= v3.13.7.8)
  kind: action
  command: "GET /state.xml?relay{N}=3 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
- id: relay_toggle_off_xml
  label: Allow Pulse to Expire / Turn Relay Off (firmware >= v3.13.7.8)
  kind: action
  command: "GET /state.xml?relay{N}=7 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
- id: set_on_time_xml
  label: Set On Time (XML)
  kind: action
  command: "GET /state.xml?onTime{N}={value} HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Input/relay number (1-based)
    - name: value
      type: number
      description: On time value in seconds
- id: set_total_on_time_xml
  label: Set Total On Time (XML)
  kind: action
  command: "GET /state.xml?totalOnTime{N}={value} HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Input/relay number (1-based)
    - name: value
      type: number
      description: Total on time value in seconds
- id: set_counter_xml
  label: Set Counter Value (XML)
  kind: action
  command: "GET /state.xml?count{N}={value} HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Input number (1-based)
    - name: value
      type: integer
      description: Counter value
- id: set_register_xml
  label: Set Register Value (XML)
  kind: action
  command: "GET /state.xml?register{N}={value} HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Register number (1-based)
    - name: value
      type: number
      description: Register value (numeric)
- id: set_register_customstate
  label: Set Register Value (customState.xml)
  kind: action
  command: "GET /customState.xml?{camelCaseName}={value} HTTP/1.1"
  params:
    - name: camelCaseName
      type: string
      description: camelCase name from customState.xml (e.g. myRegister1)
    - name: value
      type: number
      description: Value to set

# HTTP GET (JSON) - same semantics as XML, JSON file variant
- id: relay_off_json
  label: Turn Relay Off (JSON)
  kind: action
  command: "GET /state.json?relay{N}=0 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
- id: relay_on_json
  label: Turn Relay On (JSON)
  kind: action
  command: "GET /state.json?relay{N}=1 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
- id: relay_pulse_json
  label: Pulse Relay Preset Duration (JSON)
  kind: action
  command: "GET /state.json?relay{N}=2 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
- id: relay_pulse_json_custom_duration
  label: Pulse Relay with Custom Duration (JSON)
  kind: action
  command: "GET /state.json?pulseTime{N}={seconds}&relay{N}=2 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
    - name: seconds
      type: number
      description: Pulse duration in seconds (must precede relay{N}=2)
- id: relay_pulse_if_off_json
  label: Pulse Relay Only If Currently Off (firmware >= v3.13.7.8)
  kind: action
  command: "GET /state.json?relay{N}=3 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
- id: relay_toggle_off_json
  label: Allow Pulse to Expire / Turn Relay Off (firmware >= v3.13.7.8)
  kind: action
  command: "GET /state.json?relay{N}=7 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number (1-based)
- id: set_on_time_json
  label: Set On Time (JSON)
  kind: action
  command: "GET /state.json?onTime{N}={value} HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Input/relay number (1-based)
    - name: value
      type: number
      description: On time value in seconds
- id: set_total_on_time_json
  label: Set Total On Time (JSON)
  kind: action
  command: "GET /state.json?totalOnTime{N}={value} HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Input/relay number (1-based)
    - name: value
      type: number
      description: Total on time value in seconds
- id: set_counter_json
  label: Set Counter Value (JSON)
  kind: action
  command: "GET /state.json?count{N}={value} HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Input number (1-based)
    - name: value
      type: integer
      description: Counter value
- id: set_register_json
  label: Set Register Value (JSON)
  kind: action
  command: "GET /state.json?register{N}={value} HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Register number (1-based)
    - name: value
      type: number
      description: Register value (numeric)

# Log file maintenance
- id: erase_data_log
  label: Erase log.txt
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1"
  params: []
- id: erase_syslog
  label: Erase syslog.txt (requires user password)
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1"
  params: []

# Modbus/TCP - read/write functions
- id: modbus_read_coils
  label: Modbus Read Coils (Function 0x01)
  kind: query
  command: "MBAP + 0x01 + startAddress(2) + quantity(2)"  # Modbus/TCP request frame
  params:
    - name: startAddress
      type: integer
      description: Coil start address (per device Modbus map)
    - name: quantity
      type: integer
      description: Number of coils to read
- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (Function 0x02)
  kind: query
  command: "MBAP + 0x02 + startAddress(2) + quantity(2)"
  params:
    - name: startAddress
      type: integer
      description: Discrete input start address
    - name: quantity
      type: integer
      description: Number of discrete inputs to read
- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (Function 0x03)
  kind: query
  command: "MBAP + 0x03 + startAddress(2) + quantity(2)"
  params:
    - name: startAddress
      type: integer
      description: Register start address (32-bit floats read in pairs of 2)
    - name: quantity
      type: integer
      description: Number of registers to read (must be even for 32-bit values)
- id: modbus_write_single_coil
  label: Modbus Write Single Coil (Function 0x05)
  kind: action
  command: "MBAP + 0x05 + startAddress(2) + value(2)"  # value: 0x00 off, 0xFF on
  params:
    - name: startAddress
      type: integer
      description: Coil address
    - name: value
      type: enum
      values: [0x00, 0xFF]
      description: 0x00 = OFF, 0xFF = ON
- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (Function 0x0F)
  kind: action
  command: "MBAP + 0x0F + startAddress(2) + quantity(2) + byteCount(1) + values(n)"
  params:
    - name: startAddress
      type: integer
      description: Coil start address
    - name: quantity
      type: integer
      description: Number of coils to write
    - name: byteCount
      type: integer
      description: Quantity divided by 8
    - name: values
      type: bytes
      description: Coil state bytes (e.g. 0xFFFF = first 16 ON)
- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (Function 0x10)
  kind: action
  command: "MBAP + 0x10 + startAddress(2) + quantity(2) + byteCount(1) + registers(n)"
  params:
    - name: startAddress
      type: integer
      description: Register start address
    - name: quantity
      type: integer
      description: Number of registers to write (must be even)
    - name: registers
      type: bytes
      description: IEEE 754 float values, little- or big-endian per device config

# Modbus pulse relay (via write-multiple-registers, 32-bit float duration in seconds)
- id: modbus_pulse_relay
  label: Pulse Relay via Modbus (Function 0x10)
  kind: action
  command: "MBAP + 0x10 + 0x0200 + 0x0002 + 0x04 + float32(seconds)"
  params:
    - name: seconds
      type: number
      description: Pulse duration in seconds (IEEE 754 32-bit float)

# State queries (HTTP)
- id: get_state_xml
  label: Get Device State (XML)
  kind: query
  command: "GET /state.xml HTTP/1.1"
  params: []
- id: get_state_json
  label: Get Device State (JSON)
  kind: query
  command: "GET /state.json HTTP/1.1"
  params: []
- id: get_custom_state_xml
  label: Get Device State - Custom Names (XML)
  kind: query
  command: "GET /customState.xml HTTP/1.1"
  params: []
- id: get_custom_state_json
  label: Get Device State - Custom Names (JSON)
  kind: query
  command: "GET /customState.json HTTP/1.1"
  params: []
- id: get_data_log
  label: Read Data Log (log.txt)
  kind: query
  command: "GET /log.txt HTTP/1.1"
  params: []
- id: get_syslog
  label: Read System Log (syslog.txt, requires user password)
  kind: query
  command: "GET /syslog.txt HTTP/1.1"
  params: []

# SNMP PDUs (operations supported by the module)
- id: snmp_get_request
  label: SNMP GetRequest
  kind: query
  command: "SNMPv1/v2c/v3 GetRequest PDU (community or USM credentials)"
  params: []
- id: snmp_getnext_request
  label: SNMP GetNextRequest
  kind: query
  command: "SNMPv1/v2c/v3 GetNextRequest PDU"
  params: []
- id: snmp_getbulk_request
  label: SNMP GetBulkRequest
  kind: query
  command: "SNMPv2c/v3 GetBulkRequest PDU"
  params: []
- id: snmp_set_request
  label: SNMP SetRequest
  kind: action
  command: "SNMPv1/v2c/v3 SetRequest PDU"
  params: []

# MQTT operations (logical actions supported via the protocol)
- id: mqtt_publish_io_change
  label: MQTT Publish (on I/O state change)
  kind: action
  command: "MQTT PUBLISH on configured topic (Sparkplug B or standard)"
  params: []
- id: mqtt_subscribe_io
  label: MQTT Subscribe (receive I/O updates from peer devices)
  kind: action
  command: "MQTT SUBSCRIBE on configured topic"
  params: []
```

## Feedbacks
```yaml
# state.xml / state.json observable tags
- id: digital_input
  type: enum
  values: [0, 1]
  description: 0 = off (no voltage), 1 = on (voltage applied)
- id: relay_state
  type: enum
  values: [0, 1]
  description: 0 = coil off, 1 = coil energized
- id: digital_io
  type: enum
  values: [0, 1]
  description: Digital I/O state (0 = off, 1 = on)
- id: on_time
  type: number
  description: Seconds the input has been on since last coming on
- id: total_on_time
  type: number
  description: Total seconds the input has been on
- id: count
  type: integer
  description: Counter value associated with input X
- id: frequency
  type: number
  description: Frequency value associated with input X
- id: analog_input
  type: number
  description: Value of analog input X
- id: vin
  type: number
  description: Scaled internal Vin supply measurement
- id: register
  type: number
  description: Value of register X
- id: one_wire_sensor
  type: string
  description: "77.3 = sensor value; with showUnits=1 returns e.g. '77.3 F'; x.x = read failure"
- id: utc_time
  type: integer
  description: Current UTC time in seconds since 1970-01-01
- id: timezone_offset
  type: integer
  description: Offset to add to utcTime for local time
- id: serial_number
  type: string
  description: Device MAC/serial (e.g. 00:0C:C8:00:00:00)

# SNMP standard objects
- id: sys_descr
  type: string
  description: "system.sysDescr - returns 'X-4xx'"
- id: sys_object_id
  type: string
  description: "system.sysObjectID - returns 'X4xx'"
- id: sys_up_time
  type: integer
  description: "system.sysUpTime - hundredths of seconds since last power-up"
- id: sys_name
  type: string
  description: "system.sysName - returns 'X-4xx*'"

# Modbus observable return types
- id: modbus_coil_state
  type: enum
  values: [0, 1]
  description: Bit in coil read response (1 = ON, 0 = OFF)
- id: modbus_register_float
  type: number
  description: 32-bit IEEE 754 float returned for sensor/Vin/register reads (little- or big-endian per device config)
```

## Variables
```yaml
# Settable per-I/O numeric values exposed via HTTP GET and Modbus
- id: register_value
  type: number
  range: null  # UNRESOLVED: range not stated in source
  description: Internal register N (1-based), set via register{N}={value}
- id: on_time_value
  type: number
  range: null  # UNRESOLVED: range not stated
  description: Resettable on-time accumulator in seconds (onTime{N})
- id: total_on_time_value
  type: number
  range: null  # UNRESOLVED: range not stated
  description: Resettable total-on-time accumulator in seconds (totalOnTime{N})
- id: counter_value
  type: integer
  range: null  # UNRESOLVED: range not stated
  description: Counter N value (count{N})
- id: pulse_time_override
  type: number
  description: One-shot pulse duration in seconds (pulseTime{N}); does not persist
```

## Events
```yaml
# Module-initiated outbound messages
- id: snmp_trap
  description: SNMP Trap sent when a relay changes state, a sensor threshold is crossed, or Vin goes out of range. Configured as actions in Conditional/Scheduled tasks.
- id: snmp_notification
  description: SNMP Notification (v2c/v3) - like a trap but requires acknowledgement; retried on no-response.
- id: mqtt_publish_state_change
  description: MQTT PUBLISH emitted whenever an I/O changes state or is updated.
- id: syslog_event
  description: System events appended to syslog.txt (e.g. "DEVICE: Power Up.", "DEVICE: Reset factory defaults.")
```

## Macros
```yaml
# UNRESOLVED: source describes I/O control primitives only; no explicit multi-step macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements stated in source.
```

## Notes
- Source is the ControlByWeb 400-Series Integration & Communication Protocols manual (generic family doc). I/O counts (relay/in/analog/one-wire channel counts) are not enumerated for the X-405 specifically; rely on the device Modbus Address Table / generated MIB / state.xml for the actual channel list.
- HTTP default port is 80; the port is user-configurable (Section 1.4 example uses port 8000). All HTTP examples in source use GET over TCP; PUT/POST not documented.
- HTTP Basic Auth is only enforced when the User account is enabled in setup pages; default credentials printed on the device sticker are user-configurable. Source shows example "none:webrelay" with Base64 `bm9uZTp3ZWJyZWxheQ==`.
- Modbus/TCP default port 502 (configurable). Disabled when User account is enabled (no password mechanism in Modbus/TCP). Max 2 concurrent TCP socket connections; 50s idle timeout (send a read periodically to keep alive).
- `pulseTime{N}` MUST appear before `relay{N}=2` in the same URL query string.
- Register/sensor reads via Modbus use 32-bit IEEE 754 floats returned in pairs of 2 registers; endianness is device-configurable. Uninstalled temperature/humidity sensors return 0xFFFFFFFF (NaN).
- "Special pulse" commands (relay=3 and relay=7) require firmware v3.13.7.8 or later.
- MQTT version supported: 3.1.1. Sparkplug B is also supported as a topic/payload structure overlay.
- SNMP supports v1, v2c, v3. Default community strings are `webrelay` for both read and write (v1/v2c only). v3 uses USM with separate auth + privacy protocols and a shared security username.
- 32-bit float example in source: 81.25 ↔ 0x800042A2 (little-endian: low word 0x8000, high word 0x42A2).
<!-- UNRESOLVED: X-405-specific voltage, current, power, and environmental ratings not present in this source; pull from X-405 datasheet. -->
<!-- UNRESOLVED: HTTPS support mentioned implicitly (MQTT payload token ${httpsport}) but not documented in the integration protocol sections above. -->
<!-- UNRESOLVED: Cloud / ControlByWeb Cloud remote-access auth flow not detailed in this source. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:04:57.849Z
last_checked_at: 2026-07-07T12:27:13.303Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:27:13.303Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions matched verbatim in source; transport parameters confirmed; one-to-one coverage with no omissions. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document is the 400-Series Integration & Communication Protocols manual, not an X-405-specific datasheet. I/O counts and feature set inferred from generic 400-Series examples."
- "RS-232/serial interface not mentioned for the X-405; if present, transport parameters must be sourced separately."
- "explicit unit/slave ID not stated in source"
- "not clearly an input/output router; omit if not applicable"
- "range not stated in source"
- "range not stated"
- "source describes I/O control primitives only; no explicit multi-step macros documented."
- "no safety warnings, interlocks, or power-on sequencing requirements stated in source."
- "X-405-specific voltage, current, power, and environmental ratings not present in this source; pull from X-405 datasheet."
- "HTTPS support mentioned implicitly (MQTT payload token ${httpsport}) but not documented in the integration protocol sections above."
- "Cloud / ControlByWeb Cloud remote-access auth flow not detailed in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
