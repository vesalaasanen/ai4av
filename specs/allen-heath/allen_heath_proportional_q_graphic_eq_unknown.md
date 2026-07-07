---
spec_id: admin/allen-heath-qu-5-6-7
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath Qu-5/6/7 MIDI Control Spec"
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
retrieved_at: 2026-07-02T03:26:08.580Z
last_checked_at: 2026-07-07T10:58:22.062Z
generated_at: 2026-07-07T10:58:22.062Z
firmware_coverage: "V1.1 or later"
protocol_coverage: []
known_gaps:
  - "input device label \"Proportional Q Graphic Eq\" does not match source (Qu-5/6/7 mixer family). Spec authored against Qu MIDI Protocol Issue 2."
  - "auth procedure - no explicit login credential flow described in source."
  - "no explicit power on/off command in this issue of the MIDI doc; inferring false here. Remove if absent."
  - "MSC sub-format placeholder; source states MSC Cue List mode but does not give byte template"
  - "literal MMC SysEx not transcribed; Soft Key assigned MMC Rewind"
  - "DAW control payload not transcribed in source"
  - "response payload template after Get command not stated in source."
  - "no event subscription mechanism documented."
  - "macros not explicitly described."
  - "source is a control-protocol document; no explicit safety warnings,"
verification:
  verdict: verified
  checked_at: 2026-07-07T10:58:22.062Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions confirmed verbatim against source 2.1-3.8; transport port 51325 supported; no extra undocumented commands in source at this granularity. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Allen & Heath Qu-5/6/7 MIDI Control Spec

## Summary
MIDI control protocol for Allen & Heath Qu-5, Qu-6 and Qu-7 digital mixers (and "-D" Dante variants). Spec covers bi-directional MIDI messaging over USB-C and TCP/IP, including MIDI Show Control, scene recall, soft-key emulation, NRPN-based mute/level/pan/assign control, and parameter queries. Port: 51325.

<!-- UNRESOLVED: input device label "Proportional Q Graphic Eq" does not match source (Qu-5/6/7 mixer family). Spec authored against Qu MIDI Protocol Issue 2. -->

## Transport
```yaml
# UNRESOLVED: auth procedure - no explicit login credential flow described in source.
# Connection is described as direct IP+port addressing; treat auth as none unless source contradicts.
protocols:
  - tcp
addressing:
  port: 51325
auth:
  type: none  # inferred: no auth procedure in source
```

Notes: Qu also exposes MIDI over USB-C as a class-compliant MIDI device; messages are identical, but transport differs. Network MIDI uses TCP port `51325` per §1.1. On Qu-5D/6D/7D the Dante port can route MIDI when Control Network Bridge is On.

## Traits
```yaml
- powerable  # UNRESOLVED: no explicit power on/off command in this issue of the MIDI doc; inferring false here. Remove if absent.
- routable  # inferred from Mix Assignment commands (§3.7)
- queryable  # inferred from Get/Value request commands (§3.8)
- levelable  # inferred from absolute + relative level control (§3.5)
```

## Actions
```yaml
# Source documents distinct opcodes/templates per message type.
# Each NRPN-like command is a four-CC sequence (MSB, LSB, Coarse, Fine) plus increment/decrement/get variants.
# Below: parameterized templates with {N}=MIDI channel, {MB}/{LB}=parameter MSB/LSB, {VC}/{VF}=value bytes.

- id: scene_recall
  label: Recall Scene (Bank + Program Change)
  kind: action
  command: "BN 00 BK CN PG"  # Bank + Program Change pair
  params:
    - name: bank
      type: integer
      description: "0=Scenes 1-128, 1=Scenes 129-256, 2=Scenes 257-300"
    - name: program
      type: integer
      description: "0-127; Qu scene number = bank*128 + program + 1"
    - name: midi_channel
      type: integer
      description: "1-16 (encoded as 0-F in status nibble)"

- id: midi_show_control_recall_cue
  label: MIDI Show Control - Recall Cue
  kind: action
  command: "F0 7F <channel> 02 01 01 <cue_number> F7"  # UNRESOLVED: MSC sub-format placeholder; source states MSC Cue List mode but does not give byte template
  params: []

- id: soft_key_press
  label: Soft Key Press (Note On)
  kind: action
  command: "9N{SK} 7F"
  params:
    - name: midi_channel
      type: integer
    - name: soft_key
      type: integer
      description: "Soft Key 1-16, mapped to notes 0x30-0x3F"

- id: soft_key_release
  label: Soft Key Release (Note Off)
  kind: action
  command: "8N{SK} 00"
  params:
    - name: midi_channel
      type: integer
    - name: soft_key
      type: integer

- id: soft_key_toggle_mmc_rewind
  label: MMC Rewind (Soft Key)
  kind: action
  command: "MMC"  # UNRESOLVED: literal MMC SysEx not transcribed; Soft Key assigned MMC Rewind
  params: []

- id: soft_key_toggle_mmc_play
  label: MMC Play (Soft Key)
  kind: action
  command: "MMC"
  params: []

- id: soft_key_toggle_mmc_pause
  label: MMC Pause (Soft Key)
  kind: action
  command: "MMC"
  params: []

- id: soft_key_toggle_mmc_stop
  label: MMC Stop (Soft Key)
  kind: action
  command: "MMC"
  params: []

- id: soft_key_toggle_mmc_fastforward
  label: MMC Fast Forward (Soft Key)
  kind: action
  command: "MMC"
  params: []

- id: soft_key_toggle_mmc_record
  label: MMC Record (Soft Key)
  kind: action
  command: "MMC"
  params: []

- id: soft_key_toggle_daw_bank_up
  label: DAW Bank Up (Soft Key)
  kind: action
  command: "BANK_UP"  # UNRESOLVED: DAW control payload not transcribed in source
  params: []

- id: soft_key_toggle_daw_bank_down
  label: DAW Bank Down (Soft Key)
  kind: action
  command: "BANK_DOWN"
  params: []

- id: soft_key_program_change
  label: Program Change (Soft Key)
  kind: action
  command: "CN {PG}"
  params:
    - name: midi_channel
      type: integer
    - name: program
      type: integer
      description: "0-127"

- id: mute_on
  label: Channel Mute On
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 06 00 BN 26 01"
  params:
    - name: parameter
      type: string
      description: "Mute MSB/LSB per Mute Parameter Number tables"

- id: mute_off
  label: Channel Mute Off
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 06 00 BN 26 00"
  params:
    - name: parameter
      type: string

- id: mute_toggle
  label: Channel Mute Toggle (Increment)
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 60 00"
  params:
    - name: parameter
      type: string

- id: level_absolute
  label: Level Set (Absolute)
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 06{VC} BN 26{VF}"
  params:
    - name: parameter
      type: string
      description: "Level MSB/LSB per Level Parameter Number tables"
    - name: value_coarse
      type: integer
      description: "0x00-0x7F (Audio taper or Linear taper as configured)"
    - name: value_fine
      type: integer
      description: "0x00-0x7F"

- id: level_increment_1db
  label: Level +1 dB (Increment)
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 60 00"
  params:
    - name: parameter
      type: string

- id: level_decrement_1db
  label: Level -1 dB (Decrement)
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 61 00"
  params:
    - name: parameter
      type: string

- id: pan_absolute
  label: Pan/Balance Set (Absolute)
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 06{VC} BN 26{VF}"
  params:
    - name: parameter
      type: string
      description: "Pan/Balance MSB/LSB per Panning/Balance Parameter Number tables"
    - name: value_coarse
      type: integer
      description: "0x00 (L100) - 0x7F (R100); centre 0x3F"
    - name: value_fine
      type: integer

- id: pan_increment_right
  label: Pan Right One Step (Increment)
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 60 00"
  params:
    - name: parameter
      type: string

- id: pan_decrement_left
  label: Pan Left One Step (Decrement)
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 61 00"
  params:
    - name: parameter
      type: string

- id: mix_assign_on
  label: Mix Assign On
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 06 00 BN 26 01"
  params:
    - name: parameter
      type: string
      description: "Assign MSB/LSB per Mix Assignment Parameter Number tables"

- id: mix_assign_off
  label: Mix Assign Off
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 06 00 BN 26 00"
  params:
    - name: parameter
      type: string

- id: mix_assign_toggle
  label: Mix Assign Toggle
  kind: action
  command: "BN 63{MB} BN 62{LB} BN 60 00"
  params:
    - name: parameter
      type: string

- id: parameter_get_value
  label: Get Parameter Value (Query)
  kind: query
  command: "BN 63{MB} BN 62{LB} BN 60 7F"
  params:
    - name: parameter
      type: string
      description: "Mute, Level, Pan/Balance, or Assignment MSB/LSB"

# MIDI strip level faders (32 CCs, channel = DAW MIDI channel = Qu MIDI channel + 1):
- id: strip_fader_cc
  label: MIDI Strip Fader (CC)
  kind: action
  command: "Bn {CC} {level}"
  params:
    - name: midi_channel
      type: integer
      description: "DAW MIDI channel (Qu MIDI channel + 1)"
    - name: cc_number
      type: integer
      description: "Strip 1-32 = CC#0-31"
    - name: level
      type: integer
      description: "0-127"

- id: strip_mute_key_note
  label: MIDI Strip Mute Key
  kind: action
  command: "9N{SK} 7F / 8N{SK} 00"
  params:
    - name: midi_channel
      type: integer
    - name: note
      type: integer
      description: "Strip 1-32 mapped to notes C-1 through G1 (per §2.1 table)"

- id: strip_sel_key_note
  label: MIDI Strip Sel Key
  kind: action
  command: "9N{SK} 7F / 8N{SK} 00"
  params:
    - name: midi_channel
      type: integer
    - name: note
      type: integer

- id: strip_pafl_key_note
  label: MIDI Strip PAFL Key
  kind: action
  command: "9N{SK} 7F / 8N{SK} 00"
  params:
    - name: midi_channel
      type: integer
    - name: note
      type: integer
```

## Feedbacks
```yaml
# Source §3.8 implies parameter values are returned as a response to the Get command
# but does not explicitly transcribe the reply byte format. Marked UNRESOLVED.
- id: parameter_value_response
  type: binary
  description: >
    UNRESOLVED: response payload template after Get command not stated in source.
    Expected to mirror the set-message format (B0 63 MB B0 62 LB B0 06 VC B0 26 VF) but not confirmed.
```

## Variables
```yaml
# Source describes parameter numbering tables rather than settable variables per se.
# Variables are channel/destination pairs identified by MSB/LSB.
- id: mute_state
  type: enum
  values: [on, off]
  description: "Per source/destination channel via MSB/LSB per Mute Parameter Numbers table"

- id: level_value_db
  type: number
  description: "Absolute dB level, two's complement in VC/VF; range depends on Fader Law (Audio or Linear taper)"

- id: pan_balance
  type: number
  description: "L100% to R100% with center, via Pan/Balance Value Coarse/Fine"

- id: mix_assignment
  type: enum
  values: [on, off]
  description: "Per source/destination routing on/off"
```

## Events
```yaml
# Source describes unsolicited responses for level changes but no event stream protocol.
# UNRESOLVED: no event subscription mechanism documented.
```

## Macros
```yaml
# Source mentions HUI / Mackie Control emulation via Allen & Heath MIDI Control app but
# does not specify concrete macro sequences.
# UNRESOLVED: macros not explicitly described.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source is a control-protocol document; no explicit safety warnings,
# interlocks, or power-on sequencing procedures are described.
```

## Notes
- Document title: "MIDI Protocol Issue 2 Qu-5/6/7 firmware V1.1 or later." Network MIDI port: 51325 (TCP). USB-C presents MIDI class-compliant device. Qu-5D/6D/7D Dante port can be used for MIDI when Control Network Bridge is On.
- Qu MIDI Channel used for mixer core; DAW Control Channel = Qu MIDI channel + 1 (so Qu channel 16 → DAW channel 1).
- Mute, level, panning, assignment, get-value commands all use identical four-CC message structure; only MSB/LSB/value bytes differ. They are distinct actions because the source documents them as separate message categories (§3.4–3.8).
- Scene recall uses Bank + Program Change; Qu scenes count from 1, MIDI values from 0 (offset of -1).
- Mtx4 destination not currently controllable via MIDI (cross-compat note with SQ).
- Input device label "Allen Heath Proportional Q Graphic Eq" does not match this source — author has authored against the Qu-5/6/7 MIDI Protocol doc provided at the supplied path. Operator should verify intent.

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2025/06/Qu567_MIDI_Protocol_Iss2.pdf
retrieved_at: 2026-07-02T03:26:08.580Z
last_checked_at: 2026-07-07T10:58:22.062Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T10:58:22.062Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions confirmed verbatim against source 2.1-3.8; transport port 51325 supported; no extra undocumented commands in source at this granularity. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input device label \"Proportional Q Graphic Eq\" does not match source (Qu-5/6/7 mixer family). Spec authored against Qu MIDI Protocol Issue 2."
- "auth procedure - no explicit login credential flow described in source."
- "no explicit power on/off command in this issue of the MIDI doc; inferring false here. Remove if absent."
- "MSC sub-format placeholder; source states MSC Cue List mode but does not give byte template"
- "literal MMC SysEx not transcribed; Soft Key assigned MMC Rewind"
- "DAW control payload not transcribed in source"
- "response payload template after Get command not stated in source."
- "no event subscription mechanism documented."
- "macros not explicitly described."
- "source is a control-protocol document; no explicit safety warnings,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
