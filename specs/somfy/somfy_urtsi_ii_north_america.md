---
schema_version: ai4av-public-spec-v1
device_id: somfy/urtsi-ii-north-america
entity_id: somfy_urtsi_ii_north_america
spec_id: admin/somfy-urtsi-ii-north-america
revision: 1
author: admin
title: "Somfy URTSI II (North America) Control Spec"
status: published
manufacturer: Somfy
manufacturer_key: somfy
model_family: "URTSI II (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "URTSI II (North America)"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
source_documents:
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:16.971Z
retrieved_at: 2026-04-29T08:47:16.971Z
last_checked_at: 2026-04-27T15:21:47.971Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T15:21:47.971Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 30 spec commands matched verbatim in source; transport parameters verified; full protocol coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Somfy URTSI II (North America) Control Spec

## Summary

The Somfy URTSI II is an RS485-to-RTS transmitter interface for Somfy Digital Network (SDN) motorized shade and blind systems. This spec covers the binary SDN bus protocol used to control, configure, and query SDN motors over an RS485 serial connection. The device acts as a MASTER on the bus, communicating with motor SLAVE nodes via point-to-point, group, or broadcast addressing.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: physical connector pinout not documented in this source -->

## Transport

```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- routable    # inferred: move-to-position commands support targeting by NodeID, group, or broadcast
- queryable   # inferred: multiple GET/POST query commands for position, status, config
- levelable   # inferred: position percentage control (0-100%)
```

## Actions

```yaml
# All message IDs are hex values (MSG byte). The full frame structure is:
# Byte 1: MSG | Byte 2: ACK/LEN | Byte 3: NODE_TYPE | Bytes 4-6: SOURCE@ (LSBF)
# | Bytes 7-9: DEST@ (LSBF) | Bytes 10..n-2: DATA | Byte n-1: CHECKSUM | Byte n: (end)
# CHECKSUM = complement of sum of all bytes in frame.
# IMPORTANT: all data bits must be inverted (bitwise NOT) before transmission.
# LSB is sent first.

- id: ctrl_moveto
  label: Move to Position
  kind: action
  msg: 0x03
  data_length: 4
  params:
    - name: function
      type: integer
      values: [0, 1, 2, 4]
      description: "0=down limit, 1=up limit, 2=intermediate position, 4=position in %"
    - name: position
      type: integer
      description: "For function 2: IP index (0-15). For function 4: percentage (0-100). Ignored for 0 and 1."
    - name: reserved
      type: integer
      description: "Set to 0x00"

- id: ctrl_stop
  label: Stop Motor
  kind: action
  msg: 0x02
  data_length: 1
  params:
    - name: reserved
      type: integer
      description: "Set to 0x00"
  notes: Motor stops immediately without speed ramp-down.

- id: set_group_addr
  label: Set Group Address
  kind: action
  msg: 0x51
  data_length: 4
  params:
    - name: group_index
      type: integer
      min: 0
      max: 15
      description: Entry in the group table
    - name: group_id
      type: integer
      description: 24-bit associated group address

- id: set_node_label
  label: Set Device Label
  kind: action
  msg: 0x55
  data_length: 16
  params:
    - name: label
      type: string
      description: "16-character label (pad with spaces if shorter)"

- id: set_local_ui
  label: Set Local UI State
  kind: action
  msg: 0x17
  data_length: 3
  params:
    - name: function
      type: integer
      values: [0, 1]
      description: "0=enable/unlock, 1=disable/lock"
    - name: ui_index
      type: integer
      values: [0, 1, 2, 3, 4, 5]
      description: "0=all local controls, 1=DCT input, 2=local stimuli, 3=local radio, 4=touch motion, 5=LEDs"
    - name: priority
      type: integer
      min: 0
      max: 255
      description: Higher number = higher priority

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  msg: 0x15
  data_length: 4
  params:
    - name: function
      type: integer
      values: [0, 1, 3, 4]
      description: "0=delete IP, 1=set IP at current position, 3=set IP at %, 4=divide full range by count"
    - name: ip_index
      type: integer
      min: 1
      max: 16
      description: IP table entry index
    - name: value
      type: integer
      description: "For function 3: position %. For function 4: IP count. Ignored otherwise."

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  msg: 0x13
  data_length: 3
  params:
    - name: up_speed
      type: integer
      description: "Speed during UP movement (rpm) - see device datasheet for range"
    - name: down_speed
      type: integer
      description: "Speed during DOWN movement (rpm) - see device datasheet for range"
    - name: slow_speed
      type: integer
      description: "Speed for adjustment movements (rpm) - see device datasheet for range"
  notes: DC motors only.

- id: set_network_lock
  label: Set Network Lock
  kind: action
  msg: 0x16
  data_length: 2
  params:
    - name: function
      type: integer
      values: [0, 1, 3, 4]
      description: "0=unlock, 1=lock at current position, 3=save lock on power cycle, 4=do not save lock on power cycle"
    - name: priority
      type: integer
      min: 0
      max: 255
      description: Higher number = higher priority. Ignored for functions 3 and 4.
- id: get_node_addr
  label: Get Device NodeID
  kind: query
  msg: 0x40
  data_length: 0
  notes: Reply is POST_NODE_ADDR (60h); address is in the message header SOURCE@ field.

- id: get_group_addr
  label: Get Group Address
  kind: query
  msg: 0x41
  data_length: 1
  params:
    - name: group_index
      type: integer
      min: 0
      max: 15
      description: Entry in the group table

- id: get_node_label
  label: Get Device Label
  kind: query
  msg: 0x45
  data_length: 0
  notes: Reply is POST_NODE_LABEL (65h).

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  msg: 0x74
  data_length: 0
  notes: Reply is POST_NODE_APP_VERSION (75h).

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  msg: 0x27
  data_length: 1
  params:
    - name: ui_index
      type: integer
      min: 1
      max: 5
      description: "Refer to UI list in SET_LOCAL_UI; 01h=DCT input, 02h=local stimuli, 03h=local radio, 04h=touch motion, 05h=LEDs"

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  msg: 0x25
  data_length: 1
  params:
    - name: ip_index
      type: integer
      min: 1
      max: 16
      description: IP table entry index

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  msg: 0x23
  data_length: 0
  notes: Reply is POST_MOTOR_ROLLING_SPEED (33h). DC motors only.

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  msg: 0x26
  data_length: 0
  notes: Reply is POST_NETWORK_LOCK (36h).

- id: get_motor_position
  label: Get Motor Position
  kind: query
  msg: 0x0C
  data_length: 0
  notes: Reply is POST_MOTOR_POSITION (0Dh). Position is sent even if motor is running.

- id: get_motor_status
  label: Get Motor Status
  kind: query
  msg: 0x0E
  data_length: 0
  notes: Reply is POST_MOTOR_STATUS (0Fh).
```

## Feedbacks

```yaml
- id: post_node_addr
  label: Device NodeID Response
  msg: 0x60
  data_length: 0
  type: raw
  notes: NodeID is included in the message header (SOURCE@ field).

- id: post_group_addr
  label: Group Address Response
  msg: 0x61
  data_length: 4
  type: object
  fields:
    - name: group_index
      type: integer
      min: 0
      max: 15
    - name: group_id
      type: integer
      description: 24-bit group address

- id: post_node_app_version
  label: Firmware Version Response
  msg: 0x75
  data_length: 6
  type: object
  fields:
    - name: app_reference
      type: integer
      description: 24-bit firmware part number
    - name: app_index_letter
      type: string
      description: Firmware major revision (ASCII A-Z)
    - name: app_index_number
      type: integer
      description: Firmware revision number
    - name: reserved
      type: integer

- id: post_node_label
  label: Device Label Response
  msg: 0x65
  data_length: 16
  type: string
  description: 16-character text label

- id: post_local_ui
  label: Local UI Status Response
  msg: 0x37
  data_length: 5
  type: object
  fields:
    - name: ui_index
      type: integer
    - name: status
      type: enum
      values: [enabled, disabled]
    - name: source_addr
      type: integer
      description: NodeID of device that sent lock command
    - name: priority
      type: integer

- id: post_motor_ip
  label: Intermediate Position Response
  msg: 0x35
  data_length: 4
  type: object
  fields:
    - name: ip_index
      type: integer
      min: 1
      max: 16
    - name: ip_position_percentage
      type: integer
      min: 0
      max: 100
      description: "0xFF if IP not set"

- id: post_motor_rolling_speed
  label: Motor Speed Response
  msg: 0x33
  data_length: 3
  type: object
  fields:
    - name: up_speed
      type: integer
    - name: down_speed
      type: integer
    - name: slow_speed
      type: integer

- id: post_motor_position
  label: Motor Position Response
  msg: 0x0D
  data_length: 5
  type: object
  fields:
    - name: position_pulse
      type: integer
      description: 16-bit position in pulses
    - name: position_percentage
      type: integer
      min: 0
      max: 100
    - name: ip
      type: integer
      description: "IP index if at an intermediate position, 0xFF if not at any IP"

- id: post_motor_status
  label: Motor Status Response
  msg: 0x0F
  data_length: 4
  type: object
  fields:
    - name: status
      type: enum
      values: [stopped, running, blocked, locked]
    - name: direction
      type: enum
      values: [down, up, unknown]
    - name: source
      type: enum
      values: [internal, network, local_ui]
    - name: cause
      type: enum
      values: [target_reached, explicit_command, wink, obstacle, over_current, thermal, runtime_exceeded, timeout_exceeded, reset_powerup]

- id: post_network_lock
  label: Network Lock Status Response
  msg: 0x36
  data_length: 6
  type: object
  fields:
    - name: status
      type: enum
      values: [unlocked, locked]
    - name: source_addr
      type: integer
      description: NodeID of lock source
    - name: priority
      type: integer
    - name: saved
      type: enum
      values: [not_restored_on_power_cycle, restored_on_power_cycle]

- id: ack
  label: Acknowledgment
  msg: 0x7F
  data_length: 0
  type: raw
  notes: Sent when ACK bit is set to 1 in request.

- id: nack
  label: Negative Acknowledgment
  msg: 0x6F
  data_length: 1
  type: object
  fields:
    - name: error_code
      type: enum
      values: [data_out_of_range, unknown_message, message_length_error, busy]
      description: "0x01=data out of range, 0x10=unknown message, 0x11=message length error, 0xFF=busy"
```

## Variables

```yaml
# No continuous settable variables beyond the actions above.
# Intermediate positions, motor speed, group addresses, and labels are configured via SET commands.
```

## Events

```yaml
# UNRESOLVED: no unsolicited event/notification mechanism documented beyond ACK/NACK responses
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# Note: motor stops immediately on CTRL_STOP without ramp-down (no soft stop).
# Note: obstacle detection, over-current, and thermal protection cause automatic motor stop.
```

## Notes

- **Data bit inversion required:** All data bytes must be bitwise-NOT'd before transmission. Example: value 0x58 is transmitted as 0xA7 on the bus.
- **LSB first:** Least significant bit is sent first.
- **No sync byte:** Messages are delimited by bus inactivity. A message is detected as a bundle of bytes followed by silence.
- **Timing constraints:** Treq (master re-transmit delay) >= 10 ms; Tfree (bus free timeout) = 3 ms; Trep (slave reply delay) = 5–255 ms (randomized); Tc (inter-character gap) <= 1 ms.
- **Checksum:** Sum of all frame bytes; complement is NOT used despite the label. `CHECKSUM = ~(Byte1 + Byte2 + ... + ByteN-2)` — source states "calculated by adding the complement of every byte."
- **Addressing modes:** Point-to-point (DEST@ = specific NodeID), Group (DEST@ = 000000h, SOURCE@ = GroupID), Broadcast (DEST@ = FFFFFFh). All address fields are LSB-first.
- **ACK requested via ACK bit** in byte 2 of the frame. Highly recommended by vendor for all commands.
- **Maximum frame length:** 32 bytes (up to 21 bytes of DATA). Minimum: 11 bytes (no DATA).
- **Network lock:** Devices can be locked with priority levels. Locked devices reject movement commands (CTRL_xxx) and limit changes, returning NACK(NODE_IS_LOCKED).

<!-- UNRESOLVED: exact speed ranges for SET_MOTOR_ROLLING_SPEED are device-specific (refer to datasheet) -->
<!-- UNRESOLVED: flow control setting not documented -->
<!-- UNRESOLVED: physical connector pinout not documented -->
<!-- UNRESOLVED: meaning of additional NACK error codes beyond the four listed -->

## Provenance

```yaml
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
source_documents:
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:16.971Z
retrieved_at: 2026-04-29T08:47:16.971Z
last_checked_at: 2026-04-27T15:21:47.971Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T15:21:47.971Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 30 spec commands matched verbatim in source; transport parameters verified; full protocol coverage."
```

## Known Gaps

```yaml
[]
```
