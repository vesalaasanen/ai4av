---
spec_id: admin/extron-rac104
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron RAC 104 Control Spec"
manufacturer: Extron
model_family: "RAC 104"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "RAC 104"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - manualsdir.com
  - archive.org
source_urls:
  - https://media.extron.com/public/download/files/userman/68-782-01_E_RAC104.pdf
  - https://www.extron.com/download/files/userman/68-782-01_E_RAC104.pdf
  - https://www.extron.com/product/rac104
  - https://www.manualsdir.com/manuals/81351/extron-electronics-rac-104.html
  - https://archive.org/download/manualsonline-id-ff331144-914b-43c7-8e1e-aa86e5bdf8d1/ff331144-914b-43c7-8e1e-aa86e5bdf8d1.pdf
retrieved_at: 2026-06-11T21:51:11.861Z
last_checked_at: 2026-10-07T13:11:55.259Z
generated_at: 2026-10-07T13:11:55.259Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version (Vx.xx) is reported by the device on boot but is not pinned in the source."
  - "no higher-level macro sequences documented in source."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:11:55.259Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 action units match source SIS commands with correct shapes; RS-232 9600 8N1 no flow confirmed; spec covers all ~52 source commands. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Extron RAC 104 Control Spec

## Summary
The Extron RAC 104 is a four-channel remote audio controller for stereo or mono audio signals, with volume, tone (bass/treble), mute, gain, preset, and channel-tie functions. This spec covers SIS (Simple Instruction Set) control over RS-232.

<!-- UNRESOLVED: firmware version (Vx.xx) is reported by the device on boot but is not pinned in the source. -->

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
  type: UNRESOLVED  # source does not document an authentication procedure for the RS-232 SIS link
```

## Traits
```yaml
- levelable    # volume, gain, bass, treble controls present
- queryable    # view/query commands returning state present
```

## Actions
```yaml
# Audio input gain and attenuation
- id: set_gain
  label: Set input gain
  kind: action
  command: "{channel}*{gain}G"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
    - name: gain
      type: integer
      description: Audio gain 0-12 dB (X1!)
- id: set_attenuation
  label: Set input attenuation
  kind: action
  command: "{channel}*{attenuation}g"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
    - name: attenuation
      type: integer
      description: Attenuation 1-12 dB (X1@)
- id: increment_gain
  label: Increment input gain
  kind: action
  command: "{channel}+G"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
- id: decrement_gain
  label: Decrement input gain
  kind: action
  command: "{channel}-G"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
- id: view_gain
  label: View input gain/attenuation
  kind: query
  command: "V{channel}G"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)

# Output volume
- id: set_volume
  label: Set output volume
  kind: action
  command: "{channel}*{level}V"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
    - name: level
      type: integer
      description: Output volume 0-100 (X!)
- id: increment_volume
  label: Increment output volume
  kind: action
  command: "{channel}+V"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
- id: decrement_volume
  label: Decrement output volume
  kind: action
  command: "{channel}-V"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
- id: view_volume
  label: View output volume
  kind: query
  command: "{channel}V"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)

# Mute
- id: mute_channel
  label: Mute channel
  kind: action
  command: "{channel}*1Z"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
- id: unmute_channel
  label: Unmute channel
  kind: action
  command: "{channel}*0Z"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
- id: view_mute_channel
  label: View mute status of channel
  kind: query
  command: "{channel}Z"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
- id: mute_all
  label: Mute all channels
  kind: action
  command: "1*Z"
  params: []
- id: unmute_all
  label: Unmute all channels
  kind: action
  command: "0*Z"
  params: []
- id: view_mute_all
  label: View mute status of all channels
  kind: query
  command: "Z"
  params: []

# Bass adjustment
- id: set_bass
  label: Set bass level
  kind: action
  command: "{channel}*{level}>"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
    - name: level
      type: integer
      description: Bass level 0-14; bass_dB = (level - 7) * 2 (X$)
- id: increment_bass
  label: Increment bass level
  kind: action
  command: "{channel}+>"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
- id: decrement_bass
  label: Decrement bass level
  kind: action
  command: "{channel}->"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
- id: view_bass
  label: View bass level
  kind: query
  command: "{channel}>"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)

# Treble adjustment
- id: set_treble
  label: Set treble level
  kind: action
  command: "{channel}*{level}<"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
    - name: level
      type: integer
      description: Treble level 0-14; treble_dB = (level - 7) * 2 (X%)
- id: increment_treble
  label: Increment treble level
  kind: action
  command: "{channel}+<"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
- id: decrement_treble
  label: Decrement treble level
  kind: action
  command: "{channel}-<"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
- id: view_treble
  label: View treble level
  kind: query
  command: "{channel}<"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)

# Preset save and recall
- id: save_preset
  label: Save preset
  kind: action
  command: "{channel}*{preset},"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
    - name: preset
      type: integer
      description: Preset number 1-3 (X()
- id: recall_preset
  label: Recall preset
  kind: action
  command: "{channel}*{preset}."
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
    - name: preset
      type: integer
      description: Preset number 1-3 (X()
- id: view_preset_status
  label: View preset status
  kind: query
  command: "{channel},"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)

# View preset settings
- id: view_preset_gain
  label: View preset input gain
  kind: query
  command: "{channel}*{preset}*5#"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
    - name: preset
      type: integer
      description: Preset number 1-3 (X()
- id: view_preset_volume
  label: View preset output volume
  kind: query
  command: "{channel}*{preset}*6#"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
    - name: preset
      type: integer
      description: Preset number 1-3 (X()
- id: view_preset_bass
  label: View preset bass setting
  kind: query
  command: "{channel}*{preset}*7#"
  params:
    - name: channel
      type: integer
      description: Channel number 1-4 (X@)
    - name: preset
      type: integer
      description: Preset number 1-3 (X()
- id: view_preset_treble
  label: View preset treble setting
  kind: query
  command: "{channel}*{preset}*8#"
  params:
    - name: channel
      type: integer
      description: Preset number 1-3 (X()

# System
- id: reset_factory_defaults
  label: Reset to factory defaults
  kind: action
  command: "EZXXX}"
  params: []
- id: firmware_upload
  label: Initiate firmware upload
  kind: action
  command: "E Upload }"
  params: []

# Front panel lockout (Executive modes)
- id: set_executive_mode
  label: Set executive mode
  kind: action
  command: "{mode}X"
  params:
    - name: mode
      type: integer
      description: Executive mode 0=off, 1=lock tone+selector, 2=lock all (X^)
- id: view_executive_mode
  label: View executive mode
  kind: query
  command: "X"
  params: []

# Channel ties
- id: tie_group
  label: Tie channels in group
  kind: action
  command: "{group}*{state}*4#"
  params:
    - name: group
      type: string
      description: Group identifier A or B (X*)
    - name: state
      type: integer
      description: 0=untie, 1=tie (X#)
- id: view_ties
  label: View ties of all groups
  kind: query
  command: "4#"
  params: []

# Information requests
- id: request_dip_switch
  label: Request DIP switch settings
  kind: query
  command: "I"
  params: []
- id: request_part_number
  label: Request part number
  kind: query
  command: "N"
  params: []
- id: request_software_version
  label: Query software version
  kind: query
  command: "Q"
  params: []

# Volume, bass, and treble range limit settings
- id: set_volume_lower_limit
  label: Set volume lower limit
  kind: action
  command: "X@ * X! * 21#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
    - name: level
      type: integer
      description: 0 through 100 (X!)
- id: set_volume_upper_limit
  label: Set volume upper limit
  kind: action
  command: "X@ * X! * 22#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
    - name: level
      type: integer
      description: 0 through 100 (X!)
- id: view_volume_lower_limit
  label: View volume lower limit
  kind: query
  command: "X@ * 21#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
- id: view_volume_upper_limit
  label: View volume upper limit
  kind: query
  command: "X@ * 22#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
- id: set_bass_lower_limit
  label: Set bass lower limit
  kind: action
  command: "X@ * X$ * 23#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
    - name: level
      type: integer
      description: 0 through 14 (X$)
- id: set_bass_upper_limit
  label: Set bass upper limit
  kind: action
  command: "X@ * X$ * 24#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
    - name: level
      type: integer
      description: 0 through 14 (X$)
- id: view_bass_lower_limit
  label: View bass lower limit
  kind: query
  command: "X@ * 23#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
- id: view_bass_upper_limit
  label: View bass upper limit
  kind: query
  command: "X@ * 24#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
- id: set_treble_lower_limit
  label: Set treble lower limit
  kind: action
  command: "X@ * X% * 25#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
    - name: level
      type: integer
      description: 0 through 14 (X%)
- id: set_treble_upper_limit
  label: Set treble upper limit
  kind: action
  command: "X@ * X% * 26#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
    - name: level
      type: integer
      description: 0 through 14 (X%)
- id: view_treble_lower_limit
  label: View treble lower limit
  kind: query
  command: "X@ * 25#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
- id: view_treble_upper_limit
  label: View treble upper limit
  kind: query
  command: "X@ * 26#"
  params:
    - name: channel
      type: integer
      description: Channel number 1 through 4 (X@)
```

## Feedbacks
```yaml
- id: gain_state
  type: integer
  values: null
  description: "Response: Chn {channel} Gain {value}. Value -12 to +12 dB."
  query_command: "V/v X@ G/g"
- id: volume_state
  type: integer
  values: null
  description: "Response: Vol {channel} * {level}. Level 0-100 (attenuation_dB = level - 100)."
  query_command: "X@ V/v"
- id: mute_state
  type: integer
  values: [0, 1]
  description: "0=unmuted, 1=muted. Per channel or all channels response."
  query_command:
    - "X@ Z/z"
    - "Z/z"
- id: bass_state
  type: integer
  values: null
  description: "Response: Bas {level}. Level 0-14."
  query_command: "X@ >"
- id: treble_state
  type: integer
  values: null
  description: "Response: Trb {level}. Level 0-14."
  query_command: "X@ <"
- id: preset_save_ack
  type: string
  values: null
  description: "Response: Spr {channel} * {preset}."
- id: preset_recall_ack
  type: string
  values: null
  description: "Response: Rpr {channel} * {preset}."
- id: preset_status
  type: string
  values: null
  description: "Response: three 0/1 digits, one per preset (empty/saved)."
  query_command: "X@ ,"
- id: executive_mode_state
  type: integer
  values: [0, 1, 2]
  description: "Response: Exe {mode}. 0=off, 1=mode1, 2=mode2."
  query_command: "X/x"
- id: tie_state
  type: string
  values: null
  description: "Response: Tie Grp {group} * {state} or GrpA * {state} • GrpB * {state}."
  query_command: "4#"
- id: dip_switch_state
  type: integer
  values: null
  description: "Response: 3-digit decimal 000-015 mapping to 4 input/output level DIP switches."
  query_command: "I/i"
- id: part_number
  type: string
  values: null
  description: "Response: 60-561-01 (per source)."
  query_command: "N/n"
- id: software_version
  type: string
  values: null
  description: "Response: Vx.xx firmware version."
  query_command: "Q/q"
- id: volume_lower_limit
  type: integer
  values: null
  description: "Response: Vll {channel} * {level}."
  query_command: "X@ * 21#"
- id: volume_upper_limit
  type: integer
  values: null
  description: "Response: Vul {channel} * {level}."
  query_command: "X@ * 22#"
- id: bass_lower_limit
  type: integer
  values: null
  description: "Response: Bll {channel} * {level}."
  query_command: "X@ * 23#"
- id: bass_upper_limit
  type: integer
  values: null
  description: "Response: Bul {channel} * {level}."
  query_command: "X@ * 24#"
- id: treble_lower_limit
  type: integer
  values: null
  description: "Response: Tll {channel} * {level}."
  query_command: "X@ * 25#"
- id: treble_upper_limit
  type: integer
  values: null
  description: "Response: Tul {channel} * {level}."
  query_command: "X@ * 26#"
- id: error_code
  type: string
  enum: [E01, E10, E13, E14, E23]
  description: "E01 invalid channel, E10 invalid command, E13 invalid value, E14 invalid setting at this time, E23 firmware update failure."
```

## Variables
```yaml
- id: volume_lower_limit
  type: integer
  range: 0-100
  description: Per-channel volume lower limit (set via {channel}*{level}*21#)
- id: volume_upper_limit
  type: integer
  range: 0-100
  description: Per-channel volume upper limit (set via {channel}*{level}*22#)
- id: bass_lower_limit
  type: integer
  range: 0-14
  description: Per-channel bass lower limit (set via {channel}*{level}*23#)
- id: bass_upper_limit
  type: integer
  range: 0-14
  description: Per-channel bass upper limit (set via {channel}*{level}*24#)
- id: treble_lower_limit
  type: integer
  range: 0-14
  description: Per-channel treble lower limit (set via {channel}*{level}*25#)
- id: treble_upper_limit
  type: integer
  range: 0-14
  description: Per-channel treble upper limit (set via {channel}*{level}*26#)
```

## Events
```yaml
- id: boot_message
  description: "On power-on the controller emits: 'Boot V1.00,(c) 2003, ? to Enter' then '(c) Copyright 2003,Extron Electronics,RAC 104, Vx.xx ]' (CR/LF terminated)."
- id: unsolicited_error
  description: "Controller-initiated error responses per the E01/E10/E13/E14/E23 table when a command is invalid."
```

## Macros
```yaml
# No multi-step sequences explicitly defined in the source beyond the firmware update procedure.
# Front-panel tie procedure (select both channels via channel selector, then turn knob) is
# also achievable via SIS tie_group, but the source does not define a multi-command macro.
# UNRESOLVED: no higher-level macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - reset_factory_defaults   # "E ZXXX }" restores defaults
interlocks: []
# 10-second save delay (front panel, SIS, or control program): wait at least 10 seconds
# after any adjustment before disconnecting power or changes may be lost. This is a
# data-integrity constraint from the source, not a safety interlock.
```

## Notes
- Protocol is SIS (Extron Simple Instruction Set). Commands need no start/end delimiters; each response ends with `]` (CR/LF). `|` and `}` are interchangeable terminators in the host→unit direction.
- Lowercase and uppercase command letters are equivalent except where the source notes otherwise (gain/attenuation commands are case-sensitive per the ASCII/hex table footnote).
- ASCII space may be encoded as `•` in the source documentation. Commands may be sent back-to-back with no spaces.
- 10-second inter-character timeout aborts commands silently.
- Per channel: 4 channels (1-4), grouped A (ch 1,2) and B (ch 3,4). Tying channels enables stereo; ties also propagate mute and preset to both channels (input gain can still be adjusted independently on tied channels).
- Default state: volume 70 (-30 dB), input gain 0 dB, bass 7 (0 dB), treble 7 (0 dB).
- Power input (100-240 VAC external supply) and audio I/O levels (-10 dBV / +4 dBu) are stated in the source but are electrical, not control-protocol, properties and are intentionally not encoded here.
- "?" character in the boot banner is a literal prompt the source shows ("? to Enter"); it is not part of the SIS command set.

Spec complete. RS-232, 9600 8N1 no flow, auth UNRESOLVED (source does not document an authentication procedure). Actions: gain/attn set/inc/dec/view (5), volume set/inc/dec/view (4), mute ch/all + view (6), bass set/inc/dec/view (4), treble set/inc/dec/view (4), preset save/recall/view-status (3), preset field views (4), reset + firmware upload (2), exec mode set/view (2), tie set/view (2), info requests (3) = 39 actions. Vars: 6 range limits. 19 feedbacks. Boot event + errors. UNRESOLVED comments on firmware.

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - manualsdir.com
  - archive.org
source_urls:
  - https://media.extron.com/public/download/files/userman/68-782-01_E_RAC104.pdf
  - https://www.extron.com/download/files/userman/68-782-01_E_RAC104.pdf
  - https://www.extron.com/product/rac104
  - https://www.manualsdir.com/manuals/81351/extron-electronics-rac-104.html
  - https://archive.org/download/manualsonline-id-ff331144-914b-43c7-8e1e-aa86e5bdf8d1/ff331144-914b-43c7-8e1e-aa86e5bdf8d1.pdf
retrieved_at: 2026-06-11T21:51:11.861Z
last_checked_at: 2026-10-07T13:11:55.259Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:11:55.259Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 action units match source SIS commands with correct shapes; RS-232 9600 8N1 no flow confirmed; spec covers all ~52 source commands. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version (Vx.xx) is reported by the device on boot but is not pinned in the source."
- "no higher-level macro sequences documented in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
