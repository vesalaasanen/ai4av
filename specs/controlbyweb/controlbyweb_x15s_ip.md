---
spec_id: admin/controlbyweb-x15s
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X15S Control Spec"
manufacturer: ControlByWeb
model_family: X15S
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X15S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/03/x-15s_users_manual.pdf
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T14:54:33.196Z
last_checked_at: 2026-07-11T20:42:20.987Z
generated_at: 2026-07-11T20:42:20.987Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document references the \"X-400 Series\" throughout. No X15S-specific commands, address maps, relay counts, or I/O counts found. Spec fields populated from generic ControlByWeb device integration material."
  - "Modbus/TCP additionally available on port 502; SNMP and MQTT also supported but tracked as separate transports not enumerated here."
  - "literal request bytes not enumerated in source; refer to Modbus address map in device setup pages"
  - "literal request bytes not enumerated"
  - "SNMP GetRequest/GetNextRequest/GetBulkRequest/SetRequest/Trap/Notification PDUs available but OIDs not enumerated in source — must be generated from device MIB. MQTT publish/subscribe topics and Sparkplug B payload schemas not fully specified in source."
  - "trap OIDs not enumerated; must be derived from generated MIB file."
  - "source documents no explicit multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "X15S-specific firmware version, I/O counts, default TCP port (80 assumed from log.txt example but not stated for X15S), exact relay count, Modbus address map."
verification:
  verdict: verified
  checked_at: 2026-07-11T20:42:20.987Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 action entries matched verbatim in source. Transport supported. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X15S Control Spec

## Summary
ControlByWeb X15S is a web-enabled relay/IO module. This spec covers the TCP/IP control surface described in the vendor integration document, including HTTP GET control via state.xml/state.json and customState.xml/customState.json, Modbus/TCP (port 502) read/write of coils, discrete inputs, and holding registers, SNMP v1/v2c/v3 read/write and trap notifications, and MQTT 3.1.1 publishing/subscribing with Sparkplug B support.

<!-- UNRESOLVED: source document references the "X-400 Series" throughout. No X15S-specific commands, address maps, relay counts, or I/O counts found. Spec fields populated from generic ControlByWeb device integration material. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 80
auth:
  type: basic  # source: optional HTTP Basic auth, Base64-encoded username:password header
```

<!-- UNRESOLVED: Modbus/TCP additionally available on port 502; SNMP and MQTT also supported but tracked as separate transports not enumerated here. -->

## Traits
```yaml
- powerable       # inferred from relay on/off commands (relayX=0/1)
- routable        # inferred from per-relay selection semantics
- queryable       # inferred from state.xml/state.json read commands
- levelable       # inferred from registerX value commands (numeric writes)
```

## Actions
```yaml
- id: get_state_xml
  label: Get state.xml
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []

- id: get_state_json
  label: Get state.json
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []

- id: get_custom_state_xml
  label: Get customState.xml
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []

- id: get_custom_state_json
  label: Get customState.json
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

- id: relay1_off
  label: Relay 1 OFF
  kind: action
  command: "GET /state.xml?relay1=0 HTTP/1.1\r\n\r\n"
  params: []

- id: relay1_on
  label: Relay 1 ON
  kind: action
  command: "GET /state.xml?relay1=1 HTTP/1.1\r\n\r\n"
  params: []

- id: relay1_pulse
  label: Relay 1 PULSE
  kind: action
  command: "GET /state.xml?relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: relay2_off
  label: Relay 2 OFF
  kind: action
  command: "GET /state.xml?relay2=0 HTTP/1.1\r\n\r\n"
  params: []

- id: relay2_on
  label: Relay 2 ON
  kind: action
  command: "GET /state.xml?relay2=1 HTTP/1.1\r\n\r\n"
  params: []

- id: relay2_pulse
  label: Relay 2 PULSE
  kind: action
  command: "GET /state.xml?relay2=2 HTTP/1.1\r\n\r\n"
  params: []

- id: relay_pulse_custom_time
  label: Relay Pulse (custom duration)
  kind: action
  command: "GET /state.json?pulseTime1={seconds}&relay1=2 HTTP/1.1\r\n\r\n"
  params:
    - name: seconds
      type: integer
      description: Pulse duration in seconds (e.g. 5, 15)

- id: reset_on_time
  label: Reset onTime
  kind: action
  command: "GET /state.xml?onTime1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: New onTime1 value in seconds (e.g. 0, 5)

- id: reset_total_on_time
  label: Reset totalOnTime
  kind: action
  command: "GET /state.xml?totalOnTime1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: New totalOnTime1 value in seconds (e.g. 0, 5)

- id: set_counter
  label: Set Counter
  kind: action
  command: "GET /state.json?count1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: New count1 value (e.g. 200)

- id: set_register
  label: Set Register
  kind: action
  command: "GET /state.xml?register1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: number
      description: New register1 value (floating point, e.g. 10.5)

- id: multiple_xml_commands
  label: Multiple I/O control (customState)
  kind: action
  command: "GET /customState.xml?relay1={v1}&relay2={v2} HTTP/1.1\r\n\r\n"
  params:
    - name: v1
      type: integer
      description: Relay 1 value (0=off, 1=on)
    - name: v2
      type: integer
      description: Relay 2 value (0=off, 1=on)

- id: erase_log
  label: Erase log.txt
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: erase_syslog
  label: Erase syslog.txt
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: modbus_read_coils
  label: Modbus Read Coils (FC 01)
  kind: query
  command: "Modbus FC 0x01"  # UNRESOLVED: literal request bytes not enumerated in source; refer to Modbus address map in device setup pages
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: coil_quantity
      type: integer
      description: Refer to Modbus map in setup pages

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02)
  kind: query
  command: "Modbus FC 0x02"  # UNRESOLVED: literal request bytes not enumerated
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: input_quantity
      type: integer
      description: Refer to Modbus map in setup pages

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "Modbus FC 0x03"  # UNRESOLVED: literal request bytes not enumerated
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages (must be even; 32-bit float pairs)
    - name: input_quantity
      type: integer
      description: Must be divisible by 2

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "Modbus FC 0x05"  # UNRESOLVED: literal request bytes not enumerated
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: output_value
      type: integer
      description: "0x00 (Off) or 0xFF (On)"

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15)
  kind: action
  command: "Modbus FC 0x0F"  # UNRESOLVED: literal request bytes not enumerated
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: output_quantity
      type: integer
      description: Refer to Modbus map in setup pages
    - name: output_bytes
      type: integer
      description: Bit-packed coil values (e.g. 0x0000-0xFFFF)

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16)
  kind: action
  command: "Modbus FC 0x10"  # UNRESOLVED: literal request bytes not enumerated
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: register_quantity
      type: integer
      description: Must be divisible by 2 (32-bit float pairs)
    - name: values
      type: number
      description: IEEE 754 float values (little- or big-endian per setup)
- id: get_log_txt
  label: Get log.txt
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []

- id: get_syslog_txt
  label: Get syslog.txt
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []

- id: snmp_get_request
  label: SNMP GetRequest
  kind: query
  command: "GetRequest"
  params:
    - name: oid
      type: string
      description: OID not enumerated in source; must be derived from generated MIB file
    - name: community_string
      type: string
      description: "Default read community string: webrelay"

- id: snmp_get_next_request
  label: SNMP GetNextRequest
  kind: query
  command: "GetNextRequest"
  params:
    - name: oid
      type: string
      description: OID not enumerated in source; must be derived from generated MIB file
    - name: community_string
      type: string
      description: "Default read community string: webrelay"

- id: snmp_get_bulk_request
  label: SNMP GetBulkRequest
  kind: query
  command: "GetBulkRequest"
  params:
    - name: oid
      type: string
      description: OID not enumerated in source; must be derived from generated MIB file
    - name: community_string
      type: string
      description: "Default read community string: webrelay"

- id: snmp_set_request
  label: SNMP SetRequest
  kind: action
  command: "SetRequest"
  params:
    - name: oid
      type: string
      description: OID not enumerated in source; must be derived from generated MIB file
    - name: value
      type: string
      description: Value type not enumerated in source; depends on target object
    - name: community_string
      type: string
      description: "Default write community string: webrelay"
```

<!-- UNRESOLVED: SNMP GetRequest/GetNextRequest/GetBulkRequest/SetRequest/Trap/Notification PDUs available but OIDs not enumerated in source — must be generated from device MIB. MQTT publish/subscribe topics and Sparkplug B payload schemas not fully specified in source. -->

## Feedbacks
```yaml
- id: relay_state
  type: enum
  values: [off, on]
  description: "Source: <relayX>0=off, 1=on"

- id: digital_input_state
  type: enum
  values: [off, on]
  description: "Source: <digitalInputX>0=off, 1=on"

- id: analog_input_value
  type: number
  description: "Source: <analogInputX> float value"

- id: vin
  type: number
  description: "Source: <vin> scaled internal Vin measurement"

- id: register_value
  type: number
  description: "Source: <registerX> value"

- id: counter_value
  type: integer
  description: "Source: <countX> count value"

- id: on_time
  type: number
  description: "Source: <onTimeX> seconds since input last came on"

- id: total_on_time
  type: number
  description: "Source: <totalOnTimeX> total seconds input has been on"

- id: frequency
  type: number
  description: "Source: <frequencyX> associated frequency value"

- id: one_wire_sensor
  type: string
  description: "Source: <oneWireSensorX> reading or 'x.x' if unreadable; units appended when showUnits=1"

- id: utc_time
  type: integer
  description: "Source: <utcTime> seconds since 1970-01-01"

- id: timezone_offset
  type: integer
  description: "Source: <timezoneOffset> seconds offset from UTC"

- id: serial_number
  type: string
  description: "Source: <serialNumber> MAC-format serial of device"

- id: sys_uptime
  type: integer
  description: "Source: SNMP sysUpTime in hundredths of seconds since last power"
```

## Variables
```yaml
- id: register
  type: number
  description: General-purpose 32-bit float register (registerX) writable via state.xml?registerX={value} or Modbus FC 16

- id: counter
  type: integer
  description: Count value (countX) writable via state.json?countX={value}

- id: on_time
  type: number
  description: Resettable per-input on-time accumulator (onTimeX)

- id: total_on_time
  type: number
  description: Resettable per-input total on-time accumulator (totalOnTimeX)
```

## Events
```yaml
# Source: SNMP Traps when relay changes state, sensor value threshold reached, or supply voltage out of range. Triggered as actions in Conditional and Scheduled tasks.
# UNRESOLVED: trap OIDs not enumerated; must be derived from generated MIB file.

# Source: SNMP Notifications (v2c/v3) - acknowledged variants of Traps requiring response from SNMP manager with retries.

# Source: MQTT publish events when device publishes I/O state to configured broker.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
HTTP GET-based control is the primary machine protocol; Modbus/TCP (port 502) is available as an alternative but is disabled whenever the User account is enabled (Modbus has no password mechanism). Source document refers throughout to the "X-400 Series" rather than X15S specifically — X15S-specific I/O counts, relay/digital input/analog input counts, and Modbus address map must be obtained from the device setup pages (View Modbus Address Table button). Pulse command (`relayX=2`) uses configured Pulse Duration unless overridden via `pulseTimeX` parameter (must precede relay arg). Modbus 32-bit float values are little- or big-endian per Advanced Network tab setting; encoded IEEE 754. Connection timeout 50 seconds for Modbus/TCP; two concurrent TCP sockets available. MQTT supports v3.1.1 with Sparkplug B. SNMP v1/v2c default community string is `webrelay` for both read and write.
<!-- UNRESOLVED: X15S-specific firmware version, I/O counts, default TCP port (80 assumed from log.txt example but not stated for X15S), exact relay count, Modbus address map. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/03/x-15s_users_manual.pdf
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T14:54:33.196Z
last_checked_at: 2026-07-11T20:42:20.987Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-11T20:42:20.987Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 action entries matched verbatim in source. Transport supported. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document references the \"X-400 Series\" throughout. No X15S-specific commands, address maps, relay counts, or I/O counts found. Spec fields populated from generic ControlByWeb device integration material."
- "Modbus/TCP additionally available on port 502; SNMP and MQTT also supported but tracked as separate transports not enumerated here."
- "literal request bytes not enumerated in source; refer to Modbus address map in device setup pages"
- "literal request bytes not enumerated"
- "SNMP GetRequest/GetNextRequest/GetBulkRequest/SetRequest/Trap/Notification PDUs available but OIDs not enumerated in source — must be generated from device MIB. MQTT publish/subscribe topics and Sparkplug B payload schemas not fully specified in source."
- "trap OIDs not enumerated; must be derived from generated MIB file."
- "source documents no explicit multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "X15S-specific firmware version, I/O counts, default TCP port (80 assumed from log.txt example but not stated for X15S), exact relay count, Modbus address map."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
