---
spec_id: admin/datasat-digital-entertainment-ap20
schema_version: ai4av-public-spec-v1
revision: 1
title: "Datasat Digital Entertainment AP20 Control Spec"
manufacturer: "Datasat Digital Entertainment"
model_family: AP20
aliases: []
compatible_with:
  manufacturers:
    - "Datasat Digital Entertainment"
  models:
    - AP20
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - datasatdigital.com
source_urls:
  - https://www.datasatdigital.com/download/55/ap25/2762/tn-h413_rev-d_ap20-ap25-remote-command-api.pdf
retrieved_at: 2026-04-30T04:35:03.888Z
last_checked_at: 2026-06-02T03:24:37.479Z
generated_at: 2026-06-02T03:24:37.479Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "this spec covers both AP20 and AP25; the model list above names only AP20 per device-name input."
  - "baud rate user-configurable via System > Automation > Serial menu; no default value stated in source"
  - "not stated in source"
  - "no explicit power command in source; trait not strongly supported"
  - "no input routing commands in source"
  - "powerable trait removed pending source evidence; routable trait removed pending source evidence."
  - "source documents all settable parameters as discrete commands (FADER, MUTED, MONITORLEVEL, MONITORMUTE, FORMAT); no separate continuous-variable section. Section retained for structural completeness."
  - "no unsolicited notification mechanism documented in source."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
  - "baud rate, data bits, parity, stop bits, flow control not stated in source. Firmware version compatibility not stated. Power on/off commands not present in source. Input routing commands not present in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T03:24:37.479Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions match source commands with correct wire-level tokens and parameters; transport values verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Datasat Digital Entertainment AP20 Control Spec

## Summary
The Datasat AP20 is a professional cinema audio processor. This spec covers the Remote Command API for both serial (RS-232) and Ethernet (TCP) control. Commands are ASCII text prefixed with `@` and terminated by `<CR>` (0x0D). Authentication is supported via a password-protected `AUTH` command.

<!-- UNRESOLVED: this spec covers both AP20 and AP25; the model list above names only AP20 per device-name input. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 14500
serial:
  baud_rate: null  # UNRESOLVED: baud rate user-configurable via System > Automation > Serial menu; no default value stated in source
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: password
  description: "AUTH command with NetCmd Password (operator) or Setup Password (setup). Inquiry commands (SYSTEM, IDENTIFY) operate without a password. AUTH must precede any password-protected command. Authorization valid for duration of TCP connection."
```

## Traits
```yaml
- powerable  # UNRESOLVED: no explicit power command in source; trait not strongly supported
- routable  # UNRESOLVED: no input routing commands in source
- queryable  # inferred from query command examples (SYSTEM, IDENTIFY, HEALTH, BOARDINFO, SERIALNO, MAC, FADER, MUTED, MONITORLEVEL, MONITORMUTE)
- levelable  # inferred from FADER and MONITORLEVEL command examples
```

<!-- UNRESOLVED: powerable trait removed pending source evidence; routable trait removed pending source evidence. -->

## Actions
```yaml
- id: system_information
  label: System Information
  kind: query
  command: "@SYSTEM\r"
  params: []
  description: "Returns software version, version date, and MAC address."

- id: identify
  label: Identify
  kind: query
  command: "@IDENTIFY\r"
  params: []
  description: "Returns device model confirmation (AP20), IP, circuit, theater, screen info. Used in discovery."

- id: health_temperature
  label: Health - Temperature
  kind: query
  command: "@HEALTH TEMPERATURE\r"
  params: []
  description: "Returns t1, t2, t3 Celsius temps for H331, H332, H335 boards."

- id: health_h331volts
  label: Health - H331 Voltages
  kind: query
  command: "@HEALTH H331VOLTS\r"
  params: []
  description: "Returns vok, ref, 5v, +15v, -15v, -5V for H331 board."

- id: health_h332volts
  label: Health - H332 Voltages
  kind: query
  command: "@HEALTH H332VOLTS\r"
  params: []
  description: "Returns vok, ref, 5v, +15v, -15v, -5V for H332 board. Returns NA if H332 not present."

- id: health_h335volts
  label: Health - H335 Voltages
  kind: query
  command: "@HEALTH H335VOLTS\r"
  params: []
  description: "Returns vok, ref, 1.3v for H335 board."

- id: health_h336volts
  label: Health - H336 Voltages
  kind: query
  command: "@HEALTH H336VOLTS\r"
  params: []
  description: "Returns vok, ref, +5V, +15V, -15V, 48V (mic phantom), vcpu for H336 board."

- id: health_h338volts
  label: Health - H338 Voltages
  kind: query
  command: "@HEALTH H338VOLTS\r"
  params: []
  description: "Returns vok, ref, 5v, +10V, -10V for H338 board. Returns NA if H338 not present."

- id: board_info
  label: Board Information
  kind: query
  command: "@BOARDINFO\r"
  params: []
  description: "Returns list of boards (H331, H332, H335, H337In, H337Out, H338, HDMI) with hardware revisions and firmware versions."

- id: auth
  label: Authorization
  kind: action
  command: "@AUTH {password}\r"
  params:
    - name: password
      type: string
      description: Operator (NetCmd) or Setup password. Setup password takes precedence.
  description: "Authenticates client for password-protected commands. Returns SETUP, OP, or SECERR."

- id: serial_number
  label: Serial Number
  kind: query
  command: "@SERIALNO\r"
  params: []
  description: "Reads the unit serial number."

- id: mac_address
  label: MAC Address
  kind: query
  command: "@MAC\r"
  params: []
  description: "Reads the network MAC address."

- id: format_selection
  label: Format Selection
  kind: action
  command: "@FORMAT {name}\r"
  params:
    - name: name
      type: string
      description: Format name (must match exactly; spaces allowed). Omit to read current format.
  description: "Set or read the current audio format."

- id: run_macro
  label: Run Macro
  kind: action
  command: "@RUNMACRO {name}\r"
  params:
    - name: name
      type: string
      description: Macro name (must match exactly; spaces allowed).
  description: "Executes a macro defined on the AP20. Returns OK or 'ERR no macro'."

- id: master_fader
  label: Master Fader Level
  kind: action
  command: "@FADER {level}\r"
  params:
    - name: level
      type: integer
      description: Fader level in tenths (e.g. 70 = 7.0). Omit to read current value.
  description: "Set or read master fader level."

- id: master_fader_mute
  label: Master Fader Mute
  kind: action
  command: "@MUTED {value}\r"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "1 to mute, 0 to unmute. Omit to read current value."
  description: "Mute or unmute AP20 output."

- id: monitor_level
  label: Monitor Level
  kind: action
  command: "@MONITORLEVEL {value}\r"
  params:
    - name: value
      type: integer
      description: Monitor level 0 (min) to 100 (max). Omit to read current value.
  description: "Set or read monitor level."

- id: monitor_mute
  label: Monitor Mute
  kind: action
  command: "@MONITORMUTE {value}\r"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0 to unmute, 1 to mute. Omit to read current value."
  description: "Mute or unmute monitor output."
```

## Feedbacks
```yaml
- id: system_version
  type: string
  description: "Software version returned by SYSTEM query (VER line)."

- id: system_version_date
  type: string
  description: "Software version date returned by SYSTEM query (VERDATE line)."

- id: system_mac
  type: string
  description: "MAC address returned by SYSTEM query (MAC line)."

- id: identify_model
  type: string
  enum: [AP20, AP25]
  description: "Model identifier from IDENTIFY response."

- id: identify_ip
  type: string
  description: "IP address from IDENTIFY response."

- id: identify_circuit
  type: string
  description: "Circuit info from IDENTIFY response."

- id: identify_theater
  type: string
  description: "Theater info from IDENTIFY response."

- id: identify_screen
  type: string
  description: "Screen info from IDENTIFY response."

- id: health_temperature
  type: string
  description: "Comma-separated t1,t2,t3 Celsius from HEALTH TEMPERATURE."

- id: master_fader_level
  type: integer
  description: "Current master fader level in tenths."

- id: master_fader_mute_state
  type: integer
  enum: [0, 1]
  description: "Current mute state (1=muted, 0=unmuted)."

- id: monitor_level
  type: integer
  description: "Current monitor level (0-100)."

- id: monitor_mute_state
  type: integer
  enum: [0, 1]
  description: "Current monitor mute state."

- id: auth_status
  type: string
  enum: [SETUP, OP, SECERR]
  description: "Returned by AUTH command; SETUP/OP if authorized, SECERR on failure."

- id: secerr
  type: string
  enum: [SECERR]
  description: "Returned when password-protected command is sent without prior successful AUTH."
```

## Variables
```yaml
# UNRESOLVED: source documents all settable parameters as discrete commands (FADER, MUTED, MONITORLEVEL, MONITORMUTE, FORMAT); no separate continuous-variable section. Section retained for structural completeness.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism documented in source.
```

## Macros
```yaml
- id: run_macro
  description: "User-defined macros stored on the AP20 can be invoked via @RUNMACRO {name}. The macro definitions themselves are not part of this spec; only the trigger command is."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source.
```

## Notes
All commands are ASCII text prefixed with `@` and terminated by `<CR>` (0x0D). For TCP connections, the client connects to the AP20 IP at port 14500 and may send `AUTH` followed by the password before issuing restricted commands. Authorization is valid only for the duration of the TCP connection; re-authenticate per connection. For serial control, the baud rate is user-configurable via the on-device menu (System > Automation > Serial); the source does not state a default baud rate. Source document explicitly states "Serial Command Mode" must be set to AP20 in the same menu.

The source document is shared between AP20 and AP25 models. The input names the AP20 specifically, but many commands apply identically to the AP25.

<!-- UNRESOLVED: baud rate, data bits, parity, stop bits, flow control not stated in source. Firmware version compatibility not stated. Power on/off commands not present in source. Input routing commands not present in source. -->

## Provenance

```yaml
source_domains:
  - datasatdigital.com
source_urls:
  - https://www.datasatdigital.com/download/55/ap25/2762/tn-h413_rev-d_ap20-ap25-remote-command-api.pdf
retrieved_at: 2026-04-30T04:35:03.888Z
last_checked_at: 2026-06-02T03:24:37.479Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T03:24:37.479Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions match source commands with correct wire-level tokens and parameters; transport values verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "this spec covers both AP20 and AP25; the model list above names only AP20 per device-name input."
- "baud rate user-configurable via System > Automation > Serial menu; no default value stated in source"
- "not stated in source"
- "no explicit power command in source; trait not strongly supported"
- "no input routing commands in source"
- "powerable trait removed pending source evidence; routable trait removed pending source evidence."
- "source documents all settable parameters as discrete commands (FADER, MUTED, MONITORLEVEL, MONITORMUTE, FORMAT); no separate continuous-variable section. Section retained for structural completeness."
- "no unsolicited notification mechanism documented in source."
- "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
- "baud rate, data bits, parity, stop bits, flow control not stated in source. Firmware version compatibility not stated. Power on/off commands not present in source. Input routing commands not present in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
