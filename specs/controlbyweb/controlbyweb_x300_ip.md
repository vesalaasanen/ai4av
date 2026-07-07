---
spec_id: admin/controlbyweb-x300
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X-300 Control Spec"
manufacturer: ControlByWeb
model_family: X-300
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X-300
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/x-300_manual-v1.8.pdf
retrieved_at: 2026-07-01T14:26:06.625Z
last_checked_at: 2026-07-07T11:12:34.824Z
generated_at: 2026-07-07T11:12:34.824Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "X-300-specific I/O counts (number of relays, digital inputs, analog inputs, registers) are not stated in the source — the source is written for the X-400 Series family. Relay/input/register commands below are parameterized by Local I/O number; the valid index range for the X-300 is unknown."
  - "number of registers on X-300 not stated in source"
  - "no literal event/trap/connection-string payloads provided in source"
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
  - "X-300 relay/input/register counts; firmware compatibility ranges; voltage/current/power specs; per-address Modbus frame details (addresses must be read from the device's own Modbus Address Table)."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:12:34.824Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched exactly to source HTTP GET commands; transport parameters verified; no missing or extra functionality. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# ControlByWeb X-300 Control Spec

## Summary
The ControlByWeb X-300 is a network-attached I/O module with a built-in web server. This spec covers control and monitoring via HTTP GET requests carried over a TCP/IP connection (`state.xml` / `state.json` / `customState.xml` / `customState.json`). The source additionally documents Modbus/TCP (port 502), SNMP (V1/V2c/V3), and MQTT 3.1.1 / Sparkplug B; those protocols are noted only in Notes and are out of scope for this spec.

<!-- UNRESOLVED: X-300-specific I/O counts (number of relays, digital inputs, analog inputs, registers) are not stated in the source — the source is written for the X-400 Series family. Relay/input/register commands below are parameterized by Local I/O number; the valid index range for the X-300 is unknown. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{host}/"   # {host} = device IP (source examples use 192.168.1.2)
  port: 80                      # stated default; source notes "not port 80" when changed and shows :8000 as an alternate
auth:
  type: none  # default: User account disabled (no login). Optional HTTP Basic auth when User account enabled - password sent Base64-encoded as "Authorization: Basic <base64(name:password)>"
```

## Traits
```yaml
traits:
  - queryable  # inferred: state.xml / state.json return full device state
```

## Actions
```yaml
# All commands are HTTP GET requests framed as: GET <path>?<query> HTTP/1.1\r\n\r\n
# state.xml and state.json accept the same control parameters; commands below use state.xml.
# Index placeholder {n} = Local I/O number (1-based). Valid range for X-300 is UNRESOLVED.

# --- Relay control (relay{n}=0|1|2) ---
- id: relay_off
  label: Turn Relay Off
  kind: action
  command: 'GET /state.xml?relay{n}=0 HTTP/1.1\r\n\r\n'
  params:
    - name: n
      type: integer
      description: Relay number (Local I/O number, 1-based)

- id: relay_on
  label: Turn Relay On
  kind: action
  command: 'GET /state.xml?relay{n}=1 HTTP/1.1\r\n\r\n'
  params:
    - name: n
      type: integer
      description: Relay number (Local I/O number, 1-based)

- id: relay_pulse
  label: Pulse Relay (preset duration)
  kind: action
  command: 'GET /state.xml?relay{n}=2 HTTP/1.1\r\n\r\n'
  params:
    - name: n
      type: integer
      description: Relay number (Local I/O number, 1-based)

- id: relay_pulse_custom
  label: Pulse Relay (custom duration)
  kind: action
  command: 'GET /state.json?pulseTime{n}={seconds}&relay{n}=2 HTTP/1.1\r\n\r\n'
  params:
    - name: n
      type: integer
      description: Relay number (Local I/O number, 1-based)
    - name: seconds
      type: number
      description: Pulse duration in seconds for this single pulse (overrides configured Pulse Duration; not stored)
  notes: "pulseTime argument MUST come before the relay{n}=2 command (source)."

# --- On-time / counter / register set ---
- id: set_on_time
  label: Set On Time
  kind: action
  command: 'GET /state.xml?onTime{n}={value} HTTP/1.1\r\n\r\n'
  params:
    - name: n
      type: integer
      description: Input number (1-based)
    - name: value
      type: number
      description: On-time value in seconds (e.g. 0 to reset)

- id: set_total_on_time
  label: Set Total On Time
  kind: action
  command: 'GET /state.xml?totalOnTime{n}={value} HTTP/1.1\r\n\r\n'
  params:
    - name: n
      type: integer
      description: Input number (1-based)
    - name: value
      type: number
      description: Total on-time value in seconds (e.g. 0 to reset)

- id: set_counter
  label: Set Counter
  kind: action
  command: 'GET /state.json?count{n}={value} HTTP/1.1\r\n\r\n'
  params:
    - name: n
      type: integer
      description: Input number (1-based)
    - name: value
      type: number
      description: Counter value (e.g. 200)

- id: set_register
  label: Set Register
  kind: action
  command: 'GET /state.xml?register{n}={value} HTTP/1.1\r\n\r\n'
  params:
    - name: n
      type: integer
      description: Register number (1-based)
    - name: value
      type: number
      description: Register value (e.g. 10.5, 25)

# --- Control by custom name (customState) ---
- id: set_by_custom_name
  label: Set I/O by Custom Name
  kind: action
  command: 'GET /customState.xml?{name}={value} HTTP/1.1\r\n\r\n'
  params:
    - name: name
      type: string
      description: Camel-case tag name from customState.xml/json (e.g. myRegister1 for an I/O named 'My Register 1')
    - name: value
      type: string
      description: Value to set

# --- State queries ---
- id: query_state_xml
  label: Query State (XML)
  kind: query
  command: 'GET /state.xml HTTP/1.1\r\n\r\n'
  params: []

- id: query_state_json
  label: Query State (JSON)
  kind: query
  command: 'GET /state.json HTTP/1.1\r\n\r\n'
  params: []

- id: query_custom_state_xml
  label: Query Custom State (XML)
  kind: query
  command: 'GET /customState.xml HTTP/1.1\r\n\r\n'
  params: []

- id: query_custom_state_json
  label: Query Custom State (JSON)
  kind: query
  command: 'GET /customState.json HTTP/1.1\r\n\r\n'
  params: []

# --- Log files ---
- id: read_data_log
  label: Read Data Log
  kind: query
  command: 'GET /log.txt HTTP/1.1\r\n\r\n'
  params: []
  notes: "User password required when User account enabled."

- id: erase_data_log
  label: Erase Data Log
  kind: action
  command: 'GET /log.txt?erase=1 HTTP/1.1\r\n\r\n'
  params: []
  notes: "User password required when User account enabled."

- id: read_syslog
  label: Read System Log
  kind: query
  command: 'GET /syslog.txt HTTP/1.1\r\n\r\n'
  params: []
  notes: "Setup username/password required to access this file."

- id: erase_syslog
  label: Erase System Log
  kind: action
  command: 'GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n'
  params: []
  notes: "Setup username/password required to access this file."
```

## Feedbacks
```yaml
# State returned by state.xml / state.json (and customState.*). X = Local I/O number.
- id: relay_state
  type: enum
  values: ["0", "1"]   # 0=off (coil off), 1=on (coil energized)
  tag: relayX

- id: digital_input_state
  type: enum
  values: ["0", "1"]   # 0=off (no voltage applied), 1=on (voltage applied)
  tag: digitalInputX

- id: digital_io_state
  type: enum
  values: ["0", "1"]   # bidirectional digital I/O; 0=off, 1=on
  tag: digitalIOX

- id: analog_input
  type: number
  tag: analogInputX

- id: vin
  type: number
  tag: vin   # scaled internal supply-voltage measurement; always present in state

- id: register_value
  type: number
  tag: registerX

- id: counter_value
  type: number
  tag: countX

- id: frequency
  type: number
  tag: frequencyX

- id: on_time
  type: number
  tag: onTimeX   # seconds input has been on since last turn-on

- id: total_on_time
  type: number
  tag: totalOnTimeX   # total seconds input has been on

- id: onewire_sensor
  type: number
  tag: oneWireSensorX   # "x.x" = could not be read; units appended when showUnits=1

- id: frequency_input
  type: number
  tag: frequencyInput   # X-420 frequency input value

- id: serial_number
  type: string
  tag: serialNumber   # format 00:00:00:00:00:00

- id: utc_time
  type: integer
  tag: utcTime   # seconds since 1970-01-01

- id: timezone_offset
  type: integer
  tag: timezoneOffset
```

## Variables
```yaml
# Settable continuous parameters (also exposed as set_* actions above).
- id: register
  type: number
  description: Internal holding register; set via register{n}={value}. Persistent per-register value.
  # UNRESOLVED: number of registers on X-300 not stated in source

- id: counter
  type: number
  description: Per-input counter; set via count{n}={value}.

- id: pulse_time
  type: number
  description: Transient per-relay pulse duration in seconds (pulseTime{n}={seconds}); applies only to the single accompanying pulse command, not stored or recorded.
```

## Events
```yaml
# Source documents unsolicited push mechanisms but without literal event payloads:
#  - SNMP traps: sent on relay state change, sensor value reached, or supply voltage out of range
#    (configured as actions in Conditional/Scheduled tasks)
#  - SNMP notifications (V2c/V3): require a manager response; retried if no response
#  - MQTT publish to configured broker
#  - Remote Services: device-initiated TCP V1 connection sends a connection string
#    (static device info + user-defined string + state.xml); expects a 3-character "ACK"
#    back within 10 seconds or the device closes the connection
# UNRESOLVED: no literal event/trap/connection-string payloads provided in source
```

## Macros
```yaml
# Multiple control arguments may be combined in a single GET (source-documented):
#   GET /state.json?relay1=1&relay2=0 HTTP/1.1\r\n\r\n
#   GET /customState.xml?relay1=1&relay2=0 HTTP/1.1\r\n\r\n
# No other named multi-step macros are documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Source is the ControlByWeb HTTP integration guide, written for the X-400 Series family; X-300-specific I/O counts are not given. Resolve every `{n}` index against the device's actual Local I/O map before use.
- `state.xml` / `state.json` expose only I/O that has been assigned a Local I/O Number. `customState.xml` / `customState.json` use user-configurable Camel-case tag names.
- Default port 80; configurable (source examples show `:8000`). The local interface is HTTP only — HTTPS appears only via the ControlByWeb Cloud DAT URL path.
- Auth is optional: with the User account disabled (default) no password is needed; when enabled, send `Authorization: Basic <base64(name:password)>`. Source example credential is `none:webrelay` → `bm9uZTp3ZWJyZWxheQ==`.
- Additional protocols documented but out of scope here: Modbus/TCP (slave, port 502 configurable, function codes 01/02/03/05/0F/10), SNMP (V1/V2c/V3; default read/write community `webrelay`), MQTT 3.1.1 / Sparkplug B, and ControlByWeb Cloud DAT URLs.
- Modbus is disabled whenever the User account is enabled (Modbus provides no password mechanism).
<!-- UNRESOLVED: X-300 relay/input/register counts; firmware compatibility ranges; voltage/current/power specs; per-address Modbus frame details (addresses must be read from the device's own Modbus Address Table). -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/x-300_manual-v1.8.pdf
retrieved_at: 2026-07-01T14:26:06.625Z
last_checked_at: 2026-07-07T11:12:34.824Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:12:34.824Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched exactly to source HTTP GET commands; transport parameters verified; no missing or extra functionality. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "X-300-specific I/O counts (number of relays, digital inputs, analog inputs, registers) are not stated in the source — the source is written for the X-400 Series family. Relay/input/register commands below are parameterized by Local I/O number; the valid index range for the X-300 is unknown."
- "number of registers on X-300 not stated in source"
- "no literal event/trap/connection-string payloads provided in source"
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
- "X-300 relay/input/register counts; firmware compatibility ranges; voltage/current/power specs; per-address Modbus frame details (addresses must be read from the device's own Modbus Address Table)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
