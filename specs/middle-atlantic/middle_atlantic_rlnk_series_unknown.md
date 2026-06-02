---
spec_id: admin/middle-atlantic-rlnk-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Middle Atlantic RackLink Series Control Spec"
manufacturer: "Middle Atlantic"
model_family: RLNK-Select
aliases: []
compatible_with:
  manufacturers:
    - "Middle Atlantic"
  models:
    - RLNK-Select
    - RLNK-Premium
    - RLNK-Premium+
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - digitalautomation.us
  - files.d-tools.com
  - markertek.com
  - files.avprosupply.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://digitalautomation.us/wp-content/uploads/2023/09/MiddleAtlantic_RacklinkSelect_IP.pdf
  - "http://files.d-tools.com/Visualizations/Approved/Middle%20Atlantic/Documents/Middle%20Atlantic_RLNK-915R_Manual1.PDF"
  - "https://www.markertek.com/Attachments/Manuals/MIDDLE%20ATLANTIC/RLNK-215-Manual.pdf"
  - https://files.avprosupply.com/files/attachments/13508/middle-atlantic-rlnk-215-manual.pdf
retrieved_at: 2026-05-27T02:31:54.772Z
last_checked_at: 2026-06-02T17:23:32.036Z
generated_at: 2026-06-02T17:23:32.036Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-model command capability matrix is partially stated (e.g. RS-232 only on Premium, energy management only on Premium/Premium+); firmware revisions and per-firmware command gating are not stated."
  - "per-firmware-version command gating is not stated; voltage/current/power ratings are not stated; physical pinout of the RS-232 DB connector is not stated; default delay values for sequencing are not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:32.036Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source commands with correct opcodes, parameters, and transport details; full catalogue coverage. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Middle Atlantic RackLink Series Control Spec

## Summary
The Middle Atlantic RackLink (RLNK) Series is a family of rack power products (Select, Premium, Premium+) that expose a binary control protocol over RS-232 (Premium only) and TCP/IP port 60000. Every frame is a fixed hex envelope: `0xFE <length> <data envelope> <checksum> 0xFF`, where the checksum is the 7-bit-masked sum of all bytes from the header through the end of the data envelope. A `Login` command (`user|password` by default) is required before any other command will be honored, and the device sends periodic `Ping` frames that the controller must answer or be disconnected after three misses.

<!-- UNRESOLVED: per-model command capability matrix is partially stated (e.g. RS-232 only on Premium, energy management only on Premium/Premium+); firmware revisions and per-firmware command gating are not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60000
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # protocol-specific Login command carries "Username|Password" (default "user|password")
```

**Frame format (all transports):** `0xFE <length> <data envelope> <checksum> 0xFF`
- `0xFE` = Header
- `<length>` = 1 byte = total bytes in data envelope
- `<data envelope>` = 3–250 bytes, always begins with a `0x00` prefix byte, then command + subcommand + payload
- `<checksum>` = `(sum of all bytes from 0xFE through end of data envelope) & 0x7F`
- `0xFF` = Tail

Reserved/protected bytes `0xFE`, `0xFF`, `0xFD` inside the data envelope must be escaped with `0xFD` + inverted value; the escape byte is excluded from length and checksum calculations.

## Traits
```yaml
- powerable       # inferred from outlet on/off and cycle commands
- queryable       # inferred from get-state, get-count, sensor, and log read commands
- routable        # inferred from power sequencing (sequence up / sequence down) commands
```

## Actions
```yaml
# ----- Session / link management -----
- id: ping
  label: Ping
  kind: action
  command: "FE 03 00 01 01 {checksum} FF"
  notes: |
    Device periodically sends this to the controller; controller must respond with Pong or
    be considered disconnected after three unanswered pings. Checksum always 0x03.
  params: []

- id: pong
  label: Ping Response
  kind: action
  command: "FE 03 00 01 10 {checksum} FF"
  notes: Response to a device-initiated Ping. Checksum always 0x12.
  params: []

- id: login
  label: Login
  kind: action
  command: "FE {length} 00 02 01 {credentials} {checksum} FF"
  notes: |
    Credentials encoded as ASCII "Username|Password". Default "user|password"
    (hex 75 73 65 72 7C 70 61 73 73 77 6F 72 64). Must be sent before any other command.
    On Premium+ the login username/password may reference any admin user with the control
    protocol enabled (no default "user" account).
  params:
    - name: credentials
      type: string
      description: ASCII string "Username|Password"

# ----- NACK (device-to-controller error response, not a controller-sent command) -----
# Documented for completeness; no action is sent by the controller.
# Error codes: 0x01 Bad CRC, 0x02 Bad Length, 0x03 Bad Escape, 0x04 Invalid command,
# 0x05 Invalid sub-command, 0x06 Wrong byte count, 0x07 Invalid data bytes,
# 0x08 Invalid Credentials, 0x10 Unknown Error, 0x11 Access Denied (EPO).

# ----- Outlets (0x20) and Dry Contacts (0x30) -----
- id: read_outlet_status
  label: Read Outlet Status
  kind: query
  command: "FE 04 00 20 02 {outlet} {checksum} FF"
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16 (0x01-0x10)

- id: read_contact_status
  label: Read Dry Contact Status
  kind: query
  command: "FE 04 00 30 02 {contact} {checksum} FF"
  params:
    - name: contact
      type: integer
      description: Dry contact number 1-8 (0x01-0x08)

- id: write_outlet_status
  label: Write Outlet State
  kind: action
  command: "FE 09 00 20 01 {outlet} {state} {cycle_time} {checksum} FF"
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16
    - name: state
      type: enum
      values: [off, on, cycle, not_controllable]
      description: "0x00 OFF, 0x01 ON, 0x02 Cycle (uses cycle_time), 0x03 Not Controllable (response only)"
    - name: cycle_time
      type: string
      description: ASCII 4 digits, 0000-3600 seconds; send 0x30 0x30 0x30 0x30 ("0000") for on/off

- id: write_contact_status
  label: Write Dry Contact State
  kind: action
  command: "FE 09 00 30 01 {contact} {state} {cycle_time} {checksum} FF"
  params:
    - name: contact
      type: integer
      description: Dry contact number 1-8
    - name: state
      type: enum
      values: [off, on, cycle]
      description: "0x00 OFF, 0x01 ON, 0x02 Cycle"
    - name: cycle_time
      type: string
      description: ASCII 4 digits, 0000-3600 seconds; send 0x30 0x30 0x30 0x30 ("0000") for on/off

# ----- Outlet (0x21) and Dry Contact (0x31) Names -----
- id: read_outlet_name
  label: Read Outlet Name
  kind: query
  command: "FE 04 00 21 02 {outlet} {checksum} FF"
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16

- id: write_outlet_name
  label: Write Outlet Name
  kind: action
  command: "FE {length} 00 21 01 {outlet} {name} {checksum} FF"
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16
    - name: name
      type: string
      description: ASCII name string

- id: read_contact_name
  label: Read Dry Contact Name
  kind: query
  command: "FE 04 00 31 02 {contact} {checksum} FF"
  params:
    - name: contact
      type: integer
      description: Dry contact number 1-8

- id: write_contact_name
  label: Write Dry Contact Name
  kind: action
  command: "FE {length} 00 31 01 {contact} {name} {checksum} FF"
  params:
    - name: contact
      type: integer
      description: Dry contact number 1-8
    - name: name
      type: string
      description: ASCII name string

# ----- Outlet (0x22) and Dry Contact (0x32) Counts -----
- id: read_outlet_count
  label: Read Outlet Count
  kind: query
  command: "FE 03 00 22 02 25 FF"
  notes: Checksum always 0x25; tail always 0xFF. No variable params.
  params: []

- id: read_contact_count
  label: Read Dry Contact Count
  kind: query
  command: "FE 03 00 32 02 35 FF"
  notes: Checksum always 0x35; tail always 0xFF. No variable params.
  params: []

# ----- Power Sequencing (0x36) -----
- id: sequence_outlets
  label: Power Sequence
  kind: action
  command: "FE 08 00 36 01 {direction} {delay} {checksum} FF"
  notes: |
    Premium+ ignores the delay field and uses its configured per-outlet delay (send
    0x30 0x30 0x30 0x30 "0000"). Non-Premium+: delay 0000-0999 seconds ASCII.
  params:
    - name: direction
      type: enum
      values: [up, down]
      description: "0x01 Sequence Up, 0x03 Sequence Down"
    - name: delay
      type: string
      description: ASCII 4 digits, 0000-0999 seconds

# ----- Energy Management (0x23, Premium/Premium+ only) -----
- id: set_outlet_energy_state
  label: Set Outlet Energy State
  kind: action
  command: "FE 05 00 23 01 {outlet} {state} {checksum} FF"
  notes: Premium/Premium+ only.
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16
    - name: state
      type: enum
      values: [disconnected, standby, on, off, unknown]
      description: |
        ASCII letter: 0x44 D, 0x53 S, 0x49 I (ON), 0x4F O (OFF), 0x55 U (Unknown)

- id: get_outlet_energy_state
  label: Get Outlet Energy State
  kind: query
  command: "FE 04 00 23 02 {outlet} {checksum} FF"
  notes: Premium/Premium+ only.
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16

# ----- Emergency Power Off (0x37) -----
- id: epo
  label: Emergency Power Off
  kind: action
  command: "FE 04 00 37 01 {action} {checksum} FF"
  safety: critical
  notes: |
    EPO Initiate (0x01) cuts outlet power. EPO Recover (0x00) restores operation.
    NACK code 0x11 "Access Denied (EPO)" indicates an active EPO.
  params:
    - name: action
      type: enum
      values: [recover, initiate]
      description: "0x00 EPO Recover, 0x01 EPO Initiate"

# ----- Log Alerts Registration (0x40) -----
- id: get_log_alerts
  label: Get Log Alert Registration
  kind: query
  command: "FE 03 00 40 02 {checksum} FF"
  params: []

- id: set_log_alerts
  label: Set Log Alert Registration
  kind: action
  command: "FE 05 00 40 01 {byte1} {byte2} {checksum} FF"
  notes: |
    Two-bitfield bytes. Byte 1: bit1 Normal, bit2 OverV, bit3 UnderV, bit4 OverTemp,
    bit5 UnderTemp, bit6 Surge. Byte 2: bit1 AutoPing, bit2 RS232Ping, bit3 OverI,
    bit4 UnderI, bit5 EPO.
  params:
    - name: byte1
      type: integer
      description: Bitfield byte 1
    - name: byte2
      type: integer
      description: Bitfield byte 2

# ----- Status Change Registration (0x41) -----
- id: get_status_change_registration
  label: Get Status Change Registration
  kind: query
  command: "FE 03 00 41 02 {checksum} FF"
  params: []

- id: set_status_change_registration
  label: Set Status Change Registration
  kind: action
  command: "FE 06 00 41 01 {b1} {b2} {b3} {b4} {checksum} FF"
  notes: |
    Four-bitfield bytes. See source for per-bit meanings (outlet/contact/EPO/sequence/
    threshold/sensor change enable bits).
  params:
    - name: b1
      type: integer
      description: Bitfield byte 1
    - name: b2
      type: integer
      description: Bitfield byte 2
    - name: b3
      type: integer
      description: Bitfield byte 3
    - name: b4
      type: integer
      description: Bitfield byte 4

# ----- Sensor Values (0x50-0x61) -----
- id: get_kilowatt_hours
  label: Get Kilowatt Hours
  kind: query
  command: "FE 03 00 50 02 {checksum} FF"
  notes: Response value format "##########.#" (10 integer + 1 decimal digits).
  params: []

- id: get_peak_voltage
  label: Get Peak Voltage
  kind: query
  command: "FE 03 00 51 02 {checksum} FF"
  notes: Response format "###".
  params: []

- id: get_rms_voltage
  label: Get RMS Voltage
  kind: query
  command: "FE 03 00 52 02 {checksum} FF"
  notes: Response format "###".
  params: []

- id: get_peak_load
  label: Get Peak Load
  kind: query
  command: "FE 03 00 53 02 {checksum} FF"
  notes: Response format "##.#".
  params: []

- id: get_rms_load
  label: Get RMS Load
  kind: query
  command: "FE 03 00 54 02 {checksum} FF"
  notes: Response format "##.#".
  params: []

- id: get_temperature
  label: Get Temperature
  kind: query
  command: "FE 03 00 55 02 {checksum} FF"
  notes: Response format "###" (Fahrenheit).
  params: []

- id: get_wattage
  label: Get Wattage
  kind: query
  command: "FE 03 00 56 02 {checksum} FF"
  notes: Response format "####".
  params: []

- id: get_power_factor
  label: Get Power Factor
  kind: query
  command: "FE 03 00 57 02 {checksum} FF"
  notes: Response format "#.#".
  params: []

- id: get_thermal_load
  label: Get Thermal Load (BTU)
  kind: query
  command: "FE 03 00 58 02 {checksum} FF"
  notes: Response format "####.#".
  params: []

- id: get_surge_protection_state
  label: Get Surge Protection State
  kind: query
  command: "FE 03 00 59 02 {checksum} FF"
  notes: "Response: 0x00 n/a, 0x01 protected, 0x02 compromised."
  params: []

- id: get_energy_management_state
  label: Get Energy Management State (all outlets)
  kind: query
  command: "FE 03 00 60 02 {checksum} FF"
  notes: 16 ASCII letters, one per outlet (D/S/I/O/U).
  params: []

- id: get_occupancy_state
  label: Get Occupancy State
  kind: query
  command: "FE 03 00 61 02 {checksum} FF"
  notes: "Response: 0x55 'U' Unoccupied, 0x4F 'O' Occupied."
  params: []

# ----- Thresholds (0x70-0x77) -----
- id: get_low_voltage_threshold
  label: Get Low Voltage Threshold
  kind: query
  command: "FE 03 00 70 02 {checksum} FF"
  params: []

- id: set_low_voltage_threshold
  label: Set Low Voltage Threshold
  kind: action
  command: "FE {length} 00 70 01 {value} {checksum} FF"
  params:
    - name: value
      type: string
      description: ASCII "###"

- id: get_high_voltage_threshold
  label: Get High Voltage Threshold
  kind: query
  command: "FE 03 00 71 02 {checksum} FF"
  params: []

- id: set_high_voltage_threshold
  label: Set High Voltage Threshold
  kind: action
  command: "FE {length} 00 71 01 {value} {checksum} FF"
  params:
    - name: value
      type: string
      description: ASCII "###"

- id: get_max_load_current
  label: Get Max Load Current
  kind: query
  command: "FE 03 00 73 02 {checksum} FF"
  params: []

- id: set_max_load_current
  label: Set Max Load Current
  kind: action
  command: "FE {length} 00 73 01 {value} {checksum} FF"
  params:
    - name: value
      type: string
      description: ASCII "##.#"

- id: get_min_load_current
  label: Get Min Load Current
  kind: query
  command: "FE 03 00 74 02 {checksum} FF"
  params: []

- id: set_min_load_current
  label: Set Min Load Current
  kind: action
  command: "FE {length} 00 74 01 {value} {checksum} FF"
  params:
    - name: value
      type: string
      description: ASCII "##.#"

- id: get_max_temperature
  label: Get Max Temperature
  kind: query
  command: "FE 03 00 76 02 {checksum} FF"
  params: []

- id: set_max_temperature
  label: Set Max Temperature
  kind: action
  command: "FE {length} 00 76 01 {value} {checksum} FF"
  params:
    - name: value
      type: string
      description: ASCII "###"

- id: get_min_temperature
  label: Get Min Temperature
  kind: query
  command: "FE 03 00 77 02 {checksum} FF"
  params: []

- id: set_min_temperature
  label: Set Min Temperature
  kind: action
  command: "FE {length} 00 77 01 {value} {checksum} FF"
  params:
    - name: value
      type: string
      description: ASCII "###"

# ----- Log read / count / clear (0x80-0x82) -----
- id: read_log_entries
  label: Read Log Entries
  kind: query
  command: "FE 0A 00 80 02 {start_idx} 7C {count} {checksum} FF"
  notes: |
    start_idx is ASCII 4 digits ("0002" = entry 2). count is ASCII 2 digits ("10" = 10).
    Separator 0x7C = "|". Response is one frame per entry.
  params:
    - name: start_idx
      type: string
      description: ASCII 4-digit starting index
    - name: count
      type: string
      description: ASCII 2-digit entry count

- id: get_log_count
  label: Get Log Count
  kind: query
  command: "FE 03 00 81 02 {checksum} FF"
  notes: Response data is ASCII 4-digit count (e.g. "0120" = 120).
  params: []

- id: clear_log
  label: Clear Log
  kind: action
  command: "FE 03 00 82 01 {checksum} FF"
  params: []

# ----- Product info (0x90, 0x91, 0x93, 0x94, 0x95) -----
- id: get_part_number
  label: Get Part Number
  kind: query
  command: "FE 03 00 90 02 {checksum} FF"
  notes: Response: ASCII string up to 50 characters.
  params: []

- id: get_amp_hour_rating
  label: Get Amp Hour Rating
  kind: query
  command: "FE 03 00 91 02 {checksum} FF"
  notes: Response format "###".
  params: []

- id: get_surge_existence
  label: Get Surge Existence
  kind: query
  command: "FE 03 00 93 02 {checksum} FF"
  notes: 'Response: "Y" or "N".'
  params: []

- id: get_ip_address
  label: Get Current IP Address
  kind: query
  command: "FE 03 00 94 02 {checksum} FF"
  notes: Response: ASCII IPv4 "###.###.###.###" (no leading zeroes, variable length).
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "FE 03 00 95 02 {checksum} FF"
  notes: Response: ASCII "##:##:##:##:##:##".
  params: []
```

## Feedbacks
```yaml
- id: outlet_state
  type: enum
  values: [off, on, not_controllable]
  description: Per-outlet state (0x20/0x30 response/status, subcommand 0x10/0x12/0x30)

- id: contact_state
  type: enum
  values: [off, on]
  description: Per-dry-contact state

- id: outlet_controllable_mask
  type: string
  description: 16-byte mask (0x22 response): "C" controllable, "N" not-controllable, "X" absent

- id: contact_controllable_mask
  type: string
  description: 8-byte mask (0x32 response)

- id: sequence_state
  type: enum
  values: [idle, sequencing_up, sequencing_up_complete, sequencing_down, sequencing_down_complete]
  description: 0x36 response; 0x00 idle/fallback, 0x01 up, 0x02 up-complete, 0x03 down, 0x04 down-complete

- id: energy_state
  type: enum
  values: [disconnected, standby, on, off, unknown]
  description: 0x23 response: D/S/I/O/U

- id: epo_state
  type: enum
  values: [normal, epo_mode]
  description: 0x37 response: 0x00 normal, 0x01 EPO mode

- id: surge_state
  type: enum
  values: [n_a, protected, compromised]
  description: 0x59 response

- id: occupancy_state
  type: enum
  values: [unoccupied, occupied]
  description: 0x61 response

- id: login_result
  type: enum
  values: [rejected, accepted]
  description: 0x02 response: 0x00 rejected, 0x01 accepted

- id: nack_code
  type: integer
  description: |
    Error code from NACK (0x10): 0x01 BadCRC, 0x02 BadLength, 0x03 BadEscape,
    0x04 InvalidCmd, 0x05 InvalidSub, 0x06 BadByteCount, 0x07 BadDataBytes,
    0x08 InvalidCreds, 0x10 UnknownError, 0x11 AccessDeniedEPO
```

## Variables
```yaml
- name: outlet_name
  type: string
  description: Per-outlet label (1-16), writable via 0x21 set

- name: contact_name
  type: string
  description: Per-dry-contact label (1-8), writable via 0x31 set

- name: low_voltage_threshold
  type: string
  description: ASCII "###"; 0x70

- name: high_voltage_threshold
  type: string
  description: ASCII "###"; 0x71

- name: max_load_current
  type: string
  description: ASCII "##.#"; 0x73

- name: min_load_current
  type: string
  description: ASCII "##.#"; 0x74

- name: max_temperature
  type: string
  description: ASCII "###"; 0x76

- name: min_temperature
  type: string
  description: ASCII "###"; 0x77
```

## Events
```yaml
- id: outlet_status_change
  description: 0x20/0x30 response with subcommand 0x12 (status update) - pushed on local change. Requires bit 1 of Register Status Change byte 1 to be enabled.

- id: outlet_log_update
  description: 0x20/0x30 response with subcommand 0x30 (scheduled log report).

- id: status_change
  description: 0x23 response with subcommand 0x12 (status change, Premium/Premium+).

- id: epo_status_change
  description: 0x37 response with subcommand 0x12 (EPO state changed).

- id: sensor_status_change
  description: Sensor (0x50-0x61) response with subcommand 0x12; requires the corresponding bit in Register Status Change bytes 5-6 to be enabled.

- id: threshold_status_change
  description: Threshold (0x70-0x77) response with subcommand 0x12.

- id: log_entry
  description: 0x80 multi-frame response carrying one log record each.

- id: log_alert
  description: 0x40 unsolicited alert; requires the corresponding bit in Register Log Alerts bytes 1-2 to be enabled.
```

## Macros
```yaml
- id: sequence_up
  description: 0x36 direction 0x01 - bring outlets on in configured order with delay between each
  steps:
    - send: sequence_outlets
      params: {direction: up, delay: "<configured seconds 0000-0999>"}

- id: sequence_down
  description: 0x36 direction 0x03 - turn outlets off in configured order
  steps:
    - send: sequence_outlets
      params: {direction: down, delay: "<configured seconds 0000-0999>"}

- id: login_and_pong
  description: Required session establishment sequence
  steps:
    - send: login
      params: {credentials: "user|password"}
    - wait: device-initiated ping
    - send: pong
```

## Safety
```yaml
confirmation_required_for:
  - epo  # EPO Initiate cuts outlet power; NACK 0x11 blocks other commands until EPO Recover
interlocks:
  - "EPO active blocks all commands except EPO Recover (NACK 0x11 Access Denied)"
  - "Login must be re-established after three missed pings; device enters disconnected state and NACKs subsequent commands"
```

## Notes
- **Frame construction**: every command must be assembled per the frame format. `length` = bytes in the data envelope (between the length byte and the checksum, inclusive of the leading `0x00` prefix). `checksum` = `(sum of bytes from 0xFE through end of data envelope) & 0x7F`. Escape any `0xFE`/`0xFF`/`0xFD` inside the data envelope with `0xFD` + inverted value; the escape byte is excluded from length and checksum.
- **Model variants**:
  - **Select**: TCP/IP only. Default `user`/`password` login is enabled by first web login.
  - **Premium**: RS-232 and TCP/IP. Default `user`/`password` login enabled by first web login.
  - **Premium+**: TCP/IP. No default `user` account; login username/password must reference any admin account with the control protocol checkbox enabled. Energy management and sensor/threshold features are Premium/Premium+ only.
- **Subcommand semantics**: in responses, subcommand `0x10` is the reply to a controller command, `0x12` is an unsolicited status update, `0x30` is a log report. `0x01` is always the SET/WRITE form and `0x02` is always the GET/READ form.
- **Cycle time encoding**: cycle time fields are 4 ASCII digits, not binary, even though the rest of the protocol is binary hex. The decimal point is part of the ASCII string for sensor/threshold values that include one.
- **Ping policy**: pings are device-initiated. Three unanswered pings → connection considered lost; controller must re-login to resume.

<!-- UNRESOLVED: per-firmware-version command gating is not stated; voltage/current/power ratings are not stated; physical pinout of the RS-232 DB connector is not stated; default delay values for sequencing are not stated. -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - digitalautomation.us
  - files.d-tools.com
  - markertek.com
  - files.avprosupply.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://digitalautomation.us/wp-content/uploads/2023/09/MiddleAtlantic_RacklinkSelect_IP.pdf
  - "http://files.d-tools.com/Visualizations/Approved/Middle%20Atlantic/Documents/Middle%20Atlantic_RLNK-915R_Manual1.PDF"
  - "https://www.markertek.com/Attachments/Manuals/MIDDLE%20ATLANTIC/RLNK-215-Manual.pdf"
  - https://files.avprosupply.com/files/attachments/13508/middle-atlantic-rlnk-215-manual.pdf
retrieved_at: 2026-05-27T02:31:54.772Z
last_checked_at: 2026-06-02T17:23:32.036Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:32.036Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source commands with correct opcodes, parameters, and transport details; full catalogue coverage. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-model command capability matrix is partially stated (e.g. RS-232 only on Premium, energy management only on Premium/Premium+); firmware revisions and per-firmware command gating are not stated."
- "per-firmware-version command gating is not stated; voltage/current/power ratings are not stated; physical pinout of the RS-232 DB connector is not stated; default delay values for sequencing are not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
