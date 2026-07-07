---
spec_id: admin/controlbyweb-x20s
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X20S Control Spec"
manufacturer: ControlByWeb
model_family: X20S
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X20S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/wp-content/uploads/2024/01/x-20s_users_manual_v1.1.pdf
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:17:17.294Z
last_checked_at: 2026-07-07T11:12:32.289Z
generated_at: 2026-07-07T11:12:32.289Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "doc covers X-400 series generally; X20S-specific relay/digital-IO counts and exact Modbus address map not stated"
  - "source describes `registerX` as writable float; no parameter range stated"
  - "device can publish via MQTT or send SNMP traps/notifications; specific event payloads not enumerated in source excerpt"
  - "no multi-step sequences described in source excerpt"
  - "source does not document safety warnings or interlock procedures"
  - "X20S-specific I/O counts, exact Modbus address map, firmware version compatibility — not stated in refined source"
verification:
  verdict: verified
  checked_at: 2026-07-07T11:12:32.289Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 HTTP GET actions match verbatim in source; transport (TCP port 80 + Basic auth) confirmed; spec scope (HTTP only) fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X20S Control Spec

## Summary

X20S is a ControlByWeb Ethernet I/O module exposing relays, digital inputs, analog inputs, counters, and registers. Spec covers HTTP GET control/monitoring of `state.xml`/`state.json` endpoints. Source doc is generic X-400 series; X20S-specific I/O counts not enumerated.

<!-- UNRESOLVED: doc covers X-400 series generally; X20S-specific relay/digital-IO counts and exact Modbus address map not stated -->

## Transport

```yaml
protocols:
  - tcp
addressing:
  port: 80  # default per source; port configurable under Advanced Network tab
auth:
  type: basic  # Base64-encoded username:password required when User account enabled; "no password" mode also documented
```

## Traits

```yaml
- queryable  # inferred: GET state.xml/json queries device state
- routable  # inferred: relay on/off commands present
```

## Actions

```yaml
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

- id: get_log_txt
  label: Get Data Log (log.txt)
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_log_txt
  label: Erase Data Log (log.txt)
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: get_syslog_txt
  label: Get System Log (syslog.txt)
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_syslog_txt
  label: Erase System Log (syslog.txt)
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: relay_off
  label: Turn Relay Off
  kind: action
  command: "GET /state.xml?relay{X}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number (1-based)

- id: relay_on
  label: Turn Relay On
  kind: action
  command: "GET /state.xml?relay{X}=1 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number (1-based)

- id: relay_pulse
  label: Pulse Relay (preset duration)
  kind: action
  command: "GET /state.xml?relay{X}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number (1-based)

- id: relay_pulse_custom
  label: Pulse Relay (custom duration)
  kind: action
  command: "GET /state.json?pulseTime{X}={seconds}&relay{X}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number (1-based)
    - name: seconds
      type: integer
      description: Pulse duration in seconds

- id: set_on_time
  label: Set Relay On Time
  kind: action
  command: "GET /state.xml?onTime{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number (1-based)
    - name: value
      type: integer
      description: On-time value (seconds)

- id: set_total_on_time
  label: Set Relay Total On Time
  kind: action
  command: "GET /state.xml?totalOnTime{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number (1-based)
    - name: value
      type: integer
      description: Total on-time value (seconds)

- id: set_counter
  label: Set Counter Value
  kind: action
  command: "GET /state.json?count{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Counter number (1-based)
    - name: value
      type: integer
      description: Counter value

- id: set_register
  label: Set Register Value
  kind: action
  command: "GET /state.xml?register{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Register number (1-based)
    - name: value
      type: number
      description: Register value (supports float, e.g. 10.5)

- id: multiple_commands_xml
  label: Multiple XML Commands Combined
  kind: action
  command: "GET /customState.xml?relay1=1&relay2=0 HTTP/1.1\r\n\r\n"
  params: []

- id: multiple_commands_json
  label: Multiple JSON Commands Combined
  kind: action
  command: "GET /state.json?relay1=1&relay2=0 HTTP/1.1\r\n\r\n"
  params: []
```

## Feedbacks

```yaml
- id: relay_state
  type: enum
  values: [off, on]
  source: "<relay{X}> 0=off (coil off), 1=on (coil energized)"

- id: digital_input_state
  type: enum
  values: [off, on]
  source: "<digitalInput{X}> 0=off (voltage not applied), 1=on (voltage applied)"

- id: digital_io_state
  type: enum
  values: [off, on]
  source: "<digitalIO{X}> 0=off, 1=on"

- id: on_time
  type: number
  source: "<onTime{X}> seconds since input last came on"

- id: total_on_time
  type: number
  source: "<totalOnTime{X}> total seconds input has been on"

- id: count
  type: integer
  source: "<count{X}> count value associated with input X"

- id: frequency
  type: number
  source: "<frequency{X}> frequency associated with input X"

- id: analog_input
  type: number
  source: "<analogInput{X}> value of analog input X"

- id: vin
  type: number
  source: "<vin> scaled internal Vin measurement"

- id: register
  type: number
  source: "<register{X}> value of register X"

- id: one_wire_sensor
  type: number
  source: "<oneWireSensor{X}> sensor value (77.3); x.x = read error"

- id: utc_time
  type: integer
  source: "<utcTime> UTC seconds since 1970-01-01"

- id: timezone_offset
  type: integer
  source: "<timezoneOffset> offset for local time"

- id: serial_number
  type: string
  source: "<serialNumber> MAC-format device serial"
```

## Variables

```yaml
# UNRESOLVED: source describes `registerX` as writable float; no parameter range stated
```

## Events

```yaml
# UNRESOLVED: device can publish via MQTT or send SNMP traps/notifications; specific event payloads not enumerated in source excerpt
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences described in source excerpt
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings or interlock procedures
```

## Notes

- Default HTTP port 80; source shows `:8000` example when port changed. Port configurable under Advanced Network tab.
- Auth: optional Basic auth (Base64 of `user:password`) sent as `Authorization` header when User account enabled. Modbus/TCP disabled when User account enabled (no Modbus auth mechanism).
- `pulseTime{X}` argument MUST precede `relay{X}=2` in URL.
- Modbus/TCP supported on port 502 (configurable); function codes 01/02/03/05/15/16.
- MQTT/Sparkplug B, SNMP v1/v2c/v3 also supported (out of scope for this HTTP spec).
- Source is generic X-400 series; X20S-specific relay/digital-IO counts require the actual X20S Modbus address map from setup pages.

<!-- UNRESOLVED: X20S-specific I/O counts, exact Modbus address map, firmware version compatibility — not stated in refined source -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/wp-content/uploads/2024/01/x-20s_users_manual_v1.1.pdf
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:17:17.294Z
last_checked_at: 2026-07-07T11:12:32.289Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:12:32.289Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 HTTP GET actions match verbatim in source; transport (TCP port 80 + Basic auth) confirmed; spec scope (HTTP only) fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "doc covers X-400 series generally; X20S-specific relay/digital-IO counts and exact Modbus address map not stated"
- "source describes `registerX` as writable float; no parameter range stated"
- "device can publish via MQTT or send SNMP traps/notifications; specific event payloads not enumerated in source excerpt"
- "no multi-step sequences described in source excerpt"
- "source does not document safety warnings or interlock procedures"
- "X20S-specific I/O counts, exact Modbus address map, firmware version compatibility — not stated in refined source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
