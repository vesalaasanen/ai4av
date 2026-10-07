---
spec_id: admin/epson-eb-u50-cb-x50
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson EB-U50 / CB-X50 Control Spec"
manufacturer: Epson
model_family: EB-U50
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - EB-U50
    - CB-X50
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T16:03:22.963Z
last_checked_at: 2026-10-01T13:06:09.221Z
generated_at: 2026-10-01T13:06:09.221Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document covers older Epson home projectors (TW/EMP/PL series). EB-U50 / CB-X50 are not enumerated in section 3 (Applicable models). Spec produced from ESC/VP21 protocol guide; per-model applicability unverified."
  - "USB listed as transport option in source intro, no EB-U50/CB-X50 specific USB command protocol documented"
  - "TCP port number not stated in source (referenced as ESC/VP.net protocol manual, not provided)"
  - "TCP/IP port number not stated; source refers to separate ESC/VP.net protocol manual. USB transport described at protocol-family level only."
  - "Set/get formats described generically (§2.1, §2.2) but no get-query commands enumerated by mnemonic in source. No query actions enumerated. EB-U50 / CB-X50 specific command subset not enumerated in source."
  - "no settable numeric parameters documented in source beyond"
  - "no unsolicited notification events documented in source."
  - "not stated; inferred from operational caution - projector cuts video output"
  - "no explicit safety warnings or interlock procedures in source."
verification:
  verdict: verified
  checked_at: 2026-10-01T13:06:09.221Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions match source ESC/VP24 command table literally; transport params match §5.1; applicability caveat for EB-U50/CB-X50 noted (not in §3 Applicable models). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson EB-U50 / CB-X50 Control Spec

## Summary
Control spec for Epson EB-U50 and CB-X50 projectors using the ESC/VP21 command set over RS-232 (with TCP/IP and USB transport also described in the protocol family). The source document is the generic ESC/VP21 Command User's Guide for Epson home projectors and does not list EB-U50 or CB-X50 in its "Applicable models" section; commands here are documented from the protocol guide and marked as inferred where the EB-U50 / CB-X50 applicability is not confirmed.

<!-- UNRESOLVED: source document covers older Epson home projectors (TW/EMP/PL series). EB-U50 / CB-X50 are not enumerated in section 3 (Applicable models). Spec produced from ESC/VP21 protocol guide; per-model applicability unverified. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - usb  # UNRESOLVED: USB listed as transport option in source intro, no EB-U50/CB-X50 specific USB command protocol documented
serial:
  baud_rate: 9600  # stated in §5.1 Communication specification
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: D-Sub 9-pin
  port_label: Control (RS-232C)
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source (referenced as ESC/VP.net protocol manual, not provided)
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no login/password/auth procedure documented in source)
```

<!-- UNRESOLVED: TCP/IP port number not stated; source refers to separate ESC/VP.net protocol manual. USB transport described at protocol-family level only. -->

## Traits
```yaml
- powerable  # inferred from PWR ON / PWR OFF command examples
- routable  # inferred from SOURCE change command set
- queryable  # inferred from get command format (command + "?") described in §2.2
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PWR ON"
  params: []
  notes: "Per source note (*1), some models (TW200/TW200H, TW500) require additional steps before PWR ON works. EB-U50 / CB-X50 applicability unverified."

- id: power_off
  label: Power Off
  kind: action
  command: "PWR OFF"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "MUTE ON"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF"
  params: []

- id: msel_black
  label: MSEL Black
  kind: action
  command: "MSEL00"
  params: []

- id: msel_blue
  label: MSEL Blue
  kind: action
  command: "MSEL01"
  params: []

- id: msel_user_logo
  label: MSEL User Logo
  kind: action
  command: "MSEL02"
  params: []
  notes: "Per source note (*2), TW10/TW10H do not support User Logo."

- id: source_1x_cycle
  label: Source Change Input 1/A - Cycle
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_11
  label: Source Change Input 1/A - AnalogRGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_12
  label: Source Change Input 1/A - Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_13
  label: Source Change Input 1/A - RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_14
  label: Source Change Input 1/A - YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_15
  label: Source Change Input 1/A - YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_1f
  label: Source Change Input 1/A - Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_2x_cycle
  label: Source Change Input 2/B - Cycle
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_21
  label: Source Change Input 2/B - AnalogRGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_22
  label: Source Change Input 2/B - RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_23
  label: Source Change Input 2/B - YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_24
  label: Source Change Input 2/B - YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_25
  label: Source Change Input 2/B - YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_2f
  label: Source Change Input 2/B - Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_3x_cycle
  label: Source Change Input 3 - Cycle
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_31
  label: Source Change Input 3 - Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_cx_cycle
  label: Source Change Input 5 - Cycle
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_c3
  label: Source Change Input 5 - SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_c4
  label: Source Change Input 5 - YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_c5
  label: Source Change Input 5 - YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_cf
  label: Source Change Input 5 - Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_4x_cycle
  label: Source Change VIDEO - Cycle
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_41
  label: Source Change VIDEO (RCA)
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_42
  label: Source Change VIDEO (S)
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_43
  label: Source Change VIDEO (YCbCr)
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_44
  label: Source Change VIDEO (YPbPr)
  kind: action
  command: "SOURCE 44"
  params: []

- id: source_52
  label: Source Change USB - EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

- id: source_a0
  label: Source Change HDMI - HDMI2
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_a1
  label: Source Change HDMI - Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_a3
  label: Source Change HDMI - RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_a4
  label: Source Change HDMI - YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_a5
  label: Source Change HDMI - YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_d0
  label: Source Change WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_d1
  label: Source Change WirelessHD - Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_d3
  label: Source Change WirelessHD - RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_d4
  label: Source Change WirelessHD - YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_d5
  label: Source Change WirelessHD - YPbPr
  kind: action
  command: "SOURCE D5"
  params: []

- id: null_command
  label: Null Command (keepalive)
  kind: action
  command: "\r"  # Hex 0D carriage return, per §2.3
  params: []
  notes: "Used to confirm projector is in operation."
```

<!-- UNRESOLVED: Set/get formats described generically (§2.1, §2.2) but no get-query commands enumerated by mnemonic in source. No query actions enumerated. EB-U50 / CB-X50 specific command subset not enumerated in source. -->

## Feedbacks
```yaml
# Per §2.1: projector returns a colon ":" after executing a command (success acknowledgement).
# Per §2.4: projector returns "ERR\r:" on invalid commands.
- id: command_ack
  type: enum
  values: [colon, err]
  notes: |
    Success response: ":" (colon character).
    Error response: "ERR" followed by carriage return (Hex 0D) and colon.
```

## Variables
```yaml
# UNRESOLVED: no settable numeric parameters documented in source beyond
# command opcodes themselves. INC / DEC / INIT step parameters mentioned in §2.1
# but no concrete command families enumerated.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source.
```

## Macros
```yaml
# Per source note (*1), a two-step macro is required for PWR ON on TW200/TW200H
# (SPWRLVL 01 preparatory command). EB-U50 / CB-X50 applicability unverified.
- id: power_on_tw200_macro
  label: Power On (TW200/TW200H preparatory sequence)
  steps:
    - "Turn on projector manually."
    - "Wait until projector can receive ESC/VP21 commands."
    - "Send: SPWRLVL 01"
    - "Turn off projector once."
    - "PWR ON now works from standby."
  notes: "Source explicitly applies to TW200/TW200H. EB-U50 / CB-X50 applicability unverified."
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # UNRESOLVED: not stated; inferred from operational caution - projector cuts video output
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
```

## Notes
- Source is the generic ESC/VP21 Command User's Guide for Epson home projectors (§3 Applicable models). EB-U50 and CB-X50 are NOT enumerated in the applicable models list; spec produced from protocol-family documentation. Per-model applicability of every command listed here is unverified for EB-U50 / CB-X50.
- ESC/VP21 transport (§1): serial, USB, or TCP/IP. Only serial parameters (9600/8/N/1, D-Sub 9-pin Control) are stated in source (§5.1).
- TCP/IP transport described at protocol-family level; port number not stated in source — see separate ESC/VP.net protocol manual (not provided).
- Command set returned ":" on success and "ERR\r:" on invalid commands (§2.1, §2.4).
- Null command (Hex 0D carriage return) used as keepalive; projector responds with ":" (§2.3).
- Set commands support fixed parameters (ON/OFF/21) and step parameters (INC/DEC/INIT) per §2.1; no concrete step-parameter commands enumerated in source.
- Get command format described as `COMMAND?` per §2.2; no concrete get-query mnemonics enumerated in source.

<!-- UNRESOLVED: -->
<!-- - EB-U50 / CB-X50 applicability of every action not confirmed (source covers older TW/EMP/PL/HC/PC series). -->
<!-- - TCP/IP port number — source refers to ESC/VP.net manual, not provided. -->
<!-- - USB transport — protocol-family mention only, no EB-U50/CB-X50 specific USB command protocol. -->
<!-- - Get/query command mnemonics — format described (§2.2) but no specific PW? / SOURCE? / MUTE? style queries enumerated. -->
<!-- - Firmware version compatibility — not stated. -->
<!-- - Voltage / current / power specs — not stated (Tier 3, never inferred). -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T16:03:22.963Z
last_checked_at: 2026-10-01T13:06:09.221Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T13:06:09.221Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions match source ESC/VP24 command table literally; transport params match §5.1; applicability caveat for EB-U50/CB-X50 noted (not in §3 Applicable models). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document covers older Epson home projectors (TW/EMP/PL series). EB-U50 / CB-X50 are not enumerated in section 3 (Applicable models). Spec produced from ESC/VP21 protocol guide; per-model applicability unverified."
- "USB listed as transport option in source intro, no EB-U50/CB-X50 specific USB command protocol documented"
- "TCP port number not stated in source (referenced as ESC/VP.net protocol manual, not provided)"
- "TCP/IP port number not stated; source refers to separate ESC/VP.net protocol manual. USB transport described at protocol-family level only."
- "Set/get formats described generically (§2.1, §2.2) but no get-query commands enumerated by mnemonic in source. No query actions enumerated. EB-U50 / CB-X50 specific command subset not enumerated in source."
- "no settable numeric parameters documented in source beyond"
- "no unsolicited notification events documented in source."
- "not stated; inferred from operational caution - projector cuts video output"
- "no explicit safety warnings or interlock procedures in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
