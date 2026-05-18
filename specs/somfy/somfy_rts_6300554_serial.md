---
spec_id: admin/somfy-rts-6300554-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy RTS 6300554 Control Spec"
manufacturer: Somfy
model_family: "RTS 6300554"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "RTS 6300554"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-17T00:08:18.462Z
generated_at: 2026-05-17T00:08:18.462Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-17T00:08:18.462Z
  matched_actions: 21
  action_count: 21
  confidence: high
  summary: "All 21 actions matched exactly to source message codes; transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Somfy RTS 6300554 Control Spec

## Summary

The Somfy RTS 6300554 is an RS-485 motor controller that implements the SOMFY Digital Network (SDN) protocol for bi-directional serial communication with Somfy RS-485 motorized blind and shade products. This spec covers the SDN serial protocol (half-duplex RS-485 at 4800 baud) including device control, status query, configuration, and group management commands. The protocol uses a binary framed message structure with checksum; all data bits must be inverted before transmission per the SDN specification.

<!-- UNRESOLVED: Source document (DOC155888/000, November 2019) is a protocol integration guide covering the full SDN product family; not all NodeType product variants may share identical feature sets. -->

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- routable    # inferred from CTRL_MOVETO command with position/IP targeting
- queryable   # inferred from GET_MOTOR_POSITION and GET_MOTOR_STATUS query commands
- levelable   # inferred from position-percentage control (0-100%) and motor speed adjustment
```

## Actions

```yaml
- id: ctrl_moveto_down_limit
  label: Move to Down Limit
  kind: action
  description: "MSG 03h, Function 00h. Move motor to DOWN limit. Position field is ignored."
  params: []

- id: ctrl_moveto_up_limit
  label: Move to Up Limit
  kind: action
  description: "MSG 03h, Function 01h. Move motor to UP limit. Position field is ignored."
  params: []

- id: ctrl_moveto_ip
  label: Move to Intermediate Position
  kind: action
  description: "MSG 03h, Function 02h. Move motor to a stored intermediate position."
  params:
    - name: ip_index
      type: integer
      description: "Intermediate Position index (0 to 15)"

- id: ctrl_moveto_percentage
  label: Move to Position by Percentage
  kind: action
  description: "MSG 03h, Function 04h. Move motor to a specified percentage of full travel range."
  params:
    - name: position_percent
      type: integer
      description: "Position as percentage of full travel range (0 to 100)"

- id: ctrl_stop
  label: Stop Motor
  kind: action
  description: "MSG 02h. Immediately stop the motor without speed ramp-down."
  params: []

- id: set_node_label
  label: Set Node Label
  kind: action
  description: "MSG 55h. Assign a 16-character text label to the device for identification. Pad with spaces if shorter."
  params:
    - name: label
      type: string
      description: "16-character ASCII label (padded with spaces)"

- id: set_group_addr
  label: Set Group Address
  kind: action
  description: "MSG 51h. Assign a GroupID to a group table entry on the device."
  params:
    - name: group_index
      type: integer
      description: "Entry in the group table (0 to 15)"
    - name: group_id
      type: integer
      description: "24-bit group address to assign"

- id: set_local_ui
  label: Set Local UI State
  kind: action
  description: "MSG 17h. Enable or disable local user interface items (buttons, LEDs, DCT, Bluetooth)."
  params:
    - name: function
      type: integer
      description: "00h = Enable/Unlock, 01h = Disable/Lock"
    - name: ui_index
      type: integer
      description: "00h=All, 01h=DCT, 02h=Local stimuli, 03h=Local Radio, 04h=Touch Motion, 05h=LEDs"
    - name: priority
      type: integer
      description: "Lock priority level (0x00 to 0xFF); higher value = higher priority"

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  description: "MSG 15h. Set, delete, or divide intermediate positions for the motor."
  params:
    - name: function
      type: integer
      description: "00h=Delete IP, 01h=Set at current position, 03h=Set at specified %, 04h=Divide range"
    - name: ip_index
      type: integer
      description: "Intermediate Position index (1 to 16)"
    - name: value
      type: integer
      description: "16-bit value: position percentage for Function 03h, or IP count for Function 04h"

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  description: "MSG 13h. Set UP, DOWN, and slow adjustment speeds for DC motors. Valid range per device datasheet."
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
  description: "MSG 16h. Lock or unlock network commands to the device with a priority level."
  params:
    - name: function
      type: integer
      description: "00h=Unlock, 01h=Lock, 03h=Save lock on power cycle, 04h=Do not save lock"
    - name: priority
      type: integer
      description: "Lock priority level (0x00 to 0xFF); ignored for functions 03h and 04h"

- id: get_node_addr
  label: Get Node Address
  kind: action
  description: "MSG 40h. Request devices to report their NodeID (broadcast use). Device replies with POST_NODE_ADDR (60h)."
  params: []

- id: get_group_addr
  label: Get Group Address
  kind: action
  description: "MSG 41h. Request group table entry from a device. Device replies with POST_GROUP_ADDR (61h)."
  params:
    - name: group_index
      type: integer
      description: "Entry in the group table (0 to 15)"

- id: get_node_app_version
  label: Get Firmware Version
  kind: action
  description: "MSG 74h. Request firmware part number and revision. Device replies with POST_NODE_APP_VERSION (75h)."
  params: []

- id: get_node_label
  label: Get Node Label
  kind: action
  description: "MSG 45h. Request the device text label. Device replies with POST_NODE_LABEL (65h)."
  params: []

- id: get_local_ui
  label: Get Local UI State
  kind: action
  description: "MSG 27h. Request the current state of a local UI item. Device replies with POST_LOCAL_UI (37h)."
  params:
    - name: ui_index
      type: integer
      description: "UI item index (01h to UI_MAX; see SET_LOCAL_UI for values)"

- id: get_motor_ip
  label: Get Intermediate Position
  kind: action
  description: "MSG 25h. Request intermediate position value for a given index. Device replies with POST_MOTOR_IP (35h)."
  params:
    - name: ip_index
      type: integer
      description: "Intermediate Position index (1 to 16)"

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: action
  description: "MSG 23h. Request current speed settings for the motor. Device replies with POST_MOTOR_ROLLING_SPEED (33h)."
  params: []

- id: get_network_lock
  label: Get Network Lock State
  kind: action
  description: "MSG 26h. Request network lock status. Device replies with POST_NETWORK_LOCK (36h)."
  params: []

- id: get_motor_position
  label: Get Motor Position
  kind: action
  description: "MSG 0Ch. Request current motor position (pulse count, percentage, and IP). Device replies with POST_MOTOR_POSITION (0Dh)."
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: action
  description: "MSG 0Eh. Request current motor status, direction, last command source, and cause. Device replies with POST_MOTOR_STATUS (0Fh)."
  params: []
```

## Feedbacks

```yaml
- id: post_node_addr
  label: Node Address Report
  type: binary_frame
  description: "MSG 60h (POST_NODE_ADDR). Reports device NodeID. Address included in message header; no DATA payload."

- id: post_group_addr
  label: Group Address Report
  type: object
  description: "MSG 61h (POST_GROUP_ADDR). Reports GroupIndex and 24-bit GroupID for a requested group table entry."
  fields:
    - name: group_index
      type: integer
      description: "Group table entry index (0 to 15)"
    - name: group_id
      type: integer
      description: "24-bit group address"

- id: post_node_app_version
  label: Firmware Version Report
  type: object
  description: "MSG 75h (POST_NODE_APP_VERSION). Reports firmware part number (24-bit), major revision letter, and revision number."
  fields:
    - name: app_reference
      type: integer
      description: "24-bit firmware part number"
    - name: app_index_letter
      type: string
      description: "ASCII major revision letter (41h–5Ah = A–Z)"
    - name: app_index_number
      type: integer
      description: "Firmware revision number"

- id: post_node_label
  label: Node Label Report
  type: string
  description: "MSG 65h (POST_NODE_LABEL). Reports the 16-character ASCII text label assigned to the device."

- id: post_local_ui
  label: Local UI State Report
  type: object
  description: "MSG 37h (POST_LOCAL_UI). Reports the enabled/locked state, locking source NodeID, and priority of a local UI item."
  fields:
    - name: status
      type: enum
      values: [enabled, disabled]
      description: "00h=Enabled/Unlocked, 01h=Disabled/Locked"
    - name: source_addr
      type: integer
      description: "NodeID of the device that issued the lock (000000h when unlocked)"
    - name: priority
      type: integer
      description: "Lock priority (0x00 when unlocked)"

- id: post_motor_ip
  label: Intermediate Position Report
  type: object
  description: "MSG 35h (POST_MOTOR_IP). Reports the position percentage for a requested intermediate position index."
  fields:
    - name: ip_index
      type: integer
      description: "Intermediate Position index (1 to 16)"
    - name: ip_position_percentage
      type: integer
      description: "Position as percentage (0–100); FFh if IP is not set"

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Report
  type: object
  description: "MSG 33h (POST_MOTOR_ROLLING_SPEED). Reports current UP, DOWN, and slow adjustment speeds."
  fields:
    - name: up_speed
      type: integer
      description: "Current UP movement speed"
    - name: down_speed
      type: integer
      description: "Current DOWN movement speed"
    - name: slow_speed
      type: integer
      description: "Current adjustment movement speed"

- id: post_network_lock
  label: Network Lock State Report
  type: object
  description: "MSG 36h (POST_NETWORK_LOCK). Reports network lock status, locking source, priority, and persistence setting."
  fields:
    - name: status
      type: enum
      values: [unlocked, locked]
      description: "00h=Unlocked, 01h=Locked"
    - name: source_addr
      type: integer
      description: "NodeID of the device that issued the lock (000000h when unlocked)"
    - name: priority
      type: integer
      description: "Lock priority level"
    - name: saved
      type: enum
      values: [not_saved, saved]
      description: "00h=Lock not restored on power cycle, 01h=Lock restored on power cycle"

- id: post_motor_position
  label: Motor Position Report
  type: object
  description: "MSG 0Dh (POST_MOTOR_POSITION). Reports current motor position in pulses, percentage, and active IP index. Returned even if motor is running."
  fields:
    - name: position_pulse
      type: integer
      description: "16-bit pulse position between UP_LIMIT and DOWN_LIMIT"
    - name: position_percentage
      type: integer
      description: "Position as percentage (0–100)"
    - name: ip
      type: integer
      description: "Active intermediate position index (01h–IP_MAX); FFh if no IP matches"

- id: post_motor_status
  label: Motor Status Report
  type: object
  description: "MSG 0Fh (POST_MOTOR_STATUS). Reports motor run state, movement direction, last command source, and cause."
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
      description: "00h=Target reached, 01h=Explicit command, 02h=Wink, 20h=Obstacle, 21h=Over-current, 22h=Thermal, 30h=Runtime exceeded, 32h=Timeout, FFh=Reset/PowerUp"

- id: ack
  label: Acknowledgement
  type: binary_frame
  description: "MSG 7Fh (ACK). Sent by SLAVE when ACK bit is set in request and message is processed successfully. No DATA payload."

- id: nack
  label: Negative Acknowledgement
  type: object
  description: "MSG 6Fh (NACK). Sent by SLAVE when ACK is requested but an error is detected."
  fields:
    - name: error_code
      type: enum
      values: [data_out_of_range, unknown_message, message_length_error, busy]
      description: "01h=Data out of range, 10h=Unknown message, 11h=Message length error, FFh=Busy"
```

## Variables

```yaml
- id: node_label
  label: Node Label
  type: string
  description: "16-character ASCII text label for device identification. Read via GET_NODE_LABEL; set via SET_NODE_LABEL."

- id: motor_ip_positions
  label: Intermediate Positions
  type: array
  description: "Up to 16 stored intermediate positions (by percentage). Read via GET_MOTOR_IP; set via SET_MOTOR_IP."

- id: motor_rolling_speed
  label: Motor Rolling Speed
  type: object
  description: "UP, DOWN, and slow adjustment speeds for DC motors. Read via GET_MOTOR_ROLLING_SPEED; set via SET_MOTOR_ROLLING_SPEED. Valid range per device datasheet."

- id: group_table
  label: Group Table
  type: array
  description: "Up to 16 group table entries (GroupIndex / GroupID pairs). Read via GET_GROUP_ADDR; set via SET_GROUP_ADDR."

- id: network_lock
  label: Network Lock
  type: object
  description: "Network lock state, priority, source, and persistence. Read via GET_NETWORK_LOCK; set via SET_NETWORK_LOCK."

- id: local_ui_state
  label: Local UI State
  type: object
  description: "Enable/disable state per UI item (DCT, stimuli, radio, touch, LEDs). Read via GET_LOCAL_UI; set via SET_LOCAL_UI."
```

## Events

```yaml
# UNRESOLVED: The SDN source document mentions that some devices can send their address
# via POST_NODE_ADDR without a MASTER request (triggered by a pushbutton on the device),
# but no further unsolicited event types are defined in the source.
- id: spontaneous_node_addr
  label: Spontaneous Node Address Broadcast
  type: binary_frame
  description: "Some SDN devices may transmit POST_NODE_ADDR (60h) without a master request when a pushbutton is activated on the device. No DATA payload; NodeID is in the message header."
```

## Macros

```yaml
# UNRESOLVED: No multi-step macro sequences described in source. Remove this section if not applicable.
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: "When NETWORK_LOCK is active (SET_NETWORK_LOCK function 01h), all movement commands (CTRL_XXX, SET_MOTOR_LIMITS, SET_TILT_LIMITS) are rejected with NACK (NODE_IS_LOCKED) unless the command carries an equal or higher priority level."
  - description: "Motor status 02h (Blocked) indicates thermal protection or obstacle detection has prevented movement."
  - description: "Setting an intermediate position outside the motor travel limits is not permitted; device returns NACK."
```

## Notes

**SDN Protocol framing:** All messages follow a fixed binary frame structure (minimum 11 bytes): MSG (1 byte) | ACK/LEN (1 byte) | NODE_TYPE (1 byte) | reserved (1 byte) | SOURCE@ (3 bytes) | DEST@ (3 bytes) | DATA (0–21 bytes) | CHECKSUM (2 bytes). The checksum is computed as the two-byte complement sum of all preceding bytes.

**Data inversion requirement (critical):** Per the SDN specification, all data bits must be inverted before transmission. Example: byte 0x58 must be sent as 0xA7. Failure to invert bits will result in communication failure.

**Addressing:** SOURCE@ and DEST@ are 24-bit values transmitted in little-endian (LSBF) byte order. Three addressing modes are supported: point-to-point (DEST@ = target NodeID), group (SOURCE@ = GroupID, DEST@ = 000000h), and broadcast (DEST@ = FFFFFFh).

**Bus timing:** After any bus activity the MASTER must wait at least Treq (10 ms minimum) before transmitting. SLAVE devices reply after a Trep delay (5–255 ms, partially randomized). Inter-character gap must not exceed Tc (1 ms maximum).

**Collision avoidance:** Avoid requesting ACK or status replies in group or broadcast addressing modes; collisions on the RS-485 half-duplex bus may prevent all replies from being received.

**Motor speed adjustment:** SET_MOTOR_ROLLING_SPEED and GET_MOTOR_ROLLING_SPEED are only applicable to DC motor variants. Speed ranges and defaults vary by device model; consult the device-specific technical datasheet.

**NodeType values:** The source defines NodeType identifiers: 02h (Ø30 DC Series RS485), 05h (RS485 RTS transmitter), 06h (Glydea RS485), 07h (Ø50 AC Series RS485), 08h (Ø50 DC Series RS485), 09h (Ø40 AC Series RS485, not yet available at time of publication).

<!-- UNRESOLVED: The source is a generic SDN protocol guide (DOC155888/000); device-specific speed ranges, limit configurations, and NodeType-specific feature availability require per-model technical datasheets not included in this source. -->
<!-- UNRESOLVED: RS-485 electrical interface details (termination, cable length, bias resistors) are not covered in this source document. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-17T00:08:18.462Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-17T00:08:18.462Z
matched_actions: 21
action_count: 21
confidence: high
summary: "All 21 actions matched exactly to source message codes; transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
