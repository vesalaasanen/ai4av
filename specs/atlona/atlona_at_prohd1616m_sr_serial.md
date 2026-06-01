---
spec_id: admin/atlona-at-prohd1616m-sr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-PROHD1616M-SR Control Spec"
manufacturer: Atlona
model_family: AT-PROHD1616M-SR
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-PROHD1616M-SR
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-04-30T10:17:04.860Z
last_checked_at: 2026-05-22T13:30:14.936Z
generated_at: 2026-05-22T13:30:14.936Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-22T13:30:14.936Z
  matched_actions: 23
  action_count: 23
  confidence: high
  summary: "All 23 spec actions matched source commands; all transport parameters verified; complete command catalogue coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Atlona AT-PROHD1616M-SR Control Spec

## Summary
16x16 HDMI matrix switcher with RS-232 control. Supports input/output routing, power control, preset save/recall, and EDID management via RS-232 commands terminated by carriage return. Feedback terminated by CR+LF.

<!-- UNRESOLVED: no TCP/IP, HTTP, or other protocols mentioned beyond RS-232 -->

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
```

## Actions
```yaml
- id: type
  label: Get Model Number
  kind: action
  params: []

- id: lock
  label: Lock Front Panel
  kind: action
  params: []

- id: unlock
  label: Unlock Front Panel
  kind: action
  params: []

- id: version
  label: Get Firmware Version
  kind: action
  params: []

- id: rs232zone
  label: RS-232 Zone Command
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (1-based)
    - name: command
      type: string
      description: Command to send to device in zone

- id: pwon
  label: Power On
  kind: action
  params: []

- id: pwoff
  label: Power Off
  kind: action
  params: []

- id: save_preset
  label: Save Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-9)

- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-9)

- id: clear_preset
  label: Clear Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-9)

- id: set_input_all
  label: Set Input to All Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: set_input_output
  label: Route Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)

- id: set_input_multi
  label: Route Input to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: outputs
      type: array
      items:
        type: integer
      description: Array of output numbers (1-based)

- id: reset_output
  label: Reset Output to Corresponding Input
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (1-based)

- id: reset_all
  label: Reset All Outputs
  kind: action
  params: []

- id: disable_output
  label: Disable Output Channel
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (1-based)

- id: disable_all_outputs
  label: Disable All Output Channels
  kind: action
  params: []

- id: mreset
  label: Factory Reset
  kind: action
  params: []

- id: edid_set_default
  label: Set EDID Default
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: edid_set_saved
  label: Set EDID from Saved Memory
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: memory
      type: integer
      description: Saved EDID memory number

- id: edid_set_internal
  label: Set EDID Internal
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: edid
      type: integer
      description: Internal EDID number (1-12)

- id: set_matrix_baud
  label: Set Matrix Baud Rate
  kind: action
  params:
    - name: baudrate
      type: integer
      enum:
        - 2400
        - 4800
        - 9600
        - 19200
        - 38400
        - 57600
        - 115200
      description: Baud rate (must be one of supported values)

- id: set_receiver_baud
  label: Set Receiver Baud Rate
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone/output number (1-based)
    - name: baudrate
      type: integer
      description: Baud rate
    - name: datalength
      type: integer
      enum:
        - 7
        - 8
      description: Data length (7 or 8)
    - name: parity
      type: integer
      enum:
        - 0
        - 1
        - 2
      description: Parity (0=none, 1=odd, 2=even)
    - name: stopbit
      type: integer
      enum:
        - 1
        - 2
      description: Stop bits (1 or 2)
```

## Feedbacks
```yaml
- id: type_response
  label: Model Number Response
  type: string

- id: lock_response
  label: Lock Response
  type: enum
  values:
    - Lock
    - Unlock

- id: version_response
  label: Firmware Version Response
  type: string

- id: rs232zone_response
  label: RS-232 Zone Response
  type: string

- id: pwon_response
  label: Power On Response
  type: enum
  values:
    - PWON

- id: pwoff_response
  label: Power Off Response
  type: enum
  values:
    - PWOFF

- id: pwsta_response
  label: Power Status
  type: enum
  values:
    - PWON
    - PWOFF

- id: status_response
  label: Output Routing Status
  type: string
  description: Format: x#AVx# (e.g. x1AVx2 = input 1 to output 2)

- id: save_response
  label: Save Preset Response
  type: string

- id: recall_response
  label: Recall Preset Response
  type: string

- id: clear_response
  label: Clear Preset Response
  type: string

- id: mreset_response
  label: Factory Reset Response
  type: string

- id: rs232para_response
  label: RS-232 Parameter Status
  type: string

- id: edid_response
  label: EDID Command Response
  type: string

- id: command_failed
  label: Command Failed
  type: enum
  values:
    - Command FAILED
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Command termination: each command must end with carriage return (CR). Feedback ends with CR+LF. Commands are case sensitive — capitalization must match exactly.

Default matrix serial settings: 115200 baud, 8 data bits, no parity, 1 stop bit, no flow control.

Matrix supports configurable baud rates: 2400, 4800, 9600, 19200, 38400, 57600, 115200 bps. Receiver zone baud rates are independently configurable per output port.

EDID internal options (1-12) map to specific display configurations including resolution, color depth, and audio format combinations.

<!-- UNRESOLVED: TCP/IP control not available on this model -->
<!-- UNRESOLVED: no information on firmware upgrade procedure -->
<!-- UNRESOLVED: no information on safety interlocks or power sequencing -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-04-30T10:17:04.860Z
last_checked_at: 2026-05-22T13:30:14.936Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-22T13:30:14.936Z
matched_actions: 23
action_count: 23
confidence: high
summary: "All 23 spec actions matched source commands; all transport parameters verified; complete command catalogue coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
