---
spec_id: admin/somfy-uai-plus-v1-6
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy UAI+ v1.6 Control Spec"
manufacturer: Somfy
model_family: "UAI+ v1.6"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "UAI+ v1.6"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-21T23:49:16.319Z
last_checked_at: 2026-07-22T01:19:22.514Z
generated_at: 2026-07-22T01:19:22.514Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage, current, and power specifications are not documented in the source protocol manual and are intentionally omitted."
  - "source does not document flow control explicitly"
  - "speed ranges (UP/DOWN/Slow) are not in the source - refer to per-device technical datasheet."
  - "source does not describe multi-step macro sequences."
  - "electrical safety, motor thermal protection thresholds, and run-time limits are not documented in the protocol manual and must be sourced from the device's technical datasheet."
  - "motor-specific defaults, limits (UP_LIMIT/DOWN_LIMIT/UI_MAX/IP_MAX), and per-motor speed ranges are not in the protocol manual and must come from each motor's technical datasheet."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:19:22.514Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched to distinct MSG codes and verified against source; CTRL_MOVETO correctly expands to its 4 Function variants; transport parameters all found in source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Somfy UAI+ v1.6 Control Spec

## Summary
The Somfy UAI+ v1.6 is an RS-485 motor controller on the Somfy Digital Network (SDN) used to operate window-covering motors (shades, blinds, awnings). This spec covers the SDN serial control protocol: device addressing, configuration, motion control, and status reporting over an RS-485 bus at 4800 baud.

<!-- UNRESOLVED: voltage, current, and power specifications are not documented in the source protocol manual and are intentionally omitted. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source does not document flow control explicitly
  character_coding: NRZ
  bit_order: LSB_first
  inversion: true  # all data bits are bitwise-inverted before transmission (NOT of every byte)
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame layout (RS-485, bitwise-inverted, 11–32 bytes):**
- Byte 1: MSG (message identifier)
- Byte 2: ACK/LEN — bit7=ACK request, bit6=EXT (reserved, 0), bits5:0=LEN (0..31)
- Byte 3: NODE TYPE (source/destination)
- Bytes 4–6: SOURCE@ (3-byte NodeID, LSB first)
- Bytes 7–9: DEST@ (3-byte NodeID, LSB first; FFFFFFh = broadcast, 000000h = group)
- Bytes 10..n-2: DATA (0–21 bytes)
- Byte n-1: CHECKSUM = (Byte1 + Byte2 + … + Byte n-2), each byte itself bitwise-inverted
- Bus-inactivity framing (no sync byte); MASTER must wait Treq before sending, SLAVE waits Trep before replying.

## Traits
```yaml
- powerable       # inferred from NETWORK_LOCK save/restore and power-cycle behavior
- routable        # inferred from group addressing / MOTOR_IP intermediate positions
- queryable       # inferred from GET_xxx query messages (GET_NODE_ADDR, GET_GROUP_ADDR, GET_NODE_APP_VERSION, GET_NODE_LABEL, GET_LOCAL_UI, GET_MOTOR_IP, GET_MOTOR_ROLLING_SPEED, GET_NETWORK_LOCK, GET_MOTOR_POSITION, GET_MOTOR_STATUS)
- levelable       # inferred from MOTOR_ROLLING_SPEED (UP/DOWN/Slow speed)
```

## Actions
```yaml
- id: get_node_addr
  label: Get Device NodeID
  kind: query
  command: "MSG=40h (GET_NODE_ADDR), DATA Length=0; reply POST_NODE_ADDR 60h"
  params: []

- id: post_node_addr
  label: Report Device NodeID
  kind: event
  command: "MSG=60h (POST_NODE_ADDR), DATA Length=0"
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "MSG=51h (SET_GROUP_ADDR), DATA Length=4"
  params:
    - name: GroupIndex
      type: integer
      description: Entry in the group table (0..15)
    - name: GroupID
      type: integer
      description: 24-bit group address (NodeID format)

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "MSG=41h (GET_GROUP_ADDR), DATA Length=1"
  params:
    - name: GroupIndex
      type: integer
      description: Entry in the group table (0..15)

- id: post_group_addr
  label: Report Group Address
  kind: event
  command: "MSG=61h (POST_GROUP_ADDR), DATA Length=4"
  params:
    - name: GroupIndex
      type: integer
      description: Entry in the group table (0..15)
    - name: GroupID
      type: integer
      description: 24-bit group address

- id: ack
  label: Acknowledgement
  kind: event
  command: "MSG=7Fh (ACK), DATA Length=0"
  params: []

- id: nack
  label: Negative Acknowledgement / Error
  kind: event
  command: "MSG=6Fh (NACK), DATA Length=1"
  params:
    - name: ErrorCode
      type: integer
      description: "01h Data out of range, 10h Unknown message, 11h Message length error, FFh Busy"

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  command: "MSG=74h (GET_NODE_APP_VERSION), DATA Length=0"
  params: []

- id: post_node_app_version
  label: Report Firmware Revision
  kind: event
  command: "MSG=75h (POST_NODE_APP_VERSION), DATA Length=6"
  params:
    - name: App_Reference
      type: integer
      description: 24-bit firmware part number
    - name: App_IndexLetter
      type: integer
      description: 8-bit ASCII firmware major revision (41h..5Ah)
    - name: App_IndexNumber
      type: integer
      description: 8-bit firmware revision number
    - name: Reserved
      type: integer
      description: 8-bit reserved (00h or FFh)

- id: set_node_label
  label: Set User-defined Text Label
  kind: action
  command: "MSG=55h (SET_NODE_LABEL), DATA Length=16"
  params:
    - name: Label
      type: string
      description: 16-character string, space-padded

- id: get_node_label
  label: Get User-defined Text Label
  kind: query
  command: "MSG=45h (GET_NODE_LABEL), DATA Length=0"
  params: []

- id: post_node_label
  label: Report User-defined Text Label
  kind: event
  command: "MSG=65h (POST_NODE_LABEL), DATA Length=16"
  params:
    - name: Label
      type: string
      description: 16-character string

- id: set_local_ui
  label: HMI Management - Enable/Disable UI Feature
  kind: action
  command: "MSG=17h (SET_LOCAL_UI), DATA Length=3"
  params:
    - name: Function
      type: integer
      description: "00h Enable/Unlock, 01h Disable/Lock"
    - name: UI_Index
      type: integer
      description: "00h All controls+feedbacks, 01h DCT input, 02h Local stimuli, 03h Local Radio (Bluetooth), 04h Touch Motion, 05h LEDs"
    - name: Priority
      type: integer
      description: 8-bit priority (00h..FFh, higher = greater)

- id: get_local_ui
  label: HMI Management - Query UI Lock State
  kind: query
  command: "MSG=27h (GET_LOCAL_UI), DATA Length=1"
  params:
    - name: UI_Index
      type: integer
      description: UI index (01h..UI_MAX)

- id: post_local_ui
  label: HMI Management - Report UI Lock State
  kind: event
  command: "MSG=37h (POST_LOCAL_UI), DATA Length=5"
  params:
    - name: UI_Index
      type: integer
      description: UI index (01h..UI_MAX)
    - name: Status
      type: integer
      description: "00h Enabled/Unlocked, 01h Disabled/Locked"
    - name: Source_Addr
      type: integer
      description: 24-bit NodeID of lock originator
    - name: Priority
      type: integer
      description: 8-bit priority

- id: set_motor_ip
  label: Configure Intermediate Position
  kind: action
  command: "MSG=15h (SET_MOTOR_IP), DATA Length=4"
  params:
    - name: Function
      type: integer
      description: "00h Delete IP, 01h Set IP at current position, 03h Set IP at % position, 04h Divide range into N IPs"
    - name: IP_Index
      type: integer
      description: IP index (1..16)
    - name: Value
      type: integer
      description: 16-bit value (position % or IP count depending on Function)

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "MSG=25h (GET_MOTOR_IP), DATA Length=1"
  params:
    - name: IP_Index
      type: integer
      description: IP index (1..16)

- id: post_motor_ip
  label: Report Intermediate Position
  kind: event
  command: "MSG=35h (POST_MOTOR_IP), DATA Length=4"
  params:
    - name: IP_index
      type: integer
      description: IP index (1..16)
    - name: Reserved
      type: integer
      description: 16-bit reserved
    - name: IP_position_percentage
      type: integer
      description: 8-bit position % (0..100, FFh if not set)

- id: set_motor_rolling_speed
  label: Set Motor Speed (DC motors only)
  kind: action
  command: "MSG=13h (SET_MOTOR_ROLLING_SPEED), DATA Length=3"
  params:
    - name: UP_Speed
      type: integer
      description: UP movement speed in rpm (range per device datasheet)
    - name: DOWN_Speed
      type: integer
      description: DOWN movement speed in rpm (range per device datasheet)
    - name: Slow_Speed
      type: integer
      description: Adjustment speed in rpm (range per device datasheet)

- id: get_motor_rolling_speed
  label: Get Motor Speed
  kind: query
  command: "MSG=23h (GET_MOTOR_ROLLING_SPEED), DATA Length=0"
  params: []

- id: post_motor_rolling_speed
  label: Report Motor Speed
  kind: event
  command: "MSG=33h (POST_MOTOR_ROLLING_SPEED), DATA Length=3"
  params:
    - name: UP_Speed
      type: integer
      description: UP movement speed
    - name: DOWN_Speed
      type: integer
      description: DOWN movement speed
    - name: Slow_Speed
      type: integer
      description: Adjustment movement speed

- id: set_network_lock
  label: Network Lock
  kind: action
  command: "MSG=16h (SET_NETWORK_LOCK), DATA Length=2"
  params:
    - name: Function
      type: integer
      description: "00h Unlock, 01h Lock, 03h Save lock across power cycle, 04h Do not save lock across power cycle"
    - name: Priority
      type: integer
      description: 8-bit priority (00h..FFh, higher = greater; ignored for Function 03h/04h)

- id: get_network_lock
  label: Get Network Lock State
  kind: query
  command: "MSG=26h (GET_NETWORK_LOCK), DATA Length=0"
  params: []

- id: post_network_lock
  label: Report Network Lock State
  kind: event
  command: "MSG=36h (POST_NETWORK_LOCK), DATA Length=6"
  params:
    - name: Status
      type: integer
      description: "00h Unlocked, 01h Locked"
    - name: Source_Addr
      type: integer
      description: 24-bit NodeID of lock originator
    - name: Priority
      type: integer
      description: 8-bit priority
    - name: Saved
      type: integer
      description: "00h Lock not restored on power cycle, 01h Lock restored on power cycle"

- id: ctrl_moveto_down
  label: Move to DOWN Limit
  kind: action
  command: "MSG=03h (CTRL_MOVETO), DATA Length=4"
  params:
    - name: Function
      type: integer
      description: "00h Move to DOWN limit"
    - name: Position
      type: integer
      description: 16-bit position (ignored for this function)
    - name: Reserved
      type: integer
      description: 8-bit reserved

- id: ctrl_moveto_up
  label: Move to UP Limit
  kind: action
  command: "MSG=03h (CTRL_MOVETO), DATA Length=4"
  params:
    - name: Function
      type: integer
      description: "01h Move to UP limit"
    - name: Position
      type: integer
      description: 16-bit position (ignored for this function)
    - name: Reserved
      type: integer
      description: 8-bit reserved

- id: ctrl_moveto_ip
  label: Move to Intermediate Position
  kind: action
  command: "MSG=03h (CTRL_MOVETO), DATA Length=4"
  params:
    - name: Function
      type: integer
      description: "02h Move to Intermediate Position"
    - name: Position
      type: integer
      description: 16-bit IP index (0..15)
    - name: Reserved
      type: integer
      description: 8-bit reserved

- id: ctrl_moveto_percent
  label: Move to Position (% of full range)
  kind: action
  command: "MSG=03h (CTRL_MOVETO), DATA Length=4"
  params:
    - name: Function
      type: integer
      description: "04h Move to % of full travel range"
    - name: Position
      type: integer
      description: 16-bit percent value (0..100)
    - name: Reserved
      type: integer
      description: 8-bit reserved

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "MSG=02h (CTRL_STOP), DATA Length=1"
  params:
    - name: Reserved
      type: integer
      description: 8-bit reserved

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "MSG=0Ch (GET_MOTOR_POSITION), DATA Length=0"
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "MSG=0Eh (GET_MOTOR_STATUS), DATA Length=0"
  params: []
```

## Feedbacks
```yaml
- id: motor_position
  label: Motor Position
  type: object
  fields:
    - name: Position_pulse
      type: integer
      description: 16-bit pulse count within UP_LIMIT..DOWN_LIMIT
    - name: Position_percentage
      type: integer
      description: 8-bit percentage (0..100)
    - name: Reserved
      type: integer
      description: 8-bit reserved
    - name: IP
      type: integer
      description: "8-bit current IP index (01h..IP_MAX); FFh if no IP matched"

- id: motor_status
  label: Motor Status
  type: object
  fields:
    - name: Status
      type: enum
      values: [stopped, running, blocked, locked]
      description: "00h Stopped, 01h Running, 02h Blocked (thermal/obstacle), 03h Locked (NETWORK_LOCK)"
    - name: Direction
      type: enum
      values: [going_down, going_up, unknown]
      description: "00h Going DOWN, 01h Going UP, FFh Unknown"
    - name: Source
      type: enum
      values: [internal, network, local_ui]
      description: "00h Internal, 01h Network message, 02h Local UI"
    - name: Cause
      type: enum
      values: [target_reached, explicit_command, wink, obstacle_detection, over_current, thermal_protection, run_time_exceeded, timeout_exceeded, reset_powerup]
      description: "00h Target reached, 01h Explicit command, 02h Wink, 20h Obstacle, 21h Over-current, 22h Thermal, 30h Run time, 32h Timeout, FFh Reset/PowerUp"

- id: nack_error
  label: NACK Error Code
  type: enum
  values: [data_out_of_range, unknown_message, message_length_error, busy]
  description: "01h Data out of range, 10h Unknown message, 11h Message length error, FFh Busy"
```

## Variables
```yaml
# UNRESOLVED: speed ranges (UP/DOWN/Slow) are not in the source - refer to per-device technical datasheet.
```

## Events
```yaml
- id: post_node_addr
  description: Unsolicited NodeID report (MSG=60h, no DATA) - address carried in message header.
- id: post_node_app_version
  description: Unsolicited firmware version report (MSG=75h, 6-byte DATA).
- id: post_node_label
  description: Unsolicited 16-character label report (MSG=65h).
- id: post_local_ui
  description: UI lock state report (MSG=37h, 5-byte DATA).
- id: post_motor_ip
  description: Intermediate position report (MSG=35h, 4-byte DATA).
- id: post_motor_rolling_speed
  description: Motor speed report (MSG=33h, 3-byte DATA).
- id: post_network_lock
  description: Network lock state report (MSG=36h, 6-byte DATA).
- id: ack
  description: Positive acknowledgement (MSG=7Fh, no DATA) sent only when ACK bit is set in request.
- id: nack
  description: Negative acknowledgement / error (MSG=6Fh, 1-byte ErrorCode).
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - network_lock          # SET_NETWORK_LOCK with Function=01h prevents any other controller from operating the device.
interlocks:
  - "When NETWORK_LOCK is active, CTRL_xxx and SET_MOTOR_LIMITS / SET_TILT_LIMITS are rejected with NACK(NODE_IS_LOCKED) unless CTRL_NETWORK_LOCK is sent with equal-or-higher priority."
  - "When SET_LOCAL_UI disables a feature, all actions/feedback for that item are ignored or switched off until re-enabled."
  - "SET_NETWORK_LOCK Function 03h causes the highest lock to be persisted across power cycles; Function 04h clears this persistence."
# UNRESOLVED: electrical safety, motor thermal protection thresholds, and run-time limits are not documented in the protocol manual and must be sourced from the device's technical datasheet.
```

## Notes
- **Bit inversion:** every data byte on the bus is bitwise-inverted (NOT) before transmission, including the checksum. Example: byte 58h is transmitted as A7h. This applies to MSG, ACK/LEN, NODE TYPE, SOURCE@, DEST@, DATA, and CHECKSUM.
- **Checksum:** sum of all bytes in the frame excluding the checksum byte itself (each byte is its post-inversion bus value). No error correction — detection only.
- **Addressing modes:** Point-to-Point (specific NodeID), Group (DEST@=000000h, requires GroupID in recipient group table), Broadcast (DEST@=FFFFFFh). Group/broadcast requests with ACK or feedback requested risk bus collisions and are discouraged.
- **Message categories:** SET_xxx (configuration), CTRL_xxx (commands), GET_xxx (status requests, replied to by POST_xxx from SLAVE), POST_xxx (status reports). ACK/NACK are separate.
- **Timings:** Tc ≤ 1ms between consecutive characters; Tfree ≥ 3ms bus free; Trep 5–255ms SLAVE reply delay (partially randomized); Treq ≥ 10ms MASTER pre-send delay.
- **MOTOR_IP Function 04h** sets the first N IPs to evenly spaced positions between top and bottom limits, overwriting any existing IPs.
- **POST_MOTOR_POSITION IP field** returns FFh when position does not match any IP; tolerance around an IP point is motor-dependent.
- **POST_MOTOR_STATUS Cause=32h** indicates CTRL_MOVE was canceled because more than 2 minutes elapsed (adjustment timeout).
<!-- UNRESOLVED: motor-specific defaults, limits (UP_LIMIT/DOWN_LIMIT/UI_MAX/IP_MAX), and per-motor speed ranges are not in the protocol manual and must come from each motor's technical datasheet. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-21T23:49:16.319Z
last_checked_at: 2026-07-22T01:19:22.514Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:19:22.514Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched to distinct MSG codes and verified against source; CTRL_MOVETO correctly expands to its 4 Function variants; transport parameters all found in source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage, current, and power specifications are not documented in the source protocol manual and are intentionally omitted."
- "source does not document flow control explicitly"
- "speed ranges (UP/DOWN/Slow) are not in the source - refer to per-device technical datasheet."
- "source does not describe multi-step macro sequences."
- "electrical safety, motor thermal protection thresholds, and run-time limits are not documented in the protocol manual and must be sourced from the device's technical datasheet."
- "motor-specific defaults, limits (UP_LIMIT/DOWN_LIMIT/UI_MAX/IP_MAX), and per-motor speed ranges are not in the protocol manual and must come from each motor's technical datasheet."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
