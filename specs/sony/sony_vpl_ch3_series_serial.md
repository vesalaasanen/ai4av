---
spec_id: admin/sony-vpl-ch3-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony VPL-CH3 Series Control Spec"
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
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T13:20:33.914Z
last_checked_at: 2026-10-07T13:20:33.914Z
generated_at: 2026-10-07T13:20:33.914Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232C communication specifications (baud rate, data bits, parity, stop bits) section was referenced as section 3-2 but values not present in extracted text"
  - "PJLink password configuration mentioned but not documented"
  - "complete ITEM list for Setup (only INPUT TERMINAL and ASPECT partially shown)"
  - "baud rate not stated in extracted source text"
  - "data bits not stated in extracted source text"
  - "parity not stated in extracted source text"
  - "stop bits not stated in extracted source text"
  - "flow control not stated in extracted source text"
  - "complete list of Simplified Command ITEM numbers beyond INPUT TERMINAL and ASPECT"
  - "full PJLink AVMT parameter values not enumerated in source"
  - "PJLink INPT parameter values vary by model — only example \"21\" for Video given"
  - "no continuous settable parameters (volume, brightness, etc.) explicitly enumerated in source"
  - "SDAP broadcast interval and full field details not documented"
  - "no multi-step sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing found in source"
  - "baud_rate, data_bits, parity, stop_bits for RS-232C not in extracted text (section 3-2 content missing)"
  - "complete Simplified Command ITEM list — only INPUT TERMINAL and ASPECT shown"
  - "VPL-CH3 Series is stated as the device name but source document covers VPL-DX/DW/EX/EW models — model coverage may differ"
  - "SDAP packet field lengths and broadcast interval"
  - "PJLink password format and configuration details"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:20:33.914Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 action units match source commands; port 53484 and SONY community string supported; status and system items covered as feedbacks. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Sony VPL-CH3 Series Control Spec

## Summary
Sony business/projector series controllable via RS-232C (binary Simplified Command) and Ethernet (SDCP/PJ Talk on port 53484, plus PJLink Class 1). This spec covers the Simplified Command packet format over serial, SDCP over TCP, and the PJLink command subset documented in the source.

<!-- UNRESOLVED: RS-232C communication specifications (baud rate, data bits, parity, stop bits) section was referenced as section 3-2 but values not present in extracted text -->
<!-- UNRESOLVED: PJLink password configuration mentioned but not documented -->
<!-- UNRESOLVED: complete ITEM list for Setup (only INPUT TERMINAL and ASPECT partially shown) -->

## Transport
```yaml
protocols:
  - serial
  - UNRESOLVED  # Ethernet is documented; TCP is not explicitly stated in the source
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in extracted source text
  data_bits: null  # UNRESOLVED: data bits not stated in extracted source text
  parity: null  # UNRESOLVED: parity not stated in extracted source text
  stop_bits: null  # UNRESOLVED: stop bits not stated in extracted source text
  flow_control: UNRESOLVED  # UNRESOLVED: flow control not stated in extracted source text
addressing:
  port: 53484  # SDCP (Simple Display Control Protocol) factory default
auth:
  type: community  # SDCP uses 4-character community string; factory default "SONY" (case sensitive)
```

## Traits
```yaml
- powerable    # POWR command (PJLink); power status query via Simplified Command
- routable     # INPUT TERMINAL switching via Simplified Command and INPT (PJLink)
- queryable    # Multiple query commands: power state, input, errors, lamp, model name, serial number
```

## Actions
```yaml
# === RS-232C Simplified Command ===
# Binary protocol: START=A9h, ITEM_NO(2 bytes), SET_GET(1 byte), DATA(2 bytes), CHECKSUM(1 byte), END=9Ah

- id: set_input_terminal
  label: Set Input Terminal
  kind: action
  description: "RS-232C Simplified Command — switches input source"
  params:
    - name: input
      type: enum
      values:
        - label: VIDEO
          value: "0x0000"
        - label: S VIDEO
          value: "0x0001"
        - label: INPUT A
          value: "0x0002"
        - label: INPUT B
          value: "0x0003"
        - label: INPUT C
          value: "0x0004"
        - label: USB (TYPE B)
          value: "0x0005"
        - label: NETWORK
          value: "0x0006"
      description: "Input source (upper byte=00, lower byte as listed). VPL-DX/DW models subset differs."

- id: set_aspect
  label: Set Aspect Ratio
  kind: action
  description: "RS-232C Simplified Command — sets aspect ratio"
  params:
    - name: aspect
      type: enum
      values:
        - label: ZOOM
          value: "0x0003"
      description: "Aspect mode. ITEM NUMBER 0x0020. Only ZOOM value shown in source example."

- id: get_item
  label: Get Item Value
  kind: action
  description: "RS-232C Simplified Command — query current value of an item. SET/GET byte = 01h."
  params:
    - name: item_number
      type: string
      description: "2-byte item number in hex (e.g. 0020h for ASPECT)"

# === SDCP (Ethernet / PJ Talk) ===
# Uses same ITEM NO system as Simplified Command over TCP port 53484.
# Packet includes HEADER (version, category), COMMUNITY (4 chars), COMMAND (REQUEST, ITEM NO, DATA LENGTH), DATA

- id: sdcp_set
  label: SDCP Set
  kind: action
  description: "SDCP SET request over Ethernet. Sets item to specified data value."
  params:
    - name: community
      type: string
      description: "4-character community string (factory default SONY, case sensitive)"
    - name: item_no
      type: string
      description: "Item number (e.g. 0002h for picture mode)"
    - name: data
      type: string
      description: "Data value for the item"

- id: sdcp_get
  label: SDCP Get
  kind: action
  description: "SDCP GET request over Ethernet. Retrieves current item value."
  params:
    - name: community
      type: string
      description: "4-character community string"
    - name: item_no
      type: string
      description: "Item number to query"

# === PJLink Class 1 ===

- id: pjlink_power_on
  label: PJLink Power On
  kind: action
  description: "POWR command — turns projector on"
  params: []

- id: pjlink_power_off
  label: PJLink Power Off
  kind: action
  description: "POWR command — turns projector off"
  params: []

- id: pjlink_input_switch
  label: PJLink Input Switch
  kind: action
  description: "INPT command — switches input"
  params:
    - name: input
      type: string
      description: "Input channel identifier (varies by model)"

- id: pjlink_av_mute
  label: PJLink AV Mute
  kind: action
  description: "AVMT command — controls AV muting"
  params:
    - name: mute_state
      type: string
      description: "Mute state value"

# UNRESOLVED: complete list of Simplified Command ITEM numbers beyond INPUT TERMINAL and ASPECT
# UNRESOLVED: full PJLink AVMT parameter values not enumerated in source
# UNRESOLVED: PJLink INPT parameter values vary by model — only example "21" for Video given

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  description: "SDCP SET request — sets picture mode using ITEM NO 0002h. The documented example uses REQUEST 00h and DATA LENGTH 02h."
  params:
    - name: picture_mode
      type: enum
      values:
        - label: Dynamic
          value: "0000h"
      description: "Only dynamic is documented in the source packet example; other picture-mode values are UNRESOLVED."
```

## Feedbacks
```yaml
# === RS-232C Simplified Command Response ===
- id: command_ack
  type: enum
  values: ["0000h (Complete)", "NAK"]
  description: "Response to Simplified Command. ACK byte=03h on success."

# === SDCP Response ===
- id: sdcp_response
  type: composite
  description: "SDCP RESPONSE: RESPONSE(1 byte, 01h=OK), ITEM NO(2 bytes), DATA LENGTH(1 byte), DATA"

# === Status Items (RS-232C) ===
- id: status_error1
  type: enum
  values: [NO ERROR, LAMP ERROR, FAN ERROR, COVER ERROR, TEMP ERROR, D5V ERROR, POWER ERROR, WARNING TEMP, NVM DATA ERROR]
  description: "Status error readout via Simplified Command (Get only)"

- id: status_power
  type: enum
  values: [STANDBY, START UP]
  description: "Power status via Simplified Command (Get only)"

# === SDCP System Items ===
- id: model_name
  type: string
  description: "System ITEM 0x8001 — 12-character model name"

- id: serial_number
  type: string
  description: "System ITEM 0x8002 — 4-byte serial (00000000–99999999)"

- id: installation_location
  type: string
  description: "System ITEM 0x8003 — 24-character location string"

# === PJLink Queries ===
- id: pjlink_power_state
  type: enum
  values: ["0", "1", "2"]
  description: "POWR? response. 0=Standby/Power-saving, 1=Power ON, 2=Cooling"
  query_command: "POWR?"

- id: pjlink_input_status
  type: string
  description: "INPT? response. Input channel number (varies by model, e.g. 21=Video)"
  query_command: "INPT?"

- id: pjlink_error_status
  type: string
  description: "ERST? response. 6-digit number: fan|lamp|temp|cover|filter|other errors (0=no error, 1=warning)"
  query_command: "ERST?"

- id: pjlink_lamp_info
  type: string
  description: "LAMP? response. Lamp count and lamp time"
  query_command: "LAMP ?"

- id: pjlink_input_list
  type: string
  description: "INST? response. List of available input switches"
  query_command: "INST ?"

- id: pjlink_manufacturer_name
  type: string
  description: "INF1? response. Returns 'SONY' when normal"
  query_command: "INF1?"

- id: pjlink_model_name
  type: string
  description: "INF2? response. Returns model name"
  query_command: "INF2?"

- id: pjlink_class_info
  type: string
  description: "CLSS? response. Returns '1' (Class 1)"
  query_command: "CLSS?"

- id: pjlink_av_mute_status
  type: string
  description: "AVMT ? response. AV muting status inquiry; response values are UNRESOLVED."
  query_command: "AVMT ?"

- id: pjlink_other_information
  type: string
  description: "INFO? response. Returns a space when normal, or ERR4 when a projector error occurs, including a warning."
  query_command: "INFO?"
```

## Variables
```yaml
# UNRESOLVED: no continuous settable parameters (volume, brightness, etc.) explicitly enumerated in source
```

## Events
```yaml
# SDAP (Simple Display Advertisement Protocol) — projector broadcasts equipment info
# periodically to the network when enabled (OFF by default).
# Packet fields: POWER, HEADER(12), PRODUCT NAME(24), LOCATION, COMMUNITY, SERIAL NO., STATUS
# UNRESOLVED: SDAP broadcast interval and full field details not documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing found in source
```

## Notes
- The RS-232C Simplified Command protocol uses binary framing: `A9h` start, `9Ah` end, with a 1-byte checksum.
- Only one command may be sent at a time — the controller must wait for a response before issuing the next command.
- SDCP (Ethernet) uses a 4-character community string (factory default `SONY`, case sensitive). Must be exactly 4 characters.
- PJLink is disabled by default and must be enabled via the Web settings screen. A password can be set there.
- SDCP/PJ Talk is also OFF by default and must be enabled.
- SDAP advertisement service is OFF by default.
- Input terminal lists differ between model groups — VPL-DX/DW models lack S VIDEO, INPUT C, and have different USB/network numbering.
- Error codes for SDCP include: Invalid Item, Invalid Item Request, Invalid Length, Invalid Data, Short Data, Not Applicable Item, Community Error, Request Error (Invalid Version, Invalid Equipment Category Code).

<!-- UNRESOLVED: baud_rate, data_bits, parity, stop_bits for RS-232C not in extracted text (section 3-2 content missing) -->
<!-- UNRESOLVED: complete Simplified Command ITEM list — only INPUT TERMINAL and ASPECT shown -->
<!-- UNRESOLVED: VPL-CH3 Series is stated as the device name but source document covers VPL-DX/DW/EX/EW models — model coverage may differ -->
<!-- UNRESOLVED: SDAP packet field lengths and broadcast interval -->
<!-- UNRESOLVED: PJLink password format and configuration details -->
<!-- UNRESOLVED: checksum calculation algorithm for Simplified Command -->
<!-- UNRESOLVED: SDCP header version and category code values (only example 02h/0Ah shown) -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T13:20:33.914Z
last_checked_at: 2026-10-07T13:20:33.914Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:20:33.914Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 action units match source commands; port 53484 and SONY community string supported; status and system items covered as feedbacks. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232C communication specifications (baud rate, data bits, parity, stop bits) section was referenced as section 3-2 but values not present in extracted text"
- "PJLink password configuration mentioned but not documented"
- "complete ITEM list for Setup (only INPUT TERMINAL and ASPECT partially shown)"
- "baud rate not stated in extracted source text"
- "data bits not stated in extracted source text"
- "parity not stated in extracted source text"
- "stop bits not stated in extracted source text"
- "flow control not stated in extracted source text"
- "complete list of Simplified Command ITEM numbers beyond INPUT TERMINAL and ASPECT"
- "full PJLink AVMT parameter values not enumerated in source"
- "PJLink INPT parameter values vary by model — only example \"21\" for Video given"
- "no continuous settable parameters (volume, brightness, etc.) explicitly enumerated in source"
- "SDAP broadcast interval and full field details not documented"
- "no multi-step sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing found in source"
- "baud_rate, data_bits, parity, stop_bits for RS-232C not in extracted text (section 3-2 content missing)"
- "complete Simplified Command ITEM list — only INPUT TERMINAL and ASPECT shown"
- "VPL-CH3 Series is stated as the device name but source document covers VPL-DX/DW/EX/EW models — model coverage may differ"
- "SDAP packet field lengths and broadcast interval"
- "PJLink password format and configuration details"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
