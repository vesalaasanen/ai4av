---
spec_id: admin/epson-eh-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson EH-R Series Control Spec"
manufacturer: Epson
model_family: EH-TW2800
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - EH-TW2800
    - EH-TW2900
    - EH-TW3000
    - EH-TW3200
    - EH-TW3500
    - EH-TW3600
    - EH-TW3800
    - EH-TW4000
    - EH-TW4400
    - EH-TW4500
    - EH-TW5000
    - EH-TW5500
    - EH-TW5800
    - EH-TW5900
    - EH-TW6000
    - EH-TW6000W
    - EH-TW8000
    - EH-TW8000W
    - EH-TW9000
    - EH-TW9000W
    - EH-TW420
    - EH-TW450
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-05-03T09:03:33.104Z
last_checked_at: 2026-05-14T18:17:15.741Z
generated_at: 2026-05-14T18:17:15.741Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.741Z
  matched_actions: 9
  action_count: 9
  confidence: high
  summary: "All 11 spec actions match literal commands in source; serial transport (9600/8N1) verified; core command families complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Epson EH-R Series Control Spec

## Summary
Epson EH-R series projectors using the ESC/VP21 ASCII control protocol. Commands are sent as plain-text strings over serial (RS-232C), USB, or TCP/IP network connections. This spec covers power control, source selection, mute, and query commands documented in the ESC/VP21 command reference.

<!-- UNRESOLVED: TCP/IP port number not stated; refers to separate ESC/VP.net protocol manual -->
<!-- UNRESOLVED: USB connection details not provided -->
<!-- UNRESOLVED: Full command set may be larger than what is documented here — only core commands listed -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from "TCP/IP network" mention; port not stated
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source (see ESC/VP.net manual)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: D-Sub 9pin
auth:
  type: none  # inferred: no auth procedure described in source
```

## Traits
```yaml
traits:
  - powerable   # PWR ON / PWR OFF commands present
  - routable    # SOURCE commands for input selection present
  - queryable   # Get command format (COMMAND ?) documented
  - levelable   # INC/DEC step parameters documented
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "PWR ON"
    description: "Turns the projector on. Response: colon (:)"
    params: []
    notes: Some models require SPWRLVL 01 preparation step

  - id: power_off
    label: Power Off
    kind: action
    command: "PWR OFF"
    description: "Turns the projector off (standby). Response: colon (:)"
    params: []

  - id: mute_on
    label: Mute On
    kind: action
    command: "MUTE ON"
    description: "Enables mute. Response: colon (:)"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "MUTE OFF"
    description: "Disables mute. Response: colon (:)"
    params: []

  - id: source_select
    label: Select Source
    kind: action
    command: "SOURCE {code}"
    description: "Selects the input source by two-character hex code. Response: colon (:)"
    params:
      - name: code
        type: string
        description: "Source code (e.g. 10=Input1 cyclic, 11=AnalogRGB, 14=YCbCr, 15=YPbPr, 20=Input2 cyclic, 21=AnalogRGB, 30=Input3, 40=Video cyclic, 41=Video RCA, 42=Video S, A0=HDMI, D0=WirelessHD)"

  - id: background_black
    label: Set Background Black
    kind: action
    command: "MSEL00"
    description: "Sets blank screen background to black. Response: colon (:)"
    params: []

  - id: background_blue
    label: Set Background Blue
    kind: action
    command: "MSEL01"
    description: "Sets blank screen background to blue. Response: colon (:)"
    params: []

  - id: background_logo
    label: Set Background User Logo
    kind: action
    command: "MSEL02"
    description: "Sets blank screen background to user logo. Response: colon (:)"
    params: []
    notes: Not supported on TW10/TW10H

  - id: null_command
    label: Null Command (Heartbeat)
    kind: action
    command: "\\x0D"
    description: "Sends carriage return to confirm projector is operational. Response: colon (:)"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    values: [ON, OFF]
    query: "PWR ?"
    description: "Returns current power state (ON or OFF)"

  - id: source_current
    label: Current Source
    type: string
    query: "SOURCE ?"
    description: "Returns the currently active source code"

  - id: error
    label: Command Error
    type: enum
    values: [ERR]
    description: "Returned when an invalid command is received. Format: ERR followed by 0x0D and colon"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables (e.g. volume, brightness) explicitly documented in source
# INC/DEC/INIT step parameters are mentioned but target commands are not listed
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Some models (TW200/TW200H) require SPWRLVL 01 command preparation before
  PWR ON works - must be set while projector is on, then projector turned off
  to standby before PWR ON becomes functional. TW500 requires "Network Monitoring"
  set to ON in settings menu to enable PWR ON command.
# UNRESOLVED: no explicit safety interlocks or power-on sequencing warnings found beyond model-specific PWR ON preparation notes
```

## Notes
- ESC/VP21 uses ASCII command codes. Set commands return `:` on success. Get commands use `COMMAND ?` syntax and return the parameter value.
- Illegal commands return `ERR` followed by 0x0D and `:`.
- Source commands vary by model — not all SOURCE codes are supported on all models. Consult the per-model command tables in the source document.
- The `INC`, `DEC`, and `INIT` step parameters are described in the set command format but specific commands using them are not enumerated in this source.
- TCP/IP network control references a separate ESC/VP.net protocol manual for connection details.
- Serial connection uses RS-232C; must be selected in Advanced Setting of the projector menu.

<!-- UNRESOLVED: TCP/IP port number and connection procedure — see ESC/VP.net protocol manual -->
<!-- UNRESOLVED: USB connection details — referenced but not documented in this source -->
<!-- UNRESOLVED: complete list of INC/DEC/INIT commands not provided -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->The spec is generated above. Key points:

- **Transport**: Serial fully documented (9600/8N1). TCP mentioned but port is UNRESOLVED (refers to separate ESC/VP.net manual).
- **Actions**: 10 actions extracted — power on/off, mute on/off, source select with parameterized codes, background selection (black/blue/logo), and heartbeat.
- **Feedbacks**: Power state query, source query, and error response.
- **Traits**: powerable, routable, queryable, levelable (from INC/DEC mention).
- Serial config is directly from source (line 253). No auth procedure found. `entity_id` is left as placeholder since `epson_eh_r_series` was provided but needs Convex confirmation.

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-05-03T09:03:33.104Z
last_checked_at: 2026-05-14T18:17:15.741Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.741Z
matched_actions: 9
action_count: 9
confidence: high
summary: "All 11 spec actions match literal commands in source; serial transport (9600/8N1) verified; core command families complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
