---
spec_id: admin/blustream-c66cs
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blustream C66CS Control Spec"
manufacturer: Blustream
model_family: C66CS
aliases: []
compatible_with:
  manufacturers:
    - Blustream
  models:
    - C66CS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-05-04T06:15:26.245Z
last_checked_at: 2026-06-02T22:04:35.788Z
generated_at: 2026-06-02T22:04:35.788Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number not stated in source (Telnet section referenced but no port given)"
  - "no settable continuous parameters (e.g. volume/gain) documented in source"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "no other safety warnings or interlock procedures found in source"
  - "exact model-to-command-set mapping not confirmed"
  - "number of inputs/outputs for C66CS variant not confirmed (CMX88AB implies 8x8)"
  - "firmware version compatibility not stated in source"
  - "TCP port number not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:04:35.788Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Blustream C66CS Control Spec

## Summary

The Blustream C66CS is an HDMI matrix switcher controllable via TCP/IP (Telnet) and RS-232 serial. This spec documents the serial/Telnet command set including power control, output enable/disable, input-to-output routing, EDID management, and system status queries. The source document references model CMX88AB; C66CS may be a variant or regional designation sharing the same command set.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  default_ip: 192.168.0.200
  port: null  # UNRESOLVED: TCP port number not stated in source (Telnet section referenced but no port given)
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credential
  default_username: blustream
  default_password: "1234"
```

## Traits
```yaml
traits:
  - powerable  # inferred from PON/POFF commands
  - routable  # inferred from OUTxxFRyy routing commands
  - queryable  # inferred from STATUS query command
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: PON
    params: []
    description: "Power on, system runs on normal state"

  - id: power_off
    label: Power Off
    kind: action
    command: POFF
    params: []
    description: "Power off, system runs on power save state"

  - id: output_on
    label: Output On
    kind: action
    command: OUTxxON
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08)"
    description: "Set specified output on"

  - id: output_off
    label: Output Off
    kind: action
    command: OUTxxOFF
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08)"
    description: "Set specified output off"

  - id: route_output
    label: Route Output from Input
    kind: action
    command: OUTxxFRyy
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08)"
      - name: input
        type: integer
        description: "Input source number (01-08)"
    description: "Route specified input to specified output. e.g. OUT01FR04 switches output 1 to source input 4"

  - id: ir_control
    label: IR Control Toggle
    kind: action
    command: IRON/OFF
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable system IR control"
    description: "Set system IR control on or off"

  - id: key_control
    label: Key Lock Toggle
    kind: action
    command: KEYON/OFF
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable front panel key control"
    description: "Set system KEY control on or off"

  - id: debug_toggle
    label: Debug Mode Toggle
    kind: action
    command: DBGON/OFF
    params:
      - name: state
        type: enum
        values: [ON, OFF]
    description: "Set debug mode on or off"

  - id: beep_toggle
    label: Beep Toggle
    kind: action
    command: BEEPON/OFF
    params:
      - name: state
        type: enum
        values: [ON, OFF]
    description: "Set onboard beep on or off"

  - id: edid_copy
    label: EDID Copy
    kind: action
    command: EDIDxxCPyy
    params:
      - name: input
        type: string
        description: "Input port number (01-08) or ALL (00)"
      - name: output
        type: string
        description: "Output port number (01-08) or ALL (00)"
    description: "Copy EDID from output to input. Both can be set individually (01-08) or ALL (00)"

  - id: edid_set_default
    label: EDID Set Default
    kind: action
    command: EDIDxxDFzz
    params:
      - name: input
        type: string
        description: "Input port (00=all inputs, 01-08=single input)"
      - name: edid_preset
        type: integer
        description: "Default EDID preset number (00-14)"
    description: "Set input EDID to default preset. See EDID Default Values for preset codes."

  - id: reset_system
    label: Reset System
    kind: action
    command: RESET
    params: []
    description: "Reset system to default settings. Requires confirmation: send 'Yes' to confirm, 'No' to discard."

  - id: reset_factory
    label: Factory Reset
    kind: action
    command: RESETDEF
    params: []
    description: "Restore factory settings"
```

## Feedbacks
```yaml
feedbacks:
  - id: system_status
    label: System Status
    type: string
    query_command: STATUS
    description: "Returns system status including zones on, connection types, and port status"

  - id: help_info
    label: Help Information
    type: string
    query_command: "?"
    description: "Prints help information (also via HELP command)"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters (e.g. volume/gain) documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - reset_system
interlocks: []
# RESET command requires explicit "Yes" confirmation per source documentation.
# UNRESOLVED: no other safety warnings or interlock procedures found in source
```

## Notes

- Commands do not require spaces between elements (e.g. `OUT01ON`, not `OUT 01 ON`). Some control programs may require spaces depending on their parser.
- Carriage return (`\r` / `0D hex`) may or may not be required depending on the control software. Both cases should be tested.
- RS-232 cable type (straight or null-modem) depends on the control device's serial port pin configuration.
- The source document references model **CMX88AB** throughout; C66CS may share the same command set. <!-- UNRESOLVED: exact model-to-command-set mapping not confirmed -->
- EDID default presets (00-14) cover HDMI resolutions from 1080i to 4K with various audio configurations (2CH PCM through 7.1CH), plus three DVI modes.
- The matrix ships with DHCP enabled; default static IP is 192.168.0.200 when no DHCP server is present.
<!-- UNRESOLVED: number of inputs/outputs for C66CS variant not confirmed (CMX88AB implies 8x8) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP port number not stated in source -->

## Provenance

```yaml
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-05-04T06:15:26.245Z
last_checked_at: 2026-06-02T22:04:35.788Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:04:35.788Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number not stated in source (Telnet section referenced but no port given)"
- "no settable continuous parameters (e.g. volume/gain) documented in source"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "no other safety warnings or interlock procedures found in source"
- "exact model-to-command-set mapping not confirmed"
- "number of inputs/outputs for C66CS variant not confirmed (CMX88AB implies 8x8)"
- "firmware version compatibility not stated in source"
- "TCP port number not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
