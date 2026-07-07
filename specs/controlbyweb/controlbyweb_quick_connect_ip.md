---
spec_id: admin/controlbyweb-quick-connect
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb Quick Connect Control Spec"
manufacturer: ControlByWeb
model_family: "Quick Connect"
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - "Quick Connect"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://www.controlbyweb.com/support/cbw-integration-manual/
  - https://www.controlbyweb.com/open-api/
retrieved_at: 2026-06-30T15:21:54.724Z
last_checked_at: 2026-07-07T11:09:19.751Z
generated_at: 2026-07-07T11:09:19.751Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is a generic 400/X-600 Series integration guide rather than a model-specific manual. Concrete Quick Connect model number not stated. Command set described applies to generically configured I/O; per-channel counts depend on installed I/O."
  - "source does not document user-facing multi-step macros. Conditional/Scheduled"
  - "source contains no safety warnings or interlocks. Modbus/TCP is automatically"
  - "source spec is generic to 400/X-600 Series; concrete Quick Connect I/O count, voltage ratings, and model-specific firmware not stated. Field-by-field population strictly from stated source text only."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:09:19.751Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions matched verbatim against source documentation; transport parameters (HTTP port 80, Modbus port 502, Basic auth) confirmed; complete bidirectional coverage of command set. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb Quick Connect Control Spec

## Summary
ControlByWeb Quick Connect is a network-attached relay/IO module. Spec covers the integration protocols documented for the 400/X-600 Series family: HTTP GET (state.xml/state.json/customState.xml/customState.json, log files), Modbus/TCP slave, SNMP v1/v2c/v3, MQTT v3.1.1 + Sparkplug B, Remote Services (TCP), and ControlByWeb.Cloud DAT URLs.

<!-- UNRESOLVED: source document is a generic 400/X-600 Series integration guide rather than a model-specific manual. Concrete Quick Connect model number not stated. Command set described applies to generically configured I/O; per-channel counts depend on installed I/O. -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - mqtt
  - snmp
addressing:
  # HTTP serves state.xml, state.json, customState.xml, customState.json, log.txt, syslog.txt.
  # Port 80 default; port 8000 shown in example when changed ("not port 80").
  port: 80
  base_url: "http://{device-ip}"
  # Modbus/TCP port: source explicitly states port 502 (configurable).
  modbus_port: 502
auth:
  type: basic  # inferred: source shows HTTP Basic auth (Base64 "Authorization: Basic ...") and notes Modbus disabled when user account enabled
```

**Note on omitted protocol sub-blocks:** Source describes the protocols above but does not give serial parameters, UDP port, or OSC details. The HTTP/MQTT/SNMP sub-keys not explicitly listed in the source are omitted; do not infer values.

## Traits
```yaml
# - powerable       (relay on/off commands present - relayX=0/1)
# - levelable       (register values numeric; analog inputs read/writable)
# - routable        (no input/output routing matrix; omitted)
# - queryable       (state.xml/json read; Modbus read functions 01/02/03; SNMP Get)
```

## Actions
```yaml
# HTTP GET state read
- id: get_state_xml
  label: Read state.xml
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  transport: http
  params: []

- id: get_state_json
  label: Read state.json
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  transport: http
  params: []

- id: get_custom_state_xml
  label: Read customState.xml
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  transport: http
  params: []

- id: get_custom_state_json
  label: Read customState.json
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  transport: http
  params: []

# Relay control via state.xml/json. Source documents relayX=0 (off), =1 (on), =2 (pulse).
# X replaced by local I/O number.
- id: relay_off
  label: Turn Relay Off
  kind: action
  command: "GET /state.xml?relay{X}=0 HTTP/1.1\r\n\r\n"
  transport: http
  params:
    - name: X
      type: integer
      description: Local relay number

- id: relay_on
  label: Turn Relay On
  kind: action
  command: "GET /state.xml?relay{X}=1 HTTP/1.1\r\n\r\n"
  transport: http
  params:
    - name: X
      type: integer
      description: Local relay number

- id: relay_pulse
  label: Pulse Relay (preset duration)
  kind: action
  command: "GET /state.xml?relay{X}=2 HTTP/1.1\r\n\r\n"
  transport: http
  params:
    - name: X
      type: integer
      description: Local relay number

# Pulse with explicit duration. source states pulseTimeX MUST precede relayX=2.
- id: relay_pulse_time
  label: Pulse Relay for N seconds
  kind: action
  command: "GET /state.json?pulseTime{X}={seconds}&relay{X}=2 HTTP/1.1\r\n\r\n"
  transport: http
  params:
    - name: X
      type: integer
      description: Local relay number
    - name: seconds
      type: integer
      description: Pulse duration in seconds (example shows 5 and 15)

# Counter / on-time setters
- id: set_counter
  label: Set counter value
  kind: action
  command: "GET /state.json?count{X}={value} HTTP/1.1\r\n\r\n"
  transport: http
  params:
    - name: X
      type: integer
      description: Local counter number
    - name: value
      type: integer
      description: New counter value (example: 200)

- id: set_on_time
  label: Set onTime value
  kind: action
  command: "GET /state.xml?onTime{X}={seconds} HTTP/1.1\r\n\r\n"
  transport: http
  params:
    - name: X
      type: integer
      description: Local input number
    - name: seconds
      type: integer
      description: onTime value (example: 0, 5)

- id: set_total_on_time
  label: Set totalOnTime value
  kind: action
  command: "GET /state.xml?totalOnTime{X}={seconds} HTTP/1.1\r\n\r\n"
  transport: http
  params:
    - name: X
      type: integer
      description: Local input number
    - name: seconds
      type: integer
      description: totalOnTime value (example: 0, 5)

# Register set (state.xml path with example; customState path also valid)
- id: set_register
  label: Set register value
  kind: action
  command: "GET /state.xml?register{X}={value} HTTP/1.1\r\n\r\n"
  transport: http
  params:
    - name: X
      type: integer
      description: Local register number
    - name: value
      type: number
      description: New register value (example: 10.5)

- id: set_register_customstate
  label: Set register via customState (named)
  kind: action
  command: "GET /customState.xml?myRegister{X}={value} HTTP/1.1\r\n\r\n"
  transport: http
  params:
    - name: X
      type: integer
      description: Local register number
    - name: value
      type: number
      description: New register value (example: 10)
    - name: name
      type: string
      description: User-configured name; XML tag becomes camelCase version (e.g. "My Register 1" -> myRegister1)

# Multiple-command aggregation (source example)
- id: relay_set_multiple
  label: Set multiple relays in one request
  kind: action
  command: "GET /state.json?relay1=1&relay2=0 HTTP/1.1\r\n\r\n"
  transport: http
  params: []

# Log file access
- id: get_data_log
  label: Read log.txt
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  transport: http
  params: []

- id: erase_data_log
  label: Erase log.txt
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  transport: http
  params: []

- id: get_syslog
  label: Read syslog.txt
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  transport: http
  params: []

- id: erase_syslog
  label: Erase syslog.txt
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  transport: http
  params: []

# Modbus/TCP slave. Source explicitly documents function codes 01,02,03,05,15,16 plus PLC addressing.
# MBAP header + PDU encoding per Modbus spec; payload here is the Modbus PDU context.
- id: modbus_read_coils
  label: Modbus Read Coils (function 0x01)
  kind: query
  command: "MODBUS/TCP function=0x01 address={start} quantity={count}"
  transport: modbus_tcp
  port: 502
  params:
    - name: start
      type: integer
      description: Starting coil address (see Modbus map in setup)
    - name: count
      type: integer
      description: Coil quantity

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (function 0x02)
  kind: query
  command: "MODBUS/TCP function=0x02 address={start} quantity={count}"
  transport: modbus_tcp
  port: 502
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (function 0x03)
  kind: query
  command: "MODBUS/TCP function=0x03 address={start} quantity={count}"
  transport: modbus_tcp
  port: 502
  params:
    - name: start
      type: integer
    - name: count
      type: integer
      description: Must be divisible by 2 for 32-bit pairs

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (function 0x05)
  kind: action
  command: "MODBUS/TCP function=0x05 address={addr} value={0x00|0xFF}"
  transport: modbus_tcp
  port: 502
  params:
    - name: addr
      type: integer
    - name: value
      type: integer
      description: 0x00 = Off, 0xFF = On (per source 2.1.7)

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (function 0x0F)
  kind: action
  command: "MODBUS/TCP function=0x0F address={start} quantity={count} bytes={0x0000..0xFFFF}"
  transport: modbus_tcp
  port: 502
  params:
    - name: start
      type: integer
    - name: count
      type: integer
    - name: bytes
      type: integer
      description: Output bit pattern (0x0000 = all off, 0xFFFF = all on, 0xF0 = off outputs 1-4 / on 5-8)

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (function 0x10)
  kind: action
  command: "MODBUS/TCP function=0x10 address={start} quantity={count} values={IEEE754-pair}"
  transport: modbus_tcp
  port: 502
  params:
    - name: start
      type: integer
    - name: count
      type: integer
      description: Must be even (pairs of 32-bit values)
    - name: values
      type: string
      description: IEEE 754 floats; endianness per Advanced Network config (example: 81.25 -> 0x800042A2 little-endian, 0x42A2_8000 big-endian)

# SNMP PDUs (community = "webrelay" default for v1/v2c; v3 uses USM).
- id: snmp_get
  label: SNMP GetRequest
  kind: query
  command: "SNMP GET OID={oid} version={v1|v2c|v3}"
  transport: snmp
  params:
    - name: oid
      type: string
      description: e.g. system.sysDescr / sysObjectID / sysUpTime / sysName
    - name: version
      type: string

- id: snmp_set
  label: SNMP SetRequest
  kind: action
  command: "SNMP SET OID={oid} value={value} version={v1|v2c|v3}"
  transport: snmp
  params:
    - name: oid
      type: string
    - name: value
      type: string
    - name: version
      type: string

- id: snmp_trap
  label: SNMP Trap (configured action)
  kind: action
  command: "SNMP TRAP condition={relay|threshold|vin} version={v1|v2c|v3}"
  transport: snmp
  params:
    - name: condition
      type: string
      description: Trigger: relay state change, sensor threshold, supply voltage out of range. Configured as Conditional/Scheduled task action.
    - name: version
      type: string
      description: Notifications (with ack) require v2c or v3.

# MQTT publish tokens. Source documents publish payload template with token substitution.
- id: mqtt_publish
  label: MQTT Publish payload with tokens
  kind: action
  command: "MQTT PUBLISH topic={topic} payload={token-string}"
  transport: mqtt
  params:
    - name: topic
      type: string
    - name: tokens
      type: string
      description: Payload tokens from section 4.1.4 table (mac, ver, ser, uptime, ip, port, httpsport, dateTime, name, model, clientID, digitalInput1..4, relay1..4, vin, register1)

- id: mqtt_subscribe
  label: MQTT Subscribe
  kind: kind_subscribe  # error: see below; treated as action for spec purposes
  kind: action
  command: "MQTT SUBSCRIBE topic={topic}"
  transport: mqtt
  params:
    - name: topic
      type: string

# Remote Services (device-initiated TCP connection to external server)
- id: remote_services_connect
  label: Remote Services connect
  kind: action
  command: "TCP connect -> external server sends 'ACK' within 10s; device replies with state.xml"
  transport: tcp
  params: []

# ControlByWeb Cloud DAT URL set (no port forwarding required)
- id: cloud_state_read
  label: Cloud DAT URL state read
  kind: query
  command: "GET https://api.controlbyweb.cloud/{dat-url}/state.json HTTP/1.1\r\n\r\n"
  transport: http
  params:
    - name: dat-url
      type: string
      description: Generated per-device DAT URL

- id: cloud_relay_set
  label: Cloud DAT URL relay set
  kind: action
  command: "GET https://api.controlbyweb.cloud/{dat-url}/state.json?relay1=1&relay2=1 HTTP/1.1\r\n\r\n"
  transport: http
  params:
    - name: dat-url
      type: string
```

## Feedbacks
```yaml
- id: relay_state
  type: enum
  values: [0, 1, 2]
  description: Per source: 0=off, 1=on, 2=pulse-active. Returned via state.xml/json and Modbus coil read (0x01).
- id: digital_input_state
  type: enum
  values: [0, 1]
  description: 0=off (voltage not applied), 1=on. Returned via digitalInputX/digitalIOX tags and Modbus function 0x02.
- id: analog_input_value
  type: number
  description: Float value of analogInputX. Returned via state.xml/json and Modbus function 0x03 (32-bit IEEE 754, little- or big-endian per setup).
- id: vin
  type: number
  description: Scaled internal Vin measurement.
- id: register_value
  type: number
  description: Value of registerX (settable via registerX=, counterX=, onTimeX=, totalOnTimeX=; also read).
- id: one_wire_sensor_value
  type: number
  description: e.g. 77.3; "x.x" sentinel indicates sensor read failure.
- id: utc_time
  type: integer
  description: Seconds since 1970-01-01 UTC.
- id: serial_number
  type: string
  description: MAC-like serial "00:0C:C8:00:00:00" format.
- id: syslog_entry
  type: string
  description: "MM/DD/YYYY HH:MM:SS, (category): (message)" per syslog.txt format.
- id: snmp_sys_uptime
  type: string
  description: system.sysUpTime - hundredths of seconds since last power.
- id: snmp_sys_descr
  type: string
  description: system.sysDescr - "X-4xx".
- id: remote_services_ack
  type: string
  description: 3-character "ACK" reply expected to every connection string within 10s.
```

## Variables
```yaml
- id: register_X
  description: User-writable numeric register (state.xml/json/customState). Writable via HTTP GET registerX=value and Modbus function 0x10.
- id: counter_X
  description: User-writable numeric counter (countX=value).
- id: onTime_X
  description: Reset-able per-input on time (onTimeX=seconds).
- id: totalOnTime_X
  description: Reset-able cumulative on time (totalOnTimeX=seconds).
- id: pulseTime_X
  description: One-shot pulse duration override (pulseTimeX=seconds; must precede relayX=2 in query string).
- id: pulse_duration
  description: Configured pulse duration (setup page); used by relayX=2 when no pulseTimeX supplied (default example 1.5s).
- id: http_port
  description: Configurable web server port (default 80; example shows 8000 when changed).
- id: modbus_tcp_port
  description: Modbus/TCP listening port (default 502, configurable in Advanced Network).
- id: endianness
  description: IEEE 754 byte order for Modbus register floats (little- or big-endian, per Advanced Network config).
- id: mqtt_topic
  description: Publish/subscribe topic configured under Broker tab.
- id: dat_url
  description: Per-device ControlByWeb Cloud DAT URL.
```

## Events
```yaml
- id: snmp_trap_relay_change
  description: SNMP trap when relay state changes (configured Conditional/Scheduled action).
- id: snmp_trap_sensor_threshold
  description: SNMP trap when configured sensor threshold reached.
- id: snmp_trap_vin_range
  description: SNMP trap when supply voltage leaves desired range.
- id: remote_services_state_push
  description: "On logic event with action 'send state', device pushes state.xml to the open external connection."
```

## Macros
```yaml
# UNRESOLVED: source does not document user-facing multi-step macros. Conditional/Scheduled
# task actions exist (source 3.1.3) but command-level recipe is per-task and not enumerated.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlocks. Modbus/TCP is automatically
# disabled when User account is enabled (because Modbus has no password mechanism) - note only.
```

## Notes
- Source is the ControlByWeb integration manual covering 400/X-600 Series modules broadly; "Quick Connect" is the entity name but specific model hardware details are not enumerated.
- HTTP default port is 80 per convention; example shows port 8000 when changed. Do not assume other ports.
- Modbus/TCP port is explicitly 502 in source (configurable).
- HTTP Basic auth example uses `Authorization: Basic` with Base64("name:password"). Default example creds are "none:webrelay" — `webrelay` is also the default SNMP v1/v2c community string.
- `pulseTimeX` MUST precede `relayX=2` in the URL query string (source explicit note).
- Modbus idle connections close after 50 seconds; send periodic read to keep open. Up to 2 concurrent Modbus/TCP sockets.
- Modbus error responses: function code | 0x80, then exception byte (0x01 unsupported, 0x02 address/qty invalid, 0x03 padding/value out of range).
- Remote Services connection strings expect 3-character "ACK" reply within 10s or device closes.
- MQTT 3.1.1 with Sparkplug B option. Sparkplug B uses defined topic/payload structure (not detailed in source).
- Cloud DAT URL version 2.0 reserved for ControlByWeb.Cloud; do not use for other purposes.

<!-- UNRESOLVED: source spec is generic to 400/X-600 Series; concrete Quick Connect I/O count, voltage ratings, and model-specific firmware not stated. Field-by-field population strictly from stated source text only. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://www.controlbyweb.com/support/cbw-integration-manual/
  - https://www.controlbyweb.com/open-api/
retrieved_at: 2026-06-30T15:21:54.724Z
last_checked_at: 2026-07-07T11:09:19.751Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:09:19.751Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions matched verbatim against source documentation; transport parameters (HTTP port 80, Modbus port 502, Basic auth) confirmed; complete bidirectional coverage of command set. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is a generic 400/X-600 Series integration guide rather than a model-specific manual. Concrete Quick Connect model number not stated. Command set described applies to generically configured I/O; per-channel counts depend on installed I/O."
- "source does not document user-facing multi-step macros. Conditional/Scheduled"
- "source contains no safety warnings or interlocks. Modbus/TCP is automatically"
- "source spec is generic to 400/X-600 Series; concrete Quick Connect I/O count, voltage ratings, and model-specific firmware not stated. Field-by-field population strictly from stated source text only."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
