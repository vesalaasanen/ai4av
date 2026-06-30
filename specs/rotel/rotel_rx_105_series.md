---
spec_id: admin/rotel-rx-105-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RX-1050 Control Spec"
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
retrieved_at: 2026-04-30T04:32:04.962Z
last_checked_at: 2026-06-02T05:46:10.863Z
generated_at: 2026-06-02T05:46:10.863Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers RX-1050 only; RX-1052 / RX-105 Series compatibility not confirmed in this document."
  - "settable scalar parameters (volume absolute value, tone absolute value,"
  - "source does not document multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:10.863Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions matched verbatim against source Section 1; all transport parameters (baud 2400, 8 bits, no parity, 1 stop bit) confirmed in source connection table. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Rotel RX-1050 Control Spec

## Summary
HEX-based RS-232 control protocol for the Rotel RX-1050 stereo receiver. Covers power, volume, source selection, tone, tuner, numeric keypad, front panel labeling, and feedback (front-panel mirror) over a 2400 baud serial link.

<!-- UNRESOLVED: source covers RX-1050 only; RX-1052 / RX-105 Series compatibility not confirmed in this document. -->

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

## Traits
```yaml
- powerable    # inferred: power on/off/toggle commands present
- routable     # inferred: source select, speaker A/B, zone 2, record function commands present
- levelable    # inferred: volume, mute, treble, bass commands present
```

## Actions
```yaml
# Standard command frame: FE 03 60 10 {Key} {Checksum}
# No CR/LF. Byte values FD/FE in payload must be meta-encoded as FD 00 / FD 01.

# --- Power & Volume ---
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

# --- Source Selection ---
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
- id: source_video1
  label: Source Video 1
  kind: action
  command: "FE 03 60 10 05 78"
  params: []
- id: source_video2
  label: Source Video 2
  kind: action
  command: "FE 03 60 10 06 79"
  params: []
- id: source_video3
  label: Source Video 3
  kind: action
  command: "FE 03 60 10 07 7A"
  params: []
- id: source_video4
  label: Source Video 4
  kind: action
  command: "FE 03 60 10 08 7B"
  params: []

# --- Tone Control ---
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

# --- Front Panel Source Label ---
- id: label_character_enter
  label: Label Character Enter
  kind: action
  command: "FE 03 60 10 19 8C"
  params: []
- id: label_next_character
  label: Label Next Character
  kind: action
  command: "FE 03 60 10 1A 8D"
  params: []
- id: label_previous_character
  label: Label Previous Character
  kind: action
  command: "FE 03 60 10 1B 8E"
  params: []
- id: source_label_change
  label: Source Label Change
  kind: action
  command: "FE 03 60 10 18 8B"
  params: []

# --- Tuner ---
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
- id: band_toggle
  label: Band Toggle
  kind: action
  command: "FE 03 60 10 24 97"
  params: []
- id: tune_preset_toggle
  label: Tune / Preset Toggle
  kind: action
  command: "FE 03 60 10 20 93"
  params: []
- id: frequency_direct
  label: Frequency Direct
  kind: action
  command: "FE 03 60 10 25 98"
  params: []
- id: preset_scan
  label: Preset Scan
  kind: action
  command: "FE 03 60 10 21 94"
  params: []
- id: tuner_display
  label: Tuner Display
  kind: action
  command: "FE 03 60 10 44 B3"
  params: []
- id: fm_mono
  label: FM Mono
  kind: action
  command: "FE 03 60 10 26 99"
  params: []

# --- Numeric Keys ---
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

# --- Other ---
- id: record_function_select
  label: Record Function Select
  kind: action
  command: "FE 03 60 10 17 8A"
  params: []
- id: zone2_main_toggle
  label: Zone 2 / Main Toggle
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
- id: front_display_on_off
  label: Front Display On / Off
  kind: action
  command: "FE 03 60 10 1F 92"
  params: []
- id: display_refresh
  label: Display Refresh
  kind: query
  command: "FE 03 60 10 FF 72"
  params: []
```

## Feedbacks
```yaml
# Response frame: FE 0F 60 20 Flag1 Flag2 Char1..Char11 Checksum
# Mirrors front-panel display on any state change.
- id: display_state
  label: Front Panel Display State
  type: object
  fields:
    flag1_speaker_b: bool
    flag1_speaker_a: bool
    flag1_display_mode: integer  # bits 2-3; 0b00 = display on, 0b01 = display off (per source table)
    flag1_standby_led: bool
    flag2_am: bool
    flag2_preset: bool
    flag2_memory: bool
    flag2_auto: bool
    flag2_tuned: bool
    flag2_stereo: bool
    flag2_fm: bool
    display_text: string  # 11 ASCII chars (Char1..Char11) - source input, volume, tuner freq, etc.
```

## Variables
```yaml
# UNRESOLVED: settable scalar parameters (volume absolute value, tone absolute value,
# direct frequency) not enumerated as discrete commands in this source - source only
# provides relative Up/Down and a FrequencyDirect entry without parameter schema.
```

## Events
```yaml
# Source states: any change to the front display prompts a feedback string mirroring that change.
- id: display_change
  label: Front Panel Display Change
  description: Unsolicited FE 0F 60 20 ... response emitted whenever the unit's front display state changes.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Frame format: `FE 03 60 10 {Key} {Checksum}`. Count byte (0x03) covers ID + Type + Key only — not Start or Checksum.
- No CR/LF after commands.
- Meta encoding: any payload byte `FD` or `FE` (other than the start byte) must be replaced with `FD 00` (was FD) or `FD 01` (was FE). Source flags meta-encoded commands in red; not relevant to any of the commands above (none collide with FD/FE in Key/Checksum positions, but implementers should still apply the rule defensively).
- Checksum algorithm: source does not specify the formula (xor / sum / crc). UNRESOLVED — verifier should test against the unit. All checksums above are copied verbatim from the source table.
- Display Refresh (`FF 72`) is documented under "Other Commands" — treated as a query that triggers a full display feedback re-emit.
- Source titles this as RX-1050 only; broader "RX-105 Series" applicability is not confirmed by this document.
```

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1050%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:04.962Z
last_checked_at: 2026-06-02T05:46:10.863Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:10.863Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions matched verbatim against source Section 1; all transport parameters (baud 2400, 8 bits, no parity, 1 stop bit) confirmed in source connection table. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers RX-1050 only; RX-1052 / RX-105 Series compatibility not confirmed in this document."
- "settable scalar parameters (volume absolute value, tone absolute value,"
- "source does not document multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
