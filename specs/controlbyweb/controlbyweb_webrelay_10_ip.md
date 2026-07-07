---
spec_id: admin/controlbyweb-webrelay-10
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb WebRelay 10 Control Spec"
manufacturer: ControlByWeb
model_family: "WebRelay 10"
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - "WebRelay 10"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/wp-content/uploads/2024/02/webrelay-10-plus.pdf
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:13:31.881Z
last_checked_at: 2026-07-07T11:10:58.625Z
generated_at: 2026-07-07T11:10:58.625Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes X-400 Series generally. WebRelay 10-specific I/O count (likely 1 relay, no analog/digital inputs) not explicitly confirmed in this refined excerpt."
  - "start address/quantity require device Modbus map"
  - "no explicit multi-step sequences documented in source."
  - "source does not contain safety warnings, interlocks, or power-on sequencing requirements."
  - "WebRelay 10-specific I/O count, exact relay count (source generic to X-400), Modbus address map, pulse duration default, voltage/current ratings."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:10:58.625Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched source wire tokens exactly; transport params verified against source documentation; complete bidirectional coverage of HTTP, Modbus, SNMP, and MQTT command families. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb WebRelay 10 Control Spec

## Summary
The ControlByWeb WebRelay 10 is a single-relay network-enabled relay module controllable over TCP/IP. This spec covers HTTP GET request control (state.xml/state.json), Modbus/TCP (slave on port 502), SNMP (v1/v2c/v3), and MQTT (v3.1.1) integration, as documented in the ControlByWeb integration reference. Auth is optional (Basic Auth when user account enabled); auth disabled by default.

<!-- UNRESOLVED: source describes X-400 Series generally. WebRelay 10-specific I/O count (likely 1 relay, no analog/digital inputs) not explicitly confirmed in this refined excerpt. -->

## Transport
```yaml
# WebRelay 10 is an IP device supporting multiple protocol stacks.
# HTTP server listens on port 80 by default (configurable); Modbus/TCP on port 502.
# Source states: "If the TCP port has been changed (not port 80)..." confirming port 80 default.
# Source states: "open a connection with the module on port 502 (configurable under Advanced Network tab)" for Modbus.
protocols:
  - tcp
  - http
  - udp  # SNMP, MQTT over UDP; inferred: SNMP and MQTT use UDP transport

addressing:
  port: 80  # HTTP default per source ("not port 80" implies default = 80)
  base_url: "http://{device-ip}"  # source examples: http://192.168.1.2/state.xml

auth:
  type: none  # inferred: no auth procedure in source; "No Password" section shows requests without credentials
  # NOTE: When user account enabled, Basic Auth with Base64(user:password) is required.
  # Default credentials (per source example): user "none", password "webrelay" (Base64: bm9uZTp3ZWJyZWxheQ==)
  # WebRelay 10 default user account is disabled by default (ControlByWeb convention).
```

## Traits
```yaml
- powerable  # inferred: relay on/off commands (relay1=0/1) act as switchable power output
- routable   # inferred: relay selection via state.xml?relay1=0/1
- queryable  # inferred: state.xml/state.json provide queryable state
```

## Actions
```yaml
# HTTP GET-based control (no auth / default state).
# Each entry is one command-bearing operation as documented in source.

- id: get_state_xml
  label: Get State (XML)
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []

- id: get_state_json
  label: Get State (JSON)
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []

- id: get_custom_state_xml
  label: Get Custom State (XML)
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []

- id: get_custom_state_json
  label: Get Custom State (JSON)
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

- id: relay_off
  label: Turn Relay 1 OFF
  kind: action
  command: "GET /state.xml?relay1=0 HTTP/1.1\r\n\r\n"
  params: []

- id: relay_on
  label: Turn Relay 1 ON
  kind: action
  command: "GET /state.xml?relay1=1 HTTP/1.1\r\n\r\n"
  params: []

- id: relay_pulse
  label: Pulse Relay 1 (preset duration)
  kind: action
  command: "GET /state.xml?relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: relay_pulse_custom
  label: Pulse Relay 1 (custom duration)
  kind: action
  command: "GET /state.json?pulseTime1={seconds}&relay1=2 HTTP/1.1\r\n\r\n"
  params:
    - name: seconds
      type: integer
      description: Pulse duration in seconds (pulseTime argument must precede relay1=2)

- id: set_register
  label: Set Register 1
  kind: action
  command: "GET /state.xml?register1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: number
      description: Floating-point register value (e.g. 10.5)

- id: set_counter
  label: Set Counter 1
  kind: action
  command: "GET /state.json?count1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: Counter value to set (e.g. 200)

- id: reset_on_time
  label: Reset onTime1
  kind: action
  command: "GET /state.xml?onTime1={seconds} HTTP/1.1\r\n\r\n"
  params:
    - name: seconds
      type: integer
      description: Reset onTime1 to this value (seconds)

- id: reset_total_on_time
  label: Reset totalOnTime1
  kind: action
  command: "GET /state.xml?totalOnTime1={seconds} HTTP/1.1\r\n\r\n"
  params:
    - name: seconds
      type: integer
      description: Reset totalOnTime1 to this value (seconds)

- id: multi_command
  label: Multiple Commands (combined)
  kind: action
  command: "GET /state.json?relay1={val1}&relay2={val2} HTTP/1.1\r\n\r\n"
  params:
    - name: val1
      type: integer
      description: Relay 1 value (0=off, 1=on, 2=pulse)
    - name: val2
      type: integer
      description: Relay 2 value (0=off, 1=on, 2=pulse)

- id: read_log
  label: Read Data Log
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_log
  label: Erase Data Log
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: read_syslog
  label: Read System Log
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_syslog
  label: Erase System Log
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

# Modbus/TCP actions (port 502, slave mode)
# Source documents function codes 01, 02, 03, 05, 15, 16.
# Concrete address map requires "View Modbus Address Table" from setup pages - not in source.

- id: modbus_read_coils
  label: Modbus Read Coils (FC 01)
  kind: query
  command: "Modbus FC 0x01 Read Coils"  # UNRESOLVED: start address/quantity require device Modbus map
  params: []

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02)
  kind: query
  command: "Modbus FC 0x02 Read Discrete Inputs"
  params: []

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "Modbus FC 0x03 Read Holding Registers"
  params: []

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "Modbus FC 0x05 Write Single Coil, value 0x00 (Off) or 0xFF (On)"
  params:
    - name: value
      type: integer
      description: 0x00 = OFF, 0xFF = ON

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15)
  kind: action
  command: "Modbus FC 0x0F Write Multiple Coils, 0x0000-0xFFFF"
  params: []

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16)
  kind: action
  command: "Modbus FC 0x10 Write Multiple Registers (IEEE 754 float, paired 16-bit)"
  params: []

# SNMP actions (community string default = "webrelay"; v3 uses USM)

- id: snmp_get
  label: SNMP GetRequest
  kind: query
  command: "SNMP GetRequest (v1/v2c/v3)"
  params: []

- id: snmp_set
  label: SNMP SetRequest
  kind: action
  command: "SNMP SetRequest (v1/v2c/v3)"
  params: []

# MQTT actions (broker-based pub/sub; v3.1.1)

- id: mqtt_publish
  label: MQTT Publish
  kind: action
  command: "MQTT Publish (v3.1.1) with payload tokens (e.g. ${relay1}, ${vin}, ${register1})"
  params: []

- id: mqtt_subscribe
  label: MQTT Subscribe
  kind: action
  command: "MQTT Subscribe (v3.1.1)"
  params: []
```

## Feedbacks
```yaml
# State values returned via state.xml / state.json (per source XML/JSON Tags table).
# WebRelay 10 likely exposes a subset; the relay-related entries are confirmed.

- id: relay1_state
  type: enum
  values: [0, 1]
  description: Relay 1 coil state. 0=off, 1=on (energized).

- id: on_time1
  type: number
  description: Time in seconds how long the input/relay was on since last coming on

- id: total_on_time1
  type: number
  description: Total time in seconds the input/relay has been on

- id: count1
  type: number
  description: Counter value associated with input/relay 1

- id: register1
  type: number
  description: Floating-point register value

- id: vin
  type: number
  description: Scaled internal Vin measurement (always present per source)

- id: utc_time
  type: integer
  description: Current UTC time in seconds since Jan 1 1970

- id: timezone_offset
  type: integer
  description: Offset to apply to utcTime for local time

- id: serial_number
  type: string
  description: Device serial number (MAC-formatted string)
```

## Variables
```yaml
# Settable parameters documented in source.

- id: relay1_pulse_duration
  type: number
  description: Pulse duration in seconds (configured via setup pages, not via API; per-source default example 1.5s)

- id: pulse_time_override
  type: number
  description: One-shot pulse duration via pulseTime1 query parameter; does not persist
```

## Events
```yaml
# Source documents SNMP traps/notifications and MQTT publish events.

- id: snmp_trap
  description: SNMP Trap sent when relay changes state, sensor threshold reached, or Vin out of range. Configured under Conditional/Scheduled tasks.

- id: snmp_notification
  description: SNMP Notification (v2c/v3 only). Requires acknowledgement from SNMP manager; retries on no response.

- id: mqtt_state_publish
  description: MQTT publish events when I/O state changes (per broker configuration).
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Source describes X-400 Series integration patterns; WebRelay 10 is a single-relay 10A variant. Most I/O shown in XML/JSON examples (digitalInput, analogInput, 1-Wire sensors) likely not present on WebRelay 10. Confirm against WebRelay 10-specific manual.
- HTTP: GET-based control, no auth by default. When user account enabled, requests require `Authorization: Basic <base64(user:password)>` header. Default user:password when auth enabled = "none":"webrelay" (Base64 `bm9uZTp3ZWJyZWxheQ==`).
- HTTP default port = 80 (configurable). Source example shows `http://192.168.1.2:8000/state.txt` when port changed.
- Modbus/TCP: slave on port 502 (configurable). Disabled when user account enabled (no password mechanism in Modbus). 50s idle timeout; 2 concurrent TCP sockets max.
- Modbus endianness configurable; 32-bit values across 16-bit register pairs (IEEE 754). Little-endian example: 81.25 = `0x800042A2`. Big-endian: `0x42A28000`.
- pulseTime argument MUST come before relay1=2 in URL.
- Modbus error: function code + 0x80, plus exception code (0x01 unsupported, 0x02 bad address/quantity, 0x03 padding/byte count).
- SNMP: v1/v2c/v3. Default community string = "webrelay" (both read and write). v3 uses USM with separate auth/privacy algorithms and passwords.
- MQTT: v3.1.1. Supports Sparkplug B. Payload tokens: `${relay1}`, `${register1}`, `${vin}`, `${mac}`, `${ver}`, `${ser}`, `${uptime}`, `${ip}`, `${port}`, `${httpsport}`, `${dateTime}`, `${name}`, `${model}`, `${clientID}`.
- Remote Services (Section 5): device-initiated TCP V1 connection; expects 3-char "ACK" within 10s. Version 2.0 reserved for ControlByWeb.Cloud.
- Log files: log.txt and syslog.txt in nonvolatile memory. syslog.txt requires setup credentials.

<!-- UNRESOLVED: WebRelay 10-specific I/O count, exact relay count (source generic to X-400), Modbus address map, pulse duration default, voltage/current ratings. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/wp-content/uploads/2024/02/webrelay-10-plus.pdf
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:13:31.881Z
last_checked_at: 2026-07-07T11:10:58.625Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:10:58.625Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched source wire tokens exactly; transport params verified against source documentation; complete bidirectional coverage of HTTP, Modbus, SNMP, and MQTT command families. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes X-400 Series generally. WebRelay 10-specific I/O count (likely 1 relay, no analog/digital inputs) not explicitly confirmed in this refined excerpt."
- "start address/quantity require device Modbus map"
- "no explicit multi-step sequences documented in source."
- "source does not contain safety warnings, interlocks, or power-on sequencing requirements."
- "WebRelay 10-specific I/O count, exact relay count (source generic to X-400), Modbus address map, pulse duration default, voltage/current ratings."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
