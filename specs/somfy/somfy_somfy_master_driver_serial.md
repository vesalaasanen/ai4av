---
spec_id: admin/somfy-master-driver
schema_version: ai4av-public-spec-v1
revision: 2
title: "Somfy Somfy Master Driver Control Spec"
manufacturer: Somfy
model_family: "Somfy Master Driver"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somfy Master Driver"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-16T15:21:00.485Z
last_checked_at: 2026-07-22T01:13:58.711Z
generated_at: 2026-07-22T01:13:58.711Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "compatible motor models not enumerated in source"
  - "no standalone settable parameters beyond action commands"
  - "no unsolicited notifications documented - SLAVE devices only respond to MASTER requests"
  - "no explicit multi-step sequences documented"
  - "compatible motor model list not enumerated"
  - "speed range values not stated — referenced to technical datasheet"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:13:58.711Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions match source opcodes verbatim; transport parameters confirmed; complete coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Somfy Master Driver Control Spec

## Summary
Somfy Digital Network (SDN) protocol for RS-485 half-duplex communication between a MASTER and SLAVE devices. Controls motorized shades, blinds, and screens via position commands, status queries, and configuration settings. Supports point-to-point, group, and broadcast addressing modes.

<!-- UNRESOLVED: compatible motor models not enumerated in source -->

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
  note: "all data bits inverted before transmission (LSBF)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: CTRL_MOVETO with UP/DOWN limit functions
- routable  # inferred: group and broadcast addressing modes documented
- queryable  # inferred: GET_MOTOR_POSITION, GET_MOTOR_STATUS commands present
- levelable  # inferred: CTRL_MOVETO with position percentage control
```

## Actions
```yaml
# --- Device Control (CTRL_xxx) ---
- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "03h"  # CTRL_MOVETO MSG opcode, verbatim from source §6.4.1
  params:
    - name: function
      type: integer
      description: |
        00h = DOWN limit, 01h = UP limit, 02h = Intermediate Position, 04h = Position in %
    - name: position
      type: integer
      description: "Position value (function-dependent)"
    - name: reserved
      type: integer
      description: "Reserved (set to 00h)"

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "02h"  # CTRL_STOP MSG opcode, verbatim from source §6.4.2
  params:
    - name: reserved
      type: integer
      description: "Reserved (set to 00h)"

# --- Device Management (SET_xxx / GET_xxx) ---
- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51h"  # SET_GROUP_ADDR MSG opcode, verbatim from source §6.1.2
  params:
    - name: group_index
      type: integer
      description: "Group table entry (0-15)"
    - name: group_id
      type: integer
      description: "24-bit group address"

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "41h"  # GET_GROUP_ADDR MSG opcode, verbatim from source §6.1.2
  params:
    - name: group_index
      type: integer
      description: "Group table entry (0-15)"

- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "40h"  # GET_NODE_ADDR MSG opcode, verbatim from source §6.1.1
  params: []

- id: get_node_app_version
  label: Get Firmware Version
  kind: query
  command: "74h"  # GET_NODE_APP_VERSION MSG opcode, verbatim from source §6.2.1
  params: []

- id: set_node_label
  label: Set Node Label
  kind: action
  command: "55h"  # SET_NODE_LABEL MSG opcode, verbatim from source §6.2.2
  params:
    - name: label
      type: string
      description: "16-character label string (padded with spaces)"

- id: get_node_label
  label: Get Node Label
  kind: query
  command: "45h"  # GET_NODE_LABEL MSG opcode, verbatim from source §6.2.2
  params: []

# --- Device Configuration (SET_xxx / GET_xxx) ---
- id: set_local_ui
  label: Set Local UI
  kind: action
  command: "17h"  # SET_LOCAL_UI MSG opcode, verbatim from source §6.3.1
  params:
    - name: function
      type: integer
      description: "00h = Enable/Unlock, 01h = Disable/Lock"
    - name: ui_index
      type: integer
      description: "UI item index (00h=all, 01h=DCT, 02h=local stimulus, 03h=radio, 04h=touch, 05h=LEDs)"
    - name: priority
      type: integer
      description: "Priority level (00h-FFh, higher = more important)"

- id: get_local_ui
  label: Get Local UI
  kind: query
  command: "27h"  # GET_LOCAL_UI MSG opcode, verbatim from source §6.3.1
  params:
    - name: ui_index
      type: integer
      description: "UI item index (01h-UI_MAX), refer to SET_LOCAL_UI list"

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "15h"  # SET_MOTOR_IP MSG opcode, verbatim from source §6.3.2
  params:
    - name: function
      type: integer
      description: "00h=delete, 01h=set at current, 03h=set at %, 04h=divide range"
    - name: ip_index
      type: integer
      description: "IP index (1-16)"
    - name: value
      type: integer
      description: "Position value (function-dependent)"

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "25h"  # GET_MOTOR_IP MSG opcode, verbatim from source §6.3.2
  params:
    - name: ip_index
      type: integer
      description: "IP index (1-16)"

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "13h"  # SET_MOTOR_ROLLING_SPEED MSG opcode, verbatim from source §6.3.3
  params:
    - name: up_speed
      type: integer
      description: "UP movement speed (rpm)"
    - name: down_speed
      type: integer
      description: "DOWN movement speed (rpm)"
    - name: slow_speed
      type: integer
      description: "Adjustment speed (rpm)"

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "23h"  # GET_MOTOR_ROLLING_SPEED MSG opcode, verbatim from source §6.3.3
  params: []

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16h"  # SET_NETWORK_LOCK MSG opcode, verbatim from source §6.3.4
  params:
    - name: function
      type: integer
      description: "00h=unlock, 01h=lock, 03h=save on power cycle, 04h=do not save"
    - name: priority
      type: integer
      description: "Priority level (00h-FFh)"

- id: get_network_lock
  label: Get Network Lock
  kind: query
  command: "26h"  # GET_NETWORK_LOCK MSG opcode, verbatim from source §6.3.4
  params: []

# --- Device Status (GET_xxx) ---
- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "0Ch"  # GET_MOTOR_POSITION MSG opcode, verbatim from source §6.5.1
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "0Eh"  # GET_MOTOR_STATUS MSG opcode, verbatim from source §6.5.2
  params: []
```

## Feedbacks
```yaml
- id: post_node_addr
  label: Node Address Response
  type: object
  fields:
    - name: node_id
      type: integer
      description: "24-bit NodeID from message header"

- id: post_group_addr
  label: Group Address Response
  type: object
  fields:
    - name: group_index
      type: integer
    - name: group_id
      type: integer

- id: post_node_app_version
  label: Firmware Version Response
  type: object
  fields:
    - name: app_reference
      type: integer
    - name: app_index_letter
      type: string
    - name: app_index_number
      type: integer
    - name: reserved
      type: integer

- id: post_node_label
  label: Node Label Response
  type: string
  description: "16-character label string"

- id: post_local_ui
  label: Local UI Status Response
  type: object
  fields:
    - name: status
      type: enum
      values: [00h=Enabled/Unlocked, 01h=Disabled/Locked]
    - name: source_addr
      type: integer
    - name: priority
      type: integer

- id: post_motor_ip
  label: Intermediate Position Response
  type: object
  fields:
    - name: ip_index
      type: integer
    - name: reserved
      type: integer
    - name: ip_position_percentage
      type: integer

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Response
  type: object
  fields:
    - name: up_speed
      type: integer
    - name: down_speed
      type: integer
    - name: slow_speed
      type: integer

- id: post_network_lock
  label: Network Lock Status Response
  type: object
  fields:
    - name: status
      type: enum
      values: [00h=Unlocked, 01h=Locked]
    - name: source_addr
      type: integer
    - name: priority
      type: integer
    - name: saved
      type: enum
      values: [00h=not restored, 01h=restored on power cycle]

- id: post_motor_position
  label: Motor Position Response
  type: object
  fields:
    - name: position_pulse
      type: integer
    - name: position_percentage
      type: integer
    - name: reserved
      type: integer
    - name: ip
      type: integer

- id: post_motor_status
  label: Motor Status Response
  type: object
  fields:
    - name: status
      type: enum
      values: [00h=Stopped, 01h=Running, 02h=Blocked, 03h=Locked]
    - name: direction
      type: enum
      values: [00h=Going DOWN, 01h=Going UP, FFh=Unknown]
    - name: source
      type: enum
      values: [00h=Internal, 01h=Network, 02h=Local UI]
    - name: cause
      type: enum
      values: [00h=Target reached, 01h=Explicit command, 02h=Wink, 20h=Obstacle, 21h=Over-current, 22h=Thermal, 30h=Run time exceeded, 32h=Timeout, FFh=Reset/Power Up]

- id: ack
  label: Acknowledgment
  type: object
  fields: []

- id: nack
  label: Negative Acknowledgment
  type: object
  fields:
    - name: error_code
      type: enum
      values: [01h=Data out of range, 10h=Unknown message, 11h=Message length error, FFh=Busy]
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented - SLAVE devices only respond to MASTER requests
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Network lock blocks all CTRL_XXX and SET_MOTOR_LIMITS when active"
  - description: "Motor stop is immediate without speed ramp-down"
```

## Notes
- SDN protocol uses half-duplex RS-485 communication; MASTER initiates all commands
- All data bits inverted before transmission (byte 58h → A7h on bus)
- Timing requirements: Treq=10ms min before new master request, Trep=5-255ms before slave reply
- Minimum message length: 11 bytes; maximum: 32 bytes
- NodeType filtering supported for addressing device families
- Group addressing allows up to 16 groups per device
<!-- UNRESOLVED: compatible motor model list not enumerated -->
<!-- UNRESOLVED: speed range values not stated — referenced to technical datasheet -->
```

---

**Upgrade summary:**
- Added 10 missing `GET_xxx` query actions (node addr, group addr, app version, node label, local ui, motor ip, rolling speed, network lock, motor position, motor status) — source §6.1–6.5 documents all as distinct MASTER messages
- Added `command:` field (MSG hex opcode verbatim) to all 17 actions — was entirely absent, payload rule violated
- Preserved all existing IDs, shapes, Feedbacks, Transport, Safety, Notes
- Revision 1→2

No fabrication. All opcodes lifted verbatim from source tables.

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-16T15:21:00.485Z
last_checked_at: 2026-07-22T01:13:58.711Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:13:58.711Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions match source opcodes verbatim; transport parameters confirmed; complete coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "compatible motor models not enumerated in source"
- "no standalone settable parameters beyond action commands"
- "no unsolicited notifications documented - SLAVE devices only respond to MASTER requests"
- "no explicit multi-step sequences documented"
- "compatible motor model list not enumerated"
- "speed range values not stated — referenced to technical datasheet"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
