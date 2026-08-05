---
spec_id: admin/somfy-poe-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy POE Series Control Spec"
manufacturer: Somfy
model_family: "POE Series"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "POE Series"
    - "Ø30 DC Serie RS485"
    - "Ø50 AC Serie RS485"
    - "Ø50 DC Serie RS485"
    - "Ø40 AC Serie RS485"
    - "RS485 RTS Transmitter"
    - "Glydea RS485"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-16T15:15:37.329Z
last_checked_at: 2026-07-22T01:13:56.125Z
generated_at: 2026-07-22T01:13:56.125Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power specifications (voltage, current) not stated in source"
  - "flow control not stated in source"
  - "trait inference - see notes"
  - "no standalone settable parameters outside of Actions"
  - "SDN is a master/slave request-response protocol;"
  - "no multi-step macro sequences described in source"
  - "explicit safety warnings or interlock procedures in source"
  - "serial flow_control setting not stated in source"
  - "voltage/current/power specifications not in source"
  - "whether SDN over TCP/IP gateway exists for this series not stated"
  - "full NodeType list may be incomplete (09h noted as \"Not yet available\")"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:13:56.125Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched verbatim in source with correct parameter shapes; transport verified; source command catalogue fully represented. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Somfy POE Series Control Spec

## Summary
The Somfy POE Series comprises RS-485 motor controllers for automated shades, blinds, and projection screens. Communication uses the Somfy Digital Network (SDN) protocol over RS-485 serial bus. Devices support point-to-point, group, and broadcast addressing with acknowledgment-based reliability.

<!-- UNRESOLVED: power specifications (voltage, current) not stated in source -->

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
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
# UNRESOLVED: trait inference - see notes
# - powerable: MOVETO UP/DOWN limit commands present (movement control)
# - queryable: GET_MOTOR_POSITION, GET_MOTOR_STATUS present
# - routable: group addressing modes present
```

## Actions
```yaml
# All command payloads are SDN MSG opcodes (Byte 1) per source §6.
# Full frame = MSG | ACK/LEN | NODETYPE | SOURCE@(3) | DEST@(3) | DATA | CHECKSUM.
# ACK/LEN, addressing, and CHECKSUM are computed at runtime; MSG opcode is the
# constant payload documented verbatim in the source for each message.

# --- Device Control (CTRL_xxx) ---

- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "03h"   # CTRL_MOVETO MSG identifier (source §6.4.1)
  params:
    - name: function
      type: integer
      description: |
        00h = Move to DOWN limit (Position ignored)
        01h = Move to UP limit (Position ignored)
        02h = Move to Intermediate Position (Position = IP index 0-15)
        04h = Move to Position in % of full travel (Position = 0-100)
    - name: position
      type: integer
      description: Position value per function; 16-bit
    - name: reserved
      type: integer
      description: Reserved; set to 00h

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "02h"   # CTRL_STOP MSG identifier (source §6.4.2)
  params:
    - name: reserved
      type: integer
      description: Reserved; set to 00h

# --- Device Configuration (SET_xxx) ---

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51h"   # SET_GROUP_ADDR MSG identifier (source §6.1.2)
  params:
    - name: group_index
      type: integer
      description: Group table entry (0-15)
    - name: group_id
      type: integer
      description: Group address (24-bit NodeID)

- id: set_node_label
  label: Set Node Label
  kind: action
  command: "55h"   # SET_NODE_LABEL MSG identifier (source §6.2.2)
  params:
    - name: label
      type: string
      description: 16-character label string; pad with spaces if shorter

- id: set_local_ui
  label: Set Local UI Lock
  kind: action
  command: "17h"   # SET_LOCAL_UI MSG identifier (source §6.3.1)
  params:
    - name: function
      type: integer
      description: |
        00h = Enable/Unlock
        01h = Disable/Lock
    - name: ui_index
      type: integer
      description: |
        00h = All Local controls and feedbacks
        01h = DCT input
        02h = Local stimuli (e.g. radio pairing pushbutton)
        03h = Local Radio access (e.g. Bluetooth)
        04h = Touch Motion feature
        05h = LEDs
    - name: priority
      type: integer
      description: Priority level (0-FFh); higher = higher priority

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "15h"   # SET_MOTOR_IP MSG identifier (source §6.3.2)
  params:
    - name: function
      type: integer
      description: |
        00h = Delete IP (Value ignored)
        01h = Set IP at current position (Value ignored)
        03h = Set IP at specified position (Value = position %)
        04h = Divide full range with N IPs (Value = IP count; IP_Index ignored)
    - name: ip_index
      type: integer
      description: IP entry index (1-16)
    - name: value
      type: integer
      description: Position value per function

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "13h"   # SET_MOTOR_ROLLING_SPEED MSG identifier (source §6.3.3)
  params:
    - name: up_speed
      type: integer
      description: Speed during UP movement (rpm, 8-bit); see motor datasheet
    - name: down_speed
      type: integer
      description: Speed during DOWN movement (rpm, 8-bit); see motor datasheet
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements (rpm, 8-bit); see motor datasheet

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16h"   # SET_NETWORK_LOCK MSG identifier (source §6.3.4)
  params:
    - name: function
      type: integer
      description: |
        00h = Unlock
        01h = Lock at current position
        03h = Save NETWORK_LOCK upon power cycle
        04h = Do not save NETWORK_LOCK upon power cycle
    - name: priority
      type: integer
      description: Priority level (0-FFh); higher = higher priority

# --- Information Requests (GET_xxx) -> kind: query ---
# Source §6 documents each GET message as a distinct MASTER command returning
# a POST_xxx response. Enumerated per coverage rule.

- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "40h"   # GET_NODE_ADDR MSG identifier (source §6.1.1)
  params: []
  description: Request device NodeID; response is POST_NODE_ADDR (60h), address in header

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "41h"   # GET_GROUP_ADDR MSG identifier (source §6.1.2)
  params:
    - name: group_index
      type: integer
      description: Group table entry (0-15)
  description: Request GroupID for a table entry; response is POST_GROUP_ADDR (61h)

- id: get_node_app_version
  label: Get Node App Version
  kind: query
  command: "74h"   # GET_NODE_APP_VERSION MSG identifier (source §6.2.1)
  params: []
  description: Request firmware revision; response is POST_NODE_APP_VERSION (75h)

- id: get_node_label
  label: Get Node Label
  kind: query
  command: "45h"   # GET_NODE_LABEL MSG identifier (source §6.2.2)
  params: []
  description: Request user-defined text label; response is POST_NODE_LABEL (65h)

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  command: "27h"   # GET_LOCAL_UI MSG identifier (source §6.3.1)
  params:
    - name: ui_index
      type: integer
      description: UI item index (01h-UI_MAX); refer to SET_LOCAL_UI UI list
  description: Request UI item status; response is POST_LOCAL_UI (37h)

- id: get_motor_ip
  label: Get Motor Intermediate Position
  kind: query
  command: "25h"   # GET_MOTOR_IP MSG identifier (source §6.3.2)
  params:
    - name: ip_index
      type: integer
      description: IP entry index (1-16)
  description: Request IP entry position; response is POST_MOTOR_IP (35h)

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "23h"   # GET_MOTOR_ROLLING_SPEED MSG identifier (source §6.3.3)
  params: []
  description: Request DC motor speeds; response is POST_MOTOR_ROLLING_SPEED (33h)

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  command: "26h"   # GET_NETWORK_LOCK MSG identifier (source §6.3.4)
  params: []
  description: Request lock state; response is POST_NETWORK_LOCK (36h)

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "0Ch"   # GET_MOTOR_POSITION MSG identifier (source §6.5.1)
  params: []
  description: Request current motor position; response is POST_MOTOR_POSITION (0Dh)

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "0Eh"   # GET_MOTOR_STATUS MSG identifier (source §6.5.2)
  params: []
  description: Request motor state/direction/source/cause; response is POST_MOTOR_STATUS (0Fh)
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values:
    - ack
    - nack
  description: Acknowledgment returned when ACK bit is set in request

- id: nack_error
  type: enum
  values:
    - "01h: Data out of range"
    - "10h: Unknown message"
    - "11h: Message Length Error"
    - "FFh: Busy - Cannot process message"
  description: NACK error codes

- id: post_node_addr
  type: object
  description: Node address response (address in message header, no data payload)

- id: post_group_addr
  type: object
  fields:
    - name: group_index
      type: integer
      description: Group table entry (0-15)
    - name: group_id
      type: integer
      description: Associated group address (24-bit)

- id: post_node_app_version
  type: object
  fields:
    - name: app_reference
      type: string
      description: Firmware part number (24-bit)
    - name: app_index_letter
      type: string
      description: Firmware major revision (ASCII)
    - name: app_index_number
      type: integer
      description: Firmware revision number

- id: post_node_label
  type: string
  description: 16-character device label string

- id: post_local_ui
  type: object
  fields:
    - name: ui_index
      type: integer
      description: UI item index
    - name: status
      type: enum
      values: [enabled/unlocked, disabled/locked]
    - name: source_addr
      type: integer
      description: NodeID of device that sent lock command (24-bit)
    - name: priority
      type: integer
      description: Priority level of lock

- id: post_motor_ip
  type: object
  fields:
    - name: ip_index
      type: integer
      description: IP entry index (1-16)
    - name: ip_position_percentage
      type: integer
      description: Position percentage (0-100); FFh if IP not set

- id: post_motor_rolling_speed
  type: object
  fields:
    - name: up_speed
      type: integer
      description: Current UP speed (rpm)
    - name: down_speed
      type: integer
      description: Current DOWN speed (rpm)
    - name: slow_speed
      type: integer
      description: Current slow/adjustment speed (rpm)

- id: post_network_lock
  type: object
  fields:
    - name: status
      type: enum
      values: [unlocked, locked]
    - name: source_addr
      type: integer
      description: NodeID of device that locked (24-bit)
    - name: priority
      type: integer
      description: Priority level of lock
    - name: saved
      type: boolean
      description: Whether lock persists across power cycle

- id: post_motor_position
  type: object
  fields:
    - name: position_pulse
      type: integer
      description: Motor position in pulses (16-bit)
    - name: position_percentage
      type: integer
      description: Position as percentage (0-100)
    - name: ip
      type: integer
      description: IP index (01h-IP_MAX); FFh if no IP matches

- id: post_motor_status
  type: object
  fields:
    - name: status
      type: enum
      values:
        - "00h: Stopped"
        - "01h: Running (during movement)"
        - "02h: Blocked (thermal protection, obstacle)"
        - "03h: Locked (NETWORK_LOCK)"
    - name: direction
      type: enum
      values:
        - "00h: Going DOWN"
        - "01h: Going UP"
        - "FFh: Unknown"
    - name: source
      type: enum
      values:
        - "00h: Internal (limit/IP/position reached, over-current, obstacle, thermal)"
        - "01h: Network message"
        - "02h: Local UI (DCT, local stimulus, wireless)"
    - name: cause
      type: enum
      values:
        - "00h: Target reached (limit or IP)"
        - "01h: Explicit command"
        - "02h: Wink"
        - "20h: Obstacle detection"
        - "21h: Over-current protection"
        - "22h: Thermal protection"
        - "30h: Run time exceeded"
        - "32h: Timeout exceeded"
        - "FFh: Reset / PowerUp"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside of Actions
# Device configuration (HMI, IPs, speeds, locks) is managed via Actions above
```

## Events
```yaml
# UNRESOLVED: SDN is a master/slave request-response protocol;
# no unsolicited event messages are documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: network_lock_priority
    description: |
      When NETWORK_LOCK is set (function 01h), only CTRL/SET_NETWORK_LOCK
      messages with equal or higher priority are accepted.
      All other movement commands are rejected while locked.
      Lock can be removed by equal/higher priority Unlock command.
  - id: motor_blocked_rejection
    description: |
      Blocked motors (thermal protection, obstacle) reject all movement
      commands until the blocking condition is cleared.
  - id: collision_avoidance
    description: |
      Avoid requesting acknowledgments or feedback in group or broadcast
      mode - collisions on RS-485 bus can cause message loss.
      Implement retry on NACK or timeout.
# UNRESOLVED: explicit safety warnings or interlock procedures in source
# are limited to protocol-level notes above; no hardware safety limits stated
```

## Notes

**Protocol:** Somfy Digital Network (SDN) over RS-485. The document explicitly states RS-485 serial configuration (4800 baud, 8 data bits, odd parity). SDN is distinct from RS-232 — this is a balanced serial bus protocol, not a point-to-point serial protocol.

**Message format:** All SDN messages are 11–32 bytes. Byte layout: MSG | ACK/LEN | NODE TYPE | SOURCE@ (3 bytes) | DEST@ (3 bytes) | DATA (0–21 bytes) | CHECKSUM. SOURCE@ and DEST@ are LSBF (least significant byte first). All data bits are inverted before transmission for backward compatibility.

**Addressing:** Point-to-point (dest = specific NodeID), Group (dest = GroupID with 000000h), Broadcast (dest = FFFFFFh). NodeType filtering also available.

**Timing requirements:** Bus free timeout (Tfree) = 3ms minimum. Slave reply delay (Trep) = 5–255ms (partially randomized). Master must wait Treq = 10ms after bus inactivity before sending.

**Collision handling:** No ACK requests in group/broadcast mode. Use retry strategy on NACK or timeout.

**Command payloads:** The `command:` field on each Action carries the SDN MSG opcode (Byte 1) documented verbatim in source §6. This is the constant distinguishing payload; framing bytes (ACK/LEN, NODETYPE, SOURCE@, DEST@, DATA, CHECKSUM) are computed at runtime per source §5.

**Traits inference rationale:**
- `powerable`: CTRL_MOVETO includes UP/DOWN limit movement — inferred from control commands
- `queryable`: GET_MOTOR_POSITION, GET_MOTOR_STATUS, GET_NODE_APP_VERSION present — inferred from status request messages
- `routable`: Group addressing mode documented — inferred from group configuration messages

<!-- UNRESOLVED: serial flow_control setting not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: whether SDN over TCP/IP gateway exists for this series not stated -->
<!-- UNRESOLVED: full NodeType list may be incomplete (09h noted as "Not yet available") -->
````

Upgrade done. Added 10 GET query actions + MSG opcode `command:` payloads to all 18 actions. Preserved existing IDs, Feedbacks, Safety, Transport. Source §6 fully covered now.

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-16T15:15:37.329Z
last_checked_at: 2026-07-22T01:13:56.125Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:13:56.125Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched verbatim in source with correct parameter shapes; transport verified; source command catalogue fully represented. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power specifications (voltage, current) not stated in source"
- "flow control not stated in source"
- "trait inference - see notes"
- "no standalone settable parameters outside of Actions"
- "SDN is a master/slave request-response protocol;"
- "no multi-step macro sequences described in source"
- "explicit safety warnings or interlock procedures in source"
- "serial flow_control setting not stated in source"
- "voltage/current/power specifications not in source"
- "whether SDN over TCP/IP gateway exists for this series not stated"
- "full NodeType list may be incomplete (09h noted as \"Not yet available\")"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
