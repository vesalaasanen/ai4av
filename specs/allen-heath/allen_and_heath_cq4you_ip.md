---
spec_id: admin/allen-heath-cq4you
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
  firmware: "V1.2 Issue 4"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/CQ_MIDI_Protocol_V1_2_0_iss4.pdf
  - https://www.allen-heath.com/resources/
retrieved_at: 2026-07-13T19:03:50.519Z
last_checked_at: 2026-07-21T20:01:03.251Z
generated_at: 2026-07-21T20:01:03.251Z
firmware_coverage: "V1.2 Issue 4"
protocol_coverage: []
known_gaps:
  - "USB-MIDI transport details not fully modelled (spec models TCP/IP transport). Specific CQ model variants (CQ-18T / CQ-20B / CQ-28T) not distinguished in source."
  - "no further variables identified in source."
  - "no discrete event notifications described in source."
  - "no multi-step sequences described in source."
  - "no further safety/interlock procedures stated in source."
  - "USB-MIDI transport not modelled as separate transport."
  - "power on/off device command not present (only mute)."
  - "clock/sync / tempo control not described."
  - "CC Translator mapping table not in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:01:03.251Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions matched verbatim in source; transport (port 51325, TCP, channel 1) confirmed; coverage is complete one-to-one. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Allen & Heath CQ Control Spec

## Summary
The Allen & Heath CQ is a compact digital mixer controllable via MIDI. This spec covers MIDI-over-TCP/IP (and USB MIDI) control of scene recall, soft keys, mutes, levels, and pan/balance using MIDI Note On/Off, Program/Bank Change, and NRPN messages. The CQ uses MIDI Channel 1 for all control messaging.

<!-- UNRESOLVED: USB-MIDI transport details not fully modelled (spec models TCP/IP transport). Specific CQ model variants (CQ-18T / CQ-20B / CQ-28T) not distinguished in source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 51325
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - levelable  # inferred: level (volume) and pan/balance control present
  - queryable  # inferred: 'get' query commands returning parameter values present
  - powerable  # inferred: mute on/off commands present (discrete power/mute control)
```

## Actions
```yaml
# All hex payloads are verbatim from the source (0x prefix omitted per source convention).
# MIDI Channel 1 used throughout. Parameters:
#   MB/LB = NRPN MSB/LSB parameter number (see source reference tables for mute/level/pan)
#   VC/VF = coarse/fine value bytes
#   SK    = Soft Key note
#   BK    = bank, PG = program
actions:
  - id: scene_recall
    label: Recall Scene
    kind: action
    command: "B0 00{BK} C0{PG}"
    params:
      - name: BK
        type: string
        description: Bank byte; source recommends bank 1 (00) for completeness
      - name: PG
        type: integer
        description: Program (scene) value 00-7F; -1 offset vs CQ scene number (CQ 1-128 = MIDI 0-127)
    notes: "Recalled scene must exist as a saved scene in the CQ."

  - id: soft_key_press
    label: Soft Key Press
    kind: action
    command: "90 {SK} 7F"
    params:
      - name: SK
        type: string
        description: Soft Key note (C3/30 = Soft Key 1, sequential)

  - id: soft_key_release
    label: Soft Key Release
    kind: action
    command: "80 {SK} 00"
    params:
      - name: SK
        type: string
        description: Soft Key note (C3/30 = Soft Key 1, sequential)
    notes: "CQ also accepts note-on with zero velocity as note-off."

  - id: mute_on
    label: Mute On
    kind: action
    command: "B0 63{MB} B0 62{LB} B0 06 00 B0 26 01"
    params:
      - name: MB
        type: string
        description: NRPN MSB for target mute parameter
      - name: LB
        type: string
        description: NRPN LSB for target mute parameter

  - id: mute_off
    label: Mute Off
    kind: action
    command: "B0 63{MB} B0 62{LB} B0 06 00 B0 26 00"
    params:
      - name: MB
        type: string
        description: NRPN MSB for target mute parameter
      - name: LB
        type: string
        description: NRPN LSB for target mute parameter

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "B0 63{MB} B0 62{LB} B0 60 00"
    params:
      - name: MB
        type: string
        description: NRPN MSB for target mute parameter
      - name: LB
        type: string
        description: NRPN LSB for target mute parameter
    notes: "Cannot currently be used with DCA Mute and Mute Group Mute (source)."

  - id: level_set
    label: Set Level (Absolute)
    kind: action
    command: "B0 63{MB} B0 62{LB} B0 06{VC} B0 26{VF}"
    params:
      - name: MB
        type: string
        description: NRPN MSB for source-to-destination level parameter
      - name: LB
        type: string
        description: NRPN LSB for source-to-destination level parameter
      - name: VC
        type: string
        description: Coarse value byte (see source 'Example Linear/Audio Taper Level Values')
      - name: VF
        type: string
        description: Fine value byte

  - id: level_increment
    label: Level +1dB
    kind: action
    command: "B0 63{MB} B0 62{LB} B0 60 00"
    params:
      - name: MB
        type: string
        description: NRPN MSB for source-to-destination level parameter
      - name: LB
        type: string
        description: NRPN LSB for source-to-destination level parameter
    notes: "NRPN Fader Law setting has no effect on relative control."

  - id: level_decrement
    label: Level -1dB
    kind: action
    command: "B0 63{MB} B0 62{LB} B0 61 00"
    params:
      - name: MB
        type: string
        description: NRPN MSB for source-to-destination level parameter
      - name: LB
        type: string
        description: NRPN LSB for source-to-destination level parameter
    notes: "NRPN Fader Law setting has no effect on relative control."

  - id: pan_set
    label: Set Pan/Balance (Absolute)
    kind: action
    command: "B0 63{MB} B0 62{LB} B0 06{VC} B0 26{VF}"
    params:
      - name: MB
        type: string
        description: NRPN MSB for source-to-destination pan/balance parameter
      - name: LB
        type: string
        description: NRPN LSB for source-to-destination pan/balance parameter
      - name: VC
        type: string
        description: Coarse value byte; 00 00 = full left, 40 00 = centre, 7F 7F = full right
      - name: VF
        type: string
        description: Fine value byte
    notes: "For MIDI control of panning to Linked Stereo Outputs, 'Follow Main LR Pan' must be Off."

  - id: pan_increment
    label: Pan/Balance Right (increment)
    kind: action
    command: "B0 63{MB} B0 62{LB} B0 60 00"
    params:
      - name: MB
        type: string
        description: NRPN MSB for source-to-destination pan/balance parameter
      - name: LB
        type: string
        description: NRPN LSB for source-to-destination pan/balance parameter
    notes: "Incrementing moves pan to the right."

  - id: pan_decrement
    label: Pan/Balance Left (decrement)
    kind: action
    command: "B0 63{MB} B0 62{LB} B0 61 00"
    params:
      - name: MB
        type: string
        description: NRPN MSB for source-to-destination pan/balance parameter
      - name: LB
        type: string
        description: NRPN LSB for source-to-destination pan/balance parameter
    notes: "Decrementing moves pan to the left."

  - id: get_value
    label: Get Parameter Value
    kind: query
    command: "B0 63{MB} B0 62{LB} B0 60 7F"
    params:
      - name: MB
        type: string
        description: NRPN MSB for requested mute/level/pan parameter
      - name: LB
        type: string
        description: NRPN LSB for requested mute/level/pan parameter
    notes: "Returns current value of any mute, level, or pan/balance parameter."
```

## Feedbacks
```yaml
# CQ transmits MIDI messages when changes are made to any NRPN-controlled parameter (source 1.2).
# Raw MIDI output can be recorded and played back.
feedbacks:
  - id: mute_state
    type: enum
    values: [muted, unmuted]
    description: "Transmitted as Mute On/Off NRPN messages on mute changes."
  - id: level_value
    type: number
    description: "Transmitted as absolute level NRPN messages on level changes."
  - id: pan_balance_value
    type: number
    description: "Transmitted as absolute pan/balance NRPN messages on pan changes."
```

## Variables
```yaml
# Settable parameters are covered by the level_set / pan_set actions (parameterized).
# Source does not describe additional standalone settable variables.
# UNRESOLVED: no further variables identified in source.
```

## Events
```yaml
# Source does not document unsolicited notification events beyond parameter-change
# MIDI output (covered under Feedbacks).
# UNRESOLVED: no discrete event notifications described in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Avoid creating a MIDI feedback loop by sending the CQ MIDI output back to the CQ when recording MIDI data (source 1.2)."
  - "Only one TCP/IP MIDI connection is possible at a time (source 1.1)."
# UNRESOLVED: no further safety/interlock procedures stated in source.
```

## Notes
- Source uses hexadecimal throughout; `0x` prefix omitted for brevity. All commands use MIDI Channel 1 (`B0`/`C0`/`90`/`80` status bytes reflect channel 1).
- Scene recall has a -1 offset between CQ values (1-128) and MIDI values (0-127).
- Soft Key octave designation may differ across applications/hardware (C3 vs C2/C4). HEX values in source are authoritative.
- CQ does NOT send Note On/Off messages when a Soft Key is pressed physically — MIDI triggering is inbound only for Soft Keys.
- Mute Toggle uses the data-increment opcode (`B0 60 00`) and toggles state; does not work with DCA/Mute Group mutes.
- NRPN parameter number reference tables (mute/level/pan MB+LB pairs) are extensive in the source and not duplicated here per-action; implementers must consult the source reference tables for exact parameter numbers per channel/route.
- CC Translator option in the Allen & Heath MIDI Control app enables simplified CC/Note-On control; not modelled here (app-layer translation, not device protocol).

<!-- UNRESOLVED: USB-MIDI transport not modelled as separate transport. -->
<!-- UNRESOLVED: power on/off device command not present (only mute). -->
<!-- UNRESOLVED: clock/sync / tempo control not described. -->
<!-- UNRESOLVED: CC Translator mapping table not in source. -->
```

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/CQ_MIDI_Protocol_V1_2_0_iss4.pdf
  - https://www.allen-heath.com/resources/
retrieved_at: 2026-07-13T19:03:50.519Z
last_checked_at: 2026-07-21T20:01:03.251Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:01:03.251Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions matched verbatim in source; transport (port 51325, TCP, channel 1) confirmed; coverage is complete one-to-one. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB-MIDI transport details not fully modelled (spec models TCP/IP transport). Specific CQ model variants (CQ-18T / CQ-20B / CQ-28T) not distinguished in source."
- "no further variables identified in source."
- "no discrete event notifications described in source."
- "no multi-step sequences described in source."
- "no further safety/interlock procedures stated in source."
- "USB-MIDI transport not modelled as separate transport."
- "power on/off device command not present (only mute)."
- "clock/sync / tempo control not described."
- "CC Translator mapping table not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
