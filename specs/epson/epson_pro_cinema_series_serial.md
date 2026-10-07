---
spec_id: admin/epson-pro-cinema-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson Pro Cinema Series ESC/VP21 Control Spec"
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
    - TW8000
    - TW9000
    - TW8000W
    - TW9000W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T16:42:09.974Z
last_checked_at: 2026-10-01T13:08:35.817Z
generated_at: 2026-10-01T13:08:35.817Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port and auth details not stated in this document; see ESC/VP.net protocol manual referenced by source."
  - "settable parameter ranges not stated in source beyond PWR, MUTE, SOURCE."
  - "unsolicited notification messages not documented in source."
  - "no multi-step sequences described in source."
  - "no safety warnings or interlock procedures documented in source."
  - "TCP/IP port, auth, USB transport parameters not stated in this source."
verification:
  verdict: verified
  checked_at: 2026-10-01T13:08:35.817Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions matched literal SOURCE/PWR/MUTE/MSEL/SPWRLVL tokens in the command table; transport params verified against line 255. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Epson Pro Cinema Series ESC/VP21 Control Spec

## Summary
Control spec for Epson Pro Cinema and related Home Projector models using the ESC/VP21 ASCII command protocol over RS-232C (and optionally USB or TCP/IP). Set commands return a colon; get commands return a response parameter; invalid commands return `ERR` followed by Hex 0D and a colon.

<!-- UNRESOLVED: TCP port and auth details not stated in this document; see ESC/VP.net protocol manual referenced by source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable  # inferred from PWR ON / PWR OFF / MUTE ON / MUTE OFF commands
- routable  # inferred from SOURCE / MSEL input-routing commands
- queryable  # inferred from get-command format (command + "?")
```

## Actions
```yaml
# Power
- id: pwr_on
  label: Power On
  kind: action
  command: "PWR ON"
  params: []

- id: pwr_off
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

# Test pattern / source select (MSEL)
- id: msel_black
  label: Test Pattern Black
  kind: action
  command: "MSEL 00"
  params: []

- id: msel_blue
  label: Test Pattern Blue
  kind: action
  command: "MSEL 01"
  params: []

- id: msel_user_logo
  label: Test Pattern User Logo
  kind: action
  command: "MSEL 02"
  params: []

# Source change - INPUT 1/A
- id: source_1x_cycle
  label: Source Input 1 Cycle
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_11_analog_rgb
  label: Source Input 1 Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_12_digital_rgb
  label: Source Input 1 Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_13_rgb_video
  label: Source Input 1 RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_14_ycbcr_component
  label: Source Input 1 YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_15_ypbpr_component
  label: Source Input 1 YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_1f_auto
  label: Source Input 1 Auto
  kind: action
  command: "SOURCE 1F"
  params: []

# Source change - INPUT 2/B
- id: source_2x_cycle
  label: Source Input 2 Cycle
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_21_analog_rgb
  label: Source Input 2 Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_22_rgb_video
  label: Source Input 2 RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_23_ycbcr_component
  label: Source Input 2 YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_24_ypbpr_component
  label: Source Input 2 YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_25_ypbpr
  label: Source Input 2 YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_2f_auto
  label: Source Input 2 Auto
  kind: action
  command: "SOURCE 2F"
  params: []

# Source change - INPUT 3
- id: source_3x_cycle
  label: Source Input 3 Cycle
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_31_digital_rgb
  label: Source Input 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_33_rgb_video
  label: Source Input 3 RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: source_34_ycbcr
  label: Source Input 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_35_ypbpr
  label: Source Input 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

# Source change - INPUT 5
- id: source_cx_cycle
  label: Source Input 5 Cycle
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_c3_scart
  label: Source Input 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_c4_ycbcr
  label: Source Input 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_c5_ypbpr
  label: Source Input 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_cf_auto
  label: Source Input 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

# Source change - USB / EasyMP
- id: source_52_easymp
  label: Source USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

# Source change - HDMI2
- id: source_a0_hdmi
  label: Source HDMI2 HDMI
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_a1_digital_rgb
  label: Source HDMI2 Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_a3_rgb_video
  label: Source HDMI2 RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_a4_ycbcr
  label: Source HDMI2 YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_a5_ypbpr
  label: Source HDMI2 YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

# Source change - HDMI / WirelessHD
- id: source_d0_wirelesshd
  label: Source WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_d1_digital_rgb
  label: Source WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_d3_rgb_video
  label: Source WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_d4_ycbcr
  label: Source WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_d5_ypbpr
  label: Source WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []

# Source change - VIDEO
- id: source_4x_cycle
  label: Source Video Cycle
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_41_video_rca
  label: Source Video RCA
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_42_video_s
  label: Source Video S-Video
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_43_video_ycbcr
  label: Source Video YCbCr
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_44_video_ypbpr
  label: Source Video YPbPr
  kind: action
  command: "SOURCE 44"
  params: []

# TW200 / TW200H power-on prep
- id: spwrlvl_01
  label: Set Power Level 01 (TW200/TW200H prep)
  kind: action
  command: "SPWRLVL 01"
  params: []

# Null / illegal-command probes
- id: null_command
  label: Null Command (keep-alive probe)
  kind: action
  command: "\r"
  # Hex 0D return key code
  params: []
```

## Feedbacks
```yaml
# Echo / response patterns from the projector after a successful set command.
- id: set_ack
  type: string
  description: "Projector returns a colon (':') after executing a set command."

# Response format from a get command.
- id: get_response
  type: string
  description: "Projector returns a response parameter after executing a get command (command + '?')."

# Illegal-command response.
- id: illegal_command_response
  type: string
  description: "Projector returns 'ERR', a return key code (Hex 0D), and a colon when it receives invalid commands."
  values: "ERR"

# Null-command response.
- id: null_command_response
  type: string
  description: "Projector returns a colon when it receives the null command (Hex 0D)."
```

## Variables
```yaml
# UNRESOLVED: settable parameter ranges not stated in source beyond PWR, MUTE, SOURCE.
```

## Events
```yaml
# UNRESOLVED: unsolicited notification messages not documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures documented in source.
```

## Notes
ESC/VP21 is the shared ASCII command set used across many Epson Home Projector / Pro Cinema models. Commands are identical strings across models but per-source support varies (e.g. `SOURCE 21` is OK on TW100/TW100H/TS10/TW10/TW10H/TW200/TW200H/TW500 but blank on the TW20/TW600/TW700/TW1000/TW2000 column).

`SOURCE 1F` / `SOURCE 2F` / `SOURCE CF` (Auto) are listed as supported on TW500 and TW20/TW600/TW700/TW1000/TW2000 and newer families only.

Per source note (*1): on TW200/TW200H, before `PWR ON` will work, send `SPWRLVL 01` while the projector is on, then power-cycle to standby. On TW500, `PWR ON` requires `Operation > Setting > Network Monitoring = ON`, then a power-cycle to standby.

`MSEL 02` (User Logo test pattern) is not supported on TW10/TW10H.

`SOURCE 14` and `SOURCE 15` get-only on TW450/HC705HD.

USB connection is mentioned but transport details are in a referenced Appendix not included in this excerpt; TCP/IP transport details are in a referenced ESC/VP.net protocol manual.

<!-- UNRESOLVED: TCP/IP port, auth, USB transport parameters not stated in this source. -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T16:42:09.974Z
last_checked_at: 2026-10-01T13:08:35.817Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T13:08:35.817Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions matched literal SOURCE/PWR/MUTE/MSEL/SPWRLVL tokens in the command table; transport params verified against line 255. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port and auth details not stated in this document; see ESC/VP.net protocol manual referenced by source."
- "settable parameter ranges not stated in source beyond PWR, MUTE, SOURCE."
- "unsolicited notification messages not documented in source."
- "no multi-step sequences described in source."
- "no safety warnings or interlock procedures documented in source."
- "TCP/IP port, auth, USB transport parameters not stated in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
