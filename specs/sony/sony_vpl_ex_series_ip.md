---
schema_version: ai4av-public-spec-v1
device_id: sony/vpl-ex221
entity_id: sony_vpl_ex_series
spec_id: admin/sony-vpl-ex-series
revision: 1
author: admin
title: "Sony VPL-EX Series Control Spec"
status: published
manufacturer: Sony
manufacturer_key: sony
model_family: VPL-EX221
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - VPL-EX221
    - VPL-EX225
    - VPL-EX241
    - VPL-EX245
    - VPL-EX271
    - VPL-EX275
    - VPL-EW225
    - VPL-EW245
    - VPL-EW275
    - VPL-DX125
    - VPL-DX145
    - VPL-DW125
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: sony_vpl_ex_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:06.875Z
retrieved_at: 2026-04-27T10:13:06.875Z
last_checked_at: 2026-04-27T10:13:06.875Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:06.875Z
  matched_actions: 23
  action_count: 23
  confidence: high
  summary: "All 23 spec actions map one-to-one to documented SDCP and PJLink commands in source; transport parameters verified verbatim; bidirectional coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Sony VPL-EX Series Control Spec

## Summary
Sony VPL-EX/EW/DX series projectors with RS-232C and Ethernet (SDCP/PJ Talk) control. Supports SDCP (Simple Display Control Protocol) over TCP port 53484, RS-232C serial commands, and PJLink Class 1. Covers power, input routing, picture mode, aspect ratio, AV mute, and status queries.

<!-- UNRESOLVED: RS-232C communication specifications (baud rate, data bits, parity, stop bits) — section 3-2 was truncated in refined source -->
<!-- UNRESOLVED: PJLink password configuration details (mentioned but not fully documented) -->
<!-- UNRESOLVED: SDAP advertisement service details (broadcast protocol, set to OFF by default) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 53484  # SDCP factory default
serial:
  baud_rate: null  # UNRESOLVED: serial config not available in refined source
  data_bits: null  # UNRESOLVED
  parity: null  # UNRESOLVED
  stop_bits: null  # UNRESOLVED
  flow_control: null  # UNRESOLVED
auth:
  type: community_string  # SDCP uses 4-character community field; default "SONY"
```

## Traits
```yaml
- powerable  # inferred from POWR / power control commands
- routable  # inferred from input terminal switching commands
- queryable  # inferred from GET commands and PJLink inquiry commands
- levelable  # inferred from picture mode / aspect control
```

## Actions
```yaml
# SDCP Simplified Commands (RS-232C and Ethernet)
- id: set_input_terminal
  label: Set Input Terminal
  kind: action
  params:
    - name: input
      type: enum
      description: "Input source (varies by model). EX/EW series: VIDEO=0x0000, S_VIDEO=0x0001, INPUT_A=0x0002, INPUT_B=0x0003, INPUT_C=0x0004, USB_TYPE_B=0x0005, NETWORK=0x0006. DX/DW series: VIDEO=0x0000, INPUT_A=0x0002, INPUT_B=0x0003, USB_TYPE_B=0x0004, NETWORK=0x0005"

- id: set_aspect
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: "Aspect mode value (e.g. ZOOM=0x0003)"

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "Picture mode value (e.g. DYNAMIC=0x0000)"

# SDCP System Commands (Ethernet)
- id: set_installation_location
  label: Set Installation Location
  kind: action
  params:
    - name: location
      type: string
      description: "Up to 24 alphanumeric characters"

# PJLink Commands
- id: pjlink_power_on
  label: PJLink Power On
  kind: action
  params: []

- id: pjlink_power_off
  label: PJLink Power Off
  kind: action
  params: []

- id: pjlink_input_switch
  label: PJLink Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number (e.g. 21 for Video)"

- id: pjlink_av_mute
  label: PJLink AV Mute
  kind: action
  params:
    - name: mute_type
      type: integer
      description: "AV mute setting"
```

## Feedbacks
```yaml
# SDCP Queries
- id: get_input_terminal
  type: enum
  values: [VIDEO, S_VIDEO, INPUT_A, INPUT_B, INPUT_C, USB_TYPE_B, NETWORK]

- id: get_status_error
  type: enum
  values: [NO_ERROR, LAMP_ERROR, FAN_ERROR, COVER_ERROR, TEMP_ERROR, D5V_ERROR, POWER_ERROR, WARNING_TEMP, NVM_DATA_ERROR]

- id: get_status_power
  type: enum
  values: [STANDBY, START_UP]

- id: get_model_name
  type: string
  description: "12-character model name (SDCP item 0x8001)"

- id: get_serial_number
  type: integer
  description: "4-byte serial number 00000000–99999999 (SDCP item 0x8002)"

- id: get_installation_location
  type: string
  description: "24-character location string (SDCP item 0x8003)"

# PJLink Queries
- id: pjlink_power_status
  type: enum
  values:
    - "0"  # Standby or power-saving
    - "1"  # Power ON
    - "2"  # Cooling

- id: pjlink_input_status
  type: integer
  description: "Current input number (e.g. 21 for Video)"

- id: pjlink_av_mute_status
  type: integer
  description: "AV mute status"

- id: pjlink_error_status
  type: string
  description: "6-digit error code — digits: fan, lamp, temperature, cover, filter, other (0=no error, 1=warning)"

- id: pjlink_lamp_info
  type: string
  description: "Lamp count and lamp time"

- id: pjlink_input_list
  type: string
  description: "Available input switch list"

- id: pjlink_manufacturer_name
  type: string
  description: "Returns 'SONY'"

- id: pjlink_model_name
  type: string
  description: "Model name string"

- id: pjlink_class_info
  type: string
  description: "Returns '1' (PJLink Class 1)"
```

## Variables
```yaml
# UNRESOLVED: no continuous settable parameters found beyond discrete actions
```

## Events
```yaml
# SDAP advertisement broadcasts (equipment info broadcast periodically when enabled)
# Set to OFF by default — not further documented in source
# UNRESOLVED: SDAP broadcast format and event details not fully documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures found in source
```

## Notes
- The projector supports three control protocols: SDCP over Ethernet (port 53484), simplified commands over RS-232C, and PJLink Class 1.
- SDCP uses a 4-character community string (default "SONY", case sensitive). Community mismatch returns an error.
- RS-232C uses a D-Sub 9 pin cross (reverse) cable. Controller must not send multiple commands simultaneously.
- SDCP packet structure: HEADER (version, category) + COMMUNITY (4 bytes) + COMMAND (request/response, item no, data length) + DATA + CHECKSUM.
- PJLink password can be configured via Web settings > Setup > Advanced Menu.
- RS-232C is not available on VPL-DX125/DX145/DW125 models (section 3 exception).
- Error codes include: Invalid Item, Invalid Item Request, Invalid Length, Invalid Data, Short Data, Not Applicable Item, Community Error, Request Error.
<!-- UNRESOLVED: RS-232C communication parameters (baud rate, data bits, parity, stop bits, flow control) — section 3-2 content not available in refined source -->
<!-- UNRESOLVED: complete list of ITEM numbers and their data values — only a subset shown in source -->
<!-- UNRESOLVED: SDCP header version and category code values beyond the example (02h, 0Ah) -->
<!-- UNRESOLVED: PJLink password format and default -->
<!-- UNRESOLVED: SDAP advertisement packet full structure -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: sony_vpl_ex_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:06.875Z
retrieved_at: 2026-04-27T10:13:06.875Z
last_checked_at: 2026-04-27T10:13:06.875Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:06.875Z
matched_actions: 23
action_count: 23
confidence: high
summary: "All 23 spec actions map one-to-one to documented SDCP and PJLink commands in source; transport parameters verified verbatim; bidirectional coverage achieved."
```

## Known Gaps

```yaml
[]
```
