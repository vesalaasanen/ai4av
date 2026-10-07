---
spec_id: admin/somfy-urtsi-ii-iptoserial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy URTSI II IPToSerial Control Spec"
manufacturer: Somfy
model_family: "URTSI II IPToSerial"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "URTSI II IPToSerial"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-25T00:10:37.585Z
last_checked_at: 2026-10-07T12:55:13.940Z
generated_at: 2026-10-07T12:55:13.940Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes RS-485; input identifies RS-232C gateway interface details not provided"
  - "device-specific power-on sequencing not stated"
  - "literal complete frame bytes require runtime SOURCE@, DEST@, ACK/LEN, data values, and checksum"
  - "URTSI II IP-to-serial gateway-specific network addressing and IP transport configuration not stated"
  - "firmware compatibility range not stated"
  - "motor-specific speed ranges require device technical datasheet"
  - "voltage, current, and power specifications not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:55:13.940Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 actions and the serial parameters match the source SDN message set; the source never names the URTSI II, so device applicability is unconfirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Somfy URTSI II IPToSerial Control Spec

## Summary
SOMFY Digital Network (SDN) protocol integration guide for Somfy URTSI II IPToSerial. Source documents half-duplex RS-485 serial communication between MASTER and SLAVE devices. Supports point-to-point, group, broadcast, and NodeType addressing.

<!-- UNRESOLVED: source describes RS-485; input identifies RS-232C gateway interface details not provided -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: UNRESOLVED
auth:
  type: UNRESOLVED
```

## Traits
```yaml
- powerable  # inferred: motor movement controls present
- routable   # inferred: point-to-point, group, and broadcast addressing present
- queryable  # inferred: GET messages returning POST status/configuration present
- levelable  # inferred: position percentage control present
```

## Actions
```yaml
- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "GET_NODE_ADDR (40h)"
  params: []

- id: post_node_addr
  label: Post Node Address
  kind: action
  command: "POST_NODE_ADDR (60h)"
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "SET_GROUP_ADDR (51h)"
  params:
    - name: group_index
      type: integer
      description: Group table entry, 0-15
    - name: group_id
      type: integer
      description: 24-bit group address

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "GET_GROUP_ADDR (41h)"
  params:
    - name: group_index
      type: integer
      description: Group table entry, 0-15

- id: post_group_addr
  label: Post Group Address
  kind: action
  command: "POST_GROUP_ADDR (61h)"
  params:
    - name: group_index
      type: integer
      description: Group table entry, 0-15
    - name: group_id
      type: integer
      description: 24-bit group address

- id: ack
  label: Acknowledgment
  kind: action
  command: "ACK (7Fh)"
  params: []

- id: nack
  label: Negative Acknowledgment
  kind: action
  command: "NACK (6Fh)"
  params:
    - name: error_code
      type: integer
      description: "01h=data out of range; 10h=unknown message; 11h=message length error; FFh=busy"

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  command: "GET_NODE_APP_VERSION (74h)"
  params: []

- id: post_node_app_version
  label: Post Firmware Revision
  kind: action
  command: "POST_NODE_APP_VERSION (75h)"
  params: []

- id: set_node_label
  label: Set Node Label
  kind: action
  command: "SET_NODE_LABEL (55h)"
  params:
    - name: label
      type: string
      description: 16-character text label; pad shorter values with spaces

- id: get_node_label
  label: Get Node Label
  kind: query
  command: "GET_NODE_LABEL (45h)"
  params: []

- id: post_node_label
  label: Post Node Label
  kind: action
  command: "POST_NODE_LABEL (65h)"
  params: []

- id: set_local_ui
  label: Set Local UI Lock
  kind: action
  command: "SET_LOCAL_UI (17h)"
  params:
    - name: function
      type: integer
      description: "00h=Enable/Unlock; 01h=Disable/Lock"
    - name: ui_index
      type: integer
      description: "00h=all; 01h=DCT; 02h=local stimuli; 03h=local radio; 04h=Touch Motion; 05h=LEDs"
    - name: priority
      type: integer
      description: Priority, 0-255; greater number indicates higher priority

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  command: "GET_LOCAL_UI (27h)"
  params:
    - name: ui_index
      type: integer
      description: UI index, 01h through UI_MAX

- id: post_local_ui
  label: Post Local UI Status
  kind: action
  command: "POST_LOCAL_UI (37h)"
  params: []

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "SET_MOTOR_IP (15h)"
  params:
    - name: function
      type: integer
      description: "00h=Delete IP; 01h=set at current position; 03h=set specified percentage; 04h=divide full range with the given IP count"
    - name: ip_index
      type: integer
      description: "IP index, 1-16; ignored for function 04h"
    - name: value
      type: integer
      description: "16-bit value; ignored for functions 00h and 01h; percentage for function 03h; IP count for function 04h"

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "GET_MOTOR_IP (25h)"
  params:
    - name: ip_index
      type: integer
      description: IP index, 1-16

- id: post_motor_ip
  label: Post Intermediate Position
  kind: action
  command: "POST_MOTOR_IP (35h)"
  params: []

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "SET_MOTOR_ROLLING_SPEED (13h)"
  params:
    - name: up_speed
      type: integer
      description: Speed during UP movement, rpm; range depends on motor technical datasheet
    - name: down_speed
      type: integer
      description: Speed during DOWN movement, rpm; range depends on motor technical datasheet
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements, rpm; range depends on motor technical datasheet

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "GET_MOTOR_ROLLING_SPEED (23h)"
  params: []

- id: post_motor_rolling_speed
  label: Post Motor Rolling Speed
  kind: action
  command: "POST_MOTOR_ROLLING_SPEED (33h)"
  params: []

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "SET_NETWORK_LOCK (16h)"
  params:
    - name: function
      type: integer
      description: "00h=Unlock; 01h=Lock; 03h=save on power cycle; 04h=do not save"
    - name: priority
      type: integer
      description: Priority, 0-255

- id: get_network_lock
  label: Get Network Lock
  kind: query
  command: "GET_NETWORK_LOCK (26h)"
  params: []

- id: post_network_lock
  label: Post Network Lock
  kind: action
  command: "POST_NETWORK_LOCK (36h)"
  params: []

- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "CTRL_MOVETO (03h)"
  params:
    - name: function
      type: integer
      description: "00h=DOWN limit; 01h=UP limit; 02h=intermediate position; 04h=position percentage"
    - name: position
      type: integer
      description: "Function-dependent: ignored for limits; IP index 0-15 for function 02h; percentage 0-100 for function 04h"
    - name: reserved
      type: integer
      description: Reserved byte

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "CTRL_STOP (02h)"
  params:
    - name: reserved
      type: integer
      description: Reserved byte

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "GET_MOTOR_POSITION (0Ch)"
  params: []

- id: post_motor_position
  label: Post Motor Position
  kind: action
  command: "POST_MOTOR_POSITION (0Dh)"
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "GET_MOTOR_STATUS (0Eh)"
  params: []

- id: post_motor_status
  label: Post Motor Status
  kind: action
  command: "POST_MOTOR_STATUS (0Fh)"
  params: []
```

## Feedbacks
```yaml
- id: motor_position
  label: Motor Position
  type: object
  fields:
    - name: position_pulse
      type: integer
      description: Position between UP_LIMIT and DOWN_LIMIT
    - name: position_percentage
      type: integer
      description: Position, 0-100%
    - name: reserved
      type: integer
    - name: ip_index
      type: integer
      description: Matching intermediate position index, 1-IP_MAX; FFh if no match

- id: motor_status
  label: Motor Status
  type: object
  fields:
    - name: status
      type: enum
      values: ["00h: Stopped", "01h: Running", "02h: Blocked", "03h: Locked"]
    - name: direction
      type: enum
      values: ["00h: Going DOWN", "01h: Going UP", "FFh: Unknown"]
    - name: source
      type: enum
      values: ["00h: Internal", "01h: Network message", "02h: Local UI"]
    - name: cause
      type: enum
      values:
        - "00h: Target reached"
        - "01h: Explicit command"
        - "02h: WINK"
        - "20h: Obstacle detection"
        - "21h: Over-current protection"
        - "22h: Thermal protection"
        - "30h: Run time exceeded"
        - "32h: Timeout exceeded"
        - "FFh: Reset / Power Up"

- id: node_address
  label: Node Address
  type: object
  fields:
    - name: node_id
      type: integer
      description: 24-bit NodeID; programmed during manufacture and cannot be changed

- id: group_address
  label: Group Address
  type: object
  fields:
    - name: group_index
      type: integer
      description: Group table entry, 0-15
    - name: group_id
      type: integer
      description: 24-bit group address

- id: node_app_version
  label: Firmware Version
  type: object
  fields:
    - name: app_reference
      type: integer
      description: 24-bit firmware part number
    - name: app_index_letter
      type: string
      description: Firmware major revision, ASCII 41h-5Ah
    - name: app_index_number
      type: integer
      description: Firmware revision number
    - name: reserved
      type: integer

- id: node_label
  label: Node Label
  type: string
  description: 16-character text label

- id: local_ui_status
  label: Local UI Status
  type: object
  fields:
    - name: ui_index
      type: integer
    - name: status
      type: enum
      values: ["00h: Enabled/Unlocked", "01h: Disabled/Locked"]
    - name: source_addr
      type: integer
      description: NodeID of device that sent lock command
    - name: priority
      type: integer
      description: Priority, 0-255

- id: motor_ip
  label: Intermediate Position
  type: object
  fields:
    - name: ip_index
      type: integer
      description: IP index, 1-16
    - name: reserved
      type: integer
    - name: ip_position_percentage
      type: integer
      description: Position, 0-100%; FFh if IP not set

- id: motor_rolling_speed
  label: Motor Rolling Speed
  type: object
  fields:
    - name: up_speed
      type: integer
      description: Speed during UP movement, rpm
    - name: down_speed
      type: integer
      description: Speed during DOWN movement, rpm
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements, rpm

- id: network_lock_status
  label: Network Lock Status
  type: object
  fields:
    - name: status
      type: enum
      values: ["00h: Unlocked", "01h: Locked"]
    - name: source_addr
      type: integer
      description: NodeID of device that sent lock command
    - name: priority
      type: integer
    - name: saved
      type: enum
      values: ["00h: Will not restore", "01h: Will restore on power cycle"]

- id: ack
  label: Acknowledgment
  type: enum
  values: ["ACK received"]

- id: nack
  label: Negative Acknowledgment
  type: object
  fields:
    - name: error_code
      type: enum
      values:
        - "01h: Data out of range"
        - "10h: Unknown message"
        - "11h: Message Length Error"
        - "FFh: Busy - Cannot process message"
```

## Variables
```yaml
# No standalone settable parameters; all parameters are action parameters or feedback fields.
```

## Events
```yaml
# One documented exception: some devices may send their address after a user pushbutton request without MASTER request.
- id: user_requested_node_address
  label: User-requested Node Address
  type: notification
  description: Device may send its address after user pushbutton activation without a MASTER request.
```

## Macros
```yaml
# No explicit multi-step macros defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Motor immediately stops without speed ramp-down on CTRL_STOP.
    type: immediate_stop
  - description: NETWORK_LOCK blocks movement and limit-changing commands unless CTRL_NETWORK_LOCK has equal or higher priority.
    type: priority_lock
  - description: Avoid requesting feedback or acknowledgment in group or broadcast addressing mode because RS-485 collisions may occur.
    type: collision_warning
# UNRESOLVED: device-specific power-on sequencing not stated
```

## Notes
SDN frame structure: MSG | ACK/LEN | NODE TYPE | SOURCE@ | DEST@ | DATA | CHECKSUM. Frame length is 11 bytes minimum and 32 bytes maximum, with DATA length from 0 to 21 bytes.

- LSB is transmitted first.
- All data bits must be inverted before transmission.
- SOURCE@ and DEST@ use LSBF encoding.
- Point-to-point DEST@ is destination NodeID.
- Group addressing uses SOURCE@=GroupID and DEST@=`000000h`.
- Broadcast addressing uses SOURCE@=NodeID and DEST@=`FFFFFFh`.
- NodeType addressing filters the receiver NodeType.
- Tfree minimum is 3ms.
- Treq minimum is 10ms before MASTER transmission.
- Tc maximum is 1ms between characters.
- Trep is 5ms–255ms before SLAVE reply.
- Checksum is calculated by adding the complement of every frame byte before checksum.
- Status requests receive POST responses instead of ACK.
- ACK requests are optional for CTRL, GET, and SET messages; status requests receive no ACK when feedback is returned.
- NACK error codes documented: `01h`, `10h`, `11h`, `FFh`.
- Source summary lists `SET_MOTOR_SPEED` and `GET_MOTOR_SPEED`; the detailed sections use `SET_MOTOR_ROLLING_SPEED` and `GET_MOTOR_ROLLING_SPEED`. The naming discrepancy is UNRESOLVED.

<!-- UNRESOLVED: literal complete frame bytes require runtime SOURCE@, DEST@, ACK/LEN, data values, and checksum -->
<!-- UNRESOLVED: URTSI II IP-to-serial gateway-specific network addressing and IP transport configuration not stated -->
<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: motor-specific speed ranges require device technical datasheet -->
<!-- UNRESOLVED: voltage, current, and power specifications not stated -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-25T00:10:37.585Z
last_checked_at: 2026-10-07T12:55:13.940Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:55:13.940Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 actions and the serial parameters match the source SDN message set; the source never names the URTSI II, so device applicability is unconfirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes RS-485; input identifies RS-232C gateway interface details not provided"
- "device-specific power-on sequencing not stated"
- "literal complete frame bytes require runtime SOURCE@, DEST@, ACK/LEN, data values, and checksum"
- "URTSI II IP-to-serial gateway-specific network addressing and IP transport configuration not stated"
- "firmware compatibility range not stated"
- "motor-specific speed ranges require device technical datasheet"
- "voltage, current, and power specifications not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
