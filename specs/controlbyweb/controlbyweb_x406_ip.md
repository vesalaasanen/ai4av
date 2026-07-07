---
spec_id: admin/controlbyweb-x406
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X-406 Control Spec"
manufacturer: ControlByWeb
model_family: X-406
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X-406
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
retrieved_at: 2026-06-30T15:31:43.563Z
last_checked_at: 2026-07-07T12:27:14.039Z
generated_at: 2026-07-07T12:27:14.039Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SNMP, MQTT/Sparkplug B, and ControlByWeb.Cloud DAT URL payload details are described at a feature level in source but lack per-action opcode granularity; left as Notes only."
  - "param template uses {io}"
  - "register/index ranges per X-406 model not stated in this excerpt;"
  - "source describes unsolicited MQTT publishes and SNMP traps/notifications"
  - "source does not describe multi-step client-side sequences; pulse"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "per-OID SNMP MIB structure, MQTT topic/payload schemas, Sparkplug B metric definitions, Remote Services TCP V1 connection-string format (beyond the \"send state.xml, expect 3-char ACK within 10s\" note) — source describes these as features without machine-protocol-grade detail."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:27:14.039Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 actions matched literally in source; HTTP GET endpoints, Modbus function codes, and transport parameters (port 80, no auth default) verified; full coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X-406 Control Spec

## Summary

The ControlByWeb X-406 is an Ethernet-attached industrial I/O module (relay + digital/analog I/O, 1-Wire sensor support) controllable over TCP/IP. The spec covers HTTP GET-based control of state.xml/state.json and customState.xml/customState.json endpoints, plus Modbus/TCP slave on port 502.

<!-- UNRESOLVED: SNMP, MQTT/Sparkplug B, and ControlByWeb.Cloud DAT URL payload details are described at a feature level in source but lack per-action opcode granularity; left as Notes only. -->

## Transport
```yaml
protocols:
  - tcp  # HTTP GET control plane
  - tcp  # Modbus/TCP slave (port 502, separate socket pool)
addressing:
  port: 80  # default HTTP; customState/state files served from same port
  base_url: "http://{device-ip}/"
auth:
  type: none  # inferred: source documents "No Password" path as the default; auth (HTTP Basic) is optional per device setup
```

## Traits
```yaml
- powerable       # inferred from relay on/off commands
- routable        # inferred from per-relay select/control commands (relay1..relayN)
- queryable       # inferred from state.xml/json GET endpoints and Modbus read functions
- levelable       # inferred from register X set-value commands (analog-ish writable values)
```

## Actions
```yaml
# HTTP GET control - state.xml / state.json endpoints (TCP/80, default)
- id: get_state_xml
  label: Get State (XML)
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []
  notes: >
    Returns <datavalues> with relayX, digitalInputX, analogInputX, vin,
    registerX, onTimeX, totalOnTimeX, countX, frequencyX, oneWireSensorX,
    utcTime, timezoneOffset, serialNumber. Only I/O assigned a Local I/O
    Number appears.

- id: get_state_json
  label: Get State (JSON)
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []
  notes: >
    JSON equivalent of state.xml. Also includes lat, long, minRecRefresh
    when relevant. Same I/O filtering rule as state.xml.

- id: get_custom_state_xml
  label: Get Custom State (XML)
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []
  notes: Tag names use user-configurable Camel-case labels (e.g. myRegister1).

- id: get_custom_state_json
  label: Get Custom State (JSON)
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

- id: set_register_via_state_xml
  label: Set Register (state.xml)
  kind: action
  command: "GET /state.xml?register1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: number
      description: Numeric value (e.g. 10.5)

- id: set_relay_off_xml
  label: Set Relay OFF (state.xml)
  kind: action
  command: "GET /state.xml?relay{relay}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)

- id: set_relay_on_xml
  label: Set Relay ON (state.xml)
  kind: action
  command: "GET /state.xml?relay{relay}=1 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)

- id: pulse_relay_xml
  label: Pulse Relay (state.xml, preset duration)
  kind: action
  command: "GET /state.xml?relay{relay}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)
  notes: Pulse width = Pulse Duration from relay setup page.

- id: pulse_relay_custom_duration_json
  label: Pulse Relay custom duration (state.json)
  kind: action
  command: "GET /state.json?pulseTime{relay}={seconds}&relay{relay}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay number (1-based)
    - name: seconds
      type: number
      description: Pulse duration in seconds. MUST precede relay{N}=2 in query string.
  notes: pulseTime argument must come before relay{N}=2 in query string.

- id: set_on_time_xml
  label: Set onTime counter (state.xml)
  kind: action
  command: "GET /state.xml?onTime{io}=0 HTTP/1.1\r\n\r\n"  # UNRESOLVED: param template uses {io}
  params:
    - name: io
      type: integer
      description: I/O number (1-based)

- id: set_total_on_time_xml
  label: Set totalOnTime counter (state.xml)
  kind: action
  command: "GET /state.xml?totalOnTime{io}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: I/O number (1-based)

- id: set_counter_xml
  label: Set count counter (state.xml)
  kind: action
  command: "GET /state.xml?count{io}=0 HTTP/1.1\r\n\r\n"
  params:
    - name: io
      type: integer
      description: I/O number (1-based)

- id: multi_command_xml
  label: Combined XML/JSON multi-command
  kind: action
  command: "GET /state.xml?relay1=1&relay2=0 HTTP/1.1\r\n\r\n"
  params:
    - name: relay1_value
      type: integer
      description: Value for relay1 (0=off, 1=on, 2=pulse)
    - name: relay2_value
      type: integer
      description: Value for relay2 (0=off, 1=on, 2=pulse)

- id: erase_log_txt
  label: Erase log.txt
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []
  notes: Requires setup password if User account enabled.

- id: get_log_txt
  label: Read log.txt
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_syslog_txt
  label: Erase syslog.txt
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []
  notes: Requires setup username + password.

- id: get_syslog_txt
  label: Read syslog.txt
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []

# Modbus/TCP (slave on port 502, two simultaneous sockets; per-IO address map is device-specific)
- id: modbus_read_coils
  label: Modbus Read Coils (FC 01)
  kind: query
  command: "Modbus FC 0x01 (Read Coils)"
  params:
    - name: start_address
      type: integer
      description: Refer to device Modbus Address Table (Setup > Advanced Network)
    - name: coil_quantity
      type: integer
      description: Multiple outputs may be read; sum of start+qty <= max coil count
  notes: Bit 0 of response = state of start_address coil. 1=ON, 0=OFF. Error code 0x81, exception 0x02.

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02)
  kind: query
  command: "Modbus FC 0x02 (Read Discrete Inputs)"
  params:
    - name: start_address
      type: integer
      description: Refer to device Modbus map
    - name: input_quantity
      type: integer
  notes: Reads digital inputs + digital I/O configured as inputs. Error code 0x82, exception 0x02.

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "Modbus FC 0x03 (Read Holding Registers)"
  params:
    - name: start_address
      type: integer
      description: Analog inputs, registers, counters, vin; 32-bit floats read as 2-register pairs
    - name: register_quantity
      type: integer
      description: Must be divisible by 2
  notes: IEEE 754 float, little- or big-endian per Advanced Network setting. NaN (0xFFFFFFFF) if sensor missing.

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "Modbus FC 0x05 (Write Single Coil), value 0x00=OFF, 0xFF=ON"
  params:
    - name: start_address
      type: integer
    - name: value
      type: integer
      enum: [0, 255]
      description: 0x00=OFF, 0xFF=ON
  notes: Response mirrors request. Error code 0x85.

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15)
  kind: action
  command: "Modbus FC 0x0F (Write Multiple Coils), 0x0000=OFF, 0xFFFF=ON"
  params:
    - name: start_address
      type: integer
    - name: quantity
      type: integer
    - name: value_bytes
      type: string
      description: Byte(s) of bitmask, e.g. 0xFFFF / 0xF0
  notes: Byte count = quantity/8. Error code 0x8F.

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16)
  kind: action
  command: "Modbus FC 0x10 (Write Multiple Registers), IEEE 754 float"
  params:
    - name: start_address
      type: integer
    - name: register_quantity
      type: integer
      description: Must be divisible by 2
    - name: float_value
      type: number
      description: e.g. 81.25 → 0x800042A2 little-endian, 0x42A28000 big-endian
  notes: Acknowledged with register quantity written. Error code 0x90.

- id: modbus_pulse_relay_register
  label: Modbus Pulse Relay via holding-register pair
  kind: action
  command: "Modbus FC 0x10 (Write Multiple Registers) at addresses 512-513, 32-bit float seconds"
  params:
    - name: seconds
      type: number
      description: Pulse duration as 32-bit IEEE 754 float
  notes: Per source - relay1 pulse duration address 512-513 (PLC 40513-40514).
```

## Feedbacks
```yaml
- id: relay_state
  type: enum
  values: [off, on, pulse]
  source: "<relayX>0=off, 1=on, 2=pulse</relayX>"

- id: digital_input_state
  type: enum
  values: [off, on]
  source: "<digitalInputX>0=off (no voltage), 1=on (voltage applied)</digitalInputX>"

- id: digital_io_state
  type: enum
  values: [off, on]
  source: "<digitalIOX> when configured as input or output</digitalIOX>"

- id: analog_input_value
  type: number
  source: "<analogInputX>Value of analog input X</analogInputX>"

- id: vin_value
  type: number
  source: "<vin>Scaled internal Vin measurement</vin>"

- id: register_value
  type: number
  source: "<registerX>Value of the register X</registerX>"

- id: on_time_value
  type: number
  source: "<onTimeX>seconds since input last came on</onTimeX>"

- id: total_on_time_value
  type: number
  source: "<totalOnTimeX>total seconds input has been on</totalOnTimeX>"

- id: count_value
  type: number
  source: "<countX>count value associated with input X</countX>"

- id: frequency_value
  type: number
  source: "<frequencyX>frequency associated with input X</frequencyX>"

- id: one_wire_sensor_value
  type: string
  source: "<oneWireSensorX>77.3=sensor value, 77.3 F=with units, x.x=read error</oneWireSensorX>"

- id: utc_time
  type: integer
  source: "<utcTime>seconds since 1970-01-01</utcTime>"

- id: timezone_offset
  type: integer
  source: "<timezoneOffset>offset to apply to utcTime for local time</timezoneOffset>"

- id: serial_number
  type: string
  source: "<serialNumber>XX:XX:XX:XX:XX:XX</serialNumber>"
```

## Variables
```yaml
- id: register1
  type: number
  settable: true
  source: "register1 (state.xml?register1=10.5)"
  description: General-purpose writable numeric register.

- id: registerN
  type: number
  settable: true
  description: Additional registers as configured. Names mirror user config in customState.

- id: onTime_io
  type: number
  settable: true
  source: "state.xml?onTime{io}=N"

- id: totalOnTime_io
  type: number
  settable: true
  source: "state.xml?totalOnTime{io}=N"

- id: count_io
  type: number
  settable: true
  source: "state.xml?count{io}=N"

# UNRESOLVED: register/index ranges per X-406 model not stated in this excerpt;
# source refers to "the Modbus Address Table" and "Local I/O Number" assignment
# without enumerating how many relays/digital I/O/analog inputs the X-406 itself ships.
```

## Events
```yaml
# UNRESOLVED: source describes unsolicited MQTT publishes and SNMP traps/notifications
# at a feature level ("when a relay changes state", "when sensor value reached",
# "when supply voltage is out of range") but does not enumerate the on-wire payload
# format. Documented as features only; no per-event spec entries can be authored
# without fabricating payload structure.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step client-side sequences; pulse
# commands and combined query-string commands are atomic from the client's POV.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. X-406 is a generic I/O module; relay
# control is unsupervised from the device's perspective.
```

## Notes

- HTTP control plane is plain TCP/80 by default; `state.xml` and `state.json` mirror each other (XML is canonical, JSON is convenience form).
- `pulseTime{N}` MUST appear in the query string before `relay{N}=2` or it is ignored.
- Auth is optional: if the device's User account is enabled, requests must include `Authorization: Basic <base64(user:pass)>` where the default user `none:webrelay` encodes to `bm9uZTp3ZWJyZWxheQ==`.
- Modbus/TCP is disabled whenever the User account is enabled (Modbus has no password mechanism); two simultaneous TCP sockets; connection times out after 50 s of idle — send a periodic read to keep it open.
- Modbus error responses set the high bit of the function code (e.g. 0x01 → 0x81); common exception is 0x02 (bad address/qty combo).
- 32-bit sensor values span two 16-bit Modbus registers and must be read/written in even pairs.
- Modbus address map is device-specific — generated dynamically from configured I/O; consult Setup > Advanced Network > "View Modbus Address Table" rather than hard-coding offsets. The source's worked examples use illustrative addresses only.
- SNMP v1/v2c community strings default to `webrelay` for both read and write; v3 uses USM (auth + privacy protocols). Source does not enumerate per-OID MIB structure — generate from device.
- MQTT supports v3.1.1 and Sparkplug B; payload tokens listed in source are placeholders like `${relay1}`, `${vin}`, `${dateTime}` for use in publish templates, not standalone commands.
- ControlByWeb.Cloud DAT URL form: `https://api.controlbyweb.cloud/{dat-url}/state.json?relay1=1&relay2=1` — useful when port-forwarding is unavailable.

<!-- UNRESOLVED: per-OID SNMP MIB structure, MQTT topic/payload schemas, Sparkplug B metric definitions, Remote Services TCP V1 connection-string format (beyond the "send state.xml, expect 3-char ACK within 10s" note) — source describes these as features without machine-protocol-grade detail. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/wp-content/uploads/2025/05/400-series-users-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
retrieved_at: 2026-06-30T15:31:43.563Z
last_checked_at: 2026-07-07T12:27:14.039Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:27:14.039Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 actions matched literally in source; HTTP GET endpoints, Modbus function codes, and transport parameters (port 80, no auth default) verified; full coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SNMP, MQTT/Sparkplug B, and ControlByWeb.Cloud DAT URL payload details are described at a feature level in source but lack per-action opcode granularity; left as Notes only."
- "param template uses {io}"
- "register/index ranges per X-406 model not stated in this excerpt;"
- "source describes unsolicited MQTT publishes and SNMP traps/notifications"
- "source does not describe multi-step client-side sequences; pulse"
- "source contains no explicit safety warnings, interlock procedures,"
- "per-OID SNMP MIB structure, MQTT topic/payload schemas, Sparkplug B metric definitions, Remote Services TCP V1 connection-string format (beyond the \"send state.xml, expect 3-char ACK within 10s\" note) — source describes these as features without machine-protocol-grade detail."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
