---
spec_id: admin/allen-heath-qu-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath Qu Series Control Spec"
manufacturer: "Allen & Heath"
model_family: Qu-5
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - Qu-5
    - Qu-6
    - Qu-7
    - Qu-5D
    - Qu-6D
    - Qu-7D
  firmware: "V1.1 or later"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2025/06/Qu567_MIDI_Protocol_Iss2.pdf
  - https://www.allen-heath.com/content/uploads/2023/11/SQ-MIDI-Protocol-Issue5.pdf
  - https://www.allen-heath.com/content/uploads/2024/10/CQ_MIDI_Protocol_V1_2_0_iss4.pdf
  - https://www.allen-heath.com/content/uploads/2023/06/Qu_MIDI_Protocol_V1.9.pdf
retrieved_at: 2026-07-13T19:28:22.200Z
last_checked_at: 2026-07-21T20:01:01.014Z
generated_at: 2026-07-21T20:01:01.014Z
firmware_coverage: "V1.1 or later"
protocol_coverage: []
known_gaps:
  - "full MSB/LSB routing parameter-number tables included by reference; specific numeric USB-MIDI vendor IDs not stated"
  - "source references standard MSC messages (cue recall, Previous/Next/Load/Go) but does not document the SysEx byte payloads"
  - "standard MMC Real Time Universal SysEx payload not stated in source"
  - "standard MMC payload not stated in source"
  - "payload not stated in source"
  - "MMC SysEx byte payloads not documented in source (referenced as standard MIDI Show Control / MMC)"
  - "DAW Bank Up/Down payload not documented"
  - "NRPN Fader Law setting has no documented MIDI set command (UI-only)"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:01:01.014Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 actions match source NRPN/CC/note formats verbatim; transport port 51325 confirmed; full mixer command catalogue represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Allen & Heath Qu Series Control Spec

## Summary
Allen & Heath Qu series digital mixing consoles (Qu-5/6/7 and Dante variants) controlled via MIDI over TCP/IP (Network port, port 51325) or MIDI over USB (USB-C port). This spec covers MIDI mixing-parameter control (levels, mutes, pans, assignments), scene recall, Soft Key triggering, MIDI Show Control, DAW control strips, and value queries using NRPN messages, CC, Note On/Off, Bank/Program Change, and MMC.

<!-- UNRESOLVED: full MSB/LSB routing parameter-number tables included by reference; specific numeric USB-MIDI vendor IDs not stated -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 51325
auth:
  type: none  # inferred: no auth procedure in source
```

Note: device also sends/receives MIDI over USB-C (USB class MIDI). USB transport not modelled here as it is not an IP protocol.

## Traits
```yaml
traits:
  - queryable    # inferred: get-value (NRPN increment 7F) query commands documented
  - levelable    # inferred: absolute and relative level control documented
  - routable     # inferred: input/group/FX-to-mix routing assignment commands documented
```

## Actions
```yaml
# Channel variable N = MIDI channel nibble (0-F for channels 1-16).
# MB/LB = MSB/LSB NRPN parameter number (see source routing tables).
# VC/VF = coarse/fine value bytes.
# SK = Soft Key note number.

# --- Scene Recall (Bank + Program Change) ---
- id: scene_recall
  label: Recall Scene
  kind: action
  command: "B{N} 00 {BK} C{N} {PG}"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F (channels 1-16)
    - name: BK
      type: string
      description: Bank value 00 (scenes 1-128), 01 (129-256), or 02 (257-300)
    - name: PG
      type: string
      description: Program value 00-7F (0-127); scene number offset by -1 vs MIDI value
  notes: Scene must exist as saved scene; blank scenes cannot be recalled.

# --- Soft Key Trigger (Note On / Note Off) ---
- id: soft_key_press
  label: Soft Key Press
  kind: action
  command: "9{N} {SK} 7F"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: SK
      type: string
      description: Soft Key note hex 30-3F (Soft Keys 1-16)

- id: soft_key_release
  label: Soft Key Release
  kind: action
  command: "8{N} {SK} 00"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: SK
      type: string
      description: Soft Key note hex 30-3F (Soft Keys 1-16)

# --- Mute Control (NRPN) ---
- id: mute_on
  label: Mute On
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 06 00 B{N} 26 01"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number for target channel/bus
    - name: LB
      type: string
      description: LSB parameter number for target channel/bus

- id: mute_off
  label: Mute Off
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 06 00 B{N} 26 00"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number for target channel/bus
    - name: LB
      type: string
      description: LSB parameter number for target channel/bus

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 60 00"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number for target channel/bus
    - name: LB
      type: string
      description: LSB parameter number for target channel/bus

# --- Level Control (NRPN) ---
- id: level_set
  label: Set Level (Absolute)
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 06{VC} B{N} 26{VF}"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number (source-to-destination routing)
    - name: LB
      type: string
      description: LSB parameter number (source-to-destination routing)
    - name: VC
      type: string
      description: Coarse value byte; interpretation depends on NRPN Fader Law (Audio vs Linear Taper)
    - name: VF
      type: string
      description: Fine value byte
  notes: Fader Law (Audio/Linear Taper) selected in UTILITY > General > MIDI.

- id: level_increment
  label: Level Increment (+1 dB)
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 60 00"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number
    - name: LB
      type: string
      description: LSB parameter number
  notes: Raises level in 1 dB steps. NRPN Fader Law has no effect on relative control.

- id: level_decrement
  label: Level Decrement (-1 dB)
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 61 00"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number
    - name: LB
      type: string
      description: LSB parameter number
  notes: Lowers level in 1 dB steps. NRPN Fader Law has no effect on relative control.

# --- Pan / Balance Control (NRPN) ---
- id: pan_set
  label: Set Pan/Balance (Absolute)
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 06{VC} B{N} 26{VF}"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number
    - name: LB
      type: string
      description: LSB parameter number
    - name: VC
      type: string
      description: Coarse value; 00-3F left, 3F centre, 4C-7F right
    - name: VF
      type: string
      description: Fine value; centre = 3F 7F
  notes: Only controllable when destination Mix is stereo.

- id: pan_increment
  label: Pan Right (Increment)
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 60 00"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number
    - name: LB
      type: string
      description: LSB parameter number

- id: pan_decrement
  label: Pan Left (Decrement)
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 61 00"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number
    - name: LB
      type: string
      description: LSB parameter number

# --- Mix Assignment Control (NRPN) ---
- id: assign_on
  label: Mix Assign On
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 06 00 B{N} 26 01"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number (source-to-destination)
    - name: LB
      type: string
      description: LSB parameter number (source-to-destination)

- id: assign_off
  label: Mix Assign Off
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 06 00 B{N} 26 00"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number
    - name: LB
      type: string
      description: LSB parameter number

- id: assign_toggle
  label: Mix Assign Toggle
  kind: action
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 60 00"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number
    - name: LB
      type: string
      description: LSB parameter number

# --- Value Query (NRPN get) ---
- id: get_value
  label: Get Parameter Value
  kind: query
  command: "B{N} 63{MB} B{N} 62{LB} B{N} 60 7F"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: MB
      type: string
      description: MSB parameter number (mute/level/pan/assign)
    - name: LB
      type: string
      description: LSB parameter number (mute/level/pan/assign)
  notes: Returns current value of any mute, level, pan/balance, or assignment parameter.

# --- MIDI Fader Strip Controls (DAW Control Channel) ---
- id: midi_fader_cc_set
  label: MIDI Fader Strip Level
  kind: action
  command: "B{N} {CC} {value}"
  params:
    - name: N
      type: string
      description: MIDI DAW Control Channel nibble (Qu MIDI channel + 1)
    - name: CC
      type: string
      description: Controller number hex 00-1F (CC#0 to CC#31 for strips 1-32)
    - name: value
      type: string
      description: CC value 00-7F
  notes: Sent on MIDI DAW Control Channel. Strips 1-32 use CC#0-CC#31.

- id: midi_fader_strip_mute_key_on
  label: MIDI Fader Strip Mute Key (Press)
  kind: action
  command: "9{N} {note} 7F"
  params:
    - name: N
      type: string
      description: MIDI DAW Control Channel nibble
    - name: note
      type: string
      description: Strip mute note (strip 1 = C-1/00 ... strip 32 = G1/1F)

- id: midi_fader_strip_mute_key_off
  label: MIDI Fader Strip Mute Key (Release)
  kind: action
  command: "8{N} {note} 00"
  params:
    - name: N
      type: string
      description: MIDI DAW Control Channel nibble
    - name: note
      type: string
      description: Strip mute note

- id: midi_fader_strip_sel_key_on
  label: MIDI Fader Strip Sel Key (Press)
  kind: action
  command: "9{N} {note} 7F"
  params:
    - name: N
      type: string
      description: MIDI DAW Control Channel nibble
    - name: note
      type: string
      description: Strip sel note (strip 1 = G#1 ... strip 32 = D#4)

- id: midi_fader_strip_sel_key_off
  label: MIDI Fader Strip Sel Key (Release)
  kind: action
  command: "8{N} {note} 00"
  params:
    - name: N
      type: string
      description: MIDI DAW Control Channel nibble
    - name: note
      type: string
      description: Strip sel note

- id: midi_fader_strip_pafl_key_on
  label: MIDI Fader Strip PAFL Key (Press)
  kind: action
  command: "9{N} {note} 7F"
  params:
    - name: N
      type: string
      description: MIDI DAW Control Channel nibble
    - name: note
      type: string
      description: Strip PAFL note (strip 1 = E4 ... strip 32 = B6)

- id: midi_fader_strip_pafl_key_off
  label: MIDI Fader Strip PAFL Key (Release)
  kind: action
  command: "8{N} {note} 00"
  params:
    - name: N
      type: string
      description: MIDI DAW Control Channel nibble
    - name: note
      type: string
      description: Strip PAFL note

# --- Soft Key Assignable: Program Change ---
- id: soft_key_program_change
  label: Soft Key Program Change
  kind: action
  command: "C{N} {PG}"
  params:
    - name: N
      type: string
      description: MIDI channel nibble 0-F
    - name: PG
      type: string
      description: Program value 00-7F (0-127)

# --- MIDI Show Control (Cue List mode) ---
- id: msc_cue_recall
  label: MIDI Show Control Cue Recall
  kind: action
  command: null  # UNRESOLVED: source references standard MSC messages (cue recall, Previous/Next/Load/Go) but does not document the SysEx byte payloads
  params: []
  notes: Only available when Scene Manager is in Cue List mode.
```

## Feedbacks
```yaml
# The Qu echoes all mute/level/pan/assign state changes back over MIDI (same NRPN
# format as the corresponding set command). Get-value query responses use the same
# NRPN absolute format as the parameter's set command.
- id: mute_state
  type: enum
  values: [on, off]
  notes: NRPN mute parameter (MSB/LSB mute table); last byte 01=on, 00=off.

- id: level_value
  type: range
  notes: NRPN level parameter; coarse/fine value per Audio or Linear Taper table.

- id: pan_balance_value
  type: range
  notes: NRPN pan parameter; 00 00 = full left, 3F 7F = centre, 7F 7F = full right.

- id: assign_state
  type: enum
  values: [on, off]
  notes: NRPN assignment parameter.
```

## Variables
```yaml
# NRPN Fader Law is a settable global parameter (UTILITY > General > MIDI).
- id: nrpn_fader_law
  label: NRPN Fader Law
  type: enum
  values: [audio_taper, linear_taper]
  notes: Audio taper = lower resolution, unity-gain control. Linear taper = 16384 steps, high-res automation. Not exposed via documented MIDI command.
```

## Events
```yaml
# Unsolicited notifications the device sends. MMC transport messages are sent to
# ALL channels when an MMC control is touched on the Qu surface.
- id: mmc_rewind
  label: MMC Rewind
  command: null  # UNRESOLVED: standard MMC Real Time Universal SysEx payload not stated in source
- id: mmc_play
  label: MMC Play
  command: null  # UNRESOLVED: standard MMC payload not stated in source
- id: mmc_pause
  label: MMC Pause
  command: null  # UNRESOLVED: standard MMC payload not stated in source
- id: mmc_stop
  label: MMC Stop
  command: null  # UNRESOLVED: standard MMC payload not stated in source
- id: mmc_fastforward
  label: MMC Fast Forward
  command: null  # UNRESOLVED: standard MMC payload not stated in source
- id: mmc_record
  label: MMC Record
  command: null  # UNRESOLVED: standard MMC payload not stated in source
- id: daw_bank_up
  label: DAW Bank Up
  command: null  # UNRESOLVED: payload not stated in source
- id: daw_bank_down
  label: DAW Bank Down
  command: null  # UNRESOLVED: payload not stated in source
```

## Macros
```yaml
# No multi-step sequences explicitly documented beyond scene recall (bank+program
# change sent as a pair, modelled as single scene_recall action).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings, interlock procedures, or power-on sequencing requirements
# stated in source.
```

## Notes
- Device sends/receives MIDI over USB-C AND MIDI over TCP/IP (Network port 51325). Dante variants (Qu-5D/6D/7D) can bridge network via Dante port with Control Network Bridge On.
- MIDI channels: Qu uses 1 channel for mixer core control; DAW Control Channel auto-set to Qu MIDI channel + 1. To use MIDI channel 1 for DAW, set Qu channel to 16.
- All NRPN hex values shown without `0x` prefix (per source convention).
- Qu responds to both MIDI Note Off standards (specific note-off message, or note-on with zero velocity).
- Mtx4 cannot be controlled via MIDI (cross-compatibility constraint with SQ).
- MSB/LSB routing parameter numbers: stereo channels use the left/odd channel parameter number for control.
- Full MSB/LSB routing tables (Mute, Level, Pan/Balance, Assignment for Inputs 1-32, ST1/2, USB, Groups 1-12, FX Returns 1-6, FX Sends 1-4, Mixes 1-12, LR, Matrices 1-3, DCAs 1-8, Mute Groups 1-8) are documented in source Reference Tables section.

<!-- UNRESOLVED: MMC SysEx byte payloads not documented in source (referenced as standard MIDI Show Control / MMC) -->
<!-- UNRESOLVED: DAW Bank Up/Down payload not documented -->
<!-- UNRESOLVED: NRPN Fader Law setting has no documented MIDI set command (UI-only) -->

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2025/06/Qu567_MIDI_Protocol_Iss2.pdf
  - https://www.allen-heath.com/content/uploads/2023/11/SQ-MIDI-Protocol-Issue5.pdf
  - https://www.allen-heath.com/content/uploads/2024/10/CQ_MIDI_Protocol_V1_2_0_iss4.pdf
  - https://www.allen-heath.com/content/uploads/2023/06/Qu_MIDI_Protocol_V1.9.pdf
retrieved_at: 2026-07-13T19:28:22.200Z
last_checked_at: 2026-07-21T20:01:01.014Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:01:01.014Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 actions match source NRPN/CC/note formats verbatim; transport port 51325 confirmed; full mixer command catalogue represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full MSB/LSB routing parameter-number tables included by reference; specific numeric USB-MIDI vendor IDs not stated"
- "source references standard MSC messages (cue recall, Previous/Next/Load/Go) but does not document the SysEx byte payloads"
- "standard MMC Real Time Universal SysEx payload not stated in source"
- "standard MMC payload not stated in source"
- "payload not stated in source"
- "MMC SysEx byte payloads not documented in source (referenced as standard MIDI Show Control / MMC)"
- "DAW Bank Up/Down payload not documented"
- "NRPN Fader Law setting has no documented MIDI set command (UI-only)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
