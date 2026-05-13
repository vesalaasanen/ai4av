---
spec_id: admin/planar-vm55lx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar VM55LX Series Control Spec"
manufacturer: Planar
model_family: VM55MX-M2
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - VM55MX-M2
    - VM55MX-X2
    - VM55LX-M2
    - VM55LX-X2
    - VM55LX-U2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-04-25T21:49:59.919Z
generated_at: 2026-04-25T21:49:59.919Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:49:59.919Z
  matched_actions: 32
  action_count: 32
  confidence: low
  summary: "All 15 actions and 17 feedbacks matched literally to source commands; transport verified; source fully represented"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Planar VM55LX Series Control Spec

## Summary
Planar VM Series commercial LCD displays supporting RS-232 and LAN (TCP/IP) control. The document describes the SICP binary protocol for power management, input routing, video/audio parameters, display geometry (tiling), and security locks. Models VM55MX-M2, VM55MX-X2, VM55LX-M2, VM55LX-X2, and VM55LX-U2 share this command set.

<!-- UNRESOLVED: REST/HTTP API not documented — only binary SICP over RS-232 and raw TCP port 5000 -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 5000  # LAN control port; RS-232 uses DB9 null-modem
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
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
- id: power_state_set
  label: Power State Set
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0x01: Power Off
        - 0x02: Power On

- id: input_source_set
  label: Input Source Set
  kind: action
  params:
    - name: source
      type: enum
      values:
        - 0x05: VGA
        - 0x06: HDMI 2
        - 0x0A: DisplayPort
        - 0x0B: OPS
        - 0x0D: HDMI 1
        - 0x0E: DVI-D
        - 0x0F: HDMI 3
        - 0x10: Browser
        - 0x11: CMS
        - 0x16: Media Player
        - 0x17: PDF Player
        - 0x18: Custom
        - 0x19: HDMI 4

- id: video_parameters_set
  label: Video Parameters Set
  kind: action
  params:
    - name: brightness
      type: integer
      range: [0, 100]
    - name: color
      type: integer
      range: [0, 100]
    - name: contrast
      type: integer
      range: [0, 100]
    - name: sharpness
      type: integer
      range: [0, 100]
    - name: tint
      type: integer
      range: [0, 100]
    - name: black_level
      type: integer
      range: [0, 100]
    - name: gamma
      type: enum
      values:
        - 0x01: Native
        - 0x02: S Gamma
        - 0x03: 2.2
        - 0x04: 2.4
        - 0x05: D-image (DICOM)

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  params:
    - name: temperature
      type: enum
      values:
        - 0x00: User 1
        - 0x01: Native
        - 0x03: 10000K
        - 0x04: 9300K
        - 0x05: 7500K
        - 0x06: 6500K
        - 0x09: 5000K
        - 0x0A: 4000K
        - 0x0D: 3000K
        - 0x12: User 2

- id: color_parameters_set
  label: Color Parameters Set
  kind: action
  params:
    - name: red_gain
      type: integer
      range: [0, 255]
    - name: green_gain
      type: integer
      range: [0, 255]
    - name: blue_gain
      type: integer
      range: [0, 255]

- id: zoom_mode_set
  label: Zoom Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - 0x00: 4:3
        - 0x01: Custom
        - 0x02: 1:1
        - 0x03: Full
        - 0x04: 21:9

- id: volume_set
  label: Volume Set
  kind: action
  params:
    - name: volume
      type: integer
      range: [0, 100]
    - name: audio_out_volume
      type: integer
      range: [0, 100]

- id: audio_parameters_set
  label: Audio Parameters Set
  kind: action
  params:
    - name: treble
      type: integer
      range: [0, 100]
    - name: bass
      type: integer
      range: [0, 100]

- id: ir_remote_lock_set
  label: IR Remote Lock Set
  kind: action
  params:
    - name: lock_status
      type: enum
      values:
        - 0x01: Unlock All
        - 0x02: Lock All
        - 0x03: Lock All but Power
        - 0x04: Lock All but Volume
        - 0x05: Primary (Master)
        - 0x06: Secondary (Daisy Chain)

- id: keypad_lock_set
  label: Keypad Lock Set
  kind: action
  params:
    - name: lock_status
      type: enum
      values:
        - 0x01: Unlock All
        - 0x02: Lock All
        - 0x03: Lock All but Power
        - 0x04: Lock All but Volume

- id: tiling_set
  label: Tiling Set
  kind: action
  params:
    - name: enable
      type: boolean
    - name: frame_comp
      type: enum
      values:
        - 0x00: No
        - 0x01: Yes
        - 0x02: Keep Previous
    - name: position
      type: integer
    - name: v_monitors
      type: integer
    - name: h_monitors
      type: integer

- id: tiling_preset_set
  label: Tiling Preset Set
  kind: action
  params:
    - name: action
      type: enum
      values:
        - 0x00: Save
        - 0x01: Recall
    - name: preset
      type: integer
      range: [0, 9]

- id: auto_adjust_set
  label: Auto Adjust Set
  kind: action
  params:
    - name: item
      type: integer
      value: 0x40

- id: power_state_at_cold_start_set
  label: Power State at Cold Start Set
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0x00: Power Off
        - 0x01: Forced On
        - 0x02: Last Status

- id: model_fw_get
  label: Model / FW Version / Build Date Get
  kind: action
  params:
    - name: item
      type: enum
      values:
        - 0x00: Model Number
        - 0x01: FW Version
        - 0x02: Build Date
```

## Feedbacks
```yaml
- id: power_state_report
  label: Power State Report
  type: enum
  values:
    - 0x01: Power Off
    - 0x02: Power On

- id: current_source_report
  label: Current Source Report
  type: enum
  values:
    - 0x05: VGA
    - 0x06: HDMI 2
    - 0x0A: DisplayPort
    - 0x0B: OPS
    - 0x0D: HDMI 1
    - 0x0E: DVI-D
    - 0x0F: HDMI 3
    - 0x10: Browser
    - 0x11: CMS
    - 0x16: Media Player
    - 0x17: PDF Player
    - 0x18: Custom
    - 0x19: HDMI 4

- id: video_parameters_report
  label: Video Parameters Report
  type: object
  properties:
    - name: brightness
      type: integer
      range: [0, 100]
    - name: color
      type: integer
      range: [0, 100]
    - name: contrast
      type: integer
      range: [0, 100]
    - name: sharpness
      type: integer
      range: [0, 100]
    - name: tint
      type: integer
      range: [0, 100]
    - name: black_level
      type: integer
      range: [0, 100]
    - name: gamma
      type: integer

- id: color_temperature_report
  label: Color Temperature Report
  type: enum
  values:
    - 0x00: User 1
    - 0x01: Native
    - 0x03: 10000K
    - 0x04: 9300K
    - 0x05: 7500K
    - 0x06: 6500K
    - 0x09: 5000K
    - 0x0A: 4000K
    - 0x0D: 3000K
    - 0x12: User 2

- id: color_parameters_report
  label: Color Parameters Report
  type: object
  properties:
    - name: red_gain
      type: integer
      range: [0, 255]
    - name: green_gain
      type: integer
      range: [0, 255]
    - name: blue_gain
      type: integer
      range: [0, 255]

- id: zoom_mode_report
  label: Zoom Mode Report
  type: enum
  values:
    - 0x00: 4:3
    - 0x01: Custom
    - 0x02: Real
    - 0x03: Full
    - 0x04: 21:9

- id: volume_report
  label: Volume Report
  type: integer
  range: [0, 100]

- id: audio_parameters_report
  label: Audio Parameters Report
  type: object
  properties:
    - name: treble
      type: integer
      range: [0, 100]
    - name: bass
      type: integer
      range: [0, 100]

- id: ir_remote_lock_report
  label: IR Remote Lock Status Report
  type: enum
  values:
    - 0x01: Unlock All
    - 0x02: Lock All
    - 0x03: Lock All but Power
    - 0x04: Lock All but Volume
    - 0x05: Primary (Master)
    - 0x06: Secondary (Daisy Chain)

- id: keypad_lock_report
  label: Keypad Lock Status Report
  type: enum
  values:
    - 0x01: Unlock All
    - 0x02: Lock All
    - 0x03: Lock All but Power
    - 0x04: Lock All but Volume

- id: tiling_report
  label: Tiling Report
  type: object
  properties:
    - name: enable
      type: boolean
    - name: frame_comp
      type: boolean
    - name: position
      type: integer
    - name: v_monitors
      type: integer
    - name: h_monitors
      type: integer

- id: serial_code_report
  label: Serial Code Report
  type: string
  description: 14-character ASCII serial number

- id: operating_hours_report
  label: Operating Hours Report
  type: integer
  description: 16-bit unsigned counter (hours)

- id: power_state_at_cold_start_report
  label: Power State at Cold Start Report
  type: enum
  values:
    - 0x00: Power Off
    - 0x01: Forced On
    - 0x02: Last Status

- id: ack_reply
  label: ACK Reply
  type: enum
  values:
    - 0x00: Command executed successfully

- id: nak_reply
  label: NAK Reply
  type: enum
  values:
    - 0x03: Command not acknowledged

- id: nav_reply
  label: NAV Reply
  type: enum
  values:
    - 0x04: Command not available
```

## Variables
```yaml
# UNRESOLVED: the document does not describe standalone settable parameters
# separate from the action/feedback pairs above. All parameters are
# conveyed via set/get command pairs already listed in Actions/Feedbacks.
```

## Events
```yaml
# UNRESOLVED: the document describes only synchronous request/response pairs.
# No unsolicited event or push notifications are documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences are described in this document.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: RS-232 commands received through the LAN port are not relayed through the RS-232 OUT connector to subsequent monitors in a daisy chain. Each monitor must be connected directly to the LAN for independent control.
  - description: When daisy-chaining RS-232, use a null-modem (crossover) cable. The display uses RXD (pin 2), TXD (pin 3), and GND (pin 5).
  - description: Wait at least 500 ms after sending a command before retrying or sending a new command.
# UNRESOLVED: no safety-critical warnings, interlock procedures, or
# power-on sequencing requirements beyond what is stated above.
```

## Notes
The SICP protocol uses a binary packet format with header `0xA6` for commands and `0x21` for responses. All multi-byte values (monitor ID, length, data) use big-endian encoding. The checksum is an XOR of all bytes excluding the checksum byte itself. Broadcast mode (monitor ID = 0) suppresses ACK/NAK/NAV replies. Input source availability varies by model — DisplayPort, HDMI 3, and HDMI 4 are 65/75/86-inch only; DVI-D is 43/55-inch only.
<!-- UNRESOLVED: detailed binary packet construction (byte-level encoding) is not fully enumerated — hex example packets are provided but a complete byte-field reference is not included in this spec. -->
<!-- UNRESOLVED: Auto Signal Detecting commands (0xAE/0xAF) referenced in command summary but not fully documented in source. -->
<!-- UNRESOLVED: RS-232 hardware flow control (RTS/CTS) not described despite DB9 pinout. -->

## Provenance

```yaml
source_domains:
  - planar.com
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-04-25T21:49:59.919Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:49:59.919Z
matched_actions: 32
action_count: 32
confidence: low
summary: "All 15 actions and 17 feedbacks matched literally to source commands; transport verified; source fully represented"
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
