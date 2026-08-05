---
spec_id: admin/controlbyweb-x400-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X-400 Series Control Spec"
manufacturer: ControlByWeb
model_family: "X-400 Series"
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - "X-400 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
retrieved_at: 2026-07-12T15:45:16.315Z
last_checked_at: 2026-07-21T21:46:26.253Z
generated_at: 2026-07-21T21:46:26.253Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "manufacturer model variant (Quad Relay) not found in source; spec covers X-400 Series generic document. UNRESOLVED: firmware version not stated. UNRESOLVED: MQTT broker address / topic structure not in source. UNRESOLVED: SNMP port not explicitly stated in source."
  - "specific trigger thresholds / voltage range values not documented (configurable in setup pages)."
  - "MQTT publish topics / event payloads not detailed in source."
  - "no explicit multi-step macro descriptions in source."
  - "no safety warnings or interlock procedures in source."
  - "MQTT broker address, topic structure, publish/subscribe semantics not documented in source."
  - "TCP V1 protocol frame format not specified."
  - "Events/notifications — specific trigger thresholds for SNMP traps, voltage range alerts not documented (configurable). UNRESOLVED: MQTT broker address, topic structure, publish payloads not in source. UNRESOLVED: SNMP agent port not explicitly stated (assumed standard 161 but not in source). UNRESOLVED: firmware version compatibility. UNRESOLVED: Modbus exact coil/register address map (device-specific, generated dynamically)."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:46:26.253Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec actions matched verbatim to source commands; all transport parameters verified; complete bidirectional command coverage including Events representing SNMP Traps and Notifications. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# ControlByWeb X-400 Series Control Spec

## Summary
X-400 Series IP-enabled remote I/O controller with relay outputs, digital/analog inputs, and optional sensors. Control via HTTP GET requests (state.xml/json), Modbus/TCP on port 502, SNMP (v1/v2c/v3), or MQTT/Sparkplug B (v3.1.1). No native REST semantics — commands passed as query parameters on XML/JSON endpoints. Optional ControlByWeb Cloud DAT URLs provide remote access without port forwarding.

<!-- UNRESOLVED: manufacturer model variant (Quad Relay) not found in source; spec covers X-400 Series generic document. UNRESOLVED: firmware version not stated. UNRESOLVED: MQTT broker address / topic structure not in source. UNRESOLVED: SNMP port not explicitly stated in source. -->

## Transport
```yaml
protocols:
  - http
  - modbus
  - snmp
  - mqtt
addressing:
  base_url: http://{ip}/state.xml  # http only; https for cloud DAT URLs
  modbus_port: 502  # stated: "open a connection with the module on port 502 (configurable under Advanced Network tab)"
  http_port: 80  # inferred default: source references "not port 80" implying 80 is default
auth:
  type: none  # inferred: no-password mode supported in source
  # NOTE: optional user/password auth via Base64 encoded Authorization header (HTTP).
  # Password encoding: Base64("name:password") - example "none:webrelay" → "bm9uZTp3ZWJyZWxheQ=="
  # NOTE: Modbus disabled whenever User account enabled (Modbus/TCP has no password mechanism).
  # NOTE: SNMP v1/v2c use community strings (default read+write "webrelay"); SNMP v3 uses USM (auth+privacy protocols).
```

## Traits
```yaml
- powerable       # relay on/off/pulse commands present
- routable        # multi-output control present
- queryable       # state.xml/json + Modbus read FCs + SNMP Get present
- levelable       # pulseTime parameter for variable pulse duration; register float set
```

## Actions
```yaml
# ── HTTP / XML / JSON control (state.xml, state.json, customState.xml/json) ──
- id: set_relay
  label: Set Relay State
  kind: action
  command: "state.xml?relay{relay}={value}"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)
    - name: value
      type: integer
      description: 0=off, 1=on, 2=pulse
  note: Replace state.xml with state.json or customState.xml/json equivalently.

- id: pulse_relay
  label: Pulse Relay with Custom Duration
  kind: action
  command: "state.json?pulseTime{relay}={pulseTime}&relay{relay}=2"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)
    - name: pulseTime
      type: integer
      description: Pulse duration in seconds (overrides preset, not stored)
  note: pulseTime arg MUST precede relayX=2 in query string.

- id: set_on_time
  label: Set On Time
  kind: action
  command: "state.xml?onTime{relay}={value}"
  params:
    - name: relay
      type: integer
      description: Input/relay number (1-based)
    - name: value
      type: number
      description: On time in seconds

- id: set_total_on_time
  label: Set Total On Time
  kind: action
  command: "state.xml?totalOnTime{relay}={value}"
  params:
    - name: relay
      type: integer
      description: Input/relay number (1-based)
    - name: value
      type: number
      description: Total on time in seconds

- id: set_counter
  label: Set Counter
  kind: action
  command: "state.json?count{counter}={value}"
  params:
    - name: counter
      type: integer
      description: Counter number (1-based)
    - name: value
      type: number
      description: Counter value

- id: set_register
  label: Set Register Value
  kind: action
  command: "state.xml?register{register}={value}"
  params:
    - name: register
      type: integer
      description: Register number (1-based)
    - name: value
      type: number
      description: Register value (floating point, e.g. 10.5)

- id: erase_data_log
  label: Erase Data Log (log.txt)
  kind: action
  command: "http://{ip}/log.txt?erase=1"
  params: []
  note: Requires user password if User account enabled.

- id: erase_syslog
  label: Erase System Log (syslog.txt)
  kind: action
  command: "http://{ip}/syslog.txt?erase=1"
  params: []
  note: Requires setup username/password.

- id: custom_state_set
  label: Set I/O via customState (CamelCase name)
  kind: action
  command: "customState.xml?{camelName}={value}"
  params:
    - name: camelName
      type: string
      description: Camel case of user-configurable I/O name (e.g. myRegister1)
    - name: value
      type: number
      description: Value to set
  note: Reference customState.xml for exact tag names per configured I/O.

# ── Modbus/TCP function codes (slave; port 502) ──
- id: modbus_read_coils
  label: Modbus Read Coils (FC 01)
  kind: query
  command: "0x01"
  params:
    - name: start_address
      type: integer
      description: Starting coil address (refer to Modbus map in setup pages)
    - name: quantity
      type: integer
      description: Number of coils to read
  note: Read relays and digital I/O configured as outputs. Error FC 0x81.

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02)
  kind: query
  command: "0x02"
  params:
    - name: start_address
      type: integer
      description: Starting input address (refer to Modbus map)
    - name: quantity
      type: integer
      description: Number of inputs to read
  note: Read digital inputs / digital I/O as inputs. Error FC 0x82.

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "0x03"
  params:
    - name: start_address
      type: integer
      description: Starting register address (refer to Modbus map)
    - name: quantity
      type: integer
      description: Register count; MUST be divisible by 2 (32-bit float pairs)
  note: Read Vin, sensors, registers, counters, analog inputs. IEEE 754 floats, little- or big-endian per config. NaN (0xFFFFFFFF) if sensor absent. Error FC 0x83.

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "0x05"
  params:
    - name: address
      type: integer
      description: Coil address (refer to Modbus map)
    - name: value
      type: integer
      description: 0x00=Off, 0xFF=On
  note: Control one digital output/relay. Response mirrors 0x00 or 0xFF. Error FC 0x85.

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15 / 0x0F)
  kind: action
  command: "0x0F"
  params:
    - name: start_address
      type: integer
      description: Starting output address
    - name: quantity
      type: integer
      description: Number of outputs to affect
    - name: byte_count
      type: integer
      description: Quantity divided by 8
    - name: values
      type: integer
      description: Digital I/O value byte(s), 0x0000-0xFFFF
  note: 0xFFFF=ON up to 16, 0x0000=OFF, 0xF0=off first 4 / on 5-8. Error FC 0x8F.

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16 / 0x10)
  kind: action
  command: "0x10"
  params:
    - name: start_address
      type: integer
      description: Starting register address
    - name: quantity
      type: integer
      description: Register count; MUST be divisible by 2
    - name: values
      type: number
      description: IEEE 754 floating-point values (endianness per config)
  note: Set registers / analog outputs / pulse duration (e.g. Pulse Relay 1 as 32-bit float at addr 512-513). Error FC 0x90.

# ── SNMP PDUs (v1/v2c/v3) ──
- id: snmp_get
  label: SNMP GetRequest
  kind: query
  command: "GetRequest"
  params:
    - name: oid
      type: string
      description: Object identifier from generated MIB file
  note: Community string required (default "webrelay") for v1/v2c; USM creds for v3.

- id: snmp_get_next
  label: SNMP GetNextRequest
  kind: query
  command: "GetNextRequest"
  params:
    - name: oid
      type: string
      description: Object identifier
  note: Walks to next object in MIB.

- id: snmp_get_bulk
  label: SNMP GetBulkRequest
  kind: query
  command: "GetBulkRequest"
  params:
    - name: oid
      type: string
      description: Object identifier
  note: Bulk transfer; supported PDU per Section 3.1.

- id: snmp_set
  label: SNMP SetRequest
  kind: action
  command: "SetRequest"
  params:
    - name: oid
      type: string
      description: Object identifier from generated MIB file
    - name: value
      type: string
      description: Value to write
  note: Write community string required (default "webrelay") for v1/v2c.
```

## Feedbacks
```yaml
- id: relay_state
  label: Relay State
  type: enum
  values:
    - "0"  # off (coil off)
    - "1"  # on (coil energized)

- id: digital_input_state
  label: Digital Input State
  type: enum
  values:
    - "0"  # off (voltage not applied)
    - "1"  # on (voltage applied)

- id: digital_io_state
  label: Digital I/O State (configurable direction)
  type: enum
  values:
    - "0"  # off (voltage not applied)
    - "1"  # on (voltage applied)
  description: digitalIOX - digital I/O configurable as input or output.

- id: analog_input_value
  label: Analog Input Value
  type: number
  description: Voltage value for analog input X

- id: vin
  label: Supply Voltage
  type: number
  description: Scaled internal Vin measurement; always present in state.xml/json

- id: register_value
  label: Register Value
  type: number
  description: Value of register X

- id: counter_value
  label: Counter Value
  type: number
  description: Count value associated with input X (countX)

- id: on_time
  label: On Time
  type: number
  description: Seconds input has been on since last coming on (onTimeX)

- id: total_on_time
  label: Total On Time
  type: number
  description: Total seconds input has been on (totalOnTimeX)

- id: frequency
  label: Per-Input Frequency
  type: number
  description: Frequency associated with input X (frequencyX)

- id: frequency_input
  label: Dedicated Frequency Input
  type: number
  description: Value of the X-420 frequency input (frequencyInput, singular)

- id: onewire_sensor
  label: 1-Wire Sensor
  type: number
  description: Temperature/humidity sensor value; "x.x" indicates read failure; append units via showUnits=1

- id: device_time
  label: Device UTC Time
  type: integer
  description: UTC time as seconds since Jan 1 1970 (utcTime)

- id: timezone_offset
  label: Timezone Offset
  type: integer
  description: Seconds offset from UTC for local time (timezoneOffset)

- id: serial_number
  label: Serial Number
  type: string
  description: MAC-style serial number (00:00:00:00:00:00 format)

- id: latitude
  label: Latitude
  type: string
  description: Latitude value (lat, JSON state.json)

- id: longitude
  label: Longitude
  type: string
  description: Longitude value (long, JSON state.json)

- id: min_rec_refresh
  label: Min Record Refresh
  type: integer
  description: Minimum record refresh interval (minRecRefresh, JSON state.json)

# ── SNMP RFC1213 standard objects ──
- id: snmp_sysDescr
  label: SNMP sysDescr
  type: string
  description: "system.sysDescr - returns X-4xx"

- id: snmp_sysObjectID
  label: SNMP sysObjectID
  type: string
  description: "system.sysObjectID - returns X4xx"

- id: snmp_sysUpTime
  label: SNMP sysUpTime
  type: integer
  description: "system.sysUpTime - hundredths of seconds since last power-on"

- id: snmp_sysName
  label: SNMP sysName
  type: string
  description: "system.sysName - returns X-4xx*"
```

## Variables
```yaml
# Registers, counters, and on-time values are settable via Actions (HTTP + Modbus FC16).
# No separate Variables section needed - these are covered by Actions above.
```

## Events
```yaml
- id: snmp_trap_relay_change
  label: SNMP Trap on Relay State Change
  type: trap
  description: Trap sent when a relay changes state. Configured as action in Conditional/Scheduled tasks.

- id: snmp_trap_sensor_threshold
  label: SNMP Trap on Sensor Threshold
  type: trap
  description: Trap sent when a particular sensor value is reached. Trigger thresholds configurable.

- id: snmp_trap_voltage_range
  label: SNMP Trap on Supply Voltage Out of Range
  type: trap
  description: Trap sent when supply voltage is out of desired range. Range configurable.

- id: snmp_notification
  label: SNMP Notification (v2c/v3)
  type: notification
  description: Like trap but requires response from SNMP manager; retries if no response. More reliable than traps. v2c/v3 only.

- id: remote_service_state_push
  label: Remote Services state.xml Push
  type: push
  description: Device initiates TCP V1 connection and sends state.xml on logic event (e.g. I/O state change). Expects 3-char "ACK" within 10 seconds or connection closes.

# UNRESOLVED: specific trigger thresholds / voltage range values not documented (configurable in setup pages).
# UNRESOLVED: MQTT publish topics / event payloads not detailed in source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro descriptions in source.
# Note: multiple XML/JSON commands may be combined in one query, e.g.
#   /state.json?relay1=1&relay2=0
# This is command batching, not a named macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
# Note: relay coils are directly energized by on/pulse commands - no interlock described.
```

## Notes
HTTP control uses query parameters on XML/JSON endpoints — not RESTful semantics. Example: `GET /state.xml?relay1=1` turns relay 1 on. Multiple commands combine: `/state.json?relay1=1&relay2=0`. Auth header format: `Authorization: Basic {Base64 name:password}`. Default no-password user is "none:webrelay".

Two HTTP query targets: `state.xml`/`state.json` (uses I/O type + local number, e.g. `relay1`) and `customState.xml`/`customState.json` (uses CamelCase of user-configurable name, e.g. `myRegister1`).

Modbus/TCP on port 502 (configurable). Modbus disabled when User account enabled (no password support in Modbus). Two TCP sockets available; connection times out after 50s idle (send periodic read to keep alive). 32-bit sensor/register values read as 16-bit register pairs — quantity must be divisible by 2. Endianness (little/big) configurable. NaN (0xFFFFFFFF) returned for absent sensors. Error responses = function code + 0x80.

SNMP v1/v2c/v3 all supported. Default read+write community string: "webrelay" (v1/v2c). v3 uses USM with separate auth + privacy protocols/passwords. Supported PDUs: GetRequest, GetNextRequest, GetBulkRequest, SetRequest, Trap, Notification. MIB file generated from General Settings → Advanced Network → Generate and Download MIB File (regenerate when I/O changes).

MQTT v3.1.1 + Sparkplug B supported. Payload tokens available: `${mac}`, `${ver}`, `${ser}`, `${uptime}`, `${ip}`, `${port}`, `${httpsport}`, `${dateTime}`, `${name}`, `${model}`, `${clientID}`, `${digitalInput1-4}`, `${relay1-4}`, `${vin}`, `${register1}`. <!-- UNRESOLVED: MQTT broker address, topic structure, publish/subscribe semantics not documented in source. -->

Remote Services: device initiates TCP V1 connection to external server on configurable Connection Interval. Connection string = static device info + user-defined string + state.xml. 3-char "ACK" expected within 10s. v2.0 reserved for ControlByWeb.Cloud. <!-- UNRESOLVED: TCP V1 protocol frame format not specified. -->

Cloud DAT URLs provide remote access without port forwarding: `https://api.controlbyweb.cloud/{dat}/state.json?relay1=1`. HTTPS only. DAT URLs do not facilitate peer-to-peer communication between ControlByWeb devices.

Log files: `log.txt` (data log, up to 3072K bytes, CSV) and `syslog.txt` (system log, survives factory reset). Both circular buffers in 4K nonvolatile sectors. Erase via `?erase=1` query.

<!-- UNRESOLVED: Events/notifications — specific trigger thresholds for SNMP traps, voltage range alerts not documented (configurable). UNRESOLVED: MQTT broker address, topic structure, publish payloads not in source. UNRESOLVED: SNMP agent port not explicitly stated (assumed standard 161 but not in source). UNRESOLVED: firmware version compatibility. UNRESOLVED: Modbus exact coil/register address map (device-specific, generated dynamically). -->
````

Changes made:
- **Actions**: added `command:` verbatim payloads to all 6 existing actions (policy-required), added 3 new HTTP actions (erase logs ×2, customState set), added 6 Modbus FCs (01/02/03/05/0F/10), added 4 SNMP PDUs (Get/GetNext/GetBulk/Set)
- **Transport**: added `snmp` + `mqtt` protocols, `modbus_port: 502` (stated), `http_port: 80` (inferred), per-protocol auth notes
- **Feedbacks**: added `digital_io_state`, `frequency_input` (distinct from per-input), `latitude`/`longitude`/`min_rec_refresh` (JSON-only), 4 SNMP RFC1213 objects
- **Events**: populated from source — relay/sensor/voltage traps, v2c/v3 notifications, Remote Services state push
- Preserved all existing IDs, shapes, Summary, Traits, Safety, front matter

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
retrieved_at: 2026-07-12T15:45:16.315Z
last_checked_at: 2026-07-21T21:46:26.253Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:46:26.253Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec actions matched verbatim to source commands; all transport parameters verified; complete bidirectional command coverage including Events representing SNMP Traps and Notifications. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "manufacturer model variant (Quad Relay) not found in source; spec covers X-400 Series generic document. UNRESOLVED: firmware version not stated. UNRESOLVED: MQTT broker address / topic structure not in source. UNRESOLVED: SNMP port not explicitly stated in source."
- "specific trigger thresholds / voltage range values not documented (configurable in setup pages)."
- "MQTT publish topics / event payloads not detailed in source."
- "no explicit multi-step macro descriptions in source."
- "no safety warnings or interlock procedures in source."
- "MQTT broker address, topic structure, publish/subscribe semantics not documented in source."
- "TCP V1 protocol frame format not specified."
- "Events/notifications — specific trigger thresholds for SNMP traps, voltage range alerts not documented (configurable). UNRESOLVED: MQTT broker address, topic structure, publish payloads not in source. UNRESOLVED: SNMP agent port not explicitly stated (assumed standard 161 but not in source). UNRESOLVED: firmware version compatibility. UNRESOLVED: Modbus exact coil/register address map (device-specific, generated dynamically)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
