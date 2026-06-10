---
spec_id: admin/converging-systems-ilc3xxc-4xxc
schema_version: ai4av-public-spec-v1
revision: 1
title: "Converging Systems Inc. ILC3XXC/4XXC Control Spec"
manufacturer: "Converging Systems"
model_family: ILC-100
aliases: []
compatible_with:
  manufacturers:
    - "Converging Systems"
    - "Converging Systems Inc."
  models:
    - ILC-100
    - ILC-4004
    - ILC-300
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
source_urls:
  - "https://www.convergingsystems.com/bin/doc/ddk/ddk_v2%203_r_cs-bus.pdf"
  - https://www.convergingsystems.com/bin/doc/ddk/overview_devicedriver_v3_1.pdf
  - https://www.convergingsystems.com/bin/doc/ddk/setup_1_1.pdf
  - https://www.convergingsystems.com/inres_programmingdesignkit.htm
  - https://www.convergingsystems.com/inres_csiddk.php
retrieved_at: 2026-06-09T19:11:17.070Z
last_checked_at: 2026-06-10T07:33:47.059Z
generated_at: 2026-06-10T07:33:47.059Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific firmware minimums per command are documented in source tables (e.g. e-Node MkIII ≥3.7, ILC-100 firmware versions per feature); mapping to model family variants in `compatible_with.firmware` not stated as a single value"
  - "full per-model firmware compatibility matrix not collapsed into compatible_with.firmware; the source distributes minimum firmware requirements across the per-command table"
verification:
  verdict: verified
  checked_at: 2026-06-10T07:33:47.059Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 spec actions confirmed verbatim in source command table; transport values (port 23, UDP 5000/4000, 57600/N/8/1) all match source exactly. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Converging Systems Inc. ILC3XXC/4XXC Control Spec

## Summary
CS-Bus compatible LED lighting and motor controllers (ILC-100, ILC-300, ILC-4004 families plus related IMC-100 motor controllers) communicating via Converging Systems e-Node Ethernet adapter. Supports Telnet (port 23) and UDP (port 5000 send / 4000 receive) over Ethernet, plus RS-232-C through the IBT-100 adapter. Commands are simple ASCII dot-delimited messages addressed by Zone.Group.Node (Z.G.N).

<!-- UNRESOLVED: specific firmware minimums per command are documented in source tables (e.g. e-Node MkIII ≥3.7, ILC-100 firmware versions per feature); mapping to model family variants in `compatible_with.firmware` not stated as a single value -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - serial
addressing:
  port: 23
udp:
  send_port: 5000
  listen_port: 4000
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
  notes: e-Node Telnet server supports optional plaintext authentication (Username E-NODE, Password ADMIN) which is DISABLED by default. UDP path carries no auth in source. RS-232-C via IBT-100 carries no auth in source.
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: motor_down
  label: Motor Down
  kind: action
  command: "#Z.G.N.MOTOR=DOWN;"
  params:
    - name: zone
      type: integer
      description: Zone (0-254; 0=wildcard)
    - name: group
      type: integer
      description: Group (0-254; 0=wildcard)
    - name: node
      type: integer
      description: Node (0-254; 0=wildcard)

- id: motor_up
  label: Motor Up
  kind: action
  command: "#Z.G.N.MOTOR=UP;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: motor_stop
  label: Motor Stop
  kind: action
  command: "#Z.G.N.MOTOR=STOP;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: motor_retract
  label: Motor Retract
  kind: action
  command: "#Z.G.N.MOTOR=RETRACT;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: motor_store_preset
  label: Motor Store Preset
  kind: action
  command: "#Z.G.N.MOTOR=STORE,N;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: preset
      type: integer
      description: "Preset slot (BRIC: 1-9; IMC-100C: 1-6)"

- id: motor_recall_preset
  label: Motor Recall Preset
  kind: action
  command: "#Z.G.N.MOTOR=RECALL,N;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: preset
      type: integer
      description: "Preset slot; 0 is reserved home position"

- id: motor_status_query
  label: Motor Status Query
  kind: query
  command: "#Z.G.N.MOTOR.STATUS=?"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: motor_preset_query
  label: Motor Preset Read Back
  kind: query
  command: "#Z.G.N.MOTOR.PRESET.X=?"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: preset
      type: integer

- id: motor_position_query
  label: Motor Position Read Back
  kind: query
  command: "#Z.G.N.MOTOR.POSITION=?"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_disable_activity
  label: Inhibit Activity LED
  kind: action
  command: "#Z.G.N.LED=DISABLE;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_enable_activity
  label: Enable Activity LED
  kind: action
  command: "#Z.G.N.LED=ENABLE;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_on
  label: Activity LED On
  kind: action
  command: "#Z.G.N.LED=ON;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_on_pwm
  label: PWM LED On
  kind: action
  command: "#Z.G.N.LED=ON:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: ramp
      type: integer
      description: "Optional ramp time 0-64800 seconds (e-Node MkIII)"

- id: led_off
  label: PWM LED Off
  kind: action
  command: "#Z.G.N.LED=OFF;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_off_pwm
  label: PWM LED Off with Ramp
  kind: action
  command: "#Z.G.N.LED=OFF:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: ramp
      type: integer
      description: "Optional ramp time 0-64800 seconds"

- id: led_flash
  label: Activity LED Flash
  kind: action
  command: "#Z.G.N.LED=FLASH;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_effect
  label: PWM Run Effect
  kind: action
  command: "#Z.G.N.LED=EFFECT,N;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: effect
      type: integer
      description: "1=Sequence presets, 2=Flame, 3=Color wheel sequence, 4=Random color"

- id: led_store_preset
  label: LED Store Preset
  kind: action
  command: "#Z.G.N.LED=STORE,N;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: preset
      type: integer
      description: "Preset slot 1-24"

- id: led_recall_preset
  label: LED Recall Preset
  kind: action
  command: "#Z.G.N.LED=RECALL,N;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: preset
      type: integer
      description: "Preset slot 1-24"

- id: led_recall_preset_ramp
  label: LED Recall Preset with Ramp
  kind: action
  command: "#Z.G.N.LED=RECALL,N:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: preset
      type: integer
    - name: ramp
      type: integer

- id: led_sun
  label: Recall CLB Chronobiological Level
  kind: action
  command: "#Z.G.N.LED=SUN,S;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
      description: "S 0-240 (0=nighttime, 240=noon-day sun)"

- id: led_sun_ramp
  label: Recall CLB Level with Ramp
  kind: action
  command: "#Z.G.N.LED=SUN,S:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
    - name: ramp
      type: integer

- id: led_sun_up
  label: PWM CLB Up
  kind: action
  command: "#Z.G.N.LED=SUN_UP;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_sun_up_ramp
  label: PWM CLB Up with Ramp
  kind: action
  command: "#Z.G.N.LED=SUN_UP:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: ramp
      type: integer

- id: led_sun_down
  label: PWM CLB Down
  kind: action
  command: "#Z.G.N.LED=SUN_DOWN;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_sun_down_ramp
  label: PWM CLB Down with Ramp
  kind: action
  command: "#Z.G.N.LED=SUN_DOWN:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: ramp
      type: integer

- id: led_dissolve
  label: PWM Set Dissolve Rate
  kind: action
  command: "#Z.G.N.LED.DISSOLVE.X=XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: feature
      type: integer
      description: "1=direct value transitions, 2=ON/OFF/preset transitions, 3=Effect 1/4 transitions, 4=Effect 3 cycle, 0=wildcard all"
    - name: rate
      type: integer
      description: "Dissolve rate in seconds"

- id: led_seqrate
  label: PWM Set Sequence Rate
  kind: action
  command: "#Z.G.N.LED.SEQRATE=XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: rate
      type: integer

- id: led_hue_up
  label: PWM Hue Up
  kind: action
  command: "#Z.G.N.LED=HUE_UP;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_hue_down
  label: PWM Hue Down
  kind: action
  command: "#Z.G.N.LED=HUE_DOWN;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_hue_set
  label: PWM Set Hue Value
  kind: action
  command: "#Z.G.N.LED=HUE,H;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: hue
      type: integer
      description: "H 0-240"

- id: led_hue_set_ramp
  label: PWM Set Hue with Ramp
  kind: action
  command: "#Z.G.N.LED=HUE,H:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: hue
      type: integer
    - name: ramp
      type: integer

- id: led_sat_up
  label: PWM Saturation Up
  kind: action
  command: "#Z.G.N.LED=SAT_UP;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_sat_down
  label: PWM Saturation Down
  kind: action
  command: "#Z.G.N.LED=SAT_DOWN;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_sat_set
  label: PWM Set Saturation Level
  kind: action
  command: "#Z.G.N.LED=SAT,S;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: saturation
      type: integer
      description: "S 0-240"

- id: led_sat_set_ramp
  label: PWM Set Saturation with Ramp
  kind: action
  command: "#Z.G.N.LED=SAT,S:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: saturation
      type: integer
    - name: ramp
      type: integer

- id: led_fade_up
  label: PWM Fade Up
  kind: action
  command: "#Z.G.N.LED=FADE_UP;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_fade_down
  label: PWM Fade Down
  kind: action
  command: "#Z.G.N.LED=FADE_DOWN;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_set_brightness
  label: PWM Set Brightness Level
  kind: action
  command: "#Z.G.N.LED=SET,L;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
      description: "L 0-240"

- id: led_set_brightness_ramp
  label: PWM Set Brightness with Ramp
  kind: action
  command: "#Z.G.N.LED=SET,L:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
    - name: ramp
      type: integer

- id: led_adjustment_stop
  label: PWM Adjustment Stop
  kind: action
  command: "#Z.G.N.LED=STOP;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_hsv
  label: PWM HSV Color Setting
  kind: action
  command: "#Z.G.N.LED=HSV,H.S.V;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: h
      type: integer
      description: "Hue 0-240"
    - name: s
      type: integer
      description: "Saturation 0-240"
    - name: v
      type: integer
      description: "Value 0-240"

- id: led_hsv_ramp
  label: PWM HSV Color Setting with Ramp
  kind: action
  command: "#Z.G.N.LED=HSV,H.S.V:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: h
      type: integer
    - name: s
      type: integer
    - name: v
      type: integer
    - name: ramp
      type: integer

- id: led_color_query
  label: PWM Color Status Query
  kind: query
  command: "#Z.G.N.LED.COLOR=?"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_color_legacy_set
  label: PWM Color Setting (Legacy COLOR)
  kind: action
  command: "#Z.G.N.LED.COLOR=H.S.V;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: h
      type: integer
    - name: s
      type: integer
    - name: v
      type: integer

- id: led_preseth_set
  label: Set Preset HSV Color Space
  kind: action
  command: "#Z.G.N.LED.PRESETH.X=XXX.XXX.XXX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: preset
      type: integer
      description: "0=wildcard"
    - name: h
      type: integer
    - name: s
      type: integer
    - name: v
      type: integer

- id: led_red
  label: PWM Set Red Level
  kind: action
  command: "#Z.G.N.LED=RED,R;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
      description: "R 0-240"

- id: led_red_ramp
  label: PWM Set Red with Ramp
  kind: action
  command: "#Z.G.N.LED=RED,R:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
    - name: ramp
      type: integer

- id: led_green
  label: PWM Set Green Level
  kind: action
  command: "#Z.G.N.LED=GREEN,G;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
      description: "G 0-240"

- id: led_green_ramp
  label: PWM Set Green with Ramp
  kind: action
  command: "#Z.G.N.LED=GREEN,G:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
    - name: ramp
      type: integer

- id: led_blue
  label: PWM Set Blue Level
  kind: action
  command: "#Z.G.N.LED=BLUE,B;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
      description: "B 0-240"

- id: led_blue_ramp
  label: PWM Set Blue with Ramp
  kind: action
  command: "#Z.G.N.LED=BLUE,B:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
    - name: ramp
      type: integer

- id: led_white
  label: PWM Set White Level
  kind: action
  command: "#Z.G.N.LED=WHITE,W;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
      description: "W 0-240"

- id: led_white_ramp
  label: PWM Set White with Ramp
  kind: action
  command: "#Z.G.N.LED=WHITE,W:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: level
      type: integer
    - name: ramp
      type: integer

- id: led_rgbw
  label: PWM RGBW Color Setting
  kind: action
  command: "#Z.G.N.LED=RGBW,r.g.b.w;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: r
      type: integer
    - name: g
      type: integer
    - name: b
      type: integer
    - name: w
      type: integer

- id: led_rgbw_ramp
  label: PWM RGBW with Ramp
  kind: action
  command: "#Z.G.N.LED=RGBW,r.g.b.w:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: r
      type: integer
    - name: g
      type: integer
    - name: b
      type: integer
    - name: w
      type: integer
    - name: ramp
      type: integer

- id: led_rgb
  label: PWM RGB Color Setting
  kind: action
  command: "#Z.G.N.LED=RGB,r.g.b;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: r
      type: integer
    - name: g
      type: integer
    - name: b
      type: integer

- id: led_rgb_ramp
  label: PWM RGB with Ramp
  kind: action
  command: "#Z.G.N.LED=RGB,r.g.b:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: r
      type: integer
    - name: g
      type: integer
    - name: b
      type: integer
    - name: ramp
      type: integer

- id: led_value_query
  label: LED Color Value Read Back
  kind: query
  command: "#Z.G.N.LED.VALUE=?"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_preset_rgb_query
  label: LED RGB Preset Read Back
  kind: query
  command: "#Z.G.N.LED.PRESET.X=?"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: preset
      type: integer

- id: led_preset_rgb_set
  label: Set Preset RGB Color Space
  kind: action
  command: "#Z.G.N.LED.PRESET.X=XXX.XXX.XXX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: preset
      type: integer
      description: "0=wildcard"
    - name: r
      type: integer
    - name: g
      type: integer
    - name: b
      type: integer

- id: led_preset_rgbw_set
  label: Set Preset RGBW Color Space
  kind: action
  command: "#Z.G.N.LED.PRESET.X=XXX.XXX.XXX.XXX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: preset
      type: integer
      description: "0=wildcard"
    - name: r
      type: integer
    - name: g
      type: integer
    - name: b
      type: integer
    - name: w
      type: integer

- id: led_cct
  label: Set LED Color to CCT
  kind: action
  command: "#Z.G.N.LED=CCT,XXXX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: cct
      type: integer
      description: "CCT in Kelvin (1800-7000)"

- id: led_cct_ramp
  label: Set LED CCT with Ramp
  kind: action
  command: "#Z.G.N.LED=CCT,XXXX:XX;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
    - name: cct
      type: integer
    - name: ramp
      type: integer

- id: led_cct_up
  label: CCT Fade Up
  kind: action
  command: "#Z.G.N.LED=CCT_UP;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: led_cct_down
  label: CCT Fade Down
  kind: action
  command: "#Z.G.N.LED=CCT_DOWN;"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer

- id: status_inquiry_status
  label: LED Status Inquiry
  kind: query
  command: "#Z.G.N.LED.STATUS=?"
  params:
    - name: zone
      type: integer
    - name: group
      type: integer
    - name: node
      type: integer
```

## Feedbacks
```yaml
- id: motor_status_bits
  type: bits
  description: 8-bit field; Bit 0 Motor Active, Bit 1 Direction (0=retract, 1=deploy), Bit 2 Fully extended limit, Bit 3 Fully retracted limit, Bit 4 Intermediate stop, Bit 5 Position reading valid
- id: motor_position_percent
  type: float
  range: 0.00-100.00
  description: Position from home to fully deployed (IMC-100T)
- id: led_color_hsv
  type: string
  description: Returned as #Z.G.N.LED.COLOR=H.S.V
- id: led_color_rgb
  type: string
  description: 3-color device returns #Z.G.N.LED.VALUE=R.G.B
- id: led_color_rgbw
  type: string
  description: 4-color device returns #Z.G.N.LED.VALUE=R.G.B.W
- id: led_color_mono
  type: string
  description: 1-color device returns #Z.G.N.LED.VALUE=W
- id: led_preset_rgb
  type: string
  description: Returned as #Z.G.N.LED.PRESET.X=xxx,xxx,xxx
- id: led_preset_hsv
  type: string
  description: Returned as #Z.G.N.LED.PRESETH.X=H.S.V
- id: negative_ack
  type: marker
  description: Asterisk followed by partial command (e.g. *#1.1.1.MOTOR) indicates invalid command
```

## Variables
```yaml
- id: zgn_address
  type: string
  description: Zone.Group.Node address, each field 0-254 (0 = wildcard)
- id: ramp_time_seconds
  type: integer
  range: 0-64800
  description: Optional ramp parameter; 0 = instantaneous
```

## Events
```yaml
- id: command_echo
  description: Valid command is echoed back on the bus
- id: bus_mirror_motor_up
  description: Mirrored command #1.1.1.MOTOR=UP; followed by #1.1.1.MOTOR=STOP; when motor commanded UP and stopped at a location
- id: response_unsolicited
  description: Response/unsolicited messages use category ! (types 9, 11)
- id: response_negative
  description: Negative responses use category * (type 10)
```

## Macros
```yaml
- id: led_off_single
  description: Turn a single controller off
  steps:
    - "#2.1.1.LED=OFF;"
- id: led_off_all
  description: Turn all controllers off via wildcard
  steps:
    - "#0.0.0.LED=OFF;"
- id: led_recall_preset_known
  description: Recall preset #1 on a known-address controller
  steps:
    - "#2.1.1.LED=RECALL,1;"
- id: led_recall_preset_wildcard
  description: Recall preset #1 on all controllers
  steps:
    - "#0.0.0.LED=RECALL,1;"
- id: led_fade_up_to_level
  description: Ramp fade up to a particular brightness then stop
  steps:
    - "#2.1.1.LED=FADE_UP;"
    - "#2.1.1.LED=STOP;"
- id: motor_down_with_stop
  description: Move motor down to a location and stop
  steps:
    - "#1.1.1.MOTOR=DOWN;"
    - "#1.1.1.MOTOR=STOP;"
- id: change_dissolve_rate
  description: Set LED dissolve rate to 3 seconds
  steps:
    - "#1.1.1.LED.DISSOLVE=3;"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: "No safety warnings or interlock procedures documented in source. Reconnect procedure on auth break: monitor for 'User' and 'Password' prompts and re-run Initial Authentication rather than resending credentials on a fixed schedule."
```

## Notes
Messages are dot-delimited ASCII terminated by `;` + CR. Each command must include Z.G.N address; using `#0.0.0.` broadcasts to all units. RS-232-C parameters on the IBT-100 are hardcoded to 57600 baud, N/8/1, no handshaking. Telnet server on e-Node is DISABLED by default; enabling requires the e-Node Pilot app + Restart. Default Telnet credentials: Username `E-NODE`, Password `ADMIN` (changeable). UDP ports 5000 (send) and 4000 (listen) are factory defaults and changeable via Pilot. Several commands have a firmware-version floor (e.g. e-Node MkIII ≥3.7, ILC-100 firmware 1.8/2.03/3.2/3.3/3.7) per source tables; enforce against target device's reported firmware.

<!-- UNRESOLVED: full per-model firmware compatibility matrix not collapsed into compatible_with.firmware; the source distributes minimum firmware requirements across the per-command table -->
```

Self-check:
- No invented voltages/currents/ports/baud: 57600/8/N/1 + TCP 23 + UDP 5000/4000 all from source
- `status: draft`, `declared_confidence: low` set
- YAML clean; no `#` comments inside feedback/events frames
- `entity_id` populated from input
- Unresolved markers preserved for gaps

## Provenance

```yaml
source_domains:
  - convergingsystems.com
source_urls:
  - "https://www.convergingsystems.com/bin/doc/ddk/ddk_v2%203_r_cs-bus.pdf"
  - https://www.convergingsystems.com/bin/doc/ddk/overview_devicedriver_v3_1.pdf
  - https://www.convergingsystems.com/bin/doc/ddk/setup_1_1.pdf
  - https://www.convergingsystems.com/inres_programmingdesignkit.htm
  - https://www.convergingsystems.com/inres_csiddk.php
retrieved_at: 2026-06-09T19:11:17.070Z
last_checked_at: 2026-06-10T07:33:47.059Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:33:47.059Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 spec actions confirmed verbatim in source command table; transport values (port 23, UDP 5000/4000, 57600/N/8/1) all match source exactly. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific firmware minimums per command are documented in source tables (e.g. e-Node MkIII ≥3.7, ILC-100 firmware versions per feature); mapping to model family variants in `compatible_with.firmware` not stated as a single value"
- "full per-model firmware compatibility matrix not collapsed into compatible_with.firmware; the source distributes minimum firmware requirements across the per-command table"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
