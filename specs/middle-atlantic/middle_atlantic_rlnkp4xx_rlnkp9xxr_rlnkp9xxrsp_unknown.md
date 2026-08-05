---
spec_id: admin/middle-atlantic-racklink-rlnkp4xx-9xx
schema_version: ai4av-public-spec-v1
revision: 1
title: "Middle Atlantic RackLink (RLNKP4xx / RLNKP9xxR / RLNKP9xxRSP) Control Spec"
manufacturer: "Middle Atlantic"
model_family: RLNKP4xx
aliases: []
compatible_with:
  manufacturers:
    - "Middle Atlantic"
  models:
    - RLNKP4xx
    - RLNKP9xxR
    - RLNKP9xxRSP
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - digitalautomation.us
  - keydigital.org
  - github.com
  - manualslib.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://digitalautomation.us/wp-content/uploads/2023/09/MiddleAtlantic_RacklinkSelect_IP.pdf
  - https://www.keydigital.org/web/content/13933/MiddleAtlantic_Racklink_Manual.pdf
  - https://github.com/mckay115/homeassistant-middleatlantic-racklink
  - https://www.manualslib.com/manual/1614576/Middle-Atlantic-Products-PremiumPlus-Rlnk-P915r.html
retrieved_at: 2026-07-26T09:12:27.417Z
last_checked_at: 2026-08-05T08:32:14.786Z
generated_at: 2026-08-05T08:32:14.786Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model-to-series mapping not stated verbatim in source; RLNKP4xx/9xxR/9xxRSP inferred as RackLink Premium/Premium+ family members. Firmware version compatibility not stated. RS-232 availability limited to Premium (RLNKP4xx); RLNKP9xxR/Premium+ TCP-only per source table."
  - "flow control not stated in source"
  - "source states no explicit voltage/current power-on sequencing"
  - "exact mapping of RLNKP4xx→Premium, RLNKP9xxR→Premium+, RLNKP9xxRSP→Premium+ inferred from product family naming, not stated verbatim in source."
  - "firmware version compatibility not stated."
  - "serial flow_control not stated."
  - "TCP keepalive / connection timeout beyond 3-ping rule not stated."
  - "max concurrent TCP connections not stated."
  - "Register Status Change byte indices 9-10 labelled \"Data Byte 6/7\" in source appear to be a typo; only 4 data bytes are defined."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:32:14.786Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions (wire-literal hex byte sequences) match verbatim the source's command tables for 0x01, 0x02, 0x20, 0x21, 0x22, 0x23, 0x30, 0x31, 0x32, 0x36, 0x37, 0x40, 0x41, 0x50-0x61, 0x70-0x77, 0x80-0x82, 0x90-0x95; transport (TCP 60000, RS-232 9600/8/N/1) matches source verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Middle Atlantic RackLink (RLNKP4xx / RLNKP9xxR / RLNKP9xxRSP) Control Spec

## Summary
Middle Atlantic RackLink rack PDU/power management family (RLNKP4xx = Premium, RLNKP9xxR / RLNKP9xxRSP = Premium+). Binary control protocol over RS-232 (Premium only) and TCP/IP (Select/Premium/Premium+). Covers per-outlet on/off/cycle, outlet naming, power sequencing, energy management, EPO, sensor/threshold monitoring, and event/log retrieval.

<!-- UNRESOLVED: exact model-to-series mapping not stated verbatim in source; RLNKP4xx/9xxR/9xxRSP inferred as RackLink Premium/Premium+ family members. Firmware version compatibility not stated. RS-232 availability limited to Premium (RLNKP4xx); RLNKP9xxR/Premium+ TCP-only per source table. -->

## Transport
```yaml
# Source: "RS232 Specifications (RackLink Premium Only)" + "TCP/IP (RackLink Select, Premium, Premium+)".
# RS-232 applies to RLNKP4xx (Premium). TCP/IP applies to all three target models.
protocols:
  - tcp
  - serial
addressing:
  port: 60000  # TCP Port: 60000 (stated for Select/Premium/Premium+)
serial:
  baud_rate: 9600
  data_bits: 8
  stop_bits: 1
  parity: none
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: login_command  # source documents a Login command (0x02); NOT open. Default creds "user|password".
  notes: >
    Control protocol disabled by default. Select/Premium unlock at first webpage
    login when password set; login uses user "user" with established password.
    Premium+ requires manual enable via Device Setting -> Network Services ->
    Control Protocol; uses configurable admin accounts (no default "user" login).
    Login payload format: "Username|Password". Default: "user|password"
    (0x757365727C70617373776F7264). Premium+ requires admin-rights account
    with control protocol enabled.
```

## Traits
```yaml
traits:
  - powerable      # inferred: per-outlet ON/OFF/Cycle commands (0x20)
  - queryable      # inferred: numerous Get-status / sensor query commands
  - sequencable    # inferred: power sequencing up/down (0x36)
  - monitorable    # inferred: voltage/current/temp/wattage/power-factor sensors
  - protectable    # inferred: surge protection state + EPO (0x59, 0x37)
```

## Actions
```yaml
# All command bytes are VERBATIM from the source. Hex case preserved as written.
# Message frame: <Header 0xfe><Length><data envelope><Checksum><Tail 0xff>
# Checksum = sum of all bytes header..end of data envelope, masked & 0x7f.
# Escape byte 0xfd precedes any 0xfd/0xfe/0xff in body (bits inverted); escaped
# bytes excluded from length/checksum.

# --- Frame / session management (All RackLink Series) ---
- id: ping_respond
  label: Ping Response (Pong)
  kind: action
  command: "0xFE0300011012FF"
  params: []
  notes: Controller sends this in reply to device PING (0xFE0300010103FF). Three unanswered pings → disconnect.

- id: login
  label: Login
  kind: action
  command: "0xFE10000201757365727C70617373776F72643FFF"
  params:
    - name: credentials
      type: string
      description: 'Format "Username|Password" as ASCII hex. Default shown = "user|password" = 0x757365727C70617373776F7264.'
  notes: Length byte varies with credential string length. Must be first command after connect.

# --- Power Outlets (0x20) / Dry Contacts (0x30) ---
- id: read_outlet_status
  label: Read Outlet Status
  kind: query
  command: "0xfe040020020325ff"
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16 (0x01-0x10) in byte 5. Sample shows outlet 3 (0x03).
  notes: For Dry Contact use command byte 0x30, range 1-8.

- id: read_contact_status
  label: Read Dry Contact Status
  kind: query
  command: "0xFE040030020126FF"
  params:
    - name: contact
      type: integer
      description: Contact number 1-8 (0x01-0x08) in byte 5.

- id: write_outlet_status
  label: Write Outlet Status
  kind: action
  command: "0xfe090020010101303030306aff"
  params:
    - name: outlet_or_contact_target
      type: enum
      description: "Command byte: 0x20=Outlet, 0x30=Dry Contact."
    - name: number
      type: integer
      description: "Outlet 1-16 or Contact 1-8 (byte 5). Sample = outlet 1."
    - name: desired_state
      type: enum
      description: "Byte 6: 0x00=OFF, 0x01=ON, 0x02=Cycle (set time in next field), 0x03=Not Controllable (response only). Sample = ON (0x01)."
    - name: cycle_time
      type: string
      description: 'Bytes 7-10, ASCII chars 0000-3600 seconds (0x30303030-0x33363030). Send "0000" for ON/OFF. Sample = "0000".'
  notes: 'Verbatim samples - ON outlet1: 0xfe090020010101303030306aff; OFF outlet2: 0xfe090020010200303030306aff; Cycle outlet2 5s: 0xfe0900200102023030303571ff; Cycle outlet8 8s: 0xfe0900200108023030303874ff.'

# --- Outlet Name (0x21) / Contact Name (0x31) ---
- id: read_outlet_name
  label: Read Outlet Name
  kind: query
  command: "0xFE040021020126FF"
  params:
    - name: outlet
      type: integer
      description: 1-16. Dry Contact variant uses 0x31.
  notes: Read outlet 1 name shown.

- id: read_contact_name
  label: Read Dry Contact Name
  kind: query
  command: "0xFE040031020126FF"
  params:
    - name: contact
      type: integer
      description: 1-8.

- id: write_outlet_name
  label: Write Outlet Name
  kind: action
  command: "FE08002110016E616D6559FF"
  params:
    - name: number
      type: integer
      description: Outlet/Contact number byte 5.
    - name: name
      type: string
      description: ASCII string, variable length. Sample sets name to "name" (0x6E616D65).
  notes: Dry Contact variant uses command byte 0x31. Length byte varies with name length.

# --- Outlet/Contact Count (0x22 / 0x32) ---
- id: read_outlet_count
  label: Read Outlet Count
  kind: query
  command: "0xFE0300220225FF"
  params: []

- id: read_contact_count
  label: Read Dry Contact Count
  kind: query
  command: "0xFE0300320235FF"
  params: []
  notes: Checksum always 0x35 for contact count.

# --- Sequence Power Outlets (0x36) ---
- id: sequence_power_up
  label: Sequence Power Up
  kind: action
  command: "0xFE08003601013030303301FF"
  params:
    - name: delay_time
      type: string
      description: 'Bytes 6-9, ASCII "0000"-"0999" seconds. Premium+ always send "0000" (uses configured delay). Sample = "0003" (3s).'
  notes: Direction byte 5 = 0x01 (Sequence UP).

- id: sequence_power_down
  label: Sequence Power Down
  kind: action
  command: "0xFE08003601033030303505FF"
  params:
    - name: delay_time
      type: string
      description: 'Bytes 6-9, ASCII "0000"-"0999". Sample = "0005" (5s).'
  notes: Direction byte 5 = 0x03 (Sequence DOWN).

- id: sequence_power_up_premium_plus
  label: Sequence Power Up (Premium+, saved settings)
  kind: action
  command: "0xFE0800360101303030307EFF"
  params: []
  notes: Premium+ ignores delay field; uses saved configuration.

# ====================================================================
# Advanced (Premium / Premium+ Only) - applies to RLNKP9xxR / RLNKP9xxRSP
# RLNKP4xx (Premium) also covered; Select excluded.
# ====================================================================

# --- Energy Management State (0x23) ---
- id: set_energy_management_state
  label: Set Energy Management State
  kind: action
  command: "0xFE0500230101{state}{checksum}FF"
  params:
    - name: outlet
      type: integer
      description: 1-16 (byte 5).
    - name: state
      type: enum
      description: '1 ASCII byte: "D"/0x44=Disconnected, "S"/0x53=Standby, "I"/0x49=ON, "O"/0x4F=OFF, "U"/0x55=Unknown.'
  notes: Length always 0x05 for SET. Command template; checksum computed over full frame.

- id: get_energy_management_state
  label: Get Energy Management State
  kind: query
  command: "0xFE0400230201{checksum}FF"
  params:
    - name: outlet
      type: integer
      description: 1-16 (byte 5).

# --- Emergency Power Off (0x37) ---
- id: epo_initiate
  label: EPO Initiate
  kind: action
  command: "0xFE0400370101{checksum}FF"
  params: []
  notes: Byte 5 = 0x01. Safety-critical - see Safety section.

- id: epo_recover
  label: EPO Recover
  kind: action
  command: "0xFE0400370100{checksum}FF"
  params: []
  notes: Byte 5 = 0x00.

# --- Register Log Alerts (0x40) ---
- id: set_log_alerts
  label: Register Log Alerts (Set)
  kind: action
  command: "0xFE0500400101{byte1}{byte2}{checksum}FF"
  params:
    - name: data_byte_1
      type: bitmask
      description: "Bit1=Normal, Bit2=OverVoltage, Bit3=UnderVoltage, Bit4=OverTemp, Bit5=UnderTemp, Bit6=SurgeFault, Bit7=Future, Bit8=RESERVED."
    - name: data_byte_2
      type: bitmask
      description: "Bit1=AutoPingTimeout, Bit2=RS232PingTimeout, Bit3=OverCurrent, Bit4=UnderCurrent, Bit5=EPO, Bit6-7=Future, Bit8=RESERVED."

- id: get_log_alerts
  label: Register Log Alerts (Get)
  kind: query
  command: "0xFE0300400202{checksum}FF"
  params: []

# --- Register Status Change (0x41) ---
- id: set_status_change_registration
  label: Register Status Change (Set)
  kind: action
  command: "0xFE0600410101{b1}{b2}{b3}{b4}{checksum}FF"
  params:
    - name: data_byte_1
      type: bitmask
      description: "Bit1=OutletStatusChanges; Bit2-7=Future; Bit8=RESERVED."
    - name: data_byte_2
      type: bitmask
      description: "Bit1=DryContactStatus, Bit2=InputStatus, Bit3=SequenceStatus, Bit4=EPOStatus; Bit5-7=Future; Bit8=RESERVED."
    - name: data_byte_3
      type: bitmask
      description: "Bit1=LowVoltageThreshold, Bit2=HighVoltageThreshold, Bit4=MaxLoad, Bit5=MinLoad, Bit7=MaxTemp; Bit3,6=Future; Bit8=RESERVED."
    - name: data_byte_4
      type: bitmask
      description: "Bit1=MinTemperatureChanges; Bit2-7=Future; Bit8=RESERVED."
  notes: Source labels byte index 9 as "Data Byte 6", byte 10 as "Data Byte 7" - appears to be a source typo; only 4 data bytes shown.

- id: get_status_change_registration
  label: Register Status Change (Get)
  kind: query
  command: "0xFE0300410202{checksum}FF"
  params: []

# --- Sensor Values (0x50 - 0x61) ---
- id: get_kilowatt_hours
  label: Get Kilowatt Hours
  kind: query
  command: "0xFE0300500202{checksum}FF"
  params: []
  notes: Format ##########.# (ASCII).
- id: get_peak_voltage
  label: Get Peak Voltage
  kind: query
  command: "0xFE0300510202{checksum}FF"
  params: []
  notes: Format ###.
- id: get_rms_voltage
  label: Get RMS Voltage
  kind: query
  command: "0xFE0300520202{checksum}FF"
  params: []
  notes: Format ###.
- id: get_peak_load
  label: Get Peak Load
  kind: query
  command: "0xFE0300530202{checksum}FF"
  params: []
  notes: Format ##.#.
- id: get_rms_load
  label: Get RMS Load
  kind: query
  command: "0xFE0300540202{checksum}FF"
  params: []
  notes: Format ##.#.
- id: get_temperature
  label: Get Temperature
  kind: query
  command: "0xFE0300550202{checksum}FF"
  params: []
  notes: Format ###.
- id: get_wattage
  label: Get Wattage
  kind: query
  command: "0xFE0300560202{checksum}FF"
  params: []
  notes: Format ####.
- id: get_power_factor
  label: Get Power Factor
  kind: query
  command: "0xFE0300570202{checksum}FF"
  params: []
  notes: Format #.#.
- id: get_thermal_load
  label: Get Thermal Load (BTU)
  kind: query
  command: "0xFE0300580202{checksum}FF"
  params: []
  notes: Format ####.#.
- id: get_surge_protection_state
  label: Get Surge Protection State
  kind: query
  command: "0xFE0300590202{checksum}FF"
  params: []
  notes: Response 0x00=n/a, 0x01=protected, 0x02=compromised.
- id: get_energy_management_state_sensor
  label: Get Energy Management State (Sensor)
  kind: query
  command: "0xFE0300600202{checksum}FF"
  params: []
  notes: 16 bytes ASCII, one letter per outlet (D/S/I/O/U).
- id: get_occupancy_state
  label: Get Occupancy State
  kind: query
  command: "0xFE0300610202{checksum}FF"
  params: []
  notes: '"U"=Unoccupied, "O"=Occupied.'

# --- Thresholds (0x70 - 0x77) ---
- id: set_low_voltage_threshold
  label: Set Low Voltage Threshold
  kind: action
  command: "0xFE0600700101{value_ascii}{checksum}FF"
  params:
    - name: value
      type: string
      description: ASCII "###" format.
- id: get_low_voltage_threshold
  label: Get Low Voltage Threshold
  kind: query
  command: "0xFE0300700202{checksum}FF"
  params: []
- id: set_high_voltage_threshold
  label: Set High Voltage Threshold
  kind: action
  command: "0xFE0600710101{value_ascii}{checksum}FF"
  params:
    - name: value
      type: string
      description: ASCII "###" format.
- id: get_high_voltage_threshold
  label: Get High Voltage Threshold
  kind: query
  command: "0xFE0300710202{checksum}FF"
  params: []
- id: set_max_load_current
  label: Set Max Load Current
  kind: action
  command: "0xFE0700730101{value_ascii}{checksum}FF"
  params:
    - name: value
      type: string
      description: ASCII "##.#" format.
- id: get_max_load_current
  label: Get Max Load Current
  kind: query
  command: "0xFE0300730202{checksum}FF"
  params: []
- id: set_min_load_current
  label: Set Min Load Current
  kind: action
  command: "0xFE0700740101{value_ascii}{checksum}FF"
  params:
    - name: value
      type: string
      description: ASCII "##.#" format.
- id: get_min_load_current
  label: Get Min Load Current
  kind: query
  command: "0xFE0300740202{checksum}FF"
  params: []
- id: set_max_temperature
  label: Set Max Temperature
  kind: action
  command: "0xFE0600760101{value_ascii}{checksum}FF"
  params:
    - name: value
      type: string
      description: ASCII "###" format.
- id: get_max_temperature
  label: Get Max Temperature
  kind: query
  command: "0xFE0300760202{checksum}FF"
  params: []
- id: set_min_temperature
  label: Set Min Temperature
  kind: action
  command: "0xFE0600770101{value_ascii}{checksum}FF"
  params:
    - name: value
      type: string
      description: ASCII "###" format.
- id: get_min_temperature
  label: Get Min Temperature
  kind: query
  command: "0xFE0300770202{checksum}FF"
  params: []

# --- Log Entry / Count / Clear (0x80 - 0x82) ---
- id: read_log_entry
  label: Read Log Entry
  kind: query
  command: "0xFE0A008002{index_4ascii}7C{count_2ascii}{checksum}FF"
  params:
    - name: start_index
      type: string
      description: 'Bytes 5-8 ASCII "0000"+ (e.g. "0002").'
    - name: entry_count
      type: string
      description: 'Bytes 10-11 ASCII (e.g. "10"). Byte 9 = separator "|" (0x7C).'
  notes: Multiple responses returned if multiple entries requested.

- id: get_log_count
  label: Get Log Count
  kind: query
  command: "0xFE0300810202{checksum}FF"
  params: []

- id: clear_log
  label: Clear Log
  kind: action
  command: "0xFE0300820101{checksum}FF"
  params: []

# --- Product Info (0x90 / 0x91 / 0x93 / 0x94 / 0x95) ---
- id: get_part_number
  label: Get Part Number
  kind: query
  command: "0xFE0300900202{checksum}FF"
  params: []
  notes: Up to 50-char ASCII string.
- id: get_product_rating
  label: Get Product Amp Hour Rating
  kind: query
  command: "0xFE0300910202{checksum}FF"
  params: []
  notes: Format ###.
- id: get_product_surge
  label: Get Product Surge Existence
  kind: query
  command: "0xFE0300930202{checksum}FF"
  params: []
  notes: Response "Y"/"N".
- id: get_ip_address
  label: Get Current IP Address
  kind: query
  command: "0xFE0300940202{checksum}FF"
  params: []
  notes: Format ###.###.###.### (variable length, no leading zeroes).
- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "0xFE0300950202{checksum}FF"
  params: []
  notes: Format ##:##:##:##:##:##.
```

## Feedbacks
```yaml
# Unsolicited / response messages from device. Subcommand 0x10=Response, 0x12=Status Update, 0x30=Log Update.
- id: nack
  type: enum
  command_sample: "0xFE040010100123FF"
  values:
    - bad_crc: "0x01 - Bad CRC on previous command"
    - bad_length: "0x02 - Bad Length on previous command"
    - bad_escape: "0x03 - Bad Escape sequence on previous command"
    - cmd_invalid: "0x04 - Previous command invalid"
    - subcmd_invalid: "0x05 - Previous sub-command invalid"
    - bad_byte_count: "0x06 - Previous command incorrect byte count"
    - invalid_data: "0x07 - Invalid data bytes in previous command"
    - invalid_credentials: "0x08 - Invalid Credentials (need to login again)"
    - unknown_error: "0x10 - Unknown Error"
    - access_denied_epo: "0x11 - Access Denied (EPO)"
  notes: Sent by device on any failed request. Sample shown = bad CRC (0x01).

- id: ping_request
  type: event
  command_sample: "0xFE0300010103FF"
  notes: Device → controller PING. Controller must reply with pong (0xFE0300011012FF) or be disconnected after 3 misses.

- id: login_response
  type: enum
  command_sample: "0xFE040002100115FF"
  values: [rejected: "0x00", accepted: "0x01"]

- id: outlet_status_response
  type: composite
  command_sample: "0xfe0900200100300303030357fff"
  fields: [outlet_number, current_state (0x00=OFF/0x01=ON), cycle_time_ascii]
  notes: Subcommand 0x10/0x12/0x30. Sample = outlet 3 OFF, 5s cycle.

- id: outlet_name_response
  type: string
  command_sample: "FE08002101016E616D654AFF"

- id: outlet_count_response
  type: composite
  fields: [16 status bytes, each "C"=Controllable / "N"=Non-Controllable / "X"=Does not exist]

- id: sequence_response
  type: enum
  values: ["0x00 - Not Sequencing (fallback)", "0x01 - Sequencing up", "0x02 - Sequencing up complete", "0x03 - Sequencing down", "0x04 - Sequencing down complete"]

- id: energy_management_response
  type: composite
  fields: [outlet_number, state (D/S/I/O/U)]

- id: epo_response
  type: enum
  values: ["0x00 - Normal Operation State", "0x01 - Emergency Power Off Mode"]
  notes: Subcommand 0x10=Response, 0x12=Status Change.

- id: sensor_response
  type: composite
  fields: [command_id (0x50-0x61), value_ascii]
  notes: Subcommand 0x10=Response, 0x12=Status Change (unsolicited).

- id: threshold_response
  type: composite
  fields: [command_id (0x70-0x77), value_ascii]

- id: log_entry_response
  type: composite
  fields: [request_number, entries_pending, log_entry_number, log_type (00-11), datetime "MM/DD/YYYY HH:MM:SS,", sensors, energy_management_states]

- id: log_count_response
  type: string
  fields: [4-byte ASCII count]

- id: product_info_response
  type: composite
  fields: [command_id (0x90/0x91/0x93/0x94/0x95), value_ascii]
```

## Variables
```yaml
# Settable parameters already enumerated as Actions (outlet name, thresholds,
# cycle times, energy management state, log alert registration masks).
# No additional free-standing variables beyond those action parameters.
```

## Events
```yaml
# Unsolicited messages from device (subcommand 0x12 = Status Change, 0x30 = Log Update).
# Registered via Register Status Change (0x41) and Register Log Alerts (0x40).
- id: outlet_status_change
  description: Outlet state changed locally; emitted if registered.
- id: dry_contact_status_change
  description: Dry contact state changed; emitted if registered.
- id: input_status_change
- id: sequence_status_change
- id: epo_status_change
- id: voltage_threshold_change
- id: load_threshold_change
- id: temperature_threshold_change
- id: sensor_value_change
  description: Any of the 0x50-0x61 sensor values changed; emitted if registered.
- id: log_update
  description: Scheduled log report (subcommand 0x30).
- id: ping
  description: Device-initiated PING requiring pong reply within 3 cycles.
```

## Macros
```yaml
# Source documents an implicit connect macro but no named multi-step sequences:
#   1. TCP connect (port 60000) / RS-232 open (9600/8/N/1)
#   2. Send Login (0x02) -> await Login Response (0x02/0x01 accepted)
#   3. Await device PING -> reply Pong (0x01)
#   4. Connection ready for commands.
# Re-run on disconnect (3 missed pings). Not encoded as discrete macro.
```

## Safety
```yaml
confirmation_required_for:
  - epo_initiate        # 0x37/0x01 - cuts power to all outlets
  - epo_recover         # 0x37/0x00 - restores from EPO state
  - sequence_power_down # 0x36/0x03 - powers down outlets in sequence
  - write_outlet_status # 0x20/0x01 - direct power control per outlet
  - clear_log           # 0x82 - irreversible log wipe
interlocks:
  - control_protocol_disabled_by_default: >
      Protocol access disabled until first login password change
      (Administrator/User/Control Systems accounts). Premium+ requires
      manual enable checkbox.
  - disconnect_on_three_missed_pings: >
      Device closes connection after 3 unanswered PINGs; subsequent
      commands (except Login) get NACK. Log entry written. Must re-login.
  - epo_access_denied_state: >
      NACK 0x11 (Access Denied EPO) returned when EPO condition active.
  - not_controllable_outlets: >
      Outlet state 0x03 (Not Controllable) is response-only; cannot be set.
# UNRESOLVED: source states no explicit voltage/current power-on sequencing
# procedure beyond the power-sequencing command; no lockout/tagout guidance.
```

## Notes
- **Protocol disabled by default** — must change Administrator/User/Control Systems passwords at first login before protocol activates.
- **Binary framing**: Header `0xFE`, Tail `0xFF`, Escape `0xFD` (invert bits of escaped byte; excluded from length/checksum). Checksum = `sum & 0x7F` over header through end of data envelope.
- **Mixed encoding**: Length/checksum/command bytes are binary; many data fields (cycle time, threshold values, sensor values, log fields) are ASCII characters inside the binary envelope.
- **Series split**: Basic commands apply to all RackLink (Select/Premium/Premium+). Advanced (0x23, 0x37, 0x40, 0x41, 0x50-0x61, 0x70-0x77, 0x80-0x82, 0x90-0x95) are Premium/Premium+ only — Select units will reject them.
- **RS-232 Premium-only**: TCP/IP applies to Select/Premium/Premium+. RLNKP9xxR/RLNKP9xxRSP (Premium+) are TCP-only per the source transport table.
- **Login mandatory**: No anonymous access. Default creds `user|password` for Select/Premium; Premium+ uses configurable admin accounts.

<!-- UNRESOLVED: exact mapping of RLNKP4xx→Premium, RLNKP9xxR→Premium+, RLNKP9xxRSP→Premium+ inferred from product family naming, not stated verbatim in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow_control not stated. -->
<!-- UNRESOLVED: TCP keepalive / connection timeout beyond 3-ping rule not stated. -->
<!-- UNRESOLVED: max concurrent TCP connections not stated. -->
<!-- UNRESOLVED: Register Status Change byte indices 9-10 labelled "Data Byte 6/7" in source appear to be a typo; only 4 data bytes are defined. -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - digitalautomation.us
  - keydigital.org
  - github.com
  - manualslib.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://digitalautomation.us/wp-content/uploads/2023/09/MiddleAtlantic_RacklinkSelect_IP.pdf
  - https://www.keydigital.org/web/content/13933/MiddleAtlantic_Racklink_Manual.pdf
  - https://github.com/mckay115/homeassistant-middleatlantic-racklink
  - https://www.manualslib.com/manual/1614576/Middle-Atlantic-Products-PremiumPlus-Rlnk-P915r.html
retrieved_at: 2026-07-26T09:12:27.417Z
last_checked_at: 2026-08-05T08:32:14.786Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:32:14.786Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions (wire-literal hex byte sequences) match verbatim the source's command tables for 0x01, 0x02, 0x20, 0x21, 0x22, 0x23, 0x30, 0x31, 0x32, 0x36, 0x37, 0x40, 0x41, 0x50-0x61, 0x70-0x77, 0x80-0x82, 0x90-0x95; transport (TCP 60000, RS-232 9600/8/N/1) matches source verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model-to-series mapping not stated verbatim in source; RLNKP4xx/9xxR/9xxRSP inferred as RackLink Premium/Premium+ family members. Firmware version compatibility not stated. RS-232 availability limited to Premium (RLNKP4xx); RLNKP9xxR/Premium+ TCP-only per source table."
- "flow control not stated in source"
- "source states no explicit voltage/current power-on sequencing"
- "exact mapping of RLNKP4xx→Premium, RLNKP9xxR→Premium+, RLNKP9xxRSP→Premium+ inferred from product family naming, not stated verbatim in source."
- "firmware version compatibility not stated."
- "serial flow_control not stated."
- "TCP keepalive / connection timeout beyond 3-ping rule not stated."
- "max concurrent TCP connections not stated."
- "Register Status Change byte indices 9-10 labelled \"Data Byte 6/7\" in source appear to be a typo; only 4 data bytes are defined."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
