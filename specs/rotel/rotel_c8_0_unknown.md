---
spec_id: admin/rotel-c8-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel C8/C8+ Control Spec"
manufacturer: Rotel
model_family: C8
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - C8
    - C8+
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/C8%26C8%2B%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - "https://www.rotel.com/sites/default/files/drivers/amplifier_Rotel_C8%5EC8%2B%2B[DriverWorks]_1.c4i"
retrieved_at: 2026-06-30T16:15:22.038Z
last_checked_at: 2026-07-07T12:29:48.161Z
generated_at: 2026-07-07T12:29:48.161Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "discover? example shows port=9590 while TCP control port documented as 9596 — discrepancy not reconciled in source"
  - "no persistent settable parameters beyond per-action commands documented above"
  - "no multi-step sequences documented in source"
  - "source contains no safety warnings or interlock procedures"
  - "discover? port 9590 vs TCP port 9596 conflict not reconciled in source"
verification:
  verdict: verified
  checked_at: 2026-07-07T12:29:48.161Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec actions matched exactly in source document; transport parameters verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Rotel C8/C8+ Control Spec

## Summary
Rotel C8 and C8+ are multi-zone power amplifiers (4 zones) controllable via ASCII RS-232 protocol. Same command set accepted over TCP/IP port 9596. Spec covers power, volume, mute, source selection, tone, balance, dimmer, and feedback queries.

<!-- UNRESOLVED: discover? example shows port=9590 while TCP control port documented as 9596 — discrepancy not reconciled in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9596
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
- powerable      # inferred from power_on/power_off/power_toggle commands
- levelable      # inferred from volume commands
- queryable      # inferred from feedback query commands
- routable       # inferred from input_a/b/c/d source selection commands
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

- id: power_query
  label: Power Status Query
  kind: query
  command: "power?"
  params: []

- id: vol_up
  label: Volume Up
  kind: action
  command: "z{zone}:vol_up!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: vol_down
  label: Volume Down
  kind: action
  command: "z{zone}:vol_dwn!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: vol_set
  label: Set Volume
  kind: action
  command: "z{zone}:vol_{level}!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)
    - name: level
      type: integer
      description: Volume level (00-96)

- id: volume_query
  label: Volume Query
  kind: query
  command: "volume?"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "z{zone}:mute!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: mute_on
  label: Mute On
  kind: action
  command: "z{zone}:mute_on!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: mute_off
  label: Mute Off
  kind: action
  command: "z{zone}:mute_off!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: mute_query
  label: Mute Query
  kind: query
  command: "mute?"
  params: []

- id: input_a
  label: Source Input A
  kind: action
  command: "z{zone}:input_a!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: input_b
  label: Source Input B
  kind: action
  command: "z{zone}:input_b!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: input_c
  label: Source Input C
  kind: action
  command: "z{zone}:input_c!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: input_d
  label: Source Input D
  kind: action
  command: "z{zone}:input_d!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: input_query
  label: Source Input Query
  kind: query
  command: "input?"
  params: []

- id: bass_up
  label: Bass Up
  kind: action
  command: "z{zone}:bass_up!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: bass_down
  label: Bass Down
  kind: action
  command: "z{zone}:bass_down!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: bass_set_negative
  label: Set Bass Negative
  kind: action
  command: "z{zone}:bass_-{n}!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)
    - name: n
      type: integer
      description: Negative offset (01-10)

- id: bass_set_flat
  label: Set Bass Flat
  kind: action
  command: "z{zone}:bass_000!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: bass_set_positive
  label: Set Bass Positive
  kind: action
  command: "z{zone}:bass_+{n}!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)
    - name: n
      type: integer
      description: Positive offset (01-10)

- id: bass_query
  label: Bass Query
  kind: query
  command: "bass?"
  params: []

- id: treble_up
  label: Treble Up
  kind: action
  command: "z{zone}:treble_up!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: treble_down
  label: Treble Down
  kind: action
  command: "z{zone}:treble_down!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: treble_set_negative
  label: Set Treble Negative
  kind: action
  command: "z{zone}:treble_-{n}!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)
    - name: n
      type: integer
      description: Negative offset (01-10)

- id: treble_set_flat
  label: Set Treble Flat
  kind: action
  command: "z{zone}:treble_000!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: treble_set_positive
  label: Set Treble Positive
  kind: action
  command: "z{zone}:treble_+{n}!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)
    - name: n
      type: integer
      description: Positive offset (01-10)

- id: treble_query
  label: Treble Query
  kind: query
  command: "treble?"
  params: []

- id: balance_right
  label: Balance Right
  kind: action
  command: "z{zone}:balance_r!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: balance_left
  label: Balance Left
  kind: action
  command: "z{zone}:balance_l!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: balance_set_left
  label: Set Balance Left
  kind: action
  command: "z{zone}:balance_l{n}!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)
    - name: n
      type: integer
      description: Left offset (01-10)

- id: balance_set_center
  label: Set Balance Center
  kind: action
  command: "z{zone}:balance_000!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)

- id: balance_set_right
  label: Set Balance Right
  kind: action
  command: "z{zone}:balance_r{n}!"
  params:
    - name: zone
      type: integer
      description: Zone number (1-4)
    - name: n
      type: integer
      description: Right offset (01-10)

- id: balance_query
  label: Balance Query
  kind: query
  command: "balance?"
  params: []

- id: dimmer_toggle
  label: Display Dimmer Toggle
  kind: action
  command: "dimmer!"
  params: []

- id: dimmer_0
  label: Display Brightest
  kind: action
  command: "dimmer_0!"
  params: []

- id: dimmer_1
  label: Display Dimmer Level 1
  kind: action
  command: "dimmer_1!"
  params: []

- id: dimmer_2
  label: Display Dimmer Level 2
  kind: action
  command: "dimmer_2!"
  params: []

- id: dimmer_3
  label: Display Dimmer Level 3
  kind: action
  command: "dimmer_3!"
  params: []

- id: dimmer_4
  label: Display Dimmest
  kind: action
  command: "dimmer_4!"
  params: []

- id: dimmer_query
  label: Dimmer Query
  kind: query
  command: "dimmer?"
  params: []

- id: rs232_update_on
  label: RS232 Auto Update On
  kind: action
  command: "rs232_update_on!"
  params: []

- id: rs232_update_off
  label: RS232 Auto Update Off
  kind: action
  command: "rs232_update_off!"
  params: []

- id: freq_query
  label: Frequency Query
  kind: query
  command: "freq?"
  params: []

- id: version_query
  label: Firmware Version Query
  kind: query
  command: "version?"
  params: []

- id: ip_query
  label: IP Address Query
  kind: query
  command: "ip?"
  params: []

- id: mac_query
  label: MAC Address Query
  kind: query
  command: "mac?"
  params: []

- id: model_query
  label: Model Query
  kind: query
  command: "model?"
  params: []

- id: discover
  label: Network Discover
  kind: query
  command: "discover?"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]

- id: volume_per_zone
  type: integer
  description: Per-zone volume 00-96, 4 comma-separated values (z1,z2,z3,z4)

- id: mute_per_zone
  type: enum
  values: [on, off]

- id: input_per_zone
  type: enum
  values: [a, b, c, d]

- id: bass_per_zone
  type: string
  description: Per-zone bass level +01-10 / -01-10 / 000

- id: treble_per_zone
  type: string
  description: Per-zone treble level +01-10 / -01-10 / 000

- id: balance_per_zone
  type: string
  description: Per-zone balance l01-10 / r01-10 / 000

- id: dimmer_level
  type: enum
  values: ["0", "1", "2", "3", "4"]

- id: freq_per_zone
  type: string
  description: Per-zone digital source frequency (none, 44.1, 48, 88.2, 96, 176.4, 192)

- id: firmware_version
  type: string
  description: Main CPU software version (#.##)

- id: ip_address
  type: string

- id: mac_address
  type: string
  description: Uppercase hex (12 chars)

- id: model_number
  type: string
```

## Variables
```yaml
# UNRESOLVED: no persistent settable parameters beyond per-action commands documented above
```

## Events
```yaml
- id: rs232_status_update
  description: Unsolicited status changes broadcast when rs232_update_on is active. Same key=value, comma-separated zone format as query responses. Enable via rs232_update_on! and disable via rs232_update_off!.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures
```

## Notes
Protocol ASCII, terminated with "!" for commands, "$" for responses. No spaces, no CR/LF. RS232 hardware lacks flow control — packet loss risk noted. Zone prefix z#: (1-4) optional; omission applies to all zones. Source select only effective when zone configured as "Matrix" via front panel. discover? example port=9590 conflicts with documented TCP control port 9596 — flag.

<!-- UNRESOLVED: discover? port 9590 vs TCP port 9596 conflict not reconciled in source -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/C8%26C8%2B%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - "https://www.rotel.com/sites/default/files/drivers/amplifier_Rotel_C8%5EC8%2B%2B[DriverWorks]_1.c4i"
retrieved_at: 2026-06-30T16:15:22.038Z
last_checked_at: 2026-07-07T12:29:48.161Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:29:48.161Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec actions matched exactly in source document; transport parameters verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "discover? example shows port=9590 while TCP control port documented as 9596 — discrepancy not reconciled in source"
- "no persistent settable parameters beyond per-action commands documented above"
- "no multi-step sequences documented in source"
- "source contains no safety warnings or interlock procedures"
- "discover? port 9590 vs TCP port 9596 conflict not reconciled in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
