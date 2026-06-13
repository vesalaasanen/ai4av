---
spec_id: admin/sharp-pn-c805b-c705b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN-C805B / PN-C705B Control Spec"
manufacturer: Sharp
model_family: PN-C805B
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - PN-C805B
    - PN-C705B
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
  - manualslib.com
  - productadmin.sharp.ca
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PNC805B-C705B_manual_English.pdf
  - https://www.manualslib.com/manual/3130273/Sharp-Pn-C705b.html
  - https://productadmin.sharp.ca/uploads/product_downloads/PNC805B_C705B_C605B_OperationManual-en.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PNC805B-C705B_setup_English.pdf
retrieved_at: 2026-06-11T00:36:38.229Z
last_checked_at: 2026-06-12T19:41:19.322Z
generated_at: 2026-06-12T19:41:19.322Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "no separate variable definitions in source beyond action parameters"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:41:19.322Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched verbatim in source command table with correct transport parameters. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Sharp PN-C805B / PN-C705B Control Spec

## Summary
Sharp PN-C805B and PN-C705B are 80" and 70" class professional LCD monitors with touch panels. This spec covers RS-232C serial control for power, input selection, picture mode, volume, screen adjustments, screen size, and mute operations.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # POWR command for power on/standby
  - routable     # IAVD/ITGD input selection commands
  - queryable    # ???? parameter returns current value; SRNO, MNRD, PXCK, RESO queries
  - levelable    # VOLM volume control, HPOS/VPOS/CLCK/PHSE adjustments
```

## Actions
```yaml
actions:
  - id: power_set
    label: Power Control
    kind: action
    command: "POWR{value}"
    params:
      - name: value
        type: integer
        enum: [0, 1]
        description: "0 = standby, 1 = power on"

  - id: input_toggle
    label: Input Mode Toggle
    kind: action
    command: "ITGD    "
    params: []
    description: Toggle change for input mode

  - id: input_select
    label: Select Input Terminal
    kind: action
    command: "IAVD  {value}"
    params:
      - name: value
        type: integer
        min: 1
        max: 5
        description: Input terminal number (1-5)

  - id: picture_mode_toggle
    label: Picture Mode Toggle
    kind: action
    command: "AVMD  0"
    params: []
    description: Toggle change for picture mode

  - id: picture_mode_standard
    label: Picture Mode Standard
    kind: action
    command: "AVMD  1"
    params: []
    description: Set picture mode to STANDARD

  - id: picture_mode_movie
    label: Picture Mode Movie
    kind: action
    command: "AVMD  2"
    params: []
    description: Set picture mode to MOVIE

  - id: picture_mode_dynamic
    label: Picture Mode Dynamic
    kind: action
    command: "AVMD  5"
    params: []
    description: Set picture mode to DYNAMIC

  - id: picture_mode_dynamic_fixed
    label: Picture Mode Dynamic Fixed
    kind: action
    command: "AVMD  6"
    params: []
    description: Set picture mode to DYNAMIC (FIXED)

  - id: picture_mode_pc
    label: Picture Mode PC
    kind: action
    command: "AVMD  7"
    params: []
    description: Set picture mode to PC

  - id: volume_set
    label: Set Volume
    kind: action
    command: "VOLM{value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Volume level (0-100), 3 digits zero-padded

  - id: hpos_set
    label: Horizontal Position
    kind: action
    command: "HPOS{value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 180
        description: Horizontal position 000-180, D-SUB (PC) only, 3 digits zero-padded

  - id: vpos_set
    label: Vertical Position
    kind: action
    command: "VPOS{value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 120
        description: Vertical position 000-120, D-SUB (PC) only, 3 digits zero-padded

  - id: clock_set
    label: Sampling Clock Frequency
    kind: action
    command: "CLCK{value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 180
        description: Sampling clock frequency 000-180, D-SUB (PC) only, 3 digits zero-padded

  - id: phase_set
    label: Sampling Clock Phase
    kind: action
    command: "PHSE{value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 15
        description: Sampling clock phase 000-015, D-SUB (PC) only, 3 digits zero-padded

  - id: screen_size_toggle
    label: Screen Size Toggle
    kind: action
    command: "WIDE  0"
    params: []
    description: Toggle change for screen size

  - id: screen_size_normal
    label: Screen Size Normal
    kind: action
    command: "WIDE  7"
    params: []
    description: Set screen size to NORMAL

  - id: screen_size_wide
    label: Screen Size Wide
    kind: action
    command: "WIDE  9"
    params: []
    description: Set screen size to WIDE

  - id: screen_size_dot_by_dot
    label: Screen Size Dot by Dot
    kind: action
    command: "WIDE 10"
    params: []
    description: Set screen size to Dot by Dot

  - id: screen_size_underscan
    label: Screen Size Underscan
    kind: action
    command: "WIDE 11"
    params: []
    description: Set screen size to UNDERSCAN

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "MUTE  0"
    params: []
    description: Toggle between mute and unmute

  - id: mute_on
    label: Mute On
    kind: action
    command: "MUTE  1"
    params: []
    description: Mute

  - id: mute_off
    label: Mute Off
    kind: action
    command: "MUTE  2"
    params: []
    description: Unmute

  - id: model_query
    label: Model Name Query
    kind: query
    command: "MNRD0001"
    params: []
    description: Returns the model name

  - id: serial_query
    label: Serial Number Query
    kind: query
    command: "SRNO????"
    params: []
    description: Returns the serial number

  - id: resolution_pc_query
    label: PC Input Resolution Query
    kind: query
    command: "PXCK    "
    params: []
    description: Returns current PC input resolution as hhh,vvv

  - id: resolution_av_query
    label: AV Input Resolution Query
    kind: query
    command: "RESO    "
    params: []
    description: Returns current AV input resolution (e.g. 480i, 480p, 1080i, 720p, 1080p, VGA)

  - id: volume_query
    label: Volume Query
    kind: query
    command: "VOLM????"
    params: []
    description: Returns current volume setting

  - id: power_query
    label: Power State Query
    kind: query
    command: "POWR????"
    params: []
    description: Returns current power state
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ok
    type: string
    values: ["OK"]
    description: Returned when command executed successfully, followed by 0DH return code

  - id: command_err
    type: string
    values: ["ERR"]
    description: Returned when command not recognized or cannot be used in current state

  - id: volume_response
    type: integer
    min: 0
    max: 100
    description: Current volume level returned from VOLM query

  - id: serial_number
    type: string
    description: Serial number returned from SRNO query

  - id: pc_resolution
    type: string
    description: PC input resolution as hhh,vvv from PXCK query

  - id: av_resolution
    type: string
    description: AV input resolution string from RESO query (e.g. 480i, 480p, 1080i, 720p, 1080p, VGA)
```

## Variables
```yaml
# UNRESOLVED: no separate variable definitions in source beyond action parameters
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command format is 4-character command field + 4-character parameter field, terminated by return code (0DH).
- Parameters must be exactly 4 characters, padded with spaces if necessary (e.g. `VOLM030` not `VOLM30`).
- Any set command can be queried by sending `????` as the parameter to return the current value.
- In standby mode, only the POWER CONTROL (POWR) command is accepted.
- Minimum 100ms interval required between command response and next command transmission.
- Command response timeout should be set to 10 seconds or longer.
- If no communication link is established, nothing is returned (not even ERR).
- ERR may be returned due to environmental interference; implement retry logic.
- HPOS, VPOS, CLCK, PHSE commands apply only to D-SUB (PC) input.
- When screen size is changed automatically via HDMI AUTO WIDE, the returned current value is the manually-set value, not the auto-sized value.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
  - manualslib.com
  - productadmin.sharp.ca
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PNC805B-C705B_manual_English.pdf
  - https://www.manualslib.com/manual/3130273/Sharp-Pn-C705b.html
  - https://productadmin.sharp.ca/uploads/product_downloads/PNC805B_C705B_C605B_OperationManual-en.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PNC805B-C705B_setup_English.pdf
retrieved_at: 2026-06-11T00:36:38.229Z
last_checked_at: 2026-06-12T19:41:19.322Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:41:19.322Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched verbatim in source command table with correct transport parameters. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "no separate variable definitions in source beyond action parameters"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
