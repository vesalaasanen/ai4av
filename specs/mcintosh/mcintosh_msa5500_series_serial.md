---
schema_version: ai4av-public-spec-v1
device_id: mcintosh/msa5500
entity_id: mcintosh_msa5500_series
spec_id: admin/mcintosh-msa5500-series
revision: 1
author: admin
title: "McIntosh MSA5500 Series Control Spec"
status: published
manufacturer: McIntosh
manufacturer_key: mcintosh
model_family: MSA5500
aliases: []
compatible_with:
  manufacturers:
    - McIntosh
  models:
    - MSA5500
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - "https://mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/C55-C2800-External-Control-Rev-B.pdf?rev=0ef329348ae54e419fdbbae405ce6c9d&revision=0ef32934-8ae5-4e41-9fdb-bae405ce6c9d"
  - https://raw.githubusercontent.com/RobKikta/IntoBlue/master/McIntosh_RS232ControlApplicationNote.pdf
source_documents:
  - title: "McIntosh public source"
    url: "https://mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/C55-C2800-External-Control-Rev-B.pdf?rev=0ef329348ae54e419fdbbae405ce6c9d&revision=0ef32934-8ae5-4e41-9fdb-bae405ce6c9d"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:20:44.301Z
  - title: "McIntosh public source"
    url: "https://mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/C55-C2800-External-Control-Rev-B.pdf?rev=0ef329348ae54e419fdbbae405ce6c9d&revision=0ef32934-8ae5-4e41-9fdb-bae405ce6c9d"
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T09:21:02.649Z
  - title: "McIntosh public source"
    url: "https://mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/C55-C2800-External-Control-Rev-B.pdf?rev=0ef329348ae54e419fdbbae405ce6c9d&revision=0ef32934-8ae5-4e41-9fdb-bae405ce6c9d"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:25:45.279Z
  - title: "McIntosh public source"
    url: https://raw.githubusercontent.com/RobKikta/IntoBlue/master/McIntosh_RS232ControlApplicationNote.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:28:38.639Z
  - title: "McIntosh public source"
    url: https://raw.githubusercontent.com/RobKikta/IntoBlue/master/McIntosh_RS232ControlApplicationNote.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T09:28:57.181Z
retrieved_at: 2026-04-29T09:28:57.181Z
last_checked_at: 2026-04-25T21:10:09.769Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:10:09.769Z
  matched_actions: 49
  action_count: 49
  confidence: high
  summary: "All 49 spec actions (33 command actions plus 16 query feedbacks) matched with complete fidelity to source protocol table; all transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# McIntosh MSA5500 Series Control Spec

## Summary
The McIntosh MSA5500 is an integrated stereo amplifier with RS-232C serial and TCP/IP control. Commands are ASCII-encoded in the format `(XXX parameter)` with parenthesized prefix/suffix. The spec covers power, volume, mute, input selection, tone controls, balance, and various trim functions.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 57012
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: PWR on/off commands present
  - queryable    # inferred: QRY and status query commands present
  - routable     # inferred: INP input selection commands present
  - levelable    # inferred: VOL, TBA, TTB, TTT, TIN level commands present
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "(PWR 1)"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "(PWR 0)"
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    command: "(VOL U)"
    params: []
    description: Increase volume by 1%

  - id: volume_down
    label: Volume Down
    kind: action
    command: "(VOL D)"
    params: []
    description: Decrease volume by 1%

  - id: volume_set
    label: Set Volume
    kind: action
    command: "(VOL {level})"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Volume level as percentage (0–100)

  - id: mute_on
    label: Mute On
    kind: action
    command: "(MUT 1)"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "(MUT 0)"
    params: []

  - id: input_next
    label: Next Input
    kind: action
    command: "(INP U)"
    params: []

  - id: input_previous
    label: Previous Input
    kind: action
    command: "(INP D)"
    params: []

  - id: input_select
    label: Select Input
    kind: action
    command: "(INP {input})"
    params:
      - name: input
        type: integer
        min: 1
        max: 15
        description: >
          1=BALANCED, 2=UNBAL 1, 3=UNBAL 2, 4=UNBAL 3, 5=UNBAL 4,
          6=MM PHONO, 7=COAX 1, 8=COAX 2, 9=OPT 1, 10=OPT 2,
          11=USB, 12=MCT, 13=HDMI(ARC), 14=NETWORK, 15=BLUETOOTH

  - id: status_enable_on
    label: Status Enable On
    kind: action
    command: "(STA 1)"
    params: []
    description: Enable automatic status update transmissions

  - id: status_enable_off
    label: Status Enable Off
    kind: action
    command: "(STA 0)"
    params: []

  - id: balance_left
    label: Balance Left
    kind: action
    command: "(TBA L)"
    params: []
    description: Shift balance left by 1 dB

  - id: balance_right
    label: Balance Right
    kind: action
    command: "(TBA R)"
    params: []
    description: Shift balance right by 1 dB

  - id: balance_set
    label: Set Balance
    kind: action
    command: "(TBA {balance})"
    params:
      - name: balance
        type: integer
        min: -50
        max: 50
        description: Balance level (-50=full left, +50=full right)

  - id: input_trim_up
    label: Input Trim Up
    kind: action
    command: "(TIN U)"
    params: []
    description: Increase input trim by 0.5 dB

  - id: input_trim_down
    label: Input Trim Down
    kind: action
    command: "(TIN D)"
    params: []
    description: Decrease input trim by 0.5 dB

  - id: input_trim_set
    label: Set Input Trim
    kind: action
    command: "(TIN {level})"
    params:
      - name: level
        type: integer
        min: -12
        max: 12
        description: >
          Trim level in half-dB steps (-12 = -6.0 dB, -11 = -5.5 dB, etc.)

  - id: tone_control_on
    label: Tone Control On
    kind: action
    command: "(TTN 1)"
    params: []

  - id: tone_control_off
    label: Tone Control Off
    kind: action
    command: "(TTN 0)"
    params: []

  - id: tone_bass_up
    label: Bass Up
    kind: action
    command: "(TTB U)"
    params: []

  - id: tone_bass_down
    label: Bass Down
    kind: action
    command: "(TTB D)"
    params: []

  - id: tone_bass_set
    label: Set Bass
    kind: action
    command: "(TTB {level})"
    params:
      - name: level
        type: integer
        min: -12
        max: 12
        description: Bass level in dB (-12 to +12)

  - id: tone_treble_up
    label: Treble Up
    kind: action
    command: "(TTT U)"
    params: []

  - id: tone_treble_down
    label: Treble Down
    kind: action
    command: "(TTT D)"
    params: []

  - id: tone_treble_set
    label: Set Treble
    kind: action
    command: "(TTT {level})"
    params:
      - name: level
        type: integer
        min: -12
        max: 12
        description: Treble level in dB (-12 to +12)

  - id: mono_on
    label: Mono On
    kind: action
    command: "(TMO 1)"
    params: []

  - id: mono_off
    label: Mono Off
    kind: action
    command: "(TMO 0)"
    params: []

  - id: meter_lights_on
    label: Meter Lights On
    kind: action
    command: "(TML 1)"
    params: []

  - id: meter_lights_off
    label: Meter Lights Off
    kind: action
    command: "(TML 0)"
    params: []

  - id: display_brightness_set
    label: Set Display Brightness
    kind: action
    command: "(TDB {level})"
    params:
      - name: level
        type: integer
        enum: [1, 2, 3, 4]
        description: "1=25%, 2=50%, 3=75%, 4=100%"

  - id: hxd_on
    label: HXD On
    kind: action
    command: "(THH 1)"
    params: []
    description: Returns error if headphones are not plugged in

  - id: hxd_off
    label: HXD Off
    kind: action
    command: "(THH 0)"
    params: []
    description: Returns error if headphones are not plugged in
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: ["1", "0"]
    query_command: "(PWR)"
    description: "1=On, 0=Off"

  - id: volume_level
    type: integer
    query_command: "(VOL)"
    description: Current volume level (0–100)

  - id: mute_state
    type: enum
    values: ["1", "0"]
    query_command: "(MUT)"
    description: "1=Muted, 0=Unmuted"

  - id: headphone_status
    type: enum
    values: ["1", "0"]
    query_command: "(HPS)"
    description: "0=Unplugged, 1=Plugged"

  - id: input_selected
    type: integer
    query_command: "(INP)"
    description: Current input number (1–15)

  - id: status_enable_state
    type: enum
    values: ["1", "0"]
    query_command: "(STA)"
    description: "1=Enabled, 0=Disabled"

  - id: balance_level
    type: integer
    query_command: "(TBA)"
    description: Balance (-50 to +50)

  - id: input_trim_level
    type: integer
    query_command: "(TIN)"
    description: Input trim (-12 to +12, half-dB steps)

  - id: tone_control_state
    type: enum
    values: ["1", "0"]
    query_command: "(TTN)"
    description: "1=On, 0=Off"

  - id: bass_level
    type: integer
    query_command: "(TTB)"
    description: Bass level (-12 to +12 dB)

  - id: treble_level
    type: integer
    query_command: "(TTT)"
    description: Treble level (-12 to +12 dB)

  - id: mono_state
    type: enum
    values: ["1", "0"]
    query_command: "(TMO)"
    description: "1=Mono, 0=Stereo"

  - id: meter_lights_state
    type: enum
    values: ["1", "0"]
    query_command: "(TML)"
    description: "1=On, 0=Off"

  - id: display_brightness
    type: integer
    query_command: "(TDB)"
    description: "1=25%, 2=50%, 3=75%, 4=100%"

  - id: hxd_state
    type: enum
    values: ["1", "0"]
    query_command: "(THH)"
    description: "1=On, 0=Off (error if headphones not plugged)"

  - id: full_query
    type: string
    query_command: "(QRY)"
    description: Returns full device status
```

## Variables
```yaml
# No continuous variables beyond what is covered by set-level actions and feedbacks.
```

## Events
```yaml
events:
  - id: startup_info
    description: >
      On AC connection, the unit sends model number, serial number,
      system firmware version, and DA firmware version:
      >> (MSA5500)
      >> (Serial Number: ALX####)
      >> (FW Version: #.#.#)
      >> (DS1 Version: v#.##)
    trigger: First AC connection / power-up

  - id: command_ack
    description: >
      The unit echoes the received command as acknowledgement after processing.
    trigger: After processing a valid command

  - id: status_update
    description: >
      When Status Enable (STA) is on, the unit automatically transmits state
      updates when its state changes. Allows control system to maintain current state.
    trigger: Internal state change (requires STA enabled)
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >
      When power is off, all non-PWR RS232 commands return an Invalid Command error.
  - description: >
      HXD commands (THH) return Invalid Command error if headphones are not plugged in.
  - description: >
      Selecting a disabled input (Off in Setup Menu) returns an Invalid Parameter error.
# UNRESOLVED: no power-on sequencing requirements or safety warnings stated in source
```

## Notes
- Commands use ASCII format: `(XXX parameter)` — prefix `(`, 3-char name, space-separated params, suffix `)`.
- Carriage return `\x0D\x0A` is optional, used for terminal readability.
- Error responses: `(ERROR – Unknown Error)`, `(ERROR – Invalid Command)`, `(ERROR – Invalid Parameter)`, `(ERROR – Invalid Input)`, `(ERROR – In Passthru)`.
- RS-232 uses a 3.5mm TRS connector (Tip=TXD, Ring=RXD, Sleeve=Ground). A DB9 female to 3.5mm adapter cable may be used.
- Input trim values are in half-dB steps (e.g. -12 = -6.0 dB, -11 = -5.5 dB).

<!-- UNRESOLVED: RS-232 baud rate not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version not stated in source -->
<!-- UNRESOLVED: maximum command rate / throttling not stated in source -->
<!-- UNRESOLVED: connection keep-alive or timeout behavior not stated in source -->
<!-- UNRESOLVED: passthru mode details not documented beyond error message -->

## Provenance

```yaml
source_urls:
  - "https://mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/C55-C2800-External-Control-Rev-B.pdf?rev=0ef329348ae54e419fdbbae405ce6c9d&revision=0ef32934-8ae5-4e41-9fdb-bae405ce6c9d"
  - https://raw.githubusercontent.com/RobKikta/IntoBlue/master/McIntosh_RS232ControlApplicationNote.pdf
source_documents:
  - title: "McIntosh public source"
    url: "https://mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/C55-C2800-External-Control-Rev-B.pdf?rev=0ef329348ae54e419fdbbae405ce6c9d&revision=0ef32934-8ae5-4e41-9fdb-bae405ce6c9d"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:20:44.301Z
  - title: "McIntosh public source"
    url: "https://mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/C55-C2800-External-Control-Rev-B.pdf?rev=0ef329348ae54e419fdbbae405ce6c9d&revision=0ef32934-8ae5-4e41-9fdb-bae405ce6c9d"
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T09:21:02.649Z
  - title: "McIntosh public source"
    url: "https://mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/C55-C2800-External-Control-Rev-B.pdf?rev=0ef329348ae54e419fdbbae405ce6c9d&revision=0ef32934-8ae5-4e41-9fdb-bae405ce6c9d"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:25:45.279Z
  - title: "McIntosh public source"
    url: https://raw.githubusercontent.com/RobKikta/IntoBlue/master/McIntosh_RS232ControlApplicationNote.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:28:38.639Z
  - title: "McIntosh public source"
    url: https://raw.githubusercontent.com/RobKikta/IntoBlue/master/McIntosh_RS232ControlApplicationNote.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T09:28:57.181Z
retrieved_at: 2026-04-29T09:28:57.181Z
last_checked_at: 2026-04-25T21:10:09.769Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:10:09.769Z
matched_actions: 49
action_count: 49
confidence: high
summary: "All 49 spec actions (33 command actions plus 16 query feedbacks) matched with complete fidelity to source protocol table; all transport parameters verified."
```

## Known Gaps

```yaml
[]
```
