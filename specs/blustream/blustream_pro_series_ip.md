---
spec_id: admin/blustream-pro-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blustream PRO Series Control Spec"
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
retrieved_at: 2026-05-07T06:41:15.747Z
last_checked_at: 2026-05-16T19:56:01.261Z
generated_at: 2026-05-16T19:56:01.261Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP port number for Telnet/raw socket control not stated in source (only web browser interface mentioned; Telnet port not specified)"
  - "Web browser interface HTTP port not stated in source"
  - "port number not stated in source (Telnet/raw TCP port not specified)"
  - "exact STATUS response syntax/format not stated in source"
  - "exact response format not stated in source"
  - "no settable parameter variables beyond discrete action commands found in source"
  - "no unsolicited notification events described in source"
  - "no multi-step macro sequences described in source"
  - "no power-on sequencing requirements or additional interlocks stated in source"
  - "TCP/IP Telnet control port not specified in source"
  - "HTTP port for web browser interface not specified in source"
  - "Exact STATUS command response format not documented in source"
  - "Maximum command response timeout or retry behavior not stated in source"
  - "Firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-16T19:56:01.261Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 spec actions matched source commands; transport parameters verified; IR codes correctly excluded. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# Blustream PRO Series Control Spec

## Summary

The Blustream PRO Series (CMX88AB) is an 8x8 HDMI matrix switcher controllable via TCP/IP (built-in web server and Telnet) and RS-232 serial. This spec covers the ASCII command protocol shared by both interfaces, including power, output routing, EDID management, and system configuration commands.

<!-- UNRESOLVED: TCP/IP port number for Telnet/raw socket control not stated in source (only web browser interface mentioned; Telnet port not specified) -->
<!-- UNRESOLVED: Web browser interface HTTP port not stated in source -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: port number not stated in source (Telnet/raw TCP port not specified)
  default_ip: 192.168.0.200  # fallback when no DHCP server present
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credentials  # default username: blustream, default password: 1234 (web interface)
  notes: >
    Default username is "blustream", default password is "1234".
    Auth applies to web browser interface; Telnet/serial auth not described in source.
```

## Traits

```yaml
- powerable      # inferred from PON / POFF commands
- routable       # inferred from OUTxxFRyy routing commands
- queryable      # inferred from STATUS command returning system/port status
```

## Actions

```yaml
- id: help
  label: Print Help
  kind: action
  command: "?"
  alt_command: "HELP"
  params: []
  notes: Prints help information.

- id: status
  label: Print System Status
  kind: action
  command: "STATUS"
  params: []
  notes: Returns status of all zones, types of connections, and system state.

- id: power_on
  label: Power On
  kind: action
  command: "PON"
  params: []
  notes: Powers on the matrix; system runs in normal state.

- id: power_off
  label: Power Off
  kind: action
  command: "POFF"
  params: []
  notes: Powers off the matrix; system enters power-save state.

- id: ir_control
  label: Set IR Control On/Off
  kind: action
  command: "IRON"  # or IROFF
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: Append ON or OFF to the IR prefix (e.g. IRON or IROFF)

- id: key_control
  label: Set Key (Front Panel) Control On/Off
  kind: action
  command: "KEYON"  # or KEYOFF
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: Append ON or OFF (e.g. KEYON or KEYOFF)

- id: debug_mode
  label: Set Debug Mode On/Off
  kind: action
  command: "DBGON"  # or DBGOFF
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: beep_control
  label: Set Onboard Beep On/Off
  kind: action
  command: "BEEPON"  # or BEEPOFF
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: reset
  label: Reset System to Default
  kind: action
  command: "RESET"
  params: []
  notes: >
    Prompts for confirmation. Type "Yes" to confirm or "No" to discard.
    This resets to default settings (not factory defaults — use RESETDEF for factory).

- id: output_on_off
  label: Set Output On or Off
  kind: action
  command: "OUTxxON"  # or OUTxxOFF
  params:
    - name: output
      type: string
      description: >
        Two-digit output zone number (e.g. 01–08). Append ON or OFF.
        Example: OUT01ON enables output 1; OUT01OFF disables output 1.

- id: route_input_to_output
  label: Route Input to Output
  kind: action
  command: "OUTxxFRyy"
  params:
    - name: output
      type: string
      description: Two-digit output zone number (01–08). Example value for xx.
    - name: input
      type: string
      description: Two-digit input number (01–08). Example value for yy.
  notes: "Example: OUT01FR04 routes input 4 to output 1."

- id: edid_copy
  label: Copy EDID from Output to Input
  kind: action
  command: "EDIDxxCPyy"
  params:
    - name: input
      type: string
      description: Input port number (01–08) or 00 for ALL inputs. Replaces xx.
    - name: output
      type: string
      description: Output port number (01–08) or 00 for ALL outputs. Replaces yy.

- id: edid_set_default
  label: Set Input EDID to Built-in Default
  kind: action
  command: "EDIDxxDFzz"
  params:
    - name: input
      type: string
      description: Input port (01–04 or 00 for all). Replaces xx.
    - name: edid_preset
      type: integer
      description: >
        Built-in EDID preset index (00–14). Replaces zz.
        00: HDMI 1080p@60Hz Audio 2CH PCM
        01: HDMI 1080p@60Hz Audio 5.1CH PCM/DTS/DOLBY
        02: HDMI 1080p@60Hz Audio 7.1CH PCM/DTS/DOLBY/HD
        03: HDMI 1080i@60Hz Audio 2CH PCM
        04: HDMI 1080i@60Hz Audio 5.1CH PCM/DTS/DOLBY
        05: HDMI 1080i@60Hz Audio 7.1CH PCM/DTS/DOLBY/HD
        06: HDMI 1080p@60Hz/3D Audio 2CH PCM
        07: HDMI 1080p@60Hz/3D Audio 5.1CH PCM/DTS/DOLBY
        08: HDMI 1080p@60Hz/3D Audio 7.1CH PCM/DTS/DOLBY/HD
        09: HDMI 4K2K Audio 2CH PCM
        10: HDMI 4K2K Audio 5.1CH PCM/DTS/DOLBY
        11: HDMI 4K2K Audio 7.1CH PCM/DTS/DOLBY/HD
        12: DVI 1280x1024@60Hz Audio None
        13: DVI 1920x1080@60Hz Audio None
        14: DVI 1920x1200@60Hz Audio None

- id: reset_factory
  label: Restore Factory Settings
  kind: action
  command: "RESETDEF"
  params: []
  notes: Restores factory default settings without confirmation prompt (distinct from RESET).
```

## Feedbacks

```yaml
- id: status_response
  type: string
  description: >
    Response to the STATUS command. Returns zone on/off states and connection type
    for each output. Exact response format not documented in source.
  # UNRESOLVED: exact STATUS response syntax/format not stated in source

- id: help_response
  type: string
  description: Response to ? or HELP command. Returns list of available commands.
  # UNRESOLVED: exact response format not stated in source
```

## Variables

```yaml
# UNRESOLVED: no settable parameter variables beyond discrete action commands found in source
```

## Events

```yaml
# UNRESOLVED: no unsolicited notification events described in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety

```yaml
confirmation_required_for:
  - id: reset
    command: RESET
    prompt: 'Type "Yes" to confirm or "No" to discard'
    notes: System will prompt for confirmation before executing RESET.
interlocks: []
# UNRESOLVED: no power-on sequencing requirements or additional interlocks stated in source
```

## Notes

- Commands are sent as ASCII strings. A carriage return (`\r` / `0x0D` / `<CR>`) must be appended after each command string. Some terminal software requires explicit carriage return tokens.
- Commands do not require spaces between tokens unless otherwise specified (e.g., `OUT01ON` not `OUT 01 ON`). Some control systems may require space-delimited variants such as `OUT{Space}01{Space}ON`.
- The matrix ships with DHCP enabled. If no DHCP server is present it falls back to static IP `192.168.0.200`.
- Default web interface credentials: username `blustream`, password `1234`.
- RS-232 connector is a 9-pin DB9; pin 2 = Tx, pin 3 = Rx, pin 5 = GND; all other pins are NC.
- Front panel key lock: hold the Input Down button for 10 seconds to lock/unlock. Can also be toggled via the KEYON/KEYOFF API command.
- The source document uses NEC IR hex codes for the 8x8 matrix IR database; these are IR blaster codes, not TCP/serial commands, and are not included in the Actions section above.
- The TCP/IP Telnet command port number is not stated in the source. Only the web browser interface is described for IP control, alongside the note that "The Blustream CMX88AB can be controlled via serial and TCP/IP" using the same RS-232 and Telnet Commands table.

<!-- UNRESOLVED: TCP/IP Telnet control port not specified in source -->
<!-- UNRESOLVED: HTTP port for web browser interface not specified in source -->
<!-- UNRESOLVED: Exact STATUS command response format not documented in source -->
<!-- UNRESOLVED: Maximum command response timeout or retry behavior not stated in source -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-05-07T06:41:15.747Z
last_checked_at: 2026-05-16T19:56:01.261Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T19:56:01.261Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 spec actions matched source commands; transport parameters verified; IR codes correctly excluded. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP port number for Telnet/raw socket control not stated in source (only web browser interface mentioned; Telnet port not specified)"
- "Web browser interface HTTP port not stated in source"
- "port number not stated in source (Telnet/raw TCP port not specified)"
- "exact STATUS response syntax/format not stated in source"
- "exact response format not stated in source"
- "no settable parameter variables beyond discrete action commands found in source"
- "no unsolicited notification events described in source"
- "no multi-step macro sequences described in source"
- "no power-on sequencing requirements or additional interlocks stated in source"
- "TCP/IP Telnet control port not specified in source"
- "HTTP port for web browser interface not specified in source"
- "Exact STATUS command response format not documented in source"
- "Maximum command response timeout or retry behavior not stated in source"
- "Firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
