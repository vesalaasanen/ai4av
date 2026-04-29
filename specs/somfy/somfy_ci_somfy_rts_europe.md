---
schema_version: ai4av-public-spec-v1
device_id: somfy/ci-somfy-rts-europe
entity_id: somfy_ci_somfy_rts_europe
spec_id: admin/somfy-ci-somfy-rts-europe
revision: 1
author: admin
title: "Somfy CI-SOMFY-RTS (Europe) Control Spec"
status: published
manufacturer: Somfy
manufacturer_key: somfy
model_family: "CI-SOMFY-RTS (Europe)"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "CI-SOMFY-RTS (Europe)"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
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
    checked_at: 2026-04-29T08:47:07.519Z
retrieved_at: 2026-04-29T08:47:07.519Z
last_checked_at: 2026-04-27T09:45:20.256Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:45:20.256Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 30 spec actions matched to source SDN protocol commands; transport parameters (4800 baud, odd parity) verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Somfy CI-SOMFY-RTS (Europe) Control Spec

## Summary
RS485-based motor/tube controller using the Somfy Device Network (SDN) protocol. Supports point-to-point, group, and broadcast addressing. Controls window treatments, screens, and similar motorized shading via serial RS485 at 4800 baud with odd parity. Protocol includes settings (SET), control (CTRL), and status (GET/POST) message categories with acknowledgment handling.

<!-- UNRESOLVED: This spec covers only the RS485 RTS transmitter family. Other NodeTypes listed (Ø30, Glydea, Ø50, Ø40) are not covered. -->

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
addressing:
  format: nodeid  # 3-byte NodeID; 6-byte group address; 24-bit broadcast FFFFFFh
auth:
  type: none  # inferred: no auth procedure in source
notes:
  - All data bits inverted before transmission (backward compatibility)
  - LSB-first transmission order
  - No synchronization byte; message ends with bus inactivity
  - Master must wait Treq=10ms minimum after last bus activity before transmitting
  - Slave reply delay Trep=5ms-255ms (partially randomized)
```

## Traits
```yaml
- powerable      # inferred: CTRL_MOVETO includes UP/DOWN limit movement
- routable       # inferred: group and broadcast addressing modes present
- queryable      # inferred: GET_MOTOR_POSITION, GET_MOTOR_STATUS, GET_NODE_ADDR etc.
- levelable      # inferred: CTRL_MOVETO with position percentage (0-100%)
```

## Actions
```yaml
# Device Control
- id: ctrl_moveto
  label: Move to Position
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Down limit, 1=Up limit, 2=Intermediate position, 4=Position %"
    - name: position
      type: integer
      description: "Position: IP index (0-15) for function 2, or % (0-100) for function 4"

- id: ctrl_stop
  label: Stop Motor
  kind: action
  params:
    - name: reserved
      type: integer
      description: Reserved byte (set to 00h)

# Device Configuration - Settings
- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      description: Group table entry (0-15)
    - name: group_id
      type: integer
      description: 24-bit group address

- id: set_node_label
  label: Set Node Label
  kind: action
  params:
    - name: label
      type: string
      description: 16-character text label (fill with spaces if shorter)

- id: set_local_ui
  label: Set Local UI
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Enable/Unlock, 1=Disable/Lock"
    - name: ui_index
      type: integer
      description: "0=All, 1=DCT, 2=Local stimulus, 3=Radio/BT, 4=Touch Motion, 5=LEDs"
    - name: priority
      type: integer
      description: Lock priority (0-FFh, higher = higher priority)

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Delete IP, 1=Set at current pos, 3=Set at %, 4=Divide range"
    - name: ip_index
      type: integer
      description: IP entry index (1-16)
    - name: value
      type: integer
      description: Position % or IP count depending on function

- id: set_motor_rolling_speed
  label: Set Motor Speed
  kind: action
  params:
    - name: up_speed
      type: integer
      description: UP direction speed (RPM)
    - name: down_speed
      type: integer
      description: DOWN direction speed (RPM)
    - name: slow_speed
      type: integer
      description: Adjustment speed (RPM)

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Unlock, 1=Lock at current position, 3=Save lock on power cycle, 4=Do not save"
    - name: priority
      type: integer
      description: Lock priority (0-FFh)

# Queries - GET (slave responds with POST)
- id: get_node_addr
  label: Get Node Address
  kind: action
  params: []

- id: get_group_addr
  label: Get Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      description: Group table entry (0-15)

- id: get_node_app_version
  label: Get Firmware Version
  kind: action
  params: []

- id: get_node_label
  label: Get Node Label
  kind: action
  params: []

- id: get_local_ui
  label: Get Local UI Status
  kind: action
  params:
    - name: ui_index
      type: integer
      description: UI index (01h-UI_MAX)

- id: get_motor_ip
  label: Get Intermediate Position
  kind: action
  params:
    - name: ip_index
      type: integer
      description: IP entry index (1-16)

- id: get_motor_rolling_speed
  label: Get Motor Speed
  kind: action
  params: []

- id: get_network_lock
  label: Get Network Lock Status
  kind: action
  params: []

- id: get_motor_position
  label: Get Motor Position
  kind: action
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: action
  params: []
```

## Feedbacks
```yaml
# ACK / NACK
- id: ack
  label: Acknowledge
  type: object
  properties:
    - name: reserved
      type: integer
      description: Always 0

- id: nack
  label: Negative Acknowledge
  type: object
  properties:
    - name: error_code
      type: integer
      description: "01h=Data out of range, 10h=Unknown message, 11h=Length error, FFh=Busy"

# POST responses
- id: post_node_addr
  label: Node Address Response
  type: object
  properties:
    - name: node_id
      type: string
      description: 3-byte NodeID (no data payload)

- id: post_group_addr
  label: Group Address Response
  type: object
  properties:
    - name: group_index
      type: integer
    - name: group_id
      type: integer
      description: 24-bit group address

- id: post_node_app_version
  label: Firmware Version Response
  type: object
  properties:
    - name: app_reference
      type: integer
      description: 24-bit firmware part number
    - name: app_index_letter
      type: string
      description: ASCII major revision (41h-5Ah)
    - name: app_index_number
      type: integer
      description: Firmware revision number
    - name: reserved
      type: integer

- id: post_node_label
  label: Node Label Response
  type: object
  properties:
    - name: label
      type: string
      description: 16-character string

- id: post_local_ui
  label: Local UI Status Response
  type: object
  properties:
    - name: ui_index
      type: integer
    - name: status
      type: integer
      description: "0=Enabled/Unlocked, 1=Disabled/Locked"
    - name: source_addr
      type: integer
      description: NodeID of locking device
    - name: priority
      type: integer

- id: post_motor_ip
  label: Intermediate Position Response
  type: object
  properties:
    - name: ip_index
      type: integer
    - name: reserved
      type: integer
    - name: ip_position_percentage
      type: integer
      description: "0-100, or FFh if IP not set"

- id: post_motor_rolling_speed
  label: Motor Speed Response
  type: object
  properties:
    - name: up_speed
      type: integer
    - name: down_speed
      type: integer
    - name: slow_speed
      type: integer

- id: post_network_lock
  label: Network Lock Status Response
  type: object
  properties:
    - name: status
      type: integer
      description: "0=Unlocked, 1=Locked"
    - name: source_addr
      type: integer
      description: NodeID of locking device
    - name: priority
      type: integer
    - name: saved
      type: integer
      description: "0=Not restored on power cycle, 1=Will be restored"

- id: post_motor_position
  label: Motor Position Response
  type: object
  properties:
    - name: position_pulse
      type: integer
      description: Raw position in pulses
    - name: position_percentage
      type: integer
      description: "0-100"
    - name: reserved
      type: integer
    - name: ip
      type: integer
      description: "IP index (01h-IP_MAX) or FFh if not at IP"

- id: post_motor_status
  label: Motor Status Response
  type: object
  properties:
    - name: status
      type: integer
      description: "0=Stopped, 1=Running, 2=Blocked, 3=Locked"
    - name: direction
      type: integer
      description: "0=Going DOWN, 1=Going UP, FFh=Unknown"
    - name: source
      type: integer
      description: "0=Internal, 1=Network, 2=Local UI"
    - name: cause
      type: integer
      description: "00h=Target reached, 01h=Explicit command, 02h=Wink, 20h=Obstacle, 21h=Over-current, 22h=Thermal, 30h=Run time exceeded, 32h=Timeout, FFh=Reset/PowerUp"
```

## Variables
```yaml
# Settable parameters (not discrete actions)
- id: motor_ip_position
  label: Motor Intermediate Position %
  type: integer
  min: 0
  max: 100
  description: Position percentage for a stored intermediate position

- id: motor_speed
  label: Motor Rolling Speed
  type: object
  properties:
    up_speed: integer
    down_speed: integer
    slow_speed: integer
  description: RPM values for up/down/slow motor movements

- id: network_lock
  label: Network Lock State
  type: object
  properties:
    function: integer
    priority: integer
  description: Lock state and priority level
```

## Events
```yaml
# UNRESOLVED: The document does not describe unsolicited event messages sent by the device without a prior GET request.
# SDN is a master-slave polling protocol; all responses are reactive to GET/CTRL commands.
```

## Macros
```yaml
# UNRESOLVED: The document does not describe explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - When NETWORK_LOCK is active, only CTRL_NETWORK_LOCK with equal/higher priority unlocks
  - Movement commands rejected while NETWORK_LOCK active at lower priority; NACK returned
  - Motor immediately stops on CTRL_STOP without speed ramp-down
  - Obstacle detection causes blocked status (thermal/over-current also block motor)
warnings:
  - Use acknowledgments to detect missed messages; implement retry on NACK or timeout
  - Avoid ACK requests in group/broadcast mode to prevent collisions
  - Avoid feedback requests in group/broadcast mode to prevent collisions
```

## Notes
SDN protocol uses a binary message format with 11-byte minimum and 32-byte maximum frames. Message structure: MSG(1) | ACK/LEN(1) | NODE_TYPE(1) | SOURCE@ (3) | DEST@ (3) | DATA (0–21) | CHECKSUM(1). All data bits are inverted before bus transmission (NOT byte-value). SOURCE@ and DEST@ use LSB-first byte order. Group addressing uses destination 000000h; broadcast uses destination FFFFFFh. Slave response delay (Trep) is randomized between 5–255ms to reduce collisions. No auth/password mechanism described in source.
<!-- UNRESOLVED: Specific speed RPM values and motor datasheet references not included — values vary by motor model -->
<!-- UNRESOLVED: TCP/IP transport not applicable to this device (RS485 only) -->
<!-- UNRESOLVED: Firmware version compatibility range not stated in source -->

## Provenance

```yaml
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
source_documents:
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:07.519Z
retrieved_at: 2026-04-29T08:47:07.519Z
last_checked_at: 2026-04-27T09:45:20.256Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:45:20.256Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 30 spec actions matched to source SDN protocol commands; transport parameters (4800 baud, odd parity) verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```
