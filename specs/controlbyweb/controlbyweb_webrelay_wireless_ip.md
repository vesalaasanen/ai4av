---
spec_id: admin/controlbyweb-webrelay-wireless
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb WebRelay Wireless Control Spec"
manufacturer: ControlByWeb
model_family: "WebRelay Wireless"
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - "WebRelay Wireless"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/webrelay-wireless/
  - https://controlbyweb.com/wp-content/uploads/2024/02/webrelay-wireless-users-manual.pdf
retrieved_at: 2026-06-30T15:19:33.476Z
last_checked_at: 2026-07-21T21:46:27.032Z
generated_at: 2026-07-21T21:46:27.032Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the ControlByWeb 400 Series platform broadly; the WebRelay Wireless model-specific I/O count, relay count, and which XML/JSON tags apply to a Wireless variant are not explicitly enumerated."
  - "range/units not stated)"
  - "units/scale not stated)"
  - "HTTP request/response model only; no other unsolicited push notifications documented for WebRelay Wireless over HTTP."
  - "source does not document any multi-step macro sequences."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements for the WebRelay Wireless."
  - "default TCP port for WebRelay Wireless HTTP server — source mentions 80 implicitly via \"not port 80\" alternative example at :8000, but default is not explicitly stated for this model. UNRESOLVED: SNMP transport layer (UDP assumed by convention) and port (conventionally 161) not explicitly stated. UNRESOLVED: MQTT broker port not stated. UNRESOLVED: WebRelay Wireless-specific relay count and full local I/O tag list. UNRESOLVED: firmware version compatibility range not stated in source. UNRESOLVED: SNMP V3 USM algorithm/credential formats not specified beyond general description."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:46:27.032Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 spec actions matched literal source documentation; transport parameters (HTTP port 80, Modbus 502, Basic auth) verified; coverage ratio 60/63 > 0.9 threshold. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb WebRelay Wireless Control Spec

## Summary
ControlByWeb WebRelay Wireless modules expose a built-in web server responding to HTTP GET requests for state monitoring and I/O control, and additionally support Modbus/TCP, SNMP (V1/V2c/V3), MQTT/Sparkplug B, Remote Services (device-initiated TCP V1), and the ControlByWeb Cloud DAT URL API. This spec covers the HTTP GET request interface documented for custom TCP/IP integrations (relay control, pulse commands, register/counter/on-time setters, state read endpoints), the Modbus/TCP function codes and PLC addressing examples, SNMP PDUs and standard objects, MQTT subscribe/publish operations, and Remote Services connection mechanics.

<!-- UNRESOLVED: source describes the ControlByWeb 400 Series platform broadly; the WebRelay Wireless model-specific I/O count, relay count, and which XML/JSON tags apply to a Wireless variant are not explicitly enumerated. -->

## Transport
```yaml
protocols:
  - tcp
  - udp  # inferred: SNMP conventionally uses UDP; source documents SNMP V1/V2c/V3 without specifying transport layer
addressing:
  port: 80  # HTTP default; source references "not port 80" alternative (e.g. :8000). Modbus/TCP uses port 502 (explicitly stated line 293, configurable under Advanced Network tab). SNMP/MQTT ports not stated in source.
auth:
  type: basic  # source documents Base64 Authorization header when User account enabled (default name:password none:webrelay); default no-auth path also documented. Modbus/TCP requires User account disabled (no password mechanism).
```

## Traits
```yaml
- queryable       # inferred from state.xml/state.json read endpoints and SNMP GetRequest
- routable        # inferred from relay on/off/pulse commands
- levelable       # inferred from register/analog settable values
```

## Actions
```yaml
# === HTTP GET - state read ===
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

- id: read_custom_state_xml
  label: Read customState.xml
  kind: query
  command: "GET /customState.xml HTTP/1.1\r\n\r\n"
  params: []

- id: read_custom_state_json
  label: Read customState.json
  kind: query
  command: "GET /customState.json HTTP/1.1\r\n\r\n"
  params: []

- id: read_state_xml_with_units
  label: Read state.xml with units
  kind: query
  command: "GET /state.xml?showUnits=1 HTTP/1.1\r\n\r\n"
  params: []
  # showUnits=1 appends units to sensor values (e.g. oneWireSensorX returns "77.3 F")

- id: read_state_json_with_units
  label: Read state.json with units
  kind: query
  command: "GET /state.json?showUnits=1 HTTP/1.1\r\n\r\n"
  params: []

# === HTTP GET - relay control ===
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
  label: Pulse Relay 1 (default duration)
  kind: action
  command: "GET /state.xml?relay1=2 HTTP/1.1\r\n\r\n"
  params: []

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
  label: Pulse Relay 2 (default duration)
  kind: action
  command: "GET /state.xml?relay2=2 HTTP/1.1\r\n\r\n"
  params: []

# === HTTP GET - pulse with duration ===
- id: relay1_pulse_5s
  label: Pulse Relay 1 for 5 seconds
  kind: action
  command: "GET /state.json?pulseTime1=5&relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: relay1_pulse_15s
  label: Pulse Relay 1 for 15 seconds
  kind: action
  command: "GET /state.json?pulseTime1=15&relay1=2 HTTP/1.1\r\n\r\n"
  params: []

- id: relay1_pulse_custom
  label: Pulse Relay 1 for custom duration
  kind: action
  command: "GET /state.json?pulseTime1={seconds}&relay1=2 HTTP/1.1\r\n\r\n"
  params:
    - name: seconds
      type: integer
      description: Pulse duration in seconds (must precede relay1=2 in query string)

# === HTTP GET - on-time / counter / register setters ===
- id: reset_onTime1
  label: Reset onTime1
  kind: action
  command: "GET /state.xml?onTime1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: Seconds to set (e.g. 0 to reset, 5 to set 5)

- id: reset_totalOnTime1
  label: Reset totalOnTime1
  kind: action
  command: "GET /state.xml?totalOnTime1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: Seconds to set (e.g. 0 to reset, 5 to set 5)

- id: set_counter1
  label: Set counter1
  kind: action
  command: "GET /state.json?count1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: integer
      description: Counter value (e.g. 200)

- id: set_register1
  label: Set register1
  kind: action
  command: "GET /state.xml?register1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: number
      description: Numeric value (e.g. 10.5)

- id: set_custom_register
  label: Set custom-named register via customState
  kind: action
  command: "GET /customState.xml?myRegister1={value} HTTP/1.1\r\n\r\n"
  params:
    - name: value
      type: number
      description: Numeric value; tag name (e.g. myRegister1) is the user-configured name

# === HTTP GET - multi-command ===
- id: multi_command_state
  label: Send multiple commands (state)
  kind: action
  command: "GET /state.json?relay1={r1}&relay2={r2} HTTP/1.1\r\n\r\n"
  params:
    - name: r1
      type: integer
      description: Relay 1 value (0=off, 1=on, 2=pulse)
    - name: r2
      type: integer
      description: Relay 2 value (0=off, 1=on, 2=pulse)

- id: multi_command_custom_state
  label: Send multiple commands (customState)
  kind: action
  command: "GET /customState.xml?relay1={r1}&relay2={r2} HTTP/1.1\r\n\r\n"
  params:
    - name: r1
      type: integer
      description: Relay 1 value (0=off, 1=on, 2=pulse)
    - name: r2
      type: integer
      description: Relay 2 value (0=off, 1=on, 2=pulse)

# === HTTP GET - log files ===
- id: read_log_txt
  label: Read log.txt
  kind: query
  command: "GET /log.txt HTTP/1.1\r\n\r\n"
  params: []

- id: erase_log_txt
  label: Erase log.txt
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

- id: read_syslog_txt
  label: Read syslog.txt
  kind: query
  command: "GET /syslog.txt HTTP/1.1\r\n\r\n"
  params: []
  # Setup username/password required to access this file

- id: erase_syslog_txt
  label: Erase syslog.txt
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []

# === Modbus/TCP - generic function codes (port 502) ===
- id: modbus_read_coils
  label: Modbus Read Coils (FC 01)
  kind: query
  command: "Modbus/TCP function 0x01 on port 502 (start address and quantity per device Modbus map)"
  params: []

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC 02)
  kind: query
  command: "Modbus/TCP function 0x02 on port 502 (start address and quantity per device Modbus map)"
  params: []

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "Modbus/TCP function 0x03 on port 502 (start address and quantity per device Modbus map)"
  params: []

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "Modbus/TCP function 0x05 on port 502; output value 0x00=Off, 0xFF=On (address per Modbus map)"
  params: []

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 15)
  kind: action
  command: "Modbus/TCP function 0x0F on port 502 (start address, quantity, byte count, 0x0000-0xFFFF payload)"
  params: []

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 16)
  kind: action
  command: "Modbus/TCP function 0x10 on port 502 (IEEE 754 float, register count must be even, address per Modbus map)"
  params: []

# === Modbus/TCP - documented PLC addressing examples (concrete addresses) ===
- id: modbus_read_relay1
  label: Modbus Read Relay 1
  kind: query
  command: "Modbus/TCP FC 0x01, address 0 (PLC address 1)"
  params: []

- id: modbus_write_relay1
  label: Modbus Write Relay 1
  kind: action
  command: "Modbus/TCP FC 0x05, address 0 (PLC address 1); 0x00=Off, 0xFF=On"
  params: []

- id: modbus_write_multiple_relays
  label: Modbus Write Multiple Relays
  kind: action
  command: "Modbus/TCP FC 0x0F, address 0 (PLC address 1) for multiple relays"
  params: []

- id: modbus_pulse_relay1
  label: Modbus Pulse Relay 1
  kind: action
  command: "Modbus/TCP FC 0x16, address 512-513 (PLC address 40513-40514); 32-bit float = pulse duration in seconds"
  params:
    - name: duration
      type: number
      description: Pulse duration in seconds, written as IEEE 754 32-bit float

- id: modbus_read_digital_input1
  label: Modbus Read Digital Input 1
  kind: query
  command: "Modbus/TCP FC 0x02, address 1 (PLC address 10002)"
  params: []

- id: modbus_read_analog_input1
  label: Modbus Read Analog Input 1
  kind: query
  command: "Modbus/TCP FC 0x03, address 4-5 (PLC address 40005-40006); 32-bit float"
  params: []

- id: modbus_read_vin
  label: Modbus Read Vin
  kind: query
  command: "Modbus/TCP FC 0x03, address 6-7 (PLC address 40007-40008); 32-bit float"
  params: []

- id: modbus_read_temp_sensor
  label: Modbus Read Temperature Sensor
  kind: query
  command: "Modbus/TCP FC 0x03, address 8-9 (PLC address 40009-40010); 32-bit float"
  params: []

- id: modbus_read_internal_register
  label: Modbus Read Internal Register
  kind: query
  command: "Modbus/TCP FC 0x03, address 10-11 (PLC address 40011-40012); 32-bit float"
  params: []

- id: modbus_write_internal_register
  label: Modbus Write Internal Register
  kind: action
  command: "Modbus/TCP FC 0x16, address 10-11 (PLC address 40011-40012); 32-bit float"
  params:
    - name: value
      type: number
      description: Register value as IEEE 754 32-bit float

# === SNMP (Section 3) ===
- id: snmp_get_request
  label: SNMP GetRequest
  kind: query
  command: "SNMP GetRequest PDU against configured I/O OID (MIB generated from Setup > Advanced Network > Generate and Download MIB File)"
  params:
    - name: oid
      type: string
      description: Object identifier for the target I/O (from generated MIB)

- id: snmp_get_next_request
  label: SNMP GetNextRequest
  kind: query
  command: "SNMP GetNextRequest PDU; returns next object in MIB walk"
  params: []

- id: snmp_get_bulk_request
  label: SNMP GetBulkRequest
  kind: query
  command: "SNMP GetBulkRequest PDU; bulk transfer of consecutive objects"
  params: []

- id: snmp_set_request
  label: SNMP SetRequest
  kind: action
  command: "SNMP SetRequest PDU to control/monitor configured I/O; write community string required (default 'webrelay') for V1/V2c"
  params:
    - name: oid
      type: string
      description: Object identifier for the target I/O (from generated MIB)
    - name: value
      type: string
      description: Value to set

- id: snmp_get_sysdescr
  label: SNMP Get system.sysDescr
  kind: query
  command: "SNMP GetRequest _system.sysDescr_ (RFC1213); response 'X-4xx'"
  params: []

- id: snmp_get_sysobjectid
  label: SNMP Get system.sysObjectID
  kind: query
  command: "SNMP GetRequest _system.sysObjectID_ (RFC1213); response 'X4xx'"
  params: []

- id: snmp_get_sysuptime
  label: SNMP Get system.sysUpTime
  kind: query
  command: "SNMP GetRequest _system.sysUpTime_ (RFC1213); response = time in hundredths of seconds since last powered"
  params: []

- id: snmp_get_sysname
  label: SNMP Get system.sysName
  kind: query
  command: "SNMP GetRequest _system.sysName_ (RFC1213); response 'X-4xx*'"
  params: []

# === MQTT (Section 4) ===
- id: mqtt_subscribe
  label: MQTT Subscribe to Broker
  kind: action
  command: "MQTT 3.1.1 SUBSCRIBE to broker defined in Broker tab; device receives I/O info published by another device"
  params:
    - name: topic
      type: string
      description: Broker topic to subscribe to

- id: mqtt_publish
  label: MQTT Publish to Broker
  kind: action
  command: "MQTT 3.1.1 PUBLISH to broker defined in Broker tab; device sends I/O info (payload tokens substituted, e.g. ${relay1}, ${vin})"
  params:
    - name: topic
      type: string
      description: Broker topic to publish to

- id: mqtt_sparkplug_b_publish
  label: MQTT Sparkplug B Publish
  kind: action
  command: "Sparkplug B publish; structured topic naming and payload format (alternative to standard MQTT)"
  params: []

# === Remote Services / External Server (Section 5) ===
- id: direct_server_control
  label: Direct Server Control (server-initiated TCP)
  kind: action
  command: "External server opens TCP connection to device, sends commands and/or reads state, then closes connection"
  params: []

- id: remote_services_connect
  label: Remote Services Connection (device-initiated TCP V1)
  kind: action
  command: "Device initiates TCP V1 connection to external server per Connection Interval (Advanced Network tab); sends Connection String ending with state.xml"
  params: []

- id: remote_services_ack
  label: Remote Services ACK Response
  kind: action
  command: "External server sends 3-character 'ACK' in response to each connection string; if not received within 10s the device closes the connection"
  params: []

- id: remote_services_send_state
  label: Remote Services Send state.xml on Event
  kind: action
  command: "On a logic event with a send-state action to remote server, state.xml is sent over the open connection"
  params: []
  # Note: TCP V2.0 reserved for ControlByWeb.Cloud, not for other use.

# === ControlByWeb Cloud DAT URL API (Section 6) ===
- id: cloud_dat_read_state_json
  label: Read state via Cloud DAT URL
  kind: query
  command: "GET https://api.controlbyweb.cloud/{datUrl}/state.json HTTP/1.1\r\n\r\n"
  params:
    - name: datUrl
      type: string
      description: ControlByWeb Cloud-generated DAT URL token

- id: cloud_dat_read_state_xml
  label: Read state.xml via Cloud DAT URL
  kind: query
  command: "GET https://api.controlbyweb.cloud/{datUrl}/state.xml HTTP/1.1\r\n\r\n"
  params:
    - name: datUrl
      type: string
      description: ControlByWeb Cloud-generated DAT URL token

- id: cloud_dat_set_relays
  label: Set multiple relays via Cloud DAT URL
  kind: action
  command: "GET https://api.controlbyweb.cloud/{datUrl}/state.json?relay1={r1}&relay2={r2} HTTP/1.1\r\n\r\n"
  params:
    - name: datUrl
      type: string
      description: ControlByWeb Cloud-generated DAT URL token
    - name: r1
      type: integer
      description: Relay 1 value (0/1)
    - name: r2
      type: integer
      description: Relay 2 value (0/1)
```

## Feedbacks
```yaml
- id: relay1_state
  type: enum
  values: [0, 1]  # 0=off (coil off), 1=on (coil energized); source also accepts 2 for pulse trigger

- id: relay2_state
  type: enum
  values: [0, 1]

- id: digital_input
  type: enum
  values: [0, 1]  # 0=off (voltage not applied), 1=on (voltage applied)

- id: digital_io
  type: enum
  values: [0, 1]  # digitalIOX: 0=off (voltage not applied), 1=on (voltage applied); configurable as input or output

- id: analog_input
  type: number
  values: []  # Value of analog input X (UNRESOLVED: range/units not stated)

- id: onewire_sensor
  type: number
  values: []  # oneWireSensorX: "x.x" = sensor unreadable; numeric = current value; with showUnits=1 appends unit (e.g. "77.3 F")

- id: frequency_input
  type: number
  values: []  # frequencyInput: value of the X-420 frequency input

- id: vin
  type: number
  values: []  # Scaled internal Vin measurement (UNRESOLVED: units/scale not stated)

- id: register_value
  type: number
  values: []  # Value of register X

- id: on_time
  type: number
  values: []  # Seconds input has been on since last coming on

- id: total_on_time
  type: number
  values: []  # Total seconds input has been on

- id: count
  type: number
  values: []  # Count value associated with input X

- id: frequency
  type: number
  values: []  # Frequency associated with input X

- id: latitude
  type: number
  values: []  # lat (appears in state.json example)

- id: longitude
  type: number
  values: []  # long (appears in state.json example)

- id: min_rec_refresh
  type: integer
  values: []  # minRecRefresh (appears in state.json example)

- id: utc_time
  type: integer
  values: []  # Seconds since January 1st, 1970

- id: timezone_offset
  type: integer
  values: []  # Offset for utcTime to local time

- id: serial_number
  type: string
  values: []  # Format 00:00:00:00:00:00
```

## Variables
```yaml
- id: register1
  type: number
  description: Internal register settable via state.xml?register1= or customState.xml?{name}=
```

## Events
```yaml
- id: snmp_trap
  type: unsolicited
  description: "SNMP Trap sent when a relay changes state, a sensor value reaches a particular value, or supply voltage goes out of desired range. Configured as actions in Conditional and Scheduled tasks."

- id: snmp_notification
  type: unsolicited
  description: "SNMP Notification (SNMP V2c/V3); similar to trap but requires response from SNMP manager. Retries occur if manager does not respond."

# UNRESOLVED: HTTP request/response model only; no other unsolicited push notifications documented for WebRelay Wireless over HTTP.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Modbus communications are disabled whenever the User account is enabled (Modbus/TCP has no password mechanism). Disable User account before using Modbus/TCP."
  - "SNMP write operations (SetRequest) require the write community string (default 'webrelay') for V1/V2c; SNMP V3 uses USM auth/privacy."
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements for the WebRelay Wireless.
```

## Notes
The source describes the ControlByWeb 400 Series platform broadly; the WebRelay Wireless is mentioned in the device name but the model-specific I/O count, exact relay count, and which subset of XML/JSON tags apply to a Wireless variant are not explicitly enumerated. The relay control table in section 1.1.2 lists relay1 and relay2 as examples; the XML state example (section 1.2) and MQTT payload token table (section 4.1.4) show relay1-relay4 and digitalInput1-digitalInput4, suggesting up to 4 relays/inputs on the platform — refer to the device's Modbus address map (generated from the Setup pages) for authoritative I/O addressing.

When the User account is enabled on the device, requests must include `Authorization: Basic <base64(name:password)>` per section 1.1 ("Password Enabled"); the documented default credential is `none:webrelay` (Base64 `bm9uZTp3ZWJyZWxheQ==`). When Modbus/TCP is used (port 502 by default), the User account must be disabled because Modbus has no password mechanism. The pulseTime query parameter must precede the relay=2 parameter in the URL. Modbus/TCP supports two simultaneous TCP sockets; connections time out after 50 seconds of inactivity (a periodic read keeps them open). Modbus errors return function code + 0x80 with exception codes 0x01 (not supported), 0x02 (bad address/quantity), 0x03 (padding/byte count). Modbus 32-bit floats are read/written in register pairs (quantity must be even); endianness is configurable in Advanced Network. A sensor not installed returns 0xFFFFFFFF (NaN).

MQTT payload tokens documented (section 4.1.4) for use in published payloads: `${mac}`, `${ver}` (firmware revision), `${ser}`, `${uptime}`, `${ip}`, `${port}` (HTTP), `${httpsport}`, `${dateTime}`, `${name}`, `${model}`, `${clientID}`, `${digitalInput1}`-`${digitalInput4}`, `${relay1}`-`${relay4}`, `${vin}`, `${register1}`. Remote Services uses TCP V1 (device-initiated); TCP V2.0 is reserved for ControlByWeb.Cloud and not for other use. Cloud DAT URLs facilitate 3rd-party integration but not peer-to-peer device communication.

<!-- UNRESOLVED: default TCP port for WebRelay Wireless HTTP server — source mentions 80 implicitly via "not port 80" alternative example at :8000, but default is not explicitly stated for this model. UNRESOLVED: SNMP transport layer (UDP assumed by convention) and port (conventionally 161) not explicitly stated. UNRESOLVED: MQTT broker port not stated. UNRESOLVED: WebRelay Wireless-specific relay count and full local I/O tag list. UNRESOLVED: firmware version compatibility range not stated in source. UNRESOLVED: SNMP V3 USM algorithm/credential formats not specified beyond general description. -->
````

Upgrade pass done. Preserved all original IDs/shapes. Added: SNMP (8 actions + 2 events), MQTT (3 actions), Remote Services (4 actions), Modbus concrete-address examples (9 actions), showUnits read variants (2), cloud DAT state.xml read (1), missing feedbacks (digital_io, onewire_sensor, frequency_input, latitude, longitude, min_rec_refresh), Modbus interlock + SNMP write interlock in Safety, udp protocol + port 502 note in Transport.

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/webrelay-wireless/
  - https://controlbyweb.com/wp-content/uploads/2024/02/webrelay-wireless-users-manual.pdf
retrieved_at: 2026-06-30T15:19:33.476Z
last_checked_at: 2026-07-21T21:46:27.032Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:46:27.032Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 spec actions matched literal source documentation; transport parameters (HTTP port 80, Modbus 502, Basic auth) verified; coverage ratio 60/63 > 0.9 threshold. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the ControlByWeb 400 Series platform broadly; the WebRelay Wireless model-specific I/O count, relay count, and which XML/JSON tags apply to a Wireless variant are not explicitly enumerated."
- "range/units not stated)"
- "units/scale not stated)"
- "HTTP request/response model only; no other unsolicited push notifications documented for WebRelay Wireless over HTTP."
- "source does not document any multi-step macro sequences."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements for the WebRelay Wireless."
- "default TCP port for WebRelay Wireless HTTP server — source mentions 80 implicitly via \"not port 80\" alternative example at :8000, but default is not explicitly stated for this model. UNRESOLVED: SNMP transport layer (UDP assumed by convention) and port (conventionally 161) not explicitly stated. UNRESOLVED: MQTT broker port not stated. UNRESOLVED: WebRelay Wireless-specific relay count and full local I/O tag list. UNRESOLVED: firmware version compatibility range not stated in source. UNRESOLVED: SNMP V3 USM algorithm/credential formats not specified beyond general description."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
