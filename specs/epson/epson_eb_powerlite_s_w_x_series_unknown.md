---
spec_id: admin/epson-eb-powerlite-s-w-x-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson EB Powerlite S/W/X Series Control Spec"
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
    - EMP-TW200
    - EMP-TW500
    - EMP-TW10H
    - EMP-TW200H
    - EMP-TW20
    - EMP-TW600
    - EMP-TW520
    - EMP-TW550
    - EMP-TW800
    - EMP-TW700
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
    - EH-TW9000
    - EH-TW8000W
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
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T23:14:52.384Z
last_checked_at: 2026-10-07T13:04:48.259Z
generated_at: 2026-10-07T13:04:48.259Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number, USB interface details, and exact RS-232C connector pinout are not stated in the refined source excerpt. Per-model support for each SOURCE xx command is recorded in the source matrix but not enumerated here per-model; downstream consumers must consult the original table for applicability."
  - "source describes INC/DEC/INIT step-parameter modifiers for set"
  - "source does not describe unsolicited notifications."
  - "source does not describe multi-step sequences."
  - "TW200 and TW200H require a one-time \"SPWRLVL 01\" handshake before"
  - "TCP port number for the network transport is not stated in this excerpt — refer to the ESC/VP.net protocol manual referenced in section 1. USB transport command framing is also not detailed in this excerpt."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:04:48.259Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 action units match source literals (PWR/MUTE/MSEL/SOURCE codes, null, SPWRLVL, ERR) and serial transport values; source catalogue is fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson EB Powerlite S/W/X Series Control Spec

## Summary
Epson home-projector family (ELP/EMP/EH-TW/PL-HomeCinema/PL-ProCinema lines) controlled via the vendor ESC/VP21 ASCII command set. ESC/VP21 is protocol-independent and travels over serial, USB, or TCP/IP. This spec catalogs the common command table plus the per-model source-selection matrix that the source documents.

<!-- UNRESOLVED: TCP port number, USB interface details, and exact RS-232C connector pinout are not stated in the refined source excerpt. Per-model support for each SOURCE xx command is recorded in the source matrix but not enumerated here per-model; downstream consumers must consult the original table for applicability. -->

## Transport
```yaml
# Source states three physical transports for ESC/VP21: serial, USB, TCP/IP network.
# Serial comm condition explicitly stated; TCP and USB details not present in this excerpt.
protocols:
  - serial
  - tcp
  - usb
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: D-Sub 9-pin
  input_name: Control (RS-232C)
# addressing.port omitted - source states TCP session exists but does not state a port number.
# usb sub-key omitted - source mentions USB transport but provides no protocol parameters.
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable  # inferred from PWR ON / PWR OFF / MUTE ON / MUTE OFF command examples
- routable   # inferred from SOURCE xx input-selection command examples
- queryable  # inferred from get command format (command + "?") described in section 2.2
```

## Actions
```yaml
- id: null_command
  label: Null Command (keepalive)
  kind: action
  command: "\r"  # Hex 0D return key code; projector responds with ":"
  params: []

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
  label: Mute On
  kind: action
  command: "MUTE ON"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF"
  params: []

- id: source_msel00
  label: MSEL Test Pattern - Black
  kind: action
  command: "MSEL00"
  params: []

- id: source_msel01
  label: MSEL Test Pattern - Blue
  kind: action
  command: "MSEL01"
  params: []

- id: source_msel02
  label: MSEL Test Pattern - User Logo
  kind: action
  command: "MSEL02"
  params: []

- id: source_10
  label: INPUT 1/A - Cycle within SOURCE 1x
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_11
  label: INPUT 1/A - AnalogRGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_12
  label: INPUT 1/A - Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_13
  label: INPUT 1/A - RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_14
  label: INPUT 1/A - YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_15
  label: INPUT 1/A - YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_1f
  label: INPUT 1/A - Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_20
  label: INPUT 2/B - Cycle within SOURCE 2x
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_21
  label: INPUT 2/B - AnalogRGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_22
  label: INPUT 2/B - RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_23
  label: INPUT 2/B - YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_24
  label: INPUT 2/B - YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_25
  label: INPUT 2/B - YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_2f
  label: INPUT 2/B - Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_30
  label: INPUT 3 - Cycle within SOURCE 3x
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_31
  label: INPUT 3 - Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_33
  label: INPUT 3 - RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: source_34
  label: INPUT 3 - YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_35
  label: INPUT 3 - YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

- id: source_40
  label: VIDEO - Cycle within SOURCE 4x
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_41
  label: VIDEO (RCA)
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_42
  label: VIDEO (S)
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_43
  label: VIDEO (YCbCr)
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_44
  label: VIDEO (YPbPr)
  kind: action
  command: "SOURCE 44"
  params: []

- id: source_52
  label: USB - EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

- id: source_a0
  label: HDMI2 - HDMI
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_a1
  label: HDMI2 - Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_a3
  label: HDMI2 - RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_a4
  label: HDMI2 - YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_a5
  label: HDMI2 - YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_c0
  label: INPUT 5 - Cycle within SOURCE Cx
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_c3
  label: INPUT 5 - SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_c4
  label: INPUT 5 - YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_c5
  label: INPUT 5 - YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_cf
  label: INPUT 5 - Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_d0
  label: HDMI - WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_d1
  label: HDMI - WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_d3
  label: HDMI - WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_d4
  label: HDMI - WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_d5
  label: HDMI - WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []

- id: spwrlvl_01
  label: Set Power-on Wake Level (TW200/TW200H prep)
  kind: action
  command: "SPWRLVL 01"
  params: []

- id: illegal_command_marker
  label: Illegal Command Marker
  kind: action
  command: "ERR"
  params: []
```

## Feedbacks
```yaml
- id: command_ack
  label: Command Acknowledgement
  type: enum
  values:
    - ":"  # colon returned after successful command execution
  description: Successful set-command response per source section 2.1.

- id: null_command_ack
  label: Null Command Acknowledgement
  type: enum
  values:
    - ":"
  description: Projector returns a colon in response to a null command (Hex 0D).

- id: illegal_command_response
  label: Illegal Command Response
  type: enum
  values:
    - "ERR\r:"
  description: Returned for invalid commands; literal sequence "ERR" + return key (Hex 0D) + colon.
```

## Variables
```yaml
# UNRESOLVED: source describes INC/DEC/INIT step-parameter modifiers for set
# commands but does not enumerate which commands accept them in this excerpt.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: TW200 and TW200H require a one-time "SPWRLVL 01" handshake before
# PWR ON becomes usable; TW500 requires "Network Monitoring" = ON before PWR ON.
# These are model-specific prerequisites from the source, captured in Notes below
# rather than as confirmation_required_for because they are not safety interlocks.
```

## Notes
ESC/VP21 is a protocol-independent ASCII command set; same mnemonics traverse serial, USB, or TCP. Serial default is 9600/8/N/1 with no flow control on a D-Sub 9-pin Control (RS-232C) port; menu must be set to RS-232C under Advanced Setting for these models.

Command acknowledgement is the colon character ":" on success, and "ERR\r:" on illegal commands. The null command (Hex 0D) returns ":" and serves as a keepalive / liveness probe.

Model prerequisites:
- TW200 / TW200H: PWR ON requires a one-time prep — power on, send "SPWRLVL 01" once the projector is reachable, then power off once so it enters standby. After that, PWR ON works.
- TW500: PWR ON requires "Network Monitoring" under Operation in the Setting menu to be ON, plus one power-off to reach standby before PWR ON works.
- TW10 / TW10H: MSEL02 (User Logo test pattern) is unsupported.

The source documents a per-model applicability matrix for each SOURCE xx command (varies by input terminal, signal name, and model line). This spec enumerates each SOURCE xx command as a separate action but does not carry per-model applicability metadata — downstream consumers must consult the original command-table appendix for "OK" markings.

<!-- UNRESOLVED: TCP port number for the network transport is not stated in this excerpt — refer to the ESC/VP.net protocol manual referenced in section 1. USB transport command framing is also not detailed in this excerpt. -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T23:14:52.384Z
last_checked_at: 2026-10-07T13:04:48.259Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:04:48.259Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 action units match source literals (PWR/MUTE/MSEL/SOURCE codes, null, SPWRLVL, ERR) and serial transport values; source catalogue is fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number, USB interface details, and exact RS-232C connector pinout are not stated in the refined source excerpt. Per-model support for each SOURCE xx command is recorded in the source matrix but not enumerated here per-model; downstream consumers must consult the original table for applicability."
- "source describes INC/DEC/INIT step-parameter modifiers for set"
- "source does not describe unsolicited notifications."
- "source does not describe multi-step sequences."
- "TW200 and TW200H require a one-time \"SPWRLVL 01\" handshake before"
- "TCP port number for the network transport is not stated in this excerpt — refer to the ESC/VP.net protocol manual referenced in section 1. USB transport command framing is also not detailed in this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
