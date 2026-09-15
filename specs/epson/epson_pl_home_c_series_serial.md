---
spec_id: admin/epson-pl-home-c-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson PL-Home C Series Control Spec"
manufacturer: Epson
model_family: "PL-HomeCinema 400"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "PL-HomeCinema 400"
    - "PL-HomeCinema 700"
    - "PL-HomeCinema 720"
    - "PL-HomeCinema 1080"
    - "PL-HomeCinema 1080UB"
    - "PL-HomeCinema 705HD"
    - "PL-HomeCinema 6100"
    - "PL-HomeCinema 6500UB"
    - "PL-HomeCinema 8100"
    - "PL-HomeCinema 8345"
    - "PL-HomeCinema 8350"
    - "PL-HomeCinema 8500UB"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T20:03:31.360Z
last_checked_at: 2026-09-10T22:17:12.186Z
generated_at: 2026-09-10T22:17:12.186Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB connection details referenced but not included in source. TCP/IP network control referenced but detailed only in separate ESC/VP.net protocol manual (not in source). Get-command responses beyond generic format not enumerated."
  - "TCP port not stated in source"
  - "no settable non-discrete parameters with value ranges documented in source."
  - "no unsolicited notifications documented in source."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility not stated in source."
  - "TCP port for network control not stated in source."
  - "USB transport electrical/protocol details not included in source."
  - "get-command response value formats not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-09-10T22:17:12.186Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 spec actions match source tokens verbatim; transport params match; spec covers the entire source command inventory (PWRON/PWROFF/MUTE/MSEL/SOURCE families + null). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-05
---

# Epson PL-Home C Series Control Spec

## Summary
Epson home cinema projectors (PL-Home Cinema series) controlled via the ESC/VP21 ASCII command protocol over RS-232C serial (USB and TCP/IP network transports are also mentioned in the source, with network control deferred to a separate ESC/VP.net manual). This spec covers power, A/V mute, blank-screen source, and input/signal selection commands plus the serial communication parameters.

<!-- UNRESOLVED: USB connection details referenced but not included in source. TCP/IP network control referenced but detailed only in separate ESC/VP.net protocol manual (not in source). Get-command responses beyond generic format not enumerated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # source states ESC/VP21 commands can be sent after establishing a TCP session
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from PWR ON / PWR OFF commands
- routable   # inferred from SOURCE input/signal selection commands
- queryable  # inferred from documented get command format (command + "?") and null command operation check
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PWRON"
  params: []
  notes: "TW200/TW200H requires SPWRLVL 01 preparation (see Macros). TW500 requires Network Monitoring set to ON (see Macros)."

- id: power_off
  label: Power Off
  kind: action
  command: "PWROFF"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "MUTE ON"
  params: []
  notes: "Listed in source command table under the PWR OFF item with parameter ON."

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF"
  params: []
  notes: "Listed in source command table under the PWR OFF item with parameter OFF."

- id: source_black
  label: Select Blank Screen Black
  kind: action
  command: "MSEL00"
  params: []
  notes: "SOURCE item, Black parameter."

- id: source_blue
  label: Select Blank Screen Blue
  kind: action
  command: "MSEL01"
  params: []
  notes: "SOURCE item, Blue parameter."

- id: source_user_logo
  label: Select Blank Screen User Logo
  kind: action
  command: "MSEL02"
  params: []
  notes: "SOURCE item, User Logo parameter. TW10/TW10H does not support the User Logo function."

- id: null_command
  label: Null Command (Operation Check)
  kind: query
  command: "0D"
  params: []
  notes: "Return key code (Hex 0D). Projector returns a colon; used to confirm the projector is in operation."

- id: source_input1_cyclic
  label: Select INPUT 1/A Cyclic
  kind: action
  command: "SOURCE 10"
  params: []
  notes: "Cycles within SOURCE 1x signals on INPUT 1/A."

- id: source_input1_analog_rgb
  label: Select INPUT 1/A Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_input1_digital_rgb
  label: Select INPUT 1/A Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_input1_rgb_video
  label: Select INPUT 1/A RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_input1_ycbcr_component
  label: Select INPUT 1/A YCbCr Component
  kind: action
  command: "SOURCE 14"
  params: []
  notes: "Component signal; selected when TW10 and TW20 are connected."

- id: source_input1_ypbpr_component
  label: Select INPUT 1/A YPbPr Component
  kind: action
  command: "SOURCE 15"
  params: []
  notes: "Component signal; selected when TW10 and TW20 are connected."

- id: source_input1_auto
  label: Select INPUT 1/A Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_input2_cyclic
  label: Select INPUT 2/B Cyclic
  kind: action
  command: "SOURCE 20"
  params: []
  notes: "Cycles within SOURCE 2x signals on INPUT 2/B."

- id: source_input2_analog_rgb
  label: Select INPUT 2/B Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_input2_rgb_video
  label: Select INPUT 2/B RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_input2_ycbcr_component
  label: Select INPUT 2/B YCbCr Component
  kind: action
  command: "SOURCE 23"
  params: []
  notes: "Component signal; selected when TW500 is connected."

- id: source_input2_ypbpr_component
  label: Select INPUT 2/B YPbPr Component
  kind: action
  command: "SOURCE 24"
  params: []
  notes: "Component signal; selected when TW500 is connected."

- id: source_input2_ypbpr
  label: Select INPUT 2/B YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_input2_auto
  label: Select INPUT 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_input3_cyclic
  label: Select INPUT 3 Cyclic
  kind: action
  command: "SOURCE 30"
  params: []
  notes: "Cycles within SOURCE 3x signals on INPUT 3."

- id: source_input3_digital_rgb
  label: Select INPUT 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_input3_rgb_video
  label: Select INPUT 3 RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: source_input3_ycbcr
  label: Select INPUT 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_input3_ypbpr
  label: Select INPUT 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

- id: source_input5_cyclic
  label: Select INPUT 5 Cyclic
  kind: action
  command: "SOURCE C0"
  params: []
  notes: "Cycles within SOURCE Cx signals on INPUT 5."

- id: source_input5_scart
  label: Select INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []
  notes: "Selected when TW600/520/550/800/700/1000 is connected."

- id: source_input5_ycbcr
  label: Select INPUT 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_input5_ypbpr
  label: Select INPUT 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_input5_auto
  label: Select INPUT 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_video_cyclic
  label: Select VIDEO Cyclic
  kind: action
  command: "SOURCE 40"
  params: []
  notes: "Cycles within SOURCE 4x signals on VIDEO."

- id: source_video_rca
  label: Select VIDEO RCA
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_video_s
  label: Select VIDEO S-Video
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_video_ycbcr
  label: Select VIDEO YCbCr
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_video_ypbpr
  label: Select VIDEO YPbPr
  kind: action
  command: "SOURCE 44"
  params: []

- id: source_usb_easymp
  label: Select USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []
  notes: "USB terminal, EasyMP signal. Documented for TW5900/TW6000/TW6000W model group."

- id: source_hdmi2
  label: Select HDMI2
  kind: action
  command: "SOURCE A0"
  params: []
  notes: "HDMI terminal, HDMI signal (HDMI2)."

- id: source_hdmi2_digital_rgb
  label: Select HDMI2 Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_hdmi2_rgb_video
  label: Select HDMI2 RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_hdmi2_ycbcr
  label: Select HDMI2 YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_hdmi2_ypbpr
  label: Select HDMI2 YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_wirelesshd
  label: Select HDMI WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []
  notes: "HDMI terminal, WirelessHD signal."

- id: source_wirelesshd_digital_rgb
  label: Select WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_wirelesshd_rgb_video
  label: Select WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_wirelesshd_ycbcr
  label: Select WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_wirelesshd_ypbpr
  label: Select WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []
```

## Feedbacks
```yaml
- id: set_command_ack
  type: string
  description: "Projector returns a colon (:) after executing a set command."

- id: get_command_response
  type: string
  description: "Projector returns a response parameter after executing a get command (command plus ?). Specific response values not enumerated in source."

- id: null_command_ack
  type: string
  description: "Projector returns a colon (:) in response to the null command (Hex 0D), confirming it is in operation."

- id: illegal_command_error
  type: string
  description: "Projector returns ERR followed by a return key code (Hex 0D) and a colon when it receives invalid commands."
```

## Variables
```yaml
# UNRESOLVED: no settable non-discrete parameters with value ranges documented in source.
# Set commands accept fixed parameters (ON, OFF, numeric values such as 21) and step parameters (INC, DEC, INIT) per the set command format, but no concrete variable bindings are enumerated.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source.
```

## Macros
```yaml
- id: tw200_power_on_preparation
  label: TW200/TW200H PWR ON Preparation
  steps:
    - "Turn on the projector"
    - "Send SPWRLVL 01 to the projector after the projector status reaches the condition where it can receive ESC/VP21 commands"
    - "Turn off the projector once"
    - "PWR ON works after the projector status becomes the standby state"

- id: tw500_power_on_preparation
  label: TW500 PWR ON Preparation
  steps:
    - "Set Network Monitoring of Operation in the Setting menu to ON"
    - "Turn off the projector once"
    - "PWR ON works after the projector status becomes the standby state"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source.
```

## Notes
- Command codes are ASCII; a PC with a terminal emulator can be used to control the projector.
- Set command = command + parameter (fixed values such as ON/OFF, or step parameters: INC increments by one, DEC decrements by one, INIT initializes). Get command = command + "?".
- RS-232C must be selected at Advanced Setting of the projector menu. Connector: D-Sub 9 pin, projector input: Control (RS-232C).
- SOURCE command availability varies by model; the source command tables mark per-model support (OK) and lack of support (-). Commands listed here include all variants documented across applicable model groups.
- For TW10, SOURCE commands do not cycle within signals selectable on a terminal (*3). SOURCE 14/SOURCE 23 are get-only on some models (*7 on TW420/HC700 and TW450/HC705HD tables for YCbCr Component).
- USB connection is supported; details referred to an Appendix section not included in this source.
- TCP/IP network control is possible after establishing a TCP session; details are in the separate ESC/VP.net protocol manual, not in this source.
- Applicable models in the source span many Epson home projector families (TW/TS/HC/PC and PL-HomeCinema/PL-ProCinema naming); this spec is scoped to the PL-Home Cinema series models.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: TCP port for network control not stated in source. -->
<!-- UNRESOLVED: USB transport electrical/protocol details not included in source. -->
<!-- UNRESOLVED: get-command response value formats not enumerated in source. -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T20:03:31.360Z
last_checked_at: 2026-09-10T22:17:12.186Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-10T22:17:12.186Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 spec actions match source tokens verbatim; transport params match; spec covers the entire source command inventory (PWRON/PWROFF/MUTE/MSEL/SOURCE families + null). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB connection details referenced but not included in source. TCP/IP network control referenced but detailed only in separate ESC/VP.net protocol manual (not in source). Get-command responses beyond generic format not enumerated."
- "TCP port not stated in source"
- "no settable non-discrete parameters with value ranges documented in source."
- "no unsolicited notifications documented in source."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility not stated in source."
- "TCP port for network control not stated in source."
- "USB transport electrical/protocol details not included in source."
- "get-command response value formats not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
