---
spec_id: admin/converging-systems-ibt100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Converging Systems Inc. IBT-100 Control Spec"
manufacturer: "Converging Systems"
model_family: IBT-100sfs
aliases: []
compatible_with:
  manufacturers:
    - "Converging Systems"
    - "Converging Systems Inc."
  models:
    - IBT-100sfs
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
source_urls:
  - http://www.convergingsystems.com/bin/doc/ibt/serial_udp_v1_4.pdf
  - http://www.convergingsystems.com/bin/doc/ibt/ibt_manual_0105.pdf
retrieved_at: 2026-05-21T09:15:44.261Z
last_checked_at: 2026-06-03T06:32:00.804Z
generated_at: 2026-06-03T06:32:00.804Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IBT-100 is a bus translator — actual controlled devices (IMC-100T, ILC-100x) are documented separately. This spec covers the IBT-100 as the transport gateway only."
  - "RS-232 pinout / connector type not stated"
  - "eNode IP addressing scheme not documented here"
  - "IBT-100 native UDP port not stated"
  - "no persistent parameter storage documented for IBT-100 itself"
  - "no unsolicited event notifications documented for CS-Bus protocol"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "IBT-100 firmware version compatibility not stated"
  - "RS-232 connector pinout not stated"
  - "UDP port for IBT-100 native Ethernet interface not stated — eNode ports (5000/4000) are for the adapter, not IBT-100 itself"
verification:
  verdict: verified
  checked_at: 2026-06-03T06:32:00.804Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 actions found and matched in source (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Converging Systems Inc. IBT-100 Control Spec

## Summary
CS-Bus gateway translator supporting dual transport: RS-232-C serial and UDP over Ethernet via eNode adapter. Controls IMC-100T motor controllers and ILC-100x LED controllers via Z.G.N (Zone/Group/Node) addressing scheme. Commands are ASCII-based, dot-delimited, semicolon-terminated.

<!-- UNRESOLVED: IBT-100 is a bus translator — actual controlled devices (IMC-100T, ILC-100x) are documented separately. This spec covers the IBT-100 as the transport gateway only. -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none  # source states N parity (none = no parity)
  stop_bits: 1
  flow_control: none
  # UNRESOLVED: RS-232 pinout / connector type not stated
addressing:
  # UDP only - eNode IP assigned via DHCP or static; no port stated for IBT-100 itself
  # UNRESOLVED: eNode IP addressing scheme not documented here
udp:
  # Source states eNode UDP ports, not IBT-100 directly:
  # UNRESOLVED: IBT-100 native UDP port not stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Supported by evidence from command table:
- powerable       # STOP command present for motor and LED
- routable        # Z.G.N addressing provides broadcast/unicast routing
- levelable       # LED SET, SAT, HUE with 0-240 range; FADE_UP/DOWN
- queryable       # Q=QY returns device info
```

## Actions
```yaml
# Motor Control - Function: A or MOTOR
- id: motor_down
  label: Motor Down
  kind: action
  params: []
  description: "Command port to send motor DOWN"
  examples:
    - "#1.1.1.MOTOR=DOWN;"

- id: motor_up
  label: Motor Up
  kind: action
  params: []
  description: "Command port to send motor UP"
  examples:
    - "#1.1.1.MOTOR=UP;"

- id: motor_stop
  label: Motor Stop
  kind: action
  params: []
  description: "Command port to STOP motor"
  examples:
    - "#1.1.1.MOTOR=STOP;"

# LED Control (external load) - Function: L or LED
- id: led_on
  label: LED On
  kind: action
  params: []
  description: "Turns LED on to full on, or value when OFF was issued"

- id: led_off
  label: LED Off
  kind: action
  params: []
  description: "Turns LED off"

- id: led_fade_up
  label: LED Fade Up
  kind: action
  params: []
  description: "Fades brightness up continuously until STOP"

- id: led_fade_down
  label: LED Fade Down
  kind: action
  params: []
  description: "Fades brightness down continuously until STOP"

- id: led_sat_up
  label: LED Saturation Up
  kind: action
  params: []
  description: "Increases saturation (less color-more white) continuously until STOP"

- id: led_sat_down
  label: LED Saturation Down
  kind: action
  params: []
  description: "Decreases saturation (more color-less white) continuously until STOP"

- id: led_hue_up
  label: LED Hue Up
  kind: action
  params: []
  description: "Shifts hue red>yellow>green>cyan>blue>magenta continuously until STOP"

- id: led_hue_down
  label: LED Hue Down
  kind: action
  params: []
  description: "Shifts hue magenta>blue>cyan>green>yellow>red continuously until STOP"

- id: led_stop
  label: LED Stop
  kind: action
  params: []
  description: "Stops any Fades, Sat, Hue actions"

- id: led_set
  label: LED Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: 0-240
      description: "Brightness value 0-240. Example: SET,240"
  examples:
    - "#2.1.1.LED=SET,240;"

- id: led_sat_set
  label: LED Set Saturation
  kind: action
  params:
    - name: value
      type: integer
      range: 0-240
      description: "Saturation value 0-240"
  examples:
    - "#2.1.1.LED=SAT,240;"

- id: led_hue_set
  label: LED Set Hue
  kind: action
  params:
    - name: value
      type: integer
      range: 0-240
      description: "Hue value 0-240. 0=red, 80=green, 160=blue (HSL color space only)"
  examples:
    - "#2.1.1.LED=HUE,240;"

- id: led_store
  label: LED Store Preset
  kind: action
  params:
    - name: preset
      type: integer
      range: 1-6
      description: "Preset slot number"
  examples:
    - "#0.0.0.LED=STORE,4;"

- id: led_recall
  label: LED Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      range: 1-6
      description: "Preset slot number to recall"
  examples:
    - "#0.0.0.LED=RECALL,1;"

- id: led_effect
  label: LED Effect
  kind: action
  params: []
  description: "Cycles through first eight preset colors"

# On-board LED (IMC-100x) - Function: L or LED (on-board indicator)
- id: led_indicator_on
  label: LED Indicator On
  kind: action
  params: []
  description: "Turns on-board amber LED to full ON"

- id: led_indicator_off
  label: LED Indicator Off
  kind: action
  params: []
  description: "Turns on-board amber LED to full OFF"

- id: led_indicator_flash
  label: LED Indicator Flash
  kind: action
  params: []
  description: "Repeatedly flashes on-board amber LED"
```

## Feedbacks
```yaml
- id: command_echo
  type: string
  description: "Valid commands are echoed back. Invalid commands return '*' followed by partial command."

- id: device_info
  type: string
  description: "Response to Q=QY query. IMC-100 returns '99', ILC-100 returns '48'. Only responds to non-wildcard Z.G.N address."
  example: "#2.1.1.Q=QY; → 99 (for IMC-100)"
```

## Variables
```yaml
# UNRESOLVED: no persistent parameter storage documented for IBT-100 itself
# LED parameters (brightness/sat/hue) are stored on target devices via STORE command
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented for CS-Bus protocol
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Command Syntax Reference
```yaml
# Z.G.N format: #Z.G.N.FUNCTION=COMMAND,data;
# Wildcard: #0.0.0.FUNCTION=COMMAND; (broadcast to all devices)
# Wildcard constraints: Q=QY does not respond to wildcard addresses
addressing:
  zones: 0-255   # 0 = broadcast
  groups: 0-255  # 0 = broadcast
  nodes: 0-255   # 0 = broadcast
terminator: ";"
required_prefix: "#"
```

## Notes
- Serial: 57600 baud, 8N1, no flow control — stated explicitly in source.
- UDP requires eNode adapter; eNode ports are 5000 (TX) and 4000 (RX) — not the IBT-100 itself.
- Command echo behavior: valid → echo back; invalid → "*" + partial command.
- Q=QY does not respond to wildcard address — requires specific Z.G.N.
- LED SET/SAT/HUE accept 0-240 range; source shows syntax `SET,240` (comma, no space).
- Continuous actions (FADE_UP, FADE_DOWN, HUE_UP, HUE_DOWN, SAT_UP, SAT_DOWN) ramp until STOP issued.
- Source: "Third-Party CS-Bus Programmer's Guide - ZGN Commands" Rev 1.4, Oct 2, 2009.
<!-- UNRESOLVED: IBT-100 firmware version compatibility not stated -->
<!-- UNRESOLVED: RS-232 connector pinout not stated -->
<!-- UNRESOLVED: UDP port for IBT-100 native Ethernet interface not stated — eNode ports (5000/4000) are for the adapter, not IBT-100 itself -->

## Provenance

```yaml
source_domains:
  - convergingsystems.com
source_urls:
  - http://www.convergingsystems.com/bin/doc/ibt/serial_udp_v1_4.pdf
  - http://www.convergingsystems.com/bin/doc/ibt/ibt_manual_0105.pdf
retrieved_at: 2026-05-21T09:15:44.261Z
last_checked_at: 2026-06-03T06:32:00.804Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T06:32:00.804Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 actions found and matched in source (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IBT-100 is a bus translator — actual controlled devices (IMC-100T, ILC-100x) are documented separately. This spec covers the IBT-100 as the transport gateway only."
- "RS-232 pinout / connector type not stated"
- "eNode IP addressing scheme not documented here"
- "IBT-100 native UDP port not stated"
- "no persistent parameter storage documented for IBT-100 itself"
- "no unsolicited event notifications documented for CS-Bus protocol"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "IBT-100 firmware version compatibility not stated"
- "RS-232 connector pinout not stated"
- "UDP port for IBT-100 native Ethernet interface not stated — eNode ports (5000/4000) are for the adapter, not IBT-100 itself"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
