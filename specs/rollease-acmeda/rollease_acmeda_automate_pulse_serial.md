---
spec_id: admin/rollease-acmeda-automate-pulse
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rollease Acmeda Automate Pulse Control Spec"
manufacturer: "Rollease Acmeda"
model_family: MTRF-PULSE-AU
aliases: []
compatible_with:
  manufacturers:
    - "Rollease Acmeda"
  models:
    - MTRF-PULSE-AU
    - MTRF-PULSE-EU
    - MTRF-PULSE-UK
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rolleaseacmeda.com
  - avoutlet.com
source_urls:
  - https://www.rolleaseacmeda.com/docs/default-source/us/smart-home-integration/serial-protocol/Serial_Protocol_PRGM_GL_v1_3pdf.pdf
  - https://www.rolleaseacmeda.com/docs/default-source/us/smart-home-motorization/smart-home-automate-systems/rti_quick_start_guide_pulse1.pdf
  - https://www.avoutlet.com/images/product/additional/r/pulse-serial-instructions.pdf
retrieved_at: 2026-06-01T22:23:37.539Z
last_checked_at: 2026-06-02T08:29:20.855Z
generated_at: 2026-06-02T08:29:20.855Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "No firmware version compatibility stated. No power-supply/electrical specs stated."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version not stated in source. No power-supply voltage"
verification:
  verdict: verified
  checked_at: 2026-06-02T08:29:20.855Z
  matched_actions: 46
  action_count: 46
  confidence: medium
  summary: "All 46 spec actions match verbatim source command tokens across sections 3.1-3.6; transport parameters confirmed; source command count equals spec count. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Rollease Acmeda Automate Pulse Control Spec

## Summary
The Automate Pulse is a Wi-Fi to 433 MHz RF hub bridging third-party controllers to ARC motorized window treatments. Source documents a bi-directional ASCII ARC serial protocol over RS-485 (2-wire), with adapter kits (RS-485↔RS-232, DB9↔RJ45) available for systems lacking native RS-485. Spec covers hub and motor control: addressing, pairing, movement, queries, and parameter tuning.

<!-- UNRESOLVED: No firmware version compatibility stated. No power-supply/electrical specs stated. -->

## Transport
```yaml
# Native electrical interface is RS-485 2-wire per source; operators on
# RS-232-only systems need a 232>485 converter. Serial framing given.
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

**Address model (3-byte ASCII, 0-9 & A-Z, range 001-ZZZ; "000" = global broadcast; "?" = query):**
- Hub address: default `245`; address `000` reserves global.
- Motor address: sub-addressed after hub via delimiter `D`.
- Frame: `!{hub}D{motor}{keyword}{data};` (motor) or `!{hub}{keyword}{data};` (hub-only).

## Traits
```yaml
- queryable  # inferred from explicit query commands (N?, r?, f?, pSc?, pVc?, v?, pP?, V)
```

## Actions
```yaml
# --- Hub-only commands (3.1) ---
- id: query_hub_address
  label: Query Pulse Hub Address (Broadcast)
  kind: query
  command: "!000V;"
  params: []
- id: modify_hub_address
  label: Modify Pulse Hub Address
  kind: action
  command: "!{hub}G{new_hub};"
  params:
    - name: hub
      type: string
      description: Current 3-byte ASCII hub address (001-ZZZ)
    - name: new_hub
      type: string
      description: New 3-byte ASCII hub address (001-ZZZ)
- id: test_hub
  label: Test Pulse Hub
  kind: action
  command: "!{hub}T;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address (001-ZZZ)
# Hub replies with !XXXA; (hub LED flashes 6 times)

# --- Hub module reset (3.2) ---
- id: module_reset
  label: Module Reset (reset all data of pulse hub)
  kind: action
  command: "!{hub}D000*;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address

# --- Pairing (3.3) ---
- id: pair_random_address
  label: Pair (random address generated)
  kind: action
  command: "!{hub}D000&;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
- id: pair_with_address
  label: Pair with specified address
  kind: action
  command: "!{hub}D000&{motor};"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address (001-ZZZ)
- id: unpair_motor
  label: Unpair motor (requires motor feedback)
  kind: action
  command: "!{hub}D{motor}#;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address to unpair
- id: modify_motor_address
  label: Modify motor address under pulse hub
  kind: action
  command: "!{hub}D{motor}@{new_motor};"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: Current 3-byte ASCII motor address
    - name: new_motor
      type: string
      description: New 3-byte ASCII motor address
- id: delete_motor_address
  label: Delete motor address in module
  kind: action
  command: "!{hub}D{motor}$;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address to delete

# --- Operations (3.4) ---
- id: open_up
  label: Open / Up
  kind: action
  command: "!{hub}D{motor}o;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: close_down
  label: Close / Down
  kind: action
  command: "!{hub}D{motor}c;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: stop
  label: Stop
  kind: action
  command: "!{hub}D{motor}s;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: jog_open_up
  label: Jog Open / Up
  kind: action
  command: "!{hub}D{motor}oA;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: jog_close_down
  label: Jog Close / Down
  kind: action
  command: "!{hub}D{motor}cA;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: move_by_percentage
  label: Move by percentage
  kind: action
  command: "!{hub}D{motor}m{percent};"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
    - name: percent
      type: string
      description: Travel percentage, 3-digit ASCII (e.g. 100 = 100%)
- id: rotate_angle_by_percentage
  label: Rotate angle by percentage
  kind: action
  command: "!{hub}D{motor}b{angle_percent};"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
    - name: angle_percent
      type: string
      description: Rotation percentage, 3-digit ASCII (0-180 degrees mapped to 0-100%)
- id: move_to_preferred_position
  label: Move to preferred (3rd) limit position
  kind: action
  command: "!{hub}D{motor}f;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address

# --- Queries (3.5) ---
- id: query_motor_parameter
  label: Request motor parameter
  kind: query
  command: "!{hub}D{motor}N?;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: query_current_position
  label: Request current position
  kind: query
  command: "!{hub}D{motor}r?;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: query_third_position
  label: Request 3rd (preferred) position setting
  kind: query
  command: "!{hub}D{motor}f?;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: query_motor_speed
  label: Request motor speed
  kind: query
  command: "!{hub}D{motor}pSc?;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: query_motor_voltage
  label: Request motor voltage
  kind: query
  command: "!{hub}D{motor}pVc?;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: query_version
  label: Request motor version
  kind: query
  command: "!{hub}D{motor}v?;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: query_position_limit_setting
  label: Request position limit setting
  kind: query
  command: "!{hub}D{motor}pP?;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address

# --- Parameters (3.6) ---
# Set motor limit (1)
- id: set_upper_limit
  label: Set current position as upper limit
  kind: action
  command: "!{hub}D{motor}pEoH;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: set_lower_limit
  label: Set current position as lower limit
  kind: action
  command: "!{hub}D{motor}pEcH;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: adjust_upper_limit
  label: Adjust upper limit
  kind: action
  command: "!{hub}D{motor}pEoA;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: adjust_lower_limit
  label: Adjust lower limit
  kind: action
  command: "!{hub}D{motor}pEcA;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: cancel_all_limits
  label: Cancel all limits
  kind: action
  command: "!{hub}D{motor}pEaC;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: set_favorite_position
  label: Set current position as favorite (3rd) position
  kind: action
  command: "!{hub}D{motor}pEmH;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: cancel_favorite_position
  label: Cancel favorite position
  kind: action
  command: "!{hub}D{motor}pEmC;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
# Modify position limit setting (2)
- id: modify_position_limit_setting
  label: Modify position limit setting
  kind: action
  command: "!{hub}D{motor}pP{hh};"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
    - name: hh
      type: string
      description: 'Limit state code: 00 = no limits set, 01 = upper & lower set, 03 = upper/lower/3rd set'
# Modify speed relation setting (3)
- id: inc_continuous_speed
  label: Increase one speed level for continuous running
  kind: action
  command: "!{hub}D{motor}pGc+;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: dec_continuous_speed
  label: Decrease one speed level for continuous running
  kind: action
  command: "!{hub}D{motor}pGc-;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: inc_jog_speed
  label: Increase one speed level for jogging
  kind: action
  command: "!{hub}D{motor}pGd+;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: dec_jog_speed
  label: Decrease one speed level for jogging
  kind: action
  command: "!{hub}D{motor}pGd-;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: inc_angle_coefficient
  label: Increase angle coefficient by one
  kind: action
  command: "!{hub}D{motor}pGa+;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: dec_angle_coefficient
  label: Decrease angle coefficient by one
  kind: action
  command: "!{hub}D{motor}pGa-;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: inc_jog_distance
  label: Increase jog distance by one unit
  kind: action
  command: "!{hub}D{motor}pGr+;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: dec_jog_distance
  label: Decrease jog distance by one unit
  kind: action
  command: "!{hub}D{motor}pGr-;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
# Modify motor running mode (4)
- id: set_jog_continuous_mode
  label: Switch motor mode between jog and continuous running
  kind: action
  command: "!{hub}D{motor}pM01;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: set_rotation_direction
  label: Motor rotation direction change
  kind: action
  command: "!{hub}D{motor}pM02;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: set_angle_direction
  label: Motor angle direction change
  kind: action
  command: "!{hub}D{motor}pM04;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: set_slow_start_stop
  label: Motor set to slow-start and slow-stop mode
  kind: action
  command: "!{hub}D{motor}pM08;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
- id: set_full_speed_startup
  label: Motor set to full-speed start-up mode
  kind: action
  command: "!{hub}D{motor}pM10;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
# Reset to factory default (5)
- id: factory_reset
  label: Reset to factory default mode
  kind: action
  command: "!{hub}D{motor}pR*;"
  params:
    - name: hub
      type: string
      description: 3-byte ASCII hub address
    - name: motor
      type: string
      description: 3-byte ASCII motor address
```

## Feedbacks
```yaml
- id: hub_address_query_response
  type: string
  description: Uplink listing all pulse hubs on the network, e.g. `!XXXV;!XXYV;...`
- id: hub_address_change_ack
  type: string
  description: Uplink `!ZZZA;` after a successful hub address change (XXX → ZZZ); 3-byte payload
- id: hub_test_ack
  type: string
  description: Uplink `!XXXA;` after Test Hub command (hub LED flashes 6 times); 0-byte payload
- id: module_reset_ack
  type: string
  description: Uplink `!XXXD000A;` confirming hub data reset; 0-byte payload
- id: pair_ack
  type: string
  description: Uplink `!XXXDYYYA;` confirming pair/unpair/delete success; YYY is a random ASCII address for random-pair variant
- id: motor_address_change_ack
  type: string
  description: Uplink `!XXXDZZZA;` after motor address change (YYY → ZZZ); 3-byte payload
- id: motor_movement_state
  type: enum
  values: [stroke_not_set, no_movement, no_position_feedback, no_stroke_set, no_3rd_position]
  description: `U` suffix uplink `!XXXDYYYU;` indicates various "no action" states (stroke not set, no limits, no 3rd position, no movement)
- id: motor_moving_position
  type: string
  description: Uplink `!XXXDYYY<DD1bDD2;` returned at movement start; DD1 = travel %, DD2 = rotation degrees (0-180)
- id: motor_final_position
  type: string
  description: Uplink `!XXXDYYYrDD1bDD2;` returned at movement end/stop; DD1 = travel %, DD2 = rotation degrees (0-180)
- id: motor_parameter
  type: string
  description: Uplink `!XXXDYYYN{DDDDDDDD};` - 8-digit ASCII motor parameters
- id: motor_speed
  type: string
  description: Uplink `!XXXDYYYpSc{DDD};` - current speed in rpm
- id: motor_voltage
  type: string
  description: Uplink `!XXXDYYYpVc{DDD};` - motor voltage in V
- id: motor_version
  type: string
  description: Uplink `!XXXDYYYvA{DD};` - DD version. T = type (A=AC, C=curtain, D=DC, S=socket, L=lighting); VV = V.V version
- id: position_limit_setting
  type: string
  description: Uplink `!XXXDYYYpP{HH};` - HH=00 no limits, 01 upper/lower set, 03 upper/lower/3rd set
- id: preferred_limit_unset
  type: string
  description: Uplink `NULL` when preferred limit is not set (response to `f` move command)
```

## Variables
```yaml
# Settable parameters encoded as discrete opcodes in source; enumerated as
# actions above. No range-style settable scalar variables exposed in source.
```

## Events
```yaml
# Uplink messages from hub are replies to downlink commands (request/response
# model); source does not describe unsolicited push notifications. Treat all
# uplinks as feedbacks above.
```

## Macros
```yaml
# Source does not define multi-step sequences at the protocol level. Implicit
# "global version query → every device replies" sequence is documented in
# 2.3 but is a one-shot fan-out, not a programmable macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. No fields populated.
```

## Notes
- Physical layer is RS-485 2-wire per source §1.2. Operators with RS-232-only
  control systems must add a 232>485 converter (Rollease Acmeda offers
  MT02-0406-000001 kit and a DB9↔RJ45 connector).
- One RS-485 line supports up to 32 Pulse hubs; each hub pairs with up to 15
  ARC motors.
- Hub default address is `245`. Address `000` = global broadcast (all hubs +
  motors respond, see §2.3 — buffer overflow risk on heavy broadcast traffic).
- Address `?` is reserved for "inquiry of motor status" in motor-address slot.
- All uplink movements use `D1bD2` notation: `D1` = travel %, `D2` = rotation
  degrees (0-180). When source shows `r{DDD}b{DD2}` for angle command, the
  `DD1` (percent) field can be ignored.
- "Bytes" column in source tables appears to mean payload length, not
  protocol byte count. Do not interpret as wire-byte count.
- Factory reset (`pR*`) wipes motor configuration; not recoverable from this
  protocol.
<!-- UNRESOLVED: firmware version not stated in source. No power-supply voltage
or current ratings stated. No fault/recovery sequences stated. No max cable
length or RS-485 termination guidance stated. -->

## Provenance

```yaml
source_domains:
  - rolleaseacmeda.com
  - avoutlet.com
source_urls:
  - https://www.rolleaseacmeda.com/docs/default-source/us/smart-home-integration/serial-protocol/Serial_Protocol_PRGM_GL_v1_3pdf.pdf
  - https://www.rolleaseacmeda.com/docs/default-source/us/smart-home-motorization/smart-home-automate-systems/rti_quick_start_guide_pulse1.pdf
  - https://www.avoutlet.com/images/product/additional/r/pulse-serial-instructions.pdf
retrieved_at: 2026-06-01T22:23:37.539Z
last_checked_at: 2026-06-02T08:29:20.855Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:29:20.855Z
matched_actions: 46
action_count: 46
confidence: medium
summary: "All 46 spec actions match verbatim source command tokens across sections 3.1-3.6; transport parameters confirmed; source command count equals spec count. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "No firmware version compatibility stated. No power-supply/electrical specs stated."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version not stated in source. No power-supply voltage"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
