---
spec_id: admin/blustream-cmx88ab
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blustream CMX88AB Control Spec"
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
retrieved_at: 2026-04-29T08:34:54.054Z
last_checked_at: 2026-05-14T18:17:14.675Z
generated_at: 2026-05-14T18:17:14.675Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number not stated in source"
  - "firmware version compatibility not stated"
  - "device marketed as \"Bluarc\" but source document identifies model as CMX88AB"
  - "TCP port number not stated in source (Telnet mentioned but port unspecified)"
  - "no settable continuous variables (e.g. volume, gain) documented in source"
  - "no unsolicited notification events documented in source"
  - "no multi-step macro sequences documented in source"
  - "TCP/Telnet port number not stated in source"
  - "exact response format for STATUS query not documented (field layout unknown)"
  - "no mention of UDP, HTTP/REST, or OSC control interfaces"
  - "firmware version compatibility not stated in source"
  - "error codes or fault behavior not documented in source"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.675Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 19 spec commands matched verbatim in source; transport parameters verified; core ASCII command catalogue is complete and accurate. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Blustream CMX88AB Control Spec

## Summary
The Blustream CMX88AB is an 8x8 HDMI matrix switcher controllable via RS-232 serial and TCP/IP (Telnet). Commands are shared across both interfaces and use plain-text ASCII strings terminated with a carriage return. The device supports power management, input-to-output routing, EDID management, and front-panel lockout.

<!-- UNRESOLVED: TCP port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: device marketed as "Bluarc" but source document identifies model as CMX88AB -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  # UNRESOLVED: TCP port number not stated in source (Telnet mentioned but port unspecified)
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credential
  # Source states default username and password are required for TCP/IP access
```

## Traits
```yaml
traits:
  - powerable    # PON / POFF commands
  - routable     # OUTxxFRyy routing commands
  - queryable    # STATUS command returns system and port state
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: PON
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: POFF
    params: []

  - id: output_on
    label: Output On
    kind: action
    command: OUTxxON
    params:
      - name: zone
        type: integer
        description: "Zone (output) number, zero-padded 2 digits (01-08)"
    example: OUT01ON

  - id: output_off
    label: Output Off
    kind: action
    command: OUTxxOFF
    params:
      - name: zone
        type: integer
        description: "Zone (output) number, zero-padded 2 digits (01-08)"
    example: OUT01OFF

  - id: route
    label: Route Input to Output
    kind: action
    command: OUTxxFRyy
    params:
      - name: zone
        type: integer
        description: "Zone (output) number, zero-padded 2 digits (01-08)"
      - name: input
        type: integer
        description: "Input number, zero-padded 2 digits (01-08)"
    example: OUT01FR04

  - id: ir_on
    label: IR Control On
    kind: action
    command: IRON
    params: []

  - id: ir_off
    label: IR Control Off
    kind: action
    command: IROFF
    params: []

  - id: key_on
    label: Front Panel Keys On
    kind: action
    command: KEYON
    params: []

  - id: key_off
    label: Front Panel Keys Off
    kind: action
    command: KEYOFF
    params: []

  - id: debug_on
    label: Debug Mode On
    kind: action
    command: DBGON
    params: []

  - id: debug_off
    label: Debug Mode Off
    kind: action
    command: DBGOFF
    params: []

  - id: beep_on
    label: Beep On
    kind: action
    command: BEEPON
    params: []

  - id: beep_off
    label: Beep Off
    kind: action
    command: BEEPOFF
    params: []

  - id: reset
    label: Reset to Defaults
    kind: action
    command: RESET
    params: []
    notes: Device prompts for confirmation; send "Yes" to confirm or "No" to cancel

  - id: reset_factory
    label: Restore Factory Settings
    kind: action
    command: RESETDEF
    params: []

  - id: edid_copy
    label: Copy EDID
    kind: action
    command: EDIDxxCPyy
    params:
      - name: input
        type: string
        description: "Input port number (01-08) or ALL (00)"
      - name: output
        type: string
        description: "Output port number (01-08) or ALL (00)"
    example: EDID01CP02

  - id: edid_set_default
    label: Set EDID Default
    kind: action
    command: EDIDxxDFzz
    params:
      - name: input
        type: string
        description: "Input port (01-08) or ALL (00)"
      - name: preset
        type: integer
        description: >-
          EDID preset number:
          00=1080p60 2CH PCM,
          01=1080p60 5.1CH PCM/DTS/DOLBY,
          02=1080p60 7.1CH,
          03=1080i60 2CH PCM,
          04=1080i60 5.1CH,
          05=1080i60 7.1CH,
          06=1080p60/3D 2CH,
          07=1080p60/3D 5.1CH,
          08=1080p60/3D 7.1CH,
          09=4K2K 2CH,
          10=4K2K 5.1CH,
          11=4K2K 7.1CH,
          12=DVI 1280x1024@60 No Audio,
          13=DVI 1920x1080@60 No Audio,
          14=DVI 1920x1200@60 No Audio

  - id: help
    label: Print Help
    kind: action
    command: "?"
    params: []
    alt_command: HELP
```

## Feedbacks
```yaml
feedbacks:
  - id: system_status
    label: System Status
    type: string
    command: STATUS
    description: Returns system status including zones on/off and connection types

  - id: power_state
    label: Power State
    type: enum
    values: [on, off]
    description: Queried via STATUS; PON = on, POFF = off

  - id: output_state
    label: Output Zone State
    type: enum
    values: [on, off]
    description: Per-zone on/off state returned in STATUS response

  - id: routing_state
    label: Input/Output Routing
    type: string
    description: Current input-to-output mapping returned in STATUS response
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables (e.g. volume, gain) documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - action: reset
    prompt: "RESET command requires 'Yes' confirmation"
interlocks: []
```

## Notes
- All commands use plain-text ASCII terminated with a carriage return (`\r` / `0x0D`). No spaces within commands unless required by the control program.
- RS-232 uses a 9-pin serial connector (pin 2 = Tx, pin 3 = Rx, pin 5 = GND). A straight or null-modem cable may be required depending on the control device.
- Default IP address: 192.168.0.200. Device ships with DHCP enabled; a static IP is recommended.
- Front panel lock can be toggled by holding the Input Down button for 10 seconds, or via the KEYON/KEYOFF command.
- Source document title is "CMX88AB Control Protocols" — this may also be marketed under the "Bluarc" product family name.

<!-- UNRESOLVED: TCP/Telnet port number not stated in source -->
<!-- UNRESOLVED: exact response format for STATUS query not documented (field layout unknown) -->
<!-- UNRESOLVED: no mention of UDP, HTTP/REST, or OSC control interfaces -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: error codes or fault behavior not documented in source -->

## Provenance

```yaml
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-04-29T08:34:54.054Z
last_checked_at: 2026-05-14T18:17:14.675Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.675Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 19 spec commands matched verbatim in source; transport parameters verified; core ASCII command catalogue is complete and accurate. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number not stated in source"
- "firmware version compatibility not stated"
- "device marketed as \"Bluarc\" but source document identifies model as CMX88AB"
- "TCP port number not stated in source (Telnet mentioned but port unspecified)"
- "no settable continuous variables (e.g. volume, gain) documented in source"
- "no unsolicited notification events documented in source"
- "no multi-step macro sequences documented in source"
- "TCP/Telnet port number not stated in source"
- "exact response format for STATUS query not documented (field layout unknown)"
- "no mention of UDP, HTTP/REST, or OSC control interfaces"
- "firmware version compatibility not stated in source"
- "error codes or fault behavior not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
