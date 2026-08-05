---
spec_id: admin/control_by_web-webrelayquad
schema_version: ai4av-public-spec-v1
revision: 2
title: "Control By Web WebRelayQuad Control Spec"
manufacturer: ControlByWeb
model_family: WebRelayQuad
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
    - "Control By Web"
  models:
    - WebRelayQuad
    - "X-400 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/05/400-series-users-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
retrieved_at: 2026-05-14T21:19:40.381Z
last_checked_at: 2026-07-21T21:46:25.451Z
generated_at: 2026-07-21T21:46:25.451Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact WebRelayQuad model variant not stated in source; X-400 Series referenced"
  - "SNMP port not explicitly stated in source; standard UDP 161 assumed"
  - "MQTT broker auth not detailed in source"
  - "MQTT broker port not stated in source"
  - "removed routable - no input/output routing commands in source"
  - "requires password if user account enabled (source states \"user password will be required\")"
  - "per-action URL payload (query param name) not explicitly documented in source beyond relayX pattern"
  - "no standalone settable configuration parameters beyond I/O state"
  - "specific trap payload format not documented in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "default HTTP port (80) implied by examples but not explicitly stated"
  - "pulse duration default (1.5 seconds mentioned in example) not confirmed as spec"
  - "SNMP port (161) not stated in source"
  - "specific Modbus address map requires device setup pages (not in source)"
  - "digital I/O direction (input/output) configuration not described"
  - "X-600M additional I/O types not detailed in source"
  - "per-action URL query param names (onTime/totalOnTime/counter/register/pulseTime/erase) not explicitly documented beyond relayX"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:46:25.451Z
  matched_actions: 8
  action_count: 8
  confidence: medium
  summary: "All 8 spec actions match documented protocol capabilities; transport parameters verified; coverage complete. (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Control By Web WebRelayQuad Control Spec

## Summary
The WebRelayQuad is a network-connected relay controller with four relays and four digital inputs. Control is primarily over HTTP GET requests via TCP/IP on port 80 (default), with optional Modbus/TCP on port 502, SNMP v1/v2c/v3 for monitoring, and MQTT 3.1.1 with Sparkplug B. Relay state is read via state.xml or state.json endpoints; commands are sent as URL parameters.

<!-- UNRESOLVED: exact WebRelayQuad model variant not stated in source; X-400 Series referenced -->

## Transport
```yaml
# Primary - HTTP GET over TCP/IP
protocols:
  - tcp
addressing:
  port: 80  # default HTTP port; source examples use port 80; non-default port (8000) shown for log files
auth:
  type: none  # inferred: no auth required by default; user account must be explicitly enabled
  # When User account enabled: HTTP Basic (Base64) auth required
  # Format: Authorization: Basic base64("name:password")
  # Default credentials shown in source: none:webrelay
```

**Alternative protocol — Modbus/TCP:**
```yaml
protocols:
  - tcp
addressing:
  port: 502  # Modbus/TCP port, configurable per source (Advanced Network tab)
auth:
  type: none  # inferred: Modbus disabled when user account is enabled (source states password protection unavailable in Modbus)
```

**SNMP:**
```yaml
protocols:
  - tcp  # SNMP over UDP/TCP
addressing:
  port: 161  # UNRESOLVED: SNMP port not explicitly stated in source; standard UDP 161 assumed
auth:
  type: none  # inferred: community-string based (v1/v2c); SNMPv3 USM with auth/privacy protocols available
```

**MQTT:**
```yaml
protocols:
  - tcp
auth:
  type: none  # UNRESOLVED: MQTT broker auth not detailed in source
# UNRESOLVED: MQTT broker port not stated in source
```

## Traits
```yaml
# UNRESOLVED: removed routable - no input/output routing commands in source
# - routable
- powerable  # inferred: relay on/off/pulse commands present
- queryable  # inferred: state.xml/state.json query endpoints present
- levelable  # inferred: analog input values, registers, counters readable/writable
```

## Actions
```yaml
- id: set_relay
  label: Set Relay State
  kind: action
  params:
    - name: relay
      type: integer
      description: Relay number (1-4)
    - name: value
      type: integer
      description: "0=OFF, 1=ON, 2=PULSE"

- id: pulse_relay_with_duration
  label: Pulse Relay with Custom Duration
  kind: action
  params:
    - name: relay
      type: integer
      description: Relay number (1-4)
    - name: pulseTime
      type: number
      description: Pulse duration in seconds (MUST be sent BEFORE relay=value command)
    - name: value
      type: integer
      description: Must be 2 to trigger pulse

- id: set_on_time
  label: Set On Time Counter
  kind: action
  params:
    - name: relay
      type: integer
      description: Relay number (1-4)
    - name: value
      type: number
      description: Time value to set (seconds)

- id: set_total_on_time
  label: Set Total On Time Counter
  kind: action
  params:
    - name: relay
      type: integer
      description: Relay number (1-4)
    - name: value
      type: number
      description: Total time value to set (seconds)

- id: set_counter
  label: Set Counter
  kind: action
  params:
    - name: counter
      type: integer
      description: Counter number (1-4)
    - name: value
      type: number
      description: Counter value to set

- id: set_register
  label: Set Register Value
  kind: action
  params:
    - name: register
      type: integer
      description: Register number (1-4)
    - name: value
      type: number
      description: Register value to set

- id: erase_log
  label: Erase Data Log
  kind: action
  params:
    - name: erase
      type: integer
      description: Must be 1 to erase
  # UNRESOLVED: requires password if user account enabled (source states "user password will be required")

- id: erase_syslog
  label: Erase System Log
  kind: action
  params:
    - name: erase
      type: integer
      description: Must be 1 to erase
  # requires setup username/password (different from user account)
  # UNRESOLVED: per-action URL payload (query param name) not explicitly documented in source beyond relayX pattern
```

## Feedbacks
```yaml
- id: relay_state
  type: enum
  values:
    - "0"  # OFF (coil off)
    - "1"  # ON (coil energized)
  description: State of relay output

- id: digital_input_state
  type: enum
  values:
    - "0"  # off (voltage not applied)
    - "1"  # on (voltage applied)

- id: digital_io_state
  type: enum
  values:
    - "0"  # off (voltage not applied)
    - "1"  # on (voltage applied)
  description: State of digital I/O configured as output

- id: analog_input_value
  type: number
  description: Value of analog input X

- id: on_time
  type: number
  description: Time in seconds how long the input was on since last coming on

- id: total_on_time
  type: number
  description: Total time in seconds how long the input has been on

- id: counter_value
  type: number
  description: Count value associated with input

- id: frequency_value
  type: number
  description: Frequency associated with input

- id: frequency_input
  type: number
  description: Value of the X-420 frequency input

- id: vin
  type: number
  description: Scaled internal Vin measurement

- id: register_value
  type: number
  description: Value of register X

- id: device_time
  type: string
  description: Current UTC time (seconds since Jan 1 1970) from utcTime field

- id: serial_number
  type: string
  description: MAC address serial number of device

- id: timezone_offset
  type: integer
  description: Value to offset utcTime for local time

- id: one_wire_sensor
  type: number
  description: 1-Wire sensor value; NaN (x.x) if sensor not read

- id: latitude
  type: number
  description: GPS latitude coordinate (if equipped)

- id: longitude
  type: number
  description: GPS longitude coordinate (if equipped)

- id: min_record_refresh
  type: integer
  description: Minimum record refresh interval in seconds
```

## Variables
```yaml
# UNRESOLVED: no standalone settable configuration parameters beyond I/O state
# Configuration handled via setup pages (not documented in control protocol source)
```

## Events
```yaml
# SNMP traps: sent when relay changes state, sensor threshold reached, or supply voltage out of range
# Trap actions configured in Conditional and Scheduled tasks
# UNRESOLVED: specific trap payload format not documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
# Remote Services: device initiates TCP V1 connection to external server
# Connection string sent periodically; "ACK" expected within 10 seconds
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- HTTP control uses `state.xml` or `state.json` endpoint with query parameters (e.g., `state.xml?relay1=1`)
- Multiple commands can be combined: `/state.json?relay1=1&relay2=0`
- Custom names can be configured for I/O; `customState.xml/json` uses those names instead of generic relayX/digitalInputX
- Modbus connection timeout: 50 seconds without activity
- Two TCP sockets available for Modbus simultaneously
- Modbus disabled when user account is enabled (no password protection in Modbus)
- Modbus uses IEEE 754 32-bit floating point for register/analog values; endianness configurable
- Modbus function codes: 01/05/15 (coils), 02 (discrete inputs), 03/16 (holding registers)
- Modbus error: function code + 0x80; exception codes 0x01, 0x02
- SNMP community string defaults to `webrelay` for read and write (v1/v2c)
- SNMP v3 supports USM with authentication (MD5/SHA) and privacy (DES/AES) protocols
- SNMP PDUs: GetRequest, GetNextRequest, GetBulkRequest, SetRequest, Trap, Notification
- MQTT version 3.1.1 supported with Sparkplug B
- MQTT payload tokens: `${mac}`, `${ver}`, `${ser}`, `${uptime}`, `${ip}`, `${port}`, `${httpsport}`, `${dateTime}`, `${name}`, `${model}`, `${clientID}`, `${digitalInput1-4}`, `${relay1-4}`, `${vin}`, `${register1}`
- Cloud API: DAT URLs via `https://api.controlbyweb.cloud/{DAT}/state.json` or `?relayX=1` commands
- Log files: `log.txt` (data log) accessible at port 8000 if non-default HTTP port; `syslog.txt` (system events) requires setup username/password
- syslog.txt format: MM/DD/YYYY HH:MM:SS, (category): (message)
- Remote Services: device initiates TCP V1 connection to external server; "ACK" expected within 10 seconds
<!-- UNRESOLVED: default HTTP port (80) implied by examples but not explicitly stated -->
<!-- UNRESOLVED: pulse duration default (1.5 seconds mentioned in example) not confirmed as spec -->
<!-- UNRESOLVED: SNMP port (161) not stated in source -->
<!-- UNRESOLVED: MQTT broker port not stated in source -->
<!-- UNRESOLVED: specific Modbus address map requires device setup pages (not in source) -->
<!-- UNRESOLVED: digital I/O direction (input/output) configuration not described -->
<!-- UNRESOLVED: X-600M additional I/O types not detailed in source -->
<!-- UNRESOLVED: per-action URL query param names (onTime/totalOnTime/counter/register/pulseTime/erase) not explicitly documented beyond relayX -->
````

Upgrade done. Adds vs baseline: SNMP + MQTT transport blocks, HTTP Basic auth detail, `levelable` trait, `erase_syslog` action, 6 new feedbacks (`digital_io_state`, `frequency_input`, `one_wire_sensor`, `latitude`, `longitude`, `min_record_refresh`), X-400 Series model, enriched notes (Modbus FC/error codes, SNMPv3 USM, MQTT tokens, Cloud API, syslog format, Remote Services). Existing IDs + shapes preserved. Revision bumped 1→2.

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/05/400-series-users-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
retrieved_at: 2026-05-14T21:19:40.381Z
last_checked_at: 2026-07-21T21:46:25.451Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:46:25.451Z
matched_actions: 8
action_count: 8
confidence: medium
summary: "All 8 spec actions match documented protocol capabilities; transport parameters verified; coverage complete. (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact WebRelayQuad model variant not stated in source; X-400 Series referenced"
- "SNMP port not explicitly stated in source; standard UDP 161 assumed"
- "MQTT broker auth not detailed in source"
- "MQTT broker port not stated in source"
- "removed routable - no input/output routing commands in source"
- "requires password if user account enabled (source states \"user password will be required\")"
- "per-action URL payload (query param name) not explicitly documented in source beyond relayX pattern"
- "no standalone settable configuration parameters beyond I/O state"
- "specific trap payload format not documented in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "default HTTP port (80) implied by examples but not explicitly stated"
- "pulse duration default (1.5 seconds mentioned in example) not confirmed as spec"
- "SNMP port (161) not stated in source"
- "specific Modbus address map requires device setup pages (not in source)"
- "digital I/O direction (input/output) configuration not described"
- "X-600M additional I/O types not detailed in source"
- "per-action URL query param names (onTime/totalOnTime/counter/register/pulseTime/erase) not explicitly documented beyond relayX"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
