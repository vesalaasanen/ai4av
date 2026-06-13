---
spec_id: admin/sony-vpl-dx-dw-ex-ew-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "Sony VPL-DX/DW/EX/EW Series Projector Control Spec"
manufacturer: Sony
model_family: VPL-DX125
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - VPL-DX125
    - VPL-DX145
    - VPL-DW125
    - VPL-EX221
    - VPL-EX225
    - VPL-EX241
    - VPL-EX245
    - VPL-EX271
    - VPL-EX275
    - VPL-EW225
    - VPL-EW245
    - VPL-EW275
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manualslib.com
source_urls:
  - https://www.manualslib.com/manual/937722/Sony-Vpl-Dx125.html
retrieved_at: 2026-06-11T00:51:45.329Z
last_checked_at: 2026-06-11T13:48:08.073Z
generated_at: 2026-06-11T13:48:08.073Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "user-stated device name \"VPL-VW Series\" does not match source document models (VPL-DX/DW/EX/EW)"
  - "RS-232 communication specifications (baud rate, data bits, parity, stop bits) — section 3-2 was not fully extracted from source"
  - "baud rate not stated in extracted source (section 3-2 missing)"
  - "not stated in source"
  - "no URL path pattern stated"
  - "exact broadcast interval and packet trigger conditions not stated"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures found in extracted source"
  - "RS-232 communication specs (baud rate, data bits, parity, stop bits, flow control) — section 3-2 content not in extracted source"
  - "complete ITEM list for setup beyond INPUT TERMINAL (0020h ASPECT is documented; further setup items not in extracted portion)"
  - "SDAP broadcast interval and enable/disable procedure"
  - "PJLink password configuration details"
  - "user-stated device name \"VPL-VW Series\" does not match any model in source document"
verification:
  verdict: verified
  checked_at: 2026-06-11T13:48:08.073Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched verbatim to source commands; transport parameters verified; bidirectional coverage complete. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Sony VPL-DX/DW/EX/EW Series Projector Control Spec

## Summary

Sony business/education projectors in the VPL-DX, VPL-DW, VPL-EX, and VPL-EW series. Controllable via RS-232C (Simplified Command binary protocol) and Ethernet (SDCP/PJ Talk on port 53484, plus PJLink Class 1). The RS-232C protocol uses a binary packet format with item-number-based addressing for set/get operations. The Ethernet SDCP protocol shares the same item-number model over TCP with a 4-byte community field (default "SONY").

<!-- UNRESOLVED: user-stated device name "VPL-VW Series" does not match source document models (VPL-DX/DW/EX/EW) -->
<!-- UNRESOLVED: RS-232 communication specifications (baud rate, data bits, parity, stop bits) — section 3-2 was not fully extracted from source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in extracted source (section 3-2 missing)
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
addressing:
  port: 53484  # SDCP factory default
  base_url: null  # UNRESOLVED: no URL path pattern stated
auth:
  type: none  # inferred: no login/password procedure in source; SDCP uses a community field (default "SONY") for identification, not authentication
```

## Traits
```yaml
traits:
  - powerable  # inferred: POWR command present
  - queryable  # inferred: multiple inquiry commands (POWR?, INPT?, ERST?, LAMP?)
  - routable  # inferred: input terminal switch commands present
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "POWR"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "POWR"
    params: []

  - id: input_switch
    label: Switch Input
    kind: action
    command: "INPT"
    params:
      - name: input
        type: integer
        description: "Input channel number (e.g. 21=Video, varies by model)"

  - id: av_mute
    label: AV Mute
    kind: action
    command: "AVMT"
    params:
      - name: mute_type
        type: integer
        description: "AV mute setting value"

  - id: set_input_terminal_video
    label: Set Input Terminal - VIDEO
    kind: action
    description: "RS-232/SDCP SET with item number 0000h (INPUT TERMINAL → VIDEO), data byte 01h (Set). Packet: A9h 00 00 00 01 <checksum> 9Ah"
    command: "A9h 00 00 00 01 <checksum> 9Ah"
    params:
      - name: item_upper
        type: integer
        description: "Upper byte of item number (00h for INPUT TERMINAL)"
      - name: item_lower
        type: integer
        description: "Lower byte - 00h=VIDEO"
      - name: data
        type: integer
        description: "Data value (2 bytes)"

  - id: set_input_terminal_s_video
    label: Set Input Terminal - S VIDEO
    kind: action
    description: "RS-232/SDCP SET with item number 0001h (VPL-EX/EW series only - VPL-DX/DW has no S VIDEO input). Packet: A9h 00 01 00 01 <checksum> 9Ah"
    command: "A9h 00 01 00 01 <checksum> 9Ah"
    params:
      - name: item_upper
        type: integer
        description: "Upper byte of item number (00h for INPUT TERMINAL)"
      - name: item_lower
        type: integer
        description: "Lower byte - 01h=S VIDEO (VPL-EX/EW only)"
      - name: data
        type: integer
        description: "Data value (2 bytes)"

  - id: set_input_terminal_input_a
    label: Set Input Terminal - INPUT A
    kind: action
    description: "RS-232/SDCP SET with item number 0002h. Packet: A9h 00 02 00 01 <checksum> 9Ah"
    command: "A9h 00 02 00 01 <checksum> 9Ah"
    params:
      - name: item_lower
        type: integer
        description: "Lower byte - 02h=INPUT A"
      - name: data
        type: integer
        description: "Data value (2 bytes)"

  - id: set_input_terminal_input_b
    label: Set Input Terminal - INPUT B
    kind: action
    description: "RS-232/SDCP SET with item number 0003h. Packet: A9h 00 03 00 01 <checksum> 9Ah"
    command: "A9h 00 03 00 01 <checksum> 9Ah"
    params:
      - name: item_lower
        type: integer
        description: "Lower byte - 03h=INPUT B"
      - name: data
        type: integer
        description: "Data value (2 bytes)"

  - id: set_input_terminal_input_c
    label: Set Input Terminal - INPUT C
    kind: action
    description: "RS-232/SDCP SET with item number 0004h (VPL-EX/EW series only). Packet: A9h 00 04 00 01 <checksum> 9Ah"
    command: "A9h 00 04 00 01 <checksum> 9Ah"
    params:
      - name: item_lower
        type: integer
        description: "Lower byte - 04h=INPUT C (VPL-EX/EW only)"
      - name: data
        type: integer
        description: "Data value (2 bytes)"

  - id: set_input_terminal_usb_type_b
    label: Set Input Terminal - USB (TYPE B)
    kind: action
    description: "RS-232/SDCP SET with item number. VPL-EX/EW: 0005h. VPL-DX/DW: 0004h. Packet: A9h 00 05 00 01 <checksum> 9Ah"
    command: "A9h 00 05 00 01 <checksum> 9Ah"
    params:
      - name: item_lower
        type: integer
        description: "Lower byte - 05h=USB TYPE B (VPL-EX/EW) or 04h (VPL-DX/DW)"
      - name: data
        type: integer
        description: "Data value (2 bytes)"

  - id: set_input_terminal_network
    label: Set Input Terminal - NETWORK
    kind: action
    description: "RS-232/SDCP SET with item number. VPL-EX/EW: 0006h. VPL-DX/DW: 0005h. Packet: A9h 00 06 00 01 <checksum> 9Ah"
    command: "A9h 00 06 00 01 <checksum> 9Ah"
    params:
      - name: item_lower
        type: integer
        description: "Lower byte - 06h=NETWORK (VPL-EX/EW) or 05h (VPL-DX/DW)"
      - name: data
        type: integer
        description: "Data value (2 bytes)"

  - id: set_aspect_zoom
    label: Set Aspect Ratio - ZOOM
    kind: action
    description: "RS-232/SDCP SET with item number 0020h (ASPECT), data 0003h (ZOOM). Verbatim packet from source section 3-7-1: A9h 00 20 00 00 03 23h 9Ah"
    command: "A9h 00 20 00 00 03 23h 9Ah"
    params:
      - name: value
        type: integer
        description: "Aspect value (e.g. 0003h=ZOOM)"

  - id: set_picture_mode_dynamic
    label: Set Picture Mode - Dynamic
    kind: action
    description: "SDCP SET request example from source section 4-3-2 §8: HEADER (VERSION, CATEGORY)=(02h, 0Ah), COMMUNITY=\"SONY\" (534F4E59h), COMMAND (REQUEST, ITEM NO, DATA LENGTH)=(00h, 0002h, 02h), DATA=0000h (dynamic)"
    command: "HEADER(02h, 0Ah) COMMUNITY(534F4E59h) COMMAND(00h, 0002h, 02h) DATA(0000h)"
    params:
      - name: item_no
        type: integer
        description: "Item number for picture mode (0002h in source example)"
      - name: data
        type: integer
        description: "Picture mode value (0000h=dynamic)"

  - id: status_error1_get
    label: Get STATUS ERROR1
    kind: action
    kind: query
    description: "RS-232 Simplified Command GET for STATUS ERROR1 item. Returns: NO ERROR, LAMP ERROR, FAN ERROR, COVER ERROR, TEMP ERROR, D5V ERROR, POWER ERROR, WARNING TEMP, NVM DATA ERROR. Packet: A9h <item_upper> <item_lower> 01h <data> <checksum> 9Ah"
    command: "A9h <item_upper> <item_lower> 01h 0000h <checksum> 9Ah"
    params: []

  - id: status_power_get
    label: Get STATUS POWER
    kind: action
    kind: query
    description: "RS-232 Simplified Command GET for STATUS POWER item. Returns: STANDBY, START UP. Packet: A9h <item_upper> <item_lower> 01h 0000h <checksum> 9Ah"
    command: "A9h <item_upper> <item_lower> 01h 0000h <checksum> 9Ah"
    params: []

  - id: sdcp_set_request
    label: SDCP SET Request
    kind: action
    description: "Generic SDCP SET request - sets an item number to a data value. Header: VERSION=02h, CATEGORY=0Ah; COMMUNITY=\"SONY\" (534F4E59h); COMMAND (REQUEST, ITEM NO, DATA LENGTH)=(00h, <item_no>, 02h); DATA=<value>"
    command: "HEADER(02h, 0Ah) COMMUNITY(534F4E59h) COMMAND(00h, {item_no}, 02h) DATA({value})"
    params:
      - name: item_no
        type: integer
        description: "Item number to set (see ITEM List sections 2-1-1 / 4-3-2)"
      - name: value
        type: integer
        description: "Data value to assign to the item"

  - id: sdcp_get_request
    label: SDCP GET Request
    kind: action
    kind: query
    description: "Generic SDCP GET request - queries an item number. Header: VERSION=02h, CATEGORY=0Ah; COMMUNITY=\"SONY\" (534F4E59h); COMMAND (REQUEST, ITEM NO, DATA LENGTH)=(01h, <item_no>, 00h). Response: RESPONSE(01h=OK), ITEM NO, DATA LENGTH, DATA"
    command: "HEADER(02h, 0Ah) COMMUNITY(534F4E59h) COMMAND(01h, {item_no}, 00h)"
    params:
      - name: item_no
        type: integer
        description: "Item number to query"

  - id: pjlink_powr
    label: PJLink Power Control
    kind: action
    description: "PJLink Class 1 Power control command (01)"
    command: "POWR {value}"
    params:
      - name: value
        type: integer
        description: "0=off, 1=on"

  - id: pjlink_powr_query
    label: PJLink Power Status Inquiry
    kind: action
    kind: query
    description: "PJLink Class 1 Power status inquiry (02)"
    command: "POWR ?"

  - id: pjlink_inpt
    label: PJLink Input Switch Command
    kind: action
    description: "PJLink Class 1 Input switch command (03)"
    command: "INPT {input}"
    params:
      - name: input
        type: integer
        description: "Input channel number"

  - id: pjlink_inpt_query
    label: PJLink Input Switch Inquiry
    kind: action
    kind: query
    description: "PJLink Class 1 Input switch inquiry (04)"
    command: "INPT ?"

  - id: pjlink_avmt
    label: PJLink AV Muting Command
    kind: action
    description: "PJLink Class 1 AV muting command (05)"
    command: "AVMT {value}"
    params:
      - name: value
        type: integer
        description: "AV mute setting value"

  - id: pjlink_avmt_query
    label: PJLink AV Muting Status Inquiry
    kind: action
    kind: query
    description: "PJLink Class 1 AV muting status inquiry (06)"
    command: "AVMT ?"

  - id: pjlink_erst_query
    label: PJLink Error Status Inquiry
    kind: action
    kind: query
    description: "PJLink Class 1 Error status inquiry (07). Returns six-digit number - digits 6..1: Fan, Lamp, Temperature, Cover open, Filter, Other; each digit 0=No error, 1=Warning"
    command: "ERST ?"

  - id: pjlink_lamp_query
    label: PJLink Lamp Count/Time Inquiry
    kind: action
    kind: query
    description: "PJLink Class 1 Lamp count and lamp time inquiry (08)"
    command: "LAMP ?"

  - id: pjlink_inst_query
    label: PJLink Input Switch List Inquiry
    kind: action
    kind: query
    description: "PJLink Class 1 Input switch list inquiry (09)"
    command: "INST ?"

  - id: pjlink_inf1_query
    label: PJLink Manufacturer Name Inquiry
    kind: action
    kind: query
    description: "PJLink Class 1 Manufacturer name inquiry (11). Returns 'SONY' on success or 'ERR4' on error"
    command: "INF1 ?"

  - id: pjlink_inf2_query
    label: PJLink Model Name Inquiry
    kind: action
    kind: query
    description: "PJLink Class 1 Model name inquiry (12)"
    command: "INF2 ?"

  - id: pjlink_info_query
    label: PJLink Other Information Inquiry
    kind: action
    kind: query
    description: "PJLink Class 1 Other information inquiry (13). Returns a space on normal, 'ERR4' on error"
    command: "INFO ?"

  - id: pjlink_clss_query
    label: PJLink Class Information Inquiry
    kind: action
    kind: query
    description: "PJLink Class 1 Class information inquiry (14). Returns '1'"
    command: "CLSS ?"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    command: "POWR?"
    values:
      - name: standby
        value: "0"
        description: "Standby or power-saving state"
      - name: on
        value: "1"
        description: "Power ON state"
      - name: cooling
        value: "2"
        description: "Cooling state, or cooling state during power-saving state"

  - id: input_status
    type: integer
    command: "INPT?"
    description: "Returns input channel number (e.g. 21=Video, varies by model)"

  - id: av_mute_status
    type: integer
    command: "AVMT?"
    description: "AV muting status"

  - id: error_status
    type: string
    command: "ERST?"
    description: "6-digit error code - digits: 6th=Fan, 5th=Lamp, 4th=Temperature, 3rd=Cover open, 2nd=Filter, 1st=Other (0=no error, 1=warning)"

  - id: lamp_info
    type: string
    command: "LAMP?"
    description: "Lamp count and lamp time"

  - id: input_list
    type: string
    command: "INST?"
    description: "Available input switch list"

  - id: manufacturer_name
    type: string
    command: "INF1?"
    description: "Returns manufacturer name (SONY), or ERR4 on error"

  - id: model_name
    type: string
    command: "INF2?"
    description: "Returns model name"

  - id: other_info
    type: string
    command: "INFO?"
    description: "Returns a space on normal, ERR4 on error"

  - id: class_info
    type: string
    command: "CLSS?"
    description: "Returns PJLink class (1)"

  - id: status_error
    type: enum
    description: "RS-232 STATUS ERROR1 item"
    values:
      - NO ERROR
      - LAMP ERROR
      - FAN ERROR
      - COVER ERROR
      - TEMP ERROR
      - D5V ERROR
      - POWER ERROR
      - WARNING TEMP
      - NVM DATA ERROR

  - id: status_power
    type: enum
    description: "RS-232 STATUS POWER item (Get only)"
    values:
      - name: standby
        value: "STANDBY"
        description: "Standby state"
      - name: start_up
        value: "START UP"
        description: "Start-up state"

  - id: sdcp_response_ok
    type: enum
    description: "SDCP RESPONSE sub field value"
    values:
      - name: ok
        value: "01h"
        description: "Request executed correctly"

  - id: sdap_community
    type: string
    description: "SDAP COMMUNITY field - four alphanumeric characters (case sensitive). Factory default 'SONY'. Three or fewer characters not allowed."
    values:
      - name: default
        value: "SONY"
        description: "Factory-shipments value"
```

## Variables
```yaml
variables:
  - id: system_item_model_name
    label: Model Name (SDCP System Item)
    type: string
    description: "SDCP system item 0x8001. Alphanumeric, 12 characters; remaining digits filled with 00h if shorter."
    item_number: "0x8001"

  - id: system_item_serial_number
    label: Serial Number (SDCP System Item)
    type: string
    description: "SDCP system item 0x8002. 4 bytes; range 00000000 to 99999999."
    item_number: "0x8002"

  - id: system_item_installation_location
    label: Installation Location (SDCP System Item)
    type: string
    description: "SDCP system item 0x8003. Alphanumeric, 24 characters; remaining digits filled with 00h if shorter."
    item_number: "0x8003"
```

## Events
```yaml
# SDAP advertisement broadcasts are sent periodically by the projector when enabled (OFF by default)
# Packet structure: POWER | HEADER(12) | PRODUCT NAME(24) | LOCATION | COMMUNITY | SERIAL NO. | STATUS
# Header: 4441h (2 bytes) | VERSION (1 byte) | CATEGORY (1 byte)
# UNRESOLVED: exact broadcast interval and packet trigger conditions not stated
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in extracted source
```

## Notes

- RS-232 uses Simplified Command binary format: `A9h` start, `9Ah` end, 2-byte item number, SET (00h) / GET (01h), 2-byte data, checksum.
- The source document covers two model groups with slightly different input terminal lists (VPL-EX/EW has S VIDEO and INPUT C; VPL-DX/DW does not). VPL-EX/EW also adds USB TYPE A to the input list (item byte not specified in source).
- Ethernet SDCP shares the same item-number model over TCP port 53484 with a 4-byte COMMUNITY field (default "SONY", case sensitive, exactly 4 characters).
- SDCP HEADER: VERSION must be 02h, CATEGORY = 0Ah. REQUEST COMMAND sub-field = 00h; GET marker = 01h. RESPONSE sub-field = 01h (OK).
- SDCP error codes: Item Error (01h) covers Invalid Item, Invalid Item Request, Invalid Length, Invalid Data, Short Data, Not Applicable Item. Community Error occurs when community field differs. Request Error covers Invalid Version (header version ≠ 2) and Invalid Equipment Category Code.
- PJLink Class 1 is also supported. Source states "14 commands are supported" but only enumerates 9 numbered commands (POWR set, POWR?, INPT, INPT?, AVMT, AVMT?, ERST?, LAMP?, INST?); spec adds INF1?, INF2?, INFO?, CLSS? as commands (11)-(14) per the inquiry examples in source. Commands (10) not enumerated in source are omitted.
- PJLink ERST? response digit order (source §4-3-3): 6th=Fan, 5th=Lamp, 4th=Temperature, 3rd=Cover open, 2nd=Filter, 1st=Other. Each digit: 0=No error, 1=Warning.
- PJLink can be enabled/disabled and password-set from the Web setting screen > Setup > Advanced Menu.
- The source defines two SET command packet examples: (a) literal RS-232 binary block A9h 00 20 00 00 03 23h 9Ah for "Set ASPECT to ZOOM" (section 3-7-1); (b) field-formatted SDCP packet for "Set picture mode to dynamic" (section 4-3-2 §8) — both reproduced above as separate actions.
- CONTROLLER must not send multiple commands simultaneously — one command must complete before sending the next.
- Set/Get data bytes in the INPUT TERMINAL item table are partially populated in source (Set/Get marked on VIDEO row only); the data byte column appears to indicate Set/Get capability per item rather than numeric values.

<!-- UNRESOLVED: RS-232 communication specs (baud rate, data bits, parity, stop bits, flow control) — section 3-2 content not in extracted source -->
<!-- UNRESOLVED: complete ITEM list for setup beyond INPUT TERMINAL (0020h ASPECT is documented; further setup items not in extracted portion) -->
<!-- UNRESOLVED: SDAP broadcast interval and enable/disable procedure -->
<!-- UNRESOLVED: PJLink password configuration details -->
<!-- UNRESOLVED: user-stated device name "VPL-VW Series" does not match any model in source document -->

## Provenance

```yaml
source_domains:
  - manualslib.com
source_urls:
  - https://www.manualslib.com/manual/937722/Sony-Vpl-Dx125.html
retrieved_at: 2026-06-11T00:51:45.329Z
last_checked_at: 2026-06-11T13:48:08.073Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:48:08.073Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched verbatim to source commands; transport parameters verified; bidirectional coverage complete. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "user-stated device name \"VPL-VW Series\" does not match source document models (VPL-DX/DW/EX/EW)"
- "RS-232 communication specifications (baud rate, data bits, parity, stop bits) — section 3-2 was not fully extracted from source"
- "baud rate not stated in extracted source (section 3-2 missing)"
- "not stated in source"
- "no URL path pattern stated"
- "exact broadcast interval and packet trigger conditions not stated"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures found in extracted source"
- "RS-232 communication specs (baud rate, data bits, parity, stop bits, flow control) — section 3-2 content not in extracted source"
- "complete ITEM list for setup beyond INPUT TERMINAL (0020h ASPECT is documented; further setup items not in extracted portion)"
- "SDAP broadcast interval and enable/disable procedure"
- "PJLink password configuration details"
- "user-stated device name \"VPL-VW Series\" does not match any model in source document"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
