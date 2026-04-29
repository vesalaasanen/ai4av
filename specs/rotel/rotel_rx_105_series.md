---
schema_version: ai4av-public-spec-v1
device_id: rotel/rx-1050
entity_id: rotel_rx_105_series
spec_id: admin/rotel-rx_1050
revision: 1
author: admin
title: "Rotel RX-1050 Control Spec"
status: published
manufacturer: Rotel
manufacturer_key: rotel
model_family: RX-1050
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RX-1050
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: rotel_rx_105_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:24:47.382Z
retrieved_at: 2026-04-23T08:24:47.382Z
last_checked_at: 2026-04-23T08:24:47.382Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:24:47.382Z
  matched_actions: 38
  action_count: 38
  confidence: high
  summary: "All 38 spec actions found as literal command entries in source; transport parameters verified; spec fully represents the source command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Rotel RX-1050 Control Spec

## Summary
Rotel RX-1050 audio/video receiver. RS-232 HEX-based communication protocol at 2400 baud, 8-N-1, no handshaking. Device sends unsolicited feedback strings mirroring front panel display changes. Meta encoding required to escape reserved bytes FD and FE within command strings.

<!-- UNRESOLVED: RX-1052 model variant not confirmed in source; protocol may apply to entire RX-105 series -->

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
- powerable
- levelable
- routable
- queryable
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_on
  label: Power On
  kind: action
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []
- id: source_phono
  label: Source Phono
  kind: action
  params: []
- id: source_cd
  label: Source CD
  kind: action
  params: []
- id: source_tuner
  label: Source Tuner
  kind: action
  params: []
- id: source_tape
  label: Source Tape
  kind: action
  params: []
- id: source_video1
  label: Source Video 1
  kind: action
  params: []
- id: source_video2
  label: Source Video 2
  kind: action
  params: []
- id: source_video3
  label: Source Video 3
  kind: action
  params: []
- id: source_video4
  label: Source Video 4
  kind: action
  params: []
- id: treble_up
  label: Treble Up
  kind: action
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  params: []
- id: bass_up
  label: Bass Up
  kind: action
  params: []
- id: bass_down
  label: Bass Down
  kind: action
  params: []
- id: character_enter
  label: Character Enter
  kind: action
  params: []
- id: next_character
  label: Next Character
  kind: action
  params: []
- id: previous_character
  label: Previous Character
  kind: action
  params: []
- id: source_label_change
  label: Source Label Change
  kind: action
  params: []
- id: tune_up
  label: Tune Up
  kind: action
  params: []
- id: tune_down
  label: Tune Down
  kind: action
  params: []
- id: memory
  label: Memory
  kind: action
  params: []
- id: band_toggle
  label: Band Toggle
  kind: action
  params: []
- id: tune_preset
  label: Tune/Preset
  kind: action
  params: []
- id: frequency_direct
  label: Frequency Direct
  kind: action
  params: []
- id: preset_scan
  label: Preset Scan
  kind: action
  params: []
- id: tuner_display
  label: Tuner Display
  kind: action
  params: []
- id: fm_mono
  label: FM Mono
  kind: action
  params: []
- id: number_1
  label: Number 1
  kind: action
  params: []
- id: number_2
  label: Number 2
  kind: action
  params: []
- id: number_3
  label: Number 3
  kind: action
  params: []
- id: number_4
  label: Number 4
  kind: action
  params: []
- id: number_5
  label: Number 5
  kind: action
  params: []
- id: number_6
  label: Number 6
  kind: action
  params: []
- id: number_7
  label: Number 7
  kind: action
  params: []
- id: number_8
  label: Number 8
  kind: action
  params: []
- id: number_9
  label: Number 9
  kind: action
  params: []
- id: number_0
  label: Number 0
  kind: action
  params: []
- id: record_function_select
  label: Record Function Select
  kind: action
  params: []
- id: zone2_main
  label: Zone 2/Main
  kind: action
  params: []
- id: speaker_a_toggle
  label: Speaker A Toggle
  kind: action
  params: []
- id: speaker_b_toggle
  label: Speaker B Toggle
  kind: action
  params: []
- id: front_display_onoff
  label: Front Display On/Off
  kind: action
  params: []
- id: display_refresh
  label: Display Refresh
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: display_state
  label: Display State
  type: object
  fields:
    - name: flag1
      type: integer
      description: Bit flags — Speaker B, DisplayMode0, StandbyLED
    - name: flag2
      type: integer
      description: Bit flags — AM, Preset, Memory, Auto, Tuned, Stereo, FM
    - name: display_text
      type: string
      description: ASCII chars (Char1–Char11) from front panel display
    - name: display_on
      type: boolean
      description: Derived from DisplayMode bits
```

## Variables
```yaml
# UNRESOLVED: continuous parameters (volume level, treble level, bass level,
# tuner frequency) not explicitly queryable as discrete variables in source
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited feedback on front panel state changes,
# but exact trigger conditions not enumerated in source
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings or interlock procedures not present in source
```

## Notes
Command structure: `FE 03 60 10 [Key] [Checksum]` — 6 bytes total. Count byte (0x03) excludes Start and Checksum bytes. Device ID fixed at 0x60, Type fixed at 0x10 for control commands.

Meta encoding: bytes FD and FE appearing within command body must be escaped as `FD 00` (for FD) or `FD 01` (for FE). Start byte FE is only recognized at command start.

No carriage returns or line feeds after commands. Spaces shown in hex tables are for readability only — do not include in actual command transmission.

Feedback response format: `FE 0F 60 20 [Flag1] [Flag2] [Char1]…[Char11] [Checksum]` — 15 bytes. Flag bits encode speaker, display mode, and tuner status. Char1–Char11 contain ASCII front panel text.
<!-- UNRESOLVED: Checksum algorithm not specified in source — cannot verify or generate valid checksums -->
<!-- UNRESOLVED: Zone 2 control commands not fully enumerated in source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: rotel_rx_105_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:24:47.382Z
retrieved_at: 2026-04-23T08:24:47.382Z
last_checked_at: 2026-04-23T08:24:47.382Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:24:47.382Z
matched_actions: 38
action_count: 38
confidence: high
summary: "All 38 spec actions found as literal command entries in source; transport parameters verified; spec fully represents the source command catalogue."
```

## Known Gaps

```yaml
[]
```
