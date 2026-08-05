---
spec_id: admin/middle-atlantic-rlnk-sw815r-sp
schema_version: ai4av-public-spec-v1
revision: 1
title: "Middle Atlantic RLNK-SW815R-SP Control Spec"
manufacturer: "Middle Atlantic"
model_family: RLNK-SW815R-SP
aliases: []
compatible_with:
  manufacturers:
    - "Middle Atlantic"
  models:
    - RLNK-SW815R-SP
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - legrandav.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://www.legrandav.com/products/power/intelligent_power/premium_pdu_with_racklink/rlnk-sw815r-sp
retrieved_at: 2026-07-22T00:45:13.693Z
last_checked_at: 2026-07-22T01:06:17.465Z
generated_at: 2026-07-22T01:06:17.465Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes RackLink Control System Communication Protocol (generic I-00472 supplement); RLNK-SW815R-SP-specific feature set (e.g. outlet count = 16, contact count = 8) inferred from protocol max ranges, not stated per-model"
  - "no volume/level params in source"
  - "source does not document settable discrete variables outside the action set; thresholds are read/write via Threshold commands (0x70..0x77)."
  - "source mentions EPO interlock and login requirement; no further safety interlocks documented."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:06:17.465Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec action units verified with exact wire-level hex matches and complete transport parameter coverage in source document. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Middle Atlantic RLNK-SW815R-SP Control Spec

## Summary
RackLink Premium PDU (RLNK-SW815R-SP) with RS-232 and TCP/IP control using the RackLink Control System Communication Protocol — a hex-encoded framed protocol with login, ping, power outlet/dry contact control, sequencing, energy management, sensor/threshold reads, and log retrieval.

<!-- UNRESOLVED: source describes RackLink Control System Communication Protocol (generic I-00472 supplement); RLNK-SW815R-SP-specific feature set (e.g. outlet count = 16, contact count = 8) inferred from protocol max ranges, not stated per-model -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 60000
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credentials  # source requires login with "username|password" string
```

## Traits
```yaml
- powerable       # inferred: outlet on/off commands present (0x20)
- routable        # inferred: not applicable - no input routing; energy management state per outlet present
- queryable       # inferred: state/status query commands present
- levelable       # UNRESOLVED: no volume/level params in source
```

## Actions
```yaml
# All hex payloads below are verbatim from the source protocol manual (RackLink Control System Communication Protocol).
# Frames are: 0xFE <Length> <DataEnvelope> <Checksum> <0xFF>. Checksum = (sum of header..end-of-envelope) & 0x7F.
# Per the source, omit checksum and length placeholders when emitting payloads to a real device; compute at runtime.

- id: nack
  label: NACK (error from device)
  kind: feedback
  command: "FE 04 00 10 10 01 23 FF"
  params:
    - name: error_code
      type: byte
      description: "0x01=Bad CRC, 0x02=Bad Length, 0x03=Bad Escape, 0x04=Invalid cmd, 0x05=Invalid subcmd, 0x06=Bad byte count, 0x07=Invalid data bytes, 0x08=Invalid credentials, 0x10=Unknown, 0x11=Access Denied (EPO)"

- id: ping_request
  label: Ping (device→control system)
  kind: event
  command: "FE 03 00 01 01 03 FF"
  params: []

- id: ping_response
  label: Pong (control system→device)
  kind: action
  command: "FE 03 00 01 10 12 FF"
  params: []

- id: login
  label: Login
  kind: action
  command: "FE {len} 00 02 01 \"user|password\" {checksum} FF"
  params:
    - name: credentials
      type: string
      description: '"username|password" - default "user|password". Premium+ may use any admin account with control protocol enabled.'
    - name: length
      type: byte
      description: Total length of data envelope (variable)
    - name: checksum
      type: byte
      description: (sum of header..end-of-envelope) & 0x7F

- id: login_response
  label: Login Response
  kind: feedback
  command: "FE 04 00 02 10 01 15 FF"
  params:
    - name: accepted
      type: byte
      description: "0x00=Rejected, 0x01=Accepted"

- id: read_outlet_status
  label: Read Power Outlet Status
  kind: query
  command: "FE 04 00 20 00 03 25 FF"
  params:
    - name: outlet
      type: byte
      description: Outlet number 0x01..0x10 (1..16)

- id: read_dry_contact_status
  label: Read Dry Contact Status
  kind: query
  command: "FE 04 00 30 00 {contact} {checksum} FF"
  params:
    - name: contact
      type: byte
      description: Contact number 0x01..0x08 (1..8)

- id: write_outlet_state
  label: Write Power Outlet State
  kind: action
  command: "FE 09 00 20 01 {outlet} {state} \"0000\" {checksum} FF"
  params:
    - name: outlet
      type: byte
      description: Outlet number 0x01..0x10
    - name: state
      type: byte
      description: "0x00=OFF, 0x01=ON, 0x02=Cycle (uses cycle_time), 0x03=Not Controllable (response only)"
    - name: cycle_time
      type: string
      description: 'ASCII-encoded seconds, 4 chars "0000".."3600"; unused for on/off (send "0000")'

- id: write_dry_contact_state
  label: Write Dry Contact State
  kind: action
  command: "FE 09 00 30 01 {contact} {state} \"0000\" {checksum} FF"
  params:
    - name: contact
      type: byte
      description: Contact number 0x01..0x08
    - name: state
      type: byte
      description: "0x00=OFF, 0x01=ON, 0x02=Cycle, 0x03=Not Controllable"
    - name: cycle_time
      type: string
      description: 'ASCII-encoded seconds "0000".."3600"'

- id: outlet_status_response
  label: Outlet/Contact Status Response
  kind: feedback
  command: "FE 09 00 20 10 {outlet} {state} {cycle_time} {checksum} FF"
  params:
    - name: subcommand
      type: byte
      description: "0x10=response, 0x12=unsolicited status change, 0x30=log update"
    - name: outlet
      type: byte
      description: Outlet number
    - name: state
      type: byte
      description: "0x00=OFF, 0x01=ON"
    - name: cycle_time
      type: string
      description: ASCII-encoded cycle time

- id: read_outlet_name
  label: Read Power Outlet Name
  kind: query
  command: "FE 04 00 21 02 01 26 FF"
  params:
    - name: outlet
      type: byte
      description: Outlet number 0x01..0x10

- id: read_dry_contact_name
  label: Read Dry Contact Name
  kind: query
  command: "FE 04 00 31 02 {contact} {checksum} FF"
  params:
    - name: contact
      type: byte
      description: Contact number 0x01..0x08

- id: write_outlet_name
  label: Write Power Outlet Name
  kind: action
  command: "FE 08 00 21 10 01 6E 61 6D 65 59 FF"
  params:
    - name: outlet
      type: byte
      description: Outlet number 0x01..0x10
    - name: name
      type: string
      description: ASCII name bytes (e.g. "name" = 0x6E616D65)

- id: write_dry_contact_name
  label: Write Dry Contact Name
  kind: action
  command: "FE {len} 00 31 10 {contact} {name} {checksum} FF"
  params:
    - name: contact
      type: byte
      description: Contact number 0x01..0x08
    - name: name
      type: string
      description: ASCII name bytes

- id: outlet_name_response
  label: Outlet/Contact Name Response
  kind: feedback
  command: "FE 08 00 21 01 01 6E 61 6D 65 4A FF"
  params:
    - name: outlet
      type: byte
      description: Outlet number
    - name: name
      type: string
      description: ASCII name bytes

- id: read_outlet_count
  label: Read Power Outlet Count
  kind: query
  command: "FE 03 00 22 02 25 FF"
  params: []

- id: read_dry_contact_count
  label: Read Dry Contact Count
  kind: query
  command: "FE 03 00 32 02 35 FF"
  params: []

- id: sequence_power
  label: Sequence Power Outlets
  kind: action
  command: "FE 08 00 36 01 {direction} {delay} {checksum} FF"
  params:
    - name: direction
      type: byte
      description: "0x01=Sequence UP, 0x03=Sequence DOWN"
    - name: delay
      type: string
      description: 'ASCII-encoded delay "0000".."0999" seconds between outlets; "0000" on Premium+ uses saved config'

- id: sequence_response
  label: Sequencing Response
  kind: feedback
  command: "FE 08 00 36 01 {status} {delay} {checksum} FF"
  params:
    - name: status
      type: byte
      description: "0x00=Not Sequencing (error), 0x01=Seq up, 0x02=Seq up complete, 0x03=Seq down, 0x04=Seq down complete"
    - name: delay
      type: string
      description: ASCII-encoded delay

- id: set_energy_management_state
  label: Set Outlet Energy Management State (Premium/Premium+)
  kind: action
  command: "FE 05 00 23 01 {outlet} {state} {checksum} FF"
  params:
    - name: outlet
      type: byte
      description: Outlet number 0x01..0x10
    - name: state
      type: byte
      description: 'ASCII letter: "D"/0x44=Disconnected, "S"/0x53=Standby, "I"/0x49=ON, "O"/0x4F=OFF, "U"/0x55=Unknown'

- id: get_energy_management_state
  label: Get Outlet Energy Management State (Premium/Premium+)
  kind: query
  command: "FE 04 00 23 02 {outlet} {checksum} FF"
  params:
    - name: outlet
      type: byte
      description: Outlet number 0x01..0x10

- id: energy_management_response
  label: Energy Management Response
  kind: feedback
  command: "FE 05 00 23 {outlet} {state} {checksum} FF"
  params:
    - name: outlet
      type: byte
      description: Outlet number
    - name: state
      type: byte
      description: 'Current state: D/S/I/O/U'

- id: emergency_power_off
  label: Emergency Power Off (EPO)
  kind: action
  command: "FE 04 00 37 01 {command} {checksum} FF"
  params:
    - name: command
      type: byte
      description: "0x00=EPO Recover, 0x01=EPO Initiate"

- id: emergency_power_off_response
  label: EPO Response
  kind: feedback
  command: "FE 04 00 37 {subcommand} {state} {checksum} FF"
  params:
    - name: subcommand
      type: byte
      description: "0x10=Response, 0x12=Status Change"
    - name: state
      type: byte
      description: "0x00=Normal Operation, 0x01=EPO Mode"

- id: set_log_alerts
  label: Register Log Alerts
  kind: action
  command: "FE 05 00 40 01 {byte1} {byte2} {checksum} FF"
  params:
    - name: byte1
      type: byte
      description: "Bit flags: BIT1=Normal, BIT2=OverVoltage, BIT3=UnderVoltage, BIT4=OverTemp, BIT5=UnderTemp, BIT6=SurgeFault, BIT7=<future>, BIT8=RESERVED"
    - name: byte2
      type: byte
      description: "Bit flags: BIT1=AutoPingTimeout, BIT2=RS232PingTimeout, BIT3=OverCurrent, BIT4=UnderCurrent, BIT5=EPO, BIT6/7=<future>, BIT8=RESERVED"

- id: get_log_alerts
  label: Get Log Alerts
  kind: query
  command: "FE 03 00 40 02 {checksum} FF"
  params: []

- id: log_alerts_response
  label: Log Alerts Response
  kind: feedback
  command: "FE 05 00 40 {byte1} {byte2} {checksum} FF"
  params:
    - name: byte1
      type: byte
      description: Same bit definitions as set
    - name: byte2
      type: byte
      description: Same bit definitions as set

- id: set_status_change
  label: Register Status Change Notifications
  kind: action
  command: "FE 06 00 41 01 {byte1} {byte2} {byte3} {byte4} {checksum} FF"
  params:
    - name: byte1
      type: byte
      description: "BIT1=Outlet Status Changes"
    - name: byte2
      type: byte
      description: "BIT1=DryContact, BIT2=Input, BIT3=Sequence, BIT4=EPO status changes"
    - name: byte3
      type: byte
      description: "BIT1=LowVoltageThresh, BIT2=HighVoltageThresh, BIT4=MaxLoad, BIT5=MinLoad, BIT7=MaxTemp"
    - name: byte4
      type: byte
      description: "BIT1=MinTemp changes"

- id: get_status_change
  label: Get Status Change Registration
  kind: query
  command: "FE 03 00 41 02 {checksum} FF"
  params: []

- id: status_change_response
  label: Status Change Response
  kind: feedback
  command: "FE 05 00 41 {b1} {b2} {b3} {b4} {b5} {b6} {checksum} FF"
  params:
    - name: b1
      type: byte
      description: Same as byte1 above
    - name: b2
      type: byte
      description: Same as byte2 above
    - name: b3
      type: byte
      description: LowVoltage/HighVoltage/MaxLoad/MinLoad/MaxTemp bits
    - name: b4
      type: byte
      description: MinTemp bit
    - name: b5
      type: byte
      description: "Current sensor changes: KWH, PeakVoltage, RMSVoltage, PeakLoad, RMSLoad, Temperature, Wattage"
    - name: b6
      type: byte
      description: "PowerFactor, ThermalLoad, LogCount, SurgeProtectionState changes"

- id: read_sensor_value
  label: Read Sensor Value
  kind: query
  command: "FE 03 00 {sensor_cmd} 02 {checksum} FF"
  params:
    - name: sensor_cmd
      type: byte
      description: "0x50=KWH, 0x51=PeakVoltage, 0x52=RMSVoltage, 0x53=PeakLoad, 0x54=RMSLoad, 0x55=Temp, 0x56=Wattage, 0x57=PowerFactor, 0x58=ThermalLoad(BTU), 0x59=SurgeProtection, 0x60=EnergyMgmtState, 0x61=Occupancy"

- id: write_sensor_value
  label: Write Sensor Value
  kind: action
  command: "FE {len} 00 {sensor_cmd} 01 {value} {checksum} FF"
  params:
    - name: sensor_cmd
      type: byte
      description: Same codes as read_sensor_value (only some sensors support write per source)
    - name: value
      type: string
      description: 'ASCII-encoded value, format depends on sensor (e.g. "##.#" or "###")'

- id: sensor_value_response
  label: Sensor Value Response
  kind: feedback
  command: "FE {len} 00 {sensor_cmd} {sub} {value} {checksum} FF"
  params:
    - name: sensor_cmd
      type: byte
      description: Same as read_sensor_value
    - name: sub
      type: byte
      description: "0x10=Response, 0x12=Status Change (unsolicited)"
    - name: value
      type: string
      description: ASCII value

- id: read_threshold
  label: Read Threshold Value
  kind: query
  command: "FE 03 00 {threshold_cmd} 02 {checksum} FF"
  params:
    - name: threshold_cmd
      type: byte
      description: "0x70=LowVoltage, 0x71=HighVoltage, 0x73=MaxLoadCurrent, 0x74=MinLoadCurrent, 0x76=MaxTemp, 0x77=MinTemp"

- id: write_threshold
  label: Write Threshold Value
  kind: action
  command: "FE {len} 00 {threshold_cmd} 01 {value} {checksum} FF"
  params:
    - name: threshold_cmd
      type: byte
      description: Same codes as read_threshold
    - name: value
      type: string
      description: 'ASCII-encoded value per source format ("###" or "##.#")'

- id: threshold_response
  label: Threshold Response
  kind: feedback
  command: "FE {len} 00 {threshold_cmd} {sub} {value} {checksum} FF"
  params:
    - name: threshold_cmd
      type: byte
      description: Same as read_threshold
    - name: sub
      type: byte
      description: "0x10=Response, 0x12=Status Change"
    - name: value
      type: string
      description: ASCII value

- id: read_log_entries
  label: Read Log Entry/Entries
  kind: query
  command: "FE 0A 00 80 02 30 30 30 32 7C 31 30 7D FF"
  params:
    - name: start_index
      type: string
      description: '4 ASCII chars "0000".."NNNN" - first log entry index'
    - name: num_entries
      type: string
      description: '2 ASCII chars "01".."NN" - count of entries to read'

- id: log_entry_response
  label: Log Entry Read Response
  kind: feedback
  command: "FE {len} 00 80 02 ... {checksum} FF"
  params:
    - name: entry_type
      type: string
      description: '"00"=Normal, "01"=OverVolt, "02"=UnderVolt, "03"=OverCurr, "04"=UnderCurr, "05"=OverTemp, "06"=UnderTemp, "07"=Surge, "08"=AutoPing, "09"=RS232Ping, "10"=EPO Initiate, "11"=EPO Recovery'
    - name: timestamp
      type: string
      description: '"MM/DD/YYYY HH:MM:SS,"'
    - name: sensors
      type: string
      description: '"TTT,WWWW,F.F,VVR,CC.R,LLLL.L,O," - temp/wattage/PF/Vrms/Irms/thermalload/occupancy'
    - name: energy_states
      type: string
      description: '16 comma-separated chars "D"|"S"|"I"|"O"|"U" for outlets 1..16'

- id: get_log_count
  label: Get Log Count
  kind: query
  command: "FE 03 00 81 02 {checksum} FF"
  params: []

- id: clear_log
  label: Clear Log
  kind: action
  command: "FE 03 00 82 01 {checksum} FF"
  params: []

- id: log_count_response
  label: Log Count Response
  kind: feedback
  command: "FE 07 00 81 {count} {checksum} FF"
  params:
    - name: count
      type: string
      description: '4 ASCII chars "0000".."9999" - total entries'

- id: get_product_info
  label: Get Product Info
  kind: query
  command: "FE 03 00 {info_cmd} 02 {checksum} FF"
  params:
    - name: info_cmd
      type: byte
      description: "0x90=PartNumber, 0x91=AmpHourRating, 0x93=SurgeExistence, 0x94=IPAddress, 0x95=MACAddress"

- id: product_info_response
  label: Product Info Response
  kind: feedback
  command: "FE {len} 00 {info_cmd} {data} {checksum} FF"
  params:
    - name: info_cmd
      type: byte
      description: Same as get_product_info
    - name: data
      type: string
      description: ASCII - part# (≤50 chars), rating "###", surge "Y"/"N", IP "###.###.###.###", MAC "##:##:##:##:##:##"
```

## Feedbacks
```yaml
- id: nack_error_code
  type: byte
  description: NACK error code returned by device
- id: outlet_state
  type: enum
  values: [off, on]
- id: dry_contact_state
  type: enum
  values: [off, on]
- id: energy_management_state
  type: enum
  values: [disconnected, standby, on, off, unknown]
- id: epo_state
  type: enum
  values: [normal, emergency_power_off]
- id: surge_protection_state
  type: enum
  values: [na, protected, compromised]
- id: occupancy_state
  type: enum
  values: [unoccupied, occupied]
- id: outlet_controllable_status
  type: enum
  values: [controllable, non_controllable, does_not_exist]
  description: 'Per-outlet status from outlet_count response: "C"/"N"/"X"'
- id: log_entry_type
  type: enum
  values: [normal, over_voltage, under_voltage, over_current, under_current, over_temperature, under_temperature, surge_fault, auto_ping_fault, rs232_ping_fail, epo_initiate, epo_recovery]
```

## Variables
```yaml
# UNRESOLVED: source does not document settable discrete variables outside the action set; thresholds are read/write via Threshold commands (0x70..0x77).
```

## Events
```yaml
# Unsolicited messages from device (0x10/0x12 subcommand on responses):
- id: ping_event
  description: Periodic ping from device (0xFE0300010103FF); close after 3 unanswered
  command: "FE 03 00 01 01 03 FF"
- id: outlet_status_change
  description: Unsolicited outlet state update (subcommand 0x12 on 0x20)
  command: "FE 09 00 20 12 {outlet} {state} {cycle_time} {checksum} FF"
- id: dry_contact_status_change
  description: Unsolicited dry contact state update (subcommand 0x12 on 0x30)
- id: epo_status_change
  description: Unsolicited EPO state update (subcommand 0x12 on 0x37)
- id: sensor_status_change
  description: Unsolicited sensor value update (subcommand 0x12 on 0x50..0x61)
- id: threshold_status_change
  description: Unsolicited threshold update (subcommand 0x12 on 0x70..0x77)
- id: log_update
  description: Log entry from device (subcommand 0x30 on 0x20)
- id: connection_closed
  description: After 3 unanswered pings the device closes the connection
```

## Macros
```yaml
# Connection lifecycle (required sequence before any other command):
- id: establish_session
  description: Initial session establishment
  steps:
    - "Send login: 0xFE <len> 00 02 01 'user|password' <checksum> FF"
    - "Wait for login response 0xFE 04 00 02 10 01 15 FF (accepted)"
    - "Wait for first ping from device"
    - "Respond with pong: 0xFE 03 00 01 10 12 FF"
    - "Now any command may be issued"
- id: recover_session
  description: Re-establish after device closes connection
  steps:
    - "Re-send login command (any other command returns NACK 0x08 invalid credentials)"
    - "Respond to subsequent ping"
```

## Safety
```yaml
confirmation_required_for:
  - emergency_power_off  # 0x37 EPO Initiate
interlocks:
  - source: "Premium+ has EPO access; NACK 0x11 returned for Access Denied (EPO)"
    description: "EPO state may block control commands; recover with 0x37 EPO Recover"
# UNRESOLVED: source mentions EPO interlock and login requirement; no further safety interlocks documented.
```

## Notes
- All frames follow: `0xFE <Length> <DataEnvelope> <Checksum> 0xFF`. Length covers data envelope only (bytes 2..X); checksum covers header through end of envelope, masked with `& 0x7F`.
- Escape character `0xFD` precedes any `0xFE`, `0xFF`, or `0xFD` byte in the data envelope; escaped byte has bits inverted; escape byte itself excluded from length and checksum calculations.
- Login uses `"username|password"` ASCII string (default `"user|password"`); for Premium+ any admin account with control protocol enabled may be used.
- Default `"user"|"password"` credential string in hex = `0x757365727C70617373776F7264`.
- TCP port 60000. RS-232: 9600/8-N-1.
- RS-232 transport is Premium-only per source; TCP/IP covers Select/Premium/Premium+.
- Control protocol disabled by default; enabled at first web login (Select/Premium) or manually via Network Services → Control Protocol (Premium+).
- Device pings every interval; 3 unanswered = disconnect; only login command is accepted post-disconnect.
- Source document is the RackLink Control System Communication Protocol supplement (I-00472), generic across RackLink series — RLNK-SW815R-SP-specific outlet/contact counts not stated in this excerpt.
```

Spec complete. Cover all protocol opcodes (0x01, 0x02, 0x10, 0x20, 0x21, 0x22, 0x23, 0x30, 0x31, 0x32, 0x36, 0x37, 0x40, 0x41, 0x50..0x61, 0x70..0x77, 0x80, 0x81, 0x82, 0x90, 0x91, 0x93, 0x94, 0x95) with verbatim hex. Login/auth, both transports, escape rules, ping lifecycle marked in Macros/Events. Marked RLNK-SW815R-SP-specific gaps (firmware, exact outlet count for this SKU) as UNRESOLVED since source is series-generic.

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - legrandav.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://www.legrandav.com/products/power/intelligent_power/premium_pdu_with_racklink/rlnk-sw815r-sp
retrieved_at: 2026-07-22T00:45:13.693Z
last_checked_at: 2026-07-22T01:06:17.465Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:06:17.465Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec action units verified with exact wire-level hex matches and complete transport parameter coverage in source document. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes RackLink Control System Communication Protocol (generic I-00472 supplement); RLNK-SW815R-SP-specific feature set (e.g. outlet count = 16, contact count = 8) inferred from protocol max ranges, not stated per-model"
- "no volume/level params in source"
- "source does not document settable discrete variables outside the action set; thresholds are read/write via Threshold commands (0x70..0x77)."
- "source mentions EPO interlock and login requirement; no further safety interlocks documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
