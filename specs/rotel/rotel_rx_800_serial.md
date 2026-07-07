---
spec_id: admin/rotel-rx-800
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RX-800 Control Spec"
manufacturer: Rotel
model_family: RX-1050
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RX-1050
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1050%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1052%20Protocol.pdf"
  - https://www.rotel.com/manual-resources/rs232-protocols
retrieved_at: 2026-07-03T09:16:49.090Z
last_checked_at: 2026-07-07T12:36:17.779Z
generated_at: 2026-07-07T12:36:17.779Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model identity — input device name \"RX-800\" does not match source document title \"RX-1050 RS232 HEX Protocol\". Source may be wrong family or input metadata may be wrong. Confirm against device."
  - "checksum algorithm not documented in source"
  - "checksum computation algorithm not documented in source"
  - "model identity — input \"RX-800\" vs source title \"RX-1050\"; confirm correct family"
  - "response checksum algorithm not documented"
verification:
  verdict: verified
  checked_at: 2026-07-07T12:36:17.779Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions matched verbatim in source command table; all transport parameters verified against source settings. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Rotel RX-800 Control Spec

## Summary
Stereo receiver controlled via RS-232C using a HEX-based binary protocol. This spec covers the command set documented in the Rotel serial protocol reference: power, volume, source selection, tone control, tuner, numeric keys, and front-panel operations. Commands are fixed 6-byte frames; the device pushes unsolicited feedback frames mirroring front-panel display state.

<!-- UNRESOLVED: model identity — input device name "RX-800" does not match source document title "RX-1050 RS232 HEX Protocol". Source may be wrong family or input metadata may be wrong. Confirm against device. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 2400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

Notes on framing (from source):
- Standard command frame: `FE 03 60 10 {Key} {Checksum}`. Count byte (0x03) covers ID+Type+Key only; excludes Start and Checksum.
- Send raw bytes only — no spaces, delimiters, CR, or LF.
- Device ID fixed at 0x60.
- Meta encoding (byte stuffing): any 0xFD in payload → `FD 00`; any 0xFE → `FD 01`. Keeps 0xFE unique as start byte.
- Checksum computation method not stated in source.
<!-- UNRESOLVED: checksum algorithm not documented in source -->

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off/toggle commands present
  - routable     # inferred: source selection commands present
  - levelable    # inferred: volume up/down, bass/treble up/down present
```

## Actions
```yaml
# All frames: FE 03 60 10 {Key} {Checksum}. Spaces shown for clarity; send raw bytes.
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "FE 03 60 10 0A 7D"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "FE 03 60 10 4A BD"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "FE 03 60 10 4B BE"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "FE 03 60 10 0B 7E"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "FE 03 60 10 0C 7F"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "FE 03 60 10 1E 91"
  params: []

- id: source_phono
  label: Source Phono
  kind: action
  command: "FE 03 60 10 35 A8"
  params: []

- id: source_cd
  label: Source CD
  kind: action
  command: "FE 03 60 10 02 75"
  params: []

- id: source_tuner
  label: Source Tuner
  kind: action
  command: "FE 03 60 10 03 76"
  params: []

- id: source_tape
  label: Source Tape
  kind: action
  command: "FE 03 60 10 04 77"
  params: []

- id: source_video_1
  label: Source Video 1
  kind: action
  command: "FE 03 60 10 05 78"
  params: []

- id: source_video_2
  label: Source Video 2
  kind: action
  command: "FE 03 60 10 06 79"
  params: []

- id: source_video_3
  label: Source Video 3
  kind: action
  command: "FE 03 60 10 07 7A"
  params: []

- id: source_video_4
  label: Source Video 4
  kind: action
  command: "FE 03 60 10 08 7B"
  params: []

- id: treble_up
  label: Treble Up
  kind: action
  command: "FE 03 60 10 0D 80"
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  command: "FE 03 60 10 0E 81"
  params: []

- id: bass_up
  label: Bass Up
  kind: action
  command: "FE 03 60 10 0F 82"
  params: []

- id: bass_down
  label: Bass Down
  kind: action
  command: "FE 03 60 10 10 83"
  params: []

- id: source_label_character_enter
  label: Front Panel Source Label - Character Enter
  kind: action
  command: "FE 03 60 10 19 8C"
  params: []

- id: source_label_next_character
  label: Front Panel Source Label - Next Character
  kind: action
  command: "FE 03 60 10 1A 8D"
  params: []

- id: source_label_previous_character
  label: Front Panel Source Label - Previous Character
  kind: action
  command: "FE 03 60 10 1B 8E"
  params: []

- id: source_label_change
  label: Front Panel Source Label - Source Label Change
  kind: action
  command: "FE 03 60 10 18 8B"
  params: []

- id: tune_up
  label: Tune Up
  kind: action
  command: "FE 03 60 10 28 9B"
  params: []

- id: tune_down
  label: Tune Down
  kind: action
  command: "FE 03 60 10 29 9C"
  params: []

- id: tuner_memory
  label: Tuner Memory
  kind: action
  command: "FE 03 60 10 27 9A"
  params: []

- id: tuner_band_toggle
  label: Tuner Band Toggle
  kind: action
  command: "FE 03 60 10 24 97"
  params: []

- id: tuner_tune_preset
  label: Tuner Tune/Preset Mode
  kind: action
  command: "FE 03 60 10 20 93"
  params: []

- id: tuner_frequency_direct
  label: Tuner Frequency Direct
  kind: action
  command: "FE 03 60 10 25 98"
  params: []

- id: tuner_preset_scan
  label: Tuner Preset Scan
  kind: action
  command: "FE 03 60 10 21 94"
  params: []

- id: tuner_display
  label: Tuner Display
  kind: action
  command: "FE 03 60 10 44 B3"
  params: []

- id: tuner_fm_mono
  label: Tuner FM Mono
  kind: action
  command: "FE 03 60 10 26 99"
  params: []

- id: number_1
  label: Number 1
  kind: action
  command: "FE 03 60 10 2A 9D"
  params: []

- id: number_2
  label: Number 2
  kind: action
  command: "FE 03 60 10 2B 9E"
  params: []

- id: number_3
  label: Number 3
  kind: action
  command: "FE 03 60 10 2C 9F"
  params: []

- id: number_4
  label: Number 4
  kind: action
  command: "FE 03 60 10 2D A0"
  params: []

- id: number_5
  label: Number 5
  kind: action
  command: "FE 03 60 10 2E A1"
  params: []

- id: number_6
  label: Number 6
  kind: action
  command: "FE 03 60 10 2F A2"
  params: []

- id: number_7
  label: Number 7
  kind: action
  command: "FE 03 60 10 30 A3"
  params: []

- id: number_8
  label: Number 8
  kind: action
  command: "FE 03 60 10 31 A4"
  params: []

- id: number_9
  label: Number 9
  kind: action
  command: "FE 03 60 10 32 A5"
  params: []

- id: number_0
  label: Number 0
  kind: action
  command: "FE 03 60 10 33 A6"
  params: []

- id: record_function_select
  label: Record Function Select
  kind: action
  command: "FE 03 60 10 17 8A"
  params: []

- id: zone2_main
  label: Zone 2/Main
  kind: action
  command: "FE 03 60 10 23 96"
  params: []

- id: speaker_a_toggle
  label: Speaker A Toggle
  kind: action
  command: "FE 03 60 10 50 C3"
  params: []

- id: speaker_b_toggle
  label: Speaker B Toggle
  kind: action
  command: "FE 03 60 10 51 C4"
  params: []

- id: front_display_toggle
  label: Front Display On/Off
  kind: action
  command: "FE 03 60 10 1F 92"
  params: []

- id: display_refresh
  label: Display Refresh
  kind: action
  command: "FE 03 60 10 FF 72"
  params: []
```

## Feedbacks
```yaml
# Source documents no explicit query opcodes (no "?" commands). State is obtained
# only via unsolicited feedback frames pushed by the device (see Events).
```

## Variables
```yaml
# No settable parameter variables documented as addressable values. Volume, bass,
# treble, and tuner frequency are controlled via discrete up/down/toggle actions
# only; absolute-value set commands are not documented in source.
```

## Events
```yaml
# Unsolicited feedback frame pushed by device whenever front-panel display state changes.
# Standard response format: FE 0F 60 20 Flag1 Flag2 Char1 ... Char11 Checksum
# Count byte 0x0F = 15 (ID + Type + Flag1 + Flag2 + Char1..Char11).
- id: feedback_string
  type: binary
  description: |
    17-byte frame mirroring front-panel display. Mirrors status visible on the unit.
    Fields:
      Flag1, Flag2 - bitmap of illuminated front-panel icons (see bit table below).
      Char1..Char11 - ASCII text shown across the front display; may carry source
      input, volume, or tuner frequency data. Must be parsed to extract values.
  format: "FE 0F 60 20 {Flag1} {Flag2} {Char1..Char11} {Checksum}"

# Flag1 bit map:
#   bit0 = Speaker B
#   bit1 = Speaker A
#   bit2 = DisplayMode 0
#   bit3 = DisplayMode 1
#   bit4 = StandbyLED
# Flag2 bit map:
#   bit0 = AM
#   bit1 = Preset
#   bit2 = Memory
#   bit3 = Auto
#   bit4 = Tuned
#   bit5 = Stereo
#   bit6 = FM
# Display on/off encoded in DisplayMode bits: On = Mode1:0/Mode0:0; Off = Mode1:1/Mode0:0
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings, interlock procedures, or power-on sequencing requirements
# stated in source.
```

## Notes
- Binary HEX protocol: data type labelled "String" in source settings table, but all payloads are hex byte sequences (not ASCII command strings). Treat frames as raw bytes.
- Frame structure: `Start(0xFE) Count(0x03) DeviceID(0x60) Type(0x10) Key Checksum`. Count excludes Start and Checksum bytes.
- Byte stuffing (meta encoding): 0xFD → `FD 00`, 0xFE → `FD 01` anywhere in payload. None of the listed command keys trigger stuffing, but parsers must de-stuff response frames.
- No CR/LF terminators — send exact bytes only.
- Version: source doc is "Version 1.00, February 6, 2012".
<!-- UNRESOLVED: checksum computation algorithm not documented in source -->
<!-- UNRESOLVED: model identity — input "RX-800" vs source title "RX-1050"; confirm correct family -->
<!-- UNRESOLVED: response checksum algorithm not documented -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1050%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1052%20Protocol.pdf"
  - https://www.rotel.com/manual-resources/rs232-protocols
retrieved_at: 2026-07-03T09:16:49.090Z
last_checked_at: 2026-07-07T12:36:17.779Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:36:17.779Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions matched verbatim in source command table; all transport parameters verified against source settings. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model identity — input device name \"RX-800\" does not match source document title \"RX-1050 RS232 HEX Protocol\". Source may be wrong family or input metadata may be wrong. Confirm against device."
- "checksum algorithm not documented in source"
- "checksum computation algorithm not documented in source"
- "model identity — input \"RX-800\" vs source title \"RX-1050\"; confirm correct family"
- "response checksum algorithm not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
