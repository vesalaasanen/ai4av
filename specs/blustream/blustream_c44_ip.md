---
spec_id: admin/blustream-c44
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blustream C44 Control Spec"
manufacturer: Blustream
model_family: C44
aliases: []
compatible_with:
  manufacturers:
    - Blustream
  models:
    - C44
    - CMX88AB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - blustream.com.au
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-04-23T15:24:28.449Z
generated_at: 2026-04-23T15:24:28.449Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - IR_POWER_14
  - IR_OUTPUT_1_09
  - IR_OUTPUT_2_1D
  - IR_3D_0F
  - IR_4K_51
verification:
  verdict: verified
  checked_at: 2026-04-23T15:24:28.449Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All 14 spec actions matched verbatim in source with correct syntax; transport parameters verified; IR database is separate protocol layer."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Blustream C44 Control Spec

## Summary
The Blustream C44 (documented as CMX88AB) is an 8×8 HDMI matrix switcher controllable via TCP/IP (Telnet) and RS-232 serial. This spec covers the ASCII command set for power control, input/output routing, EDID management, and system configuration. Both Telnet and serial share the same command syntax.

<!-- UNRESOLVED: TCP/Telnet port number not stated in source -->
<!-- UNRESOLVED: exact relationship between C44 and CMX88AB model names not clarified in source -->
<!-- UNRESOLVED: command response format not documented (only command syntax given) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  # UNRESOLVED: TCP port number not stated in source
  port: null  # UNRESOLVED: port number not stated in source
  default_ip: "192.168.0.200"
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credential
  description: "Default username: blustream, Default password: 1234"
framing:
  terminator: "\r"
  notes: "Commands are ASCII strings terminated by carriage return. No spaces within commands unless required by control system."
```

## Traits
```yaml
traits:
  - powerable    # PON / POFF commands
  - routable     # OUTxxFRyy routing commands
  - queryable    # STATUS query command
```

## Actions
```yaml
actions:
  - id: help
    label: Print Help
    kind: action
    command: "?"
    alt_command: "HELP"
    params: []
    description: "Print help information"

  - id: power_on
    label: Power On
    kind: action
    command: "PON"
    params: []
    description: "Power on, system runs on normal state"

  - id: power_off
    label: Power Off
    kind: action
    command: "POFF"
    params: []
    description: "Power off, system runs on power save state"

  - id: status
    label: Query Status
    kind: query
    command: "STATUS"
    params: []
    description: "Print system status and port status"

  - id: ir_control
    label: Set IR Control
    kind: action
    command: "IR{state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable system IR control"

  - id: key_control
    label: Set Key Control
    kind: action
    command: "KEY{state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable front panel key control"
    description: "Toggles front panel button lock"

  - id: debug_mode
    label: Set Debug Mode
    kind: action
    command: "DBG{state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable debug mode"

  - id: beep_control
    label: Set Beep
    kind: action
    command: "BEEP{state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable onboard beep"

  - id: output_on_off
    label: Set Output On/Off
    kind: action
    command: "OUT{xx}{state}"
    params:
      - name: output
        type: integer
        description: "Output/zone number (01-08, zero-padded)"
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Turn output on or off"
    example: "OUT01ON"

  - id: route
    label: Route Input to Output
    kind: action
    command: "OUT{xx}FR{yy}"
    params:
      - name: output
        type: integer
        description: "Output/zone number (01-08, zero-padded)"
      - name: input
        type: integer
        description: "Input number (01-08, zero-padded)"
    example: "OUT01FR04"
    description: "Switch output xx to source input yy"

  - id: edid_copy
    label: Copy EDID
    kind: action
    command: "EDID{xx}CP{yy}"
    params:
      - name: input
        type: string
        description: "Input port number (01-08) or 00 for all inputs"
      - name: output
        type: string
        description: "Output port number (01-08) or 00 for all outputs"
    description: "Copy EDID from output (yy) to input (xx)"

  - id: edid_set_default
    label: Set Default EDID
    kind: action
    command: "EDID{xx}DF{zz}"
    params:
      - name: input
        type: string
        description: "Input port (00=all, 01-04=individual)"
      - name: edid_preset
        type: enum
        values:
          - "00"  # HDMI 1080p@60Hz, Audio 2CH PCM
          - "01"  # HDMI 1080p@60Hz, Audio 5.1CH PCM/DTS/DOLBY
          - "02"  # HDMI 1080p@60Hz, Audio 7.1CH PCM/DTS/DOLBY/HD
          - "03"  # HDMI 1080i@60Hz, Audio 2CH PCM
          - "04"  # HDMI 1080i@60Hz, Audio 5.1CH PCM/DTS/DOLBY
          - "05"  # HDMI 1080i@60Hz, Audio 7.1CH PCM/DTS/DOLBY/HD
          - "06"  # HDMI 1080p@60Hz/3D, Audio 2CH PCM
          - "07"  # HDMI 1080p@60Hz/3D, Audio 5.1CH PCM/DTS/DOLBY
          - "08"  # HDMI 1080p@60Hz/3D, Audio 7.1CH PCM/DTS/DOLBY/HD
          - "09"  # HDMI 4K2K, Audio 2CH PCM
          - "10"  # HDMI 4K2K, Audio 5.1CH PCM/DTS/DOLBY
          - "11"  # HDMI 4K2K, Audio 7.1CH PCM/DTS/DOLBY/HD
          - "12"  # DVI 1280x1024@60Hz, Audio None
          - "13"  # DVI 1920x1080@60Hz, Audio None
          - "14"  # DVI 1920x1200@60Hz, Audio None
        description: "EDID preset number (00-14)"
    description: "Set input EDID to a default preset"

  - id: reset
    label: Factory Reset (Interactive)
    kind: action
    command: "RESET"
    params: []
    description: "Reset system to default settings. Requires interactive confirmation: type 'Yes' to confirm, 'No' to discard."
    safety: confirmation_required

  - id: reset_defaults
    label: Restore Factory Settings
    kind: action
    command: "RESETDEF"
    params: []
    description: "Restore factory settings"
```

## Feedbacks
```yaml
feedbacks:
  - id: system_status
    type: string
    description: "Response from STATUS command - includes system status and port status"
    trigger: "query"
    # UNRESOLVED: exact response format not documented in source

  - id: power_state
    type: enum
    values: [on, off]
    description: "Inferred from PON/POFF commands and STATUS response"
    # UNRESOLVED: exact power state query/response format not documented

  - id: output_state
    type: enum
    values: [on, off]
    description: "Per-output on/off state, queryable via STATUS"
    # UNRESOLVED: exact response format not documented

  - id: routing_state
    type: string
    description: "Which input is routed to which output, queryable via STATUS"
    # UNRESOLVED: exact response format not documented
```

## Variables
```yaml
# UNRESOLVED: no continuous variable ranges documented in source
# EDID presets are discrete enum choices captured in the edid_set_default action
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification/event mechanism documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - action_id: reset
    description: "RESET command requires typing 'Yes' to confirm or 'No' to discard"
interlocks: []
# UNRESOLVED: no power-on sequencing requirements documented in source
```

## Notes
- Commands are shared across RS-232 and TCP/IP (Telnet) interfaces with identical syntax.
- Output and input numbers are zero-padded two-digit values (e.g., `01`, `08`).
- Carriage return (`\r`, `0x0D`) terminates each command; some terminal programs use `<CR>` token.
- No spaces within commands unless required by the control system.
- Default network IP is 192.168.0.200 (DHCP enabled by default; reverts to static if no DHCP server).
- IR hardware uses 5V (not standard 12V).
- The source document refers to the product as "CMX88AB"; the user-provided device name is "C44". These may be the same product or share the same control protocol.

<!-- UNRESOLVED: TCP/Telnet port number not stated — source mentions TCP/IP control and "Telnet Commands" but gives no port -->
<!-- UNRESOLVED: command response/acknowledgement format not documented — only command syntax is provided -->
<!-- UNRESOLVED: EDIDxxDFzz input range is 01-04 in source but product is described as 8x8 matrix — possible documentation error or different variant -->
<!-- UNRESOLVED: no firmware version compatibility range stated -->
<!-- UNRESOLVED: web browser interface mentioned but no REST/HTTP API documented -->

## Provenance

```yaml
source_domains:
  - blustream.com.au
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-04-23T15:24:28.449Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:24:28.449Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All 14 spec actions matched verbatim in source with correct syntax; transport parameters verified; IR database is separate protocol layer."
```

## Known Gaps

```yaml
- IR_POWER_14
- IR_OUTPUT_1_09
- IR_OUTPUT_2_1D
- IR_3D_0F
- IR_4K_51
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
