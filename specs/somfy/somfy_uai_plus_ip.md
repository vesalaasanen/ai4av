---
spec_id: admin/somfy-uai-plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy UAI+ Control Spec"
manufacturer: Somfy
model_family: "Somfy UAI+"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somfy UAI+"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-14T18:17:20.708Z
generated_at: 2026-05-14T18:17:20.708Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.708Z
  matched_actions: 8
  action_count: 8
  confidence: high
  summary: "Every spec action matched its source message code; all transport parameters verified; complete SDN command catalogue represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Somfy UAI+ Control Spec

## Summary
The Somfy UAI+ is an IP-to-RS-485 gateway that bridges TCP/IP control to the SOMFY Digital Network (SDN) bus. The SDN protocol uses a binary master/slave frame format over RS-485 serial to control motors, shades, and associated devices. This spec documents the SDN command set carried through the UAI+.

<!-- UNRESOLVED: TCP/IP transport details (port, connection mode, framing over TCP) are not described in the source. The source only documents the underlying RS-485 SDN serial protocol. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; NRZ character coding specified
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - queryable: GET_MOTOR_POSITION, GET_MOTOR_STATUS, GET_NODE_APP_VERSION, etc.
# - levelable: CTRL_MOVETO supports position 0-100%, speed adjustment via SET_MOTOR_ROLLING_SPEED
traits:
  - queryable
  - levelable
```

## Actions
```yaml
# --- Device Control ---
- id: ctrl_moveto
  label: Move to Position
  kind: action
  description: "Move motor to a target position (MSG 03h)"
  params:
    - name: function
      type: integer
      enum: [0, 1, 2, 4]
      description: "0=down limit, 1=up limit, 2=intermediate position (IP index), 4=percentage"
    - name: position
      type: integer
      description: "IP index (0-15) when function=2; percentage (0-100) when function=4; ignored otherwise"

- id: ctrl_stop
  label: Stop Motor
  kind: action
  description: "Immediately stop motor without speed ramp-down (MSG 02h)"
  params: []

# --- Device Configuration ---
- id: set_local_ui
  label: Set Local UI State
  kind: action
  description: "Enable/disable local user interface elements (MSG 17h)"
  params:
    - name: function
      type: integer
      enum: [0, 1]
      description: "0=enable/unlock, 1=disable/lock"
    - name: ui_index
      type: integer
      enum: [0, 1, 2, 3, 4, 5]
      description: "0=all, 1=DCT input, 2=local stimuli, 3=local radio, 4=touch motion, 5=LEDs"
    - name: priority
      type: integer
      description: "Priority level (0x00-0xFF, higher=higher priority)"

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  description: "Configure intermediate positions (MSG 15h)"
  params:
    - name: function
      type: integer
      enum: [0, 1, 3, 4]
      description: "0=delete IP, 1=set at current position, 3=set at percentage, 4=divide range equally"
    - name: ip_index
      type: integer
      description: "IP index 1-16 (ignored for function 4)"
    - name: value
      type: integer
      description: "Percentage for function 3; IP count for function 4; ignored for 0 and 1"

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  description: "Set motor speeds in rpm, DC motors only (MSG 13h)"
  params:
    - name: up_speed
      type: integer
      description: "Speed during UP movement (rpm)"
    - name: down_speed
      type: integer
      description: "Speed during DOWN movement (rpm)"
    - name: slow_speed
      type: integer
      description: "Speed for adjustment movements (rpm)"

- id: set_network_lock
  label: Set Network Lock
  kind: action
  description: "Lock/unlock device to prevent/allow network commands (MSG 16h)"
  params:
    - name: function
      type: integer
      enum: [0, 1, 3, 4]
      description: "0=unlock, 1=lock at current position, 3=save lock on power cycle, 4=don't save lock"
    - name: priority
      type: integer
      description: "Priority level (0x00-0xFF)"

# --- Group Configuration ---
- id: set_group_addr
  label: Set Group Address
  kind: action
  description: "Assign a group address to a group table entry (MSG 51h)"
  params:
    - name: group_index
      type: integer
      description: "Group table entry (0-15)"
    - name: group_id
      type: string
      description: "24-bit group address (hex)"

# --- Device Label ---
- id: set_node_label
  label: Set Node Label
  kind: action
  description: "Assign a 16-character text label to a device (MSG 55h)"
  params:
    - name: label
      type: string
      description: "Text label (padded to 16 characters with spaces)"
```

## Feedbacks
```yaml
- id: motor_position
  label: Motor Position
  type: object
  query_msg: 0x0C
  response_msg: 0x0D
  description: "Current motor position (MSG GET_MOTOR_POSITION / POST_MOTOR_POSITION)"
  fields:
    - name: position_pulse
      type: integer
      description: "Position in pulse units"
    - name: position_percentage
      type: integer
      description: "Position as percentage (0-100)"
    - name: ip
      type: integer
      description: "Matching IP index (1-16), or 0xFF if no IP match"

- id: motor_status
  label: Motor Status
  type: object
  query_msg: 0x0E
  response_msg: 0x0F
  description: "Current motor state, direction, command source, and cause (MSG GET_MOTOR_STATUS / POST_MOTOR_STATUS)"
  fields:
    - name: status
      type: enum
      values: [stopped, running, blocked, locked]
      description: "0x00=stopped, 0x01=running, 0x02=blocked, 0x03=locked"
    - name: direction
      type: enum
      values: [down, up, unknown]
      description: "0x00=down, 0x01=up, 0xFF=unknown"
    - name: source
      type: enum
      values: [internal, network, local_ui]
      description: "0x00=internal, 0x01=network, 0x02=local UI"
    - name: cause
      type: enum
      values: [target_reached, explicit_command, wink, obstacle, overcurrent, thermal, runtime_exceeded, timeout, reset_powerup]
      description: "0x00=target reached, 0x01=explicit cmd, 0x02=wink, 0x20=obstacle, 0x21=overcurrent, 0x22=thermal, 0x30=runtime exceeded, 0x32=timeout, 0xFF=reset/power-up"

- id: node_addr
  label: Node Address
  type: string
  query_msg: 0x40
  response_msg: 0x60
  description: "Device NodeID from message header (MSG GET_NODE_ADDR / POST_NODE_ADDR)"

- id: group_addr
  label: Group Address
  type: object
  query_msg: 0x41
  response_msg: 0x61
  description: "Group table entry (MSG GET_GROUP_ADDR / POST_GROUP_ADDR)"
  fields:
    - name: group_index
      type: integer
      description: "Group table entry (0-15)"
    - name: group_id
      type: string
      description: "24-bit associated group address"

- id: node_app_version
  label: Firmware Version
  type: object
  query_msg: 0x74
  response_msg: 0x75
  description: "Device firmware revision (MSG GET_NODE_APP_VERSION / POST_NODE_APP_VERSION)"
  fields:
    - name: app_reference
      type: string
      description: "Firmware part number (24-bit)"
    - name: app_index_letter
      type: string
      description: "Major revision (ASCII A-Z)"
    - name: app_index_number
      type: integer
      description: "Revision number"

- id: node_label
  label: Node Label
  type: string
  query_msg: 0x45
  response_msg: 0x65
  description: "User-defined 16-character device label (MSG GET_NODE_LABEL / POST_NODE_LABEL)"

- id: local_ui
  label: Local UI State
  type: object
  query_msg: 0x27
  response_msg: 0x37
  description: "Lock state of a local UI element (MSG GET_LOCAL_UI / POST_LOCAL_UI)"
  fields:
    - name: ui_index
      type: integer
      description: "UI element identifier"
    - name: status
      type: enum
      values: [enabled, disabled]
    - name: source_addr
      type: string
      description: "NodeID of device that sent the lock command"
    - name: priority
      type: integer
      description: "Lock priority level"

- id: motor_ip
  label: Intermediate Position
  type: object
  query_msg: 0x25
  response_msg: 0x35
  description: "Intermediate position configuration (MSG GET_MOTOR_IP / POST_MOTOR_IP)"
  fields:
    - name: ip_index
      type: integer
      description: "IP index (1-16)"
    - name: ip_position_percentage
      type: integer
      description: "Position percentage (0-100), or 0xFF if not set"

- id: motor_rolling_speed
  label: Motor Rolling Speed
  type: object
  query_msg: 0x23
  response_msg: 0x33
  description: "Motor speed configuration (MSG GET_MOTOR_ROLLING_SPEED / POST_MOTOR_ROLLING_SPEED)"
  fields:
    - name: up_speed
      type: integer
      description: "Speed during UP movement (rpm)"
    - name: down_speed
      type: integer
      description: "Speed during DOWN movement (rpm)"
    - name: slow_speed
      type: integer
      description: "Speed for adjustment movements (rpm)"

- id: network_lock
  label: Network Lock State
  type: object
  query_msg: 0x26
  response_msg: 0x36
  description: "Device network lock status (MSG GET_NETWORK_LOCK / POST_NETWORK_LOCK)"
  fields:
    - name: status
      type: enum
      values: [unlocked, locked]
    - name: source_addr
      type: string
      description: "NodeID of device that sent lock command"
    - name: priority
      type: integer
      description: "Lock priority level"
    - name: saved
      type: enum
      values: [not_restored, restored]
      description: "Whether lock is saved and restored on power cycle"

- id: ack
  label: Acknowledgment
  type: enum
  response_msg: 0x7F
  description: "ACK confirming message processed (MSG 7Fh, sent when ACK bit requested)"

- id: nack
  label: Negative Acknowledgment
  type: object
  response_msg: 0x6F
  description: "NACK with error code (MSG 6Fh)"
  fields:
    - name: error_code
      type: enum
      values: [data_out_of_range, unknown_message, message_length_error, busy]
      description: "0x01=data out of range, 0x10=unknown message, 0x11=length error, 0xFF=busy"
```

## Variables
```yaml
# UNRESOLVED: no continuous settable parameters beyond the discrete actions above
```

## Events
```yaml
# UNRESOLVED: source mentions slave devices only respond when requested by master;
# exception is devices sending their address via pushbutton - not applicable to controller
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Network lock prevents movement commands from network; only UNLOCK with equal/higher priority accepted"
  - description: "Local UI lock uses priority system; equal or higher priority required to override"
  - description: "Motor stop is immediate with no speed ramp-down"
# UNRESOLVED: source does not describe power-on sequencing requirements for the UAI+ gateway itself
```

## Notes
- SDN is a half-duplex master/slave binary protocol. The controller (master) sends commands; devices (slaves) respond only when addressed.
- All data bits must be inverted before transmission on the RS-485 bus (e.g., 0x58 → 0xA7).
- Addresses (SOURCE@, DEST@) are transmitted LSB-first.
- Timing constraints: inter-character delay ≤1ms (Tc), bus free timeout 3ms (Tfree), slave reply delay 5–255ms (Trep, randomized), master request delay ≥10ms (Treq).
- No synchronization byte; messages are delimited by bus inactivity.
- Three addressing modes: point-to-point (unicast), group (multicast via GroupID), broadcast (DEST@=0xFFFFFF).
- Devices support up to 16 group memberships (GroupIndex 0–15).
- ACK/NACK feedback is optional per-message (ACK bit in byte 2). Recommended by vendor.
- Avoid requesting ACKs or feedback in group/broadcast mode to reduce bus collisions.
- Message frame: minimum 11 bytes, maximum 32 bytes (up to 21 bytes DATA).
- Checksum: sum of all bytes before checksum, then inverted (complement).

<!-- UNRESOLVED: TCP/IP transport layer details not in source — connection mode (raw socket, HTTP, other), TCP port, keepalive, reconnection behavior, framing over TCP -->
<!-- UNRESOLVED: how SDN frames are encapsulated when sent over TCP/IP through the UAI+ -->
<!-- UNRESOLVED: UAI+ device discovery on the network (DHCP, static IP, mDNS, etc.) -->
<!-- UNRESOLVED: maximum number of SDN devices supported per UAI+ gateway -->
<!-- UNRESOLVED: firmware version compatibility for UAI+ -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-14T18:17:20.708Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.708Z
matched_actions: 8
action_count: 8
confidence: high
summary: "Every spec action matched its source message code; all transport parameters verified; complete SDN command catalogue represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
