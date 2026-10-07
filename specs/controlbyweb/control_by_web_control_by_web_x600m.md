---
spec_id: admin/control-by-web-x600m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Control By Web X600M Control Spec"
manufacturer: ControlByWeb
model_family: X600M
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
    - "Control By Web"
  models:
    - X600M
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://www.controlbyweb.com/wp-content/uploads/2024/01/X-600M_manual_v1.8.pdf
retrieved_at: 2026-04-29T21:18:17.418Z
last_checked_at: 2026-10-01T07:34:38.395Z
generated_at: 2026-10-01T07:34:38.395Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial RS-232 not mentioned in source"
  - "no analog level commands found"
  - "no explicit macro sequences documented in source"
  - "power-on sequencing and electrical limits not stated in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-01T07:34:38.395Z
  matched_actions: 36
  action_count: 36
  confidence: medium
  summary: "All 36 spec actions map to literal HTTP, Modbus, SNMP, MQTT, Remote Services, or Cloud API commands documented in the refined source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Control By Web X600M Control Spec

## Summary
X600M is an Ethernet-enabled I/O controller with relay outputs, digital inputs, analog inputs, registers, and counters. Control and monitoring interfaces documented by the source include HTTP GET, Modbus/TCP slave on configurable port 502, SNMP v1/v2c/v3, MQTT 3.1.1, and Remote Services TCP V1. HTTP requests support no-password access when the User account is disabled and HTTP Basic authentication when it is enabled.

<!-- UNRESOLVED: serial RS-232 not mentioned in source -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  base_url: "http://{device-address}/{resource}"
  port: 80
  additional_ports:
    modbus_tcp: 502
auth:
  type: UNRESOLVED
  description: HTTP requests require a Base64-encoded Basic Authorization header when the User account is enabled; no password is required when disabled. The source does not document an authentication scheme applicable to the X600M as a whole; HTTP Basic applies only when the User account is enabled, and Modbus/TCP is disabled in that state. SNMP v1/v2c use community strings and SNMP v3 uses USM. MQTT and Remote Services authentication are not specified in the source.
```

## Traits
```yaml
powerable: true  # inferred: relay ON/OFF/PULSE commands present
routable: true  # inferred: I/O control commands present
queryable: true  # inferred: state.xml/json and Modbus read commands return I/O state
levelable: false  # UNRESOLVED: no analog level commands found
```

## Actions
```yaml
- id: read_state_xml
  label: Read State XML
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []

- id: read_state_json
  label: Read State JSON
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []

- id: read_custom_state_xml
  label: Read Custom State XML
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []

- id: read_custom_state_json
  label: Read Custom State JSON
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

- id: relay_off
  label: Turn Relay Off
  kind: action
  command: "state.xml?relay{relay}=0"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)
  example: "GET /state.xml?relay1=0"

- id: relay_on
  label: Turn Relay On
  kind: action
  command: "state.xml?relay{relay}=1"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)
  example: "GET /state.xml?relay1=1"

- id: relay_pulse
  label: Pulse Relay
  kind: action
  command: "state.json?pulseTime{relay}={pulseTime}&relay{relay}=2"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)
    - name: pulseTime
      type: float
      required: false
      description: Pulse duration in seconds; omit pulseTime argument to use preset duration
  example: "GET /state.json?pulseTime1=5&relay1=2"

- id: set_register
  label: Set Register Value
  kind: action
  command: "state.xml?register{register}={value}"
  params:
    - name: register
      type: integer
      description: Register number (1-based)
    - name: value
      type: float
      description: Register value
  example: "GET /state.xml?register1=10.5"

- id: set_counter
  label: Set Counter Value
  kind: action
  command: "state.json?count{counter}={value}"
  params:
    - name: counter
      type: integer
      description: Counter number (1-based)
    - name: value
      type: integer
      description: Counter value
  example: "GET /state.json?count1=200"

- id: reset_on_time
  label: Set On Time
  kind: action
  command: "state.xml?onTime{input}={value}"
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: value
      type: float
      description: On-time value in seconds
  example: "GET /state.xml?onTime1=0"

- id: reset_total_on_time
  label: Set Total On Time
  kind: action
  command: "state.xml?totalOnTime{input}={value}"
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: value
      type: float
      description: Total-on-time value in seconds
  example: "GET /state.xml?totalOnTime1=0"

- id: set_custom_state_value
  label: Set I/O Using Custom State Name
  kind: action
  command: "customState.xml?{ioName}={value}"
  params:
    - name: ioName
      type: string
      description: Exact configured I/O tag name returned by customState.xml
    - name: value
      type: string
      description: Value assigned to the named I/O
  example: "http://192.168.1.2/customState.xml?myRegister1=10"

- id: send_multiple_state_commands
  label: Send Multiple State Commands
  kind: action
  command: "/state.json?{arguments}"
  params:
    - name: arguments
      type: string
      description: Ampersand-separated XML or JSON command arguments
  example: "/state.json?relay1=1&relay2=0"

- id: send_multiple_custom_state_commands
  label: Send Multiple Custom State Commands
  kind: action
  command: "/customState.xml?{arguments}"
  params:
    - name: arguments
      type: string
      description: Ampersand-separated custom I/O command arguments
  example: "/customState.xml?relay1=1&relay2=0"

- id: read_data_log
  label: Read Data Log
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_log
  label: Erase Data Log File
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []
  example: "GET /log.txt?erase=1"

- id: read_system_log
  label: Read System Log
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_system_log
  label: Erase System Log File
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: modbus_read_coils
  label: Read Coils (Modbus FC01)
  kind: query
  command: "0x01"
  params:
    - name: startAddress
      type: integer
      description: Starting coil address from current Modbus map
    - name: quantity
      type: integer
      description: Number of coils to read

- id: modbus_read_discrete_inputs
  label: Read Discrete Inputs (Modbus FC02)
  kind: query
  command: "0x02"
  params:
    - name: startAddress
      type: integer
      description: Starting input address from current Modbus map
    - name: quantity
      type: integer
      description: Number of inputs to read

- id: modbus_read_holding_registers
  label: Read Holding Registers (Modbus FC03)
  kind: query
  command: "0x03"
  params:
    - name: startAddress
      type: integer
      description: Starting register address; sensor addresses and registers must be read in pairs
    - name: quantity
      type: integer
      description: Number of registers; must be divisible by 2

- id: modbus_write_single_coil
  label: Write Single Coil (Modbus FC05)
  kind: action
  command: "0x05"
  params:
    - name: address
      type: integer
      description: Coil address from current Modbus map
    - name: value
      type: integer
      description: "0x00=off, 0xFF=on"

- id: modbus_write_multiple_coils
  label: Write Multiple Coils (Modbus FC15)
  kind: action
  command: "0x0F"
  params:
    - name: startAddress
      type: integer
      description: Starting coil address
    - name: quantity
      type: integer
      description: Number of coils
    - name: value
      type: integer
      description: Bit mask from 0x0000 through 0xFFFF

- id: modbus_write_multiple_registers
  label: Write Multiple Registers (Modbus FC16)
  kind: action
  command: "0x10"
  params:
    - name: startAddress
      type: integer
      description: Starting register address; must be aligned for register pairs
    - name: quantity
      type: integer
      description: Number of registers; must be divisible by 2
    - name: values
      type: array
      items:
        type: float
      description: IEEE 754 32-bit floating-point values using configured endianness

- id: modbus_pulse_relay
  label: Pulse Relay Using Modbus
  kind: action
  command: "0x16"
  params:
    - name: startAddress
      type: integer
      description: Pulse address from current Modbus map; example Relay 1 uses addresses 512-513
    - name: duration
      type: float
      description: Pulse duration in seconds encoded as a 32-bit IEEE 754 float

- id: snmp_get
  label: SNMP GetRequest
  kind: query
  command: "GetRequest"
  params:
    - name: oid
      type: string
      description: Object identifier

- id: snmp_get_next
  label: SNMP GetNextRequest
  kind: query
  command: "GetNextRequest"
  params:
    - name: oid
      type: string
      description: Starting object identifier

- id: snmp_get_bulk
  label: SNMP GetBulkRequest
  kind: query
  command: "GetBulkRequest"
  params:
    - name: oid
      type: string
      description: Starting object identifier

- id: snmp_set
  label: SNMP SetRequest
  kind: action
  command: "SetRequest"
  params:
    - name: oid
      type: string
      description: Object identifier
    - name: value
      type: string
      description: Value to set

- id: snmp_trap
  label: Send SNMP Trap
  kind: action
  command: "Trap"
  params:
    - name: configuredAction
      type: string
      description: Trap action configured in Conditional or Scheduled tasks

- id: snmp_notification
  label: Send SNMP Notification
  kind: action
  command: "Notification"
  params:
    - name: configuredAction
      type: string
      description: Notification action configured in Conditional or Scheduled tasks

- id: mqtt_publish
  label: MQTT Publish
  kind: action
  command: "PUBLISH"
  params:
    - name: topic
      type: string
      description: MQTT topic
    - name: payload
      type: string
      description: Message payload supporting documented MQTT payload tokens

- id: mqtt_subscribe
  label: MQTT Subscribe
  kind: action
  command: "SUBSCRIBE"
  params:
    - name: topic
      type: string
      description: MQTT topic to subscribe to

- id: remote_services_ack
  label: Acknowledge Remote Services Connection String
  kind: action
  command: "ACK"
  params: []

- id: cloud_read_state_json
  label: Read State JSON Through ControlByWeb Cloud
  kind: query
  command: "https://api.controlbyweb.cloud/{generated DAT url}/state.json"
  params:
    - name: generated DAT url
      type: string
      description: DAT URL generated manually or through ControlByWeb Cloud API

- id: cloud_set_relays
  label: Set Relays Through ControlByWeb Cloud
  kind: action
  command: "https://api.controlbyweb.cloud/{generated DAT url}/state.json?relay1=1&relay2=1"
  params:
    - name: generated DAT url
      type: string
      description: DAT URL generated manually or through ControlByWeb Cloud API
```

## Feedbacks
```yaml
- id: digital_input_state
  type: enum
  values:
    - "0"
    - "1"
  description: "0=off; 1=on"

- id: digital_io_state
  type: enum
  values:
    - "0"
    - "1"
  description: "0=off; 1=on"

- id: relay_state
  type: enum
  values:
    - "0"
    - "1"
  description: "0=off; 1=on"

- id: analog_input_value
  type: float
  description: Analog input value

- id: frequency_input_value
  type: float
  description: X-420 frequency-input value

- id: register_value
  type: float
  description: Register value

- id: counter_value
  type: float
  description: Counter value associated with an input

- id: on_time
  type: float
  description: Time in seconds the input has been on since last coming on

- id: total_on_time
  type: float
  description: Total time in seconds the input has been on

- id: frequency
  type: float
  description: Frequency associated with an input

- id: vin
  type: float
  description: Scaled internal Vin measurement

- id: one_wire_sensor
  type: string
  description: Sensor reading; x.x indicates that the 1-Wire sensor could not be read

- id: utctime
  type: integer
  description: Current UTC time as seconds since January 1, 1970

- id: timezone_offset
  type: integer
  description: Offset applied to UTC time for local time

- id: serial_number
  type: string
  description: Device serial number in MAC-address format

- id: modbus_coil_status
  type: enum
  values:
    - 0
    - 1
  description: "0=output off; 1=output on"

- id: modbus_single_coil_write_response
  type: enum
  values:
    - "0x00"
    - "0xFF"
  description: Response mirrors requested single-coil state

- id: modbus_multiple_coil_write_response
  type: integer
  description: Response returns quantity written

- id: modbus_multiple_register_write_response
  type: integer
  description: Response returns register quantity written

- id: modbus_error
  type: enum
  values:
    - "0x01"
    - "0x02"
    - "0x03"
  description: Modbus exception code; error function code is original function code plus 0x80

- id: remote_services_acknowledgement
  type: string
  values:
    - "ACK"
  description: Three-character acknowledgement expected for every Remote Services connection string
```

## Variables
```yaml
- id: pulse_duration
  type: float
  description: Pulse duration in seconds for relay pulse command, configured per relay

- id: http_port
  type: integer
  description: HTTP server port; default 80 and configurable

- id: modbus_port
  type: integer
  description: Modbus/TCP port; default 502 and configurable

- id: snmp_read_community_string
  type: string
  description: SNMP v1/v2c read community string; default webrelay and configurable

- id: snmp_write_community_string
  type: string
  description: SNMP v1/v2c write community string; default webrelay and configurable

- id: mqtt_mac
  type: string
  token: "${mac}"
  description: MAC address

- id: mqtt_firmware_revision
  type: string
  token: "${ver}"
  description: Firmware revision

- id: mqtt_serial_number
  type: string
  token: "${ser}"
  description: Serial number

- id: mqtt_up_time
  type: string
  token: "${uptime}"
  description: Up time

- id: mqtt_ip_address
  type: string
  token: "${ip}"
  description: IP address

- id: mqtt_http_port
  type: string
  token: "${port}"
  description: HTTP port

- id: mqtt_https_port
  type: string
  token: "${httpsport}"
  description: HTTPS port

- id: mqtt_epoch_timestamp
  type: string
  token: "${dateTime}"
  description: Epoch timestamp

- id: mqtt_device_name
  type: string
  token: "${name}"
  description: Control Page Header name

- id: mqtt_model_number
  type: string
  token: "${model}"
  description: Model number

- id: mqtt_client_id
  type: string
  token: "${clientID}"
  description: Client ID

- id: mqtt_digital_input
  type: string
  token: "${digitalInput{input}}"
  description: Digital input value

- id: mqtt_relay
  type: string
  token: "${relay{relay}}"
  description: Relay value

- id: mqtt_vin
  type: string
  token: "${vin}"
  description: Vin value

- id: mqtt_register
  type: string
  token: "${register{register}}"
  description: Register value
```

## Events
```yaml
- id: snmp_relay_state_trap
  type: notification
  description: SNMP trap sent when a relay changes state, when configured as a Conditional or Scheduled task action

- id: snmp_sensor_threshold_trap
  type: notification
  description: SNMP trap sent when a configured sensor value is reached

- id: snmp_supply_range_trap
  type: notification
  description: SNMP trap sent when supply voltage is outside configured desired range

- id: snmp_inform_notification
  type: notification
  description: SNMP v2c/v3 notification requiring a response from the SNMP manager; retried when no response is returned

- id: mqtt_io_update
  type: notification
  description: MQTT publication or subscribed update generated when I/O changes state or is updated

- id: remote_services_state
  type: notification
  description: state.xml is sent to an open remote-server connection when a logic event executes a send-state action
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: modbus_auth_interlock
    description: Modbus communications are disabled when the User account is enabled because Modbus/TCP has no password-protection mechanism. Disable the User account and enable Modbus functionality for Modbus access.
  - id: pulse_time_syntax
    description: pulseTime argument MUST precede the relayX=2 argument in an HTTP GET request.
  - id: remote_services_ack_timeout
    description: Remote Services expects ACK within 10 seconds of every connection string; without it, the device closes the connection.
# UNRESOLVED: power-on sequencing and electrical limits not stated in source
```

## Notes
- HTTP GET supports `state.xml`, `state.json`, `customState.xml`, and `customState.json`.
- HTTP server port defaults to 80 and is configurable; source examples show changed port 8000.
- `customState` command names depend on configured I/O names and must be read from `customState.xml`.
- Multiple XML or JSON command arguments may be combined with `&`.
- When the User account is enabled, HTTP requires a Base64-encoded Basic Authorization header; `log.txt` then requires User account credentials and `syslog.txt` requires setup credentials. No unified device-wide authentication scheme is documented; the appropriate credentials depend on which interface is used.
- Modbus/TCP uses configurable port 502, has a 50-second inactivity timeout, and permits two simultaneous sockets.
- Modbus addresses are dynamic based on I/O configuration; use the current Modbus Address Table.
- Modbus 32-bit floating-point values use IEEE 754 and configured little- or big-endian word order.
- SNMP v1/v2c use configurable read and write community strings; SNMP v3 uses USM authentication and privacy.
- MQTT 3.1.1 and Sparkplug B are supported.
- Remote Services uses TCP V1 and periodically sends a connection string ending with `state.xml`.
- Remote Services version 2.0 is reserved for ControlByWeb.Cloud.
- DAT URLs permit ControlByWeb Cloud HTTP GET access without port forwarding.
- Modbus Function Code 16 (0x10) is used to pulse a relay by writing a 32-bit float pulse duration to the relay's pulse address (e.g. addresses 512-513 for Relay 1).
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://www.controlbyweb.com/wp-content/uploads/2024/01/X-600M_manual_v1.8.pdf
retrieved_at: 2026-04-29T21:18:17.418Z
last_checked_at: 2026-10-01T07:34:38.395Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T07:34:38.395Z
matched_actions: 36
action_count: 36
confidence: medium
summary: "All 36 spec actions map to literal HTTP, Modbus, SNMP, MQTT, Remote Services, or Cloud API commands documented in the refined source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial RS-232 not mentioned in source"
- "no analog level commands found"
- "no explicit macro sequences documented in source"
- "power-on sequencing and electrical limits not stated in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
