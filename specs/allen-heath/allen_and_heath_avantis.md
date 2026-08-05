---
spec_id: admin/allen-heath-avantis
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath Avantis Control Spec"
manufacturer: "Allen & Heath"
model_family: Avantis
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - Avantis
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.allen-heath.com
source_urls:
  - https://support.allen-heath.com/hc/en-gb/articles/45146889174801-Avantis-MIDI-TCP-IP-Protocol
retrieved_at: 2026-04-29T22:19:33.947Z
last_checked_at: 2026-07-12T08:41:05.355Z
generated_at: 2026-07-12T08:41:05.355Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 serial control not documented. No auth procedure described."
  - "the source documents actions for reading/writing parameters but does not"
  - "unsolicited event notifications from the device are not explicitly documented."
  - "explicit multi-step macro sequences not documented in source."
  - "safety warnings or interlock procedures not present in source"
  - "RS-232/serial transport not documented. Firmware version stated as V2.0+ but specific compatibility ranges not enumerated. Authentication mechanism not stated — assumed none. Port 51325 is the only stated transport port."
verification:
  verdict: verified
  checked_at: 2026-07-12T08:41:05.355Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched verbatim to source sections; transport parameters (TCP, port 51325) verified; complete bidirectional coverage of documented command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Allen & Heath Avantis Control Spec

## Summary
Avantis digital mixer with TCP/IP control via the Network port (port 51325). Messages use MIDI format (NRPN, SysEx, Note On, Control Change, Program Change, MMC). Controls fader levels, mutes, DCA, send levels, channel assignment, name/colour, scene recall, MIDI transport, MIDI strips, softkeys, UFX parameters. Requires firmware V2.0 or later.

<!-- UNRESOLVED: RS-232 serial control not documented. No auth procedure described. -->

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
# levelable: fader levels, send levels, gain rotaries
# routable: input-to-main assignment, send routing
# queryable: name get, colour get, scene recall
traits:
  - levelable
  - routable
  - queryable
```

## Actions
```yaml
- id: mute_on
  label: Mute On
  kind: action
  params:
    - name: midi_channel
      type: integer
      description: Base MIDI channel N (0-F)
    - name: channel_note
      type: integer
      description: Channel note number CH
  description: NOTE ON velocity >40, then NOTE OFF. 9N,CH,7F, 9N,CH,00

- id: mute_off
  label: Mute Off
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: channel_note
      type: integer
  description: NOTE ON velocity <40, then NOTE OFF. 9N,CH,3F, 9N,CH,00

- id: set_fader_level
  label: Set Fader Level
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: channel_note
      type: integer
    - name: level_value
      type: integer
      description: LV 00 to 7F (-inf to +10dB)
  description: NRPN param 17. BN,63,CH, BN,62,17, BN,06,LV

- id: assign_to_main_mix_on
  label: Assign to Main Mix On
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: channel_note
      type: integer
  description: NRPN param 18, value 7F

- id: assign_to_main_mix_off
  label: Assign to Main Mix Off
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: channel_note
      type: integer
  description: NRPN param 18, value 3F

- id: set_send_level
  label: Set Aux/FX/Matrix Send Level
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: channel_note
      type: integer
    - name: send_midi_channel
      type: integer
    - name: send_channel_note
      type: integer
    - name: level_value
      type: integer
  description: SysEx. SysEx Header, 0N, 0D, CH, SndN, SndCH, LV, F7

- id: dca_assign_on
  label: DCA Assignment On
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: channel_note
      type: integer
    - name: dca_number
      type: integer
      description: DCA 1-16 maps to DB 40-4F
  description: NRPN param 40, value DB

- id: dca_assign_off
  label: DCA Assignment Off
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: channel_note
      type: integer
    - name: dca_number
      type: integer
      description: DCA 1-16 maps to DA 00-0F
  description: NRPN param 40, value DA

- id: mute_group_assign_on
  label: Mute Group Assignment On
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: channel_note
      type: integer
    - name: mute_group_number
      type: integer
      description: Mute Group 1-8 maps to DB 50-57
  description: NRPN param 40, value DB

- id: mute_group_assign_off
  label: Mute Group Assignment Off
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: channel_note
      type: integer
    - name: mute_group_number
      type: integer
      description: Mute Group 1-8 maps to DA 10-17
  description: NRPN param 40, value DA

- id: set_channel_name
  label: Set Channel Name
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: channel_note
      type: integer
    - name: name
      type: string
      description: Up to 8 ASCII characters as hex string
  description: SysEx. SysEx Header, 0N, 03, CH, Name, F7

- id: set_channel_colour
  label: Set Channel Colour
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: channel_note
      type: integer
    - name: colour
      type: integer
      description: "00 to 07 (7 colours or no colour)"
  description: SysEx. SysEx Header, 0N, 06, CH, Col, F7

- id: recall_scene
  label: Recall Scene
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: bank
      type: integer
      description: "Bank 0-3 (Bank 1=00, Bank 2=01, Bank 3=02, Bank 4=03)"
    - name: scene_in_bank
      type: integer
      description: Scene number within bank (SS 00-7F)
  description: Bank + Program Change. BN,00,Bank, CN,SS. 500 scenes across 4 banks.

- id: mmc_transport
  label: MMC Transport Control
  kind: action
  params:
    - name: transport_command
      type: integer
      description: "01=Stop, 02=Play, 04=Fast Forward, 05=Rewind, 06=Record, 09=Pause"
  description: SysEx F0,7F,7F,06,TC,F7

- id: set_ufx_global_key
  label: Set UFX Global Key
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: key
      type: integer
      description: "00 to 0B (C to B)"
  description: CC message. BN,0C,Key

- id: set_ufx_global_scale
  label: Set UFX Global Scale
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: scale
      type: integer
      description: "00=Major, 01=Minor, 02=Chromatic"
  description: CC message. BN,0D,Scale

- id: set_ufx_unit_parameter
  label: Set UFX Unit Parameter
  kind: action
  params:
    - name: ufX_midi_channel
      type: integer
    - name: control_number
      type: integer
    - name: value
      type: integer
  description: CC message to UFX MIDI channel M. BM,nn,vv

- id: send_midi_strip_message
  label: Send MIDI Strip Message
  kind: action
  params:
    - name: midi_channel
      type: integer
    - name: message_type
      type: integer
      description: "Message type ID (fader=00, rotary=20/40/60, mute=00, mix=20, pafl=40)"
    - name: strip_index
      type: integer
    - name: value
      type: integer
  description: Custom MIDI strip control. B1/B2/91 type, index, value.
```

## Feedbacks
```yaml
- id: get_channel_name
  label: Get Channel Name Reply
  type: string
  description: SysEx Header, 0N, 02, CH, Name, F7 where Name is hex ASCII string (up to 8 chars)

- id: get_channel_colour
  label: Get Channel Colour Reply
  type: integer
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  description: "SysEx Header, 0N, 05, CH, Col, F7. Col 00 to 07."

- id: mute_state_feedback
  label: Mute State Feedback
  type: enum
  values: [on, off]
  description: Velocity 01-3F = Off, 40-7F = On. Received from Avantis on mute change.

- id: fader_level_feedback
  label: Fader Level Feedback
  type: integer
  description: NRPN param 17. LV 00 to 7F (-inf to +10dB). Query via fader level message.

- id: scene_recall_feedback
  label: Scene Recall Feedback
  type: enum
  values: [recalled]
  description: Transmitted when scene recalled from Avantis screen. Same format as recall command.
```

## Variables
```yaml
# UNRESOLVED: the source documents actions for reading/writing parameters but does not
# specify a separate Variables section. Variables are embedded in the action param structures.
# Serial/baud parameters: UNRESOLVED - TCP-only, no RS-232 config in source
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications from the device are not explicitly documented.
# Mute state changes and scene recalls are transmitted by the device but source does not
# provide a dedicated Events section structure.
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step macro sequences not documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings or interlock procedures not present in source
```

## Notes
MIDI running status is used — status byte can be omitted if identical to previous message. MIDI channel N (base) must not exceed B (12). Default base MIDI channel is 12 to 16. Five consecutive MIDI channels (N through N+4) map to different audio channel types (Inputs, Groups, Aux, Matrix, FX/Mains/DCA/Mute). Scene recall uses bank + program change across 4 banks of 128 scenes (500 total). UFX units optionally use a separate MIDI channel M outside the N to N+4 range. SysEx header is F0,00,00,1A,50,10,01,00.
<!-- UNRESOLVED: RS-232/serial transport not documented. Firmware version stated as V2.0+ but specific compatibility ranges not enumerated. Authentication mechanism not stated — assumed none. Port 51325 is the only stated transport port. -->

## Provenance

```yaml
source_domains:
  - support.allen-heath.com
source_urls:
  - https://support.allen-heath.com/hc/en-gb/articles/45146889174801-Avantis-MIDI-TCP-IP-Protocol
retrieved_at: 2026-04-29T22:19:33.947Z
last_checked_at: 2026-07-12T08:41:05.355Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:41:05.355Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched verbatim to source sections; transport parameters (TCP, port 51325) verified; complete bidirectional coverage of documented command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial control not documented. No auth procedure described."
- "the source documents actions for reading/writing parameters but does not"
- "unsolicited event notifications from the device are not explicitly documented."
- "explicit multi-step macro sequences not documented in source."
- "safety warnings or interlock procedures not present in source"
- "RS-232/serial transport not documented. Firmware version stated as V2.0+ but specific compatibility ranges not enumerated. Authentication mechanism not stated — assumed none. Port 51325 is the only stated transport port."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
