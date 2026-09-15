---
spec_id: admin/epson-eh-ls-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson EH-LS Series Control Spec"
manufacturer: Epson
model_family: "EH-LS Series"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "EH-LS Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T20:02:51.250Z
last_checked_at: 2026-09-10T22:16:20.360Z
generated_at: 2026-09-10T22:16:20.360Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic ESC/VP21 guide covering many Epson projector models. EH-LS Series-specific behavior, firmware, and supported SOURCE commands not stated in source."
  - "TCP port number not stated in source (source refers to ESC/VP.net manual)"
  - "no discrete settable parameters (beyond the parameterized commands above) stated in source."
  - "no unsolicited notifications described in source."
  - "no safety warnings, interlocks, or power-on sequencing requirements stated in source beyond"
verification:
  verdict: verified
  checked_at: 2026-09-10T22:16:20.360Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec literals appear verbatim in source §4 tables and §2 command format spec; transport values match §5.1. EH-LS Series not enumerated in §3, noted by spec itself. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson EH-LS Series Control Spec

## Summary
Control spec for Epson EH-LS Series home projectors using the ESC/VP21 ASCII command protocol. Commands can be carried over serial (RS-232C) or TCP/IP. This document is based on the generic ESC/VP21 Command User's Guide; specific EH-LS Series model identifiers were not located in the source.

<!-- UNRESOLVED: source is the generic ESC/VP21 guide covering many Epson projector models. EH-LS Series-specific behavior, firmware, and supported SOURCE commands not stated in source. -->

## Transport
```yaml
# Source describes ESC/VP21 as protocol-independent: "Serial, USB or TCP/IP network can be used".
# Known protocol input: TCP/IP. Serial also documented in Appendix.
protocols:
  - tcp
  - serial
addressing:
  # UNRESOLVED: TCP port number not stated in source (source refers to ESC/VP.net manual)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable (PWR ON / PWR OFF / MUTE ON / MUTE OFF present)
# - routable (SOURCE xx commands present)
# - queryable (Set/Get command format with ? suffix; SOURCE commands have Get variants)
powerable: true  # inferred from PWR ON/OFF command examples
routable: true   # inferred from SOURCE command examples
queryable: true  # inferred from Get command format ("command + ?")
```

## Actions
```yaml
# ESC/VP21 Set command format: <COMMAND> <PARAM> CR  (Hex 0D terminator)
# Get command format:    <COMMAND>? CR
# Projector replies with ":" after executing; "ERR" + CR + ":" for illegal commands.
- id: power_on
  label: Power On
  kind: action
  command: "PWR ON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PWR OFF"
  params: []

- id: mute_on
  label: Mute On (A/V Mute)
  kind: action
  command: "MUTE ON"
  params: []

- id: mute_off
  label: Mute Off (A/V Mute)
  kind: action
  command: "MUTE OFF"
  params: []

- id: msel_black
  label: MSEL Black (test pattern)
  kind: action
  command: "MSEL00"
  params: []

- id: msel_blue
  label: MSEL Blue (test pattern)
  kind: action
  command: "MSEL01"
  params: []

- id: msel_user_logo
  label: MSEL User Logo (test pattern)
  kind: action
  command: "MSEL02"
  params: []

# SOURCE commands - each row in the source table is a separate action.
- id: source_10
  label: Source change - INPUT 1/A cyclic (SOURCE 1x)
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_11
  label: Source change - INPUT 1/A Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_12
  label: Source change - INPUT 1/A Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_13
  label: Source change - INPUT 1/A RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_14
  label: Source change - INPUT 1/A YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_15
  label: Source change - INPUT 1/A YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_1f
  label: Source change - INPUT 1/A Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_20
  label: Source change - INPUT 2/B cyclic (SOURCE 2x)
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_21
  label: Source change - INPUT 2/B Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_22
  label: Source change - INPUT 2/B RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_23
  label: Source change - INPUT 2/B YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_24
  label: Source change - INPUT 2/B YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_25
  label: Source change - INPUT 2/B YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_2f
  label: Source change - INPUT 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_30
  label: Source change - INPUT 3 cyclic (SOURCE 3x)
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_31
  label: Source change - INPUT 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_33
  label: Source change - INPUT 3 RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: source_34
  label: Source change - INPUT 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_35
  label: Source change - INPUT 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

- id: source_40
  label: Source change - VIDEO cyclic (SOURCE 4x)
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_41
  label: Source change - VIDEO (RCA)
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_42
  label: Source change - VIDEO (S-Video)
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_43
  label: Source change - VIDEO (YCbCr)
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_44
  label: Source change - VIDEO (YPbPr)
  kind: action
  command: "SOURCE 44"
  params: []

- id: source_52
  label: Source change - USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

- id: source_a0
  label: Source change - HDMI / HDMI2
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_a1
  label: Source change - HDMI Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_a3
  label: Source change - HDMI RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_a4
  label: Source change - HDMI YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_a5
  label: Source change - HDMI YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_c0
  label: Source change - INPUT 5 cyclic (SOURCE Cx)
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_c3
  label: Source change - INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_c4
  label: Source change - INPUT 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_c5
  label: Source change - INPUT 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_cf
  label: Source change - INPUT 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_d0
  label: Source change - HDMI WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_d1
  label: Source change - HDMI WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_d3
  label: Source change - HDMI WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_d4
  label: Source change - HDMI WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_d5
  label: Source change - HDMI WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []

- id: null_command
  label: Null command (liveness check)
  kind: action
  command: ""  # CR (Hex 0D) only; projector replies with ":"
  params: []

# Get (query) variants for SOURCE commands - per source "*7) This command is can be used only for get."
- id: source_query
  label: Query current SOURCE
  kind: query
  command: "SOURCE?"
  params: []

- id: power_query
  label: Query Power state
  kind: query
  command: "PWR?"
  params: []
```

## Feedbacks
```yaml
# ESC/VP21 reply conventions from source §2.1, §2.2, §2.3, §2.4.
- id: ack
  type: enum
  values: [":"]  # colon returned after successful command execution
  description: "Projector returns a colon after executing a valid command."

- id: error
  type: enum
  values: ["ERR"]
  description: "Projector returns 'ERR' + CR (Hex 0D) + ':' for illegal/invalid commands."
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters (beyond the parameterized commands above) stated in source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source.
```

## Macros
```yaml
# TW200/TW200H PWR ON prep sequence - explicitly documented in source *1.
- id: tw200_pwron_prep
  label: TW200/TW200H PWR ON preparation sequence
  steps:
    - "Turn projector on manually."
    - "Wait until projector can receive ESC/VP21 commands."
    - "Send 'SPWRLVL 01' to the projector."
    - "Turn the projector off once; allow it to reach standby state."
    - "'PWR ON' will then function."

# TW500 PWR ON prep - explicitly documented in source *1.
- id: tw500_pwron_prep
  label: TW500 PWR ON preparation sequence
  steps:
    - "Set 'Network Monitoring' of 'Operation' in 'Setting' menu to ON."
    - "Turn the projector off once; allow it to reach standby state."
    - "'PWR ON' will then function."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements stated in source beyond
# the TW200/TW200H/TW500 PWR ON prep sequences (captured as Macros).
```

## Notes
ESC/VP21 is protocol-independent: serial, USB, or TCP/IP can all carry the same ASCII commands (source §1). For TCP/IP details (port, framing) the source explicitly defers to a separate "ESC/VP.net protocol manual" — that document was not provided, so the TCP `addressing.port` is left unresolved. Serial parameters (9600/8/N/1, no flow control, D-Sub 9-pin) are stated in §5.1.

This source covers many Epson projector model families. The EH-LS Series is not explicitly enumerated in the provided document; commands here reflect the generic ESC/VP21 catalog and may or may not be supported by EH-LS Series hardware. Per-model support varies across SOURCE mnemonics — see source tables for the per-model OK matrix.

Commands are ASCII strings terminated by CR (Hex 0D). Set commands take a fixed parameter (ON/OFF/numeric) or a step parameter (INC/DEC/INIT). Get commands append `?` and return the current value followed by CR + `:`.

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T20:02:51.250Z
last_checked_at: 2026-09-10T22:16:20.360Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-10T22:16:20.360Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec literals appear verbatim in source §4 tables and §2 command format spec; transport values match §5.1. EH-LS Series not enumerated in §3, noted by spec itself. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic ESC/VP21 guide covering many Epson projector models. EH-LS Series-specific behavior, firmware, and supported SOURCE commands not stated in source."
- "TCP port number not stated in source (source refers to ESC/VP.net manual)"
- "no discrete settable parameters (beyond the parameterized commands above) stated in source."
- "no unsolicited notifications described in source."
- "no safety warnings, interlocks, or power-on sequencing requirements stated in source beyond"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
