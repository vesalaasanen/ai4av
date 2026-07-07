---
spec_id: admin/controlbyweb-x410
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X-410 Control Spec"
manufacturer: ControlByWeb
model_family: X-410
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X-410
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
retrieved_at: 2026-06-30T15:10:13.320Z
last_checked_at: 2026-07-07T12:28:09.493Z
generated_at: 2026-07-07T12:28:09.493Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not enumerate which relays/digital I/O/analog channels the X-410 physically exposes; addresses must be obtained from the device's generated Modbus Address Table at runtime."
  - "source does not describe any device-side multi-step sequences"
  - "source contains no safety warnings or interlock procedures."
  - "device-side voltage/current/fault behavior not stated; firmware version not stated (one command branch requires v3.13.7.8+); default TCP port not stated as a configurable value beyond the example \":8000\"."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:28:09.493Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched to source commands. HTTP GET endpoints, relay control variants, log/syslog access, and Modbus function codes verified. Transport YAML (tcp/http, port 80, auth none) confirmed in source. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X-410 Control Spec

## Summary
The ControlByWeb X-410 is an Ethernet-attached industrial I/O module exposing relays, digital inputs, analog inputs, 1-Wire sensors, Vin, counters and internal registers. This spec covers the HTTP GET (XML/JSON) control surface, Modbus/TCP slave interface, SNMP, MQTT/Sparkplug B, and HTTP endpoint conventions described in the vendor Integration & Communication Protocols Manual.

<!-- UNRESOLVED: source does not enumerate which relays/digital I/O/analog channels the X-410 physically exposes; addresses must be obtained from the device's generated Modbus Address Table at runtime. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  base_url: http://{device_ip}
  port: 80  # source states default; configurable (example "port 8000" given)
auth:
  type: none  # inferred: no auth procedure required when User account is disabled (default)
```

HTTP requests are GET against `/state.xml`, `/state.json`, `/customState.xml`, `/customState.json`, `/log.txt`, `/syslog.txt`. When the User account is enabled, requests must include `Authorization: Basic <base64(user:pass)>`.

Modbus/TCP slave listens on **port 502** (configurable under Advanced Network tab). Two simultaneous Modbus TCP sockets; 50 second idle timeout.

SNMP v1/v2c/v3 over UDP/161 (default; not explicitly stated).

MQTT v3.1.1; broker address configured by user.

## Traits
```yaml
- queryable       # inferred: state.xml/state.json expose read endpoints
- routable        # inferred: input numbering and I/O assignments route which fields appear in state.xml/json
```

## Actions
```yaml
# HTTP GET endpoints (XML/JSON). All requests are GET against /state.xml or
# /state.json (or /customState.xml / /customState.json with renamed tags).
# Multiple query parameters can be combined with '&' in a single URL.

- id: get_state
  label: Read full device state (XML)
  kind: query
  command: "GET /state.xml HTTP/1.1"
  params: []

- id: get_state_json
  label: Read full device state (JSON)
  kind: query
  command: "GET /state.json HTTP/1.1"
  params: []

- id: get_custom_state
  label: Read custom-named state (XML)
  kind: query
  command: "GET /customState.xml HTTP/1.1"
  params: []

- id: get_custom_state_json
  label: Read custom-named state (JSON)
  kind: query
  command: "GET /customState.json HTTP/1.1"
  params: []

# Relay control (relay X where X = Local I/O Number assigned to the relay)
- id: relay_off
  label: Turn Relay X OFF
  kind: action
  command: "GET /state.xml?relay{X}=0 HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Local I/O number assigned to the relay

- id: relay_on
  label: Turn Relay X ON
  kind: action
  command: "GET /state.xml?relay{X}=1 HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Local I/O number assigned to the relay

- id: relay_pulse
  label: Pulse Relay X (preset duration)
  kind: action
  command: "GET /state.xml?relay{X}=2 HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Local I/O number assigned to the relay

- id: relay_pulse_time
  label: Pulse Relay X for N seconds (override preset)
  kind: action
  command: "GET /state.json?pulseTime{X}={seconds}&relay{X}=2 HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Local I/O number assigned to the relay
    - name: seconds
      type: number
      description: Pulse duration in seconds (pulseTime must precede relay=X=2 in URL)

- id: relay_pulse_if_off
  label: Pulse Relay X only if currently Off (firmware v3.13.7.8+)
  kind: action
  command: "GET /state.json?relay{X}=3 HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Local I/O number assigned to the relay

- id: relay_toggle_off_when_pulsing
  label: Let pulse finish then turn Relay X Off (firmware v3.13.7.8+)
  kind: action
  command: "GET /state.json?relay{X}=7 HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Local I/O number assigned to the relay

# Counters / on-time setters
- id: set_on_time
  label: Set onTimeX value
  kind: action
  command: "GET /state.xml?onTime{X}={value} HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Digital input number
    - name: value
      type: number
      description: Seconds value to set (e.g. 0, 5)

- id: set_total_on_time
  label: Set totalOnTimeX value
  kind: action
  command: "GET /state.xml?totalOnTime{X}={value} HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Digital input number
    - name: value
      type: number
      description: Seconds value to set (e.g. 0, 5)

- id: set_counter
  label: Set countX value
  kind: action
  command: "GET /state.json?count{X}={value} HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Digital input number
    - name: value
      type: number
      description: Counter value (e.g. 200)

# Register control
- id: set_register
  label: Set registerX value
  kind: action
  command: "GET /state.xml?register{X}={value} HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Register number
    - name: value
      type: number
      description: Register value (e.g. 10.5, 25)

# Log file endpoints
- id: read_log
  label: Read data log file
  kind: query
  command: "GET /log.txt HTTP/1.1"
  params: []

- id: erase_log
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

# Modbus/TCP function codes (slave on port 502)
- id: modbus_read_coils
  label: Read Coils (Function 01)
  kind: query
  command: "Modbus FC 0x01"
  params:
    - name: start_address
      type: integer
      description: Per Modbus map in setup pages
    - name: quantity
      type: integer
      description: Number of coils to read

- id: modbus_read_discrete_inputs
  label: Read Discrete Inputs (Function 02)
  kind: query
  command: "Modbus FC 0x02"
  params:
    - name: start_address
      type: integer
      description: Per Modbus map in setup pages
    - name: quantity
      type: integer
      description: Number of discrete inputs to read

- id: modbus_read_holding_registers
  label: Read Holding Registers (Function 03)
  kind: query
  command: "Modbus FC 0x03"
  params:
    - name: start_address
      type: integer
      description: 32-bit sensor/analog values require pairs (must read Nx2 registers)
    - name: quantity
      type: integer
      description: Number of registers to read (must be divisible by 2)

- id: modbus_write_single_coil
  label: Write Single Coil (Function 05)
  kind: action
  command: "Modbus FC 0x05"
  params:
    - name: start_address
      type: integer
      description: Per Modbus map in setup pages
    - name: value
      type: enum
      values: [0x00, 0xFF]
      description: 0x00 = Off, 0xFF = On

- id: modbus_write_multiple_coils
  label: Write Multiple Coils (Function 15)
  kind: action
  command: "Modbus FC 0x0F"
  params:
    - name: start_address
      type: integer
      description: First coil address
    - name: quantity
      type: integer
      description: Number of coils
    - name: byte_count
      type: integer
      description: Output quantity divided by 8
    - name: value
      type: hex
      description: 0x0000 to 0xFFFF bitfield (e.g. 0xFFFF = up to 16 outputs ON)

- id: modbus_write_multiple_registers
  label: Write Multiple Registers (Function 16)
  kind: action
  command: "Modbus FC 0x10"
  params:
    - name: start_address
      type: integer
      description: Per Modbus map; pulse commands use addresses 512-513
    - name: quantity
      type: integer
      description: Number of registers (divisible by 2)
    - name: value
      type: number
      description: IEEE 754 32-bit float, little- or big-endian per Advanced Network setting
```

## Feedbacks
```yaml
# Tags returned in state.xml / state.json / customState.* (only present
# when the I/O type has a Local I/O Number assigned).

- id: digital_input
  type: enum
  values: [0, 1]
  description: "0 = off (no voltage), 1 = on (voltage applied). Tag <digitalInputX>."

- id: relay_state
  type: enum
  values: [0, 1]
  description: "0 = coil off, 1 = coil energized. Tag <relayX>."

- id: digital_io
  type: enum
  values: [0, 1]
  description: "Configured-as-input digital I/O state. Tag <digitalIOX>."

- id: on_time
  type: number
  description: Seconds the input has been on since last coming on. Tag <onTimeX>.

- id: total_on_time
  type: number
  description: Total seconds the input has been on. Tag <totalOnTimeX>.

- id: count
  type: number
  description: Counter value associated with input X. Tag <countX>.

- id: frequency
  type: number
  description: Frequency associated with input X (or X-420 frequency input). Tag <frequencyX> / <frequencyInput>.

- id: analog_input
  type: number
  description: Value of analog input X. Tag <analogInputX>.

- id: vin
  type: number
  description: Scaled internal Vin measurement. Always present in state.xml/json. Tag <vin>.

- id: register
  type: number
  description: Internal register X value. Tag <registerX>.

- id: one_wire_sensor
  type: number
  description: "x.x = read error; 77.3 = reading; 77.3 F = reading with units (showUnits=1). Tag <oneWireSensorX>."

- id: utc_time
  type: integer
  description: UTC seconds since 1970-01-01. Tag <utcTime>.

- id: timezone_offset
  type: integer
  description: Seconds offset to apply to utcTime for local time. Tag <timezoneOffset>.

- id: serial_number
  type: string
  description: Device MAC address (used as serial). Format 00:00:00:00:00:00. Tag <serialNumber>.

- id: lat
  type: number
  description: GPS latitude (where supported). Tag "lat" in state.json.

- id: long
  type: number
  description: GPS longitude (where supported). Tag "long" in state.json.

- id: min_rec_refresh
  type: integer
  description: Minimum recommended refresh interval (state.json).

# Modbus error responses
- id: modbus_error_function_code
  type: integer
  description: "Original function code + 0x80. E.g. 0x81 = error during FC 0x01."

- id: modbus_exception_code
  type: integer
  description: "0x01 function/feature not supported, 0x02 incorrect address/quantity, 0x03 padding/out-of-range."
```

## Variables
```yaml
# Settable parameters surfaced via state.xml/json GET arguments.
- id: register_value
  type: number
  description: Internal register X - float writable via registerX={value}.

- id: on_time_value
  type: number
  description: onTimeX - seconds writable.

- id: total_on_time_value
  type: number
  description: totalOnTimeX - seconds writable.

- id: count_value
  type: number
  description: countX - counter writable.

- id: pulse_time_override
  type: number
  description: pulseTimeX - seconds, single-pulse override (must precede relayX=2 in URL).
```

## Events
```yaml
# Unsolicited notifications the device can emit.
- id: snmp_trap
  description: "Trap PDU when relay state changes, sensor threshold met, or Vin out of range. Configured under Conditional/Scheduled tasks."
  protocol: snmp

- id: snmp_notification
  description: "Notification (v2c/v3) - acknowledged variant of trap; retries on missing response."
  protocol: snmp

- id: mqtt_publish
  description: "Publish to broker on I/O state change or update. Token expansion (e.g. ${relay1}, ${vin}, ${dateTime}) supported in payloads."
  protocol: mqtt
```

## Macros
```yaml
# UNRESOLVED: source does not describe any device-side multi-step sequences
# beyond combining query parameters in a single URL (relay1=1&relay2=0).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
# Operational note from source: Modbus is disabled when the User account is enabled,
# because Modbus/TCP has no built-in password protection.
```

## Notes
- HTTP GET is the canonical control surface; XML and JSON variants expose identical state with different tag naming. `/customState.xml|json` reuses the same URL scheme with user-configured CamelCase tag names.
- Multiple control parameters can be combined into one URL: `/state.json?relay1=1&relay2=0`.
- Modbus/TCP slave holds two simultaneous connections; idle timeout 50 s. Default port 502. Addressing map is generated by the device based on configured I/O — refer to the device's "View Modbus Address Table" for actual addresses.
- For relay pulse with non-preset duration, `pulseTimeX={seconds}` MUST precede `relayX=2` in the query string.
- Special pulse commands (`relayX=3`, `relayX=7`) require firmware v3.13.7.8 or later.
- HTTP default port is 80 but is configurable; examples in source use `:8000`.
- When the User account is enabled, HTTP requests must include `Authorization: Basic <base64(user:password)>` (default user `none`, password `webrelay`, base64 `bm9uZTp3ZWJyZWxheQ==`).
- MQTT v3.1.1; Sparkplug B supported as alternative payload format.
- SNMP supports v1, v2c, v3; community strings default to `webrelay` (read and write).
- Source does not enumerate which physical I/O channels the X-410 actually exposes (relays, digital I/O, analog inputs, 1-Wire sensors). I/O presence is determined by Local I/O Number assignment; consult the device setup or generated MIB/Modbus Address Table at runtime.
```

<!-- UNRESOLVED: device-side voltage/current/fault behavior not stated; firmware version not stated (one command branch requires v3.13.7.8+); default TCP port not stated as a configurable value beyond the example ":8000". -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
retrieved_at: 2026-06-30T15:10:13.320Z
last_checked_at: 2026-07-07T12:28:09.493Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:28:09.493Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched to source commands. HTTP GET endpoints, relay control variants, log/syslog access, and Modbus function codes verified. Transport YAML (tcp/http, port 80, auth none) confirmed in source. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not enumerate which relays/digital I/O/analog channels the X-410 physically exposes; addresses must be obtained from the device's generated Modbus Address Table at runtime."
- "source does not describe any device-side multi-step sequences"
- "source contains no safety warnings or interlock procedures."
- "device-side voltage/current/fault behavior not stated; firmware version not stated (one command branch requires v3.13.7.8+); default TCP port not stated as a configurable value beyond the example \":8000\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
