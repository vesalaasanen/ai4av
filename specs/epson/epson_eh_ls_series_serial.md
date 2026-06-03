---
spec_id: admin/epson-eh-ls-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson EH-LS Series Control Spec"
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
    - EH-TW420
    - EH-TW450
    - EH-TW5900
    - EH-TW6000
    - EH-TW6000W
    - EH-TW8000
    - EH-TW8000W
    - EH-TW9000
    - EH-TW9000W
    - PL-HomeCinema400
    - PL-HomeCinema700
    - PL-HomeCinema720
    - PL-HomeCinema1080
    - PL-HomeCinema1080UB
    - PL-HomeCinema705HD
    - PL-HomeCinema6100
    - PL-HomeCinema6500UB
    - PL-HomeCinema8100
    - PL-HomeCinema8345
    - PL-HomeCinema8350
    - PL-HomeCinema8500UB
    - PL-ProCinema800
    - PL-ProCinema810
    - PL-ProCinema1080
    - PL-ProCinema1080UB
    - PL-ProCinema7100
    - PL-ProCinema7500UB
    - PL-ProCinema9100
    - PL-ProCinema9350
    - PL-ProCinema9500UB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-04-29T13:19:27.152Z
last_checked_at: 2026-06-03T06:52:13.920Z
generated_at: 2026-06-03T06:52:13.920Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EH-LS series models are not explicitly listed in the applicable models table; the source lists EH-TW and PL-HomeCinema/ProCinema models. EH-LS compatibility is assumed based on shared ESC/VP21 protocol."
  - "TCP/IP network connection is mentioned but details are deferred to the ESC/VP.net protocol manual, which was not provided."
  - "TCP port not stated in source (referred to ESC/VP.net manual)"
  - "no settable continuous variables (e.g. volume, brightness) documented in source"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "no explicit safety interlocks documented in source"
  - "TCP/IP addressing, port, and session protocol not documented in this source"
  - "USB connection details not documented in this source"
  - "full list of get-command query parameters not exhaustively listed in source"
  - "INC/DEC/INIT applicable commands not specified in source"
  - "power state warmup/standby values inferred from typical projector behavior, not explicitly listed in this source"
verification:
  verdict: verified
  checked_at: 2026-06-03T06:52:13.920Z
  matched_actions: 8
  action_count: 8
  confidence: medium
  summary: "All actions and transport verified (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Epson EH-LS Series Control Spec

## Summary
ESC/VP21 control protocol for Epson home projectors. Commands are ASCII-based and transmitted over RS-232C serial, USB, or TCP/IP network. This spec covers power, mute, and source selection commands documented in the ESC/VP21 Command User's Guide for Home Projectors.

<!-- UNRESOLVED: EH-LS series models are not explicitly listed in the applicable models table; the source lists EH-TW and PL-HomeCinema/ProCinema models. EH-LS compatibility is assumed based on shared ESC/VP21 protocol. -->
<!-- UNRESOLVED: TCP/IP network connection is mentioned but details are deferred to the ESC/VP.net protocol manual, which was not provided. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from "TCP/IP network" mention; details in ESC/VP.net manual
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source (referred to ESC/VP.net manual)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: D-Sub 9pin
auth:
  type: none  # inferred: no auth procedure mentioned in source
```

## Traits
```yaml
- powerable   # PWR ON / PWR OFF commands present
- routable    # SOURCE selection commands present
- queryable   # Get command format (command + "?") present
- muteable    # MUTE ON / MUTE OFF commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PWR ON"
  params: []
  response: ":"

- id: power_off
  label: Power Off
  kind: action
  command: "PWR OFF"
  params: []
  response: ":"

- id: mute_on
  label: Mute On
  kind: action
  command: "MUTE ON"
  params: []
  response: ":"

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF"
  params: []
  response: ":"

- id: source_select
  label: Select Source
  kind: action
  command: "SOURCE {code}"
  params:
    - name: code
      type: string
      description: "Source code (e.g. 10=cyclic INPUT1, 11=AnalogRGB, 14=YCbCr, 15=YPbPr, 1F=Auto, 20=cyclic INPUT2, 21=AnalogRGB INPUT2, 30=cyclic INPUT3, 31=DigitalRGB INPUT3, 40=cyclic VIDEO, 41=VideoRCA, 42=VideoS, A0=HDMI2, D0=WirelessHD)"
  response: ":"

- id: mute_screen_black
  label: Mute Screen Black
  kind: action
  command: "MSEL00"
  params: []
  response: ":"

- id: mute_screen_blue
  label: Mute Screen Blue
  kind: action
  command: "MSEL01"
  params: []
  response: ":"

- id: mute_screen_user_logo
  label: Mute Screen User Logo
  kind: action
  command: "MSEL02"
  params: []
  response: ":"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  query: "PWR ?"
  values:
    - "ON"
    - "OFF"
    - "STANDBY"
    - "WARMUP"

- id: source_current
  label: Current Source
  type: string
  query: "SOURCE ?"

- id: mute_state
  label: Mute State
  type: enum
  query: "MUTE ?"
  values:
    - "ON"
    - "OFF"

- id: error
  label: Command Error
  type: string
  response: "ERR"
  description: "Returned when an invalid command is received"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables (e.g. volume, brightness) documented in source
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
confirmation_required_for: []
interlocks: []
notes: >
  Some models (TW200, TW200H) require a one-time "SPWRLVL 01" command before
  PWR ON works. TW500 requires "Network Monitoring" set to ON in the Settings
  menu before PWR ON works. After configuration, projector must be turned off
  once and reach standby state before PWR ON becomes operational.
# UNRESOLVED: no explicit safety interlocks documented in source
```

## Notes
- Commands are ASCII-based and use the ESC/VP21 protocol.
- A null command (CR / Hex 0D) can be sent to confirm the projector is responsive; it returns a colon.
- Invalid commands return "ERR" followed by CR and a colon.
- Set commands return ":" on success. Get commands (appending "?") return the parameter value.
- Increment (INC), decrement (DEC), and initialize (INIT) step parameters are supported for applicable commands.
- Source selection commands vary significantly by model; not all SOURCE codes are valid for all models.
- TCP/IP network control is mentioned but details are in the separate ESC/VP.net protocol manual (not provided).

<!-- UNRESOLVED: TCP/IP addressing, port, and session protocol not documented in this source -->
<!-- UNRESOLVED: USB connection details not documented in this source -->
<!-- UNRESOLVED: full list of get-command query parameters not exhaustively listed in source -->
<!-- UNRESOLVED: INC/DEC/INIT applicable commands not specified in source -->
<!-- UNRESOLVED: power state warmup/standby values inferred from typical projector behavior, not explicitly listed in this source -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-04-29T13:19:27.152Z
last_checked_at: 2026-06-03T06:52:13.920Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T06:52:13.920Z
matched_actions: 8
action_count: 8
confidence: medium
summary: "All actions and transport verified (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EH-LS series models are not explicitly listed in the applicable models table; the source lists EH-TW and PL-HomeCinema/ProCinema models. EH-LS compatibility is assumed based on shared ESC/VP21 protocol."
- "TCP/IP network connection is mentioned but details are deferred to the ESC/VP.net protocol manual, which was not provided."
- "TCP port not stated in source (referred to ESC/VP.net manual)"
- "no settable continuous variables (e.g. volume, brightness) documented in source"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "no explicit safety interlocks documented in source"
- "TCP/IP addressing, port, and session protocol not documented in this source"
- "USB connection details not documented in this source"
- "full list of get-command query parameters not exhaustively listed in source"
- "INC/DEC/INIT applicable commands not specified in source"
- "power state warmup/standby values inferred from typical projector behavior, not explicitly listed in this source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
