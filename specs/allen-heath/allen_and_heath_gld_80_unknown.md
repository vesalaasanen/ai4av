---
spec_id: admin/allen-heath-gld-80
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath GLD-80 Control Spec"
manufacturer: "Allen & Heath"
model_family: GLD-80
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - GLD-80
  firmware: "\"V1.4\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2023/06/GLD-MIDI-and-TCPIP-Protocol-V1.4_2.pdf
  - https://www.allen-heath.com/hardware/legacy-products/gld-80/resources/
retrieved_at: 2026-07-13T19:27:41.105Z
last_checked_at: 2026-07-21T20:06:11.468Z
generated_at: 2026-07-21T20:06:11.468Z
firmware_coverage: "\"V1.4\""
protocol_coverage: []
known_gaps:
  - "voltage, current, power, and physical pinout of MIDI/Network ports not stated in source."
  - "none beyond what is covered by Actions."
  - "source does not document any multi-step command sequences"
  - "source contains no formal safety or interlock procedures;"
  - "source does not state baud/data/parity for the 5-pin MIDI sockets (MIDI spec is implicit). Source does not document fault behavior, error recovery, firmware version compatibility ranges below V1.1, or transport-layer authentication for TCP port 51325."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:06:11.468Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched source commands with exact literal wire tokens; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Allen & Heath GLD-80 Control Spec

## Summary
Digital mixing console with MIDI control via the rear-panel MIDI In/Out sockets and TCP/IP control via the Network port. TCP/IP wraps the same MIDI message set; clients connect to TCP port 51325. This spec enumerates every command documented in the GLD MIDI Protocol (firmware V1.4).

<!-- UNRESOLVED: voltage, current, power, and physical pinout of MIDI/Network ports not stated in source. -->

## Transport
```yaml
protocols:
  - midi
  - tcp
addressing:
  port: 51325  # source: "Clients should be configured to use TCP port 51325"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - levelable  # fader levels, send levels
  - routable  # input to main assign, DCA assign
# Note: no power/toggle or unsolicited-event evidence in this MIDI protocol doc.
# powerable not inferred - GLD is a console, no power command in this doc.
# queryable not inferred - get/Pad-status and get/Name reply messages exist
# but at protocol level they are reply sysex pairs; listed under Feedbacks below.
```

## Actions

```yaml
- id: mute_on
  label: Mute On
  kind: action
  command: "9{N} {CH} 7F  9{N} {CH} 00"  # NOTE ON vel>40 + NOTE OFF pair
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table: FX Send 1-8 = 00-07, FX Return 1-8 = 08-0F, DCA 1-16 = 10-1F, Input 1-48 = 20-4F, Mix 1-20 = 60-73)

- id: mute_off
  label: Mute Off
  kind: action
  command: "9{N} {CH} 3F  9{N} {CH} 00"  # NOTE ON vel<40 + NOTE OFF pair
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table)

- id: fader_level
  label: Set Fader Level
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 17  B{N} 06 {LV}"  # NRPN param ID 17
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table)
    - name: LV
      type: integer
      description: Fader value -inf to +10dB = 00-7F (see Fader level table)

- id: assign_to_main_on
  label: Channel Assign to Main Mix ON
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 18  B{N} 06 7F"  # NRPN param ID 18, value 40-7F
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table)

- id: assign_to_main_off
  label: Channel Assign to Main Mix OFF
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 18  B{N} 06 3F"  # NRPN param ID 18, value 00-3F
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table)

- id: aux_fx_send_level
  label: Set AUX/FX Send Level
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 {Snd}  B{N} 06 {LV}"  # NRPN param ID Snd for Mix 1-30 = 20-3D
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Source channel number (see CH table)
    - name: Snd
      type: integer
      description: Parameter ID 20-3D (Mix 1-30 target send)
    - name: LV
      type: integer
      description: Send value -inf to +10dB = 00-7F

- id: dca_assign_on
  label: DCA Assign ON
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 40  B{N} 06 {DB}"  # NRPN param ID 40, value 40-4F for DCA 1-16
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table)
    - name: DB
      type: integer
      description: DCA target 1-16 = 40-4F (hex)

- id: dca_assign_off
  label: DCA Assign OFF
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 40  B{N} 06 {DA}"  # NRPN param ID 40, value 00-0F for DCA 1-16
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table)
    - name: DA
      type: integer
      description: DCA target 1-16 = 00-0F (hex)

- id: preamp_gain
  label: Socket Preamp Gain
  kind: action
  command: "E{N} {MP} {GV}"  # Pitchbend message
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: MP
      type: integer
      description: Preamp socket number (dSNAKE 1-24=00-17, dSNAKE Exp 1-8=18-1F, dSNAKE Exp 9-16=28-2F, Surface Exp 1-8=20-27, Surface 41-44=30-33)
    - name: GV
      type: integer
      description: Gain value +10 to +60 dB = 00-7F (see Gain value table)

- id: preamp_pad_get
  label: Get Socket Preamp Pad Status
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0{N} 07 {MP} F7"  # Sysex Header, 07, MP
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: MP
      type: integer
      description: Preamp socket number

- id: preamp_pad_set
  label: Set Socket Preamp Pad
  kind: action
  command: "F0 00 00 1A 50 10 01 00 0{N} 09 {MP} {Pad} F7"  # OFF=00-3F, ON=40-7F
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: MP
      type: integer
      description: Preamp socket number
    - name: Pad
      type: integer
      description: OFF=00-3F, ON=40-7F

- id: preamp_48v_get
  label: Get Socket Preamp 48V Status
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0{N} 0A {MP} F7"
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: MP
      type: integer
      description: Preamp socket number

- id: preamp_48v_set
  label: Set Socket Preamp 48V (Phantom Power)
  kind: action
  command: "F0 00 00 1A 50 10 01 00 0{N} 0C {MP} {48V} F7"  # OFF=00-3F, ON=40-7F
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: MP
      type: integer
      description: Preamp socket number
    - name: "48V"
      type: integer
      description: "OFF = 00-3F, ON = 40-7F"

- id: channel_name_get
  label: Get Channel Name
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0{N} 01 {CH} F7"
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table)

- id: channel_name_set
  label: Set Channel Name
  kind: action
  command: "F0 00 00 1A 50 10 01 00 0{N} 03 {CH} {Name} F7"  # Name = up to 8 hex ASCII chars (5 displayed)
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table)
    - name: Name
      type: string
      description: Up to 8 hex ASCII characters (up to 5 displayed on GLD strip LCD)

- id: channel_colour_get
  label: Get Channel Colour
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0{N} 04 {CH} F7"
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table)

- id: channel_colour_set
  label: Set Channel Colour
  kind: action
  command: "F0 00 00 1A 50 10 01 00 0{N} 06 {CH} {Col} F7"  # Col = 00-07
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table)
    - name: Col
      type: integer
      description: "Colour index 00-07 (off = 00; 7 colours; 00 = off per source)"

- id: scene_recall_bank0
  label: Scene Recall (Bank 0, Scenes 1-128)
  kind: action
  command: "B{N} 00 00  C{N} {SS}"  # SS = 00-7F
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: SS
      type: integer
      description: Scene 1-128 = 00-7F (hex)

- id: scene_recall_bank1
  label: Scene Recall (Bank 1, Scenes 129-256)
  kind: action
  command: "B{N} 00 01  C{N} {SS}"  # SS = 00-7F
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: SS
      type: integer
      description: Scene 129-256 = 00-7F (hex)

- id: scene_recall_bank2
  label: Scene Recall (Bank 2, Scenes 257-384)
  kind: action
  command: "B{N} 00 02  C{N} {SS}"  # SS = 00-7F
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: SS
      type: integer
      description: Scene 257-384 = 00-7F (hex)

- id: scene_recall_bank3
  label: Scene Recall (Bank 3, Scenes 385-500)
  kind: action
  command: "B{N} 00 03  C{N} {SS}"  # SS = 00-73
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: SS
      type: integer
      description: Scene 385-500 = 00-73 (hex)

- id: mix_select
  label: Mix Select
  kind: action
  command: "A{N} {CH} {Sel}"  # Polyphonic Key Pressure; Sel 0=off, 1=on
  params:
    - name: N
      type: integer
      description: MIDI channel 1-16 (hex 0-F)
    - name: CH
      type: integer
      description: Channel number (see CH table)
    - name: Sel
      type: integer
      description: "0 = MIX off, 1 = MIX on"

- id: midi_strip_fader
  label: MIDI Strip Fader (Custom MIDI)
  kind: action
  command: "B1 00 {VAR} - B1 1F {VAR}"  # 32 strips mapped to channel numbers 00-1F; VAR is fader position value
  params:
    - name: strip
      type: integer
      description: Strip index 0-31 (encoded as channel low-nibble 00-1F)
    - name: VAR
      type: integer
      description: Value determined by fader position

- id: midi_strip_rotary_gain
  label: MIDI Strip Rotary Gain
  kind: action
  command: "B2 00 {VAR} - B2 1F {VAR}"
  params:
    - name: strip
      type: integer
      description: Strip index 0-31 (encoded as channel low-nibble 00-1F)
    - name: VAR
      type: integer
      description: Value determined by rotary position

- id: midi_strip_rotary_pan
  label: MIDI Strip Rotary Pan
  kind: action
  command: "B2 20 {VAR} - B2 3F {VAR}"
  params:
    - name: strip
      type: integer
      description: Strip index 0-31 (encoded as channel low-nibble 00-1F)
    - name: VAR
      type: integer
      description: Value determined by rotary position

- id: midi_strip_rotary_custom1
  label: MIDI Strip Rotary Custom 1
  kind: action
  command: "B2 40 {VAR} - B2 5F {VAR}"
  params:
    - name: strip
      type: integer
      description: Strip index 0-31 (encoded as channel low-nibble 00-1F)
    - name: VAR
      type: integer
      description: Value determined by rotary position

- id: midi_strip_rotary_custom2
  label: MIDI Strip Rotary Custom 2
  kind: action
  command: "B2 60 {VAR} - B2 7F {VAR}"
  params:
    - name: strip
      type: integer
      description: Strip index 0-31 (encoded as channel low-nibble 00-1F)
    - name: VAR
      type: integer
      description: Value determined by rotary position

- id: midi_strip_mute_key
  label: MIDI Strip Mute Key
  kind: action
  command: "91 00 {VAR} - 91 1F {VAR}"
  params:
    - name: strip
      type: integer
      description: Strip index 0-31 (encoded as channel low-nibble 00-1F)
    - name: VAR
      type: integer
      description: Value determined by key position

- id: midi_strip_mix_key
  label: MIDI Strip Mix Key
  kind: action
  command: "91 20 {VAR} - 91 3F {VAR}"
  params:
    - name: strip
      type: integer
      description: Strip index 0-31 (encoded as channel low-nibble 00-1F)
    - name: VAR
      type: integer
      description: Value determined by key position

- id: midi_strip_pafl_key
  label: MIDI Strip PAFL Key
  kind: action
  command: "91 40 {VAR} - 91 5F {VAR}"
  params:
    - name: strip
      type: integer
      description: Strip index 0-31 (encoded as channel low-nibble 00-1F)
    - name: VAR
      type: integer
      description: Value determined by key position
```

## Feedbacks

```yaml
# Reply shapes documented by source as paired Sysex responses to query actions.
- id: preamp_pad_reply
  description: "Reply to preamp_pad_get: F0 00 00 1A 50 10 01 00 0N 08 {MP} {Pad} F7"
  fields:
    Pad: "00 = OFF, 7F = ON"

- id: preamp_48v_reply
  description: "Reply to preamp_48v_get: F0 00 00 1A 50 10 01 00 0N 0B {MP} {48V} F7"
  fields:
    "48V": "00 = OFF, 7F = ON"

- id: channel_name_reply
  description: "Reply to channel_name_get: F0 00 00 1A 50 10 01 00 0N 02 {CH} {Name} F7"
  fields:
    Name: "string of hex ASCII characters (up to 8)"

- id: channel_colour_reply
  description: "Reply to channel_colour_get: F0 00 00 1A 50 10 01 00 0N 05 {CH} {Col} F7"
  fields:
    Col: "00-07 (off = 00; 7 colours; off = 00 per source)"

# Unsolicited feedback: GLD transmits Scene Recall (Bank + Program Change) when
# a Scene is recalled from the GLD screen.
- id: scene_recall_unsolicited
  description: "GLD transmits this message when a Scene is recalled from the GLD screen"
  shape: "B{N} 00 {bank}  C{N} {SS}"
```

## Variables
```yaml
# Discrete settable parameters already represented as Actions in the source.
# Source does not define separate "variable" surfaces distinct from the
# action payloads above.
# UNRESOLVED: none beyond what is covered by Actions.
```

## Events
```yaml
- id: scene_recalled
  description: "GLD transmits Bank + Program Change when a Scene is recalled locally on the console."
  shape: "B{N} 00 {bank}  C{N} {SS}"
  notes: "Also listed under Feedbacks; mirrored here as an unsolicited event."
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step command sequences
# (macros). Remove this section if not applicable.
```

## Safety
```yaml
confirmation_required_for:
  - preamp_48v_set  # turning 48V phantom power on can damage ribbon mics / unbalanced gear
interlocks: []
# UNRESOLVED: source contains no formal safety or interlock procedures;
# 48V warning above is Tier-2 caution inferred from "Phantom Power" semantics,
# not from explicit safety text in the source.
```

## Notes
- All messages carry inside the TCP/IP stream as standard MIDI bytes; the GLD MIDI channel number is embedded and must match the GLD's Setup / Control / MIDI screen.
- Sysex Header is `F0 00 00 1A 50 10 01 00 0N` where `N` is the hex MIDI channel (0-F).
- `CH` encoding (per source table): FX Send 1-8 = 00-07, FX Return 1-8 = 08-0F, DCA 1-16 = 10-1F, Input 1-48 = 20-4F, Mix 1-20 = 60-73.
- `MP` preamp socket numbers depend on physical source (dSNAKE 1-24 / dSNAKE EXPANDER 1-8 / 9-16 / Surface EXPANDER 1-8 / Surface 41-44). Multiple sockets across dSNAKE + expanders share the 28-2F range (dSNAKE Exp 9-16 and Surface Exp 1-8 are different ranges; source table disambiguates).
- Fader value formula in source: `[(Gain+54)/64]*7F`; Gain formula: `[(Gain-10)/55]*7F`.
- "Mix Select" is a Polyphonic Key Pressure message — distinct from MIDI Aftertouch on this device.
- MIDI Strip messages were added in firmware V1.4; all other messages available from V1.1.
- The 32 MIDI Strips are routed to custom MIDI messages stored within Scenes; defaults can be restored by recalling Scene 498 in the Template Show.

<!-- UNRESOLVED: source does not state baud/data/parity for the 5-pin MIDI sockets (MIDI spec is implicit). Source does not document fault behavior, error recovery, firmware version compatibility ranges below V1.1, or transport-layer authentication for TCP port 51325. -->

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2023/06/GLD-MIDI-and-TCPIP-Protocol-V1.4_2.pdf
  - https://www.allen-heath.com/hardware/legacy-products/gld-80/resources/
retrieved_at: 2026-07-13T19:27:41.105Z
last_checked_at: 2026-07-21T20:06:11.468Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:06:11.468Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched source commands with exact literal wire tokens; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage, current, power, and physical pinout of MIDI/Network ports not stated in source."
- "none beyond what is covered by Actions."
- "source does not document any multi-step command sequences"
- "source contains no formal safety or interlock procedures;"
- "source does not state baud/data/parity for the 5-pin MIDI sockets (MIDI spec is implicit). Source does not document fault behavior, error recovery, firmware version compatibility ranges below V1.1, or transport-layer authentication for TCP port 51325."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
