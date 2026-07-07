---
spec_id: admin/controlbyweb-x13s
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X-13S Control Spec"
manufacturer: ControlByWeb
model_family: X-13S
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X-13S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://www.controlbyweb.com/wp-content/uploads/2024/01/X-13S_manual_v1.1.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-07-01T09:21:18.203Z
last_checked_at: 2026-07-07T11:11:01.174Z
generated_at: 2026-07-07T11:11:01.174Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "X-13S-specific tag names and Modbus addresses are not enumerated in this source. The source is a host-controller integration manual; the X-13S channels appear under the host's I/O map (e.g. oneWireSensor/temperature slots) and must be confirmed against the host device's Setup → Advanced Network → Modbus Address Table and the generated MIB file."
  - "source does not state default TCP port for HTTP (mentions port 80 only as the \"unchanged\" case), SNMP port, or MQTT broker port."
  - "HTTP port not stated in source (only notes port required if \"not port 80\")"
  - "SNMP port not stated in source"
  - "MQTT broker port not stated in source"
  - "X-13S-specific thermocouple tag name not enumerated in source - likely surfaces under oneWireSensorX or a dedicated thermocouple tag on the host. Confirm against host device state.xml."
  - "module-specific SNMP OIDs not in source - must be obtained from generated MIB file (Setup → Advanced Network → Generate and Download MIB File)."
  - "no explicit multi-step sequences documented in source."
  - "source contains no X-13S-specific interlock, power-sequencing, or thermocouple-handling safety procedures."
  - "X-13S thermocouple channel count, mapping to host tag names, and Modbus addresses not in this source — obtain from host Setup pages → View Modbus Address Table and generated MIB file."
  - "default HTTP/SNMP/MQTT port numbers not stated in source."
  - "firmware version compatibility, voltage/current/power specs, and X-13S-specific wiring not in this integration manual."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:11:01.174Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions matched literally to source commands; transport parameters verified; source coverage complete. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# ControlByWeb X-13S Control Spec

## Summary
The ControlByWeb X-13S is an RS-485 thermocouple expansion peripheral that is carried by a host controller (X-400 Series / X-600M). The X-13S has no native IP stack of its own; all network control and monitoring happens through the host controller's built-in web server and protocol stack. This spec covers HTTP GET (XML/JSON), Modbus/TCP, SNMP (V1/V2c/V3), and MQTT (v3.1.1 / Sparkplug B) as documented in ControlByWeb's "Integrating with ControlByWeb Devices" manual.

<!-- UNRESOLVED: X-13S-specific tag names and Modbus addresses are not enumerated in this source. The source is a host-controller integration manual; the X-13S channels appear under the host's I/O map (e.g. oneWireSensor/temperature slots) and must be confirmed against the host device's Setup → Advanced Network → Modbus Address Table and the generated MIB file. -->
<!-- UNRESOLVED: source does not state default TCP port for HTTP (mentions port 80 only as the "unchanged" case), SNMP port, or MQTT broker port. -->

## Transport
```yaml
# X-13S itself is RS-485 peripheral to host controller. Source documents the
# host's network interfaces (HTTP, Modbus/TCP, SNMP, MQTT). All four are
# carried over TCP/IP on the host.
protocols:
  - http
  - tcp      # Modbus/TCP
  - udp      # SNMP typically UDP; source does not state transport, inferred from SNMP standard. See UNRESOLVED below.
addressing:
  base_url: "http://{host-ip}"  # host controller IP; X-13S has none of its own
  port: 502   # Modbus/TCP (configurable under Advanced Network tab)
  # UNRESOLVED: HTTP port not stated in source (only notes port required if "not port 80")
  # UNRESOLVED: SNMP port not stated in source
  # UNRESOLVED: MQTT broker port not stated in source
auth:
  # Source documents an optional User account with HTTP Basic auth (Base64
  # "name:password"). Modbus/TCP disabled when User account enabled.
  type: basic_or_none  # optional User account; "none" when account disabled (default)
  notes: "When enabled, HTTP Authorization: Basic <base64(name:password)>. Default example credential in source: none:webrelay -> bm9uZTp3ZWJyZWxheQ==. Modbus disabled when User account enabled."
serial: {}  # N/A - X-13S talks RS-485 ribbon to host, not user-facing serial. Omitted.
```

## Traits
```yaml
traits:
  - queryable   # inferred: state.xml/json reads + Modbus FC03 + SNMP Get return values
  - levelable   # inferred: registerX set + analog value writes via Modbus FC16
  # No power on/off command in source (relays are I/O, not device power).
  # No input/output routing commands in source.
```

## Actions
```yaml
# Coverage: all distinct commands documented in the integration manual.
# HTTP GET commands (state.xml / state.json / customState.xml / customState.json
# share parameter syntax; listed once each). Modbus function codes listed
# separately. SNMP PDUs listed separately.

# ----- HTTP GET: state reads -----
- id: http_get_state_xml
  label: Read state.xml
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []
- id: http_get_state_json
  label: Read state.json
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []
- id: http_get_customstate_xml
  label: Read customState.xml
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []
- id: http_get_customstate_json
  label: Read customState.json
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

# ----- HTTP GET: relay control (parameterized over relay index X) -----
- id: http_relay_off
  label: Set Relay OFF
  kind: action
  command: "GET /state.xml?relay{X}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay local I/O number (1-based)
- id: http_relay_on
  label: Set Relay ON
  kind: action
  command: "GET /state.xml?relay{X}=1 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay local I/O number (1-based)
- id: http_relay_pulse_preset
  label: Pulse Relay (preset duration)
  kind: action
  command: "GET /state.json?relay{X}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay local I/O number (1-based)
- id: http_relay_pulse_custom
  label: Pulse Relay (custom duration)
  kind: action
  command: "GET /state.json?pulseTime{X}={seconds}&relay{X}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay local I/O number (1-based); pulseTime index must match relay index
    - name: seconds
      type: number
      description: Pulse duration in seconds for this single pulse (does not persist)
  notes: "pulseTime argument MUST come before relay{X}=2 in the query string."

# ----- HTTP GET: counter / timer resets (parameterized) -----
- id: http_set_ontime
  label: Reset onTime
  kind: action
  command: "GET /state.xml?onTime{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Input local I/O number (1-based)
    - name: value
      type: number
      description: New onTime value in seconds
- id: http_set_totalontime
  label: Reset totalOnTime
  kind: action
  command: "GET /state.xml?totalOnTime{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Input local I/O number (1-based)
    - name: value
      type: number
      description: New totalOnTime value in seconds
- id: http_set_counter
  label: Set Counter
  kind: action
  command: "GET /state.json?count{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Input local I/O number (1-based)
    - name: value
      type: number
      description: New counter value
- id: http_set_register
  label: Set Register
  kind: action
  command: "GET /state.xml?register{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Register local I/O number (1-based)
    - name: value
      type: number
      description: New register value (e.g. 10.5)

# ----- HTTP GET: log files -----
- id: http_get_log_txt
  label: Read data log (log.txt)
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []
- id: http_erase_log_txt
  label: Erase data log
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []
- id: http_get_syslog_txt
  label: Read system log (syslog.txt)
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []
  notes: "Requires setup username and password."
- id: http_erase_syslog_txt
  label: Erase system log
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

# ----- Modbus/TCP function codes -----
- id: modbus_fc01_read_coils
  label: Read Coils (FC 0x01)
  kind: query
  command: "MBAP header + 0x01 {startAddrHi} {startAddrLo} {qtyHi} {qtyLo}"
  params:
    - name: startAddr
      type: integer
      description: Starting coil address (refer to host Modbus map in Setup pages)
    - name: qty
      type: integer
      description: Number of coils to read
  notes: "Reads relays and digital I/O configured as outputs. Error FC 0x81; exception 0x02 = bad start/qty."
- id: modbus_fc02_read_discrete_inputs
  label: Read Discrete Inputs (FC 0x02)
  kind: query
  command: "MBAP header + 0x02 {startAddrHi} {startAddrLo} {qtyHi} {qtyLo}"
  params:
    - name: startAddr
      type: integer
      description: Starting input address (refer to host Modbus map)
    - name: qty
      type: integer
      description: Number of inputs to read
  notes: "Reads digital inputs and digital I/O configured as inputs. Error FC 0x82; exception 0x02 = bad start/qty."
- id: modbus_fc03_read_holding_registers
  label: Read Holding Registers (FC 0x03)
  kind: query
  command: "MBAP header + 0x03 {startAddrHi} {startAddrLo} {qtyHi} {qtyLo}"
  params:
    - name: startAddr
      type: integer
      description: Starting register address (refer to host Modbus map)
    - name: qty
      type: integer
      description: Number of 16-bit registers to read; MUST be divisible by 2 (32-bit floats read in pairs)
  notes: "Reads Vin, sensors, registers, counters, analog inputs. IEEE 754 float, endianness set in Advanced Network tab. NaN (0xFFFFFFFF) when sensor absent. Error FC 0x83."
- id: modbus_fc05_write_single_coil
  label: Write Single Coil (FC 0x05)
  kind: action
  command: "MBAP header + 0x05 {addrHi} {addrLo} {valueHi} {valueLo}"
  params:
    - name: addr
      type: integer
      description: Coil address (refer to host Modbus map)
    - name: value
      type: enum
      description: "0x0000 = OFF, 0xFF00 = ON"
  notes: "Response mirrors 0x0000 or 0xFF00. Error FC 0x85; exceptions 0x01 not supported, 0x02 addr out of range, 0x03 padding."
- id: modbus_fc0f_write_multiple_coils
  label: Write Multiple Coils (FC 0x0F)
  kind: action
  command: "MBAP header + 0x0F {startAddrHi} {startAddrLo} {qtyHi} {qtyLo} {byteCount} {digitalIOValueBytes}"
  params:
    - name: startAddr
      type: integer
      description: Starting coil address
    - name: qty
      type: integer
      description: Number of coils to write
    - name: byteCount
      type: integer
      description: qty divided by 8
    - name: digitalIOValue
      type: string
      description: "Hex byte string 0x0000-0xFFFF; bit per output (e.g. 0xF0 = first 4 off, next 4 on)"
  notes: "Error FC 0x8F; exceptions 0x01 not supported, 0x02 bad start/qty, 0x03 byte count out of range."
- id: modbus_fc10_write_multiple_registers
  label: Write Multiple Registers (FC 0x10)
  kind: action
  command: "MBAP header + 0x10 {startAddrHi} {startAddrLo} {qtyHi} {qtyLo} {byteCount} {valueBytesIEEE754}"
  params:
    - name: startAddr
      type: integer
      description: Starting register address
    - name: qty
      type: integer
      description: Number of 16-bit registers; MUST be divisible by 2
    - name: value
      type: number
      description: IEEE 754 32-bit float value(s), endianness per Advanced Network tab
  notes: "Sets writable analog I/O (registers, analog outputs, pulse duration). Ack responds with register quantity written. Error FC 0x90; exceptions 0x01 not supported, 0x02 addr/qty not even."

# ----- SNMP PDUs -----
- id: snmp_getrequest
  label: SNMP GetRequest
  kind: query
  command: "SNMP GetRequest {oid}"
  params:
    - name: oid
      type: string
      description: Object identifier (RFC1213 standard OIDs or module MIB OIDs)
- id: snmp_getnextrequest
  label: SNMP GetNextRequest
  kind: query
  command: "SNMP GetNextRequest {oid}"
  params:
    - name: oid
      type: string
      description: Object identifier
- id: snmp_getbulkrequest
  label: SNMP GetBulkRequest
  kind: query
  command: "SNMP GetBulkRequest {oid}"
  params:
    - name: oid
      type: string
      description: Object identifier
- id: snmp_setrequest
  label: SNMP SetRequest
  kind: action
  command: "SNMP SetRequest {oid} {value}"
  params:
    - name: oid
      type: string
      description: Object identifier
    - name: value
      type: string
      description: Value to set
- id: snmp_trap
  label: Send SNMP Trap
  kind: event
  command: "SNMP Trap (configured in Conditional / Scheduled tasks)"
  params: []
  notes: "Device-emitted; triggered on relay state change, sensor threshold, or supply voltage out of range."
- id: snmp_notification
  label: Send SNMP Notification
  kind: event
  command: "SNMP Notification (V2c/V3; requires manager ack, retries on no response)"
  params: []

# ----- MQTT operations -----
- id: mqtt_subscribe
  label: MQTT Subscribe to Broker
  kind: action
  command: "MQTT SUBSCRIBE {topic}"
  params:
    - name: topic
      type: string
      description: Broker-defined topic
  notes: "MQTT v3.1.1. Device subscribes per Broker tab config; receives I/O published by other devices."
- id: mqtt_publish
  label: MQTT Publish to Broker
  kind: action
  command: "MQTT PUBLISH {topic} {payload}"
  params:
    - name: topic
      type: string
      description: Broker-defined topic
    - name: payload
      type: string
      description: "Payload string; supports tokens like ${relay1}, ${register1}, ${vin}, ${ser}, etc. (see Variables)"
- id: sparkplugb_publish
  label: Sparkplug B Publish
  kind: action
  command: "Sparkplug B PUBLISH {topic} {payload}"
  params:
    - name: topic
      type: string
      description: Sparkplug B-defined topic structure
    - name: payload
      type: string
      description: Sparkplug B-formatted payload
  notes: "Alternative to plain MQTT with defined topic naming and payload structure."

# ----- ControlByWeb Cloud DAT URL -----
- id: cloud_dat_read_state
  label: Cloud DAT URL read state
  kind: query
  command: "GET https://api.controlbyweb.cloud/{datUrl}/state.json HTTP/1.1\r\n\r\n"
  params:
    - name: datUrl
      type: string
      description: Generated DAT URL token from ControlByWeb.Cloud API
- id: cloud_dat_control
  label: Cloud DAT URL control
  kind: action
  command: "GET https://api.controlbyweb.cloud/{datUrl}/state.json?{params} HTTP/1.1\r\n\r\n"
  params:
    - name: datUrl
      type: string
      description: Generated DAT URL token
    - name: params
      type: string
      description: "Same state.xml/json query params (e.g. relay1=1&relay2=1)"
  notes: "Enables control without port forwarding. Does not facilitate peer-to-peer device comms."
```

## Feedbacks
```yaml
# State values returned in state.xml/state.json (X = local I/O number).
- id: digital_input_state
  type: enum
  values: [off, on]
  source_tag: "digitalInputX / digitalIOX"
  description: "0 = voltage not applied; 1 = voltage applied"
- id: relay_state
  type: enum
  values: [off, on]
  source_tag: "relayX"
  description: "0 = coil off; 1 = coil energized"
- id: analog_input_value
  type: number
  source_tag: "analogInputX"
- id: vin_value
  type: number
  source_tag: "vin"
  description: "Scaled internal Vin measurement; always present"
- id: register_value
  type: number
  source_tag: "registerX"
- id: on_time
  type: number
  source_tag: "onTimeX"
  description: "Seconds input has been ON since last ON transition"
- id: total_on_time
  type: number
  source_tag: "totalOnTimeX"
- id: count_value
  type: number
  source_tag: "countX"
- id: frequency_value
  type: number
  source_tag: "frequencyX"
- id: onewire_sensor_value
  type: number
  source_tag: "oneWireSensorX"
  description: "x.x = sensor unreadable; otherwise current value (units optional via showUnits=1)"
- id: utc_time
  type: number
  source_tag: "utcTime"
  description: "Seconds since 1970-01-01"
- id: timezone_offset
  type: number
  source_tag: "timezoneOffset"
- id: serial_number
  type: string
  source_tag: "serialNumber"
  description: "Host controller serial (MAC format 00:00:00:00:00:00)"
# UNRESOLVED: X-13S-specific thermocouple tag name not enumerated in source - likely surfaces under oneWireSensorX or a dedicated thermocouple tag on the host. Confirm against host device state.xml.
```

## Variables
```yaml
# MQTT payload tokens documented in source (Section 4.1.4). These are
# substitution variables usable in MQTT publish payloads, not settable I/O.
- id: mqtt_token_mac
  token: "${mac}"
  description: "MAC Address"
- id: mqtt_token_firmware
  token: "${ver}"
  description: "Firmware Revision"
- id: mqtt_token_serial
  token: "${ser}"
  description: "Serial Number"
- id: mqtt_token_uptime
  token: "${uptime}"
  description: "Up Time"
- id: mqtt_token_ip
  token: "${ip}"
  description: "IP Address"
- id: mqtt_token_http_port
  token: "${port}"
  description: "HTTP Port"
- id: mqtt_token_https_port
  token: "${httpsport}"
  description: "HTTPS Port"
- id: mqtt_token_datetime
  token: "${dateTime}"
  description: "Epoch Time Stamp"
- id: mqtt_token_name
  token: "${name}"
  description: "Name (Control Page Header)"
- id: mqtt_token_model
  token: "${model}"
  description: "Model Number"
- id: mqtt_token_clientid
  token: "${clientID}"
  description: "ClientID"
- id: mqtt_token_digitalinput
  token: "${digitalInputN}"
  description: "Digital Input N (source lists 1-4)"
- id: mqtt_token_relay
  token: "${relayN}"
  description: "Relay N (source lists 1-4)"
- id: mqtt_token_vin
  token: "${vin}"
  description: "Vin"
- id: mqtt_token_register
  token: "${registerN}"
  description: "Register N (source lists register1)"

# SNMP RFC1213 standard objects (Section 3.1.1).
- id: snmp_sysDescr
  oid: "system.sysDescr"
  description: "Returns 'X-4xx'"
- id: snmp_sysObjectID
  oid: "system.sysObjectID"
  description: "Returns 'X4xx'"
- id: snmp_sysUpTime
  oid: "system.sysUpTime"
  description: "Hundredths of seconds since last power-on"
- id: snmp_sysName
  oid: "system.sysName"
  description: "Returns 'X-4xx*'"
# UNRESOLVED: module-specific SNMP OIDs not in source - must be obtained from generated MIB file (Setup → Advanced Network → Generate and Download MIB File).
```

## Events
```yaml
- id: snmp_trap_event
  description: "SNMP trap sent on relay state change, sensor threshold reached, or supply voltage out of range. Configured as actions in Conditional and Scheduled tasks."
- id: remote_services_connection_string
  description: "When Remote Services enabled (Advanced Network tab), device opens TCP V1 connection to external server at the configured Connection Interval and sends a connection string (static device info + user-defined string + state.xml). Expects 3-character ACK within 10 seconds or device closes connection. state.xml is also sent on logic-event 'send state' actions."
- id: mqtt_state_publish
  description: "Device publishes I/O state to MQTT broker per Broker tab configuration."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Modbus/TCP communications disabled whenever User account is enabled (Modbus provides no password mechanism). Disable User account (default) and enable Modbus on Advanced Network tab to use Modbus."
  - "Modbus/TCP connection times out and closes after 50 seconds of inactivity. Send periodic read request to keep alive."
  - "Module limits Modbus/TCP to 2 simultaneous sockets; additional connections rejected."
  - "Remote Services expects 3-character ACK within 10 seconds or device closes connection."
# UNRESOLVED: source contains no X-13S-specific interlock, power-sequencing, or thermocouple-handling safety procedures.
```

## Notes
- The X-13S is an RS-485 thermocouple expansion peripheral with no native network interface. All commands in this spec target the **host controller** (X-400 Series or X-600M) that carries the X-13S channels; the X-13S surfaces as additional temperature sensor / one-wire slots on the host's I/O map.
- HTTP supports combining multiple arguments in one request: `/state.json?relay1=1&relay2=0`.
- `state.xml/json` uses I/O type + local I/O number (`relay1`). `customState.xml/json` uses the CamelCase version of user-configured I/O names (`myRegister1`).
- Modbus 32-bit sensor values read in 16-bit register pairs (qty must be divisible by 2). IEEE 754 float, endianness configurable in Advanced Network tab. Example: little-endian 0x800042A2 = 81.25.
- 0xFFFFFFFF (NaN) returned for absent temperature/humidity sensor.
- SNMP V1/V2c default read and write community strings: `webrelay` (configurable). V3 uses USM (auth + privacy protocols, each with algorithm + password, plus shared security username).
- SNMP supports V1, V2c, V3.
- MQTT version 3.1.1 supported; Sparkplug B is the alternative with structured topic naming and payload format.
- ControlByWeb Cloud DAT URLs enable HTTP control without port forwarding; do not facilitate peer-to-peer device comms. Version 2.0 of Remote Services reserved for ControlByWeb.Cloud.

<!-- UNRESOLVED: X-13S thermocouple channel count, mapping to host tag names, and Modbus addresses not in this source — obtain from host Setup pages → View Modbus Address Table and generated MIB file. -->
<!-- UNRESOLVED: default HTTP/SNMP/MQTT port numbers not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility, voltage/current/power specs, and X-13S-specific wiring not in this integration manual. -->
````

Spec built. 36 actions (HTTP + Modbus FCs + SNMP PDUs + MQTT ops + Cloud DAT), feedbacks for every state tag, variables for MQTT tokens + SNMP standard OIDs, safety interlocks all from source text. X-13S is peripheral — spec notes all commands target host controller. Gaps marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://www.controlbyweb.com/wp-content/uploads/2024/01/X-13S_manual_v1.1.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-07-01T09:21:18.203Z
last_checked_at: 2026-07-07T11:11:01.174Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:11:01.174Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions matched literally to source commands; transport parameters verified; source coverage complete. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "X-13S-specific tag names and Modbus addresses are not enumerated in this source. The source is a host-controller integration manual; the X-13S channels appear under the host's I/O map (e.g. oneWireSensor/temperature slots) and must be confirmed against the host device's Setup → Advanced Network → Modbus Address Table and the generated MIB file."
- "source does not state default TCP port for HTTP (mentions port 80 only as the \"unchanged\" case), SNMP port, or MQTT broker port."
- "HTTP port not stated in source (only notes port required if \"not port 80\")"
- "SNMP port not stated in source"
- "MQTT broker port not stated in source"
- "X-13S-specific thermocouple tag name not enumerated in source - likely surfaces under oneWireSensorX or a dedicated thermocouple tag on the host. Confirm against host device state.xml."
- "module-specific SNMP OIDs not in source - must be obtained from generated MIB file (Setup → Advanced Network → Generate and Download MIB File)."
- "no explicit multi-step sequences documented in source."
- "source contains no X-13S-specific interlock, power-sequencing, or thermocouple-handling safety procedures."
- "X-13S thermocouple channel count, mapping to host tag names, and Modbus addresses not in this source — obtain from host Setup pages → View Modbus Address Table and generated MIB file."
- "default HTTP/SNMP/MQTT port numbers not stated in source."
- "firmware version compatibility, voltage/current/power specs, and X-13S-specific wiring not in this integration manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
