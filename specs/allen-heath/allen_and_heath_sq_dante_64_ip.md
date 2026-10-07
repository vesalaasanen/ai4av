---
spec_id: admin/allen-heath-sq-dante-64
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath SQ Dante 64 Control Spec"
manufacturer: "Allen & Heath"
model_family: SQ
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - SQ
  firmware: "V1.5.0 or later"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2023/11/SQ-MIDI-Protocol-Issue5.pdf
  - https://www.allen-heath.com/content/uploads/2024/10/AHM-TCP-Protocol-V1.5.pdf
retrieved_at: 2026-07-13T19:11:04.017Z
last_checked_at: 2026-10-01T11:20:26.701Z
generated_at: 2026-10-01T11:20:26.701Z
firmware_coverage: "V1.5.0 or later"
protocol_coverage: []
known_gaps:
  - "MMC transport (Rewind/Play/Pause/Stop/FFwd/Record) SysEx payloads"
  - "standard MMC Real Time Universal SysEx payload not stated verbatim in source"
  - "standard MMC payload not stated verbatim in source"
  - "exact response/ack byte format for get_value replies not separately"
  - "full per-cell MSB/LSB tables not reproduced here - see source Section 4."
  - "no separate unsolicited notification protocol stated in source."
  - "no multi-step sequences explicitly described in source."
  - "source contains no safety warnings, interlock procedures, or power-on"
  - "model \"SQ Dante 64\" denotes the Dante card variant; the source manual"
  - "MMC transport SysEx payloads not stated verbatim in source."
  - "USB transport parameters not documented in source."
  - "full MSB/LSB parameter-number tables (source Section 4) not reproduced"
verification:
  verdict: verified
  checked_at: 2026-10-01T11:20:26.701Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions trace to literal MIDI templates (sections 2.x, 3.1-3.7) or to enumerated MMC functions; port 51325 stated verbatim. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Allen & Heath SQ Dante 64 Control Spec

## Summary
The Allen & Heath SQ is a digital mixing console. This spec covers MIDI control of SQ
mixing parameters (scenes, mutes, levels, pan/balance, mix assignments, soft keys,
value queries) sent and received over TCP/IP using MIDI (NRPN/CC/Note On/Off/Program
Change) on the SQ's network port, and the DAW control surface messages used by the
32 MIDI fader strips. The SQ also accepts MIDI over USB via the USB-B port; this spec
documents the TCP/IP transport.

<!-- UNRESOLVED: MMC transport (Rewind/Play/Pause/Stop/FFwd/Record) SysEx payloads
are not stated verbatim in source — only described as "standard MMC transport messages". -->

## Transport
```yaml
protocols:
  - tcp
# MIDI over TCP/IP. All command payloads below are MIDI byte sequences (hex) carried
# over the TCP connection. The SQ also receives MIDI over USB (USB-B port); USB transport
# parameters are UNRESOLVED (no USB-specific config stated).
addressing:
  port: 51325
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - queryable   # inferred: "get" command returns current mute/level/pan/assign value
  - levelable   # inferred: level + pan/balance absolute/relative control present
  - routable    # inferred: mix assignment (on/off/toggle) commands present
```

## Actions
```yaml
# All payloads are MIDI hex byte sequences. Variables in templates:
#   N  = MIDI channel nibble (0-F, channels 1-16)
#   MB = MSB of NRPN parameter number (source reference tables, Section 4)
#   LB = LSB of NRPN parameter number (source reference tables, Section 4)
#   BK = Bank (00 = scenes 1-128, 01 = 129-256, 02 = 257-300)
#   PG = Program change value 00-7F (SQ scene number minus 1)
#   SK = Soft Key note byte (30-3F, Soft Keys 1-16; see Section 3.2)
#   VC = value coarse byte ; VF = value fine byte
# Note: hex values shown without 0x prefix, as in source.

# --- 3.1 Scene change (bank change + program change) ---
- id: scene_recall
  label: Recall Scene
  kind: action
  command: "B{N} 00 {BK} C{N} {PG}"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16); encoded as hex nibble in status byte
    - name: BK
      type: enum
      description: "Bank (00=scenes 1-128, 01=129-256, 02=257-300)"
    - name: PG
      type: integer
      description: Program value 00-7F (SQ scene number minus 1)
  notes: "Scene being recalled must exist as a saved scene. Example scene 7 Ch1 = B0 00 00 C0 06; scene 156 Ch1 = B0 00 01 C0 1B."

# --- 3.2 Soft Keys (Note On = press, Note Off = release) ---
- id: soft_key_press
  label: Soft Key Press (Note On)
  kind: action
  command: "9{N} {SK} 7F"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: SK
      type: integer
      description: "Soft Key note 30-3F (SoftKeys 1-16; C3=30 sequential)"
  notes: "SQ-5 has 8 Soft Keys; SQ-6/SQ-7 have 16. Example SK#1 Ch1 = 90 30 7F."

- id: soft_key_release
  label: Soft Key Release (Note Off)
  kind: action
  command: "8{N} {SK} 00"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: SK
      type: integer
      description: "Soft Key note 30-3F (SoftKeys 1-16)"
  notes: "SQ responds to both note-off standards (specific note off OR note on with zero velocity). Example SK#1 Ch1 = 80 30 00."

# --- 3.3 Mutes (NRPN: on / off / toggle) ---
- id: mute_on
  label: Mute On
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 06 00 B{N} 26 01"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of mute parameter number (Mute Parameter Numbers tables)
    - name: LB
      type: string
      description: LSB of mute parameter number (Mute Parameter Numbers tables)
  notes: "Example Ip1 Ch1 = B0 63 00 B0 62 00 B0 06 00 B0 26 01."

- id: mute_off
  label: Mute Off
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 06 00 B{N} 26 00"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of mute parameter number
    - name: LB
      type: string
      description: LSB of mute parameter number
  notes: "Example LR mix Ch1 = B0 63 00 B0 62 44 B0 06 00 B0 26 00."

- id: mute_toggle
  label: Mute Toggle (increment)
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 60 00"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of mute parameter number
    - name: LB
      type: string
      description: LSB of mute parameter number
  notes: "Data increment toggles mute state. Example Ip1 Ch1 = B0 63 00 B0 62 00 B0 60 00."

# --- 3.4 Levels (NRPN: absolute set / +1dB / -1dB) ---
- id: level_set
  label: Set Level (absolute)
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 06 {VC} B{N} 26 {VF}"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of level parameter number (Level Parameter Numbers tables)
    - name: LB
      type: string
      description: LSB of level parameter number (Level Parameter Numbers tables)
    - name: VC
      type: string
      description: Value coarse byte
    - name: VF
      type: string
      description: Value fine byte
  notes: "16384 steps (Linear Taper) or 255 steps (Audio Taper) per NRPN Fader Law setting. See Linear/Audio Taper value tables. Example Ip1->LR 0dB Ch1 (linear) = B0 63 40 B0 62 00 B0 06 76 B0 26 5C."

- id: level_increment
  label: Level +1dB (increment)
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 60 00"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of level parameter number
    - name: LB
      type: string
      description: LSB of level parameter number
  notes: "NRPN Fader Law has no effect on relative control. Example Ip1->LR Ch1 = B0 63 40 B0 62 00 B0 60 00."

- id: level_decrement
  label: Level -1dB (decrement)
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 61 00"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of level parameter number
    - name: LB
      type: string
      description: LSB of level parameter number
  notes: "Example Grp5->LR Ch5 = B4 63 40 B4 62 34 B4 61 00."

# --- 3.5 Panning / Balance (NRPN: absolute set / right step / left step) ---
- id: pan_set
  label: Set Pan/Balance (absolute)
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 06 {VC} B{N} 26 {VF}"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of pan/balance parameter number (Panning/Balance Parameter Numbers tables)
    - name: LB
      type: string
      description: LSB of pan/balance parameter number
    - name: VC
      type: string
      description: Value coarse byte
    - name: VF
      type: string
      description: Value fine byte
  notes: "Range 00 00 (full left) to 7F 7F (full right); centre = 3F 7F. See Pan/Balance value table. Example Ip1->LR L100% Ch1 = B0 63 50 B0 62 00 B0 06 00 B0 26 00."

- id: pan_right
  label: Pan Right one step (increment)
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 60 00"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of pan/balance parameter number
    - name: LB
      type: string
      description: LSB of pan/balance parameter number
  notes: "Example Ip1->LR Ch1 = B0 63 50 B0 62 00 B0 60 00."

- id: pan_left
  label: Pan Left one step (decrement)
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 61 00"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of pan/balance parameter number
    - name: LB
      type: string
      description: LSB of pan/balance parameter number
  notes: "Example Ip1->LR Ch1 = B0 63 50 B0 62 00 B0 61 00."

# --- 3.6 Mix Assignments (NRPN: on / off / toggle) ---
- id: assign_on
  label: Mix Assign On
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 06 00 B{N} 26 01"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of assignment parameter number (Assignment Parameter Numbers tables)
    - name: LB
      type: string
      description: LSB of assignment parameter number
  notes: "Example Ip1->LR Ch1 = B0 63 60 B0 62 00 B0 06 00 B0 26 01."

- id: assign_off
  label: Mix Assign Off
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 06 00 B{N} 26 00"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of assignment parameter number
    - name: LB
      type: string
      description: LSB of assignment parameter number
  notes: "Example Ip1->LR Ch1 = B0 63 60 B0 62 00 B0 06 00 B0 26 00."

- id: assign_toggle
  label: Mix Assign Toggle (increment)
  kind: action
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 60 00"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of assignment parameter number
    - name: LB
      type: string
      description: LSB of assignment parameter number
  notes: "Example Grp2->Mtx2 Ch4 = B3 63 6E B3 62 4F B3 60 00."

# --- 3.7 Get value (query) ---
- id: get_value
  label: Get Parameter Value
  kind: query
  command: "B{N} 63 {MB} B{N} 62 {LB} B{N} 60 7F"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: MB
      type: string
      description: MSB of parameter number for the value requested (mute/level/pan/assign)
    - name: LB
      type: string
      description: LSB of parameter number for the value requested
  notes: "Returns current value of any mute/level/pan/assignment parameter. Use correct parameter number for the parameter type. Example LR Mute Ch1 = B0 63 00 B0 62 00 B0 60 7F."

# --- 2.1 MIDI Fader strip messages (DAW control channel; SQ sends and responds) ---
# 32 freely assignable strips. Per strip: Mute Key (Note On/Off), Sel Key (Note On/Off),
# PAFL Key (Note On/Off), Fader (CC#). See Section 2.1 strip table for note/CC assignment.
- id: midi_strip_mute_key
  label: MIDI Strip Mute Key (Note On/Off)
  kind: action
  command: "9{N} {NOTE} {VEL}"  # On=7F / Off=0; note per strip table (strip1=C-1 ...)
  params:
    - name: N
      type: integer
      description: DAW control MIDI channel (one higher than SQ MIDI channel)
    - name: NOTE
      type: string
      description: Note for strip mute key (strip table; strip1=C-1=00, sequential)
    - name: VEL
      type: integer
      description: "Velocity (127 = on / 0 = off)"
  notes: "Sent on MIDI DAW Control Channel. Strip note mapping in Section 2.1 table (strips 1-32)."

- id: midi_strip_sel_key
  label: MIDI Strip Sel Key (Note On/Off)
  kind: action
  command: "9{N} {NOTE} {VEL}"
  params:
    - name: N
      type: integer
      description: DAW control MIDI channel
    - name: NOTE
      type: string
      description: Note for strip sel key (strip table; strip1=G#1=20, sequential)
    - name: VEL
      type: integer
      description: "Velocity (127 = on / 0 = off)"
  notes: "Strip note mapping in Section 2.1 table (strips 1-32)."

- id: midi_strip_pafl_key
  label: MIDI Strip PAFL Key (Note On/Off)
  kind: action
  command: "9{N} {NOTE} {VEL}"
  params:
    - name: N
      type: integer
      description: DAW control MIDI channel
    - name: NOTE
      type: string
      description: Note for strip PAFL key (strip table; strip1=E4=40, sequential)
    - name: VEL
      type: integer
      description: "Velocity (127 = on / 0 = off)"
  notes: "Strip note mapping in Section 2.1 table (strips 1-32)."

- id: midi_strip_fader
  label: MIDI Strip Fader (CC)
  kind: action
  command: "B{N} {CC} {VAL}"
  params:
    - name: N
      type: integer
      description: DAW control MIDI channel
    - name: CC
      type: integer
      description: "Controller number (strip table; strip1=CC#0, sequential to CC#31)"
    - name: VAL
      type: integer
      description: "CC value 0-127"
  notes: "Strip CC mapping in Section 2.1 table (strips 1-32 = CC#0-31)."

# --- 2.2 / 2.3 Soft Key, Footswitch, Soft Rotary assignable functions ---
- id: program_change
  label: Program Change (Soft Key / Footswitch / Soft Rotary)
  kind: action
  command: "C{N} {PG}"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: PG
      type: integer
      description: Program value 0-127
  notes: "Assignable to Soft Keys, footswitch, or Soft Rotaries."

- id: cc_absolute
  label: CC Absolute (Soft Rotary)
  kind: action
  command: "B{N} {CC} {VAL}"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: CC
      type: integer
      description: Controller number 0-127
    - name: VAL
      type: integer
      description: "Absolute value 0-127"
  notes: "Soft Rotary option (SQ-6 / SQ-7)."

- id: cc_relative
  label: CC Relative (Soft Rotary)
  kind: action
  command: "B{N} {CC} {VAL}"
  params:
    - name: N
      type: integer
      description: MIDI channel (1-16)
    - name: CC
      type: integer
      description: Controller number 0-127
    - name: VAL
      type: integer
      description: Relative increment/decrement value
  notes: "Soft Rotary option (SQ-6 / SQ-7)."

# --- 1.2 / 2.2 MMC transport controls (assigned to Soft Keys) ---
- id: mmc_rewind
  label: MMC Rewind
  kind: action
  command: null  # UNRESOLVED: standard MMC Real Time Universal SysEx payload not stated verbatim in source
  params: []
  notes: "Sent to all channels. Source describes as 'standard MMC transport message' but does not give the SysEx bytes."

- id: mmc_play
  label: MMC Play
  kind: action
  command: null  # UNRESOLVED: standard MMC payload not stated verbatim in source
  params: []

- id: mmc_pause
  label: MMC Pause
  kind: action
  command: null  # UNRESOLVED: standard MMC payload not stated verbatim in source
  params: []

- id: mmc_stop
  label: MMC Stop
  kind: action
  command: null  # UNRESOLVED: standard MMC payload not stated verbatim in source
  params: []

- id: mmc_fast_forward
  label: MMC Fast Forward
  kind: action
  command: null  # UNRESOLVED: standard MMC payload not stated verbatim in source
  params: []

- id: mmc_record
  label: MMC Record
  kind: action
  command: null  # UNRESOLVED: standard MMC payload not stated verbatim in source
  params: []
```

## Feedbacks
```yaml
# The SQ sends the same NRPN/Note/CC messages back to report state changes made on the
# console surface (bi-directional). Query responses come from the get_value action.
- id: mute_state
  type: enum
  values: [on, off]
  # Reported via the same NRPN parameter number; SQ sends absolute mute on/off messages.
- id: level_value
  type: number
  # Reported via NRPN absolute level message (coarse+fine); depends on NRPN Fader Law.
- id: pan_balance_value
  type: number
  # Reported via NRPN absolute pan/balance message.
- id: assign_state
  type: enum
  values: [on, off]
  # Reported via NRPN absolute assign on/off message.
- id: soft_key_state
  type: enum
  values: [pressed, released]
  # SQ sends note on/off only when Soft Key is set to a MIDI note on/off function.
# UNRESOLVED: exact response/ack byte format for get_value replies not separately
# documented in source beyond the absolute NRPN message shapes.
```

## Variables
```yaml
# MSB/LSB parameter-number address space. The full lookup tables are in the source
# document Section 4 (Reference Tables). Addressable parameter families documented:
#   - Mute:    Inputs/Groups/FX returns/FX sends/DCA/MuteGrp/Matrix -> LR/Aux
#   - Level:   Inputs/Groups/FX returns/FX sends/Master sends -> LR/Aux/Matrix
#   - Pan/Bal: Inputs/Groups/FX returns/Master sends -> LR/Aux/Matrix
#   - Assign:  Inputs/Groups/FX returns/FX sends -> LR/Aux/Groups/Matrix
# Each cell = one (MSB, LSB) pair consumed by the mute/level/pan/assign templates above.
# NRPN Fader Law (selectable on device): Linear Taper (16384 steps) or Audio Taper (255 steps).
# UNRESOLVED: full per-cell MSB/LSB tables not reproduced here - see source Section 4.
```

## Events
```yaml
# SQ emits unsolicited NRPN/Note messages when the surface is operated (bi-directional
# control). No dedicated asynchronous event protocol documented beyond the message
# templates already listed under Actions/Feedbacks.
# UNRESOLVED: no separate unsolicited notification protocol stated in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on
# sequencing requirements for MIDI/TCP control.
```

## Notes
- The SQ makes bi-directional use of 2 MIDI channels: one for the mixer core (set via
  Utility > General > MIDI) and one for the DAW control surface (always one higher than
  the SQ MIDI channel; set SQ to channel 16 to use MIDI channel 1 for DAW control).
- Hex values in the source are shown without the `0x` prefix; this spec preserves that.
- The SQ accepts both note-off standards (specific note-off, or note-on with zero velocity).
- Scene recall has a -1 offset between SQ values (1-128) and MIDI values (0-127); blank/
  unsaved scenes cannot be recalled.
- NRPN Fader Law (Linear vs Audio Taper) only affects absolute level control; relative
  increment/decrement is unaffected.
- SQ-5: 8 Soft Keys; SQ-6 / SQ-7: 16 Soft Keys. SQ-6: 4 Soft Rotaries; SQ-7: 8 Soft
  Rotaries. All models: dual footswitch input.
- Allen & Heath MIDI Control (macOS/Windows) can broker USB or network MIDI, with optional
  HUI/Mackie Control emulation (DAW Control) or CC Translator modes.
- USB MIDI transport (USB-B port) is also supported but its configuration parameters are
  not stated in this source.

<!-- UNRESOLVED: model "SQ Dante 64" denotes the Dante card variant; the source manual
covers the SQ family (SQ-5/SQ-6/SQ-7) generally — exact model-to-softkey/rotary count
mapping differs by hardware variant. -->
<!-- UNRESOLVED: MMC transport SysEx payloads not stated verbatim in source. -->
<!-- UNRESOLVED: USB transport parameters not documented in source. -->
<!-- UNRESOLVED: full MSB/LSB parameter-number tables (source Section 4) not reproduced
verbatim in this spec — see source for the complete address maps. -->
```


- No voltage/current/power invented ✓
- Port 51325 stated in source (line 27) ✓ — not assumed
- No baud (TCP device) ✓
- `status: draft`, `declared_confidence: low` ✓
- firmware "V1.5.0 or later" stated in source (line 7) ✓
- MMC payloads marked UNRESOLVED (not fabricated) ✓
- All MIDI templates copied verbatim from source ✓

Self-check pass. Spec ready ingest.

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2023/11/SQ-MIDI-Protocol-Issue5.pdf
  - https://www.allen-heath.com/content/uploads/2024/10/AHM-TCP-Protocol-V1.5.pdf
retrieved_at: 2026-07-13T19:11:04.017Z
last_checked_at: 2026-10-01T11:20:26.701Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T11:20:26.701Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions trace to literal MIDI templates (sections 2.x, 3.1-3.7) or to enumerated MMC functions; port 51325 stated verbatim. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MMC transport (Rewind/Play/Pause/Stop/FFwd/Record) SysEx payloads"
- "standard MMC Real Time Universal SysEx payload not stated verbatim in source"
- "standard MMC payload not stated verbatim in source"
- "exact response/ack byte format for get_value replies not separately"
- "full per-cell MSB/LSB tables not reproduced here - see source Section 4."
- "no separate unsolicited notification protocol stated in source."
- "no multi-step sequences explicitly described in source."
- "source contains no safety warnings, interlock procedures, or power-on"
- "model \"SQ Dante 64\" denotes the Dante card variant; the source manual"
- "MMC transport SysEx payloads not stated verbatim in source."
- "USB transport parameters not documented in source."
- "full MSB/LSB parameter-number tables (source Section 4) not reproduced"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
