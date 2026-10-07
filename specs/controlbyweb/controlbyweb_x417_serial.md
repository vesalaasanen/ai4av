---
spec_id: admin/controlbyweb-x417
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X417 Control Spec"
manufacturer: ControlByWeb
model_family: X417
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X417
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/05/400-series-users-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/x417-qsg_v1.0.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/04/x-417-v19.7.pdf
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:14:30.854Z
last_checked_at: 2026-10-07T11:12:56.488Z
generated_at: 2026-10-07T11:12:56.488Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "GET /log.txt"
  - "GET /syslog.txt"
  - "RS-232C was flagged as the known protocol, but no RS-232 / serial material appears in the source document. Only TCP/IP-based protocols are documented."
  - "Modbus/TCP slave port 502 stated in source. SNMP, MQTT, and Cloud ports not specified."
  - "source conflicts on the pulse function code; no command selected"
  - "only a subset of relays (1, 2) and one register shown in source tables. X-400 Series devices may expose additional local I/O numbers; the full Modbus address map must be retrieved from the device's setup pages (per source: \"View Modbus Address Table\")."
  - "source does not describe named multi-step macro sequences on the X417 itself"
  - "no safety warnings, interlocks, or power-on sequencing documented in this excerpt"
  - "the PLC addressing example specifies `0x16`, while the Write Multiple Registers definition specifies decimal 16 (`0x10`). The pulse action retains the documented addresses and payload, with an empty command pending resolution of this source contradiction."
  - "known protocol was specified as RS-232C, but the source document contains no RS-232/serial material — only TCP/IP-based protocols (HTTP, Modbus/TCP, SNMP, MQTT). No baud rate, data bits, parity, or stop bits documented."
verification:
  verdict: verified
  checked_at: 2026-10-07T11:12:56.488Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 action units match the source, transport values are supported, and only log.txt and syslog.txt reads are unrepresented; the Modbus pulse code conflict is declared as UNRESOLVED. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X417 Control Spec

## Summary
The ControlByWeb X417 is an industrial I/O module in the X-400 Series. This spec covers its TCP/IP control surface, including HTTP GET (state.xml / state.json / customState endpoints), Modbus/TCP slave operation on port 502, SNMP v1/v2c/v3 monitoring, and MQTT 3.1.1 publish/subscribe (including Sparkplug B).

<!-- UNRESOLVED: RS-232C was flagged as the known protocol, but no RS-232 / serial material appears in the source document. Only TCP/IP-based protocols are documented. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 80  # source example: http://192.168.1.2/state.xml; also references ":8000" when port changed
auth:
  type: basic  # source: "Authorization: Basic bm9uZTp3ZWJyZWxheQ==" for requests when the User account is enabled; syslog.txt requires setup credentials
```

<!-- UNRESOLVED: Modbus/TCP slave port 502 stated in source. SNMP, MQTT, and Cloud ports not specified. -->

## Traits
```yaml
- queryable       # inferred: state.xml/json read endpoints, Modbus Read functions
- powerable       # inferred: relay on/off/pulse commands
- routable        # inferred: not explicitly routing I/O; omitted
```

## Actions
```yaml
- id: read_state_xml
  label: Read state.xml
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []

- id: read_state_json
  label: Read state.json
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []

- id: set_register_via_http
  label: Set Register 1 (HTTP)
  kind: action
  command: "GET /state.xml?register1=25 HTTP/1.1\r\n\r\n"
  params:
    - name: register1
      type: number
      description: "Register value (example: 25; floats supported per source: 10.5)"

- id: relay1_off
  label: Turn Relay 1 OFF
  kind: action
  command: "GET /state.xml?relay1=0 HTTP/1.1\r\n\r\n"
  params: []

- id: relay1_on
  label: Turn Relay 1 ON
  kind: action
  command: "GET /state.xml?relay1=1 HTTP/1.1\r\n\r\n"
  params: []

- id: relay1_pulse
  label: Pulse Relay 1 (preset duration)
  kind: action
  command: "GET /state.json?relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: relay1_pulse_custom
  label: Pulse Relay 1 (custom duration, seconds)
  kind: action
  command: "GET /state.json?pulseTime1=5&relay1=2 HTTP/1.1\r\n\r\n"
  params:
    - name: pulseTime1
      type: integer
      description: Pulse duration in seconds (pulseTime argument MUST precede relay1=2 per source)

- id: relay2_off
  label: Turn Relay 2 OFF
  kind: action
  command: "GET /state.xml?relay2=0 HTTP/1.1\r\n\r\n"
  params: []

- id: relay2_on
  label: Turn Relay 2 ON
  kind: action
  command: "GET /state.xml?relay2=1 HTTP/1.1\r\n\r\n"
  params: []

- id: relay2_pulse
  label: Pulse Relay 2
  kind: action
  command: "GET /state.xml?relay2=2 HTTP/1.1\r\n\r\n"
  params: []

- id: set_on_time
  label: Set onTime1
  kind: action
  command: "GET /state.xml?onTime1=0 HTTP/1.1\r\n\r\n"
  params:
    - name: onTime1
      type: number
      description: Time in seconds since input last came on (resets to 0 or sets value)

- id: set_total_on_time
  label: Set totalOnTime1
  kind: action
  command: "GET /state.xml?totalOnTime1=0 HTTP/1.1\r\n\r\n"
  params:
    - name: totalOnTime1
      type: number
      description: Total time in seconds input has been on

- id: set_counter
  label: Set counter1
  kind: action
  command: "GET /state.json?count1=200 HTTP/1.1\r\n\r\n"
  params:
    - name: count1
      type: number
      description: Counter value

- id: set_custom_register
  label: Set custom-named register
  kind: action
  command: "GET /customState.xml?myRegister1=10 HTTP/1.1\r\n\r\n"
  params:
    - name: myRegister1
      type: number
      description: Value for user-named register (camelCase name from customState.xml)

- id: multi_relay_command
  label: Multi-relay command (HTTP)
  kind: action
  command: "GET /customState.xml?relay1=1&relay2=0 HTTP/1.1\r\n\r\n"
  params: []

- id: erase_log_txt
  label: Erase log.txt
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: erase_syslog_txt
  label: Erase syslog.txt
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: modbus_read_coils
  label: Modbus Read Coils (FC01)
  kind: query
  command: "Modbus FC 0x01 - Read relays and digital I/O (configured as outputs). Start address & quantity from device Modbus map."
  params: []

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC02)
  kind: query
  command: "Modbus FC 0x02 - Read digital inputs and digital I/O (configured as inputs)."
  params: []

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC03)
  kind: query
  command: "Modbus FC 0x03 - Read Vin, sensors, registers, counters, analog inputs (32-bit floats, register pairs)."
  params: []

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC05)
  kind: action
  command: "Modbus FC 0x05 - Output value 0x00 (off) or 0xFF (on)."
  params:
    - name: output_value
      type: enum
      values: [0x00, 0xFF]

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC15)
  kind: action
  command: "Modbus FC 0x0F - Output value 0x0000-0xFFFF; byte count = quantity/8."
  params: []

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC16)
  kind: action
  command: "Modbus FC 0x10 - 32-bit IEEE 754 floats, little- or big-endian per device config; must be even register count."
  params: []

- id: modbus_pulse_relay
  label: Modbus Pulse Relay (32-bit float seconds; function code UNRESOLVED)
  kind: action
  command: ""  # UNRESOLVED: source conflicts on the pulse function code; no command selected
  description: "Pulse Relay 1 by writing a 32-bit float pulse duration in seconds to addresses 512-513 (PLC 40513-40514). Section 2.1.3 explicitly gives Function code 0x16 for this pulse operation, while Section 2.1.9 defines Write Multiple Registers as decimal 16 (0x10). The pulse function code remains UNRESOLVED."
  params: []

- id: cloud_state_json
  label: "Cloud API: Read state.json"
  kind: query
  command: "GET https://api.controlbyweb.cloud/{DAT_url}/state.json HTTP/1.1\r\n\r\n"
  params: []

- id: cloud_multi_relay
  label: "Cloud API: Trigger multiple relays"
  kind: action
  command: "GET https://api.controlbyweb.cloud/{DAT_url}/state.json?relay1=1&relay2=1 HTTP/1.1\r\n\r\n"
  params: []
```

<!-- UNRESOLVED: only a subset of relays (1, 2) and one register shown in source tables. X-400 Series devices may expose additional local I/O numbers; the full Modbus address map must be retrieved from the device's setup pages (per source: "View Modbus Address Table"). -->

## Feedbacks
```yaml
- id: relay_state
  type: enum
  values: [0, 1]  # 0=off (coil off), 1=on (coil energized) per source
  description: "<relayX> in state.xml/json; also returned as bit-packed Modbus Read Coils response"

- id: digital_input_state
  type: enum
  values: [0, 1]  # 0=off (voltage not applied), 1=on (voltage applied) per source
  description: "<digitalInputX> in state.xml/json; also Modbus Read Discrete Inputs"

- id: vin
  type: number
  description: Scaled internal Vin measurement (always present in state.xml/json per source)

- id: analog_input
  type: number
  description: "<analogInputX> value of analog input X"

- id: one_wire_sensor
  type: number
  description: "x.x = sensor not read; numeric value (e.g. 77.3) with optional showUnits=1 for units"

- id: register_value
  type: number
  description: "<registerX> value of register X"

- id: count_value
  type: number
  description: "<countX> count value associated with input X"

- id: frequency_value
  type: number
  description: "<frequencyX> frequency associated with input X"

- id: on_time
  type: number
  description: "<onTimeX> seconds since input last came on"

- id: total_on_time
  type: number
  description: "<totalOnTimeX> total seconds input has been on"

- id: utc_time
  type: integer
  description: "Current UTC time in seconds since 1970-01-01"

- id: timezone_offset
  type: integer
  description: "Offset to apply to utcTime for local time"

- id: serial_number
  type: string
  description: "Device MAC/serial, format 00:0C:C8:xx:xx:xx"
```

## Variables
```yaml
- id: register
  type: number
  description: "Writable register; settable via state.xml?register1={value} or Modbus FC 0x10"
  writable: true
```

## Events
```yaml
- id: snmp_trap_relay
  description: "SNMP trap sent when a relay changes state (per source §3.1.3)"

- id: snmp_trap_sensor
  description: "SNMP trap when a configured sensor value is reached"

- id: snmp_trap_vin
  description: "SNMP trap when supply voltage is out of desired range"

- id: remote_services_state
  description: "When Remote Services enabled and a logic event triggers send-state, the state.xml is sent over the open TCP V1 connection (per source §5.1)"
```

## Macros
```yaml
# UNRESOLVED: source does not describe named multi-step macro sequences on the X417 itself
# (Conditional/Scheduled tasks exist in firmware but command details are not in this excerpt)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing documented in this excerpt
```

## Notes
- Source explicitly references the X-400 Series family. The X417 is one model in that family; some examples (relay numbers, vin value) are illustrative rather than X417-specific.
- HTTP requests for state.xml require Basic authentication when the User account is enabled; log.txt also requires the user password when that account is enabled. Access to syslog.txt requires the setup username and password. The source illustrates Basic authentication with `none:webrelay` (Base64 `bm9uZTp3ZWJyZWxheQ==`); it does not identify those credentials as defaults. Default HTTP credentials are UNRESOLVED.
- Modbus/TCP uses port 502 and is disabled when the User account is enabled (Modbus has no password mechanism).
- Modbus connection times out after 50 seconds of inactivity; send a periodic read to keep it open. Two TCP sockets available.
- MQTT supports v3.1.1 and Sparkplug B. Community strings (SNMP v1/v2c) default to `webrelay`.
- Pulse relay: `pulseTime` argument MUST precede `relay1=2` in the HTTP query string.
- Modbus pulse function code is UNRESOLVED: the PLC addressing example specifies `0x16`, while the Write Multiple Registers definition specifies decimal 16 (`0x10`). The pulse action retains the documented addresses and payload, with an empty command pending resolution of this source contradiction.
- The ControlByWeb Cloud "Remote Services" V2 is reserved for ControlByWeb.Cloud and not for general use.

<!-- UNRESOLVED: known protocol was specified as RS-232C, but the source document contains no RS-232/serial material — only TCP/IP-based protocols (HTTP, Modbus/TCP, SNMP, MQTT). No baud rate, data bits, parity, or stop bits documented. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/05/400-series-users-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/x417-qsg_v1.0.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/04/x-417-v19.7.pdf
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:14:30.854Z
last_checked_at: 2026-10-07T11:12:56.488Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:12:56.488Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 action units match the source, transport values are supported, and only log.txt and syslog.txt reads are unrepresented; the Modbus pulse code conflict is declared as UNRESOLVED. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "GET /log.txt"
- "GET /syslog.txt"
- "RS-232C was flagged as the known protocol, but no RS-232 / serial material appears in the source document. Only TCP/IP-based protocols are documented."
- "Modbus/TCP slave port 502 stated in source. SNMP, MQTT, and Cloud ports not specified."
- "source conflicts on the pulse function code; no command selected"
- "only a subset of relays (1, 2) and one register shown in source tables. X-400 Series devices may expose additional local I/O numbers; the full Modbus address map must be retrieved from the device's setup pages (per source: \"View Modbus Address Table\")."
- "source does not describe named multi-step macro sequences on the X417 itself"
- "no safety warnings, interlocks, or power-on sequencing documented in this excerpt"
- "the PLC addressing example specifies `0x16`, while the Write Multiple Registers definition specifies decimal 16 (`0x10`). The pulse action retains the documented addresses and payload, with an empty command pending resolution of this source contradiction."
- "known protocol was specified as RS-232C, but the source document contains no RS-232/serial material — only TCP/IP-based protocols (HTTP, Modbus/TCP, SNMP, MQTT). No baud rate, data bits, parity, or stop bits documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
