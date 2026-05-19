---
spec_id: admin/somfy-somesse-30-50-rs485
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy Somesse 30 50 RS485 Control Spec"
manufacturer: Somfy
model_family: "Somesse 30 50 RS485"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somesse 30 50 RS485"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-18T17:06:29.827Z
generated_at: 2026-05-18T17:06:29.827Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T17:06:29.827Z
  matched_actions: 18
  action_count: 18
  confidence: high
  summary: "All 18 spec actions matched cleanly to source commands; transport parameters (4800 baud, 8-O-1) verified; complete bidirectional coverage with feedbacks."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Somfy Somesse 30 50 RS485 Control Spec

## Summary
SDN (Somfy Digital Network) half-duplex RS485 protocol for motor drive control. MASTER initiates all communication; SLAVE devices execute commands or report status on request. Supports point-to-point, group, and broadcast addressing. Serial config: 4800 baud, 8 data bits, odd parity, 1 stop bit. Data bits inverted (NRZ inverted before transmission). Max frame 32 bytes including 21 bytes DATA.

<!-- UNRESOLVED: power supply specifications, voltage/current ratings not in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated
auth:
  type: none  # inferred: no auth procedure in source
addressing:
  port: null  # UNRESOLVED: port number not stated (RS-485, no TCP)
```

## Traits
```yaml
# UNRESOLVED: traits inferred from command set
# powerable - no explicit power on/off commands; motor drive only
# queryable - GET_MOTOR_POSITION, GET_MOTOR_STATUS, GET_NODE_ADDR present
# routable - CTRL_MOVETO supports position/limit/IP control
# levelable - SET_MOTOR_ROLLING_SPEED for speed adjustment
```

## Actions
```yaml
# Device Management
- id: ctrl_get_node_addr
  label: Get Node Address
  kind: action
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: GroupIndex
      type: integer
      description: Group table entry (0-15)
    - name: GroupID
      type: string
      description: 24-bit group address (hex)

- id: ctrl_get_group_addr
  label: Get Group Address
  kind: action
  params:
    - name: GroupIndex
      type: integer
      description: Group table entry (0-15)

# Device Information
- id: ctrl_get_node_app_version
  label: Get Node App Version
  kind: action
  params: []

- id: set_node_label
  label: Set Node Label
  kind: action
  params:
    - name: Label
      type: string
      description: 16-character string (pad with spaces if shorter)

- id: ctrl_get_node_label
  label: Get Node Label
  kind: action
  params: []

# Device Configuration
- id: set_local_ui
  label: Set Local UI
  kind: action
  params:
    - name: Function
      type: integer
      description: 00h=Enable/Unlock, 01h=Disable/Lock
    - name: UI_Index
      type: integer
      description: "00h=All, 01h=DCT, 02h=Local Stimuli, 03h=Radio, 04h=Touch Motion, 05h=LEDs"
    - name: Priority
      type: integer
      description: Lock priority (higher=more important, 00h-FFh)

- id: ctrl_get_local_ui
  label: Get Local UI
  kind: action
  params:
    - name: UI_Index
      type: integer
      description: UI index to query

- id: set_motor_ip
  label: Set Motor Intermediate Position
  kind: action
  params:
    - name: Function
      type: integer
      description: "00h=Delete IP, 01h=Set at current position, 03h=Set at specified %, 04h=Divide full range"
    - name: IP_Index
      type: integer
      description: IP entry index (1-16)
    - name: Value
      type: integer
      description: Position % or IP count depending on Function

- id: ctrl_get_motor_ip
  label: Get Motor Intermediate Position
  kind: action
  params:
    - name: IP_Index
      type: integer
      description: IP entry index (1-16)

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

- id: ctrl_get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: action
  params: []

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: Function
      type: integer
      description: "00h=Unlock, 01h=Lock, 03h=Save lock on power cycle, 04h=Do not save"
    - name: Priority
      type: integer
      description: Lock priority (00h-FFh)

- id: ctrl_get_network_lock
  label: Get Network Lock
  kind: action
  params: []

# Device Control
- id: ctrl_moveto
  label: Move To Position
  kind: action
  params:
    - name: Function
      type: integer
      description: "00h=Go DOWN limit, 01h=Go UP limit, 02h=Go Intermediate Position, 04h=Go position in %"
    - name: Position
      type: integer
      description: Position value (IP index 0-15 or % 0-100 depending on Function)
    - name: Reserved
      type: integer
      description: Reserved byte

- id: ctrl_stop
  label: Stop Motor
  kind: action
  params:
    - name: Reserved
      type: integer
      description: Reserved byte

# Device Status
- id: ctrl_get_motor_position
  label: Get Motor Position
  kind: action
  params: []

- id: ctrl_get_motor_status
  label: Get Motor Status
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: post_node_addr
  label: Node Address Report
  kind: feedback
  params: []
  note: Address included in message header, no separate DATA

- id: post_group_addr
  label: Group Address Report
  kind: feedback
  params:
    - name: GroupIndex
      type: integer
    - name: GroupID
      type: string

- id: post_node_app_version
  label: Node App Version Report
  kind: feedback
  params:
    - name: App_Reference
      type: string
      description: 24-bit firmware part number
    - name: App_IndexLetter
      type: string
      description: ASCII firmware major revision (41h-5Ah)
    - name: App_IndexNumber
      type: integer
      description: Firmware revision number
    - name: Reserved
      type: integer

- id: post_node_label
  label: Node Label Report
  kind: feedback
  params:
    - name: Label
      type: string
      description: 16-character string

- id: post_local_ui
  label: Local UI Status Report
  kind: feedback
  params:
    - name: Status
      type: integer
      description: 00h=Enabled/Unlocked, 01h=Disabled/Locked
    - name: Source_Addr
      type: string
      description: 24-bit NodeID of locking device
    - name: Priority
      type: integer

- id: post_motor_ip
  label: Motor Intermediate Position Report
  kind: feedback
  params:
    - name: IP_index
      type: integer
    - name: Reserved
      type: integer
    - name: IP_position_percentage
      type: integer
      description: 0-100, FFh if IP not set

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Report
  kind: feedback
  params:
    - name: UP_Speed
      type: integer
    - name: DOWN_Speed
      type: integer
    - name: Slow_Speed
      type: integer

- id: post_network_lock
  label: Network Lock Status Report
  kind: feedback
  params:
    - name: Status
      type: integer
      description: 00h=Unlocked, 01h=Locked
    - name: Source_Addr
      type: string
      description: 24-bit NodeID of locking device
    - name: Priority
      type: integer
    - name: Saved
      type: integer
      description: 00h=Not saved, 01h=Saved on power cycle

- id: post_motor_position
  label: Motor Position Report
  kind: feedback
  params:
    - name: Position_pulse
      type: integer
      description: 16-bit position value (UP_LIMIT to DOWN_LIMIT)
    - name: Position_percentage
      type: integer
      description: 0-100
    - name: Reserved
      type: integer
    - name: IP
      type: integer
      description: IP index (01h-IP_MAX), FFh if not at IP

- id: post_motor_status
  label: Motor Status Report
  kind: feedback
  params:
    - name: Status
      type: integer
      description: "00h=Stopped, 01h=Running, 02h=Blocked, 03h=Locked"
    - name: Direction
      type: integer
      description: "00h=Going DOWN, 01h=Going UP, FFh=Unknown"
    - name: Source
      type: integer
      description: "00h=Internal, 01h=Network, 02h=Local UI"
    - name: Cause
      type: integer
      description: "00h=Target reached, 01h=Explicit command, 02h=Wink, 20h=Obstacle, 21h=Over-current, 22h=Thermal, 30h=Run time exceeded, 32h=Timeout, FFh=Reset"

- id: ack
  label: Acknowledge
  kind: feedback
  params: []
  note: Sent when ACK bit set in request; no DATA

- id: nack
  label: Negative Acknowledge
  kind: feedback
  params:
    - name: ErrorCode
      type: integer
      description: "01h=Data out of range, 10h=Unknown message, 11h=Length error, FFh=Busy"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside action/feedback pairs
```

## Events
```yaml
# SLAVE devices do not emit unsolicited events except:
# - POST_xxx in response to GET_xxx from MASTER
# - ACK/NACK in response to CTRL/SET with ACK bit set
# UNRESOLVED: no autonomous status push documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - desc: Network lock blocks all movement commands (CTRL_XXX) and limit settings when locked. Only CTRL_NETWORK_LOCK with equal or higher priority can override.
    priority_level: required
  - desc: When network lock function 03h (Save) is active, lock state is restored on power cycle. Motor may resume locked position after power loss.
    power_cycle_behavior: restore_lock_state
# UNRESOLVED: power-on sequencing requirements not stated in source
# UNRESOLVED: thermal/over-current fault recovery not detailed in source
```

## Notes

**Serial config:** 4800 baud, 8 data bits, odd parity, 1 stop bit. All data bits inverted (NOT) before transmission due to backward compatibility requirement. LSB first transmission order.

**Addressing:** 3-byte NodeID (LSBF — byte 4 is LSB, byte 6 is MSB). Special addresses: FFFFFFh = broadcast, 000000h = group.

**Message format:** 11-byte minimum, 32-byte maximum. Frame: MSG (1) + ACK/LEN (1) + NODE TYPE (1) + SOURCE@ (3) + DEST@ (3) + DATA (0-21) + CHECKSUM (2). Checksum = sum of complement of bytes 1 through n-2.

**Timings:** Treq=10ms minimum master idle before new request. Trep=5ms-255ms randomized slave reply delay. Tc=1ms maximum inter-character gap. Tfree=3ms bus free timeout.

**Collision avoidance:** Do not request ACK or feedback in group/broadcast mode.

**Error handling:** Retry on NACK (data out of range/unknown/length/busy) or timeout. NACK error codes: 01h, 10h, 11h, FFh.

**Speed adjustment:** SET_MOTOR_ROLLING_SPEED DC motors only. Speed ranges电机-specific — refer to device datasheet (not included in source).

<!-- UNRESOLVED: device voltage/current/power specs not in source -->
<!-- UNRESOLVED: NodeType 09h (40 AC Serie RS485) noted as "not yet available" in source -->
<!-- UNRESOLVED: actual motor speed rpm ranges not stated (refer to technical datasheet) -->
<!-- UNRESOLVED: UI_MAX value for GET_LOCAL_UI not stated in source -->
<!-- UNRESOLVED: IP_MAX value for GET_MOTOR_IP not stated in source -->
<!-- UNRESOLVED: UP_LIMIT/DOWN_LIMIT pulse values not stated in source -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-18T17:06:29.827Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T17:06:29.827Z
matched_actions: 18
action_count: 18
confidence: high
summary: "All 18 spec actions matched cleanly to source commands; transport parameters (4800 baud, 8-O-1) verified; complete bidirectional coverage with feedbacks."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
