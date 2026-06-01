---
spec_id: admin/middle-atlantic-rlnk-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Middle Atlantic RackLink Series Control Spec"
manufacturer: "Middle Atlantic"
model_family: "RackLink Series"
aliases: []
compatible_with:
  manufacturers:
    - "Middle Atlantic"
  models:
    - "RackLink Series"
    - "RackLink Premium"
    - "RackLink Select"
    - "RackLink Premium+"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - media.iewc.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://media.iewc.com/PublicAssets/SpecificationSheets/RLNK-SW715R-NS_specification.pdf
retrieved_at: 2026-05-27T02:36:30.545Z
last_checked_at: 2026-05-27T15:41:21.022Z
generated_at: 2026-05-27T15:41:21.022Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T15:41:21.022Z
  matched_actions: 84
  action_count: 84
  confidence: high
  summary: "All 84 spec action units match source commands with correct opcodes, parameters, and transport details."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Middle Atlantic RackLink Series Control Spec

## Summary
RackLink is a network-connected power management device (PDU) supporting outlet control, energy monitoring, and sequencing. Control via RS-232 (Premium models) and TCP/IP (Select, Premium, Premium+ models). Protocol is binary with a framed message structure (header 0xFE, tail 0xFF), escape sequences for protected bytes, and 7-bit masked checksums. Authentication required; default login for Select/Premium is `user|password`.

<!-- UNRESOLVED: specific model variant feature differences (Premium+ has configurable accounts vs fixed default login, configurable delay settings for sequencing) not fully enumerated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 60000
auth:
  type: credentials  # login required per source; default user|password for Select/Premium
```

## Traits
```yaml
# inferred from source command set:
# - powerable       (outlet on/off/cycle commands)
# - routable        (power sequencing commands)
# - queryable       (status read commands for all outlets/contacts/sensors)
# - levelable       (threshold setting commands for voltage, current, temperature)
```

## Actions
```yaml
# NACK - error response from device
- id: nak
  label: NACK Error Response
  kind: feedback
  params:
    - name: error_code
      type: enum
      values:
        - "0x01"  # Bad CRC on previous command
        - "0x02"  # Bad Length on previous command
        - "0x03"  # Bad Escape sequence on previous command
        - "0x04"  # Previous command invalid
        - "0x05"  # Previous sub-command invalid
        - "0x06"  # Previous command incorrect byte count
        - "0x07"  # Invalid data bytes in previous command
        - "0x08"  # Invalid Credentials (need to login again)
        - "0x10"  # Unknown Error
        - "0x11"  # Access Denied (EPO)

# Ping - device-to-control-system keepalive
- id: ping
  label: Ping (Device to Control System)
  kind: action
  params: []

# Pong - control system response to Ping
- id: pong
  label: Pong (Control System to Device)
  kind: action
  params: []

# Login
- id: login
  label: Login
  kind: action
  params:
    - name: credentials
      type: string
      description: "Username|Password format. Default for Select/Premium: user|password. Premium+ uses any admin account with control protocol enabled."

# Login Response
- id: login_response
  label: Login Response
  kind: feedback
  params:
    - name: accepted
      type: enum
      values: ["0x00", "0x01"]

# Power Outlet Read State (0x20 / Get State)
- id: read_outlet_state
  label: Read Outlet/Contact State
  kind: query
  params:
    - name: outlet_or_contact
      type: enum
      values: ["0x20", "0x30"]
    - name: number
      type: integer
      description: "0x01 to 0x10 (1-16) for outlets; 0x01 to 0x08 (1-8) for contacts"

# Power Outlet Write State (0x20 / Set State) - ON
- id: outlet_on
  label: Outlet ON
  kind: action
  params:
    - name: outlet_number
      type: integer
      description: "1 to 16 (0x01 to 0x10)"
    - name: state
      type: enum
      values: ["0x01"]

# Power Outlet Write State (0x20 / Set State) - OFF
- id: outlet_off
  label: Outlet OFF
  kind: action
  params:
    - name: outlet_number
      type: integer
      description: "1 to 16 (0x01 to 0x10)"
    - name: state
      type: enum
      values: ["0x00"]

# Power Outlet Write State (0x20 / Set State) - CYCLE
- id: outlet_cycle
  label: Outlet Cycle
  kind: action
  params:
    - name: outlet_number
      type: integer
      description: "1 to 16 (0x01 to 0x10)"
    - name: state
      type: enum
      values: ["0x02"]
    - name: cycle_time
      type: integer
      description: "0000 to 3600 seconds, ASCII encoded (e.g., 5 seconds = \"0005\" = 0x30303035)"

# Dry Contact Write State (0x30 / Set State) - ON
- id: contact_on
  label: Dry Contact ON
  kind: action
  params:
    - name: contact_number
      type: integer
      description: "1 to 8 (0x01 to 0x08)"
    - name: state
      type: enum
      values: ["0x01"]

# Dry Contact Write State (0x30 / Set State) - OFF
- id: contact_off
  label: Dry Contact OFF
  kind: action
  params:
    - name: contact_number
      type: integer
      description: "1 to 8 (0x01 to 0x08)"
    - name: state
      type: enum
      values: ["0x00"]

# Dry Contact Write State (0x30 / Set State) - CYCLE
- id: contact_cycle
  label: Dry Contact Cycle
  kind: action
  params:
    - name: contact_number
      type: integer
      description: "1 to 8 (0x01 to 0x08)"
    - name: state
      type: enum
      values: ["0x02"]
    - name: cycle_time
      type: integer
      description: "0000 to 3600 seconds, ASCII encoded"

# Outlet Status Response
- id: outlet_status_response
  label: Outlet/Contact Status Response
  kind: feedback
  params:
    - name: outlet_or_contact
      type: enum
      values: ["0x20", "0x30"]
    - name: subcommand
      type: enum
      values:
        - "0x10"  # Response to a command
        - "0x12"  # Status Update from local events
        - "0x30"  # Log Update
    - name: number
      type: integer
    - name: current_state
      type: enum
      values: ["0x00", "0x01"]
    - name: cycle_time
      type: string
      description: "ASCII encoded cycle time (0000-3600)"

# Read Outlet/Contact Name (0x21/0x31 Get Name)
- id: read_outlet_name
  label: Read Outlet Name
  kind: query
  params:
    - name: outlet_number
      type: integer
      description: "1 to 16 (0x01 to 0x10)"

- id: read_contact_name
  label: Read Dry Contact Name
  kind: query
  params:
    - name: contact_number
      type: integer
      description: "1 to 8 (0x01 to 0x08)"

# Write Outlet/Contact Name (0x21/0x31 Set Name)
- id: write_outlet_name
  label: Write Outlet Name
  kind: action
  params:
    - name: outlet_number
      type: integer
      description: "1 to 16"
    - name: name
      type: string
      description: "Variable string name"

- id: write_contact_name
  label: Write Dry Contact Name
  kind: action
  params:
    - name: contact_number
      type: integer
      description: "1 to 8"
    - name: name
      type: string

# Outlet/Contact Name Response
- id: outlet_name_response
  label: Outlet/Contact Name Response
  kind: feedback
  params:
    - name: outlet_or_contact
      type: enum
      values: ["0x21", "0x31"]
    - name: number
      type: integer
    - name: name
      type: string

# Read Outlet Count (0x22 Get Count)
- id: read_outlet_count
  label: Read Outlet Count
  kind: query
  params: []

# Read Contact Count (0x32 Get Count)
- id: read_contact_count
  label: Read Dry Contact Count
  kind: query
  params: []

# Outlet/Contact Count Response
- id: outlet_count_response
  label: Outlet/Contact Count Response
  kind: feedback
  params:
    - name: outlet_or_contact
      type: enum
      values: ["0x22", "0x32"]
    - name: status_bytes
      type: string
      description: "16 bytes for outlets, 8 bytes for contacts. Each byte: C=Controllable, N=Non-Controllable, X=Does not exist"

# Power Sequencing Command (0x36 Set) - Sequence UP
- id: sequence_up
  label: Sequence Power Up
  kind: action
  params:
    - name: delay_time
      type: integer
      description: "0000 to 0999 seconds, ASCII encoded. Premium+: send 0000 to use saved settings."

# Power Sequencing Command (0x36 Set) - Sequence DOWN
- id: sequence_down
  label: Sequence Power Down
  kind: action
  params:
    - name: delay_time
      type: integer
      description: "0000 to 0999 seconds, ASCII encoded. Premium+: send 0000 to use saved settings."

# Sequencing Response
- id: sequencing_response
  label: Sequencing Response
  kind: feedback
  params:
    - name: direction
      type: enum
      values:
        - "0x00"  # Not Sequencing (fallback on error)
        - "0x01"  # Sequencing up
        - "0x02"  # Sequencing up complete
        - "0x03"  # Sequencing down
        - "0x04"  # Sequencing down complete
    - name: delay_time
      type: string
      description: "ASCII encoded delay time"

# Energy Management State - Get (0x23)
- id: read_energy_management_state
  label: Read Energy Management State
  kind: query
  params:
    - name: outlet_number
      type: integer
      description: "1 to 16 (0x01 to 0x10)"

# Energy Management State - Set (0x23)
- id: set_energy_management_state
  label: Set Energy Management State
  kind: action
  params:
    - name: outlet_number
      type: integer
      description: "1 to 16"
    - name: energy_state
      type: string
      description: "16-byte ASCII string (one byte per outlet). D=Disconnected, S=Standby, I=ON, O=OFF, U=Unknown"

# Energy Management Response
- id: energy_management_response
  label: Energy Management State Response
  kind: feedback
  params:
    - name: outlet_number
      type: integer
    - name: energy_state
      type: string
      description: "16-byte ASCII string per outlet"

# EPO - Emergency Power Off (0x37)
- id: epo_recover
  label: EPO Recover
  kind: action
  params: []

- id: epo_initiate
  label: EPO Initiate
  kind: action
  params: []

# EPO Response
- id: epo_response
  label: EPO Response
  kind: feedback
  params:
    - name: subcommand
      type: enum
      values: ["0x10", "0x12"]
    - name: epo_state
      type: enum
      values:
        - "0x00"  # Normal Operation State
        - "0x01"  # Emergency Power Off Mode

# Register Log Alerts - Get (0x40)
- id: read_log_alerts
  label: Read Log Alert Registration
  kind: query
  params: []

# Register Log Alerts - Set (0x40)
- id: set_log_alerts
  label: Register Log Alerts
  kind: action
  params:
    - name: alert_settings
      type: string
      description: "Two bytes, each bit representing an alert type. First byte: BIT1=Normal Log Alerts, BIT2=Over Voltage, BIT3=Under Voltage, BIT4=Over Temperature, BIT5=Under Temperature, BIT6=Surge Fault. Second byte: BIT1=Auto Ping Timeout, BIT2=RS232 Ping Timeout, BIT3=Over Current, BIT4=Under Current, BIT5=EPO."

# Register Log Alerts Response
- id: log_alerts_response
  label: Log Alerts Registration Response
  kind: feedback
  params:
    - name: alert_settings
      type: string

# Register Status Change - Get (0x41)
- id: read_status_change_registration
  label: Read Status Change Registration
  kind: query
  params: []

# Register Status Change - Set (0x41)
- id: set_status_change_registration
  label: Register Status Changes
  kind: action
  params:
    - name: registration_data
      type: string
      description: "Up to 7 bytes of bitfield registration data covering outlet status, dry contact, input, sequence, EPO, voltage/current/temperature thresholds, energy usage, and thermal metrics."

# Sensor Value Commands - Read (0x50 to 0x61)
- id: read_kilowatt_hours
  label: Read Kilowatt Hours
  kind: query
  params: []

- id: read_peak_voltage
  label: Read Peak Voltage
  kind: query
  params: []

- id: read_rms_voltage
  label: Read RMS Voltage
  kind: query
  params: []

- id: read_peak_load
  label: Read Peak Load
  kind: query
  params: []

- id: read_rms_load
  label: Read RMS Load
  kind: query
  params: []

- id: read_temperature
  label: Read Temperature
  kind: query
  params: []

- id: read_wattage
  label: Read Wattage
  kind: query
  params: []

- id: read_power_factor
  label: Read Power Factor
  kind: query
  params: []

- id: read_thermal_load
  label: Read Thermal Load (BTU)
  kind: query
  params: []

- id: read_surge_protection_state
  label: Read Surge Protection State
  kind: query
  params: []

- id: read_energy_management_state_all
  label: Read Energy Management State (All Outlets)
  kind: query
  params: []

- id: read_occupancy_state
  label: Read Occupancy State
  kind: query
  params: []

# Sensor Value Commands - Write (threshold set commands 0x50-0x61 as settable)
- id: set_kilowatt_hours
  label: Set Kilowatt Hours
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII value in format ##########.#"

- id: set_peak_voltage
  label: Set Peak Voltage
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII value in format ###"

- id: set_rms_voltage
  label: Set RMS Voltage
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII value in format ###"

- id: set_peak_load
  label: Set Peak Load
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII value in format ##.#"

- id: set_rms_load
  label: Set RMS Load
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII value in format ##.#"

- id: set_temperature
  label: Set Temperature
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII value in format ###"

- id: set_wattage
  label: Set Wattage
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII value in format ####"

- id: set_power_factor
  label: Set Power Factor
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII value in format #.#"

- id: set_thermal_load
  label: Set Thermal Load (BTU)
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII value in format ####.#"

- id: set_surge_protection_state
  label: Set Surge Protection State
  kind: action
  params:
    - name: value
      type: enum
      values: ["0x00", "0x01", "0x02"]

- id: set_energy_management_state_all
  label: Set Energy Management State (All Outlets)
  kind: action
  params:
    - name: value
      type: string
      description: "16 bytes, one ASCII letter per outlet"

- id: set_occupancy_state
  label: Set Occupancy State
  kind: action
  params:
    - name: value
      type: enum
      values: ["U", "O"]

# Sensor Response
- id: sensor_response
  label: Sensor Value Response
  kind: feedback
  params:
    - name: command
      type: enum
      values: ["0x50", "0x51", "0x52", "0x53", "0x54", "0x55", "0x56", "0x57", "0x58", "0x59", "0x60", "0x61"]
    - name: subcommand
      type: enum
      values: ["0x10", "0x12"]
    - name: value
      type: string

# Threshold Commands - Read (0x70-0x77)
- id: read_low_voltage_threshold
  label: Read Low Voltage Threshold
  kind: query
  params: []

- id: read_high_voltage_threshold
  label: Read High Voltage Threshold
  kind: query
  params: []

- id: read_max_load_current
  label: Read Max Load Current
  kind: query
  params: []

- id: read_min_load_current
  label: Read Min Load Current
  kind: query
  params: []

- id: read_max_temperature
  label: Read Max Temperature
  kind: query
  params: []

- id: read_min_temperature
  label: Read Min Temperature
  kind: query
  params: []

# Threshold Commands - Write (0x70-0x77)
- id: set_low_voltage_threshold
  label: Set Low Voltage Threshold
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII format ###"

- id: set_high_voltage_threshold
  label: Set High Voltage Threshold
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII format ###"

- id: set_max_load_current
  label: Set Max Load Current
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII format ##.#"

- id: set_min_load_current
  label: Set Min Load Current
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII format ##.#"

- id: set_max_temperature
  label: Set Max Temperature
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII format ###"

- id: set_min_temperature
  label: Set Min Temperature
  kind: action
  params:
    - name: value
      type: string
      description: "ASCII format ###"

# Threshold Response
- id: threshold_response
  label: Threshold Response
  kind: feedback
  params:
    - name: command
      type: enum
      values: ["0x70", "0x71", "0x73", "0x74", "0x76", "0x77"]
    - name: subcommand
      type: enum
      values: ["0x10", "0x12"]
    - name: value
      type: string

# Read Log Entry (0x80)
- id: read_log_entries
  label: Read Log Entries
  kind: query
  params:
    - name: first_entry_index
      type: string
      description: "ASCII encoded index (e.g., \"0002\" = start on 2nd entry)"
    - name: number_of_entries
      type: string
      description: "ASCII encoded count (e.g., \"10\" = read 10 entries)"

# Log Entry Read Response
- id: log_entry_response
  label: Log Entry Read Response
  kind: feedback
  params:
    - name: entry_request_number
      type: string
    - name: entries_remaining
      type: string
    - name: actual_entry_number
      type: string
    - name: entry_type
      type: string
      description: "ASCII ## format: 00=Normal, 01=Over Voltage, 02=Under Voltage, 03=Over Current, 04=Under Current, 05=Over Temperature, 06=Under Temperature, 07=Surge Fault, 08=Auto Ping Fault, 09=RS-232 Ping Fail, 10=EPO Initiate, 11=EPO Recovery"
    - name: datetime
      type: string
      description: "MM/DD/YYYY HH:MM:SS format"
    - name: sensors
      type: string
      description: "Format TTT,WWWW,F.F,VVR,CC.R,LLLL.L,O (temperature, wattage, power factor, RMS voltage, RMS current, thermal load, occupancy)"
    - name: energy_states
      type: string
      description: "16 comma-separated energy management states for outlets 1-16"

# Get Log Count (0x81)
- id: get_log_count
  label: Get Log Count
  kind: query
  params: []

# Clear Log (0x82)
- id: clear_log
  label: Clear Log
  kind: action
  params: []

# Log Count/Clear Response
- id: log_count_response
  label: Log Count/Clear Response
  kind: feedback
  params:
    - name: command
      type: enum
      values: ["0x81", "0x82"]
    - name: count
      type: string
      description: "ASCII encoded count (for 0x81 response only)"

# Product Info Commands (0x90-0x95)
- id: get_part_number
  label: Get Part Number
  kind: query
  params: []

- id: get_amp_hour_rating
  label: Get Product Amp Hour Rating
  kind: query
  params: []

- id: get_surge_existence
  label: Get Surge Protection Existence
  kind: query
  params: []

- id: get_ip_address
  label: Get Current IP Address
  kind: query
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  params: []

# Product Info Response
- id: product_info_response
  label: Product Info Response
  kind: feedback
  params:
    - name: command
      type: enum
      values: ["0x90", "0x91", "0x93", "0x94", "0x95"]
    - name: value
      type: string
```

## Feedbacks
```yaml
# See Actions section above - responses are modeled as feedback entries on each command.
# Key unsolicited notifications:
# - Outlet status change (0x20/0x30 with subcommand 0x12)
# - EPO status change (0x37 with subcommand 0x12)
# - Ping from device (0x01, subcommand 0x01) - requires Pong response
# - Sensor status change (subcommand 0x12 on sensor commands 0x50-0x61)
# - Threshold status change (subcommand 0x12 on threshold commands 0x70-0x77)
# UNRESOLVED: full event subscription model not enumerated from source
```

## Variables
```yaml
# Sensor values (read-only, reported via 0x50-0x61 responses):
# - Kilowatt Hours (0x50): ##########.# format
# - Peak Voltage (0x51): ### format
# - RMS Voltage (0x52): ### format
# - Peak Load (0x53): ##.# format
# - RMS Load (0x54): ##.# format
# - Temperature (0x55): ### format (Fahrenheit)
# - Wattage (0x56): #### format
# - Power Factor (0x57): #.# format
# - Thermal Load (0x58): ####.# format (BTU)
# - Surge Protection State (0x59): 0x00=n/a, 0x01=protected, 0x02=compromised
# - Energy Management State (0x60): 16-byte string per outlet
# - Occupancy State (0x61): U=Unoccupied, O=Occupied

# Thresholds (read/write via 0x70-0x77):
# - Low Voltage Threshold (0x70)
# - High Voltage Threshold (0x71)
# - Max Load Current (0x73)
# - Min Load Current (0x74)
# - Max Temperature (0x76)
# - Min Temperature (0x77)

# Product info (read-only via 0x90-0x95):
# - Part Number (0x90): up to 50 chars
# - Amp Hour Rating (0x91): ### format
# - Surge Existence (0x93): Y/N
# - Current IP Address (0x94): ###.###.###.###
# - MAC Address (0x95): ##:##:##:##:##:##
```

## Events
```yaml
# Unsolicited notifications device sends:
# - Outlet status change (0x20/0x30, subcommand 0x12)
# - EPO status change (0x37, subcommand 0x12)
# - Ping request (0x01, subcommand 0x01) - control system must respond with Pong
# - Sensor status change (0x50-0x61, subcommand 0x12)
# - Threshold status change (0x70-0x77, subcommand 0x12)
# - Log update (0x20/0x30, subcommand 0x30)
# UNRESOLVED: full event taxonomy and triggering conditions not fully enumerated
```

## Macros
```yaml
# Multi-step sequences described explicitly in source:
# - Connection establishment: send Login → receive Login Response → receive Ping from device → send Pong → ready
# - Reconnection after disconnect: must repeat full login sequence
# - EPO sequence: EPO Initiate → device sends EPO Status Change → EPO Recover to restore
```

## Safety
```yaml
confirmation_required_for:
  - epo_initiate  # Emergency Power Off: confirmation may be required in high-availability setups
interlocks:
  - "Three unanswered Pings triggers disconnect - control system must respond to Ping messages"
  - "Login required before any other command - session must be re-established after disconnect"
# UNRESOLVED: EPO wiring/latching specifics not in source
```

## Notes
- Protocol uses 0xFE header and 0xFF tail as message delimiters — 0xFE, 0xFF, and 0xFD within message body must be escaped (0xFD prefix + bit-inverted value)
- Checksum: sum all bytes from header through end of data envelope, mask with 0x7F
- Cycle time encoding: ASCII string of 4 digits (0000-3600), NOT binary — e.g., 5 seconds = "0005" = 0x30303035
- Sequencing delay encoding: ASCII 4 digits (0000-0999) — e.g., 999 seconds = "0999" = 0x30393939
- Default login for Select/Premium: username `user`, password `password`; Premium+ requires manually created admin account with control protocol enabled
- RS-232 transport only available on Premium models (not Select or Premium+)
- Device closes TCP connection after 3 unanswered Pings
- Log entries formatted as pipe-delimited ASCII: `|entry_type|datetime|sensors|energy_states|`
<!-- UNRESOLVED: physical mounting, voltage, current, power capacity specifications not in source -->
<!-- UNRESOLVED: factory reset procedure not in source -->
<!-- UNRESOLVED: firmware update mechanism not in source -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - media.iewc.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://media.iewc.com/PublicAssets/SpecificationSheets/RLNK-SW715R-NS_specification.pdf
retrieved_at: 2026-05-27T02:36:30.545Z
last_checked_at: 2026-05-27T15:41:21.022Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T15:41:21.022Z
matched_actions: 84
action_count: 84
confidence: high
summary: "All 84 spec action units match source commands with correct opcodes, parameters, and transport details."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
