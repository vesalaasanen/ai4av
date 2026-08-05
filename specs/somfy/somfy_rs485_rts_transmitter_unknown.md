---
spec_id: admin/somfy-rs485-rts-transmitter
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy RS485 RTS Transmitter Control Spec"
manufacturer: Somfy
model_family: "RS485 RTS Transmitter"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "RS485 RTS Transmitter"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-25T00:08:01.448Z
last_checked_at: 2026-08-05T08:43:32.447Z
generated_at: 2026-08-05T08:43:32.447Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage/current/power specifications not stated in source"
  - "flow control not stated in source"
  - "configuration represented through SET_* and GET_* command pairs"
  - "unsolicited event notifications not stated in source"
  - "explicit multi-step macro sequences not stated in source"
  - "voltage/current limits and power-on sequencing requirements not stated in source"
  - "command payload byte layouts not stated in source"
  - "firmware compatibility ranges not stated in source"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:43:32.447Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions map 1:1 to source commands (SET_/GET_/CTRL_/POST_); transport fields verbatim; no extras. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Somfy RS485 RTS Transmitter Control Spec

## Summary
Somfy SDN protocol for RS485 half-duplex master-slave communication. Controls motorized shades, blinds, and awnings through motor movement, configuration, status, addressing, locking, and local-interface commands. Data bits use inverted NRZ encoding.

<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
  encoding: NRZ
  bit_inversion: true
auth:
  type: none  # inferred: no authentication procedure in source
```

## Traits
```yaml
- powerable  # inferred from motor control commands
- queryable  # inferred from GET_* commands returning device state
- levelable  # inferred from position and rolling-speed controls
- routable  # inferred from group and node addressing controls
```

## Actions
```yaml
- id: ctrl_moveto
  label: Move to Position
  kind: action
  params:
    - name: Function
      type: integer
      description: 00h = DOWN limit, 01h = UP limit, 02h = intermediate position, 04h = position in %
    - name: Position
      type: integer
      description: Position value per Function
    - name: Reserved
      type: integer

- id: ctrl_stop
  label: Stop Motor
  kind: action
  params:
    - name: Reserved
      type: integer

- id: ctrl_network_lock
  label: Control Network Lock
  kind: action
  params:
    - name: Function
      type: integer
      description: 00h = Unlock, 01h = Lock, 03h = Save lock on power cycle, 04h = Do not save on power cycle
    - name: Priority
      type: integer
      description: Priority level (0-FFh)

- id: get_motor_position
  label: Get Motor Position
  kind: query
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: GroupIndex
      type: integer
      description: Entry in group table (0-15)
    - name: GroupID
      type: integer
      description: 24-bit group address

- id: get_group_addr
  label: Get Group Address
  kind: query
  params:
    - name: GroupIndex
      type: integer
      description: Entry in group table (0-15)

- id: set_node_label
  label: Set Node Label
  kind: action
  params:
    - name: Label
      type: string
      description: 16-character label, padded with spaces

- id: get_node_label
  label: Get Node Label
  kind: query
  params: []

- id: set_local_ui
  label: Set Local UI
  kind: action
  params:
    - name: Function
      type: integer
      description: 00h = Enable/Unlock, 01h = Disable/Lock
    - name: UI_Index
      type: integer
      description: 00h = All, 01h = DCT input, 02h = Local stimulus, 03h = Local Radio, 04h = Touch Motion, 05h = LEDs
    - name: Priority
      type: integer
      description: Priority level (0-FFh, higher = more priority)

- id: get_local_ui
  label: Get Local UI
  kind: query
  params:
    - name: UI_Index
      type: integer
      description: UI index (01h to UI_MAX)

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  params:
    - name: Function
      type: integer
      description: 00h = Delete IP, 01h = Set at current position, 03h = Set at specified %, 04h = Divide full range
    - name: IP_Index
      type: integer
      description: IP index (1-16)
    - name: Value
      type: integer
      description: Position value per Function

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  params:
    - name: IP_Index
      type: integer
      description: IP index (1-16)

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  params:
    - name: UP_Speed
      type: integer
      description: Speed during UP movement (rpm)
    - name: DOWN_Speed
      type: integer
      description: Speed during DOWN movement (rpm)
    - name: Slow_Speed
      type: integer
      description: Speed for adjustment movements (rpm)

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  params: []

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: Function
      type: integer
      description: 00h = Unlock, 01h = Lock, 03h = Save lock on power cycle, 04h = Do not save on power cycle
    - name: Priority
      type: integer
      description: Priority level (0-FFh)

- id: get_network_lock
  label: Get Network Lock
  kind: query
  params: []

- id: get_node_addr
  label: Get Node Address
  kind: query
  params: []

- id: get_node_app_version
  label: Get Node App Version
  kind: query
  params: []

- id: set_motor_limits
  label: Set Motor Limits
  kind: action
  params: []

- id: set_tilt_limits
  label: Set Tilt Limits
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: ack
  label: Acknowledgment
  type: action
  description: Sent when ACK bit is set in request; indicates execution started, not necessarily completion

- id: nack
  label: Negative Acknowledgment
  type: action
  params:
    - name: ErrorCode
      type: integer
      description: 01h = Data out of range, 10h = Unknown message, 11h = Message length error, FFh = Busy

- id: post_node_addr
  label: Node Address Response
  type: action
  description: Address included in message header; no DATA

- id: post_group_addr
  label: Group Address Response
  type: action
  params:
    - name: GroupIndex
      type: integer
    - name: GroupID
      type: integer

- id: post_node_label
  label: Node Label Response
  type: action
  params:
    - name: Label
      type: string

- id: post_local_ui
  label: Local UI Status Response
  type: action
  params:
    - name: Status
      type: integer
      description: 00h = Enabled/Unlocked, 01h = Disabled/Locked
    - name: Source_Addr
      type: integer
      description: NodeID of device that sent lock command
    - name: Priority
      type: integer

- id: post_motor_ip
  label: Motor Intermediate Position Response
  type: action
  params:
    - name: IP_index
      type: integer
    - name: Reserved
      type: integer
    - name: IP_position_percentage
      type: integer
      description: Position 0-100; FFh if IP not set

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Response
  type: action
  params:
    - name: UP_Speed
      type: integer
    - name: DOWN_Speed
      type: integer
    - name: Slow_Speed
      type: integer

- id: post_network_lock
  label: Network Lock Status Response
  type: action
  params:
    - name: Status
      type: integer
      description: 00h = Unlocked, 01h = Locked
    - name: Source_Addr
      type: integer
    - name: Priority
      type: integer
    - name: Saved
      type: integer
      description: 00h = Not saved on power cycle, 01h = Saved on power cycle

- id: post_motor_position
  label: Motor Position Response
  type: action
  params:
    - name: Position_pulse
      type: integer
    - name: Position_percentage
      type: integer
    - name: Reserved
      type: integer
    - name: IP
      type: integer
      description: 01h-IP_MAX; FFh if not at an IP

- id: post_motor_status
  label: Motor Status Response
  type: action
  params:
    - name: Status
      type: integer
      description: 00h = Stopped, 01h = Running, 02h = Blocked, 03h = Locked
    - name: Direction
      type: integer
      description: 00h = Going DOWN, 01h = Going UP, FFh = Unknown
    - name: Source
      type: integer
      description: 00h = Internal, 01h = Network, 02h = Local UI
    - name: Cause
      type: integer
      description: 00h = Target reached, 01h = Explicit command, 02h = Wink, 20h = Obstacle, 21h = Over-current, 22h = Thermal, 30h = Run time exceeded, 32h = Timeout exceeded, FFh = Reset/Power Up

- id: post_node_app_version
  label: Node App Version Response
  type: action
  params:
    - name: App_Reference
      type: integer
      description: 24-bit firmware part number
    - name: App_IndexLetter
      type: integer
      description: ASCII firmware major revision (41h-5Ah)
    - name: App_IndexNumber
      type: integer
    - name: Reserved
      type: integer
```

## Variables
```yaml
# UNRESOLVED: configuration represented through SET_* and GET_* command pairs
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not stated in source
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step macro sequences not stated in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Network lock prevents movement commands when locked; only CTRL_NETWORK_LOCK with equal or higher priority unlocks
    details:
      - Lock blocks CTRL_XXX functions and SET_MOTOR_LIMITS/SET_TILT_LIMITS
      - NACK(NODE_IS_LOCKED) returned for rejected commands
      - Power-on behavior configurable through SET_NETWORK_LOCK function 03h/04h
  - description: Collision avoidance recommended
    details:
      - Avoid requesting ACK in group or broadcast mode
      - Status requests do not use ACK; status report itself is feedback
# UNRESOLVED: voltage/current limits and power-on sequencing requirements not stated in source
```

## Notes

**RS485 specifics:**
- Half-duplex master-slave; master initiates all communication
- LSBF (Least Significant Bit First) for address fields
- All data bits inverted before transmission using NRZ encoding
- Bus free timeout (Tfree) = 3ms typical
- Trep = 5-255ms, slave randomized
- Treq = 10ms minimum master idle time before new request
- Message bundle ends through bus inactivity; no sync byte defined
- Minimum message length = 11 bytes
- Maximum message length = 32 bytes

**Addressing:**
- Point-to-point: SRC = NodeID, DST = NodeID
- Group: SRC = GroupID, DST = 000000h
- Broadcast: SRC = NodeID, DST = FFFFFFh
- NodeType filtering available through DEST NodeType field

**Checksum:**
- Simple byte-sum complement of Byte 1 through Byte n-2
- Complement stored as final byte

**Error codes:**
- 01h = Data out of range
- 10h = Unknown MSG
- 11h = Message length error
- FFh = Busy

<!-- UNRESOLVED: command payload byte layouts not stated in source -->
<!-- UNRESOLVED: firmware compatibility ranges not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-25T00:08:01.448Z
last_checked_at: 2026-08-05T08:43:32.447Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:43:32.447Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions map 1:1 to source commands (SET_/GET_/CTRL_/POST_); transport fields verbatim; no extras. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage/current/power specifications not stated in source"
- "flow control not stated in source"
- "configuration represented through SET_* and GET_* command pairs"
- "unsolicited event notifications not stated in source"
- "explicit multi-step macro sequences not stated in source"
- "voltage/current limits and power-on sequencing requirements not stated in source"
- "command payload byte layouts not stated in source"
- "firmware compatibility ranges not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
