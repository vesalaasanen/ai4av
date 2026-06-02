---
spec_id: admin/key-digital-systems-kd-msv8x8-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-MSV8X8 Control Spec"
manufacturer: "Key Digital"
model_family: KD-MSV8X8
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-MSV8X8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.com
  - manualslib.com
source_urls:
  - "http://keydigital.com/Control Mods Codes/KD-MSV8X8/RS-232/KD-MSV8X8_232_Commands.pdf"
  - https://www.manualslib.com/manual/602639/Key-Digital-Kd-Msv8x8-Fatboy.html
retrieved_at: 2026-04-29T16:42:38.486Z
last_checked_at: 2026-06-02T17:22:45.109Z
generated_at: 2026-06-02T17:22:45.109Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "response payload format (numeric vs verbose) is referenced but not defined in the source; firmware version, and any safety interlocks not stated."
  - "source references \"Numeric\" and \"Verbose\" response formats but"
  - "source documents command-driven parameter values (unit address,"
  - "source does not document unsolicited device-to-host notifications."
  - "source does not document multi-step macro sequences on the device."
  - "no safety warnings, interlocks, or power-sequencing requirements"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:45.109Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched verbatim in source; transport parameters (57600 baud, 8 data bits, no parity, 1 stop bit, no flow control) confirmed; 1:1 coverage of source command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Key Digital Systems KD-MSV8X8 Control Spec

## Summary
The KD-MSV8X8 is an 8x8 HDMI matrix switcher. This spec covers its RS-232 control protocol, including I/O routing, fade-to-black, mute, IR/front-panel lockout, unit addressing, status queries, response-format selection, and reset. No IP, REST, OSC, or UDP control surface is described in the source.

<!-- UNRESOLVED: response payload format (numeric vs verbose) is referenced but not defined in the source; firmware version, and any safety interlocks not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable        # inferred from I/O switching commands
- queryable       # inferred from status query commands
```

## Actions
```yaml
- id: io_switching_set
  label: I/O Switching Set
  kind: action
  command: "SP O{output:02d} SI {input:02d}"  # source syntax; spaces optional
  notes: "Source syntax is 'SP Oxx SI yy' with xx=output 01-08, yy=input 01-08. Example given: SPO03SI07"
  params:
    - name: output
      type: integer
      description: Output number 1-8 (zero-padded to 2 digits, e.g. 03)
    - name: input
      type: integer
      description: Input number 1-8 (zero-padded to 2 digits, e.g. 07)

- id: unit_address_set
  label: Unit Address Set
  kind: action
  command: "SP C A {address:02d}"
  notes: "xx = 2-digit unit address 00-99. 00 = stand-alone. Example: SPCA02"
  params:
    - name: address
      type: integer
      description: Unit address 0-99 (zero-padded to 2 digits)

- id: fade_to_black_interval_set
  label: Fade-to-Black Interval Set
  kind: action
  command: "SP O{output:02d} MI {value:02d}"
  notes: "xx=output 01-08; yy=interval 00-09. Intervals (ms, full fade-out+switch+fade-in): 00=0, 01=40, 02=80, 03=160, 04=240, 05=320, 06=480, 07=640, 08=800, 09=1200. Example: SPO02MI03 sets output 2 to 160ms."
  params:
    - name: output
      type: integer
      description: Output number 1-8 (zero-padded to 2 digits)
    - name: value
      type: integer
      description: Interval code 00-09; see notes for ms mapping

- id: ir_sensor_enable
  label: IR Sensor Enable
  kind: action
  command: "SPCIRE"

- id: ir_sensor_disable
  label: IR Sensor Disable
  kind: action
  command: "SPCIRD"

- id: front_panel_button_enable
  label: Front Panel Button Enable
  kind: action
  command: "SPCFBE"

- id: front_panel_button_disable
  label: Front Panel Button Disable
  kind: action
  command: "SPCFBD"

- id: output_video_mute
  label: Output Video Mute
  kind: action
  command: "SP O{output:02d} CM E"
  notes: "xx = output 01-08. Example: SPO02CME"
  params:
    - name: output
      type: integer
      description: Output number 1-8 (zero-padded to 2 digits)

- id: output_video_unmute
  label: Output Video Un-Mute
  kind: action
  command: "SP O{output:02d} CM D"
  notes: "xx = output 01-08. Example: SPO05CMD"
  params:
    - name: output
      type: integer
      description: Output number 1-8 (zero-padded to 2 digits)

- id: all_outputs_mute
  label: All Outputs Mute
  kind: action
  command: "SPC CME"
  notes: "Per source syntax 'SP C CM E'. Source example string 'SPCFBE' is a documented copy-paste error from the front-panel command above; canonical form is SPCME."

- id: all_outputs_unmute
  label: All Outputs Un-Mute
  kind: action
  command: "SPC CMD"
  notes: "Per source syntax 'SP C CM D'. Source example string 'SPCFBD' is a documented copy-paste error from the front-panel command above; canonical form is SPCMD."

- id: reset_unit
  label: Reset Unit
  kind: action
  command: "SPCDF"
  notes: "Factory default reset. Source shows command as 'SP C DF' (apparent truncation, treated as 'SPCDF' per example)."

- id: output_status_query
  label: Output Status Query
  kind: query
  command: "ST O{output:02d}"
  notes: "xx = output 01-08. Example: STO05. Response format follows currently selected numeric/verbose mode."
  params:
    - name: output
      type: integer
      description: Output number 1-8 (zero-padded to 2 digits)

- id: global_status_query
  label: Global Status Query
  kind: query
  command: "STA"

- id: numeric_response_mode
  label: Numeric Response Mode
  kind: action
  command: "SPCRSN"
  notes: "Selects numeric format for subsequent RS-232 responses. Example: SPCRSN."

- id: verbose_response_mode
  label: Verbose Response Mode
  kind: action
  command: "SPCRSV"
  notes: "Per source syntax 'SP C RS V'. Source example string 'SPCFBD' is a documented copy-paste error; canonical form is SPCRSV."

- id: list_commands
  label: List RS-232 Commands
  kind: query
  command: "H"
  notes: "Returns list of all available RS-232 commands."

- id: amx_status
  label: AMX Status
  kind: query
  command: "AMX"
  notes: "Returns current system status formatted for AMX control systems."
```

## Feedbacks
```yaml
# UNRESOLVED: source references "Numeric" and "Verbose" response formats but
# does not document either payload layout. Remove this comment and populate
# once response schemas are sourced.
```

## Variables
```yaml
# UNRESOLVED: source documents command-driven parameter values (unit address,
# fade-to-black interval) which are represented as parameterized Actions
# above rather than persistent Variables. No separate persistent-variable
# surface is described.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited device-to-host notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences on the device.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-sequencing requirements
# stated in the source. Reset Unit (SPCDF) restores factory defaults - note for
# integrator but not asserted as a safety interlock.
```

## Notes
- All RS-232 commands are case-insensitive per the source. Spaces shown in command syntax are for readability and may be omitted.
- Source contains three documented copy-paste errors in command examples that contradict the stated syntax: "All Outputs Mute" example shows `SPCFBE` (front-panel enable), "All Outputs Un-Mute" example shows `SPCFBD` (front-panel disable), and "Verbose Response" example shows `SPCFBD`. Canonical commands emitted above follow the syntax definitions (`SPCME`, `SPCMD`, `SPCRSV`).
- "Reset Unit" syntax is shown as `'SP C DF**` with trailing asterisks, treated as a formatting artifact for `SPCDF`.
- Baud rate 57600 is unusually high for AV control; verify against the unit before deployment if integrating with a generic serial driver.
- AMX status command (`AMX`) is intended for AMX control systems and may produce vendor-specific formatted output.
```

Spec written. 18 actions covering every command row in source (1 parameterized per source row, no under-enumeration). Three source copy-paste errors flagged in Notes; canonical commands follow stated syntax. Response format unresolved per policy.

Self-check pass: no invented voltages/ports/creds; status=draft, declared_confidence=low; entity_id present; unresolved markers on empty sections.

## Provenance

```yaml
source_domains:
  - keydigital.com
  - manualslib.com
source_urls:
  - "http://keydigital.com/Control Mods Codes/KD-MSV8X8/RS-232/KD-MSV8X8_232_Commands.pdf"
  - https://www.manualslib.com/manual/602639/Key-Digital-Kd-Msv8x8-Fatboy.html
retrieved_at: 2026-04-29T16:42:38.486Z
last_checked_at: 2026-06-02T17:22:45.109Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:45.109Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched verbatim in source; transport parameters (57600 baud, 8 data bits, no parity, 1 stop bit, no flow control) confirmed; 1:1 coverage of source command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "response payload format (numeric vs verbose) is referenced but not defined in the source; firmware version, and any safety interlocks not stated."
- "source references \"Numeric\" and \"Verbose\" response formats but"
- "source documents command-driven parameter values (unit address,"
- "source does not document unsolicited device-to-host notifications."
- "source does not document multi-step macro sequences on the device."
- "no safety warnings, interlocks, or power-sequencing requirements"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
