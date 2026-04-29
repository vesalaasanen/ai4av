---
schema_version: ai4av-public-spec-v1
device_id: blustream/cmx88ab
entity_id: blustream_hmxl_series
spec_id: admin/blustream-hmxl-series
revision: 1
author: admin
title: "Blustream HMXL Series Control Spec"
status: published
manufacturer: Blustream
manufacturer_key: blustream
model_family: CMX88AB
aliases: []
compatible_with:
  manufacturers:
    - Blustream
  models:
    - CMX88AB
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
source_documents:
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:54.054Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:56.355Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:57.092Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:57.416Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:59.348Z
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-04-23T15:27:19.689Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:27:19.689Z
  matched_actions: 15
  action_count: 15
  confidence: high
  summary: "All 15 spec actions match verbatim in source command table; transport parameters verified; full command coverage."
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
source_urls:
  - "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
source_documents:
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:54.054Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:56.355Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:57.092Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:57.416Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:59.348Z
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-04-23T15:27:19.689Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:27:19.689Z
matched_actions: 15
action_count: 15
confidence: high
summary: "All 15 spec actions match verbatim in source command table; transport parameters verified; full command coverage."
```

## Known Gaps

```yaml
[]
```
