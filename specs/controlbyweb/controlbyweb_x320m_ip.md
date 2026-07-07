---
spec_id: admin/controlbyweb-x320m
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X320M Control Spec"
manufacturer: ControlByWeb
model_family: X320M
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X320M
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/X-320M_manual_v1.5.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
retrieved_at: 2026-06-30T15:03:30.812Z
last_checked_at: 2026-07-07T11:14:48.388Z
generated_at: 2026-07-07T11:14:48.388Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the X-400 Series family at large; X320M-specific I/O counts and capabilities should be confirmed against the X320M datasheet."
  - "no explicit multi-step sequences documented in source"
  - "source does not document safety warnings, interlocks, or power-on sequencing."
  - "pulseTime1 argument must precede the relay1=2 argument on the same request line."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:14:48.388Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec actions have literal matches in source; transport parameters verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X320M Control Spec

## Summary
The ControlByWeb X320M is an Ethernet-connected I/O module that exposes its relays, digital inputs, analog inputs, registers, counters, and onboard sensors over several IP-based protocols. This spec covers the HTTP GET control interface (state.xml/json, customState.xml/json), Modbus/TCP slave on port 502, SNMP (v1/v2c/v3), and MQTT 3.1.1 with Sparkplug B, as documented in the ControlByWeb device integration manual.

<!-- UNRESOLVED: source describes the X-400 Series family at large; X320M-specific I/O counts and capabilities should be confirmed against the X320M datasheet. -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  port: 80
  base_url: "http://<device-ip>/"  # e.g. http://192.168.1.2/
auth:
  type: basic  # optional: enabled if User account is enabled; otherwise no auth required
  scheme: HTTP Basic
  encoding: base64
  notes: "If User account is enabled, password is sent as Base64 in the Authorization header. Example decoded value: none:webrelay -> bm9uZTp3ZWJyZWxheQ==. The X-320M also accepts HTTP on a non-default port (e.g. 8000)."
```

## Traits
```yaml
# - routable        (relay/digital I/O output switching documented)
# - queryable       (state.xml/json read endpoints, Modbus input/coil/holding-register reads, SNMP Get/Trap)
# - levelable       (analog input, register values, pulse durations are settable as numeric values)
```

## Actions
```yaml
# HTTP GET command set (state.xml/json, customState.xml/json)
# Source: Section 1.1.2
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
  label: Pulse Relay 1 (preset duration)
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
  label: Pulse Relay 2 (preset duration)
  kind: action
  command: "GET /state.xml?relay2=2 HTTP/1.1\r\n\r\n"
  params: []

- id: pulse_relay1_preset
  label: Pulse Relay 1 for preset 1.5s
  kind: action
  command: "GET /state.json?relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: pulse_relay1_5s
  label: Pulse Relay 1 for 5 seconds
  kind: action
  command: "GET /state.json?pulseTime1=5&relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: pulse_relay1_15s
  label: Pulse Relay 1 for 15 seconds
  kind: action
  command: "GET /state.json?pulseTime1=15&relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: set_onTime1_0
  label: Reset onTime1 to 0
  kind: action
  command: "GET /state.xml?onTime1=0 HTTP/1.1\r\n\r\n"
  params: []

- id: set_onTime1_5
  label: Reset onTime1 to 5
  kind: action
  command: "GET /state.xml?onTime1=5 HTTP/1.1\r\n\r\n"
  params: []

- id: set_totalOnTime1_0
  label: Reset totalOnTime1 to 0
  kind: action
  command: "GET /state.xml?totalOnTime1=0 HTTP/1.1\r\n\r\n"
  params: []

- id: set_totalOnTime1_5
  label: Reset totalOnTime1 to 5
  kind: action
  command: "GET /state.xml?totalOnTime1=5 HTTP/1.1\r\n\r\n"
  params: []

- id: set_count1
  label: Set counter1 to value
  kind: action
  command: "GET /state.json?count1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: Counter value to set (e.g. 200)

- id: set_register1
  label: Set register1 to value
  kind: action
  command: "GET /state.xml?register1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: number
      description: Register value to set (e.g. 10.5)

- id: set_customState_register
  label: Set user-named register (customState)
  kind: action
  command: "GET /customState.xml?{customName}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: customName
      type: string
      description: Camel-case I/O name from customState.xml (e.g. myRegister1)
    - name: value
      type: number
      description: Value to set

- id: multi_command_state
  label: Multi-arg state command
  kind: action
  command: "GET /state.json?relay1={r1}&relay2={r2} HTTP/1.1\r\n\r\n"
  params:
    - name: r1
      type: integer
      description: Relay 1 value (0=off, 1=on, 2=pulse)
    - name: r2
      type: integer
      description: Relay 2 value (0=off, 1=on, 2=pulse)

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

- id: read_customState_xml
  label: Read customState.xml
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []

- id: read_customState_json
  label: Read customState.json
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

- id: read_log_txt
  label: Read data log
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_log_txt
  label: Erase data log
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: read_syslog_txt
  label: Read system log
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_syslog_txt
  label: Erase system log
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

# Modbus/TCP slave (Section 2)
# The module listens on TCP port 502 and supports the function codes below.
# Exact coil/register addresses depend on the device's Modbus map (viewable in setup pages).
- id: modbus_read_coils
  label: Modbus Read Coils (Function Code 01)
  kind: query
  command: "Modbus/TCP function 0x01 on port 502"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: coil_count
      type: integer
      description: Number of coils to read; sum with start_address must not exceed max coil count

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (Function Code 02)
  kind: query
  command: "Modbus/TCP function 0x02 on port 502"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: input_quantity
      type: integer
      description: Number of discrete inputs to read

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (Function Code 03)
  kind: query
  command: "Modbus/TCP function 0x03 on port 502"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: register_count
      type: integer
      description: Must be divisible by 2 (32-bit IEEE 754 values); little- or big-endian per device config

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (Function Code 05)
  kind: action
  command: "Modbus/TCP function 0x05 on port 502, value 0x00=Off, 0xFF=On"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: value
      type: integer
      description: 0 (off) or 0xFF (on)

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (Function Code 15/0x0F)
  kind: action
  command: "Modbus/TCP function 0x0F on port 502, value 0x0000-0xFFFF"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: output_quantity
      type: integer
      description: Number of outputs
    - name: values
      type: integer
      description: Bit-packed value 0x0000-0xFFFF

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (Function Code 16/0x10)
  kind: action
  command: "Modbus/TCP function 0x10 on port 502, IEEE 754 32-bit float pairs"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: register_count
      type: integer
      description: Must be divisible by 2; little- or big-endian per device config
    - name: values
      type: number
      description: IEEE 754 32-bit float

# SNMP (Section 3)
# The device supports v1, v2c, v3; community strings default to "webrelay".
- id: snmp_get_system
  label: SNMP Get Standard RFC1213 objects
  kind: query
  command: "SNMP GetRequest for sysDescr, sysObjectID, sysUpTime, sysName"
  params: []

- id: snmp_set_io
  label: SNMP Set I/O value
  kind: action
  command: "SNMP SetRequest on module-specific OIDs (MIB from setup pages)"
  params:
    - name: community
      type: string
      description: Default "webrelay" for v1/v2c; v3 uses USM

- id: snmp_trap_relay
  label: SNMP Trap on relay state change
  kind: event
  command: "SNMP Trap (v1) / Notification (v2c/v3)"
  params: []

# Remote Services (Section 5)
- id: remote_services_connect
  label: Initiate Remote Services connection
  kind: action
  command: "Device-initiated TCP V1 connection to external server per Advanced Network settings; sends connection string + state.xml on interval"
  params: []

- id: remote_services_ack
  label: ACK response to Remote Services
  kind: action
  command: "Send three-character 'ACK' within 10 seconds of each connection string"
  params: []

# ControlByWeb Cloud (Section 6)
- id: cloud_state_json
  label: Read state via Cloud DAT URL (JSON)
  kind: query
  command: "GET https://api.controlbyweb.cloud/{datUrl}/state.json"
  params: []

- id: cloud_state_xml
  label: Read state via Cloud DAT URL (XML)
  kind: query
  command: "GET https://api.controlbyweb.cloud/{datUrl}/state.xml"
  params: []

- id: cloud_set_relays
  label: Set relays via Cloud DAT URL
  kind: action
  command: "GET https://api.controlbyweb.cloud/{datUrl}/state.json?relay1={r1}&relay2={r2}"
  params:
    - name: datUrl
      type: string
      description: Generated Cloud DAT URL
    - name: r1
      type: integer
      description: Relay 1 value
    - name: r2
      type: integer
      description: Relay 2 value
```

## Feedbacks
```yaml
# state.xml/json feedback values
- id: relay_state
  type: integer
  values: [0, 1]
  description: Relay output state (0=coil off, 1=coil energized)
  source_tag: "<relayX>" / "relayX"

- id: digital_input_state
  type: integer
  values: [0, 1]
  description: Digital input state (0=off, 1=on)
  source_tag: "<digitalInputX>" / "digitalInputX"

- id: digital_io_state
  type: integer
  values: [0, 1]
  description: Digital I/O state when configured as input
  source_tag: "<digitalIOX>" / "digitalIOX"

- id: analog_input_value
  type: number
  description: Analog input reading
  source_tag: "<analogInputX>" / "analogInputX"

- id: vin_value
  type: number
  description: Scaled internal Vin measurement
  source_tag: "<vin>" / "vin"

- id: frequency_input_value
  type: number
  description: Frequency input value (X-420 specific; UNRESOLVED for X320M)
  source_tag: "<frequencyInput>"

- id: on_time
  type: number
  description: Seconds input/relay was on since last coming on
  source_tag: "<onTimeX>" / "onTimeX"

- id: total_on_time
  type: number
  description: Total seconds input/relay has been on
  source_tag: "<totalOnTimeX>" / "totalOnTimeX"

- id: count_value
  type: number
  description: Counter value for input X
  source_tag: "<countX>" / "countX"

- id: frequency_value
  type: number
  description: Frequency for input X
  source_tag: "<frequencyX>" / "frequencyX"

- id: register_value
  type: number
  description: Value of register X
  source_tag: "<registerX>" / "registerX"

- id: one_wire_sensor_value
  type: string
  description: 1-Wire sensor reading; "x.x" indicates read failure
  source_tag: "<oneWireSensorX>" / "oneWireSensorX"

- id: utc_time
  type: integer
  description: Seconds since 1970-01-01 UTC
  source_tag: "<utcTime>" / "utcTime"

- id: timezone_offset
  type: integer
  description: Local timezone offset for utcTime
  source_tag: "<timezoneOffset>" / "timezoneOffset"

- id: serial_number
  type: string
  description: Device MAC address (00:0C:C8:xx:xx:xx format)
  source_tag: "<serialNumber>" / "serialNumber"

- id: modbus_coil_read
  type: integer
  description: Coils response bitfield (bit 0 = start address coil)
  source_tag: "Modbus FC 0x01 response"

- id: modbus_discrete_input_read
  type: integer
  description: Discrete input response bitfield
  source_tag: "Modbus FC 0x02 response"

- id: modbus_holding_register_read
  type: number
  description: IEEE 754 32-bit float (pair of 16-bit registers)
  source_tag: "Modbus FC 0x03 response"
```

## Variables
```yaml
# Numeric settable values explicitly documented in the source
- id: register1
  type: number
  description: General-purpose register (state.xml?register1=)
  command: "GET /state.xml?register1={value}"

- id: count1
  type: integer
  description: Counter value (state.json?count1=)
  command: "GET /state.json?count1={value}"

- id: onTime1
  type: integer
  description: On-time counter (seconds); resettable to 0
  command: "GET /state.xml?onTime1={value}"

- id: totalOnTime1
  type: integer
  description: Total on-time counter (seconds); resettable to 0
  command: "GET /state.xml?totalOnTime1={value}"

- id: pulseTime1
  type: integer
  description: One-shot pulse duration in seconds (must precede relay1=2 argument)
  command: "GET /state.json?pulseTime1={value}&relay1=2"
```

## Events
```yaml
# Unsolicited notifications documented in source
- id: snmp_trap_relay_change
  source: SNMP
  description: Trap sent when a relay changes state
  pdu: Trap (v1) / Notification (v2c, v3)

- id: snmp_trap_sensor_threshold
  source: SNMP
  description: Trap sent when a configured sensor threshold is reached
  pdu: Trap / Notification

- id: snmp_trap_vin_range
  source: SNMP
  description: Trap sent when supply voltage goes out of configured range
  pdu: Trap / Notification

- id: mqtt_publish
  source: MQTT
  description: I/O state published to configured MQTT broker
  pdu: MQTT 3.1.1 PUBLISH

- id: mqtt_sparkplug_b
  source: MQTT
  description: Sparkplug B structured topic + payload
  pdu: Sparkplug B
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing.
# Modbus is automatically disabled whenever the User account is enabled (no password mechanism in Modbus/TCP).
```

## Notes
- Source manual covers the ControlByWeb X-400 Series at large. X320M-specific I/O counts, register addresses, and coil counts must be confirmed against the X320M setup pages (Advanced Network > "View Modbus Address Table") and the device-generated MIB file.
- HTTP control uses plain GET requests; no keep-alive or special framing required.
- Modbus/TCP idle timeout is 50 seconds; send a periodic read to keep the socket open. The device accepts at most 2 concurrent Modbus/TCP sockets.
- Error responses prepend 0x80 to the original function code (e.g. 0x01 -> 0x81) plus an exception code byte.
- 32-bit sensor/analog values in Modbus FC 0x03 use IEEE 754; endianness is configurable on the device.
- Unconfigured sensor reads return 0xFFFFFFFF (NaN).
- MQTT payload tokens (Section 4.1.4) are placeholders for use in publish payloads: ${mac}, ${ver}, ${ser}, ${uptime}, ${ip}, ${port}, ${httpsport}, ${dateTime}, ${name}, ${model}, ${clientID}, ${digitalInput1..4}, ${relay1..4}, ${vin}, ${register1}.
- ControlByWeb Cloud DAT URL version 2.0 is reserved for ControlByWeb.Cloud and not for third-party use.
<!-- UNRESOLVED: pulseTime1 argument must precede the relay1=2 argument on the same request line. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/X-320M_manual_v1.5.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
retrieved_at: 2026-06-30T15:03:30.812Z
last_checked_at: 2026-07-07T11:14:48.388Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:14:48.388Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec actions have literal matches in source; transport parameters verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the X-400 Series family at large; X320M-specific I/O counts and capabilities should be confirmed against the X320M datasheet."
- "no explicit multi-step sequences documented in source"
- "source does not document safety warnings, interlocks, or power-on sequencing."
- "pulseTime1 argument must precede the relay1=2 argument on the same request line."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
