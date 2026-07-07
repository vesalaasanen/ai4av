---
spec_id: admin/controlbyweb-x332
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X-332 Control Spec"
manufacturer: ControlByWeb
model_family: X-332
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X-332
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://www.controlbyweb.com/wp-content/uploads/2024/01/x-332_manual_v1.7.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
retrieved_at: 2026-06-30T14:53:51.532Z
last_checked_at: 2026-07-07T11:14:49.119Z
generated_at: 2026-07-07T11:14:49.119Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no RS-232 interface found in refined source. Known protocol was given as RS-232C but the source document describes only Ethernet-based protocols. Spec reflects source."
  - "voltage/current/power specifications, operating temperature, dimensions, and weight not stated in refined source."
  - "source does not document explicit multi-step macro sequences the user can invoke."
  - "no explicit safety warnings, hazard statements, or interlock procedures for relay switching in refined source."
  - "voltage/current/power draw, operating temperature, dimensions, weight, certifications, and pulse-current ratings not in refined source."
  - "1-wire sensor specifics (max cable length, supported part numbers) not in refined source."
  - "relay contact ratings (voltage/current per contact) not in refined source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:14:49.119Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched verbatim against source HTTP/XML, Modbus, and SNMP command references; transport parameters port 80, 502, 8000, basic auth, and default password webrelay all confirmed in source. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X-332 Control Spec

## Summary
The X-332 is a multi-function web-enabled module providing sixteen dry-contact relays, sixteen optically-isolated digital inputs, two counter inputs, four analog inputs, and a 1-wire bus for up to four temperature/humidity sensors. This spec covers control and monitoring over Ethernet using HTTP GET/XML, Modbus/TCP, and SNMP.

<!-- UNRESOLVED: no RS-232 interface found in refined source. Known protocol was given as RS-232C but the source document describes only Ethernet-based protocols. Spec reflects source. -->
<!-- UNRESOLVED: voltage/current/power specifications, operating temperature, dimensions, and weight not stated in refined source. -->

## Transport
```yaml
protocols:
  - tcp  # HTTP, XML, Modbus/TCP, SNMP, Remote Services - all over TCP per source
addressing:
  port: 80  # default HTTP port; configurable 0-65535 per source
  modbus_port: 502  # default Modbus/TCP port; configurable 0-65535 per source
  remote_services_port: 8000  # default Remote Services port; configurable 0-65535 per source
auth:
  type: basic  # HTTP Basic auth with Base64-encoded "username:password"; optional Control Password (disabled by default)
  default_username: admin  # for setup pages only
  default_password: webrelay  # default Control Password per source; configurable
```

## Traits
```yaml
- queryable  # inferred from XML state.xml, Modbus read functions, SNMP GetRequest
- powerable  # relays can be turned ON/OFF; powerLossCounter tracks device power cycles
- routable  # inferred from relay input/output mapping and event-driven routing via inputs/sensors
```

## Actions
```yaml
- id: get_state_xml
  label: Read State XML
  kind: query
  command: "GET /state.xml HTTP/1.1"
  params: []
  notes: Returns XML with all relay states, input states, counters, analog inputs, sensors, external variables, serial number, and epoch time. Default port 80.

- id: get_event_xml
  label: Read Event XML
  kind: query
  command: "GET /event{X}.xml HTTP/1.1"
  params:
    - name: X
      type: integer
      description: Event number 0-99
  notes: Returns event configuration XML including active, currentTime, nextEvent, period, count, relay, action, pulseDuration.

- id: get_diagnostics_xml
  label: Read Diagnostics XML
  kind: query
  command: "GET /diagnostics.xml HTTP/1.1"
  params: []
  notes: Returns memoryPowerUpFlag, devicePowerUpFlag, powerLossCounter. No password required.

- id: clear_memory_powerup_flag
  label: Clear Real-Time Clock Power Loss Flag
  kind: action
  command: "GET /diagnostics.xml?memoryPowerUpFlag=0 HTTP/1.1"
  params: []

- id: clear_device_powerup_flag
  label: Clear Device Power Loss Flag
  kind: action
  command: "GET /diagnostics.xml?devicePowerUpFlag=0 HTTP/1.1"
  params: []

- id: clear_power_loss_counter
  label: Clear Power Loss Counter
  kind: action
  command: "GET /diagnostics.xml?powerLossCounter=0 HTTP/1.1"
  params: []

- id: clear_multiple_diag_flags
  label: Clear Multiple Diagnostics Flags
  kind: action
  command: "GET /diagnostics.xml?{flag1}=0&{flag2}=0 HTTP/1.1"
  params:
    - name: flags
      type: string
      description: Ampersand-separated list of flag names to clear

- id: set_relay_off
  label: Turn Relay OFF (XML)
  kind: action
  command: "GET /state.xml?relay{N}State=0 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number 1-16

- id: set_relay_on
  label: Turn Relay ON (XML)
  kind: action
  command: "GET /state.xml?relay{N}State=1 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number 1-16

- id: pulse_relay_xml
  label: Pulse Relay for Preset Duration (XML)
  kind: action
  command: "GET /state.xml?relay{N}State=2 HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number 1-16

- id: pulse_relay_xml_custom
  label: Pulse Relay for Custom Duration (XML)
  kind: action
  command: "GET /state.xml?relay{N}State=2&pulseTime{N}={seconds} HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Relay number 1-16
    - name: seconds
      type: number
      description: Pulse duration in seconds (overrides preset for this command only)

- id: set_counter_xml
  label: Set Counter Value (XML)
  kind: action
  command: "GET /state.xml?count{N}={value} HTTP/1.1"
  params:
    - name: N
      type: integer
      description: Counter number 1-2
    - name: value
      type: integer
      description: Counter value to set

- id: xml_no_reply
  label: XML Command Without Reply
  kind: action
  command: "GET /state.xml?{command}&noReply=1 HTTP/1.1"
  params:
    - name: command
      type: string
      description: Any relayState or count command; suppress state.xml reply with noReply=1

- id: configure_event
  label: Configure Scheduled Event
  kind: action
  command: "GET /eventSetup.srv?e{eventNum}={epochTime};{period};{periodUnits};{count};{scheduleNum};{action};{pulseDuration};0;{description};{daysMask};{actionMask}; HTTP/1.1"
  params:
    - name: eventNum
      type: integer
      description: Event identifier 0-99
    - name: epochTime
      type: integer
      description: Seconds since January 1, 1970
    - name: period
      type: integer
      description: Period value
    - name: periodUnits
      type: integer
      description: 0=Seconds, 1=Minutes, 2=Hours, 3=Days, 4=Weeks
    - name: count
      type: integer
      description: Number of occurrences (0 = continuous)
    - name: scheduleNum
      type: integer
      description: Schedule 0-4
    - name: action
      type: integer
      description: 0=No Action, 1=Turn on, 2=Turn off, 3=Pulse, 4=Toggle, 5=Change schedules, 7=Set extVar0, 8=Clear extVar0
    - name: pulseDuration
      type: number
      description: Pulse duration in seconds
    - name: description
      type: string
      description: Up to 20 characters
    - name: daysMask
      type: integer
      description: Bitmask 0-127 (Bit0=Sat ... Bit6=Sun); 127=all days
    - name: actionMask
      type: integer
      description: Bitmask: Bit0=relay/schedule 1, Bit3=relay/schedule 4

- id: modbus_read_coils
  label: Modbus Read Coils (FC01)
  kind: query
  command: "Modbus FC01 - Read Coils 0x0000-0x000F (Relays 1-16)"
  params:
    - name: start_address
      type: integer
      description: 0x0000-0x000F
    - name: quantity
      type: integer
      description: 0x0001-0x0010 (1-16 coils)

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (FC02)
  kind: query
  command: "Modbus FC02 - Read Discrete Inputs 0x0000-0x0011 (Inputs 1-18)"
  params:
    - name: start_address
      type: integer
      description: 0x0000-0x0011
    - name: quantity
      type: integer
      description: 0x0001-0x0012

- id: modbus_read_analog_inputs
  label: Modbus Read Analog Inputs (FC03)
  kind: query
  command: "Modbus FC03 - Read Analog Inputs 0x0010-0x0016 (Analog 1-4)"
  params:
    - name: start_address
      type: integer
      description: 0x0010-0x0016 (even addresses only)
    - name: quantity
      type: integer
      description: 0x0002-0x0008

- id: modbus_read_sensors
  label: Modbus Read Sensors (FC03)
  kind: query
  command: "Modbus FC03 - Read Sensors 0x0110-0x0116 (Sensors 1-4)"
  params:
    - name: start_address
      type: integer
      description: 0x0110-0x0116 (even addresses only)
    - name: quantity
      type: integer
      description: 0x0002-0x0008

- id: modbus_read_counters
  label: Modbus Read Counters (FC03)
  kind: query
  command: "Modbus FC03 - Read Counters 0x0210-0x0212 (Counters 1-2)"
  params:
    - name: start_address
      type: integer
      description: 0x0210-0x0212
    - name: quantity
      type: integer
      description: 0x0002-0x0004

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC05)
  kind: action
  command: "Modbus FC05 - Write Single Coil 0x0000-0x000F, value 0x00=OFF or 0xFF=ON, padding 0x00"
  params:
    - name: address
      type: integer
      description: 0x0000-0x000F (Relay 1-16)
    - name: value
      type: enum
      values: [0x00, 0xFF]
      description: 0x00=OFF, 0xFF=ON

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC15)
  kind: action
  command: "Modbus FC15 - Write Multiple Coils 0x0000-0x000F, value 0x0000-0xFFFF"
  params:
    - name: start_address
      type: integer
      description: 0x0000-0x000F
    - name: quantity
      type: integer
      description: 0x0001-0x0010
    - name: value
      type: integer
      description: 0x0000-0xFFFF; 0xFFFF=ON all, 0x0000=OFF all

- id: modbus_pulse_relay
  label: Modbus Pulse Relay (FC16)
  kind: action
  command: "Modbus FC16 - Pulse Relay 0x0310-0x032F (Relays 1-16), IEEE 754 float seconds"
  params:
    - name: start_address
      type: integer
      description: 0x0310 (relay 1) - 0x032F (relay 16)
    - name: register_quantity
      type: integer
      description: 0x0002-0x0020 (even)
    - name: byte_count
      type: integer
      description: 0x04-0x40 (multiples of 4)
    - name: pulse_duration
      type: number
      description: Float seconds, range 0.1-86400; out-of-range clamps to bounds

- id: modbus_set_counter
  label: Modbus Set Counter (FC16)
  kind: action
  command: "Modbus FC16 - Set Counter 0x0210-0x0212 (Counters 1-2), 32-bit int"
  params:
    - name: start_address
      type: integer
      description: 0x0210-0x0212
    - name: register_quantity
      type: integer
      description: 0x0002-0x0004 (even)
    - name: byte_count
      type: integer
      description: 0x04-0x08 (multiples of 4)
    - name: counter_value
      type: integer
      description: 0x00000000-0xFFFFFFFF

- id: snmp_set_relay
  label: SNMP Set Relay State
  kind: action
  command: "SNMP SetRequest on x332_relay{N}"
  params:
    - name: N
      type: integer
      description: Relay number 1-16
    - name: value
      type: integer
      description: 0=OFF, 1=ON, 2=PULSE (pulse uses setup-page pulse duration)

- id: snmp_get_relay
  label: SNMP Get Relay State
  kind: query
  command: "SNMP GetRequest on x332_relay{N}"
  params:
    - name: N
      type: integer
      description: Relay number 1-16

- id: snmp_get_input
  label: SNMP Get Digital Input State
  kind: query
  command: "SNMP GetRequest on x332_input{N}"
  params:
    - name: N
      type: integer
      description: Input number 1-18

- id: snmp_get_counter
  label: SNMP Get Counter Value
  kind: query
  command: "SNMP GetRequest on x332_counter{N}"
  params:
    - name: N
      type: integer
      description: Counter number 1-2

- id: snmp_get_analog
  label: SNMP Get Analog Input Value
  kind: query
  command: "SNMP GetRequest on x332_analog{N}"
  params:
    - name: N
      type: integer
      description: Analog input number 1-4

- id: snmp_get_sensor
  label: SNMP Get Sensor Value
  kind: query
  command: "SNMP GetRequest on x332_sensor{N}"
  params:
    - name: N
      type: integer
      description: Sensor number 1-4
```

## Feedbacks
```yaml
- id: relay_states
  type: bitfield
  values: 16 bits; bit i = relay (i+1); 0=OFF, 1=ON
  source: state.xml <relaystates>, Modbus FC01, SNMP x332_relayN

- id: input_states
  type: bitfield
  values: 18 digits; leftmost digit = input 18, rightmost = input 1; 0=OFF, 1=ON
  source: state.xml <inputstates>, Modbus FC02, SNMP x332_inputN

- id: analog_state
  type: float
  values: Scaled analog measurement
  source: state.xml <an1state>..<an4state>, Modbus FC03 (addr 0x0010-0x0016), SNMP x332_analogN

- id: analog_alarm
  type: enum
  values: [normal, alarm1, alarm2]
  source: state.xml <anXAlrm> 0=Normal, 1=Alarm 1, 2=Alarm 2

- id: sensor_value
  type: float
  values: Temperature or humidity decimal; x.x = no sensor attached
  source: state.xml <sensor1>..<sensor5>, Modbus FC03 (0x0110-0x0116), SNMP x332_sensorN

- id: sensor_alarm
  type: enum
  values: [normal, alarm1, alarm2]
  source: state.xml <sXAlrm> 0=Normal, 1=Alarm 1, 2=Alarm 2

- id: counter_value
  type: integer
  values: Scaled count (rawCount * multiplier + offset)
  source: state.xml <count1>/<count2>, Modbus FC03 (0x0210-0x0212), SNMP x332_counterN

- id: external_variable
  type: float
  values: User-defined float
  source: state.xml <extvar1>..<extvar5>

- id: serial_number
  type: string
  values: MAC-format identifier (e.g. 00:0C:C8:00:00:00)
  source: state.xml <serialNumber>

- id: device_time
  type: integer
  values: Epoch seconds since 1970-01-01
  source: state.xml <time>

- id: memory_powerup_flag
  type: enum
  values: [power_lost_since_reset, ok]
  source: diagnostics.xml <memoryPowerUpFlag>; clear via ?memoryPowerUpFlag=0

- id: device_powerup_flag
  type: enum
  values: [power_lost_since_clear, ok]
  source: diagnostics.xml <devicePowerUpFlag>; clear via ?devicePowerUpFlag=0

- id: power_loss_counter
  type: integer
  values: Count of main power losses
  source: diagnostics.xml <powerLossCounter>; clear via ?powerLossCounter=0

- id: event_active
  type: enum
  values: [yes, no]
  source: eventX.xml <active>

- id: event_current_time
  type: string
  values: MM/DD/YYYY HH:MM:SS
  source: eventX.xml <currentTime>

- id: event_next_time
  type: string
  values: MM/DD/YYYY HH:MM:SS or xx/xx/xxxx xx:xx:xx
  source: eventX.xml <nextEvent>

- id: event_period
  type: string
  values: Number + unit (s/m/h/d/w); 0=disabled
  source: eventX.xml <period>

- id: event_count
  type: integer
  values: Remaining occurrences; 0+active = always on
  source: eventX.xml <count>

- id: event_relay
  type: integer
  values: Affected relay number
  source: eventX.xml <relay>

- id: event_action
  type: enum
  values: [turn_on, turn_off, pulse, toggle, set_extvar0, clear_extvar0, change_schedules]
  source: eventX.xml <action>

- id: event_pulse_duration
  type: number
  values: Seconds
  source: eventX.xml <pulseDuration>
```

## Variables
```yaml
- id: external_variable
  description: Five user-settable floats exposed via state.xml <extvarX>; can be set/cleared by event actions (7=set, 8=clear per source).
  type: float
  count: 5
```

## Events
```yaml
- id: relay_state_change_trap
  description: Sent on relay ON/OFF transition.
  oid: X332.75 through X332.90
  value: 0 or 1

- id: input_state_change_trap
  description: Sent on digital input transition.
  oid: X332.95 through X332.112
  value: 0 or 1

- id: analog_alarm_trap
  description: Sent when analog alarm boundary crossed.
  oid: X332.120 through X332.123
  value: xxx.x

- id: sensor_alarm_trap
  description: Sent when temperature/humidity boundary crossed.
  oid: X332.65 through X332.68
  value: xx.x

- id: remote_services_state_push
  description: On event-triggered or interval connection, X-332 sends state.xml over the open Remote Services TCP connection.
```

## Macros
```yaml
# UNRESOLVED: source does not document explicit multi-step macro sequences the user can invoke.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "X-332 must be power-cycled before network settings take effect (only Network tab; other settings apply on submit)."
  - "Modbus/TCP communications are disabled whenever the Control Password is enabled (Modbus has no password mechanism)."
# UNRESOLVED: no explicit safety warnings, hazard statements, or interlock procedures for relay switching in refined source.
```

## Notes
- HTTP/XML, Modbus/TCP, SNMP, and Remote Services are all over TCP. Source documents no serial/RS-232 interface despite caller-supplied hint.
- Modbus slave listens on port 502 (default). Two simultaneous TCP sockets; third+ connections rejected. Connection times out after 50s idle.
- Floating-point values are IEEE 754; endianness configurable per-device (default little-endian). Affects Modbus FC03 sensor/analog reads, Modbus FC16 pulse duration, and XML/Modbus counter values where 32-bit.
- Modbus FC16 pulse duration: valid range 0.1-86400 seconds. Values outside clamp to bounds. New commands during pulse cancel the existing pulse timer.
- XML state.xml GET requests can suppress reply with `noReply=1`. By default, every command returns the full state.xml.
- Default credentials: username `admin` (setup pages only), Control Password `webrelay` (case-sensitive, configurable 8-13 chars). Control Password disabled by default. HTTP Basic auth uses Base64 of `username:password`.
- Event scheduling: 100 events (0-99). Days mask bit0=Saturday, bit6=Sunday. Action mask bit0=relay/schedule 1, bit3=relay/schedule 4.
- SNMP community strings = Control Password. If Control Password disabled, no community string check on Get/GetNext.
- Supported SNMP PDUs: GetRequest, GetNextRequest, SetRequest, Trap. MIBs: RFC1213-MIB, XYTRONIX.mib.
- Standard RFC1213 objects: system.sysDescr="X-332", system.sysObjectID=X332, system.sysUpTime, system.sysName (configurable).
- Ethernet: 10/100 Mbps, half or full duplex, IPv4, static or DHCP. Setup at http://{ip}/setup.html.
<!-- UNRESOLVED: voltage/current/power draw, operating temperature, dimensions, weight, certifications, and pulse-current ratings not in refined source. -->
<!-- UNRESOLVED: 1-wire sensor specifics (max cable length, supported part numbers) not in refined source. -->
<!-- UNRESOLVED: relay contact ratings (voltage/current per contact) not in refined source. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://www.controlbyweb.com/wp-content/uploads/2024/01/x-332_manual_v1.7.pdf
  - https://controlbyweb.com/support/cbw-integration-manual/
retrieved_at: 2026-06-30T14:53:51.532Z
last_checked_at: 2026-07-07T11:14:49.119Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:14:49.119Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched verbatim against source HTTP/XML, Modbus, and SNMP command references; transport parameters port 80, 502, 8000, basic auth, and default password webrelay all confirmed in source. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no RS-232 interface found in refined source. Known protocol was given as RS-232C but the source document describes only Ethernet-based protocols. Spec reflects source."
- "voltage/current/power specifications, operating temperature, dimensions, and weight not stated in refined source."
- "source does not document explicit multi-step macro sequences the user can invoke."
- "no explicit safety warnings, hazard statements, or interlock procedures for relay switching in refined source."
- "voltage/current/power draw, operating temperature, dimensions, weight, certifications, and pulse-current ratings not in refined source."
- "1-wire sensor specifics (max cable length, supported part numbers) not in refined source."
- "relay contact ratings (voltage/current per contact) not in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
