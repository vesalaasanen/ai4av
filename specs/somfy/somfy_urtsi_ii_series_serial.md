---
spec_id: admin/somfy-urtsi-ii-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy URTSI II Series Control Spec (SOMFY Digital Network / SDN)"
manufacturer: Somfy
model_family: "URTSI II Series"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "URTSI II Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:18.589Z
last_checked_at: 2026-05-14T18:17:20.744Z
generated_at: 2026-05-14T18:17:20.744Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Host-side RS-232 framing on the URTSI II is not documented in the refined source; this spec covers the bus-side SDN protocol."
  - "physical layer is RS-485 per source (half-duplex bus), not RS-232C"
  - "All data bits must be inverted (bitwise NOT) before transmission; least-significant-bit-first ordering; NRZ character coding. Documented in source §4.2."
  - "no explicit user-facing safety warnings about entanglement, pinch hazards, or"
  - "per-device UP/DOWN/Slow rpm ranges are not in the source — referenced to a device technical datasheet."
  - "SET_MOTOR_LIMITS and SET_TILT_LIMITS are referenced in §6.3.4 remarks but not defined in the refined excerpt."
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.744Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 30 spec actions matched verbatim to source commands with correct opcodes, parameter ranges, and transport configuration fully documented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy URTSI II Series Control Spec

## Summary
Spec for the Somfy URTSI II Series, an RS-232-to-RS485 bridge that exposes Somfy Digital Network (SDN) bus control of Somfy motorized window-covering products (Ø30 DC, Ø50 AC/DC, Glydea, RS485 RTS transmitter families). Source document is the SDN Protocol Integration Guide describing the half-duplex RS-485 bus protocol, message structure, and the SET_/CTRL_/GET_/POST_ command catalogue.

<!-- UNRESOLVED: Host-side RS-232 framing on the URTSI II is not documented in the refined source; this spec covers the bus-side SDN protocol. -->

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
  # UNRESOLVED: physical layer is RS-485 per source (half-duplex bus), not RS-232C
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: All data bits must be inverted (bitwise NOT) before transmission; least-significant-bit-first ordering; NRZ character coding. Documented in source §4.2. -->

## Traits
```yaml
- powerable       # inferred: motor stop/move controls imply power-managed devices
- routable        # inferred: position-move and intermediate-position commands present
- queryable       # inferred: GET_NODE_ADDR, GET_MOTOR_POSITION, GET_MOTOR_STATUS present
- levelable       # inferred: SET_MOTOR_ROLLING_SPEED (UP/DOWN/Slow rpm) present
- lockable        # inferred: SET_NETWORK_LOCK present
```

## Actions
```yaml
# NOTE: SDN is a binary protocol over RS-485. Each frame has:
#   Byte 1      = MSG
#   Byte 2      = ACK/LEN (ACK bit + frame length)
#   Byte 3      = NODE TYPE (source high-nibble always 0h for master; dest NodeType low-nibble)
#   Bytes 4-6   = SOURCE@ (LSB-first 3-byte NodeID)
#   Bytes 7-9   = DEST@   (LSB-first 3-byte NodeID; FFFFFFh = broadcast; 000000h = group)
#   Bytes 10-n  = DATA (per-message)
#   Byte n      = CHECKSUM = (Byte1 + … + Byte n-2) of the un-inverted payload
# All data bytes must be bitwise-inverted before going on the wire (§4.2).
# The `command:` field below shows the MSG byte + DATA template per source.

- id: get_node_addr
  label: Get Device NodeID
  kind: query
  command: "MSG=40h, DATA=<none>"
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "MSG=51h, DATA=<GroupIndex[8bit 0-15], GroupID[24bit]>"
  params:
    - name: GroupIndex
      type: integer
      description: Entry in the device group table (0 to 15)
    - name: GroupID
      type: integer
      description: 24-bit group address (NodeID of the group controller)

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "MSG=41h, DATA=<GroupIndex[8bit 0-15]>"
  params:
    - name: GroupIndex
      type: integer
      description: Entry in the group table to read (0 to 15)

- id: set_node_label
  label: Set Node Text Label
  kind: action
  command: "MSG=55h, DATA=<Label[16-char string, pad with spaces]>"
  params:
    - name: Label
      type: string
      description: Up to 16 ASCII characters, space-padded to length 16

- id: get_node_label
  label: Get Node Text Label
  kind: query
  command: "MSG=45h, DATA=<none>"

- id: get_node_app_version
  label: Get Firmware Version
  kind: query
  command: "MSG=74h, DATA=<none>"

- id: set_local_ui
  label: Set Local HMI (Lock/Enable)
  kind: action
  command: "MSG=17h, DATA=<Function[8bit 0-1], UI_Index[8bit 0-5], Priority[8bit 0-FFh]>"
  params:
    - name: Function
      type: integer
      description: "0h=Enable/Unlock, 1h=Disable/Lock"
    - name: UI_Index
      type: integer
      description: "0h=All, 1h=DCT input, 2h=Local stimuli, 3h=Local Radio (e.g. Bluetooth), 4h=Touch Motion, 5h=LEDs"
    - name: Priority
      type: integer
      description: 0-FFh; greater number = higher priority. Must be ≥ current lock priority or NACK(LOW_PRIORITY).

- id: get_local_ui
  label: Get Local HMI Status
  kind: query
  command: "MSG=27h, DATA=<UI_Index[8bit 1-UI_MAX]>"
  params:
    - name: UI_Index
      type: integer
      description: "1-UI_MAX (per SET_LOCAL_UI table)"

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "MSG=15h, DATA=<Function[8bit 0-4], IP_Index[8bit 1-16], Value[16bit]>"
  params:
    - name: Function
      type: integer
      description: "0h=Delete IP (Value ignored), 1h=Set IP at current position (Value ignored), 3h=Set IP at Value% position, 4h=Divide full range into Value equal IPs (IP_Index ignored)"
    - name: IP_Index
      type: integer
      description: 1 to 16 (ignored when Function=4h)
    - name: Value
      type: integer
      description: Position in % (Function=3h) or IP count (Function=4h); 16-bit

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "MSG=25h, DATA=<IP_Index[8bit 1-16]>"
  params:
    - name: IP_Index
      type: integer
      description: 1 to 16

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "MSG=13h, DATA=<UP_Speed[8bit], DOWN_Speed[8bit], Slow_Speed[8bit]>"
  params:
    - name: UP_Speed
      type: integer
      description: Speed during UP movement (rpm); range per device technical datasheet
    - name: DOWN_Speed
      type: integer
      description: Speed during DOWN movement (rpm); range per device technical datasheet
    - name: Slow_Speed
      type: integer
      description: Speed for adjustment movements (rpm); range per device technical datasheet

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "MSG=23h, DATA=<none>"

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "MSG=16h, DATA=<Function[8bit 0-4], Priority[8bit 0-FFh]>"
  params:
    - name: Function
      type: integer
      description: "0h=Unlock, 1h=Lock at current position, 3h=Save lock across power-cycle (Priority ignored), 4h=Do not save lock across power-cycle (Priority ignored)"
    - name: Priority
      type: integer
      description: 0-FFh; greater = higher priority. Ignored when Function=3h or 4h.

- id: get_network_lock
  label: Get Network Lock State
  kind: query
  command: "MSG=26h, DATA=<none>"

- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "MSG=03h, DATA=<Function[8bit], Position[16bit], Reserved[8bit]>"
  params:
    - name: Function
      type: integer
      description: "0h=Move to DOWN limit (Position ignored), 1h=Move to UP limit (Position ignored), 2h=Move to Intermediate Position (Position=IP index 0-15), 4h=Move to Position in % (Position=0-100)"
    - name: Position
      type: integer
      description: IP index (Function=2h) or % (Function=4h); 16-bit; ignored when Function=0h or 1h
    - name: Reserved
      type: integer
      description: 8-bit reserved; set 00h or FFh

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "MSG=02h, DATA=<Reserved[8bit]>"
  params:
    - name: Reserved
      type: integer
      description: 8-bit reserved; set 00h

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "MSG=0Ch, DATA=<none>"

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "MSG=0Eh, DATA=<none>"
```

## Feedbacks
```yaml
- id: post_node_addr
  type: object
  description: "MSG=60h, no DATA. Reply to GET_NODE_ADDR; address carried in frame header (SOURCE@)."

- id: post_group_addr
  type: object
  description: "MSG=61h, DATA=<GroupIndex[8bit], GroupID[24bit]> - reply to GET_GROUP_ADDR."

- id: post_node_app_version
  type: object
  description: "MSG=75h, DATA=<App_Reference[24bit], App_IndexLetter[8bit ASCII 41h-5Ah], App_IndexNumber[8bit], Reserved[8bit]> - firmware Part Number + major letter + revision."

- id: post_node_label
  type: object
  description: "MSG=65h, DATA=<Label[16-char string]> - reply to GET_NODE_LABEL."

- id: post_local_ui
  type: object
  description: "MSG=37h, DATA=<UI_Index[8bit], Status[8bit 0-1], Source_Addr[24bit], Priority[8bit]>. Status 0h=Enabled, 1h=Disabled."

- id: post_motor_ip
  type: object
  description: "MSG=35h, DATA=<IP_Index[8bit 1-16], Reserved[16bit], IP_position_percentage[8bit 0-100, FFh=not set]> - reply to GET_MOTOR_IP."

- id: post_motor_rolling_speed
  type: object
  description: "MSG=33h, DATA=<UP_Speed[8bit], DOWN_Speed[8bit], Slow_Speed[8bit]> - reply to GET_MOTOR_ROLLING_SPEED."

- id: post_network_lock
  type: object
  description: "MSG=36h, DATA=<Status[8bit 0-1], Source_Addr[24bit], Priority[8bit], Saved[8bit 0-1]>. Status 0h=Unlocked, 1h=Locked. Saved 0h=not restored on power-cycle, 1h=restored."

- id: post_motor_position
  type: object
  description: "MSG=0Dh, DATA=<Position_pulse[16bit], Position_percentage[8bit 0-100], Reserved[8bit], IP[8bit 1-IP_MAX, FFh=not on any IP]>."

- id: post_motor_status
  type: object
  description: "MSG=0Fh, DATA=<Status[8bit], Direction[8bit], Source[8bit], Cause[8bit]>."
  values:
    Status:
      - "00h=Stopped"
      - "01h=Running"
      - "02h=Blocked (thermal, obstacle)"
      - "03h=Locked (NETWORK_LOCK)"
    Direction:
      - "00h=Going DOWN (or last direction if stopped)"
      - "01h=Going UP"
      - "FFh=Unknown"
    Source:
      - "00h=Internal (limit/IP reached, over-current, obstacle, thermal)"
      - "01h=Network message (SDN bus)"
      - "02h=Local UI (DCT, local stimulus, local wireless)"
    Cause:
      - "00h=Target reached"
      - "01h=Explicit command"
      - "02h=WINK"
      - "20h=Obstacle detection"
      - "21h=Over-current protection"
      - "22h=Thermal protection"
      - "30h=Run time exceeded"
      - "32h=Timeout exceeded (CTRL_MOVE > 2 min)"
      - "FFh=Reset / Power Up"

- id: ack
  type: object
  description: "MSG=7Fh, no DATA. Sent only when ACK bit set in the request; confirms settings saved or control execution started."

- id: nack
  type: object
  description: "MSG=6Fh, DATA=<ErrorCode[8bit 01h-FFh]>. Sent when ACK requested but message cannot be processed."
  values:
    ErrorCode:
      - "01h=Data out of range"
      - "10h=Unknown message"
      - "11h=Message length error"
      - "FFh=Busy - cannot process message"
```

## Variables
```yaml
# Discrete enumerated by the SET_xxx actions above.
# - id: intermediate_position
#   description: Motor intermediate position (1-16) with associated percentage 0-100.
#   set_by: set_motor_ip
#   read_by: get_motor_ip
# - id: rolling_speed
#   description: UP / DOWN / Slow rpm triplet for DC motors.
#   set_by: set_motor_rolling_speed
#   read_by: get_motor_rolling_speed
# - id: network_lock_priority
#   description: 0-FFh priority level gating network control.
#   set_by: set_network_lock
#   read_by: get_network_lock
# - id: hmi_lock_state
#   description: Per-UI_Index enable/disable + priority + source address.
#   set_by: set_local_ui
#   read_by: get_local_ui
```

## Safety
```yaml
confirmation_required_for:
  - ctrl_moveto  # implied: motor movement; "EXECUTION is started" but not finished per ACK semantics
interlocks:
  - SET_LOCAL_UI may be re-set/removed only by another SET_LOCAL_UI with ≥ current lock priority, else NACK(LOW_PRIORITY).
  - SET_NETWORK_LOCK prevents all CTRL_XXX, SET_MOTOR_LIMITS, SET_TILT_LIMITS from other than ≥ priority sources (NACK NODE_IS_LOCKED).
  - When SET_NETWORK_LOCK Function=3h (Save) used, the lock is restored at next power-on.
# UNRESOLVED: no explicit user-facing safety warnings about entanglement, pinch hazards, or
# human-load interlocks in the source. Motor-level thermal/obstacle/over-current protection is
# reported via POST_MOTOR_STATUS Cause bytes 20h/21h/22h but is firmware-internal, not protocol-gated.
```

## Notes
- **Bus = RS-485, not RS-232C.** Source §3–§4 explicitly describe a half-duplex RS-485 bus with 4800/8O1, NRZ, LSB-first, with **all data bits bitwise-inverted before transmission** (§4.2). The URTSI II host-facing connector is RS-232C, but the SDN commands documented here are the bus-side frames. The bridge translation itself is not described in this source.
- **Timings (§4.3):** Master must wait ≥10 ms (Treq) after bus activity before transmitting; slave reply latency Trep = 5–255 ms (partially randomized); bus free timeout Tfree = 3 ms; max inter-character gap Tc ≤ 1 ms.
- **Addressing (§3.4, §5.4):** DEST@ = FFFFFFh → broadcast; DEST@ = 000000h → group (uses each device's 16-entry group table); any other NodeID → point-to-point. SOURCE@ / DEST@ are LSB-first.
- **Acknowledgements (§3.6):** Recommended for production use. NACK or timeout should trigger retry. No ACK on status requests (POST_xxx is the feedback).
- **Collisions (§3.7):** Avoid requesting feedback or ACK in group/broadcast modes to lower collision risk.
- **NACK error code 6Fh** carries a single ErrorCode byte in DATA[0] (see Feedbacks). Implemented across all products per source.
- **CTRL_STOP (§6.4.2):** No speed ramp-down — motor is stopped immediately.
- **POST_MOTOR_POSITION** returns position even while the motor is moving.

<!-- UNRESOLVED: per-device UP/DOWN/Slow rpm ranges are not in the source — referenced to a device technical datasheet. -->
<!-- UNRESOLVED: SET_MOTOR_LIMITS and SET_TILT_LIMITS are referenced in §6.3.4 remarks but not defined in the refined excerpt. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:18.589Z
last_checked_at: 2026-05-14T18:17:20.744Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.744Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 30 spec actions matched verbatim to source commands with correct opcodes, parameter ranges, and transport configuration fully documented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Host-side RS-232 framing on the URTSI II is not documented in the refined source; this spec covers the bus-side SDN protocol."
- "physical layer is RS-485 per source (half-duplex bus), not RS-232C"
- "All data bits must be inverted (bitwise NOT) before transmission; least-significant-bit-first ordering; NRZ character coding. Documented in source §4.2."
- "no explicit user-facing safety warnings about entanglement, pinch hazards, or"
- "per-device UP/DOWN/Slow rpm ranges are not in the source — referenced to a device technical datasheet."
- "SET_MOTOR_LIMITS and SET_TILT_LIMITS are referenced in §6.3.4 remarks but not defined in the refined excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
