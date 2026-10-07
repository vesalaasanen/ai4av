---
spec_id: admin/controlbyweb-x412
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X412 Control Spec"
manufacturer: ControlByWeb
model_family: X412
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X412
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/05/400-series-users-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/04/x-412-v19.7.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
retrieved_at: 2026-07-01T14:22:48.995Z
last_checked_at: 2026-10-07T11:17:47.097Z
generated_at: 2026-10-07T11:17:47.097Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Modbus address map is device-config-dependent (the source refers to a per-device \"View Modbus Address Table\" button). The exact coil/register/discrete-input addresses for a specific X412 configuration cannot be enumerated without that page."
  - "X412-specific applicability)"
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing procedures."
  - "Section 2.1.3 prints 0x16 for the relay-pulse and internal-register-write PLC examples, while Section 2.1.9 defines Write Multiple Registers as decimal function code 16 (0x10). The existing commands retain the formally documented 0x10."
verification:
  verdict: verified
  checked_at: 2026-10-07T11:17:47.097Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 action units match source commands and transport values are supported; the source's 0x16/0x015 PLC-example typos are reconciled by the spec to the formal 0x10/0x0F definitions. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# ControlByWeb X412 Control Spec

## Summary
The ControlByWeb X412 is a network-attached relay/IO module controllable via HTTP GET requests to state.xml/state.json and customState.xml/customState.json plus the Modbus/TCP function codes documented for the X-400 Series platform. It also supports SNMP, MQTT, Remote Services, and the optional ControlByWeb Cloud API.

<!-- UNRESOLVED: Modbus address map is device-config-dependent (the source refers to a per-device "View Modbus Address Table" button). The exact coil/register/discrete-input addresses for a specific X412 configuration cannot be enumerated without that page. -->

## Transport
```yaml
protocols:
  - tcp  # inferred from source's TCP/IP connection description
addressing:
  port: 80  # default web server port; source also shows configurable port 8000
  base_url: "http://{device-ip}/state.xml"
auth:
  type: basic  # source documents Base64-encoded Authorization: Basic when User account is enabled
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# HTTP GET interface - works on both state.xml/json and customState.xml/json.
# Path variants: /state.xml, /state.json, /customState.xml, /customState.json

- id: relay_off
  label: Turn Relay X OFF
  kind: action
  command: "GET /state.xml?relay{X}=0 HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Relay number (1-based, e.g. relay1)
- id: relay_on
  label: Turn Relay X ON
  kind: action
  command: "GET /state.xml?relay{X}=1 HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Relay number (1-based)
- id: relay_pulse
  label: Pulse Relay X
  kind: action
  command: "GET /state.xml?relay{X}=2 HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Relay number (1-based); pulse duration defaults to 1.5 s
- id: relay_pulse_custom
  label: Pulse Relay X for N seconds
  kind: action
  command: "GET /state.json?pulseTime{X}={seconds}&relay{X}=2 HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Relay number (1-based)
    - name: seconds
      type: integer
      description: Pulse duration in seconds; e.g. 5 or 15
- id: set_on_time
  label: Set onTime X
  kind: action
  command: "GET /state.xml?onTime{X}={value} HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Input/output number (1-based)
    - name: value
      type: number
      description: Time in seconds (e.g. 0 to reset, 5 to set)
- id: set_total_on_time
  label: Set totalOnTime X
  kind: action
  command: "GET /state.xml?totalOnTime{X}={value} HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Input/output number (1-based)
    - name: value
      type: number
      description: Time in seconds (e.g. 0 to reset, 5 to set)
- id: set_counter
  label: Set counter X
  kind: action
  command: "GET /state.json?count{X}={value} HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Counter number (1-based, e.g. count1)
    - name: value
      type: number
      description: Counter value to set (e.g. 200)
- id: set_register
  label: Set register X
  kind: action
  command: "GET /state.xml?register{X}={value} HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Register number (1-based, e.g. register1)
    - name: value
      type: number
      description: Register value (numeric, e.g. 10.5, 25)
- id: multi_command
  label: Send multiple commands in one request
  kind: action
  command: "GET /state.xml?relay{X1}={v1}&relay{X2}={v2} HTTP/1.1"
  params:
    - name: args
      type: string
      description: One or more "ioNameX=value" pairs joined with &, e.g. relay1=1&relay2=0
- id: custom_state_set
  label: Set IO via customState using configured name
  kind: action
  command: "GET /customState.xml?{camelCaseName}={value} HTTP/1.1"
  params:
    - name: camelCaseName
      type: string
      description: The configured camelCase IO name from customState.xml (e.g. myRegister1)
    - name: value
      type: string
      description: Value to assign
- id: read_state_xml
  label: Read current state (XML)
  kind: query
  command: "GET /state.xml HTTP/1.1"
  params: []
- id: read_state_json
  label: Read current state (JSON)
  kind: query
  command: "GET /state.json HTTP/1.1"
  params: []
- id: read_custom_state_xml
  label: Read custom state (XML)
  kind: query
  command: "GET /customState.xml HTTP/1.1"
  params: []
- id: read_custom_state_json
  label: Read custom state (JSON)
  kind: query
  command: "GET /customState.json HTTP/1.1"
  params: []
- id: read_log_txt
  label: Read data log file
  kind: query
  command: "GET /log.txt HTTP/1.1"
  params: []
- id: erase_log_txt
  label: Erase data log file
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1"
  params: []
- id: read_syslog
  label: Read system log file
  kind: query
  command: "GET /syslog.txt HTTP/1.1"
  params: []
- id: erase_syslog
  label: Erase system log file
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1"
  params: []

# --- Modbus/TCP (slave) on port 502 ---
- id: modbus_read_coils
  label: Modbus Read Coils (FC 01)
  kind: query
  command: "Modbus FC 0x01 - Read Relays and Digital IO configured as outputs"
  params:
    - name: start_address
      type: integer
      description: Per Modbus Address Table in Advanced Network setup
    - name: coil_quantity
      type: integer
      description: Per Modbus Address Table; multiple outputs may be read at once
- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02)
  kind: query
  command: "Modbus FC 0x02 - Read Digital Inputs and Digital IO configured as inputs"
  params:
    - name: start_address
      type: integer
      description: Per Modbus Address Table
    - name: input_quantity
      type: integer
      description: Per Modbus Address Table
- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "Modbus FC 0x03 - Read Vin, sensors, registers, counters, analog inputs (32-bit floats over register pairs)"
  params:
    - name: start_address
      type: integer
      description: Per Modbus Address Table; sensor values must be read in pairs of 2
    - name: register_quantity
      type: integer
      description: Must be divisible by 2; values returned as IEEE 754 float (little- or big-endian per config)
- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "Modbus FC 0x05 - 0x00 (Off) or 0xFF (On)"
  params:
    - name: start_address
      type: integer
      description: Per Modbus Address Table
    - name: value
      type: enum
      description: 0x00 (Off) or 0xFF (On); response mirrors the requested state
- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15)
  kind: action
  command: "Modbus FC 0x0F - Set one or more digital outputs/relays; 0x0000=off, 0xFFFF=on (or per-bit pattern like 0xF0)"
  params:
    - name: start_address
      type: integer
      description: Per Modbus Address Table
    - name: output_quantity
      type: integer
      description: Quantity of coils; byte count = quantity / 8
    - name: value_bytes
      type: string
      description: 0x0000-0xFFFF pattern of desired output states
- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16)
  kind: action
  command: "Modbus FC 0x10 - Write 32-bit IEEE 754 floats in register pairs (endianness per Modbus setup)"
  params:
    - name: start_address
      type: integer
      description: Per Modbus Address Table
    - name: register_quantity
      type: integer
      description: Must be divisible by 2

# --- PLC Addressing examples cited in source ---
- id: modbus_plc_read_relay1
  label: PLC Addressing - Read relay 1
  kind: query
  command: "Modbus FC 0x01, address 0, PLC address 1"
  params: []
- id: modbus_plc_write_relay1
  label: PLC Addressing - Write relay 1
  kind: action
  command: "Modbus FC 0x05 (or 0x0F for multiple), address 0, PLC address 1"
  params: []
- id: modbus_plc_pulse_relay1
  label: PLC Addressing - Pulse relay 1 (32-bit float seconds)
  kind: action
  command: "Modbus FC 0x10, address 512-513, PLC address 40513-40514"
  params:
    - name: pulse_seconds
      type: number
      description: 32-bit float duration in seconds
- id: modbus_plc_read_input1
  label: PLC Addressing - Read input 1
  kind: query
  command: "Modbus FC 0x02, address 1, PLC address 10002"
  params: []
- id: modbus_plc_read_analog_input1
  label: PLC Addressing - Read analog input 1
  kind: query
  command: "Modbus FC 0x03, address 4-5, PLC address 40005-40006, 32-bit float"
  params: []
- id: modbus_plc_read_vin
  label: PLC Addressing - Read Vin
  kind: query
  command: "Modbus FC 0x03, address 6-7, PLC address 40007-40008, 32-bit float"
  params: []
- id: modbus_plc_read_temperature_sensor
  label: PLC Addressing - Read temperature sensor
  kind: query
  command: "Modbus FC 0x03, address 8-9, PLC address 40009-40010, 32-bit float"
  params: []
- id: modbus_plc_read_internal_register
  label: PLC Addressing - Read internal register
  kind: query
  command: "Modbus FC 0x03, address 10-11, PLC address 40011-40012, 32-bit float; write via FC 0x10 same address"
  params: []
- id: snmp_get_request
  label: SNMP GetRequest
  kind: query
  command: "GetRequest"
  params: UNRESOLVED
- id: snmp_get_next_request
  label: SNMP GetNextRequest
  kind: query
  command: "GetNextRequest"
  params: UNRESOLVED
- id: snmp_get_bulk_request
  label: SNMP GetBulkRequest
  kind: query
  command: "GetBulkRequest"
  params: UNRESOLVED
- id: snmp_set_request
  label: SNMP SetRequest
  kind: action
  command: "SetRequest"
  params: UNRESOLVED
- id: snmp_trap_pdu
  label: SNMP Trap
  kind: action
  command: "Trap"
  params: UNRESOLVED
- id: snmp_notification_pdu
  label: SNMP Notification
  kind: action
  command: "Notification"
  params: UNRESOLVED
- id: snmp_sys_descr
  label: SNMP sysDescr
  kind: query
  command: "_system.sysDescr_"
  params: UNRESOLVED
- id: snmp_sys_object_id
  label: SNMP sysObjectID
  kind: query
  command: "_system.sysObjectID_"
  params: UNRESOLVED
- id: snmp_sys_up_time
  label: SNMP sysUpTime
  kind: query
  command: "_system.sysUpTime_"
  params: UNRESOLVED
- id: snmp_sys_name
  label: SNMP sysName
  kind: query
  command: "_system.sysName_"
  params: UNRESOLVED
- id: cloud_read_state_json
  label: Read state JSON through Cloud DAT URL
  kind: query
  command: "https://api.controlbyweb.cloud/{generated DAT url}/state.json"
  params: UNRESOLVED
```

## Feedbacks
```yaml
- id: digital_input_state
  type: enum
  values: [off, on]  # <digitalInputX>: 0=off, 1=on
  query_command: "GET /state.xml HTTP/1.1"
- id: digital_io_state
  type: enum
  values: [off, on]  # <digitalIOX>: 0=off, 1=on
  query_command: "GET /state.xml HTTP/1.1"
- id: relay_state
  type: enum
  values: [off, on]  # <relayX>: 0=coil off, 1=coil energized
  query_command: "GET /state.xml HTTP/1.1"
- id: on_time
  type: number  # <onTimeX>: seconds since input last came on
  query_command: "GET /state.xml HTTP/1.1"
- id: total_on_time
  type: number  # <totalOnTimeX>: cumulative on time in seconds
  query_command: "GET /state.xml HTTP/1.1"
- id: count
  type: number  # <countX>: counter value
  query_command: "GET /state.xml HTTP/1.1"
- id: frequency
  type: number  # <frequencyX>: frequency value
  query_command: "GET /state.xml HTTP/1.1"
- id: analog_input
  type: number  # <analogInputX>: raw analog value
  query_command: "GET /state.xml HTTP/1.1"
- id: vin
  type: number  # <vin>: scaled internal Vin measurement
  query_command: "GET /state.xml HTTP/1.1"
- id: frequency_input
  type: number  # <frequencyInput>: X-420 frequency input value (UNRESOLVED: X412-specific applicability)
  query_command: "GET /state.xml HTTP/1.1"
- id: register
  type: number  # <registerX>: register value
  query_command: "GET /state.xml HTTP/1.1"
- id: utc_time
  type: integer  # <utcTime>: seconds since 1970-01-01
  query_command: "GET /state.xml HTTP/1.1"
- id: timezone_offset
  type: integer  # <timezoneOffset>: local offset from utcTime
  query_command: "GET /state.xml HTTP/1.1"
- id: serial_number
  type: string  # <serialNumber>: MAC-format device ID
  query_command: "GET /state.xml HTTP/1.1"
- id: one_wire_sensor
  type: string  # <oneWireSensorX>: "x.x"=read error, otherwise numeric (with optional units via showUnits=1)
  query_command: "GET /state.xml HTTP/1.1"
- id: modbus_error_code
  type: string  # Exception response: 0x81..0x90 + codes 0x01 (unsupported), 0x02 (bad address/quantity), 0x03 (padding/byte count out of range)
```

## Variables
```yaml
# Settable numeric parameters not otherwise enumerated as discrete actions.
- id: register_value
  label: Internal register value
  type: number
  access: readwrite
  notes: "Set via /state.xml?registerX=<value>; read back via /state.xml or Modbus FC 0x03 address 10-11 (PLC 40011-40012)."
- id: on_time_value
  label: onTime value
  type: number
  access: readwrite
  notes: "Set via /state.xml?onTimeX=<value> (seconds)."
- id: total_on_time_value
  label: totalOnTime value
  type: number
  access: readwrite
  notes: "Set via /state.xml?totalOnTimeX=<value> (seconds)."
- id: counter_value
  label: Counter value
  type: number
  access: readwrite
  notes: "Set via /state.json?countX=<value>."
- id: pulse_time
  label: Pulse duration override
  type: number
  access: write
  notes: "Set via /state.json?pulseTimeX=<seconds> before relayX=2 in same request."
- id: min_rec_refresh
  label: Min Rec Refresh
  type: string  # appears in state.json examples; value not parsed
```

## Events
```yaml
- id: snmp_trap
  type: notification
  description: "SNMP traps (PDU Trap) sent on relay state change, sensor threshold trip, or supply voltage out of range. Configured as actions under Conditional and Scheduled tasks."
- id: snmp_notification
  type: notification
  description: "SNMP Notifications (SNMP v2c/v3) - trap variant requiring acknowledged response with retries."
- id: remote_services_state_push
  type: notification
  description: "When Remote Services is enabled and a logic event triggers 'send state', state.xml is pushed to the external server over the open TCP V1 connection."
- id: mqtt_publish
  type: notification
  description: "Device publishes IO/system state to the configured MQTT broker per Broker tab setup; payloads use tokens listed in Section 4.1.4."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing procedures.
```

## Notes
- The X412 is part of the ControlByWeb X-400 Series; this spec reflects the family-level behavior in the source. Per-device IO count (relays, digital inputs, analog inputs, etc.) and the precise Modbus address map depend on the X412 module's configuration and must be read via the device's Setup pages (Advanced Network > View Modbus Address Table).
- HTTP password handling: if the User account is enabled, the request uses a Base64-encoded Authorization: Basic header. The example decodes to none:webrelay; actual credentials are user-configured.
- Relay pulse semantics: relay{X}=2 triggers a pulse of the configured Pulse Duration (1.5 s default). pulseTime{X}=N overrides the duration for that single request only and must appear before relay{X}=2.
- Multiple commands may be combined in one URL via &. The same combining works on customState endpoints using configured camelCase names.
- Modbus/TCP: the device is a slave on port 502 (configurable). Modbus is disabled when the User account is enabled. Idle connections time out after 50 s without data; send periodic reads to keep them open. Only two simultaneous TCP socket connections are allowed.
- Modbus 32-bit floating-point values are IEEE 754; sensor values must be read in pairs of 2. Endianness is configurable under Advanced Network. Example: 81.25 °C is encoded as 0x800042A2 in little-endian.
- UNRESOLVED: Section 2.1.3 prints 0x16 for the relay-pulse and internal-register-write PLC examples, while Section 2.1.9 defines Write Multiple Registers as decimal function code 16 (0x10). The existing commands retain the formally documented 0x10.
- Modbus error framing: error responses use the original function code OR'd with 0x80 (e.g. 0x01 → 0x81). Common exception codes: 0x01 function not supported, 0x02 incorrect start address/quantity, 0x03 padding/byte-count out of range.
- Log endpoints (/log.txt, /syslog.txt) require setup username/password when accessing the system log; the data log requires the user password when the User account is enabled.
- The source documents MQTT v3.1.1 publish/subscribe plus Sparkplug B, and an optional ControlByWeb Cloud API using DAT URLs. No publish/subscribe topic semantics, DAT URL generation, or credential format are specified beyond the example URL.

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/05/400-series-users-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/04/x-412-v19.7.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
retrieved_at: 2026-07-01T14:22:48.995Z
last_checked_at: 2026-10-07T11:17:47.097Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:17:47.097Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 action units match source commands and transport values are supported; the source's 0x16/0x015 PLC-example typos are reconciled by the spec to the formal 0x10/0x0F definitions. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Modbus address map is device-config-dependent (the source refers to a per-device \"View Modbus Address Table\" button). The exact coil/register/discrete-input addresses for a specific X412 configuration cannot be enumerated without that page."
- "X412-specific applicability)"
- "source contains no explicit safety warnings, interlocks, or power-on sequencing procedures."
- "Section 2.1.3 prints 0x16 for the relay-pulse and internal-register-write PLC examples, while Section 2.1.9 defines Write Multiple Registers as decimal function code 16 (0x10). The existing commands retain the formally documented 0x10."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
