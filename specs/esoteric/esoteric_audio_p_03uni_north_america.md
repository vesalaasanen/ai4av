---
spec_id: admin/esoteric-audio-p-03uni
schema_version: ai4av-public-spec-v1
revision: 1
title: "Esoteric P-03UNI Control Spec"
manufacturer: Esoteric
model_family: P-03UNI
aliases: []
compatible_with:
  manufacturers:
    - Esoteric
  models:
    - P-03UNI
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esoteric.jp
  - applicationmarket.crestron.com
retrieved_at: 2026-05-04T23:34:40.994Z
last_checked_at: 2026-05-05T05:40:02.479Z
generated_at: 2026-05-05T05:40:02.479Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-05T05:40:02.479Z
  matched_actions: 47
  action_count: 47
  confidence: high
  summary: "All 47 spec actions (35 + 12 feedbacks) matched literal wire tokens in source; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-05
---

# Esoteric P-03UNI Control Spec

## Summary

RS-232C serial control protocol for the Esoteric P-03UNI universal disc player (North America variant). The source document ("Esoteric RS-232C Interface") also covers the K-01XD and K-03XD models with the same command set. Commands are ASCII-encoded, framed with `@` start and `CR` end characters, and use ACK/NAK handshaking. The P-03UNI uses "Common" and "CD Player" commands; AMP and Network/DAC commands are included for completeness but may not apply to this model.

<!-- UNRESOLVED: source doc header lists K-01XD/K-03XD as target models, not P-03UNI explicitly — command set assumed shared across Esoteric RS-232C-equipped players -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  pin_assignment:
    TXD: 2
    RXD: 3
auth:
  type: none  # inferred: no auth procedure in source
command_framing:
  start_char: "@"
  end_char: CR
  separator: SP
  ack: "0x06"
  nak: "0x15"
  min_inter_command_delay_ms: 20
```

## Traits
```yaml
traits:
  - powerable    # POWER ON/OFF commands
  - queryable    # request commands return state
  - levelable    # VOLUME direct-set command (AMP devices)
```

## Actions
```yaml
# Common commands
- id: power_on
  label: Power On
  kind: action
  command: "@POWER ON<CR>"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "@POWER OFF<CR>"
  params: []

- id: dimmer
  label: Dimmer
  kind: action
  command: "@KEY 5A<CR>"
  params: []

# CD Player commands
- id: tray
  label: Tray Open/Close
  kind: action
  command: "@KEY 00<CR>"
  params: []

- id: play
  label: Play
  kind: action
  command: "@KEY 01<CR>"
  params: []

- id: pause
  label: Pause
  kind: action
  command: "@KEY 02<CR>"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "@KEY 03<CR>"
  params: []

- id: prev_track
  label: Previous Track (I<<)
  kind: action
  command: "@KEY 0B<CR>"
  params: []

- id: next_track
  label: Next Track (>>I)
  kind: action
  command: "@KEY 0C<CR>"
  params: []

- id: rewind
  label: Rewind (<<)
  kind: action
  command: "@KEY 40<CR>"
  params: []

- id: fast_forward
  label: Fast Forward (>>)
  kind: action
  command: "@KEY 41<CR>"
  params: []

- id: digit
  label: Numeric Key
  kind: action
  command: "@KEY {digit}<CR>"
  params:
    - name: digit
      type: string
      values: ["04", "05", "06", "07", "0D", "0E", "0F", "15", "16", "17"]
      description: "Hex code for digits 0-9 (04=0, 05=1, 06=2, 07=3, 0D=4, 0E=5, 0F=6, 15=7, 16=8, 17=9)"

- id: digit_plus10
  label: +10
  kind: action
  command: "@KEY 4F<CR>"
  params: []

- id: clear
  label: Clear
  kind: action
  command: "@KEY 4B<CR>"
  params: []

- id: play_mode
  label: Play Mode
  kind: action
  command: "@KEY 1E<CR>"
  params: []

- id: repeat
  label: Repeat
  kind: action
  command: "@KEY 47<CR>"
  params: []

- id: play_area
  label: Play Area
  kind: action
  command: "@KEY 49<CR>"
  params: []

- id: mode
  label: Mode
  kind: action
  command: "@KEY 1D<CR>"
  params: []

- id: display
  label: Display
  kind: action
  command: "@KEY 42<CR>"
  params: []

# AMP commands
- id: input_minus
  label: Input -
  kind: action
  command: "@KEY 43<CR>"
  params: []
  note: AMP devices only

- id: input_plus
  label: Input +
  kind: action
  command: "@KEY 44<CR>"
  params: []
  note: AMP devices only

- id: volume_minus
  label: Volume -
  kind: action
  command: "@KEY 12<CR>"
  params: []
  note: AMP devices only

- id: volume_plus
  label: Volume +
  kind: action
  command: "@KEY 13<CR>"
  params: []
  note: AMP devices only

- id: mute
  label: Mute
  kind: action
  command: "@KEY 1C<CR>"
  params: []
  note: AMP devices only

- id: setup
  label: Setup
  kind: action
  command: "@KEY 14<CR>"
  params: []
  note: AMP devices only

- id: volume_set
  label: Set Volume
  kind: action
  command: "@VOLUME {level}<CR>"
  params:
    - name: level
      type: integer
      min: 0
      max: 255
      description: Volume level (0-255)
  note: AMP devices only

# Network/DAC commands
- id: net_input_plus
  label: Network Input +
  kind: action
  command: "@KEY 20<CR>"
  params: []
  note: Network/DAC devices only

- id: net_menu
  label: Network Menu
  kind: action
  command: "@KEY 21<CR>"
  params: []
  note: Network/DAC devices only

- id: net_left
  label: Network Left (<)
  kind: action
  command: "@KEY 22<CR>"
  params: []
  note: Network/DAC devices only

- id: net_right
  label: Network Right (>)
  kind: action
  command: "@KEY 23<CR>"
  params: []
  note: Network/DAC devices only

- id: net_prev_track
  label: Network Previous Track (I<<)
  kind: action
  command: "@KEY 24<CR>"
  params: []
  note: Network/DAC devices only

- id: net_next_track
  label: Network Next Track (>>I)
  kind: action
  command: "@KEY 25<CR>"
  params: []
  note: Network/DAC devices only

- id: net_play
  label: Network Play
  kind: action
  command: "@KEY 26<CR>"
  params: []
  note: Network/DAC devices only

- id: net_pause
  label: Network Pause
  kind: action
  command: "@KEY 27<CR>"
  params: []
  note: Network/DAC devices only

- id: net_stop
  label: Network Stop
  kind: action
  command: "@KEY 28<CR>"
  params: []
  note: Network/DAC devices only
```

## Feedbacks
```yaml
- id: input_status
  label: Input Status
  request_command: "@?INPUT<CR>"
  response_format: "@INPUT {source}<CR>"
  type: enum
  values: ["DISC", "ESLINK", "XLR", "RCA"]
  applies_to: common

- id: analog_output
  label: Analog Output
  request_command: "@?AOUT<CR>"
  response_format: "@AOUT {output}<CR>"
  type: enum
  values: ["SPEAKER", "HP", "XLR2", "ESLA", "RCA"]
  applies_to: common

- id: digital_output
  label: Digital Output
  request_command: "@?DOUT<CR>"
  response_format: "@DOUT {output}<CR>"
  type: enum
  values: ["ESLINK", "XLR", "RCA", "OPT"]
  applies_to: common

- id: media
  label: Media Info
  request_command: "@?MEDIA<CR>"
  response_format: "@MEDIA {type} {tracks} {minutes} {seconds}<CR>"
  type: string
  description: "Returns media type, total tracks, total time. e.g. @MEDIA SACD 12 34 56"
  applies_to: CD Player

- id: play_status
  label: Play Status
  request_command: "@?PSTS<CR>"
  response_format: "@PSTS {state} {track} {min} {sec} {time_mode}<CR>"
  type: string
  description: "e.g. @PSTS PLAY 3 1 23 TE. Time modes: TE=Track Elapsed, TR=Track Remain, DE=Disc Elapsed, DR=Disc Remain"
  applies_to: CD Player, Network Player

- id: play_mode
  label: Play Mode
  request_command: "@?PMODE<CR>"
  response_format: "@PMODE {mode}<CR>"
  type: enum
  values: ["CONTINUE", "PGM", "SHUFFLE"]
  applies_to: CD Player, Network Player

- id: repeat_status
  label: Repeat Status
  request_command: "@?REPEAT<CR>"
  response_format: "@REPEAT {mode}<CR>"
  type: enum
  values: ["OFF", "ALL", "1"]
  applies_to: CD Player, Network Player

- id: upconv
  label: Upconversion
  request_command: "@?UPCONV<CR>"
  response_format: "@UPCONV {mode}<CR>"
  type: enum
  values: ["OFF", "2fs", "4fs", "8fs", "16fs", "DSD"]
  applies_to: CD Player, Network/DAC

- id: sampling_freq
  label: Sampling Frequency
  request_command: "@?FS<CR>"
  response_format: "@FS {freq}<CR>"
  type: string
  description: "e.g. @FS 44.1kHz - sampling frequency of input source"
  applies_to: CD Player, Network/DAC

- id: codec
  label: Codec
  request_command: "@?CODEC<CR>"
  response_format: "@CODEC {codec}<CR>"
  type: enum
  values: ["WAV", "FLAC", "ALAC", "MP3", "AAC"]
  applies_to: Network Player

- id: mqa
  label: MQA Status
  request_command: "@?MQA<CR>"
  response_format: "@MQA {status} {freq}<CR>"
  type: string
  values: ["NON", "MQA", "MQA.", "MQB"]
  description: "e.g. @MQA MQA. 192kHz"
  applies_to: CD Player, Network/DAC

- id: volume_status
  label: Volume Status
  request_command: "@?VOLUME<CR>"
  response_format: "@VOLUME {level}<CR>"
  type: string
  description: "Returns step type (e.g. 36) or dB type (e.g. -45dB)"
  applies_to: AMP
```

## Variables
```yaml
# No continuously settable variables beyond the action-level volume_set.
# UNRESOLVED: no variable parameters documented beyond discrete actions
```

## Events
```yaml
# No unsolicited events documented. Device only responds to commands.
```

## Macros
```yaml
# No multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
timing:
  min_inter_command_delay_ms: 20
  max_inter_command_delay_ms: 50
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing documented in source
```

## Notes

- All commands are case-sensitive ASCII.
- Command frame: `@` prefix, `<SP>` between command and parameter, `<CR>` (0x0D) terminator.
- ACK (0x06) confirms receipt; NAK (0x15) indicates failure or unrecognized command.
- Minimum 20ms delay required between consecutive commands after receiving ACK.
- The P-03UNI (CD/SACD player) uses "Common" and "CD Player" commands. AMP and Network/DAC commands are listed for completeness but likely not applicable to this model.
- Numeric digit hex codes are not sequential: 0=04, 1=05, 2=06, 3=07, 4=0D, 5=0E, 6=0F, 7=15, 8=16, 9=17.

<!-- UNRESOLVED: source doc explicitly targets K-01XD/K-03XD models — P-03UNI compatibility assumed from shared RS-232C interface -->
<!-- UNRESOLVED: no firmware version compatibility range stated -->
<!-- UNRESOLVED: pin 2/3 assignment documented but full DB-9 pinout not specified -->
<!-- UNRESOLVED: maximum cable length not specified -->

## Provenance

```yaml
source_domains:
  - esoteric.jp
  - applicationmarket.crestron.com
retrieved_at: 2026-05-04T23:34:40.994Z
last_checked_at: 2026-05-05T05:40:02.479Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-05T05:40:02.479Z
matched_actions: 47
action_count: 47
confidence: high
summary: "All 47 spec actions (35 + 12 feedbacks) matched literal wire tokens in source; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
