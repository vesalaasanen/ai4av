---
spec_id: admin/allen-heath-cdm48
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
  - https://www.allen-heath.com/support
retrieved_at: 2026-07-13T19:23:33.449Z
last_checked_at: 2026-10-07T13:51:22.513Z
generated_at: 2026-10-07T13:51:22.513Z
firmware_coverage: V1.9
protocol_coverage: []
known_gaps:
  - "supplied device name \"Cdm48\" does not appear in the source; the source documents the dLive system. Model \"dLive\" populated from source; \"Cdm48\" entity kept as supplied. Confirm whether Cdm48 is a MixRack variant within the dLive family."
  - "source does not state whether the non-encrypted port (51325)"
  - "no power on/off command found in source"
  - "no separately enumerated variable registry in source."
  - "no multi-step sequences explicitly described in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "device name \"Cdm48\" supplied by operator does not appear in source; source documents the dLive system. Model set to \"dLive\" from source."
  - "whether non-encryption port (51325) requires authentication not stated."
  - "complete scene-number / hex mapping table partially present in source but truncated; full 1-500 mapping not fully reproduced."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:51:22.513Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions match source frames and transport; source names dLive rather than CDM48 (same-family generic). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Allen & Heath dLive Control Spec

## Summary
Allen & Heath dLive digital mixing system, controlled over TCP/IP via MIDI-format messages. Network port on dLive Surface or MixRack; messages follow the dLive MIDI over TCP/IP protocol. Supports fader/mute/send/scene/preamp/EQ/DCA/Mute-Group control.

<!-- UNRESOLVED: supplied device name "Cdm48" does not appear in the source; the source documents the dLive system. Model "dLive" populated from source; "Cdm48" entity kept as supplied. Confirm whether Cdm48 is a MixRack variant within the dLive family. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 51325  # Rendezvous port (no encryption), stated in source
auth:
  type: credentials  # source: TLS/SSL socket expects first message "UserProfile,UserPassword"
  notes: >-
    Authentication applies to the TLS/SSL socket (Rendezvous port 51327).
    First data sent to dLive must be "UserProfile,UserPassword" where
    UserProfile = 00 to 1F. If credentials match, unit responds with the
    six characters "AuthOK"; otherwise connection is dropped.
    # UNRESOLVED: source does not state whether the non-encrypted port (51325)
    # requires authentication.
```

## Traits
```yaml
# - levelable   (fader / send / gain / EQ control present)
# - routable    (input→main assign, input→group/aux assign present)
# - queryable   (get commands returning state present)
# - powerable   # UNRESOLVED: no power on/off command found in source
```

## Actions
```yaml
# SysEx Header (applies to all SysEx messages) = F0 00 00 1A 50 10 01 00
# (where MV=01 Major version, mV=00 Minor version, stated in source).
# Variables: N = base MIDI channel (0-B for MIDI channels 1-12, set in
# Utility/Control/MIDI); CH = channel note number per Channel Selection
# table; LV/GV/vv = value bytes; MP = socket preamp number.
#
# Channel Selection (source table):
#   Inputs 1-128        N=N,     CH=00-7F
#   Mono Groups 1-62    N=N+1,   CH=00-3D
#   Stereo Groups 1-31  N=N+1,   CH=40-5E
#   Mono Aux 1-62       N=N+2,   CH=00-3D
#   Stereo Aux 1-31     N=N+2,   CH=40-5E
#   Mono Matrix 1-62    N=N+3,   CH=00-3D
#   Stereo Matrix 1-31  N=N+3,   CH=40-5E
#   Mono FX Send 1-16   N=N+4,   CH=00-0F
#   Stereo FX Send 1-16 N=N+4,   CH=10-1F
#   FX Return 1-16      N=N+4,   CH=20-2F
#   Mains 1-6           N=N+4,   CH=30-35
#   DCA 1-24            N=N+4,   CH=36-4D
#   Mute Group 1-8      N=N+4,   CH=4E-55

- id: get_fader_level
  label: Get Fader Level
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 05 0B 17 CH F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B (MIDI channels 1-12)
    - name: CH
      type: integer
      description: Channel note number per Channel Selection table
  notes: Unit responds with appropriate Fader Level message.

- id: set_fader_level
  label: Set Fader Level
  kind: action
  command: "BN 63 CH [BN] 62 17 [BN] 06 LV"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number per Channel Selection table
    - name: LV
      type: integer
      description: Fader value -inf to +10dB = 00 to 7F
  notes: NRPN with parameter ID 17.

- id: mute_on
  label: Mute ON
  kind: action
  command: "9N CH 7F [9N] CH 00"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number per Channel Selection table
  notes: Note On velocity > 40 followed by Note Off. Running status omits [9N].

- id: mute_off
  label: Mute OFF
  kind: action
  command: "9N CH 3F [9N] CH 00"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number per Channel Selection table
  notes: Note On velocity < 40 followed by Note Off.

- id: get_mute_status
  label: Get Mute Status
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 05 09 CH F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number per Channel Selection table
  notes: Unit responds with appropriate Channel Mute ON or OFF message.

- id: assign_main_mix_on
  label: Channel Assignment to Main Mix ON
  kind: action
  command: "BN 63 CH [BN] 62 18 [BN] 06 7F"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number per Channel Selection table
  notes: NRPN parameter ID 18, ON value 40 to 7F (7F shown).

- id: assign_main_mix_off
  label: Channel Assignment to Main Mix OFF
  kind: action
  command: "BN 63 CH [BN] 62 18 [BN] 06 3F"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number per Channel Selection table
  notes: NRPN parameter ID 18, OFF value 00 to 3F (3F shown).

- id: get_main_mix_assignment
  label: Get Channel Assignment to Main Mix
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 05 0B 18 CH F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number per Channel Selection table
  notes: Unit responds with appropriate Channel Assignment to Main Mix message.

- id: set_send_level
  label: Set AUX/FX/Matrix Send Level
  kind: action
  command: "F0 00 00 1A 50 10 01 00 0N 0D CH SndN SndCH LV F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Source channel note number
    - name: SndN
      type: integer
      description: MIDI channel of the destination channel
    - name: SndCH
      type: integer
      description: Note number of the destination channel
    - name: LV
      type: integer
      description: Send value -inf to +10dB = 00 to 7F
  notes: SndN and SndCH are MIDI channel and note number for the channel to be sent to.

- id: get_send_level
  label: Get AUX/FX/Matrix Send Level
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 05 0F 0D CH SndN SndCH F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Source channel note number
    - name: SndN
      type: integer
      description: Destination MIDI channel
    - name: SndCH
      type: integer
      description: Destination note number

- id: input_to_group_aux_on
  label: Input to Group/Aux ON
  kind: action
  command: "F0 00 00 1A 50 10 01 00 0N 0E CH SndN SndCH V F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
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
      description: On value 40 to 7F

- id: get_input_to_group_aux
  label: Get Input to Group/Aux
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 05 0F 0E CH SndN SndCH F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Source channel note number
    - name: SndN
      type: integer
      description: Destination MIDI channel
    - name: SndCH
      type: integer
      description: Destination note number

- id: set_socket_preamp_gain
  label: Set Socket Preamp Gain
  kind: action
  command: "EN MP GV"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B (Pitchbend status byte E N)
    - name: MP
      type: integer
      description: Socket preamp number (Mixrack sockets 1-64 = 00-3F; Mixrack DX 1/2 1-32 = 40-5F; Mixrack DX 3/4 1-32 = 60-7F)
    - name: GV
      type: integer
      description: Gain value min to max = 00 to 7F
  notes: Pitchbend message.

- id: get_socket_preamp_gain
  label: Get Socket Preamp Gain
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 05 0B 19 CH F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
  notes: Unit responds with appropriate Socket Preamp Gain message.

- id: set_socket_preamp_pad
  label: Set Socket Preamp Pad
  kind: action
  command: "F0 00 00 1A 50 10 01 00 0N 09 MP Pad F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: MP
      type: integer
      description: Socket preamp number
    - name: Pad
      type: integer
      description: Pad OFF = 00 to 3F, ON = 40 to 7F

- id: get_socket_preamp_pad
  label: Get Socket Preamp Pad
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 07 MP F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: MP
      type: integer
      description: Socket preamp number
  notes: Unit responds "F0 00 00 1A 50 10 01 00 0N 08 MP Pad F7" where Pad OFF=00, ON=7F.

- id: set_socket_preamp_48v
  label: Set Socket Preamp 48V
  kind: action
  command: "F0 00 00 1A 50 10 01 00 0N 0C MP 48V F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: MP
      type: integer
      description: Socket preamp number
    - name: 48V
      type: integer
      description: 48V OFF = 00 to 3F, ON = 40 to 7F

- id: get_socket_preamp_48v
  label: Get Socket Preamp 48V
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 0A MP F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: MP
      type: integer
      description: Socket preamp number
  notes: Unit responds "F0 00 00 1A 50 10 01 00 0N 0B MP 48V F7" where 48V OFF=00, ON=7F.

- id: dca_assign_on
  label: DCA Assignment ON
  kind: action
  command: "BN 63 CH [BN] 62 40 [BN] 06 DB"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
    - name: DB
      type: integer
      description: ON value for DCA 1 to 24 = 40 to 57
  notes: NRPN parameter ID 40.

- id: dca_assign_off
  label: DCA Assignment OFF
  kind: action
  command: "BN 63 CH [BN] 62 40 [BN] 06 DA"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
    - name: DA
      type: integer
      description: OFF value for DCA 1 to 24 = 00 to 17
  notes: NRPN parameter ID 40.

- id: mute_group_assign_on
  label: Mute Group Assignment ON
  kind: action
  command: "BN 63 CH [BN] 62 40 [BN] 06 DB"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
    - name: DB
      type: integer
      description: ON value for Mute Group 1 to 8 = 58 to 5F
  notes: NRPN parameter ID 40.

- id: mute_group_assign_off
  label: Mute Group Assignment OFF
  kind: action
  command: "BN 63 CH [BN] 62 40 [BN] 06 DA"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
    - name: DA
      type: integer
      description: OFF value for Mute Group 1 to 8 = 18 to 1F
  notes: NRPN parameter ID 40.

- id: set_channel_name
  label: Set Channel Name
  kind: action
  command: "F0 00 00 1A 50 10 01 00 0N 03 CH Name F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
    - name: Name
      type: string
      description: Hex ASCII String

- id: get_channel_name
  label: Get Channel Name
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 01 CH F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
  notes: Unit responds "F0 00 00 1A 50 10 01 00 0N 02 CH Name F7".

- id: set_channel_colour
  label: Set Channel Colour
  kind: action
  command: "F0 00 00 1A 50 10 01 00 0N 06 CH Col F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
    - name: Col
      type: integer
      description: Colour 00-07 (Off/Red/Green/Yellow/Blue/Purple/Lt Blue/White)

- id: get_channel_colour
  label: Get Channel Colour
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 04 CH F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
  notes: Unit responds "F0 00 00 1A 50 10 01 00 0N 05 CH Col F7" where Col = 00 to 07.

- id: set_peq
  label: Set Parametric EQ
  kind: action
  command: "BN 63 CH [BN] 62 nn [BN] 06 vv"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
    - name: nn
      type: integer
      description: >-
        Parameter ID 1A-29 depending on function and band.
        Band0 Type1A Freq1B Width1C Gain1D; Band1 1E/1F/20/21;
        Band2 22/23/24/25; Band3 26/27/28/29.
    - name: vv
      type: integer
      description: Value per type (Type: Shelf00/LF Shelf01/HF Shelf02/L Pass03/H Pass04; Frequency/Gain/Width formulas in source)
  notes: NRPN parameter ID between 1A and 29.

- id: get_peq
  label: Get Parametric EQ
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 05 0B nn CH F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
    - name: nn
      type: integer
      description: Parameter ID 1A-29 (see PEQ table)
  notes: Unit responds with appropriate Parametric EQ message.

- id: set_hpf_frequency
  label: Set HPF Frequency
  kind: action
  command: "BN 63 CH [BN] 62 30 [BN] 06 vv"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
    - name: vv
      type: integer
      description: vv = INT(127*((4608*LOG10(FREQUENCY/4)/LOG10(2))-10699)/41314)
  notes: NRPN parameter ID 30.

- id: get_hpf_frequency
  label: Get HPF Frequency
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 05 0B 30 CH F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number

- id: set_hpf_on_off
  label: Set HPF On/Off
  kind: action
  command: "BN 63 CH [BN] 62 31 [BN] 06 HPF"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number
    - name: HPF
      type: integer
      description: HPF OFF = 00 to 3F, ON = 40 to 7F
  notes: NRPN parameter ID 31.

- id: get_hpf_on_off
  label: Get HPF On/Off
  kind: query
  command: "F0 00 00 1A 50 10 01 00 0N 05 0B 31 CH F7"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: CH
      type: integer
      description: Channel note number

- id: recall_scene
  label: Recall Scene
  kind: action
  command: "BN 00 {bank} CN SS"
  params:
    - name: N
      type: integer
      description: Base MIDI channel 0-B
    - name: bank
      type: integer
      description: >-
        Scene bank 00/01/02/03. Bank 00 = Scene 1-128; Bank 01 = 129-256;
        Bank 02 = 257-384; Bank 03 = 385-500.
    - name: SS
      type: integer
      description: Scene number within bank 00-7F (refer to source scene table)
  notes: >-
    Bank + Program Change message. 500 Scenes across 4 banks. Bank select
    CC then Program Change. dLive also transmits this message when a Scene
    is recalled from the dLive screen (unsolicited).

- id: midi_strip_control
  label: MIDI Strip Custom Control
  kind: action
  command: "{strip_control_message}"
  params:
    - name: strip_control_message
      type: string
      description: >-
        Custom MIDI message assigned per strip control (factory defaults):
        Fader B1 00-1F <VAR>; Rotary Gain B2 00-1F; Rotary Pan B2 20-3F;
        Rotary Custom 1 B2 40-5F; Rotary Custom 2 B2 60-7F;
        Rotary Custom 3 B2 40-5F; Rotary Custom 4 B2 60-7F;
        Mute key 91 00-1F; Mix key 91 20-3F; PAFL key 91 40-5F.
        <VAR> = value determined by control position.
  notes: >-
    32 MIDI Strips available within Banks. Factory defaults restored by
    recalling Scene 9 within the Template Show. Sel key excluded (used to
    select Processing screen). By default Rotary Custom 3 uses same values
    as Rotary Custom 1, and Custom 4 same as Custom 2.
```

## Feedbacks
```yaml
- id: fader_level_reply
  type: numeric
  values: "00 to 7F (-inf to +10dB)"
  notes: Transmitted in response to Get Fader Level.

- id: mute_status_reply
  type: enum
  values: [on, off]
  notes: >-
    Transmitted in response to Get Mute Status. Received Mute messages:
    Velocity 00 and NOTE OFF ignored; Velocity 01-3F = Mute OFF;
    Velocity 40-7F = Mute ON.

- id: main_mix_assignment_reply
  type: enum
  values: [on, off]
  notes: Response to Get Channel Assignment to Main Mix.

- id: send_level_reply
  type: numeric
  values: "00 to 7F"
  notes: Response to Get AUX/FX/Matrix Send Level.

- id: socket_preamp_gain_reply
  type: numeric
  values: "00 to 7F"
  notes: Response to Get Socket Preamp Gain.

- id: socket_preamp_pad_reply
  type: enum
  values: [off, on]
  notes: Reply "SysEx Header 0N 08 MP Pad F7" where Pad OFF=00, ON=7F.

- id: socket_preamp_48v_reply
  type: enum
  values: [off, on]
  notes: Reply "SysEx Header 0N 0B MP 48V F7" where 48V OFF=00, ON=7F.

- id: channel_name_reply
  type: string
  notes: Reply "SysEx Header 0N 02 CH Name F7", Name = Hex ASCII String.

- id: channel_colour_reply
  type: enum
  values: [off, red, green, yellow, blue, purple, lt_blue, white]
  notes: Reply "SysEx Header 0N 05 CH Col F7" where Col = 00 to 07.

- id: peq_reply
  type: numeric
  notes: Response to Get Parametric EQ (value per nn parameter).

- id: hpf_frequency_reply
  type: numeric
  notes: Response to Get HPF Frequency.

- id: hpf_on_off_reply
  type: enum
  values: [on, off]
  notes: Response to Get HPF On/Off.

- id: auth_result
  type: enum
  values: [AuthOK, dropped]
  notes: >-
    On TLS/SSL socket, unit responds with the six characters "AuthOK" if
    credentials match, otherwise drops the connection.
```

## Variables
```yaml
# Settable parameters are embedded in the Actions above (LV, GV, vv, Col, Name,
# Pad, 48V, HPF, DB, DA, V, SS, bank).
# UNRESOLVED: no separately enumerated variable registry in source.
```

## Events
```yaml
- id: scene_recalled_notification
  description: >-
    Unit transmits the Scene Recall message when a Scene is recalled from the
    dLive screen (unsolicited).
  payload: "BN 00 {bank} CN SS"

- id: received_mute_note
  description: >-
    Unit interprets received Note messages: Velocity 00 and NOTE OFF ignored;
    Velocity 01-3F = Mute OFF; Velocity 40-7F = Mute ON.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Phantom power (48V) and preamp controls
# are present but no safety/interlock text documented in source.
```

## Notes
- All MIDI message numbers are hexadecimal.
- SysEx Header (all SysEx messages) = `F0 00 00 1A 50 10 01 00` (MV=01 Major, mV=00 Minor version).
- dLive uses MIDI running status; status byte may be omitted when same as previous message. Omitted bytes shown as `[9N]`/`[BN]` in source.
- Base MIDI channel N is the lowest channel of the range selected in Utility/Control/MIDI; audio channel type selected by offsetting the MIDI channel; audio channel number selected via note number (CH).
- Preamp control, Scene recall and MIDI transport use the base MIDI channel N.
- Two rendezvous ports: TCP 51325 (no encryption) and TCP 51327 (TLS/SSL). Authentication ("UserProfile,UserPassword" → "AuthOK") applies to the TLS/SSL socket.
- PEQ frequency formula: `vv = INT(127*((4608*LOG10(FREQUENCY/4)/LOG10(2))-10699)/45922)`.
- PEQ gain formula: `Vv = (GAIN+15)*126/30` for -15dB to +15dB.
- Fader Level LV dBu/Hex mapping and Preamp Gain GV dB/Hex mapping tables provided in source.

<!-- UNRESOLVED: device name "Cdm48" supplied by operator does not appear in source; source documents the dLive system. Model set to "dLive" from source. -->
<!-- UNRESOLVED: whether non-encryption port (51325) requires authentication not stated. -->
<!-- UNRESOLVED: complete scene-number / hex mapping table partially present in source but truncated; full 1-500 mapping not fully reproduced. -->

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2023/05/dLive-MIDI-Over-TCP-Protocol-V1.9.pdf
  - https://www.allen-heath.com/support
retrieved_at: 2026-07-13T19:23:33.449Z
last_checked_at: 2026-10-07T13:51:22.513Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:51:22.513Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions match source frames and transport; source names dLive rather than CDM48 (same-family generic). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "supplied device name \"Cdm48\" does not appear in the source; the source documents the dLive system. Model \"dLive\" populated from source; \"Cdm48\" entity kept as supplied. Confirm whether Cdm48 is a MixRack variant within the dLive family."
- "source does not state whether the non-encrypted port (51325)"
- "no power on/off command found in source"
- "no separately enumerated variable registry in source."
- "no multi-step sequences explicitly described in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "device name \"Cdm48\" supplied by operator does not appear in source; source documents the dLive system. Model set to \"dLive\" from source."
- "whether non-encryption port (51325) requires authentication not stated."
- "complete scene-number / hex mapping table partially present in source but truncated; full 1-500 mapping not fully reproduced."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
