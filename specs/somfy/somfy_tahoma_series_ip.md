---
spec_id: admin/somfy-tahoma-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy Tahoma Series Control Spec"
manufacturer: Somfy
model_family: "Somfy Tahoma Series (RS-485 SDN motor nodes)"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somfy Tahoma Series (RS-485 SDN motor nodes)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-21T23:23:35.364Z
last_checked_at: 2026-07-22T01:14:01.302Z
generated_at: 2026-07-22T01:14:01.302Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Known protocol \"TCP/IP\" from prompt is wrong — source describes RS-485 SDN bus (asynchronous serial). No Ethernet/Wi-Fi/IP control layer documented in this refined excerpt."
  - "source does not describe unsolicited push notifications distinct from POST_xxx replies."
  - "source does not describe compound/multi-step sequences."
  - "power-on sequencing requirements, fault recovery, and exact voltage/current specs not stated in this excerpt."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:14:01.302Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched MSG opcodes verbatim; data shapes correct; transport parameters verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Somfy Tahoma Series Control Spec

## Summary
Somfy Digital Network (SDN) is a half-duplex RS-485 protocol used by Somfy motorised shading products (e.g. RS485 RTS transmitter, Glydea, Ø30 DC, Ø50 AC/DC, Ø40 AC). The Tahoma hub acts as a MASTER on the bus, addressing SLAVE motor nodes by 3-byte NodeID. This spec covers the device management, configuration, control, and status messages described in the SDN Protocol Integration Guide (revision covering GET_NODE_ADDR through GET_MOTOR_STATUS).

<!-- UNRESOLVED: Known protocol "TCP/IP" from prompt is wrong — source describes RS-485 SDN bus (asynchronous serial). No Ethernet/Wi-Fi/IP control layer documented in this refined excerpt. -->

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
  electrical: rs485
  half_duplex: true
auth:
  type: none  # inferred: no auth procedure in source
```

**Notes on framing:**
- All data bits must be inverted before transmission (NOT applied per byte); example: byte 58h on the wire = A7h.
- Character coding: NRZ. Least significant bit first.
- No sync byte; messages delimited by bus inactivity (Tfree = 3 ms min).
- Tc ≤ 1 ms between consecutive characters; Treq ≥ 10 ms before MASTER transmits; Trep = 5–255 ms randomized before SLAVE replies.

## Traits
```yaml
- routable        # inferred: group/broadcast addressing
- queryable       # inferred: GET_xxx / POST_xxx queries
```

## Actions
```yaml
# SDN messages follow the framing:
#   MSG | ACK/LEN | NODE_TYPE | SRC@(3) | DST@(3) | DATA[...] | CHECKSUM
# CHECKSUM = sum of Byte1..Byte(n-2).
# SET_xxx = configuration, CTRL_xxx = control, GET_xxx = query (POST_xxx is the response).
# Below, commands are listed by their MSG opcode and DATA structure. Variable fields shown in {curly}.
# Source: SOMFY SDN Protocol Integration Guide §6.

- id: get_node_addr
  label: Get Node Address (discover)
  kind: query
  command: "MSG=40h"
  params: []
  # DATA length 0. Replies arrive as POST_NODE_ADDR (60h) with node address in message header.

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "MSG=51h DATA[4]={GroupIndex}{GroupID_3bytes}"
  params:
    - name: GroupIndex
      type: integer
      description: Group table entry 0-15
    - name: GroupID
      type: integer
      description: 24-bit group address (LSB first)

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "MSG=41h DATA[1]={GroupIndex}"
  params:
    - name: GroupIndex
      type: integer
      description: Group table entry 0-15

- id: set_node_label
  label: Set Node Label (user-defined text)
  kind: action
  command: "MSG=55h DATA[16]={Label_16chars}"
  params:
    - name: Label
      type: string
      description: 16 ASCII characters; pad shorter strings with spaces

- id: get_node_label
  label: Get Node Label
  kind: query
  command: "MSG=45h"

- id: set_local_ui
  label: Set Local UI (HMI enable/lock)
  kind: action
  command: "MSG=17h DATA[3]={Function}{UI_Index}{Priority}"
  params:
    - name: Function
      type: integer
      description: "00h=Enable/Unlock, 01h=Disable/Lock"
    - name: UI_Index
      type: integer
      description: "00h=All, 01h=DCT, 02h=Local stimuli, 03h=Local Radio, 04h=Touch Motion, 05h=LEDs"
    - name: Priority
      type: integer
      description: "0-255; higher = higher priority"

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  command: "MSG=27h DATA[1]={UI_Index}"
  params:
    - name: UI_Index
      type: integer
      description: "01h-UI_MAX"

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "MSG=15h DATA[4]={Function}{IP_Index}{Value_2bytes}"
  params:
    - name: Function
      type: integer
      description: "00h=Delete IP, 01h=Set IP at current position, 03h=Set IP at % position, 04h=Divide range (IP_Index ignored)"
    - name: IP_Index
      type: integer
      description: "1-16 (ignored when Function=04h)"
    - name: Value
      type: integer
      description: "16-bit; % position for Function=03h, IP count for Function=04h"

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "MSG=25h DATA[1]={IP_Index}"
  params:
    - name: IP_Index
      type: integer
      description: "1-16"

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed (DC motors only)
  kind: action
  command: "MSG=13h DATA[3]={UP_Speed}{DOWN_Speed}{Slow_Speed}"
  params:
    - name: UP_Speed
      type: integer
      description: UP speed in rpm; range per device datasheet
    - name: DOWN_Speed
      type: integer
      description: DOWN speed in rpm; range per device datasheet
    - name: Slow_Speed
      type: integer
      description: Slow speed in rpm; range per device datasheet

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "MSG=23h"

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "MSG=16h DATA[2]={Function}{Priority}"
  params:
    - name: Function
      type: integer
      description: "00h=Unlock, 01h=Lock, 03h=Save lock across power cycle, 04h=Do not save"
    - name: Priority
      type: integer
      description: "0-255 (ignored for Functions 03h/04h)"

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  command: "MSG=26h"

- id: ctrl_moveto
  label: Move To Position
  kind: action
  command: "MSG=03h DATA[4]={Function}{Position_2bytes}{Reserved}"
  params:
    - name: Function
      type: integer
      description: "00h=DOWN limit, 01h=UP limit, 02h=Intermediate Position, 04h=Position in %"
    - name: Position
      type: integer
      description: "16-bit; IP index (0-15) for Function=02h, % (0-100) for Function=04h; ignored for 00h/01h"
    - name: Reserved
      type: integer
      description: 8-bit; set to 00h or FFh

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "MSG=02h DATA[1]={Reserved}"
  params:
    - name: Reserved
      type: integer
      description: 8-bit; set to 00h or FFh

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "MSG=0Ch"

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "MSG=0Eh"

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  command: "MSG=74h"
```

## Feedbacks
```yaml
- id: post_node_addr
  label: Node Address Report
  type: integer
  values: []
  notes: "MSG=60h, no DATA; address carried in header."

- id: post_group_addr
  label: Group Address Report
  type: integer
  values: []
  notes: "MSG=61h, DATA[4]={GroupIndex}{GroupID}."

- id: post_node_label
  label: Node Label Report
  type: string
  values: []
  notes: "MSG=65h, 16-char ASCII."

- id: post_local_ui
  label: Local UI Status Report
  type: integer
  values: []
  notes: "MSG=37h, DATA[5]: UI_Index, Status (00h=enabled, 01h=disabled), Source_Addr (3B), Priority."

- id: post_motor_ip
  label: Intermediate Position Report
  type: integer
  values: []
  notes: "MSG=35h, DATA[4]: IP_index, Reserved (16-bit), Position_percentage (0-100, FFh=not set)."

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Report
  type: integer
  values: []
  notes: "MSG=33h, DATA[3]: UP/DOWN/Slow rpm."

- id: post_network_lock
  label: Network Lock Status Report
  type: integer
  values: []
  notes: "MSG=36h, DATA[6]: Status (00h=unlocked, 01h=locked), Source_Addr (3B), Priority, Saved (00h/01h)."

- id: post_motor_position
  label: Motor Position Report
  type: integer
  values: []
  notes: "MSG=0Dh, DATA[5]: Position_pulse (16-bit, UP_LIMIT..DOWN_LIMIT), Position_percentage (0-100), Reserved, IP (01h..IP_MAX, FFh=none)."

- id: post_motor_status
  label: Motor Status Report
  type: integer
  values: []
  notes: "MSG=0Fh, DATA[4]: Status (00h=Stopped, 01h=Running, 02h=Blocked, 03h=Locked), Direction (00h=DOWN, 01h=UP, FFh=Unknown), Source (00h=Internal, 01h=Network, 02h=Local UI), Cause (00h=Target reached, 01h=Explicit command, 02h=WINK, 20h=Obstacle, 21h=Over-current, 22h=Thermal, 30h=Run time exceeded, 32h=Timeout exceeded, FFh=Reset/Power Up)."

- id: post_node_app_version
  label: Firmware Revision Report
  type: string
  values: []
  notes: "MSG=75h, DATA[6]: App_Reference (3B), App_IndexLetter (1B ASCII), App_IndexNumber, Reserved."

- id: ack
  label: Acknowledgement
  type: integer
  values: []
  notes: "MSG=7Fh, DATA length 0. Sent only when ACK bit=1 in request."

- id: nack
  label: Negative Acknowledgement / Error
  type: integer
  values:
    - 01h    # Data out of range
    - 10h    # Unknown message
    - 11h    # Message length error
    - FFh    # Busy - cannot process
  notes: "MSG=6Fh, DATA[1]=ErrorCode. Additional NACK codes (NODE_IS_LOCKED, LOW_PRIORITY, IP_NOT_SET, DATA_ERROR) referenced in §6 but not enumerated here - UNRESOLVED until §6.1.3 expanded in source."
```

## Variables
```yaml
- id: motor_position_pulse
  label: Motor Position (pulses)
  type: integer
  description: 16-bit; range = UP_LIMIT..DOWN_LIMIT per motor
- id: motor_position_percentage
  label: Motor Position (%)
  type: integer
  description: 0-100
- id: intermediate_position
  label: Intermediate Position (IP)
  type: integer
  description: 1-16 slots; position reported as % (FFh = not set)
- id: rolling_speed
  label: Rolling Speed (rpm)
  type: integer
  description: Three slots: UP, DOWN, Slow. Valid ranges defined per-motor in the device technical datasheet - UNRESOLVED in this source.
- id: network_lock_status
  label: Network Lock Status
  type: enum
  values: [unlocked, locked]
- id: network_lock_saved
  label: Network Lock Persists Across Power Cycle
  type: enum
  values: [no, yes]
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited push notifications distinct from POST_xxx replies.
```

## Macros
```yaml
# UNRESOLVED: source does not describe compound/multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - ctrl_moveto            # moves blind load; lock/network-lock interactions exist
interlocks:
  - id: network_lock
    description: "When SET_NETWORK_LOCK Status=01h, all CTRL_xxx movement commands and SET_MOTOR_LIMITS/SET_TILT_LIMITS are rejected with NACK(NODE_IS_LOCKED) unless they carry equal-or-higher priority than the lock."
  - id: motor_status_thermal
    description: "POST_MOTOR_STATUS Cause=22h indicates thermal protection has tripped (Status=Blocked)."
  - id: motor_status_obstacle
    description: "POST_MOTOR_STATUS Cause=20h indicates obstacle detection (Status=Blocked)."
```

## Notes
- **Known-protocol mismatch:** input prompt said "TCP/IP"; this refined source is the RS-485 Somfy Digital Network (SDN) bus spec. No IP/Ethernet layer is described.
- **Bus collisions:** avoid requesting feedback (POST/ACK) in group or broadcast mode to lower collision risk on the half-duplex bus.
- **Retry strategy:** the source recommends implementing a retry when NACK is received or no ACK after a timeout, since collisions are possible.
- **Radio inversion:** every data byte is bitwise-NOTed on the wire (LSB first) for backward compatibility with early protocol revisions.
- **Addressing formats:** NodeID and GroupID are 3 bytes; on the wire they are LSB-first. `Broadcast DEST@ = FFFFFFh`. Empty group `DEST@ = 000000h`.
- **NodeType table** (from §3.2.2): 02h=Ø30 DC, 05h=RS485 RTS transmitter, 06h=Glydea, 07h=Ø50 AC, 08h=Ø50 DC, 09h=Ø40 AC (not yet available at time of doc).
- **Unsaved settings:** per §6.3.1, DCT input and Local Stimuli UI state are NOT saved across power cycles; all other UI items are.
- **Intermediate Position Function 04h:** sets the first `x` IPs evenly across the travel range (e.g. 2 IPs → 33% / 66%; 3 IPs → 25% / 50% / 75%).
- **NACK codes beyond §6.1.3 table** (DATA_ERROR, LOW_PRIORITY, IP_NOT_SET, NODE_IS_LOCKED) are referenced in body text but not enumerated in the source excerpt.

<!-- UNRESOLVED: power-on sequencing requirements, fault recovery, and exact voltage/current specs not stated in this excerpt. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-21T23:23:35.364Z
last_checked_at: 2026-07-22T01:14:01.302Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:14:01.302Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched MSG opcodes verbatim; data shapes correct; transport parameters verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Known protocol \"TCP/IP\" from prompt is wrong — source describes RS-485 SDN bus (asynchronous serial). No Ethernet/Wi-Fi/IP control layer documented in this refined excerpt."
- "source does not describe unsolicited push notifications distinct from POST_xxx replies."
- "source does not describe compound/multi-step sequences."
- "power-on sequencing requirements, fault recovery, and exact voltage/current specs not stated in this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
