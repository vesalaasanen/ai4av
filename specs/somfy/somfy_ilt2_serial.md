---
spec_id: admin/somfy-ilt2-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy ILT2 Control Spec"
manufacturer: Somfy
model_family: ILT2
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - ILT2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-16T23:57:23.466Z
generated_at: 2026-05-16T23:57:23.466Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T23:57:23.466Z
  matched_actions: 21
  action_count: 21
  confidence: high
  summary: "All 21 spec actions matched literal MSG/Function codes in source; transport verified; complete coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Somfy ILT2 Control Spec

## Summary

The Somfy ILT2 is an RS-485 motor drive (part of the Somfy Digital Network / SDN product family) used to control motorized blinds, shades, and similar window coverings. This spec covers the SDN binary serial protocol (DOC155888/000, November 2019) used for bi-directional RS-485 communication between a controller (MASTER) and ILT2 motor devices (SLAVEs). All commands are structured binary frames transmitted at 4800 baud with inverted data bits and odd parity over RS-485.

<!-- UNRESOLVED: The source document covers the SDN protocol shared across multiple Somfy RS-485 products; ILT2-specific NodeType value is not listed in the NodeType table provided. -->
<!-- UNRESOLVED: Speed range values (UP_Speed, DOWN_Speed, Slow_Speed min/max) are deferred to per-device technical datasheets not included in this source. -->

## Transport

```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none
  notes: "RS-485 half-duplex bus. All data bits must be inverted before transmission (e.g. 0x58 transmits as 0xA7). LSB sent first."
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- routable    # inferred from CTRL_MOVETO position/IP routing command examples
- queryable   # inferred from GET_MOTOR_POSITION and GET_MOTOR_STATUS query command examples
- levelable   # inferred from position-percentage and speed adjustment commands
```

## Actions

```yaml
- id: ctrl_moveto_down_limit
  label: Move to Down Limit
  kind: action
  description: "MSG=03h, Function=00h. Move motor to the DOWN limit position. Position field is ignored."
  params: []

- id: ctrl_moveto_up_limit
  label: Move to Up Limit
  kind: action
  description: "MSG=03h, Function=01h. Move motor to the UP limit position. Position field is ignored."
  params: []

- id: ctrl_moveto_ip
  label: Move to Intermediate Position
  kind: action
  description: "MSG=03h, Function=02h. Move motor to a stored intermediate position (IP)."
  params:
    - name: ip_index
      type: integer
      description: "Intermediate Position index (0 to 15)"

- id: ctrl_moveto_percent
  label: Move to Position (Percent)
  kind: action
  description: "MSG=03h, Function=04h. Move motor to a position expressed as a percentage of full travel range."
  params:
    - name: position_percent
      type: integer
      description: "Target position as percentage of full travel range (0 to 100)"

- id: ctrl_stop
  label: Stop
  kind: action
  description: "MSG=02h. Immediately stop the motor without speed ramp-down."
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  description: "MSG=51h. Assign a GroupID to a group table entry on the device."
  params:
    - name: group_index
      type: integer
      description: "Entry in group table (0 to 15)"
    - name: group_id
      type: integer
      description: "24-bit GroupID address"

- id: set_node_label
  label: Set Node Label
  kind: action
  description: "MSG=55h. Assign a 16-character text label to the device. Always 16 bytes; pad with spaces if shorter."
  params:
    - name: label
      type: string
      description: "Device label string, exactly 16 characters (ASCII)"

- id: set_local_ui
  label: Set Local UI State
  kind: action
  description: "MSG=17h. Enable or lock a local HMI element (buttons, LEDs, DCT, Bluetooth)."
  params:
    - name: function
      type: integer
      description: "00h=Enable/Unlock, 01h=Disable/Lock"
    - name: ui_index
      type: integer
      description: "00h=All, 01h=DCT, 02h=Local stimuli, 03h=Local Radio, 04h=Touch Motion, 05h=LEDs"
    - name: priority
      type: integer
      description: "Lock priority level (0x00=lowest, 0xFF=highest)"

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  description: "MSG=15h. Configure a stored intermediate position."
  params:
    - name: function
      type: integer
      description: "00h=Delete, 01h=Set at current pos, 03h=Set at % value, 04h=Divide range equally"
    - name: ip_index
      type: integer
      description: "IP table index (1 to 16); ignored for Function=04h"
    - name: value
      type: integer
      description: "Position in % for Function=03h; IP count for Function=04h; ignored otherwise"

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  description: "MSG=13h. Set UP, DOWN, and slow adjustment speeds (DC motors only). Valid ranges per device datasheet."
  params:
    - name: up_speed
      type: integer
      description: "Speed during UP movement (rpm; range per device datasheet)"
    - name: down_speed
      type: integer
      description: "Speed during DOWN movement (rpm; range per device datasheet)"
    - name: slow_speed
      type: integer
      description: "Speed for adjustment movements (rpm; range per device datasheet)"

- id: set_network_lock
  label: Set Network Lock
  kind: action
  description: "MSG=16h. Lock or unlock the device from accepting network commands."
  params:
    - name: function
      type: integer
      description: "00h=Unlock, 01h=Lock, 03h=Save lock on power cycle, 04h=Do not save"
    - name: priority
      type: integer
      description: "Lock priority (0x00=lowest, 0xFF=highest); ignored for Function=03h/04h"

- id: get_node_addr
  label: Get Node Address
  kind: action
  description: "MSG=40h. Request device to report its NodeID (broadcast or point-to-point)."
  params: []

- id: get_group_addr
  label: Get Group Address
  kind: action
  description: "MSG=41h. Request the GroupID stored at a given group table entry."
  params:
    - name: group_index
      type: integer
      description: "Entry in group table (0 to 15)"

- id: get_node_app_version
  label: Get Firmware Version
  kind: action
  description: "MSG=74h. Request firmware part number and revision from the device."
  params: []

- id: get_node_label
  label: Get Node Label
  kind: action
  description: "MSG=45h. Request the 16-character text label assigned to the device."
  params: []

- id: get_local_ui
  label: Get Local UI State
  kind: action
  description: "MSG=27h. Query the enabled/locked state of a local HMI element."
  params:
    - name: ui_index
      type: integer
      description: "UI element index (01h to UI_MAX; see SET_LOCAL_UI for values)"

- id: get_motor_ip
  label: Get Intermediate Position
  kind: action
  description: "MSG=25h. Query the stored position for a given IP index."
  params:
    - name: ip_index
      type: integer
      description: "IP table index (1 to 16)"

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: action
  description: "MSG=23h. Query the current UP, DOWN, and slow speed settings."
  params: []

- id: get_network_lock
  label: Get Network Lock State
  kind: action
  description: "MSG=26h. Query the current network lock status, source, priority, and save state."
  params: []

- id: get_motor_position
  label: Get Motor Position
  kind: action
  description: "MSG=0Ch. Query the current motor position (pulse count and percentage). Position is reported even if motor is running."
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: action
  description: "MSG=0Eh. Query the current motor status, movement direction, command source, and stop cause."
  params: []
```

## Feedbacks

```yaml
- id: post_node_addr
  label: Node Address Report
  type: binary_frame
  description: "MSG=60h. Device reports its NodeID. Address is in message header; no DATA payload."

- id: post_group_addr
  label: Group Address Report
  type: object
  description: "MSG=61h. Reports the GroupID stored at a given group table index."
  fields:
    - name: group_index
      type: integer
      description: "Group table entry (0 to 15)"
    - name: group_id
      type: integer
      description: "24-bit GroupID"

- id: post_node_app_version
  label: Firmware Version Report
  type: object
  description: "MSG=75h. Reports firmware part number and revision."
  fields:
    - name: app_reference
      type: integer
      description: "24-bit firmware part number"
    - name: app_index_letter
      type: integer
      description: "Firmware major revision letter (ASCII 0x41–0x5A)"
    - name: app_index_number
      type: integer
      description: "Firmware revision number"

- id: post_node_label
  label: Node Label Report
  type: string
  description: "MSG=65h. Reports the 16-character text label assigned to the device."

- id: post_local_ui
  label: Local UI State Report
  type: object
  description: "MSG=37h. Reports enabled/locked state of a local HMI element."
  fields:
    - name: status
      type: enum
      values: [enabled, disabled]
      description: "00h=Enabled/Unlocked, 01h=Disabled/Locked"
    - name: source_addr
      type: integer
      description: "NodeID of device that sent the lock command (0x000000 if unlocked)"
    - name: priority
      type: integer
      description: "Lock priority level (0x00 if unlocked)"

- id: post_motor_ip
  label: Intermediate Position Report
  type: object
  description: "MSG=35h. Reports stored position for a given IP index."
  fields:
    - name: ip_index
      type: integer
      description: "IP table index (1 to 16)"
    - name: ip_position_percentage
      type: integer
      description: "IP position as percentage (0–100), or 0xFF if not set"

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Report
  type: object
  description: "MSG=33h. Reports current UP, DOWN, and slow speed settings."
  fields:
    - name: up_speed
      type: integer
      description: "UP movement speed (rpm)"
    - name: down_speed
      type: integer
      description: "DOWN movement speed (rpm)"
    - name: slow_speed
      type: integer
      description: "Adjustment movement speed (rpm)"

- id: post_network_lock
  label: Network Lock State Report
  type: object
  description: "MSG=36h. Reports lock status, source node, priority, and whether lock persists across power cycles."
  fields:
    - name: status
      type: enum
      values: [unlocked, locked]
      description: "00h=Unlocked, 01h=Locked"
    - name: source_addr
      type: integer
      description: "NodeID of device that sent the lock command (0x000000 if unlocked)"
    - name: priority
      type: integer
      description: "Lock priority level (0x00 if unlocked)"
    - name: saved
      type: enum
      values: [not_saved, saved]
      description: "00h=Not restored on power cycle, 01h=Restored on power cycle"

- id: post_motor_position
  label: Motor Position Report
  type: object
  description: "MSG=0Dh. Reports current motor position in pulses and percentage, plus active IP index if applicable."
  fields:
    - name: position_pulse
      type: integer
      description: "Position in encoder pulses (UP_LIMIT to DOWN_LIMIT)"
    - name: position_percentage
      type: integer
      description: "Position as percentage of full travel range (0–100)"
    - name: ip
      type: integer
      description: "Active intermediate position index (0x01–IP_MAX), or 0xFF if not at an IP"

- id: post_motor_status
  label: Motor Status Report
  type: object
  description: "MSG=0Fh. Reports current motor state, movement direction, command source, and reason for stop/state."
  fields:
    - name: status
      type: enum
      values: [stopped, running, blocked, locked]
      description: "00h=Stopped, 01h=Running, 02h=Blocked (thermal/obstacle), 03h=Locked (NETWORK_LOCK)"
    - name: direction
      type: enum
      values: [going_down, going_up, unknown]
      description: "00h=Going DOWN, 01h=Going UP (or last direction if stopped), FFh=Unknown"
    - name: source
      type: enum
      values: [internal, network_message, local_ui]
      description: "00h=Internal, 01h=Network message, 02h=Local UI"
    - name: cause
      type: enum
      values: [target_reached, explicit_command, wink, obstacle_detection, over_current_protection, thermal_protection, run_time_exceeded, timeout_exceeded, reset_powerup]
      description: "00h=Target reached, 01h=Explicit command, 02h=Wink, 20h=Obstacle detection, 21h=Over-current, 22h=Thermal protection, 30h=Run time exceeded, 32h=Timeout exceeded, FFh=Reset/PowerUp"

- id: ack
  label: Acknowledge
  type: binary_frame
  description: "MSG=7Fh. Sent by SLAVE when ACK bit is set in request and command was accepted and execution started. No DATA payload."

- id: nack
  label: Not Acknowledge (Error)
  type: object
  description: "MSG=6Fh. Sent by SLAVE when ACK is requested but an error is detected."
  fields:
    - name: error_code
      type: enum
      values: [data_out_of_range, unknown_message, message_length_error, busy]
      description: "01h=Data out of range, 10h=Unknown message, 11h=Message length error, FFh=Busy"
```

## Variables

```yaml
# UNRESOLVED: No settable parameters outside discrete action commands were found in this source.
```

## Events

```yaml
- id: unsolicited_node_addr
  label: Unsolicited Node Address Announcement
  description: "Some SDN devices can broadcast their NodeID without a MASTER request, typically triggered by a pushbutton on the device (POST_NODE_ADDR, MSG=60h). This is the only case where a SLAVE initiates communication without a MASTER request."
```

## Macros

```yaml
# UNRESOLVED: No multi-step macros described explicitly in source.
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - id: network_lock
    description: "NETWORK_LOCK feature prevents network commands from operating a device. Only CTRL_NETWORK_LOCK or SET_NETWORK_LOCK with equal or higher priority level can override. All CTRL_XXX movement commands and SET_MOTOR_LIMITS are rejected while locked."
  - id: collision_risk_group_broadcast
    description: "Avoid requesting feedback or acknowledgments in group or broadcast addressing mode due to RS-485 collision risk. Multiple devices responding simultaneously may corrupt the bus."
```

## Notes

**Frame structure summary:** All SDN frames are 11–32 bytes. Fields in order: MSG (1 byte), ACK/LEN (1 byte), NODE_TYPE (1 byte), SOURCE@ (3 bytes, LSBF), DEST@ (3 bytes, LSBF), DATA (0–21 bytes), CHECKSUM (2 bytes). Checksum is the two's complement sum of all preceding bytes.

**Data inversion requirement:** All data bits must be bitwise-inverted before transmission and after reception. This is a hard protocol requirement for backward compatibility. Example: value 0x58 is transmitted as 0xA7.

**Addressing modes:** Three modes are supported — point-to-point (DEST@=target NodeID), group (SOURCE@=GroupID, DEST@=000000h), and broadcast (DEST@=FFFFFFh). NodeType filtering is also available.

**Timing requirements:** MASTER must wait at least Treq (10 ms) of bus inactivity before transmitting. SLAVE reply delay (Trep) is randomized between 5 ms and 255 ms to reduce collisions. Maximum inter-character gap (Tc) is 1 ms.

**Acknowledgment strategy:** The ACK bit in the ACK/LEN byte should be set for all CTRL and SET messages to confirm reception and processing. A retry strategy is recommended on NACK or timeout. No ACK is sent for GET messages — the POST response serves as confirmation.

**NodeID:** Each device has a factory-programmed 3-byte NodeID printed on the device label in plain text and barcode format. It cannot be changed.

**DC motor speed:** SET/GET_MOTOR_ROLLING_SPEED is only available for DC motors. Valid speed ranges vary by device model; consult the per-device technical datasheet.

<!-- UNRESOLVED: ILT2-specific NodeType value not listed in the NodeType table in this source document. -->
<!-- UNRESOLVED: Motor pulse count range (UP_LIMIT, DOWN_LIMIT) is device/installation-specific and not stated in this source. -->
<!-- UNRESOLVED: Maximum IP count (IP_MAX) is not stated explicitly in this source. -->
<!-- UNRESOLVED: Firmware version compatibility ranges not stated in source. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-16T23:57:23.466Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T23:57:23.466Z
matched_actions: 21
action_count: 21
confidence: high
summary: "All 21 spec actions matched literal MSG/Function codes in source; transport verified; complete coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
