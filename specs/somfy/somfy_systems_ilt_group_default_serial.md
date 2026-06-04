---
spec_id: admin/somfy-systems-inc-ilt-group-default
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy Systems ILT Group Default SDN Control Spec"
manufacturer: Somfy
model_family: "ILT Group Default"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
    - "Somfy Systems, Inc"
  models:
    - "ILT Group Default"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
  - github.com
  - somfypro.ca
  - manualslib.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
  - https://github.com/ccutrer/somfy_sdn/blob/master/doc/protocol.md
  - https://www.somfypro.ca/documents/3931489/18635942/SDN-IP-Interface-Instructions.pdf
  - https://www.manualslib.com/manual/1769682/Somfy-Rs-485-Sdn-2-0.html
retrieved_at: 2026-06-01T23:01:37.142Z
last_checked_at: 2026-06-04T06:30:21.792Z
generated_at: 2026-06-04T06:30:21.792Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the SDN bus protocol family rather than a single product; the ILT Group Default is treated as the generic SDN node. Specific model variants and their NodeType reserved values are listed in the Transport section."
  - "source describes POST_xxx status reports (master-requested) but does"
  - "source does not describe any multi-step sequences or scenes."
  - "source contains no explicit safety warnings, hazard statements, or"
  - "source defines speed ranges and IP numeric limits per device technical datasheet, which is not part of this integration guide; left as ranges in the schema."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:30:21.792Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions have literal hex matches in source; transport parameters fully verified; 30/30 coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy Systems ILT Group Default SDN Control Spec

## Summary
Somfy Digital Network (SDN) RS-485 bus protocol for the Somfy ILT group of motor products (Ø30 DC, Ø50 AC/DC, Glydea, RS485 RTS transmitter, etc.). Half-duplex master/slave protocol on an asynchronous serial link at 4800 baud, 8 data bits, odd parity. All message bytes are bit-inverted and transmitted LSB-first. The protocol exposes device management, group configuration, firmware/label queries, HMI lock, intermediate positions, motor speed, network lock, move/stop control, and motor position/status reporting.

<!-- UNRESOLVED: source describes the SDN bus protocol family rather than a single product; the ILT Group Default is treated as the generic SDN node. Specific model variants and their NodeType reserved values are listed in the Transport section. -->

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
  electrical: rs485
  half_duplex: true
  bit_inversion: true   # all data bits inverted before transmission (NOT applied per byte)
  bit_order: lsb_first
auth:
  type: none  # inferred: no auth procedure in source
```

**NodeType table (product family discriminator, 4-bit value in Byte 3 of every frame):**

| NodeType | Device |
|---|---|
| 02h | Ø30 DC Serie RS485 |
| 05h | RS485 RTS transmitter |
| 06h | Glydea RS485 |
| 07h | Ø50 AC Serie RS485 |
| 08h | Ø50 DC Serie RS485 |
| 09h | Ø40 AC Serie RS485 (not yet available) |

**Bus timing:**

| Timing | Min | Typical | Max | Description |
|---|---|---|---|---|
| Tc | n/a | | 1 ms | Max time between two consecutive characters |
| Tfree | | 3 ms | | Bus free timeout |
| Trep | 5 ms | – | 255 ms | Slave reply delay (partially randomized) |
| Treq | 10 ms | n/a | | Master silence before next request |

## Traits
```yaml
- powerable       # inferred: power-up and power-cycle behavior referenced in NETWORK_LOCK and motor status (FFh Reset / Power Up)
- routable        # inferred: group addressing and broadcast routing of messages
- queryable       # inferred: GET_xxx / POST_xxx query mechanism documented
- levelable       # inferred: SET_MOTOR_ROLLING_SPEED adjusts UP/DOWN/Slow speeds
- lockable        # inferred: SET_LOCAL_UI and SET_NETWORK_LOCK provide lock primitives
```

## Actions
```yaml
# All SDN messages share the same 11-byte (min) frame envelope:
#   Byte 1: MSG (this is the discriminator used in each action's `command` field)
#   Byte 2: ACK / EXT / LEN
#   Byte 3: SRC NodeType (4b) | DEST NodeType (4b)
#   Byte 4-6: SOURCE@ (3 bytes, LSBF)
#   Byte 7-9: DEST@   (3 bytes, LSBF)
#   Byte 10..n-2: DATA (variable, 0-21 bytes)
#   Byte n-1..n: CHECKSUM (2 bytes; sum of all preceding bytes)
#
# All byte values shown are the raw (pre-inversion) values; the physical bus
# carries the bit-inverted complement. See Transport block.
# Each `command:` below names the MSG byte that identifies the operation;
# the full frame must be assembled with appropriate addressing, ACK/LEN,
# DATA payload, and CHECKSUM per §5 of the source.

- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "MSG 0x40 (GET_NODE_ADDR)"
  params: []

- id: post_node_addr
  label: Post Node Address
  kind: action
  command: "MSG 0x60 (POST_NODE_ADDR)"
  params: []
  # Slave response to GET_NODE_ADDR; address is in the frame header (Bytes 4-6).

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "MSG 0x51 (SET_GROUP_ADDR)"
  params:
    - name: GroupIndex
      type: integer
      description: Entry in the group table (0-15)
    - name: GroupID
      type: integer
      description: 24-bit group address

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "MSG 0x41 (GET_GROUP_ADDR)"
  params:
    - name: GroupIndex
      type: integer
      description: Entry in the group table to read (0-15)

- id: post_group_addr
  label: Post Group Address
  kind: action
  command: "MSG 0x61 (POST_GROUP_ADDR)"
  params:
    - name: GroupIndex
      type: integer
      description: Entry in the group table (0-15)
    - name: GroupID
      type: integer
      description: 24-bit group address

- id: ack
  label: Acknowledge
  kind: action
  command: "MSG 0x7F (ACK)"
  params: []
  # Sent by slave when ACK bit is set in the request and processing succeeded.

- id: nack
  label: Negative Acknowledge
  kind: action
  command: "MSG 0x6F (NACK)"
  params:
    - name: ErrorCode
      type: integer
      description: "8-bit error code (01h Data out of range, 10h Unknown message, 11h Message length error, FFh Busy)"

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  command: "MSG 0x74 (GET_NODE_APP_VERSION)"
  params: []

- id: post_node_app_version
  label: Post Firmware Revision
  kind: action
  command: "MSG 0x75 (POST_NODE_APP_VERSION)"
  params:
    - name: App_Reference
      type: integer
      description: 24-bit firmware part number
    - name: App_IndexLetter
      type: string
      description: 8-bit ASCII firmware major revision letter (41h-5Ah)
    - name: App_IndexNumber
      type: integer
      description: 8-bit firmware revision number
    - name: Reserved
      type: integer
      description: 8-bit reserved

- id: set_node_label
  label: Set User-defined Text Label
  kind: action
  command: "MSG 0x55 (SET_NODE_LABEL)"
  params:
    - name: Label
      type: string
      description: 16-character ASCII string (pad with spaces if shorter)

- id: get_node_label
  label: Get User-defined Text Label
  kind: query
  command: "MSG 0x45 (GET_NODE_LABEL)"
  params: []

- id: post_node_label
  label: Post User-defined Text Label
  kind: action
  command: "MSG 0x65 (POST_NODE_LABEL)"
  params:
    - name: Label
      type: string
      description: 16-character ASCII string

- id: set_local_ui
  label: Set Local UI (HMI Lock)
  kind: action
  command: "MSG 0x17 (SET_LOCAL_UI)"
  params:
    - name: Function
      type: integer
      description: "00h Enable/Unlock, 01h Disable/Lock"
    - name: UI_Index
      type: integer
      description: "00h All local controls and feedbacks, 01h DCT input, 02h Local stimuli, 03h Local radio, 04h Touch Motion, 05h LEDs"
    - name: Priority
      type: integer
      description: 8-bit priority (greater = higher; required equal/higher to override existing lock)

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  command: "MSG 0x27 (GET_LOCAL_UI)"
  params:
    - name: UI_Index
      type: integer
      description: UI entry to query (01h-UI_MAX)

- id: post_local_ui
  label: Post Local UI Status
  kind: action
  command: "MSG 0x37 (POST_LOCAL_UI)"
  params:
    - name: Status
      type: integer
      description: "00h Enabled/Unlocked, 01h Disabled/Locked"
    - name: Source_Addr
      type: integer
      description: 24-bit NodeID that sent the lock command
    - name: Priority
      type: integer
      description: 8-bit lock priority

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "MSG 0x15 (SET_MOTOR_IP)"
  params:
    - name: Function
      type: integer
      description: "00h Delete IP, 01h Set IP at current position, 03h Set IP at specified position, 04h Divide full range with given IP count"
    - name: IP_Index
      type: integer
      description: Intermediate position slot (1-16)
    - name: Value
      type: integer
      description: "16-bit value: position in % (Function 03h) or IP count (Function 04h); ignored for Functions 00h and 01h"

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "MSG 0x25 (GET_MOTOR_IP)"
  params:
    - name: IP_Index
      type: integer
      description: Intermediate position slot to read (1-16)

- id: post_motor_ip
  label: Post Intermediate Position
  kind: action
  command: "MSG 0x35 (POST_MOTOR_IP)"
  params:
    - name: IP_index
      type: integer
      description: Intermediate position slot (1-16)
    - name: Reserved
      type: integer
      description: 16-bit reserved
    - name: IP_position_percentage
      type: integer
      description: "Position in % (0-100; FFh if IP not set)"

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "MSG 0x13 (SET_MOTOR_ROLLING_SPEED)"
  params:
    - name: UP_Speed
      type: integer
      description: Speed during UP movement (rpm; range per device datasheet)
    - name: DOWN_Speed
      type: integer
      description: Speed during DOWN movement (rpm; range per device datasheet)
    - name: Slow_Speed
      type: integer
      description: Speed for adjustment movements (rpm; range per device datasheet)

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "MSG 0x23 (GET_MOTOR_ROLLING_SPEED)"
  params: []

- id: post_motor_rolling_speed
  label: Post Motor Rolling Speed
  kind: action
  command: "MSG 0x33 (POST_MOTOR_ROLLING_SPEED)"
  params:
    - name: UP_Speed
      type: integer
      description: Speed during UP movement
    - name: DOWN_Speed
      type: integer
      description: Speed during DOWN movement
    - name: Slow_Speed
      type: integer
      description: Speed for adjustment movements

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "MSG 0x16 (SET_NETWORK_LOCK)"
  params:
    - name: Function
      type: integer
      description: "00h Unlock, 01h Lock at current position, 03h Save lock across power cycle, 04h Do not save lock across power cycle"
    - name: Priority
      type: integer
      description: 8-bit priority (ignored for Functions 03h and 04h; greater = higher)

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  command: "MSG 0x26 (GET_NETWORK_LOCK)"
  params: []

- id: post_network_lock
  label: Post Network Lock Status
  kind: action
  command: "MSG 0x36 (POST_NETWORK_LOCK)"
  params:
    - name: Status
      type: integer
      description: "00h Unlocked, 01h Locked"
    - name: Source_Addr
      type: integer
      description: 24-bit NodeID that sent the lock command
    - name: Priority
      type: integer
      description: 8-bit lock priority
    - name: Saved
      type: integer
      description: "00h Lock will not be restored on power cycle, 01h Lock will be restored on power cycle"

- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "MSG 0x03 (CTRL_MOVETO)"
  params:
    - name: Function
      type: integer
      description: "00h Move to DOWN limit, 01h Move to UP limit, 02h Move to Intermediate Position, 04h Move to position in %"
    - name: Position
      type: integer
      description: "16-bit: IP index (Function 02h) or % value 0-100 (Function 04h); ignored for Functions 00h/01h"
    - name: Reserved
      type: integer
      description: 8-bit reserved (set to 00h or FFh)

- id: ctrl_stop
  label: Stop
  kind: action
  command: "MSG 0x02 (CTRL_STOP)"
  params:
    - name: Reserved
      type: integer
      description: 8-bit reserved (set to 00h or FFh)
  # Motor stops immediately without speed ramp-down.

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "MSG 0x0C (GET_MOTOR_POSITION)"
  params: []

- id: post_motor_position
  label: Post Motor Position
  kind: action
  command: "MSG 0x0D (POST_MOTOR_POSITION)"
  params:
    - name: Position_pulse
      type: integer
      description: 16-bit pulse count (UP_LIMIT to DOWN_LIMIT)
    - name: Position_percentage
      type: integer
      description: 8-bit position in % (0-100)
    - name: Reserved
      type: integer
      description: 8-bit reserved
    - name: IP
      type: integer
      description: "8-bit IP index (01h-IP_MAX; FFh if no IP matches)"

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "MSG 0x0E (GET_MOTOR_STATUS)"
  params: []

- id: post_motor_status
  label: Post Motor Status
  kind: action
  command: "MSG 0x0F (POST_MOTOR_STATUS)"
  params:
    - name: Status
      type: integer
      description: "00h Stopped, 01h Running, 02h Blocked, 03h Locked"
    - name: Direction
      type: integer
      description: "00h Going DOWN, 01h Going UP, FFh Unknown"
    - name: Source
      type: integer
      description: "00h Internal, 01h Network message, 02h Local UI"
    - name: Cause
      type: integer
      description: "00h Target reached, 01h Explicit command, 02h Wink, 20h Obstacle detection, 21h Over-current protection, 22h Thermal protection, 30h Run time exceeded, 32h Timeout exceeded, FFh Reset / Power Up"
```

## Feedbacks
```yaml
- id: motor_status
  type: enum
  values: [stopped, running, blocked, locked]
- id: motor_direction
  type: enum
  values: [down, up, unknown]
- id: motor_source
  type: enum
  values: [internal, network_message, local_ui]
- id: motor_cause
  type: enum
  values: [target_reached, explicit_command, wink, obstacle_detection, over_current, thermal_protection, runtime_exceeded, timeout_exceeded, reset_power_up]
- id: local_ui_status
  type: enum
  values: [enabled_unlocked, disabled_locked]
- id: network_lock_status
  type: enum
  values: [unlocked, locked]
- id: network_lock_saved
  type: enum
  values: [not_restored_on_power_cycle, restored_on_power_cycle]
- id: nack_error
  type: enum
  values: [data_out_of_range, unknown_message, message_length_error, busy]
```

## Variables
```yaml
- id: motor_position_pulses
  type: integer
  description: 16-bit pulse count (UP_LIMIT to DOWN_LIMIT)
- id: motor_position_percent
  type: integer
  description: 8-bit position in % (0-100)
- id: motor_speed_up
  type: integer
  description: UP movement speed (rpm; range per device datasheet)
- id: motor_speed_down
  type: integer
  description: DOWN movement speed (rpm; range per device datasheet)
- id: motor_speed_slow
  type: integer
  description: Adjustment movement speed (rpm; range per device datasheet)
- id: intermediate_position
  type: integer
  description: "IP slot 1-16 with stored position (0-100%); FFh = not set"
- id: firmware_reference
  type: integer
  description: 24-bit firmware part number
- id: firmware_index_letter
  type: string
  description: Firmware major revision letter (ASCII 41h-5Ah)
- id: firmware_index_number
  type: integer
  description: Firmware revision number
- id: node_label
  type: string
  description: 16-character user-defined text label
- id: node_id
  type: integer
  description: 24-bit unique device NodeID (factory-programmed, non-modifiable)
- id: group_id
  type: integer
  description: 24-bit group address stored in one of 16 group table entries
```

## Events
```yaml
# UNRESOLVED: source describes POST_xxx status reports (master-requested) but does
# not define unsolicited push events from the slave. No Events section emitted.
```

## Macros
```yaml
# UNRESOLVED: source does not describe any multi-step sequences or scenes.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "When the network is locked, only CTRL_MOVETO messages with priority equal to or higher than the lock priority are accepted. All other CTRL_xxx, SET_MOTOR_LIMITS, and SET_TILT_LIMITS are rejected with NACK (NODE_IS_LOCKED)."
    source_section: "6.3.4 Lock Network Commands"
  - description: "When a UI is locked, a SET_LOCAL_UI from a lower priority is rejected with NACK (LOW_PRIORITY). Lock priority must be matched or exceeded to override."
    source_section: "6.3.1 HMI Management"
  - description: "SET_NETWORK_LOCK function 03h persists the lock across power cycles; function 04h clears it. The default factory state is Do Not Save, so power-cycle behavior must be set explicitly by the integrator."
    source_section: "6.3.4 Lock Network Commands"
# UNRESOLVED: source contains no explicit safety warnings, hazard statements, or
# power-on sequencing requirements beyond the lock priority interlock above.
```

## Notes
The protocol is half-duplex RS-485, not RS-232. The user-provided protocol hint ("RS-232C") does not match the source, which consistently describes RS-485 with NodeType filtering and a multi-drop bus. Every byte on the wire is the bit-inverted complement of the logical value (e.g. logical 0x58h transmits as 0xA7h); LSB is sent first. Source address (SOURCE@) and destination address (DEST@) are encoded LSB-first. The checksum is a 16-bit sum of all preceding bytes in the frame (basic error detection only, no correction). When ACK is requested in the request message, the slave responds with ACK (0x7F) on success or NACK (0x6F) with an error code; status requests do not generate ACK because the POST_xxx reply carries the feedback. Source recommends implementing a retry strategy when NACK is received or no ACK arrives within timeout. Bus collision risk increases in group/broadcast modes, especially with ACK enabled — avoid ACK in those modes. CTRL_STOP halts the motor immediately without a speed ramp. POST_MOTOR_POSITION is sent continuously while the motor is running, not just at rest.

<!-- UNRESOLVED: source defines speed ranges and IP numeric limits per device technical datasheet, which is not part of this integration guide; left as ranges in the schema. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
  - github.com
  - somfypro.ca
  - manualslib.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
  - https://github.com/ccutrer/somfy_sdn/blob/master/doc/protocol.md
  - https://www.somfypro.ca/documents/3931489/18635942/SDN-IP-Interface-Instructions.pdf
  - https://www.manualslib.com/manual/1769682/Somfy-Rs-485-Sdn-2-0.html
retrieved_at: 2026-06-01T23:01:37.142Z
last_checked_at: 2026-06-04T06:30:21.792Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:30:21.792Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions have literal hex matches in source; transport parameters fully verified; 30/30 coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the SDN bus protocol family rather than a single product; the ILT Group Default is treated as the generic SDN node. Specific model variants and their NodeType reserved values are listed in the Transport section."
- "source describes POST_xxx status reports (master-requested) but does"
- "source does not describe any multi-step sequences or scenes."
- "source contains no explicit safety warnings, hazard statements, or"
- "source defines speed ranges and IP numeric limits per device technical datasheet, which is not part of this integration guide; left as ranges in the schema."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
