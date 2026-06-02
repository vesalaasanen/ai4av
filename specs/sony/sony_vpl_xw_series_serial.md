---
spec_id: admin/sony-vpl-xw-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony VPL-XW Series Control Spec"
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
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://www.sony.com/electronics/support/res/manuals/9932/68bf8c3b38750c56cb60dcb8f1dfa909/99327615M.pdf
retrieved_at: 2026-04-30T10:44:24.769Z
last_checked_at: 2026-06-02T22:15:03.085Z
generated_at: 2026-06-02T22:15:03.085Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the entity groups these models under \"VPL-XW Series\" but the source document titles them VPL-DX/DW/EX/EW; verify the entity grouping is correct"
  - "RS-232C communication specifications (baud rate, data bits, parity, stop bits) section was truncated in the refined source"
  - "complete item number list for all settable/gettable parameters not fully documented in source"
  - "PJLink port number not stated in source"
  - "PJLink port not stated in source"
  - "communication specs section truncated in source"
  - "complete set of RS-232C item numbers and their data values not fully documented in source"
  - "complete SDCP item number list not fully documented in source"
  - "PJLink AVMT parameter value mapping not specified in source excerpt"
  - "complete list of power status values not fully documented"
  - "exact response value mapping not documented in source"
  - "exact response format not fully documented in source"
  - "no continuous variable ranges documented in source excerpt"
  - "no multi-step sequences described in source"
  - "source does not describe safety interlocks or power sequencing requirements"
  - "RS-232C communication specs (baud rate, data bits, parity, stop bits, flow control) — section 3-2 content was not available in refined source"
  - "complete ITEM list for all settable/gettable parameters on RS-232C and SDCP"
  - "PJLink AVMT command parameter and response value mappings"
  - "PJLink LAMP ? response format"
  - "PJLink INST ? response format"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:15:03.085Z
  matched_actions: 8
  action_count: 8
  confidence: medium
  summary: "All 8 spec actions traced to source (dip-safe re-verify). (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Sony VPL-XW Series Control Spec

## Summary

Sony data projectors in the VPL-DX/DW/EX/EW series are remotely controllable over RS-232C and Ethernet. The device supports three command sets: RS-232C Simplified Commands (binary), SDCP/PJ Talk over Ethernet (binary on port 53484), and PJLink Class 1 (text-based). This spec covers all three command sets as documented in the Sony Protocol Manual.

<!-- UNRESOLVED: the entity groups these models under "VPL-XW Series" but the source document titles them VPL-DX/DW/EX/EW; verify the entity grouping is correct -->
<!-- UNRESOLVED: RS-232C communication specifications (baud rate, data bits, parity, stop bits) section was truncated in the refined source -->
<!-- UNRESOLVED: complete item number list for all settable/gettable parameters not fully documented in source -->
<!-- UNRESOLVED: PJLink port number not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 53484  # SDCP (PJ Talk) factory default
  # UNRESOLVED: PJLink port not stated in source
serial:
  baud_rate: null  # UNRESOLVED: communication specs section truncated in source
  data_bits: null  # UNRESOLVED
  parity: null  # UNRESOLVED
  stop_bits: null  # UNRESOLVED
  flow_control: null  # UNRESOLVED
auth:
  type: community  # SDCP uses 4-character community string (default "SONY"); PJLink supports optional password
  notes: SDCP community is 4 alphanumeric characters, case sensitive, factory default "SONY". PJLink password can be set via Web UI.
```

## Traits
```yaml
# powerable - POWR command (PJLink), STATUS POWER item (RS-232C/SDCP)
# queryable - POWR?, INPT?, AVMT?, ERST?, LAMP?, INST? queries (PJLink); GET requests (RS-232C/SDCP)
# routable - INPT input switching (PJLink); INPUT TERMINAL items (RS-232C/SDCP)
traits:
  - powerable  # inferred from POWR command and STATUS POWER items
  - queryable  # inferred from query/response commands
  - routable  # inferred from input terminal switching commands
```

## Actions
```yaml
# === RS-232C Simplified Commands (binary protocol) ===
# Packet: [A9h] [ITEM_HI] [ITEM_LO] [SET/GET] [DATA_HI] [DATA_LO] [CHECKSUM] [9Ah]
# SET/GET: 00h = SET, 01h = GET

- id: serial_set_input_terminal
  label: Set Input Terminal (RS-232C)
  kind: action
  protocol: serial_simplified
  params:
    - name: item_upper
      type: integer
      description: "Upper byte of item number (00h)"
    - name: item_lower
      type: integer
      description: "Lower byte - 00h=VIDEO, 01h=S VIDEO (EX/EW only), 02h=INPUT A, 03h=INPUT B, 04h=INPUT C (EX/EW only) or USB TYPE B (DX/DW), 05h=USB TYPE B (EX/EW) or NETWORK (DX/DW), 06h=NETWORK (EX/EW only)"
  notes: Input terminal codes vary by model family (see model-specific ITEM lists)

- id: serial_set_aspect
  label: Set Aspect Ratio (RS-232C)
  kind: action
  protocol: serial_simplified
  params:
    - name: data
      type: integer
      description: "Aspect value, e.g. 0003h = ZOOM"
  notes: Item number 0020h (ASPECT). Example in source uses 0003h for ZOOM.

# === SDCP (PJ Talk) Commands over Ethernet ===
# Binary protocol on TCP port 53484

- id: sdcp_set_picture_mode
  label: Set Picture Mode (SDCP)
  kind: action
  protocol: sdcp
  params:
    - name: community
      type: string
      description: "4-character community string (default SONY)"
    - name: item_no
      type: integer
      description: "Item number, e.g. 0002h for picture mode"
    - name: data
      type: integer
      description: "Data value, e.g. 0000h for dynamic"

- id: sdcp_get_picture_mode
  label: Get Picture Mode (SDCP)
  kind: action
  protocol: sdcp
  params:
    - name: community
      type: string
      description: "4-character community string (default SONY)"
    - name: item_no
      type: integer
      description: "Item number, e.g. 0002h for picture mode"

# === PJLink Class 1 Commands ===

- id: pjlink_power_on
  label: Power On (PJLink)
  kind: action
  protocol: pjlink
  command: "POWR 1"
  params: []

- id: pjlink_power_off
  label: Power Off (PJLink)
  kind: action
  protocol: pjlink
  command: "POWR 0"
  params: []

- id: pjlink_input_switch
  label: Switch Input (PJLink)
  kind: action
  protocol: pjlink
  command: "INPT <input>"
  params:
    - name: input
      type: integer
      description: "Input number, e.g. 21 for Video (varies by model)"

- id: pjlink_avmt_mute
  label: Set AV Mute (PJLink)
  kind: action
  protocol: pjlink
  command: "AVMT <state>"
  params:
    - name: state
      type: integer
      description: "AV mute state value"

# UNRESOLVED: complete set of RS-232C item numbers and their data values not fully documented in source
# UNRESOLVED: complete SDCP item number list not fully documented in source
# UNRESOLVED: PJLink AVMT parameter value mapping not specified in source excerpt
```

## Feedbacks
```yaml
# === RS-232C Simplified Command Responses ===

- id: serial_ack
  type: enum
  protocol: serial_simplified
  values: [complete, error]
  description: "ACK response - 0000h (Complete, ACK=03h) on success"
  notes: Start code A9h, ACK/NAK field, ACK byte

- id: serial_status_power
  type: enum
  protocol: serial_simplified
  values: [standby, startup]
  description: "STATUS POWER item - get only"
  # UNRESOLVED: complete list of power status values not fully documented

- id: serial_status_error
  type: enum
  protocol: serial_simplified
  values: [no_error, lamp_error, fan_error, cover_error, temp_error, d5v_error, power_error, warning_temp, nvm_data_error]
  description: "STATUS ERROR1 item - get only"

# === SDCP Responses ===

- id: sdcp_response
  type: enum
  protocol: sdcp
  values: [ok]
  description: "SDCP RESPONSE - 01h (OK) indicates request executed correctly"

- id: sdcp_error_code
  type: enum
  protocol: sdcp
  values: [item_error, community_error, request_error]
  description: "Error types: Item Error (01h) includes Invalid Item, Invalid Item Request, Invalid Length, Invalid Data, Short Data, Not Applicable Item"

- id: sdcp_model_name
  type: string
  protocol: sdcp
  item_no: "0x8001"
  description: "Model name, 12 characters padded with 00h"

- id: sdcp_serial_number
  type: integer
  protocol: sdcp
  item_no: "0x8002"
  description: "Serial number (00000000-99999999), 4 bytes"

- id: sdcp_installation_location
  type: string
  protocol: sdcp
  item_no: "0x8003"
  description: "Installation location, 24 characters padded with 00h"

# === PJLink Query Responses ===

- id: pjlink_power_status
  type: enum
  protocol: pjlink
  command: "POWR ?"
  values: ["0", "1", "2"]
  description: "0=Standby/power-saving, 1=Power ON, 2=Cooling"

- id: pjlink_input_status
  type: integer
  protocol: pjlink
  command: "INPT ?"
  description: "Current input number, e.g. 21 for Video (varies by model)"

- id: pjlink_avmt_status
  type: integer
  protocol: pjlink
  command: "AVMT ?"
  description: "AV mute status"
  # UNRESOLVED: exact response value mapping not documented in source

- id: pjlink_error_status
  type: string
  protocol: pjlink
  command: "ERST ?"
  description: "6-digit error status - each digit 0 (no error) or 1 (warning)"
  notes: "Digits: 6th=Fan, 5th=Lamp, 4th=Temperature, 3rd=Cover open, 2nd=Filter, 1st=Other"

- id: pjlink_lamp_info
  type: string
  protocol: pjlink
  command: "LAMP ?"
  description: "Lamp count and lamp time"
  # UNRESOLVED: exact response format not fully documented in source

- id: pjlink_input_list
  type: string
  protocol: pjlink
  command: "INST ?"
  description: "List of available input switches"
  # UNRESOLVED: exact response format not fully documented in source

- id: pjlink_manufacturer_name
  type: string
  protocol: pjlink
  command: "INF1 ?"
  description: "Manufacturer name (returns SONY)"

- id: pjlink_model_name
  type: string
  protocol: pjlink
  command: "INF2 ?"
  description: "Model name"

- id: pjlink_other_info
  type: string
  protocol: pjlink
  command: "INFO ?"
  description: "Other information; returns a space when normal, ERR4 on error"

- id: pjlink_class_info
  type: string
  protocol: pjlink
  command: "CLSS ?"
  description: "Class information; returns 1 for Class 1"
```

## Variables
```yaml
# UNRESOLVED: no continuous variable ranges documented in source excerpt
# Picture mode and aspect ratio values are referenced but complete enumerations not provided
```

## Events
```yaml
# SDAP (advertisement) - projector broadcasts equipment info periodically to network
# Includes: POWER, HEADER, PRODUCT NAME, LOCATION, COMMUNITY, SERIAL NO., STATUS
# Disabled by default (set to OFF at factory)

- id: sdap_advertisement
  type: broadcast
  protocol: sdap
  description: "Periodic network broadcast of projector status (disabled by default)"
  fields:
    - name: power
      description: "Power state"
    - name: header
      description: "ID (4441h), version, category"
    - name: product_name
      description: "Product name"
    - name: location
      description: "Installation location"
    - name: community
      description: "Community string"
    - name: serial_no
      description: "Serial number"
    - name: status
      description: "Projector status"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety interlocks or power sequencing requirements
```

## Notes

**Protocol architecture:** The projector supports three distinct command sets:
1. **RS-232C Simplified Commands** — binary packets over serial. Format: `[A9h][ITEM_HI][ITEM_LO][SET/GET][DATA_HI][DATA_LO][CHECKSUM][9Ah]`. Controller must not send multiple commands simultaneously.
2. **SDCP (Simple Display Control Protocol) / PJ Talk** — binary packets over Ethernet TCP port 53484. Uses community-based addressing (default "SONY"). Also supports encapsulation mode.
3. **PJLink Class 1** — text-based protocol over TCP. Supports 14 standard commands. Password is optional and configurable via Web UI.

**Model-specific differences:** Input terminal codes vary between model families. VPL-EX/EW series supports S VIDEO and INPUT C; VPL-DX/DW series does not. USB TYPE A only available on DX/DW models.

**SDCP error handling:** Three error categories — Item Error (01h, sub-types: Invalid Item, Invalid Item Request, Invalid Length, Invalid Data, Short Data, Not Applicable Item), Community Error (community mismatch), Request Error (Invalid Version, Invalid Equipment Category Code). Version must be 2.

<!-- UNRESOLVED: RS-232C communication specs (baud rate, data bits, parity, stop bits, flow control) — section 3-2 content was not available in refined source -->
<!-- UNRESOLVED: complete ITEM list for all settable/gettable parameters on RS-232C and SDCP -->
<!-- UNRESOLVED: PJLink AVMT command parameter and response value mappings -->
<!-- UNRESOLVED: PJLink LAMP ? response format -->
<!-- UNRESOLVED: PJLink INST ? response format -->
<!-- UNRESOLVED: SDAP advertisement packet field sizes and complete structure -->
<!-- UNRESOLVED: whether PJLink uses the same TCP port 53484 or a separate port -->

## Provenance

```yaml
source_domains:
  - sony.com
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://www.sony.com/electronics/support/res/manuals/9932/68bf8c3b38750c56cb60dcb8f1dfa909/99327615M.pdf
retrieved_at: 2026-04-30T10:44:24.769Z
last_checked_at: 2026-06-02T22:15:03.085Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:15:03.085Z
matched_actions: 8
action_count: 8
confidence: medium
summary: "All 8 spec actions traced to source (dip-safe re-verify). (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the entity groups these models under \"VPL-XW Series\" but the source document titles them VPL-DX/DW/EX/EW; verify the entity grouping is correct"
- "RS-232C communication specifications (baud rate, data bits, parity, stop bits) section was truncated in the refined source"
- "complete item number list for all settable/gettable parameters not fully documented in source"
- "PJLink port number not stated in source"
- "PJLink port not stated in source"
- "communication specs section truncated in source"
- "complete set of RS-232C item numbers and their data values not fully documented in source"
- "complete SDCP item number list not fully documented in source"
- "PJLink AVMT parameter value mapping not specified in source excerpt"
- "complete list of power status values not fully documented"
- "exact response value mapping not documented in source"
- "exact response format not fully documented in source"
- "no continuous variable ranges documented in source excerpt"
- "no multi-step sequences described in source"
- "source does not describe safety interlocks or power sequencing requirements"
- "RS-232C communication specs (baud rate, data bits, parity, stop bits, flow control) — section 3-2 content was not available in refined source"
- "complete ITEM list for all settable/gettable parameters on RS-232C and SDCP"
- "PJLink AVMT command parameter and response value mappings"
- "PJLink LAMP ? response format"
- "PJLink INST ? response format"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
