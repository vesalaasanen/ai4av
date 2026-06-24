---
spec_id: admin/converging-systems-e-node-2000-4000-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Converging Systems e-Node 2000/4000 Control Spec"
manufacturer: "Converging Systems"
model_family: "e-Node 2000"
aliases: []
compatible_with:
  manufacturers:
    - "Converging Systems"
    - "Converging Systems Inc."
  models:
    - "e-Node 2000"
    - "e-Node 4000"
    - "e-Node/dmx (MkIII)"
  firmware: "\"2.01.14\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/integration/amx_type_documentation_mst_v1_2.pdf
  - https://www.convergingsystems.com/bin/doc/integration/application_note_crestron.pdf
  - https://www.convergingsystems.com/inres_programmingdesignkit.htm
retrieved_at: 2026-05-27T19:35:58.986Z
last_checked_at: 2026-06-23T10:12:13.688Z
generated_at: 2026-06-23T10:12:13.688Z
firmware_coverage: "\"2.01.14\""
protocol_coverage: []
known_gaps:
  - "firmware version compatibility for all commands other than DMX wizard functionality not fully stated in source"
  - "no multi-step macro sequences described in source; remove or populate if found"
  - "additional safety or power-on sequencing requirements not stated in source"
  - "exact numeric ranges for SET,L / HUE,H / SAT_S / SEQRATE / DISSOLVE parameters not fully specified in source (beyond 0–255 for RGB/W and 0–255 for HSB implied by context)"
  - "UDP Port 4000/5000 command syntax not documented in source (mentioned in compatibility tables only)"
  - "Verbose Mode command syntax not documented in source"
  - "complete MOTOR.GOTO position value format/range not stated for IMC-100 or BRIC modes"
verification:
  verdict: verified
  checked_at: 2026-06-23T10:12:13.688Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 spec actions match source commands verbatim; transport TCP port 23 + credentials confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Converging Systems e-Node 2000/4000 Control Spec

## Summary

The Converging Systems e-Node is an Ethernet/IP gateway for CS-Bus LED lighting controllers and motor controllers. It accepts ASCII commands over a Telnet (TCP port 23) connection and forwards them to attached CS-Bus devices using the Zone/Group/Node (Z/G/N) addressing scheme. Up to 4 automation systems can connect simultaneously via separate IP sockets. This spec covers the ASCII command protocol for LED lighting control, motor control, and bi-directional feedback as documented in the AMX NetLinx Interface Guide.

<!-- UNRESOLVED: firmware version compatibility for all commands other than DMX wizard functionality not fully stated in source -->

## Transport

```yaml
protocols:
  - tcp
addressing:
  port: 23
auth:
  type: credentials  # Telnet Login ID and Password required when LOGIN=ENABLE; default Login 1 / Password 1 (cap first letter, space before number). Login can be disabled (LOGIN=DISABLE).
```

## Traits

```yaml
- levelable       # inferred from brightness/hue/saturation/color level commands
- queryable       # inferred from COLOR=? and VALUE=? query commands
```

## Actions

```yaml
# Zone/Group/Node (Z/G/N) addressing: each command targets Z.G.N where 0 = wildcard.
# Command format: #Z.G.N.LED.<COMMAND>:<cr>  or  #Z.G.N.MOTOR.<COMMAND>:<cr>
# The <cr> carriage return terminates each command.
#
# LED COMMANDS
#
- id: led_on
  label: LED On
  kind: action
  command: "#Z.G.N.LED.ON"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_off
  label: LED Off
  kind: action
  command: "#Z.G.N.LED.OFF"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_effect
  label: LED Effect
  kind: action
  command: "#Z.G.N.LED.EFFECT,{n}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: n
      type: integer
      description: Effect number

- id: led_store
  label: LED Store Preset
  kind: action
  command: "#Z.G.N.LED.STORE,{preset}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: preset
      type: integer
      description: Preset number (1-24)

- id: led_recall
  label: LED Recall Preset
  kind: action
  command: "#Z.G.N.LED.RECALL,{preset}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: preset
      type: integer
      description: Preset number (1-24)

- id: led_dissolve_1
  label: LED Dissolve Rate 1
  kind: action
  command: "#Z.G.N.LED.DISSOLVE.1={XX}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: XX
      type: integer
      description: Dissolve rate value

- id: led_dissolve_2
  label: LED Dissolve Rate 2
  kind: action
  command: "#Z.G.N.LED.DISSOLVE.2={XX}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: XX
      type: integer
      description: Dissolve rate value

- id: led_dissolve_3
  label: LED Dissolve Rate 3
  kind: action
  command: "#Z.G.N.LED.DISSOLVE.3={XX}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: XX
      type: integer
      description: Dissolve rate value

- id: led_dissolve_5
  label: LED Dissolve Rate 5
  kind: action
  command: "#Z.G.N.LED.DISSOLVE.5={XX}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: XX
      type: integer
      description: Dissolve rate value

- id: led_seqrate
  label: LED Sequence Rate
  kind: action
  command: "#Z.G.N.LED.SEQRATE={XX}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: XX
      type: integer
      description: Sequence rate value

- id: led_sun_up
  label: LED Circadian Sun Up
  kind: action
  command: "#Z.G.N.LED.SUN_UP"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_sun_down
  label: LED Circadian Sun Down
  kind: action
  command: "#Z.G.N.LED.SUN_DOWN"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_sun_s
  label: LED Circadian Sun Set
  kind: action
  command: "#Z.G.N.LED.SUN.S"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_fade_up
  label: LED Fade Up (Brightness)
  kind: action
  command: "#Z.G.N.LED.FADE_UP"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_fade_down
  label: LED Fade Down (Brightness)
  kind: action
  command: "#Z.G.N.LED.FADE_DOWN"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_set_brightness
  label: LED Set Brightness Level
  kind: action
  command: "#Z.G.N.LED.SET,{L}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: L
      type: integer
      description: Brightness level value

- id: led_hue_up
  label: LED Hue Up
  kind: action
  command: "#Z.G.N.LED.HUE_UP"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_hue_down
  label: LED Hue Down
  kind: action
  command: "#Z.G.N.LED.HUE_DOWN"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_set_hue
  label: LED Set Hue
  kind: action
  command: "#Z.G.N.LED.HUE,{H}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: H
      type: integer
      description: Hue value

- id: led_sat_up
  label: LED Saturation Up
  kind: action
  command: "#Z.G.N.LED.SAT_UP"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_sat_down
  label: LED Saturation Down
  kind: action
  command: "#Z.G.N.LED.SAT_DOWN"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_set_saturation
  label: LED Set Saturation
  kind: action
  command: "#Z.G.N.LED.SAT_S"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_stop_hsb
  label: LED Stop (HSB mode)
  kind: action
  command: "#Z.G.N.LED.STOP"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_set_color_hsl
  label: LED Set Color (HSL)
  kind: action
  command: "#Z.G.N.LED.COLOR={H}.{S}.{L}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: H
      type: integer
      description: Hue value
    - name: S
      type: integer
      description: Saturation value
    - name: L
      type: integer
      description: Lightness/Brightness value

- id: led_preset_hls_set
  label: LED Set Preset (HLS Color Space)
  kind: action
  command: "#Z.G.N.LED.PRESETH.{X}={H}.{S}.{L}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: X
      type: integer
      description: Preset slot number
    - name: H
      type: integer
      description: Hue value (0-255)
    - name: S
      type: integer
      description: Saturation value (0-255)
    - name: L
      type: integer
      description: Lightness value (0-255)

- id: led_set_red
  label: LED Set Red Level
  kind: action
  command: "#Z.G.N.LED.RED,{R}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: R
      type: integer
      description: Red level value

- id: led_set_green
  label: LED Set Green Level
  kind: action
  command: "#Z.G.N.LED.GREEN,{G}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: Gval
      type: integer
      description: Green level value

- id: led_set_blue
  label: LED Set Blue Level
  kind: action
  command: "#Z.G.N.LED.BLUE,{B}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: B
      type: integer
      description: Blue level value

- id: led_set_value_rgb
  label: LED Set Value (RGB)
  kind: action
  command: "#Z.G.N.LED.VALUE={R}.{G}.{B}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: R
      type: integer
      description: Red value (0-255)
    - name: Gval
      type: integer
      description: Green value (0-255)
    - name: B
      type: integer
      description: Blue value (0-255)

- id: led_set_white
  label: LED Set White Level
  kind: action
  command: "#Z.G.N.LED.WHITE,{W}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: W
      type: integer
      description: White level value

- id: led_set_rgb
  label: LED Set RGB Color
  kind: action
  command: "#Z.G.N.LED.RGB,{R}.{G}.{B}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: R
      type: integer
      description: Red value (0-255)
    - name: Gval
      type: integer
      description: Green value (0-255)
    - name: B
      type: integer
      description: Blue value (0-255)

- id: led_set_rgbw
  label: LED Set RGBW Color
  kind: action
  command: "#Z.G.N.LED.RGBW,{R}.{G}.{B}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: R
      type: integer
      description: Red value (0-255)
    - name: Gval
      type: integer
      description: Green value (0-255)
    - name: B
      type: integer
      description: Blue value (0-255)

- id: led_preset_rgb_set
  label: LED Set Preset (RGB Color Space, 3-color)
  kind: action
  command: "#Z.G.N.LED.PRESET.{X}={R}.{G}.{B}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: X
      type: integer
      description: Preset slot number
    - name: R
      type: integer
      description: Red value (0-255)
    - name: Gval
      type: integer
      description: Green value (0-255)
    - name: B
      type: integer
      description: Blue value (0-255)

- id: led_preset_rgbw_set
  label: LED Set Preset (RGBW Color Space, 4-color)
  kind: action
  command: "#Z.G.N.LED.PRESET.{X}={R}.{G}.{B}.{W}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: X
      type: integer
      description: Preset slot number
    - name: R
      type: integer
      description: Red value (0-255)
    - name: Gval
      type: integer
      description: Green value (0-255)
    - name: B
      type: integer
      description: Blue value (0-255)
    - name: W
      type: integer
      description: White value (0-255)

- id: led_stop_rgb
  label: LED Stop (RGB mode)
  kind: action
  command: "#Z.G.N.LED.STOP"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_cct_set
  label: LED Set Correlated Color Temperature
  kind: action
  command: "#Z.G.N.LED.CCT,{XXXX}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: XXXX
      type: integer
      description: Color temperature value (Kelvin)

- id: led_cct_up
  label: LED CCT Up
  kind: action
  command: "#Z.G.N.LED.CCT_UP"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_cct_down
  label: LED CCT Down
  kind: action
  command: "#Z.G.N.LED.CCT_DOWN"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

# LED BI-DIRECTIONAL QUERY COMMANDS

- id: led_query_color
  label: LED Query Color (HSB)
  kind: query
  command: "#Z.G.N.LED.COLOR=?"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_query_value
  label: LED Query Value (RGB)
  kind: query
  command: "#Z.G.N.LED.VALUE=?"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: led_query_preseth
  label: LED Query Preset HLS
  kind: query
  command: "#Z.G.N.LED.PRESETH.{X}=?"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: X
      type: integer
      description: Preset slot number

- id: led_query_preset
  label: LED Query Preset RGB
  kind: query
  command: "#Z.G.N.LED.PRESET.{X}=?"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: X
      type: integer
      description: Preset slot number

# MOTOR COMMANDS

- id: motor_goto
  label: Motor Go To Position
  kind: action
  command: "#Z.G.N.MOTOR.GOTO"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: motor_up
  label: Motor Up
  kind: action
  command: "#Z.G.N.MOTOR=UP"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: motor_down
  label: Motor Down
  kind: action
  command: "#Z.G.N.MOTOR=DOWN"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: motor_stop
  label: Motor Stop
  kind: action
  command: "#Z.G.N.MOTOR=STOP"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: motor_right
  label: Motor Right
  kind: action
  command: "#Z.G.N.MOTOR=RIGHT"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: motor_left
  label: Motor Left
  kind: action
  command: "#Z.G.N.MOTOR=LEFT"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: motor_retract
  label: Motor Retract
  kind: action
  command: "#Z.G.N.MOTOR=RETRACT"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: motor_toggle
  label: Motor Toggle
  kind: action
  command: "#Z.G.N.MOTOR=TOGGLE"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

- id: motor_store
  label: Motor Store Preset
  kind: action
  command: "#Z.G.N.MOTOR.STORE,{preset}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: preset
      type: integer
      description: Preset number (1-24)

- id: motor_recall
  label: Motor Recall Preset
  kind: action
  command: "#Z.G.N.MOTOR.RECALL,{preset}"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)
    - name: preset
      type: integer
      description: Preset number (1-24)

- id: motor_query_position
  label: Motor Query Position
  kind: query
  command: "#Z.G.N.MOTOR.POSITION=?"
  params:
    - name: Z
      type: integer
      description: Zone address (1-254, or 0 for wildcard)
    - name: G
      type: integer
      description: Group address (1-254, or 0 for wildcard)
    - name: N
      type: integer
      description: Node address (1-254, or 0 for wildcard)

# e-Node SETUP / CONFIGURATION COMMANDS

- id: enodecfg_set_notify_color
  label: Set NOTIFY to COLOR (HSB feedback)
  kind: action
  command: "NOTIFY=COLOR"
  params: []

- id: enodecfg_set_notify_value
  label: Set NOTIFY to VALUE (RGB feedback)
  kind: action
  command: "NOTIFY=VALUE"
  params: []

- id: enodecfg_set_notify_both
  label: Set NOTIFY to BOTH (HSB and RGB feedback)
  kind: action
  command: "NOTIFY=BOTH"
  params: []

- id: enodecfg_set_notify_off
  label: Set NOTIFY to OFF (no bi-directional feedback)
  kind: action
  command: "NOTIFY=OFF"
  params: []

- id: enodecfg_set_static_ip
  label: Set e-Node Static IP Address
  kind: action
  command: "STATIC_IP={xxx.xxx.xxx.xxx}"
  params:
    - name: address
      type: string
      description: New static IP address (dotted-decimal notation)

- id: enodecfg_set_gateway
  label: Set e-Node Gateway Address
  kind: action
  command: "GATEWAY_ADD={xxx.xxx.xxx.xxx}"
  params:
    - name: address
      type: string
      description: Network gateway address (dotted-decimal notation)

- id: enodecfg_dhcp_disable
  label: Disable DHCP (activate static IP)
  kind: action
  command: "DHCP=DISABLE"
  params: []
  # NOTE: Must be set only AFTER STATIC_IP and GATEWAY_ADD; reboot required after.

- id: enodecfg_server_enable
  label: Enable Telnet Server
  kind: action
  command: "SERVER=ENABLE"
  params: []

- id: enodecfg_login_enable
  label: Enable Telnet Login Authentication
  kind: action
  command: "LOGIN=ENABLE"
  params: []
```

## Feedbacks

```yaml
- id: led_color_feedback
  type: string
  description: "HSB color state broadcast from CS-Bus LED controller when NOTIFY=COLOR or NOTIFY=BOTH. Format: !Z.G.N.LED.COLOR=H.S.B (prefix ! = message from CS-Bus device)"
  example: "!2.1.1.LED.COLOR=240.255.255"

- id: led_value_feedback
  type: string
  description: "RGB color state broadcast from CS-Bus LED controller when NOTIFY=VALUE or NOTIFY=BOTH. Format: !Z.G.N.LED.VALUE=R.G.B (prefix ! = message from CS-Bus device)"
  example: "!2.1.1.LED.VALUE=240.0.0"

- id: motor_position_feedback
  type: string
  description: "Motor position feedback broadcast automatically from BRIC II (IMC-300MKII) controllers. Format: !Z.G.N.MOTOR.POSITION=<value>"
  example: "!1.1.1.MOTOR.POSITION=50"

- id: wildcard_feedback_remapping
  type: string
  description: "When a wildcard/group command is sent (node=0), only the controller with node=1 responds on behalf of the group; its response is remapped to the wildcard address. The ! prefix indicates a CS-Bus device message."
  example: "Sent: #2.1.0.LED.VALUE=240.0.0  Response: !2.1.1.LED.VALUE=240.0.0"
```

## Variables

```yaml
- id: notify_mode
  label: NOTIFY Mode
  type: enum
  values: [COLOR, VALUE, BOTH, OFF]
  description: "Controls what color state data the controller automatically broadcasts on state changes. COLOR=HSB, VALUE=RGB, BOTH=HSB+RGB, OFF=no feedback."

- id: zgn_address
  label: Zone/Group/Node Address
  type: string
  description: "Each CS-Bus controller's unique address expressed as Z.G.N (e.g. 2.1.1). Range: 1-254 per field. Node=0 is wildcard. Factory default lighting: 2.1.0; motor: 1.1.0."
```

## Events

```yaml
- id: led_color_state_change
  label: LED Color State Change (unsolicited)
  description: "When a CS-Bus controller's color changes and its NOTIFY flag is set, it broadcasts its new color state unprompted. Only controllers with a unique non-zero ZGN address provide feedback. Prefix: ! (exclamation mark)."

- id: motor_position_change
  label: Motor Position Change (unsolicited)
  description: "BRIC II (IMC-300MKII) motor controllers automatically report POSITION=? feedback. IMC-100 GOTO command provides no feedback."
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences described in source; remove or populate if found
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: "Static IP configuration order is mandatory: set STATIC_IP first, then GATEWAY_ADD, then set DHCP=DISABLE. Reversing the order may result in loss of connectivity. Reboot e-Node after setting DHCP=DISABLE."
# UNRESOLVED: additional safety or power-on sequencing requirements not stated in source
```

## Notes

- Commands are terminated with a carriage return `<cr>`. The command format is `#Z.G.N.LED.<COMMAND>` or `#Z.G.N.MOTOR.<COMMAND>`.
- All feedback messages from CS-Bus devices are prefixed with `!` (exclamation mark). Messages from automation controllers use `#`.
- ZGN address fields must use **periods** as separators (not commas). Example: `2.1.1` not `2,1,1`.
- The e-Node supports 4 simultaneous IP socket connections. Each socket uses a separate Username/Password combination.
- Wildcard addressing: a `0` in any Z/G/N field triggers all controllers with a non-zero value in that position. Controllers addressed `x.x.0` (node=wildcard) do not provide bi-directional feedback.
- For wildcard group commands, only the controller with node=1 replies on behalf of the group, and its response is remapped to the wildcard address.
- Default Telnet credentials: Login 1 / Password 1 (capital first letter, space before number). Must match settings in the e-Node configuration.
- The `NOTIFY=BOTH` option (added in ILC-100 firmware V3.14) may increase bus traffic on large networks.
- e-Node/dmx (MkIII) firmware v2.01.14 or later is required for Web Pilot DMX wizard functionality.
- Motor GOTO command on IMC-100 provides no feedback; BRIC/BRIC II controllers do support feedback for GOTO.
- The maximum number of LED+Motor devices in the default AMX driver module is 40 (configurable up to 60).
- DMX channel assignment options for e-Node/dmx fixtures: RED, GREEN, BLUE, WHITE, MONO, FULL, OFF. FULL uses e-Node/dmx HUE ACCURATE DIMMING for simple dimming channels.
- The `STOP` command appears in both HSB and RGB command groups in the source; both map to the same wire command `#Z.G.N.LED.STOP`.

<!-- UNRESOLVED: exact numeric ranges for SET,L / HUE,H / SAT_S / SEQRATE / DISSOLVE parameters not fully specified in source (beyond 0–255 for RGB/W and 0–255 for HSB implied by context) -->
<!-- UNRESOLVED: UDP Port 4000/5000 command syntax not documented in source (mentioned in compatibility tables only) -->
<!-- UNRESOLVED: Verbose Mode command syntax not documented in source -->
<!-- UNRESOLVED: complete MOTOR.GOTO position value format/range not stated for IMC-100 or BRIC modes -->

## Provenance

```yaml
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/integration/amx_type_documentation_mst_v1_2.pdf
  - https://www.convergingsystems.com/bin/doc/integration/application_note_crestron.pdf
  - https://www.convergingsystems.com/inres_programmingdesignkit.htm
retrieved_at: 2026-05-27T19:35:58.986Z
last_checked_at: 2026-06-23T10:12:13.688Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T10:12:13.688Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 spec actions match source commands verbatim; transport TCP port 23 + credentials confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility for all commands other than DMX wizard functionality not fully stated in source"
- "no multi-step macro sequences described in source; remove or populate if found"
- "additional safety or power-on sequencing requirements not stated in source"
- "exact numeric ranges for SET,L / HUE,H / SAT_S / SEQRATE / DISSOLVE parameters not fully specified in source (beyond 0–255 for RGB/W and 0–255 for HSB implied by context)"
- "UDP Port 4000/5000 command syntax not documented in source (mentioned in compatibility tables only)"
- "Verbose Mode command syntax not documented in source"
- "complete MOTOR.GOTO position value format/range not stated for IMC-100 or BRIC modes"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
