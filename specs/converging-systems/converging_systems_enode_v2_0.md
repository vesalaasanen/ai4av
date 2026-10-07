---
spec_id: admin/converging-systems-enode-v2-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "Converging Systems eNode v2.0 Control Spec"
manufacturer: "Converging Systems"
model_family: "eNode v2.0"
aliases: []
compatible_with:
  manufacturers:
    - "Converging Systems"
  models:
    - "eNode v2.0"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/integration/amx_type_documentation_mst_v1_2.pdf
retrieved_at: 2026-07-12T22:23:50.885Z
last_checked_at: 2026-10-07T13:08:53.489Z
generated_at: 2026-10-07T13:08:53.489Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "COLOR=H.S.L"
  - "PRESETH.X=XXX.XXX.XXX"
  - "PRESET.X=XXX.XXX.XXX"
  - "DMX mode NOTIFY feedback format is not explicitly documented"
  - "not stated in source"
  - "no direct settable parameters documented; control is via action commands"
  - "event payload details for DMX mode are not stated in source."
  - "no multi-step macro sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "RS-232c baud rate, data bits, parity, and stop bits are not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:08:53.489Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 action units match source commands and transport values are supported; 3 set-form color/preset commands are unrepresented, within the 0.9 coverage floor. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Converging Systems eNode v2.0 Control Spec

## Summary
The eNode v2.0 is an Ethernet-to-CSBUS gateway supporting LED lighting and motor controller automation. IP communication uses Telnet, with or without authentication, on port 23; UDP ports 4000 and 5000 are also documented. RS-232c communication is available via the IBT-100. Controllers use Zone.Group.Node addressing. Automatic color and motor state feedback is available through NOTIFY.

<!-- UNRESOLVED: DMX mode NOTIFY feedback format is not explicitly documented -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - serial
addressing:
  port: 23  # Telnet
  format: Z.G.N
  zone_range: "1-254"
  group_range: "1-254"
  node_range: "1-254"
auth:
  type: optional  # Telnet is documented with or without authentication
  credentials: "Telnet 1/Password 1"  # AMX setup; settings within the e-Node must match
serial:
  protocol: RS-232c
  connector: DB-9
  baud_rate: null  # UNRESOLVED: not stated in source
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
udp:
  ports: [4000, 5000]
```

## Traits
```yaml
- powerable  # inferred from ON/OFF commands
- routable  # inferred from Z.G.N addressing with wildcard broadcast
- queryable  # inferred from documented bi-directional queries
- levelable  # inferred from FADE_UP, FADE_DOWN, HUE and SAT commands
```

## Actions
```yaml
- id: led_on
  label: LED On
  kind: action
  params: []

- id: led_off
  label: LED Off
  kind: action
  params: []

- id: led_value
  label: Set LED RGB Value
  kind: action
  params:
    - name: rgb
      type: string
      description: RGB values separated by periods (R.G.B), as in 240.0.0

- id: led_white
  label: Set LED White
  kind: action
  params: []

- id: led_fade_up
  label: LED Fade Up
  kind: action
  params: []

- id: led_fade_down
  label: LED Fade Down
  kind: action
  params: []

- id: led_hue
  label: Set LED Hue
  kind: action
  params:
    - name: hue
      type: number
      description: Value for the HUE,H command; range not stated in source

- id: led_sat
  label: Set LED Saturation
  kind: action
  params:
    - name: sat
      type: number
      description: Value for the SAT_S command; range not stated in source

- id: led_cct
  label: Set Correlated Color Temperature
  kind: action
  params:
    - name: cct
      type: integer
      description: Value for the CCT,XXXX command; range not stated in source

- id: led_sun_up
  label: LED Sun Up
  kind: action
  params: []

- id: led_sun_down
  label: LED Sun Down
  kind: action
  params: []

- id: motor_up
  label: Motor Up
  kind: action
  params: []

- id: motor_down
  label: Motor Down
  kind: action
  params: []

- id: motor_stop
  label: Motor Stop
  kind: action
  params: []

- id: motor_left
  label: Motor Left
  kind: action
  params: []

- id: motor_right
  label: Motor Right
  kind: action
  params: []

- id: motor_retract
  label: Motor Retract
  kind: action
  params: []

- id: motor_goto
  label: Motor Go To Position
  kind: action
  params:
    - name: position
      type: integer
      description: Target position value for GOTO; encoding and range not stated in source

- id: preset_store
  label: Store Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-24)

- id: preset_recall
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-24)

- id: led_effect
  label: Set LED Effect
  kind: action
  params:
    - name: effect
      type: string
      description: Value for the EFFECT,n command; range not stated in source

- id: led_dissolve
  label: Set LED Dissolve
  kind: action
  params:
    - name: dissolve
      type: string
      description: Value for DISSOLVE.1=XX, DISSOLVE.2=XX, DISSOLVE.3=XX, or DISSOLVE.5=XX; parameter range not stated in source

- id: led_sequence_rate
  label: Set LED Sequence Rate
  kind: action
  params:
    - name: rate
      type: string
      description: Value for the SEQRATE=XX command; range not stated in source

- id: led_sun
  label: Set LED Sun
  kind: action
  params:
    - name: value
      type: string
      description: Value for the SUN.S command; range not stated in source

- id: led_set_level
  label: Set LED Level
  kind: action
  params:
    - name: level
      type: string
      description: Value for the SET,L command; range not stated in source

- id: led_hue_up
  label: LED Hue Up
  kind: action
  params: []

- id: led_hue_down
  label: LED Hue Down
  kind: action
  params: []

- id: led_sat_up
  label: LED Saturation Up
  kind: action
  params: []

- id: led_sat_down
  label: LED Saturation Down
  kind: action
  params: []

- id: led_stop
  label: LED Stop
  kind: action
  params: []

- id: led_red
  label: Set LED Red
  kind: action
  params:
    - name: red
      type: string
      description: Value for the RED,R command; range not stated in source

- id: led_green
  label: Set LED Green
  kind: action
  params:
    - name: green
      type: string
      description: Value for the GREEN,G command; range not stated in source

- id: led_blue
  label: Set LED Blue
  kind: action
  params:
    - name: blue
      type: string
      description: Value for the BLUE,B command; range not stated in source

- id: led_rgb
  label: Set LED RGB
  kind: action
  params:
    - name: rgb
      type: string
      description: Separate RGB values for the RGB,R.G.B command; range not stated in source

- id: led_rgbw
  label: Set LED RGBW
  kind: action
  params:
    - name: rgbw
      type: string
      description: Separate RGBW values for the RGBW,R.G.B command; range not stated in source

- id: led_cct_up
  label: LED CCT Up
  kind: action
  params: []

- id: led_cct_down
  label: LED CCT Down
  kind: action
  params: []

- id: motor_toggle
  label: Motor Toggle
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: led_color_hsb
  label: LED HSB Color
  type: string
  description: Color response from COLOR=? query; NOTIFY reports HSB color data, while the query table labels COLOR as H.S.L
  query_command: COLOR=?

- id: led_color_rgb
  label: LED RGB Value
  type: string
  description: RGB color response from VALUE=? query
  query_command: VALUE=?

- id: motor_position
  label: Motor Position
  type: integer
  description: Position response from POSITION=? query; documented for BRIC II (IMC-300MKII)
  query_command: POSITION=?

- id: preset_hsb
  label: Preset HSB
  type: string
  description: Preset color data from PRESETH.X=? query; the source describes this as HLS color data
  query_command: PRESETH.X=?

- id: preset_rgb
  label: Preset RGB
  type: string
  description: Preset color data from PRESET.X=? query
  query_command: PRESET.X=?
```

## Variables
```yaml
# UNRESOLVED: no direct settable parameters documented; control is via action commands
```

## Events
```yaml
# NOTIFY can provide automatic color and motor state feedback. UNRESOLVED: event payload details for DMX mode are not stated in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- General command format: `#Z.G.N.DEVICE.COMMAND=PARAMS:<cr>`; Z.G.N fields are separated by periods.
- Wildcard `0` in an address field broadcasts to matching controllers with non-zero addresses in that position. For example, `#2.1.0.LED=ON:<cr>` targets matching controllers in Zone 2, Group 1.
- Factory defaults: LED Zone=2/Group=1/Node=0; Motor Zone=1/Group=1/Node=0. Node 0 is undefined and is used as a wildcard in commands.
- Bi-directional response format: `!Z.G.N.COMMAND=VALUE`; the exclamation mark indicates a CS-BUS device response.
- Telnet supports communication with or without authentication. In the documented AMX setup, Telnet 1/Password 1 are used; the e-Node settings must match. Authentication defaults are not stated in source.
- NOTIFY must be set in e-Node Pilot to enable automatic color and motor state feedback. Options are COLOR, VALUE, BOTH, and OFF; the factory default is OFF. A controller needs a non-zero Z/G/N address to send feedback.
- When a wildcard command is sent to multiple controllers, only the surrogate controller (node 1) responds.
- CS-BUS uses RJ-25/RJ-11 6P6C wiring. Twisted pairs are on pins 1&2, 3&4, and 5&6. Maximum cable length from the e-Node to the last controller is 4000 feet using CAT5e or better; the bus requires 120 ohm termination at the beginning and end on pins 3/4.
- e-Node/dmx supports up to 32 DMX fixtures and up to 1200 meters of DMX cabling. The DMX bus must be terminated on the final OUT/THRU connector with a 120 ohm resistor. Its DMX port is separate from the CS-BUS port.
<!-- UNRESOLVED: RS-232c baud rate, data bits, parity, and stop bits are not stated in source -->
<!-- UNRESOLVED: DMX mode NOTIFY feedback format is not explicitly documented -->

## Provenance

```yaml
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/integration/amx_type_documentation_mst_v1_2.pdf
retrieved_at: 2026-07-12T22:23:50.885Z
last_checked_at: 2026-10-07T13:08:53.489Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:08:53.489Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 action units match source commands and transport values are supported; 3 set-form color/preset commands are unrepresented, within the 0.9 coverage floor. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "COLOR=H.S.L"
- "PRESETH.X=XXX.XXX.XXX"
- "PRESET.X=XXX.XXX.XXX"
- "DMX mode NOTIFY feedback format is not explicitly documented"
- "not stated in source"
- "no direct settable parameters documented; control is via action commands"
- "event payload details for DMX mode are not stated in source."
- "no multi-step macro sequences documented"
- "no safety warnings or interlock procedures in source"
- "RS-232c baud rate, data bits, parity, and stop bits are not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
