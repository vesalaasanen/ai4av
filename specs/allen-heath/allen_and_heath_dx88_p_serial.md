---
spec_id: admin/allen-heath-dx88-p
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath Dx88 P Control Spec"
manufacturer: "Allen & Heath"
model_family: "Dx88 P"
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - "Dx88 P"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/AHM-TCP-Protocol-V1.5.pdf
  - https://www.allen-heath.com/content/uploads/2023/05/DX-GX-System-Guide-ISS_5.pdf
retrieved_at: 2026-07-13T19:02:16.952Z
last_checked_at: 2026-07-21T20:06:08.873Z
generated_at: 2026-07-21T20:06:08.873Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source PDF referenced an end-of-document value table that was image-only and could not be extracted; inline parameter ranges used."
  - "no power commands in source; do not infer"
  - "source does not define continuous settable parameters outside the action list."
  - "source documents no multi-step macro sequences."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:06:08.873Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions matched literal source commands; transport parameters (TCP ports, auth) verified; coverage is complete and one-to-one. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Allen & Heath Dx88 P Control Spec

## Summary
The Allen & Heath Dx88 P is a network-controllable audio processor (AHM family) that accepts external control via TCP/IP using MIDI-format messages. This spec covers the MIDI-over-TCP control protocol — channel mute, level, trim, preamp, send routing, preset recall, audio playback, source selection, room combiners, and channel naming.

<!-- UNRESOLVED: source PDF referenced an end-of-document value table that was image-only and could not be extracted; inline parameter ranges used. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 51325  # plain (Rendezvous). TLS alternative: 51327.
auth:
  type: password  # TLS socket requires UserProfile,UserPassword handshake; unit replies "AuthOK" or drops.
```

## Traits
```yaml
powerable: false  # UNRESOLVED: no power commands in source; do not infer
routable: true  # inferred from input-to-zone / zone-to-zone send and source selector commands
queryable: true  # inferred from "Get" SysEx queries
levelable: true  # inferred from channel-level, zone-level, trim, preamp commands
```

## Actions
```yaml
- id: channel_mute_on
  label: Channel Mute On
  kind: action
  command: "9{N} {CH} 7F  9{N} {CH} 00"  # NOTE ON vel>40 then NOTE OFF
  params:
    - {name: N, type: integer, description: "MIDI channel (0=inputs, 1=zones, 2=control groups)"}
    - {name: CH, type: hex, description: "Note number per channel-selection table"}

- id: channel_mute_off
  label: Channel Mute Off
  kind: action
  command: "9{N} {CH} 3F  9{N} {CH} 00"  # NOTE ON vel<40 then NOTE OFF
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: get_channel_mute
  label: Get Channel Mute
  kind: query
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 01 09 {CH} F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: channel_level_set
  label: Channel Level Set
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 17  B{N} 06 {LV}"  # NRPN 17; LV 00..7F = -Inf..+10 dB
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}
    - {name: LV, type: hex}

- id: get_channel_level
  label: Get Channel Level
  kind: query
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 01 0B 17 {CH} F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: channel_level_increment
  label: Channel Level Increment
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 20  B{N} 06 7F"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: channel_level_decrement
  label: Channel Level Decrement
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 20  B{N} 06 3F"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: input_trim_set
  label: Input Trim Set
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 18  B{N} 06 {LV}"  # NRPN 18; LV 00..7F = -24..+24 dB
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}
    - {name: LV, type: hex}

- id: get_input_trim
  label: Get Input Trim
  kind: query
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 01 0B 18 {CH} F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: input_preamp_gain_set
  label: Input Preamp Gain Set
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 19  B{N} 06 {GN}"  # NRPN 19; GN 00..7F = +5..+60 dB
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}
    - {name: GN, type: hex}

- id: get_input_preamp_gain
  label: Get Input Preamp Gain
  kind: query
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 01 0B 19 {CH} F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: input_preamp_pad_set
  label: Input Preamp Pad Set
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 1A  B{N} 06 {VL}"  # NRPN 1A; 00..3F=off, 40..7F=on
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}
    - {name: VL, type: hex}

- id: get_input_preamp_pad
  label: Get Input Preamp Pad
  kind: query
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 01 0B 1A {CH} F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: input_preamp_phantom_set
  label: Input Preamp Phantom Power Set
  kind: action
  command: "B{N} 63 {CH}  B{N} 62 1B  B{N} 06 {VL}"  # NRPN 1B; 00..3F=off, 40..7F=on
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}
    - {name: VL, type: hex}

- id: get_input_preamp_phantom
  label: Get Input Preamp Phantom Power
  kind: query
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 01 0B 1B {CH} F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: send_level_set
  label: Input-to-Zone / Zone-to-Zone Send Level Set
  kind: action
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 02 {CH} {SndN} {SndCH} {LV} F7"  # LV 00..7F = -Inf..+10 dB
  params:
    - {name: N, type: integer, description: "Source MIDI channel (0 inputs / 1 zones)"}
    - {name: CH, type: hex, description: "Source channel number"}
    - {name: SndN, type: integer, description: "Destination MIDI channel"}
    - {name: SndCH, type: hex, description: "Destination note number"}
    - {name: LV, type: hex}

- id: get_send_level
  label: Get Send Level
  kind: query
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 01 0F 02 {CH} {SndN} {SndCH} F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}
    - {name: SndN, type: integer}
    - {name: SndCH, type: hex}

- id: send_level_increment
  label: Send Level Increment
  kind: action
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 04 {CH} {SndN} {SndCH} 7F F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}
    - {name: SndN, type: integer}
    - {name: SndCH, type: hex}

- id: send_level_decrement
  label: Send Level Decrement
  kind: action
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 04 {CH} {SndN} {SndCH} 3F F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}
    - {name: SndN, type: integer}
    - {name: SndCH, type: hex}

- id: send_mute_on
  label: Send Mute On
  kind: action
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 03 {CH} {SndN} {SndCH} 7F F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}
    - {name: SndN, type: integer}
    - {name: SndCH, type: hex}

- id: send_mute_off
  label: Send Mute Off
  kind: action
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 03 {CH} {SndN} {SndCH} 3F F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}
    - {name: SndN, type: integer}
    - {name: SndCH, type: hex}

- id: get_send_mute
  label: Get Send Mute
  kind: query
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 01 0F 03 {CH} {SndN} {SndCH} F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}
    - {name: SndN, type: integer}
    - {name: SndCH, type: hex}

- id: preset_recall_bank0
  label: Preset Recall (Bank 0, Presets 1-128)
  kind: action
  command: "B0 00 00  C0 {SS}"  # SS 00..7F = presets 1..128
  params:
    - {name: SS, type: hex}

- id: preset_recall_bank1
  label: Preset Recall (Bank 1, Presets 129-256)
  kind: action
  command: "B0 00 01  C0 {SS}"  # SS 00..7F = presets 129..256
  params:
    - {name: SS, type: hex}

- id: preset_recall_bank2
  label: Preset Recall (Bank 2, Presets 257-384)
  kind: action
  command: "B0 00 02  C0 {SS}"  # SS 00..7F = presets 257..384
  params:
    - {name: SS, type: hex}

- id: preset_recall_bank3
  label: Preset Recall (Bank 3, Presets 385-500)
  kind: action
  command: "B0 00 03  C0 {SS}"  # SS 00..73 = presets 385..500
  params:
    - {name: SS, type: hex}

- id: audio_playback
  label: Audio File Playback
  kind: action
  command: "F0 00 00 1A 50 12 {MV} {mV} 00 06 {PlaybackChannel} {TrackID} F7"
  params:
    - {name: PlaybackChannel, type: hex, description: "00=Mono 1, 01=Mono 2, 02=stereo"}
    - {name: TrackID, type: hex, description: "00..7F"}

- id: source_selector_set
  label: Source Selector (Zone)
  kind: action
  command: "F0 00 00 1A 50 12 {MV} {mV} 00 08 {CH} {SourceNumber} F7"  # SourceNumber 00..13
  params:
    - {name: CH, type: hex, description: "Zone channel number"}
    - {name: SourceNumber, type: hex}

- id: get_source_selector
  label: Get Source Selector
  kind: query
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 01 0F 08 {CH} F7"
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: room_source_selector_set
  label: Room Source Selector
  kind: action
  command: "F0 00 00 1A 50 12 {MV} {mV} 00 0D {CH} {SourceNumber} F7"  # SourceNumber 00..13
  params:
    - {name: CH, type: hex, description: "Room channel number"}
    - {name: SourceNumber, type: hex}

- id: room_combiners_set
  label: Room Combiners (Combine/Divide)
  kind: action
  command: "F0 00 00 1A 50 12 {MV} {mV} 00 0E {RoomNumber1} {RoomNumber2} {VL} F7"  # 00..3F=Combined, 40..7F=Divided
  params:
    - {name: RoomNumber1, type: hex}
    - {name: RoomNumber2, type: hex}
    - {name: VL, type: hex}

- id: get_channel_name
  label: Get Channel Name
  kind: query
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 09 {CH} F7"  # reply: SysEx 0{N} 0A {CH} {Name} F7; Name = hex ASCII up to 8 chars
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: get_channel_colour
  label: Get Channel Colour
  kind: query
  command: "F0 00 00 1A 50 12 {MV} {mV} 0{N} 0B {CH} F7"  # reply: SysEx 0{N} 0C {CH} {Colour} F7
  params:
    - {name: N, type: integer}
    - {name: CH, type: hex}

- id: authenticate
  label: TLS Authentication Handshake
  kind: action
  command: "{UserProfile} {UserPassword}"  # first data on TLS socket; UserProfile 00..1F; reply "AuthOK" or drop
  params:
    - {name: UserProfile, type: hex, description: "00..1F"}
    - {name: UserPassword, type: string}
```

## Feedbacks
```yaml
- id: channel_mute_state
  type: enum
  values: [on, off]
  description: Received: velocity 01..3F=off, 40..7F=on; velocity 00 and NOTE OFF ignored.

- id: channel_level
  type: integer
  range: [0, 127]
  description: 00..7F mapping -Inf..+10 dB.

- id: input_trim
  type: integer
  range: [0, 127]
  description: 00..7F mapping -24..+24 dB.

- id: input_preamp_gain
  type: integer
  range: [0, 127]
  description: 00..7F mapping +5..+60 dB.

- id: input_preamp_pad
  type: enum
  values: [off, on]
  description: VL 00..3F=off, 40..7F=on.

- id: input_preamp_phantom
  type: enum
  values: [off, on]
  description: VL 00..3F=off, 40..7F=on.

- id: send_level
  type: integer
  range: [0, 127]
  description: 00..7F mapping -Inf..+10 dB.

- id: send_mute_state
  type: enum
  values: [on, off]

- id: preset_recalled
  type: string
  description: Unit emits Bank Select + Program Change sequence on local preset recall.

- id: source_changed
  type: string
  description: "SysEx 00 08 {CH} {SourceNumber} {SourceColour} {SourceName} F7 emitted on local source select."

- id: room_source_changed
  type: string
  description: "SysEx 00 0D {CH} {SourceNumber} {SourceColour} {SourceName} F7 emitted on local room-source select."

- id: rooms_combiner_state
  type: string
  description: "SysEx 00 0E {RoomNumber1} {RoomNumber2} {VL} F7 emitted when combiners change."

- id: channel_name
  type: string
  description: Hex ASCII, up to 8 chars (SysEx 0{N} 0A {CH} {Name} F7).

- id: channel_colour
  type: integer
  description: Colour value (SysEx 0{N} 0C {CH} {Colour} F7).

- id: auth_ok
  type: string
  description: "Six-character literal 'AuthOK' on successful TLS authentication."
```

## Variables
```yaml
# UNRESOLVED: source does not define continuous settable parameters outside the action list.
```

## Events
```yaml
# Captured under Feedbacks (preset_recalled, source_changed, room_source_changed, rooms_combiner_state).
# No additional unsolicited notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Phantom power can damage passive or ribbon microphones; pad and phantom toggles are operator-driven with no source-documented interlock.
```

## Notes
"Known protocol" supplied as RS-232C, but refined source document is titled "AHM TCP/IP Protocol Firmware V1.5" and exclusively describes TCP/IP control via MIDI-format messages on port 51325 (plain) or 51327 (TLS). No RS-232 framing, baud, or wiring present in source — populate those as UNRESOLVED if a separate RS-232 manual exists.

SysEx Header template `F0 00 00 1A 50 12 MV mV` is shared by every SysEx message; MV=01 (major), mV=00 (minor) per source. Channel selection: inputs (N=0), zones (N=1), control groups (N=2, 32 channels), rooms (N=3, 16 channels).

A value table referenced at the end of the source PDF existed as an image only and was not extracted; inline textual ranges used in the actions above.
```

Saved to `/tmp/allen_heath_dx88_p_spec.md` and surfaced above.

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/AHM-TCP-Protocol-V1.5.pdf
  - https://www.allen-heath.com/content/uploads/2023/05/DX-GX-System-Guide-ISS_5.pdf
retrieved_at: 2026-07-13T19:02:16.952Z
last_checked_at: 2026-07-21T20:06:08.873Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:06:08.873Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions matched literal source commands; transport parameters (TCP ports, auth) verified; coverage is complete and one-to-one. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source PDF referenced an end-of-document value table that was image-only and could not be extracted; inline parameter ranges used."
- "no power commands in source; do not infer"
- "source does not define continuous settable parameters outside the action list."
- "source documents no multi-step macro sequences."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
