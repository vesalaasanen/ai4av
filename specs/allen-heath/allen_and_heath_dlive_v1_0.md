---
spec_id: admin/allen-heath-dlive
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath dLive Control Spec"
manufacturer: "Allen & Heath"
model_family: dLive
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - dLive
  firmware: V1.9
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2023/05/dLive-MIDI-Over-TCP-Protocol-V1.9.pdf
  - https://www.allen-heath.com/content/uploads/2024/06/dLive-MIDI-Over-TCP-Protocol-V2.0.pdf
  - https://www.allen-heath.com/hardware/dlive/
retrieved_at: 2026-06-14T21:06:15.371Z
last_checked_at: 2026-06-16T07:00:45.335Z
generated_at: 2026-06-16T07:00:45.335Z
firmware_coverage: V1.9
protocol_coverage: []
known_gaps:
  - "MIDI transport (MMC) commands are named in source but no MMC byte sequences are documented; only the capability is listed."
  - "Plain (non-TLS) port auth behaviour beyond \"no auth message\" is not detailed in source."
  - "MMC (MIDI Machine Control) transport feedback messages are named but not byte-documented in source."
  - "no standalone settable variables beyond the action parameter sets are documented separately in source."
  - "no other unsolicited event/notification messages documented in source."
  - "no multi-step command sequences described explicitly in source."
  - "source contains no explicit safety warnings, interlock procedures, or power-on"
  - "MIDI transport (MMC) commands listed as a capability (\"MIDI transport — MIDI Machine Control (MMC)\") but no MMC byte sequences are documented in this specification."
  - "Authentication token format beyond \"UserProfile,UserPassword\" ASCII (UserProfile 00-1F) is not further specified; whether UserPassword has length/charset constraints is not stated."
  - "Connection keepalive/idle-timeout behaviour not stated in source."
  - "Maximum concurrent TCP client connections not stated in source."
  - "PEQ \"Type\" restrictions per band (e.g. Shelf only on bands 0/3) documented but not enforced at spec-action level."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:00:45.335Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec actions matched exactly to source command tokens with correct MIDI byte sequences and transport parameters verified. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Allen & Heath dLive Control Spec

## Summary
The Allen & Heath dLive is a digital mixing system (Surface + MixRack). This spec covers the dLive MIDI-over-TCP/IP control protocol documented for firmware V1.9 and later. Control messages use the MIDI message format (Note On/Off, NRPN, Pitchbend, SysEx, Program Change, MMC) carried over a TCP/IP socket on any Network port of the dLive Surface or MixRack. A TLS/SSL variant requires profile/password authentication on socket open.

<!-- UNRESOLVED: MIDI transport (MMC) commands are named in source but no MMC byte sequences are documented; only the capability is listed. -->
<!-- UNRESOLVED: Plain (non-TLS) port auth behaviour beyond "no auth message" is not detailed in source. -->

## Transport
```yaml
protocols:
  - tcp  # MIDI message format carried over TCP/IP; "midi" is the encoding, not a separate transport
addressing:
  port: 51325  # without encryption (Rendezvous port)
  port_tls: 51327  # with TLS/SSL encryption
  notes: "TCP/IP control available via any Network port on the dLive Surface or MixRack."
auth:
  type: credentials
  notes: >
    Authentication applies to the TLS/SSL socket (port 51327) only.
    On socket open, the first data sent must be: 'UserProfile, UserPassword'
    where UserProfile = 00 to 1F. If username and password match, the unit
    responds with the six characters 'AuthOK'; otherwise the connection is
    dropped. The plain socket (port 51325) requires no authentication.
```

## Traits
```yaml
traits:
  - levelable   # inferred: fader levels, send levels, preamp gain, PEQ/HPF control present
  - queryable   # inferred: multiple Get SysEx/NRPN query commands returning state present
  - routable    # inferred: input-to-main/group/aux assign, DCA assign, mute-group assign present
```

## Actions
```yaml
# SysEx Header (applies to all SysEx messages below) = F0, 00, 00, 1A, 50, 10
# Variables: N = base MIDI channel (0-B for MIDI channels 1-12); CH = note number
# selecting channel type/number (see Channel Selection table in source).
# [9N]/[BN] = bytes omitted under MIDI running status when Status repeats.
# All MIDI message numbers are hexadecimal (per source).

# --- Fader / Level control ---
- id: set_fader_level
  label: Set Fader Level
  kind: action
  command: "B{N} 63 {CH} [B{N}] 62 17 [B{N}] 06 {LV}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number (see Channel Selection table)
    - name: LV
      type: integer
      description: Fader value 00-7F (-inf to +10dB)

- id: get_fader_level
  label: Get Fader Level
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 05 0B 17 {CH} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
  notes: Unit transmits the appropriate Fader Level message in reply.

# --- Mute ---
- id: mute_on
  label: Mute ON
  kind: action
  command: "9{N} {CH} 7F [9{N}] {CH} 00"
  params:
    - name: N
      type: integer
      description: MIDI channel offset for channel type
    - name: CH
      type: integer
      description: Channel note number
  notes: NOTE ON velocity > 40 followed by NOTE OFF. Applies to Input, Mix master, FX send, FX return, DCA, Mute Group.

- id: mute_off
  label: Mute OFF
  kind: action
  command: "9{N} {CH} 3F [9{N}] {CH} 00"
  params:
    - name: N
      type: integer
      description: MIDI channel offset for channel type
    - name: CH
      type: integer
      description: Channel note number
  notes: NOTE ON velocity < 40 followed by NOTE OFF. Received velocity 00 and NOTE OFF messages are ignored.

- id: get_mute_status
  label: Get Mute Status
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 05 09 {CH} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
  notes: Unit transmits the appropriate Channel Mute ON or OFF message.

# --- Channel Assignment to Main Mix ---
- id: assign_to_main_on
  label: Channel Assignment to Main Mix ON
  kind: action
  command: "B{N} 63 {CH} [B{N}] 62 18 [B{N}] 06 7F"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
  notes: NRPN parameter ID 18, ON value = 40 to 7F.

- id: assign_to_main_off
  label: Channel Assignment to Main Mix OFF
  kind: action
  command: "B{N} 63 {CH} [B{N}] 62 18 [B{N}] 06 3F"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
  notes: NRPN parameter ID 18, OFF value = 00 to 3F.

- id: get_main_assign
  label: Get Channel Assignment to Main Mix
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 05 0B 18 {CH} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number

# --- AUX / FX / Matrix Send Level ---
- id: set_send_level
  label: Set AUX/FX/Matrix Send Level
  kind: action
  command: "F0 00 00 1A 50 10 0{N} 0D {CH} {SndN} {SndCH} {LV} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Source channel note number
    - name: SndN
      type: integer
      description: MIDI channel of destination
    - name: SndCH
      type: integer
      description: Note number of destination
    - name: LV
      type: integer
      description: Send value 00-7F (-inf to +10dB)

- id: get_send_level
  label: Get AUX/FX/Matrix Send Level
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 05 0F 0D {CH} {SndN} {SndCH} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Source channel note number
    - name: SndN
      type: integer
      description: MIDI channel of destination
    - name: SndCH
      type: integer
      description: Note number of destination

# --- Input to Group / Aux ---
- id: input_to_group_on
  label: Input to Group/Aux ON
  kind: action
  command: "F0 00 00 1A 50 10 0{N} 0E {CH} {SndN} {SndCH} {V} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Source channel note number
    - name: SndN
      type: integer
      description: Destination MIDI channel
    - name: SndCH
      type: integer
      description: Destination note number
    - name: V
      type: integer
      description: ON value = 40 to 7F

- id: get_input_to_group
  label: Get Input to Group/Aux
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 05 0F 0E {CH} {SndN} {SndCH} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Source channel note number
    - name: SndN
      type: integer
      description: Destination MIDI channel
    - name: SndCH
      type: integer
      description: Destination note number

# --- Socket Preamp ---
- id: set_preamp_gain
  label: Set Socket Preamp Gain
  kind: action
  command: "E{N} {MP} {GV}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: MP
      type: integer
      description: Preamp number (Mixrack sockets 1-64 = 00-3F; DX 1/2 = 40-5F; DX 3/4 = 60-7F)
    - name: GV
      type: integer
      description: Gain value 00-7F (min to max)
  notes: Pitchbend message.

- id: get_preamp_gain
  label: Get Socket Preamp Gain
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 05 0B 19 {CH} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number

- id: set_preamp_pad
  label: Set Socket Preamp Pad
  kind: action
  command: "F0 00 00 1A 50 10 0{N} 09 {MP} {Pad} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: MP
      type: integer
      description: Preamp number
    - name: Pad
      type: integer
      description: OFF = 00 to 3F, ON = 40 to 7F

- id: get_preamp_pad
  label: Get Socket Preamp Pad
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 07 {MP} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: MP
      type: integer
      description: Preamp number
  notes: Reply = "F0 00 00 1A 50 10 0{N} 08 {MP} {Pad} F7" where Pad OFF = 00, ON = 7F.

- id: set_preamp_48v
  label: Set Socket Preamp 48V
  kind: action
  command: "F0 00 00 1A 50 10 0{N} 0C {MP} {48V} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: MP
      type: integer
      description: Preamp number
    - name: 48V
      type: integer
      description: Phantom power OFF = 00 to 3F, ON = 40 to 7F

- id: get_preamp_48v
  label: Get Socket Preamp 48V
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 0A {MP} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: MP
      type: integer
      description: Preamp number
  notes: Reply = "F0 00 00 1A 50 10 0{N} 0B {MP} {48V} F7" where 48V OFF = 00, ON = 7F.

# --- DCA Assignment ---
- id: dca_assign_on
  label: DCA Assignment ON
  kind: action
  command: "B{N} 63 {CH} [B{N}] 62 40 [B{N}] 06 {DB}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
    - name: DB
      type: integer
      description: DCA 1-24 ON value = 40 to 57
  notes: NRPN parameter ID 40.

- id: dca_assign_off
  label: DCA Assignment OFF
  kind: action
  command: "B{N} 63 {CH} [B{N}] 62 40 [B{N}] 06 {DA}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
    - name: DA
      type: integer
      description: DCA 1-24 OFF value = 00 to 17
  notes: NRPN parameter ID 40.

# --- Mute Group Assignment ---
- id: mute_group_assign_on
  label: Mute Group Assignment ON
  kind: action
  command: "B{N} 63 {CH} [B{N}] 62 40 [B{N}] 06 {DB}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
    - name: DB
      type: integer
      description: Mute Group 1-8 ON value = 58 to 5F
  notes: NRPN parameter ID 40.

- id: mute_group_assign_off
  label: Mute Group Assignment OFF
  kind: action
  command: "B{N} 63 {CH} [B{N}] 62 40 [B{N}] 06 {DA}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
    - name: DA
      type: integer
      description: Mute Group 1-8 OFF value = 18 to 1F
  notes: NRPN parameter ID 40.

# --- Channel Name & Colour ---
- id: set_channel_name
  label: Set Channel Name
  kind: action
  command: "F0 00 00 1A 50 10 0{N} 03 {CH} {Name} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
    - name: Name
      type: string
      description: Hex ASCII string

- id: get_channel_name
  label: Get Channel Name
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 01 {CH} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
  notes: Reply = "F0 00 00 1A 50 10 0{N} 02 {CH} {Name} F7".

- id: set_channel_colour
  label: Set Channel Colour
  kind: action
  command: "F0 00 00 1A 50 10 0{N} 06 {CH} {Col} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
    - name: Col
      type: integer
      description: Colour 00-07 (Off/Red/Green/Yellow/Blue/Purple/Lt Blue/White)

- id: get_channel_colour
  label: Get Channel Colour
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 04 {CH} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
  notes: Reply = "F0 00 00 1A 50 10 0{N} 05 {CH} {Col} F7".

# --- Parametric EQ ---
- id: set_peq
  label: Set Parametric EQ
  kind: action
  command: "B{N} 63 {CH} [B{N}] 62 {nn} [B{N}] 06 {vv}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
    - name: nn
      type: integer
      description: >
        Parameter ID 1A-29 depending on band/function. Band0 Type/Freq/Width/Gain = 1A/1B/1C/1D;
        Band1 = 1E/1F/20/21; Band2 = 22/23/24/25; Band3 = 26/27/28/29.
    - name: vv
      type: integer
      description: Value 00-7F (encoding depends on param: Type, Frequency, Width, or Gain - see source tables)
  notes: NRPN. Type table, Frequency/Width log formula, and Gain formula in source.

- id: get_peq
  label: Get Parametric EQ
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 05 0B {nn} {CH} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
    - name: nn
      type: integer
      description: Parameter ID 1A-29

# --- HPF ---
- id: set_hpf_frequency
  label: Set HPF Frequency
  kind: action
  command: "B{N} 63 {CH} [B{N}] 62 30 [B{N}] 06 {vv}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
    - name: vv
      type: integer
      description: Frequency value 00-7F (vv = INT(127*((4608*LOG10(FREQUENCY/4)/LOG10(2))-10699)/41314))
  notes: NRPN parameter ID 30.

- id: get_hpf_frequency
  label: Get HPF Frequency
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 05 0B 30 {CH} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number

- id: set_hpf_on_off
  label: Set HPF On/Off
  kind: action
  command: "B{N} 63 {CH} [B{N}] 62 31 [B{N}] 06 {HPF}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number
    - name: HPF
      type: integer
      description: OFF = 00 to 3F, ON = 40 to 7F
  notes: NRPN parameter ID 31.

- id: get_hpf_on_off
  label: Get HPF On/Off
  kind: query
  command: "F0 00 00 1A 50 10 0{N} 05 0B 31 {CH} F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: CH
      type: integer
      description: Channel note number

# --- Scene Recall ---
- id: recall_scene
  label: Recall Scene
  kind: action
  command: "B{N} 00 {bank} C{N} {SS}"
  params:
    - name: N
      type: integer
      description: Base MIDI channel (0-B)
    - name: bank
      type: integer
      description: >
        Bank-select byte. Scene 1-128 -> 00; 129-256 -> 01; 257-384 -> 02; 385-500 -> 03.
    - name: SS
      type: integer
      description: Scene within bank 00-7F (banks 1-3) or 00-73 (bank 4)
  notes: >
    Bank + Program Change message. 500 Scenes across 4 banks. dLive also transmits this message
    when a Scene is recalled from the dLive screen.

# --- MIDI Strips (default Custom MIDI mappings, 32 strips available) ---
- id: midi_strip_fader
  label: MIDI Strip Fader
  kind: action
  command: "B1 00..1F {VAR}"
  params:
    - name: VAR
      type: integer
      description: Value determined by fader position (00-7F)
  notes: Strip index 00-1F. Default template mapping.

- id: midi_strip_rotary_gain
  label: MIDI Strip Rotary Gain
  kind: action
  command: "B2 00..1F {VAR}"
  params:
    - name: VAR
      type: integer
      description: Value from rotary position (00-7F)

- id: midi_strip_rotary_pan
  label: MIDI Strip Rotary Pan
  kind: action
  command: "B2 20..3F {VAR}"
  params:
    - name: VAR
      type: integer
      description: Value from rotary position (00-7F)

- id: midi_strip_rotary_custom_1
  label: MIDI Strip Rotary Custom 1
  kind: action
  command: "B2 40..5F {VAR}"
  params:
    - name: VAR
      type: integer
      description: Value from rotary position (00-7F)

- id: midi_strip_rotary_custom_2
  label: MIDI Strip Rotary Custom 2
  kind: action
  command: "B2 60..7F {VAR}"
  params:
    - name: VAR
      type: integer
      description: Value from rotary position (00-7F)

- id: midi_strip_rotary_custom_3
  label: MIDI Strip Rotary Custom 3
  kind: action
  command: "B2 40..5F {VAR}"
  params:
    - name: VAR
      type: integer
      description: Value from rotary position (00-7F)
  notes: By default uses same values as Rotary Custom 1.

- id: midi_strip_rotary_custom_4
  label: MIDI Strip Rotary Custom 4
  kind: action
  command: "B2 60..7F {VAR}"
  params:
    - name: VAR
      type: integer
      description: Value from rotary position (00-7F)
  notes: By default uses same values as Rotary Custom 2.

- id: midi_strip_mute_key
  label: MIDI Strip Mute Key
  kind: action
  command: "91 00..1F {VAR}"
  params:
    - name: VAR
      type: integer
      description: Value (00-7F)

- id: midi_strip_mix_key
  label: MIDI Strip Mix Key
  kind: action
  command: "91 20..3F {VAR}"
  params:
    - name: VAR
      type: integer
      description: Value (00-7F)

- id: midi_strip_pafl_key
  label: MIDI Strip PAFL Key
  kind: action
  command: "91 40..5F {VAR}"
  params:
    - name: VAR
      type: integer
      description: Value (00-7F)
  notes: The Sel key is not assigned (required to select Processing screen for MIDI Strip config).
```

## Feedbacks
```yaml
# Query responses / state transmissions documented in source.
- id: fader_level_reply
  type: value
  values: "00-7F (-inf to +10dB)"
  notes: Transmitted in response to Get Fader Level.

- id: mute_state_reply
  type: enum
  values: [on, off]
  notes: "ON reply: 9{N} {CH} 7F, [9{N}] {CH} 00. OFF reply: 9{N} {CH} 3F, [9{N}] {CH} 00."

- id: main_assign_reply
  type: enum
  values: [on, off]
  notes: NRPN parameter ID 18 reply (ON 40-7F / OFF 00-3F).

- id: send_level_reply
  type: value
  values: "00-7F"

- id: input_to_group_reply
  type: enum
  values: [on, off]

- id: preamp_gain_reply
  type: value
  values: "00-7F"

- id: preamp_pad_reply
  type: enum
  values: [on, off]
  notes: Reply Pad OFF = 00, ON = 7F.

- id: preamp_48v_reply
  type: enum
  values: [on, off]
  notes: Reply 48V OFF = 00, ON = 7F.

- id: channel_name_reply
  type: string
  notes: "Reply: F0 00 00 1A 50 10 0{N} 02 {CH} {Name} F7"

- id: channel_colour_reply
  type: enum
  values: [off, red, green, yellow, blue, purple, lt_blue, white]
  notes: "Reply: F0 00 00 1A 50 10 0{N} 05 {CH} {Col} F7; Col 00-07"

- id: peq_reply
  type: value
  values: "00-7F"

- id: hpf_frequency_reply
  type: value
  values: "00-7F"

- id: hpf_on_off_reply
  type: enum
  values: [on, off]

- id: auth_result
  type: enum
  values: [AuthOK, dropped]
  notes: On TLS socket open with 'UserProfile,UserPassword'; 'AuthOK' (6 chars) on success, connection dropped on failure.

# UNRESOLVED: MMC (MIDI Machine Control) transport feedback messages are named but not byte-documented in source.
```

## Variables
```yaml
# Settable parameters exposed as continuous/enum values (already enumerated as actions above).
# None additional beyond the action parameters.

# UNRESOLVED: no standalone settable variables beyond the action parameter sets are documented separately in source.
```

## Events
```yaml
# Unsolicited notifications the device sends.
- id: scene_recall_notification
  notes: >
    When a Scene is recalled from the dLive screen, the unit transmits the Scene Recall
    (Bank + Program Change) message. See recall_scene action.

# UNRESOLVED: no other unsolicited event/notification messages documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements. Phantom power (48V) and preamp controls are present but no safety
# interlock text is documented in this protocol specification.
```

## Notes
- **Protocol nature:** This is MIDI-over-TCP/IP. The transport is TCP; the message encoding is standard MIDI (Note On/Off, Control Change, NRPN, Pitchbend, Program Change, SysEx). There is no separate ASCII/string command set.
- **SysEx Header:** All SysEx messages share the header `F0, 00, 00, 1A, 50, 10` (Allen & Heath manufacturer ID `00 00 1A`, model bytes `50 10`). Reply SysEx version bytes are MV=01 (major), mV=00 (minor).
- **MIDI running status:** dLive uses MIDI running status — a Status byte may be omitted when it repeats the previous message's Status. Omitted bytes are shown in `[brackets]` (e.g. `[9N]`, `[BN]`) in command templates. Implementers must track the last Status byte.
- **Channel selection scheme:** Audio channel type is selected by offsetting the base MIDI channel N (set in Utility/Control/MIDI), and the audio channel number is selected via the note number CH:
  - Inputs 1-128: N=N, CH=00-7F
  - Mono Groups 1-62: N=N+1, CH=00-3D
  - Stereo Groups 1-31: N=N+1, CH=40-5E
  - Mono Aux 1-62: N=N+2, CH=00-3D
  - Stereo Aux 1-31: N=N+2, CH=40-5E
  - Mono Matrix 1-62: N=N+3, CH=00-3D
  - Stereo Matrix 1-31: N=N+3, CH=40-5E
  - Mono FX Send 1-16: N=N+4, CH=00-0F
  - Stereo FX Send 1-16: N=N+4, CH=10-1F
  - FX Return 1-16: N=N+4, CH=20-2F
  - Mains 1-6: N=N+4, CH=30-35
  - DCA 1-24: N=N+4, CH=36-4D
  - Mute Group 1-8: N=N+4, CH=4E-55
- **Socket preamp numbering:** Mixrack sockets 1-64 = MP 00-3F; Mixrack DX 1/2 = 40-5F; Mixrack DX 3/4 = 60-7F.
- **Value encodings (from source tables):**
  - Fader Level LV: +10dB=7F, 0dB=6B, -inf=00. `LV = ((Gain+54)/64)*7F`.
  - Preamp Gain GV: +60=7F, +5=00. `GV = ((Gain-5)/55)*7F`.
  - PEQ Frequency vv (20Hz-20kHz): `vv = INT(127*((4608*LOG10(FREQUENCY/4)/LOG10(2))-10699)/45922)`.
  - PEQ Gain vv (-15..+15dB): `vv = (GAIN+15)*126/30`.
  - HPF Frequency vv: `vv = INT(127*((4608*LOG10(FREQUENCY/4)/LOG10(2))-10699)/41314)`.
  - Colour: 00=Off,01=Red,02=Green,03=Yellow,04=Blue,05=Purple,06=Lt Blue,07=White.
- **Two ports:** Plain TCP 51325 (no encryption, no auth); TLS/SSL TCP 51327 (encryption + profile/password auth).
- **Firmware:** Source targets firmware V1.9 and later.

<!-- UNRESOLVED: MIDI transport (MMC) commands listed as a capability ("MIDI transport — MIDI Machine Control (MMC)") but no MMC byte sequences are documented in this specification. -->
<!-- UNRESOLVED: Authentication token format beyond "UserProfile,UserPassword" ASCII (UserProfile 00-1F) is not further specified; whether UserPassword has length/charset constraints is not stated. -->
<!-- UNRESOLVED: Connection keepalive/idle-timeout behaviour not stated in source. -->
<!-- UNRESOLVED: Maximum concurrent TCP client connections not stated in source. -->
<!-- UNRESOLVED: PEQ "Type" restrictions per band (e.g. Shelf only on bands 0/3) documented but not enforced at spec-action level. -->

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2023/05/dLive-MIDI-Over-TCP-Protocol-V1.9.pdf
  - https://www.allen-heath.com/content/uploads/2024/06/dLive-MIDI-Over-TCP-Protocol-V2.0.pdf
  - https://www.allen-heath.com/hardware/dlive/
retrieved_at: 2026-06-14T21:06:15.371Z
last_checked_at: 2026-06-16T07:00:45.335Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:00:45.335Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec actions matched exactly to source command tokens with correct MIDI byte sequences and transport parameters verified. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MIDI transport (MMC) commands are named in source but no MMC byte sequences are documented; only the capability is listed."
- "Plain (non-TLS) port auth behaviour beyond \"no auth message\" is not detailed in source."
- "MMC (MIDI Machine Control) transport feedback messages are named but not byte-documented in source."
- "no standalone settable variables beyond the action parameter sets are documented separately in source."
- "no other unsolicited event/notification messages documented in source."
- "no multi-step command sequences described explicitly in source."
- "source contains no explicit safety warnings, interlock procedures, or power-on"
- "MIDI transport (MMC) commands listed as a capability (\"MIDI transport — MIDI Machine Control (MMC)\") but no MMC byte sequences are documented in this specification."
- "Authentication token format beyond \"UserProfile,UserPassword\" ASCII (UserProfile 00-1F) is not further specified; whether UserPassword has length/charset constraints is not stated."
- "Connection keepalive/idle-timeout behaviour not stated in source."
- "Maximum concurrent TCP client connections not stated in source."
- "PEQ \"Type\" restrictions per band (e.g. Shelf only on bands 0/3) documented but not enforced at spec-action level."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
