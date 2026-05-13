---
spec_id: admin/converging-systems-gateway-cs-bus-zgn
schema_version: ai4av-public-spec-v1
revision: 1
title: "Converging Systems Gateway CS-Bus ZGN Control Spec"
manufacturer: "Converging Systems"
model_family: "CS-Bus Gateway (e-Node Ethernet Adapter / IBT-100sfs)"
aliases: []
compatible_with:
  manufacturers:
    - "Converging Systems"
  models:
    - "CS-Bus Gateway (e-Node Ethernet Adapter / IBT-100sfs)"
    - IMC-100T
    - ILC-100x
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
retrieved_at: 2026-05-01T01:56:36.458Z
last_checked_at: 2026-04-23T15:31:22.907Z
generated_at: 2026-04-23T15:31:22.907Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:31:22.907Z
  matched_actions: 22
  action_count: 22
  confidence: high
  summary: "All 22 spec actions matched verbatim in source; transport parameters verified; source command set fully represented by spec."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Converging Systems Gateway CS-Bus ZGN Control Spec

## Summary
Converging Systems CS-Bus gateway devices (e-Node Ethernet Adapter and IBT-100sfs) provide control of motor and LED loads on the CS-Bus via ASCII commands over RS-232-C serial or UDP datagram sockets over Ethernet. Commands address individual devices by Zone.Group.Node (Z.G.N.) addresses. Supported end devices include the IMC-100T motor controller and ILC-100x LED controller.

<!-- UNRESOLVED: commissioning commands (setup, configuration) are out of scope per source -->
<!-- UNRESOLVED: no firmware version compatibility ranges stated -->
<!-- UNRESOLVED: e-Node default IP (192.168.1.1) mentioned as example only; actual address is DHCP or static -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  udp_tx_port: 5000
  udp_rx_port: 4000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable     # no explicit power on/off commands in source
- levelable       # LED brightness SET (0-240), SAT, HUE values
- queryable       # Q=QY query returns device info
```

## Actions
```yaml
# --- Motor Control (IMC-100T, ILC-100x) ---
- id: motor_down
  label: Motor Down
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.MOTOR=DOWN;"
  description: "Commands motor to move down. Function codes: A or MOTOR."

- id: motor_up
  label: Motor Up
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.MOTOR=UP;"
  description: "Commands motor to move up."

- id: motor_stop
  label: Motor Stop
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.MOTOR=STOP;"
  description: "Stops motor movement."

# --- LED Control (ILC-100x external load) ---
- id: led_on
  label: LED On
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=ON;"
  description: "Turns LED on to full on, or to value when OFF was issued. Function codes: L or LED."

- id: led_off
  label: LED Off
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=OFF;"
  description: "Turns LED off."

- id: led_fade_up
  label: LED Fade Up
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=FADE_UP;"
  description: "Continuous brightness ramp up until stopped. Function codes: L or LED."

- id: led_fade_down
  label: LED Fade Down
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=FADE_DOWN;"
  description: "Continuous brightness ramp down until stopped."

- id: led_sat_up
  label: LED Saturation Up
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=SAT_UP;"
  description: "Increases saturation (more color, less white). Continuous until stopped."

- id: led_sat_down
  label: LED Saturation Down
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=SAT_DOWN;"
  description: "Decreases saturation (less color, more white). Continuous until stopped."

- id: led_hue_up
  label: LED Hue Up
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=HUE_UP;"
  description: "Shifts hue red>yellow>green>cyan>blue>magenta. Continuous until stopped."

- id: led_hue_down
  label: LED Hue Down
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=HUE_DOWN;"
  description: "Shifts hue magenta>blue>cyan>green>yellow>red. Continuous until stopped."

- id: led_stop
  label: LED Stop
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=STOP;"
  description: "Stops any active fade, saturation, or hue action."

- id: led_set_brightness
  label: LED Set Brightness
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 240
      description: "Brightness level (0-240)"
  command: "#{Z}.{G}.{N}.LED=SET,{level};"
  description: "Sets LED brightness to a specific value (0-240)."

- id: led_set_saturation
  label: LED Set Saturation
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 240
      description: "Saturation level (0-240)"
  command: "#{Z}.{G}.{N}.LED=SAT,{level};"
  description: "Sets saturation to a specific value (0-240)."

- id: led_set_hue
  label: LED Set Hue
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 240
      description: "Hue value (0-240). 0=red, 80=green, 160=blue in HSL."
  command: "#{Z}.{G}.{N}.LED=HUE,{level};"
  description: "Sets hue to a specific value (0-240) in HSL color space."

- id: led_store_preset
  label: LED Store Preset
  kind: action
  params:
    - name: preset
      type: integer
      min: 1
      max: 6
      description: "Preset slot number (1-6)"
  command: "#{Z}.{G}.{N}.LED=STORE,{preset};"
  description: "Stores current LED state to a preset slot (1-6)."

- id: led_recall_preset
  label: LED Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      min: 1
      max: 6
      description: "Preset slot number (1-6)"
  command: "#{Z}.{G}.{N}.LED=RECALL,{preset};"
  description: "Recalls a previously stored preset (1-6)."

- id: led_effect
  label: LED Effect
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=EFFECT;"
  description: "Cycles through first eight preset colors."

# --- On-board LED (IMC-100x only) ---
- id: onboard_led_on
  label: On-board LED On
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=ON;"
  description: "Turns on-board amber LED to full ON (IMC-100x only)."

- id: onboard_led_off
  label: On-board LED Off
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=OFF;"
  description: "Turns on-board amber LED to full OFF (IMC-100x only)."

- id: onboard_led_flash
  label: On-board LED Flash
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.LED=FLASH;"
  description: "Repeatedly flashes on-board amber LED (IMC-100x only)."

# --- Query ---
- id: query_device_info
  label: Query Device Info
  kind: action
  params: []
  command: "#{Z}.{G}.{N}.Q=QY;"
  description: "Returns device information. IMC-100 responds '99', ILC-100 responds '48'. Will NOT respond to wildcard address #0.0.0."
```

## Feedbacks
```yaml
- id: command_ack
  type: echo
  description: "Valid commands are echoed back. Invalid commands return '*' followed by the partial command."

- id: device_info_response
  type: string
  description: "Response to Q=QY query. IMC-100 returns '99', ILC-100 returns '48'. Source number is appended to responses."
  values:
    - "99"
    - "48"
```

## Variables
```yaml
# UNRESOLVED: no continuous variable state polling mechanism documented beyond Q=QY
```

## Events
```yaml
# No unsolicited events documented. All responses are replies to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source. Never infer - only populate from explicit source text.
```

## Notes
- Commands use the format `#Z.G.N.FUNCTION=COMMAND[,DATA];` followed by a return character. Z, G, N are mandatory zone/group/node numbers (0=broadcast, 1-255). Using `#0.0.0` broadcasts to all devices on the bus.
- Function codes: `A` or `MOTOR` for motor control; `L` or `LED` for LED control; `Q` for device query.
- Continuous ramp actions (FADE_UP, FADE_DOWN, SAT_UP, SAT_DOWN, HUE_UP, HUE_DOWN) run until explicitly stopped with the `STOP` command.
- Source numbers (1-8) are automatically concatenated by the interface device to response data. IR=1, low voltage/keypads=2, photosensor=4, e-Node/IBT=5-8.
- LED SET, SAT, and HUE accept values 0-240. Hue uses HSL color space: 0=red, 80=green, 160=blue. RGB color space requires the Pilot application.
- LED preset slots are numbered 1-6 for STORE/RECALL commands.
- Serial parameters (57600/8/N/1/None) cannot be changed on the IBT-100sfs.
- UDP transmission port 5000 (to e-Node), inquiry port 4000 (from e-Node).

<!-- UNRESOLVED: commissioning commands for device setup are out of scope -->
<!-- UNRESOLVED: DHCP vs static IP addressing details not fully documented -->
<!-- UNRESOLVED: maximum command rate / throughput limits not stated -->
<!-- UNRESOLVED: error recovery behavior beyond '*' response for invalid commands -->

## Provenance

```yaml
source_domains:
  - convergingsystems.com
retrieved_at: 2026-05-01T01:56:36.458Z
last_checked_at: 2026-04-23T15:31:22.907Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:31:22.907Z
matched_actions: 22
action_count: 22
confidence: high
summary: "All 22 spec actions matched verbatim in source; transport parameters verified; source command set fully represented by spec."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
