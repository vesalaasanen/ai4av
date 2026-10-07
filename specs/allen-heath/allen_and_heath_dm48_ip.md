---
spec_id: admin/allen-heath-dm48
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath Dm48 Control Spec"
manufacturer: "Allen & Heath"
model_family: Dm48
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - Dm48
  firmware: V1.5
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usermanual.wiki
  - shop.ccisolutions.com
source_urls:
  - https://usermanual.wiki/m/17f57c351c70e570df06460d46999bf4dd7a0af4e24c599f71593674847ef3d5.pdf
  - https://shop.ccisolutions.com/StoreFront/jsp/pdf/ANH-DLIVEDM48_brochure.pdf
retrieved_at: 2026-07-13T18:49:54.279Z
last_checked_at: 2026-10-07T13:25:07.056Z
generated_at: 2026-10-07T13:25:07.056Z
firmware_coverage: V1.5
protocol_coverage: []
known_gaps:
  - "MMC (MIDI Machine Control) commands mentioned as a controllable function but specific MMC command payloads not documented in the source."
  - "Dm48-specific socket count (48) inferred from model name; protocol doc covers entire dLive range (up to 128 inputs, 64 mixrack sockets)."
  - "no multi-step sequences explicitly documented in source"
  - "no safety warnings or interlock procedures found in source."
  - "MMC (MIDI Machine Control) specific command payloads not documented in source — only listed as a controllable function."
  - "No receive buffer/timeout/retry behavior documented."
  - "Firmware version compatibility range stated as \"V1.5 and later\" but no upper bound."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:25:07.056Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 action units match the dLive TCP/IP protocol source with correct shapes and port 51325; source names no DM48 model, so applicability is family-level. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Allen & Heath Dm48 Control Spec

## Summary
The Allen & Heath Dm48 is a dLive MixRack providing 48 mic preamp sockets within the dLive digital mixing system. This spec covers TCP/IP control via MIDI-format messages as documented in the dLive TCP/IP Protocol reference (firmware V1.5+). Control includes fader levels, mutes, send levels, DCA/Mute Group assignment, preamp control (gain, pad, 48V), channel naming/colour, scene recall, and MIDI transport.

<!-- UNRESOLVED: MMC (MIDI Machine Control) commands mentioned as a controllable function but specific MMC command payloads not documented in the source. -->
<!-- UNRESOLVED: Dm48-specific socket count (48) inferred from model name; protocol doc covers entire dLive range (up to 128 inputs, 64 mixrack sockets). -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 51325  # stated: "Clients should be configured to use TCP port 51325"
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
# Messages are MIDI-format (hex) sent over TCP/IP.
# SysEx Header for all SysEx messages: F0 00 00 1A 50 10 01 00
#   where MV=01 (Major version), mV=00 (Minor version)
# Base MIDI channel N selected in Utility / Control / MIDI.
# Audio channel type selected by offsetting MIDI channel from base N.
```

## Traits
```yaml
traits:
  - levelable    # inferred: fader levels, send levels, preamp gain control present
  - queryable    # inferred: pad/48V/name/colour query commands present
  - routable     # inferred: AUX/FX/Matrix send and Main assign commands present
```

## Actions
```yaml
# Channel selection: audio channel type selected by offsetting MIDI channel from
# base N. N = lowest channel selected in Utility / Control / MIDI.
# Channel type offsets: Inputs N+0, Mono Groups N+1, Stereo Groups N+1,
#   Mono Aux N+2, Stereo Aux N+2, Mono Matrix N+3, Stereo Matrix N+3,
#   Mono FX Send N+4, Stereo FX Send N+4, FX Return N+4, Mains N+4, DCA N+4,
#   Mute Group N+4. See source channel selection table for CH note ranges.
#
# SysEx Header = F0 00 00 1A 50 10 01 00

- id: mute_on
  label: Mute On
  kind: action
  command: "9{N}, {CH}, 7F, 9{N}, {CH}, 00"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F), selected in Utility / Control / MIDI
    - name: CH
      type: integer
      description: Note number for target channel (hex), per channel selection table
  notes: NOTE ON velocity > 40 followed by NOTE OFF

- id: mute_off
  label: Mute Off
  kind: action
  command: "9{N}, {CH}, 3F, 9{N}, {CH}, 00"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)
  notes: NOTE ON velocity < 40 followed by NOTE OFF

- id: fader_level_set
  label: Fader Level Set
  kind: action
  command: "B{N}, 63, {CH}, B{N}, 62, 17, B{N}, 06, {LV}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)
    - name: LV
      type: integer
      description: "Fader value -inf to +10dB = 00 to 7F (hex)"
  notes: NRPN with parameter ID 17

- id: assign_to_main_on
  label: Channel Assignment to Main Mix On
  kind: action
  command: "B{N}, 63, {CH}, B{N}, 62, 18, B{N}, 06, 7F"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)
  notes: NRPN with parameter ID 18, ON value = 40 to 7F

- id: assign_to_main_off
  label: Channel Assignment to Main Mix Off
  kind: action
  command: "B{N}, 63, {CH}, B{N}, 62, 18, B{N}, 06, 3F"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)
  notes: NRPN with parameter ID 18, OFF value = 00 to 3F

- id: aux_fx_matrix_send_level
  label: AUX / FX / Matrix Send Level
  kind: action
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 0D, {CH}, {SndN}, {SndCH}, {LV}, F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for source channel (hex)
    - name: SndN
      type: integer
      description: MIDI channel for destination send bus
    - name: SndCH
      type: integer
      description: Note number for destination send bus
    - name: LV
      type: integer
      description: "Send value -inf to +10dB = 00 to 7F (hex)"
  notes: SysEx message. SndN and SndCH are the MIDI channel and note number for the channel to be sent to.

- id: dca_assign_on
  label: DCA Assignment On
  kind: action
  command: "B{N}, 63, {CH}, B{N}, 62, 40, B{N}, 06, {DB}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)
    - name: DB
      type: integer
      description: "DCA 1-24 = 40 to 57 (hex)"
  notes: NRPN with parameter ID 40

- id: dca_assign_off
  label: DCA Assignment Off
  kind: action
  command: "B{N}, 63, {CH}, B{N}, 62, 40, B{N}, 06, {DA}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)
    - name: DA
      type: integer
      description: "DCA 1-24 = 00 to 17 (hex)"
  notes: NRPN with parameter ID 40

- id: mute_group_assign_on
  label: Mute Group Assignment On
  kind: action
  command: "B{N}, 63, {CH}, B{N}, 62, 40, B{N}, 06, {DB}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)
    - name: DB
      type: integer
      description: "Mute Group 1-8 = 58 to 5F (hex)"
  notes: NRPN with parameter ID 40

- id: mute_group_assign_off
  label: Mute Group Assignment Off
  kind: action
  command: "B{N}, 63, {CH}, B{N}, 62, 40, B{N}, 06, {DA}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)
    - name: DA
      type: integer
      description: "Mute Group 1-8 = 18 to 1F (hex)"
  notes: NRPN with parameter ID 40

- id: preamp_gain_set
  label: Socket Preamp Gain Set
  kind: action
  command: "E{N}, {MP}, {GV}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: MP
      type: integer
      description: "Preamp socket number (hex). Mixrack sockets 1-64 = 00-3F, DX 1/2 = 40-5F, DX 3/4 = 60-7F"
    - name: GV
      type: integer
      description: "Gain min to max = 00 to 7F (hex). +10dB=00, +60dB=7F"
  notes: Pitchbend message. Adjusts gain of preamp at a socket.

- id: preamp_pad_get
  label: Socket Preamp Pad Status Query
  kind: query
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 07, {MP}, F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: MP
      type: integer
      description: Preamp socket number (hex)

- id: preamp_pad_set
  label: Socket Preamp Pad Set
  kind: action
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 09, {MP}, {Pad}, F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: MP
      type: integer
      description: Preamp socket number (hex)
    - name: Pad
      type: integer
      description: "OFF = 00 to 3F, ON = 40 to 7F (hex)"

- id: preamp_48v_get
  label: Socket Preamp 48V Status Query
  kind: query
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 0A, {MP}, F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: MP
      type: integer
      description: Preamp socket number (hex)

- id: preamp_48v_set
  label: Socket Preamp 48V Set
  kind: action
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 0C, {MP}, {48V}, F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: MP
      type: integer
      description: Preamp socket number (hex)
    - name: 48V
      type: integer
      description: "OFF = 00 to 3F, ON = 40 to 7F (hex)"
  notes: Phantom Power on/off

- id: channel_name_get
  label: Channel Name Query
  kind: query
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 01, {CH}, F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)

- id: channel_name_set
  label: Channel Name Set
  kind: action
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 03, {CH}, {Name}, F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)
    - name: Name
      type: string
      description: Hex ASCII string, up to 8 characters (5 displayable on strip LCD)

- id: channel_colour_get
  label: Channel Colour Query
  kind: query
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 04, {CH}, F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)

- id: channel_colour_set
  label: Channel Colour Set
  kind: action
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 06, {CH}, {Col}, F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: CH
      type: integer
      description: Note number for target channel (hex)
    - name: Col
      type: integer
      description: "00=Off, 01=Red, 02=Green, 03=Yellow, 04=Blue, 05=Purple, 06=Lt Blue, 07=White"

- id: scene_recall
  label: Scene Recall
  kind: action
  command: "B{N}, 00, {Bank}, C{N}, {SS}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-F)
    - name: Bank
      type: integer
      description: "Bank select: 00=Scenes 1-128, 01=Scenes 129-256, 02=Scenes 257-384, 03=Scenes 385-500"
    - name: SS
      type: integer
      description: "Scene within bank (hex). 00 to 7F for banks 1-3, 00 to 73 for bank 4"
  notes: Bank and Program Change message. 500 Scenes across 4 banks. dLive also transmits this when a Scene is recalled from the dLive screen.

- id: midi_strip_fader_output
  label: MIDI Strip Fader Output
  kind: action
  command: "B1, 00, <VAR> to B1, 1F, <VAR>"
  params:
    - name: Strip
      type: integer
      description: "MIDI Strip index: 00 to 1F"
    - name: VAR
      type: integer
      description: value determined by the position of the control

- id: midi_strip_rotary_gain_output
  label: MIDI Strip Rotary Gain Output
  kind: action
  command: "B2, 00, <VAR> to B2, 1F, <VAR>"
  params:
    - name: Strip
      type: integer
      description: "MIDI Strip index: 00 to 1F"
    - name: VAR
      type: integer
      description: value determined by the position of the control

- id: midi_strip_rotary_pan_output
  label: MIDI Strip Rotary Pan Output
  kind: action
  command: "B2, 20, <VAR> to B2, 3F, <VAR>"
  params:
    - name: Strip
      type: integer
      description: "MIDI Strip index: 20 to 3F"
    - name: VAR
      type: integer
      description: value determined by the position of the control

- id: midi_strip_rotary_custom_1_output
  label: MIDI Strip Rotary Custom 1 Output
  kind: action
  command: "B2, 40, <VAR> to B2, 5F, <VAR>"
  params:
    - name: Strip
      type: integer
      description: "MIDI Strip index: 40 to 5F"
    - name: VAR
      type: integer
      description: value determined by the position of the control

- id: midi_strip_rotary_custom_2_output
  label: MIDI Strip Rotary Custom 2 Output
  kind: action
  command: "B2, 60, <VAR> to B2, 7F, <VAR>"
  params:
    - name: Strip
      type: integer
      description: "MIDI Strip index: 60 to 7F"
    - name: VAR
      type: integer
      description: value determined by the position of the control

- id: midi_strip_rotary_custom_3_output
  label: MIDI Strip Rotary Custom 3 Output
  kind: action
  command: "B2, 40, <VAR> to B2, 5F, <VAR>"
  params:
    - name: Strip
      type: integer
      description: "MIDI Strip index: 40 to 5F"
    - name: VAR
      type: integer
      description: value determined by the position of the control
  notes: By default, Rotary Custom 3 uses the same values as Rotary Custom 1.

- id: midi_strip_rotary_custom_4_output
  label: MIDI Strip Rotary Custom 4 Output
  kind: action
  command: "B2, 60, <VAR> to B2, 7F, <VAR>"
  params:
    - name: Strip
      type: integer
      description: "MIDI Strip index: 60 to 7F"
    - name: VAR
      type: integer
      description: value determined by the position of the control
  notes: By default, Rotary Custom 4 uses the same values as Rotary Custom 2.

- id: midi_strip_mute_key_output
  label: MIDI Strip Mute Key Output
  kind: action
  command: "=91, 00, <VAR> to 91, 1F, <VAR>"
  params:
    - name: Strip
      type: integer
      description: "MIDI Strip index: 00 to 1F"
    - name: VAR
      type: integer
      description: value determined by the position of the control

- id: midi_strip_mix_key_output
  label: MIDI Strip Mix Key Output
  kind: action
  command: "=91, 20, <VAR> to 91, 3F, <VAR>"
  params:
    - name: Strip
      type: integer
      description: "MIDI Strip index: 20 to 3F"
    - name: VAR
      type: integer
      description: value determined by the position of the control

- id: midi_strip_pafl_key_output
  label: MIDI Strip PAFL Key Output
  kind: action
  command: "=91, 40, <VAR> to 91, 5F, <VAR>"
  params:
    - name: Strip
      type: integer
      description: "MIDI Strip index: 40 to 5F"
    - name: VAR
      type: integer
      description: value determined by the position of the control
```

## Feedbacks
```yaml
- id: preamp_pad_status
  type: enum
  values: [off, on]
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 08, {MP}, {Pad}, F7"
  query_command: "F0 00 00 1A 50 10 01 00, 0{N}, 07, {MP}, F7"
  notes: "Reply to pad query. Pad OFF=00, ON=7F"

- id: preamp_48v_status
  type: enum
  values: [off, on]
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 0B, {MP}, {48V}, F7"
  query_command: "F0 00 00 1A 50 10 01 00, 0{N}, 0A, {MP}, F7"
  notes: "Reply to 48V query. 48V OFF=00, ON=7F"

- id: channel_name_reply
  type: string
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 02, {CH}, {Name}, F7"
  query_command: "F0 00 00 1A 50 10 01 00, 0{N}, 01, {CH}, F7"
  notes: "Reply to name query. Name = Hex ASCII String"

- id: channel_colour_reply
  type: enum
  values: [off, red, green, yellow, blue, purple, lt_blue, white]
  command: "F0 00 00 1A 50 10 01 00, 0{N}, 05, {CH}, {Col}, F7"
  query_command: "F0 00 00 1A 50 10 01 00, 0{N}, 04, {CH}, F7"
  notes: "Reply to colour query. Col = 00 to 07"
```

## Variables
```yaml
# Fader level (LV): -inf to +10dB mapped to 00-7F
# Preamp gain (GV): min to max mapped to 00-7F
# Send level (LV): -inf to +10dB mapped to 00-7F
# These are settable via actions above; no additional variables beyond those.
```

## Events
```yaml
- id: scene_recall_transmitted
  description: dLive transmits Bank/Program Change when a Scene is recalled from the dLive screen
  command: "B{N}, 00, {Bank}, C{N}, {SS}"

# MIDI Strips: dLive transmits custom MIDI messages from assigned fader strip
# controls. Factory defaults (restorable via Scene 9 in Template Show):
#   Fader:        B1, 00-1F, <VAR>
#   Rotary Gain:  B2, 00-1F, <VAR>
#   Rotary Pan:   B2, 20-3F, <VAR>
#   Rotary C1:    B2, 40-5F, <VAR>
#   Rotary C2:    B2, 60-7F, <VAR>
#   Rotary C3:    B2, 40-5F, <VAR>  (same as C1 by default)
#   Rotary C4:    B2, 60-7F, <VAR>  (same as C2 by default)
#   Mute key:     91, 00-1F, <VAR>
#   Mix key:      91, 20-3F, <VAR>
#   PAFL key:     91, 40-5F, <VAR>
# Where <VAR> = value determined by control position.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source.
# Note: 48V (phantom power) control is present but no safety interlock documented.
```

## Notes
- Protocol uses MIDI-format messages (hex) transmitted over TCP/IP on port 51325.
- Available via any Network port on the dLive Surface or MixRack.
- SysEx header for all SysEx messages: `F0 00 00 1A 50 10 01 00` (manufacturer ID 00 00 1A, device 50 10, version MV=01 mV=00).
- Base MIDI channel N is configured in Utility / Control / MIDI. Audio channel types are selected by offsetting from N:
  - Inputs 1-128: N+0, CH=00-7F
  - Mono Groups 1-62: N+1, CH=00-3D; Stereo Groups 1-31: N+1, CH=40-5E
  - Mono Aux 1-62: N+2, CH=00-3D; Stereo Aux 1-31: N+2, CH=40-5E
  - Mono Matrix 1-62: N+3, CH=00-3D; Stereo Matrix 1-31: N+3, CH=40-5E
  - Mono FX Send 1-16: N+4, CH=00-0F; Stereo FX Send 1-16: N+4, CH=10-1F
  - FX Return 1-16: N+4, CH=20-2F
  - Mains 1-6: N+4, CH=30-35
  - DCA 1-24: N+4, CH=36-4D
  - Mute Group 1-8: N+4, CH=4E-55
- Mute message velocity interpretation: velocity 00 and NOTE OFF ignored; velocity 01-3F = Mute OFF; velocity 40-7F = Mute ON.
- Preamp control, scene recall, and MIDI transport use the base MIDI channel N.
- 32 MIDI Strips available; fader strips assignable as custom MIDI controllers for DAW/external equipment control.

<!-- UNRESOLVED: MMC (MIDI Machine Control) specific command payloads not documented in source — only listed as a controllable function. -->
<!-- UNRESOLVED: No receive buffer/timeout/retry behavior documented. -->
<!-- UNRESOLVED: Firmware version compatibility range stated as "V1.5 and later" but no upper bound. -->

## Provenance

```yaml
source_domains:
  - usermanual.wiki
  - shop.ccisolutions.com
source_urls:
  - https://usermanual.wiki/m/17f57c351c70e570df06460d46999bf4dd7a0af4e24c599f71593674847ef3d5.pdf
  - https://shop.ccisolutions.com/StoreFront/jsp/pdf/ANH-DLIVEDM48_brochure.pdf
retrieved_at: 2026-07-13T18:49:54.279Z
last_checked_at: 2026-10-07T13:25:07.056Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:25:07.056Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 action units match the dLive TCP/IP protocol source with correct shapes and port 51325; source names no DM48 model, so applicability is family-level. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MMC (MIDI Machine Control) commands mentioned as a controllable function but specific MMC command payloads not documented in the source."
- "Dm48-specific socket count (48) inferred from model name; protocol doc covers entire dLive range (up to 128 inputs, 64 mixrack sockets)."
- "no multi-step sequences explicitly documented in source"
- "no safety warnings or interlock procedures found in source."
- "MMC (MIDI Machine Control) specific command payloads not documented in source — only listed as a controllable function."
- "No receive buffer/timeout/retry behavior documented."
- "Firmware version compatibility range stated as \"V1.5 and later\" but no upper bound."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
