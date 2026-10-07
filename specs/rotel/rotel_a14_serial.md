---
spec_id: admin/rotel-a14
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel A14 Control Spec"
manufacturer: Rotel
model_family: A14
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - A14
    - A12
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/A12-A14%20Protocol.pdf"
  - https://rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-05-21T20:38:36.498Z
last_checked_at: 2026-10-07T12:36:53.797Z
generated_at: 2026-10-07T12:36:53.797Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no standalone settable parameters beyond discrete actions"
  - "no unsolicited event documentation beyond rs232_update mode"
  - "no multi-step macro sequences documented"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:36:53.797Z
  matched_actions: 65
  action_count: 65
  confidence: medium
  summary: "All 65 action units (47 actions plus 18 queries) match source commands verbatim, transport values are supported, and the source catalogue is fully represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Rotel A14 Control Spec

## Summary
The A12 and A14 support ASCII control over RS-232. The A14 also supports IP control over TCP when connected to a local network with a valid IP address. Commands end with `!`; responses end with `$`. Supported functions include power, volume, source selection, tone control, balance, speaker output, and display dimmer.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9590
serial:
  baud_rate: 115200
  parity: N
  data_bits: 8
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED
```

## Traits
```yaml
- powerable
- queryable
- routable
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
      range: [1, 96]
      description: Volume level 01-96
- id: mute
  label: Mute Toggle
  kind: action
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: select_cd
  label: Source CD
  kind: action
  params: []
- id: select_coax1
  label: Source Coax 1
  kind: action
  params: []
- id: select_coax2
  label: Source Coax 2
  kind: action
  params: []
- id: select_opt1
  label: Source Optical 1
  kind: action
  params: []
- id: select_opt2
  label: Source Optical 2
  kind: action
  params: []
- id: select_aux1
  label: Source Aux 1
  kind: action
  params: []
- id: select_aux2
  label: Source Aux 2
  kind: action
  params: []
- id: select_tuner
  label: Source Tuner
  kind: action
  params: []
- id: select_phono
  label: Source Phono
  kind: action
  params: []
- id: select_usb
  label: Source Front USB
  kind: action
  params: []
- id: select_bluetooth
  label: Source Bluetooth
  kind: action
  params: []
- id: select_pcusb
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
  label: Track Forward/Tune Up
  kind: action
  params: []
- id: trkb
  label: Track Backward/Tune Down
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
      description: Selects the fixed command bass_-10!, bass_000!, or bass_+10!, respectively
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
      description: Selects the fixed command treble_-10!, treble_000!, or treble_+10!, respectively
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
    - name: position
      type: enum
      values: [L15, "000", R15]
      description: Selects the fixed command balance_L15!, balance_000!, or balance_R15!, respectively
- id: speaker_a
  label: Toggle Speaker A
  kind: action
  params: []
- id: speaker_b
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
- id: dimmer
  label: Toggle Dimmer
  kind: action
  params: []
- id: dimmer_set
  label: Set Dimmer
  kind: action
  params:
    - name: level
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6]
      description: Selects the fixed command dimmer_0! through dimmer_6! for the corresponding level
- id: rs232_update_on
  label: RS232 Update Auto
  kind: action
  params: []
- id: rs232_update_off
  label: RS232 Update Manual
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  query_command: power?
  type: enum
  values: [on, standby]
- id: source_state
  query_command: source?
  type: enum
  values: [cd, coax1, coax2, opt1, opt2, tuner, phono, usb, aux1, aux2, pc_usb, bluetooth]
- id: volume_state
  query_command: volume?
  type: integer
  range: [0, 96]
- id: mute_state
  query_command: mute?
  type: enum
  values: [on, off]
- id: bypass_state
  query_command: bypass?
  type: enum
  values: [on, off]
- id: bass_state
  query_command: bass?
  type: string
- id: treble_state
  query_command: treble?
  type: string
- id: balance_state
  query_command: balance?
  type: string
- id: speaker_state
  query_command: speaker?
  type: enum
  values: [a, b, a_b, off]
- id: dimmer_state
  query_command: dimmer?
  type: integer
  range: [0, 6]
- id: freq_state
  query_command: freq?
  type: enum
  values: [off, 32, 44.1, 48, 88.2, 96, 176.4, 192]
- id: pcusb_class_state
  query_command: pcusb?
  type: enum
  values: [1, 2]
- id: version_state
  query_command: version?
  type: string
- id: pc_version_state
  query_command: pc_version?
  type: string
- id: ip_state
  query_command: ip?
  type: string
- id: mac_state
  query_command: mac?
  type: string
- id: model_state
  query_command: model?
  type: string
- id: discover_state
  query_command: discover?
  type: string
- id: update_mode_state
  type: enum
  values: [auto, manual]
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation beyond rs232_update mode
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Commands are terminated by `!`; responses are terminated by `$`. Commands contain no spaces and have no carriage return or line feed after them. RS-232 hardware does not support flow control. IP control is available for the A14 over TCP port 9590, using the same command format as serial.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/A12-A14%20Protocol.pdf"
  - https://rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-05-21T20:38:36.498Z
last_checked_at: 2026-10-07T12:36:53.797Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:36:53.797Z
matched_actions: 65
action_count: 65
confidence: medium
summary: "All 65 action units (47 actions plus 18 queries) match source commands verbatim, transport values are supported, and the source catalogue is fully represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no standalone settable parameters beyond discrete actions"
- "no unsolicited event documentation beyond rs232_update mode"
- "no multi-step macro sequences documented"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
