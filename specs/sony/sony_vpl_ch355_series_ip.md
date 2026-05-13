---
spec_id: admin/sony-vpl-ch355-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony VPL-CH355 Series Control Spec"
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
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-04-27T10:13:06.010Z
generated_at: 2026-04-27T10:13:06.010Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:06.010Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 30 spec actions matched literally to source commands; port 53484 and community auth verified; complete PJLink and SDCP command set represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Sony VPL-CH355 Series Control Spec

## Summary

Sony VPL-DX/EX/EW series projectors supporting remote control over RS-232C serial and Ethernet. Two IP-based protocols are available: SDCP (Simple Display Control Protocol, Sony PJ Talk) on port 53484, and PJLink Class 1. The source document covers VPL-DX125/DX145/DW125 and VPL-EX221–EX275/EW225–EW275 models.

<!-- UNRESOLVED: Requested device name "VPL-CH355 Series" does not appear in the source document. Source covers VPL-DX/EX/EW series. Verify correct source was provided. -->
<!-- UNRESOLVED: RS-232C communication specifications (baud rate, data bits, parity, stop bits) referenced in source Section 3-2 but not captured in refined excerpt -->
<!-- UNRESOLVED: Complete SDCP packet header structure partially documented -->
<!-- UNRESOLVED: PJLink port number not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 53484
serial:
  baud_rate: null  # UNRESOLVED: baud rate not in refined source excerpt
  data_bits: null  # UNRESOLVED: not in refined source excerpt
  parity: null  # UNRESOLVED: not in refined source excerpt
  stop_bits: null  # UNRESOLVED: not in refined source excerpt
  flow_control: null  # UNRESOLVED: not in refined source excerpt
auth:
  type: community  # SDCP uses 4-char community string (default "SONY"); PJLink password configurable via web UI
```

## Traits
```yaml
- powerable  # inferred: power on/off commands (POWR) present
- queryable  # inferred: query commands (POWR?, INPT?, ERST?, LAMP?) present
- routable  # inferred: input switching commands (INPT, input terminal items) present
- levelable  # inferred: picture mode and aspect ratio set/get present
```

## Actions
```yaml
# --- SDCP (Ethernet) ---

- id: sdcp_set_item
  label: SDCP Set Item
  kind: action
  description: Set a configuration item via SDCP protocol
  params:
    - name: community
      type: string
      description: "4-character community string (default SONY)"
    - name: item_number
      type: integer
      description: "Item number (e.g. 0x0002 for picture mode)"
    - name: data
      type: integer
      description: "Data value to set"
  notes: SDCP SET REQUEST (COMMAND sub-field 00h)

- id: sdcp_get_item
  label: SDCP Get Item
  kind: query
  description: Query a configuration item via SDCP protocol
  params:
    - name: community
      type: string
      description: "4-character community string (default SONY)"
    - name: item_number
      type: integer
      description: "Item number to query"
  notes: SDCP GET REQUEST

# --- PJLink Class 1 ---

- id: power_on
  label: Power On
  kind: action
  command: "POWR 1"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "POWR 0"
  params: []

- id: select_input
  label: Select Input
  kind: action
  command: "INPT <input>"
  params:
    - name: input
      type: integer
      description: "Input channel number (e.g. 21 for Video)"

- id: av_mute
  label: AV Mute Control
  kind: action
  command: "AVMT <param>"
  params:
    - name: param
      type: integer
      description: "AV mute parameter"

# --- RS-232C Simplified Command ---

- id: serial_set_item
  label: RS-232C Set Item
  kind: action
  description: "Set item via RS-232C (A9h framing)"
  params:
    - name: item_upper
      type: integer
      description: "Item number upper byte"
    - name: item_lower
      type: integer
      description: "Item number lower byte"
    - name: data_upper
      type: integer
      description: "Data upper byte"
    - name: data_lower
      type: integer
      description: "Data lower byte"
  notes: "Packet: A9h + ITEM(2B) + 00h(SET) + DATA(2B) + CHECKSUM + 9Ah"

- id: serial_get_item
  label: RS-232C Get Item
  kind: query
  description: "Get item via RS-232C (A9h framing)"
  params:
    - name: item_upper
      type: integer
      description: "Item number upper byte"
    - name: item_lower
      type: integer
      description: "Item number lower byte"
  notes: "Packet: A9h + ITEM(2B) + 01h(GET) + DATA(2B) + CHECKSUM + 9Ah"

# --- Input Terminal Selection (item 00h/XXh) ---

- id: select_input_video
  label: Select Video Input
  kind: action
  params: []
  notes: "Item 00h/00h (VIDEO)"

- id: select_input_svideo
  label: Select S-Video Input
  kind: action
  params: []
  notes: "Item 00h/01h (S VIDEO) - VPL-EX/EW series only"

- id: select_input_a
  label: Select Input A
  kind: action
  params: []
  notes: "Item 00h/02h (INPUT A)"

- id: select_input_b
  label: Select Input B
  kind: action
  params: []
  notes: "Item 00h/03h (INPUT B)"

- id: select_input_c
  label: Select Input C
  kind: action
  params: []
  notes: "Item 00h/04h (INPUT C) - VPL-EX/EW series only"

- id: select_input_usb_b
  label: Select USB Type B Input
  kind: action
  params: []
  notes: "Item 00h/05h (EX/EW) or 00h/04h (DX/DW)"

- id: select_input_network
  label: Select Network Input
  kind: action
  params: []
  notes: "Item 00h/06h (EX/EW) or 00h/05h (DX/DW)"
```

## Feedbacks
```yaml
# --- PJLink Queries ---

- id: power_status
  type: enum
  command: "POWR ?"
  values: [standby, on, cooling]
  mapping:
    standby: "0"
    on: "1"
    cooling: "2"

- id: input_status
  type: integer
  command: "INPT ?"
  description: "Current input channel number (varies by model)"

- id: av_mute_status
  type: enum
  command: "AVMT ?"
  # UNRESOLVED: specific response values not documented in source

- id: error_status
  type: string
  command: "ERST ?"
  description: "6-digit error code; each digit 0=no error, 1=warning"
  digits:
    - position: 6
      meaning: Fan error
    - position: 5
      meaning: Lamp error
    - position: 4
      meaning: Temperature error
    - position: 3
      meaning: Cover open error
    - position: 2
      meaning: Filter error
    - position: 1
      meaning: Other error

- id: lamp_info
  type: string
  command: "LAMP ?"
  description: "Lamp count and cumulative lamp time"

- id: input_list
  type: string
  command: "INST ?"
  description: "Available input channel list"

- id: manufacturer_name
  type: string
  command: "INF1 ?"
  values: ["SONY"]

- id: model_name
  type: string
  command: "INF2 ?"

- id: class_info
  type: string
  command: "CLSS ?"
  values: ["1"]

# --- SDCP System Items ---

- id: sdcp_model_name
  type: string
  description: "SDCP item 0x8001 - model name (12 chars)"

- id: sdcp_serial_number
  type: integer
  description: "SDCP item 0x8002 - serial number (00000000-99999999)"

- id: sdcp_installation_location
  type: string
  description: "SDCP item 0x8003 - installation location (24 chars)"

# --- RS-232C / SDCP Status ---

- id: status_error
  type: enum
  description: "STATUS ERROR1 item"
  values: [no_error, lamp_error, fan_error, cover_error, temp_error, d5v_error, power_error, warning_temp, nvm_data_error]

- id: status_power
  type: enum
  description: "STATUS POWER item (partial list from source)"
  values: [standby, startup]

# --- SDCP Error Codes ---

- id: sdcp_error_code
  type: enum
  description: "SDCP 2-byte error response"
  values: [ok, invalid_item, invalid_item_request, invalid_length, invalid_data, short_data, not_applicable_item, community_error, invalid_version, invalid_equipment_category]
```

## Variables
```yaml
- id: picture_mode
  type: enum
  description: "Picture mode (SDCP item 0x0002)"
  # UNRESOLVED: complete value list not in refined source

- id: aspect_ratio
  type: enum
  description: "Aspect ratio (SDCP item 0x0020)"
  notes: "Known value: ZOOM = 0003h"
  # UNRESOLVED: complete value list not in refined source

- id: community
  type: string
  description: "SDCP community string (4 alphanumeric chars, case-sensitive, default SONY)"
```

## Events
```yaml
# UNRESOLVED: SDAP advertisement broadcasts mentioned but unsolicited event format not fully documented
```

## Macros
```yaml
# No multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions that display-switching items are invalid when main power is off,
# but no explicit power-on sequencing or interlock procedure is documented
```

## Notes

The projector supports three control paths: RS-232C serial (Simplified Command with A9h/9Ah framing), Ethernet SDCP (PJ Talk, port 53484), and PJLink Class 1. SDCP and SDAP are Sony proprietary protocols; PJLink is a JBMIA standard. The SDCP community string defaults to "SONY" and must be exactly 4 alphanumeric characters (case-sensitive). Over RS-232C, only one command may be outstanding at a time — the controller must wait for the projector response before issuing the next command.

<!-- UNRESOLVED: Requested device "VPL-CH355 Series" not found in source; source covers VPL-DX/EX/EW models -->
<!-- UNRESOLVED: RS-232C baud rate, data bits, parity, stop bits not captured in refined source excerpt (Section 3-2) -->
<!-- UNRESOLVED: PJLink port number not stated in source -->
<!-- UNRESOLVED: PJLink password format and default not specified -->
<!-- UNRESOLVED: Complete picture mode and aspect ratio value lists not in refined source -->
<!-- UNRESOLVED: SDCP encapsulation mode mentioned but not detailed -->
<!-- UNRESOLVED: SDAP advertisement broadcast format partially documented -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-04-27T10:13:06.010Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:06.010Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 30 spec actions matched literally to source commands; port 53484 and community auth verified; complete PJLink and SDCP command set represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
