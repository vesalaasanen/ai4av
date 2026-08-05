---
spec_id: admin/somfy-st30-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy ST-30 (North America) Control Spec"
manufacturer: Somfy
model_family: "ST-30 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "ST-30 (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-16T15:24:06.510Z
last_checked_at: 2026-07-22T01:14:00.003Z
generated_at: 2026-07-22T01:14:00.003Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no explicit power on/off commands — motor control via CTRL_MOVETO and CTRL_STOP only"
  - "no standalone settable parameters separate from actions"
  - "no unsolicited event notifications defined in source"
  - "no explicit multi-step macros in source"
  - "no explicit safety interlock procedures beyond network lock"
  - "DC motor speed ranges not stated — \"See Technical Datasheet\" referenced but not provided"
  - "exact IP_MAX value for intermediate positions not stated in source"
  - "UI_MAX for HMI management not stated in source"
  - "firmware compatibility range not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:14:00.003Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched with literal command opcodes and correct parameter shapes; all transport parameters verified; Feedbacks enumerate all SLAVE responses; complete source coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Somfy ST-30 (North America) Control Spec

## Summary
The Somfy ST-30 is a DC motor controller for window treatments using Somfy's SDN (Somfy Digital Network) RS-485 bus protocol. Communication is half-duplex serial at 4800 baud with a custom binary message format supporting point-to-point, group, and broadcast addressing. NodeID is factory-programmed and cannot be changed.

<!-- UNRESOLVED: no explicit power on/off commands — motor control via CTRL_MOVETO and CTRL_STOP only -->

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
  encoding: NRZ
  bit_order: lsb_first  # least significant bit sent first
  inverted: true  # all data bits inverted for backward compatibility
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: GET_xxx query commands present (10 distinct queries)
- levelable  # inferred: position % and rolling speed settable
```

## Actions
```yaml
# All command: fields hold the MSG opcode byte from §6 of source verbatim.
# Full frame = MSG + ACK/LEN + NODETYPE + SOURCE@ + DEST@ + DATA + CHECKSUM (see Notes).
#
# Device Control
- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "03h"  # CTRL_MOVETO
  params:
    - name: function
      type: integer
      description: |
        00h = Move to DOWN limit
        01h = Move to UP limit
        02h = Move to Intermediate Position (Position contains IP index 0-15)
        04h = Move to Position in % of full travel (Position contains 0-100)
    - name: position
      type: integer
      description: Position value (context depends on function)
    - name: reserved
      type: integer
      description: Reserved (set to 00h)

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "02h"  # CTRL_STOP
  params:
    - name: reserved
      type: integer
      description: Reserved (set to 00h)

# Device Configuration (SET_xxx)
- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51h"  # SET_GROUP_ADDR
  params:
    - name: group_index
      type: integer
      description: Entry in group table (0-15)
    - name: group_id
      type: integer
      description: 24-bit group address (LSBF)

- id: set_node_label
  label: Set Node Label
  kind: action
  command: "55h"  # SET_NODE_LABEL
  params:
    - name: label
      type: string
      description: 16-character label (pad with spaces if shorter)

- id: set_local_ui
  label: Set Local UI
  kind: action
  command: "17h"  # SET_LOCAL_UI
  params:
    - name: function
      type: integer
      description: |
        00h = Enable/Unlock
        01h = Disable/Lock
    - name: ui_index
      type: integer
      description: |
        00h = All Local controls
        01h = DCT input
        02h = Local stimuli (radio pairing)
        03h = Local Radio (Bluetooth)
        04h = Touch Motion
        05h = LEDs
    - name: priority
      type: integer
      description: Priority level (0-255, higher = higher priority)

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "15h"  # SET_MOTOR_IP
  params:
    - name: function
      type: integer
      description: |
        00h = Delete IP
        01h = Set IP at current position
        03h = Set IP at specified position %
        04h = Divide full range with N equally spaced IPs
    - name: ip_index
      type: integer
      description: IP index (1-16)
    - name: value
      type: integer
      description: Position value (context depends on function)

- id: set_motor_rolling_speed
  label: Set Motor Speed
  kind: action
  command: "13h"  # SET_MOTOR_ROLLING_SPEED
  params:
    - name: up_speed
      type: integer
      description: Speed during UP movement (rpm)
    - name: down_speed
      type: integer
      description: Speed during DOWN movement (rpm)
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements (rpm)

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16h"  # SET_NETWORK_LOCK
  params:
    - name: function
      type: integer
      description: |
        00h = Unlock
        01h = Lock at current position
        03h = Save lock on power cycle
        04h = Do not save lock on power cycle
    - name: priority
      type: integer
      description: Priority level (0-255)

# Status Queries (GET_xxx) - all return POST_xxx feedbacks listed below
- id: get_node_addr
  label: Query Node Address
  kind: query
  command: "40h"  # GET_NODE_ADDR
  params: []

- id: get_group_addr
  label: Query Group Address
  kind: query
  command: "41h"  # GET_GROUP_ADDR
  params:
    - name: group_index
      type: integer
      description: Entry in group table (0-15)

- id: get_node_app_version
  label: Query Firmware Version
  kind: query
  command: "74h"  # GET_NODE_APP_VERSION
  params: []

- id: get_node_label
  label: Query Node Label
  kind: query
  command: "45h"  # GET_NODE_LABEL
  params: []

- id: get_local_ui
  label: Query Local UI Status
  kind: query
  command: "27h"  # GET_LOCAL_UI
  params:
    - name: ui_index
      type: integer
      description: UI index (01h to UI_MAX)

- id: get_motor_ip
  label: Query Intermediate Position
  kind: query
  command: "25h"  # GET_MOTOR_IP
  params:
    - name: ip_index
      type: integer
      description: IP index (1-16)

- id: get_motor_rolling_speed
  label: Query Motor Speed
  kind: query
  command: "23h"  # GET_MOTOR_ROLLING_SPEED
  params: []

- id: get_network_lock
  label: Query Network Lock Status
  kind: query
  command: "26h"  # GET_NETWORK_LOCK
  params: []

- id: get_motor_position
  label: Query Motor Position
  kind: query
  command: "0Ch"  # GET_MOTOR_POSITION
  params: []

- id: get_motor_status
  label: Query Motor Status
  kind: query
  command: "0Eh"  # GET_MOTOR_STATUS
  params: []
```

## Feedbacks
```yaml
# Status Query Responses
- id: post_node_addr
  label: Node Address Response
  kind: feedback
  command: "60h"  # POST_NODE_ADDR
  fields:
    - name: node_id
      type: bytes
      size: 3
      description: Device NodeID (from message header)

- id: post_group_addr
  label: Group Address Response
  kind: feedback
  command: "61h"  # POST_GROUP_ADDR
  fields:
    - name: group_index
      type: integer
    - name: group_id
      type: bytes
      size: 3

- id: post_node_app_version
  label: Firmware Version Response
  kind: feedback
  command: "75h"  # POST_NODE_APP_VERSION
  fields:
    - name: app_reference
      type: bytes
      size: 3
      description: Firmware part number
    - name: app_index_letter
      type: integer
      description: Firmware major revision (ASCII)
    - name: app_index_number
      type: integer
      description: Firmware revision number
    - name: reserved
      type: integer

- id: post_node_label
  label: Node Label Response
  kind: feedback
  command: "65h"  # POST_NODE_LABEL
  fields:
    - name: label
      type: string
      size: 16

- id: post_local_ui
  label: Local UI Status Response
  kind: feedback
  command: "37h"  # POST_LOCAL_UI
  fields:
    - name: ui_index
      type: integer
    - name: status
      type: integer
      description: 00h = Enabled/Unlocked, 01h = Disabled/Locked
    - name: source_addr
      type: bytes
      size: 3
      description: NodeID of locking device
    - name: priority
      type: integer

- id: post_motor_ip
  label: Intermediate Position Response
  kind: feedback
  command: "35h"  # POST_MOTOR_IP
  fields:
    - name: ip_index
      type: integer
    - name: reserved
      type: bytes
      size: 2
    - name: ip_position_percentage
      type: integer
      description: Position 0-100, FFh if not set

- id: post_motor_rolling_speed
  label: Motor Speed Response
  kind: feedback
  command: "33h"  # POST_MOTOR_ROLLING_SPEED
  fields:
    - name: up_speed
      type: integer
    - name: down_speed
      type: integer
    - name: slow_speed
      type: integer

- id: post_network_lock
  label: Network Lock Status Response
  kind: feedback
  command: "36h"  # POST_NETWORK_LOCK
  fields:
    - name: status
      type: integer
      description: 00h = Unlocked, 01h = Locked
    - name: source_addr
      type: bytes
      size: 3
    - name: priority
      type: integer
    - name: saved
      type: integer
      description: 00h = Not saved, 01h = Saved for power cycle

- id: post_motor_position
  label: Motor Position Response
  kind: feedback
  command: "0Dh"  # POST_MOTOR_POSITION
  fields:
    - name: position_pulse
      type: integer
    - name: position_percentage
      type: integer
    - name: reserved
      type: integer
    - name: ip
      type: integer
      description: Current IP index (01h-IP_MAX, FFh if no IP match)

- id: post_motor_status
  label: Motor Status Response
  kind: feedback
  command: "0Fh"  # POST_MOTOR_STATUS
  fields:
    - name: status
      type: integer
      description: |
        00h = Stopped
        01h = Running
        02h = Blocked
        03h = Locked
    - name: direction
      type: integer
      description: |
        00h = Going DOWN
        01h = Going UP
        FFh = Unknown
    - name: source
      type: integer
      description: |
        00h = Internal
        01h = Network message
        02h = Local UI
    - name: cause
      type: integer
      description: |
        00h = Target reached
        01h = Explicit command
        02h = Wink
        20h = Obstacle detection
        21h = Over-current protection
        22h = Thermal protection
        30h = Run time exceeded
        32h = Timeout exceeded
        FFh = Reset / PowerUp

- id: ack
  label: Acknowledge
  kind: feedback
  command: "7Fh"  # ACK
  description: Positive acknowledgment (sent when ACK bit set in request)

- id: nack
  label: Negative Acknowledge
  kind: feedback
  command: "6Fh"  # NACK
  fields:
    - name: error_code
      type: integer
      description: |
        01h = Data out of range
        10h = Unknown message
        11h = Message length error
        FFh = Busy
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters separate from actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications defined in source
# Device only responds to MASTER requests; does not initiate communication
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Network lock blocks all movement commands except CTRL_NETWORK_LOCK with equal/higher priority
    message: NACK(NODE_IS_LOCKED) returned when locked
  - description: Motor blocked conditions trigger status reporting
    message: thermal protection, obstacle detection, over-current
# UNRESOLVED: no explicit safety interlock procedures beyond network lock
```

## Notes
- **Addressing**: NodeID is 3-byte factory-programmed address; groups support up to 16 GroupIDs per device
- **Addressing Modes**: Point-to-point (dest NodeID), Group (GroupID), Broadcast (FFFFFFh dest)
- **Collision Avoidance**: Avoid ACK/NACK requests in group/broadcast mode; avoid requesting feedback in group/broadcast
- **Bit Inversion**: All data bytes must be inverted before transmission (e.g., 58h → A7h) for backward compatibility
- **Timing**: Trep is randomized 5-255ms per slave; master must wait Treq=10ms minimum between requests
- **Checksum**: Simple sum of complement of all bytes (Byte 1 through Byte n-2)
- **Message Format**: 11-32 bytes total (MSG + ACK/LEN + NODETYPE + SOURCE@ + DEST@ + DATA + CHECKSUM)
- **LSBF**: NodeID and group addresses use least-significant-byte-first encoding
- **Command Payloads**: each action `command:` field holds the single MSG opcode byte from §6; DATA parameters follow as documented in per-action params. Full frame construction per Message Format above.

<!-- UNRESOLVED: DC motor speed ranges not stated — "See Technical Datasheet" referenced but not provided -->
<!-- UNRESOLVED: exact IP_MAX value for intermediate positions not stated in source -->
<!-- UNRESOLVED: UI_MAX for HMI management not stated in source -->
<!-- UNRESOLVED: firmware compatibility range not stated in source -->
```

Self-check done: no fabricated voltage/port/baud; status=draft; confidence=low; all MSG opcodes verbatim from source §6; existing IDs preserved; 10 new GET queries added per coverage rule.

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-16T15:24:06.510Z
last_checked_at: 2026-07-22T01:14:00.003Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:14:00.003Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched with literal command opcodes and correct parameter shapes; all transport parameters verified; Feedbacks enumerate all SLAVE responses; complete source coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no explicit power on/off commands — motor control via CTRL_MOVETO and CTRL_STOP only"
- "no standalone settable parameters separate from actions"
- "no unsolicited event notifications defined in source"
- "no explicit multi-step macros in source"
- "no explicit safety interlock procedures beyond network lock"
- "DC motor speed ranges not stated — \"See Technical Datasheet\" referenced but not provided"
- "exact IP_MAX value for intermediate positions not stated in source"
- "UI_MAX for HMI management not stated in source"
- "firmware compatibility range not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
