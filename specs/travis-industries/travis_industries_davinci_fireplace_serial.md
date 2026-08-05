---
spec_id: admin/travis-davinci
schema_version: ai4av-public-spec-v1
revision: 1
title: "Travis Industries DaVinci Fireplace Control Spec"
manufacturer: "Travis Industries"
model_family: "DaVinci Fireplace"
aliases: []
compatible_with:
  manufacturers:
    - "Travis Industries"
  models:
    - "DaVinci Fireplace"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - travisindustries.com
source_urls:
  - https://www.travisindustries.com/docs/17601989.pdf
retrieved_at: 2026-07-21T23:02:38.672Z
last_checked_at: 2026-07-22T01:34:49.127Z
generated_at: 2026-07-22T01:34:49.127Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not define exact command framing, terminators, or response behavior for every parameter"
  - "source documents HEY responses but no unsolicited event schema"
  - "no multi-step sequences described in source"
  - "source states this interlock only for Firenze fireplaces"
  - "exact command terminators, complete response schemas, firmware compatibility, and LEDDWELLTIME units not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:34:49.127Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec action-units matched literally in source; transport parameters verified; one-to-one coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-17
---

# Travis Industries DaVinci Fireplace Control Spec

## Summary
Serial DaVinci Command Protocol controls LEDs, flame, heat exchanger blower, lamp, and auxiliary burner. Supports SET/GET commands and 2-way HEY notifications over UART.

<!-- UNRESOLVED: source does not define exact command framing, terminators, or response behavior for every parameter -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  electrical: ttl  # source: board uses TTL levels; RS232 shifter may be needed
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from FLAME ON/OFF, LAMP ON/OFF, and AUXBURNER ON/OFF
- queryable  # inferred from GET command and read-only sensor parameters
- levelable  # inferred from HEATFANSPEED, FLAMELEVEL, and LAMPLEVEL parameters
- routable  # inferred from LED color and LED parameter control
```

## Actions
```yaml
- id: at
  label: Attention
  kind: action
  command: "AT"
  params: []
  description: Test connection; returns OK

- id: version
  label: Get Firmware Version
  kind: query
  command: "VERSION"
  params: []
  description: Gets firmware version

- id: set
  label: Set Parameter
  kind: action
  command: "SET {parameter} {value}"
  params:
    - name: parameter
      type: string
      description: Writable parameter documented in source
    - name: value
      type: string
      description: Parameter value

- id: get
  label: Get Parameter
  kind: query
  command: "GET {parameter}"
  params:
    - name: parameter
      type: string
      description: Parameter documented in source

- id: set_led
  label: Set LED
  kind: action
  command: "SET LED {state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: LED on/off state

- id: set_ledcolor
  label: Set LED Color
  kind: action
  command: "SET LEDCOLOR {red}, {green}, {blue}, {white}"
  params:
    - name: red
      type: integer
      range: [0, 255]
      description: Red component (RR)
    - name: green
      type: integer
      range: [0, 255]
      description: Green component (GG)
    - name: blue
      type: integer
      range: [0, 255]
      description: Blue component (BB)
    - name: white
      type: integer
      range: [0, 255]
      description: White component (WW)

- id: set_ledfadetime
  label: Set LED Fade Time
  kind: action
  command: "SET LEDFADETIME {milliseconds}"
  params:
    - name: milliseconds
      type: integer
      range: [0, 32767]
      description: Fade time in milliseconds

- id: set_leddwelltime
  label: Set LED Dwell Time
  kind: action
  command: "SET LEDDWELLTIME {duration}"
  params:
    - name: duration
      type: integer
      description: Time color remains before transition

- id: set_ledpulse
  label: Set LED Pulse
  kind: action
  command: "SET LEDPULSE {state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: Pulse between current color and LEDCOLOR

- id: set_flame
  label: Set Flame
  kind: action
  command: "SET FLAME {state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: get_flame
  label: Get Flame
  kind: query
  command: "GET FLAME"
  params: []

- id: set_heatfan
  label: Set Heat Fan
  kind: action
  command: "SET HEATFAN {state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_heatfanspeed
  label: Set Heat Fan Speed
  kind: action
  command: "SET HEATFANSPEED {speed}"
  params:
    - name: speed
      type: integer
      range: [1, 10]

- id: set_flamelevel
  label: Set Flame Level
  kind: action
  command: "SET FLAMELEVEL {level}"
  params:
    - name: level
      type: integer
      range: [1, 10]

- id: set_lamp
  label: Set Lamp
  kind: action
  command: "SET LAMP {state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_lamplevel
  label: Set Lamp Level
  kind: action
  command: "SET LAMPLEVEL {level}"
  params:
    - name: level
      type: integer
      range: [1, 10]

- id: set_auxburner
  label: Set Aux Burner
  kind: action
  command: "SET AUXBURNER {state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: get_led
  label: Get LED
  kind: query
  command: "GET LED"
  params: []

- id: get_ledcolor
  label: Get LED Color
  kind: query
  command: "GET LEDCOLOR"
  params: []

- id: get_ledfadetime
  label: Get LED Fade Time
  kind: query
  command: "GET LEDFADETIME"
  params: []

- id: get_leddwelltime
  label: Get LED Dwell Time
  kind: query
  command: "GET LEDDWELLTIME"
  params: []

- id: get_ledpulse
  label: Get LED Pulse
  kind: query
  command: "GET LEDPULSE"
  params: []

- id: get_humidity
  label: Get Humidity
  kind: query
  command: "GET HUMIDITY"
  params: []

- id: get_temperature
  label: Get Temperature
  kind: query
  command: "GET TEMPERATURE"
  params: []

- id: get_dewpoint
  label: Get Dewpoint
  kind: query
  command: "GET DEWPOINT"
  params: []

- id: get_heatfan
  label: Get Heat Fan
  kind: query
  command: "GET HEATFAN"
  params: []

- id: get_heatfanspeed
  label: Get Heat Fan Speed
  kind: query
  command: "GET HEATFANSPEED"
  params: []

- id: get_flamelevel
  label: Get Flame Level
  kind: query
  command: "GET FLAMELEVEL"
  params: []

- id: get_lamp
  label: Get Lamp
  kind: query
  command: "GET LAMP"
  params: []

- id: get_lamplevel
  label: Get Lamp Level
  kind: query
  command: "GET LAMPLEVEL"
  params: []

- id: get_auxburner
  label: Get Aux Burner
  kind: query
  command: "GET AUXBURNER"
  params: []
```

## Feedbacks
```yaml
- id: ok_response
  type: string
  description: Command acknowledgement; OK

- id: hey_response
  type: string
  description: 2-way synchronization notification prefixed with HEY

- id: led_state
  type: enum
  values: [ON, OFF]
  description: HEY LED ON/OFF response

- id: flame_state
  type: enum
  values: [ON, OFF]
  description: HEY FLAME ON/OFF response

- id: ledcolor_state
  type: array
  shape: [4]
  element_type: integer
  range: [0, 255]
  description: HEY LEDCOLOR response containing RED, GREEN, BLUE, and WHITE values

- id: humidity_reading
  type: integer
  range: [0, 100]
  unit: "%rH"
  description: Humidity sensor reading

- id: temperature_reading
  type: integer
  range: [0, 255]
  unit: degC
  description: Temperature sensor reading

- id: dewpoint_reading
  type: integer
  range: [0, 255]
  description: Calculated dewpoint reading
```

## Variables
```yaml
- id: led
  type: enum
  values: [ON, OFF]
  access: r/w
  description: LED on/off

- id: ledcolor
  type: array
  shape: [4]
  element_type: integer
  range: [0, 255]
  access: r/w
  description: RGBW values

- id: ledfadetime
  type: integer
  range: [0, 32767]
  access: r/w
  unit: milliseconds
  description: Fade time between LED colors

- id: leddwelltime
  type: integer
  access: r/w
  description: Time color remains before transition

- id: ledpulse
  type: enum
  values: [ON, OFF]
  access: r/w
  description: LED pulse mode

- id: humidity
  type: integer
  range: [0, 100]
  access: r
  unit: "%rH"
  description: Humidity sensor reading

- id: temperature
  type: integer
  range: [0, 255]
  access: r
  unit: degC
  description: Temperature sensor reading

- id: dewpoint
  type: integer
  range: [0, 255]
  access: r
  description: Calculated dewpoint

- id: flame
  type: enum
  values: [ON, OFF]
  access: r/w
  description: Flame relay state

- id: heatfan
  type: enum
  values: [ON, OFF]
  access: r/w
  description: Heat exchanger blower state

- id: heatfanspeed
  type: integer
  range: [1, 10]
  access: r/w
  description: Heat exchanger fan speed

- id: flamelevel
  type: integer
  range: [1, 10]
  access: r/w
  description: Flame level

- id: lamp
  type: enum
  values: [ON, OFF]
  access: r/w
  description: Lamp state

- id: lamplevel
  type: integer
  range: [1, 10]
  access: r/w
  description: Lamp level

- id: auxburner
  type: enum
  values: [ON, OFF]
  access: r/w
  description: Auxiliary burner state
```

## Events
```yaml
# UNRESOLVED: source documents HEY responses but no unsolicited event schema
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "HEATFAN must be ON before HEATFANSPEED can adjust FLAME"
    applies_to: [Firenze]
# UNRESOLVED: source states this interlock only for Firenze fireplaces
```

## Notes
Connector J3: GND, TX, +5V, RX. Board is photo-isolated and requires +5Vdc, 50mA. TTL levels may require RS232 shifter. LEDCOLOR accepts four RGBW values; if one value is listed, source says it applies to all four. Some appliances support White Only, RGB Only, or both LED configurations. GET returns current board setting. Example response: `OK HEY FLAME OFF`.

<!-- UNRESOLVED: exact command terminators, complete response schemas, firmware compatibility, and LEDDWELLTIME units not stated in source -->

## Provenance

```yaml
source_domains:
  - travisindustries.com
source_urls:
  - https://www.travisindustries.com/docs/17601989.pdf
retrieved_at: 2026-07-21T23:02:38.672Z
last_checked_at: 2026-07-22T01:34:49.127Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:34:49.127Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec action-units matched literally in source; transport parameters verified; one-to-one coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not define exact command framing, terminators, or response behavior for every parameter"
- "source documents HEY responses but no unsolicited event schema"
- "no multi-step sequences described in source"
- "source states this interlock only for Firenze fireplaces"
- "exact command terminators, complete response schemas, firmware compatibility, and LEDDWELLTIME units not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
