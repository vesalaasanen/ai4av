---
spec_id: admin/rollease-acmeda-automate-motor
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rollease Acmeda Automate™ Motor Control Spec"
manufacturer: "Rollease Acmeda"
model_family: "Automate ARC Motor (via Pulse Hub)"
aliases: []
compatible_with:
  manufacturers:
    - "Rollease Acmeda"
  models:
    - "Automate ARC Motor (via Pulse Hub)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rolleaseacmeda.com
  - avoutlet.com
source_urls:
  - https://www.rolleaseacmeda.com/docs/default-source/us/smart-home-integration/serial-protocol/Serial_Protocol_PRGM_GL_v1_3pdf.pdf
  - https://www.avoutlet.com/images/product/additional/r/pulse-serial-instructions.pdf
retrieved_at: 2026-06-01T22:33:22.885Z
last_checked_at: 2026-06-02T08:29:14.974Z
generated_at: 2026-06-02T08:29:14.974Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "spec covers a single hub/motor pair; one RS-485 line supports up to 32 Pulse Hubs, each hub up to 15 motors."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source"
  - "flow control not stated; defaulted to none."
  - "safety interlocks and confirmation requirements not stated."
  - "pairing/addressing interaction timing and retries not specified."
verification:
  verdict: verified
  checked_at: 2026-06-02T08:29:14.974Z
  matched_actions: 46
  action_count: 46
  confidence: medium
  summary: "All 46 spec actions map 1-to-1 to verbatim command tokens in the source tables; transport parameters match exactly; source catalogue also has exactly 46 distinct tokens. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Rollease Acmeda Automate™ Motor Control Spec

## Summary
Bi-directional control of Rollease Acmeda ARC motorized window treatments via the Automate Pulse Hub. The hub exposes an RS-485 2-wire UART interface using simple ASCII command strings framed with `!` start and `;` end characters, addressed to a 3-byte hub and (optionally) a 3-byte motor address. Note: user-supplied "RS-232C" hint conflicts with source — source documents RS-485 2-wire; an RS-232↔RS-485 converter is mentioned for controllers with only RS-232.

<!-- UNRESOLVED: spec covers a single hub/motor pair; one RS-485 line supports up to 32 Pulse Hubs, each hub up to 15 motors. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
# Source: RS-485 2-wire physical layer, async UART framing. 232>485 converter needed for RS-232-only controllers.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: open/up, close/down, stop, factory reset commands
- routable        # inferred: position routing via m, b, f commands
- queryable       # inferred: N?, r?, f?, pSc?, pVc?, v?, pP? query commands
- levelable       # inferred: percentage position control (m, b commands)
```

## Actions
```yaml
# Hub-level commands
- id: query_hub_address
  label: Query Pulse Hub Address (broadcast)
  kind: query
  command: "!000V;"
  params: []
  notes: Global address 000. Every hub on the bus replies with its own address (e.g. !XXXV;).

- id: modify_hub_address
  label: Modify Pulse Hub Address
  kind: action
  command: "!XXXG{ZZZ};"
  params:
    - name: XXX
      type: string
      description: Current 3-byte hub address (001-ZZZ)
    - name: ZZZ
      type: string
      description: New 3-byte hub address (001-ZZZ)
  notes: Returns !XXXA; - hub flashes 6 times.

- id: test_hub
  label: Test Pulse Hub
  kind: action
  command: "!XXXT;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address (001-ZZZ)
  notes: Hub flashes to confirm presence.

- id: reset_hub
  label: Module Reset (Hub)
  kind: action
  command: "!XXXD000*;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
  notes: Resets all data of the addressed Pulse Hub.

# Pairing
- id: pair_auto_address
  label: Pair Motor (auto-assign address)
  kind: action
  command: "!XXXD000&;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
  notes: Hub generates a random 3-byte ASCII address for the paired motor.

- id: pair_specific_address
  label: Pair Motor (specific address)
  kind: action
  command: "!XXXD000&{YYY};"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte ASCII motor address to assign (001-ZZZ)

- id: unpair_motor
  label: Unpair Motor
  kind: action
  command: "!XXXD{YYY}#;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address to unpair
  notes: Requires motor feedback. Hub returns !XXXDYYYA; on success.

- id: modify_motor_address
  label: Modify Motor Address
  kind: action
  command: "!XXXD{YYY}@{ZZZ};"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: Current 3-byte motor address
    - name: ZZZ
      type: string
      description: New 3-byte motor address

- id: delete_motor_address
  label: Delete Motor Address
  kind: action
  command: "!XXXD{YYY}$;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address to delete

# Operations
- id: open_up
  label: Open / Up
  kind: action
  command: "!XXXD{YYY}o;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: close_down
  label: Close / Down
  kind: action
  command: "!XXXD{YYY}c;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: stop
  label: Stop
  kind: action
  command: "!XXXD{YYY}s;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: jog_open_up
  label: Jog Open / Up
  kind: action
  command: "!XXXD{YYY}oA;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: jog_close_down
  label: Jog Close / Down
  kind: action
  command: "!XXXD{YYY}cA;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: move_by_percentage
  label: Move by Percentage
  kind: action
  command: "!XXXD{YYY}m{DDD};"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
    - name: DDD
      type: string
      description: 3-digit travel percentage (000-100)
  notes: Absolute travel percentage.

- id: rotate_angle_by_percentage
  label: Rotate Angle by Percentage
  kind: action
  command: "!XXXD{YYY}b{DDD};"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
    - name: DDD
      type: string
      description: 3-digit rotation percentage (0-180 degrees)
  notes: Slat/tilt rotation.

- id: move_to_preferred_limit
  label: Move to Preferred Limit (3rd Position)
  kind: action
  command: "!XXXD{YYY}f;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: Hub returns NULL uplink if no 3rd position set, otherwise stop position.

# Queries
- id: query_motor_parameters
  label: Request Motor Parameters
  kind: query
  command: "!XXXD{YYY}N?;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: Hub replies with 8-digit motor parameter string.

- id: query_current_position
  label: Request Current Position (running)
  kind: query
  command: "!XXXD{YYY}r?;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: Returns !XXXDYYY U; if no top/bottom limits, else !XXXDYYY rDD1bDD2; with travel% and rotation 0-180.

- id: query_preferred_position
  label: Request 3rd Position (preferred limit)
  kind: query
  command: "!XXXD{YYY}f?;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: Returns !XXXDYYY U; if no 3rd position set, else position.

- id: query_motor_speed
  label: Request Motor Speed
  kind: query
  command: "!XXXD{YYY}pSc?;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: Hub replies !XXXDYYY pScDDD; with speed in rpm.

- id: query_motor_voltage
  label: Request Motor Voltage
  kind: query
  command: "!XXXD{YYY}pVc?;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: Hub replies !XXXDYYY pVcDDD; with voltage in V.

- id: query_motor_version
  label: Request Motor Version
  kind: query
  command: "!XXXD{YYY}v?;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: Hub replies !XXXDYYY vA DD; - T = type (A=AC, C=curtain, D=DC, S=socket, L=lighting), VV = version.

- id: query_position_limits
  label: Request Position Limit Setting
  kind: query
  command: "!XXXD{YYY}pP?;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: HH=00 none, HH=01 upper+lower, HH=03 upper+lower+3rd.

# Parameters - limit setting
- id: set_upper_limit
  label: Set Current Position as Upper Limit
  kind: action
  command: "!XXXD{YYY}pEoH;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: set_lower_limit
  label: Set Current Position as Lower Limit
  kind: action
  command: "!XXXD{YYY}pEcH;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: adjust_upper_limit
  label: Adjust Upper Limit
  kind: action
  command: "!XXXD{YYY}pEoA;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: adjust_lower_limit
  label: Adjust Lower Limit
  kind: action
  command: "!XXXD{YYY}pEcA;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: cancel_all_limits
  label: Cancel All Limits
  kind: action
  command: "!XXXD{YYY}pEaC;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: set_favorite_position
  label: Set Current Position as Favorite (3rd) Position
  kind: action
  command: "!XXXD{YYY}pEmH;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: cancel_favorite_position
  label: Cancel Favorite (3rd) Position
  kind: action
  command: "!XXXD{YYY}pEmC;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: modify_position_limit_setting
  label: Modify Position Limit Setting
  kind: action
  command: "!XXXD{YYY}pP{HH};"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
    - name: HH
      type: string
      description: "00 = no limits; 01 = upper+lower; 03 = upper+lower+3rd"

# Speed / gain parameters
- id: increase_continuous_speed
  label: Increase Continuous Running Speed by One Level
  kind: action
  command: "!XXXD{YYY}pGc+;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: decrease_continuous_speed
  label: Decrease Continuous Running Speed by One Level
  kind: action
  command: "!XXXD{YYY}pGc-;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: increase_jog_speed
  label: Increase Jogging Speed by One Level
  kind: action
  command: "!XXXD{YYY}pGd+;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: decrease_jog_speed
  label: Decrease Jogging Speed by One Level
  kind: action
  command: "!XXXD{YYY}pGd-;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: increase_angle_coefficient
  label: Increase Angle Coefficient by One
  kind: action
  command: "!XXXD{YYY}pGa+;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: decrease_angle_coefficient
  label: Decrease Angle Coefficient by One
  kind: action
  command: "!XXXD{YYY}pGa-;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: increase_jog_distance
  label: Increase Jog Distance by One Unit
  kind: action
  command: "!XXXD{YYY}pGr+;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

- id: decrease_jog_distance
  label: Decrease Jog Distance by One Unit
  kind: action
  command: "!XXXD{YYY}pGr-;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address

# Motor running mode
- id: set_running_mode_pM01
  label: Set Motor Running Mode pM01
  kind: action
  command: "!XXXD{YYY}pM01;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: "Source: switch motor mode between jog and continuous running."

- id: set_running_mode_pM02
  label: Set Motor Running Mode pM02
  kind: action
  command: "!XXXD{YYY}pM02;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: "Source: motor rotation direction change."

- id: set_running_mode_pM04
  label: Set Motor Running Mode pM04
  kind: action
  command: "!XXXD{YYY}pM04;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: "Source: motor angle direction change."

- id: set_running_mode_pM08
  label: Set Motor Running Mode pM08
  kind: action
  command: "!XXXD{YYY}pM08;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: "Source: slow-start and slow-stop mode."

- id: set_running_mode_pM10
  label: Set Motor Running Mode pM10
  kind: action
  command: "!XXXD{YYY}pM10;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
  notes: "Source: full-speed start-up mode."

- id: factory_reset
  label: Reset to Factory Default Mode
  kind: action
  command: "!XXXD{YYY}pR*;"
  params:
    - name: XXX
      type: string
      description: 3-byte hub address
    - name: YYY
      type: string
      description: 3-byte motor address
```

## Feedbacks
```yaml
- id: motor_position
  type: object
  description: "Returned by r/< uplink events and r? query. Shape: { travel_pct: integer 0-100, rotation_deg: integer 0-180 }."
- id: limit_setting_state
  type: enum
  values: [none, upper_lower, upper_lower_third]
  description: "pP? reply. HH=00 none, HH=01 upper+lower, HH=03 upper+lower+3rd."
- id: motor_speed_rpm
  type: integer
  unit: rpm
  description: "pSc? reply, 3-digit value."
- id: motor_voltage
  type: integer
  unit: V
  description: "pVc? reply, 3-digit value."
- id: motor_version
  type: string
  description: "v? reply. T=type (A=AC, C=curtain, D=DC, S=socket, L=lighting), VV=version."
- id: motor_parameters
  type: string
  description: "N? reply, 8-digit parameter string."
- id: stroke_unavailable
  type: enum
  values: [no_stroke, no_position_feedback]
  description: "Uplink !XXXDYYYU; - no top/bottom limits set, no position feedback, or no preset."
- id: hub_ack
  type: string
  description: "Generic hub ack !XXXA; (test, address change)."
```

## Variables
```yaml
# All settable parameters in source appear as discrete command rows; no continuous settable variables documented.
```

## Events
```yaml
- id: movement_start
  description: "!XXXDYYY<DD1bDD2; - movement start. DD1=travel%, DD2=rotation 0-180."
- id: movement_stop
  description: "!XXXDYYY rDD1bDD2; - movement end. DD1=travel%, DD2=rotation 0-180."
- id: jog_start
  description: "Jog variant of movement_start."
- id: jog_stop
  description: "Jog variant of movement_stop."
- id: no_movement
  description: "!XXXDYYY U; - movement command rejected (no stroke, no preset, etc)."
- id: pair_result
  description: "!XXXDYYYA; - successful pair / unpair / delete."
- id: address_changed
  description: "!XXXDZZZA; - hub address change confirmation."
- id: hub_test_flash
  description: "!XXXA; + 6 flashes - test command acknowledged."
- id: global_version_burst
  description: "!XXXV; repeated - every hub replies to global V? query."
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Source protocol is RS-485 2-wire UART (9600 8N1). User-supplied "RS-232C" hint conflicts with source — spec uses `serial` and notes the RS-485 physical layer; an RS-232↔RS-485 converter is mentioned for RS-232-only controllers.
- Default Pulse Hub address is 245; global address 000 reserved for broadcast.
- Motor addresses are 3-byte ASCII ranging 001-ZZZ (digits 0-9 and letters A-Z).
- Each command string framed with `!` (start) and `;` (end) ASCII characters.
- Hub forwards downlink ASCII to the addressed ARC motor over 433 MHz RF and returns motor's uplink reply; controller only talks to hub over serial.
- Hub manages traffic but buffer overflow possible when many hubs reply to global commands in short window.
- Pairing / unpairing / address-modify / delete all require motor feedback; controller must wait for hub's uplink reply.
- Source has typos ("contiuous", "messgae", "charaacter") — preserved where they appear in protocol mnemonics only in `notes`; command payloads copied verbatim from command tables.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: flow control not stated; defaulted to none. -->
<!-- UNRESOLVED: safety interlocks and confirmation requirements not stated. -->
<!-- UNRESOLVED: pairing/addressing interaction timing and retries not specified. -->

## Provenance

```yaml
source_domains:
  - rolleaseacmeda.com
  - avoutlet.com
source_urls:
  - https://www.rolleaseacmeda.com/docs/default-source/us/smart-home-integration/serial-protocol/Serial_Protocol_PRGM_GL_v1_3pdf.pdf
  - https://www.avoutlet.com/images/product/additional/r/pulse-serial-instructions.pdf
retrieved_at: 2026-06-01T22:33:22.885Z
last_checked_at: 2026-06-02T08:29:14.974Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:29:14.974Z
matched_actions: 46
action_count: 46
confidence: medium
summary: "All 46 spec actions map 1-to-1 to verbatim command tokens in the source tables; transport parameters match exactly; source catalogue also has exactly 46 distinct tokens. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "spec covers a single hub/motor pair; one RS-485 line supports up to 32 Pulse Hubs, each hub up to 15 motors."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility not stated in source"
- "flow control not stated; defaulted to none."
- "safety interlocks and confirmation requirements not stated."
- "pairing/addressing interaction timing and retries not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
