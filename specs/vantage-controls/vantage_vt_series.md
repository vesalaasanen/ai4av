---
spec_id: admin/vantage-vt-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vantage Controls Vantage VT-series Control Spec"
manufacturer: "Vantage Controls"
model_family: "Vantage InFusion Controller"
aliases: []
compatible_with:
  manufacturers:
    - "Vantage Controls"
  models:
    - "Vantage InFusion Controller"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
  - elanportal.com
  - github.com
source_urls:
  - http://www.convergingsystems.com/bin/doc/integration/application_note_vantage_v3.pdf
  - http://elanportal.com/supportdocs/catalog/Vantage_InFusion.pdf
  - https://github.com/ptr727/loopj-aiovantage
retrieved_at: 2026-07-24T18:54:26.924Z
last_checked_at: 2026-08-05T08:50:14.705Z
generated_at: 2026-08-05T08:50:14.705Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Vantage VT-series-specific command payload syntax is not included in source."
  - "source identifies Vantage InFusion rather than an explicit VT-series model number."
  - "Telnet TCP port not stated in source"
  - "source does not define variable schemas separately from command syntax."
  - "no explicit multi-step command macros documented in source."
  - "exact Vantage VT-series model identifiers and firmware compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:50:14.705Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions map to wire-literal tokens enumerated in the source's LED and Motor command tables; transport values derive from the source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Vantage Controls Vantage VT-series Control Spec

## Summary
This document describes Vantage InFusion controller integration with Converging Systems e-Node and IBT-100 devices. It documents Ethernet/Telnet, UDP configuration, and RS-232 integration for lighting and motor control, including command names, addressing, feedback, and setup requirements.

<!-- UNRESOLVED: Vantage VT-series-specific command payload syntax is not included in source. -->
<!-- UNRESOLVED: source identifies Vantage InFusion rather than an explicit VT-series model number. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - udp
addressing:
  port: null  # UNRESOLVED: Telnet TCP port not stated in source
  udp_port: 4999
serial:
  baud_rate: 57600
  data_bits: 8  # inferred from n,1 serial notation; source does not explicitly state data bits
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # explicitly requires Telnet Login DISABLE
```

## Traits
```yaml
- powerable  # inferred from ON and OFF commands
- routable  # inferred from zone/group/node addressing and device control
- queryable  # inferred from STATUS=?, POSITION=?, COLOR=?, and VALUE=? queries
- levelable  # inferred from SET,L, DISSOLVE, RGB, HSB, and motor position controls
```

## Actions
```yaml
- id: led_on
  label: LED On
  kind: action
  command: "ON"
  params: []

- id: led_off
  label: LED Off
  kind: action
  command: "OFF"
  params: []

- id: led_effect
  label: LED Effect
  kind: action
  command: "EFFECT,#"
  params: []

- id: next_effect
  label: Next Effect
  kind: action
  command: "NEXT (n) EFFECT"
  params: []

- id: store_preset
  label: Store Preset
  kind: action
  command: "STORE,#"
  params: []

- id: next_store_preset
  label: Next Store Preset
  kind: action
  command: "NEXT(n)STORE PRESET"
  params: []

- id: next_recall_preset
  label: Next Recall Preset
  kind: action
  command: "NEXT(n)RECALL PRESET"
  params: []

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "RECALL,#"
  params: []

- id: dissolve
  label: Dissolve
  kind: action
  command: "DISSOLVE.X=XX"
  params: []

- id: sequence_rate
  label: Sequence Rate
  kind: action
  command: "SEQRATE=XX"
  params: []

- id: sun_up
  label: Sun Up
  kind: action
  command: "SUN_UP"
  params: []

- id: sun_down
  label: Sun Down
  kind: action
  command: "SUN_DOWN"
  params: []

- id: sun
  label: Sun
  kind: action
  command: "SUN.S"
  params: []

- id: fade_up
  label: Fade Up
  kind: action
  command: "FADE_UP"
  params: []

- id: fade_down
  label: Fade Down
  kind: action
  command: "FADE_DOWN"
  params: []

- id: set_level
  label: Set Level
  kind: action
  command: "SET,L"
  params: []

- id: hue_up
  label: Hue Up
  kind: action
  command: "HUE_UP"
  params: []

- id: hue_down
  label: Hue Down
  kind: action
  command: "HUE_DOWN"
  params: []

- id: set_hue
  label: Set Hue
  kind: action
  command: "HUE,H"
  params: []

- id: saturation_up
  label: Saturation Up
  kind: action
  command: "SAT_UP"
  params: []

- id: saturation_down
  label: Saturation Down
  kind: action
  command: "SAT_DOWN"
  params: []

- id: set_saturation
  label: Set Saturation
  kind: action
  command: "SAT_S"
  params: []

- id: color_stop
  label: Stop Color Transition
  kind: action
  command: "STOP"
  params: []

- id: set_hsl_color
  label: Set HSL Color
  kind: action
  command: "COLOR=H.S.L"
  params: []

- id: set_hsl_preset
  label: Set HSL Preset
  kind: action
  command: "PRESETH.X=XXX.XXX.XXX"
  params: []

- id: set_three_color_preset
  label: Set Three-Color Preset
  kind: action
  command: "PRESET.X=XXX.XXX.XXX"
  params: []

- id: set_four_color_preset
  label: Set Four-Color Preset
  kind: action
  command: "PRESET.X=XXX.XXX.XXX"
  params: []

- id: set_red
  label: Set Red
  kind: action
  command: "RED,R"
  params: []

- id: set_green
  label: Set Green
  kind: action
  command: "GREEN,G"
  params: []

- id: set_blue
  label: Set Blue
  kind: action
  command: "BLUE,B"
  params: []

- id: set_rgb_value
  label: Set RGB Value
  kind: action
  command: "VALUE=R.G.B"
  params: []

- id: set_white
  label: Set White
  kind: action
  command: "WHITE,W"
  params: []

- id: set_rgbw_value
  label: Set RGBW Value
  kind: action
  command: "VALUE=R,G,B,W"
  params: []

- id: set_cct
  label: Set Correlated Color Temperature
  kind: action
  command: "CCT,XXXX"
  params: []

- id: cct_up
  label: Correlated Color Temperature Up
  kind: action
  command: "CCT_UP"
  params: []

- id: cct_down
  label: Correlated Color Temperature Down
  kind: action
  command: "CCT_DOWN"
  params: []

- id: motor_up
  label: Motor Up
  kind: action
  command: "UP"
  params: []

- id: motor_down
  label: Motor Down
  kind: action
  command: "DOWN"
  params: []

- id: motor_stop
  label: Motor Stop
  kind: action
  command: "STOP"
  params: []

- id: motor_retract
  label: Motor Retract
  kind: action
  command: "RETRACT"
  params: []

- id: motor_store_preset
  label: Motor Store Preset
  kind: action
  command: "STORE,#"
  params: []

- id: motor_recall_preset
  label: Motor Recall Preset
  kind: action
  command: "RECALL,#"
  params: []

- id: motor_preset
  label: Motor Preset
  kind: action
  command: "PRESET.X=XX.XX"
  params: []

- id: color_query
  label: Color Query
  kind: query
  command: "COLOR=?"
  params: []

- id: value_query
  label: Value Query
  kind: query
  command: "VALUE=?"
  params: []

- id: hsl_preset_query
  label: HSL Preset Query
  kind: query
  command: "PRESETH.X=?"
  params: []

- id: preset_query
  label: Preset Query
  kind: query
  command: "PRESET.X=?"
  params: []

- id: motor_status_query
  label: Motor Status Query
  kind: query
  command: "STATUS=?"
  params: []

- id: motor_position_query
  label: Motor Position Query
  kind: query
  command: "POSITION=?"
  params: []
```

## Feedbacks
```yaml
- id: color_state
  type: value
  command: "COLOR=?"
  description: HSB color feedback

- id: rgb_value_state
  type: value
  command: "VALUE=?"
  description: RGB value feedback

- id: hsl_preset_state
  type: value
  command: "PRESETH.X=?"
  description: HSL preset feedback

- id: preset_state
  type: value
  command: "PRESET.X=?"
  description: Preset feedback

- id: motor_status
  type: value
  command: "STATUS=?"
  description: Motor status feedback

- id: motor_position
  type: value
  command: "POSITION=?"
  description: Motor position feedback

- id: unsolicited_notifications
  type: value
  command: "NOTIFY=COLOR|VALUE|BOTH"
  description: Controller notifications for color or RGB state changes
```

## Variables
```yaml
# UNRESOLVED: source does not define variable schemas separately from command syntax.
```

## Events
```yaml
- id: color_state_changed
  description: Controller can notify Vantage when color state changes.
  payload: "NOTIFY=COLOR"

- id: rgb_state_changed
  description: Controller can notify Vantage when RGB state changes.
  payload: "NOTIFY=VALUE"

- id: color_and_rgb_state_changed
  description: Controller can notify Vantage for both HSB and RGB state changes.
  payload: "NOTIFY=BOTH"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step command macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: CS-Bus must terminate beginning and end of bus with 120 ohm resistor on pins 3/4.
  - description: Final DMX fixture OUT or THRU connector must terminate with a 120 ohm resistor.
```

## Notes
- Ethernet integration uses e-Node Telnet without authentication; e-Node Login must be DISABLE, followed by restart.
- Source states UDP port 4999 as example configuration and recommends changing the e-Node listen port and Pilot send port to matching values; it is not identified as universal device default.
- IBT-100 default serial parameters: 57,600 baud, no parity, 1 stop bit, no flow control.
- Zone, Group, and Node addresses support values 1–254; wildcard `0` can broadcast to an address subset.
- Factory default ILC-x00 address is Zone `2`, Group `1`, Node `0` or undefined.
- Source states maximum 254 ILC-100 controllers/keypads per e-Node and maximum 254 e-Nodes per Vantage system.
- Feedback behavior depends on Verbose Mode and NOTIFY settings.
- NOTIFY=ALL appears in feedback matrix, while earlier configuration text documents COLOR, VALUE, and BOTH; exact command payload for ALL is unresolved.
- Source does not provide Telnet TCP port.
- Source does not provide complete protocol framing, delimiters, response formats, or command parameter types.
<!-- UNRESOLVED: exact Vantage VT-series model identifiers and firmware compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - convergingsystems.com
  - elanportal.com
  - github.com
source_urls:
  - http://www.convergingsystems.com/bin/doc/integration/application_note_vantage_v3.pdf
  - http://elanportal.com/supportdocs/catalog/Vantage_InFusion.pdf
  - https://github.com/ptr727/loopj-aiovantage
retrieved_at: 2026-07-24T18:54:26.924Z
last_checked_at: 2026-08-05T08:50:14.705Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:50:14.705Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions map to wire-literal tokens enumerated in the source's LED and Motor command tables; transport values derive from the source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Vantage VT-series-specific command payload syntax is not included in source."
- "source identifies Vantage InFusion rather than an explicit VT-series model number."
- "Telnet TCP port not stated in source"
- "source does not define variable schemas separately from command syntax."
- "no explicit multi-step command macros documented in source."
- "exact Vantage VT-series model identifiers and firmware compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
