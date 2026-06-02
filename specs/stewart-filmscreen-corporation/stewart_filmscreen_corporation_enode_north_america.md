---
spec_id: admin/stewart-filmscreen-corporation-enode
schema_version: ai4av-public-spec-v1
revision: 1
title: "Stewart Filmscreen Corporation eNode Control Spec"
manufacturer: "Stewart Filmscreen Corporation"
model_family: "eNode (North America)"
aliases: []
compatible_with:
  manufacturers:
    - "Stewart Filmscreen Corporation"
  models:
    - "eNode (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/integration/amx_type_documentation_mst_v1_2.pdf
  - https://www.convergingsystems.com/bin/doc/ddk/ddk_v2_3_w1_cs-bus.pdf
  - https://www.convergingsystems.com/bin/doc/enode/enode_cutsheet_v6c.pdf
  - https://www.convergingsystems.com/inres_csiddk.php
retrieved_at: 2026-04-29T19:09:44.516Z
last_checked_at: 2026-04-30T09:49:39.963Z
generated_at: 2026-04-30T09:49:39.963Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific eNode model variants (e.g., eNode/dmx) referenced in source but not fully documented"
  - "RS-232c via IBT-100 adapter - baud rate, data bits, parity, stop bits not stated in source"
  - "DISSOLVE.1, DISSOLVE.2, DISSOLVE.3, DISSOLVE.5 commands listed as WIP - not fully specified"
  - "RGB VALUE=R.G.B command listed as WIP - not fully specified"
  - "RGBW command listed as WIP - not fully specified"
  - "source does not specify unsolicited event notifications beyond NOTIFY feedback"
  - "specific interlock procedures for motor retraction/extension safety not detailed"
  - "IBT-100 serial adapter baud rate/settings not specified in source"
  - "DISSOLVE commands marked WIP — values not fully defined"
  - "STATUS=? command listed but crossed out; behavior unknown"
  - "PRESET.X=XX.XX command listed but crossed out; behavior unknown"
  - "DMX fixture-specific configuration beyond channel mapping not detailed"
  - "e-Node Pilot application details not documented"
  - "Specific voltage/current/power specifications for eNode hardware not stated"
verification:
  verdict: verified
  checked_at: 2026-04-30T09:49:39.963Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions matched verbatim to source commands; transport parameters verified. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Stewart Filmscreen Corporation eNode Control Spec

## Summary
Ethernet-connected lighting and motor controller supporting Telnet (TCP), UDP, and RS-232c. Controls LED lighting and motorized screen systems via Z.G.N addressing scheme. Supports bi-directional feedback via NOTIFY system.

<!-- UNRESOLVED: specific eNode model variants (e.g., eNode/dmx) referenced in source but not fully documented -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - serial
addressing:
  port: 23  # Telnet port stated
  udp_ports: [4000, 5000]
serial:
  # UNRESOLVED: RS-232c via IBT-100 adapter - baud rate, data bits, parity, stop bits not stated in source
  # IBT-100 is external adapter; serial params defined by adapter, not eNode
auth:
  type: configurable  # Login can be ENABLE or DISABLE via e-Node Pilot; inferred from "with or without authentication"
```

## Traits
```yaml
# Inferred from command tables:
- powerable       # ON/OFF commands present (LED table, Motor table)
- routable        # GOTO command present for motor positioning
- queryable       # COLOR=?, VALUE=?, POSITION=? bi-directional queries present
- levelable       # FADE_UP, FADE_DOWN, CCT, CCT_UP, CCT_DOWN, brightness control present
```

## Actions
```yaml
# LED Commands (Table 1)
- id: led_on
  label: LED On
  kind: action
  params: []

- id: led_off
  label: LED Off
  kind: action
  params: []

- id: effect
  label: Effect
  kind: action
  params:
    - name: n
      type: integer
      description: Effect number

- id: store_preset
  label: Store Preset
  kind: action
  params:
    - name: preset_num
      type: integer
      description: Preset number (1-24)

- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset_num
      type: integer
      description: Preset number (1-24)

- id: dissolve
  label: Dissolve
  kind: action
  params:
    - name: stage
      type: integer
      description: Dissolve stage (1, 2, 3, or 5)
    - name: value
      type: integer
      description: Dissolve value XX

- id: seqrate
  label: Sequence Rate
  kind: action
  params:
    - name: value
      type: integer
      description: Sequence rate XX

- id: sun_up
  label: Sun Up
  kind: action
  params: []

- id: sun_down
  label: Sun Down
  kind: action
  params: []

- id: sun_s
  label: Sun S
  kind: action
  params: []

- id: fade_up
  label: Fade Up
  kind: action
  params: []

- id: fade_down
  label: Fade Down
  kind: action
  params: []

- id: set_level
  label: Set Level
  kind: action
  params:
    - name: level
      type: integer
      description: Level value L

- id: hue_up
  label: Hue Up
  kind: action
  params: []

- id: hue_down
  label: Hue Down
  kind: action
  params: []

- id: set_hue
  label: Set Hue
  kind: action
  params:
    - name: hue
      type: integer
      description: Hue value H

- id: sat_up
  label: Saturation Up
  kind: action
  params: []

- id: sat_down
  label: Saturation Down
  kind: action
  params: []

- id: sat_s
  label: Saturation S
  kind: action
  params: []

- id: stop
  label: Stop
  kind: action
  params: []

- id: set_color_hsl
  label: Set Color HSL
  kind: action
  params:
    - name: hue
      type: integer
      description: Hue H
    - name: saturation
      type: integer
      description: Saturation S
    - name: level
      type: integer
      description: Level L

- id: preset_hsl
  label: Set Preset HSL
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number X
    - name: values
      type: string
      description: HSL color values (XXX.XXX.XXX format)

- id: set_red
  label: Set Red
  kind: action
  params:
    - name: value
      type: integer
      description: Red intensity 0-255

- id: set_green
  label: Set Green
  kind: action
  params:
    - name: value
      type: integer
      description: Green intensity 0-255

- id: set_blue
  label: Set Blue
  kind: action
  params:
    - name: value
      type: integer
      description: Blue intensity 0-255

- id: set_rgb
  label: Set RGB
  kind: action
  params:
    - name: red
      type: integer
      description: Red value
    - name: green
      type: integer
      description: Green value
    - name: blue
      type: integer
      description: Blue value

- id: set_white
  label: Set White
  kind: action
  params: []

- id: set_rgbw
  label: Set RGBW
  kind: action
  params:
    - name: red
      type: integer
      description: Red value
    - name: green
      type: integer
      description: Green value
    - name: blue
      type: integer
      description: Blue value
    - name: white
      type: integer
      description: White value

- id: preset_rgb
  label: Set Preset RGB
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number X
    - name: values
      type: string
      description: RGB color values (XXX.XXX.XXX or XXX.XXX.XXX.XXX format)

- id: set_cct
  label: Set Correlated Color Temperature
  kind: action
  params:
    - name: cct
      type: integer
      description: CCT value XXXX

- id: cct_up
  label: CCT Up
  kind: action
  params: []

- id: cct_down
  label: CCT Down
  kind: action
  params: []

# Motor Commands (Table 2)
- id: goto_position
  label: Goto Position
  kind: action
  params:
    - name: position
      type: integer
      description: Target position

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

- id: motor_right
  label: Motor Right
  kind: action
  params: []

- id: motor_left
  label: Motor Left
  kind: action
  params: []

- id: retract_screen
  label: Retract Screen
  kind: action
  params: []

- id: toggle_motor
  label: Toggle Motor
  kind: action
  params: []

- id: motor_store_preset
  label: Store Motor Preset
  kind: action
  params:
    - name: preset_num
      type: integer
      description: Preset number (1-24)

- id: motor_recall_preset
  label: Recall Motor Preset
  kind: action
  params:
    - name: preset_num
      type: integer
      description: Preset number (1-24)

# Test Commands
- id: test_led_green
  label: Test LED Green (All)
  kind: action
  params: []

- id: test_motor_up
  label: Test Motor Up (All)
  kind: action
  params: []

# UNRESOLVED: DISSOLVE.1, DISSOLVE.2, DISSOLVE.3, DISSOLVE.5 commands listed as WIP - not fully specified
# UNRESOLVED: RGB VALUE=R.G.B command listed as WIP - not fully specified
# UNRESOLVED: RGBW command listed as WIP - not fully specified
```

## Feedbacks
```yaml
# Bi-directional feedback format: !Z.G.N.COMMAND=VALUE
# NOTIFY must be enabled via e-Node Pilot

- id: color_feedback
  label: Color Feedback
  type: string
  description: HSB color data (Hue.Saturation.Brightness)

- id: value_feedback
  label: Value Feedback
  type: string
  description: RGB/RGBW color data

- id: preset_h_feedback
  label: Preset H Feedback
  type: string
  description: Preset HSL values query response

- id: preset_feedback
  label: Preset Feedback
  type: string
  description: Preset RGB/RGBW values query response

- id: position_feedback
  label: Position Feedback
  type: integer
  description: Motor position query response (BRIC II only)

# NOTIFY Options (LED):
- id: notify_color
  label: Notify Color
  type: enum
  values: [COLOR, VALUE, BOTH, OFF]
  description: Set via e-Node Pilot LED tab

# DMX Notify same as LED: COLOR, VALUE, BOTH, OFF
```

## Variables
```yaml
# Settable parameters via e-Node Pilot:
- id: notify_mode
  type: enum
  values: [COLOR, VALUE, BOTH, OFF]
  description: Bi-directional feedback setting

- id: verbose_mode
  type: boolean
  description: Verbose mode for feedback

- id: dmx_channel_mode
  type: enum
  values: [1, 3, 4, ">4"]
  description: DMX channel mapping (1=monochrome, 3=RGB, 4=RGBW, >4=multi-channel)

- id: addressing_scheme
  type: string
  description: Z.G.N addressing - Zone.Group.Node (1-254 each)

- id: dhcp_enabled
  type: boolean
  description: DHCP or Static IP configuration

- id: static_ip
  type: string
  description: Static IP address when DHCP disabled

- id: gateway_address
  type: string
  description: Gateway address for static IP configuration

- id: telnet_login_enabled
  type: boolean
  description: Telnet authentication can be enabled/disabled
```

## Events
```yaml
# UNRESOLVED: source does not specify unsolicited event notifications beyond NOTIFY feedback
# Note: controller must have non-zero Z/G/N address to send feedback
```

## Macros
```yaml
# Example broadcast commands documented:
- id: broadcast_led_red
  label: Broadcast LED Red (All)
  commands:
    - "#0.0.0.LED.VALUE=0.240.0:<cr>"
  description: All units turn red, only 2.1.1 responds with feedback

# Factory defaults:
- id: led_factory_default
  label: LED Factory Default Address
  address: "Zone=2, Group=1, Node=0"

- id: motor_factory_default
  label: Motor Factory Default Address
  address: "Zone=1, Group=1, Node=0"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - CS-Bus must maintain twisted pairs on pins 1&2, 3&4, 5&6
  - Do NOT use telephony cable (wiring topology swapped: 1-6, 2-5, 3-4)
  - Do NOT use standard Ethernet cabling (568A or 568B) - twisted pairs inconsistent with CS-BUS
  - Bus must be terminated at beginning and end with 120 ohm resistor on pins 3/4
  - DMX bus must be terminated on final OUT/THRU connector with 120 ohm resistor
  # UNRESOLVED: specific interlock procedures for motor retraction/extension safety not detailed
```

## Notes

**Command Syntax:** `#Z.G.N.COMMAND=VALUE<cr>` — Zone.Group.Node addressing with wildcard support (0 broadcasts to all matching)

**Bi-directional Feedback:** Response format `!Z.G.N.COMMAND=VALUE` — exclamation mark indicates message from CS-Bus device

**Addressing:**
- Zone: 1–254, Group: 1–254, Node: 1–254
- Wildcard "0" broadcasts to all matching controllers

**DMX Configuration:**
- Maximum 32 fixtures per e-Node/dmx
- Maximum 4000 feet CS-Bus cabling (CAT5e or better)
- Maximum 254 controllers per e-Node
- DMX maximum cabling: 1200 meters (3900 feet)

**CS-BUS Wiring:** RJ-25 / RJ-11 6P6C standard; must maintain twisted pairs; 120 ohm termination required

**Telnet Authentication:** Default credentials Telnet 1/Password 1 (format: first letter cap, space before number); can be disabled via e-Node Pilot

<!-- UNRESOLVED: IBT-100 serial adapter baud rate/settings not specified in source -->
<!-- UNRESOLVED: DISSOLVE commands marked WIP — values not fully defined -->
<!-- UNRESOLVED: STATUS=? command listed but crossed out; behavior unknown -->
<!-- UNRESOLVED: PRESET.X=XX.XX command listed but crossed out; behavior unknown -->
<!-- UNRESOLVED: DMX fixture-specific configuration beyond channel mapping not detailed -->
<!-- UNRESOLVED: e-Node Pilot application details not documented -->
<!-- UNRESOLVED: Specific voltage/current/power specifications for eNode hardware not stated -->

## Provenance

```yaml
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/integration/amx_type_documentation_mst_v1_2.pdf
  - https://www.convergingsystems.com/bin/doc/ddk/ddk_v2_3_w1_cs-bus.pdf
  - https://www.convergingsystems.com/bin/doc/enode/enode_cutsheet_v6c.pdf
  - https://www.convergingsystems.com/inres_csiddk.php
retrieved_at: 2026-04-29T19:09:44.516Z
last_checked_at: 2026-04-30T09:49:39.963Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:49:39.963Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions matched verbatim to source commands; transport parameters verified. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific eNode model variants (e.g., eNode/dmx) referenced in source but not fully documented"
- "RS-232c via IBT-100 adapter - baud rate, data bits, parity, stop bits not stated in source"
- "DISSOLVE.1, DISSOLVE.2, DISSOLVE.3, DISSOLVE.5 commands listed as WIP - not fully specified"
- "RGB VALUE=R.G.B command listed as WIP - not fully specified"
- "RGBW command listed as WIP - not fully specified"
- "source does not specify unsolicited event notifications beyond NOTIFY feedback"
- "specific interlock procedures for motor retraction/extension safety not detailed"
- "IBT-100 serial adapter baud rate/settings not specified in source"
- "DISSOLVE commands marked WIP — values not fully defined"
- "STATUS=? command listed but crossed out; behavior unknown"
- "PRESET.X=XX.XX command listed but crossed out; behavior unknown"
- "DMX fixture-specific configuration beyond channel mapping not detailed"
- "e-Node Pilot application details not documented"
- "Specific voltage/current/power specifications for eNode hardware not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
