---
spec_id: admin/screen-innovations-troy2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Screen Innovations TRO.Y / 2 Control Spec"
manufacturer: "Screen Innovations"
model_family: "TRO.Y / 2"
aliases: []
compatible_with:
  manufacturers:
    - "Screen Innovations"
  models:
    - "TRO.Y / 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.screeninnovations.com
  - manualslib.com
source_urls:
  - "https://files.screeninnovations.com/Downloads/Programming%20Guides/Shade/troy-programming-guide.pdf"
  - https://www.manualslib.com/manual/3075025/Si-Tro-Y-2.html
retrieved_at: 2026-05-21T21:26:24.094Z
last_checked_at: 2026-05-31T21:02:41.117Z
generated_at: 2026-05-31T21:02:41.117Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "downstream device models (specific blind motor models) not enumerated in source"
  - "\"4800-56K\" range stated; specific rate not fixed in source"
  - "flow control not mentioned in source"
  - "Telnet username/password mentioned as configurable; no default stated"
  - "time-triggered or occurrence-triggered events exist per source;"
  - "source warns HTTP Get commands could cause damage if incorrect ASCII sent;"
  - "specific RS-485 baud rate not fixed in source"
  - "Telnet auth credentials not stated (username/password configurable but no defaults)"
  - "downstream device model list not enumerated"
verification:
  verdict: verified
  checked_at: 2026-05-31T21:02:41.117Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions map cleanly to source command documentation; transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Screen Innovations TRO.Y / 2 Control Spec

## Summary
TRO.Y / 2 is a system controller for Screen Innovations motorized blinds and accessories. Supports IP control via HTTP CGI and Telnet, plus RS-485 serial bus for downstream motor control. Commands: UP, DOWN, STOP, PRESET recall.

<!-- UNRESOLVED: downstream device models (specific blind motor models) not enumerated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial  # RS-485 bus
addressing:
  port: 23  # Telnet default; HTTP CGI uses port 80 implicitly
serial:
  baud_rate: null  # UNRESOLVED: "4800-56K" range stated; specific rate not fixed in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not mentioned in source
auth:
  type: null  # UNRESOLVED: Telnet username/password mentioned as configurable; no default stated
```

## Traits
```yaml
# Inferred from command set:
# - powerable: UP/DOWN/STOP commands present → motor movement control
# - routable: group targeting, preset targeting present
# - queryable: refresh/position query mentioned
# - levelable: % position preset commands present
```

## Actions
```yaml
- id: move_up
  label: Move Up
  kind: action
  params:
    - name: target
      type: string
      description: Motor, group, or super group target ID
- id: move_down
  label: Move Down
  kind: action
  params:
    - name: target
      type: string
      description: Motor, group, or super group target ID
- id: stop
  label: Stop
  kind: action
  params:
    - name: target
      type: string
      description: Motor, group, or super group target ID
- id: move_to_preset
  label: Move to Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-8)
    - name: target
      type: string
      description: Target device ID
- id: move_to_next_higher_preset
  label: Move to Next Higher Preset
  kind: action
  params:
    - name: target
      type: string
- id: move_to_next_lower_preset
  label: Move to Next Lower Preset
  kind: action
  params:
    - name: target
      type: string
- id: move_to_percent
  label: Move to %
  kind: action
  params:
    - name: percent
      type: integer
      description: Position percentage (0-100)
    - name: target
      type: string
- id: designate_target
  label: Designate Target
  kind: action
  params:
    - name: target
      type: string
- id: send_scene
  label: Send Scene
  kind: action
  params:
    - name: scene_id
      type: string
    - name: targets
      type: array
- id: trigger_event
  label: Trigger Event
  kind: action
  params:
    - name: event_id
      type: string
```

## Feedbacks
```yaml
- id: connection_status
  label: Connection Status
  type: enum
  values:
    - good
    - disabled
    - not_authenticated
    - performing_discovery
- id: motor_position
  label: Motor Position
  type: integer
  description: Current position reported by motor refresh
- id: rs485_device_status
  label: RS485 Device Online Status
  type: enum
  values:
    - online
    - offline
```

## Variables
```yaml
- id: upper_limit
  label: Upper Limit
  type: integer
  description: Upper travel limit (0-100%)
- id: lower_limit
  label: Lower Limit
  type: integer
  description: Lower travel limit (0-100%)
- id: preset_1
  label: Preset 1
  type: integer
- id: preset_2
  label: Preset 2
  type: integer
- id: preset_3
  label: Preset 3
  type: integer
- id: preset_4
  label: Preset 4
  type: integer
- id: preset_5
  label: Preset 5
  type: integer
- id: preset_6
  label: Preset 6
  type: integer
- id: preset_7
  label: Preset 7
  type: integer
- id: preset_8
  label: Preset 8
  type: integer
```

## Events
```yaml
# UNRESOLVED: time-triggered or occurrence-triggered events exist per source;
# schema not fully specified; event types/states not enumerated
```

## Macros
```yaml
- id: scene
  label: Scene
  description: Up to 8 commands + delay, or nested scene call
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source warns HTTP Get commands could cause damage if incorrect ASCII sent;
# no specific interlock procedure documented
```

## Notes
HTTP CGI endpoint format: `http://{ip}/troy.cgi?cmd=70&str1={nodeId}&str2={command}`
Valid str2 commands: "up", "down", "stop".
Default Telnet port: 23.
Default IP (link-local): 169.254.169.254.
MAC prefix: 70:B3:D5.
Zigbee motors: 6 second delay recommended between scene commands.
<!-- UNRESOLVED: specific RS-485 baud rate not fixed in source -->
<!-- UNRESOLVED: Telnet auth credentials not stated (username/password configurable but no defaults) -->
<!-- UNRESOLVED: downstream device model list not enumerated -->

## Provenance

```yaml
source_domains:
  - files.screeninnovations.com
  - manualslib.com
source_urls:
  - "https://files.screeninnovations.com/Downloads/Programming%20Guides/Shade/troy-programming-guide.pdf"
  - https://www.manualslib.com/manual/3075025/Si-Tro-Y-2.html
retrieved_at: 2026-05-21T21:26:24.094Z
last_checked_at: 2026-05-31T21:02:41.117Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:02:41.117Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions map cleanly to source command documentation; transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "downstream device models (specific blind motor models) not enumerated in source"
- "\"4800-56K\" range stated; specific rate not fixed in source"
- "flow control not mentioned in source"
- "Telnet username/password mentioned as configurable; no default stated"
- "time-triggered or occurrence-triggered events exist per source;"
- "source warns HTTP Get commands could cause damage if incorrect ASCII sent;"
- "specific RS-485 baud rate not fixed in source"
- "Telnet auth credentials not stated (username/password configurable but no defaults)"
- "downstream device model list not enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
