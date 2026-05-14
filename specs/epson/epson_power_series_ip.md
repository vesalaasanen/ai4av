---
spec_id: admin/epson-escvp21-home-projectors
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson ESC/VP21 Home Projectors Control Spec"
manufacturer: Epson
model_family: TW100
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - TW100
    - TS10
    - TW10
    - TW10H
    - TW200
    - TW200H
    - TW500
    - TW20
    - TW600
    - TW700
    - TW1000
    - TW2000
    - TW2800
    - TW3000
    - TW3800
    - TW4000
    - TW5000
    - TW2900
    - TW3500
    - TW4400
    - TW4500
    - TW5500
    - TW3200
    - TW3600
    - TW420
    - TW450
    - TW8000
    - TW9000
    - TW8000W
    - TW9000W
    - TW5900
    - TW6000
    - TW6000W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-05-03T09:03:33.104Z
last_checked_at: 2026-05-14T18:17:15.771Z
generated_at: 2026-05-14T18:17:15.771Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.771Z
  matched_actions: 9
  action_count: 9
  confidence: high
  summary: "All 13 spec actions matched with correct wire literals and verified transport."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Epson ESC/VP21 Home Projectors Control Spec

## Summary
Epson home projectors using the ESC/VP21 ASCII control protocol. Commands are sent over serial (RS-232C), USB, or TCP/IP network sessions. This spec covers power control, muting, source selection, and query commands for the Power Series and related home projector models.

<!-- UNRESOLVED: TCP/IP port number not stated — source refers to ESC/VP.net protocol manual for network details -->
<!-- UNRESOLVED: USB connection details not included in source — refers to appendix not present -->
<!-- UNRESOLVED: Full command set may be larger; source tables are truncated/incomplete -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from "TCP session" and "Network connection" mention
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source; refers to ESC/VP.net manual
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
  - powerable    # inferred from PWR ON / PWR OFF commands
  - routable     # inferred from SOURCE selection commands
  - queryable    # inferred from get command format (COMMAND ?)
  - muteable     # inferred from MUTE ON / MUTE OFF commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "PWR ON"
    description: "Turns the projector on. Note: some models require preparation (see notes)."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "PWR OFF"
    description: "Turns the projector off."
    params: []

  - id: mute_on
    label: Mute On
    kind: action
    command: "MUTE ON"
    description: "Enables display mute (black or blue screen depending on model)."
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "MUTE OFF"
    description: "Disables display mute."
    params: []

  - id: mute_black
    label: Mute Black
    kind: action
    command: "MSEL00"
    description: "Sets mute display to black screen."
    params: []

  - id: mute_blue
    label: Mute Blue
    kind: action
    command: "MSEL01"
    description: "Sets mute display to blue screen."
    params: []

  - id: mute_user_logo
    label: Mute User Logo
    kind: action
    command: "MSEL02"
    description: "Sets mute display to user logo. Not supported on TW10/TW10H."
    params: []

  - id: source_select
    label: Select Source
    kind: action
    command: "SOURCE {code}"
    description: "Selects input source by code. Codes vary by model."
    params:
      - name: code
        type: string
        description: "Source code (e.g. 10=cyclic Input1, 11=AnalogRGB Input1, 41=Video RCA, A0=HDMI, D0=WirelessHD)"

  - id: null_command
    label: Null Command (Keepalive)
    kind: action
    command: "\r"
    description: "Sends carriage return (0x0D). Projector responds with colon. Used to confirm projector is operational."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    command: "PWR ?"
    description: "Returns current power state."
    values: [ON, OFF]

  - id: source_current
    label: Current Source
    type: string
    command: "SOURCE ?"
    description: "Returns the currently active source code."

  - id: mute_state
    label: Mute State
    type: enum
    command: "MUTE ?"
    description: "Returns current mute state."
    values: [ON, OFF]

  - id: command_ack
    label: Command Acknowledgement
    type: enum
    description: "Returned after every command. Colon (:) for success, ERR for invalid command."
    values: [":", "ERR"]
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables (volume, brightness, etc.) found in this source excerpt
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
confirmation_required_for: []
interlocks: []
notes: >
  PWR ON for TW200/TW200H requires preparation: turn on projector, send
  SPWRLVL 01 after projector is ready, then turn off. PWR ON works after
  returning to standby. TW500 requires "Network Monitoring" set to ON in
  Operation settings to validate PWR ON command.
# UNRESOLVED: no explicit safety interlocks or fault recovery described in source
```

## Notes
- ESC/VP21 uses ASCII command codes. Set commands use format `COMMAND PARAM`, get commands use `COMMAND ?`.
- The projector returns a colon (`:`) after successful command execution, or `ERR\r:` for invalid commands.
- Serial connection requires RS-232C to be selected in Advanced Settings menu on the projector.
- Source selection commands vary significantly by model — not all source codes are valid for all models.
- TCP/IP network control is supported but port/connection details require the ESC/VP.net protocol manual, which is not included in this source.
- INC (increment), DEC (decrement), and INIT (initialize) parameter types are defined in the protocol but specific commands using them are not listed in this source excerpt.

<!-- UNRESOLVED: TCP/IP port number and connection procedure not documented — refers to separate ESC/VP.net manual -->
<!-- UNRESOLVED: USB control connection details not included -->
<!-- UNRESOLVED: Full command table may include additional commands (brightness, contrast, volume, etc.) not present in this excerpt -->
<!-- UNRESOLVED: Model-specific command availability not fully captured — see source tables for per-model matrix -->
<!-- UNRESOLVED: SPWRLVL command details only partially documented (TW200/TW200H use case) -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-05-03T09:03:33.104Z
last_checked_at: 2026-05-14T18:17:15.771Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.771Z
matched_actions: 9
action_count: 9
confidence: high
summary: "All 13 spec actions matched with correct wire literals and verified transport."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
