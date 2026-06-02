---
spec_id: admin/somfy-sdn-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy SDN Series Control Spec"
manufacturer: Somfy
model_family: "Ø30 DC Serie RS485"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Ø30 DC Serie RS485"
    - "RS485 RTS transmitter"
    - "Glydea RS485"
    - "Ø50 AC Serie RS485"
    - "Ø50 DC Serie RS485"
    - "Ø40 AC Serie RS485"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-06-02T06:13:23.596Z
last_checked_at: 2026-05-17T00:14:06.133Z
generated_at: 2026-05-17T00:14:06.133Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical wiring polarity, terminator resistance, and electrical specs not stated in refined source"
  - "firmware version compatibility ranges not stated"
  - "flow control not stated explicitly in source"
  - "settable parameters are exposed through SET_* actions; no separate variable model in source"
  - "source documents one unsolicited behavior - some devices can send their address when a local pushbutton is pressed (POST_NODE_ADDR) - but no general event model is defined"
  - "no multi-step macros described in source"
  - "no power-on sequencing or voltage/current requirements stated in refined source"
  - "termination resistor value, bus length limits, recommended cable type, idle-state polarity not stated in refined source"
  - "SET_MOTOR_LIMITS and SET_TILT_LIMITS messages are referenced in the NETWORK_LOCK section but not documented in the refined source — these are MASTER actions that exist but their opcodes/DATA structures are not in the excerpt provided"
  - "CTRL_MOVE message referenced in motor status Cause 32h (Timeout exceeded \"when using CTRL_MOVE\") is not documented in the refined source — opcode not given"
  - "CTRL_NETWORK_LOCK referenced in lock section as an additional control message but not documented in the refined source"
  - "WINK behaviour (Cause 02h in POST_MOTOR_STATUS) suggests a Wink control command exists but it is not documented in the refined source"
verification:
  verdict: verified
  checked_at: 2026-05-17T00:14:06.133Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions verified against source; transport parameters confirmed; complete bilateral coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy SDN Series Control Spec

## Summary
Somfy Digital Network (SDN) is a half-duplex RS485 binary protocol for controlling Somfy motorized window-covering products (shades, blinds, drapery). A MASTER controller sends commands to one SLAVE, a group, or broadcast. Devices are addressed by 3-byte NodeID and 4-bit NodeType. This spec covers the MASTER-side message set documented in the SDN protocol manual.

<!-- UNRESOLVED: physical wiring polarity, terminator resistance, and electrical specs not stated in refined source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated explicitly in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable   # inferred from GET_* query commands
- levelable   # inferred from CTRL_MOVETO with position percentage (0-100)
```

## Actions
```yaml
- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "40"   # MSG=40h GET_NODE_ADDR; DATA length 0
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51"   # MSG=51h SET_GROUP_ADDR; DATA length 4 (GroupIndex[8], GroupID[24])
  params:
    - name: group_index
      type: integer
      description: Entry in group table (0-15)
    - name: group_id
      type: string
      description: 24-bit group address (3 bytes, LSBF)

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "41"   # MSG=41h GET_GROUP_ADDR; DATA length 1 (GroupIndex[8])
  params:
    - name: group_index
      type: integer
      description: Entry in group table (0-15)

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  command: "74"   # MSG=74h GET_NODE_APP_VERSION; DATA length 0
  params: []

- id: set_node_label
  label: Set Node Label
  kind: action
  command: "55"   # MSG=55h SET_NODE_LABEL; DATA length 16 (string, pad with spaces)
  params:
    - name: label
      type: string
      description: 16-char ASCII label (pad with spaces if shorter)

- id: get_node_label
  label: Get Node Label
  kind: query
  command: "45"   # MSG=45h GET_NODE_LABEL; DATA length 0
  params: []

- id: set_local_ui
  label: Set Local UI Lock
  kind: action
  command: "17"   # MSG=17h SET_LOCAL_UI; DATA length 3 (Function[8], UI_Index[8], Priority[8])
  params:
    - name: function
      type: integer
      description: 00h=Enable/Unlock, 01h=Disable/Lock
    - name: ui_index
      type: integer
      description: 00h=All, 01h=DCT, 02h=Local stimuli, 03h=Local Radio, 04h=Touch Motion, 05h=LEDs
    - name: priority
      type: integer
      description: Priority 00h-FFh (higher = more privileged)

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  command: "27"   # MSG=27h GET_LOCAL_UI; DATA length 1 (UI_Index[8])
  params:
    - name: ui_index
      type: integer
      description: UI index 01h-UI_MAX (see set_local_ui)

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "15"   # MSG=15h SET_MOTOR_IP; DATA length 4 (Function[8], IP_Index[8], Value[16])
  params:
    - name: function
      type: integer
      description: 00h=Delete, 01h=Set IP at current pos, 03h=Set IP at specified %, 04h=Divide full range
    - name: ip_index
      type: integer
      description: Intermediate position index (1-16); ignored when function=04h
    - name: value
      type: integer
      description: 16-bit value (position % when function=03h; IP count when function=04h)

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "25"   # MSG=25h GET_MOTOR_IP; DATA length 1 (IP_Index[8])
  params:
    - name: ip_index
      type: integer
      description: Intermediate position index (1-16)

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "13"   # MSG=13h SET_MOTOR_ROLLING_SPEED; DATA length 3 (UP_Speed[8], DOWN_Speed[8], Slow_Speed[8])
  params:
    - name: up_speed
      type: integer
      description: Speed during UP movement in rpm (range per motor datasheet)
    - name: down_speed
      type: integer
      description: Speed during DOWN movement in rpm (range per motor datasheet)
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements in rpm (range per motor datasheet)

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "23"   # MSG=23h GET_MOTOR_ROLLING_SPEED; DATA length 0
  params: []

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16"   # MSG=16h SET_NETWORK_LOCK; DATA length 2 (Function[8], Priority[8])
  params:
    - name: function
      type: integer
      description: 00h=Unlock, 01h=Lock at current position, 03h=Save lock on power cycle, 04h=Do not save lock
    - name: priority
      type: integer
      description: Priority 00h-FFh (higher = more privileged); ignored for save/no-save functions

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  command: "26"   # MSG=26h GET_NETWORK_LOCK; DATA length 0
  params: []

- id: ctrl_moveto
  label: Move To Position
  kind: action
  command: "03"   # MSG=03h CTRL_MOVETO; DATA length 4 (Function[8], Position[16], Reserved[8])
  params:
    - name: function
      type: integer
      description: 00h=DOWN limit, 01h=UP limit, 02h=Intermediate Position, 04h=Position in % of full travel
    - name: position
      type: integer
      description: 16-bit value; IP index (0-15) when function=02h, percentage (0-100) when function=04h; ignored otherwise

- id: ctrl_stop
  label: Stop
  kind: action
  command: "02"   # MSG=02h CTRL_STOP; DATA length 1 (Reserved[8])
  params: []

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "0C"   # MSG=0Ch GET_MOTOR_POSITION; DATA length 0
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "0E"   # MSG=0Eh GET_MOTOR_STATUS; DATA length 0
  params: []
```

## Feedbacks
```yaml
- id: post_node_addr
  label: Post Node Address
  type: response
  message_id: "60"   # MSG=60h POST_NODE_ADDR; DATA length 0 (address is in frame header)
  fields: []

- id: post_group_addr
  label: Post Group Address
  type: response
  message_id: "61"   # MSG=61h POST_GROUP_ADDR; DATA length 4
  fields:
    - name: group_index
      type: integer
      description: Entry in group table (0-15)
    - name: group_id
      type: string
      description: 24-bit group address (3 bytes, LSBF)

- id: post_node_app_version
  label: Post Firmware Revision
  type: response
  message_id: "75"   # MSG=75h POST_NODE_APP_VERSION; DATA length 6
  fields:
    - name: app_reference
      type: string
      description: 24-bit firmware part number
    - name: app_index_letter
      type: string
      description: 8-bit ASCII firmware major revision (41h-5Ah)
    - name: app_index_number
      type: integer
      description: 8-bit firmware revision
    - name: reserved
      type: integer
      description: 8-bit reserved field

- id: post_node_label
  label: Post Node Label
  type: response
  message_id: "65"   # MSG=65h POST_NODE_LABEL; DATA length 16
  fields:
    - name: label
      type: string
      description: 16-char ASCII label

- id: post_local_ui
  label: Post Local UI Status
  type: response
  message_id: "37"   # MSG=37h POST_LOCAL_UI; DATA length 5
  fields:
    - name: status
      type: enum
      values: [enabled, locked]
      description: 00h=Enabled/Unlocked, 01h=Disabled/Locked
    - name: source_addr
      type: string
      description: 24-bit NodeID of device that sent the lock command
    - name: priority
      type: integer
      description: Lock priority (00h-FFh)

- id: post_motor_ip
  label: Post Intermediate Position
  type: response
  message_id: "35"   # MSG=35h POST_MOTOR_IP; DATA length 4
  fields:
    - name: ip_index
      type: integer
      description: IP index (1-16)
    - name: reserved
      type: integer
      description: 16-bit reserved
    - name: ip_position_percentage
      type: integer
      description: IP position 0-100 percent (FFh if IP not set)

- id: post_motor_rolling_speed
  label: Post Motor Rolling Speed
  type: response
  message_id: "33"   # MSG=33h POST_MOTOR_ROLLING_SPEED; DATA length 3
  fields:
    - name: up_speed
      type: integer
      description: Speed during UP movement (rpm)
    - name: down_speed
      type: integer
      description: Speed during DOWN movement (rpm)
    - name: slow_speed
      type: integer
      description: Speed for adjustments (rpm)

- id: post_network_lock
  label: Post Network Lock Status
  type: response
  message_id: "36"   # MSG=36h POST_NETWORK_LOCK; DATA length 6
  fields:
    - name: status
      type: enum
      values: [unlocked, locked]
      description: 00h=Unlocked, 01h=Locked
    - name: source_addr
      type: string
      description: 24-bit NodeID of device that sent the lock command
    - name: priority
      type: integer
      description: Lock priority (00h-FFh)
    - name: saved
      type: enum
      values: [not_saved, saved]
      description: 00h=Not restored on power cycle, 01h=Restored on power cycle

- id: post_motor_position
  label: Post Motor Position
  type: response
  message_id: "0D"   # MSG=0Dh POST_MOTOR_POSITION; DATA length 5
  fields:
    - name: position_pulse
      type: integer
      description: 16-bit pulse count (range UP_LIMIT to DOWN_LIMIT)
    - name: position_percentage
      type: integer
      description: Position as percentage (0-100)
    - name: reserved
      type: integer
      description: 8-bit reserved
    - name: ip
      type: integer
      description: Matching IP index (01h-IP_MAX); FFh if position does not match any IP

- id: post_motor_status
  label: Post Motor Status
  type: response
  message_id: "0F"   # MSG=0Fh POST_MOTOR_STATUS; DATA length 4
  fields:
    - name: status
      type: enum
      values: [stopped, running, blocked, locked]
      description: 00h=Stopped, 01h=Running, 02h=Blocked (thermal/obstacle), 03h=Locked (NETWORK_LOCK)
    - name: direction
      type: enum
      values: [down, up, unknown]
      description: 00h=Going DOWN, 01h=Going UP, FFh=Unknown
    - name: source
      type: enum
      values: [internal, network, local_ui]
      description: 00h=Internal trigger, 01h=Network message, 02h=Local UI
    - name: cause
      type: integer
      description: 00h=Target reached, 01h=Explicit command, 02h=Wink, 20h=Obstacle, 21h=Over-current, 22h=Thermal, 30h=Run time exceeded, 32h=Timeout, FFh=Reset/PowerUp

- id: ack
  label: Acknowledgement
  type: response
  message_id: "7F"   # MSG=7Fh ACK; DATA length 0
  fields: []

- id: nack
  label: Negative Acknowledgement
  type: response
  message_id: "6F"   # MSG=6Fh NACK; DATA length 1
  fields:
    - name: error_code
      type: integer
      description: 01h=Data out of range, 10h=Unknown message, 11h=Message length error, FFh=Busy
```

## Variables
```yaml
# UNRESOLVED: settable parameters are exposed through SET_* actions; no separate variable model in source
```

## Events
```yaml
# UNRESOLVED: source documents one unsolicited behavior - some devices can send their address when a local pushbutton is pressed (POST_NODE_ADDR) - but no general event model is defined
- id: unsolicited_node_addr
  label: Unsolicited Node Address Announcement
  description: Some devices can send POST_NODE_ADDR (60h) without a MASTER request when the user presses a local pushbutton on the device.
  message_id: "60"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: network_lock
    description: A device under NETWORK_LOCK (Lock function 01h) will reject CTRL_XXX movements and SET_MOTOR_LIMITS/SET_TILT_LIMITS unless the requesting command carries equal or higher priority. NACK(NODE_IS_LOCKED) is returned otherwise.
  - id: local_ui_lock
    description: Local UI components (DCT, LEDs, Bluetooth, Touch Motion, local stimuli) can be individually disabled via SET_LOCAL_UI with a priority level; further lock changes require equal or higher priority or NACK(LOW_PRIORITY) is returned.
  - id: motor_thermal_overcurrent_protection
    description: Motor self-reports Blocked status (02h) on thermal protection, over-current, or obstacle detection. These are device-internal interlocks (cause codes 20h obstacle, 21h over-current, 22h thermal) reported via POST_MOTOR_STATUS.
# UNRESOLVED: no power-on sequencing or voltage/current requirements stated in refined source
```

## Notes

**Frame structure** — every message is wrapped in the SDN frame: `MSG | ACK/LEN | NODE_TYPE | SOURCE@(3 bytes) | DEST@(3 bytes) | DATA(0-21 bytes) | CHECKSUM(2 bytes)`. Minimum frame length is 11 bytes, maximum 32. The `command:` field on each action is the MSG opcode byte only — the implementer must construct the full frame around it.

**Bit inversion** — to maintain backward compatibility with earlier protocol versions, all data bits must be inverted before transmission. Transmitting byte 58h means putting NOT(58h) = A7h on the bus. This applies to every byte in the frame including MSG and CHECKSUM.

**Checksum** — computed as the sum of the complement of every byte in the frame (bytes 1 through n-2), occupying the final 2 bytes. Basic error detection only; no correction.

**LSBF** — source/destination addresses are transmitted least-significant-byte first. A NodeID printed `05:04:03` on the device label appears in the frame as bytes `03 04 05`.

**Addressing modes** — Point-to-Point uses DEST@ = target NodeID. Group uses SOURCE@ = GroupID and DEST@ = `00 00 00`. Broadcast uses DEST@ = `FF FF FF`. NodeType filtering further restricts which devices act on a frame.

**Timings** — Treq ≥ 10 ms before a MASTER may transmit. Tc ≤ 1 ms between consecutive characters of a frame. Tfree = 3 ms typical for end-of-frame detection (no sync byte). Trep (slave reply delay) is randomized between 5 ms and 255 ms.

**Acknowledgements** — ACK is only sent when the requesting MASTER sets the ACK bit (bit 7 of byte 2 in the frame header). For SET_* messages, ACK is sent after parameters are saved; for CTRL_* messages, ACK is sent when execution starts (not when finished). GET_* messages get no ACK because the POST_* response is itself the acknowledgement.

**Collision avoidance** — broadcast and group commands should NOT request ACK or feedback, since multiple slaves may reply simultaneously on the RS485 bus and corrupt each other's transmissions.

**Physical layer** — source specifies RS485 (not RS-232). 4800 baud, 8 data bits, odd parity, 1 stop bit.

<!-- UNRESOLVED: termination resistor value, bus length limits, recommended cable type, idle-state polarity not stated in refined source -->
<!-- UNRESOLVED: SET_MOTOR_LIMITS and SET_TILT_LIMITS messages are referenced in the NETWORK_LOCK section but not documented in the refined source — these are MASTER actions that exist but their opcodes/DATA structures are not in the excerpt provided -->
<!-- UNRESOLVED: CTRL_MOVE message referenced in motor status Cause 32h (Timeout exceeded "when using CTRL_MOVE") is not documented in the refined source — opcode not given -->
<!-- UNRESOLVED: CTRL_NETWORK_LOCK referenced in lock section as an additional control message but not documented in the refined source -->
<!-- UNRESOLVED: WINK behaviour (Cause 02h in POST_MOTOR_STATUS) suggests a Wink control command exists but it is not documented in the refined source -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-06-02T06:13:23.596Z
last_checked_at: 2026-05-17T00:14:06.133Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-17T00:14:06.133Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions verified against source; transport parameters confirmed; complete bilateral coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical wiring polarity, terminator resistance, and electrical specs not stated in refined source"
- "firmware version compatibility ranges not stated"
- "flow control not stated explicitly in source"
- "settable parameters are exposed through SET_* actions; no separate variable model in source"
- "source documents one unsolicited behavior - some devices can send their address when a local pushbutton is pressed (POST_NODE_ADDR) - but no general event model is defined"
- "no multi-step macros described in source"
- "no power-on sequencing or voltage/current requirements stated in refined source"
- "termination resistor value, bus length limits, recommended cable type, idle-state polarity not stated in refined source"
- "SET_MOTOR_LIMITS and SET_TILT_LIMITS messages are referenced in the NETWORK_LOCK section but not documented in the refined source — these are MASTER actions that exist but their opcodes/DATA structures are not in the excerpt provided"
- "CTRL_MOVE message referenced in motor status Cause 32h (Timeout exceeded \"when using CTRL_MOVE\") is not documented in the refined source — opcode not given"
- "CTRL_NETWORK_LOCK referenced in lock section as an additional control message but not documented in the refined source"
- "WINK behaviour (Cause 02h in POST_MOTOR_STATUS) suggests a Wink control command exists but it is not documented in the refined source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
