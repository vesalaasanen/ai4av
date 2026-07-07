---
spec_id: admin/controlbyweb-webswitch
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb Webswitch Control Spec"
manufacturer: ControlByWeb
model_family: Webswitch
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - Webswitch
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/open-api
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:16:35.526Z
last_checked_at: 2026-07-07T11:10:59.745Z
generated_at: 2026-07-07T11:10:59.745Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers the X-400 Series generically; \"Webswitch\" model variants (channel count, I/O mix) not enumerated in source. Specific model hardware I/O counts (relay count, digital input count, analog input count) are device-specific and not stated for \"Webswitch\" in this source."
  - "source documents no explicit multi-step sequences."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
  - "SNMP PDU-level command set beyond the four standard sysDescr/sysObjectID/sysUpTime/sysName objects is not enumerated in the source — full MIB must be generated per-device from setup pages. MQTT topic/payload structure beyond the listed `${token}` substitution table is not documented in the source. Sparkplug B topic/payload format referenced but not detailed."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:10:59.745Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched verbatim in source; HTTP GET endpoints, relay control codes, onTime/counter parameters, and all Modbus function codes (0x01, 0x02, 0x03, 0x05, 0x0F, 0x10) verified against protocol documentation. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb Webswitch Control Spec

## Summary
Spec for ControlByWeb Webswitch family of Ethernet relay/I/O modules, based on the X-400 Series integration document. Device exposes four control surfaces: HTTP GET requests over TCP/IP, Modbus/TCP (slave on port 502), SNMP v1/v2c/v3, and MQTT v3.1.1 (optionally with Sparkplug B). This spec enumerates the HTTP GET and Modbus function code command sets that the source documents verbatim.

<!-- UNRESOLVED: source covers the X-400 Series generically; "Webswitch" model variants (channel count, I/O mix) not enumerated in source. Specific model hardware I/O counts (relay count, digital input count, analog input count) are device-specific and not stated for "Webswitch" in this source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 80  # default HTTP port; source: "If the TCP port has been changed (not port 80)"
  base_url: "/state.xml"  # canonical endpoint, also /state.json, /customState.xml, /customState.json
auth:
  type: basic  # source: "the HTTP request will need to contain the password encoded as Base64" via Authorization: Basic header; default is no password
  description: HTTP Basic auth, Base64-encoded "name:password" sent in Authorization header. Default (no User account) is no auth. Modbus/TCP has no auth but is disabled when User account is enabled.
```

## Traits
```yaml
powerable: true  # inferred from relay on/off commands
routable: false
queryable: true  # inferred from state.xml/json read commands
levelable: false
```

## Actions
```yaml
# ============================================================
# Section 1: HTTP GET requests
# ============================================================

- id: read_state_xml
  label: Read state (XML)
  kind: query
  command: "GET /state.xml HTTP/1.1"
  params: []

- id: read_state_json
  label: Read state (JSON)
  kind: query
  command: "GET /state.json HTTP/1.1"
  params: []

- id: read_custom_state_xml
  label: Read custom state (XML)
  kind: query
  command: "GET /customState.xml HTTP/1.1"
  params: []

- id: read_custom_state_json
  label: Read custom state (JSON)
  kind: query
  command: "GET /customState.json HTTP/1.1"
  params: []

- id: set_register_via_state_xml
  label: Set register (state.xml)
  kind: action
  command: "GET /state.xml?register1={value} HTTP/1.1"
  params:
    - name: value
      type: number
      description: Numeric register value (source example: register1=25, register1=10.5)

# ---------- Relay control (state.xml/json) ----------
# source: "Commands are sent using the parameter composed of the I/O type and relay number relay X (X is replaced by 1 for relay 1, or 2 for relay 2, etc)."

- id: relay1_off
  label: Relay 1 OFF
  kind: action
  command: "GET /state.xml?relay1=0 HTTP/1.1"
  params: []

- id: relay1_on
  label: Relay 1 ON
  kind: action
  command: "GET /state.xml?relay1=1 HTTP/1.1"
  params: []

- id: relay1_pulse
  label: Relay 1 PULSE
  kind: action
  command: "GET /state.xml?relay1=2 HTTP/1.1"
  params: []

- id: relay2_off
  label: Relay 2 OFF
  kind: action
  command: "GET /state.xml?relay2=0 HTTP/1.1"
  params: []

- id: relay2_on
  label: Relay 2 ON
  kind: action
  command: "GET /state.xml?relay2=1 HTTP/1.1"
  params: []

- id: relay2_pulse
  label: Relay 2 PULSE
  kind: action
  command: "GET /state.xml?relay2=2 HTTP/1.1"
  params: []

# ---------- Pulse with explicit duration ----------
# source: "The pulseTime variable does not change the Pulse Duration in the setup page... pulseTime argument MUST come before the relay1=2 command."

- id: relay1_pulse_preset
  label: Relay 1 Pulse (preset duration, default 1.5s)
  kind: action
  command: "GET /state.json?relay1=2 HTTP/1.1"
  params: []

- id: relay1_pulse_5s
  label: Relay 1 Pulse 5 seconds
  kind: action
  command: "GET /state.json?pulseTime1=5&relay1=2 HTTP/1.1"
  params: []

- id: relay1_pulse_15s
  label: Relay 1 Pulse 15 seconds
  kind: action
  command: "GET /state.json?pulseTime1=15&relay1=2 HTTP/1.1"
  params: []

# ---------- onTime / totalOnTime ----------
- id: set_on_time1
  label: Set onTime1
  kind: action
  command: "GET /state.xml?onTime1={value} HTTP/1.1"
  params:
    - name: value
      type: number
      description: Seconds (source examples: 0, 5)

- id: set_total_on_time1
  label: Set totalOnTime1
  kind: action
  command: "GET /state.xml?totalOnTime1={value} HTTP/1.1"
  params:
    - name: value
      type: number
      description: Seconds (source examples: 0, 5)

# ---------- Counter ----------
- id: set_counter1
  label: Set counter1
  kind: action
  command: "GET /state.json?count1={value} HTTP/1.1"
  params:
    - name: value
      type: number
      description: Counter value (source example: 200)

# ---------- customState (named I/O) ----------
- id: set_custom_register_via_custom_state
  label: Set register via customState (named I/O)
  kind: action
  command: "GET /customState.xml?{customName}={value} HTTP/1.1"
  params:
    - name: customName
      type: string
      description: User-configured camelCase I/O name (source example: myRegister1)
    - name: value
      type: number
      description: Value to assign

- id: multi_relay_command_state
  label: Multiple relay commands (state.json)
  kind: action
  command: "GET /state.json?relay1={v1}&relay2={v2} HTTP/1.1"
  params:
    - name: v1
      type: string
      description: Value for relay1 (0=off, 1=on, 2=pulse)
    - name: v2
      type: string
      description: Value for relay2 (0=off, 1=on, 2=pulse)

- id: multi_relay_command_custom_state
  label: Multiple relay commands (customState.xml)
  kind: action
  command: "GET /customState.xml?relay1={v1}&relay2={v2} HTTP/1.1"
  params:
    - name: v1
      type: string
      description: Value for relay1 (0=off, 1=on, 2=pulse)
    - name: v2
      type: string
      description: Value for relay2 (0=off, 1=on, 2=pulse)

# ---------- Log files ----------
- id: read_log_txt
  label: Read data log (log.txt)
  kind: query
  command: "GET /log.txt HTTP/1.1"
  params: []

- id: erase_log_txt
  label: Erase data log
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1"
  params: []

- id: read_syslog_txt
  label: Read system log (syslog.txt)
  kind: query
  command: "GET /syslog.txt HTTP/1.1"
  params: []

- id: erase_syslog_txt
  label: Erase system log
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1"
  params: []

# ============================================================
# Section 2: Modbus/TCP (slave on port 502)
# ============================================================

- id: modbus_read_coils
  label: Modbus Read Coils
  kind: query
  command: "Modbus FC 0x01 (Read Coils)"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: coil_quantity
      type: integer
      description: Refer to Modbus map in setup pages

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs
  kind: query
  command: "Modbus FC 0x02 (Read Discrete Inputs)"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: input_quantity
      type: integer
      description: Refer to Modbus map in setup pages

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers
  kind: query
  command: "Modbus FC 0x03 (Read Holding Registers)"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: register_quantity
      type: integer
      description: Must be divisible by 2 (32-bit pairs)

- id: modbus_write_single_coil
  label: Modbus Write Single Coil
  kind: action
  command: "Modbus FC 0x05 (Write Single Coil)"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: output_value
      type: string
      description: "0x00 (Off) or 0xFF (On)"

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils
  kind: action
  command: "Modbus FC 0x0F (Write Multiple Coils)"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: output_quantity
      type: integer
      description: Refer to Modbus map in setup pages
    - name: digital_io_value
      type: string
      description: "Bit field, 0x0000-0xFFFF (e.g. 0xFFFF = first 16 outputs ON, 0xF0 = first 4 OFF, 5-8 ON)"

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers
  kind: action
  command: "Modbus FC 0x10 (Write Multiple Registers)"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus map in setup pages
    - name: register_quantity
      type: integer
      description: Must be divisible by 2; values in IEEE 754 float
```

## Feedbacks
```yaml
# ============================================================
# State returned by /state.xml and /state.json
# (Source: "XML Tags and Monitor Values Table" / "JSON Tags and Monitor Values Table")
# ============================================================

- id: digital_input
  type: enum
  values: [off, on]
  description: "Per-input (digitalInputX). 0=off (voltage not applied), 1=on (voltage applied)."

- id: on_time
  type: number
  description: "Per-input (onTimeX). Seconds the input has been on since last coming on."

- id: total_on_time
  type: number
  description: "Per-input (totalOnTimeX). Total seconds the input has been on."

- id: count
  type: number
  description: "Per-input (countX). Count value associated with input X."

- id: frequency
  type: number
  description: "Per-input (frequencyX). Frequency associated with input X."

- id: relay_state
  type: enum
  values: [off, on]
  description: "Per-relay (relayX). 0=off (coil off), 1=on (coil energized)."

- id: digital_io_state
  type: enum
  values: [off, on]
  description: "Per-DIO (digitalIOX). 0=off, 1=on."

- id: analog_input
  type: number
  description: "Per-input (analogInputX). Value of analog input X."

- id: vin
  type: number
  description: "Scaled internal Vin measurement."

- id: frequency_input
  type: number
  description: "Value of the X-420 frequency input."

- id: register
  type: number
  description: "Per-register (registerX). Value of register X."

- id: utc_time
  type: integer
  description: "Current UTC time in seconds since 1970-01-01."

- id: one_wire_sensor
  type: number
  description: "Per-sensor (oneWireSensorX). x.x = read error; 77.3 = value; '77.3 F' = value with showUnits=1."

- id: timezone_offset
  type: integer
  description: "Offset applied to utcTime for local time."

- id: serial_number
  type: string
  description: "Device MAC/serial in format 00:00:00:00:00:00."
```

## Variables
```yaml
# Settable numeric parameters exposed via state.xml/json or Modbus holding registers.

- id: register
  type: number
  description: "General-purpose register (register1, ...). Set via /state.xml?register1={value} or Modbus FC 0x10."

- id: on_time
  type: number
  description: "Per-input onTimeX. Set via /state.xml?onTime1={value}."

- id: total_on_time
  type: number
  description: "Per-input totalOnTimeX. Set via /state.xml?totalOnTime1={value}."

- id: counter
  type: number
  description: "Per-input countX. Set via /state.json?count1={value}."

- id: pulse_time
  type: number
  description: "Per-relay pulseTimeX (seconds). Must precede relayX=2 in query. Does not persist."
```

## Events
```yaml
# ============================================================
# Modbus/TCP error responses
# (Source: "When errors occur, an error code is returned. The code is comprised of the original function code plus 0x80.")
# ============================================================

- id: modbus_error_code
  type: string
  description: "Error code = original function code + 0x80. e.g. read-coils error = 0x81."

- id: modbus_exception_function_not_supported
  type: integer
  value: 1
  description: "Exception 0x01 - function code not supported (also when Modbus disabled in setup)."

- id: modbus_exception_address_range
  type: integer
  value: 2
  description: "Exception 0x02 - incorrect starting address / quantity of output combination."

- id: modbus_exception_padding_value
  type: integer
  value: 3
  description: "Exception 0x03 - padding value (single-coil write)."
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Source describes the X-400 Series family generically; spec titled "Webswitch" per operator input, but the literal I/O counts (how many relays, digital inputs, analog inputs) are model-specific and not enumerated in this source.
- Modbus/TCP runs on port 502, configurable in Advanced Network tab.
- Default HTTP port is 80; source notes non-80 ports require explicit port in URL (e.g. `http://192.168.1.2:8000/log.txt`).
- When the User account is enabled, Modbus/TCP is disabled (Modbus has no password mechanism).
- Default SNMP community strings are `webrelay` for both read and write (v1/v2c only; v3 uses USM with separate auth + privacy passwords).
- Default remote-services "ACK" expected within 10 seconds, else device closes connection.
- Connection idle timeout for Modbus: 50 seconds without data transfer.
- Modbus supports 2 concurrent TCP connections; additional connection attempts are rejected.
- 32-bit float values from Modbus follow IEEE 754; endianness is configurable (little-endian default per source example 0x800042A2 = 81.25).

<!-- UNRESOLVED: SNMP PDU-level command set beyond the four standard sysDescr/sysObjectID/sysUpTime/sysName objects is not enumerated in the source — full MIB must be generated per-device from setup pages. MQTT topic/payload structure beyond the listed `${token}` substitution table is not documented in the source. Sparkplug B topic/payload format referenced but not detailed. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/open-api
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:16:35.526Z
last_checked_at: 2026-07-07T11:10:59.745Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:10:59.745Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched verbatim in source; HTTP GET endpoints, relay control codes, onTime/counter parameters, and all Modbus function codes (0x01, 0x02, 0x03, 0x05, 0x0F, 0x10) verified against protocol documentation. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers the X-400 Series generically; \"Webswitch\" model variants (channel count, I/O mix) not enumerated in source. Specific model hardware I/O counts (relay count, digital input count, analog input count) are device-specific and not stated for \"Webswitch\" in this source."
- "source documents no explicit multi-step sequences."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
- "SNMP PDU-level command set beyond the four standard sysDescr/sysObjectID/sysUpTime/sysName objects is not enumerated in the source — full MIB must be generated per-device from setup pages. MQTT topic/payload structure beyond the listed `${token}` substitution table is not documented in the source. Sparkplug B topic/payload format referenced but not detailed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
