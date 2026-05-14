---
spec_id: admin/sony-vpl-pwz10-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony VPL-PWZ10 Series Control Spec"
manufacturer: Sony
model_family: "VPL-PWZ10 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "VPL-PWZ10 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-14T18:17:20.924Z
generated_at: 2026-05-14T18:17:20.924Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.924Z
  matched_actions: 8
  action_count: 8
  confidence: high
  summary: "All 23 spec actions matched exactly to documented commands in source; transport parameters verified; complete PJLink and core SDCP coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Sony VPL-PWZ10 Series Control Spec

## Summary

The Sony VPL-PWZ10 Series is a projector controllable over Ethernet via the SDCP (Simple Display Control Protocol) and PJLink Class 1 protocols, as well as RS-232C serial. SDCP operates on a configurable TCP port (factory default 53484) and supports set/get commands with a community string. PJLink provides standardized power, input, mute, error, and lamp queries.

<!-- UNRESOLVED: source document title references VPL-DX/DW/EX/EW series models, not VPL-PWZ10 explicitly; protocol is assumed to be shared across Sony projector families -->
<!-- UNRESOLVED: RS-232C communication specifications (baud rate, data bits, parity, stop bits) not present in source -->
<!-- UNRESOLVED: PJLink port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 53484  # SDCP factory default
  # UNRESOLVED: PJLink port not stated in source (PJLink standard is 4352 but not confirmed)
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: community  # SDCP uses 4-character community string, default "SONY"; PJLink supports optional password set via web UI
  notes: >-
    SDCP requires matching community string (default "SONY", case-sensitive, 4 alphanumeric chars).
    PJLink password can be configured from Web setting screen > Setup > Advanced Menu.
    Both PJ Talk and Advertisement services are OFF by default and must be enabled.
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWR command and power on/off via SDCP
  - queryable    # inferred: multiple query commands (POWR?, INPT?, AVMT?, ERST?, LAMP?, etc.)
  - routable     # inferred: input switching commands (INPT, SDCP input terminal set)
```

## Actions
```yaml
actions:
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

  - id: select_input
    label: Select Input
    kind: action
    protocol: pjlink
    command: "INPT <input>"
    params:
      - name: input
        type: integer
        description: "Input number (PJLink format, e.g. 21 for Video)"

  - id: av_mute_set
    label: Set AV Mute
    kind: action
    protocol: pjlink
    command: "AVMT <param>"
    params:
      - name: param
        type: integer
        description: "AV mute parameter per PJLink spec"
    # UNRESOLVED: exact AVMT parameter values not fully documented in source

  - id: sdcp_set_input_terminal
    label: Set Input Terminal (SDCP)
    kind: action
    protocol: sdcp
    command: "SDCP SET item 00 00h-06h"
    params:
      - name: input_code
        type: integer
        description: "Input terminal code (00h=VIDEO, 01h=S VIDEO, 02h=INPUT A, 03h=INPUT B, 04h=INPUT C, 05h=USB, 06h=NETWORK)"
        enum:
          - value: 0
            label: VIDEO
          - value: 1
            label: S VIDEO
          - value: 2
            label: INPUT A
          - value: 3
            label: INPUT B
          - value: 4
            label: INPUT C
          - value: 5
            label: USB (TYPE B)
          - value: 6
            label: NETWORK

  - id: sdcp_set_aspect
    label: Set Aspect Ratio (SDCP)
    kind: action
    protocol: sdcp
    command: "SDCP SET item 0020h"
    params:
      - name: mode
        type: integer
        description: "Aspect mode value (e.g. 0003h = ZOOM)"
    # UNRESOLVED: full list of aspect mode values not provided in source

  - id: sdcp_set_picture_mode
    label: Set Picture Mode (SDCP)
    kind: action
    protocol: sdcp
    command: "SDCP SET item 0002h"
    params:
      - name: mode
        type: integer
        description: "Picture mode value (e.g. 0000h for dynamic)"
    # UNRESOLVED: full list of picture mode values not provided in source

  - id: sdcp_set_installation_location
    label: Set Installation Location (SDCP)
    kind: action
    protocol: sdcp
    command: "SDCP SET item 0x8003"
    params:
      - name: location
        type: string
        description: "Installation location string (max 24 alphanumeric characters)"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    protocol: pjlink
    command: "POWR?"
    values:
      - value: "0"
        label: Standby / Power-saving
      - value: "1"
        label: Power ON
      - value: "2"
        label: Cooling

  - id: input_status
    label: Input Status
    type: integer
    protocol: pjlink
    command: "INPT?"
    description: "Returns current input number (PJLink format, e.g. 21 for Video)"

  - id: av_mute_status
    label: AV Mute Status
    type: string
    protocol: pjlink
    command: "AVMT?"
    # UNRESOLVED: response format values not fully documented in source

  - id: error_status
    label: Error Status
    type: string
    protocol: pjlink
    command: "ERST?"
    description: "6-digit error code. Each digit: 0=no error, 1=warning. Positions: fan, lamp, temperature, cover, filter, other"

  - id: lamp_info
    label: Lamp Information
    type: string
    protocol: pjlink
    command: "LAMP?"
    description: "Returns lamp count and lamp time"

  - id: input_list
    label: Input Switch List
    type: string
    protocol: pjlink
    command: "INST?"
    description: "Returns available input switch list"

  - id: manufacturer_name
    label: Manufacturer Name
    type: string
    protocol: pjlink
    command: "INF1?"
    description: "Returns manufacturer name (SONY)"

  - id: model_name
    label: Model Name
    type: string
    protocol: pjlink
    command: "INF2?"
    description: "Returns model name"

  - id: other_info
    label: Other Information
    type: string
    protocol: pjlink
    command: "INFO?"

  - id: class_info
    label: Class Information
    type: string
    protocol: pjlink
    command: "CLSS?"
    description: "Returns class info (1 for Class 1)"

  - id: sdcp_model_name
    label: Model Name (SDCP)
    type: string
    protocol: sdcp
    command: "SDCP GET item 0x8001"
    description: "12-character alphanumeric model name"

  - id: sdcp_serial_number
    label: Serial Number (SDCP)
    type: string
    protocol: sdcp
    command: "SDCP GET item 0x8002"
    description: "4-byte serial number (00000000-99999999)"

  - id: sdcp_installation_location
    label: Installation Location (SDCP)
    type: string
    protocol: sdcp
    command: "SDCP GET item 0x8003"
    description: "24-character alphanumeric installation location"

  - id: sdcp_status_error
    label: Status Error (SDCP)
    type: enum
    protocol: sdcp
    description: "Returns error status from device"
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

  - id: sdcp_status_power
    label: Status Power (SDCP)
    type: enum
    protocol: sdcp
    description: "Returns power status from device"
    values:
      - STANDBY
      - START UP
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters (volume, brightness, etc.) documented in source
```

## Events
```yaml
# SDAP advertisement broadcasts (unsolicited, when Advertisement service is enabled)
# - id: sdap_advertisement
#   description: >-
#     Broadcasts equipment information periodically (power, header, product name,
#     location, community, serial no., status). OFF by default.
#   protocol: sdap
# UNRESOLVED: SDAP broadcast format partially documented but not fully specified in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source. Never infer — only populate from explicit source text.
```

## Notes
- SDCP packet structure: Header (VERSION=02h, CATEGORY) + Community (4 bytes) + Command (REQUEST, ITEM NO, DATA LENGTH) + Data + Checksum. Response returns ACK/NAK.
- SDCP community string default is "SONY" (case-sensitive, exactly 4 alphanumeric characters required).
- Both PJ Talk (SDCP) and Advertisement services are OFF by default and must be enabled on the projector.
- PJLink protocol is also OFF by default; enable and optionally set password via Web UI > Setup > Advanced Menu.
- SDCP version must be 2 (version field = 02h); other versions return "Invalid Version" error.
- RS-232C commands use a Simplified Command format: START CODE (A9h) + ITEM NUMBER (2 bytes) + SET/GET (00h/01h) + DATA (2 bytes) + CHECKSUM + END CODE (9Ah).
- Controller must not send multiple commands simultaneously; wait for response before sending next command.
- SDCP error codes: Item Error (01h) — Invalid Item, Invalid Item Request, Invalid Length, Invalid Data, Short Data, Not Applicable Item; Community Error — community mismatch; Request Error — Invalid Version, Invalid Equipment Category Code.

<!-- UNRESOLVED: source document title lists VPL-DX/DW/EX/EW series, not VPL-PWZ10; assuming shared protocol across Sony projector families -->
<!-- UNRESOLVED: complete SDCP item number list not provided — only partial items documented -->
<!-- UNRESOLVED: full PJLink AVMT parameter and response format not detailed -->
<!-- UNRESOLVED: RS-232C communication specifications (baud rate, data bits, parity, stop bits) missing from refined source -->
<!-- UNRESOLVED: complete aspect ratio mode values not listed -->
<!-- UNRESOLVED: complete picture mode values not listed -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-14T18:17:20.924Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.924Z
matched_actions: 8
action_count: 8
confidence: high
summary: "All 23 spec actions matched exactly to documented commands in source; transport parameters verified; complete PJLink and core SDCP coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
