---
spec_id: admin/epson-powerlite-l890e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson PowerLite L890E Control Spec"
manufacturer: Epson
model_family: "PowerLite L890E 3LCD Laser Projector"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "PowerLite L890E 3LCD Laser Projector"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
retrieved_at: 2026-05-03T09:03:33.104Z
last_checked_at: 2026-05-08T15:40:55.553Z
generated_at: 2026-05-08T15:40:55.553Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SOURCE 25"
  - "SOURCE C3"
verification:
  verdict: verified
  checked_at: 2026-05-08T15:40:55.553Z
  matched_actions: 49
  action_count: 49
  confidence: high
  summary: "All 49 spec actions matched literally in source command table; transport parameters fully verified; minimal extra commands (SOURCE 25/C3) not material to verdict."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-07
---

# Epson PowerLite L890E Control Spec

## Summary
ESC/VP21 ASCII command protocol for Epson projectors. Supports serial (RS-232) and TCP/IP transports. Covers power control, A/V mute, input source selection, and no-signal screen selection. The L890E is not listed in the source's applicable-models table but uses the same ESC/VP21 command set.

<!-- UNRESOLVED: L890E not listed in applicable models — confirmation that it uses identical ESC/VP21 commands is assumed from the general protocol description -->
<!-- UNRESOLVED: TCP/IP port number not stated in source -->
<!-- UNRESOLVED: no authentication procedure described anywhere in source -->
<!-- UNRESOLVED: HDMI / HDBaseT / USB source commands specific to L890E not in this source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: D-Sub 9pin
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred: PWR ON/OFF commands present
- queryable   # inferred: get command format (command + "?") described
- levelable   # inferred: INC/DEC step parameters described for adjustable settings
- routable     # inferred: SOURCE selection commands present
```

## Actions
```yaml
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
  label: A/V Mute On
  kind: action
  command: "MUTE ON"
  params: []

- id: mute_off
  label: A/V Mute Off
  kind: action
  command: "MUTE OFF"
  params: []

- id: no_signal_screen
  label: No-Signal Screen
  kind: action
  command: "MSEL"
  params:
    - name: screen
      type: enum
      values:
        - label: Black
          value: "00"
        - label: Blue
          value: "01"
        - label: User Logo
          value: "02"

- id: source_input1_cyclic
  label: Source Input 1 Cyclic
  kind: action
  command: "SOURCE 10"
  params: []
  description: Cycle through available signals on Input 1

- id: source_input1_analog_rgb
  label: Source Input 1 Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_input1_digital_rgb
  label: Source Input 1 Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_input1_rgb_video
  label: Source Input 1 RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_input1_ycbcr
  label: Source Input 1 YCbCr
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_input1_ypbpr
  label: Source Input 1 YPbPr
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_input1_auto
  label: Source Input 1 Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_input2_cyclic
  label: Source Input 2 Cyclic
  kind: action
  command: "SOURCE 20"
  params: []
  description: Cycle through available signals on Input 2

- id: source_input2_analog_rgb
  label: Source Input 2 Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_input2_rgb_video
  label: Source Input 2 RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_input2_ycbcr
  label: Source Input 2 YCbCr
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_input2_ypbpr
  label: Source Input 2 YPbPr
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_input2_auto
  label: Source Input 2 Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_input3_cyclic
  label: Source Input 3 Cyclic
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_input3_digital_rgb
  label: Source Input 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_input3_rgb_video
  label: Source Input 3 RGB Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: source_input3_ycbcr
  label: Source Input 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_input3_ypbpr
  label: Source Input 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

- id: source_input5_cyclic
  label: Source Input 5 Cyclic
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_input5_ycbcr
  label: Source Input 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_input5_ypbpr
  label: Source Input 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_input5_auto
  label: Source Input 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_video_cyclic
  label: Source Video Cyclic
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_video_rca
  label: Source Video RCA
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_video_s
  label: Source Video S-Video
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_video_ycbcr
  label: Source Video YCbCr
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_video_ypbpr
  label: Source Video YPbPr
  kind: action
  command: "SOURCE 44"
  params: []

- id: source_hdmi
  label: Source HDMI
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_hdmi_digital_rgb
  label: Source HDMI Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_hdmi_rgb_video
  label: Source HDMI RGB Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_hdmi_ycbcr
  label: Source HDMI YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_hdmi_ypbpr
  label: Source HDMI YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_wirelesshd
  label: Source WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_wirelesshd_digital_rgb
  label: Source WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_wirelesshd_rgb_video
  label: Source WirelessHD RGB Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_wirelesshd_ycbcr
  label: Source WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_wirelesshd_ypbpr
  label: Source WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []

- id: source_usb_easymp
  label: Source USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

# UNRESOLVED: L890E-specific input commands (HDBaseT, USB display, etc.) not documented in this source
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["ON", "OFF"]
  query: "PWR ?"
  description: Returns current power state

- id: mute_state
  type: enum
  values: ["ON", "OFF"]
  query: "MUTE ?"
  description: Returns current A/V mute state

- id: source_active
  type: string
  query: "SOURCE ?"
  description: Returns currently active source identifier

- id: no_signal_screen
  type: enum
  values: ["00", "01", "02"]
  query: "MSEL ?"
  description: Returns current no-signal screen setting (00=Black, 01=Blue, 02=User Logo)

- id: error
  type: string
  description: "Projector returns ERR followed by 0x0D and colon for invalid commands"
```

## Variables
```yaml
# UNRESOLVED: settable parameters with INC/DEC/INIT step values mentioned but specific parameter names not enumerated in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification format described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing described in source
```

## Notes
- ESC/VP21 is ASCII-based; commands are human-readable and can be sent from a terminal emulator.
- Null command (0x0D) returns a colon — usable as a heartbeat / presence check.
- Set commands return `:` on success. Get commands (appending `?`) return the value. Invalid commands return `ERR` + 0x0D + `:`.
- INC parameter increments by one; DEC decrements by one; INIT resets to default.
- Some older models require `SPWRLVL 01` before `PWR ON` works (may not apply to L890E).
- Source commands use a two-character hex suffix pattern: first digit = input terminal (1–5, A, C, D), second digit = signal type within that terminal.
<!-- UNRESOLVED: L890E-specific input mapping (which physical ports correspond to Input 1/2/3/5/A/C/D) not in this source -->
<!-- UNRESOLVED: TCP connection establishment procedure (e.g., whether a login handshake or initial colon wait is required) not documented -->
<!-- UNRESOLVED: command termination character (CR 0x0D confirmed for null command; assumed for all commands) -->
<!-- UNRESOLVED: response timeout values not stated -->
<!-- UNRESOLVED: maximum concurrent connection count not stated -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
retrieved_at: 2026-05-03T09:03:33.104Z
last_checked_at: 2026-05-08T15:40:55.553Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-08T15:40:55.553Z
matched_actions: 49
action_count: 49
confidence: high
summary: "All 49 spec actions matched literally in source command table; transport parameters fully verified; minimal extra commands (SOURCE 25/C3) not material to verdict."
```

## Known Gaps

```yaml
- "SOURCE 25"
- "SOURCE C3"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
