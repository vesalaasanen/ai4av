---
spec_id: admin/atlona-at_pa100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-PA100 Control Spec"
manufacturer: Atlona
model_family: AT-PA100
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-PA100
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PA100_manual.pdf
retrieved_at: 2026-07-24T18:37:00.338Z
last_checked_at: 2026-08-05T07:18:46.289Z
generated_at: 2026-08-05T07:18:46.289Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP adapter required for IP control — native IP control not present"
  - "port number not stated in source"
  - "no discrete parameter variables identified separate from actions"
  - "no unsolicited event notifications described in source"
  - "no multi-step macros described in source"
  - "TCP/IP native control not present — requires RS-232 to TCP/IP adapter"
  - "firmware version compatibility not stated in source"
  - "remote control (IR) commands not included — separate IR doc exists"
verification:
  verdict: verified
  checked_at: 2026-08-05T07:18:46.289Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions map to literals in the source; transport 9600/8/N/1 verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Atlona AT-PA100 Control Spec

## Summary
The AT-PA100 is a 2-channel audio switcher with integrated 20W × 2 amplifier. Supports RS-232 control for input switching, mute, volume, bass/treble adjustment, and preset recall. TCP/IP control available via RS-232 to TCP/IP adapter (not native).

<!-- UNRESOLVED: TCP/IP adapter required for IP control — native IP control not present -->

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
addressing:
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: power state queryable
- routable  # inferred: input switching commands present
- levelable  # inferred: volume/bass/treble adjustment commands present
- queryable  # inferred: 600% status query present
```

## Actions
```yaml
- id: switch_to_input_1
  label: Switch to Input 1
  kind: action
  params: []

- id: switch_to_input_2
  label: Switch to Input 2
  kind: action
  params: []

- id: mute_audio
  label: Mute Audio
  kind: action
  params: []

- id: unmute_audio
  label: UnMute Audio
  kind: action
  params: []

- id: mute_mic
  label: Mute Mic
  kind: action
  params: []

- id: mute_line_out
  label: Mute Line Out
  kind: action
  params: []

- id: query_status
  label: Query Current Status
  kind: query
  params: []

- id: mic_volume_up
  label: MIC Volume Up
  kind: action
  params: []

- id: mic_volume_down
  label: MIC Volume Down
  kind: action
  params: []

- id: line_volume_up
  label: Line Volume Up
  kind: action
  params: []

- id: line_volume_down
  label: Line Volume Down
  kind: action
  params: []

- id: bass_up
  label: Bass Volume Up
  kind: action
  params: []

- id: bass_down
  label: Bass Volume Down
  kind: action
  params: []

- id: treble_up
  label: Treble Volume Up
  kind: action
  params: []

- id: treble_down
  label: Treble Volume Down
  kind: action
  params: []

- id: reset_to_default
  label: Reset to Default Settings
  kind: action
  params: []

- id: preset_mic_volume
  label: Preset MIC Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 00-60 (61 degrees total)

- id: preset_line_volume
  label: Preset Line Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 00-60 (61 degrees total)

- id: preset_bass_volume
  label: Preset Bass Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Bass level 00-08 (9 degrees total)

- id: preset_treble_volume
  label: Preset Treble Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Treble level 00-08 (9 degrees total)
```

## Feedbacks
```yaml
- id: status_response
  type: object
  properties:
    - name: audio_routing
      type: string
      description: Format "A: X -> 1" where X is input number
    - name: volume
      type: integer
      description: Volume level (00-60)
    - name: bass
      type: integer
      description: Bass level (00-08)
    - name: treble
      type: integer
      description: Treble level (00-08)

- id: mute_state
  type: enum
  values:
    - muted
    - unmuted

- id: mic_mute_state
  type: enum
  values:
    - muted
    - unmuted

- id: line_mute_state
  type: enum
  values:
    - muted
    - unmuted

- id: mic_volume_response
  type: integer
  description: MIC volume level (00-60)

- id: line_volume_response
  type: integer
  description: Line volume level (00-60)

- id: bass_response
  type: integer
  description: Bass level (00-08)

- id: treble_response
  type: integer
  description: Treble level (00-08)
```

## Variables
```yaml
# UNRESOLVED: no discrete parameter variables identified separate from actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Command format: commands sent as ASCII strings ending with period. Example: "2A1." switches to input 2. Brackets in documentation are not part of actual commands — `[2A1.]` becomes `2A1.`.

Feedback format: responses return routing status plus volume/bass/treble values on separate lines.

<!-- UNRESOLVED: TCP/IP native control not present — requires RS-232 to TCP/IP adapter -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: remote control (IR) commands not included — separate IR doc exists -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PA100_manual.pdf
retrieved_at: 2026-07-24T18:37:00.338Z
last_checked_at: 2026-08-05T07:18:46.289Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:18:46.289Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions map to literals in the source; transport 9600/8/N/1 verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP adapter required for IP control — native IP control not present"
- "port number not stated in source"
- "no discrete parameter variables identified separate from actions"
- "no unsolicited event notifications described in source"
- "no multi-step macros described in source"
- "TCP/IP native control not present — requires RS-232 to TCP/IP adapter"
- "firmware version compatibility not stated in source"
- "remote control (IR) commands not included — separate IR doc exists"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
