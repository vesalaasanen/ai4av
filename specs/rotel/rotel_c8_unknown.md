---
spec_id: admin/rotel-c8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel C8 Control Spec"
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
  - https://www.rotel.com/products/c8
  - https://www.rotel.com/manuals-resources
retrieved_at: 2026-06-30T16:14:57.327Z
last_checked_at: 2026-07-07T12:29:48.958Z
generated_at: 2026-07-07T12:29:48.958Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage/current/power specs not stated in source. Firmware version compatibility not stated."
  - "no explicit multi-step sequences described in source"
  - "no safety warnings, interlock procedures, or power-on"
  - "device power specifications, voltage, current not stated in source"
  - "firmware version compatibility range not stated"
  - "protocol version number not stated"
  - "tone control valid range boundaries (e.g. min/max before clamp) not specified"
verification:
  verdict: verified
  checked_at: 2026-07-07T12:29:48.958Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec commands match source tokens exactly; all transport parameters confirmed; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Rotel C8 Control Spec

## Summary
Rotel C8/C8+ is a multi-zone (4-zone) audio distribution amplifier controlled via ASCII RS-232 and TCP/IP. Spec covers power, volume, mute, source selection, tone (bass/treble), balance, dimmer, RS232 update mode, plus status query feedbacks.

<!-- UNRESOLVED: voltage/current/power specs not stated in source. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
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
traits:
  - powerable       # inferred: power on/off/toggle commands present
  - routable        # inferred: zone + source selection commands present
  - queryable       # inferred: power?/input?/volume?/etc. query commands present
  - levelable       # inferred: volume/bass/treble/balance level controls present
```

## Actions
```yaml
# All commands terminated with literal "!" char. Zone prefix z#: optional (z1: z2: z3: z4:);
# if omitted, command applies to all zones. No spaces, no CR/LF after command.
# Responses terminated with "$" char and return comma-separated 4-zone state.
# Granularity note: source lists each row separately; not collapsed to parameterized enums.

# POWER & VOLUME
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

- id: zone_volume_up
  label: Zone Volume Up
  kind: action
  command: "z{zone}:vol_up!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_volume_down
  label: Zone Volume Down
  kind: action
  command: "z{zone}:vol_dwn!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_volume_set
  label: Zone Set Volume
  kind: action
  command: "z{zone}:vol_{level}!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"
    - name: level
      type: integer
      description: "Volume level 00-96"

- id: zone_mute_toggle
  label: Zone Mute Toggle
  kind: action
  command: "z{zone}:mute!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_mute_on
  label: Zone Mute On
  kind: action
  command: "z{zone}:mute_on!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_mute_off
  label: Zone Mute Off
  kind: action
  command: "z{zone}:mute_off!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

# SOURCE SELECTION
- id: zone_source_a
  label: Zone Source Input A
  kind: action
  command: "z{zone}:input_a!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_source_b
  label: Zone Source Input B
  kind: action
  command: "z{zone}:input_b!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_source_c
  label: Zone Source Input C
  kind: action
  command: "z{zone}:input_c!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_source_d
  label: Zone Source Input D
  kind: action
  command: "z{zone}:input_d!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

# TONE CONTROL - BASS
- id: zone_bass_up
  label: Zone Bass Up
  kind: action
  command: "z{zone}:bass_up!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_bass_down
  label: Zone Bass Down
  kind: action
  command: "z{zone}:bass_down!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_bass_set_neg
  label: Zone Set Bass Negative
  kind: action
  command: "z{zone}:bass_-{level}!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"
    - name: level
      type: integer
      description: "Bass level 01-10"

- id: zone_bass_set_flat
  label: Zone Set Bass Flat
  kind: action
  command: "z{zone}:bass_000!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_bass_set_pos
  label: Zone Set Bass Positive
  kind: action
  command: "z{zone}:bass_+{level}!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"
    - name: level
      type: integer
      description: "Bass level 01-10"

# TONE CONTROL - TREBLE
- id: zone_treble_up
  label: Zone Treble Up
  kind: action
  command: "z{zone}:treble_up!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_treble_down
  label: Zone Treble Down
  kind: action
  command: "z{zone}:treble_down!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_treble_set_neg
  label: Zone Set Treble Negative
  kind: action
  command: "z{zone}:treble_-{level}!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"
    - name: level
      type: integer
      description: "Treble level 01-10"

- id: zone_treble_set_flat
  label: Zone Set Treble Flat
  kind: action
  command: "z{zone}:treble_000!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_treble_set_pos
  label: Zone Set Treble Positive
  kind: action
  command: "z{zone}:treble_+{level}!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"
    - name: level
      type: integer
      description: "Treble level 01-10"

# BALANCE CONTROL
- id: zone_balance_right
  label: Zone Balance Right
  kind: action
  command: "z{zone}:balance_r!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_balance_left
  label: Zone Balance Left
  kind: action
  command: "z{zone}:balance_l!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_balance_set_left
  label: Zone Set Balance Left
  kind: action
  command: "z{zone}:balance_l{level}!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"
    - name: level
      type: integer
      description: "Balance level 01-10"

- id: zone_balance_set_center
  label: Zone Set Balance Center
  kind: action
  command: "z{zone}:balance_000!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"

- id: zone_balance_set_right
  label: Zone Set Balance Right
  kind: action
  command: "z{zone}:balance_r{level}!"
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4 (optional prefix)"
    - name: level
      type: integer
      description: "Balance level 01-10"

# DIMMER
- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  command: "dimmer!"
  params: []

- id: dimmer_set_0
  label: Set Dimmer Brightest
  kind: action
  command: "dimmer_0!"
  params: []

- id: dimmer_set_1
  label: Set Dimmer Level 1
  kind: action
  command: "dimmer_1!"
  params: []

- id: dimmer_set_2
  label: Set Dimmer Level 2
  kind: action
  command: "dimmer_2!"
  params: []

- id: dimmer_set_3
  label: Set Dimmer Level 3
  kind: action
  command: "dimmer_3!"
  params: []

- id: dimmer_set_4
  label: Set Dimmer Dimmest
  kind: action
  command: "dimmer_4!"
  params: []

# RS232 UPDATE MODE
- id: rs232_update_on
  label: Set RS232 Update Auto On
  kind: action
  command: "rs232_update_on!"
  params: []

- id: rs232_update_off
  label: Set RS232 Update Manual Off
  kind: action
  command: "rs232_update_off!"
  params: []

# STATUS QUERIES (Section 2)
- id: query_power
  label: Query Power Status
  kind: query
  command: "power?"
  params: []

- id: query_input
  label: Query Source Selection
  kind: query
  command: "input?"
  params: []

- id: query_volume
  label: Query Volume
  kind: query
  command: "volume?"
  params: []

- id: query_mute
  label: Query Mute Status
  kind: query
  command: "mute?"
  params: []

- id: query_bass
  label: Query Bass Level
  kind: query
  command: "bass?"
  params: []

- id: query_treble
  label: Query Treble Level
  kind: query
  command: "treble?"
  params: []

- id: query_balance
  label: Query Balance Setting
  kind: query
  command: "balance?"
  params: []

- id: query_freq
  label: Query Digital Source Frequency
  kind: query
  command: "freq?"
  params: []

- id: query_dimmer
  label: Query Front Display Dimmer
  kind: query
  command: "dimmer?"
  params: []

- id: query_version
  label: Query Main CPU Software Version
  kind: query
  command: "version?"
  params: []

- id: query_ip
  label: Query IP Address
  kind: query
  command: "ip?"
  params: []

- id: query_mac
  label: Query MAC Address
  kind: query
  command: "mac?"
  params: []

- id: query_model
  label: Query Model Number
  kind: query
  command: "model?"
  params: []

- id: query_discover
  label: Discover Device On Network
  kind: query
  command: "discover?"
  params: []
```

## Feedbacks
```yaml
# Each query returns comma-separated 4-zone (z1,z2,z3,z4) state terminated with "$".
- id: power_state
  type: enum
  values: [on, standby]
  response_format: "power={on|standby}$"

- id: input_state
  type: enum
  values: [a, b, c, d]
  response_format: "input={a|b|c|d},{a|b|c|d},{a|b|c|d},{a|b|c|d}$"

- id: volume_state
  type: integer
  range: "00-96"
  response_format: "volume=##,##,##,##$"

- id: mute_state
  type: enum
  values: [on, off]
  response_format: "mute={on|off},{on|off},{on|off},{on|off}$"

- id: bass_state
  type: string
  range: "+01-10, -01-10, 000"
  response_format: "bass=###,###,###,###$"

- id: treble_state
  type: string
  range: "+01-10, -01-10, 000"
  response_format: "treble=###,###,###,###$"

- id: balance_state
  type: string
  range: "l01-10, r01-10, 000"
  response_format: "balance=###,###,###,###$"

- id: freq_state
  type: enum
  values: [none, "44.1", "48", "88.2", "96", "176.4", "192"]
  response_format: "freq={none|44.1|48|88.2|96|176.4|192},...$"

- id: dimmer_state
  type: integer
  range: "0-4"
  response_format: "dimmer={0|1|2|3|4}$"

- id: version_info
  type: string
  response_format: "version=#.##$"

- id: ip_address
  type: string
  response_format: "ip=###.###.###.###$"

- id: mac_address
  type: string
  response_format: "mac=############$"

- id: model_info
  type: string
  response_format: "model=text$"

- id: discover_info
  type: string
  response_format: "discover=ip=###.###.###.### port=#### mac=############$"

- id: update_mode
  type: enum
  values: [auto]
  response_format: "update_mode=auto$"
```

## Variables
```yaml
# Volume, bass, treble, balance, dimmer are settable continuous parameters
# represented as discrete actions above. No additional variables required.
```

## Events
```yaml
# When rs232_update_on command issued, device transmits unsolicited status
# updates on any state change (terminated with "$"). When OFF, no feedback
# unless polled.
- id: auto_status_update
  description: "Unsolicited status broadcast when RS232 update mode ON"
  trigger: "Any unit state change"
  enable_command: "rs232_update_on!"
  disable_command: "rs232_update_off!"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on
# sequencing requirements stated in source.
```

## Notes
- Dual transport: RS-232 (no flow control, 115200/8/N/1) and TCP port 9596. Command/response format identical across both.
- Source notes RS232 hardware does NOT support flow control — care needed to avoid packet loss.
- All commands terminate with literal `!`; no spaces, no CR/LF.
- All responses terminate with `$`.
- Zone prefix `z1:`/`z2:`/`z3:`/`z4:` optional. If omitted, applies to all zones. Responses always return all 4 zones comma-separated regardless.
- Source selection only effective if zone configured as "Matrix" via front panel setup. If zone locked to specific input via setup, source commands no-op for that zone.
<!-- UNRESOLVED: device power specifications, voltage, current not stated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: protocol version number not stated -->
<!-- UNRESOLVED: tone control valid range boundaries (e.g. min/max before clamp) not specified -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/C8%26C8%2B%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - https://www.rotel.com/products/c8
  - https://www.rotel.com/manuals-resources
retrieved_at: 2026-06-30T16:14:57.327Z
last_checked_at: 2026-07-07T12:29:48.958Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:29:48.958Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec commands match source tokens exactly; all transport parameters confirmed; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage/current/power specs not stated in source. Firmware version compatibility not stated."
- "no explicit multi-step sequences described in source"
- "no safety warnings, interlock procedures, or power-on"
- "device power specifications, voltage, current not stated in source"
- "firmware version compatibility range not stated"
- "protocol version number not stated"
- "tone control valid range boundaries (e.g. min/max before clamp) not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
