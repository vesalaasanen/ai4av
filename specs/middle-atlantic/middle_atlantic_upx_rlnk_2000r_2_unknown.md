---
spec_id: admin/middle-atlantic-racklink
schema_version: ai4av-public-spec-v1
revision: 1
title: "Middle Atlantic RackLink Control Spec"
manufacturer: "Middle Atlantic"
model_family: "UPX RLNK 2000R 2"
aliases: []
compatible_with:
  manufacturers:
    - "Middle Atlantic"
  models:
    - "UPX RLNK 2000R 2"
    - "RackLink Premium"
    - "RackLink Premium+"
    - "RackLink Select"
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
last_checked_at: 2026-05-27T15:41:21.096Z
generated_at: 2026-05-27T15:41:21.096Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T15:41:21.096Z
  matched_actions: 57
  action_count: 57
  confidence: high
  summary: "All 57 spec actions matched to source opcodes; transport parameters verified; comprehensive one-to-one coverage of protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Middle Atlantic RackLink Control Spec

## Summary
Middle Atlantic RackLink is a network-connected power distribution unit (PDU) with per-outlet power control, energy monitoring, and sequencing capabilities. Supports RS-232 (Premium models only) and TCP/IP (Select/Premium/Premium+) control via a hex-based protocol with login authentication. Control protocol must be enabled via web UI before first use.

<!-- UNRESOLVED: specific UPX RLNK 2000R 2 model variant (Premium/Select/Premium+) not confirmed in source; treat all models as applicable based on protocol doc scope -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 60000  # TCP Port: 60000 (RackLink Select, Premium, Premium+)
serial:
  baud_rate: 9600  # RS232 Specifications (RackLink Premium Only)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # login required; default "user|password" for Select/Premium; Premium+ uses any admin account with control protocol enabled
  default_credential: "user|password"  # applicable to Select/Premium only
```

## Traits
```yaml
- powerable       # power on/off/cycle per outlet (0x20 commands)
- sequenced       # power sequencing (0x36 commands)
- queryable       # sensor value queries (0x50-0x61), status queries
- levelable       # threshold set/get (0x70-0x77)
```

## Actions
```yaml
- id: login
  label: Login
  kind: action
  params:
    - name: credentials
      type: string
      description: "Username|Password format. Default: user|password"

- id: ping_response
  label: Ping Response (Pong)
  kind: action
  params: []

- id: read_outlet_status
  label: Read Outlet Status
  kind: query
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16 (0x01-0x10)

- id: read_dry_contact_status
  label: Read Dry Contact Status
  kind: query
  params:
    - name: contact
      type: integer
      description: Contact number 1-8 (0x01-0x08)

- id: set_outlet_on
  label: Outlet ON
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16
    - name: cycle_time
      type: string
      description: "0000 (4 ASCII hex digits, 0x30303030). Not used for ON/OFF, send 0000."

- id: set_outlet_off
  label: Outlet OFF
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16
    - name: cycle_time
      type: string
      description: "0000 (4 ASCII hex digits). Not used for ON/OFF, send 0000."

- id: cycle_outlet
  label: Outlet Cycle
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16
    - name: cycle_time
      type: string
      description: "Cycle time in seconds, 0000-3600, encoded as 4 ASCII digits (e.g. 0005 = 5 sec, 3600 = 3600 sec)"

- id: set_contact_on
  label: Dry Contact ON
  kind: action
  params:
    - name: contact
      type: integer
      description: Contact number 1-8

- id: set_contact_off
  label: Dry Contact OFF
  kind: action
  params:
    - name: contact
      type: integer
      description: Contact number 1-8

- id: read_outlet_name
  label: Read Outlet Name
  kind: query
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16

- id: read_contact_name
  label: Read Dry Contact Name
  kind: query
  params:
    - name: contact
      type: integer
      description: Contact number 1-8

- id: write_outlet_name
  label: Set Outlet Name
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16
    - name: name
      type: string
      description: Outlet name string

- id: write_contact_name
  label: Set Dry Contact Name
  kind: action
  params:
    - name: contact
      type: integer
      description: Contact number 1-8
    - name: name
      type: string
      description: Contact name string

- id: read_outlet_count
  label: Read Outlet Count
  kind: query
  params: []

- id: read_contact_count
  label: Read Dry Contact Count
  kind: query
  params: []

- id: sequence_up
  label: Sequence Power Up
  kind: action
  params:
    - name: delay_time
      type: string
      description: "Delay time 0000-0999 seconds, ASCII encoded. 0000 = use saved settings (Premium+)."

- id: sequence_down
  label: Sequence Power Down
  kind: action
  params:
    - name: delay_time
      type: string
      description: "Delay time 0000-0999 seconds, ASCII encoded. 0000 = use saved settings (Premium+)."

- id: read_energy_management_state
  label: Read Energy Management State
  kind: query
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16

- id: set_energy_management_state
  label: Set Energy Management State
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16
    - name: state
      type: enum
      description: "D=Disconnected, S=Standby, I=ON, O=OFF, U=Unknown (1 byte ASCII)"

- id: epo_initiate
  label: EPO Initiate
  kind: action
  params: []

- id: epo_recover
  label: EPO Recover
  kind: action
  params: []

- id: register_log_alerts
  label: Register Log Alerts
  kind: action
  params:
    - name: settings
      type: object
      description: "Two bytes, each bit representing: Normal Log, Over/Under Voltage, Over/Under Temp, Surge Fault, Auto Ping Timeout, RS232 Ping Timeout, Over/Under Current, EPO"

- id: get_log_alerts
  label: Get Log Alert Settings
  kind: query
  params: []

- id: register_status_changes
  label: Register Status Changes
  kind: action
  params:
    - name: settings
      type: object
      description: "7 bytes of bitfield settings for: Outlet Status, Dry Contact, Input, Sequence, EPO, Voltage Thresholds, Max/Min Load, Max/Min Temp, Current/Power/Energy readings"

- id: get_status_change_registration
  label: Get Status Change Registration
  kind: query
  params: []

- id: read_sensor_kilowatt_hours
  label: Read Kilowatt Hours
  kind: query
  params: []

- id: read_sensor_peak_voltage
  label: Read Peak Voltage
  kind: query
  params: []

- id: read_sensor_rms_voltage
  label: Read RMS Voltage
  kind: query
  params: []

- id: read_sensor_peak_load
  label: Read Peak Load
  kind: query
  params: []

- id: read_sensor_rms_load
  label: Read RMS Load
  kind: query
  params: []

- id: read_sensor_temperature
  label: Read Temperature
  kind: query
  params: []

- id: read_sensor_wattage
  label: Read Wattage
  kind: query
  params: []

- id: read_sensor_power_factor
  label: Read Power Factor
  kind: query
  params: []

- id: read_sensor_thermal_load
  label: Read Thermal Load (BTU)
  kind: query
  params: []

- id: read_sensor_surge_protection_state
  label: Read Surge Protection State
  kind: query
  params: []

- id: read_sensor_energy_management_state
  label: Read Energy Management State (all outlets)
  kind: query
  params: []

- id: read_sensor_occupancy_state
  label: Read Occupancy State
  kind: query
  params: []

- id: set_low_voltage_threshold
  label: Set Low Voltage Threshold
  kind: action
  params:
    - name: value
      type: string
      description: "### format (3 ASCII digits)"

- id: get_low_voltage_threshold
  label: Get Low Voltage Threshold
  kind: query
  params: []

- id: set_high_voltage_threshold
  label: Set High Voltage Threshold
  kind: action
  params:
    - name: value
      type: string
      description: "### format (3 ASCII digits)"

- id: get_high_voltage_threshold
  label: Get High Voltage Threshold
  kind: query
  params: []

- id: set_max_load_current
  label: Set Max Load Current
  kind: action
  params:
    - name: value
      type: string
      description: "##.# format (4 ASCII digits with decimal)"

- id: get_max_load_current
  label: Get Max Load Current
  kind: query
  params: []

- id: set_min_load_current
  label: Set Min Load Current
  kind: action
  params:
    - name: value
      type: string
      description: "##.# format (4 ASCII digits with decimal)"

- id: get_min_load_current
  label: Get Min Load Current
  kind: query
  params: []

- id: set_max_temperature
  label: Set Max Temperature
  kind: action
  params:
    - name: value
      type: string
      description: "### format (3 ASCII digits, Fahrenheit)"

- id: get_max_temperature
  label: Get Max Temperature
  kind: query
  params: []

- id: set_min_temperature
  label: Set Min Temperature
  kind: action
  params:
    - name: value
      type: string
      description: "### format (3 ASCII digits, Fahrenheit)"

- id: get_min_temperature
  label: Get Min Temperature
  kind: query
  params: []

- id: read_log_entry
  label: Read Log Entries
  kind: query
  params:
    - name: start_index
      type: string
      description: "4 ASCII digit index (e.g. 0002 = start at entry 2)"
    - name: count
      type: string
      description: "2 ASCII digit count (e.g. 10 = read 10 entries)"

- id: get_log_count
  label: Get Log Count
  kind: query
  params: []

- id: clear_log
  label: Clear Log
  kind: action
  params: []

- id: get_product_part_number
  label: Get Product Part Number
  kind: query
  params: []

- id: get_product_amp_hour_rating
  label: Get Product Amp Hour Rating
  kind: query
  params: []

- id: get_product_surge_existence
  label: Get Product Surge Existence
  kind: query
  params: []

- id: get_product_ip_address
  label: Get Product IP Address
  kind: query
  params: []

- id: get_product_mac_address
  label: Get Product MAC Address
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: nack
  type: object
  description: Negative acknowledgement with error code
  fields:
    - name: error_code
      type: enum
      values:
        - "0x01 - Bad CRC on previous command"
        - "0x02 - Bad Length on previous command"
        - "0x03 - Bad Escape sequence on previous command"
        - "0x04 - Previous command invalid"
        - "0x05 - Previous sub-command invalid"
        - "0x06 - Previous command incorrect byte count"
        - "0x07 - Invalid data bytes in previous command"
        - "0x08 - Invalid Credentials (re-login required)"
        - "0x10 - Unknown Error"
        - "0x11 - Access Denied (EPO)"

- id: login_response
  type: enum
  values:
    - accepted
    - rejected

- id: ping
  type: action
  description: Periodic ping from device; control system must respond with pong or be disconnected after 3 missed pings

- id: outlet_status_changed
  type: object
  description: Unsolicited status update from local event or change
  fields:
    - name: outlet
      type: integer
      description: Outlet number 1-16
    - name: state
      type: enum
      values:
        - "0x00 - OFF"
        - "0x01 - ON"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond thresholds and names;
# sensor readings are query-only; energy management state is set per-outlet via actions
```

## Events
```yaml
# Unsolicited notifications from device:
# - Ping (0x01) sent periodically to control system
# - Status change updates (0x20/0x30 subcommand 0x12) when outlet/contact state changes
# - EPO status change (0x37 subcommand 0x12)
# - Sensor value status changes (0x50-0x61 subcommand 0x12) when thresholds crossed
# - Log entries for events (over/under voltage, over/under current, over/under temp, surge fault, ping timeout, EPO)
# - Sequence status changes (0x36 direction status updates)
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros defined in source;
# sequencing command (0x36) provides built-in delayed power-up/down across outlets
```

## Safety
```yaml
confirmation_required_for:
  - epo_initiate  # Emergency Power Off - confirmation typically required in deployment
interlocks: []
# UNRESOLVED: no explicit interlock procedure in source; EPO (0x37) provides emergency power cutoff
# Note: "Access Denied (EPO)" error code (0x11) indicates EPO can block control access
```

## Notes
- Protocol uses 0xFE header, 0xFF tail, 0xFD escape byte. Checksum is sum of all bytes from header through end of data envelope, masked to 7 bits (LSB only).
- Login required before issuing commands. Session times out after 3 missed pings; must re-login.
- Control Protocol disabled by default on Premium+; must be manually enabled via Device Setting -> Network Services -> Control Protocol checkbox.
- Premium+ has configurable accounts; any admin account with control protocol enabled can be used for login.
- Select/Premium unlock protocol at first web login when password is set; default login is "user|password".
- Escape bytes (0xFE, 0xFF, 0xFD) in message body must be escaped with 0xFD prefix and bit-inverted value.
- Cycle time for outlet control: 0000–3600 seconds, ASCII encoded (0x30–0x39 for digits).
- Sensor values use ASCII representation: "##.#" (4 chars), "###" (3 chars), "####" (4 chars) depending on parameter.
- Log entry format: "MM/DD/YYYY HH:MM:SS,TTT,WWWW,F.F,VVR,CC.R,LLLL.L,O,energy_management_states"
- TCP port 60000 confirmed for TCP/IP models; RS-232 confirmed for Premium models at 9600/8/N/1.
<!-- UNRESOLVED: which specific model variant (Select/Premium/Premium+) the UPX RLNK 2000R 2 is not confirmed in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/current/power specifications not in control protocol doc (refer to hardware spec) -->
<!-- UNRESOLVED: physical outlet count for this specific model not stated; protocol supports up to 16 -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - media.iewc.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://media.iewc.com/PublicAssets/SpecificationSheets/RLNK-SW715R-NS_specification.pdf
retrieved_at: 2026-05-27T02:36:30.545Z
last_checked_at: 2026-05-27T15:41:21.096Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T15:41:21.096Z
matched_actions: 57
action_count: 57
confidence: high
summary: "All 57 spec actions matched to source opcodes; transport parameters verified; comprehensive one-to-one coverage of protocol."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
