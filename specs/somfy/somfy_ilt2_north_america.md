---
spec_id: admin/somfy-ilt2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy ILT2 Control Spec"
manufacturer: Somfy
model_family: ILT2
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - ILT2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:09.724Z
last_checked_at: 2026-06-02T22:14:44.556Z
generated_at: 2026-06-02T22:14:44.556Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic SDN protocol document; no explicit mapping from ILT2 to a specific NodeType value. NodeType 09h (\"Ø40 AC Serie RS485\") listed as \"Not yet available\" at time of doc."
  - "no flow control specified in source"
  - "no continuously-settable parameters beyond the discrete actions above"
  - "source does not document unsolicited event messages - all reports are in response to GET requests"
  - "source does not document multi-step sequences"
  - "no explicit human-safety interlocks documented"
  - "baud rate (4800), parity (odd), data bits (8), stop bits (1) stated for SDN bus; flow control and any hardware-handshake pins not stated."
  - "voltage, current, and wiring (RJ45, daisy-chain, terminator) not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:14:44.556Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy ILT2 Control Spec

## Summary
Somfy ILT2 motorised window-covering controller communicating over the Somfy Digital Network (SDN), a half-duplex RS-485 bus protocol. Spec covers framing, addressing, message set (SET/CTRL/GET/POST/ACK/NACK), and bus timing.

<!-- UNRESOLVED: source is the generic SDN protocol document; no explicit mapping from ILT2 to a specific NodeType value. NodeType 09h ("Ø40 AC Serie RS485") listed as "Not yet available" at time of doc. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: null  # UNRESOLVED: no flow control specified in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # inferred from GET_xxx command examples
- levelable       # inferred from intermediate position + speed commands
```

## Actions
```yaml
# Device Management
- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51h"  # MSG byte, full frame per §5
  params:
    - name: group_index
      type: integer
      description: Entry in group table (0-15)
    - name: group_id
      type: integer
      description: 24-bit group address (LSBF)

- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "40h"
  params: []

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "41h"
  params:
    - name: group_index
      type: integer
      description: Entry in group table (0-15)

# Device Information
- id: get_node_app_version
  label: Get Firmware Version
  kind: query
  command: "74h"
  params: []

- id: set_node_label
  label: Set Node Label
  kind: action
  command: "55h"
  params:
    - name: label
      type: string
      description: 16-char ASCII, pad with spaces if shorter

- id: get_node_label
  label: Get Node Label
  kind: query
  command: "45h"
  params: []

# Device Configuration
- id: set_local_ui
  label: Set Local UI (HMI)
  kind: action
  command: "17h"
  params:
    - name: function
      type: integer
      description: "00h=Enable, 01h=Disable"
    - name: ui_index
      type: integer
      description: "00h=All, 01h=DCT, 02h=Local stimuli, 03h=Local radio, 04h=Touch motion, 05h=LEDs"
    - name: priority
      type: integer
      description: 0-255, higher wins lock

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  command: "27h"
  params:
    - name: ui_index
      type: integer
      description: 01h-UI_MAX (refer to UI list)

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "15h"
  params:
    - name: function
      type: integer
      description: "00h=Delete, 01h=Set at current, 03h=Set at % position, 04h=Divide full range"
    - name: ip_index
      type: integer
      description: 1-16
    - name: value
      type: integer
      description: 16-bit, see Function remarks

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "25h"
  params:
    - name: ip_index
      type: integer
      description: 1-16

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "13h"
  params:
    - name: up_speed
      type: integer
      description: 8-bit rpm, see technical datasheet
    - name: down_speed
      type: integer
      description: 8-bit rpm, see technical datasheet
    - name: slow_speed
      type: integer
      description: 8-bit rpm, see technical datasheet

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "23h"
  params: []

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16h"
  params:
    - name: function
      type: integer
      description: "00h=Unlock, 01h=Lock, 03h=Save on power cycle, 04h=Do not save"
    - name: priority
      type: integer
      description: 0-255, higher wins lock

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  command: "26h"
  params: []

# Device Control
- id: ctrl_moveto
  label: Move To Position
  kind: action
  command: "03h"
  params:
    - name: function
      type: integer
      description: "00h=Down limit, 01h=Up limit, 02h=Intermediate position, 04h=% of full range"
    - name: position
      type: integer
      description: 16-bit, contents per Function
    - name: reserved
      type: integer
      description: 8-bit, set to 00h

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "02h"
  params:
    - name: reserved
      type: integer
      description: 8-bit, set to 00h

# Device Status
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
- id: node_address
  type: bytes
  description: POST_NODE_ADDR (60h) - source NodeID is in frame header

- id: group_address
  type: bytes
  description: POST_GROUP_ADDR (61h) - returns group_index (8-bit) + group_id (24-bit)

- id: ack
  type: enum
  values: [ok]
  description: ACK (7Fh) - successful processing

- id: nack
  type: object
  description: NACK (6Fh) - error code
  fields:
    - name: error_code
      values: [01h_data_out_of_range, 10h_unknown_message, 11h_length_error, FFh_busy, low_priority, node_is_locked, ip_not_set, data_error]

- id: app_version
  type: object
  description: POST_NODE_APP_VERSION (75h) - 24-bit reference + ASCII letter + 8-bit number + reserved

- id: node_label
  type: string
  description: POST_NODE_LABEL (65h) - 16-char ASCII label

- id: local_ui_status
  type: object
  description: POST_LOCAL_UI (37h) - ui_index, status, source_addr, priority

- id: motor_ip
  type: object
  description: POST_MOTOR_IP (35h) - ip_index + reserved + position percentage (FFh=unset)

- id: motor_speed
  type: object
  description: POST_MOTOR_ROLLING_SPEED (33h) - up_speed, down_speed, slow_speed

- id: network_lock_status
  type: object
  description: POST_NETWORK_LOCK (36h) - status, source_addr, priority, saved flag

- id: motor_position
  type: object
  description: POST_MOTOR_POSITION (0Dh) - position_pulse (16-bit) + percentage (8-bit) + reserved + ip (8-bit, FFh=no IP)

- id: motor_status
  type: object
  description: POST_MOTOR_STATUS (0Fh) - status, direction, source, cause
```

## Variables
```yaml
# UNRESOLVED: no continuously-settable parameters beyond the discrete actions above
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event messages - all reports are in response to GET requests
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - network_lock_blocks_ctrl_xxx  # explicit: all CTRL_xxx and limit changes rejected when locked (NACK NODE_IS_LOCKED)
  - thermal_protection_stops_motor  # explicit: motor enters Blocked status on thermal protection
  - obstacle_detection_stops_motor  # explicit: motor enters Blocked status on obstacle
  - run_time_exceeded_stops_motor  # explicit: motor reports Run time exceeded
  - timeout_exceeded_cancels_move  # explicit: CTRL_MOVE canceled after 2 min
# UNRESOLVED: no explicit human-safety interlocks documented
```

## Notes
**Frame structure (per §5).** Every SDN frame is 11-32 bytes: MSG (1) | ACK/LEN (1) | NODE_TYPE (1, src+dst nibbles) | SOURCE@ (3, LSBF) | DEST@ (3, LSBF) | DATA (0-21) | CHECKSUM (1, 16-bit). Checksum = NOT(sum of bytes 1..n-2). Bits transmitted LSB first, inverted before transmission (so logical 58h appears on bus as A7h).

**Addressing (per §5.4).** Point-to-point: DEST@ = target NodeID. Group: DEST@ = 000000h, all devices with that GroupID in their group table respond. Broadcast: DEST@ = FFFFFFh.

**Timing (per §4.3).** Tc max 1ms between characters. Tfree 3ms bus free. Trep 5-255ms (randomised) before slave reply. Treq 10ms before master retransmits.

**Collisions.** Doc explicitly warns about RS-485 bus collisions; recommends NOT requesting feedback/ACK in group or broadcast mode.

**Power-cycle behavior (per §6.3.4).** Network lock save state controlled by Function 03h/04h. Local UI state: DCT and Local Stimuli not saved; others saved and restored. Default = "Do Not Save" lock; default = all UI enabled.

**ILT2 mapping gap.** Source is the generic SDN protocol manual, not ILT2-specific. ILT2 NodeType value, default config, and speed ranges are not stated in the source — refer to device technical datasheet.

<!-- UNRESOLVED: baud rate (4800), parity (odd), data bits (8), stop bits (1) stated for SDN bus; flow control and any hardware-handshake pins not stated. -->

<!-- UNRESOLVED: voltage, current, and wiring (RJ45, daisy-chain, terminator) not stated in source. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:09.724Z
last_checked_at: 2026-06-02T22:14:44.556Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:14:44.556Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic SDN protocol document; no explicit mapping from ILT2 to a specific NodeType value. NodeType 09h (\"Ø40 AC Serie RS485\") listed as \"Not yet available\" at time of doc."
- "no flow control specified in source"
- "no continuously-settable parameters beyond the discrete actions above"
- "source does not document unsolicited event messages - all reports are in response to GET requests"
- "source does not document multi-step sequences"
- "no explicit human-safety interlocks documented"
- "baud rate (4800), parity (odd), data bits (8), stop bits (1) stated for SDN bus; flow control and any hardware-handshake pins not stated."
- "voltage, current, and wiring (RJ45, daisy-chain, terminator) not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
