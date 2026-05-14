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
  - https://content-files.shure.com/KnowledgeBaseFiles/dfr22_rs232.pdf
retrieved_at: 2026-04-30T04:28:59.697Z
last_checked_at: 2026-04-23T08:25:59.202Z
generated_at: 2026-04-23T08:25:59.202Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T08:25:59.202Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 spec actions matched verbatim in source with correct transport parameters and command shapes."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Shure DFR22 Control Spec

## Summary
Shure DFR22 is a digital feedback reduction processor. Control via RS-232 serial at 19200 8N1. Protocol uses D0h prefix and D1h suffix. Commands cover preset recall, input/output channel levels, and matrix mixer routing.

<!-- UNRESOLVED: device may support additional models in DFR Series (e.g., DFR8) — not documented in source -->

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
  type: none  # inferred: no auth procedure in source
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
# QRY - query all parameters
- id: query_all
  label: Query All Parameters
  kind: action
  params: []
  description: Returns state of all parameters as if each queried individually. Format: D0h DFR22 <unit> QRY D1h

# PRE - preset control
- id: preset_set
  label: Set Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Three-digit preset number (e.g., 001)
  description: Sets current preset. Format: D0h DFR22 <unit> PRE <3-digit preset> D1h

- id: preset_query
  label: Query Preset
  kind: action
  params: []
  description: Queries current preset. Format: D0h DFR22 <unit> PRE D1h

# INP - input channel control
- id: input_level_set
  label: Set Input Level
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002, ALL]
    - name: value
      type: integer
      description: Gain value 0-127 (0 = -Infinity, 1-26 = -105 to -42.5dB in 2.5dB steps, 27-127 = -40 to +10dB in 0.5dB steps)
  description: Sets input channel gain level. Format: D0h DFR22 <unit> INP <channel> L 00<byte> D1h

- id: input_level_inc
  label: Increment Input Level
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
    - name: value
      type: integer
      description: Increment amount (0-127)
  description: Increases input gain by supplied value. Format: D0h DFR22 <unit> INP <channel> I <3-digit value> D1h

- id: input_level_dec
  label: Decrement Input Level
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
    - name: value
      type: integer
      description: Decrement amount (0-127)
  description: Decreases input gain by supplied value. Format: D0h DFR22 <unit> INP <channel> D <3-digit value> D1h

- id: input_mute
  label: Set Input Mute
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002, ALL]
    - name: value
      type: enum
      values: [000, 001, 002]
      description: "000 = mute off, 001 = mute on, 002 = toggle"
  description: Sets input mute state. Format: D0h DFR22 <unit> INP <channel> M <3-digit value> D1h

- id: input_sensitivity
  label: Set Input Sensitivity
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
    - name: value
      type: enum
      values: [000, 001, 002]
      description: "000 = +4 dBu, 001 = -10 dBV, 002 = toggle"
  description: Sets input sensitivity. Format: D0h DFR22 <unit> INP <channel> S <3-digit value> D1h

- id: input_polarity
  label: Set Input Polarity
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
    - name: value
      type: enum
      values: [000, 001, 002]
      description: "000 = positive, 001 = negative, 002 = toggle"
  description: Sets input polarity. Format: D0h DFR22 <unit> INP <channel> P <3-digit value> D1h

- id: input_mute_query
  label: Query Input Mute
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
  description: Queries mute status. Format: D0h DFR22 <unit> INP <channel> M D1h

- id: input_sensitivity_query
  label: Query Input Sensitivity
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
  description: Queries sensitivity. Format: D0h DFR22 <unit> INP <channel> S D1h

- id: input_polarity_query
  label: Query Input Polarity
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
  description: Queries polarity. Format: D0h DFR22 <unit> INP <channel> P D1h

# OUT - output channel control
- id: output_level_set
  label: Set Output Level
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002, ALL]
    - name: value
      type: integer
      description: Gain value 0-127
  description: Sets output channel gain level. Format: D0h DFR22 <unit> OUT <channel> L 00<byte> D1h

- id: output_level_inc
  label: Increment Output Level
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
    - name: value
      type: integer
      description: Increment amount
  description: Increases output gain. Format: D0h DFR22 <unit> OUT <channel> I <3-digit value> D1h

- id: output_level_dec
  label: Decrement Output Level
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
    - name: value
      type: integer
      description: Decrement amount
  description: Decreases output gain. Format: D0h DFR22 <unit> OUT <channel> D <3-digit value> D1h

- id: output_mute
  label: Set Output Mute
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002, ALL]
    - name: value
      type: enum
      values: [000, 001, 002]
  description: Sets output mute state. Format: D0h DFR22 <unit> OUT <channel> M <3-digit value> D1h

- id: output_clip
  label: Set Output Clip/Pad
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
    - name: value
      type: enum
      values: [000, 001, 002]
      description: "000 = no pad, 001 = 18dB pad, 002 = 12dB pad"
  description: Sets output clipping pad (OUTPUT ONLY). Format: D0h DFR22 <unit> OUT <channel> C <3-digit value> D1h

- id: output_mute_query
  label: Query Output Mute
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
  description: Queries output mute state.

- id: output_clip_query
  label: Query Output Clip/Pad
  kind: action
  params:
    - name: channel
      type: enum
      values: [001, 002]
  description: Queries output clip/pad state.

# MIX - matrix mixer control
- id: mix_level_set
  label: Set Mix Level
  kind: action
  params:
    - name: mixer
      type: enum
      values: [001, 002]
      description: Mixer number (output strip)
    - name: channel
      type: enum
      values: [001, 002, OUT]
      description: Channel (input strip); OUT for output fader
    - name: value
      type: integer
      description: Gain value 0-127
  description: Sets mix point gain level. Format: D0h DFR22 <unit> MIX <mixer><channel> L <3-digit value> D1h

- id: mix_level_inc
  label: Increment Mix Level
  kind: action
  params:
    - name: mixer
      type: enum
      values: [001, 002]
    - name: channel
      type: enum
      values: [001, 002]
    - name: value
      type: integer
  description: Increases mix point gain.

- id: mix_level_dec
  label: Decrement Mix Level
  kind: action
  params:
    - name: mixer
      type: enum
      values: [001, 002]
    - name: channel
      type: enum
      values: [001, 002]
    - name: value
      type: integer
  description: Decreases mix point gain.

- id: mix_mute
  label: Set Mix Mute
  kind: action
  params:
    - name: mixer
      type: enum
      values: [001, 002]
    - name: channel
      type: enum
      values: [001, 002, OUT]
    - name: value
      type: enum
      values: [000, 001, 002]
  description: Sets mix point mute state.

- id: mix_polarity
  label: Set Mix Polarity
  kind: action
  params:
    - name: mixer
      type: enum
      values: [001, 002]
    - name: channel
      type: enum
      values: [001, 002, OUT]
    - name: value
      type: enum
      values: [000, 001, 002]
  description: Sets mix point polarity.

- id: mix_connect
  label: Connect Mix Route
  kind: action
  params:
    - name: mixer
      type: enum
      values: [001, 002]
      description: Mixer number (output strip)
    - name: channel
      type: enum
      values: [001, 002]
      description: Input channel to route (cannot be OUT)
    - name: value
      type: enum
      values: [000, 001]
      description: "000 = disconnect, 001 = connect"
  description: Routes input channel to output mixer. Format: D0h DFR22 <unit> MIX <mixer><channel> C <3-digit value> D1h

- id: mix_connect_query
  label: Query Mix Connection
  kind: action
  params:
    - name: mixer
      type: enum
      values: [001, 002]
    - name: channel
      type: enum
      values: [001, 002]
  description: Queries mix routing state.
```

## Feedbacks
```yaml
# Device echoes command strings back as acknowledgement.
# Query commands return parameter values.
# Multiple responses when "ALL" used - one per channel.
# UNRESOLVED: exact response string format for each query type not fully detailed in source.
- id: command_echo
  type: string
  description: Device echoes the command string back as acknowledgement

- id: preset_response
  type: string
  description: Response to preset query - returns current preset number

- id: level_response
  type: integer
  description: Response to level query - returns current gain value 0-127

- id: mute_response
  type: enum
  values: [000, 001, 002]
  description: "000 = mute off, 001 = mute on, 002 = toggle state"

- id: sensitivity_response
  type: enum
  values: [000, 001, 002]
  description: "000 = +4 dBu, 001 = -10 dBV, 002 = toggle"

- id: polarity_response
  type: enum
  values: [000, 001, 002]
  description: "000 = positive, 001 = negative, 002 = toggle"

- id: clip_response
  type: enum
  values: [000, 001, 002]
  description: "000 = no pad, 001 = 18dB pad, 002 = 12dB pad"
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

## Provenance

```yaml
source_domains:
  - content-files.shure.com
source_urls:
  - https://content-files.shure.com/KnowledgeBaseFiles/dfr22_rs232.pdf
retrieved_at: 2026-04-30T04:28:59.697Z
last_checked_at: 2026-04-23T08:25:59.202Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:25:59.202Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 spec actions matched verbatim in source with correct transport parameters and command shapes."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
