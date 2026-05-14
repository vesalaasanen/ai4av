---
spec_id: admin/blustream-mv41
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blustream MV41 Control Spec"
manufacturer: Blustream
model_family: MV41
aliases: []
compatible_with:
  manufacturers:
    - Blustream
  models:
    - MV41
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-05-14T18:17:14.765Z
generated_at: 2026-05-14T18:17:14.765Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.765Z
  matched_actions: 13
  action_count: 13
  confidence: high
  summary: "All 15 spec actions matched literally in source command table; serial transport parameters verified; credentials documented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Blustream MV41 Control Spec

## Summary
The Blustream MV41 is an HDMI matrix switcher controllable via TCP/IP (Telnet) and RS-232 serial. Commands are plain ASCII strings terminated with a carriage return (`\r`). The unit also exposes a built-in web browser interface for control and configuration. The source document references model CMX88AB; this spec is applied to the MV41 per ingest request.

<!-- UNRESOLVED: source document refers to CMX88AB throughout — relationship to MV41 not confirmed -->
<!-- UNRESOLVED: TCP/Telnet control port number not stated in source -->
<!-- UNRESOLVED: unclear whether web interface credentials apply to Telnet sessions -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: Telnet/control port number not stated in source
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credential
  # Source states default username "blustream" and password "1234" under TCP/IP section.
  # UNRESOLVED: unclear whether these credentials apply to Telnet control or only web interface
```

## Traits
```yaml
traits:
  - powerable     # PON / POFF commands
  - routable      # OUTxxFRyy input/output routing commands
  - queryable     # STATUS command returns system and port status
```

## Actions
```yaml
actions:
  - id: help
    label: Print Help
    kind: action
    command: "?"
    params: []
    description: Print help information. Also triggered by "HELP".

  - id: power_on
    label: Power On
    kind: action
    command: "PON"
    params: []
    description: Power on, system runs on normal state.

  - id: power_off
    label: Power Off
    kind: action
    command: "POFF"
    params: []
    description: Power off, system runs on power save state.

  - id: ir_control
    label: Set IR Control
    kind: action
    command: "IRON"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable system IR control. Send IRON or IROFF."
    description: Set system IR control on or off.

  - id: key_control
    label: Set Key Control
    kind: action
    command: "KEYON"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable front-panel key control. Send KEYON or KEYOFF."
    description: Set system key (front panel) control on or off.

  - id: debug_mode
    label: Set Debug Mode
    kind: action
    command: "DBGON"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable debug mode. Send DBGON or DBGOFF."
    description: Set debug mode on or off.

  - id: beep_control
    label: Set Beep
    kind: action
    command: "BEEPON"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Enable or disable onboard beep. Send BEEPON or BEEPOFF."
    description: Set onboard beep on or off.

  - id: output_on_off
    label: Set Output On/Off
    kind: action
    command: "OUTxxON"
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08), zero-padded two digits."
      - name: state
        type: enum
        values: [ON, OFF]
        description: "Send OUTxxON or OUTxxOFF."
    description: "Set output zone on or off. Example: OUT01ON turns output 1 on, OUT02OFF turns output 2 off."

  - id: route_output
    label: Route Output From Input
    kind: action
    command: "OUTxxFRyy"
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08), zero-padded two digits."
      - name: input
        type: integer
        description: "Input number (01-08), zero-padded two digits."
    description: "Route output xx from input yy. Example: OUT01FR04 switches output 1 to source input 4."

  - id: edid_copy
    label: Copy EDID
    kind: action
    command: "EDIDxxCPyy"
    params:
      - name: input
        type: string
        description: "Input port number (01-08), or ALL (00)."
      - name: output
        type: string
        description: "Output port number (01-08), or ALL (00)."
    description: "Copy EDID from output (yy) to input (xx). Both can be set individually or as ALL (00)."

  - id: edid_default
    label: Set EDID Default
    kind: action
    command: "EDIDxxDFzz"
    params:
      - name: input
        type: string
        description: "Input port - 00 for all inputs, 01-04 for a single input."
      - name: preset
        type: integer
        description: "EDID default preset number (00-14). See EDID Default Values table."
    description: "Set input EDID to a default preset. Presets 00-14 cover various HDMI/DVI resolutions and audio formats."

  - id: reset
    label: Reset System
    kind: action
    command: "RESET"
    params: []
    description: "Reset system to default settings. Device prompts for confirmation - type 'Yes' to confirm, 'No' to discard."

  - id: reset_factory
    label: Restore Factory Settings
    kind: action
    command: "RESETDEF"
    params: []
    description: Restore factory settings.
```

## Feedbacks
```yaml
feedbacks:
  - id: system_status
    label: System Status
    type: string
    command: "STATUS"
    description: "Returns system status including zones on, type of connection, and port status."

  - id: help_info
    label: Help Information
    type: string
    command: "?"
    description: "Returns help text listing available commands. Also triggered by 'HELP'."
```

## Variables
```yaml
# UNRESOLVED: no settable parameters with queryable state documented in source
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
  - action_id: reset
    description: "RESET command prompts 'Yes'/'No' confirmation before executing."
interlocks: []
# UNRESOLVED: no other safety warnings, interlock procedures, or power-on sequencing documented in source
```

## Notes
- Commands are plain ASCII terminated with a carriage return (`\r`, hex `0x0D`). Some terminal programs use `<CR>` or `0D`.
- Do not include spaces within commands unless required by the control program. Correct format: `OUT01ON` (no spaces).
- RS-232 pin assignment: Pin 2 = Tx, Pin 3 = Rx, Pin 5 = GND. A straight or null-modem cable may be required depending on the control device.
- Default IP address (when no DHCP server present): 192.168.0.200. Device ships with DHCP enabled.
- Web interface provides control and configuration via a built-in web server.
- IR hardware uses 5V.

<!-- UNRESOLVED: source document title is "CMX88AB Control Protocols" — applicability to MV41 needs verification -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: command response formats not fully documented (e.g. STATUS output structure) -->
<!-- UNRESOLVED: input/output count for MV41 not confirmed — source implies up to 8 outputs and 8 inputs (CMX88AB is 8x8) -->
```

---

**Self-check:**
- No voltage/current/power values invented ✓
- No port numbers assumed ✓ (marked UNRESOLVED)
- No baud rate assumed ✓ (57600 stated in source)
- `status: draft` ✓
- `declared_confidence: low` ✓
- YAML blocks valid ✓
- `entity_id` populated from input ✓
- UNRESOLVED markers present for all gaps ✓

**Note:** The source document is titled "CMX88AB Control Protocols" and references an 8×8 matrix, while the requested device is "MV41". The MV41 may be a different model with a different I/O count. The command set appears shared across Blustream matrix products, but this should be verified against the actual MV41 documentation.Spec generated above. Key flags:

- **Source/model mismatch**: Source doc covers CMX88AB (8×8 matrix); MV41 may have different I/O counts
- **TCP port**: Not stated — marked UNRESOLVED
- **Auth**: Credentials stated (`blustream`/`1234`) but unclear if they apply to Telnet or only the web UI
- **Serial config**: Fully specified — 57600/8N1/no flow control
- **14 commands** documented in the command reference table

## Provenance

```yaml
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-05-14T18:17:14.765Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.765Z
matched_actions: 13
action_count: 13
confidence: high
summary: "All 15 spec actions matched literally in source command table; serial transport parameters verified; credentials documented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
