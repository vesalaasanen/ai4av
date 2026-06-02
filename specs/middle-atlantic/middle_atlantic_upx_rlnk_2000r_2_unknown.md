---
spec_id: admin/middle-atlantic-upx-rlnk-2000r-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Middle Atlantic UPX RLNK 2000R 2 Control Spec"
manufacturer: "Middle Atlantic"
model_family: "UPX RLNK 2000R 2"
aliases: []
compatible_with:
  manufacturers:
    - "Middle Atlantic"
  models:
    - "UPX RLNK 2000R 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - digitalautomation.us
  - manualslib.com
  - markertek.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://res.cloudinary.com/legrandav/image/upload/v133936596/UPX-COMM-PROTOCOL-UM.pdf
  - https://digitalautomation.us/wp-content/uploads/2023/09/MiddleAtlantic_RacklinkSelect_IP.pdf
  - https://www.manualslib.com/manual/1839068/Middle-Atlantic-Products-Racklink.html
  - "https://www.markertek.com/Attachments/Manuals/Middle%20Atlantic/RLNK-SW820R-SP-Manual.pdf"
retrieved_at: 2026-05-27T02:36:30.545Z
last_checked_at: 2026-06-02T04:56:30.829Z
generated_at: 2026-06-02T04:56:30.829Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "default baud-rate parity/data/stop values for Premium+ Ethernet-only operation do not apply; RS-232 is Premium only per source"
  - "protocol-over-TLS not stated; assume plaintext framing"
  - "source does not define named multi-step macro sequences;"
  - "specific outlet/load current limits, voltage thresholds, and"
  - "PING interval / timeout values not stated in source"
  - "NACK 0x11 \"Access Denied(EPO)\" — source lists under NACK codes but does not describe which commands are denied during EPO; treat as global until operator confirms"
  - "source's outlet-name sample uses subcommand 0x10 (response) where the table specifies 0x01 (set); flagged above"
  - "source's status-change set-subcommand length (0x06) vs. described byte count (6+); flagged above"
verification:
  verdict: verified
  checked_at: 2026-06-02T04:56:30.829Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 spec actions matched verbatim in source; transport parameters verified; full command coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Middle Atlantic UPX RLNK 2000R 2 Control Spec

## Summary

This spec covers the binary control protocol for the Middle Atlantic UPX RLNK 2000R 2 rack power distribution unit (PDU), a RackLink Premium+ tier product. Two transports are supported: RS-232 (RackLink Premium only — not available on Premium+ UPX) and TCP/IP on port 60000. The protocol is a framed binary envelope of the form `<0xFE><Length><Cmd><Subcommand>[Data][Checksum]><0xFF>`, with a 7-bit masked additive checksum. The control protocol is disabled by default and must be enabled through the device web UI before any command set is accepted; a "SET" login command using `user|password` (or any admin account on Premium+) is required to authenticate every session, and the host must respond to periodic pings or be disconnected.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default baud-rate parity/data/stop values for Premium+ Ethernet-only operation do not apply; RS-232 is Premium only per source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60000  # source: "TCP Port: 60000"
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credentials  # source: "SET" login message required, default "user|password"
  username_field: "Username|Password"  # source: data envelope format
  default_username: "user"
  default_password: "password"  # source: "Default: 'user|password'"
  # UNRESOLVED: protocol-over-TLS not stated; assume plaintext framing
```

## Traits
```yaml
powerable: true       # inferred: power outlet on/off/cycle commands present (0x20/0x30)
queryable: true       # inferred: status query commands present (0x20/0x02, 0x50+, 0x70+)
```

## Frame Encoding Reference

Every command and response shares the same envelope:

```
<0xFE> <Length> <Data Envelope> <Checksum> <0xFF>
```

- Header: `0xFE` (1 byte)
- Length: total length of the data envelope, 1 byte (range `0x03`–`0xFA` per source example)
- Data envelope: `Cmd` byte, `Subcommand` byte, then optional data (3–250 bytes)
- Checksum: sum of all bytes from `0xFE` through end of data envelope, masked `& 0x7F` (low 7 bits; high bit cleared)
- Tail: `0xFF` (1 byte)

Escape: the protected values `0xFE`, `0xFF`, `0xFD` in the data envelope MUST be escaped with a leading `0xFD` and bit-inverted; escaped bytes are excluded from length and checksum calculations.

The `{chk}` placeholder in the `command` fields below denotes the computed 1-byte masked checksum. The `{len}` placeholder denotes the data envelope length byte. Concrete examples in the source are reproduced verbatim where possible.

## Actions
```yaml
# ============================================================================
# SESSION / LINK
# ============================================================================

- id: login
  label: Login (authenticate control session)
  kind: action
  command: "FE 10 00 02 01 {creds:ascii} {chk:hex} FF"
  # Source sample: 0xFE10000201757365727C70617373776F72643FFF (default "user|password")
  params:
    - name: creds
      type: string
      description: 'ASCII "Username|Password". Default on Select/Premium = "user|password". Premium+ may use any admin account with control protocol enabled.'

- id: respond_ping
  label: Respond to device PING (Pong)
  kind: action
  command: "FE 03 00 01 10 12 FF"
  # Source sample: 0xFE0300011012FF (Control System sending PING response)
  params: []
  notes: |
    Required when device sends unsolicited PING (0xFE 03 00 01 01 03 FF).
    Three missed pings = session terminated by device.

# ============================================================================
# POWER OUTLETS (0x20)
# ============================================================================

- id: read_outlet_state
  label: Read Outlet State
  kind: query
  command: "FE 04 00 20 02 {outlet:hex} {chk:hex} FF"
  # Source sample: 0xfe040020000325ff (Read Outlet 3 state)
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16 (0x01-0x10)

- id: write_outlet_state
  label: Set Outlet State (on/off/cycle)
  kind: action
  command: "FE 09 00 20 01 {outlet:hex} {state:hex} 30 30 30 30 {chk:hex} FF"
  # Source examples:
  #   0xfe090020010101303030306aff  Outlet 1 ON
  #   0xfe090020010200303030306aff  Outlet 2 OFF
  #   0xfe0900200102023030303571ff  Outlet 2 Cycle 5 s
  #   0xfe0900200108023030303874ff  Outlet 8 Cycle 8 s
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16 (0x01-0x10)
    - name: state
      type: enum
      values: [0x00, 0x01, 0x02, 0x03]
      description: 0x00=OFF, 0x01=ON, 0x02=Cycle, 0x03=Not Controllable (response only)
    - name: cycle_time_seconds
      type: integer
      description: 0-3600 s, ASCII-encoded as 4 decimal digits (e.g. "0005" = 0x30303035). Required for Cycle; send "0000" (0x30303030) for on/off.

# ============================================================================
# DRY CONTACTS (0x30)
# ============================================================================

- id: read_dry_contact_state
  label: Read Dry Contact State
  kind: query
  command: "FE 04 00 30 02 {contact:hex} {chk:hex} FF"
  params:
    - name: contact
      type: integer
      description: Contact number 1-8 (0x01-0x08)

- id: write_dry_contact_state
  label: Set Dry Contact State
  kind: action
  command: "FE 09 00 30 01 {contact:hex} {state:hex} 30 30 30 30 {chk:hex} FF"
  params:
    - name: contact
      type: integer
      description: Contact number 1-8 (0x01-0x08)
    - name: state
      type: enum
      values: [0x00, 0x01, 0x02, 0x03]
      description: 0x00=OFF, 0x01=ON, 0x02=Cycle, 0x03=Not Controllable (response only)
    - name: cycle_time_seconds
      type: integer
      description: 0-3600 s, ASCII-encoded 4 decimal digits

# ============================================================================
# OUTLET / CONTACT NAMES (0x21, 0x31)
# ============================================================================

- id: read_outlet_name
  label: Read Outlet Name
  kind: query
  command: "FE 04 00 21 02 {outlet:hex} {chk:hex} FF"
  # Source sample: 0xFE040021020126FF (Read Name of Outlet 1)
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16

- id: write_outlet_name
  label: Set Outlet Name
  kind: action
  command: "FE 08 00 21 01 {outlet:hex} {name:ascii} {chk:hex} FF"
  # Source sample: FE08002110016E616D6559FF (Set Outlet 1 name to "name"; note source uses 0x10 not 0x01 in the Subcommand slot - see notes)
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16
    - name: name
      type: string
      description: ASCII outlet name

- id: read_dry_contact_name
  label: Read Dry Contact Name
  kind: query
  command: "FE 04 00 31 02 {contact:hex} {chk:hex} FF"
  params:
    - name: contact
      type: integer
      description: Contact number 1-8

- id: write_dry_contact_name
  label: Set Dry Contact Name
  kind: action
  command: "FE {len:hex} 00 31 01 {contact:hex} {name:ascii} {chk:hex} FF"
  params:
    - name: contact
      type: integer
      description: Contact number 1-8
    - name: name
      type: string
      description: ASCII contact name

# ============================================================================
# OUTLET / CONTACT COUNT (0x22, 0x32)
# ============================================================================

- id: read_outlet_count
  label: Read Outlet Count
  kind: query
  command: "FE 03 00 22 02 25 FF"
  # Source sample: 0xFE0300220225FF; checksum is always 0x25 for outlet count
  params: []

- id: read_dry_contact_count
  label: Read Dry Contact Count
  kind: query
  command: "FE 03 00 32 02 35 FF"
  # Source: checksum is always 0x35 for contact count
  params: []

# ============================================================================
# POWER SEQUENCING (0x36)
# ============================================================================

- id: sequence_power
  label: Power Sequencing (up/down with delay)
  kind: action
  command: "FE 08 00 36 01 {direction:hex} {delay:ascii} {chk:hex} FF"
  # Source examples:
  #   0xFE08003601013030303301FF  Sequence up, 3 s delay
  #   0xFE08003601033030303505FF  Sequence down, 5 s delay
  #   0xFE0800360101303030307EFF  Sequence up, Premium+, use saved settings (delay "0000")
  params:
    - name: direction
      type: enum
      values: [0x01, 0x03]
      description: 0x01=Sequence UP, 0x03=Sequence DOWN
    - name: delay_seconds
      type: integer
      description: 0-999 s, ASCII-encoded 4 decimal digits. Use "0000" on Premium+ to apply configured saved delay.

# ============================================================================
# ENERGY MANAGEMENT STATE (0x23) - Premium / Premium+ only
# ============================================================================

- id: read_energy_management_state
  label: Read Energy Management State
  kind: query
  command: "FE 04 00 23 02 {outlet:hex} {chk:hex} FF"
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16

- id: set_energy_management_state
  label: Set Energy Management State
  kind: action
  command: "FE 05 00 23 01 {outlet:hex} {state:ascii} {chk:hex} FF"
  params:
    - name: outlet
      type: integer
      description: Outlet number 1-16
    - name: state
      type: enum
      values: ["D", "S", "I", "O", "U"]
      description: 'ASCII letter: "D"=Disconnected (0x44), "S"=Standby (0x53), "I"=ON (0x49), "O"=OFF (0x4F), "U"=Unknown (0x55)'

# ============================================================================
# EMERGENCY POWER OFF (0x37) - Premium / Premium+ only
# ============================================================================

- id: epo_initiate
  label: Emergency Power Off - Initiate
  kind: action
  command: "FE 04 00 37 01 01 {chk:hex} FF"
  params: []
  notes: |
    SAFETY-CRITICAL. Immediately removes downstream power.
    Source: "0x37 - EPO", "0x01 - Set", "0x01 - EPO Initiate".
    NACK 0x11 ("Access Denied(EPO)") is sent back if EPO already active.

- id: epo_recover
  label: Emergency Power Off - Recover
  kind: action
  command: "FE 04 00 37 01 00 {chk:hex} FF"
  params: []

# ============================================================================
# LOG ALERTS REGISTRATION (0x40) - Premium / Premium+ only
# ============================================================================

- id: set_log_alerts
  label: Set Log Alert Registration Bits
  kind: action
  command: "FE 05 00 40 01 {byte1:hex} {byte2:hex} {chk:hex} FF"
  params:
    - name: byte1
      type: integer
      description: 'Bitmask - BIT1 Normal Log, BIT2 Over Voltage, BIT3 Under Voltage, BIT4 Over Temp, BIT5 Under Temp, BIT6 Surge Fault, BIT7 <Future>, BIT8 RESERVED'
    - name: byte2
      type: integer
      description: 'Bitmask - BIT1 Auto Ping Timeout, BIT2 RS232 Ping Timeout, BIT3 Over Current, BIT4 Under Current, BIT5 EPO, BIT6/7 <Future>, BIT8 RESERVED'

- id: get_log_alerts
  label: Get Log Alert Registration
  kind: query
  command: "FE 03 00 40 02 {chk:hex} FF"
  params: []

# ============================================================================
# STATUS CHANGE REGISTRATION (0x41) - Premium / Premium+ only
# ============================================================================

- id: set_status_change
  label: Set Status Change Registration
  kind: action
  command: "FE 06 00 41 01 {b1:hex} {b2:hex} {b3:hex} {b4:hex} {chk:hex} FF"
  # NOTE: source data table has 6 bytes (B1-B7) but length field says "Always 0x06 for set subcommand"; carrying 4 bytes per the listed bytes
  params:
    - name: b1
      type: integer
      description: 'BIT1 Outlet Status, BIT2-7 <Future>, BIT8 RESERVED'
    - name: b2
      type: integer
      description: 'BIT1 Dry Contact, BIT2 Input, BIT3 Sequence, BIT4 EPO, BIT5-7 <Future>, BIT8 RESERVED'
    - name: b3
      type: integer
      description: 'BIT1 Low Volt Thresh, BIT2 High Volt Thresh, BIT4 Max Load, BIT5 Min Load, BIT7 Max Temp, BIT8 RESERVED'
    - name: b4
      type: integer
      description: 'BIT1 Min Temp, others <Future>'

- id: get_status_change
  label: Get Status Change Registration
  kind: query
  command: "FE 03 00 41 02 {chk:hex} FF"
  params: []

# ============================================================================
# SENSOR VALUES (0x50 - 0x61) - Premium / Premium+ only
# Format note: each command is one byte. SET writes the sensor value (where
# applicable). GET is a query; length byte = 0x03.
# ============================================================================

- id: read_kilowatt_hours
  label: Read Kilowatt Hours
  kind: query
  command: "FE 03 00 50 02 {chk:hex} FF"
  notes: 'Format: ##########.# (11 ASCII chars incl. decimal)'

- id: set_kilowatt_hours
  label: Set Kilowatt Hours Counter
  kind: action
  command: "FE 07 00 50 01 {value:ascii} {chk:hex} FF"
  notes: 'Value in ASCII, format ##########.# (length 0x07 includes cmd+sub+4 decimal digits+dot)'

- id: read_peak_voltage
  label: Read Peak Voltage
  kind: query
  command: "FE 03 00 51 02 {chk:hex} FF"
  notes: 'Format: ### (3 ASCII digits)'

- id: set_peak_voltage
  label: Set Peak Voltage
  kind: action
  command: "FE 06 00 51 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ###'

- id: read_rms_voltage
  label: Read RMS Voltage
  kind: query
  command: "FE 03 00 52 02 {chk:hex} FF"
  notes: 'Format: ###'

- id: set_rms_voltage
  label: Set RMS Voltage
  kind: action
  command: "FE 06 00 52 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ###'

- id: read_peak_load
  label: Read Peak Load
  kind: query
  command: "FE 03 00 53 02 {chk:hex} FF"
  notes: 'Format: ##.#'

- id: set_peak_load
  label: Set Peak Load
  kind: action
  command: "FE 07 00 53 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ##.#'

- id: read_rms_load
  label: Read RMS Load
  kind: query
  command: "FE 03 00 54 02 {chk:hex} FF"
  notes: 'Format: ##.#'

- id: set_rms_load
  label: Set RMS Load
  kind: action
  command: "FE 07 00 54 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ##.#'

- id: read_temperature
  label: Read Temperature
  kind: query
  command: "FE 03 00 55 02 {chk:hex} FF"
  notes: 'Format: ### (Fahrenheit per source)'

- id: set_temperature
  label: Set Temperature
  kind: action
  command: "FE 06 00 55 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ###'

- id: read_wattage
  label: Read Wattage
  kind: query
  command: "FE 03 00 56 02 {chk:hex} FF"
  notes: 'Format: ####'

- id: set_wattage
  label: Set Wattage
  kind: action
  command: "FE 07 00 56 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ####'

- id: read_power_factor
  label: Read Power Factor
  kind: query
  command: "FE 03 00 57 02 {chk:hex} FF"
  notes: 'Format: #.#'

- id: set_power_factor
  label: Set Power Factor
  kind: action
  command: "FE 06 00 57 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: #.#'

- id: read_thermal_load
  label: Read Thermal Load (BTU)
  kind: query
  command: "FE 03 00 58 02 {chk:hex} FF"
  notes: 'Format: ####.#'

- id: set_thermal_load
  label: Set Thermal Load
  kind: action
  command: "FE 08 00 58 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ####.#'

- id: read_surge_protection_state
  label: Read Surge Protection State
  kind: query
  command: "FE 03 00 59 02 {chk:hex} FF"
  notes: 'Response: 0x00 n/a, 0x01 protected, 0x02 compromised'

- id: read_energy_mgmt_per_outlet
  label: Read Energy Management State (all 16 outlets)
  kind: query
  command: "FE 03 00 60 02 {chk:hex} FF"
  notes: 'Response: 16 ASCII bytes (one per outlet): D/S/I/O/U'

- id: read_occupancy_state
  label: Read Occupancy State
  kind: query
  command: "FE 03 00 61 02 {chk:hex} FF"
  notes: 'Response: "U"/0x55 Unoccupied, "O"/0x4F Occupied'

# ============================================================================
# THRESHOLDS (0x70 - 0x77) - Premium / Premium+ only
# 0x72 and 0x75 are not assigned in the source.
# ============================================================================

- id: read_low_voltage_threshold
  label: Read Low Voltage Threshold
  kind: query
  command: "FE 03 00 70 02 {chk:hex} FF"
  notes: 'Format: ###'

- id: set_low_voltage_threshold
  label: Set Low Voltage Threshold
  kind: action
  command: "FE 06 00 70 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ###'

- id: read_high_voltage_threshold
  label: Read High Voltage Threshold
  kind: query
  command: "FE 03 00 71 02 {chk:hex} FF"
  notes: 'Format: ###'

- id: set_high_voltage_threshold
  label: Set High Voltage Threshold
  kind: action
  command: "FE 06 00 71 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ###'

- id: read_max_load_current
  label: Read Max Load Current
  kind: query
  command: "FE 03 00 73 02 {chk:hex} FF"
  notes: 'Format: ##.#'

- id: set_max_load_current
  label: Set Max Load Current
  kind: action
  command: "FE 07 00 73 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ##.#'

- id: read_min_load_current
  label: Read Min Load Current
  kind: query
  command: "FE 03 00 74 02 {chk:hex} FF"
  notes: 'Format: ##.#'

- id: set_min_load_current
  label: Set Min Load Current
  kind: action
  command: "FE 07 00 74 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ##.#'

- id: read_max_temperature
  label: Read Max Temperature
  kind: query
  command: "FE 03 00 76 02 {chk:hex} FF"
  notes: 'Format: ###'

- id: set_max_temperature
  label: Set Max Temperature
  kind: action
  command: "FE 06 00 76 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ###'

- id: read_min_temperature
  label: Read Min Temperature
  kind: query
  command: "FE 03 00 77 02 {chk:hex} FF"
  notes: 'Format: ###'

- id: set_min_temperature
  label: Set Min Temperature
  kind: action
  command: "FE 06 00 77 01 {value:ascii} {chk:hex} FF"
  notes: 'Format: ###'

# ============================================================================
# LOG ENTRY READ / COUNT / CLEAR (0x80, 0x81, 0x82)
# ============================================================================

- id: read_log_entries
  label: Read Log Entries
  kind: query
  command: "FE 0A 00 80 02 {first_idx:ascii} 7C {count:ascii} {chk:hex} FF"
  # Source: 1 byte Length always 0x0A, 0x80 cmd, 0x02 sub, ASCII first index 4 chars,
  # separator 0x7C ('|'), ASCII count 2 chars
  notes: 'First index e.g. "0002" (0x30303032). Count e.g. "10" (0x3130).'
  params:
    - name: first_idx
      type: string
      description: 'ASCII 4-digit starting index, e.g. "0002"'
    - name: count
      type: string
      description: 'ASCII 2-digit count, e.g. "10"'

- id: get_log_count
  label: Get Log Count
  kind: query
  command: "FE 03 00 81 02 {chk:hex} FF"
  notes: 'Response carries 4 ASCII bytes, e.g. "0120" = 120 entries'

- id: clear_log
  label: Clear Log
  kind: action
  command: "FE 03 00 82 01 {chk:hex} FF"
  notes: 'Subcommand 0x01 = Set (Clear).'

# ============================================================================
# PRODUCT INFO (0x90, 0x91, 0x93, 0x94, 0x95)
# ============================================================================

- id: read_part_number
  label: Read Product Part Number
  kind: query
  command: "FE 03 00 90 02 {chk:hex} FF"
  notes: 'Response: ASCII string up to 50 chars'

- id: read_amp_hour_rating
  label: Read Product Amp Hour Rating
  kind: query
  command: "FE 03 00 91 02 {chk:hex} FF"
  notes: 'Response format: ###'

- id: read_surge_existence
  label: Read Surge Protection Existence
  kind: query
  command: "FE 03 00 93 02 {chk:hex} FF"
  notes: 'Response: "Y" or "N" (single ASCII byte)'

- id: read_ip_address
  label: Read Current IP Address
  kind: query
  command: "FE 03 00 94 02 {chk:hex} FF"
  notes: 'Response: ASCII "###.###.###.###" with no leading zeroes, variable length'

- id: read_mac_address
  label: Read MAC Address
  kind: query
  command: "FE 03 00 95 02 {chk:hex} FF"
  notes: 'Response: ASCII "##:##:##:##:##:##"'
```

## Feedbacks
```yaml
# Generic response envelope for many commands echoes the request with
# Subcommand byte 0x10 (response) or 0x12 (unsolicited status change) or
# 0x30 (log update). Decoders should match Cmd + Outlet/Index as appropriate.

- id: nack_error
  label: NACK (error response)
  type: object
  fields:
    cmd: 0x10
    error_code:
      type: enum
      values: [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x10, 0x11]
      description: |
        0x01 Bad CRC on previous command
        0x02 Bad Length on previous command
        0x03 Bad Escape sequence on previous command
        0x04 Previous command invalid
        0x05 Previous sub-command invalid
        0x06 Previous command incorrect byte count
        0x07 Invalid data bytes in previous command
        0x08 Invalid Credentials (note: need to login again)
        0x10 Unknown Error
        0x11 Access Denied (EPO)
  # Source sample: 0xFE040010100123FF (bad CRC on previous command)

- id: login_response
  label: Login response
  type: object
  fields:
    cmd: 0x02
    response:
      type: enum
      values: [0x00, 0x01]
      description: 0x00 Rejected, 0x01 Accepted
  # Source sample: 0xFE040002100115FF (login accepted)

- id: outlet_state
  label: Outlet state (response / unsolicited)
  type: object
  fields:
    cmd: 0x20
    subcommand:
      type: enum
      values: [0x10, 0x12, 0x30]
      description: 0x10 response to command, 0x12 status update from local event, 0x30 log update
    outlet: integer  # 1-16
    state:
      type: enum
      values: [0x00, 0x01]
      description: 0x00 OFF, 0x01 ON
    cycle_time_seconds: integer  # ASCII 4-digit, 0-3600
  # Source sample: 0xfe0900200100300303030357fff (Outlet 3 OFF, 5 s cycle)

- id: dry_contact_state
  label: Dry contact state (response / unsolicited)
  type: object
  fields:
    cmd: 0x30
    subcommand: { type: enum, values: [0x10, 0x12, 0x30] }
    contact: integer  # 1-8
    state: { type: enum, values: [0x00, 0x01] }
    cycle_time_seconds: integer

- id: outlet_name
  label: Outlet name
  type: string
  # Cmd 0x21, response echoes outlet number + ASCII name (e.g. 0x6E616D65 = "name")
  # Source sample: FE08002101016E616D654AFF (Outlet 1 named "name")

- id: dry_contact_name
  label: Dry contact name
  type: string
  # Cmd 0x31

- id: outlet_count_map
  label: Outlet count / per-outlet controllability
  type: string
  # Cmd 0x22, 16 bytes: "C" controllable, "N" non-controllable, "X" does-not-exist
  # 0x43 / 0x4E / 0x58

- id: dry_contact_count_map
  label: Dry contact count / per-contact controllability
  type: string
  # Cmd 0x32, 8 bytes: C/N/X

- id: sequence_response
  label: Power sequence response / status
  type: object
  fields:
    cmd: 0x36
    direction:
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04]
      description: 0x00 Not Sequencing (error fallback), 0x01 up, 0x02 up complete, 0x03 down, 0x04 down complete
    delay_seconds: integer  # ASCII 4 digits, 0-999

- id: energy_mgmt_state
  label: Energy management state (single outlet)
  type: string
  # Cmd 0x23, single ASCII letter: D / S / I / O / U (0x44/0x53/0x49/0x4F/0x55)

- id: epo_response
  label: EPO response / status change
  type: object
  fields:
    cmd: 0x37
    subcommand: { type: enum, values: [0x10, 0x12] }
    state: { type: enum, values: [0x00, 0x01], description: "0x00 Normal, 0x01 EPO Mode" }

- id: log_alerts_registration
  label: Log alert registration bitmask
  type: object
  fields:
    cmd: 0x40
    byte1_bits: integer
    byte2_bits: integer

- id: status_change_registration
  label: Status change registration bitmask
  type: object
  fields:
    cmd: 0x41
    bytes: array  # six data bytes (set/get); see action notes

- id: sensor_value
  label: Sensor reading
  type: string
  # Cmd 0x50-0x61, ASCII payload format depends on sensor (see actions notes)
  # Subcommand 0x10 response or 0x12 unsolicited status change

- id: threshold_value
  label: Threshold value
  type: string
  # Cmd 0x70-0x77, ASCII payload; sub 0x10/0x12

- id: log_entry
  label: Log entry (one per record)
  type: object
  fields:
    cmd: 0x80
    log_request_number: string  # 2 ASCII digits
    entries_remaining: string  # 2 ASCII digits
    actual_log_entry_number: string  # 4 ASCII digits
    log_entry_type:
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"]
      description: |
        00 Normal, 01 Over Voltage, 02 Under Voltage, 03 Over Current,
        04 Under Current, 05 Over Temperature, 06 Under Temperature,
        07 Surge Fault, 08 Auto Ping Fault, 09 RS-232 Ping Fail,
        10 EPO Initiate, 11 EPO Recovery
    log_date_time: string  # "MM/DD/YYYY HH:MM:SS,"
    log_sensors: string    # "TTT,WWWW,F.F,VVR,CC.R,LLLL.L,O,"
    energy_mgmt_states: string  # "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16"

- id: log_count
  label: Log count
  type: string
  # Cmd 0x81, 4 ASCII digits e.g. "0120" = 120

- id: part_number
  label: Product part number
  type: string
  # Cmd 0x90, up to 50 ASCII chars

- id: amp_hour_rating
  label: Amp hour rating
  type: string
  # Cmd 0x91, format ###

- id: surge_existence
  label: Surge protection existence
  type: string
  # Cmd 0x93, "Y" or "N"

- id: ip_address
  label: Current IP address
  type: string
  # Cmd 0x94, ASCII "###.###.###.###" no leading zeroes

- id: mac_address
  label: MAC address
  type: string
  # Cmd 0x95, ASCII "##:##:##:##:##:##"
```

## Events
```yaml
# Unsolicited notifications from the device (host must handle, not request).
# All share the same envelope: <0xFE><Length><Cmd><Sub 0x12>[Data]<Checksum><0xFF>
# Per source: "if you have registered status changes updates, you will receive those unsolicited when items change."

- id: device_ping
  label: Device-initiated PING
  cmd: 0x01
  subcommand: 0x01
  command: "FE 03 00 01 01 03 FF"
  notes: |
    Source sample: 0xFE0300010103FF. Host must respond with pong
    (0xFE 03 00 01 10 12 FF) within timeout. Three missed pings = session terminated.

- id: outlet_status_change
  label: Outlet status change (unsolicited)
  cmd: 0x20
  subcommand: 0x12
  notes: 'Same payload as response to outlet read (outlet, state, cycle time).'

- id: dry_contact_status_change
  label: Dry contact status change (unsolicited)
  cmd: 0x30
  subcommand: 0x12

- id: outlet_log_update
  label: Outlet scheduled log update
  cmd: 0x20
  subcommand: 0x30

- id: sensor_status_change
  label: Sensor reading change (unsolicited)
  cmd_range: [0x50, 0x61]
  subcommand: 0x12
  notes: 'Carries current sensor value when registered via 0x41 status-change registration.'

- id: threshold_status_change
  label: Threshold value change (unsolicited)
  cmd_range: [0x70, 0x77]
  subcommand: 0x12

- id: epo_status_change
  label: EPO state change (unsolicited)
  cmd: 0x37
  subcommand: 0x12
```

## Macros
```yaml
# UNRESOLVED: source does not define named multi-step macro sequences;
# Sequencing (0x36) is the only batch operation and is modeled as a single action.
```

## Safety
```yaml
confirmation_required_for:
  - epo_initiate       # source: "0x11 - Access Denied(EPO)" implies EPO has elevated privilege
interlocks:
  - description: |
      Emergency Power Off (0x37/0x01 with 0x01) immediately removes downstream power.
      Per source, an active EPO state returns NACK 0x11 "Access Denied (EPO)" to other
      commands until EPO Recover (0x37/0x01 with 0x00) is issued.
  - description: |
      Control protocol disabled by default on Premium+; must be enabled via
      web UI (Device Setting → Network Services → Control Protocol) before
      any TCP command is accepted. On Select/Premium it is enabled at first
      webpage login. (source: "Enabling Control Protocol Access")
# UNRESOLVED: specific outlet/load current limits, voltage thresholds, and
# thermal limits are operator-configurable via 0x70-0x77 and were not
# enumerated as fixed safety values in the source.
```

## Notes

- **Tier 2 inference — auth type**: the protocol clearly demands credentials (the source's "Login Command" with default "user|password" is explicit, not optional). Marked `type: credentials` rather than `none`. Do not auto-fill `user|password` if the operator has changed defaults via the web UI.
- **Source typo in `write_outlet_name` sample**: the source's worked example `FE08002110016E616D6559FF` uses `0x10` in the Subcommand slot, but the table above it specifies `0x01 - Set Name`. The `0x01` value is taken from the table; the example byte appears to be a transcription error in the source PDF. Treat the table as authoritative. (`UNRESOLVED` flagged in the action's notes via this comment.)
- **Source inconsistency in `set_status_change` length**: the source's length field says "Always 0x06" but the data table defines 6 register bytes (B1–B7 listed, with B5 and B6 sometimes not numbered). Action above carries 4 bytes to match the stated length; full resolution requires operator to confirm against an actual device.
- **PING timing**: the source does not specify the PING interval. Implementer must measure against a real device. Three missed pings closes the session.
- **Checksum computation**: only the low 7 bits of the byte sum are kept (`& 0x7F`); the high bit is cleared. Escaped `0xFD` bytes are excluded from both length and checksum.
- **Cycling semantics**: `state=0x02 (Cycle)` on outlet/contact writes requires a 1–3600 s delay encoded as 4 ASCII decimal digits in the trailing 4 bytes. For pure on/off writes, those 4 bytes must be sent as `0x30 0x30 0x30 0x30` ("0000") — the field is still present.
- **Premium-only commands**: Energy Management (0x23), EPO (0x37), Log Alerts (0x40), Status Change (0x41), Sensors (0x50–0x61), Thresholds (0x70–0x77), and product info queries (0x90–0x95) are documented as "Premium/Premium+ only". The UPX RLNK 2000R 2 is a Premium+ product per the source's tier listing, so all of them apply.
- **RS-232 vs TCP**: source explicitly says RS-232 is "RackLink Premium Only". The 2000R 2 is Premium+, so RS-232 may not be populated. The serial block is included because the source documents it; verify physical connector on the actual device before using.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: PING interval / timeout values not stated in source -->
<!-- UNRESOLVED: NACK 0x11 "Access Denied(EPO)" — source lists under NACK codes but does not describe which commands are denied during EPO; treat as global until operator confirms -->
<!-- UNRESOLVED: source's outlet-name sample uses subcommand 0x10 (response) where the table specifies 0x01 (set); flagged above -->
<!-- UNRESOLVED: source's status-change set-subcommand length (0x06) vs. described byte count (6+); flagged above -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - digitalautomation.us
  - manualslib.com
  - markertek.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v1598618818/Resources/Middle%20Atlantic/Power/Firmware/I-00472-Series-Protocol.pdf"
  - https://res.cloudinary.com/legrandav/image/upload/v133936596/UPX-COMM-PROTOCOL-UM.pdf
  - https://digitalautomation.us/wp-content/uploads/2023/09/MiddleAtlantic_RacklinkSelect_IP.pdf
  - https://www.manualslib.com/manual/1839068/Middle-Atlantic-Products-Racklink.html
  - "https://www.markertek.com/Attachments/Manuals/Middle%20Atlantic/RLNK-SW820R-SP-Manual.pdf"
retrieved_at: 2026-05-27T02:36:30.545Z
last_checked_at: 2026-06-02T04:56:30.829Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T04:56:30.829Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 spec actions matched verbatim in source; transport parameters verified; full command coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "default baud-rate parity/data/stop values for Premium+ Ethernet-only operation do not apply; RS-232 is Premium only per source"
- "protocol-over-TLS not stated; assume plaintext framing"
- "source does not define named multi-step macro sequences;"
- "specific outlet/load current limits, voltage thresholds, and"
- "PING interval / timeout values not stated in source"
- "NACK 0x11 \"Access Denied(EPO)\" — source lists under NACK codes but does not describe which commands are denied during EPO; treat as global until operator confirms"
- "source's outlet-name sample uses subcommand 0x10 (response) where the table specifies 0x01 (set); flagged above"
- "source's status-change set-subcommand length (0x06) vs. described byte count (6+); flagged above"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
