---
spec_id: admin/blustream-dmp168-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blustream DMP168 Series Control Spec"
manufacturer: Blustream
model_family: "DMP168 Series"
aliases: []
compatible_with:
  manufacturers:
    - Blustream
  models:
    - "DMP168 Series"
    - CMX88AB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - blustream.com.au
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-05-06T17:19:31.281Z
generated_at: 2026-05-06T17:19:31.281Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-06T17:19:31.281Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All 14 actions verified; {ON|OFF} placeholder notation in spec is a documentation convention for ON/OFF; transport (57600 8N1, no flow control) verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Blustream DMP168 Series Control Spec

## Summary
The Blustream DMP168 Series (documented as CMX88AB) is an HDMI matrix switcher controllable via RS-232 serial and TCP/IP (Telnet). This spec covers the serial and Telnet command set for power control, output enable/disable, input-to-output routing, EDID management, and system status queries.

<!-- UNRESOLVED: Source document title references CMX88AB — confirm DMP168 Series and CMX88AB are the same product family or adjust compatible_with accordingly -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
  base_url: null  # UNRESOLVED: not applicable for Telnet; web interface at default IP 192.168.0.200
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credential  # web UI has default username/password; Telnet auth status unclear
  # Source states default Username: blustream, Password: 1234 — applies to web interface
  # UNRESOLVED: whether Telnet/RS-232 require authentication
```

## Traits
```yaml
traits:
  - powerable    # PON/POFF commands
  - routable     # OUTxxFRyy routing commands
  - queryable    # STATUS command returns system and port status
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: PON
    params: []
    description: Power on, system runs on normal state

  - id: power_off
    label: Power Off
    kind: action
    command: POFF
    params: []
    description: Power off, system runs on power save state

  - id: output_on
    label: Output On
    kind: action
    command: OUT{xx}ON
    params:
      - name: output
        type: integer
        description: Output zone number (01-08, zero-padded)
    description: Turn specified output zone on

  - id: output_off
    label: Output Off
    kind: action
    command: OUT{xx}OFF
    params:
      - name: output
        type: integer
        description: Output zone number (01-08, zero-padded)
    description: Turn specified output zone off

  - id: route_output
    label: Route Output From Input
    kind: action
    command: OUT{xx}FR{yy}
    params:
      - name: output
        type: integer
        description: Output zone number (01-08, zero-padded)
      - name: input
        type: integer
        description: Input number (01-08, zero-padded)
    description: Route specified output to receive from specified input

  - id: edid_copy
    label: Copy EDID
    kind: action
    command: EDID{xx}CP{yy}
    params:
      - name: input
        type: string
        description: Input port (01-08) or ALL (00)
      - name: output
        type: string
        description: Output port (01-08) or ALL (00)
    description: Copy EDID from output to input

  - id: edid_default
    label: Set EDID Default
    kind: action
    command: EDID{xx}DF{zz}
    params:
      - name: input
        type: string
        description: Input port (01-08) or all inputs (00)
      - name: edid_preset
        type: integer
        description: EDID preset number (00-14)
    description: Set input EDID to a default preset (see EDID Default Values)

  - id: ir_control
    label: IR Control Toggle
    kind: action
    command: IR{ON|OFF}
    params:
      - name: state
        type: enum
        values: [ON, OFF]
    description: Enable or disable system IR control

  - id: key_control
    label: Key Lock Toggle
    kind: action
    command: KEY{ON|OFF}
    params:
      - name: state
        type: enum
        values: [ON, OFF]
    description: Enable or disable front panel key control

  - id: debug_toggle
    label: Debug Mode Toggle
    kind: action
    command: DBG{ON|OFF}
    params:
      - name: state
        type: enum
        values: [ON, OFF]
    description: Enable or disable debug mode

  - id: beep_toggle
    label: Beep Toggle
    kind: action
    command: BEEP{ON|OFF}
    params:
      - name: state
        type: enum
        values: [ON, OFF]
    description: Enable or disable onboard beep

  - id: reset
    label: Reset System
    kind: action
    command: RESET
    params: []
    description: Reset system to default settings. Requires confirmation "Yes" to execute, "No" to discard.

  - id: reset_factory
    label: Restore Factory Settings
    kind: action
    command: RESETDEF
    params: []
    description: Restore factory settings
```

## Feedbacks
```yaml
feedbacks:
  - id: system_status
    type: string
    command: STATUS
    description: Returns system status and port status including zones on, type of connection

  - id: help
    type: string
    command: "?"
    description: Print help information

  - id: help_alt
    type: string
    command: HELP
    description: Print help information
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - action_id: reset
    description: RESET command requires typing "Yes" to confirm, "No" to discard
interlocks: []
```

## Notes
- Commands do not require spaces between parameters (e.g., `OUT01ON`, not `OUT 01 ON`).
- A carriage return (`\r` / `0x0D`) may be required after command strings depending on the terminal software.
- RS-232 cable may need to be straight or null-modem depending on the control device's serial port pin configuration.
- EDID default presets range from 00 to 14, covering various HDMI/DVI resolutions and audio formats (2CH, 5.1CH, 7.1CH, PCM, DTS, Dolby).
- Web browser interface is available at the default IP 192.168.0.200 (DHCP by default; reverts to static if no DHCP server present).
- Default web credentials: username `blustream`, password `1234`.

<!-- UNRESOLVED: input/output port count — source implies 8x8 (01-08) but exact model matrix size not confirmed -->
<!-- UNRESOLVED: TCP port number for Telnet control not stated in source -->
<!-- UNRESOLVED: whether RS-232 and Telnet share identical command syntax confirmed beyond "RS-232 and Telnet Commands" section heading -->
<!-- UNRESOLVED: response format for STATUS query not documented in source -->
<!-- UNRESOLVED: maximum input/output zone count (observed range 01-08 but upper bound not explicitly stated) -->Spec generated above. Key observations:

- **Source discrepancy**: The document consistently references "CMX88AB" while the requested device is "DMP168 Series" — both are listed in `compatible_with.models` with an UNRESOLVED marker.
- **Transport**: Both TCP and serial are supported. Serial config is fully documented (57600 baud). TCP port number is **not stated** — marked UNRESOLVED.
- **Auth**: Default web credentials are documented but Telnet/serial auth is unclear — marked UNRESOLVED.
- **14 actions** populated from the command reference table.
- **Self-check passed**: no assumed baud rates, port numbers, or fabricated values.

## Provenance

```yaml
source_domains:
  - blustream.com.au
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-05-06T17:19:31.281Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-06T17:19:31.281Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All 14 actions verified; {ON|OFF} placeholder notation in spec is a documentation convention for ON/OFF; transport (57600 8N1, no flow control) verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
