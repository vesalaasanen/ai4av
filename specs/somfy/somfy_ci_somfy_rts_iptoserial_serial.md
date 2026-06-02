---
spec_id: admin/somfy-ci-somfy-rts-iptoserial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy CI-Somfy-RTS-IPToSerial Control Spec"
manufacturer: Somfy
model_family: CI-Somfy-RTS-IPToSerial
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - CI-Somfy-RTS-IPToSerial
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T05:46:16.255Z
last_checked_at: 2026-06-02T05:46:16.255Z
generated_at: 2026-06-02T05:46:16.255Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IP-side control interface of the bridge is not described in the source document"
  - "IP-side control interface of the bridge is not described in the source. Source was a refined excerpt of the SDN bus protocol guide, not a full bridge manual."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:16.255Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched literally to source opcodes; transport parameters verified; master-side control scope is complete. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy CI-Somfy-RTS-IPToSerial Control Spec

## Summary
Control spec for the Somfy CI-Somfy-RTS-IPToSerial bridge, covering the SOMFY Digital Network (SDN) protocol spoken on the downstream RS-485 bus to Somfy motorized products (RTS transmitters, Glydea, Ø30/Ø50 AC/DC motors). The bridge accepts SDN commands from an upstream IP controller and forwards them onto the bus. Source document describes the SDN bus protocol in detail; the IP-side control interface of the bridge itself is not documented here.

<!-- UNRESOLVED: IP-side control interface of the bridge is not described in the source document -->

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
auth:
  type: none  # inferred: no auth procedure described in source
```

## Traits
```yaml
- powerable  # inferred: network-lock and movement commands imply power-managed motor control
- routable  # inferred: CTRL_MOVETO routes motor to a target position
- queryable  # inferred: GET_xxx commands and POST_xxx responses present
- levelable  # inferred: SET_MOTOR_IP and percentage-based positioning present
```

## Actions
```yaml
- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "40h"
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51h"
  params:
    - name: GroupIndex
      type: integer
      description: Entry in the group table (0-15)
    - name: GroupID
      type: integer
      description: 24-bit group address (3 bytes, LSB first on the bus)

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "41h"
  params:
    - name: GroupIndex
      type: integer
      description: Entry in the group table (0-15)

- id: get_node_app_version
  label: Get Node Firmware Version
  kind: query
  command: "74h"
  params: []

- id: set_node_label
  label: Set Node Label
  kind: action
  command: "55h"
  params:
    - name: Label
      type: string
      description: 16-character ASCII label; space-padded if shorter

- id: get_node_label
  label: Get Node Label
  kind: query
  command: "45h"
  params: []

- id: set_local_ui
  label: Set Local UI (HMI) State
  kind: action
  command: "17h"
  params:
    - name: Function
      type: integer
      description: 00h = Enable/Unlock, 01h = Disable/Lock; others return NACK
    - name: UI_Index
      type: integer
      description: 00h = All local controls/feedbacks, 01h = DCT input, 02h = Local stimuli (radio pairing pushbutton), 03h = Local Radio (e.g. Bluetooth), 04h = Touch Motion, 05h = LEDs
    - name: Priority
      type: integer
      description: 0-255; greater number = higher priority

- id: get_local_ui
  label: Get Local UI (HMI) State
  kind: query
  command: "27h"
  params:
    - name: UI_Index
      type: integer
      description: 01h to UI_MAX per device

- id: set_motor_ip
  label: Set Motor Intermediate Position
  kind: action
  command: "15h"
  params:
    - name: Function
      type: integer
      description: 00h = Delete IP, 01h = Set IP at current position, 03h = Set IP at specified position (Value=%), 04h = Divide full range into N equally-spaced IPs (Value=count, IP_Index ignored)
    - name: IP_Index
      type: integer
      description: 1-16
    - name: Value
      type: integer
      description: 16-bit; meaning depends on Function (ignored for 00h and 01h)

- id: get_motor_ip
  label: Get Motor Intermediate Position
  kind: query
  command: "25h"
  params:
    - name: IP_Index
      type: integer
      description: 1-16

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "13h"
  params:
    - name: UP_Speed
      type: integer
      description: 8-bit speed value (rpm) during UP movement; range per device datasheet
    - name: DOWN_Speed
      type: integer
      description: 8-bit speed value (rpm) during DOWN movement; range per device datasheet
    - name: Slow_Speed
      type: integer
      description: 8-bit speed value (rpm) for adjustment movements; range per device datasheet

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
    - name: Function
      type: integer
      description: 00h = Unlock, 01h = Lock, 03h = Save lock across power cycle, 04h = Do not save lock across power cycle
    - name: Priority
      type: integer
      description: 0-255; greater number = higher priority. Ignored when Function is 03h or 04h.

- id: get_network_lock
  label: Get Network Lock State
  kind: query
  command: "26h"
  params: []

- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "03h"
  params:
    - name: Function
      type: integer
      description: 00h = DOWN limit (Position ignored), 01h = UP limit (Position ignored), 02h = Intermediate Position (Position = IP index 0-15), 04h = Position in % of full travel (Position = 0-100)
    - name: Position
      type: integer
      description: 16-bit; meaning depends on Function
    - name: Reserved
      type: integer
      description: 8-bit reserved; set to 00h or FFh per source

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "02h"
  params:
    - name: Reserved
      type: integer
      description: 8-bit reserved; set to 00h or FFh per source

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
- id: node_addr
  type: object
  description: POST_NODE_ADDR (60h) - returned in response to GET_NODE_ADDR. Address is carried in the frame header SOURCE@ field, no DATA bytes.
  source: "60h"

- id: group_addr
  type: object
  description: POST_GROUP_ADDR (61h) - response to GET_GROUP_ADDR. DATA: GroupIndex (8-bit, 0-15) + GroupID (24-bit).
  source: "61h"

- id: ack
  type: enum
  values: [acknowledged]
  description: ACK (7Fh) - positive acknowledgment. Sent only when the request had the ACK bit set in byte 2.
  source: "7Fh"

- id: nack
  type: object
  description: NACK (6Fh) - error acknowledgment. DATA: ErrorCode (8-bit). Codes: 01h = Data out of range, 10h = Unknown message, 11h = Message Length Error, FFh = Busy - cannot process.
  source: "6Fh"
  fields:
    - name: ErrorCode
      type: integer
      description: 8-bit error code (01h, 10h, 11h, FFh implemented in all products)

- id: node_app_version
  type: object
  description: POST_NODE_APP_VERSION (75h) - firmware version report. 6 bytes: App_Reference (24-bit, firmware part number), App_IndexLetter (8-bit ASCII, firmware major revision), App_IndexNumber (8-bit, firmware revision), Reserved (8-bit).
  source: "75h"
  fields:
    - name: App_Reference
      type: integer
      description: 24-bit firmware part number
    - name: App_IndexLetter
      type: integer
      description: 8-bit ASCII major revision letter
    - name: App_IndexNumber
      type: integer
      description: 8-bit firmware revision number

- id: node_label
  type: object
  description: POST_NODE_LABEL (65h) - 16-character ASCII label string.
  source: "65h"
  fields:
    - name: Label
      type: string
      description: 16-character ASCII label, space-padded

- id: local_ui_status
  type: object
  description: POST_LOCAL_UI (37h) - HMI lock state. 5 bytes: Status (8-bit) + Source_Addr (24-bit) + Priority (8-bit).
  source: "37h"
  fields:
    - name: Status
      type: integer
      description: 00h = Enabled/Unlocked, 01h = Disabled/Locked
    - name: Source_Addr
      type: integer
      description: 24-bit NodeID of the device that sent the lock command (000000h when unlocked)
    - name: Priority
      type: integer
      description: 8-bit lock priority (00h when unlocked)

- id: motor_ip
  type: object
  description: POST_MOTOR_IP (35h) - intermediate position report. 4 bytes: IP_index (8-bit, 1-16) + Reserved (16-bit) + IP_position_percentage (8-bit, 0-100, or FFh if not set).
  source: "35h"
  fields:
    - name: IP_index
      type: integer
      description: 1-16
    - name: IP_position_percentage
      type: integer
      description: 0-100, or FFh if IP not set

- id: motor_rolling_speed
  type: object
  description: POST_MOTOR_ROLLING_SPEED (33h) - speed report. 3 bytes: UP_Speed (8-bit) + DOWN_Speed (8-bit) + Slow_Speed (8-bit). Ranges per device datasheet.
  source: "33h"

- id: network_lock_status
  type: object
  description: POST_NETWORK_LOCK (36h) - network lock state. 6 bytes: Status (8-bit) + Source_Addr (24-bit) + Priority (8-bit) + Saved (8-bit).
  source: "36h"
  fields:
    - name: Status
      type: integer
      description: 00h = Unlocked, 01h = Locked
    - name: Source_Addr
      type: integer
      description: 24-bit NodeID of the device that issued the lock
    - name: Priority
      type: integer
      description: 8-bit lock priority
    - name: Saved
      type: integer
      description: 00h = Lock will NOT be restored on power cycle, 01h = Lock WILL be restored on power cycle

- id: motor_position
  type: object
  description: POST_MOTOR_POSITION (0Dh) - position report. 5 bytes: Position_pulse (16-bit) + Position_percentage (8-bit, 0-100) + Reserved (8-bit) + IP (8-bit).
  source: "0Dh"
  fields:
    - name: Position_pulse
      type: integer
      description: 16-bit pulse count, between UP_LIMIT and DOWN_LIMIT
    - name: Position_percentage
      type: integer
      description: 0-100
    - name: IP
      type: integer
      description: 01h-IP_MAX when at an IP position, FFh otherwise

- id: motor_status
  type: object
  description: POST_MOTOR_STATUS (0Fh) - motor state. 4 bytes: Status (8-bit) + Direction (8-bit) + Source (8-bit) + Cause (8-bit).
  source: "0Fh"
  fields:
    - name: Status
      type: integer
      description: 00h = Stopped, 01h = Running, 02h = Blocked (thermal/obstacle), 03h = Locked by another device
    - name: Direction
      type: integer
      description: 00h = Going DOWN, 01h = Going UP (or last direction if stopped), FFh = Unknown
    - name: Source
      type: integer
      description: 00h = Internal (limit/IP/over-current/thermal), 01h = Network message, 02h = Local UI
    - name: Cause
      type: integer
      description: 00h = Target reached, 01h = Explicit command, 02h = Wink, 20h = Obstacle detection, 21h = Over-current protection, 22h = Thermal protection, 30h = Run time exceeded, 32h = Timeout (>2min on CTRL_MOVE), FFh = Reset/PowerUp
```

## Events
```yaml
- id: unsolicited_node_addr
  description: POST_NODE_ADDR (60h) may be sent without a MASTER request when the user triggers a device's pushbutton. Address is in the frame header SOURCE@ field.
  source: "60h"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: network_lock
    description: SET_NETWORK_LOCK rejects all CTRL_XXX and SET_MOTOR_LIMITS / SET_TILT_LIMITS messages with NACK (NODE_IS_LOCKED) unless the controlling message carries an equal or higher priority. Lock can be re-set or cleared with equal/higher priority.
    source_section: "§6.3.4"
  - id: immediate_stop
    description: CTRL_STOP halts the motor immediately without a speed ramp-down.
    source_section: "§6.4.2"
```

## Notes
- Bus topology: half-duplex RS-485, MASTER/SLAVE. Only the MASTER may initiate; SLAVEs reply only when polled. The exception is POST_NODE_ADDR via a device pushbutton.
- Bit inversion: every data byte must be bitwise-NOT-ed before transmission (e.g. 58h on the bus becomes A7h). Bit ordering is LSB first.
- Frame: MSG (1B) | ACK/LEN (1B) | NODE TYPE (1B) | SOURCE@ (3B, LSB first) | DEST@ (3B, LSB first) | DATA (0-21B) | CHECKSUM (2B). Min 11B, max 32B. The `command` field on each action above is the MSG byte; the full frame must be assembled per this structure.
- Checksum: two's-complement-style sum of bytes 1..n-2, transmitted LSB first.
- Bus timing: MASTER waits >= Treq (10ms) before sending; SLAVEs reply after Trep (5-255ms, partially randomized); inter-character gap must not exceed Tc (1ms). No sync byte - a message is delimited by bus inactivity.
- Source documents RS-485 (not RS-232C as the user hint suggested). The serial block reflects source. Baud=4800, 8/O/1 with bit-inversion.
- Downstream NodeTypes supported per source §3.2.2: 02h = Ø30 DC Serie RS485, 05h = RS485 RTS transmitter, 06h = Glydea RS485, 07h = Ø50 AC Serie RS485, 08h = Ø50 DC Serie RS485, 09h = Ø40 AC Serie RS485 (not yet available at source date).
- Collision avoidance: avoid requesting ACK or feedback in group or broadcast addressing modes.
- Intermediate positions (IP) and percentage targets assume device limits have been pre-configured by the installer.

<!-- UNRESOLVED: IP-side control interface of the bridge is not described in the source. Source was a refined excerpt of the SDN bus protocol guide, not a full bridge manual. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T05:46:16.255Z
last_checked_at: 2026-06-02T05:46:16.255Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:16.255Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched literally to source opcodes; transport parameters verified; master-side control scope is complete. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IP-side control interface of the bridge is not described in the source document"
- "IP-side control interface of the bridge is not described in the source. Source was a refined excerpt of the SDN bus protocol guide, not a full bridge manual."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
