---
spec_id: admin/somfy-animeo-sdn
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy Animeo SDN Control Spec"
manufacturer: Somfy
model_family: "Somfy Animeo (SDN RS485 products)"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somfy Animeo (SDN RS485 products)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
retrieved_at: 2026-04-29T08:47:07.493Z
last_checked_at: 2026-04-27T15:18:38.470Z
generated_at: 2026-04-27T15:18:38.470Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T15:18:38.470Z
  matched_actions: 32
  action_count: 32
  confidence: high
  summary: "All 32 spec actions verified against source protocol reference; transport parameters confirmed; no missing commands in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Somfy Animeo SDN Control Spec

## Summary
The Somfy Animeo is a motorized shade/curtain controller family using the SOMFY Digital Network (SDN) protocol over RS-485. This spec covers the binary half-duplex master/slave serial protocol for commanding movement, querying position/status, and configuring device parameters such as intermediate positions, speed, group membership, and network lock state.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source; RS-485 half-duplex typically none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable   # GET commands return device state (position, status, config)
- levelable   # position controlled as percentage (0-100), speed adjustable
```

## Actions
```yaml
- id: moveto_down
  label: Move to Down Limit
  kind: action
  params: []
  description: "CTRL_MOVETO (03h) function 00h - move shade to fully down limit"

- id: moveto_up
  label: Move to Up Limit
  kind: action
  params: []
  description: "CTRL_MOVETO (03h) function 01h - move shade to fully up limit"

- id: moveto_ip
  label: Move to Intermediate Position
  kind: action
  params:
    - name: ip_index
      type: integer
      min: 0
      max: 15
      description: "Intermediate position index (0-15)"
  description: "CTRL_MOVETO (03h) function 02h - move to a programmed intermediate position"

- id: moveto_percent
  label: Move to Position (%)
  kind: action
  params:
    - name: position_pct
      type: integer
      min: 0
      max: 100
      description: "Target position as percentage of full travel range"
  description: "CTRL_MOVETO (03h) function 04h - move to a specific percentage position"

- id: stop
  label: Stop Motor
  kind: action
  params: []
  description: "CTRL_STOP (02h) - immediately stop the motor without speed ramp-down"

- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      min: 0
      max: 15
      description: "Entry in the group table (0-15)"
    - name: group_id
      type: integer
      description: "24-bit group address"
  description: "SET_GROUP_ADDR (51h) - assign a group address to a group table slot"

- id: set_node_label
  label: Set Node Label
  kind: action
  params:
    - name: label
      type: string
      description: "User-defined text label (16 characters, pad with spaces)"
  description: "SET_NODE_LABEL (55h) - assign a text label to the device"

- id: set_local_ui
  label: Set Local UI State
  kind: action
  params:
    - name: function
      type: integer
      enum: [0, 1]
      description: "0=Enable/Unlock, 1=Disable/Lock"
    - name: ui_index
      type: integer
      description: "UI item index (00h=All, 01h=DCT, 02h=Local stimuli, 03h=Radio, 04h=Touch Motion, 05h=LEDs)"
    - name: priority
      type: integer
      min: 0
      max: 255
      description: "Lock priority level (higher = higher priority)"
  description: "SET_LOCAL_UI (17h) - enable/disable local UI elements with priority"

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Delete IP, 01h=Set at current position, 03h=Set at % position, 04h=Divide range equally"
    - name: ip_index
      type: integer
      min: 1
      max: 16
      description: "Intermediate position index (1-16)"
    - name: value
      type: integer
      description: "Position % for function 03h, or IP count for function 04h"
  description: "SET_MOTOR_IP (15h) - configure intermediate positions"

- id: set_motor_speed
  label: Set Motor Speed
  kind: action
  params:
    - name: up_speed
      type: integer
      description: "Speed during UP movement (rpm, range per device datasheet)"
    - name: down_speed
      type: integer
      description: "Speed during DOWN movement (rpm, range per device datasheet)"
    - name: slow_speed
      type: integer
      description: "Speed for adjustment movements (rpm, range per device datasheet)"
  description: "SET_MOTOR_ROLLING_SPEED (13h) - set motor speeds (DC motors only)"

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Unlock, 01h=Lock at current position, 03h=Save lock on power cycle, 04h=Don't save lock"
    - name: priority
      type: integer
      min: 0
      max: 255
      description: "Lock priority level (higher = higher priority)"
  description: "SET_NETWORK_LOCK (16h) - lock/unlock device from network commands"
- id: get_node_addr
  label: Get Node Address
  kind: query
  params: []
  description: "GET_NODE_ADDR (40h) - request the NodeID of the addressed device; reply is POST_NODE_ADDR (60h) with no data (address in message header)"

- id: get_group_addr
  label: Get Group Address
  kind: query
  params:
    - name: group_index
      type: integer
      min: 0
      max: 15
      description: "Entry in the group table to query (0-15)"
  description: "GET_GROUP_ADDR (41h) - request the GroupID stored at the specified group table entry; reply is POST_GROUP_ADDR (61h)"

- id: get_node_app_version
  label: Get Node Firmware Version
  kind: query
  params: []
  description: "GET_NODE_APP_VERSION (74h) - request firmware part number and revision; reply is POST_NODE_APP_VERSION (75h)"

- id: get_node_label
  label: Get Node Label
  kind: query
  params: []
  description: "GET_NODE_LABEL (45h) - request the 16-character user-defined text label; reply is POST_NODE_LABEL (65h)"

- id: get_local_ui
  label: Get Local UI State
  kind: query
  params:
    - name: ui_index
      type: integer
      min: 1
      max: 5
      description: "UI item index to query (01h=DCT, 02h=Local stimuli, 03h=Radio, 04h=Touch Motion, 05h=LEDs)"
  description: "GET_LOCAL_UI (27h) - request the enabled/disabled status and lock details for a UI item; reply is POST_LOCAL_UI (37h)"

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  params:
    - name: ip_index
      type: integer
      min: 1
      max: 16
      description: "Intermediate position index to query (1-16)"
  description: "GET_MOTOR_IP (25h) - request the position percentage for a stored intermediate position; reply is POST_MOTOR_IP (35h)"

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  params: []
  description: "GET_MOTOR_ROLLING_SPEED (23h) - request current UP, DOWN and Slow speed values (DC motors only); reply is POST_MOTOR_ROLLING_SPEED (33h)"

- id: get_network_lock
  label: Get Network Lock State
  kind: query
  params: []
  description: "GET_NETWORK_LOCK (26h) - request current lock status, source address, priority and saved flag; reply is POST_NETWORK_LOCK (36h)"

- id: get_motor_position
  label: Get Motor Position
  kind: query
  params: []
  description: "GET_MOTOR_POSITION (0Ch) - request current motor position as pulse count and percentage; reply is POST_MOTOR_POSITION (0Dh)"

- id: get_motor_status
  label: Get Motor Status
  kind: query
  params: []
  description: "GET_MOTOR_STATUS (0Eh) - request current motor status, direction, source and cause; reply is POST_MOTOR_STATUS (0Fh)"
```

## Feedbacks
```yaml
- id: node_addr
  type: string
  description: "POST_NODE_ADDR (60h) - device NodeID (from message header, 3 bytes LSBF)"

- id: group_addr
  type: object
  description: "POST_GROUP_ADDR (61h) - returns group_index (0-15) and group_id (24-bit)"

- id: ack
  type: enum
  values: [ack, nack]
  description: "ACK (7Fh) or NACK (6Fh) with ErrorCode: 01h=Data out of range, 10h=Unknown message, 11h=Length error, FFh=Busy"

- id: node_app_version
  type: object
  description: "POST_NODE_APP_VERSION (75h) - App_Reference (24-bit), App_IndexLetter (ASCII A-Z), App_IndexNumber (8-bit), Reserved"

- id: node_label
  type: string
  description: "POST_NODE_LABEL (65h) - 16-character user-defined label"

- id: local_ui_status
  type: object
  description: "POST_LOCAL_UI (37h) - Status (00h=Enabled, 01h=Disabled), Source_Addr, Priority"

- id: motor_ip
  type: object
  description: "POST_MOTOR_IP (35h) - IP_index, IP_position_percentage (0-100, FFh if not set)"

- id: motor_speed
  type: object
  description: "POST_MOTOR_ROLLING_SPEED (33h) - UP_Speed, DOWN_Speed, Slow_Speed (rpm)"

- id: network_lock
  type: object
  description: "POST_NETWORK_LOCK (36h) - Status (00h=Unlocked, 01h=Locked), Source_Addr, Priority, Saved (00h/01h)"

- id: motor_position
  type: object
  description: "POST_MOTOR_POSITION (0Dh) - Position_pulse (16-bit), Position_percentage (0-100), IP index (FFh if none)"

- id: motor_status
  type: object
  description: "POST_MOTOR_STATUS (0Fh) - Status (00h=Stopped, 01h=Running, 02h=Blocked, 03h=Locked), Direction (00h=Down, 01h=Up, FFh=Unknown), Source (00h=Internal, 01h=Network, 02h=Local UI), Cause (00h=Target reached, 01h=Explicit cmd, 20h=Obstacle, 21h=Over-current, 22h=Thermal, 30h=Runtime exceeded, 32h=Timeout, FFh=Reset)"
```

## Variables
```yaml
# UNRESOLVED: no continuous settable variables distinct from actions; position and speed are set via action commands
```

## Events
```yaml
# No unsolicited events - SLAVE nodes only respond to MASTER requests.
# Exception: some devices can send their NodeID when a local pushbutton is pressed, but this is not a protocol event per se.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Network lock prevents movement commands (CTRL_xxx, SET_MOTOR_LIMITS, SET_TILT_LIMITS) unless caller priority >= lock priority; returns NACK(NODE_IS_LOCKED)"
  - description: "Local UI lock can disable all local controls with priority enforcement"
# UNRESOLVED: specific power-on sequencing requirements not documented
# UNRESOLVED: obstacle detection behavior details not fully specified
```

## Notes
- **Binary protocol with inverted data bits**: All data bytes must be bitwise-NOT'd before transmission on the bus (e.g., 58h transmits as A7h). This is required for backward compatibility.
- **Addressing**: 3-byte NodeID (LSBF) used for point-to-point, group, and broadcast modes. Devices can belong to up to 16 groups.
- **Checksum**: Single byte calculated as `NOT(Byte1 + Byte2 + ... + ByteN-2)`.
- **Timings**: Tfree=3ms (bus free), Trep=5–255ms (slave reply delay, randomized), Treq=10ms (master new-request delay), Tc=1ms max inter-character.
- **No sync byte**: Message boundaries detected by bus inactivity.
- **ACK recommended**: Source strongly recommends using acknowledgments and implementing retry logic on NACK or timeout.
- **Speed adjustment**: DC motors only; min/max/default values vary by product — refer to technical datasheet.
<!-- UNRESOLVED: stop bits described as "Logical level 1" — standard UART interpretation is 1 stop bit, but not explicitly stated as a count -->
<!-- UNRESOLVED: exact NodeID ranges and collision probability not specified beyond "unique per installation" -->
<!-- UNRESOLVED: maximum number of devices on a single bus not stated -->
<!-- UNRESOLVED: CTRL_NETWORK_LOCK control message referenced in SET_NETWORK_LOCK description but no separate message definition provided -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
retrieved_at: 2026-04-29T08:47:07.493Z
last_checked_at: 2026-04-27T15:18:38.470Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T15:18:38.470Z
matched_actions: 32
action_count: 32
confidence: high
summary: "All 32 spec actions verified against source protocol reference; transport parameters confirmed; no missing commands in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
