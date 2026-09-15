---
spec_id: admin/epson-eb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson EB Series Control Spec"
manufacturer: Epson
model_family: ELP-TW100
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - ELP-TW100
    - ELP-TW100H
    - ELP-TS10
    - EMP-TW10
    - EMP-TW10H
    - EMP-TW20
    - EMP-TW200
    - EMP-TW200H
    - EMP-TW500
    - EMP-TW520
    - EMP-TW550
    - EMP-TW600
    - EMP-TW700
    - EMP-TW800
    - EMP-TW1000
    - EMP-TW2000
    - EH-TW2800
    - EH-TW2900
    - EH-TW3000
    - EH-TW3200
    - EH-TW3500
    - EH-TW3600
    - EH-TW3800
    - EH-TW4000
    - EH-TW420
    - EH-TW4400
    - EH-TW4500
    - EH-TW450
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
    - "PowerLite Home Cinema 400"
    - "PowerLite Home Cinema 700"
    - "PowerLite Home Cinema 720"
    - "PowerLite Home Cinema 1080"
    - "PowerLite Home Cinema 1080UB"
    - "PowerLite Home Cinema 705HD"
    - "PowerLite Home Cinema 6100"
    - "PowerLite Home Cinema 6500UB"
    - "PowerLite Home Cinema 8100"
    - "PowerLite Home Cinema 8345"
    - "PowerLite Home Cinema 8350"
    - "PowerLite Home Cinema 8500UB"
    - "PowerLite Pro Cinema 800"
    - "PowerLite Pro Cinema 810"
    - "PowerLite Pro Cinema 1080"
    - "PowerLite Pro Cinema 1080UB"
    - "PowerLite Pro Cinema 7100"
    - "PowerLite Pro Cinema 7500UB"
    - "PowerLite Pro Cinema 9100"
    - "PowerLite Pro Cinema 9350"
    - "PowerLite Pro Cinema 9500UB"
    - "PowerLite Pro Cinema 9700UB"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T20:00:53.142Z
last_checked_at: 2026-09-09T22:18:35.753Z
generated_at: 2026-09-09T22:18:35.753Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number and network session details not in this source; source defers to the ESC/VP.net protocol manual."
  - "source guide is titled \"for Home Projectors\" and lists TW/HC/PowerLite models; applicability to business \"EB Series\" models is asserted by the input metadata, not by this source document."
  - "TCP port not stated in source; see ESC/VP.net protocol manual"
  - "per-command get response value sets not stated in source"
  - "no settable continuous parameters (volume/gain/brightness) documented in source."
  - "no unsolicited notifications documented in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "TCP port number / ESC/VP.net session framing not in source."
  - "specific get-command codes and their response value sets not enumerated in source."
  - "firmware version compatibility not stated in source."
  - "applicability of this home-projector guide to EB-series business projectors not confirmed by source."
verification:
  verdict: verified
  checked_at: 2026-09-09T22:18:35.753Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions trace to verbatim tokens in the ESC/VP21 command tables; serial transport parameters (9600/8/N/1/none) verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson EB Series Control Spec

## Summary
Epson home/cinema projector control spec based on the ESC/VP21 command protocol, an ASCII-coded command set used by A/V controllers to control and monitor Epson projectors. ESC/VP21 is transport-independent; the source documents serial (RS-232C) and TCP/IP network connections (USB also supported per source, not modeled here — see Notes). Covers power, A/V mute, mute source selection, and input/source selection commands.

<!-- UNRESOLVED: TCP port number and network session details not in this source; source defers to the ESC/VP.net protocol manual. -->
<!-- UNRESOLVED: source guide is titled "for Home Projectors" and lists TW/HC/PowerLite models; applicability to business "EB Series" models is asserted by the input metadata, not by this source document. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source; see ESC/VP.net protocol manual
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
- powerable  # inferred from PWR ON/OFF commands
- routable   # inferred from SOURCE input-routing commands
- queryable  # inferred: get command format (command + "?") documented in source section 2.2
```

## Actions
```yaml
# All command strings verbatim from source. Per-model availability varies - see Notes.
- id: power_on
  label: Power On
  kind: action
  command: "PWRON"
  params: []
  notes: >-
    TW200/TW200H require SPWRLVL preparation procedure (see Macros).
    TW500 requires "Network Monitoring" set to ON before PWR ON works.
- id: power_off
  label: Power Off
  kind: action
  command: "PWROFF"
  params: []
- id: mute_on
  label: A/V Mute On
  kind: action
  command: "MUTE ON"
  params: []
- id: mute_off
  label: A/V Mute Off
  kind: action
  command: "MUTE OFF"
  params: []
- id: mute_source_black
  label: Mute Source Black
  kind: action
  command: "MSEL00"
  params: []
- id: mute_source_blue
  label: Mute Source Blue
  kind: action
  command: "MSEL01"
  params: []
- id: mute_source_user_logo
  label: Mute Source User Logo
  kind: action
  command: "MSEL02"
  params: []
  notes: TW10/TW10H do not support the User Logo function.
- id: spwrlvl
  label: Set Power On Level
  kind: action
  command: "SPWRLVL 01"
  params: []
  notes: >-
    Used to enable "PWR ON" on TW200/TW200H; only documented value is 01
    (see Macros). Send after projector is on and able to receive ESC/VP21.
- id: null_command
  label: Null Command (Liveness Check)
  kind: query
  command: "0x0D"
  params: []
  notes: Return key code (Hex 0D); projector returns a colon. Confirms projector is in operation.
# --- SOURCE selection: each row from source command tables, verbatim ---
- id: source_10
  label: Select INPUT 1/A Cyclic
  kind: action
  command: "SOURCE 10"
  params: []
  notes: Cycles within SOURCE 1x signals on INPUT 1/A.
- id: source_11
  label: Select INPUT 1/A Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []
- id: source_12
  label: Select INPUT 1/A Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []
- id: source_13
  label: Select INPUT 1/A RGB Video
  kind: action
  command: "SOURCE 13"
  params: []
- id: source_14
  label: Select INPUT 1/A YCbCr Component
  kind: action
  command: "SOURCE 14"
  params: []
- id: source_15
  label: Select INPUT 1/A YPbPr Component
  kind: action
  command: "SOURCE 15"
  params: []
- id: source_1f
  label: Select INPUT 1/A Auto
  kind: action
  command: "SOURCE 1F"
  params: []
- id: source_20
  label: Select INPUT 2/B Cyclic
  kind: action
  command: "SOURCE 20"
  params: []
  notes: Cycles within SOURCE 2x signals on INPUT 2/B.
- id: source_21
  label: Select INPUT 2/B Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []
- id: source_22
  label: Select INPUT 2/B RGB Video
  kind: action
  command: "SOURCE 22"
  params: []
- id: source_23
  label: Select INPUT 2/B YCbCr Component
  kind: action
  command: "SOURCE 23"
  params: []
- id: source_24
  label: Select INPUT 2/B YPbPr Component
  kind: action
  command: "SOURCE 24"
  params: []
- id: source_25
  label: Select INPUT 2/B YPbPr
  kind: action
  command: "SOURCE 25"
  params: []
- id: source_2f
  label: Select INPUT 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []
- id: source_30
  label: Select INPUT 3 Cyclic
  kind: action
  command: "SOURCE 30"
  params: []
  notes: Cycles within SOURCE 3x signals on INPUT 3.
- id: source_31
  label: Select INPUT 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []
- id: source_33
  label: Select INPUT 3 RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []
  notes: Documented for TW5900/TW6000/TW6000W.
- id: source_34
  label: Select INPUT 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []
  notes: Documented for TW5900/TW6000/TW6000W.
- id: source_35
  label: Select INPUT 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []
  notes: Documented for TW5900/TW6000/TW6000W.
- id: source_c0
  label: Select INPUT 5 Cyclic
  kind: action
  command: "SOURCE C0"
  params: []
  notes: Cycles within SOURCE Cx signals on INPUT 5.
- id: source_c3
  label: Select INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []
  notes: Documented for TW600/520/550/800/700/1000.
- id: source_c4
  label: Select INPUT 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []
- id: source_c5
  label: Select INPUT 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []
- id: source_cf
  label: Select INPUT 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []
- id: source_40
  label: Select VIDEO Cyclic
  kind: action
  command: "SOURCE 40"
  params: []
  notes: Cycles within SOURCE 4x video signals.
- id: source_41
  label: Select VIDEO RCA
  kind: action
  command: "SOURCE 41"
  params: []
- id: source_42
  label: Select VIDEO S-Video
  kind: action
  command: "SOURCE 42"
  params: []
- id: source_43
  label: Select VIDEO YCbCr
  kind: action
  command: "SOURCE 43"
  params: []
- id: source_44
  label: Select VIDEO YPbPr
  kind: action
  command: "SOURCE 44"
  params: []
- id: source_52
  label: Select USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []
  notes: Documented for TW5900/TW6000/TW6000W.
- id: source_a0
  label: Select HDMI
  kind: action
  command: "SOURCE A0"
  params: []
  notes: HDMI2 terminal in older tables; HDMI in TW5900/6000 table.
- id: source_a1
  label: Select HDMI Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []
- id: source_a3
  label: Select HDMI RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []
- id: source_a4
  label: Select HDMI YCbCr
  kind: action
  command: "SOURCE A4"
  params: []
- id: source_a5
  label: Select HDMI YPbPr
  kind: action
  command: "SOURCE A5"
  params: []
- id: source_d0
  label: Select WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []
- id: source_d1
  label: Select WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []
- id: source_d3
  label: Select WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []
- id: source_d4
  label: Select WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []
- id: source_d5
  label: Select WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []
```

## Feedbacks
```yaml
- id: ack_colon
  type: enum
  values: [":"]
  description: Projector returns a colon after executing a set command.
- id: error_response
  type: enum
  values: ["ERR"]
  description: >-
    Projector returns "ERR" plus return key code (Hex 0D) and a colon when it
    receives invalid (illegal) commands.
- id: get_response
  type: string
  description: >-
    Get commands (command + "?") return a response parameter after execution.
    Specific get command codes are not enumerated in this source.
  # UNRESOLVED: per-command get response value sets not stated in source
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters (volume/gain/brightness) documented in source.
# Set commands use fixed params (ON, OFF, 21) or step params (INC, DEC, INIT) but no
# parameterized command with a documented range appears in the command tables.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source.
```

## Macros
```yaml
- id: enable_pwr_on_tw200
  label: Enable PWR ON on TW200/TW200H
  steps:
    - "Turn on the projector"
    - "Send SPWRLVL 01 after the projector enters a state where it can receive ESC/VP21 commands"
    - "Turn off the projector once; PWR ON works after the projector reaches standby state"
  notes: Explicit two-step procedure from source footnote (*1).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements beyond the TW200/TW200H PWR ON enablement procedure (operational, not safety).
```

## Notes
- ESC/VP21 command codes are ASCII; protocol is transport-independent (serial, USB, or TCP/IP network per source). USB transport is not modeled in this spec (no protocol enum for it; no USB comm parameters in source).
- TCP/IP network control requires establishing a TCP session first; details deferred to the ESC/VP.net protocol manual, which is not part of this source.
- Serial: select RS-232C at Advanced Setting of the menu; D-Sub 9pin connector, projector input Control (RS-232C).
- Set commands support fixed parameters (e.g. ON, OFF) and step parameters: INC (increment by one), DEC (decrement by one), INIT (initialize).
- Null command (Hex 0D) returns a colon and can confirm the projector is in operation.
- Per-model command availability varies significantly; source provides per-model OK/- matrices across the SOURCE tables (e.g. SOURCE 14/15 are get-only on TW420/HC700/HC705HD per footnote (*7)).
- TW500: to validate PWR ON, "Network Monitoring" of "Operation" in "Setting" menu must be set to ON, then power-cycle once.
- TW10/TW10H do not support the User Logo function (MSEL02).
<!-- UNRESOLVED: TCP port number / ESC/VP.net session framing not in source. -->
<!-- UNRESOLVED: specific get-command codes and their response value sets not enumerated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: applicability of this home-projector guide to EB-series business projectors not confirmed by source. -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T20:00:53.142Z
last_checked_at: 2026-09-09T22:18:35.753Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-09T22:18:35.753Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions trace to verbatim tokens in the ESC/VP21 command tables; serial transport parameters (9600/8/N/1/none) verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number and network session details not in this source; source defers to the ESC/VP.net protocol manual."
- "source guide is titled \"for Home Projectors\" and lists TW/HC/PowerLite models; applicability to business \"EB Series\" models is asserted by the input metadata, not by this source document."
- "TCP port not stated in source; see ESC/VP.net protocol manual"
- "per-command get response value sets not stated in source"
- "no settable continuous parameters (volume/gain/brightness) documented in source."
- "no unsolicited notifications documented in source."
- "source contains no safety warnings, interlock procedures, or"
- "TCP port number / ESC/VP.net session framing not in source."
- "specific get-command codes and their response value sets not enumerated in source."
- "firmware version compatibility not stated in source."
- "applicability of this home-projector guide to EB-series business projectors not confirmed by source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
