---
spec_id: admin/controlbyweb-x16s
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X16S Control Spec"
manufacturer: ControlByWeb
model_family: X16S
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X16S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/X-16S_manual_v1.1.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:03:06.654Z
last_checked_at: 2026-07-07T11:11:04.229Z
generated_at: 2026-07-07T11:11:04.229Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the X-400 Series generically with relay1..relay4 examples; the X16S-specific I/O map, relay count, digital input count, analog input count, and 1-Wire sensor count are not enumerated in the source."
  - "range not stated in source\""
  - "source does not document explicit multi-step user-defined sequences."
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
  - "X16S-specific I/O map (relay count, digital input count, analog input count, register count, 1-Wire sensor count) is not enumerated in source. Modbus address map references \"Refer to Modbus address map in setup pages\" generically."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:11:04.229Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions verified verbatim against source; HTTP, Modbus, SNMP, MQTT, Sparkplug B, Remote Services, and Cloud APIs fully represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X16S Control Spec

## Summary

The ControlByWeb X16S is a network-attached relay/digital-I/O controller. The X-400 Series (parent family documented in the source) exposes a built-in web server that responds to HTTP GET requests, speaks Modbus/TCP on port 502, supports SNMP v1/v2c/v3, and can publish/subscribe via MQTT 3.1.1 (and Sparkplug B). This spec covers the four transport interfaces and the query/control operations explicitly documented in the source.

<!-- UNRESOLVED: source describes the X-400 Series generically with relay1..relay4 examples; the X16S-specific I/O map, relay count, digital input count, analog input count, and 1-Wire sensor count are not enumerated in the source. -->

## Transport

```yaml
protocols:
  - tcp
  - http
addressing:
  port: 80
  base_url: "/"  # example: http://192.168.1.2/state.xml
  notes: "HTTP default port 80 shown in source examples; port 8000 shown as alternate when TCP port has been changed. Modbus/TCP uses port 502. MQTT broker port, SNMP port, and Remote Services TCP port not stated."
auth:
  type: basic  # optional; HTTP requests are unauthenticated when User account is disabled
  notes: "If User account is enabled, requests must include `Authorization: Basic <base64(user:password)>` header. Default credential sample in source: none:webrelay -> bm9uZTp3ZWJyZWxheQ==. Modbus is disabled when User account is enabled. SNMP v1/v2c community strings default to `webrelay`; SNMP v3 uses USM with configurable auth/privacy algorithm and password."
```

```yaml
protocols:
  - tcp  # Modbus/TCP slave (port 502; configurable under Advanced Network tab)
```

## Traits

```yaml
- powerable       # inferred from relay on/off/pulse commands
- routable        # inferred from per-relay and per-input addressing
- queryable       # inferred from state.xml/json read operations
- levelable       # inferred from register/analog-input set value commands
```

## Actions

```yaml
- id: get_state_xml
  label: Get Device State (XML)
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []
  notes: "Returns datavalues XML block; only I/O with a 'Local I/O Number' assigned appear in state.xml."

- id: get_state_json
  label: Get Device State (JSON)
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []

- id: get_custom_state_xml
  label: Get Custom State (XML)
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []
  notes: "Tag names are camelCase versions of user-configured I/O names."

- id: get_custom_state_json
  label: Get Custom State (JSON)
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

- id: relay_off
  label: Turn Relay N OFF
  kind: action
  command: "GET /state.xml?relay{n}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Relay number (1-based)

- id: relay_on
  label: Turn Relay N ON
  kind: action
  command: "GET /state.xml?relay{n}=1 HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Relay number (1-based)

- id: relay_pulse
  label: Pulse Relay N (default duration)
  kind: action
  command: "GET /state.xml?relay{n}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Relay number (1-based)
  notes: "Pulses for the Pulse Duration configured in relay setup page (1.5s in source example)."

- id: relay_pulse_custom
  label: Pulse Relay N (custom duration)
  kind: action
  command: "GET /state.xml?pulseTime{n}={seconds}&relay{n}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
      description: Relay number (1-based)
    - name: seconds
      type: integer
      description: Pulse duration in seconds; MUST appear in query string before relay{n}=2

- id: set_on_time
  label: Set On Time for Input N
  kind: action
  command: "GET /state.xml?onTime{n}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
    - name: value
      type: number

- id: set_total_on_time
  label: Set Total On Time for Input N
  kind: action
  command: "GET /state.xml?totalOnTime{n}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
    - name: value
      type: number

- id: set_counter
  label: Set Counter N
  kind: action
  command: "GET /state.xml?count{n}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
    - name: value
      type: number

- id: set_register
  label: Set Register N
  kind: action
  command: "GET /state.xml?register{n}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: n
      type: integer
    - name: value
      type: number
  notes: "Source example: register1=10.5"

- id: multi_command
  label: Multi-Command (combine args)
  kind: action
  command: "GET /state.xml?relay1=1&relay2=0 HTTP/1.1\r\n\r\n"
  params: []

- id: get_log_txt
  label: Read Data Log
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []
  notes: "Requires password if User account enabled."

- id: erase_log_txt
  label: Erase Data Log
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: get_syslog_txt
  label: Read System Log
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []
  notes: "Format: MM/DD/YYYY HH:MM:SS, (category): (message). Requires setup username and password."

- id: erase_syslog_txt
  label: Erase System Log
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: modbus_read_coils
  label: Modbus Read Coils (FC 01)
  kind: query
  command: "Modbus FC 0x01"
  params:
    - name: start_address
      type: integer
      description: Refer to Modbus address map in setup pages
    - name: coil_quantity
      type: integer
  notes: "1 bit per coil; '1' = ON, '0' = OFF. Error code: 0x81, exception 0x02."

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02)
  kind: query
  command: "Modbus FC 0x02"
  params:
    - name: start_address
      type: integer
    - name: input_quantity
      type: integer
  notes: "Error code: 0x82, exception 0x02."

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "Modbus FC 0x03"
  params:
    - name: start_address
      type: integer
    - name: input_quantity
      type: integer
      description: Must be even; 32-bit values read in pairs
  notes: "32-bit IEEE 754 floats. Endianness configurable. Little-endian example 0x800042A2 = 81.25. Sensor missing returns 0xFFFFFFFF (NaN). Error code: 0x83, exception 0x02."

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "Modbus FC 0x05, output_value=0x00 (off) | 0xFF (on)"
  params:
    - name: start_address
      type: integer
    - name: output_value
      type: integer
      description: "0x00 (off) or 0xFF (on)"
  notes: "Response mirrors requested state. Error code: 0x85; exceptions 0x01, 0x02, 0x03."

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15)
  kind: action
  command: "Modbus FC 0x0F"
  params:
    - name: start_address
      type: integer
    - name: output_quantity
      type: integer
      description: byte count = quantity/8
    - name: output_value
      type: integer
      description: "Bit pattern 0x0000-0xFFFF (e.g. 0xF0 turns off first 4 outputs, on outputs 5-8)"
  notes: "Error code: 0x8F; exceptions 0x01, 0x02, 0x03."

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16)
  kind: action
  command: "Modbus FC 0x10"
  params:
    - name: start_address
      type: integer
    - name: input_quantity
      type: integer
      description: Must be even; 32-bit values in pairs
    - name: values
      type: number
      description: IEEE 754 floats
  notes: "Acknowledged by echoing register quantity. Error code: 0x90; exceptions 0x01, 0x02."

- id: modbus_pulse_relay
  label: Modbus Pulse Relay (FC 16, 32-bit float)
  kind: action
  command: "Modbus FC 0x16, address 512-513 (PLC 40513-40514), value = pulse duration in seconds (32-bit float)"
  params:
    - name: relay
      type: integer
    - name: seconds
      type: number
  notes: "Source example is Relay 1."

- id: snmp_get
  label: SNMP GetRequest
  kind: query
  command: "SNMP GetRequest"
  params: []
  notes: "Supports v1, v2c, v3. RFC1213 objects: sysDescr (X-4xx), sysObjectID (X4xx), sysUpTime, sysName (X-4xx*). Module I/O via generated MIB file."

- id: snmp_set
  label: SNMP SetRequest
  kind: action
  command: "SNMP SetRequest"
  params: []
  notes: "Community strings default to `webrelay` for v1/v2c; v3 uses USM."

- id: snmp_trap
  label: SNMP Trap
  kind: action
  command: "SNMP Trap"
  params: []
  notes: "Triggers configured under Conditional and Scheduled tasks (relay change, sensor threshold, supply voltage out of range)."

- id: snmp_notification
  label: SNMP Notification
  kind: action
  command: "SNMP Notification"
  params: []
  notes: "SNMP v2c/v3 only. Requires response from manager; retries if no response."

- id: mqtt_publish
  label: MQTT Publish
  kind: action
  command: "MQTT PUBLISH"
  params: []
  notes: "MQTT 3.1.1. Broker defined in Broker tab. Payload tokens: ${mac}, ${ver}, ${ser}, ${uptime}, ${ip}, ${port}, ${httpsport}, ${dateTime}, ${name}, ${model}, ${clientID}, ${digitalInput1..4}, ${relay1..4}, ${vin}, ${register1}."

- id: mqtt_subscribe
  label: MQTT Subscribe
  kind: action
  command: "MQTT SUBSCRIBE"
  params: []
  notes: "Subscribes to broker defined in Broker tab to receive I/O information from other devices."

- id: sparkplug_b_publish
  label: Sparkplug B Publish
  kind: action
  command: "Sparkplug B PUBLISH"
  params: []

- id: remote_services_connect
  label: Remote Services Connect
  kind: action
  command: "Remote Services TCP V1 connection (initiated by device)"
  params: []
  notes: "Device opens TCP V1 connection at configured Connection Interval. Sends Connection String (static info + user-defined string + state.xml). Expects 3-char `ACK` within 10 seconds. Version 2.0 reserved for ControlByWeb.Cloud."

- id: cloud_dat_url_get
  label: Cloud DAT URL State Read
  kind: query
  command: "GET https://api.controlbyweb.cloud/{dat_url}/state.json HTTP/1.1\r\n\r\n"
  params: []
  notes: "Login at http://www.ControlByWeb.Cloud required."

- id: cloud_dat_url_control
  label: Cloud DAT URL Multi-Relay Control
  kind: action
  command: "GET https://api.controlbyweb.cloud/{dat_url}/state.json?relay1=1&relay2=1 HTTP/1.1\r\n\r\n"
  params: []
  notes: "Triggers multiple relays in one command; no port forwarding needed."
```

## Feedbacks

```yaml
- id: digital_input
  type: enum
  values: [0, 1]
  source_tag: "digitalInputX"

- id: on_time
  type: number
  source_tag: "onTimeX"

- id: total_on_time
  type: number
  source_tag: "totalOnTimeX"

- id: count
  type: number
  source_tag: "countX"

- id: frequency
  type: number
  source_tag: "frequencyX"

- id: relay_state
  type: enum
  values: [0, 1]
  description: "0 = off (coil off), 1 = on (coil energized)"
  source_tag: "relayX"

- id: digital_io
  type: enum
  values: [0, 1]
  source_tag: "digitalIOX"

- id: analog_input
  type: number
  source_tag: "analogInputX"

- id: vin
  type: number
  description: "Scaled internal Vin measurement"
  source_tag: "vin"

- id: frequency_input
  type: number
  source_tag: "frequencyInput"

- id: register
  type: number
  source_tag: "registerX"

- id: utc_time
  type: integer
  description: "Seconds since 1970-01-01"
  source_tag: "utcTime"

- id: onewire_sensor
  type: string
  source_tag: "oneWireSensorX"

- id: timezone_offset
  type: integer
  source_tag: "timezoneOffset"

- id: serial_number
  type: string
  source_tag: "serialNumber"
```

## Variables

```yaml
- id: register_value
  type: number
  description: "Writable numeric register; settable via state.xml?register{n}={value}"
  range: "UNRESOLVED: range not stated in source"
```

## Events

```yaml
- id: snmp_trap_relay_change
  description: "SNMP trap on relay state change (configurable)"
- id: snmp_trap_sensor_threshold
  description: "SNMP trap when sensor value reaches a configured threshold"
- id: snmp_trap_vin_range
  description: "SNMP trap when supply voltage is out of configured range"
- id: syslog_event
  description: "MM/DD/YYYY HH:MM:SS, (category): (message) - read from syslog.txt"
```

## Macros

```yaml
# UNRESOLVED: source does not document explicit multi-step user-defined sequences.
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes

- Source documents the X-400 Series generically (relay1..relay4 examples). X16S-specific I/O counts NOT stated.
- HTTP default port 80. Port 8000 shown as alternate when TCP port has been changed.
- User account enabled: HTTP requires `Authorization: Basic <base64(user:password)>`. Example: `none:webrelay` -> `bm9uZTp3ZWJyZWxheQ==`. When enabled, Modbus/TCP is disabled.
- Modbus/TCP port 502, 2 TCP sockets, 50s idle timeout.
- Modbus error response: function code + 0x80. Exceptions 0x01 (unsupported), 0x02 (bad address/quantity).
- SNMP community strings default to `webrelay`. v3 uses USM.
- MQTT 3.1.1 only. Sparkplug B = defined topic/payload structure.
- Remote Services: device-initiated outbound TCP V1; expects 3-char `ACK` within 10s.
- ControlByWeb.Cloud DAT URLs: no port forwarding; no peer-to-peer.

<!-- UNRESOLVED: X16S-specific I/O map (relay count, digital input count, analog input count, register count, 1-Wire sensor count) is not enumerated in source. Modbus address map references "Refer to Modbus address map in setup pages" generically. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2024/01/X-16S_manual_v1.1.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/support/manuals/x-400-users-manual/
  - https://controlbyweb.com/support/
retrieved_at: 2026-06-30T15:03:06.654Z
last_checked_at: 2026-07-07T11:11:04.229Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:11:04.229Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions verified verbatim against source; HTTP, Modbus, SNMP, MQTT, Sparkplug B, Remote Services, and Cloud APIs fully represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the X-400 Series generically with relay1..relay4 examples; the X16S-specific I/O map, relay count, digital input count, analog input count, and 1-Wire sensor count are not enumerated in the source."
- "range not stated in source\""
- "source does not document explicit multi-step user-defined sequences."
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
- "X16S-specific I/O map (relay count, digital input count, analog input count, register count, 1-Wire sensor count) is not enumerated in source. Modbus address map references \"Refer to Modbus address map in setup pages\" generically."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
