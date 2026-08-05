---
spec_id: admin/allen-heath-ahm
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath AHM Control Spec"
manufacturer: "Allen & Heath"
model_family: AHM
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - AHM
  firmware: V1.5
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/AHM-TCP-Protocol-V1.5.pdf
retrieved_at: 2026-07-13T18:59:27.323Z
last_checked_at: 2026-07-21T20:01:04.122Z
generated_at: 2026-07-21T20:01:04.122Z
firmware_coverage: V1.5
protocol_coverage: []
known_gaps:
  - "parameter value table referenced in source was image-only and not extractable; inline ranges used instead."
  - "source contains no explicit safety warnings or interlock procedures."
  - "end-of-document parameter value table was image-only in PDF and not extractable; inline ranges used instead."
  - "plaintext socket (51325) authentication procedure not explicitly documented — only TLS socket (51327) auth described."
  - "exact bytes for \"Get Channel Name\" / \"Get Channel Colour\" responses (Name ASCII string up to 8 chars, Colour value encoding) — colour encoding unspecified in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:01:04.122Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions matched verbatim in source; all transport parameters (TCP 51325/51327, auth credentials) verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Allen & Heath AHM Control Spec

## Summary
Allen & Heath AHM DSP matrix mixer, controlled over TCP/IP via MIDI-format messages (Note On, NRPN, SysEx, Program Change). Two rendezvous sockets: TCP 51325 (plaintext) and TCP 51327 (TLS/SSL). TLS socket requires UserProfile/UserPassword authentication.

<!-- UNRESOLVED: parameter value table referenced in source was image-only and not extractable; inline ranges used instead. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 51325
auth:
  type: credentials
  # Source: TLS socket (port 51327) requires first message "UserProfile, UserPassword"
  # where UserProfile = 00 to 1F. On match unit responds "AuthOK"; mismatch drops connection.
  # Plaintext socket (51325) auth procedure not explicitly documented.
notes:
  - "TLS/SSL rendezvous port: 51327"
  - "Messages sent in MIDI format (hex values)"
```

## Traits
```yaml
traits:
  - muteable     # Channel Mute On/Off
  - levelable    # Channel Level, Send Level, Trim, Preamp Gain
  - queryable    # Get Channel Mute/Level/Trim/Pad/Phantom, Get Send, Get Source Selector, Get Channel Name/Colour
  - routable     # Input to Zone / Zone to Zone sends; Source Selector; Room Combiners
  - presettable  # Preset Recall via Program Change
```

## Actions
```yaml
# Channel = MIDI channel N + note number CH:
#   Inputs 1-64:        N=0, CH=00..3F
#   Zones 1-64:         N=1, CH=00..3F
#   Control Groups 1-32: N=2, CH=00..1F
#   Rooms 1-16:         N=3, CH=00..0F
# SysEx Header (all SysEx msgs): F0 00 00 1A 50 12 01 00

- id: channel_mute_on
  label: Channel Mute On
  kind: action
  command: "9N, CH, 7F, 9N, CH, 00"
  params:
    - name: N
      type: integer
      description: MIDI channel number (0=input, 1=zone, 2=control group, 3=room)
    - name: CH
      type: integer
      description: Channel note number (hex)

- id: channel_mute_off
  label: Channel Mute Off
  kind: action
  command: "9N, CH, 3F, 9N, CH, 00"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

- id: get_channel_mute
  label: Get Channel Mute
  kind: query
  command: "F0 00 00 1A 50 12 01 00, 0N, 01, 09, CH, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

- id: set_channel_level
  label: Set Channel Level
  kind: action
  command: "BN, 63, CH, BN, 62, 17, BN, 06, LV"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: LV
      type: integer
      description: Level value 00..7F mapping to -Inf..+10dB (NRPN param ID 17)

- id: get_channel_level
  label: Get Channel Level
  kind: query
  command: "F0 00 00 1A 50 12 01 00, 0N, 01, 0B, 17, CH, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

- id: channel_level_increment
  label: Channel Level Increment
  kind: action
  command: "BN, 63, CH, BN, 62, 20, BN, 06, 7F"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

- id: channel_level_decrement
  label: Channel Level Decrement
  kind: action
  command: "BN, 63, CH, BN, 62, 20, BN, 06, 3F"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

- id: set_input_trim
  label: Set Input Trim
  kind: action
  command: "BN, 63, CH, BN, 62, 18, BN, 06, LV"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: LV
      type: integer
      description: Trim value 00..7F mapping to -24..+24dB (NRPN param ID 18)

- id: get_input_trim
  label: Get Input Trim
  kind: query
  command: "F0 00 00 1A 50 12 01 00, 0N, 01, 0B, 18, CH, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

- id: set_input_preamp_gain
  label: Set Input Preamp Gain
  kind: action
  command: "BN, 63, CH, BN, 62, 19, BN, 06, GN"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: GN
      type: integer
      description: Gain value 00..7F mapping to 5dB..+60dB (NRPN param ID 19)

- id: get_input_preamp_gain
  label: Get Input Preamp Gain
  kind: query
  command: "F0 00 00 1A 50 12 01 00, 0N, 01, 0B, 19, CH, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

- id: set_input_preamp_pad
  label: Set Input Preamp Pad
  kind: action
  command: "BN, 63, CH, BN, 62, 1A, BN, 06, VL"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: VL
      type: integer
      description: "VL 00..3F = Pad off, VL 40..7F = Pad on (NRPN param ID 1A)"

- id: get_input_preamp_pad
  label: Get Input Preamp Pad
  kind: query
  command: "F0 00 00 1A 50 12 01 00, 0N, 01, 0B, 1A, CH, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

- id: set_input_preamp_phantom
  label: Set Input Preamp Phantom Power
  kind: action
  command: "BN, 63, CH, BN, 62, 1B, BN, 06, VL"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: VL
      type: integer
      description: "VL 00..3F = Phantom off, VL 40..7F = Phantom on (NRPN param ID 1B)"

- id: get_input_preamp_phantom
  label: Get Input Preamp Phantom Power
  kind: query
  command: "F0 00 00 1A 50 12 01 00, 0N, 01, 0B, 1B, CH, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

- id: set_send_level
  label: Set Send Level (Input to Zone / Zone to Zone)
  kind: action
  command: "F0 00 00 1A 50 12 01 00, 0N, 02, CH, SndN, SndCH, LV, F7"
  params:
    - name: N
      type: integer
      description: Source channel MIDI channel
    - name: CH
      type: integer
      description: Source channel note
    - name: SndN
      type: integer
      description: Destination channel MIDI channel
    - name: SndCH
      type: integer
      description: Destination channel note
    - name: LV
      type: integer
      description: Send level 00..7F mapping to -Inf..+10dB

- id: get_send_level
  label: Get Send Level
  kind: query
  command: "F0 00 00 1A 50 12 01 00, 0N, 01, 0F, 02, CH, SndN, SndCH, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: SndN
      type: integer
    - name: SndCH
      type: integer

- id: send_level_increment
  label: Increment Send Level
  kind: action
  command: "F0 00 00 1A 50 12 01 00, 0N, 04, CH, SndN, SndCH, 7F, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: SndN
      type: integer
    - name: SndCH
      type: integer

- id: send_level_decrement
  label: Decrement Send Level
  kind: action
  command: "F0 00 00 1A 50 12 01 00, 0N, 04, CH, SndN, SndCH, 3F, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: SndN
      type: integer
    - name: SndCH
      type: integer

- id: send_mute_on
  label: Send Mute On
  kind: action
  command: "F0 00 00 1A 50 12 01 00, 0N, 03, CH, SndN, SndCH, 7F, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: SndN
      type: integer
    - name: SndCH
      type: integer

- id: send_mute_off
  label: Send Mute Off
  kind: action
  command: "F0 00 00 1A 50 12 01 00, 0N, 03, CH, SndN, SndCH, 3F, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: SndN
      type: integer
    - name: SndCH
      type: integer

- id: get_send_mute
  label: Get Send Mute
  kind: query
  command: "F0 00 00 1A 50 12 01 00, 0N, 01, 0F, 03, CH, SndN, SndCH, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: SndN
      type: integer
    - name: SndCH
      type: integer

- id: preset_recall_bank_1
  label: Recall Preset 1-128
  kind: action
  command: "B0, 00, 00, C0, SS"
  params:
    - name: SS
      type: integer
      description: Preset 1..128 = 00..7F

- id: preset_recall_bank_2
  label: Recall Preset 129-256
  kind: action
  command: "B0, 00, 01, C0, SS"
  params:
    - name: SS
      type: integer
      description: Preset 129..256 = 00..7F

- id: preset_recall_bank_3
  label: Recall Preset 257-384
  kind: action
  command: "B0, 00, 02, C0, SS"
  params:
    - name: SS
      type: integer
      description: Preset 257..384 = 00..7F

- id: preset_recall_bank_4
  label: Recall Preset 385-500
  kind: action
  command: "B0, 00, 03, C0, SS"
  params:
    - name: SS
      type: integer
      description: Preset 385..500 = 00..73

- id: audio_playback
  label: Audio File Playback
  kind: action
  command: "F0 00 00 1A 50 12 01 00, 00, 06, PlaybackChannel, TrackID, F7"
  params:
    - name: PlaybackChannel
      type: integer
      description: "00=Mono 1, 01=Mono 2, 02=Stereo"
    - name: TrackID
      type: integer
      description: 00..7F

- id: source_selector
  label: Zone Source Selector
  kind: action
  command: "F0 00 00 1A 50 12 01 00, 00, 08, CH, SourceNumber, F7"
  params:
    - name: CH
      type: integer
      description: Zone channel note
    - name: SourceNumber
      type: integer
      description: 00..13

- id: get_source_selector
  label: Get Source Selector
  kind: query
  command: "F0 00 00 1A 50 12 01 00, 0N, 01, 0F, 08, CH, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

- id: room_source_selector
  label: Room Source Selector
  kind: action
  command: "F0 00 00 1A 50 12 01 00, 00, 0D, CH, SourceNumber, F7"
  params:
    - name: CH
      type: integer
      description: Room channel note
    - name: SourceNumber
      type: integer
      description: 00..13

- id: room_combiner
  label: Room Combiner (Combine/Divide)
  kind: action
  command: "F0 00 00 1A 50 12 01 00, 00, 0E, RoomNumber1, RoomNumber2, VL, F7"
  params:
    - name: RoomNumber1
      type: integer
    - name: RoomNumber2
      type: integer
    - name: VL
      type: integer
      description: "00..3F = Rooms Combined, 40..7F = Rooms Divided"

- id: get_channel_name
  label: Get Channel Name
  kind: query
  command: "F0 00 00 1A 50 12 01 00, 0N, 09, CH, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

- id: get_channel_colour
  label: Get Channel Colour
  kind: query
  command: "F0 00 00 1A 50 12 01 00, 0N, 0B, CH, F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
```

## Feedbacks
```yaml
- id: channel_mute_state
  type: enum
  values: [on, off]
  notes: "Received Channel Mute: velocity 01..3F = off, 40..7F = on; velocity 00 / NOTE OFF ignored"

- id: channel_level_value
  type: range
  range: "00..7F"
  notes: "Unit transmits appropriate Channel Level NRPN message"

- id: input_trim_value
  type: range
  range: "00..7F"

- id: input_preamp_gain_value
  type: range
  range: "00..7F"

- id: input_preamp_pad_state
  type: enum
  values: [off, on]

- id: input_phantom_state
  type: enum
  values: [off, on]

- id: preset_recall_event
  type: event
  notes: "Unit transmits Bank+Program Change when a Preset is recalled (by any client)"

- id: source_selector_event
  type: event
  notes: "Unit transmits SysEx 08 with SourceColour, SourceName when source selected"

- id: room_source_selector_event
  type: event
  notes: "Unit transmits SysEx 0D with SourceColour, SourceName when room source selected"

- id: room_combiner_event
  type: event
  notes: "Unit transmits SysEx 0E when rooms combined/divided"

- id: auth_result
  type: enum
  values: [AuthOK, connection_dropped]
  notes: "Response to TLS socket auth; six characters 'AuthOK' on success"
```

## Variables
```yaml
# Settable parameters (covered as Actions above): channel level, input trim,
# preamp gain, preamp pad, phantom power, send level, source number, room combiner.
# No additional non-action variables documented in source.
```

## Events
```yaml
# Unsolicited notifications (unit transmits proactively):
- preset_recall_event        # Bank+Program Change on recall
- source_selector_event      # SysEx 08 with colour+name
- room_source_selector_event # SysEx 0D with colour+name
- room_combiner_event        # SysEx 0E on combine/divide
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
# Phantom Power (48V) toggle present as a control but no interlock sequence documented.
```

## Notes
- All MIDI message numbers are hexadecimal.
- SysEx Header applies to every SysEx message: `F0 00 00 1A 50 12 01 00` (major version 01, minor version 00).
- Channel selection: Inputs N=0, Zones N=1, Control Groups N=2, Rooms N=3.
- "Get" queries cause the unit to transmit the corresponding state message.
- Firmware V1.5 referenced in source title.
- Input Preamp controls (Gain/Pad/Phantom) apply only to Inputs (N=0).
<!-- UNRESOLVED: end-of-document parameter value table was image-only in PDF and not extractable; inline ranges used instead. -->
<!-- UNRESOLVED: plaintext socket (51325) authentication procedure not explicitly documented — only TLS socket (51327) auth described. -->
<!-- UNRESOLVED: exact bytes for "Get Channel Name" / "Get Channel Colour" responses (Name ASCII string up to 8 chars, Colour value encoding) — colour encoding unspecified in source. -->
````

Spec emitted. Coverage: 30 actions, 11 feedbacks, 4 events. All hex payloads verbatim from source. Ports/auth from source. No values fabricated.

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/AHM-TCP-Protocol-V1.5.pdf
retrieved_at: 2026-07-13T18:59:27.323Z
last_checked_at: 2026-07-21T20:01:04.122Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:01:04.122Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions matched verbatim in source; all transport parameters (TCP 51325/51327, auth credentials) verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "parameter value table referenced in source was image-only and not extractable; inline ranges used instead."
- "source contains no explicit safety warnings or interlock procedures."
- "end-of-document parameter value table was image-only in PDF and not extractable; inline ranges used instead."
- "plaintext socket (51325) authentication procedure not explicitly documented — only TLS socket (51327) auth described."
- "exact bytes for \"Get Channel Name\" / \"Get Channel Colour\" responses (Name ASCII string up to 8 chars, Colour value encoding) — colour encoding unspecified in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
