---
spec_id: admin/sharp-pn70sc5-pn80sc5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN70SC5 PN80SC5 Control Spec"
manufacturer: Sharp
model_family: PN70SC5
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - PN70SC5
    - PN80SC5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.aws.sharp.eu
  - manualslib.com
  - business.sharpusa.com
source_urls:
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/pn70sc5-pn80sc5_ex1_manual_en.pdf
  - "https://www.manualslib.com/manual/2394698/Sharp-Pn-80sc5.html?page=32#manual"
  - "https://www.manualslib.com/manual/2394698/Sharp-Pn-80sc5.html?page=31#manual"
  - https://business.sharpusa.com/pdcommstool
retrieved_at: 2026-06-12T04:59:43.120Z
last_checked_at: 2026-06-12T19:44:57.147Z
generated_at: 2026-06-12T19:44:57.147Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no IP/TCP/HTTP control mentioned; serial-only per source"
  - "no settable variables beyond action-params identified in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "no IP/HTTP control documented"
  - "firmware version compatibility not stated in source"
  - "exact return code byte sequence beyond \"0DH\" not fully specified"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:44:57.147Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions found in source command table with correct parameter formats; transport directly sourced from vendor manual. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sharp PN70SC5 PN80SC5 Control Spec

## Summary

Sharp PN70SC5 and PN80SC5 commercial LCD monitors with RS-232C serial control. Commands use 4-character command field + 4-character parameter field. Volume, input selection, picture mode, screen size, mute, and resolution queries supported.

<!-- UNRESOLVED: no IP/TCP/HTTP control mentioned; serial-only per source -->

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
  - powerable    # power on/off commands
  - queryable    # query commands (volume, resolution, serial no)
  - levelable    # volume control 0-100
```

## Actions
```yaml
actions:
  - id: power_off
    label: Power Off (Standby)
    kind: action
    command: "POWR0000"
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: "POWR0001"
    params: []

  - id: input_toggle
    label: Input Mode Toggle
    kind: action
    command: "ITGD    "
    params: []

  - id: input_select_av
    label: Select AV Input
    kind: action
    command: "IAVD{input}"
    params:
      - name: input
        type: integer
        description: "Input terminal number (1-5)"

  - id: picture_mode_toggle
    label: Picture Mode Toggle
    kind: action
    command: "AVMD0000"
    params: []

  - id: picture_mode_standard
    label: Picture Mode Standard
    kind: action
    command: "AVMD0001"
    params: []

  - id: picture_mode_movie
    label: Picture Mode Movie
    kind: action
    command: "AVMD0002"
    params: []

  - id: picture_mode_dynamic
    label: Picture Mode Dynamic
    kind: action
    command: "AVMD0005"
    params: []

  - id: picture_mode_dynamic_fixed
    label: Picture Mode Dynamic (Fixed)
    kind: action
    command: "AVMD0006"
    params: []

  - id: picture_mode_pc
    label: Picture Mode PC
    kind: action
    command: "AVMD0007"
    params: []

  - id: volume_set
    label: Set Volume
    kind: action
    command: "VOLM{level}"
    params:
      - name: level
        type: integer
        description: "Volume level (000-100, 3 digits zero-padded)"

  - id: screen_hpos
    label: Horizontal Position Adjust
    kind: action
    command: "HPOS{pos}"
    params:
      - name: pos
        type: integer
        description: "Horizontal position (000-180, D-SUB PC only, 3 digits zero-padded)"

  - id: screen_vpos
    label: Vertical Position Adjust
    kind: action
    command: "VPOS{pos}"
    params:
      - name: pos
        type: integer
        description: "Vertical position (000-120, D-SUB PC only, 3 digits zero-padded)"

  - id: screen_clock
    label: Sampling Clock Frequency
    kind: action
    command: "CLCK{val}"
    params:
      - name: val
        type: integer
        description: "Clock frequency (000-180, D-SUB PC only, 3 digits zero-padded)"

  - id: screen_phase
    label: Sampling Clock Phase
    kind: action
    command: "PHSE{val}"
    params:
      - name: val
        type: integer
        description: "Phase (000-015, D-SUB PC only, 3 digits zero-padded)"

  - id: screen_size_toggle
    label: Screen Size Toggle
    kind: action
    command: "WIDE0000"
    params: []

  - id: screen_size_normal
    label: Screen Size Normal
    kind: action
    command: "WIDE0007"
    params: []

  - id: screen_size_wide
    label: Screen Size Wide
    kind: action
    command: "WIDE0009"
    params: []

  - id: screen_size_dot_by_dot
    label: Screen Size Dot by Dot
    kind: action
    command: "WIDE0010"
    params: []

  - id: screen_size_underscan
    label: Screen Size Underscan
    kind: action
    command: "WIDE0011"
    params: []

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "MUTE0000"
    params: []

  - id: mute_on
    label: Mute On
    kind: action
    command: "MUTE0001"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "MUTE0002"
    params: []

  - id: query_model
    label: Query Model Name
    kind: query
    command: "MNRD0001"
    params: []

  - id: query_serial
    label: Query Serial Number
    kind: query
    command: "SRNO????"
    params: []

  - id: query_input_resolution_pc
    label: Query Input Resolution (PC)
    kind: query
    command: "PXCK????"
    params: []

  - id: query_input_resolution_av
    label: Query Input Resolution (AV)
    kind: query
    command: "RESO????"
    params: []

  - id: query_volume
    label: Query Volume Level
    kind: query
    command: "VOLM????"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ok
    type: enum
    values: ["OK"]
    description: "Returned (with 0DH return code) when command executed correctly"

  - id: command_err
    type: enum
    values: ["ERR"]
    description: "Returned (with 0DH return code) when command fails or is invalid"

  - id: volume_level
    type: integer
    description: "Volume level returned in response to VOLM???? query"

  - id: model_name
    type: string
    description: "Model name returned in response to MNRD0001 query"

  - id: serial_number
    type: string
    description: "Serial number returned in response to SRNO???? query"

  - id: input_resolution_pc
    type: string
    description: "PC input resolution as hhh,vvv returned by PXCK???? query"

  - id: input_resolution_av
    type: string
    description: "AV input resolution (480i, 480p, 1080i, 720p, 1080p, VGA, etc.) returned by RESO???? query"
```

## Variables
```yaml
# UNRESOLVED: no settable variables beyond action-params identified in source
```

## Events
```yaml
# No unsolicited notifications documented. Device only responds to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

- Command format: 4-character command field + 4-character parameter field. Parameters must be exactly 4 characters, padded with spaces if needed.
- Query uses `????` as parameter to request current value.
- 100ms minimum interval required between command response and next command transmission.
- Command response timeout should be set to 10 seconds or longer.
- In standby mode, only POWER CONTROL command is usable.
- `HPOS`, `VPOS`, `CLCK`, `PHSE` commands apply only to D-SUB (PC analog) input.
- Nothing returned if physical connection not established (not even ERR).

<!-- UNRESOLVED: no IP/HTTP control documented -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact return code byte sequence beyond "0DH" not fully specified -->

## Provenance

```yaml
source_domains:
  - docs.aws.sharp.eu
  - manualslib.com
  - business.sharpusa.com
source_urls:
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/pn70sc5-pn80sc5_ex1_manual_en.pdf
  - "https://www.manualslib.com/manual/2394698/Sharp-Pn-80sc5.html?page=32#manual"
  - "https://www.manualslib.com/manual/2394698/Sharp-Pn-80sc5.html?page=31#manual"
  - https://business.sharpusa.com/pdcommstool
retrieved_at: 2026-06-12T04:59:43.120Z
last_checked_at: 2026-06-12T19:44:57.147Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:44:57.147Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions found in source command table with correct parameter formats; transport directly sourced from vendor manual. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no IP/TCP/HTTP control mentioned; serial-only per source"
- "no settable variables beyond action-params identified in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "no IP/HTTP control documented"
- "firmware version compatibility not stated in source"
- "exact return code byte sequence beyond \"0DH\" not fully specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
