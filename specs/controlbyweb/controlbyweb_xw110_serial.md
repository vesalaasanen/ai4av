---
spec_id: admin/controlbyweb-xw110
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb XW-110 Control Spec"
manufacturer: ControlByWeb
model_family: XW-110
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - XW-110
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/wp-content/uploads/2024/02/xw-110-users-manual.pdf
retrieved_at: 2026-06-30T22:27:49.988Z
last_checked_at: 2026-07-07T12:53:01.130Z
generated_at: 2026-07-07T12:53:01.130Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document (\"Integrating with ControlByWeb Devices\") is a generic"
  - "Input metadata declared the known protocol as RS-232C, but this source contains"
  - "SNMP, MQTT/Sparkplug B, Remote Services, and Cloud (DAT URL) are also documented"
  - "source describes Remote Services sending the device's state.xml on logic events and"
  - "none documented."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility not stated in source."
  - "XW-110 specific I/O inventory (relay/input/sensor counts) not stated in source."
  - "serial / RS-232C transport not present in source (likely N/A for this model)."
  - "voltage/current/power specifications not stated in source."
  - "exact default credentials (if any) beyond example \"none:webrelay\" not stated as default."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:53:01.130Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 spec actions matched verbatim against source HTTP GET and Modbus/TCP commands; transport fully verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# ControlByWeb XW-110 Control Spec

## Summary
The ControlByWeb XW-110 is a Wi-Fi networked I/O module with a built-in web server. This spec covers control and monitoring via HTTP GET requests against the device's XML/JSON state endpoints and via Modbus/TCP. The device exposes relays, digital inputs, analog inputs, 1-Wire sensors, registers, and counters through a uniform `<tagX>` naming scheme.

<!-- UNRESOLVED: The source document ("Integrating with ControlByWeb Devices") is a generic -->
<!-- ControlByWeb integration manual. It does not name the XW-110 explicitly; examples reference -->
<!-- the X-400/X-600M/X-420 series. The command structure is stated to apply to "each of the -->
<!-- ControlByWeb modules," so it is treated as applicable to the XW-110, but the XW-110's specific -->
<!-- I/O inventory (how many relays/inputs/sensors) is NOT stated in this source. -->
<!-- UNRESOLVED: Input metadata declared the known protocol as RS-232C, but this source contains -->
<!-- NO serial / RS-232C content whatsoever. The XW-110 is a network (Wi-Fi/Ethernet) device. -->
<!-- Serial transport is therefore UNRESOLVED / likely N/A for this model. -->
<!-- UNRESOLVED: SNMP, MQTT/Sparkplug B, Remote Services, and Cloud (DAT URL) are also documented -->
<!-- in the source but are not enumerated as first-class actions below; they are noted in Notes. -->

## Transport
```yaml
# Source documents two concrete command-bearing transports: HTTP GET (built-in web server)
# and Modbus/TCP (device acts as Modbus slave). Both ports are explicitly stated.
protocols:
  - http
  - tcp
addressing:
  port: 80       # default HTTP port; source: "If the TCP port has been changed (not port 80)"
  base_url: "http://{host}/state.xml"   # host = device IP (e.g. 192.168.1.2 in examples)
# Modbus/TCP connection port 502 (configurable under Advanced Network tab) - stated verbatim.
# auth notes:
auth:
  type: basic  # HTTP Basic (Base64 "user:password"). OPTIONAL - User account disabled by default.
  # When enabled, header:  Authorization: Basic <base64(user:password)>
  # Example from source: bm9uZTp3ZWJyZWxheQ== decodes to "none:webrelay".
  # Note: Modbus/TCP is DISABLED whenever the User account is enabled (Modbus has no auth mechanism).
# serial / RS-232C: NOT present in source - see UNRESOLVED notes above.
```

## Traits
```yaml
traits:
  - queryable   # inferred: state.xml/state.json query + Modbus read function codes present
  - levelable   # inferred: register/count/analog values settable via HTTP and Modbus write
# powerable: NOT supported - no power on/off command in source.
# routable: NOT supported - no input/output routing in source.
```

## Actions
```yaml
# =====================================================================
# HTTP / XML / JSON commands (web server, port 80)
# Literal request shape from source: GET /state.xml?<params> HTTP/1.1\r\n\r\n
# Parameters use the form <ioType><localNumber>=<value>. "X" in source = local I/O number.
# customState.xml/json use the CamelCase user-configured name instead of <ioType><num>.
# Multiple args may be combined: /state.xml?relay1=1&relay2=0
# =====================================================================

- id: relay_set
  label: Set Relay State
  kind: action
  command: "GET /state.xml?relay{relay}={state} HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay local I/O number (1, 2, 3, ...)
    - name: state
      type: enum
      values: ["0", "1", "2"]
      description: "0=OFF, 1=ON, 2=PULSE (preset duration from relay setup page)"

- id: relay_pulse_custom
  label: Pulse Relay Custom Duration
  kind: action
  command: "GET /state.json?pulseTime{relay}={seconds}&relay{relay}=2 HTTP/1.1\r\n\r\n"
  params:
    - name: relay
      type: integer
      description: Relay local I/O number
    - name: seconds
      type: number
      description: Pulse duration in seconds for this single pulse (does not change stored Pulse Duration)
  notes: "pulseTime argument MUST come before the relay=2 command (source)."

- id: set_on_time
  label: Set On Time
  kind: action
  command: "GET /state.xml?onTime{x}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: x
      type: integer
      description: Input local I/O number
    - name: value
      type: number
      description: On-time value in seconds (0 resets)

- id: set_total_on_time
  label: Set Total On Time
  kind: action
  command: "GET /state.xml?totalOnTime{x}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: x
      type: integer
      description: Input local I/O number
    - name: value
      type: number
      description: Total on-time value in seconds (0 resets)

- id: set_counter
  label: Set Counter
  kind: action
  command: "GET /state.json?count{x}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: x
      type: integer
      description: Input local I/O number
    - name: value
      type: number
      description: Counter value to set (e.g. 200)

- id: set_register
  label: Set Register Value
  kind: action
  command: "GET /state.xml?register{x}={value} HTTP/1.1\r\n\r\n"
  params:
    - name: x
      type: integer
      description: Register local I/O number
    - name: value
      type: number
      description: Register value (e.g. 10.5, 25)

- id: query_state_xml
  label: Query Device State (XML)
  kind: query
  command: "GET /state.xml HTTP/1.1\r\n\r\n"
  params: []
  notes: Returns full I/O state as XML. Custom-name variant: /customState.xml

- id: query_state_json
  label: Query Device State (JSON)
  kind: query
  command: "GET /state.json HTTP/1.1\r\n\r\n"
  params: []
  notes: Returns full I/O state as JSON. Custom-name variant: /customState.json

- id: erase_data_log
  label: Erase Data Log
  kind: action
  command: "GET /log.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []
  notes: Erases log.txt. Requires user password if User account enabled.

- id: erase_syslog
  label: Erase System Log
  kind: action
  command: "GET /syslog.txt?erase=1 HTTP/1.1\r\n\r\n"
  params: []
  notes: Erases syslog.txt. Requires setup username/password.

# =====================================================================
# Modbus/TCP commands (slave, port 502)
# Device is a Modbus slave. Addresses come from the per-device Modbus map
# (Setup pages > Advanced Network > View Modbus Address Table). 32-bit values
# use IEEE-754 float across 16-bit register pairs (must read/write in pairs of 2).
# Endianness (little/big) configurable in Advanced Network tab.
# =====================================================================

- id: modbus_read_coils
  label: Modbus Read Coils
  kind: query
  command: "FC 0x01"
  params:
    - name: start_address
      type: integer
      description: Starting address (refer to device Modbus map)
    - name: quantity
      type: integer
      description: Number of coils to read
  notes: "Reads relays and digital I/O configured as outputs. 1=ON, 0=OFF. Error FC=0x81."

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs
  kind: query
  command: "FC 0x02"
  params:
    - name: start_address
      type: integer
      description: Starting address (refer to device Modbus map)
    - name: quantity
      type: integer
      description: Number of inputs to read
  notes: "Reads digital inputs and digital I/O configured as inputs. Error FC=0x82."

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers
  kind: query
  command: "FC 0x03"
  params:
    - name: start_address
      type: integer
      description: Starting address (refer to device Modbus map)
    - name: quantity
      type: integer
      description: Register count to read (must be divisible by 2)
  notes: "Reads Vin, sensors, registers, counters, analog inputs. 32-bit floats in pairs. NaN (0xFFFFFFFF) if sensor absent. Error FC=0x83."

- id: modbus_write_single_coil
  label: Modbus Write Single Coil
  kind: action
  command: "FC 0x05"
  params:
    - name: start_address
      type: integer
      description: Coil address (refer to device Modbus map)
    - name: output_value
      type: enum
      values: ["0x00", "0xFF"]
      description: "0x00=OFF, 0xFF=ON"
  notes: "Writes a single relay/digital output. Error FC=0x85 (0x01 unsupported, 0x02 out of range, 0x03 padding)."

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils
  kind: action
  command: "FC 0x0F"
  params:
    - name: start_address
      type: integer
      description: Starting coil address (2 bytes)
    - name: quantity
      type: integer
      description: Number of outputs (1 byte)
    - name: values
      type: integer
      description: "Bitmask 0x0000-0xFFFF (1=ON)"
  notes: "Writes multiple digital outputs/relays. Byte count = quantity/8. Error FC=0x8F (0x01 unsupported, 0x02 bad addr/qty, 0x03 byte count out of range)."

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers
  kind: action
  command: "FC 0x10"
  params:
    - name: start_address
      type: integer
      description: Starting register address (refer to device Modbus map)
    - name: quantity
      type: integer
      description: Register count to write (must be divisible by 2)
    - name: values
      type: number
      description: IEEE-754 32-bit float values (endianness per Modbus setup)
  notes: "Sets registers/analog outputs. ACK echoes register quantity written. Error FC=0x90 (0x01 unsupported, 0x02 addr qty not even)."
```

## Feedbacks
```yaml
# Observable state returned by state.xml/state.json and by Modbus read functions.
# "X" = local I/O number. All are queryable via query_state_xml / query_state_json.

- id: digital_input_state
  type: enum
  values: ["0", "1"]
  tag: digitalInputX
  description: "0=off (no voltage), 1=on (voltage applied)"

- id: relay_state
  type: enum
  values: ["0", "1"]
  tag: relayX
  description: "0=off (coil off), 1=on (coil energized)"

- id: digital_io_state
  type: enum
  values: ["0", "1"]
  tag: digitalIOX
  description: Digital I/O line state

- id: analog_input_value
  type: number
  tag: analogInputX
  description: Analog input X reading

- id: one_wire_sensor_value
  type: number
  tag: oneWireSensorX
  description: "1-Wire sensor reading; 'x.x' indicates sensor could not be read"

- id: vin
  type: number
  tag: vin
  description: Scaled internal Vin measurement (always present)

- id: register_value
  type: number
  tag: registerX
  description: Value of register X

- id: counter_value
  type: number
  tag: countX
  description: Count value associated with input X

- id: frequency_value
  type: number
  tag: frequencyX
  description: Frequency associated with input X

- id: on_time
  type: number
  tag: onTimeX
  description: Seconds the input has been on since last turning on

- id: total_on_time
  type: number
  tag: totalOnTimeX
  description: Total seconds the input has been on

- id: utc_time
  type: integer
  tag: utcTime
  description: Current UTC time in seconds since 1970-01-01

- id: serial_number
  type: string
  tag: serialNumber
  description: Device serial (MAC-style, e.g. 00:0C:C8:00:00:00)
```

## Variables
```yaml
# Settable parameters that are not discrete actions. All set via set_register /
# modbus_write_multiple_registers above; listed here as the tunable state surface.

- id: register
  type: number
  writable: true
  description: Internal register value (settable via HTTP registerX or Modbus FC 0x10)

- id: counter
  type: number
  writable: true
  description: Counter value (settable via HTTP countX)

- id: pulse_duration
  type: number
  writable: false
  description: Per-relay pulse duration configured on relay setup page (read-only via API; one-shot override via pulseTimeX arg)
```

## Events
```yaml
# UNRESOLVED: source describes Remote Services sending the device's state.xml on logic events and
# SNMP traps/notifications on relay state changes / sensor thresholds, but these are outbound
# notifications FROM the device to a configured server/manager, not documented unsolicited event
# payloads on the HTTP/Modbus control channel. No event schema enumerated.
```

## Macros
```yaml
# No multi-step command sequences described in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing
# requirements. Never inferred.
```

## Notes
- **Protocol mismatch warning:** The scraper family was labeled "serial" / "RS-232C", but this source document contains zero serial content. The XW-110 is a networked (Wi-Fi) module. All documented control is over HTTP (port 80) and Modbus/TCP (port 502). RS-232C should be considered N/A unless a separate serial appendix exists.
- **Source generality:** The source ("Integrating with ControlByWeb Devices") is a generic ControlByWeb integration manual. Examples reference the X-400 / X-600M / X-420 series. It is asserted to apply to "each of the ControlByWeb modules," so the command structure is treated as applicable to the XW-110, but the XW-110's exact I/O count is not stated here.
- **Default auth:** HTTP Basic auth is optional; the User account is disabled by default (hence no password by default). Enabling the User account simultaneously disables Modbus/TCP because Modbus has no auth mechanism.
- **Default port:** HTTP port 80 is the default (source: "If the TCP port has been changed (not port 80)"). Alternate port shown in examples: 8000.
- **Modbus map is per-device:** Coil/discrete/register addresses are not fixed in the source; they must be read from the device's Setup pages (Advanced Network > View Modbus Address Table), since added/removed I/O changes the map.
- **Modbus limits:** 2 TCP sockets max; idle connections close after 50 s; register reads/writes must be even counts (32-bit floats in 16-bit pairs); endianness configurable.
- **Additional transports documented but not action-enumerated here:** SNMP (v1/v2c/v3; default community `webrelay`; Get/Set/Trap/Notification), MQTT 3.1.1 + Sparkplug B (publish/subscribe via broker), Remote Services (device-initiated TCP V1 connection, expects 3-char "ACK", sends state.xml), ControlByWeb Cloud / DAT URLs (e.g. `https://api.controlbyweb.cloud/{dat}/state.json?relay1=1`). These are present in the source and available for a future spec expansion.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: XW-110 specific I/O inventory (relay/input/sensor counts) not stated in source. -->
<!-- UNRESOLVED: serial / RS-232C transport not present in source (likely N/A for this model). -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source. -->
<!-- UNRESOLVED: exact default credentials (if any) beyond example "none:webrelay" not stated as default. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2025/05/cbw-integration-and-protocols-manual.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
  - https://controlbyweb.com/wp-content/uploads/2024/02/xw-110-users-manual.pdf
retrieved_at: 2026-06-30T22:27:49.988Z
last_checked_at: 2026-07-07T12:53:01.130Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:53:01.130Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 spec actions matched verbatim against source HTTP GET and Modbus/TCP commands; transport fully verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document (\"Integrating with ControlByWeb Devices\") is a generic"
- "Input metadata declared the known protocol as RS-232C, but this source contains"
- "SNMP, MQTT/Sparkplug B, Remote Services, and Cloud (DAT URL) are also documented"
- "source describes Remote Services sending the device's state.xml on logic events and"
- "none documented."
- "source contains no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility not stated in source."
- "XW-110 specific I/O inventory (relay/input/sensor counts) not stated in source."
- "serial / RS-232C transport not present in source (likely N/A for this model)."
- "voltage/current/power specifications not stated in source."
- "exact default credentials (if any) beyond example \"none:webrelay\" not stated as default."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
