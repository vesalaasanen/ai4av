---
spec_id: admin/rotel-a12
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel A12 Control Spec"
manufacturer: Rotel
model_family: A12
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - A12
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/A12-A14%20Protocol.pdf"
  - "https://rotel.com/sites/default/files/product/rs232/A12-A12MKII-A14-A14MKII%20Protocol.pdf"
retrieved_at: 2026-05-21T20:41:13.727Z
last_checked_at: 2026-10-07T12:36:51.490Z
generated_at: 2026-10-07T12:36:51.490Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "A14 IP-specific commands (ip?, mac?, discover?) not applicable to A12"
  - "A12 serial-only"
  - "not applicable to A12)"
  - "all state is command-based or query-based; no independent variables"
  - "full event schema not explicitly documented"
  - "no multi-step macros documented"
  - "no explicit safety warnings or interlock procedures beyond flow control note"
  - "firmware version compatibility not stated"
  - "A14 IP-specific commands (ip?, mac?, discover?) not applicable to A12 serial-only model"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:36:51.490Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 action units match source commands with correct shapes, transport values are supported, and the source catalogue is fully covered apart from A14-only IP commands. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Rotel A12 Control Spec

## Summary
Integrated amplifier with RS-232C control; the A14 also supports IP control. ASCII protocol, commands end with `!`, responses end with `$`. No spaces in commands, no CR/LF. Supports power, volume, source selection, tone control, balance, speaker output, and display dimmer.

<!-- UNRESOLVED: A14 IP-specific commands (ip?, mac?, discover?) not applicable to A12 -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # A14 only; A12 is serial-only
addressing:
  port: 9590  # A14 IP control port; UNRESOLVED: A12 serial-only
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  params: []

- id: vol_up
  label: Volume Up
  kind: action
  params: []

- id: vol_dwn
  label: Volume Down
  kind: action
  params: []

- id: vol_nn
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 01-96

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []

- id: source_cd
  label: Source CD
  kind: action
  params: []

- id: source_coax1
  label: Source Coax 1
  kind: action
  params: []

- id: source_coax2
  label: Source Coax 2
  kind: action
  params: []

- id: source_opt1
  label: Source Optical 1
  kind: action
  params: []

- id: source_opt2
  label: Source Optical 2
  kind: action
  params: []

- id: source_aux1
  label: Source Aux 1
  kind: action
  params: []

- id: source_aux2
  label: Source Aux 2
  kind: action
  params: []

- id: source_tuner
  label: Source Tuner
  kind: action
  params: []

- id: source_phono
  label: Source Phono
  kind: action
  params: []

- id: source_usb
  label: Source Front USB
  kind: action
  params: []

- id: source_bluetooth
  label: Source Bluetooth
  kind: action
  params: []

- id: source_pcusb
  label: Source PC-USB
  kind: action
  params: []

- id: play
  label: Play
  kind: action
  params: []

- id: stop
  label: Stop
  kind: action
  params: []

- id: pause
  label: Pause
  kind: action
  params: []

- id: trkf
  label: Track Forward / Tune Up
  kind: action
  params: []

- id: trkb
  label: Track Backward / Tune Down
  kind: action
  params: []

- id: bypass_on
  label: Tone Bypass On
  kind: action
  params: []

- id: bypass_off
  label: Tone Bypass Off
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

- id: bass_set
  label: Set Bass
  kind: action
  params:
    - name: level
      type: enum
      values: [-10, 0, 10]
      description: Supported settings map to bass_-10!, bass_000!, and bass_+10!

- id: treble_up
  label: Treble Up
  kind: action
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  params: []

- id: treble_set
  label: Set Treble
  kind: action
  params:
    - name: level
      type: enum
      values: [-10, 0, 10]
      description: Supported settings map to treble_-10!, treble_000!, and treble_+10!

- id: balance_r
  label: Balance Right
  kind: action
  params: []

- id: balance_l
  label: Balance Left
  kind: action
  params: []

- id: balance_set
  label: Set Balance
  kind: action
  params:
    - name: setting
      type: enum
      values: [L15, "000", R15]
      description: Supported settings map to balance_L15!, balance_000!, and balance_R15!

- id: speaker_a_toggle
  label: Toggle Speaker A
  kind: action
  params: []

- id: speaker_b_toggle
  label: Toggle Speaker B
  kind: action
  params: []

- id: speaker_a_on
  label: Speaker A On
  kind: action
  params: []

- id: speaker_a_off
  label: Speaker A Off
  kind: action
  params: []

- id: speaker_b_on
  label: Speaker B On
  kind: action
  params: []

- id: speaker_b_off
  label: Speaker B Off
  kind: action
  params: []

- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  params: []

- id: dimmer_set
  label: Set Display Dimmer
  kind: action
  params:
    - name: level
      type: integer
      description: Dimmer level 0-6

- id: rs232_update_on
  label: RS232 Auto Update On
  kind: action
  params: []

- id: rs232_update_off
  label: RS232 Auto Update Off
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  query_command: power?
  type: enum
  values: [on, standby]

- id: source_state
  label: Source State
  query_command: source?
  type: enum
  values: [cd, coax1, coax2, opt1, opt2, aux1, aux2, tuner, phono, usb, bluetooth, pc_usb]

- id: volume_state
  label: Volume State
  query_command: volume?
  type: integer
  description: Volume level 00-96

- id: mute_state
  label: Mute State
  query_command: mute?
  type: enum
  values: [on, off]

- id: bypass_state
  label: Tone Bypass State
  query_command: bypass?
  type: enum
  values: [on, off]

- id: bass_state
  label: Bass Level
  query_command: bass?
  type: integer
  description: Bass level -10 to +10

- id: treble_state
  label: Treble Level
  query_command: treble?
  type: integer
  description: Treble level -10 to +10

- id: balance_state
  label: Balance State
  query_command: balance?
  type: string
  description: Balance L00-15, R00-15, or 000

- id: speaker_state
  label: Speaker Output State
  query_command: speaker?
  type: enum
  values: [a, b, a_b, off]

- id: dimmer_state
  label: Display Dimmer State
  query_command: dimmer?
  type: integer
  description: Dimmer level 0-6

- id: freq_state
  label: Digital Input Frequency
  query_command: freq?
  type: enum
  values: [off, 32, 44.1, 48, 88.2, 96, 176.4, 192]

- id: pcusb_class_state
  label: PC-USB Class
  query_command: pcusb?
  type: enum
  values: [1, 2]

- id: version_state
  label: Main CPU Version
  query_command: version?
  type: string

- id: pc_version_state
  label: PC-USB Version
  query_command: pc_version?
  type: string

- id: model_state
  label: Model
  query_command: model?
  type: string

- id: update_mode_state
  label: RS232 Update Mode
  type: enum
  values: [auto, manual]

# A14-only feedbacks (UNRESOLVED: not applicable to A12)
# - id: ip_state
# - id: mac_state  
# - id: discover_state
```

## Variables
```yaml
# UNRESOLVED: all state is command-based or query-based; no independent variables
```

## Events
```yaml
# RS232 auto-update sends unsolicited status on change when rs232_update_on is set
# UNRESOLVED: full event schema not explicitly documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - RS232 hardware does not support flow control; care needed when sending/receiving to avoid packet loss
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond flow control note
```

## Notes
Commands: `!` terminator, no spaces, no CR/LF. Responses: `$` terminator. Update mode auto-sends status changes when enabled; manual mode requires polling.
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: A14 IP-specific commands (ip?, mac?, discover?) not applicable to A12 serial-only model -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/A12-A14%20Protocol.pdf"
  - "https://rotel.com/sites/default/files/product/rs232/A12-A12MKII-A14-A14MKII%20Protocol.pdf"
retrieved_at: 2026-05-21T20:41:13.727Z
last_checked_at: 2026-10-07T12:36:51.490Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:36:51.490Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 action units match source commands with correct shapes, transport values are supported, and the source catalogue is fully covered apart from A14-only IP commands. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "A14 IP-specific commands (ip?, mac?, discover?) not applicable to A12"
- "A12 serial-only"
- "not applicable to A12)"
- "all state is command-based or query-based; no independent variables"
- "full event schema not explicitly documented"
- "no multi-step macros documented"
- "no explicit safety warnings or interlock procedures beyond flow control note"
- "firmware version compatibility not stated"
- "A14 IP-specific commands (ip?, mac?, discover?) not applicable to A12 serial-only model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
