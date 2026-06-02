---
spec_id: admin/somfy-ci-somfy-rts
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy CI-SOMFY-RTS Control Spec"
manufacturer: Somfy
model_family: CI-SOMFY-RTS
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - CI-SOMFY-RTS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:07.519Z
last_checked_at: 2026-06-02T22:14:43.071Z
generated_at: 2026-06-02T22:14:43.071Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the SDN RS485 protocol generically; per-product limits (speed ranges, IP count maxima) are deferred to per-motor technical datasheets that are not in this source."
  - "settable parameters are exposed via SET_* actions above"
  - "source documents no unsolicited event/notification messages."
  - "no multi-step macro sequences are documented in the source."
  - "voltage/current/power specifications are not stated in this"
  - "- Motor-specific speed ranges and IP_MAX / UI_MAX limits depend on per-motor datasheets not included in this source."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:14:43.071Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy CI-SOMFY-RTS Control Spec

## Summary
Somfy Digital Network (SDN) RS485 control protocol for Somfy motorized window covering products, including the RS485 RTS transmitter (NodeType 05h) and associated motor product families. Spec covers serial framing, addressing modes (point-to-point, group, broadcast), device management, configuration, motor control, and status query messages.

<!-- UNRESOLVED: source describes the SDN RS485 protocol generically; per-product limits (speed ranges, IP count maxima) are deferred to per-motor technical datasheets that are not in this source. -->

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
  bus: rs485
  notes: |
    Character coding NRZ. Least significant bit sent first.
    All data bits MUST be inverted (bitwise NOT) before transmission
    for backward compatibility with earliest protocol versions.
    Example: byte 58h on the wire is transmitted as A7h.
    Timing requirements:
      Tc   = max 1 ms between consecutive characters in a message
      Tfree = min 3 ms bus free timeout
      Trep = 5 ms typ, 255 ms max - slave reply delay (partially randomized)
      Treq = min 10 ms - master inactivity before sending a new request
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable        # inferred from GET_* query commands present
- levelable        # inferred from CTRL_MOVETO with Function 04h (move to % of travel)
```

## Actions
```yaml
# All SDN messages share the common frame:
#   [MSG][ACK/LEN][NODE TYPE][SOURCE@(3)][DEST@(3)][DATA...][CHECKSUM]
# CHECKSUM = sum of the complements of every byte from MSG through last DATA byte.
# Minimum frame length 11 bytes (no DATA); maximum 32 bytes (21 DATA bytes).
# `command:` below holds the MSG opcode byte verbatim from §6 of the source;
# the full frame is constructed by the controller per the addressing rules in §5.

- id: get_node_addr
  label: Get Node Address (GET_NODE_ADDR)
  kind: query
  command: "40h"
  params: []
  notes: |
    Used to discover devices on the bus. With many devices present, replies
    from all devices are not guaranteed.

- id: set_group_addr
  label: Set Group Address (SET_GROUP_ADDR)
  kind: action
  command: "51h"
  params:
    - name: group_index
      type: integer
      description: Entry in the group table (0..15)
    - name: group_id
      type: integer
      description: 24-bit associated group NodeID

- id: get_group_addr
  label: Get Group Address (GET_GROUP_ADDR)
  kind: query
  command: "41h"
  params:
    - name: group_index
      type: integer
      description: Entry in the group table (0..15)

- id: get_node_app_version
  label: Get Firmware Revision (GET_NODE_APP_VERSION)
  kind: query
  command: "74h"
  params: []

- id: set_node_label
  label: Set User-Defined Text Label (SET_NODE_LABEL)
  kind: action
  command: "55h"
  params:
    - name: label
      type: string
      description: 16-character ASCII label; pad short strings with spaces.

- id: get_node_label
  label: Get User-Defined Text Label (GET_NODE_LABEL)
  kind: query
  command: "45h"
  params: []

- id: set_local_ui
  label: Set HMI/Local UI Lock (SET_LOCAL_UI)
  kind: action
  command: "17h"
  params:
    - name: function
      type: enum
      description: |
        00h = Enable/Unlock
        01h = Disable/Lock
    - name: ui_index
      type: enum
      description: |
        00h = All local controls and feedbacks
        01h = DCT input
        02h = Local stimuli (e.g. radio pairing pushbutton)
        03h = Local Radio access (e.g. Bluetooth)
        04h = Touch Motion feature
        05h = LEDs
    - name: priority
      type: integer
      description: 0..255; higher value = higher priority

- id: get_local_ui
  label: Get HMI/Local UI Status (GET_LOCAL_UI)
  kind: query
  command: "27h"
  params:
    - name: ui_index
      type: integer
      description: UI item index (01h..UI_MAX); see set_local_ui enum.

- id: set_motor_ip
  label: Set Intermediate Position (SET_MOTOR_IP)
  kind: action
  command: "15h"
  params:
    - name: function
      type: enum
      description: |
        00h = Delete IP (value ignored; NACK IP_NOT_SET if IP doesn't exist)
        01h = Set IP at the current position (value ignored)
        03h = Set IP at the specified position (value = percentage)
        04h = Divide full range into N equally spaced IPs (value = IP count; ip_index ignored)
    - name: ip_index
      type: integer
      description: Intermediate Position index (1..16)
    - name: value
      type: integer
      description: 16-bit function-dependent value (position % or IP count).

- id: get_motor_ip
  label: Get Intermediate Position (GET_MOTOR_IP)
  kind: query
  command: "25h"
  params:
    - name: ip_index
      type: integer
      description: IP index (1..16)

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed (SET_MOTOR_ROLLING_SPEED)
  kind: action
  command: "13h"
  params:
    - name: up_speed
      type: integer
      description: UP movement speed (rpm). DC motors only. Range per motor datasheet.
    - name: down_speed
      type: integer
      description: DOWN movement speed (rpm). DC motors only. Range per motor datasheet.
    - name: slow_speed
      type: integer
      description: Adjustment movement speed (rpm). DC motors only. Range per motor datasheet.
  notes: |
    Speed adjustment is only available on DC motors. Default speed and valid
    speed range are motor-specific; refer to the device technical datasheet.

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed (GET_MOTOR_ROLLING_SPEED)
  kind: query
  command: "23h"
  params: []

- id: set_network_lock
  label: Set Network Lock (SET_NETWORK_LOCK)
  kind: action
  command: "16h"
  params:
    - name: function
      type: enum
      description: |
        00h = Unlock
        01h = Lock device at current position
        03h = Save NETWORK_LOCK upon power cycle (priority ignored)
        04h = Do not save NETWORK_LOCK upon power cycle (priority ignored)
    - name: priority
      type: integer
      description: 0..255; higher value = higher priority

- id: get_network_lock
  label: Get Network Lock Status (GET_NETWORK_LOCK)
  kind: query
  command: "26h"
  params: []

- id: ctrl_moveto
  label: Move to Position (CTRL_MOVETO)
  kind: action
  command: "03h"
  params:
    - name: function
      type: enum
      description: |
        00h = Move to DOWN limit (position ignored)
        01h = Move to UP limit (position ignored)
        02h = Move to Intermediate Position (position = IP index 0..15)
        04h = Move to position in % of full travel (position = 0..100)
    - name: position
      type: integer
      description: 16-bit function-dependent value (IP index or percentage).

- id: ctrl_stop
  label: Stop (CTRL_STOP)
  kind: action
  command: "02h"
  params: []
  notes: Motor stops immediately without speed ramp-down.

- id: get_motor_position
  label: Get Motor Position (GET_MOTOR_POSITION)
  kind: query
  command: "0Ch"
  params: []
  notes: Position is reported even while the motor is running.

- id: get_motor_status
  label: Get Motor Status (GET_MOTOR_STATUS)
  kind: query
  command: "0Eh"
  params: []
```

## Feedbacks
```yaml
- id: post_node_addr
  label: Node Address Reply (POST_NODE_ADDR)
  command: "60h"
  type: response
  notes: |
    Reply to GET_NODE_ADDR. NodeID carried in frame header (SOURCE@); no DATA payload.

- id: post_group_addr
  label: Group Address Reply (POST_GROUP_ADDR)
  command: "61h"
  type: response
  fields:
    - name: group_index
      type: integer
      description: 8-bit entry in the group table (0..15)
    - name: group_id
      type: integer
      description: 24-bit associated group address

- id: ack
  label: Acknowledge (ACK)
  command: "7Fh"
  type: response
  notes: |
    Sent only when ACK bit was set to 1 in the originating CTRL/GET/SET request.
    Indicates: for SET, parameters saved; for CTRL, execution started (not necessarily finished).

- id: nack
  label: Negative Acknowledge (NACK)
  command: "6Fh"
  type: error
  fields:
    - name: error_code
      type: enum
      values:
        - "01h: Data out of range (DATA fields not within expected range)"
        - "10h: Unknown message (MSG identifier unknown)"
        - "11h: Message Length Error (frame below minimum length)"
        - "FFh: Busy - cannot process message"
  notes: |
    Additional NACK codes mentioned but not enumerated in this section:
    NACK(LOW_PRIORITY) - SET_LOCAL_UI / network lock with insufficient priority.
    NACK(NODE_IS_LOCKED) - CTRL/SET refused while network is locked.
    NACK(IP_NOT_SET) - SET_MOTOR_IP delete on non-existent IP.

- id: post_node_app_version
  label: Firmware Revision Reply (POST_NODE_APP_VERSION)
  command: "75h"
  type: response
  fields:
    - name: app_reference
      type: integer
      description: 24-bit firmware part number
    - name: app_index_letter
      type: string
      description: 8-bit ASCII A..Z (41h..5Ah), firmware major revision
    - name: app_index_number
      type: integer
      description: 8-bit firmware revision number
    - name: reserved
      type: integer
      description: 8-bit reserved

- id: post_node_label
  label: Node Label Reply (POST_NODE_LABEL)
  command: "65h"
  type: response
  fields:
    - name: label
      type: string
      description: 16-character ASCII string

- id: post_local_ui
  label: Local UI Status Reply (POST_LOCAL_UI)
  command: "37h"
  type: response
  fields:
    - name: ui_index
      type: integer
      description: UI item index (01h..UI_MAX)
    - name: status
      type: enum
      values:
        - "00h: Enabled/Unlocked"
        - "01h: Disabled/Locked"
    - name: source_addr
      type: integer
      description: 24-bit NodeID of the device that sent the lock command (zero when unlocked)
    - name: priority
      type: integer
      description: 0..255; higher value = higher priority (zero when unlocked)

- id: post_motor_ip
  label: Intermediate Position Reply (POST_MOTOR_IP)
  command: "35h"
  type: response
  fields:
    - name: ip_index
      type: integer
      description: IP index (1..16)
    - name: reserved
      type: integer
      description: 16-bit reserved
    - name: ip_position_percentage
      type: integer
      description: 0..100, or FFh when the IP is not set

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Reply (POST_MOTOR_ROLLING_SPEED)
  command: "33h"
  type: response
  fields:
    - name: up_speed
      type: integer
      description: UP movement speed (per device datasheet)
    - name: down_speed
      type: integer
      description: DOWN movement speed (per device datasheet)
    - name: slow_speed
      type: integer
      description: Adjustment movement speed (per device datasheet)

- id: post_network_lock
  label: Network Lock Status Reply (POST_NETWORK_LOCK)
  command: "36h"
  type: response
  fields:
    - name: status
      type: enum
      values:
        - "00h: Unlocked"
        - "01h: Locked"
    - name: source_addr
      type: integer
      description: 24-bit NodeID of the device that sent the lock command
    - name: priority
      type: integer
      description: 0..255; higher value = higher priority
    - name: saved
      type: enum
      values:
        - "00h: Lock will not be restored on power cycle"
        - "01h: Lock will be restored on power cycle"

- id: post_motor_position
  label: Motor Position Reply (POST_MOTOR_POSITION)
  command: "0Dh"
  type: response
  fields:
    - name: position_pulse
      type: integer
      description: 16-bit pulse count between UP_LIMIT and DOWN_LIMIT
    - name: position_percentage
      type: integer
      description: 0..100
    - name: reserved
      type: integer
      description: 8-bit reserved
    - name: ip
      type: integer
      description: |
        Current IP (01h..IP_MAX), or FFh if the position does not correspond
        to any IP. If position corresponds to several IPs, the first matching
        IP on the list is returned.

- id: post_motor_status
  label: Motor Status Reply (POST_MOTOR_STATUS)
  command: "0Fh"
  type: response
  fields:
    - name: status
      type: enum
      values:
        - "00h: Stopped"
        - "01h: Running (during movement)"
        - "02h: Blocked (thermal protection, obstacle)"
        - "03h: Locked (NETWORK_LOCK by another device)"
    - name: direction
      type: enum
      values:
        - "00h: Going DOWN"
        - "01h: Going UP (if stopped, indicates last movement direction)"
        - "FFh: Unknown"
    - name: source
      type: enum
      values:
        - "00h: Internal (limit/IP/position reached, over-current, obstacle, thermal)"
        - "01h: Network message (any SDN bus message)"
        - "02h: Local UI (DCT, local stimulus, local wireless)"
    - name: cause
      type: enum
      values:
        - "00h: Target reached (limit or IP or already there)"
        - "01h: Explicit command (network or local UI)"
        - "02h: Wink"
        - "20h: Obstacle detection"
        - "21h: Over-current protection"
        - "22h: Thermal protection"
        - "30h: Run time exceeded (continuous runtime limit)"
        - "32h: Timeout exceeded (CTRL_MOVE > 2 min, adjustment canceled)"
        - "FFh: Reset / PowerUp (power recycled or no command after startup)"
```

## Variables
```yaml
# UNRESOLVED: settable parameters are exposed via SET_* actions above
# (node label, group table entries, intermediate positions, rolling speeds,
# local UI lock state, network lock state). No separate variable-style
# polling interface is documented in the source.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited event/notification messages.
# All device-originated messages (POST_*, ACK, NACK) are responses to master
# requests, not asynchronous events.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences are documented in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: network_lock
    description: |
      SET_NETWORK_LOCK / CTRL_NETWORK_LOCK locks the device against network
      commands at a configurable priority level. While locked, only
      CTRL_NETWORK_LOCK messages with equal or higher priority are accepted;
      all other CTRL_xxx and SET_MOTOR_LIMITS / SET_TILT_LIMITS messages are
      rejected with NACK(NODE_IS_LOCKED).
  - id: motor_blocked
    description: |
      Motor reports POST_MOTOR_STATUS status=02h (Blocked) when it cannot move
      due to thermal protection or obstacle detection. Cause field indicates
      the specific protection event (20h obstacle, 21h over-current,
      22h thermal, 30h run-time exceeded).
  - id: ctrl_move_timeout
    description: |
      Continuous adjustment movement is canceled if more than 2 minutes
      elapse without a new command (cause 32h Timeout exceeded).
# UNRESOLVED: voltage/current/power specifications are not stated in this
# source and must be taken from per-motor technical datasheets.
```

## Notes
- Source: SDN RS485 protocol specification (§3–§6 covered).
- Addressing modes available on every message: point-to-point (DEST@ = device NodeID), group (DEST@ = 000000h, SOURCE@ = GroupID, device must have GroupID in its group table), broadcast (DEST@ = FFFFFFh). NodeType filtering is available via the NODE TYPE byte (byte 3): SOURCE NodeType = 0h for masters; DEST NodeType used to address a product family (02h Ø30 DC RS485, 05h RS485 RTS transmitter, 06h Glydea RS485, 07h Ø50 AC RS485, 08h Ø50 DC RS485, 09h Ø40 AC RS485 reserved).
- SOURCE@ and DEST@ are transmitted LSBF: a device labelled NodeID 05:04:03 appears in bytes 4..6 as `03 04 05`.
- Acknowledgements: ACK bit in byte 2 of any CTRL/SET/GET request opts in to ACK/NACK feedback. Recommended for reliability; group/broadcast addressing should NOT request ACK or feedback to reduce bus collisions.
- DATA length in §6 tables is the **minimum** DATA length; received messages may carry additional trailing bytes.
- Reserved DATA fields must be present in transmitted messages and set to 00h or FFh.

<!-- UNRESOLVED:
  - Motor-specific speed ranges and IP_MAX / UI_MAX limits depend on per-motor datasheets not included in this source.
  - Firmware version compatibility is not stated.
  - Electrical specifications (voltage, current, RS485 termination) are not in this source.
-->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:07.519Z
last_checked_at: 2026-06-02T22:14:43.071Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:14:43.071Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the SDN RS485 protocol generically; per-product limits (speed ranges, IP count maxima) are deferred to per-motor technical datasheets that are not in this source."
- "settable parameters are exposed via SET_* actions above"
- "source documents no unsolicited event/notification messages."
- "no multi-step macro sequences are documented in the source."
- "voltage/current/power specifications are not stated in this"
- "- Motor-specific speed ranges and IP_MAX / UI_MAX limits depend on per-motor datasheets not included in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
