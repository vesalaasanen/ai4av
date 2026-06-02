---
spec_id: admin/somfy-uai-plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy UAI+ Control Spec"
manufacturer: Somfy
model_family: UAI+
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - UAI+
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:16.319Z
last_checked_at: 2026-06-02T05:46:20.978Z
generated_at: 2026-06-02T05:46:20.978Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "UAI+ model-specific behaviour (firmware range, supported NodeType list, port) not stated in source."
  - "source describes request/response (GET_xxx / POST_xxx) but no"
  - "source documents no multi-step sequences."
  - "no explicit high-voltage / mechanical hazard warnings in source excerpt."
  - "UAI+-specific port number, supported NodeType list, firmware range, and DC-motor speed ranges not stated in source — they are device-specific (per technical datasheet)."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:20.978Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched verbatim in source §6 command tables; transport parameters verified against §4.1 serial config. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy UAI+ Control Spec

## Summary
The Somfy UAI+ integrates RS-485 Somfy Digital Network (SDN) bus devices (tubular motors, etc.) into third-party control systems. This spec covers the SDN half-duplex MASTER/SLAVE protocol: message framing, node addressing, and the command catalogue exposed by SDN-compatible motor endpoints.

<!-- UNRESOLVED: UAI+ model-specific behaviour (firmware range, supported NodeType list, port) not stated in source. -->

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
  electrical: rs485  # inferred: source states "RS485 device" / "RS485 bus" throughout
  half_duplex: true  # inferred from "half-duplex communication" statement
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       No explicit power on/off command in source
# - routable        No input/output routing
# - queryable       GET_xxx / POST_xxx query cycle present
# - levelable       Position commands present (CTRL_MOVETO)
# - lockable        SET_NETWORK_LOCK present
# - configurable     SET_xxx settings messages present
```

## Actions
```yaml
# SDN message format reminder (see §5):
#   Byte 1     MSG         - message opcode
#   Byte 2     ACK/LEN     - ACK bit + LEN (data length 0..31)
#   Byte 3     NODE TYPE   - src(4b) | dst(4b)
#   Bytes 4-6  SOURCE@     - 3-byte NodeID, LSBF
#   Bytes 7-9  DEST@       - 3-byte NodeID (or group / 000000h / FFFFFFh), LSBF
#   Bytes 10.. DATA        - see per-message tables
#   Last byte  CHECKSUM    - sum of all preceding bytes (no complement)
#
# All hex opcodes below are written VERBATIM from the source's "MSG" column.
# Variable DATA bytes are shown as {placeholders} with param descriptions.
# A sending implementation must also supply NodeType, Source@, Dest@, ACK bit,
# LEN byte, and the trailing CHECKSUM (sum of bytes 1..n-1).

# ===== Device Management =====

- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "MSG=40h, DATA length=0"
  params: []
  notes: "Broadcast request; slave replies with POST_NODE_ADDR (60h)."

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "MSG=51h, DATA={group_index}{group_id_3bytes}"
  params:
    - name: group_index
      type: integer
      description: Entry in the group table (0..15)
    - name: group_id
      type: string
      description: 24-bit GroupID, 3 bytes LSBF
  notes: "DATA length = 4 bytes."

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "MSG=41h, DATA={group_index}"
  params:
    - name: group_index
      type: integer
      description: Entry in the group table (0..15)
  notes: "DATA length = 1 byte."

- id: post_group_addr
  label: Group Address Report
  kind: feedback
  command: "MSG=61h, DATA={group_index}{group_id_3bytes}"
  params:
    - name: group_index
      type: integer
      description: Entry in the group table (0..15)
    - name: group_id
      type: string
      description: 24-bit GroupID, 3 bytes LSBF
  notes: "Posted by slave in reply to GET_GROUP_ADDR. DATA length = 4 bytes."

- id: ack
  label: Acknowledgment
  kind: feedback
  command: "MSG=7Fh, DATA length=0"
  params: []
  notes: "Sent when ACK bit = 1 in the original request and processing succeeds."

- id: nack
  label: Negative Acknowledgment
  kind: feedback
  command: "MSG=6Fh, DATA={error_code}"
  params:
    - name: error_code
      type: string
      description: 01h=data out of range, 10h=unknown message, 11h=length error, FFh=busy
  notes: "DATA length = 1 byte."

# ===== Device Information =====

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  command: "MSG=74h, DATA length=0"
  params: []

- id: post_node_app_version
  label: Firmware Revision Report
  kind: feedback
  command: "MSG=75h, DATA={app_ref_3bytes}{index_letter}{index_number}{reserved}"
  params:
    - name: app_ref
      type: string
      description: 24-bit Firmware Part Number, 3 bytes
    - name: index_letter
      type: string
      description: 8-bit ASCII firmware major revision (41h..5Ah)
    - name: index_number
      type: string
      description: 8-bit firmware revision
    - name: reserved
      type: string
      description: 8-bit reserved
  notes: "DATA length = 6 bytes."

- id: set_node_label
  label: Set User-Defined Text Label
  kind: action
  command: "MSG=55h, DATA={label_16chars}"
  params:
    - name: label
      type: string
      description: ASCII string, padded to exactly 16 characters with spaces
  notes: "DATA length is always 16 bytes; pad with spaces if shorter."

- id: get_node_label
  label: Get User-Defined Text Label
  kind: query
  command: "MSG=45h, DATA length=0"
  params: []

- id: post_node_label
  label: Text Label Report
  kind: feedback
  command: "MSG=65h, DATA={label_16chars}"
  params:
    - name: label
      type: string
      description: 16-character ASCII label
  notes: "DATA length = 16 bytes."

# ===== Device Configuration =====

- id: set_local_ui
  label: Lock/Unlock Local UI
  kind: action
  command: "MSG=17h, DATA={function}{ui_index}{priority}"
  params:
    - name: function
      type: string
      description: 00h=Enable/Unlock, 01h=Disable/Lock
    - name: ui_index
      type: string
      description: 00h=All, 01h=DCT input, 02h=Local stimuli, 03h=Local Radio (BT), 04h=Touch Motion, 05h=LEDs
    - name: priority
      type: string
      description: 8-bit; higher number = higher priority
  notes: "DATA length = 3 bytes. UI_Index=00h priority must be >= highest existing lock level or NACK(LOW_PRIORITY)."

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  command: "MSG=27h, DATA={ui_index}"
  params:
    - name: ui_index
      type: string
      description: 01h..UI_MAX (see SET_LOCAL_UI list)
  notes: "DATA length = 1 byte."

- id: post_local_ui
  label: Local UI Status Report
  kind: feedback
  command: "MSG=37h, DATA={ui_index}{status}{source_addr_3bytes}{priority}"
  params:
    - name: ui_index
      type: string
      description: 01h..UI_MAX
    - name: status
      type: string
      description: 00h=Enabled/Unlocked, 01h=Disabled/Locked
    - name: source_addr
      type: string
      description: 24-bit NodeID of the device that issued the lock
    - name: priority
      type: string
      description: 8-bit lock priority
  notes: "DATA length = 5 bytes."

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "MSG=15h, DATA={function}{ip_index}{value_2bytes}"
  params:
    - name: function
      type: string
      description: 00h=Delete IP, 01h=Set at current pos, 03h=Set at % pos, 04h=Divide full range (Value=count)
    - name: ip_index
      type: integer
      description: 1..16 (ignored when function=04h)
    - name: value
      type: string
      description: 16-bit; meaning depends on function (% for 03h, count for 04h)
  notes: "DATA length = 4 bytes. Existing IPs are overwritten."

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "MSG=25h, DATA={ip_index}"
  params:
    - name: ip_index
      type: integer
      description: 1..16
  notes: "DATA length = 1 byte."

- id: post_motor_ip
  label: Intermediate Position Report
  kind: feedback
  command: "MSG=35h, DATA={ip_index}{reserved_2bytes}{ip_position_percentage}"
  params:
    - name: ip_index
      type: integer
      description: 1..16
    - name: reserved
      type: string
      description: 16-bit reserved
    - name: ip_position_percentage
      type: integer
      description: 0..100; FFh if IP not set
  notes: "DATA length = 4 bytes."

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "MSG=13h, DATA={up_speed}{down_speed}{slow_speed}"
  params:
    - name: up_speed
      type: string
      description: 8-bit; rpm during UP movement (range per device datasheet)
    - name: down_speed
      type: string
      description: 8-bit; rpm during DOWN movement (range per device datasheet)
    - name: slow_speed
      type: string
      description: 8-bit; rpm for adjustment movements (range per device datasheet)
  notes: "DC motors only. DATA length = 3 bytes. Speed ranges per device technical datasheet."

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "MSG=23h, DATA length=0"
  params: []

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Report
  kind: feedback
  command: "MSG=33h, DATA={up_speed}{down_speed}{slow_speed}"
  params:
    - name: up_speed
      type: string
      description: 8-bit
    - name: down_speed
      type: string
      description: 8-bit
    - name: slow_speed
      type: string
      description: 8-bit
  notes: "DATA length = 3 bytes."

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "MSG=16h, DATA={function}{priority}"
  params:
    - name: function
      type: string
      description: 00h=Unlock, 01h=Lock, 03h=Save on power cycle, 04h=Do not save on power cycle
    - name: priority
      type: string
      description: 8-bit; higher number = higher priority (ignored for functions 03h/04h)
  notes: "DATA length = 2 bytes. When locked, only CTRL with >= priority accepted; others return NACK(NODE_IS_LOCKED)."

- id: get_network_lock
  label: Get Network Lock
  kind: query
  command: "MSG=26h, DATA length=0"
  params: []

- id: post_network_lock
  label: Network Lock Report
  kind: feedback
  command: "MSG=36h, DATA={status}{source_addr_3bytes}{priority}{saved}"
  params:
    - name: status
      type: string
      description: 00h=Unlocked, 01h=Locked
    - name: source_addr
      type: string
      description: 24-bit NodeID of lock source
    - name: priority
      type: string
      description: 8-bit lock priority
    - name: saved
      type: string
      description: 00h=not restored on power cycle, 01h=restored on power cycle
  notes: "DATA length = 6 bytes."

# ===== Device Control =====

- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "MSG=03h, DATA={function}{position_2bytes}{reserved}"
  params:
    - name: function
      type: string
      description: 00h=DOWN limit, 01h=UP limit, 02h=Intermediate Position (Position=IP index 0..15), 04h=Position in % (0..100)
    - name: position
      type: string
      description: 16-bit; meaning depends on function
    - name: reserved
      type: string
      description: 8-bit reserved
  notes: "DATA length = 4 bytes."

- id: ctrl_stop
  label: Stop
  kind: action
  command: "MSG=02h, DATA={reserved}"
  params:
    - name: reserved
      type: string
      description: 8-bit reserved
  notes: "DATA length = 1 byte. Motor stops immediately without speed ramp-down."

# ===== Device Status =====

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "MSG=0Ch, DATA length=0"
  params: []

- id: post_motor_position
  label: Motor Position Report
  kind: feedback
  command: "MSG=0Dh, DATA={position_pulse_2bytes}{position_percentage}{reserved}{ip_index}"
  params:
    - name: position_pulse
      type: string
      description: 16-bit; UP_LIMIT..DOWN_LIMIT
    - name: position_percentage
      type: integer
      description: 0..100
    - name: reserved
      type: string
      description: 8-bit reserved
    - name: ip_index
      type: string
      description: 01h..IP_MAX; FFh if no IP matches current position
  notes: "DATA length = 5 bytes. Sent even while motor is running."

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "MSG=0Eh, DATA length=0"
  params: []

- id: post_motor_status
  label: Motor Status Report
  kind: feedback
  command: "MSG=0Fh, DATA={status}{direction}{source}{cause}"
  params:
    - name: status
      type: string
      description: 00h=Stopped, 01h=Running, 02h=Blocked, 03h=Locked
    - name: direction
      type: string
      description: 00h=Going DOWN, 01h=Going UP, FFh=Unknown
    - name: source
      type: string
      description: 00h=Internal, 01h=Network message, 02h=Local UI
    - name: cause
      type: string
      description: 00h=Target reached, 01h=Explicit command, 02h=WINK, 20h=Obstacle, 21h=Over-current, 22h=Thermal, 30h=Run time exceeded, 32h=Timeout exceeded, FFh=Reset/Power up
  notes: "DATA length = 4 bytes."
```

## Feedbacks
```yaml
- id: node_addr
  type: object
  description: 24-bit NodeID, LSBF, in DEST@ of POST_NODE_ADDR
- id: group_addr
  type: object
  description: GroupIndex (0..15) + 24-bit GroupID
- id: ack_status
  type: enum
  values: [ack, nack]
- id: nack_error_code
  type: enum
  values: [data_out_of_range, unknown_message, length_error, busy, low_priority, ip_not_set, node_is_locked]
- id: firmware_version
  type: object
  description: 24-bit App_Reference + 8-bit IndexLetter (ASCII) + 8-bit IndexNumber
- id: node_label
  type: string
  description: 16-character ASCII label
- id: local_ui_status
  type: object
  description: UI_Index, Status (enabled/disabled), Source_Addr, Priority
- id: motor_ip
  type: object
  description: IP_Index, IP_position_percentage (0..100, FFh=unset)
- id: motor_rolling_speed
  type: object
  description: UP_Speed, DOWN_Speed, Slow_Speed (each 8-bit rpm)
- id: network_lock_status
  type: object
  description: Status, Source_Addr, Priority, Saved
- id: motor_position
  type: object
  description: Position_pulse (16-bit), Position_percentage (0..100), IP index
- id: motor_status
  type: object
  description: Status (Stopped/Running/Blocked/Locked), Direction, Source, Cause
```

## Variables
```yaml
- id: intermediate_position_count
  type: integer
  description: Up to 16 IP slots per device (IP_Index 1..16)
  range: [1, 16]
- id: group_membership_count
  type: integer
  description: Up to 16 GroupID entries per device (GroupIndex 0..15)
  range: [0, 15]
- id: lock_priority
  type: integer
  description: 8-bit; higher = higher priority
  range: [0, 255]
```

## Events
```yaml
# UNRESOLVED: source describes request/response (GET_xxx / POST_xxx) but no
# unsolicited push notifications from slave to master.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "When SET_NETWORK_LOCK is active, all CTRL_xxx and limit-changing SET_xxx messages are rejected with NACK(NODE_IS_LOCKED) unless sender priority >= current lock priority."
# UNRESOLVED: no explicit high-voltage / mechanical hazard warnings in source excerpt.
```

## Notes
- Bus is half-duplex RS-485; all data bits must be INVERTED before transmission for backward compatibility (NOT(58h) = A7h on the wire).
- Checksum = sum of all bytes from Byte 1 through Byte n-1 (no complement, per §5.6).
- SOURCE@ / DEST@ are 3 bytes LSBF; DEST@ = 000000h for group addressing, FFFFFFh for broadcast.
- Address bytes shown as e.g. "05:04:03" on device labels map to wire bytes 03h, 04h, 05h.
- Bus timing: Tc ≤ 1ms between characters, Treq ≥ 10ms before master transmits, Tfree = 3ms, Trep 5..255ms (randomized) for slave reply.
- Always set ACK bit and implement a retry strategy; NACK or timeout triggers retry.
- The user-supplied "Known protocol: TCP/IP" hint is overridden by source: SDN is RS-485 serial, not TCP/IP.

<!-- UNRESOLVED: UAI+-specific port number, supported NodeType list, firmware range, and DC-motor speed ranges not stated in source — they are device-specific (per technical datasheet). -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:16.319Z
last_checked_at: 2026-06-02T05:46:20.978Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:20.978Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched verbatim in source §6 command tables; transport parameters verified against §4.1 serial config. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "UAI+ model-specific behaviour (firmware range, supported NodeType list, port) not stated in source."
- "source describes request/response (GET_xxx / POST_xxx) but no"
- "source documents no multi-step sequences."
- "no explicit high-voltage / mechanical hazard warnings in source excerpt."
- "UAI+-specific port number, supported NodeType list, firmware range, and DC-motor speed ranges not stated in source — they are device-specific (per technical datasheet)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
