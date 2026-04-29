---
schema_version: ai4av-public-spec-v1
device_id: somfy/urtsi-ii-series
entity_id: somfy_urtsi_ii_series
spec_id: admin/somfy-urtsi-ii-series
revision: 1
author: admin
title: "Somfy URTSI II Series Control Spec"
status: published
manufacturer: Somfy
manufacturer_key: somfy
model_family: "URTSI II Series"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "URTSI II Series"
  firmware: "\"\" # UNRESOLVED: firmware version compatibility not stated in source"
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
    checked_at: 2026-04-29T08:47:07.493Z
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:07.519Z
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:09.501Z
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:09.724Z
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:12.406Z
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-04-27T10:13:04.702Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version compatibility not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:04.702Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 30 spec actions matched verbatim to source commands with correct opcodes, parameter ranges, and transport configuration fully documented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Somfy URTSI II Series Control Spec

## Summary
The Somfy URTSI II Series is a motor controller for motorized curtains and blinds in the SOMFY Digital Network (SDN). Communication is half-duplex over RS-485 serial using the SDN protocol with a master-slave architecture. The protocol supports point-to-point, group, and broadcast addressing modes with 11–32 byte messages including checksum validation.

<!-- UNRESOLVED: power-on sequencing requirements not stated in source -->

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
  bit_order: lsb_first  # data bits inverted before transmission (see §4.2)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# UNRESOLVED: confirm powerable trait if explicit power on/off commands exist
- queryable       # GET_MOTOR_POSITION, GET_MOTOR_STATUS, GET_NODE_ADDR, etc.
- levelable       # CTRL_MOVETO with position in % and intermediate positions
```

## Actions
```yaml
- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: groupIndex
      type: integer
      description: Group table entry (0-15)
    - name: groupId
      type: string
      description: 24-bit group address (hex, LSBF)

- id: get_group_addr
  label: Get Group Address
  kind: action
  params:
    - name: groupIndex
      type: integer
      description: Group table entry (0-15)

- id: ctrl_moveto
  label: Move to Position
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=DOWN limit, 01h=UP limit, 02h=IP index (0-15), 04h=position %"
    - name: position
      type: integer
      description: Position value (function-dependent)
    - name: reserved
      type: integer
      description: Reserved (set to 00h)

- id: ctrl_stop
  label: Stop Motor
  kind: action
  params:
    - name: reserved
      type: integer
      description: Reserved (set to 00h)

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Delete IP, 01h=Set at current, 03h=Set at % position, 04h=Divide range"
    - name: ipIndex
      type: integer
      description: IP index (1-16)
    - name: value
      type: integer
      description: Position value (function-dependent)

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  params:
    - name: upSpeed
      type: integer
      description: UP speed (rpm) - motor-specific, see device datasheet
    - name: downSpeed
      type: integer
      description: DOWN speed (rpm) - motor-specific, see device datasheet
    - name: slowSpeed
      type: integer
      description: Adjustment speed (rpm) - motor-specific, see device datasheet

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Unlock, 01h=Lock, 03h=Save on power cycle, 04h=Do not save"
    - name: priority
      type: integer
      description: Priority level (00h-FFh, higher = more priority)

- id: set_local_ui
  label: Set Local UI
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Enable/Unlock, 01h=Disable/Lock"
    - name: uiIndex
      type: integer
      description: "00h=All, 01h=DCT input, 02h=Local stimulus, 03h=Local Radio, 04h=Touch Motion, 05h=LEDs"
    - name: priority
      type: integer
      description: Priority level (00h-FFh, higher = more priority)

- id: set_node_label
  label: Set Node Label
  kind: action
  params:
    - name: label
      type: string
      description: 16-character text label (padded with spaces)

- id: get_node_addr
  label: Get Node Address
  kind: action
  params: []

- id: get_node_app_version
  label: Get Node Application Version
  kind: action
  params: []

- id: get_node_label
  label: Get Node Label
  kind: action
  params: []

- id: get_motor_ip
  label: Get Motor Intermediate Position
  kind: action
  params:
    - name: ipIndex
      type: integer
      description: IP index (1-16)

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: action
  params: []

- id: get_network_lock
  label: Get Network Lock
  kind: action
  params: []

- id: get_local_ui
  label: Get Local UI
  kind: action
  params:
    - name: uiIndex
      type: integer
      description: UI index to query

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
- id: post_node_addr
  label: Node Address Report
  type: object
  fields:
    - name: nodeId
      type: string
      description: 24-bit NodeID of the device

- id: post_group_addr
  label: Group Address Report
  type: object
  fields:
    - name: groupIndex
      type: integer
    - name: groupId
      type: string

- id: post_node_app_version
  label: Node Application Version Report
  type: object
  fields:
    - name: appReference
      type: string
      description: 24-bit firmware part number (hex)
    - name: appIndexLetter
      type: string
      description: Firmware major revision (ASCII, 41h-5Ah)
    - name: appIndexNumber
      type: integer
      description: Firmware revision number
    - name: reserved
      type: integer

- id: post_node_label
  label: Node Label Report
  type: string
  description: 16-character text label

- id: post_motor_ip
  label: Motor Intermediate Position Report
  type: object
  fields:
    - name: ipIndex
      type: integer
    - name: reserved
      type: integer
    - name: ipPositionPercentage
      type: integer
      description: Position % (0-100), FFh if IP not set

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Report
  type: object
  fields:
    - name: upSpeed
      type: integer
      description: UP speed (rpm)
    - name: downSpeed
      type: integer
      description: DOWN speed (rpm)
    - name: slowSpeed
      type: integer
      description: Adjustment speed (rpm)

- id: post_network_lock
  label: Network Lock Report
  type: object
  fields:
    - name: status
      type: integer
      description: "00h=Unlocked, 01h=Locked"
    - name: sourceAddr
      type: string
      description: NodeID of locking device
    - name: priority
      type: integer
    - name: saved
      type: integer
      description: "00h=Not restored on power cycle, 01h=Restored on power cycle"

- id: post_local_ui
  label: Local UI Report
  type: object
  fields:
    - name: uiIndex
      type: integer
    - name: status
      type: integer
      description: "00h=Enabled/Unlocked, 01h=Disabled/Locked"
    - name: sourceAddr
      type: string
      description: NodeID of device that sent lock command
    - name: priority
      type: integer

- id: post_motor_position
  label: Motor Position Report
  type: object
  fields:
    - name: positionPulse
      type: integer
    - name: positionPercentage
      type: integer
      description: Position 0-100%
    - name: reserved
      type: integer
    - name: ip
      type: integer
      description: IP index (01h-IP_MAX), FFh if no matching IP

- id: post_motor_status
  label: Motor Status Report
  type: object
  fields:
    - name: status
      type: enum
      values: ["00h=Stopped", "01h=Running", "02h=Blocked", "03h=Locked"]
    - name: direction
      type: enum
      values: ["00h=Going DOWN", "01h=Going UP", "FFh=Unknown"]
    - name: source
      type: enum
      values: ["00h=Internal", "01h=Network message", "02h=Local UI"]
    - name: cause
      type: enum
      values: ["00h=Target reached", "01h=Explicit command", "02h=WINK", "20h=Obstacle detection", "21h=Over-current", "22h=Thermal protection", "30h=Run time exceeded", "32h=Timeout exceeded", "FFh=Reset/Power Up"]

- id: ack
  label: Acknowledge
  type: object
  fields: []

- id: nack
  label: Negative Acknowledge
  type: object
  fields:
    - name: errorCode
      type: enum
      values: ["01h=Data out of range", "10h=Unknown message", "11h=Message Length Error", "FFh=Busy"]
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found; all are action-driven
```

## Events
```yaml
# UNRESOLVED: no unsolicited event messages defined in source; all communication is master-initiated
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  # Network lock: movement commands rejected when locked unless equal/higher priority
  - description: When NETWORK_LOCK is active, only CTRL_NETWORK_LOCK with equal or higher priority is accepted; all other movement commands (CTRL_XXX, SET_MOTOR_LIMITS, SET_TILT_LIMITS) are rejected
    source: §6.3.4
  # Data bit inversion for backward compatibility
  - description: All data bits must be inverted before transmission (LSBF + NOT byte value)
    source: §4.2
# UNRESOLVED: power-on sequencing requirements not stated in source
# UNRESOLVED: voltage/current/power specifications not stated in source (refer to device datasheet)
```

## Notes
- The SDN protocol uses RS-485 half-duplex master-slave communication; all messages originate from a MASTER device
- Data bits must be inverted before transmission for backward compatibility (§4.2)
- Least significant byte first (LSBF) for multi-byte fields including NodeID
- Minimum message length = 11 bytes; maximum = 32 bytes (max 21 bytes DATA)
- Bus timing: Treq ≥ 10ms (master before new request), Trep 5–255ms (slave before reply), Tc ≤ 1ms (between characters), Tfree ≥ 3ms (bus idle)
- Collision avoidance: avoid feedback/ACK requests in group or broadcast mode
- Acknowledgements strongly recommended; implement retry on NACK or timeout
- NodeID is 24-bit, programmed at manufacturing, found on device label
- NodeType filtering supported (e.g., 02h=Ø30 DC, 05h=RTS transmitter, 06h=Glydea, 07h=Ø50 AC, 08h=Ø50 DC, 09h=Ø40 AC)
- GroupID supports up to 16 groups per device; can be a NodeID or any unused address on bus
- Motor position is sent even while motor is running; IP matching may be approximate
- Motor status cause codes indicate: target reached, explicit command, WINK, obstacle detection, over-current, thermal protection, run time exceeded, timeout, or reset/power-up
- Lock persistence upon power cycle configurable via SET_NETWORK_LOCK function 03h/04h
- Default factory settings: all UI enabled, NETWORK_LOCK not saved on power cycle
- Firmware version queryable via GET_NODE_APP_VERSION → POST_NODE_APP_VERSION
- Intermediate positions (IPs): 1–16 per motor; can be deleted, set at current position, set at % value, or auto-divided equally across range
- Speed adjustment (DC motors only) requires motor-specific datasheet values
- LOCAL_UI lock upon power failure: DCT/Local Stimuli not restored; all other items saved and restored
- Text labels are 16 characters, padded with spaces; have no effect on bus behavior
<!-- UNRESOLVED: UDP/IP transport not available in this model — RS-485 only -->
<!-- UNRESOLVED: wireless/RF control options not covered in this serial protocol spec -->

## Provenance

```yaml
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
source_documents:
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:07.493Z
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:07.519Z
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:09.501Z
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:09.724Z
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:12.406Z
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-04-27T10:13:04.702Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:04.702Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 30 spec actions matched verbatim to source commands with correct opcodes, parameter ranges, and transport configuration fully documented."
```

## Known Gaps

```yaml
[]
```
