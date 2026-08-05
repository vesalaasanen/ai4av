---
spec_id: admin/allen-heath-gx4816
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath Gx4816 (AHM) Control Spec"
manufacturer: "Allen & Heath"
model_family: Gx4816
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - Gx4816
  firmware: V1.5
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/AHM-TCP-Protocol-V1.5.pdf
  - https://www.allen-heath.com/content/uploads/2023/05/DX-GX-System-Guide-ISS_5.pdf
retrieved_at: 2026-07-13T19:02:23.875Z
last_checked_at: 2026-07-21T20:06:13.184Z
generated_at: 2026-07-21T20:06:13.184Z
firmware_coverage: V1.5
protocol_coverage: []
known_gaps:
  - "The source references \"a table of values for each parameter\" at the end of the document that was present only as an image and could not be extracted. Inline ranges from the body text are used instead."
  - "Device hardware I/O count (inputs/zones), power specs, and voltage are not stated in this protocol document."
  - "exact dB-to-hex mapping for each parameter beyond the stated"
  - "none documented."
  - "phantom power (48 V) engagement is a settable action with no"
  - "end-of-document parameter table (level/trim/gain dB-to-hex mapping) was image-only and not extractable; only the inline endpoint ranges are captured."
  - "no power on/off command documented; device powerability not determinable from this source."
  - "connection idle/keepalive behaviour, response framing, and message delimiters for non-SysEx (NRPN/Note) traffic over the TCP stream are not specified."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:06:13.184Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched exactly in source; MIDI command formats, NRPN parameter IDs (0x17-0x1B, 0x20), and SysEx function codes all verified; transport parameters (ports 51325/51327, credential auth) confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Allen & Heath Gx4816 (AHM) Control Spec

## Summary
The Allen & Heath Gx4816 is an AHM audio matrix processor controlled over TCP/IP using MIDI-format messages. Control is via the rear-panel Network socket. Firmware V1.5 documents NRPN (levels, trim, preamp), Note On (mutes), Program Change (preset recall), and SysEx (sends, source selection, room combining, names, colours, playback) message types.

<!-- UNRESOLVED: The source references "a table of values for each parameter" at the end of the document that was present only as an image and could not be extracted. Inline ranges from the body text are used instead. -->
<!-- UNRESOLVED: Device hardware I/O count (inputs/zones), power specs, and voltage are not stated in this protocol document. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 51325          # Rendezvous port, unencrypted (stated in source)
  # Alternate: TLS/SSL Rendezvous port TCP 51327 (stated in source)
auth:
  type: credential
  notes: >-
    For the TLS/SSL socket (port 51327), the first data sent must be the ASCII
    message "UserProfile,UserPassword" where UserProfile = 00 to 1F. If the
    credentials match, the unit responds with the six characters "AuthOK";
    otherwise the connection is dropped. The unencrypted socket (port 51325)
    has no authentication procedure documented.
```

## Traits
```yaml
traits:
  - queryable   # inferred: numerous Get (SysEx 01) query commands documented
  - levelable   # inferred: NRPN channel/input/zone/send level + trim/gain controls
  - routable    # inferred: input-to-zone and zone-to-zone send levels/mutes + source selector
```

## Notes on MIDI addressing
```yaml
# Channel selection (from source):
#   Inputs 1-64:        N = 0, CH = 00..3F
#   Zones 1-64:         N = 1, CH = 00..3F
#   Control Groups 1-32: N = 2, CH = 00..1F
#   Rooms 1-16:         N = 3, CH = 00..0F
#
# In commands below:
#   {N}    = MIDI channel nibble (0,1,2,3) per the table above
#   {CH}   = channel note number (hex) selecting the specific input/zone/group/room
#   {LV}   = level value 00..7F
#   {GN}   = preamp gain value 00..7F
#   {VL}   = on/off value (00..3F = off, 40..7F = on)
#   {SndN} / {SndCH} = MIDI channel + note number of the destination (send target)
#   SysEx Header (all SysEx) = F0 00 00 1A 50 12 01 00   (MV=01, mV=00)
```

## Actions
```yaml
# --- Channel Mute (Note On) ---
- id: channel_mute_on
  label: Channel Mute On
  kind: action
  command: "9{N} {CH} 7F 9{N} {CH} 00"
  params:
    - name: N
      type: integer
      description: MIDI channel nibble (0=Input,1=Zone,2=ControlGroup,3=Room)
    - name: CH
      type: integer
      description: Channel note number (hex) selecting the target channel
  notes: "NOTE ON velocity >40 (7F) followed by NOTE OFF"

- id: channel_mute_off
  label: Channel Mute Off
  kind: action
  command: "9{N} {CH} 3F 9{N} {CH} 00"
  params:
    - name: N
      type: integer
      description: MIDI channel nibble (0=Input,1=Zone,2=ControlGroup,3=Room)
    - name: CH
      type: integer
      description: Channel note number (hex) selecting the target channel
  notes: "NOTE ON velocity <40 (3F) followed by NOTE OFF"

- id: get_channel_mute
  label: Get Channel Mute
  kind: query
  command: "F0 00 00 1A 50 12 01 00 0{N} 01 09 {CH} F7"
  params:
    - name: N
      type: integer
      description: MIDI channel nibble
    - name: CH
      type: integer
      description: Channel note number
  notes: "Unit responds with appropriate Channel Mute on/off message"

# --- Channel Level (NRPN param 17) ---
- id: set_channel_level
  label: Set Channel Level
  kind: action
  command: "B{N} 63 {CH} B{N} 62 17 B{N} 06 {LV}"
  params:
    - name: N
      type: integer
      description: MIDI channel nibble
    - name: CH
      type: integer
      description: Channel note number
    - name: LV
      type: integer
      description: Level value 00..7F (-Inf to +10 dB per source table)
  notes: "NRPN parameter ID 0x17"

- id: get_channel_level
  label: Get Channel Level
  kind: query
  command: "F0 00 00 1A 50 12 01 00 0{N} 01 0B 17 {CH} F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
  notes: "Unit responds with the appropriate Channel Level message"

- id: level_increment
  label: Level Increment
  kind: action
  command: "B{N} 63 {CH} B{N} 62 20 B{N} 06 7F"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
  notes: "NRPN parameter ID 0x14 (20)"

- id: level_decrement
  label: Level Decrement
  kind: action
  command: "B{N} 63 {CH} B{N} 62 20 B{N} 06 3F"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
  notes: "NRPN parameter ID 0x14 (20)"

# --- Input Trim (NRPN param 18) ---
- id: set_input_trim
  label: Set Input Trim
  kind: action
  command: "B{N} 63 {CH} B{N} 62 18 B{N} 06 {LV}"
  params:
    - name: N
      type: integer
      description: MIDI channel nibble (Inputs use N=0)
    - name: CH
      type: integer
      description: Channel note number
    - name: LV
      type: integer
      description: Trim value 00..7F (-24 to +24 dB)
  notes: "NRPN parameter ID 0x18"

- id: get_input_trim
  label: Get Input Trim
  kind: query
  command: "F0 00 00 1A 50 12 01 00 0{N} 01 0B 18 {CH} F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

# --- Input Preamp Gain (NRPN param 19) ---
- id: set_input_preamp_gain
  label: Set Input Preamp Gain
  kind: action
  command: "B{N} 63 {CH} B{N} 62 19 B{N} 06 {GN}"
  params:
    - name: N
      type: integer
      description: MIDI channel nibble (Inputs use N=0)
    - name: CH
      type: integer
      description: Channel note number
    - name: GN
      type: integer
      description: Gain value 00..7F (+5 dB to +60 dB)
  notes: "NRPN parameter ID 0x19"

- id: get_input_preamp_gain
  label: Get Input Preamp Gain
  kind: query
  command: "F0 00 00 1A 50 12 01 00 0{N} 01 0B 19 {CH} F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

# --- Input Preamp Pad (NRPN param 1A) ---
- id: set_input_preamp_pad
  label: Set Input Preamp Pad
  kind: action
  command: "B{N} 63 {CH} B{N} 62 1A B{N} 06 {VL}"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: VL
      type: integer
      description: "00..3F = Pad off, 40..7F = Pad on"
  notes: "NRPN parameter ID 0x1A"

- id: get_input_preamp_pad
  label: Get Input Preamp Pad
  kind: query
  command: "F0 00 00 1A 50 12 01 00 0{N} 01 0B 1A {CH} F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

# --- Input Preamp Phantom Power (NRPN param 1B) ---
- id: set_input_preamp_phantom
  label: Set Input Preamp Phantom Power
  kind: action
  command: "B{N} 63 {CH} B{N} 62 1B B{N} 06 {VL}"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: VL
      type: integer
      description: "00..3F = Phantom Power off, 40..7F = Phantom Power on"
  notes: "NRPN parameter ID 0x1B"

- id: get_input_preamp_phantom
  label: Get Input Preamp Phantom Power
  kind: query
  command: "F0 00 00 1A 50 12 01 00 0{N} 01 0B 1B {CH} F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

# --- Input to Zone / Zone to Zone Send Level (SysEx 02) ---
- id: set_send_level
  label: Set Send Level
  kind: action
  command: "F0 00 00 1A 50 12 01 00 0{N} 02 {CH} {SndN} {SndCH} {LV} F7"
  params:
    - name: N
      type: integer
      description: MIDI channel nibble of source channel
    - name: CH
      type: integer
      description: Channel note number of source channel
    - name: SndN
      type: integer
      description: MIDI channel nibble of destination (send target)
    - name: SndCH
      type: integer
      description: Channel note number of destination (send target)
    - name: LV
      type: integer
      description: Send value 00..7F (-Inf to +10 dB)

- id: get_send_level
  label: Get Send Level
  kind: query
  command: "F0 00 00 1A 50 12 01 00 0{N} 01 0F 02 {CH} {SndN} {SndCH} F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: SndN
      type: integer
    - name: SndCH
      type: integer

- id: increment_send_level
  label: Increment Send Level
  kind: action
  command: "F0 00 00 1A 50 12 01 00 0{N} 04 {CH} {SndN} {SndCH} 7F F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: SndN
      type: integer
    - name: SndCH
      type: integer

- id: decrement_send_level
  label: Decrement Send Level
  kind: action
  command: "F0 00 00 1A 50 12 01 00 0{N} 04 {CH} {SndN} {SndCH} 3F F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: SndN
      type: integer
    - name: SndCH
      type: integer

# --- Send Mutes (SysEx 03) ---
- id: send_mute_on
  label: Send Mute On
  kind: action
  command: "F0 00 00 1A 50 12 01 00 0{N} 03 {CH} {SndN} {SndCH} 7F F7"
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
  command: "F0 00 00 1A 50 12 01 00 0{N} 03 {CH} {SndN} {SndCH} 3F F7"
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
  command: "F0 00 00 1A 50 12 01 00 0{N} 01 0F 03 {CH} {SndN} {SndCH} F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
    - name: SndN
      type: integer
    - name: SndCH
      type: integer

# --- Preset Recall (Program Change, 4 banks, 500 presets) ---
- id: recall_preset
  label: Recall Preset
  kind: action
  command: "B0 00 {Bank} C0 {SS}"
  params:
    - name: Bank
      type: integer
      description: >-
        Bank-select value: 00 = presets 1-128, 01 = 129-256,
        02 = 257-384, 03 = 385-500
    - name: SS
      type: integer
      description: >-
        Program number within bank (00..7F; last bank 00..73 for preset 500)
  notes: >-
    500 presets across 4 banks. Unit also transmits this message when a preset
    is recalled. Source lists the four bank ranges as separate rows:
    B0 00 00 C0 {SS} / B0 00 01 C0 {SS} / B0 00 02 C0 {SS} / B0 00 03 C0 {SS}.

# --- Audio Playback (SysEx 06) ---
- id: audio_playback
  label: Audio Playback
  kind: action
  command: "F0 00 00 1A 50 12 01 00 00 06 {PlaybackChannel} {TrackID} F7"
  params:
    - name: PlaybackChannel
      type: integer
      description: "00 = Mono 1, 01 = Mono 2, 02 = Stereo"
    - name: TrackID
      type: integer
      description: Track ID 00..7F

# --- Source Selector (SysEx 08) ---
- id: set_zone_source_selector
  label: Set Zone Source Selector
  kind: action
  command: "F0 00 00 1A 50 12 01 00 00 08 {CH} {SourceNumber} F7"
  params:
    - name: CH
      type: integer
      description: Zone channel number
    - name: SourceNumber
      type: integer
      description: Source number 00..13
  notes: "CH is the Zone channel number"

- id: get_zone_source_selector
  label: Get Zone Source Selector
  kind: query
  command: "F0 00 00 1A 50 12 01 00 0{N} 01 0F 08 {CH} F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer

# --- Room Source Selector (SysEx 0D) ---
- id: set_room_source_selector
  label: Set Room Source Selector
  kind: action
  command: "F0 00 00 1A 50 12 01 00 00 0D {CH} {SourceNumber} F7"
  params:
    - name: CH
      type: integer
      description: Room channel number
    - name: SourceNumber
      type: integer
      description: Source number 00..13
  notes: "CH is the Room channel number"

# --- Room Combiners / Dividers (SysEx 0E) ---
- id: set_room_combiner
  label: Set Room Combiner / Divider
  kind: action
  command: "F0 00 00 1A 50 12 01 00 00 0E {RoomNumber1} {RoomNumber2} {VL} F7"
  params:
    - name: RoomNumber1
      type: integer
    - name: RoomNumber2
      type: integer
    - name: VL
      type: integer
      description: "00..3F = Rooms Combined, 40..7F = Rooms Divided"
  notes: "Unit also transmits this message when a source is selected/combined"

# --- Channel Name / Colour (SysEx 09 / 0B get) ---
- id: get_channel_name
  label: Get Channel Name
  kind: query
  command: "F0 00 00 1A 50 12 01 00 0{N} 09 {CH} F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
  notes: "Unit responds with SysEx ... 0A {CH} {Name} F7; Name = up to 8 hex ASCII chars"

- id: get_channel_colour
  label: Get Channel Colour
  kind: query
  command: "F0 00 00 1A 50 12 01 00 0{N} 0B {CH} F7"
  params:
    - name: N
      type: integer
    - name: CH
      type: integer
  notes: "Unit responds with SysEx ... 0C {CH} {Colour} F7"
```

## Feedbacks
```yaml
- id: auth_result
  type: enum
  values: [AuthOK, connection_dropped]
  notes: "On TLS/SSL connect, valid credentials yield the 6-char response 'AuthOK'; failure drops the connection"

- id: channel_mute_state
  type: enum
  values: [on, off]
  notes: >-
    Received Channel Mute messages: velocity 00 and NOTE OFF ignored;
    velocity 01..3F = Mute off; velocity 40..7F = Mute on. Also returned by Get Channel Mute.

- id: channel_level
  type: number
  notes: "Channel level value 00..7F (-Inf to +10 dB); returned by Get Channel Level"

- id: input_trim
  type: number
  notes: "Trim value 00..7F (-24 to +24 dB); returned by Get Input Trim"

- id: input_preamp_gain
  type: number
  notes: "Gain value 00..7F (+5 to +60 dB); returned by Get Input Preamp Gain"

- id: input_preamp_pad
  type: enum
  values: [off, on]
  notes: "Returned by Get Input Preamp Pad"

- id: input_preamp_phantom
  type: enum
  values: [off, on]
  notes: "Returned by Get Input Preamp Phantom Power"

- id: send_level
  type: number
  notes: "Send value 00..7F; returned by Get Send Level"

- id: send_mute_state
  type: enum
  values: [on, off]
  notes: "Returned by Get Send Mute"

- id: preset_recalled
  type: number
  notes: "Unit transmits Bank+Program Change when a preset is recalled"

- id: source_selected
  type: object
  notes: >-
    Unit transmits 'SysEx Header 00 08 {CH} {SourceNumber} {SourceColour} {SourceName} F7'
    when a zone source is selected. Get response also lists number of sources,
    each SourceColour, and NULL-terminated SourceNames.

- id: room_source_selected
  type: object
  notes: "Unit transmits 'SysEx Header 00 0D {CH} {SourceNumber} {SourceColour} {SourceName} F7'"

- id: room_combiner_state
  type: enum
  values: [combined, divided]
  notes: "00..3F = Combined, 40..7F = Divided"

- id: channel_name
  type: string
  notes: "Hex ASCII string up to 8 characters; returned by Get Channel Name"

- id: channel_colour
  type: number
  notes: "Returned by Get Channel Colour"
```

## Variables
```yaml
- id: channel_level_value
  label: Channel Level
  unit: dB
  range: "-Inf to +10"
  encoding: "00..7F"
  notes: "See source level table (image-only, not extractable); body states -Inf to +10 dB = 00..7F"

- id: input_trim_value
  label: Input Trim
  unit: dB
  range: "-24 to +24"
  encoding: "00..7F"

- id: input_preamp_gain_value
  label: Input Preamp Gain
  unit: dB
  range: "+5 to +60"
  encoding: "00..7F"

- id: send_level_value
  label: Send Level
  unit: dB
  range: "-Inf to +10"
  encoding: "00..7F"

# UNRESOLVED: exact dB-to-hex mapping for each parameter beyond the stated
# endpoints requires the source's end-of-document parameter table, which was
# an image and could not be extracted.
```

## Events
```yaml
# Unsolicited notifications the device transmits:
- id: preset_recall_event
  description: "Unit transmits Bank + Program Change when a preset is recalled"
  payload: "B0 00 {Bank} C0 {SS}"

- id: source_select_event
  description: "Unit transmits source-selector SysEx when a zone source is selected"
  payload: "F0 00 00 1A 50 12 01 00 00 08 {CH} {SourceNumber} {SourceColour} {SourceName} F7"

- id: room_combiner_event
  description: "Unit transmits room combiner SysEx on combine/divide"
  payload: "F0 00 00 1A 50 12 01 00 00 0E {RoomNumber1} {RoomNumber2} {VL} F7"
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings, interlock procedures, or power-on sequencing described
# in this protocol document.
# UNRESOLVED: phantom power (48 V) engagement is a settable action with no
# documented sequencing/safety interlock in this source - verify against hardware
# documentation before driving phantom power programmatically.
```

## Notes
- Control interface is MIDI-format messages carried over TCP/IP on the rear-panel Network socket.
- Two sockets: unencrypted Rendezvous port TCP 51325, and TLS/SSL Rendezvous port TCP 51327.
- TLS/SSL socket requires an initial `UserProfile,UserPassword` credential message (`UserProfile` = 00..1F); success returns `AuthOK`, failure drops the connection.
- All SysEx messages share the header `F0 00 00 1A 50 12 01 00` (major version 01, minor version 00). Firmware documented is V1.5.
- Channel addressing is by MIDI channel nibble N (0=Inputs, 1=Zones, 2=Control Groups, 3=Rooms) and note number CH.
- 500 presets span 4 MIDI banks via Bank Select (`B0 00 {Bank}`) + Program Change (`C0 {SS}`).

<!-- UNRESOLVED: end-of-document parameter table (level/trim/gain dB-to-hex mapping) was image-only and not extractable; only the inline endpoint ranges are captured. -->
<!-- UNRESOLVED: no power on/off command documented; device powerability not determinable from this source. -->
<!-- UNRESOLVED: connection idle/keepalive behaviour, response framing, and message delimiters for non-SysEx (NRPN/Note) traffic over the TCP stream are not specified. -->
````

Spec emitted. 30 actions, 14 feedbacks, MIDI-over-TCP, ports 51325/51327, TLS auth documented. Gaps flagged UNRESOLVED (image-only param table, power cmd, TCP framing).

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/AHM-TCP-Protocol-V1.5.pdf
  - https://www.allen-heath.com/content/uploads/2023/05/DX-GX-System-Guide-ISS_5.pdf
retrieved_at: 2026-07-13T19:02:23.875Z
last_checked_at: 2026-07-21T20:06:13.184Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:06:13.184Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched exactly in source; MIDI command formats, NRPN parameter IDs (0x17-0x1B, 0x20), and SysEx function codes all verified; transport parameters (ports 51325/51327, credential auth) confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source references \"a table of values for each parameter\" at the end of the document that was present only as an image and could not be extracted. Inline ranges from the body text are used instead."
- "Device hardware I/O count (inputs/zones), power specs, and voltage are not stated in this protocol document."
- "exact dB-to-hex mapping for each parameter beyond the stated"
- "none documented."
- "phantom power (48 V) engagement is a settable action with no"
- "end-of-document parameter table (level/trim/gain dB-to-hex mapping) was image-only and not extractable; only the inline endpoint ranges are captured."
- "no power on/off command documented; device powerability not determinable from this source."
- "connection idle/keepalive behaviour, response framing, and message delimiters for non-SysEx (NRPN/Note) traffic over the TCP stream are not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
