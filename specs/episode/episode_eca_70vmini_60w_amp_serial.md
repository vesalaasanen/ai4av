---
spec_id: admin/episode-eca-70vmini-60w-amp
schema_version: ai4av-public-spec-v1
revision: 1
title: "Episode ECA-70VMINI-60W Control Spec"
manufacturer: Episode
model_family: ECA-70VMINI-60W
aliases: []
compatible_with:
  manufacturers:
    - Episode
  models:
    - ECA-70VMINI-60W
  firmware: ">=01.00.78.370"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
source_urls:
  - "https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/Amplifiers/ProtocolsAndDrivers/ECA-70MINI-60W_Control%20Protocol.pdf"
retrieved_at: 2026-04-30T04:24:56.337Z
last_checked_at: 2026-06-02T22:06:40.396Z
generated_at: 2026-06-02T22:06:40.396Z
firmware_coverage: ">=01.00.78.370"
protocol_coverage: []
known_gaps:
  - "flow control not stated in source"
  - "no unsolicited event/notification mechanism described in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "flow control setting not stated in source"
  - "no unsolicited event/notification mechanism described"
  - "maximum number of speaker outputs not explicitly stated (commands reference Speaker:1)"
  - "error response format for invalid commands not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:06:40.396Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Episode ECA-70VMINI-60W Control Spec

## Summary
The Episode ECA-70VMINI-60W is a 70V mini amplifier with three audio inputs (balanced, 3.5mm stereo, unbalanced RCA). This spec covers RS-232C serial control including power, input switching, volume, mute, bass/treble EQ, status queries, and factory reset.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off/auto commands
  - routable     # input-to-output audio routing
  - queryable    # status queries for power, volume, bass, treble, mute, input map, firmware
  - levelable    # volume and bass/treble controls
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "System_Power= On\r\n"
    response: "System_Power=On\r\n"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "System_Power= Off\r\n"
    response: "System_Power=Off\r\n"
    params: []

  - id: power_auto
    label: Power Auto
    kind: action
    command: "System_Power= Auto\r\n"
    response: "System_Power=Auto\r\n"
    description: Auto power on to active input, power off when no inputs active
    params: []

  - id: switch_audio_input
    label: Switch Audio Input
    kind: action
    command: "Switch_Audio=Input:{input_type}:{input_number:03d},Output:{output_type}:{output_number:03d}\r\n"
    response: "Switch_Audio=Input:{input_type}:{input_number},Output:{output_type}:{output_number}\r\n"
    params:
      - name: input_type
        type: enum
        values: [Line, Sum]
        description: "Line for a single input, Sum to mix all inputs"
      - name: input_number
        type: integer
        description: "Input number 1-3 (1=Balanced, 2=3.5mm Stereo, 3=Unbalanced RCA)"
      - name: output_type
        type: enum
        values: [Speaker]
        description: Output type
      - name: output_number
        type: integer
        description: "Output speaker number"

  - id: set_volume
    label: Set Volume
    kind: action
    command: "Output_Volume=Output:{output_type}:{output_number:03d},{volume}\r\n"
    response: "Output_Volume=Output:{output_type}:{output_number},{volume:03d}\r\n"
    params:
      - name: output_type
        type: enum
        values: [Speaker]
      - name: output_number
        type: integer
      - name: volume
        type: string
        description: "0-100 for absolute, + to increment, - to decrement"

  - id: mute_on
    label: Mute On
    kind: action
    command: "Output_Mute=Output:{output_type}:{output_number:03d},ON\r\n"
    response: "Output_Mute=Output:{output_type}:{output_number},ON\r\n"
    params:
      - name: output_type
        type: enum
        values: [Speaker]
      - name: output_number
        type: integer

  - id: mute_off
    label: Mute Off
    kind: action
    command: "Output_Mute=Output:{output_type}:{output_number:03d},Off\r\n"
    response: "Output_Mute=Output:{output_type}:{output_number},OFF\r\n"
    params:
      - name: output_type
        type: enum
        values: [Speaker]
      - name: output_number
        type: integer

  - id: set_bass
    label: Set Bass
    kind: action
    command: "Output_Bass=Output:{output_type}:{output_number:03d},{value}\r\n"
    response: "Output_Bass=Output:{output_type}:{output_number},{value_signed}\r\n"
    params:
      - name: output_type
        type: enum
        values: [Speaker]
      - name: output_number
        type: integer
      - name: value
        type: string
        description: "-6 to +6 (even numbers only, step 2dB), + to increment, - to decrement, 0 for flat"

  - id: set_treble
    label: Set Treble
    kind: action
    command: "Output_Treble=Output:{output_type}:{output_number:03d},{value}\r\n"
    response: "Output_Treble=Output:{output_type}:{output_number},{value_signed}\r\n"
    params:
      - name: output_type
        type: enum
        values: [Speaker]
      - name: output_number
        type: integer
      - name: value
        type: string
        description: "-6 to +6 (even numbers only, step 2dB), + to increment, - to decrement, 0 for flat"

  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "SonSSIP_FactoryReset\r\n"
    response: "OK"
    description: "Resets system to factory settings. Response is OK with no CR/LF terminator."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [On, Off, Auto]
    query_command: "Status= Power\r\n"
    query_response: "Status=Power:{state}\r\n"

  - id: input_map
    type: string
    query_command: "Status= MAP : {output_type} : {output_number}\r\n"
    query_response: "Status=MAP:Input:{input_type}:{input_number},Output:{output_type}:{output_number}\r\n"

  - id: volume
    type: integer
    values: "0-100"
    query_command: "Status= Volume : {output_type} : {output_number}\r\n"
    query_response: "Status=Volume:Output:{output_type}:{output_number},{volume:03d}\r\n"

  - id: bass
    type: string
    values: "-6 to +6 (even only)"
    query_command: "Status= Bass : {output_type} : {output_number}\r\n"
    query_response: "Status=Bass:Output:{output_type}:{output_number},{value_signed}\r\n"

  - id: treble
    type: string
    values: "-6 to +6 (even only)"
    query_command: "Status= Treble : {output_type} : {output_number}\r\n"
    query_response: "Status=Treble:Output:{output_type}:{output_number},{value_signed}\r\n"

  - id: mute_state
    type: enum
    values: [ON, OFF]
    query_command: "Status= Mute : {output_type} : {output_number}\r\n"
    query_response: "Status=Mute:Output:{output_type}:{output_number},{state}\r\n"

  - id: firmware_version
    type: string
    query_command: "Status= Firmware , System\r\n"
    query_response: "Status=Firmware,System\r\nVersion{version}\r\n"
```

## Variables
```yaml
variables:
  - id: volume_level
    label: Volume Level
    type: integer
    min: 0
    max: 100
    unit: percent

  - id: bass_level
    label: Bass Level
    type: integer
    min: -6
    max: 6
    unit: dB
    step: 2

  - id: treble_level
    label: Treble Level
    type: integer
    min: -6
    max: 6
    unit: dB
    step: 2
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All commands are terminated with `<CR><LF>`. The factory reset response "OK" is the one documented exception — no `<CR><LF>` follows it.
- Input numbering: 1 = Balanced, 2 = 3.5mm Stereo, 3 = Unbalanced RCA.
- Bass and treble values use even numbers only (-6, -4, -2, 0, +2, +4, +6); odd-number values have no audible effect.
- Volume is expressed as a percentage (0-100), zero-padded to three digits in responses.
- The `Sum` input type on `Switch_Audio` mixes all inputs to the specified output.
- Firmware version 01.00.78.370 or higher is required for this serial protocol.

<!-- UNRESOLVED: flow control setting not stated in source -->
<!-- UNRESOLVED: no unsolicited event/notification mechanism described -->
<!-- UNRESOLVED: maximum number of speaker outputs not explicitly stated (commands reference Speaker:1) -->
<!-- UNRESOLVED: error response format for invalid commands not documented -->

## Provenance

```yaml
source_domains:
  - snapav.com
source_urls:
  - "https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/Amplifiers/ProtocolsAndDrivers/ECA-70MINI-60W_Control%20Protocol.pdf"
retrieved_at: 2026-04-30T04:24:56.337Z
last_checked_at: 2026-06-02T22:06:40.396Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:06:40.396Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not stated in source"
- "no unsolicited event/notification mechanism described in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "flow control setting not stated in source"
- "no unsolicited event/notification mechanism described"
- "maximum number of speaker outputs not explicitly stated (commands reference Speaker:1)"
- "error response format for invalid commands not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
