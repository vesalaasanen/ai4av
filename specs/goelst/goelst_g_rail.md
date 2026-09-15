---
spec_id: admin/goelst-g-rail
schema_version: ai4av-public-spec-v1
revision: 1
title: "Goelst G-Rail Control Spec"
manufacturer: Goelst
model_family: G-Rail
aliases: []
compatible_with:
  manufacturers:
    - Goelst
  models:
    - G-Rail
  firmware: 1.2.14
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/20250121220142/https://goelst.com/brochure/pdf2018/GM_EN_RS232.pdf
retrieved_at: 2026-09-06T08:43:35.497Z
last_checked_at: 2026-09-11T22:16:32.898Z
generated_at: 2026-09-11T22:16:32.898Z
firmware_coverage: 1.2.14
protocol_coverage: []
known_gaps:
  - "source describes only RS-232/TTL serial; no IP, REST, OSC, or other protocol support documented."
  - "source exposes only commands; no separate settable parameters (gain, speed, etc.) documented."
  - "source does not document unsolicited notifications from the device."
  - "source does not document any multi-step sequences."
  - "source notes \"Improper connections may damage your hardware!\" as a wiring warning but does not document interlock procedures or power-on sequencing requirements."
  - "voltage/current draw, RF/WiFi networking specifics, and fault-recovery sequences are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-09-11T22:16:32.898Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions correspond to commands documented in the source; transport parameters also match the source verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-06
---

# Goelst G-Rail Control Spec

## Summary
Control spec for the Goelst G-Rail (G-Motion Curtain Controller) motor unit, covering the RS-232 TTL-level serial protocol on the RJ45 connector. The protocol is fully text-based with CR+LF line endings and exposes serial number retrieval, sensor/position queries, and movement (open/close/stop/preset 1-5) commands, with broadcast variants over the GM-BUS network for grouped control.

<!-- UNRESOLVED: source describes only RS-232/TTL serial; no IP, REST, OSC, or other protocol support documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: even
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: mv open/close commands affect motor state
- routable        # inferred: open/close/stop/preset commands drive curtain position
- queryable       # inferred: sn, get pos/tmp/lux, remote get commands return values
```

## Actions
```yaml
- id: get_serial_number
  label: Get Serial Number
  kind: query
  command: "sn"
  params: []
  notes: |
    Returns a hexadecimal serial number. Example response: 14EA8D15
- id: get_position
  label: Get Current Position
  kind: query
  command: "pos get"
  params: []
  notes: |
    Returns current slider position on the rails in millimeters. Example response: 25
- id: get_temperature
  label: Get Temperature
  kind: query
  command: "tmp get"
  params: []
  notes: |
    Returns measured temperature in degrees Celsius.
- id: get_lux
  label: Get Lux Sensor Value
  kind: query
  command: "lux get"
  params: []
  notes: |
    Returns lux sensor value. Only valid when a lux sensor is attached.
- id: remote_get_position
  label: Get Remote Device Position
  kind: query
  command: "remote get {serial} pos"
  params:
    - name: serial
      type: string
      description: Last 16 bits of the target device serial number (hex).
  notes: |
    Requires G-Motion BUS extension board. Times out to "cmd failed" if target does not respond.
- id: remote_get_temperature
  label: Get Remote Device Temperature
  kind: query
  command: "remote get {serial} tmp"
  params:
    - name: serial
      type: string
      description: Last 16 bits of the target device serial number (hex).
  notes: |
    Requires G-Motion BUS extension board. Times out to "cmd failed" if target does not respond.
- id: remote_get_lux
  label: Get Remote Device Lux
  kind: query
  command: "remote get {serial} lux"
  params:
    - name: serial
      type: string
      description: Last 16 bits of the target device serial number (hex).
  notes: |
    Requires G-Motion BUS extension board. Only valid when lux sensor attached to remote. Times out to "cmd failed" if target does not respond.
- id: mv_open
  label: Move Open
  kind: action
  command: "mv open"
  params: []
- id: mv_close
  label: Move Close
  kind: action
  command: "mv close"
  params: []
- id: mv_stop
  label: Move Stop
  kind: action
  command: "mv stop"
  params: []
- id: mv_preset
  label: Move to Preset
  kind: action
  command: "mv{preset}"
  params:
    - name: preset
      type: integer
      description: Preset number 1-5
- id: remote_mv
  label: Remote Move Event
  kind: action
  command: "remote mv {action} {user_address}"
  params:
    - name: action
      type: string
      description: "One of: open, close, stop, or preset 1-5"
    - name: user_address
      type: integer
      description: |
        UserAddress (1-31). Standard UA 1 is the factory default; up to 31 addresses
        can be activated per motor, forming motor groups.
  notes: |
    Requires GM-BUS extension board. Transmitted over GM-BUS with the specified UserAddress.
```

## Feedbacks
```yaml
- id: cmd_ok
  type: string
  values: "cmd ok"
  description: Returned after successfully handling an executing or setting command.
- id: cmd_failed
  type: string
  values: "cmd failed"
  description: Returned after a timeout event or incorrect parameters.
- id: cmd_unknown
  type: string
  values: "cmd unknown"
  description: Returned when a command is sent that is not recognized by the controller.
```

## Variables
```yaml
# UNRESOLVED: source exposes only commands; no separate settable parameters (gain, speed, etc.) documented.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the device.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes "Improper connections may damage your hardware!" as a wiring warning but does not document interlock procedures or power-on sequencing requirements.
```

## Notes
- Protocol is text-based; commands end with CR+LF.
- RJ45 pinout uses 3V TTL: pin 1 = TX (out), pin 4 = GND, pin 8 = RX (in); pins 2, 3, 5, 6, 7 are DNC.
- Two official Goelst cables expose the RJ45 TTL port: 6036-RS232-SUBD/RJ45 (DE-9) and 6036-RS232-USB/RJ45 (USB-A).
- The protocol is also mapped internally on the I2C Internal Bus between expansion modules, where the TargetID serves as the I2C DeviceAddress.
- GM-BUS remote commands require that target motors be subscribed to the relevant UserAddress; motors on the same UA form a controllable group.
- Beta v0.2 is documented as compatible with firmware v1.2.14+; future versions may not be backward compatible.
- Only the last 16 bits of a device serial number are used for GM-BUS addressing.
<!-- UNRESOLVED: voltage/current draw, RF/WiFi networking specifics, and fault-recovery sequences are not stated in source. -->

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/20250121220142/https://goelst.com/brochure/pdf2018/GM_EN_RS232.pdf
retrieved_at: 2026-09-06T08:43:35.497Z
last_checked_at: 2026-09-11T22:16:32.898Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-11T22:16:32.898Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions correspond to commands documented in the source; transport parameters also match the source verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes only RS-232/TTL serial; no IP, REST, OSC, or other protocol support documented."
- "source exposes only commands; no separate settable parameters (gain, speed, etc.) documented."
- "source does not document unsolicited notifications from the device."
- "source does not document any multi-step sequences."
- "source notes \"Improper connections may damage your hardware!\" as a wiring warning but does not document interlock procedures or power-on sequencing requirements."
- "voltage/current draw, RF/WiFi networking specifics, and fault-recovery sequences are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
