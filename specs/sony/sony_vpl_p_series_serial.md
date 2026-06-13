---
spec_id: admin/sony-vpl-p-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony VPL-P Series Control Spec"
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
retrieved_at: 2026-06-11T00:04:21.400Z
last_checked_at: 2026-06-11T13:49:10.738Z
generated_at: 2026-06-11T13:49:10.738Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232C communication specifications (baud rate, data bits, parity, stop bits) — section 3-2 truncated in source"
  - "PJLink password format details — source only says \"can be set from Web setting screen\""
  - "full SDAP advertisement packet field layouts (POWER byte encoding) not fully captured"
  - "baud rate not stated in source (section 3-2 truncated)"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "GET checksum depends on data; source only shows SET example"
  - "full SDAP broadcast packet field-by-field byte layout not fully captured in source"
  - "no multi-step sequences explicitly described in source"
  - "source mentions cooling state after power-off but does not specify"
verification:
  verdict: verified
  checked_at: 2026-06-11T13:49:10.738Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions confirmed in source with matching wire-level identifiers, parameters, and transport parameters verified at port 53484 with SONY community string. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Sony VPL-P Series Control Spec

## Summary
Sony VPL-DX/DW/EX/EW series projectors are remotely controllable over RS-232C and Ethernet. The Ethernet interface supports SDCP (Simple Display Control Protocol) on port 53484 with a community-based auth scheme, SDAP broadcast for discovery, and PJLink Class 1. RS-232C uses a binary Simplified Command protocol with item-number-based set/get operations framed by A9h/9Ah start/end codes.

<!-- UNRESOLVED: RS-232C communication specifications (baud rate, data bits, parity, stop bits) — section 3-2 truncated in source -->
<!-- UNRESOLVED: PJLink password format details — source only says "can be set from Web setting screen" -->
<!-- UNRESOLVED: full SDAP advertisement packet field layouts (POWER byte encoding) not fully captured -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source (section 3-2 truncated)
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 53484  # SDCP default factory port
auth:
  type: community  # SDCP uses 4-character community string, default "SONY" (case sensitive)
  notes: PJLink password can be set from Web setting screen > Setup > Advanced Menu
```

## Traits
```yaml
traits:
  - powerable     # inferred: POWR power control command present
  - routable      # inferred: INPT input switch command present
  - queryable     # inferred: multiple query commands (POWR?, INPT?, ERST?, LAMP?, INST?)
```

## Actions
```yaml
actions:
  # === PJLink actions ===
  - id: power_on
    label: Power On
    kind: action
    protocol: pjlink
    command: "POWR 1"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    protocol: pjlink
    command: "POWR 0"
    params: []

  - id: input_switch
    label: Switch Input
    kind: action
    protocol: pjlink
    command: "INPT <input>"
    params:
      - name: input
        type: integer
        description: "Input channel number (e.g. 21 for Video, varies by model)"

  - id: av_mute_set
    label: Set AV Mute
    kind: action
    protocol: pjlink
    command: "AVMT <mute>"
    params:
      - name: mute
        type: integer
        description: "Mute state value (e.g. 10/11/20/21/30/31)"

  # === PJLink query actions ===
  - id: power_status_query
    label: Power Status Query
    kind: query
    protocol: pjlink
    command: "POWR ?"
    params: []

  - id: input_status_query
    label: Input Switch Inquiry
    kind: query
    protocol: pjlink
    command: "INPT ?"
    params: []

  - id: av_mute_status_query
    label: AV Muting Status Inquiry
    kind: query
    protocol: pjlink
    command: "AVMT ?"
    params: []

  - id: error_status_query
    label: Error Status Inquiry
    kind: query
    protocol: pjlink
    command: "ERST ?"
    params: []

  - id: lamp_info_query
    label: Lamp Count / Lamp Time Inquiry
    kind: query
    protocol: pjlink
    command: "LAMP ?"
    params: []

  - id: input_list_query
    label: Input Switch List Inquiry
    kind: query
    protocol: pjlink
    command: "INST ?"
    params: []

  - id: manufacturer_name_query
    label: Manufacturer Name Inquiry
    kind: query
    protocol: pjlink
    command: "INF1 ?"
    params: []

  - id: model_name_query
    label: Model Name Inquiry
    kind: query
    protocol: pjlink
    command: "INF2 ?"
    params: []

  - id: other_info_query
    label: Other Information Inquiry
    kind: query
    protocol: pjlink
    command: "INFO ?"
    params: []

  - id: class_info_query
    label: Class Information Inquiry
    kind: query
    protocol: pjlink
    command: "CLSS ?"
    params: []

  # === Simplified Command (RS-232C) - binary protocol ===
  - id: set_aspect
    label: Set Aspect Ratio
    kind: action
    protocol: sdcp_serial
    description: "Simplified Command SET - ITEM NUMBER 0020h, e.g. DATA 0003h = ZOOM"
    command_bytes:
      start_code: "A9h"
      item_number: "0020h"
      set_get: "00h"
      data: "0003h"
      checksum: "23h"
      end_code: "9Ah"
    full_packet: "A9h 00h 20h 00h 00h 03h 23h 9Ah"

  - id: get_aspect
    label: Get Aspect Ratio
    kind: query
    protocol: sdcp_serial
    description: "Simplified Command GET - ITEM NUMBER 0020h"
    command_bytes:
      start_code: "A9h"
      item_number: "0020h"
      set_get: "01h"
      data: "0000h"
      checksum: null  # UNRESOLVED: GET checksum depends on data; source only shows SET example
      end_code: "9Ah"

  - id: set_input_terminal_ex_ew
    label: Set Input Terminal (VPL-EX/EW series)
    kind: action
    protocol: sdcp_serial
    description: "Simplified Command SET - INPUT TERMINAL, VPL-EX221/EX225/EX241/EX245/EX271/EX275/EW225/EW245/EW275"
    command_bytes_template:
      start_code: "A9h"
      item_number: "0000h"  # upper=00h, lower=00h
      set_get: "00h"
      data_options:
        - value: "0000h"
          name: VIDEO
        - value: "0001h"
          name: S_VIDEO
        - value: "0002h"
          name: INPUT_A
        - value: "0003h"
          name: INPUT_B
        - value: "0004h"
          name: INPUT_C
        - value: "0005h"
          name: USB_TYPE_B
        - value: "0006h"
          name: NETWORK
      end_code: "9Ah"

  - id: set_input_terminal_dx_dw
    label: Set Input Terminal (VPL-DX/DW series)
    kind: action
    protocol: sdcp_serial
    description: "Simplified Command SET - INPUT TERMINAL, VPL-DX125/DX145/DW125 (subset)"
    command_bytes_template:
      start_code: "A9h"
      item_number: "0000h"
      set_get: "00h"
      data_options:
        - value: "0000h"
          name: VIDEO
        - value: "0002h"
          name: INPUT_A
        - value: "0003h"
          name: INPUT_B
        - value: "0004h"
          name: USB_TYPE_B
        - value: "0005h"
          name: NETWORK
      end_code: "9Ah"

  - id: get_input_terminal
    label: Get Input Terminal
    kind: query
    protocol: sdcp_serial
    description: "Simplified Command GET - INPUT TERMINAL"
    command_bytes_template:
      start_code: "A9h"
      item_number: "0000h"
      set_get: "01h"
      data: "0000h"
      end_code: "9Ah"

  - id: get_status_error1
    label: Get Status Error1
    kind: query
    protocol: sdcp_serial
    description: "Simplified Command GET - STATUS ERROR1 (get-only item)"

  - id: get_status_power
    label: Get Status Power
    kind: query
    protocol: sdcp_serial
    description: "Simplified Command GET - STATUS POWER (get-only item: STANDBY / START UP)"

  # === SDCP Ethernet actions ===
  - id: set_picture_mode_dynamic
    label: Set Picture Mode - Dynamic
    kind: action
    protocol: sdcp_ethernet
    description: "SDCP SET request - ITEM NO 0002h, DATA 0000h (Dynamic)"
    command: "HEADER(02h,0Ah) COMMUNITY='SONY' COMMAND(00h,0002h,02h) DATA=0000h"

  - id: set_installation_location
    label: Set Installation Location
    kind: action
    protocol: sdcp_ethernet
    item_number: "0x8003"
    description: "24-character installation location, padded with 00h"
    params:
      - name: location
        type: string
        max_length: 24

  - id: get_model_name_sdcp
    label: Get Model Name (SDCP)
    kind: query
    protocol: sdcp_ethernet
    item_number: "0x8001"
    description: "12-character model name"

  - id: get_serial_number_sdcp
    label: Get Serial Number (SDCP)
    kind: query
    protocol: sdcp_ethernet
    item_number: "0x8002"
    description: "4-byte serial number (00000000-99999999)"

  - id: get_installation_location
    label: Get Installation Location
    kind: query
    protocol: sdcp_ethernet
    item_number: "0x8003"
    description: "24-character installation location"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    protocol: pjlink
    command: "POWR ?"
    values:
      - name: standby
        response: "0"
        description: "Standby or power-saving state"
      - name: power_on
        response: "1"
        description: "Power ON state"
      - name: cooling
        response: "2"
        description: "Cooling state, or cooling state during power-saving state"

  - id: input_state
    type: integer
    protocol: pjlink
    command: "INPT ?"
    description: "Returns current input channel number (e.g. 21 for Video)"

  - id: av_mute_state
    type: integer
    protocol: pjlink
    command: "AVMT ?"
    description: "Returns current AV mute status"

  - id: error_status
    type: string
    protocol: pjlink
    command: "ERST ?"
    description: "6-digit error code"
    digits:
      - position: 6
        meaning: "Fan error"
      - position: 5
        meaning: "Lamp error"
      - position: 4
        meaning: "Temperature error"
      - position: 3
        meaning: "Cover open error"
      - position: 2
        meaning: "Filter error"
      - position: 1
        meaning: "Other error"
    digit_values:
      "0": "No error, or detection impossible"
      "1": "Warning"

  - id: lamp_info
    type: string
    protocol: pjlink
    command: "LAMP ?"
    description: "Returns lamp count and lamp time"

  - id: input_list
    type: string
    protocol: pjlink
    command: "INST ?"
    description: "Returns list of available input switch options"

  - id: manufacturer_name
    type: string
    protocol: pjlink
    command: "INF1 ?"
    description: "Returns manufacturer name (SONY) when normal; ERR4 on projector error/warning"

  - id: model_name_pjlink
    type: string
    protocol: pjlink
    command: "INF2 ?"
    description: "Returns model name"

  - id: other_info
    type: string
    protocol: pjlink
    command: "INFO ?"
    description: "Returns other information (space when normal, ERR4 on error/warning)"

  - id: class_info
    type: string
    protocol: pjlink
    command: "CLSS ?"
    description: "Returns class information (1 for Class 1) when normal; ERR4 on error"

  - id: model_name_sdcp
    type: string
    protocol: sdcp_ethernet
    item_number: "0x8001"
    description: "12-character model name via SDCP, padded with 00h"

  - id: serial_number
    type: string
    protocol: sdcp_ethernet
    item_number: "0x8002"
    description: "4-byte serial number (00000000-99999999) via SDCP"

  - id: status_error
    type: enum
    protocol: sdcp_serial
    description: "STATUS ERROR1 via Simplified Command (get-only)"
    values:
      - NO_ERROR
      - LAMP_ERROR
      - FAN_ERROR
      - COVER_ERROR
      - TEMP_ERROR
      - D5V_ERROR
      - POWER_ERROR
      - WARNING_TEMP
      - NVM_DATA_ERROR

  - id: status_power
    type: enum
    protocol: sdcp_serial
    description: "STATUS POWER via Simplified Command (get-only)"
    values:
      - name: standby
        description: "STANDBY"
      - name: start_up
        description: "START UP"

  - id: set_aspect_response
    type: enum
    protocol: sdcp_serial
    description: "Response to Simplified Command SET (e.g. ASPECT=ZOOM example)"
    values:
      - name: success
        response: "0000h (ACK=03h)"
        description: "Complete"
      - name: failure
        description: "NAK response"
```

## Variables
```yaml
variables:
  - id: installation_location
    type: string
    protocol: sdcp_ethernet
    item_number: "0x8003"
    access: set_get
    description: "24-character installation location"
    max_length: 24
  - id: sdcp_community
    type: string
    protocol: sdcp_ethernet
    description: "4-character community string (alphanumeric, case sensitive). Default 'SONY'. Three or fewer characters not allowed."
    max_length: 4
    default: "SONY"
```

## Events
```yaml
events:
  - id: sdap_advertisement
    protocol: sdap
    description: "SDAP broadcast - projector sends equipment info periodically to network. Disabled by default. Sent by PROJECTOR, no response from CONTROLLER."
    packet_structure: "POWER | HEADER(2) | VERSION(1) | CATEGORY(1) | PRODUCT NAME(12) | LOCATION(24) | COMMUNITY(4) | SERIAL NO. | STATUS"
    header_id: "4441h"
    # UNRESOLVED: full SDAP broadcast packet field-by-field byte layout not fully captured in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions cooling state after power-off but does not specify
# interlock procedures or power-on sequencing requirements explicitly.
# CONTROLLER is prohibited from sending several commands at one time (RS-232C).
```

## Notes
- Source covers RS-232C Simplified Command (binary, A9h/9Ah framing), Ethernet SDCP, SDAP, and PJLink protocols. Not all models support all inputs (e.g. S VIDEO and INPUT C absent on VPL-DX/DW models).
- SDCP Ethernet community string default "SONY" (4 chars, case sensitive). Three or fewer characters not allowed.
- SDCP version field = 02h; equipment category code = 0Ah for projectors. SDCP header ID = 4441h.
- PJLink Class 1 is supported and can be enabled/disabled from Web settings screen > Setup > Advanced Menu.
- RS-232C uses D-Sub 9 Pin cross (reverse) cable. Controller must not send multiple commands simultaneously.
- INF1/INFO/CLSS queries return "ERR4" on projector error or warning conditions.
- VPL-EX series + VPL-EW series: 15 bit PROJECTOR; VPL-EW series: 20 bit PROJECTOR (infrared remote command code width).

## Provenance

```yaml
source_domains:
  - manualslib.com
source_urls:
  - https://www.manualslib.com/manual/937722/Sony-Vpl-Dx125.html
retrieved_at: 2026-06-11T00:04:21.400Z
last_checked_at: 2026-06-11T13:49:10.738Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:49:10.738Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions confirmed in source with matching wire-level identifiers, parameters, and transport parameters verified at port 53484 with SONY community string. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232C communication specifications (baud rate, data bits, parity, stop bits) — section 3-2 truncated in source"
- "PJLink password format details — source only says \"can be set from Web setting screen\""
- "full SDAP advertisement packet field layouts (POWER byte encoding) not fully captured"
- "baud rate not stated in source (section 3-2 truncated)"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "GET checksum depends on data; source only shows SET example"
- "full SDAP broadcast packet field-by-field byte layout not fully captured in source"
- "no multi-step sequences explicitly described in source"
- "source mentions cooling state after power-off but does not specify"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
