---
spec_id: admin/somfy-urtsi-ii-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy URTSI II (North America) Control Spec"
manufacturer: Somfy
model_family: "URTSI II"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "URTSI II"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:16.971Z
last_checked_at: 2026-06-02T05:46:21.741Z
generated_at: 2026-06-02T05:46:21.741Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state the URTSI II's specific hardware revision, RS-485 termination, or max bus length"
  - "source documents \"Start Bit = logical level 0\" and \"Stop Bit = logical level 1\" but not flow control; assumed none"
  - "source does not document multi-step command sequences"
  - "no electrical, thermal, or mechanical safety warnings stated in source"
  - "source refines a generic SDN bus protocol; URTSI II-specific node count, RS-485 termination requirements, max cable length, and exact hardware revision are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:21.741Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched literally against source opcodes; transport parameters verified from §4.1; 100% coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy URTSI II (North America) Control Spec

## Summary
The Somfy URTSI II is an RS-485 transmitter that speaks the Somfy Digital Network (SDN) protocol for controlling Somfy motorized window-covering devices. This spec covers the SDN bus protocol exposed by the URTSI II: bus configuration, frame structure, and the full set of SET / CTRL / GET / POST / ACK / NACK message opcodes documented for the bus.

<!-- UNRESOLVED: source does not state the URTSI II's specific hardware revision, RS-485 termination, or max bus length -->

## Transport
```yaml
# URTSI II exposes an RS-485 differential serial bus running the SDN protocol.
# All data bytes are logically inverted before transmission (complement of each byte).
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none
  # UNRESOLVED: source documents "Start Bit = logical level 0" and "Stop Bit = logical level 1" but not flow control; assumed none
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame structure (per §5 of source):** every SDN frame is 11–32 bytes, laid out as `MSG | ACK/LEN | NODE_TYPE | SOURCE@ (3 bytes) | DEST@ (3 bytes) | DATA (0–21 bytes) | CHECKSUM`. The checksum is the sum of bytes 1 through n-2 (no error correction). No sync byte; frame end is detected by bus inactivity. SOURCE@ and DEST@ are LSB-first. The actions below document the **MSG opcode and DATA payload** for each command; the surrounding frame fields (SOURCE@, DEST@, ACK bit, CHECKSUM) must be wrapped by the controller per §5.

## Traits
```yaml
# Source documents explicit query/GET opcodes that elicit POST responses, plus
# status POSTs that the device emits. Power-on/off is implicit via the SDN bus
# (e.g. NETWORK_LOCK save/restore on power cycle) but not a discrete command.
- queryable       # inferred from GET_/POST_ opcode pairs and unsolicited status reports
```

## Actions
```yaml
# Every distinct opcode documented in the SDN source. Each SET/GET/POST/ACK/NACK
# is one action. The `command` field is the literal MSG opcode (hex) from the
# source; DATA layout is described via `params` and inline notes.

# --- Device Management: NodeID ---
- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "40h"
  params: []
  notes: |
    MASTER → bus. SLAVE replies with POST_NODE_ADDR (60h) carrying its
    3-byte NodeID in the message header. With many devices on the bus,
    not all replies are guaranteed.

- id: post_node_addr
  label: Post Node Address
  kind: event
  command: "60h"
  params: []
  notes: |
    SLAVE → MASTER. Unsolicited report in response to GET_NODE_ADDR.
    NodeID is in the SOURCE@/DEST@ header, no DATA bytes.

# --- Device Management: Group Configuration ---
- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51h"
  params:
    - name: group_index
      type: integer
      description: Entry in the group table (0-15)
    - name: group_id
      type: integer
      description: 24-bit GroupID (LSB-first)
  notes: DATA length = 4 bytes: GroupIndex (8 bits) + GroupID (24 bits).

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "41h"
  params:
    - name: group_index
      type: integer
      description: Entry in the group table (0-15)
  notes: DATA length = 1 byte (GroupIndex). Slave replies with POST_GROUP_ADDR.

- id: post_group_addr
  label: Post Group Address
  kind: event
  command: "61h"
  params: []
  notes: |
    DATA length = 4 bytes: GroupIndex (8 bits) + GroupID (24 bits, n/a).
    Reply to GET_GROUP_ADDR.

# --- Acknowledgement and Errors ---
- id: ack
  label: Acknowledgement
  kind: event
  command: "7Fh"
  params: []
  notes: |
    Slave → master. Sent only when the request had the ACK bit set
    (CTRL, GET, or SET). Confirms settings saved or control execution
    started (not necessarily finished).

- id: nack
  label: Negative Acknowledgement
  kind: event
  command: "6Fh"
  params:
    - name: error_code
      type: integer
      description: |
        8-bit error code: 01h = Data out of range; 10h = Unknown message;
        11h = Message length error; FFh = Busy.
  notes: DATA length = 1 byte (ErrorCode).

# --- Device Information: Firmware Revision ---
- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  command: "74h"
  params: []
  notes: Slave replies with POST_NODE_APP_VERSION.

- id: post_node_app_version
  label: Post Firmware Revision
  kind: event
  command: "75h"
  params: []
  notes: |
    DATA length = 6 bytes: App_Reference (24 bits, firmware part number),
    App_IndexLetter (8 bits ASCII, 41h-5Ah = major rev),
    App_IndexNumber (8 bits, firmware rev), Reserved (8 bits).
    Example: 5063486A02 is coded 4Dh 43h 3Eh | 41h | 02h.

# --- Device Information: User-defined Text Label ---
- id: set_node_label
  label: Set Node Label
  kind: action
  command: "55h"
  params:
    - name: label
      type: string
      description: 16-character text label; pad with spaces if shorter
  notes: DATA length = 16 bytes (always).

- id: get_node_label
  label: Get Node Label
  kind: query
  command: "45h"
  params: []
  notes: Slave replies with POST_NODE_LABEL.

- id: post_node_label
  label: Post Node Label
  kind: event
  command: "65h"
  params:
    - name: label
      type: string
      description: 16-character text label
  notes: DATA length = 16 bytes. Reply to GET_NODE_LABEL.

# --- Device Configuration: HMI Management ---
- id: set_local_ui
  label: Set HMI (Local UI) Lock
  kind: action
  command: "17h"
  params:
    - name: function
      type: integer
      description: 00h = Enable/Unlock, 01h = Disable/Lock
    - name: ui_index
      type: integer
      description: |
        00h = All local controls and feedbacks; 01h = DCT input;
        02h = Local stimuli (e.g. radio pairing pushbutton);
        03h = Local radio access (e.g. Bluetooth);
        04h = Touch Motion feature; 05h = LEDs
    - name: priority
      type: integer
      description: 00h-FFh, greater = higher priority lock
  notes: |
    DATA length = 3 bytes. For UI_Index=00h, priority must be ≥ the
    highest existing lock level or NACK(LOW_PRIORITY) is returned.
    DCT / Local Stimuli lock state is NOT saved across power cycles;
    all other items are saved and restored.

- id: get_local_ui
  label: Get HMI (Local UI) Status
  kind: query
  command: "27h"
  params:
    - name: ui_index
      type: integer
      description: 01h-UI_MAX (see SET_LOCAL_UI for indices)
  notes: DATA length = 1 byte (UI_Index). Slave replies with POST_LOCAL_UI.

- id: post_local_ui
  label: Post HMI (Local UI) Status
  kind: event
  command: "37h"
  params: []
  notes: |
    DATA length = 5 bytes: UI_Index (8 bits), Status (00h=Enabled,
    01h=Disabled), Source_Addr (24-bit, who set the lock),
    Priority (8 bits). When unlocked, Source_Addr=000000h, Priority=00h.

# --- Device Configuration: Intermediate Positions ---
- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "15h"
  params:
    - name: function
      type: integer
      description: |
        00h = Delete IP (Value ignored; NACK if IP not set);
        01h = Set IP at current position (Value ignored);
        03h = Set IP at specified position in % (Value = %);
        04h = Divide full range into N IPs (Value = count, IP_Index ignored)
    - name: ip_index
      type: integer
      description: 1-16, which intermediate position slot
    - name: value
      type: integer
      description: 16-bit; meaning depends on Function (ignored, % position, or IP count)
  notes: |
    DATA length = 4 bytes: Function (8) + IP_Index (8) + Value (16).
    Function 04h example: Value=2 sets IP1=33%, IP2=66%;
    Value=3 sets IP1=25%, IP2=50%, IP3=75%. Existing IPs are overwritten.

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "25h"
  params:
    - name: ip_index
      type: integer
      description: 1-16
  notes: DATA length = 1 byte. Slave replies with POST_MOTOR_IP.

- id: post_motor_ip
  label: Post Intermediate Position
  kind: event
  command: "35h"
  params: []
  notes: |
    DATA length = 4 bytes: IP_index (8), Reserved (16),
    IP_position_percentage (8, 0-100, FFh if IP not set).
    Reply to GET_MOTOR_IP.

# --- Device Configuration: Speed Adjustment (DC motors only) ---
- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "13h"
  params:
    - name: up_speed
      type: integer
      description: 8-bit speed (rpm) during UP movement; range per motor datasheet
    - name: down_speed
      type: integer
      description: 8-bit speed (rpm) during DOWN movement; range per motor datasheet
    - name: slow_speed
      type: integer
      description: 8-bit speed (rpm) for adjustment movements; range per motor datasheet
  notes: |
    DATA length = 3 bytes. Default and range are motor-specific;
    see device technical datasheet. Only supported on DC motors.

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "23h"
  params: []
  notes: DATA length = 0. Slave replies with POST_MOTOR_ROLLING_SPEED.

- id: post_motor_rolling_speed
  label: Post Motor Rolling Speed
  kind: event
  command: "33h"
  params: []
  notes: |
    DATA length = 3 bytes: UP_Speed (8), DOWN_Speed (8), Slow_Speed (8).
    Ranges per motor datasheet.

# --- Device Configuration: Lock Network Commands ---
- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16h"
  params:
    - name: function
      type: integer
      description: |
        00h = Unlock (Priority applied); 01h = Lock at current position;
        03h = Save NETWORK_LOCK across power cycles (Priority ignored);
        04h = Do not save NETWORK_LOCK across power cycles (Priority ignored)
    - name: priority
      type: integer
      description: 00h-FFh, greater = higher priority
  notes: |
    DATA length = 2 bytes. When locked, only CTRL_MOVETO with equal or
    higher priority is accepted; all other movement/limit messages
    return NACK(NODE_IS_LOCKED). Factory default = Do Not Save.

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  command: "26h"
  params: []
  notes: DATA length = 0. Slave replies with POST_NETWORK_LOCK.

- id: post_network_lock
  label: Post Network Lock Status
  kind: event
  command: "36h"
  params: []
  notes: |
    DATA length = 6 bytes: Status (00h=Unlocked, 01h=Locked),
    Source_Addr (24-bit, who locked), Priority (8 bits),
    Saved (00h=not restored on power cycle, 01h=restored).
    When unlocked, Source_Addr=000000h and Priority=00h.

# --- Device Control: Move to Position ---
- id: ctrl_moveto
  label: Move To Position
  kind: action
  command: "03h"
  params:
    - name: function
      type: integer
      description: |
        00h = Move to DOWN limit (Position ignored);
        01h = Move to UP limit (Position ignored);
        02h = Move to Intermediate Position (Position = IP index 0-15);
        04h = Move to Position in % of full travel (Position = 0-100)
    - name: position
      type: integer
      description: 16-bit; meaning depends on Function
    - name: reserved
      type: integer
      description: 8-bit reserved (00h)
  notes: DATA length = 4 bytes: Function (8) + Position (16) + Reserved (8).

# --- Device Control: Stop ---
- id: ctrl_stop
  label: Stop
  kind: action
  command: "02h"
  params:
    - name: reserved
      type: integer
      description: 8-bit reserved
  notes: |
    DATA length = 1 byte. Motor stops immediately, no speed ramp-down.

# --- Device Status: Motor Position ---
- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "0Ch"
  params: []
  notes: Slave replies with POST_MOTOR_POSITION. Position is reported even while running.

- id: post_motor_position
  label: Post Motor Position
  kind: event
  command: "0Dh"
  params: []
  notes: |
    DATA length = 5 bytes: Position_pulse (16, UP_LIMIT-DOWN_LIMIT),
    Position_percentage (8, 0-100), Reserved (8), IP (8, 01h-IP_MAX,
    FFh = not at an IP).

# --- Device Status: Motor Status ---
- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "0Eh"
  params: []
  notes: Slave replies with POST_MOTOR_STATUS.

- id: post_motor_status
  label: Post Motor Status
  kind: event
  command: "0Fh"
  params: []
  notes: |
    DATA length = 4 bytes:
    Status (8): 00h=Stopped, 01h=Running, 02h=Blocked (thermal/obstacle), 03h=Locked;
    Direction (8): 00h=Going DOWN, 01h=Going UP, FFh=Unknown;
    Source (8): 00h=Internal, 01h=Network message, 02h=Local UI;
    Cause (8): 00h=Target reached, 01h=Explicit command, 02h=Wink,
                20h=Obstacle detection, 21h=Over-current protection,
                22h=Thermal protection, 30h=Run time exceeded,
                32h=Timeout exceeded (>2 min on CTRL_MOVE), FFh=Reset/PowerUp.
```

## Feedbacks
```yaml
- id: node_address
  type: integer
  description: 24-bit NodeID reported in POST_NODE_ADDR header.
- id: group_address
  type: integer
  description: 24-bit GroupID reported in POST_GROUP_ADDR.
- id: firmware_part_number
  type: integer
  description: 24-bit App_Reference from POST_NODE_APP_VERSION.
- id: firmware_index_letter
  type: string
  description: ASCII byte (41h-5Ah) for firmware major revision.
- id: firmware_index_number
  type: integer
  description: 8-bit firmware revision index.
- id: node_label
  type: string
  description: 16-character user-defined label from POST_NODE_LABEL.
- id: local_ui_status
  type: enum
  values: [enabled_unlocked, disabled_locked]
  description: Per-UI_Index status from POST_LOCAL_UI; Source_Addr and Priority identify locker.
- id: motor_ip_position
  type: integer
  description: 0-100 percentage for a given IP_index; FFh means IP not set.
- id: motor_speed_up
  type: integer
  description: 8-bit UP speed (rpm) from POST_MOTOR_ROLLING_SPEED.
- id: motor_speed_down
  type: integer
  description: 8-bit DOWN speed (rpm).
- id: motor_speed_slow
  type: integer
  description: 8-bit slow/adjustment speed (rpm).
- id: network_lock_status
  type: enum
  values: [unlocked, locked]
  description: From POST_NETWORK_LOCK.
- id: network_lock_saved
  type: enum
  values: [not_restored_on_power_cycle, restored_on_power_cycle]
- id: motor_position_pulse
  type: integer
  description: 16-bit pulse count (UP_LIMIT-DOWN_LIMIT).
- id: motor_position_percentage
  type: integer
  description: 0-100 percent of full travel range.
- id: motor_position_ip
  type: integer
  description: 1-IP_MAX (matching IP index) or FFh if not at an IP.
- id: motor_status
  type: enum
  values: [stopped, running, blocked, locked]
- id: motor_direction
  type: enum
  values: [going_down, going_up, unknown]
- id: motor_command_source
  type: enum
  values: [internal, network_message, local_ui]
- id: motor_status_cause
  type: enum
  values: [target_reached, explicit_command, wink, obstacle_detection, over_current_protection, thermal_protection, run_time_exceeded, timeout_exceeded, reset_powerup]
- id: nack_error_code
  type: enum
  values: [data_out_of_range, unknown_message, message_length_error, busy]
  description: Error code byte from NACK (6Fh).
```

## Variables
```yaml
# Settable, non-discrete parameters the source exposes via SET opcodes.
- id: group_address
  type: integer
  description: 24-bit GroupID; settable via SET_GROUP_ADDR per GroupIndex 0-15.
- id: node_label
  type: string
  description: 16-character label; settable via SET_NODE_LABEL.
- id: local_ui_lock_function
  type: enum
  values: [enable_unlock, disable_lock]
  description: SET_LOCAL_UI Function byte.
- id: local_ui_lock_priority
  type: integer
  description: 00h-FFh priority for the HMI lock; greater = higher.
- id: motor_ip_index
  type: integer
  description: IP slot 1-16.
- id: motor_ip_value
  type: integer
  description: Position (0-100) or IP count, interpretation depends on Function.
- id: motor_speed_up
  type: integer
  description: UP speed (rpm); range per motor datasheet.
- id: motor_speed_down
  type: integer
  description: DOWN speed (rpm); range per motor datasheet.
- id: motor_speed_slow
  type: integer
  description: Slow/adjustment speed (rpm); range per motor datasheet.
- id: network_lock_function
  type: enum
  values: [unlock, lock, save_across_power_cycle, do_not_save_across_power_cycle]
- id: network_lock_priority
  type: integer
  description: 00h-FFh; ignored for Functions 03h and 04h.
```

## Events
```yaml
# Unsolicited notifications from the URTSI II / downstream SDN nodes.
- id: post_node_addr
  opcode: "60h"
  description: Reply to GET_NODE_ADDR; carries 3-byte NodeID in header.
- id: post_group_addr
  opcode: "61h"
  description: Reply to GET_GROUP_ADDR.
- id: post_node_app_version
  opcode: "75h"
  description: Firmware version report.
- id: post_node_label
  opcode: "65h"
  description: 16-byte label report.
- id: post_local_ui
  opcode: "37h"
  description: HMI lock status report.
- id: post_motor_ip
  opcode: "35h"
  description: Intermediate position report.
- id: post_motor_rolling_speed
  opcode: "33h"
  description: Motor speed report.
- id: post_network_lock
  opcode: "36h"
  description: Network lock status report.
- id: post_motor_position
  opcode: "0Dh"
  description: Current motor position; emitted even while running.
- id: post_motor_status
  opcode: "0Fh"
  description: Motor state / direction / source / cause.
- id: ack
  opcode: "7Fh"
  description: Sent only when the request's ACK bit was set.
- id: nack
  opcode: "6Fh"
  description: Error report; carries 1-byte ErrorCode.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: network_lock
    description: |
      When SET_NETWORK_LOCK Function=01h is in effect, all CTRL_xxx movement
      commands and SET_MOTOR_LIMITS / SET_TILT_LIMITS messages are rejected
      with NACK(NODE_IS_LOCKED) unless they carry equal-or-higher priority.
  - id: local_ui_priority
    description: |
      SET_LOCAL_UI with UI_Index=00h must carry priority ≥ the highest
      existing lock level, otherwise NACK(LOW_PRIORITY) is returned.
collision_guidance: |
  Avoid requesting feedback or ACK in Group or Broadcast addressing modes
  to lower RS-485 collision risk. Use a retry strategy on NACK or on ACK
  timeout (Trep range 5-255 ms).
# UNRESOLVED: no electrical, thermal, or mechanical safety warnings stated in source
```

## Notes
- **Byte inversion quirk (§4.2):** every data byte must be logically inverted (complement) before transmission on the bus. Example: source byte `58h` is sent on the wire as `A7h`. The controller must apply the same inversion when receiving.
- **Frame detection (§4.3):** no sync byte. Frame end is implied by bus inactivity exceeding Tfree (3 ms). A master must wait Treq (10 ms) after the last bus activity before transmitting. A slave waits Trep (5–255 ms, partially randomized) before replying. Tc (max 1 ms) must not be exceeded between consecutive characters within a frame.
- **Addressing modes (§3.4):** Point-to-Point (specific NodeID), Group (SOURCE@=GroupID, DEST@=000000h), Broadcast (DEST@=FFFFFFh), and NodeType filtering (DEST NodeType byte).
- **Optional ACK (§3.6, §6.1.3):** setting the ACK bit in a SET/CTRL/GET request causes the slave to reply with ACK on success or NACK(ErrorCode) on failure. No ACK follows a status request — the POST_xxx is itself the feedback.
- **LOCAL_UI persistence (§6.3.1):** DCT and Local Stimuli lock state is NOT saved across power cycles; all other UI locks ARE saved and restored.
- **NETWORK_LOCK persistence (§6.3.4):** Function 03h saves the highest lock across power cycle, Function 04h does not. Factory default = Do Not Save.

<!-- UNRESOLVED: source refines a generic SDN bus protocol; URTSI II-specific node count, RS-485 termination requirements, max cable length, and exact hardware revision are not stated in source. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:16.971Z
last_checked_at: 2026-06-02T05:46:21.741Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:21.741Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched literally against source opcodes; transport parameters verified from §4.1; 100% coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state the URTSI II's specific hardware revision, RS-485 termination, or max bus length"
- "source documents \"Start Bit = logical level 0\" and \"Stop Bit = logical level 1\" but not flow control; assumed none"
- "source does not document multi-step command sequences"
- "no electrical, thermal, or mechanical safety warnings stated in source"
- "source refines a generic SDN bus protocol; URTSI II-specific node count, RS-485 termination requirements, max cable length, and exact hardware revision are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
