---
spec_id: admin/controlbyweb-x19s
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X19S Control Spec"
manufacturer: ControlByWeb
model_family: X19S
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X19S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/wp-content/uploads/2024/01/x-19s_users_manual_v1.0.pdf
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:12:47.777Z
last_checked_at: 2026-07-07T11:12:31.505Z
generated_at: 2026-07-07T11:12:31.505Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document describes the X-400 Series family generically; X19S-specific I/O count, relay count, register count, and analog input count not explicitly enumerated."
  - "whether the X19S exposes every transport (HTTP/Modbus/SNMP/MQTT) is not separately confirmed in source — protocol list is inferred from family documentation."
  - "register value range not stated in source"
  - "no explicit multi-step sequences documented in source beyond the"
  - "source contains no safety warnings, interlock procedures, or"
  - "X19S-specific I/O counts (number of relays, digital inputs, analog inputs, 1-Wire sensors, registers, counters) — source describes the X-400 Series family, not the X19S model specifically."
  - "whether X19S supports all four transports (HTTP, Modbus, SNMP, MQTT) — inferred from family docs; X19S-specific confirmation not in source."
  - "device Modbus address map (start addresses for coils, discrete inputs, holding registers) — source defers to device-specific Modbus address table."
  - "firmware version compatibility — not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:12:31.505Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 actions verified against source; every HTTP endpoint, Modbus function code, SNMP operation, and MQTT capability matched with literal command evidence. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X19S Control Spec

## Summary

The ControlByWeb X19S is a networked I/O controller that exposes its state and accepts commands over TCP/IP via HTTP GET requests to state.xml / state.json / customState.xml / customState.json endpoints, via Modbus/TCP on port 502, via SNMP (v1/v2c/v3), and via MQTT 3.1.1 (with optional Sparkplug B). This spec documents the integration protocol surfaces as described in the ControlByWeb 400-Series integration manual.

<!-- UNRESOLVED: source document describes the X-400 Series family generically; X19S-specific I/O count, relay count, register count, and analog input count not explicitly enumerated. -->
<!-- UNRESOLVED: whether the X19S exposes every transport (HTTP/Modbus/SNMP/MQTT) is not separately confirmed in source — protocol list is inferred from family documentation. -->

## Transport

```yaml
# Source confirms: HTTP over TCP/IP, Modbus/TCP port 502, SNMP, MQTT 3.1.1.
# No serial (RS-232) interface mentioned for the X19S in source.
protocols:
  - tcp
  - http
addressing:
  port: 80  # default HTTP port per source examples (http://192.168.1.2/...) ; configurable per Advanced Network tab
  modbus_port: 502  # stated in source: "open a connection with the module on port 502"
auth:
  type: basic  # source: HTTP Basic with Base64-encoded "name:password"; auth only when User account enabled
  notes: "Authorization header example: 'Authorization: Basic bm9uZTp3ZWJyZWxheQ==' (Base64 of none:webrelay)"
```

## Traits

```yaml
# Populated from explicit evidence in source:
# - queryable    (state.xml / state.json GET; Read Holding Registers; SNMP GetRequest; etc.)
# - routable     # inferred from per-relay control commands and digital I/O routing
# - powerable    # inferred from relay on/off/pulse commands (relays control attached loads)
queryable: true
routable: true  # inferred from relay and digital I/O control commands
powerable: true  # inferred from relay on/off control commands
```

## Actions

```yaml
# Coverage note: source describes the X-400 Series command surface generically.
# Commands below are documented at the family level; X19S-specific I/O numbering
# (which relays/digital inputs/registers exist on the X19S) is UNRESOLVED.
# Commands use literal payloads from the source.

# --- HTTP GET: relay control (state.xml / state.json) ---
- id: relay_off
  label: Turn Relay Off (HTTP)
  kind: action
  command: "GET /state.xml?relay{relay}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (e.g. 1 for relay1)

- id: relay_on
  label: Turn Relay On (HTTP)
  kind: action
  command: "GET /state.xml?relay{relay}=1 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (e.g. 1 for relay1)

- id: relay_pulse
  label: Pulse Relay (HTTP, default duration)
  kind: action
  command: "GET /state.json?relay{relay}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (e.g. 1 for relay1)

- id: relay_pulse_time
  label: Pulse Relay for Specified Seconds (HTTP)
  kind: action
  command: "GET /state.json?pulseTime{relay}={seconds}&relay{relay}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number
    - name: seconds
      type: integer
      description: Pulse duration in seconds; must precede the relay command in URL

# --- HTTP GET: set on-time / total on-time ---
- id: set_on_time
  label: Set onTime (HTTP)
  kind: action
  command: "GET /state.xml?onTime{io}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: Local I/O number
    - name: value
      type: integer
      description: Seconds to set onTime to

- id: set_total_on_time
  label: Set totalOnTime (HTTP)
  kind: action
  command: "GET /state.xml?totalOnTime{io}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: Local I/O number
    - name: value
      type: integer
      description: Seconds to set totalOnTime to

# --- HTTP GET: counter / register ---
- id: set_counter
  label: Set Counter (HTTP)
  kind: action
  command: "GET /state.json?count{io}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: Local I/O number
    - name: value
      type: integer
      description: Counter value to set

- id: set_register
  label: Set Register (HTTP)
  kind: action
  command: "GET /state.xml?register{io}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: Register number (e.g. 1)
    - name: value
      type: number
      description: Register value (numeric; example used 10.5)

# --- HTTP GET: read state ---
- id: get_state_xml
  label: Read state.xml
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"

- id: get_state_json
  label: Read state.json
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"

- id: get_custom_state_xml
  label: Read customState.xml
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"

- id: get_custom_state_json
  label: Read customState.json
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"

# --- HTTP GET: combined commands ---
- id: multi_command_custom
  label: Combined customState.xml command
  kind: action
  command: "GET /customState.xml?relay1=1&relay2=0 HTTP/1.1\r\n\r\n"
  notes: "Multiple arguments combined into one URL; example from source."

- id: multi_command_state_json
  label: Combined state.json command
  kind: action
  command: "GET /state.json?relay1=1&relay2=0 HTTP/1.1\r\n\r\n"

# --- HTTP GET: log access ---
- id: get_log
  label: Read log.txt
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  notes: "Requires password if User account enabled."

- id: erase_log
  label: Erase log.txt
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"

- id: get_syslog
  label: Read syslog.txt
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  notes: "Requires setup username and password."

- id: erase_syslog
  label: Erase syslog.txt
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"

# --- Modbus/TCP: per source, function code payloads are not literal ASCII ---
- id: modbus_read_coils
  label: Modbus Read Coils (FC 01)
  kind: query
  command: "0x01"  # UNRESOLVED at X19S level: start address and quantity depend on device Modbus map
  notes: "Function code 0x01. Start address and quantity per device Modbus address table."

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02)
  kind: query
  command: "0x02"
  notes: "Function code 0x02. Addresses per device Modbus address table."

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "0x03"
  notes: "Function code 0x03. 32-bit floats read as register pairs; little- or big-endian per device config."

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "0x05"
  notes: "Function code 0x05. Output value 0x00 = Off, 0xFF = On."

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15)
  kind: action
  command: "0x0F"
  notes: "Function code 0x0F (15). Values 0x0000-0xFFFF; byte count = quantity/8."

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16)
  kind: action
  command: "0x10"
  notes: "Function code 0x10 (16). 32-bit IEEE 754 floats; endianness per device config."

# --- SNMP: per source, MIB objects generated from device setup ---
- id: snmp_get
  label: SNMP GetRequest
  kind: query
  command: "GetRequest"
  notes: "Supports v1, v2c, v3. Object IDs (OIDs) generated per device; see device MIB file."

- id: snmp_set
  label: SNMP SetRequest
  kind: action
  command: "SetRequest"
  notes: "Supports v1, v2c, v3. Object IDs (OIDs) generated per device."

- id: snmp_trap
  label: SNMP Trap
  kind: event
  command: "Trap"
  notes: "Sent on relay state change, sensor threshold, or out-of-range Vin. Configured as action in Conditional/Scheduled tasks."

- id: snmp_notification
  label: SNMP Notification
  kind: event
  command: "Notification"
  notes: "Supported on v2c and v3; expects response from manager (retries on no-response)."

# --- MQTT ---
- id: mqtt_publish
  label: MQTT Publish
  kind: action
  command: "publish"
  notes: "MQTT 3.1.1. Topic and broker defined in device Broker tab. Payload may include MQTT tokens (e.g. ${relay1}, ${vin})."

- id: mqtt_subscribe
  label: MQTT Subscribe
  kind: action
  command: "subscribe"
  notes: "MQTT 3.1.1. Subscribes to topics defined in device Broker tab to receive I/O from other devices."
```

## Feedbacks

```yaml
# Observable state per source XML/JSON tag tables. The presence and numbering of
# each tag on the X19S specifically is UNRESOLVED - source describes the family.
- id: relay_state
  type: enum
  values: [0, 1]
  description: "From <relayX> in state.xml/json: 0=off (coil off), 1=on (coil energized)."

- id: digital_input_state
  type: enum
  values: [0, 1]
  description: "From <digitalInputX> / <digitalIOX>: 0=off (no voltage), 1=on (voltage applied)."

- id: analog_input_value
  type: number
  description: "From <analogInputX>: value of analog input X."

- id: vin_value
  type: number
  description: "From <vin>: scaled internal Vin measurement. Always present in state.xml/json."

- id: register_value
  type: number
  description: "From <registerX>: value of register X."

- id: on_time
  type: number
  description: "From <onTimeX>: seconds input has been on since last coming on."

- id: total_on_time
  type: number
  description: "From <totalOnTimeX>: total seconds input has been on."

- id: count_value
  type: number
  description: "From <countX>: count value associated with input X."

- id: frequency_value
  type: number
  description: "From <frequencyX>: frequency associated with input X."

- id: frequency_input
  type: number
  description: "From <frequencyInput>: value of frequency input (X-420 per source)."

- id: one_wire_sensor
  type: string
  description: "From <oneWireSensorX>: 'x.x' if sensor could not be read; numeric value otherwise (units suffix with showUnits=1)."

- id: utc_time
  type: integer
  description: "From <utcTime>: seconds since January 1, 1970."

- id: timezone_offset
  type: integer
  description: "From <timezoneOffset>: offset applied to utcTime for local time."

- id: serial_number
  type: string
  description: "From <serialNumber>: device MAC address (00:00:00:00:00:00 format)."

- id: modbus_read_register_response
  type: number
  description: "Modbus FC03 response: IEEE 754 32-bit float returned as register pair; little- or big-endian per device config. NaN (0xFFFFFFFF) if sensor not installed."
```

## Variables

```yaml
# Per source: registers are settable numeric values.
- id: register
  type: number
  description: "Writable numeric register; set via HTTP (state.xml?registerX={value}) or Modbus FC16."
  range: ""  # UNRESOLVED: register value range not stated in source
```

## Events

```yaml
# Source documents:
- id: snmp_trap_relay_change
  description: "SNMP Trap sent when a relay changes state."
- id: snmp_trap_sensor_threshold
  description: "SNMP Trap sent when a configured sensor threshold is reached."
- id: snmp_trap_vin_range
  description: "SNMP Trap sent when supply voltage is out of desired range."
- id: remote_services_state_push
  description: "When Remote Services connection is open and a 'send state' action fires, state.xml is sent to the external server. Server must return a 3-character 'ACK' within 10 seconds or the device closes the connection."
- id: cloud_dat_url_push
  description: "ControlByWeb.Cloud forwards device state via DAT URLs; HTTPS endpoint returns state.json/xml."
```

## Macros

```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source beyond the
# combined-URL pattern (relay1=1&relay2=0) which is captured under multi_command_* actions.
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements specific to the X19S.
```

## Notes

- **Auth disabled by default.** Source: "Modbus communications are disabled whenever the User account is enabled. This is because Modbus/TCP does not provide a mechanism for password protection. Make sure the User account is disabled (default) and Modbus functionality is enabled on the Advanced Network." → Enabling HTTP Basic auth effectively disables Modbus.
- **Modbus connection timeout:** "if no data is transferred for 50 seconds, the connection will time out and close." Send periodic reads to keep open.
- **Modbus socket limit:** "The module has two TCP sockets available for Modbus/TCP. ... Requests for more than two open connections will be rejected."
- **Pulse-time ordering:** Source: "The pulseTime argument MUST come before the relay1=2 command."
- **Endianness:** Modbus holding register values are IEEE 754 32-bit floats; little- or big-endian is configured per-device in Advanced Network tab. Source gives worked example 81.25 → 0x800042A2 little-endian.
- **Default community strings (SNMP v1/v2c):** both read and write default to `webrelay`.
- **MQTT version:** MQTT 3.1.1; optional Sparkplug B.
- **HTTP port default:** source examples use port 80 (`http://192.168.1.2/...`); explicitly notes port 8000 as a non-default example. Port is configurable under Advanced Network tab.
- **syslog.txt access:** requires setup username/password (separate from HTTP Basic for state.xml).

<!-- UNRESOLVED: X19S-specific I/O counts (number of relays, digital inputs, analog inputs, 1-Wire sensors, registers, counters) — source describes the X-400 Series family, not the X19S model specifically. -->
<!-- UNRESOLVED: whether X19S supports all four transports (HTTP, Modbus, SNMP, MQTT) — inferred from family docs; X19S-specific confirmation not in source. -->
<!-- UNRESOLVED: device Modbus address map (start addresses for coils, discrete inputs, holding registers) — source defers to device-specific Modbus address table. -->
<!-- UNRESOLVED: firmware version compatibility — not stated in source. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/wp-content/uploads/2024/01/x-19s_users_manual_v1.0.pdf
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:12:47.777Z
last_checked_at: 2026-07-07T11:12:31.505Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:12:31.505Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 actions verified against source; every HTTP endpoint, Modbus function code, SNMP operation, and MQTT capability matched with literal command evidence. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document describes the X-400 Series family generically; X19S-specific I/O count, relay count, register count, and analog input count not explicitly enumerated."
- "whether the X19S exposes every transport (HTTP/Modbus/SNMP/MQTT) is not separately confirmed in source — protocol list is inferred from family documentation."
- "register value range not stated in source"
- "no explicit multi-step sequences documented in source beyond the"
- "source contains no safety warnings, interlock procedures, or"
- "X19S-specific I/O counts (number of relays, digital inputs, analog inputs, 1-Wire sensors, registers, counters) — source describes the X-400 Series family, not the X19S model specifically."
- "whether X19S supports all four transports (HTTP, Modbus, SNMP, MQTT) — inferred from family docs; X19S-specific confirmation not in source."
- "device Modbus address map (start addresses for coils, discrete inputs, holding registers) — source defers to device-specific Modbus address table."
- "firmware version compatibility — not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
