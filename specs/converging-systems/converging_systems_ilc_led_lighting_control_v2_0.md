---
spec_id: admin/converging-systems-ilc-led-lighting-control-v2_0
schema_version: ai4av-public-spec-v1
revision: 1
title: "Converging Systems ILC LED Lighting Control Spec"
manufacturer: "Converging Systems"
model_family: ILC-100x
aliases: []
compatible_with:
  manufacturers:
    - "Converging Systems"
  models:
    - ILC-100x
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/ibt/serial_udp_v1_4.pdf
retrieved_at: 2026-04-30T04:26:25.869Z
last_checked_at: 2026-06-03T06:35:42.213Z
generated_at: 2026-06-03T06:35:42.213Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "eNode adapter required for Ethernet control — standalone IP control not available"
  - "no explicit query commands for current brightness/hue/sat values found in source"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "UDP port 5000/4000 stated for eNode but no mention of default eNode IP or DHCP behavior"
verification:
  verdict: verified
  checked_at: 2026-06-03T06:35:42.213Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 actions found with matching parameters (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Converging Systems ILC LED Lighting Control Spec

## Summary
LED lighting controller supporting RS-232-C serial and UDP over Ethernet control via the CS-Bus protocol. Commands use a Z.G.N (zone/group/node) addressing scheme for targeted or broadcast control of LED brightness, saturation, hue, and preset recall. The ILC-100x is the applicable model family.

<!-- UNRESOLVED: eNode adapter required for Ethernet control — standalone IP control not available -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  base_url: ""  # N/A for serial-only commands; UDP uses eNode IP
udp:
  send_port: 5000
  recv_port: 4000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred: LED ON/OFF commands present
- routable    # inferred: Z.G.N addressing scheme for targeted control
- queryable   # inferred: Q=QY query command returns device info
- levelable   # inferred: SET, FADE_UP, FADE_DOWN, SAT, HUE commands
```

## Actions
```yaml
- id: motor_down
  label: Motor Down
  kind: action
  params: []
  applicability:
    - IMC-100T
    - ILC-100x

- id: motor_up
  label: Motor Up
  kind: action
  params: []
  applicability:
    - IMC-100T
    - ILC-100x

- id: motor_stop
  label: Motor Stop
  kind: action
  params: []
  applicability:
    - IMC-100T
    - ILC-100x

- id: led_on
  label: LED On
  kind: action
  params: []
  description: Turns LED on to full on, or value when OFF was issued

- id: led_off
  label: LED Off
  kind: action
  params: []

- id: led_fade_up
  label: LED Fade Up
  kind: action
  params: []
  description: Fades brightness up continuously until STOP

- id: led_fade_down
  label: LED Fade Down
  kind: action
  params: []
  description: Fades brightness down continuously until STOP

- id: led_sat_up
  label: LED Saturation Up
  kind: action
  params: []
  description: Increases saturation (more color-less white) continuously until STOP

- id: led_sat_down
  label: LED Saturation Down
  kind: action
  params: []
  description: Decreases saturation (less color-more white) continuously until STOP

- id: led_hue_up
  label: LED Hue Up
  kind: action
  params: []
  description: Shifts hue red>yellow>green>cyan>blue>magenta continuously until STOP

- id: led_hue_down
  label: LED Hue Down
  kind: action
  params: []
  description: Shifts hue magenta>blue>cyan>green>yellow>red continuously until STOP

- id: led_stop
  label: LED Stop
  kind: action
  params: []
  description: Stops any Fades, Sat, Hue actions

- id: led_set
  label: LED Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness value 0-240
      range: 0-240

- id: led_sat
  label: LED Set Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Saturation value 0-240
      range: 0-240

- id: led_hue
  label: LED Set Hue
  kind: action
  params:
    - name: value
      type: integer
      description: Hue value 0-240. In HSL color space, 0=red, 80=green, 160=blue
      range: 0-240

- id: led_store
  label: LED Store Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-6
      range: 1-6

- id: led_recall
  label: LED Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-6
      range: 1-6

- id: led_effect
  label: LED Effect
  kind: action
  params: []
  description: Cycles through first eight preset colors

- id: led_flash
  label: LED Flash
  kind: action
  params: []
  description: Repeatedly flashes on-board amber LED (IMC-100x on-board indicator only)
```

## Feedbacks
```yaml
- id: command_echo
  type: string
  description: Valid commands are echoed back. Invalid commands return "*" followed by partial command.

- id: device_info_response
  type: string
  description: Response to Q=QY query. IMC-100 returns "99", ILC-100 returns "48".

- id: led_state_response
  type: enum
  values: [on, off]
  description: LED state feedback via echo
```

## Variables
```yaml
# UNRESOLVED: no explicit query commands for current brightness/hue/sat values found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands are ASCII text strings ending with `;` followed by a return character
- Z.G.N addressing: Z=zone (0=broadcast, 1-255), G=group (0=broadcast, 1-255), N=node (0=broadcast, 1-255)
- Wildcard address `#0.0.0.P=CC;` addresses all units on the bus
- Continuous ramping commands (FADE_UP, FADE_DOWN, SAT_UP, SAT_DOWN, HUE_UP, HUE_DOWN) require STOP command to halt
- eNode Ethernet adapter required for UDP control; RS-232-C uses IBT-100sfs translator
- Source numbers auto-concatenated by interface device for troubleshooting (1=IR, 2=keypads, 4=photosensor, 5-8=eNode/IBT-100sfs)
<!-- UNRESOLVED: UDP port 5000/4000 stated for eNode but no mention of default eNode IP or DHCP behavior -->

## Provenance

```yaml
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/ibt/serial_udp_v1_4.pdf
retrieved_at: 2026-04-30T04:26:25.869Z
last_checked_at: 2026-06-03T06:35:42.213Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T06:35:42.213Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 actions found with matching parameters (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "eNode adapter required for Ethernet control — standalone IP control not available"
- "no explicit query commands for current brightness/hue/sat values found in source"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "UDP port 5000/4000 stated for eNode but no mention of default eNode IP or DHCP behavior"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
