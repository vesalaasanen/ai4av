---
spec_id: admin/converging-systems-imc-motor-control-v2_0
schema_version: ai4av-public-spec-v1
revision: 1
title: "Converging Systems IMC Motor Control Spec"
manufacturer: "Converging Systems"
model_family: IMC-100
aliases: []
compatible_with:
  manufacturers:
    - "Converging Systems"
  models:
    - IMC-100
    - "BRIC (Bric Mode)"
    - "BRIC II (IMC-300MKII)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/integration/amx_type_documentation_mst_v1_2.pdf
retrieved_at: 2026-04-30T04:26:27.627Z
last_checked_at: 2026-04-22T22:08:38.883Z
generated_at: 2026-04-22T22:08:38.883Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-22T22:08:38.883Z
  matched_actions: 47
  action_count: 47
  confidence: high
  summary: "All 47 spec actions matched literally against source tables. Transport parameters verified verbatim. Spec fully represents source command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Converging Systems IMC Motor Control Spec

## Summary
AMX Netlinx Interface Guide for Converging Systems e-Node and CS-BUS compatible LED and motor controllers. Supports TCP (Telnet port 23), UDP (ports 4000/5000), and RS-232 via IBT-100 adapter. Addressing uses Z.G.N format (Zone.Group.Node) with wildcard support.

<!-- UNRESOLVED: serial baud rate/port config not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - serial
addressing:
  port: 23  # Telnet
udp:
  ports:
    - 4000
    - 5000
serial:
  adapter: IBT-100 (DB-9 to RJ-25)
auth:
  type: null  # UNRESOLVED: auth is configurable (enable/disable) in e-Node Pilot; default state not stated
# UNRESOLVED: serial baud rate, data bits, parity, stop bits not stated in source
```

## Addressing
```yaml
format: Z.G.N (Zone.Group.Node)
zone_range: [1, 254]
group_range: [1, 254]
node_range: [1, 254]
wildcard: 0  # transmits to all controllers matching non-zero values
factory_defaults:
  led: Zone=2, Group=1, Node=undefined(0)
  motor: Zone=1, Group=1, Node=undefined(0)
max_controllers_per_enode: 254
```

## Traits
```yaml
- powerable   # inferred: ON/OFF commands present
- routable    # inferred: STORE/RECALL preset commands present
- queryable   # inferred: COLOR=?, VALUE=?, POSITION=? query commands present
- levelable   # inferred: motor GOTO, FADE_UP/DOWN, HUE_UP/DOWN, SAT_UP/DOWN, CCT commands present
```

## Actions
```yaml
- id: led_on
  label: LED On
  kind: action
  params: []
  models: [ILC-100c, ILC-400, ILC-100m, ILC-400, e-Node DMX]

- id: led_off
  label: LED Off
  kind: action
  params: []
  models: [ILC-100c, ILC-400, ILC-100m, ILC-400, e-Node DMX]

- id: led_effect
  label: LED Effect
  kind: action
  params:
    - name: n
      type: integer
      description: Effect number
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_store
  label: LED Store Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-24)
  models: [ILC-100c, ILC-400, ILC-100m, ILC-400, e-Node DMX]

- id: led_recall
  label: LED Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-24)
  models: [ILC-100c, ILC-400, ILC-100m, ILC-400, e-Node DMX]

- id: led_dissolve_1
  label: LED Dissolve 1
  kind: action
  params:
    - name: level
      type: integer
      description: Dissolve level
  models: [WIP]

- id: led_dissolve_2
  label: LED Dissolve 2
  kind: action
  params:
    - name: level
      type: integer
      description: Dissolve level
  models: [WIP]

- id: led_dissolve_3
  label: LED Dissolve 3
  kind: action
  params:
    - name: level
      type: integer
      description: Dissolve level
  models: [WIP]

- id: led_dissolve_5
  label: LED Dissolve 5
  kind: action
  params:
    - name: level
      type: integer
      description: Dissolve level
  models: [WIP]

- id: led_seqrate
  label: LED Sequence Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: Sequence rate value
  models: [ILC-400, e-Node DMX]

- id: led_sun_up
  label: LED Sun Up
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_sun_down
  label: LED Sun Down
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_sun_s
  label: LED Sun S
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_fade_up
  label: LED Fade Up
  kind: action
  params: []
  models: [ILC-100c, ILC-400, ILC-100m, ILC-400, e-Node DMX]

- id: led_fade_down
  label: LED Fade Down
  kind: action
  params: []
  models: [ILC-100c, ILC-400, ILC-100m, ILC-400, e-Node DMX]

- id: led_set_level
  label: LED Set Level
  kind: action
  params:
    - name: level
      type: integer
      description: Brightness level
  models: [ILC-100c, ILC-400, ILC-100m, ILC-400, e-Node DMX]

- id: led_hue_up
  label: LED Hue Up
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_hue_down
  label: LED Hue Down
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_hue_set
  label: LED Hue Set
  kind: action
  params:
    - name: hue
      type: integer
      description: Hue value
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_sat_up
  label: LED Saturation Up
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_sat_down
  label: LED Saturation Down
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_sat_s
  label: LED Saturation S
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_stop
  label: LED Stop
  kind: action
  params: []
  models: [ILC-100c, ILC-400, ILC-400, e-Node DMX]

- id: led_color_hsl
  label: LED Color HSL
  kind: action
  params:
    - name: hue
      type: integer
      description: Hue (0-360)
    - name: saturation
      type: integer
      description: Saturation (0-100)
    - name: level
      type: integer
      description: Brightness level (0-100)
  models: [ILC-400, ILC-100m, ILC-400, e-Node DMX]

- id: led_preset_hsl
  label: LED Preset HSL
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number
    - name: h
      type: integer
      description: Hue
    - name: s
      type: integer
      description: Saturation
    - name: l
      type: integer
      description: Brightness
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_red
  label: LED Red
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_green
  label: LED Green
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_blue
  label: LED Blue
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_value_rgb
  label: LED Value RGB
  kind: action
  params:
    - name: red
      type: integer
      description: Red (0-255)
    - name: green
      type: integer
      description: Green (0-255)
    - name: blue
      type: integer
      description: Blue (0-255)
  models: [WIP]

- id: led_white
  label: LED White
  kind: action
  params: []
  models: [ILC-100c, ILC-400, ILC-100m, e-Node DMX]

- id: led_rgb
  label: LED RGB
  kind: action
  params:
    - name: red
      type: integer
      description: Red (0-255)
    - name: green
      type: integer
      description: Green (0-255)
    - name: blue
      type: integer
      description: Blue (0-255)
  models: [ILC-400, ILC-100m, e-Node DMX]

- id: led_rgbw
  label: LED RGBW
  kind: action
  params:
    - name: red
      type: integer
      description: Red (0-255)
    - name: green
      type: integer
      description: Green (0-255)
    - name: blue
      type: integer
      description: Blue (0-255)
    - name: white
      type: integer
      description: White (0-255)
  models: [ILC-400]

- id: led_preset_3color
  label: LED Preset 3-Color
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number
    - name: r
      type: integer
      description: Red
    - name: g
      type: integer
      description: Green
    - name: b
      type: integer
      description: Blue
  models: []

- id: led_preset_4color
  label: LED Preset 4-Color
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number
    - name: r
      type: integer
      description: Red
    - name: g
      type: integer
      description: Green
    - name: b
      type: integer
      description: Blue
    - name: w
      type: integer
      description: White
  models: []

- id: led_cct
  label: LED Correlated Color Temperature
  kind: action
  params:
    - name: cct
      type: integer
      description: Color temperature value
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_cct_up
  label: LED CCT Up
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: led_cct_down
  label: LED CCT Down
  kind: action
  params: []
  models: [ILC-100c, ILC-400, e-Node DMX]

- id: motor_goto
  label: Motor Goto Position
  kind: action
  params:
    - name: position
      type: integer
      description: Target position
  models: [BRIC, BRIC II]
  status: WIP

- id: motor_up
  label: Motor Up
  kind: action
  params: []
  models: [IMC-100, BRIC, BRIC II]

- id: motor_down
  label: Motor Down
  kind: action
  params: []
  models: [IMC-100, BRIC, BRIC II]

- id: motor_stop
  label: Motor Stop
  kind: action
  params: []
  models: [IMC-100, BRIC, BRIC II]

- id: motor_right
  label: Motor Right
  kind: action
  params: []
  models: [BRIC, BRIC II]
  status: WIP

- id: motor_left
  label: Motor Left
  kind: action
  params: []
  models: [BRIC, BRIC II]
  status: WIP

- id: motor_retract
  label: Motor Retract
  kind: action
  params: []
  models: [IMC-100, BRIC, BRIC II]

- id: motor_toggle
  label: Motor Toggle
  kind: action
  params: []
  models: [BRIC, BRIC II]
  status: WIP

- id: motor_store
  label: Motor Store Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-24)
  models: [IMC-100, BRIC, BRIC II]

- id: motor_recall
  label: Motor Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-24)
  models: [IMC-100, BRIC, BRIC II]
```

## Feedbacks
```yaml
- id: color_query
  label: Color Query Response
  type: string
  description: HSB color data (Hue.Saturation.Brightness) returned in response to COLOR=?
  models: [ILC-100c, ILC-400, ILC-100m, ILC-400, e-Node DMX]

- id: value_query
  label: Value Query Response
  type: string
  description: RGB or RGBW color data (e.g., 240.0.0 or 255.255.255.255) returned in response to VALUE=?
  models: [ILC-100c, ILC-400, ILC-100m, ILC-400, e-Node DMX]

- id: preset_h_query
  label: Preset H Query Response
  type: string
  description: HSL preset query response
  models: []

- id: preset_query
  label: Preset Query Response
  type: string
  description: RGB/RGBW preset query response
  models: []

- id: motor_position_query
  label: Motor Position Query Response
  type: integer
  description: Current motor position returned in response to POSITION=?
  models: [BRIC II]

- id: notify_color
  label: Notify Color
  type: string
  description: Automatic HSB color feedback when NOTIFY is enabled (COLOR, VALUE, BOTH, or OFF)
  enum: [COLOR, VALUE, BOTH, OFF]

- id: notify_value
  label: Notify Value
  type: string
  description: Automatic RGB/RGBW color feedback when NOTIFY is enabled
  enum: [COLOR, VALUE, BOTH, OFF]
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found in source beyond action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation found in source beyond NOTIFY system
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - CS-Bus must be terminated at beginning and end with 120 ohm resistor on pins 3/4
  - DMX bus must be terminated on final OUT/THRU connector with 120 ohm resistor
  - Do not use telephony cable (wiring topology differs from CS-BUS standard)
  - Do not use standard Ethernet cabling (568A or 568B) - twisted pairs inconsistent with CS-BUS standard
  - Controller must have non-zero Z/G/N address assigned before it can send feedback
# UNRESOLVED: power-on sequencing requirements not stated in source
```

## Notes
- Command format: `#Z.G.N.COMMAND=VALUE<cr>` with bi-directional feedback: `!Z.G.N.COMMAND=VALUE`
- Wildcard address "0" broadcasts to all matching controllers (e.g., `#0.0.0.LED=ON` → all units)
- Test command (LED green all devices): `#0.0.0.LED.VALUE=0.240.0:<cr>`
- Test command (Motor up all devices): `#0.0.0.MOTOR=UP`
- Maximum CS-Bus cabling length: 4000 feet using CAT5e or better
- Maximum DMX fixtures per e-Node/dmx: 32
- Maximum DMX cabling length: 1200 meters (3900 feet)
- IP configuration supports DHCP or static addressing; static IP requires setting STATIC_IP, GATEWAY_ADD, then disabling DHCP and rebooting
- WIP status indicates commands marked as work-in-progress in source documentation
- Default credentials referenced in AMX module: "Telnet 1/Password 1" (format: first letter cap, space before number) — auth is configurable via e-Node Pilot
<!-- UNRESOLVED: serial baud rate not stated in source (RS-232 via IBT-100 adapter) -->
<!-- UNRESOLVED: PRESET.X=XX.XX motor command not available per source -->
<!-- UNRESOLVED: STATUS=? motor query not available per source -->

## Provenance

```yaml
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/integration/amx_type_documentation_mst_v1_2.pdf
retrieved_at: 2026-04-30T04:26:27.627Z
last_checked_at: 2026-04-22T22:08:38.883Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-22T22:08:38.883Z
matched_actions: 47
action_count: 47
confidence: high
summary: "All 47 spec actions matched literally against source tables. Transport parameters verified verbatim. Spec fully represents source command catalogue."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
