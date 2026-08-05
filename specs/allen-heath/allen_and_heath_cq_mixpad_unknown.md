---
spec_id: admin/allen-heath-cq
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath CQ Control Spec"
manufacturer: "Allen & Heath"
model_family: CQ
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - CQ
  firmware: "\"V1.2\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/CQ_MIDI_Protocol_V1_2_0_iss4.pdf
  - https://www.allen-heath.com/content/uploads/2024/06/CQ_MIDI_Protocol_V1_2_0_iss1.pdf
  - https://www.allen-heath.com
retrieved_at: 2026-07-13T18:53:53.993Z
last_checked_at: 2026-07-21T20:01:02.435Z
generated_at: 2026-07-21T20:01:02.435Z
firmware_coverage: "\"V1.2\""
protocol_coverage: []
known_gaps:
  - "specific CQ hardware model variants (CQ-18T, CQ-20B, CQ-60T) not distinguished in source; source refers to \"CQ\" generically"
  - "no additional macro sequences described in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "full input-to-output level/pan MB/LB matrix not reproduced inline (300+ entries); see source Reference Tables sections 3.4-3.6"
  - "number of CQ soft keys beyond keys 1-3 not stated; source table only lists three"
  - "CQ hardware model variants (CQ-18T / CQ-20B / CQ-60T) not distinguished"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:01:02.435Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions match verbatim source commands with correct wire patterns, parameter shapes, and transport port 51325; 100% bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Allen & Heath CQ Control Spec

## Summary
The Allen & Heath CQ is a compact digital mixer controllable via MIDI. The CQ sends and receives MIDI over USB (USB-B class-compliant MIDI device) and over Ethernet using MIDI over TCP/IP (network port). All control messaging uses MIDI Channel 1. This spec covers scene recall, soft key triggering, mute control, level control, pan/balance control, and parameter value queries via MIDI NRPN messages.

<!-- UNRESOLVED: specific CQ hardware model variants (CQ-18T, CQ-20B, CQ-60T) not distinguished in source; source refers to "CQ" generically -->

## Transport
```yaml
# MIDI over TCP/IP documented on port 51325. MIDI over USB also supported
# (class-compliant USB MIDI via USB-B port) but USB-MIDI is not represented
# in the standard protocol enum; TCP is the primary network transport.
protocols:
  - tcp
addressing:
  port: 51325  # stated: "send messages to the CQ's IP address and use port 51325"
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - levelable  # inferred: level (fader) control commands present
  - queryable  # inferred: "Getting values" / get commands present
```

## Actions
```yaml
# All commands use MIDI Channel 1 (0xB0 = CC ch1, 0x90 = NoteOn ch1, 0x80 = NoteOff ch1,
# 0xC0 = ProgramChange ch1). Source omits the "0x" prefix; hex values shown verbatim.
# NRPN addressing uses MSB (MB) / LSB (LB) parameter numbers from the reference tables.
# See Notes for the full MSB/LSB parameter address tables.
#
# Scene recall (bank change + program change). PG = program 00-7F; CQ scene = PG + 1.
- id: scene_recall
  label: Scene Recall
  kind: action
  command: "B0 00 00 C0 {PG}"
  params:
    - name: PG
      type: string
      description: "Program value 00-7F (hex). CQ scene number = decimal(PG) + 1 (offset -1). Scene must exist as saved scene."

# Soft Key press (Note On). SK = soft key note hex. Key1=30, Key2=31, Key3=32 (C3,C#3,D3).
- id: soft_key_press
  label: Soft Key Press
  kind: action
  command: "90 {SK} 7F"
  params:
    - name: SK
      type: string
      description: "Soft key note hex. SK1=30, SK2=31, SK3=32. (Some apps use C2/C4 octave designation.)"

# Soft Key release (Note Off).
- id: soft_key_release
  label: Soft Key Release
  kind: action
  command: "80 {SK} 00"
  params:
    - name: SK
      type: string
      description: "Soft key note hex. SK1=30, SK2=31, SK3=32."

# Mute On (NRPN absolute). MB/LB = mute parameter number for target channel.
- id: mute_on
  label: Mute On
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 00 B0 26 01"
  params:
    - name: MB
      type: string
      description: "MSB parameter number (hex) for target channel/route. See Mute Parameter Numbers in Notes."
    - name: LB
      type: string
      description: "LSB parameter number (hex) for target channel/route. See Mute Parameter Numbers in Notes."

# Mute Off (NRPN absolute).
- id: mute_off
  label: Mute Off
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 00 B0 26 00"
  params:
    - name: MB
      type: string
      description: "MSB parameter number (hex). See Mute Parameter Numbers in Notes."
    - name: LB
      type: string
      description: "LSB parameter number (hex). See Mute Parameter Numbers in Notes."

# Mute Toggle (NRPN data increment toggles state). Cannot be used with DCA/Mute Group mutes.
- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 60 00"
  params:
    - name: MB
      type: string
      description: "MSB parameter number (hex). Not valid for DCA Mute / Mute Group Mute."
    - name: LB
      type: string
      description: "LSB parameter number (hex). Not valid for DCA Mute / Mute Group Mute."

# Level Set absolute (NRPN). VC = coarse value, VF = fine value. See Example Level Values in Notes.
- id: level_set
  label: Level Set
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 {VC} B0 26 {VF}"
  params:
    - name: MB
      type: string
      description: "MSB parameter number (hex) for source->destination route. See Level Parameter Numbers in Notes."
    - name: LB
      type: string
      description: "LSB parameter number (hex) for source->destination route. See Level Parameter Numbers in Notes."
    - name: VC
      type: string
      description: "Coarse value (hex). Combined with VF for absolute level. See Example Level Values."
    - name: VF
      type: string
      description: "Fine value (hex). See Example Level Values."

# Level Increment (+1dB). NRPN Fader Law setting has no effect on relative control.
- id: level_increment
  label: Level Increment (+1dB)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 60 00"
  params:
    - name: MB
      type: string
      description: "MSB parameter number (hex) for source->destination route."
    - name: LB
      type: string
      description: "LSB parameter number (hex) for source->destination route."

# Level Decrement (-1dB).
- id: level_decrement
  label: Level Decrement (-1dB)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 61 00"
  params:
    - name: MB
      type: string
      description: "MSB parameter number (hex) for source->destination route."
    - name: LB
      type: string
      description: "LSB parameter number (hex) for source->destination route."

# Pan/Balance Set absolute (NRPN). 00 00 = full left, 40 00 = centre, 7F 7F = full right.
- id: pan_set
  label: Pan/Balance Set
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 {VC} B0 26 {VF}"
  params:
    - name: MB
      type: string
      description: "MSB parameter number (hex) for source->destination route. See Pan/Balance Parameter Numbers in Notes."
    - name: LB
      type: string
      description: "LSB parameter number (hex) for source->destination route."
    - name: VC
      type: string
      description: "Coarse value (hex). 00=full left, 40=centre, 7F=full right."
    - name: VF
      type: string
      description: "Fine value (hex). See Example Pan/Balance Values in Notes."

# Pan Increment (right one step).
- id: pan_increment
  label: Pan/Balance Increment (right)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 60 00"
  params:
    - name: MB
      type: string
      description: "MSB parameter number (hex) for source->destination route."
    - name: LB
      type: string
      description: "LSB parameter number (hex) for source->destination route."

# Pan Decrement (left one step).
- id: pan_decrement
  label: Pan/Balance Decrement (left)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 61 00"
  params:
    - name: MB
      type: string
      description: "MSB parameter number (hex) for source->destination route."
    - name: LB
      type: string
      description: "LSB parameter number (hex) for source->destination route."

# Get value (query). Data increment with value 7F requests current value of mute/level/pan param.
- id: get_value
  label: Get Parameter Value
  kind: query
  command: "B0 63 {MB} B0 62 {LB} B0 60 7F"
  params:
    - name: MB
      type: string
      description: "MSB parameter number (hex) of mute/level/pan/assignment parameter being requested."
    - name: LB
      type: string
      description: "LSB parameter number (hex) of parameter being requested."
```

## Feedbacks
```yaml
# The CQ transmits MIDI NRPN messages when any change is made on the unit (or via
# connected app) to parameters that include NRPN MIDI Control. Returned value uses the
# same absolute NRPN set format (B0 63 MB B0 62 LB B0 06 VC B0 26 VF).
- id: parameter_state_report
  type: nrpn
  description: "Unsolicited NRPN message emitted by CQ when a controlled parameter changes. Format mirrors the corresponding set command."

- id: mute_state
  type: enum
  values: [on, off]

- id: level_value
  type: range
  description: "Coarse/fine (VC/VF) pair per the Example Level Values table."

- id: pan_value
  type: range
  description: "Coarse/fine (VC/VF) pair, 00 00 (full left) to 7F 7F (full right), 40 00 centre."
```

## Variables
```yaml
# Settable continuous parameters addressed via NRPN MSB/LSB.
- id: level
  description: "Mix level (fader) per source->destination route. Absolute VC/VF or +/-1dB relative."
  unit: dB
- id: pan_balance
  description: "Pan (mono) or balance (stereo) per source->destination route. Absolute or relative step."
- id: mute
  description: "Mute on/off per channel, output, FX, DCA, Mute Group."
```

## Events
```yaml
# The CQ sends MIDI messages unsolicited when parameters change on the unit itself.
# Raw MIDI output can be recorded and played back to automate level/mute control.
- id: unsolicited_state_change
  description: "NRPN message transmitted by CQ on any parameter change made on the unit or app. Avoid MIDI feedback loops when recording."
```

## Macros
```yaml
# Source documents scene recall as a two-message sequence (bank change + program change),
# represented by the scene_recall action. No other multi-step macros documented.
# UNRESOLVED: no additional macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- **MIDI Channel:** All control uses MIDI Channel 1.
- **TCP limit:** Only one TCP/IP MIDI connection possible at a time.
- **Hex notation:** Source omits the `0x` prefix throughout; values shown verbatim (e.g. `B0`, `7F`).
- **Mute Toggle restriction:** Cannot be used with DCA Mute and Mute Group Mute.
- **Scene offset:** CQ counts scenes 1-128; MIDI counts 0-127 (offset -1).
- **Pan to linked stereo outputs:** 'Follow Main LR Pan' must be set to 'Off' to allow MIDI pan control.
- **Soft Key octave caveat:** HEX values are accurate, but some apps/hardware use different octave designations (try C2/C4 if C3 does not work).
- **Feedback loop warning:** Avoid sending CQ MIDI output back to the CQ input when recording MIDI data.

### Mute Parameter Numbers (MB / LB)

| Target | MB | LB | Target | MB | LB | Target | MB | LB |
|--------|----|----|--------|----|----|--------|----|----|
| Ip1 | 00 | 00 | St1 | 00 | 18 | Main LR | 00 | 44 |
| Ip2 | 00 | 01 | St2 | 00 | 1A | Out1 | 00 | 45 |
| Ip3 | 00 | 02 | USB | 00 | 1C | Out2 | 00 | 46 |
| Ip4 | 00 | 03 | BT | 00 | 1E | Out3 | 00 | 47 |
| Ip5 | 00 | 04 | FX1 | 00 | 51 | Out4 | 00 | 48 |
| Ip6 | 00 | 05 | FX2 | 00 | 52 | Out5 | 00 | 49 |
| Ip7 | 00 | 06 | FX3 | 00 | 53 | Out6 | 00 | 4A |
| Ip8 | 00 | 07 | FX4 | 00 | 54 | MGRP1 | 04 | 00 |
| Ip9 | 00 | 08 | DCA1 | 02 | 00 | MGRP2 | 04 | 01 |
| Ip10 | 00 | 09 | DCA2 | 02 | 01 | MGRP3 | 04 | 02 |
| Ip11 | 00 | 0A | DCA3 | 02 | 02 | MGRP4 | 04 | 03 |
| Ip12 | 00 | 0B | DCA4 | 02 | 03 | | | |
| Ip13 | 00 | 0C | Out1/2 | 00 | 45 | | | |
| Ip14 | 00 | 0D | Out3/4 | 00 | 47 | | | |
| Ip15 | 00 | 0E | Out5/6 | 00 | 49 | | | |
| Ip16 | 00 | 0F | | | | | | |

### Output / FX-input / DCA Level Parameter Numbers

| Target | MB | LB |
|--------|----|----|
| Main LR | 4F | 00 |
| Out1 | 4F | 01 |
| Out2 | 4F | 02 |
| Out3 | 4F | 03 |
| Out4 | 4F | 04 |
| Out5 | 4F | 05 |
| Out6 | 4F | 06 |
| Out1/2 | 4F | 01 |
| Out3/4 | 4F | 03 |
| Out5/6 | 4F | 05 |
| FX1 | 4F | 0D |
| FX2 | 4F | 0E |
| FX3/FX4 | 4F | 0F |
| DCA1 | 4F | 20 |
| DCA2 | 4F | 21 |
| DCA3/DCA4 | 4F | 22/23 |

### Input-to-Output Level Parameter Numbers (MB/LB)

Each row = source, columns = Main LR / Out1 / Out2 / Out3 / Out4 / Out5 / Out6 / FX1 / FX2 / FX3 / FX4. Full matrix provided in source Reference Tables (e.g. Ip1->Main LR = `40 00`; Ip1->Out1 = `40 44`; Ip1->FX1 = `4C 14`). Representative entries:

| Source->Dest | MB | LB |
|--------------|----|----|
| Ip1 -> Main LR | 40 | 00 |
| Ip1 -> Out1 | 40 | 44 |
| Ip1 -> FX1 | 4C | 14 |
| Ip12 -> Main LR | 40 | 0B |
| ST1 -> Main LR | 40 | 18 |
| FX1 -> Main LR | 40 | 3C |
| FX1 -> Out1 | 46 | 14 |

### Example Level Values (VC / VF)

| dB | VC | VF | dB | VC | VF | dB | VC | VF |
|----|----|----|----|----|----|----|----|----|
| -inf | 00 | 00 | -45 | 0C | 00 | -20 | 2E | 40 |
| -89 | 01 | 40 | -40 | 0F | 40 | -15 | 36 | 00 |
| -60 | 06 | 00 | -30 | 1F | 00 | -10 | 3E | 00 |
| -50 | 08 | 00 | -25 | 26 | 40 | -5 | 4E | 40 |
| -30 | 1F | 00 | -20 | 2E | 40 | 0 | 62 | 00 |
| -20 | 2E | 40 | -10 | 3E | 00 | +5 | 73 | 40 |
| -10 | 3E | 00 | 0 | 62 | 00 | +10 | 7F | 40 |

### Example Pan/Balance Values (VC / VF)

| Position | VC | VF |
|----------|----|----|
| L100% | 00 | 00 |
| L50% | 1F | 7F |
| Centre | 40 | 00 |
| R50% | 5F | 7F |
| R100% | 7F | 7F |

### Soft Key Note Values (SK)

| Soft Key | Note | HEX |
|----------|------|-----|
| 1 | C3 | 30 |
| 2 | C#3 | 31 |
| 3 | D3 | 32 |

<!-- UNRESOLVED: full input-to-output level/pan MB/LB matrix not reproduced inline (300+ entries); see source Reference Tables sections 3.4-3.6 -->
<!-- UNRESOLVED: number of CQ soft keys beyond keys 1-3 not stated; source table only lists three -->
<!-- UNRESOLVED: CQ hardware model variants (CQ-18T / CQ-20B / CQ-60T) not distinguished -->

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/CQ_MIDI_Protocol_V1_2_0_iss4.pdf
  - https://www.allen-heath.com/content/uploads/2024/06/CQ_MIDI_Protocol_V1_2_0_iss1.pdf
  - https://www.allen-heath.com
retrieved_at: 2026-07-13T18:53:53.993Z
last_checked_at: 2026-07-21T20:01:02.435Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:01:02.435Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions match verbatim source commands with correct wire patterns, parameter shapes, and transport port 51325; 100% bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific CQ hardware model variants (CQ-18T, CQ-20B, CQ-60T) not distinguished in source; source refers to \"CQ\" generically"
- "no additional macro sequences described in source."
- "source contains no safety warnings, interlock procedures, or"
- "full input-to-output level/pan MB/LB matrix not reproduced inline (300+ entries); see source Reference Tables sections 3.4-3.6"
- "number of CQ soft keys beyond keys 1-3 not stated; source table only lists three"
- "CQ hardware model variants (CQ-18T / CQ-20B / CQ-60T) not distinguished"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
