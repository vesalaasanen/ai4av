---
spec_id: admin/somfy-somesse-30-50-rs485
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy Somesse 30 50 RS485 Control Spec"
manufacturer: Somfy
model_family: "Somesse 30 50 RS485"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somesse 30 50 RS485"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-05-13T21:35:26.594Z
last_checked_at: 2026-06-02T06:13:09.385Z
generated_at: 2026-06-02T06:13:09.385Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents the whole SDN bus protocol — not a single device. Per-family speed ranges, IP limits, and limit-switch behavior are stated in the device Technical Datasheet, not this integration guide."
  - "source does not describe any unsolicited notifications. All device-side traffic"
  - "source does not describe multi-step macro sequences."
  - "per-device speed ranges, IP count max (IP_MAX), UI_MAX, position pulse limits, exact Obstruction/thermal detection thresholds, and any Tilt/Slat control message details are documented in the device Technical Datasheet rather than this Integration Guide."
verification:
  verdict: verified
  checked_at: 2026-06-02T06:13:09.385Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched literally in source; transport parameters (4800 baud, 8N1, data inversion, LSB-first) verified verbatim; full coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy Somesse 30 50 RS485 Control Spec

## Summary
Spec covers Somfy SDN (SOMFY Digital Network) RS485 bus protocol for the Somesse 30/50 motor family. Half-duplex MASTER/SLAVE bus, 4800 baud, 8N1-Odd, all data bits inverted on the wire. NodeType 08h identifies the Ø50 DC Serie RS485 family.

<!-- UNRESOLVED: source documents the whole SDN bus protocol — not a single device. Per-family speed ranges, IP limits, and limit-switch behavior are stated in the device Technical Datasheet, not this integration guide. -->

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
  wiring:
    bus: RS485
    electrical:
      data_inversion: true  # source: "all data bits need to be inverted before transmission"
      bit_order: LSB_first
      start_bit_level: 0
      stop_bit_level: 1
      character_coding: NRZ
    half_duplex: true
auth:
  type: none  # inferred: no login/password/auth procedure in source
timings_ms:
  Tc_max: 1         # max gap between two consecutive characters
  Tfree_typical: 3  # bus free timeout
  Trep_min: 5       # slave reply delay min
  Trep_max: 255     # slave reply delay max (randomized within range)
  Treq_min: 10      # master must wait at least Treq after last bus activity
```

## Message Framing
```yaml
# Generic SDN frame on the wire. Minimum 11 bytes, max 32 bytes (max 21 bytes DATA).
# Every byte transmitted on the wire = logical_byte XOR 0xFF (i.e. inverted).
frame:
  layout:
    - byte1: MSG
    - byte2: ACK_LEN  # bit7=ACK request, bit6=EXT(0), bits4-0=LEN (0-31)
    - byte3: NODE_TYPE  # hi nibble=SOURCE NodeType (0h for MASTER), lo nibble=DEST NodeType
    - bytes4-6: SOURCE_ADDR  # 3 bytes, LSB first
    - bytes7-9: DEST_ADDR    # 3 bytes, LSB first; FFFFFFh = broadcast
    - bytes10..n-2: DATA     # see per-action payload spec
    - bytes_n-1_n: CHECKSUM  # 2 bytes; CHECKSUM = (Byte1 + ... + Byte n-2)
  addressing_modes:
    - point_to_point: SRC=NodeID, DEST=NodeID
    - group: SRC=GroupID, DEST=000000h
    - broadcast: SRC=NodeID, DEST=FFFFFFh
  acknowledgment:
    ack: 7Fh  # positive ack, no data
    nack: 6Fh # 1 byte ErrorCode (01h=out_of_range, 10h=unknown_msg, 11h=length_error, FFh=busy)
```

## Traits
```yaml
- queryable   # GET_NODE_ADDR, GET_GROUP_ADDR, GET_NODE_APP_VERSION, GET_NODE_LABEL, GET_LOCAL_UI, GET_MOTOR_IP, GET_MOTOR_ROLLING_SPEED, GET_NETWORK_LOCK, GET_MOTOR_POSITION, GET_MOTOR_STATUS
- levelable   # CTRL_MOVETO position-in-% (0..100) and intermediate-position control
```

## Actions
```yaml
# Each SDN message = one action. All bytes must be bit-inverted on the wire per §4.2.

# ---------- Device management ----------
- id: get_node_addr
  label: Get Node Address (discover)
  kind: query
  command: "40h"   # MSG byte
  params: []
  notes: "Sent broadcast. SLAVE replies POST_NODE_ADDR (60h) with no data - its address is in the message header."

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51h {GroupIndex} {GroupID_3_bytes_LSBF}"
  params:
    - name: GroupIndex
      type: integer
      min: 0
      max: 15
      description: Entry in the group table (0..15)
    - name: GroupID
      type: bytes
      length: 3
      description: 24-bit group address, LSB first

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "41h {GroupIndex}"
  params:
    - name: GroupIndex
      type: integer
      min: 0
      max: 15

- id: set_node_label
  label: Set Node Text Label
  kind: action
  command: "55h {Label_padded_to_16_chars}"
  params:
    - name: Label
      type: string
      max_length: 16
      description: "DATA length always 16 chars; pad with spaces if shorter."

- id: get_node_label
  label: Get Node Text Label
  kind: query
  command: "45h"
  params: []

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  command: "74h"
  params: []

# ---------- Device configuration ----------
- id: set_local_ui
  label: Set HMI Lock/Enable
  kind: action
  command: "17h {Function} {UI_Index} {Priority}"
  params:
    - name: Function
      type: enum
      values: [00h, 01h]
      description: "00h=Enable/Unlock, 01h=Disable/Lock"
    - name: UI_Index
      type: enum
      values: [00h, 01h, 02h, 03h, 04h, 05h]
      description: "00h=All, 01h=DCT input, 02h=Local stimuli, 03h=Local Radio (BT), 04h=Touch Motion, 05h=LEDs"
    - name: Priority
      type: integer
      min: 0
      max: 255
      description: "Greater = higher priority. Locking 00h requires priority >= highest existing lock."

- id: get_local_ui
  label: Get HMI Lock/Enable Status
  kind: query
  command: "27h {UI_Index}"
  params:
    - name: UI_Index
      type: integer
      min: 1
      description: "Refer to UI list in SET_LOCAL_UI. Source table shows min=01h, max=UI_MAX (not stated in this guide)."

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "15h {Function} {IP_Index} {Value_2_bytes}"
  params:
    - name: Function
      type: enum
      values: [00h, 01h, 03h, 04h]
      description: "00h=Delete IP, 01h=Set IP at current position, 03h=Set IP at given % position, 04h=Divide full range into N equal IPs"
    - name: IP_Index
      type: integer
      min: 1
      max: 16
    - name: Value
      type: integer
      description: "16-bit; meaning depends on Function (ignored for 00h/01h; % for 03h; IP count for 04h)"

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "25h {IP_Index}"
  params:
    - name: IP_Index
      type: integer
      min: 1
      max: 16

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed (DC motors only)
  kind: action
  command: "13h {UP_Speed} {DOWN_Speed} {Slow_Speed}"
  params:
    - name: UP_Speed
      type: integer
      description: "rpm during UP movement. Range per Technical Datasheet (not in this guide)."
    - name: DOWN_Speed
      type: integer
      description: "rpm during DOWN movement. Range per Technical Datasheet."
    - name: Slow_Speed
      type: integer
      description: "rpm for adjustment movements. Range per Technical Datasheet."

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "23h"
  params: []

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16h {Function} {Priority}"
  params:
    - name: Function
      type: enum
      values: [00h, 01h, 03h, 04h]
      description: "00h=Unlock, 01h=Lock at current position, 03h=Save lock on power cycle, 04h=Do not save lock on power cycle"
    - name: Priority
      type: integer
      min: 0
      max: 255
      description: "Greater = higher priority. Ignored for Function 03h/04h."

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  command: "26h"
  params: []

# ---------- Device control ----------
- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "03h {Function} {Position_2_bytes} {Reserved}"
  params:
    - name: Function
      type: enum
      values: [00h, 01h, 02h, 04h]
      description: "00h=DOWN limit, 01h=UP limit, 02h=Intermediate Position, 04h=Position in % of full travel"
    - name: Position
      type: integer
      description: "16-bit. IP index (0..15) for Function 02h; % (0..100) for Function 04h; ignored for 00h/01h."
    - name: Reserved
      type: integer
      description: "8-bit reserved. Per source: set to 00h or FFh."

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "02h {Reserved}"
  params:
    - name: Reserved
      type: integer
      description: "8-bit reserved. Per source: set to 00h or FFh."
  notes: "Motor stops immediately without speed ramp-down."

# ---------- Device status ----------
- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "0Ch"
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "0Eh"
  params: []
```

## Feedbacks
```yaml
- id: post_node_addr
  type: bytes
  description: "POST_NODE_ADDR (60h). 0 data bytes - address is in message header."

- id: post_group_addr
  type: bytes
  description: "POST_GROUP_ADDR (61h). DATA: GroupIndex (1 byte) + GroupID (3 bytes)."

- id: post_node_app_version
  type: bytes
  description: "POST_NODE_APP_VERSION (75h). 6 bytes: App_Reference (3) + App_IndexLetter (ASCII 41h..5Ah) + App_IndexNumber (1) + Reserved (1)."

- id: post_node_label
  type: string
  description: "POST_NODE_LABEL (65h). 16-char label, space-padded."

- id: post_local_ui
  type: bytes
  description: "POST_LOCAL_UI (37h). 5 bytes: Status (1: 00h=enabled, 01h=disabled) + Source_Addr (3) + Priority (1)."

- id: post_motor_ip
  type: bytes
  description: "POST_MOTOR_IP (35h). 4 bytes: IP_index (1) + Reserved (2) + IP_position_percentage (1, 0..100, FFh=not set)."

- id: post_motor_rolling_speed
  type: bytes
  description: "POST_MOTOR_ROLLING_SPEED (33h). 3 bytes: UP_Speed, DOWN_Speed, Slow_Speed."

- id: post_network_lock
  type: bytes
  description: "POST_NETWORK_LOCK (36h). 6 bytes: Status (00h=unlocked, 01h=locked) + Source_Addr (3) + Priority (1) + Saved (00h=no, 01h=yes)."

- id: post_motor_position
  type: bytes
  description: "POST_MOTOR_POSITION (0Dh). 5 bytes: Position_pulse (2) + Position_percentage (1, 0..100) + Reserved (1) + IP (1, 01h..IP_MAX, FFh=not at any IP)."

- id: post_motor_status
  type: bytes
  description: "POST_MOTOR_STATUS (0Fh). 4 bytes: Status, Direction, Source, Cause. See motor-status field tables."

- id: motor_status
  type: enum
  values: [stopped, running, blocked, locked]
  description: "POST_MOTOR_STATUS byte 1. 00h=Stopped, 01h=Running, 02h=Blocked (thermal/obstacle), 03h=Locked (NETWORK_LOCK)."

- id: motor_direction
  type: enum
  values: [down, up, unknown]
  description: "POST_MOTOR_STATUS byte 2. 00h=DOWN, 01h=UP, FFh=Unknown."

- id: motor_source
  type: enum
  values: [internal, network, local_ui]
  description: "POST_MOTOR_STATUS byte 3. 00h=Internal, 01h=Network message, 02h=Local UI."

- id: motor_cause
  type: enum
  values: [target_reached, explicit_command, wink, obstacle, over_current, thermal, run_time_exceeded, timeout, reset_power_up]
  description: "POST_MOTOR_STATUS byte 4. 00h=Target reached, 01h=Explicit command, 02h=Wink, 20h=Obstacle, 21h=Over-current, 22h=Thermal, 30h=Run time exceeded, 32h=Timeout, FFh=Reset/Power Up."

- id: nack_error
  type: enum
  values: [data_out_of_range, unknown_message, message_length_error, busy]
  description: "NACK (6Fh) ErrorCode. 01h=Data out of range, 10h=Unknown message, 11h=Length error, FFh=Busy."
```

## Variables
```yaml
- name: GroupID
  type: bytes
  length: 3
  description: "24-bit group address, LSB first. Up to 16 per device (GroupIndex 0..15)."
- name: NodeID
  type: bytes
  length: 3
  description: "3-byte built-in device address, LSB first. Factory-programmed, read-only."
- name: NodeType
  type: nibble
  description: "4-bit product family code. 08h = Ø50 DC Serie RS485 (this family)."
- name: MotorPosition_pct
  type: integer
  min: 0
  max: 100
  description: "Current position as % of full travel range, returned by GET_MOTOR_POSITION."
- name: MotorPosition_pulse
  type: integer
  description: "Raw pulse count between UP_LIMIT and DOWN_LIMIT. Range per device Technical Datasheet (not in this guide)."
- name: LocalUI_Status
  type: enum
  values: [enabled, disabled]
  description: "Per-UI-Index lock state. 00h=Enabled, 01h=Disabled."
- name: NetworkLock_Status
  type: enum
  values: [unlocked, locked]
  description: "Network-wide command lock. 00h=Unlocked, 01h=Locked."
```

## Events
```yaml
# UNRESOLVED: source does not describe any unsolicited notifications. All device-side traffic
# is a POST_xxx reply to a GET_xxx, or ACK/NACK.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "NETWORK_LOCK (SET_NETWORK_LOCK function 01h) blocks all CTRL_xxx and limit-changing SET messages from lower-priority callers. Source returns NACK(NODE_IS_LOCKED) on rejection."
    source_section: "6.3.4"
  - description: "SET_LOCAL_UI can disable local controls (DCT, BT, Touch Motion, LEDs). When UI_Index=00h (all), priority must be >= highest existing lock level, else NACK(LOW_PRIORITY)."
    source_section: "6.3.1"
  - description: "Obstacle / over-current / thermal protection events are reported via POST_MOTOR_STATUS with Status=02h (Blocked) and Cause=20h/21h/22h."
    source_section: "6.5.2"
  - description: "CTRL_STOP halts the motor immediately without a speed ramp-down. Source warns no deceleration."
    source_section: "6.4.2"
```

## Notes
- All data bits on the wire are bit-inverted (logical byte XOR 0xFF). Example from source: 58h on bus = A7h.
- SOURCE@ and DEST@ are 3-byte LSB-first. Example: label address 05:04:03 is transmitted as 03h 04h 05h in the SOURCE@ field.
- Minimum frame is 11 bytes (no DATA); maximum 32 bytes (21 bytes DATA).
- No sync byte — frame end is detected by bus inactivity (>= Tfree).
- One MASTER per bus; SLAVEs do not transmit except in response to a MASTER request. Some devices can broadcast their address on a local pushbutton action (out-of-band discovery).
- Source recommends enabling ACK requests plus a controller-side retry strategy (on NACK or ACK timeout) to compensate for RS485 collision loss.
- 3-year to 5-year NodeID recycling window: a given installation can treat NodeIDs as unique. Conflicting NodeIDs are not allowed on the same bus.
- Speed ranges (UP/DOWN/Slow) and limit pulse counts are device-specific — refer to the per-product Technical Datasheet, not this integration guide.

<!-- UNRESOLVED: per-device speed ranges, IP count max (IP_MAX), UI_MAX, position pulse limits, exact Obstruction/thermal detection thresholds, and any Tilt/Slat control message details are documented in the device Technical Datasheet rather than this Integration Guide. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-05-13T21:35:26.594Z
last_checked_at: 2026-06-02T06:13:09.385Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T06:13:09.385Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched literally in source; transport parameters (4800 baud, 8N1, data inversion, LSB-first) verified verbatim; full coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents the whole SDN bus protocol — not a single device. Per-family speed ranges, IP limits, and limit-switch behavior are stated in the device Technical Datasheet, not this integration guide."
- "source does not describe any unsolicited notifications. All device-side traffic"
- "source does not describe multi-step macro sequences."
- "per-device speed ranges, IP count max (IP_MAX), UI_MAX, position pulse limits, exact Obstruction/thermal detection thresholds, and any Tilt/Slat control message details are documented in the device Technical Datasheet rather than this Integration Guide."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
