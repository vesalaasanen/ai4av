---
spec_id: admin/shure-dfr22
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure DFR22 Control Spec"
manufacturer: Shure
model_family: DFR22
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - DFR22
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - content-files.shure.com
source_urls:
  - https://content-files.shure.com/Pubs2/files/259899.pdf
retrieved_at: 2026-09-26T14:23:14.963Z
last_checked_at: 2026-09-26T14:23:14.963Z
generated_at: 2026-09-26T14:23:14.963Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "supported preset-number range.'"
  - "full amount range and formatting beyond documented examples.'"
  - "source mixer-L encoding contradicts its example. Request family and parameters retained for coverage, but no guessed executable command is provided.'"
  - "other values, including whether000 disconnects.'"
  - "variables for read/write parameters not explicitly separated from actions in source."
  - "no unsolicited event notifications described in source."
  - "no multi-step macro sequences described in source."
  - "no safety warnings or interlock procedures in source."
  - "firmware version compatibility not stated"
  - "power on/off commands not present in source"
  - "exact response format for QRY command not detailed"
  - "error codes/negative acknowledgements not documented"
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:14.963Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 units match DFR22 source; MIX L encoding and contradictory mixer replies are explicitly unresolved, with no guessed setter bytes. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Shure DFR22 Control Spec

## Summary
Shure DFR22 is a digital feedback reduction processor. Control via RS-232 serial at 19200 8N1. Protocol uses D0h prefix and D1h suffix. Commands cover preset recall, input/output channel levels, and matrix mixer routing.

<!-- Scope: DFR22 only. No additional DFR family model is inferred. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # authentication is not established by this source
```

## Traits
```yaml
# From command examples:
# - powerable: UNRESOLVED - no power on/off commands in source
# - queryable: yes (QRY command, query forms for most subcommands)
# - routable: yes (MIX connection commands route input to output)
# - levelable: yes (L subcommand with 0-127 range)
traits:
  - queryable
  - routable
  - levelable
```

## Actions
```yaml
- id: query_all
  label: Query All Parameters
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
  description: QRY returns each parameter as if individually queried.
  command: <D0h>DFR22{unit}QRY<D1h>
- id: preset_set
  label: Set Preset
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: preset
      type: string
      description: 'Required three-character preset field;001 recalls preset1. UNRESOLVED: supported preset-number range.'
  description: Recall preset.
  command: <D0h>DFR22{unit}PRE{preset}<D1h>
- id: preset_query
  label: Query Preset
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
  description: Query current preset by omitting value.
  command: <D0h>DFR22{unit}PRE<D1h>
- id: input_level_set
  label: Set Input Level
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: integer
      description: Gain0–127:0=-Infinity;1–26=-105 to-42.5dB in2.5dB steps;27–127=-40 to+10dB in0.5dB steps. INP/OUT encode ASCII00 then one raw unsigned8-bit value byte.
  description: Set gain.
  command: <D0h>DFR22{unit}INP{channel}L00{value}<D1h>
- id: input_level_inc
  label: Increment Input Level
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: string
      description: 'Supplied increment/decrement amount. I example005 increases5 gain-table steps. UNRESOLVED: full amount range and formatting beyond documented examples.'
  description: Increase gain by supplied amount.
  command: <D0h>DFR22{unit}INP{channel}I{value}<D1h>
- id: input_level_dec
  label: Decrement Input Level
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: string
      description: 'Supplied increment/decrement amount. I example005 increases5 gain-table steps. UNRESOLVED: full amount range and formatting beyond documented examples.'
  description: Decrease gain by supplied amount.
  command: <D0h>DFR22{unit}INP{channel}D{value}<D1h>
- id: input_mute
  label: Set Input Mute
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: enum
      description: 'Three ASCII characters: 000=off,001=on,002=toggle.'
      values:
        - '000'
        - '001'
        - '002'
  description: Set mute.
  command: <D0h>DFR22{unit}INP{channel}M{value}<D1h>
- id: input_sensitivity
  label: Set Input Sensitivity
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: enum
      description: 'Three ASCII characters: 000=+4dBu,001=-10dBV,002=toggle.'
      values:
        - '000'
        - '001'
        - '002'
  description: Set sensitivity.
  command: <D0h>DFR22{unit}INP{channel}S{value}<D1h>
- id: input_polarity
  label: Set Input Polarity
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: enum
      description: 'Three ASCII characters: 000=positive,001=negative,002=toggle.'
      values:
        - '000'
        - '001'
        - '002'
  description: Set polarity.
  command: <D0h>DFR22{unit}INP{channel}P{value}<D1h>
- id: input_mute_query
  label: Query Input Mute
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
  description: Query mute by omitting value.
  command: <D0h>DFR22{unit}INP{channel}M<D1h>
- id: input_sensitivity_query
  label: Query Input Sensitivity
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
  description: Query sensitivity by omitting value.
  command: <D0h>DFR22{unit}INP{channel}S<D1h>
- id: input_polarity_query
  label: Query Input Polarity
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
  description: Query polarity by omitting value.
  command: <D0h>DFR22{unit}INP{channel}P<D1h>
- id: output_level_set
  label: Set Output Level
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: integer
      description: Gain0–127:0=-Infinity;1–26=-105 to-42.5dB in2.5dB steps;27–127=-40 to+10dB in0.5dB steps. INP/OUT encode ASCII00 then one raw unsigned8-bit value byte.
  description: Set gain.
  command: <D0h>DFR22{unit}OUT{channel}L00{value}<D1h>
- id: output_level_inc
  label: Increment Output Level
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: string
      description: 'Supplied increment/decrement amount. I example005 increases5 gain-table steps. UNRESOLVED: full amount range and formatting beyond documented examples.'
  description: Increase gain by supplied amount.
  command: <D0h>DFR22{unit}OUT{channel}I{value}<D1h>
- id: output_level_dec
  label: Decrement Output Level
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: string
      description: 'Supplied increment/decrement amount. I example005 increases5 gain-table steps. UNRESOLVED: full amount range and formatting beyond documented examples.'
  description: Decrease gain by supplied amount.
  command: <D0h>DFR22{unit}OUT{channel}D{value}<D1h>
- id: output_mute
  label: Set Output Mute
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: enum
      description: 'Three ASCII characters: 000=off,001=on,002=toggle.'
      values:
        - '000'
        - '001'
        - '002'
  description: Set mute.
  command: <D0h>DFR22{unit}OUT{channel}M{value}<D1h>
- id: output_clip
  label: Set Output Clip/Pad
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: enum
      description: Three ASCII characters:000=no pad,001=18dB pad,002=12dB pad.
      values:
        - '000'
        - '001'
        - '002'
  description: Set output pad.
  command: <D0h>DFR22{unit}OUT{channel}C{value}<D1h>
- id: output_mute_query
  label: Query Output Mute
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
  description: Query mute by omitting value.
  command: <D0h>DFR22{unit}OUT{channel}M<D1h>
- id: output_clip_query
  label: Query Output Clip/Pad
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
  description: Query clip by omitting value.
  command: <D0h>DFR22{unit}OUT{channel}C<D1h>
- id: mix_level_set
  label: Set Mix Level
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: mixer
      type: enum
      description: Required three-character output-strip mixer number.
      values:
        - '001'
        - '002'
    - name: channel
      type: enum
      description: Required input-strip identifier; OUT addresses output fader except connection C.
      values:
        - '001'
        - '002'
        - OUT
    - name: value
      type: integer
      description: 'Gain0–127 using the documented gain table. UNRESOLVED wire encoding: MIX subcommand text requires00<byte> but MIX example usesL100; do not choose one silently.'
  description: Set gain.
  notes: 'UNRESOLVED: source mixer-L encoding contradicts its example. Request family and parameters retained for coverage, but no guessed executable command is provided.'
- id: mix_level_inc
  label: Increment Mix Level
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: mixer
      type: enum
      description: Required three-character output-strip mixer number.
      values:
        - '001'
        - '002'
    - name: channel
      type: enum
      description: Required input-strip identifier; OUT addresses output fader except connection C.
      values:
        - '001'
        - '002'
        - OUT
    - name: value
      type: string
      description: 'Supplied increment/decrement amount. I example005 increases5 gain-table steps. UNRESOLVED: full amount range and formatting beyond documented examples.'
  description: Increase gain by supplied amount.
  command: <D0h>DFR22{unit}MIX{mixer}{channel}I{value}<D1h>
- id: mix_level_dec
  label: Decrement Mix Level
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: mixer
      type: enum
      description: Required three-character output-strip mixer number.
      values:
        - '001'
        - '002'
    - name: channel
      type: enum
      description: Required input-strip identifier; OUT addresses output fader except connection C.
      values:
        - '001'
        - '002'
        - OUT
    - name: value
      type: string
      description: 'Supplied increment/decrement amount. I example005 increases5 gain-table steps. UNRESOLVED: full amount range and formatting beyond documented examples.'
  description: Decrease gain by supplied amount.
  command: <D0h>DFR22{unit}MIX{mixer}{channel}D{value}<D1h>
- id: mix_mute
  label: Set Mix Mute
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: mixer
      type: enum
      description: Required three-character output-strip mixer number.
      values:
        - '001'
        - '002'
    - name: channel
      type: enum
      description: Required input-strip identifier; OUT addresses output fader except connection C.
      values:
        - '001'
        - '002'
        - OUT
    - name: value
      type: enum
      description: 'Three ASCII characters: 000=off,001=on,002=toggle.'
      values:
        - '000'
        - '001'
        - '002'
  description: Set mute.
  command: <D0h>DFR22{unit}MIX{mixer}{channel}M{value}<D1h>
- id: mix_polarity
  label: Set Mix Polarity
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: mixer
      type: enum
      description: Required three-character output-strip mixer number.
      values:
        - '001'
        - '002'
    - name: channel
      type: enum
      description: Required input-strip identifier; OUT addresses output fader except connection C.
      values:
        - '001'
        - '002'
        - OUT
    - name: value
      type: enum
      description: 'Three ASCII characters: 000=positive,001=negative,002=toggle.'
      values:
        - '000'
        - '001'
        - '002'
  description: Set polarity.
  command: <D0h>DFR22{unit}MIX{mixer}{channel}P{value}<D1h>
- id: mix_connect
  label: Connect Mix Route
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: mixer
      type: enum
      description: Required three-character output-strip mixer number.
      values:
        - '001'
        - '002'
    - name: channel
      type: enum
      description: Required input-strip identifier; OUT addresses output fader except connection C.
      values:
        - '001'
        - '002'
    - name: value
      type: string
      description: 'Required connection value; only001 is explicitly exemplified. UNRESOLVED: other values, including whether000 disconnects.'
  description: Route selected input to mixer output; no disconnect value is inferred.
  command: <D0h>DFR22{unit}MIX{mixer}{channel}C{value}<D1h>
- id: mix_connect_query
  label: Query Mix Connection
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: mixer
      type: enum
      description: Required three-character output-strip mixer number.
      values:
        - '001'
        - '002'
    - name: channel
      type: enum
      description: Required input-strip identifier; OUT addresses output fader except connection C.
      values:
        - '001'
        - '002'
  description: Query connect by omitting value.
  command: <D0h>DFR22{unit}MIX{mixer}{channel}C<D1h>
- id: input_level_query
  label: Input Level Query
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
  description: Query level by omitting value.
  command: <D0h>DFR22{unit}INP{channel}L<D1h>
- id: output_level_query
  label: Output Level Query
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
  description: Query level by omitting value.
  command: <D0h>DFR22{unit}OUT{channel}L<D1h>
- id: output_sensitivity
  label: Output Sensitivity
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: enum
      description: 'Three ASCII characters: 000=+4dBu,001=-10dBV,002=toggle.'
      values:
        - '000'
        - '001'
        - '002'
  description: Set sensitivity.
  command: <D0h>DFR22{unit}OUT{channel}S{value}<D1h>
- id: output_sensitivity_query
  label: Output Sensitivity Query
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
  description: Query sensitivity by omitting value.
  command: <D0h>DFR22{unit}OUT{channel}S<D1h>
- id: output_polarity
  label: Output Polarity
  kind: action
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
    - name: value
      type: enum
      description: 'Three ASCII characters: 000=positive,001=negative,002=toggle.'
      values:
        - '000'
        - '001'
        - '002'
  description: Set polarity.
  command: <D0h>DFR22{unit}OUT{channel}P{value}<D1h>
- id: output_polarity_query
  label: Output Polarity Query
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: channel
      type: enum
      description: Required three-character channel identifier; ALL broadcasts to both inputs/outputs.
      values:
        - '001'
        - '002'
        - ALL
  description: Query polarity by omitting value.
  command: <D0h>DFR22{unit}OUT{channel}P<D1h>
- id: mix_level_query
  label: Mix Level Query
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: mixer
      type: enum
      description: Required three-character output-strip mixer number.
      values:
        - '001'
        - '002'
    - name: channel
      type: enum
      description: Required input-strip identifier; OUT addresses output fader except connection C.
      values:
        - '001'
        - '002'
        - OUT
  description: Query level by omitting value.
  command: <D0h>DFR22{unit}MIX{mixer}{channel}L<D1h>
- id: mix_mute_query
  label: Mix Mute Query
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: mixer
      type: enum
      description: Required three-character output-strip mixer number.
      values:
        - '001'
        - '002'
    - name: channel
      type: enum
      description: Required input-strip identifier; OUT addresses output fader except connection C.
      values:
        - '001'
        - '002'
        - OUT
  description: Query mute by omitting value.
  command: <D0h>DFR22{unit}MIX{mixer}{channel}M<D1h>
- id: mix_polarity_query
  label: Mix Polarity Query
  kind: query
  params:
    - name: unit
      type: string
      description: Required configured three-character device ID; source example001. No device-ID numeric range is stated.
    - name: mixer
      type: enum
      description: Required three-character output-strip mixer number.
      values:
        - '001'
        - '002'
    - name: channel
      type: enum
      description: Required input-strip identifier; OUT addresses output fader except connection C.
      values:
        - '001'
        - '002'
        - OUT
  description: Query polarity by omitting value.
  command: <D0h>DFR22{unit}MIX{mixer}{channel}P<D1h>
```

## Feedbacks
```yaml
- id: command_echo
  type: string
  description: Documented setters return parameter responses; I/D return the resulting L value rather than echoing the increment/decrement request. MIX example reply identifiers are inconsistent and remain UNRESOLVED.
- id: preset_response
  type: string
  description: Response to preset query - returns current preset number
- id: level_response
  type: integer
  description: Response to level query - returns current gain value 0-127
- id: mute_response
  type: string
  description: Returned current value; exact response value domain UNRESOLVED.002 is documented as a toggle request, not a persistent state.
- id: sensitivity_response
  type: string
  description: Returned current value; exact response value domain UNRESOLVED.002 is documented as a toggle request, not a persistent state.
- id: polarity_response
  type: string
  description: Returned current value; exact response value domain UNRESOLVED.002 is documented as a toggle request, not a persistent state.
- id: clip_response
  type: enum
  values:
    - '000'
    - '001'
    - '002'
  description: 000 = no pad, 001 = 18dB pad, 002 = 12dB pad
```

## Variables
```yaml
# UNRESOLVED: variables for read/write parameters not explicitly separated from actions in source.
# All settable parameters documented as actions above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes

**Serial string format:** `<D0h>DFR22<unit number><command><identifiers><sub-command><value><D1h>`

- Prefix byte: D0h (208 decimal)
- Suffix byte: D1h (209 decimal)
- Unit number: 3-character device ID (e.g., "001")
- Omitting value triggers query; device returns current value

**Gain table:**
| Byte value | Gain |
|---|---|
| 0 | -Infinity |
| 1-26 | -105 to -42.5 dB (2.5 dB steps) |
| 27-127 | -40 to +10 dB (0.5 dB steps) |

**When "ALL" used for input commands:** Separate response returned from each channel.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: power on/off commands not present in source -->
<!-- UNRESOLVED: exact response format for QRY command not detailed -->
<!-- UNRESOLVED: error codes/negative acknowledgements not documented -->

Wire encoding: `<D0h>` and `<D1h>` are single raw prefix/suffix bytes, not printable bracketed text. Other literal protocol fields and identifiers are ASCII; concatenate them without added spaces or a CR terminator. Every request requires its own three-character unit ID. For input/output L setters only, `00{value}` means two ASCII zero characters followed by one raw byte0–127; it does not mean the decimal digits of the gain. I/D amounts are supplied fields; no unsupported numeric limit is asserted. Query forms omit the value entirely; I/D have no query form. ALL produces one response per addressed input/output channel.

The35 operation units cover QRY1, PRE2, INP10, OUT12 and MIX10. Newly represented query forms and output sensitivity/polarity follow the source's explicit shared input/output subcommand table. Existing IDs are retained. Firmware applicability and authentication remain UNRESOLVED.

Source ambiguity: MIX L prose specifies `00<byte>`, while its example sends `MIX001OUTL100`; the example replies for mixer increment/connection also contain INP/OUT where the request uses MIX. The draft does not silently choose an encoding or treat those reply typos as normative schemas. Mute/sensitivity/polarity002 is a toggle request; response value sets are not asserted to include a persistent toggle state. MIX C example001 routes an input;000 disconnect is not documented.

## Provenance

```yaml
source_domains:
  - content-files.shure.com
source_urls:
  - https://content-files.shure.com/Pubs2/files/259899.pdf
retrieved_at: 2026-09-26T14:23:14.963Z
last_checked_at: 2026-09-26T14:23:14.963Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:14.963Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 units match DFR22 source; MIX L encoding and contradictory mixer replies are explicitly unresolved, with no guessed setter bytes. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "supported preset-number range.'"
- "full amount range and formatting beyond documented examples.'"
- "source mixer-L encoding contradicts its example. Request family and parameters retained for coverage, but no guessed executable command is provided.'"
- "other values, including whether000 disconnects.'"
- "variables for read/write parameters not explicitly separated from actions in source."
- "no unsolicited event notifications described in source."
- "no multi-step macro sequences described in source."
- "no safety warnings or interlock procedures in source."
- "firmware version compatibility not stated"
- "power on/off commands not present in source"
- "exact response format for QRY command not detailed"
- "error codes/negative acknowledgements not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
