---
spec_id: admin/blustream-hmxl-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blustream HMXL Series Control Spec"
manufacturer: Blustream
model_family: CMX88AB
aliases: []
compatible_with:
  manufacturers:
    - Blustream
  models:
    - CMX88AB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-04-29T08:35:00.695Z
last_checked_at: 2026-06-02T21:56:30.383Z
generated_at: 2026-06-02T21:56:30.383Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number not stated in source — Telnet port assumed but unconfirmed"
  - "scope of \"HMXL Series\" vs \"CMX88AB\" unclear — source document only references CMX88AB"
  - "TCP port number not stated in source"
  - "unclear whether credentials apply to Telnet control or only the web browser interface"
  - "no settable continuous variables (e.g. volume, gain) described in source"
  - "no unsolicited notification protocol described in source"
  - "no multi-step sequences described in source"
  - "TCP/Telnet control port number not stated"
  - "whether Telnet session requires login credentials is ambiguous — credentials listed may be web-interface-only"
  - "exact output/input count for the full HMXL Series is not stated; CMX88AB is 8×8"
  - "no response format documentation for STATUS or other query commands"
  - "no command timing or rate-limiting information"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:56:30.383Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions traced to source. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Blustream HMXL Series Control Spec

## Summary

The Blustream HMXL Series (CMX88AB) is an 8×8 HDMI matrix switcher controllable via TCP/IP (Telnet) and RS-232 serial. Commands are ASCII strings terminated with a carriage return. The unit also provides a built-in web browser interface for control and configuration. This spec covers the Telnet/RS-232 command set.

<!-- UNRESOLVED: TCP port number not stated in source — Telnet port assumed but unconfirmed -->
<!-- UNRESOLVED: scope of "HMXL Series" vs "CMX88AB" unclear — source document only references CMX88AB -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
  # Default IP (DHCP fallback): 192.168.0.200
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credential  # source lists default username "blustream" and password "1234" under TCP/IP section
  # UNRESOLVED: unclear whether credentials apply to Telnet control or only the web browser interface
```

## Traits
```yaml
traits:
  - powerable    # PON / POFF commands
  - routable     # OUTxxFRyy input/output routing
  - queryable    # STATUS command returns system and port status
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "PON"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "POFF"
    params: []

  - id: output_on
    label: Output On
    kind: action
    command: "OUTxxON"
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08)"

  - id: output_off
    label: Output Off
    kind: action
    command: "OUTxxOFF"
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08)"

  - id: route_output
    label: Route Output from Input
    kind: action
    command: "OUTxxFRyy"
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08)"
      - name: input
        type: integer
        description: "Input source number (01-08)"

  - id: ir_control
    label: Set IR Control
    kind: action
    command: "IRON/OFF"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable IR control"

  - id: key_control
    label: Set Key Control
    kind: action
    command: "KEYON/OFF"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable front-panel key control"

  - id: debug_mode
    label: Set Debug Mode
    kind: action
    command: "DBGON/OFF"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable debug mode"

  - id: beep_control
    label: Set Beep
    kind: action
    command: "BEEPON/OFF"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable onboard beep"

  - id: reset_system
    label: Reset System to Default
    kind: action
    command: "RESET"
    params: []
    notes: "Prompts confirmation - type 'Yes' to confirm, 'No' to discard"

  - id: restore_factory
    label: Restore Factory Settings
    kind: action
    command: "RESETDEF"
    params: []

  - id: edid_copy
    label: Copy EDID
    kind: action
    command: "EDIDxxCPyy"
    params:
      - name: input
        type: string
        description: "Input port (01-08, or 00 for ALL)"
      - name: output
        type: string
        description: "Output port (01-08, or 00 for ALL)"

  - id: edid_set_default
    label: Set EDID Default
    kind: action
    command: "EDIDxxDFzz"
    params:
      - name: input
        type: string
        description: "Input port (01-04, or 00 for ALL)"
      - name: edid_preset
        type: string
        description: "EDID preset number (00-14)"
```

## Feedbacks
```yaml
feedbacks:
  - id: system_status
    label: System Status
    command: "STATUS"
    type: string
    description: "Returns system status including zones on/off and connection types"

  - id: help
    label: Help Information
    command: "?"
    type: string
    description: "Prints help information (also via HELP command)"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables (e.g. volume, gain) described in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - action_id: reset_system
    description: "RESET command requires 'Yes' confirmation before executing"
interlocks: []
```

## Notes
- Commands are ASCII strings; carriage return (`\r` / `0x0D`) terminates each command.
- No spaces between command tokens unless required by the control program.
- Depending on the control device serial port pin configuration, either a straight or null-modem RS-232 cable may be required.
- EDID default preset values range from `zz=00` (HDMI 1080p@60Hz, 2CH PCM) through `zz=14` (DVI 1920x1200@60Hz, no audio) — see source for full list.
- Default IP address (DHCP fallback): 192.168.0.200.
<!-- UNRESOLVED: TCP/Telnet control port number not stated -->
<!-- UNRESOLVED: whether Telnet session requires login credentials is ambiguous — credentials listed may be web-interface-only -->
<!-- UNRESOLVED: exact output/input count for the full HMXL Series is not stated; CMX88AB is 8×8 -->
<!-- UNRESOLVED: no response format documentation for STATUS or other query commands -->
<!-- UNRESOLVED: no command timing or rate-limiting information -->

## Provenance

```yaml
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-04-29T08:35:00.695Z
last_checked_at: 2026-06-02T21:56:30.383Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:56:30.383Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions traced to source. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number not stated in source — Telnet port assumed but unconfirmed"
- "scope of \"HMXL Series\" vs \"CMX88AB\" unclear — source document only references CMX88AB"
- "TCP port number not stated in source"
- "unclear whether credentials apply to Telnet control or only the web browser interface"
- "no settable continuous variables (e.g. volume, gain) described in source"
- "no unsolicited notification protocol described in source"
- "no multi-step sequences described in source"
- "TCP/Telnet control port number not stated"
- "whether Telnet session requires login credentials is ambiguous — credentials listed may be web-interface-only"
- "exact output/input count for the full HMXL Series is not stated; CMX88AB is 8×8"
- "no response format documentation for STATUS or other query commands"
- "no command timing or rate-limiting information"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
