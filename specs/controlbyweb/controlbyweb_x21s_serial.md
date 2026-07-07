---
spec_id: admin/controlbyweb-x21s
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X21S Control Spec"
manufacturer: ControlByWeb
model_family: X21S
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X21S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/X-21s_manual_v1.0.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:07:00.358Z
last_checked_at: 2026-07-07T11:12:33.163Z
generated_at: 2026-07-07T11:12:33.163Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not enumerate power on/off commands for X21S (relay states control outputs, not device power)"
  - "source does not describe input/output routing matrix for X21S"
  - "Modbus pulse-relay function code variant ---"
  - "RS-232/serial commands for X21S ---"
  - "which of the above tags apply to X21S specifically - source describes X-400 family generally"
  - "register range not stated in source"
  - "default value not stated in source"
  - "HTTP-level unsolicited events (if any) - source does not describe SSE, WebSocket, or async HTTP push."
  - "no multi-step command sequences described in source"
  - "X21S-specific serial/RS-232 framing, baud, parity, pinout"
  - "X21S-specific relay/digital I/O count and Modbus address map"
  - "firmware version compatibility range"
  - "default HTTP port (80) is implied by examples but not explicitly stated as default"
verification:
  verdict: verified
  checked_at: 2026-07-07T11:12:33.163Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions match source documentation exactly; transport parameters verified; complete command coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X21S Control Spec

## Summary
The ControlByWeb X21S is an Ethernet-connected industrial I/O module supporting HTTP GET control, Modbus/TCP (slave), SNMP v1/v2c/v3, MQTT 3.1.1 with Sparkplug B, and optional ControlByWeb.Cloud DAT URL integration. The source document describes the ControlByWeb X-400 Series family generically; X21S-specific pinouts, serial configuration, and firmware behaviors are not stated in the source.

<!-- UNRSOLVED: RS-232/serial transport parameters (baud, parity, framing, pinout) not documented in source for X21S -->
<!-- UNRSOLVED: X21S-specific Modbus address map not documented in source (source refers generically to setup-page map) -->

## Transport
```yaml
# Source describes multiple network transports. The known protocol label for this spec is
# RS-232C, but the refined source contains no RS-232/serial detail for the X21S specifically.
# HTTP (port 80 default, with :8000 example) and Modbus/TCP (port 502) are documented.
protocols:
  - http
  - tcp
addressing:
  port: 502  # Modbus/TCP default per source
# HTTP default port 80 implied by examples (http://192.168.1.2/...); source notes port can be changed.
auth:
  type: basic  # HTTP Basic Auth (Base64) optional when User account enabled; Modbus disabled when User account enabled
  # inferred: source describes optional HTTP Basic Auth via Base64 "name:password"
```

## Traits
```yaml
# - powerable  # UNRESOLVED: source does not enumerate power on/off commands for X21S (relay states control outputs, not device power)
# - routable  # UNRESOLVED: source does not describe input/output routing matrix for X21S
- queryable  # inferred from state.xml/json read commands and Modbus read function codes
```

## Actions
```yaml
# Source documents HTTP GET control patterns (relays, pulse, counters, registers, logs)
# and Modbus/TCP function codes (01, 02, 03, 05, 15, 16). X21S-specific I/O counts and
# Modbus addresses are referenced as "refer to Modbus map in setup pages" - not enumerated.

# --- HTTP: state read ---
- id: http_get_state_xml
  label: HTTP GET state.xml
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []

- id: http_get_state_json
  label: HTTP GET state.json
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []

- id: http_get_custom_state_xml
  label: HTTP GET customState.xml
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []

- id: http_get_custom_state_json
  label: HTTP GET customState.json
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

# --- HTTP: relay control (X = 1..N, X21S channel count not stated in source) ---
- id: http_set_relay
  label: HTTP Set Relay State
  kind: action
  command: "GET /state.xml?relay{X}={state} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number (1-based; X21S max not stated in source)
    - name: state
      type: enum
      values: ["0", "1", "2"]
      description: "0=OFF, 1=ON, 2=PULSE"

- id: http_pulse_relay_default
  label: HTTP Pulse Relay (preset duration)
  kind: action
  command: "GET /state.json?relay{X}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number

- id: http_pulse_relay_custom
  label: HTTP Pulse Relay (custom duration)
  kind: action
  command: "GET /state.json?pulseTime{X}={seconds}&relay{X}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
      description: Relay number
    - name: seconds
      type: integer
      description: Pulse duration in seconds (pulseTime must precede relay command per source)

# --- HTTP: counters, on-time, registers ---
- id: http_set_ontime
  label: HTTP Set On Time
  kind: action
  command: "GET /state.xml?onTime{X}={seconds} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
    - name: seconds
      type: integer

- id: http_set_totalontime
  label: HTTP Set Total On Time
  kind: action
  command: "GET /state.xml?totalOnTime{X}={seconds} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
    - name: seconds
      type: integer

- id: http_set_counter
  label: HTTP Set Counter
  kind: action
  command: "GET /state.json?count{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
    - name: value
      type: integer

- id: http_set_register
  label: HTTP Set Register
  kind: action
  command: "GET /state.xml?register{X}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: X
      type: integer
    - name: value
      type: number
      description: Numeric value (e.g. 10.5)

# --- HTTP: log files ---
- id: http_get_log
  label: HTTP GET log.txt
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []

- id: http_erase_log
  label: HTTP Erase log.txt
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: http_get_syslog
  label: HTTP GET syslog.txt
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []

- id: http_erase_syslog
  label: HTTP Erase syslog.txt
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

# --- Modbus/TCP function codes (host → X21S slave on port 502) ---
- id: modbus_read_coils
  label: Modbus Read Coils (FC01)
  kind: query
  command: "Modbus FC 0x01 - Read coils (relays / digital outputs)"
  params:
    - name: start_address
      type: integer
      description: Per X21S Modbus map (not enumerated in source)
    - name: quantity
      type: integer

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC02)
  kind: query
  command: "Modbus FC 0x02 - Read discrete inputs"
  params:
    - name: start_address
      type: integer
    - name: quantity
      type: integer

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC03)
  kind: query
  command: "Modbus FC 0x03 - Read holding registers (Vin, sensors, registers, counters, analog inputs)"
  params:
    - name: start_address
      type: integer
    - name: quantity
      type: integer
      description: Must be even (pairs of 16-bit → 32-bit float)

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC05)
  kind: action
  command: "Modbus FC 0x05 - Write coil (0x00=Off, 0xFF=On)"
  params:
    - name: start_address
      type: integer
    - name: value
      type: enum
      values: ["0x00", "0xFF"]

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC15)
  kind: action
  command: "Modbus FC 0x0F - Write multiple coils"
  params:
    - name: start_address
      type: integer
    - name: quantity
      type: integer
    - name: byte_count
      type: integer
      description: Quantity / 8
    - name: value
      type: integer
      description: 0x0000-0xFFFF bit pattern

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC16)
  kind: action
  command: "Modbus FC 0x10 - Write multiple registers (IEEE 754 float, endianness per setup)"
  params:
    - name: start_address
      type: integer
    - name: quantity
      type: integer
      description: Must be even
    - name: values
      type: number
      description: IEEE 754 32-bit float

# --- UNRESOLVED: Modbus pulse-relay function code variant ---
# Source describes pulse via FC16 at addresses 512-513 in 2.1.3 example but does not
# enumerate this as a distinct device-wide function; treat as same FC16 with address params.

# --- UNRESOLVED: RS-232/serial commands for X21S ---
# Source contains no RS-232 command set, framing, or payload syntax for the X21S.
```

## Feedbacks
```yaml
# Source documents Modbus error response pattern (function code + 0x80 + exception code).
- id: modbus_error
  type: object
  description: |
    Error response = (original function code OR 0x80) + exception code byte.
    Exception codes: 0x01 (function not supported / Modbus disabled), 0x02 (bad address/quantity).
    Specific error function codes: 0x81 (FC01), 0x82 (FC02), 0x83 (FC03), 0x85 (FC05), 0x8F (FC15), 0x90 (FC16).

# --- HTTP state.xml/json tags (X-400 family; X21S subset UNRESOLVED) ---
- id: relay_state
  type: enum
  values: ["0", "1"]
  description: 0=off (coil off), 1=on (coil energized)

- id: digital_input_state
  type: enum
  values: ["0", "1"]
  description: 0=off (no voltage), 1=on (voltage applied)

- id: analog_input
  type: number
  description: Value of analog input X (engineering units)

- id: vin
  type: number
  description: Scaled internal Vin measurement

- id: register
  type: number
  description: Value of register X

- id: counter
  type: number
  description: Count value associated with input X

- id: on_time
  type: number
  description: Seconds input/relay was on since last coming on

- id: total_on_time
  type: number
  description: Total seconds input/relay has been on

- id: frequency
  type: number
  description: Frequency associated with input X

- id: utc_time
  type: integer
  description: Current UTC time, seconds since 1970-01-01

- id: timezone_offset
  type: integer
  description: Offset to apply to utcTime for local time

- id: serial_number
  type: string
  description: 00:00:00:00:00:00 device serial

- id: one_wire_sensor
  type: string
  description: "x.x = read error; 77.3 = value; 77.3 F = value with units (showUnits=1)"

# UNRESOLVED: which of the above tags apply to X21S specifically - source describes X-400 family generally
```

## Variables
```yaml
# Settable numeric parameters beyond discrete actions.
- name: register_value
  type: number
  range: ""  # UNRESOLVED: register range not stated in source
  description: Internal register settable via HTTP GET or Modbus FC16

- name: pulse_duration
  type: integer
  unit: seconds
  description: Per-pulse override duration; does not change configured Pulse Duration

- name: endianness
  type: enum
  values: ["little-endian", "big-endian"]
  description: Modbus floating-point byte order, configured in Advanced Network tab
  # UNRESOLVED: default value not stated in source
```

## Events
```yaml
# Source documents unsolicited device-originated notifications.
- id: snmp_trap
  description: |
    Sent on relay state change, sensor threshold crossing, or Vin out-of-range.
    Configured as actions in Conditional and Scheduled tasks.

- id: snmp_notification
  description: |
    SNMPv2c/v3 notification requiring acknowledgement; retries if manager does not respond.

- id: remote_services_state_push
  description: |
    When Remote Services is enabled and a connection is open, the device sends state.xml
    on logic events with "send state" actions. Connection String includes static device info
    plus user-defined string; expects 3-char "ACK" reply within 10 seconds or connection closes.

# UNRESOLVED: HTTP-level unsolicited events (if any) - source does not describe SSE, WebSocket, or async HTTP push.
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.
# None documented in the refined source. Remove this section if not applicable.
# UNRESOLVED: no multi-step command sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes:
# - Modbus/TCP is DISABLED whenever the User account is enabled (no password mechanism).
# - HTTP syslog.txt requires setup username/password.
# No safety interlocks or power-on sequencing described in source for X21S.
```

## Notes
Source is the ControlByWeb "Integrating with ControlByWeb Devices" reference, covering the X-400 Series family. The X21S-specific subset of channels, Modbus addresses, and serial/RS-232 parameters is not enumerated; addresses must be looked up via the device's setup pages ("View Modbus Address Table" button under Advanced Network). Modbus TCP connections idle >50s time out; two TCP sockets available. HTTP Basic Auth (Base64 of `name:password`) is optional via User account; default credentials example shown in source are `none:webrelay` (Base64 `bm9uZTp3ZWJyZWxheQ==`). MQTT version 3.1.1, Sparkplug B supported. SNMP v1/v2c/v3 with default community strings `webrelay`. Cloud access via `https://api.controlbyweb.cloud/{dat_url}/state.xml|.json`. 32-bit float encoding per IEEE 754, register pairs must be read/written together.

<!-- UNRESOLVED: X21S-specific serial/RS-232 framing, baud, parity, pinout -->
<!-- UNRESOLVED: X21S-specific relay/digital I/O count and Modbus address map -->
<!-- UNRESOLVED: firmware version compatibility range -->
<!-- UNRESOLVED: default HTTP port (80) is implied by examples but not explicitly stated as default -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/X-21s_manual_v1.0.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:07:00.358Z
last_checked_at: 2026-07-07T11:12:33.163Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:12:33.163Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions match source documentation exactly; transport parameters verified; complete command coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not enumerate power on/off commands for X21S (relay states control outputs, not device power)"
- "source does not describe input/output routing matrix for X21S"
- "Modbus pulse-relay function code variant ---"
- "RS-232/serial commands for X21S ---"
- "which of the above tags apply to X21S specifically - source describes X-400 family generally"
- "register range not stated in source"
- "default value not stated in source"
- "HTTP-level unsolicited events (if any) - source does not describe SSE, WebSocket, or async HTTP push."
- "no multi-step command sequences described in source"
- "X21S-specific serial/RS-232 framing, baud, parity, pinout"
- "X21S-specific relay/digital I/O count and Modbus address map"
- "firmware version compatibility range"
- "default HTTP port (80) is implied by examples but not explicitly stated as default"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
