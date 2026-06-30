---
spec_id: admin/middle-atlantic-rlnk-1615v-1015v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Middle Atlantic RLNK 1615V / 1015V Control Spec"
manufacturer: "Middle Atlantic"
model_family: RLNK-1615V
aliases: []
compatible_with:
  manufacturers:
    - "Middle Atlantic"
  models:
    - RLNK-1615V
    - RLNK-1015V
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - agneovo.com
  - files.d-tools.com
  - markertek.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - "https://res.cloudinary.com/avd/image/upload/v133579764/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - "http://files.d-tools.com/Visualizations/Approved/Middle%20Atlantic/Documents/Middle%20Atlantic_RLNK-1615V_Manual2.PDF"
  - "https://www.markertek.com/Attachments/Manuals/MIDDLE%20ATLANTIC/RLNK-1615V-Manual.pdf"
retrieved_at: 2026-06-15T09:23:35.279Z
last_checked_at: 2026-06-16T07:08:36.090Z
generated_at: 2026-06-16T07:08:36.090Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model-tier mapping (Select vs Premium vs Premium+) for 1015V/1615V not explicitly stated in source; advanced commands (0x23, 0x37, 0x40, 0x41, thresholds) are documented as Premium/Premium+ only. Whether 1015V/1615V expose these commands is not confirmed."
  - "flow_control not stated in source"
  - "no multi-step sequences documented as named macros in source."
  - "vendor-specific power-on sequencing order / per-outlet default ON/OFF not documented in source."
  - "firmware version compatibility not stated in source"
  - "exact model-to-tier mapping (Select/Premium/Premium+) for RLNK-1015V and RLNK-1615V not explicitly stated"
  - "flow_control not specified for RS-232"
  - "TCP keepalive / connection timeout values not stated (3 missed pings mentioned, ping interval not stated)"
  - "voltage/current/power ratings not present in protocol doc (see product datasheet)"
  - "per-outlet default state on power-up not stated"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:08:36.090Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions match literal opcodes in source; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Middle Atlantic RLNK 1615V / 1015V Control Spec

## Summary
Middle Atlantic RackLink RLNK-1615V (16-outlet) and RLNK-1015V (10-outlet) intelligent power distribution units. This spec covers the RackLink binary Control System Communication Protocol carried over TCP/IP (port 60000) for Select/Premium/Premium+ models, and optionally RS-232 for Premium-only hardware. The protocol uses a hexadecimal `<Header><Length><data envelope><Checksum><Tail>` framing with 7-bit masked summation checksum, requires login before any other command, and supports outlet state control, sequencing, energy/sensor queries, threshold configuration, EPO, and log retrieval.

<!-- UNRESOLVED: exact model-tier mapping (Select vs Premium vs Premium+) for 1015V/1615V not explicitly stated in source; advanced commands (0x23, 0x37, 0x40, 0x41, thresholds) are documented as Premium/Premium+ only. Whether 1015V/1615V expose these commands is not confirmed. -->

## Transport
```yaml
# Source documents two transports; availability depends on hardware tier.
# "RS232 Specifications (RackLink Premium Only)" - RS-232 not present on Select.
# "TCP/IP (RackLink Select, Premium, Premium+)" - TCP present on all tiers.
protocols:
  - tcp
  - serial
addressing:
  port: 60000  # stated for TCP/IP transport
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  # UNRESOLVED: flow_control not stated in source
  flow_control: null
auth:
  # Source explicitly requires login before any other command.
  type: credentials
  notes: "Login command 0x02 with payload \"Username|Password\"; default \"user|password\". Control Protocol disabled by default, enabled at first webpage login (Select/Premium) or via Device Setting -> Network Services -> Control Protocol checkbox (Premium+). Three unanswered pings => considered disconnected; must re-login."
```

## Traits
```yaml
traits:
  - powerable      # inferred from outlet ON/OFF/Cycle commands (0x20)
  - queryable      # inferred from Get subcommands across outlet/sensor/threshold/info
  - sequencable    # inferred from 0x36 Sequence UP/DOWN command
  - faultable      # inferred from 0x37 EPO and NACK error reporting
```

## Actions
```yaml
actions:
  # ---- Session ----
  - id: login
    label: Login
    kind: action
    command: "FE {len} 00 02 01 {username}|{password} {checksum} FF"
    notes: "Literal sample: 0xFE10000201757365727C70617373776F72643FFF (user|password). Required before any other command. Premium+ uses arbitrary admin account; Select/Premium use \"user\" + webpage-set password."
    params:
      - name: username
        type: string
        description: Account username (default "user")
      - name: password
        type: string
        description: Account password

  - id: ping_response
    label: Ping Response / Pong
    kind: action
    command: "FE 03 00 01 10 12 FF"
    notes: "Control System replies to device-initiated 0x01 PING. Failure to respond to 3 pings => disconnect. Sample device request: 0xFE0300010103FF."

  # ---- Outlet / Dry Contact State (0x20 / 0x30) ----
  - id: read_outlet_state
    label: Read Outlet State
    kind: query
    command: "FE 04 00 20 02 {outlet} {checksum} FF"
    notes: "Use 0x30 for Dry Contact instead of 0x20. Sample: 0xfe040020000325ff (read outlet 3)."
    params:
      - name: outlet
        type: integer
        description: Outlet 1..16 (or contact 1..8 when using 0x30)

  - id: set_outlet_state
    label: Set Outlet State
    kind: action
    command: "FE 09 00 20 01 {outlet} {state} {cycletime_4_ascii} {checksum} FF"
    notes: "Length always 0x09. Use 0x30 for Dry Contact. state: 0x00=OFF, 0x01=ON, 0x02=Cycle (set seconds next), 0x03=Not Controllable (response only). Cycle time 0000..3600 sent as 4 ASCII chars (e.g. 0x30303035 = 5 sec). For ON/OFF send 0000 (0x30303030). Samples: 0xfe090020010101303030306aff (Outlet 1 ON); 0xfe090020010200303030306aff (Outlet 2 OFF); 0xfe0900200102023030303571ff (Outlet 2 Cycle 5s)."
    params:
      - name: outlet
        type: integer
        description: Outlet 1..16 (or contact 1..8 for 0x30)
      - name: state
        type: enum
        description: "OFF | ON | Cycle | NotControllable"
      - name: cycle_seconds
        type: integer
        description: 0..3600, only meaningful for Cycle state

  # ---- Outlet / Contact Name (0x21 / 0x31) ----
  - id: read_outlet_name
    label: Read Outlet Name
    kind: query
    command: "FE 04 00 21 02 {outlet} {checksum} FF"
    notes: "Use 0x31 for Dry Contact. Sample: 0xFE040021020126FF (read name of outlet 1)."
    params:
      - name: outlet
        type: integer
        description: 1..16 (outlet) or 1..8 (contact)

  - id: set_outlet_name
    label: Set Outlet Name
    kind: action
    command: "FE {len} 00 21 01 {outlet} {name_ascii} {checksum} FF"
    notes: "Variable length. Use 0x31 for Dry Contact. Sample: FE08002110016E616D6559FF (set outlet 1 name to \"name\" = 0x6E616D65)."
    params:
      - name: outlet
        type: integer
        description: 1..16 (outlet) or 1..8 (contact)
      - name: name
        type: string
        description: ASCII string name

  # ---- Outlet / Contact Count (0x22 / 0x32) ----
  - id: read_outlet_count
    label: Read Outlet Count
    kind: query
    command: "FE 03 00 22 02 25 FF"
    notes: "Checksum byte always 0x25 for outlet count. Use 0x32 + checksum 0x35 for Dry Contact Count. Sample: 0xFE0300220225FF."

  # ---- Sequencing (0x36) ----
  - id: sequence_outlets
    label: Sequence Power Outlets
    kind: action
    command: "FE 08 00 36 01 {direction} {delay_4_ascii} {checksum} FF"
    notes: "Length always 0x08. direction: 0x01=Sequence UP, 0x03=Sequence DOWN. Delay 0000..0999 sec as 4 ASCII chars; 0000 on Premium+ uses saved settings. Samples: 0xFE08003601013030303301FF (up 3s); 0xFE08003601033030303505FF (down 5s); 0xFE0800360101303030307EFF (up, Premium+ saved)."
    params:
      - name: direction
        type: enum
        description: "UP (0x01) | DOWN (0x03)"
      - name: delay_seconds
        type: integer
        description: 0..999 (Premium+ ignore, use 0)

  # ---- Energy Management State (0x23) - Premium/Premium+ only ----
  - id: energy_management_set
    label: Set Energy Management State
    kind: action
    command: "FE 05 00 23 01 {outlet} {state_ascii} {checksum} FF"
    notes: "Premium/Premium+ only. state ASCII: 'D' Disconnected, 'S' Standby, 'I' ON, 'O' OFF, 'U' Unknown. 1 byte per outlet, 16 bytes total per response. Length 0x05 for SET."
    params:
      - name: outlet
        type: integer
        description: 1..16
      - name: state
        type: enum
        description: "Disconnected | Standby | ON | OFF | Unknown"

  - id: energy_management_get
    label: Get Energy Management State
    kind: query
    command: "FE 04 00 23 02 {outlet} {checksum} FF"
    notes: "Premium/Premium+ only. Length 0x04 for GET."
    params:
      - name: outlet
        type: integer
        description: 1..16

  # ---- Emergency Power Off (0x37) - Premium/Premium+ only ----
  - id: epo_set
    label: Emergency Power Off
    kind: action
    command: "FE 04 00 37 01 {epo_cmd} {checksum} FF"
    notes: "Premium/Premium+ only. epo_cmd: 0x00=EPO Recover, 0x01=EPO Initiate. SAFETY-CRITICAL - see Safety section."
    params:
      - name: epo_cmd
        type: enum
        description: "Recover (0x00) | Initiate (0x01)"

  # ---- Register Log Alerts (0x40) - Premium/Premium+ only ----
  - id: register_log_alerts_set
    label: Set Register Log Alerts
    kind: action
    command: "FE 05 00 40 01 {byte1} {byte2} {checksum} FF"
    notes: "Premium/Premium+ only. Length 0x05. byte1 bits: B1 Normal, B2 OverV, B3 UnderV, B4 OverTemp, B5 UnderTemp, B6 SurgeFault, B7 Future, B8 RESERVED. byte2 bits: B1 AutoPingTimeout, B2 RS232PingTimeout, B3 OverCurrent, B4 UnderCurrent, B5 EPO, B6/B7 Future, B8 RESERVED."
    params:
      - name: byte1
        type: integer
        description: Bitmask, see notes
      - name: byte2
        type: integer
        description: Bitmask, see notes

  - id: register_log_alerts_get
    label: Get Register Log Alerts
    kind: query
    command: "FE 03 00 40 02 {checksum} FF"
    notes: "Premium/Premium+ only. Length 0x03."

  # ---- Register Status Change (0x41) - Premium/Premium+ only ----
  - id: register_status_change_set
    label: Set Register Status Change
    kind: action
    command: "FE 06 00 41 01 {byte1} {byte2} {byte3} {byte4} {checksum} FF"
    notes: "Premium/Premium+ only. Length 0x06. Four data bytes per source table (byte1=OutletStatusChanges; byte2=DryContact/Input/Sequence/EPO; byte3=Voltage/Load/Temp thresholds; byte4=MinTemp). Source labels byte6/byte7 in the table but enumerates 4 data bytes - see Notes."
    params:
      - name: byte1
        type: integer
      - name: byte2
        type: integer
      - name: byte3
        type: integer
      - name: byte4
        type: integer

  - id: register_status_change_get
    label: Get Register Status Change
    kind: query
    command: "FE 03 00 41 02 {checksum} FF"
    notes: "Premium/Premium+ only. Length 0x03."

  # ---- Sensor Values (0x50..0x61) - Premium/Premium+ for some ----
  - id: sensor_kilowatt_hours_get
    label: Get Kilowatt Hours
    kind: query
    command: "FE 03 00 50 02 {checksum} FF"
    notes: "Format ##########.# (ASCII)."
  - id: sensor_kilowatt_hours_set
    label: Set Kilowatt Hours
    kind: action
    command: "FE {len} 00 50 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string
        description: ASCII numeric per format ##########.#

  - id: sensor_peak_voltage_get
    label: Get Peak Voltage
    kind: query
    command: "FE 03 00 51 02 {checksum} FF"
    notes: "Format ### (ASCII)."
  - id: sensor_peak_voltage_set
    label: Set Peak Voltage
    kind: action
    command: "FE {len} 00 51 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: sensor_rms_voltage_get
    label: Get RMS Voltage
    kind: query
    command: "FE 03 00 52 02 {checksum} FF"
    notes: "Format ### (ASCII)."
  - id: sensor_rms_voltage_set
    label: Set RMS Voltage
    kind: action
    command: "FE {len} 00 52 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: sensor_peak_load_get
    label: Get Peak Load
    kind: query
    command: "FE 03 00 53 02 {checksum} FF"
    notes: "Format ##.# (ASCII)."
  - id: sensor_peak_load_set
    label: Set Peak Load
    kind: action
    command: "FE {len} 00 53 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: sensor_rms_load_get
    label: Get RMS Load
    kind: query
    command: "FE 03 00 54 02 {checksum} FF"
    notes: "Format ##.# (ASCII)."
  - id: sensor_rms_load_set
    label: Set RMS Load
    kind: action
    command: "FE {len} 00 54 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: sensor_temperature_get
    label: Get Temperature
    kind: query
    command: "FE 03 00 55 02 {checksum} FF"
    notes: "Format ### (ASCII, Fahrenheit per log entry spec)."
  - id: sensor_temperature_set
    label: Set Temperature
    kind: action
    command: "FE {len} 00 55 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: sensor_wattage_get
    label: Get Wattage
    kind: query
    command: "FE 03 00 56 02 {checksum} FF"
    notes: "Format #### (ASCII)."
  - id: sensor_wattage_set
    label: Set Wattage
    kind: action
    command: "FE {len} 00 56 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: sensor_power_factor_get
    label: Get Power Factor
    kind: query
    command: "FE 03 00 57 02 {checksum} FF"
    notes: "Format #.# (ASCII)."
  - id: sensor_power_factor_set
    label: Set Power Factor
    kind: action
    command: "FE {len} 00 57 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: sensor_thermal_load_get
    label: Get Thermal Load (BTU)
    kind: query
    command: "FE 03 00 58 02 {checksum} FF"
    notes: "Format ####.# (ASCII)."
  - id: sensor_thermal_load_set
    label: Set Thermal Load (BTU)
    kind: action
    command: "FE {len} 00 58 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: sensor_surge_protection_get
    label: Get Surge Protection State
    kind: query
    command: "FE 03 00 59 02 {checksum} FF"
    notes: "Byte enum: 0x00 n/a, 0x01 protected, 0x02 compromised."

  - id: sensor_energy_management_state_get
    label: Get Energy Management State (All Outlets)
    kind: query
    command: "FE 03 00 60 02 {checksum} FF"
    notes: "Premium/Premium+ only. Returns 1 ASCII letter per outlet (16 bytes): D/S/I/O/U."

  - id: sensor_occupancy_get
    label: Get Occupancy State
    kind: query
    command: "FE 03 00 61 02 {checksum} FF"
    notes: "ASCII 'U'=Unoccupied, 'O'=Occupied."

  # ---- Thresholds (0x70..0x77) - Premium/Premium+ ----
  - id: threshold_low_voltage_get
    label: Get Low Voltage Threshold
    kind: query
    command: "FE 03 00 70 02 {checksum} FF"
    notes: "Format ### (ASCII)."
  - id: threshold_low_voltage_set
    label: Set Low Voltage Threshold
    kind: action
    command: "FE {len} 00 70 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: threshold_high_voltage_get
    label: Get High Voltage Threshold
    kind: query
    command: "FE 03 00 71 02 {checksum} FF"
    notes: "Format ### (ASCII)."
  - id: threshold_high_voltage_set
    label: Set High Voltage Threshold
    kind: action
    command: "FE {len} 00 71 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: threshold_max_load_current_get
    label: Get Max Load Current Threshold
    kind: query
    command: "FE 03 00 73 02 {checksum} FF"
    notes: "Format ##.# (ASCII)."
  - id: threshold_max_load_current_set
    label: Set Max Load Current Threshold
    kind: action
    command: "FE {len} 00 73 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: threshold_min_load_current_get
    label: Get Min Load Current Threshold
    kind: query
    command: "FE 03 00 74 02 {checksum} FF"
    notes: "Format ##.# (ASCII)."
  - id: threshold_min_load_current_set
    label: Set Min Load Current Threshold
    kind: action
    command: "FE {len} 00 74 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: threshold_max_temperature_get
    label: Get Max Temperature Threshold
    kind: query
    command: "FE 03 00 76 02 {checksum} FF"
    notes: "Format ### (ASCII)."
  - id: threshold_max_temperature_set
    label: Set Max Temperature Threshold
    kind: action
    command: "FE {len} 00 76 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  - id: threshold_min_temperature_get
    label: Get Min Temperature Threshold
    kind: query
    command: "FE 03 00 77 02 {checksum} FF"
    notes: "Format ### (ASCII)."
  - id: threshold_min_temperature_set
    label: Set Min Temperature Threshold
    kind: action
    command: "FE {len} 00 77 01 {value_ascii} {checksum} FF"
    params:
      - name: value
        type: string

  # ---- Log (0x80 / 0x81 / 0x82) ----
  - id: read_log_entry
    label: Read Log Entry/Entries
    kind: query
    command: "FE 0A 00 80 02 {index_4_ascii} 7C {count_2_ascii} {checksum} FF"
    notes: "Length always 0x0A. index 4 ASCII chars (e.g. \"0002\" = 0x30303032), separator '|' (0x7C), count 2 ASCII chars (e.g. \"10\" = 0x3130). Multiple responses returned if multiple entries."
    params:
      - name: start_index
        type: integer
        description: 1-based log entry index
      - name: count
        type: integer
        description: Number of entries to read

  - id: get_log_count
    label: Get Log Count
    kind: query
    command: "FE 03 00 81 02 {checksum} FF"
    notes: "Response length 0x07; returns ASCII count e.g. \"0120\" (0x30313230) = 120 entries."

  - id: clear_log
    label: Clear Log
    kind: action
    command: "FE 03 00 82 01 {checksum} FF"
    notes: "Subcommand 0x01 Set clears the log. Response length 0x03."

  # ---- Product Info (0x90..0x95) ----
  - id: get_part_number
    label: Get Part Number
    kind: query
    command: "FE 03 00 90 02 {checksum} FF"
    notes: "Returns ASCII string up to 50 chars."

  - id: get_product_rating
    label: Get Product Amp Hour Rating
    kind: query
    command: "FE 03 00 91 02 {checksum} FF"
    notes: "Format ### (ASCII)."

  - id: get_surge_existence
    label: Get Product Surge Existence
    kind: query
    command: "FE 03 00 93 02 {checksum} FF"
    notes: "Returns ASCII 'Y' or 'N'."

  - id: get_ip_address
    label: Get Current IP Address
    kind: query
    command: "FE 03 00 94 02 {checksum} FF"
    notes: "Variable length ASCII, format ###.###.###.### (no leading zeroes)."

  - id: get_mac_address
    label: Get MAC Address
    kind: query
    command: "FE 03 00 95 02 {checksum} FF"
    notes: "Format ##:##:##:##:##:## (ASCII)."
```

## Feedbacks
```yaml
feedbacks:
  - id: nack
    type: enum
    command_response: "0x10"
    values:
      - bad_crc                # 0x01
      - bad_length             # 0x02
      - bad_escape_sequence    # 0x03
      - previous_cmd_invalid   # 0x04
      - previous_subcmd_invalid# 0x05
      - incorrect_byte_count   # 0x06
      - invalid_data_bytes     # 0x07
      - invalid_credentials    # 0x08 (re-login required)
      - unknown_error          # 0x10
      - access_denied_epo      # 0x11
    notes: "Device-emitted on error. Sample: 0xFE040010100123FF (bad CRC)."

  - id: login_response
    type: enum
    command_response: "0x02"
    values: [rejected, accepted]
    notes: "Sample: 0xFE040002100115FF (accepted)."

  - id: outlet_state
    type: object
    command_response: "0x20 / 0x30"
    notes: "Response subcommands: 0x10 Response, 0x12 Status Update (unsolicited), 0x30 Log Update. Fields: outlet number, current state (0x00 OFF / 0x01 ON), cycle time 4 ASCII. Sample: 0xfe0900200100300303030357fff."

  - id: outlet_name
    type: string
    command_response: "0x21 / 0x31"
    notes: "Sample: FE08002101016E616D654AFF (outlet 1 named \"name\")."

  - id: outlet_count
    type: object
    command_response: "0x22 / 0x32"
    notes: "16 bytes (outlets) or 8 bytes (contacts); each byte 'C'/0x43 controllable, 'N'/0x4E non-controllable, 'X'/0x58 nonexistent."

  - id: sequencing_state
    type: enum
    command_response: "0x36"
    values:
      - not_sequencing      # 0x00 (fallback on error)
      - sequencing_up       # 0x01
      - sequencing_up_complete      # 0x02
      - sequencing_down     # 0x03
      - sequencing_down_complete    # 0x04

  - id: energy_management_response
    type: enum
    command_response: "0x23"
    values: [Disconnected, Standby, ON, OFF, Unknown]

  - id: epo_state
    type: enum
    command_response: "0x37"
    values:
      - normal_operation   # 0x00
      - epo_mode           # 0x01
    notes: "Subcommand 0x10 Response or 0x12 Status Change (unsolicited)."

  - id: log_alerts_mask
    type: object
    command_response: "0x40"
    notes: "Length 0x05. Returns 2 bytes bitmask per Set command definition."

  - id: log_status_mask
    type: object
    command_response: "0x41"
    notes: "Length 0x05 (per response table) returning 6 bytes - see Notes."

  - id: sensor_value
    type: object
    command_response: "0x50..0x61"
    notes: "Per-sensor value; format declared per command (###, ##.#, etc.). Subcommands 0x10 Response, 0x12 Status Change (unsolicited)."

  - id: threshold_value
    type: object
    command_response: "0x70..0x77"
    notes: "Per-threshold value; format declared per command. Subcommands 0x10 Response, 0x12 Status Change (unsolicited)."

  - id: log_entry
    type: object
    command_response: "0x80"
    notes: "Length 0x0A. Fields: request #, pending count, log entry #, log type (00 Normal .. 11 EPO Recovery), datetime MM/DD/YYYY HH:MM:SS, sensor block, 16-outlet energy-management block. See source for full layout."

  - id: log_count_value
    type: integer
    command_response: "0x81"
    notes: "Length 0x07, ASCII count e.g. \"0120\" = 120."

  - id: clear_log_response
    type: ack
    command_response: "0x82"
    notes: "Length 0x03 ack to clear-log command."

  - id: product_info
    type: object
    command_response: "0x90..0x95"
    notes: "Variable-length ASCII per requested field (part #, rating, surge Y/N, IP, MAC)."
```

## Variables
```yaml
# All settable values are captured as Actions above (Set subcommand form).
# No additional standalone variables documented.
```

## Events
```yaml
events:
  - id: unsolicited_status_change
    description: "Devices emit status updates with subcommand 0x12 for outlets, energy state, EPO, sensors, thresholds when local events occur and the corresponding register is enabled (0x41)."
    trigger: "Local state change on device"
    opcodes: ["0x20", "0x23", "0x37", "0x50..0x61", "0x70..0x77"]

  - id: scheduled_log_update
    description: "Outlet status with subcommand 0x30 indicates scheduled log reports."
    trigger: "Scheduled log reporting"
    opcodes: ["0x20"]

  - id: ping_request
    description: "Device sends 0x01 SET ping periodically; control system must respond with 0x01 pong or be considered disconnected after 3 missed."
    trigger: "Periodic keepalive"
    opcodes: ["0x01"]

  - id: log_entry_alert
    description: "Logged events matching the 0x40 Register Log Alerts mask."
    trigger: "Alert condition (over/under voltage/current/temp, surge fault, EPO, ping timeout)"
    opcodes: ["0x40"]
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented as named macros in source.
```

## Safety
```yaml
confirmation_required_for:
  - epo_initiate           # 0x37 0x01 - cuts all outlet power
  - clear_log              # 0x82 - destroys audit trail
  - sequence_down          # 0x36 0x03 - powers outlets off in reverse order
interlocks:
  - "Control Protocol disabled by default; requires first-time webpage login + password set (Select/Premium) or manual enable in Device Setting -> Network Services -> Control Protocol (Premium+)."
  - "Login (0x02) required before any other command. After 3 unanswered pings device considers control system disconnected; all subsequent messages (except Login) return NACK 0x08 (invalid credentials)."
  - "EPO (0x37 0x01 Initiate) puts device into Emergency Power Off Mode; NACK 0x11 (Access Denied EPO) returned for most commands until 0x37 0x00 Recover issued."
  - "Outlets marked 'X'/0x58 (Does not exist) or 'N'/0x4E (Non-Controllable) in Outlet Count Response cannot be controlled; Set State returns state 0x03 Not Controllable."
# UNRESOLVED: vendor-specific power-on sequencing order / per-outlet default ON/OFF not documented in source.
```

## Notes
- **Framing**: every message is `<Header 0xFE><Length><Data Envelope><Checksum 0x00..0x7F><Tail 0xFF>`. Length is total bytes of the data envelope only (excludes header/length/checksum/tail bytes). Checksum is bitwise-AND of the running sum (header through last data byte) with `0x7F`.
- **Escape rule**: bytes `0xFE`, `0xFF`, `0xFD` inside the data envelope must be escaped by prefixing `0xFD` and inverting the data byte's bits. Escape bytes are NOT counted in length or checksum — un-escape before computing either.
- **ASCII numerics**: cycle time, delay time, sensor values, thresholds, log indices/counts are sent as ASCII digits (e.g. `"5"` = `0x35`), with the decimal point `0x2E` included where shown. Length byte therefore varies with the number of digits.
- **Default credentials**: `"user|password"` (`0x757365727C70617373776F7264`). User MUST change Administrator/User/Control Systems passwords at first webpage login before protocol is enabled.
- **Tier caveat**: source labels commands 0x23 (Energy Management State), 0x37 (EPO), 0x40 (Register Log Alerts), 0x41 (Register Status Change), thresholds (0x70..0x77), and most sensor/threshold SET subcommands as **Premium/Premium+ only**. Whether RLNK-1015V/1615V expose these has not been confirmed against a device — treat as best-effort coverage.
- **Register Status Change byte mismatch**: the source response table (line ~382) says "Always 0x05" for the response length but the SET command (line ~365) declares length 0x06 and the response field (line ~383) says "Six Bytes". The source also labels the trailing data bytes "Data Byte 6" and "Data Byte 7" while only four data bytes are listed. Treat the four-byte form as authoritative; verify on device.
- **NACK on disconnect**: after losing connectivity (3 missed pings) every command except Login returns NACK 0x08; a log entry is also recorded on the device.
- **Outlet count response**: outlet status bytes use ASCII letters `C`/`N`/`X` (`0x43`/`0x4E`/`0x58`), not numeric codes.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact model-to-tier mapping (Select/Premium/Premium+) for RLNK-1015V and RLNK-1615V not explicitly stated -->
<!-- UNRESOLVED: flow_control not specified for RS-232 -->
<!-- UNRESOLVED: TCP keepalive / connection timeout values not stated (3 missed pings mentioned, ping interval not stated) -->
<!-- UNRESOLVED: voltage/current/power ratings not present in protocol doc (see product datasheet) -->
<!-- UNRESOLVED: per-outlet default state on power-up not stated -->
````

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - agneovo.com
  - files.d-tools.com
  - markertek.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - "https://res.cloudinary.com/avd/image/upload/v133579764/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - "http://files.d-tools.com/Visualizations/Approved/Middle%20Atlantic/Documents/Middle%20Atlantic_RLNK-1615V_Manual2.PDF"
  - "https://www.markertek.com/Attachments/Manuals/MIDDLE%20ATLANTIC/RLNK-1615V-Manual.pdf"
retrieved_at: 2026-06-15T09:23:35.279Z
last_checked_at: 2026-06-16T07:08:36.090Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:08:36.090Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions match literal opcodes in source; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model-tier mapping (Select vs Premium vs Premium+) for 1015V/1615V not explicitly stated in source; advanced commands (0x23, 0x37, 0x40, 0x41, thresholds) are documented as Premium/Premium+ only. Whether 1015V/1615V expose these commands is not confirmed."
- "flow_control not stated in source"
- "no multi-step sequences documented as named macros in source."
- "vendor-specific power-on sequencing order / per-outlet default ON/OFF not documented in source."
- "firmware version compatibility not stated in source"
- "exact model-to-tier mapping (Select/Premium/Premium+) for RLNK-1015V and RLNK-1615V not explicitly stated"
- "flow_control not specified for RS-232"
- "TCP keepalive / connection timeout values not stated (3 missed pings mentioned, ping interval not stated)"
- "voltage/current/power ratings not present in protocol doc (see product datasheet)"
- "per-outlet default state on power-up not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
