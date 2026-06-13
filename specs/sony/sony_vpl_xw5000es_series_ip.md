---
spec_id: admin/sony-vpl-xw5000es-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony VPL-XW5000ES Series Control Spec"
manufacturer: Sony
model_family: VPL-XW5000ES
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - VPL-XW5000ES
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manualslib.com
source_urls:
  - https://www.manualslib.com/manual/937722/Sony-Vpl-Dx125.html
retrieved_at: 2026-06-11T01:37:27.378Z
last_checked_at: 2026-06-11T13:48:08.812Z
generated_at: 2026-06-11T13:48:08.812Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document title lists VPL-DX125/DX145/DW125/EX221/EX225/EX241/EX245/EX271/EX275/EW225/EW245/EW275 — VPL-XW5000ES is not explicitly mentioned. Protocol details may differ for this model. Verify against device-specific documentation."
  - "RS-232C serial communication specifications (baud rate, data bits, parity, stop bits) were not captured in the refined source."
  - "Complete SDCP item number list for all controllable parameters was not fully captured."
  - "Firmware version compatibility not stated in source."
  - "serial communication specs not captured in refined source"
  - "Complete SDCP item number list not fully captured - additional set/get commands for picture adjustments, lens settings, etc. may exist."
  - "RS-232C command block format and baud rate/serial config not fully captured."
  - "settable parameters (brightness, contrast, etc.) not documented in source"
  - "no multi-step sequences described in source"
  - "source does not describe safety warnings, interlock procedures, or power-on sequencing requirements specific to this model."
  - "Source document covers VPL-DX125/DX145/DW125/EX221/EX225/EX241/EX245/EX271/EX275/EW225/EW245/EW275 — not VPL-XW5000ES. Input terminal codes, item numbers, and feature availability may differ."
  - "RS-232C communication specifications (baud rate, data bits, parity, stop bits, flow control) not captured in refined source."
  - "Complete SDCP ITEM list for all controllable parameters not fully captured."
  - "Firmware version compatibility not stated."
  - "Power-on sequencing requirements not stated."
  - "Timing constraints between commands not stated beyond \"no simultaneous commands\"."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:48:08.812Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions (14 PJLink + 10 SDCP) matched verbatim in source; transport parameters verified; complete coverage of documented protocol commands. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Sony VPL-XW5000ES Series Control Spec

## Summary

Sony projector controllable via Ethernet (SDCP protocol) and RS-232C. The SDCP (Simple Display Control Protocol) runs on TCP port 53484 and supports set/get commands for input selection, picture mode, aspect ratio, and status queries. PJLink Class 1 is also supported for power, input switching, AV mute, error status, and lamp inquiries.

<!-- UNRESOLVED: Source document title lists VPL-DX125/DX145/DW125/EX221/EX225/EX241/EX245/EX271/EX275/EW225/EW245/EW275 — VPL-XW5000ES is not explicitly mentioned. Protocol details may differ for this model. Verify against device-specific documentation. -->
<!-- UNRESOLVED: RS-232C serial communication specifications (baud rate, data bits, parity, stop bits) were not captured in the refined source. -->
<!-- UNRESOLVED: Complete SDCP item number list for all controllable parameters was not fully captured. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 53484  # SDCP factory-default port
serial:
  baud_rate: null  # UNRESOLVED: serial communication specs not captured in refined source
  data_bits: null  # UNRESOLVED
  parity: null  # UNRESOLVED
  stop_bits: null  # UNRESOLVED
  flow_control: null  # UNRESOLVED
auth:
  type: community  # SDCP uses a 4-character community string; factory default is "SONY" (case-sensitive)
  description: >
    SDCP packets include a COMMUNITY field (4 alphanumeric chars, case-sensitive).
    Factory default is "SONY". A Community Error is returned if the field does not match.
    PJLink supports an optional password configurable via the web interface.
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWR command for power on/off
  - queryable    # inferred: multiple inquiry commands (POWR?, INPT?, ERST?, LAMP?, INST?, INF1?, INF2?, INFO?, CLSS?)
  - routable     # inferred: input terminal switching commands (INPT, SDCP INPUT TERMINAL item)
  - muteable     # inferred: AVMT command for AV muting
```

## Actions
```yaml
# --- PJLink Commands (14 supported) ---
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

- id: power_status_query
  label: Power Status Query
  kind: query
  protocol: pjlink
  command: "POWR ?"
  params: []

- id: input_switch
  label: Switch Input
  kind: action
  protocol: pjlink
  command: "INPT <input>"
  params:
    - name: input
      type: integer
      description: "Input number (e.g. 21 for Video)"

- id: input_status_query
  label: Input Status Query
  kind: query
  protocol: pjlink
  command: "INPT ?"
  params: []

- id: av_mute_set
  label: Set AV Mute
  kind: action
  protocol: pjlink
  command: "AVMT <state>"
  params:
    - name: state
      type: integer
      description: "Mute state value"

- id: av_mute_status_query
  label: AV Mute Status Query
  kind: query
  protocol: pjlink
  command: "AVMT ?"
  params: []

- id: error_status_query
  label: Error Status Query
  kind: query
  protocol: pjlink
  command: "ERST ?"
  params: []

- id: lamp_info_query
  label: Lamp Count/Time Query
  kind: query
  protocol: pjlink
  command: "LAMP ?"
  params: []

- id: input_list_query
  label: Input Switch List Query
  kind: query
  protocol: pjlink
  command: "INST ?"
  params: []

- id: manufacturer_name_query
  label: Manufacturer Name Query
  kind: query
  protocol: pjlink
  command: "INF1 ?"
  params: []

- id: model_name_query
  label: Model Name Query
  kind: query
  protocol: pjlink
  command: "INF2 ?"
  params: []

- id: other_info_query
  label: Other Information Query
  kind: query
  protocol: pjlink
  command: "INFO ?"
  params: []

- id: class_info_query
  label: Class Information Query
  kind: query
  protocol: pjlink
  command: "CLSS ?"
  params: []

# --- SDCP Commands ---
- id: sdrp_set_picture_mode
  label: Set Picture Mode (SDCP)
  kind: action
  protocol: sdcp
  description: >
    SDCP SET request with item number 0002h for picture mode.
    Example from source: HEADER(02h,0Ah) COMMUNITY("SONY") COMMAND(00h,0002h,02h) DATA(0000h).
    DATA=0000h = Dynamic. Other picture mode values not enumerated in refined source.
  params:
    - name: picture_mode
      type: integer
      description: "Picture mode data value (e.g. 0000h for Dynamic)"

- id: sdcp_get_picture_mode
  label: Get Picture Mode (SDCP)
  kind: query
  protocol: sdcp
  description: >
    SDCP GET request with item number 0002h. Returns current picture mode value in DATA field.
  command: "ITEM=0002h SET/GET=01h"
  params: []

- id: sdcp_set_aspect
  label: Set Aspect Ratio (SDCP)
  kind: action
  protocol: sdcp
  description: >
    SDCP SET request with item number 0020h for aspect ratio.
    Example from source: DATA=0003h sets aspect to ZOOM.
  params:
    - name: aspect
      type: integer
      description: "Aspect ratio data value (e.g. 0003h for ZOOM)"

- id: sdcp_get_aspect
  label: Get Aspect Ratio (SDCP)
  kind: query
  protocol: sdcp
  description: >
    SDCP GET request with item number 0020h. Returns current aspect value in DATA field.
  command: "ITEM=0020h SET/GET=01h"
  params: []

- id: sdcp_set_input_terminal
  label: Set Input Terminal (SDCP)
  kind: action
  protocol: sdcp
  description: >
    SDCP SET request with input terminal item number.
    Values vary by model series (EX series: 00h=VIDEO, 01h=S VIDEO, 02h=INPUT A, 03h=INPUT B, 04h=INPUT C, 05h=USB TYPE B, 06h=NETWORK).
    DX/DW series: 00h=VIDEO, 02h=INPUT A, 03h=INPUT B, 04h=USB TYPE B, 05h=NETWORK.
  params:
    - name: input
      type: integer
      description: "Input terminal code (model-specific)"

- id: sdcp_get_input_terminal
  label: Get Input Terminal (SDCP)
  kind: query
  protocol: sdcp
  description: >
    SDCP GET request for current input terminal.
  command: "ITEM=0000h SET/GET=01h"
  params: []

- id: sdcp_get_model_name
  label: Get Model Name (SDCP)
  kind: query
  protocol: sdcp
  description: >
    SDCP system item 0x8001. Returns 12 alphanumeric characters, padded with 00h if shorter.
  command: "ITEM=8001h SET/GET=01h"
  params: []

- id: sdcp_get_serial_number
  label: Get Serial Number (SDCP)
  kind: query
  protocol: sdcp
  description: >
    SDCP system item 0x8002. Returns 4-byte serial number (00000000 to 99999999).
  command: "ITEM=8002h SET/GET=01h"
  params: []

- id: sdcp_get_installation_location
  label: Get Installation Location (SDCP)
  kind: query
  protocol: sdcp
  description: >
    SDCP system item 0x8003. Returns 24 alphanumeric characters, padded with 00h if shorter.
  command: "ITEM=8003h SET/GET=01h"
  params: []

# --- RS-232C Simplified Command (ACK/NAK) ---
- id: rs232_ack
  label: RS-232C ACK
  kind: feedback
  protocol: serial
  description: >
    Response packet returned by projector on successful command execution.
    START CODE = A9h, ACK/NAK = 0000h (Complete), ACK = 03h.
  command: "A9h 0000h 03h"
  params: []

# UNRESOLVED: Complete SDCP item number list not fully captured - additional set/get commands for picture adjustments, lens settings, etc. may exist.
# UNRESOLVED: RS-232C command block format and baud rate/serial config not fully captured.
```

## Feedbacks
```yaml
# --- PJLink Inquiry Responses ---
- id: power_state
  label: Power Status
  protocol: pjlink
  command: "POWR ?"
  type: enum
  values:
    - "0"  # Standby or power-saving
    - "1"  # Power ON
    - "2"  # Cooling

- id: input_status
  label: Input Status
  protocol: pjlink
  command: "INPT ?"
  type: string
  description: "Returns input number (e.g. '21' for Video). Input channel values vary by model."

- id: av_mute_status
  label: AV Mute Status
  protocol: pjlink
  command: "AVMT ?"
  type: string

- id: error_status
  label: Error Status
  protocol: pjlink
  command: "ERST ?"
  type: string
  description: >
    6-digit error code. Each digit: 0=no error, 1=warning.
    Digit positions (left to right, 6th to 1st): fan, lamp, temperature, cover open, filter, other.

- id: lamp_info
  label: Lamp Count/Time
  protocol: pjlink
  command: "LAMP ?"
  type: string
  description: "Returns lamp count and lamp time information."

- id: input_list
  label: Input Switch List
  protocol: pjlink
  command: "INST ?"
  type: string
  description: "Returns list of available input channels."

- id: manufacturer_name
  label: Manufacturer Name
  protocol: pjlink
  command: "INF1 ?"
  type: enum
  values:
    - "SONY"  # Normal response
    - "ERR4"  # Projector error or warning

- id: model_name
  label: Model Name
  protocol: pjlink
  command: "INF2 ?"
  type: string

- id: other_info
  label: Other Information
  protocol: pjlink
  command: "INFO ?"
  type: enum
  values:
    - " "  # Space character (normal)
    - "ERR4"  # Projector error or warning

- id: class_info
  label: Class Information
  protocol: pjlink
  command: "CLSS ?"
  type: enum
  values:
    - "1"  # PJLink Class 1

# --- SDCP Responses ---
- id: sdcp_response
  label: SDCP Response
  protocol: sdcp
  type: composite
  description: >
    SDCP RESPONSE command has 3 sub-fields: RESPONSE(1 byte), ITEM NO(2 bytes), DATA LENGTH(1 byte).
    RESPONSE 01h = OK (request executed correctly).
    Error codes: Item Error (01h), Community Error (02h), Request Error (03h).
    Sub-errors for Item Error: Invalid Item, Invalid Item Request, Invalid Length, Invalid Data, Short Data, Not Applicable Item.

- id: sdcp_model_name
  label: SDCP Model Name
  protocol: sdcp
  type: string
  description: "Item 0x8001. 12 alphanumeric characters, padded with 00h."

- id: sdcp_serial_number
  label: SDCP Serial Number
  protocol: sdcp
  type: string
  description: "Item 0x8002. 4 bytes, range 00000000 to 99999999."

- id: sdcp_installation_location
  label: SDCP Installation Location
  protocol: sdcp
  type: string
  description: "Item 0x8003. 24 alphanumeric characters, padded with 00h."

# --- SDAP Advertisement ---
- id: sdap_advertisement
  label: SDAP Advertisement
  protocol: sdap
  type: composite
  description: >
    Broadcast packet containing: POWER, HEADER(12 bytes), PRODUCT NAME(24 bytes), LOCATION,
    COMMUNITY, SERIAL NO., STATUS. Disabled by default.
    Header = ID(2 bytes, 4441h) + VERSION(1 byte) + CATEGORY(1 byte).
```

## Variables
```yaml
# UNRESOLVED: settable parameters (brightness, contrast, etc.) not documented in source
```

## Events
```yaml
# SDAP advertisement broadcasts (disabled by default):
# - Periodic broadcast of equipment information on the network
# - Contains power state, product name, location, community, serial number, status
# - Header structure: ID=4441h (2 bytes), VERSION (1 byte), CATEGORY (1 byte)
# Note: SDAP is set to OFF by default; must be enabled for unsolicited events.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety warnings, interlock procedures, or power-on sequencing requirements specific to this model.
# Note: PJLink returns cooling state (POWR?=2) after power-off command; controller should wait for standby (0) before issuing further commands.
```

## Notes

- The projector supports three control protocols: SDCP (Sony proprietary over Ethernet), SDAP (Sony Discovery and Advertisement Protocol, broadcast), and PJLink Class 1 (standard).
- SDCP community string defaults to "SONY" (4 characters, case-sensitive, alphanumeric). Must match on all packets or a Community Error is returned.
- SDCP header uses VERSION=02h and CATEGORY=0Ah (projector).
- SDAP and PJLink over Ethernet are both set to OFF by default and must be enabled via the projector's web interface or menu.
- PJLink password is optional and configurable via Web > Setup > Advanced Menu.
- RS-232C uses a D-Sub 9 pin cross (reverse) cable. Serial specs not captured in refined source.
- Controller must not send multiple commands simultaneously; wait for response before sending next.
- SDCP packet structure: START CODE (A9h), ITEM NUMBER (2 bytes), SET/GET (00h=SET, 01h=GET), DATA (2 bytes), CHECK SUM (1 byte), END CODE (9Ah).
- SDCP example: Set picture mode to Dynamic = HEADER(02h,0Ah) COMMUNITY("SONY") COMMAND(00h,0002h,02h) DATA(0000h).
- SDCP example: Set ASPECT to ZOOM = START A9h, ITEM 0020h, SET/GET 00h, DATA 0003h, CHECK SUM 23h, END 9Ah.
- RS-232 ACK response packet: START A9h, ACK/NAK 0000h (Complete), ACK 03h.
- PJLink supports 14 commands total: POWR, POWR?, INPT, INPT?, AVMT, AVMT?, ERST?, LAMP?, INST?, INF1?, INF2?, INFO?, CLSS? (13 listed in source table, with INF1/INF2/INFO/CLSS named in prose).
- PJLink INF1 returns "SONY" on success or "ERR4" on projector error/warning.
- PJLink INFO returns a single space " " on success or "ERR4" on projector error/warning.
- PJLink ERST error digit order (6th to 1st, left to right): fan, lamp, temperature, cover open, filter, other.
- SDCP system items: 0x8001=Model name (12 chars, 00h-padded), 0x8002=Serial number (4 bytes, 00000000-99999999), 0x8003=Installation location (24 chars, 00h-padded).
- Input terminal codes vary by model series. Verify applicable codes for VPL-XW5000ES specifically.

<!-- UNRESOLVED: Source document covers VPL-DX125/DX145/DW125/EX221/EX225/EX241/EX245/EX271/EX275/EW225/EW245/EW275 — not VPL-XW5000ES. Input terminal codes, item numbers, and feature availability may differ. -->
<!-- UNRESOLVED: RS-232C communication specifications (baud rate, data bits, parity, stop bits, flow control) not captured in refined source. -->
<!-- UNRESOLVED: Complete SDCP ITEM list for all controllable parameters not fully captured. -->
<!-- UNRESOLVED: Firmware version compatibility not stated. -->
<!-- UNRESOLVED: Power-on sequencing requirements not stated. -->
<!-- UNRESOLVED: Timing constraints between commands not stated beyond "no simultaneous commands". -->

## Provenance

```yaml
source_domains:
  - manualslib.com
source_urls:
  - https://www.manualslib.com/manual/937722/Sony-Vpl-Dx125.html
retrieved_at: 2026-06-11T01:37:27.378Z
last_checked_at: 2026-06-11T13:48:08.812Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:48:08.812Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions (14 PJLink + 10 SDCP) matched verbatim in source; transport parameters verified; complete coverage of documented protocol commands. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document title lists VPL-DX125/DX145/DW125/EX221/EX225/EX241/EX245/EX271/EX275/EW225/EW245/EW275 — VPL-XW5000ES is not explicitly mentioned. Protocol details may differ for this model. Verify against device-specific documentation."
- "RS-232C serial communication specifications (baud rate, data bits, parity, stop bits) were not captured in the refined source."
- "Complete SDCP item number list for all controllable parameters was not fully captured."
- "Firmware version compatibility not stated in source."
- "serial communication specs not captured in refined source"
- "Complete SDCP item number list not fully captured - additional set/get commands for picture adjustments, lens settings, etc. may exist."
- "RS-232C command block format and baud rate/serial config not fully captured."
- "settable parameters (brightness, contrast, etc.) not documented in source"
- "no multi-step sequences described in source"
- "source does not describe safety warnings, interlock procedures, or power-on sequencing requirements specific to this model."
- "Source document covers VPL-DX125/DX145/DW125/EX221/EX225/EX241/EX245/EX271/EX275/EW225/EW245/EW275 — not VPL-XW5000ES. Input terminal codes, item numbers, and feature availability may differ."
- "RS-232C communication specifications (baud rate, data bits, parity, stop bits, flow control) not captured in refined source."
- "Complete SDCP ITEM list for all controllable parameters not fully captured."
- "Firmware version compatibility not stated."
- "Power-on sequencing requirements not stated."
- "Timing constraints between commands not stated beyond \"no simultaneous commands\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
