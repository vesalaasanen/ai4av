---
spec_id: admin/allen_heath-gld-112
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath GLD-112 Control Spec"
manufacturer: "Allen & Heath"
model_family: GLD-112
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - GLD-112
  firmware: V1.4
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2023/06/GLD-MIDI-and-TCPIP-Protocol-V1.4_2.pdf
  - https://www.allen-heath.com/resources/
retrieved_at: 2026-07-14T00:55:45.106Z
last_checked_at: 2026-07-21T20:06:10.156Z
generated_at: 2026-07-21T20:06:10.156Z
firmware_coverage: V1.4
protocol_coverage: []
known_gaps:
  - "power on/off not described in source; voltage/current/power specs not stated"
  - "no multi-step sequences described in source"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "voltage/current/power specs not stated in source"
  - "power on/off commands not documented"
  - "no explicit error/fault response handling documented"
  - "TCP/IP connection keepalive / disconnect behavior not documented"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:06:10.156Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 actions matched verbatim source tokens; transport verified (TCP port 51325, MIDI protocols); feedbacks represent status replies. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Allen & Heath GLD-112 Control Spec

## Summary
The Allen & Heath GLD-112 is a digital audio mixer in the GLD series. This spec covers MIDI-based control of the mixer via the rear-panel MIDI In/Out sockets and via TCP/IP over the Network port (which carries the same MIDI messages). Controllable functions include fader levels, mutes, AUX/FX send levels, DCA assignment, Main Mix assignment, preamp gain/pad/48V, channel name and colour, scene recall, and mix select.

<!-- UNRESOLVED: power on/off not described in source; voltage/current/power specs not stated -->

## Transport
```yaml
protocols:
  - tcp
  - midi
addressing:
  port: 51325
auth:
  type: none  # inferred: no auth procedure in source
# MIDI In / MIDI Out rear-panel sockets carry the same MIDI messages.
# TCP/IP messages embed the GLD MIDI channel number (N).
# MIDI channel N (1-16 = 0-F) must match the GLD Setup / Control / MIDI screen.
```

## Traits
```yaml
# - levelable (fader levels, send levels, preamp gain present)  # inferred from level commands
# - queryable (pad / 48V / name / colour status queries present)  # inferred from query examples
# - routable (channel-to-Main assignment, DCA assignment present)  # inferred from routing commands
```

## Actions
```yaml
# All MIDI message numbers are hexadecimal (as stated in source).
# Variable tokens from source:
#   N   = MIDI channel nibble (1-16 = 0-F), must match GLD MIDI screen
#   CH  = channel number (FX Send 1-8=00-07, FX Return 1-8=08-0F, DCA 1-16=10-1F,
#         Input 1-48=20-4F, Mix 1-20=60-73)
#   LV  = fader/send level value (-inf to +10dB = 00 to 7F)
#   Snd = send parameter ID (Mix 1-30 = 20 to 3D)
#   DB  = DCA ON value (DCA 1-16 = 40 to 4F)
#   DA  = DCA OFF value (DCA 1-16 = 00 to 0F)
#   MP  = socket preamp number (dSNAKE 1-24=00-17, dSNAKE EXP 1-8=18-1F, EXP 9-16=28-2F,
#         Surface EXP 1-8=20-27, Surface 41-44=30-33)
#   GV  = preamp gain value (min to max = 00 to 7F)
#   SS  = scene number within bank (00-7F; bank 4 = 00-73)
#   Sel = mix select state (0=MIX off, 1=MIX on)
#   Pad = pad state (OFF=00-3F, ON=40-7F)
#   48V = phantom state (OFF=00-3F, ON=40-7F)
# Sysex Header (applies to all Sysex messages):
#   F0, 00, 00, 1A, 50, 10, 01, 00, 0N  (MV=01 major, mV=00 minor)

- id: mute_on
  label: Mute On
  kind: action
  command: "9N, CH, 7F, 9N, CH, 00"
  params:
    - name: N
      type: string
      description: MIDI channel nibble (1-16 = 0-F)
    - name: CH
      type: string
      description: Channel number (hex)

- id: mute_off
  label: Mute Off
  kind: action
  command: "9N, CH, 3F, 9N, CH, 00"
  params:
    - name: N
      type: string
      description: MIDI channel nibble (1-16 = 0-F)
    - name: CH
      type: string
      description: Channel number (hex)

- id: fader_level_set
  label: Fader Level Set
  kind: action
  command: "BN, 63, CH, BN, 62, 17, BN, 06, LV"
  params:
    - name: N
      type: string
      description: MIDI channel nibble (1-16 = 0-F)
    - name: CH
      type: string
      description: Channel number (hex)
    - name: LV
      type: string
      description: Fader value (-inf to +10dB = 00 to 7F)

- id: main_assign_on
  label: Channel Assignment to Main Mix On
  kind: action
  command: "BN, 63, CH, BN, 62, 18, BN, 06, 7F"
  params:
    - name: N
      type: string
      description: MIDI channel nibble (1-16 = 0-F)
    - name: CH
      type: string
      description: Channel number (hex)

- id: main_assign_off
  label: Channel Assignment to Main Mix Off
  kind: action
  command: "BN, 63, CH, BN, 62, 18, BN, 06, 3F"
  params:
    - name: N
      type: string
      description: MIDI channel nibble (1-16 = 0-F)
    - name: CH
      type: string
      description: Channel number (hex)

- id: aux_fx_send_level_set
  label: AUX / FX Send Level Set
  kind: action
  command: "BN, 63, CH, BN, 62, Snd, BN, 06, LV"
  params:
    - name: N
      type: string
      description: MIDI channel nibble (1-16 = 0-F)
    - name: CH
      type: string
      description: Channel number (hex)
    - name: Snd
      type: string
      description: Send parameter ID (Mix 1-30 = 20 to 3D)
    - name: LV
      type: string
      description: Send value (-inf to +10dB = 00 to 7F)
  notes: "Groups and Main mix do not have send levels; these messages are ignored. Order depends on current Mixer Config and can change if config is changed."

- id: dca_assign_on
  label: DCA Assignment On
  kind: action
  command: "BN, 63, CH, BN, 62, 40, BN, 06, DB"
  params:
    - name: N
      type: string
      description: MIDI channel nibble (1-16 = 0-F)
    - name: CH
      type: string
      description: Channel number (hex)
    - name: DB
      type: string
      description: DCA ON value (DCA 1-16 = 40 to 4F)

- id: dca_assign_off
  label: DCA Assignment Off
  kind: action
  command: "BN, 63, CH, BN, 62, 40, BN, 06, DA"
  params:
    - name: N
      type: string
      description: MIDI channel nibble (1-16 = 0-F)
    - name: CH
      type: string
      description: Channel number (hex)
    - name: DA
      type: string
      description: DCA OFF value (DCA 1-16 = 00 to 0F)

- id: preamp_gain_set
  label: Socket Preamp Gain Set
  kind: action
  command: "EN, MP, GV"
  params:
    - name: N
      type: string
      description: MIDI channel nibble (1-16 = 0-F)
    - name: MP
      type: string
      description: Socket preamp number (hex)
    - name: GV
      type: string
      description: Gain value (min to max = 00 to 7F)

- id: preamp_pad_get
  label: Socket Preamp Pad Status Query
  kind: query
  command: "Sysex Header, 07, MP, F7"
  params:
    - name: MP
      type: string
      description: Socket preamp number (hex)

- id: preamp_pad_set
  label: Socket Preamp Pad Set
  kind: action
  command: "Sysex Header, 09, MP, Pad, F7"
  params:
    - name: MP
      type: string
      description: Socket preamp number (hex)
    - name: Pad
      type: string
      description: Pad state (OFF=00 to 3F, ON=40 to 7F)

- id: preamp_48v_get
  label: Socket Preamp 48V Status Query
  kind: query
  command: "Sysex Header, 0A, MP, F7"
  params:
    - name: MP
      type: string
      description: Socket preamp number (hex)

- id: preamp_48v_set
  label: Socket Preamp 48V Set
  kind: action
  command: "Sysex Header, 0C, MP, 48V, F7"
  params:
    - name: MP
      type: string
      description: Socket preamp number (hex)
    - name: 48V
      type: string
      description: 48V state (OFF=00 to 3F, ON=40 to 7F)

- id: channel_name_get
  label: Channel Name Query
  kind: query
  command: "Sysex Header, 01, CH, F7"
  params:
    - name: CH
      type: string
      description: Channel number (hex)

- id: channel_name_set
  label: Channel Name Set
  kind: action
  command: "Sysex Header, 03, CH, Name, F7"
  params:
    - name: CH
      type: string
      description: Channel number (hex)
    - name: Name
      type: string
      description: Up to 8 chars as hex ASCII (up to 5 displayed on GLD strip LCD)

- id: channel_colour_get
  label: Channel Colour Query
  kind: query
  command: "Sysex Header, 04, CH, F7"
  params:
    - name: CH
      type: string
      description: Channel number (hex)

- id: channel_colour_set
  label: Channel Colour Set
  kind: action
  command: "Sysex Header, 06, CH, Col, F7"
  params:
    - name: CH
      type: string
      description: Channel number (hex)
    - name: Col
      type: string
      description: Colour value (00 to 07; off or one of 7 colours)

- id: scene_recall
  label: Scene Recall
  kind: action
  command: "BN, 00, Bank, CN, SS"
  params:
    - name: N
      type: string
      description: MIDI channel nibble (1-16 = 0-F)
    - name: Bank
      type: string
      description: Bank select value (Scenes 1-128=00, 129-256=01, 257-384=02, 385-500=03)
    - name: SS
      type: string
      description: Scene number within bank (00-7F; bank 4 = 00-73)
  notes: "Recalls one of 500 Scenes across 4 banks. GLD also transmits this message when a Scene is recalled from the GLD screen."

- id: mix_select
  label: Mix Select
  kind: action
  command: "AN, CH, Sel"
  params:
    - name: N
      type: string
      description: MIDI channel nibble (1-16 = 0-F)
    - name: CH
      type: string
      description: Channel number (hex)
    - name: Sel
      type: string
      description: Mix select state (0=MIX off, 1=MIX on)
  notes: "Polyphonic Key Pressure message."

# MIDI Strips (custom MIDI assignments): 32 fader strips can be assigned to transmit
# custom MIDI for DAW / slave mixer / external FX control. Factory defaults restorable
# via Scene 498. Strip controls: Fader, Rotary Gain/Pan/Custom1/Custom2, Mute key,
# Mix key, PAFL key. Not enumerated as discrete actions here - user-configurable
# message mappings, not fixed device commands.
```

## Feedbacks
```yaml
- id: mute_state
  type: enum
  values: [on, off]
  notes: "Received mute messages: velocity 00 and NOTE OFF ignored; velocity 01 to 3F = Mute off; velocity 40 to 7F = Mute on."

- id: preamp_pad_state
  type: enum
  values: [off, on]
  notes: "Sysex reply: Sysex Header, 08, MP, Pad, F7 where Pad OFF=00, ON=7F."

- id: preamp_48v_state
  type: enum
  values: [off, on]
  notes: "Sysex reply: Sysex Header, 0B, MP, 48V, F7 where 48V OFF=00, ON=7F."

- id: channel_name
  type: string
  notes: "Sysex reply: Sysex Header, 02, CH, Name, F7 where Name = string of hex ASCII characters."

- id: channel_colour
  type: enum
  values: [off, colour_1, colour_2, colour_3, colour_4, colour_5, colour_6, colour_7]
  notes: "Sysex reply: Sysex Header, 05, CH, Col, F7 where Col = 00 to 07."

- id: scene_recall_event
  type: integer
  notes: "GLD transmits Bank + Program Change message when a Scene is recalled from the GLD screen."
```

## Variables
```yaml
# Fader level, send level, and preamp gain are settable continuous parameters
# represented as parameterized Actions above (fader_level_set, aux_fx_send_level_set,
# preamp_gain_set). No additional standalone variables documented.
```

## Events
```yaml
- id: scene_recall_transmit
  type: unsolicited
  notes: "GLD transmits Bank + Program Change (BN, 00, Bank, CN, SS) when a Scene is recalled from the GLD screen."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Phantom power (48V) and preamp gain are
# controllable but no safety interlock is documented.
```

## Notes
- Firmware: protocol targets GLD systems with firmware V1.4 and later. MIDI Strip messages added in V1.4; all other MIDI messages available from V1.1. Socket Preamp numbers (MP) changed in V1.4.
- Sysex Header for all Sysex messages: `F0, 00, 00, 1A, 50, 10, 01, 00, 0N` (Major version 01, Minor version 00, MIDI channel N).
- Mix buses 1-30 follow the order of the current configuration: Mono Groups, Stereo Groups, Mono FX, Mono Auxes, Stereo FX, Stereo Auxes, Main Mix. Order changes if Mixer Config changes.
- MIDI channel number (N) used in TCP/IP messages must match the MIDI channel set on the GLD via Setup / Control / MIDI screen.
- Channel Name supports up to 8 characters; up to 5 displayed on GLD strip LCD.
- Fader level formula: `[(Gain+54)/64]*7F`. Gain formula: `[(Gain-10)/55]*7F`.
- MIDI Strips: 32 user-configurable custom MIDI strips for DAW/external control; factory defaults restorable via Scene 498.

<!-- UNRESOLVED: voltage/current/power specs not stated in source -->
<!-- UNRESOLVED: power on/off commands not documented -->
<!-- UNRESOLVED: no explicit error/fault response handling documented -->
<!-- UNRESOLVED: TCP/IP connection keepalive / disconnect behavior not documented -->
````

Spec output. 19 actions (mute on/off, fader, main assign on/off, send level, DCA on/off, preamp gain, pad get/set, 48V get/set, name get/set, colour get/set, scene recall, mix select), 6 feedbacks, 1 event. Protocols tcp+midi, port 51325 (stated), no auth (inferred). Firmware V1.4 populated from source. Power/safety/voltage gaps marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2023/06/GLD-MIDI-and-TCPIP-Protocol-V1.4_2.pdf
  - https://www.allen-heath.com/resources/
retrieved_at: 2026-07-14T00:55:45.106Z
last_checked_at: 2026-07-21T20:06:10.156Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:06:10.156Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 actions matched verbatim source tokens; transport verified (TCP port 51325, MIDI protocols); feedbacks represent status replies. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power on/off not described in source; voltage/current/power specs not stated"
- "no multi-step sequences described in source"
- "source contains no explicit safety warnings, interlock procedures,"
- "voltage/current/power specs not stated in source"
- "power on/off commands not documented"
- "no explicit error/fault response handling documented"
- "TCP/IP connection keepalive / disconnect behavior not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
