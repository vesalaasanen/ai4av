---
spec_id: admin/blustream-cmx-series-rs232-tcp
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
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-05-14T18:17:14.710Z
generated_at: 2026-05-14T18:17:14.710Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.710Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All 15 spec actions matched literally in the command reference table; all transport parameters verified verbatim in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Blustream CMX88AB Control Spec

## Summary
The Blustream CMX88AB is an 8×8 HDMI matrix switcher controllable via RS-232 serial and TCP/IP (Telnet). This spec covers serial/Telnet ASCII commands for power control, output zone on/off, input-to-output routing, EDID management, and system status queries. The device also has a built-in web interface for control and configuration.

<!-- UNRESOLVED: Telnet port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: command termination requirements vary by control system — source notes carriage return may or may not be required -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: null  # UNRESOLVED: Telnet port number not stated in source
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credential  # source states default username "blustream" and default password "1234" for web interface; unclear if auth applies to Telnet
```

## Traits
```yaml
traits:
  - powerable    # inferred from PON/POFF commands
  - routable     # inferred from OUTxxFRyy routing commands
  - queryable    # inferred from STATUS query command
```

## Actions
```yaml
actions:
  - id: help
    label: Print Help
    kind: action
    command: "?"
    params: []

  - id: help_alt
    label: Print Help (alt)
    kind: action
    command: "HELP"
    params: []

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

  - id: set_ir
    label: Set IR Control
    kind: action
    command: "IRON" or "IROFF"
    params:
      - name: state
        type: enum
        values: [on, off]
        description: Enable or disable IR control

  - id: set_key_lock
    label: Set Key Lock
    kind: action
    command: "KEYON" or "KEYOFF"
    params:
      - name: state
        type: enum
        values: [on, off]
        description: Enable or disable front panel key control

  - id: set_debug
    label: Set Debug Mode
    kind: action
    command: "DBGON" or "DBGOFF"
    params:
      - name: state
        type: enum
        values: [on, off]
        description: Enable or disable debug mode

  - id: set_beep
    label: Set Beep
    kind: action
    command: "BEEPON" or "BEEPOFF"
    params:
      - name: state
        type: enum
        values: [on, off]
        description: Enable or disable onboard beep

  - id: reset_system
    label: Reset to Defaults
    kind: action
    command: "RESET"
    params: []
    notes: Requires confirmation - type "Yes" to confirm, "No" to discard

  - id: output_on_off
    label: Output Zone On/Off
    kind: action
    command: "OUTxxON" or "OUTxxOFF"
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08)"
    notes: "Example: OUT01ON turns output 1 on"

  - id: route_output
    label: Route Input to Output
    kind: action
    command: "OUTxxFRyy"
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08)"
      - name: input
        type: integer
        description: "Input number (01-08)"
    notes: "Example: OUT01FR04 switches output 1 to source input 4"

  - id: edid_copy
    label: Copy EDID
    kind: action
    command: "EDIDxxCPyy"
    params:
      - name: input
        type: string
        description: "Input port (01-08 or 00 for ALL)"
      - name: output
        type: string
        description: "Output port (01-08 or 00 for ALL)"
    notes: Copies EDID from output to input; 00 = ALL

  - id: edid_default
    label: Set EDID to Default
    kind: action
    command: "EDIDxxDFzz"
    params:
      - name: input
        type: string
        description: "Input port (00 for all, 01-04 for individual)"
      - name: edid_preset
        type: integer
        description: "EDID default preset number (00-14)"

  - id: restore_factory
    label: Restore Factory Settings
    kind: action
    command: "RESETDEF"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: system_status
    label: System Status
    type: string
    command: "STATUS"
    description: Returns system status including zones on, connection types, and port status
    values: null  # UNRESOLVED: response format not documented in source
```

## Variables
```yaml
variables:
  - id: edid_preset_table
    type: lookup
    description: >
      EDID default preset values (zz parameter):
      00: HDMI 1080p@60Hz, Audio 2CH PCM
      01: HDMI 1080p@60Hz, Audio 5.1CH PCM/DTS/DOLBY
      02: HDMI 1080p@60Hz, Audio 7.1CH PCM/DTS/DOLBY/HD
      03: HDMI 1080i@60Hz, Audio 2CH PCM
      04: HDMI 1080i@60Hz, Audio 5.1CH PCM/DTS/DOLBY
      05: HDMI 1080i@60Hz, Audio 7.1CH PCM/DTS/DOLBY/HD
      06: HDMI 1080p@60Hz/3D, Audio 2CH PCM
      07: HDMI 1080p@60Hz/3D, Audio 5.1CH PCM/DTS/DOLBY
      08: HDMI 1080p@60Hz/3D, Audio 7.1CH PCM/DTS/DOLBY/HD
      09: HDMI 4K2K, Audio 2CH PCM
      10: HDMI 4K2K, Audio 5.1CH PCM/DTS/DOLBY
      11: HDMI 4K2K, Audio 7.1CH PCM/DTS/DOLBY/HD
      12: DVI 1280x1024@60Hz, Audio None
      13: DVI 1920x1080@60Hz, Audio None
      14: DVI 1920x1200@60Hz, Audio None
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
  - action_id: reset_system
    description: "RESET command requires typing 'Yes' to confirm"
interlocks: []
# UNRESOLVED: no other safety warnings, interlock procedures, or power-on sequencing documented in source
```

## Notes
- Commands do not require spaces unless the control program enforces them.
- Carriage return handling varies by control system — some require `<CR>` (`\r`, `0x0D`) after the command string, others do not.
- The RS-232 cable may need to be either straight or null-modem depending on the control device's serial port pin configuration.
- Default IP address (when no DHCP server is present): 192.168.0.200. Default web username: `blustream`, default password: `1234`.
- The document title references "CMX Series" but the specific model documented is CMX88AB (8×8 HDMI matrix).
- IR hardware uses 5V.

<!-- UNRESOLVED: Telnet port number not stated — whether same commands work over TCP on a specific port -->
<!-- UNRESOLVED: STATUS response format not documented -->
<!-- UNRESOLVED: whether web credentials (blustream/1234) apply to Telnet authentication -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-05-14T18:17:14.710Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.710Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All 15 spec actions matched literally in the command reference table; all transport parameters verified verbatim in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
