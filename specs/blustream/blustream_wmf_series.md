---
spec_id: admin/blustream-wmf-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blustream WMF Series Control Spec"
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
retrieved_at: 2026-07-12T08:29:13.342Z
last_checked_at: 2026-07-12T08:55:40.482Z
generated_at: 2026-07-12T08:55:40.482Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP port number not stated in source. Exact WMF Series model variants beyond CMX88AB not enumerated."
  - "TCP port number not stated in source (Telnet assumed but port unspecified)"
  - "no settable continuous variables (e.g. volume/gain) found in source"
  - "no unsolicited event/notification mechanism described in source"
  - "no multi-step macro sequences described in source"
  - "no power-on sequencing or safety interlock procedures described in source"
  - "TCP/Telnet port number not stated in source"
  - "firmware version compatibility not stated in source"
  - "exact WMF Series model range beyond CMX88AB not stated in source"
  - "response format/acknowledgement strings for commands not documented in source"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:55:40.482Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions matched source commands exactly; transport parameters verified; full bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Blustream WMF Series Control Spec

## Summary

The Blustream WMF Series (CMX88AB) is an HDMI matrix switcher supporting 8 inputs and 8 outputs with HDBaseT extension. It can be controlled via RS-232 serial or TCP/IP (Telnet), and also exposes a built-in web browser interface for configuration and control.

<!-- UNRESOLVED: TCP/IP port number not stated in source. Exact WMF Series model variants beyond CMX88AB not enumerated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source (Telnet assumed but port unspecified)
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credentials
  description: "Default username: blustream, Default password: 1234"
```

## Traits
```yaml
- powerable    # PON / POFF commands
- routable     # OUTxxFRyy routing commands
- queryable    # STATUS / HELP / ? query commands
```

## Actions
```yaml
- id: help
  label: Print Help
  kind: action
  command: "?"
  params: []

- id: help_keyword
  label: Print Help (Keyword)
  kind: action
  command: "HELP"
  params: []

- id: status
  label: System Status
  kind: query
  command: "STATUS"
  params: []
  description: Returns system status including zones on, connection types, port status

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

- id: ir_control
  label: Set IR Control
  kind: action
  command: "IRON" | "IROFF"
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Enable or disable system IR control

- id: key_control
  label: Set Key Control
  kind: action
  command: "KEYON" | "KEYOFF"
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Enable or disable system KEY control

- id: debug_mode
  label: Set Debug Mode
  kind: action
  command: "DBGON" | "DBGOFF"
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Enable or disable debug mode

- id: beep_control
  label: Set Beep
  kind: action
  command: "BEEPON" | "BEEPOFF"
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Enable or disable onboard beep

- id: output_on_off
  label: Set Output On/Off
  kind: action
  command: "OUTxxON" | "OUTxxOFF"
  params:
    - name: output
      type: integer
      description: "Output zone number (01-08)"
    - name: state
      type: enum
      values: [on, off]
      description: Turn output on or off

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

- id: edid_copy
  label: Copy EDID
  kind: action
  command: "EDIDxxCPyy"
  params:
    - name: input
      type: string
      description: "Input port (01-08 or ALL/00)"
    - name: output
      type: string
      description: "Output port (01-08)"

- id: edid_set_default
  label: Set Default EDID
  kind: action
  command: "EDIDxxDFzz"
  params:
    - name: input
      type: string
      description: "Input port (00=all, 01-04)"
    - name: edid_preset
      type: integer
      description: "EDID preset (00-14): 00=1080p/2CH, 01=1080p/5.1CH, 02=1080p/7.1CH, 03=1080i/2CH, 04=1080i/5.1CH, 05=1080i/7.1CH, 06=1080p-3D/2CH, 07=1080p-3D/5.1CH, 08=1080p-3D/7.1CH, 09=4K/2CH, 10=4K/5.1CH, 11=4K/7.1CH, 12=DVI-1280x1024, 13=DVI-1920x1080, 14=DVI-1920x1200"

- id: reset
  label: Reset to Defaults
  kind: action
  command: "RESET"
  params: []
  description: Requires confirmation by typing "Yes"; "No" to discard

- id: reset_factory
  label: Restore Factory Settings
  kind: action
  command: "RESETDEF"
  params: []
```

## Feedbacks
```yaml
- id: system_status
  type: string
  description: "STATUS command returns system status including zones on, connection types, port status"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables (e.g. volume/gain) found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - reset  # RESET command requires typing "Yes" to confirm
interlocks: []
# UNRESOLVED: no power-on sequencing or safety interlock procedures described in source
```

## Notes
- Commands are terminated with a carriage return (`<CR>` / `\r` / `0x0D`).
- No spaces within commands unless required by the control system software.
- RS-232 pin 2 is Tx, pin 3 is Rx, pin 5 is GND. A straight or null-modem cable may be required depending on the control device.
- The matrix ships with DHCP enabled; default static fallback IP is 192.168.0.200.
- Default credentials: username `blustream`, password `1234`.
- A web browser interface is available for control and configuration.
- For EDIDxxDFzz, input port range is 01-04 per source (not 01-08). Output port parameter for this command is not documented in source.

<!-- UNRESOLVED: TCP/Telnet port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact WMF Series model range beyond CMX88AB not stated in source -->
<!-- UNRESOLVED: response format/acknowledgement strings for commands not documented in source -->

## Provenance

```yaml
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-07-12T08:29:13.342Z
last_checked_at: 2026-07-12T08:55:40.482Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:55:40.482Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions matched source commands exactly; transport parameters verified; full bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP port number not stated in source. Exact WMF Series model variants beyond CMX88AB not enumerated."
- "TCP port number not stated in source (Telnet assumed but port unspecified)"
- "no settable continuous variables (e.g. volume/gain) found in source"
- "no unsolicited event/notification mechanism described in source"
- "no multi-step macro sequences described in source"
- "no power-on sequencing or safety interlock procedures described in source"
- "TCP/Telnet port number not stated in source"
- "firmware version compatibility not stated in source"
- "exact WMF Series model range beyond CMX88AB not stated in source"
- "response format/acknowledgement strings for commands not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
