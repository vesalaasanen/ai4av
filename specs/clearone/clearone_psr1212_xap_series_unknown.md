---
spec_id: admin/clearone-psr1212
schema_version: ai4av-public-spec-v1
revision: 1
title: "ClearOne PSR1212 XAP Series Control Spec"
manufacturer: ClearOne
model_family: PSR1212
aliases: []
compatible_with:
  manufacturers:
    - ClearOne
  models:
    - PSR1212
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - kb.clearone.com
  - keydigital.org
  - officeplusuae.com
source_urls:
  - https://kb.clearone.com
  - https://www.keydigital.org/web/content/86542/ClearOne_Collaborate_ModuleManual.pdf
  - https://officeplusuae.com/wp-content/uploads/2024/11/DOC-0579-001v1.0_BMA_360D_Cmd_Ref_Man_2023_09_27.pdf
retrieved_at: 2026-05-15T09:22:58.682Z
last_checked_at: 2026-05-27T15:36:45.131Z
generated_at: 2026-05-27T15:36:45.131Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T15:36:45.131Z
  matched_actions: 66
  action_count: 66
  confidence: medium
  summary: "All 66 spec actions map one-to-one to the 66 source commands; transport matches."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# ClearOne PSR1212 XAP Series Control Spec

## Summary
ClearOne PSR1212 is an audio DSP conferencing processor in the XAP Series. This spec covers RS-232 serial control via a text-based command protocol. Commands follow the structure `#DEVICE COMMAND [params]` with carriage return termination. The PSR1212 supports 12 inputs, 12 outputs, 8 assignable processing channels, matrix routing, gating, compression, filtering, and preset/macro execution.

<!-- UNRESOLVED: no firmware version compatibility range stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: hardware
auth:
  type: none  # inferred: no auth procedure in source for normal serial mode
```

## Traits
```yaml
- routable     # inferred from MTRX matrix routing commands
- queryable    # inferred from query commands (GATE, LVL, UID, VER, etc.)
- levelable    # inferred from GAIN, RAMP, MTRXLVL volume/gain control
```

## Actions
```yaml
- id: aamb_set
  label: Set Adaptive Ambient Mode
  kind: action
  params:
    - name: channel
      type: integer
      description: "Input channel (1-8)"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: agc_set
  label: Set Automatic Gain Control
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number (see groups)"
    - name: group
      type: string
      description: "1=Inputs(I), 3=Mic(M), 7=Line(L)"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: amblvl_set
  label: Set Ambient Level
  kind: action
  params:
    - name: channel
      type: integer
      description: "Input channel (1-8)"
    - name: value
      type: number
      description: "Ambient level in dB (-80.0 to 0)"

- id: baud_set
  label: Set Baud Rate
  kind: action
  params:
    - name: value
      type: integer
      description: "9600, 19200, 38400, or 57600"

- id: cgroup_set
  label: Set Compressor Group
  kind: action
  params:
    - name: channel
      type: string
      description: "Processing channel (A-H)"
    - name: value
      type: integer
      description: "0=None, 1-4=Compressor group"

- id: chairo_set
  label: Set Chairman Override
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic input (1-4)"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: compress_set
  label: Set Compressor
  kind: action
  params:
    - name: channel
      type: string
      description: "Processing channel (A-H)"
    - name: threshold
      type: integer
      description: "Threshold in dB (-30 to 20)"
    - name: ratio
      type: integer
      description: "Ratio (1 to 20)"
    - name: attack
      type: number
      description: "Attack time in ms (0.00 to 100.00)"
    - name: release
      type: integer
      description: "Release time in ms (100 to 2000)"
    - name: gain
      type: number
      description: "Gain in dB (0.00 to 20.00)"

- id: compsels_set
  label: Set Compression Select
  kind: action
  params:
    - name: channel
      type: string
      description: "Processing channel (A-H)"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: decay_set
  label: Set Decay Rate
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic input (1-8)"
    - name: value
      type: integer
      description: "1=Slow, 2=Medium, 3=Fast"

- id: delay_set
  label: Set Delay
  kind: action
  params:
    - name: channel
      type: string
      description: "Processing channel (A-H)"
    - name: value
      type: number
      description: "Delay in ms (0.00 to 500)"

- id: delaysel_set
  label: Set Delay Select
  kind: action
  params:
    - name: channel
      type: string
      description: "Processing channel (A-H)"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: dfltm_set
  label: Set Default Meter
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel (1-12)"
    - name: group
      type: string
      description: "I=Inputs, O=Outputs, M=Mic Inputs, L=Line Inputs"
    - name: position
      type: string
      description: "I=Input, A=Post-gain, N=Post-gain, G=Post-gating"

- id: did_set
  label: Set Device ID
  kind: action
  params:
    - name: value
      type: integer
      description: "Device ID (0-7)"

- id: filter_set
  label: Set Filter
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "Group identifier"
    - name: node
      type: integer
      description: "Filter node (1-4 for mic, 1-15 for processing)"
    - name: type
      type: integer
      description: "0=None, 1=AllPass, 2=LowPass, 3=HighPass, 4=LowShelf, 5=HighShelf, 6=PEQ, 7=CDHorn, 8=Bessel, 9=Butterworth, 10=LinkwitzRiley, 11=Notch"
    - name: frequency
      type: integer
      description: "Frequency in Hz"
    - name: gain
      type: number
      description: "Gain in dB"
    - name: bandwidth
      type: number
      description: "Bandwidth"

- id: filtsel_set
  label: Set Filter Select
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "M=Mic Inputs, P=Processing Channels"
    - name: node
      type: integer
      description: "Filter node (1-4 mic, 1-15 processing, *=all)"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: flow_set
  label: Set Flow Control
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: fmp_set
  label: Set First Mic Priority
  kind: action
  params:
    - name: channel
      type: string
      description: "Gating group (1-4, A-D)"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: fpp_set
  label: Set Front Panel Passcode
  kind: action
  params:
    - name: code
      type: string
      description: "5-character passcode using buttons 1-5 (1=Up, 2=Enter, 3=Esc, 4=Down, 5=Meter), or CLEAR"

- id: gain_set
  label: Set Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "I=Inputs, O=Outputs, M=Mic Inputs, P=Processing, L=Line Inputs"
    - name: value
      type: number
      description: "Gain in dB (-99 to 99)"
    - name: mode
      type: string
      description: "A=Absolute, R=Relative"

- id: gate_query
  label: Query Gate Status
  kind: query
  params: []

- id: ghold_set
  label: Set Gate Hold Time
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic channel"
    - name: value
      type: number
      description: "Hold time in seconds (0.10-8.00)"

- id: gmode_set
  label: Set Gating Mode
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic input (1-8)"
    - name: value
      type: integer
      description: "1=Auto, 2=Manual On, 3=Manual Off"

- id: gover_set
  label: Set Gating Override
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic input (1-8)"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: gratio_set
  label: Set Gate Ratio
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic input (1-8)"
    - name: value
      type: integer
      description: "Gate ratio in dB (0 to 50)"

- id: greport_set
  label: Set Gate Report
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: grpsel_set
  label: Set Gating Group
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic input (1-8)"
    - name: value
      type: string
      description: "Gating group (1-4, A-D)"

- id: label_set
  label: Set Label
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "I, O, M, G, P, L, E, U, W, S, C"
    - name: in_out
      type: integer
      description: "0=Output, 1=Input (expansion bus only)"
    - name: text
      type: string
      description: "Label text (up to 20 chars), CLEAR to clear"

- id: lfp_set
  label: Set Lock Front Panel
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Unlock, 1=Lock, 2=Toggle, 3=Lock when timed out"

- id: lmo_set
  label: Set Last Mic On Mode
  kind: action
  params:
    - name: channel
      type: string
      description: "Gating group"
    - name: value
      type: string
      description: "0=Disabled, 1-8=Channel, *=Last mic stays on"

- id: lock_set
  label: Set Preset/Macro Lock
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"
    - name: password
      type: string
      description: "Password (required when changing lock state)"

- id: lockprst_set
  label: Set Lock on Preset/Macro
  kind: action
  params:
    - name: channel
      type: integer
      description: "1-32 (Preset) or 1-255 (Macro)"
    - name: group
      type: string
      description: "S=Preset, C=Macro"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: lockpwd_set
  label: Set Lock Password
  kind: action
  params:
    - name: value
      type: string
      description: "Password (1-12 characters)"

- id: lvl_query
  label: Query Level
  kind: query
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "Group identifier"
    - name: position
      type: string
      description: "Meter position"

- id: lvlreport_set
  label: Set Level Report
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "Group identifier"
    - name: position
      type: string
      description: "Meter position"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: lvlrrate_set
  label: Set Level Report Rate
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off (keep list), 1=Off (clear list), 50-1000=Rate in ms"

- id: macro_exec
  label: Execute Macro
  kind: action
  params:
    - name: value
      type: integer
      description: "Macro number (1-255)"

- id: master_set
  label: Set Master Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Master, 2=Slave"

- id: max_set
  label: Set Maximum Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "I, O, M, P, L"
    - name: value
      type: number
      description: "Max gain in dB (-65.00 to 20.00)"

- id: mdmode_set
  label: Set Modem Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: min_set
  label: Set Minimum Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "I, O, M, P, L"
    - name: value
      type: number
      description: "Min gain in dB (-65.00 to 20.00)"

- id: minit_set
  label: Set Modem Init String
  kind: action
  params:
    - name: value
      type: string
      description: "Init string (1-80 chars), CLEAR to clear"

- id: minmax_set
  label: Set Min/Max Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "I, O, M, P, L"
    - name: minimum
      type: number
      description: "Min gain in dB (-65.00 to 20.00)"
    - name: maximum
      type: number
      description: "Max gain in dB (-65.00 to 20.00)"

- id: mline_set
  label: Set Mic/Line Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic input (1-8)"
    - name: value
      type: integer
      description: "0=0dB(line), 1=55dB, 2=25dB"

- id: mmax_set
  label: Set Max Microphones
  kind: action
  params:
    - name: channel
      type: string
      description: "Gating group (1-4, A-D)"
    - name: value
      type: integer
      description: "0=Unlimited, 1-8=Max mics"

- id: mpass_set
  label: Set Modem Password
  kind: action
  params:
    - name: value
      type: string
      description: "Password (0-12 chars), CLEAR to clear"

- id: mtrx_set
  label: Set Matrix Routing
  kind: action
  params:
    - name: src_channel
      type: integer
      description: "Source channel"
    - name: src_group
      type: string
      description: "I, M, P, L, E"
    - name: dest_channel
      type: integer
      description: "Destination channel"
    - name: dest_group
      type: string
      description: "O, P, E"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle, 3=Non-gated(mic), 4=Gated(mic)"

- id: mtrxlvl_set
  label: Set Matrix Level
  kind: action
  params:
    - name: src_channel
      type: integer
      description: "Source channel"
    - name: src_group
      type: string
      description: "I, M, P, L, E"
    - name: dest_channel
      type: integer
      description: "Destination channel"
    - name: dest_group
      type: string
      description: "O, P, E"
    - name: value
      type: number
      description: "Level in dB (-99.99 to 99.99)"
    - name: mode
      type: string
      description: "A=Absolute, R=Relative"

- id: mute_set
  label: Set Mute
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "I, O, M, P, L"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: nom_set
  label: Set NOM Mode
  kind: action
  params:
    - name: channel
      type: integer
      description: "Output channel (1-12)"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: offa_set
  label: Set Off Attenuation
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic input (1-8)"
    - name: value
      type: integer
      description: "Attenuation in dB (0-60)"

- id: paa_set
  label: Set PA Adaptive Mode
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic input (1-8)"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: pp_set
  label: Set Phantom Power
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic input (1-8)"
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: preset_exec
  label: Execute Preset
  kind: action
  params:
    - name: channel
      type: integer
      description: "Preset number (1-32)"
    - name: value
      type: integer
      description: "0=Off, 1=Execute+On, 2=Execute+Off"

- id: prgstring_set
  label: Set Program String
  kind: action
  params:
    - name: id
      type: integer
      description: "String location (0-7)"
    - name: value
      type: string
      description: "String content (1-80 chars), CLEAR to clear"

- id: ramp_set
  label: Set Gain Ramp
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "I, O, M, L, P, T, R"
    - name: rate
      type: number
      description: "Ramp rate in dB/s (-50 to 50, 0=stop)"
    - name: target
      type: number
      description: "Target gain in dB (-65 to 20)"

- id: refsel_set
  label: Set PA/AEC Reference
  kind: action
  params:
    - name: channel
      type: integer
      description: "Mic input (1-8)"
    - name: ref_group
      type: string
      description: "O=Output, E=Expansion bus"
    - name: ref_channel
      type: string
      description: "Reference channel (1-9, O-Z)"

- id: refset_set
  label: Set Reference Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "Virtual reference number (1-4)"
    - name: group
      type: integer
      description: "Output channel to track (1-9)"
    - name: value
      type: integer
      description: "0=None"

- id: serecho_set
  label: Set Serial Echo
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: sermode_set
  label: Set Serial Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Text, 2=Binary"

- id: sftymute_set
  label: Set Safety Mute
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: siggen_set
  label: Set Signal Generator
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: group
      type: string
      description: "I, M, L"
    - name: type
      type: integer
      description: "0=Off, 1=Pink, 2=White, 3=Tone"
    - name: amplitude
      type: integer
      description: "Amplitude in dB (-60 to +20)"
    - name: frequency
      type: integer
      description: "Frequency in Hz (20-20000, tone only)"

- id: sigtout_set
  label: Set Signal Generator Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1-30=Minutes"

- id: string_exec
  label: Execute String
  kind: action
  params:
    - name: id
      type: integer
      description: "String location (0-7)"

- id: tout_set
  label: Set Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1-15=Minutes"

- id: uid_query
  label: Query Unit ID
  kind: query
  params: []

- id: ver_query
  label: Query Firmware Version
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: gate_status
  type: string
  description: "Hex bitmask of mic gate states (mics 1-8)"

- id: level_reading
  type: number
  description: "Level in dB for specified channel/group/position"

- id: unit_id
  type: string
  description: "Unit ID in hexadecimal"

- id: firmware_version
  type: string
  description: "Firmware version string"
```

## Variables
```yaml
# UNRESOLVED: no continuous variable definitions distinct from actions in source
```

## Events
```yaml
- id: gate_change_report
  description: "Gate status report sent on every gate change when GREPORT is on"

- id: level_report
  description: "Level readings reported at configured rate when LVLREPORT is active"
```

## Macros
```yaml
# 255 macros supported (MACRO command, value 1-255). Macro contents programmed via G-Ware.
# UNRESOLVED: macro programming command syntax not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: SFTYMUTE command exists (holds all outputs muted) but no explicit
# safety interlock procedures documented in source
```

## Notes
- Command structure: `#DEVICE COMMAND [params]` terminated by carriage return. DEVICE = device type char + device number (PSR1212 type=4, ID 0-7 or *).
- Commands are case-insensitive; responses are uppercase.
- Null parameter value (blank) queries current state in text mode.
- Wildcard `*` applies command to all channels in a group or all units.
- Expansion bus allows system-wide control from any PSR1212/XAP 800/XAP 400 unit on the network.
- Binary mode supported (SERMODE 2) but binary encoding not documented in source.
- Internal gain range is -65 to +20 dB; values below -65 mute the channel.
- Matrix cross-point internal range is -60 to 0 dB; below -60 mutes.

<!-- UNRESOLVED: binary command format not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - kb.clearone.com
  - keydigital.org
  - officeplusuae.com
source_urls:
  - https://kb.clearone.com
  - https://www.keydigital.org/web/content/86542/ClearOne_Collaborate_ModuleManual.pdf
  - https://officeplusuae.com/wp-content/uploads/2024/11/DOC-0579-001v1.0_BMA_360D_Cmd_Ref_Man_2023_09_27.pdf
retrieved_at: 2026-05-15T09:22:58.682Z
last_checked_at: 2026-05-27T15:36:45.131Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T15:36:45.131Z
matched_actions: 66
action_count: 66
confidence: medium
summary: "All 66 spec actions map one-to-one to the 66 source commands; transport matches."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
