---
spec_id: admin/rotel-a11mkii
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel A11 / A11MKII Control Spec"
manufacturer: Rotel
model_family: A11
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - A11
    - A11MKII
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/A11-A11MKII%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-06-30T16:14:39.019Z
last_checked_at: 2026-07-07T11:51:56.627Z
generated_at: 2026-07-07T11:51:56.627Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no Ethernet/IP control details in this source; control surface is RS-232 only"
  - "source describes no multi-step sequences"
  - "source contains no safety warnings or interlock procedures"
  - "no Ethernet/IP control, no firmware compatibility ranges, no hardware pinout beyond the RS-232 serial settings listed above"
verification:
  verdict: verified
  checked_at: 2026-07-07T11:51:56.627Z
  matched_actions: 64
  action_count: 64
  confidence: medium
  summary: "All 64 spec actions and their command mnemonics matched source documentation exactly; transport parameters (115200 baud, 8 bits, no parity) verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Rotel A11 / A11MKII Control Spec

## Summary
The Rotel A11 and A11MKII are integrated stereo amplifiers controllable via an ASCII-based RS-232 protocol. Commands terminate with `!`, response/status messages terminate with `$`. The A11MKII addition was appended to the protocol in version 1.10 (June 2024).

<!-- UNRESOLVED: no Ethernet/IP control details in this source; control surface is RS-232 only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred from power command examples
- routable       # inferred from source-select commands
- queryable      # inferred from query commands (power?, source?, volume?, ...)
- levelable      # inferred from volume/bass/treble/balance commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "power_on!"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "power_off!"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "power_toggle!"
  params: []

- id: vol_up
  label: Volume Up
  kind: action
  command: "vol_up!"
  params: []

- id: vol_dwn
  label: Volume Down
  kind: action
  command: "vol_dwn!"
  params: []

- id: vol_nn
  label: Set Volume to level n (01-96)
  kind: action
  command: "vol_nn!"
  params:
    - name: level
      type: integer
      description: Volume level (01-96)

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "mute!"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "mute_on!"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "mute_off!"
  params: []

- id: source_cd
  label: Source CD
  kind: action
  command: "cd!"
  params: []

- id: source_aux1
  label: Source Aux 1
  kind: action
  command: "aux1!"
  params: []

- id: source_tuner
  label: Source Tuner
  kind: action
  command: "tuner!"
  params: []

- id: source_phono
  label: Source Phono
  kind: action
  command: "phono!"
  params: []

- id: source_bluetooth
  label: Source Bluetooth
  kind: action
  command: "bluetooth!"
  params: []

- id: play
  label: Play Source
  kind: action
  command: "play!"
  params: []

- id: stop
  label: Stop Source
  kind: action
  command: "stop!"
  params: []

- id: pause
  label: Pause Source
  kind: action
  command: "pause!"
  params: []

- id: trkf
  label: Track Forward / Tune Up
  kind: action
  command: "trkf!"
  params: []

- id: trkb
  label: Track Backward / Tune Down
  kind: action
  command: "trkb!"
  params: []

- id: bypass_on
  label: Tone Bypass On
  kind: action
  command: "bypass_on!"
  params: []

- id: bypass_off
  label: Tone Bypass Off
  kind: action
  command: "bypass_off!"
  params: []

- id: bass_up
  label: Bass Up
  kind: action
  command: "bass_up!"
  params: []

- id: bass_down
  label: Bass Down
  kind: action
  command: "bass_down!"
  params: []

- id: bass_minus_10
  label: Set Bass to -10
  kind: action
  command: "bass_-10!"
  params: []

- id: bass_000
  label: Set Bass to 0
  kind: action
  command: "bass_000!"
  params: []

- id: bass_plus_10
  label: Set Bass to +10
  kind: action
  command: "bass_+10!"
  params: []

- id: treble_up
  label: Treble Up
  kind: action
  command: "treble_up!"
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  command: "treble_down!"
  params: []

- id: treble_minus_10
  label: Set Treble to -10
  kind: action
  command: "treble_-10!"
  params: []

- id: treble_000
  label: Set Treble to 0
  kind: action
  command: "treble_000!"
  params: []

- id: treble_plus_10
  label: Set Treble to +10
  kind: action
  command: "treble_+10!"
  params: []

- id: balance_right
  label: Balance Right
  kind: action
  command: "balance_r!"
  params: []

- id: balance_left
  label: Balance Left
  kind: action
  command: "balance_l!"
  params: []

- id: balance_L15
  label: Set Balance to Max Left
  kind: action
  command: "balance_L15!"
  params: []

- id: balance_000
  label: Set Balance to 0
  kind: action
  command: "balance_000!"
  params: []

- id: balance_R15
  label: Set Balance to Max Right
  kind: action
  command: "balance_R15!"
  params: []

- id: speaker_a_toggle
  label: Toggle Speaker A Output
  kind: action
  command: "speaker_a!"
  params: []

- id: speaker_b_toggle
  label: Toggle Speaker B Output
  kind: action
  command: "speaker_b!"
  params: []

- id: speaker_a_on
  label: Speaker A Output On
  kind: action
  command: "speaker_a_on!"
  params: []

- id: speaker_a_off
  label: Speaker A Output Off
  kind: action
  command: "speaker_a_off!"
  params: []

- id: speaker_b_on
  label: Speaker B Output On
  kind: action
  command: "speaker_b_on!"
  params: []

- id: speaker_b_off
  label: Speaker B Output Off
  kind: action
  command: "speaker_b_off!"
  params: []

- id: dimmer_toggle
  label: Toggle display dimmer
  kind: action
  command: "dimmer!"
  params: []

- id: dimmer_0
  label: Set display to brightest
  kind: action
  command: "dimmer_0!"
  params: []

- id: dimmer_1
  label: Set display to dimmer level 1
  kind: action
  command: "dimmer_1!"
  params: []

- id: dimmer_2
  label: Set display to dimmer level 2
  kind: action
  command: "dimmer_2!"
  params: []

- id: dimmer_3
  label: Set display to dimmer level 3
  kind: action
  command: "dimmer_3!"
  params: []

- id: dimmer_4
  label: Set display to dimmer level 4
  kind: action
  command: "dimmer_4!"
  params: []

- id: dimmer_5
  label: Set display to dimmer level 5
  kind: action
  command: "dimmer_5!"
  params: []

- id: dimmer_6
  label: Set display to dimmest
  kind: action
  command: "dimmer_6!"
  params: []

- id: rs232_update_on
  label: Set RS232 Update to Auto (On)
  kind: action
  command: "rs232_update_on!"
  params: []

- id: rs232_update_off
  label: Set RS232 Update to Manual (Off)
  kind: action
  command: "rs232_update_off!"
  params: []

- id: power_query
  label: Power Status Query
  kind: query
  command: "power?"
  params: []

- id: source_query
  label: Source Query
  kind: query
  command: "source?"
  params: []

- id: volume_query
  label: Volume Query
  kind: query
  command: "volume?"
  params: []

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "mute?"
  params: []

- id: bypass_query
  label: Tone Bypass Query
  kind: query
  command: "bypass?"
  params: []

- id: bass_query
  label: Bass Level Query
  kind: query
  command: "bass?"
  params: []

- id: treble_query
  label: Treble Level Query
  kind: query
  command: "treble?"
  params: []

- id: balance_query
  label: Balance Query
  kind: query
  command: "balance?"
  params: []

- id: speaker_query
  label: Speaker Outputs Query
  kind: query
  command: "speaker?"
  params: []

- id: dimmer_query
  label: Display Dimmer Query
  kind: query
  command: "dimmer?"
  params: []

- id: version_query
  label: Main CPU Software Version Query
  kind: query
  command: "version?"
  params: []

- id: model_query
  label: Model Number Query
  kind: query
  command: "model?"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  example: "power=on$"

- id: source_state
  type: enum
  values: [cd, aux1, tuner, phono, bluetooth]
  example: "source=cd$"

- id: volume_state
  type: integer
  range: "01-96"
  example: "volume=40$"

- id: mute_state
  type: enum
  values: [on, off]
  example: "mute=off$"

- id: bypass_state
  type: enum
  values: [on, off]
  example: "bypass=off$"

- id: bass_state
  type: string
  description: "+01 to +10, -01 to -10, or 000"
  example: "bass=+02$"

- id: treble_state
  type: string
  description: "+01 to +10, -01 to -10, or 000"
  example: "treble=-01$"

- id: balance_state
  type: string
  description: "L01-L15, R01-R15, or 000"
  example: "balance=L03$"

- id: speaker_state
  type: enum
  values: [a, b, a_b, off]
  example: "speaker=a$"

- id: dimmer_state
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  example: "dimmer=3$"

- id: version_state
  type: string
  description: Rotel main CPU software version
  example: "version=1.09$"

- id: model_state
  type: string
  example: "model=a11$"
```

## Variables
```yaml
# No discrete settable parameters beyond the action list above.
```

## Events
```yaml
# When rs232_update_on is set, any status change is transmitted as unsolicited
# feedback using the same `key=value$` format as the queries above.
# Each event payload matches the corresponding Feedback type.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures
```

## Notes
All commands are ASCII text terminated by `!` (no carriage return / line feed). All responses terminate with `$`. Do not include spaces inside command strings. Hardware lacks flow control; care required to avoid packet loss on the wire. Toggle `rs232_update_on` / `rs232_update_off` controls whether the unit pushes unsolicited status updates vs. requires polling.

<!-- UNRESOLVED: no Ethernet/IP control, no firmware compatibility ranges, no hardware pinout beyond the RS-232 serial settings listed above -->
```

Spec complete. Output above.

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/A11-A11MKII%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-06-30T16:14:39.019Z
last_checked_at: 2026-07-07T11:51:56.627Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:51:56.627Z
matched_actions: 64
action_count: 64
confidence: medium
summary: "All 64 spec actions and their command mnemonics matched source documentation exactly; transport parameters (115200 baud, 8 bits, no parity) verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no Ethernet/IP control details in this source; control surface is RS-232 only"
- "source describes no multi-step sequences"
- "source contains no safety warnings or interlock procedures"
- "no Ethernet/IP control, no firmware compatibility ranges, no hardware pinout beyond the RS-232 serial settings listed above"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
