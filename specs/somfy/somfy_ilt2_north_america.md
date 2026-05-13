---
spec_id: admin/somfy-ilt2-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy ILT2 (North America) Control Spec"
manufacturer: Somfy
model_family: "ILT2 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "ILT2 (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
retrieved_at: 2026-04-29T08:47:09.724Z
last_checked_at: 2026-04-27T09:45:20.946Z
generated_at: 2026-04-27T09:45:20.946Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T09:45:20.946Z
  matched_actions: 19
  action_count: 19
  confidence: high
  summary: "All 19 spec actions matched source SDN protocol commands; transport verified; bidirectional protocol coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Somfy ILT2 (North America) Control Spec

## Summary
The Somfy ILT2 is a motor controller for North America operating on the SOMFY Digital Network (SDN), a half-duplex RS-485 bus protocol. The master initiates all communication; slaves respond only when polled or when the ACK bit is set. The device supports position control, motor status queries, network locking, and intermediate positioning for motorized window treatments.

<!-- UNRESOLVED: physical specifications (voltage, current, power) not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not fully documented -->

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
  encoding: NRZ  # LSB-first; all data bits inverted before transmission
  bus_mode: half-duplex  # RS-485
auth:
  type: none  # inferred: no authentication procedure in source
```

## Traits
```yaml
- powerable        # inferred: CTRL_MOVETO with functions 00h/01h (go to limits) acts as power on/off
- routable         # inferred: group addressing allows broadcast/group control
- queryable        # inferred: GET_MOTOR_POSITION, GET_MOTOR_STATUS, GET_NODE_ADDR etc. present
- levelable        # inferred: CTRL_MOVETO function 04h accepts 0-100% position value
```

## Actions
```yaml
- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: GroupIndex
      type: integer
      description: Entry in the group table (0-15)
    - name: GroupID
      type: string
      description: 24-bit group address (hex format XX:XX:XX)

- id: set_node_label
  label: Set Node Label
  kind: action
  params:
    - name: Label
      type: string
      description: 16-character text label (padded with spaces if shorter)

- id: set_local_ui
  label: Set Local UI
  kind: action
  params:
    - name: Function
      type: integer
      description: "00h = Enable/Unlock, 01h = Disable/Lock"
    - name: UI_Index
      type: integer
      description: "00h = All, 01h = DCT input, 02h = Local stimulus, 03h = Local Radio, 04h = Touch Motion, 05h = LEDs"
    - name: Priority
      type: integer
      description: Lock priority level (0-FFh, higher = higher priority)

- id: set_motor_ip
  label: Set Motor Intermediate Position
  kind: action
  params:
    - name: Function
      type: integer
      description: "00h = Delete IP, 01h = Set IP at current position, 03h = Set IP at specified %, 04h = Divide full range"
    - name: IP_Index
      type: integer
      description: IP index (1-16, ignored when Function = 04h)
    - name: Value
      type: integer
      description: Position % (0-100) or IP count depending on Function

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  params:
    - name: UP_Speed
      type: integer
      description: Speed during UP movement in rpm
    - name: DOWN_Speed
      type: integer
      description: Speed during DOWN movement in rpm
    - name: Slow_Speed
      type: integer
      description: Speed for adjustment movements in rpm

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: Function
      type: integer
      description: "00h = Unlock, 01h = Lock at current position, 03h = Save lock on power cycle, 04h = Do not save lock"
    - name: Priority
      type: integer
      description: Lock priority level (0-FFh)

- id: ctrl_moveto
  label: Move to Position
  kind: action
  params:
    - name: Function
      type: integer
      description: "00h = Go to DOWN limit, 01h = Go to UP limit, 02h = Go to Intermediate Position, 04h = Go to Position in %"
    - name: Position
      type: integer
      description: Position value (IP index 0-15 or % 0-100 depending on Function)
    - name: Reserved
      type: integer
      description: Reserved byte (set to 00h)

- id: ctrl_stop
  label: Stop Motor
  kind: action
  params:
    - name: Reserved
      type: integer
      description: Reserved byte (set to 00h)
```

## Feedbacks
```yaml
- id: post_node_addr
  label: Node Address Report
  type: object
  fields:
    - name: NodeID
      type: string
      description: 3-byte NodeID of the responding device

- id: post_group_addr
  label: Group Address Report
  type: object
  fields:
    - name: GroupIndex
      type: integer
      description: Group table entry index (0-15)
    - name: GroupID
      type: string
      description: 24-bit group address

- id: ack
  label: Acknowledge
  type: enum
  values:
    - ack_success
    - nack_error
  description: Sent when ACK bit is set in a request. NACK includes an ErrorCode (01h = data out of range, 10h = unknown message, 11h = message length error, FFh = busy).

- id: post_node_app_version
  label: Firmware Version Report
  type: object
  fields:
    - name: App_Reference
      type: string
      description: 24-bit firmware part number (hex)
    - name: App_IndexLetter
      type: string
      description: Firmware major revision (ASCII)
    - name: App_IndexNumber
      type: integer
      description: Firmware revision number

- id: post_node_label
  label: Node Label Report
  type: string
  description: 16-character text label

- id: post_local_ui
  label: Local UI Status Report
  type: object
  fields:
    - name: UI_Index
      type: integer
      description: UI index being reported
    - name: Status
      type: enum
      values: [enabled/unlocked, disabled/locked]
    - name: Source_Addr
      type: string
      description: NodeID of the device that sent the lock command (24-bit hex)
    - name: Priority
      type: integer
      description: Lock priority level

- id: post_motor_ip
  label: Motor Intermediate Position Report
  type: object
  fields:
    - name: IP_index
      type: integer
      description: IP index (1-16)
    - name: Reserved
      type: integer
      description: Reserved 16-bit field
    - name: IP_position_percentage
      type: integer
      description: Position in % (0-100), FFh if IP not set

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Report
  type: object
  fields:
    - name: UP_Speed
      type: integer
      description: Speed during UP movement
    - name: DOWN_Speed
      type: integer
      description: Speed during DOWN movement
    - name: Slow_Speed
      type: integer
      description: Speed for adjustment movements

- id: post_network_lock
  label: Network Lock Status Report
  type: object
  fields:
    - name: Status
      type: enum
      values: [unlocked, locked]
    - name: Source_Addr
      type: string
      description: NodeID of the device that sent the lock command (24-bit hex)
    - name: Priority
      type: integer
      description: Lock priority level
    - name: Saved
      type: enum
      values: [not_restored_on_power_cycle, restored_on_power_cycle]

- id: post_motor_position
  label: Motor Position Report
  type: object
  fields:
    - name: Position_pulse
      type: integer
      description: Motor position in raw pulse count
    - name: Position_percentage
      type: integer
      description: Position as percentage (0-100)
    - name: Reserved
      type: integer
      description: Reserved byte
    - name: IP
      type: integer
      description: Intermediate position index (01h-IP_MAX), FFh if none

- id: post_motor_status
  label: Motor Status Report
  type: object
  fields:
    - name: Status
      type: enum
      values: [stopped, running, blocked, locked]
    - name: Direction
      type: enum
      values: [going_down, going_up, unknown]
    - name: Source
      type: enum
      values: [internal, network_message, local_ui]
    - name: Cause
      type: enum
      values: [target_reached, explicit_command, wink, obstacle_detection, over_current, thermal_protection, run_time_exceeded, timeout_exceeded, reset_powerup]
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found that are not already covered by Actions.
# The SET_xxx messages serve as both configuration writes and variable setters.
```

## Events
```yaml
# UNRESOLVED: SDN is half-duplex master-slave; slaves only respond to requests.
# No unsolicited event notifications are documented in the source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# The document notes that CTRL_XXX functions and SET_MOTOR_LIMITS are rejected
# when NETWORK_LOCK is active with higher priority (returned as NACK).
# Physical limits (voltage, current, thermal protection) are not documented
# in this protocol spec - refer to device datasheet for electrical specs.
```

## Notes
SDN uses a master-slave half-duplex RS-485 bus. All communication is initiated by the MASTER. SLAVE devices cannot send unsolicited notifications (except address-push from some devices). All data bytes are inverted before transmission (LSBF). Acknowledgements are strongly recommended for every message. Collisions are possible on the bus — avoid group/broadcast ACK requests.

Bus timing requirements (MASTER before transmit): Treq ≥ 10ms since last bus activity. Inter-character spacing: Tc ≤ 1ms maximum. SLAVE reply delay: Trep 5–255ms (randomized). Bus free timeout: Tfree ≥ 3ms.

Message format: 11–32 bytes. Header: MSG (1 byte) + ACK/LEN (1 byte) + NODE_TYPE (1 byte) + SOURCE@ (3 bytes) + DEST@ (3 bytes). DATA: 0–21 bytes. CHECKSUM: NOT(sum of Byte 1 through Byte n-2).

Addressing modes: Point-to-point (DEST@ = specific NodeID), Group (DEST@ = 000000h, group nodes execute), Broadcast (DEST@ = FFFFFFh, all nodes execute).

<!-- UNRESOLVED: physical voltage/current/power specifications — refer to device datasheet -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: port number — this is an RS-485 serial device, no TCP port applicable -->
<!-- UNRESOLVED: full NodeType table may be incomplete (some entries marked "Not yet available") -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
retrieved_at: 2026-04-29T08:47:09.724Z
last_checked_at: 2026-04-27T09:45:20.946Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:45:20.946Z
matched_actions: 19
action_count: 19
confidence: high
summary: "All 19 spec actions matched source SDN protocol commands; transport verified; bidirectional protocol coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
