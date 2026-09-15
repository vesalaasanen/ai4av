---
spec_id: admin/epson-eb-l-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson EB-L Series Control Spec"
manufacturer: Epson
model_family: "EB-L Series"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "EB-L Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T20:02:14.075Z
last_checked_at: 2026-09-09T22:18:37.499Z
generated_at: 2026-09-09T22:18:37.499Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the ESC/VP21 \"Home Projectors\" guide whose applicable-models list (ELP-TW100 … TW9000W) does NOT include EB-L Series; command set may differ on EB-L hardware"
  - "specific query commands (e.g. \"PWR?\") not enumerated as rows in source; only the generic get format \"command + ?\" is documented"
  - "USB and TCP/IP transports mentioned as possible but not specified in this source (TCP details deferred to ESC/VP.net manual)"
  - "per-command response value formats not enumerated in source"
  - "no settable continuous parameters (volume/gain/brightness) documented in source"
  - "no unsolicited notifications documented in source"
  - "no safety warnings or interlock procedures stated in source"
  - "EB-L Series not in the source's applicable-models list — verify command set against an EB-L-specific document before use"
  - "USB serial parameters and TCP port/configuration not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-09T22:18:37.499Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions match their wire literals verbatim in the source command tables, transport is verified, and source catalogue is fully represented. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson EB-L Series Control Spec

## Summary
Epson projector controlled via the ESC/VP21 ASCII command protocol over RS-232C serial. This spec covers power, mute, source selection (SOURCE codes), blank-screen selection (MSEL codes), and the null/error handshake commands documented in the ESC/VP21 Command User's Guide.

<!-- UNRESOLVED: source is the ESC/VP21 "Home Projectors" guide whose applicable-models list (ELP-TW100 … TW9000W) does NOT include EB-L Series; command set may differ on EB-L hardware -->
<!-- UNRESOLVED: specific query commands (e.g. "PWR?") not enumerated as rows in source; only the generic get format "command + ?" is documented -->
<!-- UNRESOLVED: USB and TCP/IP transports mentioned as possible but not specified in this source (TCP details deferred to ESC/VP.net manual) -->

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
  type: none  # inferred: no auth procedure in source
```

Source also states: connector D-Sub 9pin, projector input Control(RS-232C), and RS-232C must be selected at Advanced Setting of the menu.

## Traits
```yaml
# powerable: inferred from PWRON/PWROFF command examples
# routable: inferred from SOURCE xx routing command examples
# queryable: inferred from documented get-command format (command + ?)
traits:
  - powerable
  - routable
  - queryable
```

## Actions
```yaml
# Model availability varies per command; see per-model tables in source (section 4).
# Each entry below is a distinct row in the source command tables.
- id: power_on
  label: Power On
  kind: action
  command: "PWRON"
  params: []

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

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF"
  params: []

- id: select_source_black
  label: Select Source Black
  kind: action
  command: "MSEL00"
  params: []

- id: select_source_blue
  label: Select Source Blue
  kind: action
  command: "MSEL01"
  params: []

- id: select_source_user_logo
  label: Select Source User Logo
  kind: action
  command: "MSEL02"
  params: []  # TW10/TW10H does not support User Logo

- id: null_command
  label: Null Command (operation check)
  kind: query
  command: "<CR> (0x0D)"
  params: []

- id: set_power_on_level
  label: Set Power On Level (TW200/TW200H preparation)
  kind: action
  command: "SPWRLVL 01"
  params: []

- id: source_input1_cyclic
  label: Source INPUT 1/A Cyclic
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_input1_analogrgb
  label: Source INPUT 1/A AnalogRGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_input1_digital_rgb
  label: Source INPUT 1/A Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_input1_rgb_video
  label: Source INPUT 1/A RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_input1_ycbcr
  label: Source INPUT 1/A YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []  # get-only on TW420/TW450 per (*7)

- id: source_input1_ypbpr
  label: Source INPUT 1/A YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_input1_auto
  label: Source INPUT 1/A Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_input2_cyclic
  label: Source INPUT 2/B Cyclic
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_input2_analogrgb
  label: Source INPUT 2/B AnalogRGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_input2_rgb_video
  label: Source INPUT 2/B RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_input2_ycbcr
  label: Source INPUT 2/B YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_input2_ypbpr
  label: Source INPUT 2/B YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_input2_ypbpr_alt
  label: Source INPUT 2/B YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_input2_auto
  label: Source INPUT 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_input3_cyclic
  label: Source INPUT 3 Cyclic
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_input3_digital_rgb
  label: Source INPUT 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_input3_rgb_video
  label: Source INPUT 3 RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: source_input3_ycbcr
  label: Source INPUT 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_input3_ypbpr
  label: Source INPUT 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

- id: source_input5_cyclic
  label: Source INPUT 5 Cyclic
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_input5_scart
  label: Source INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_input5_ycbcr
  label: Source INPUT 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_input5_ypbpr
  label: Source INPUT 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_input5_auto
  label: Source INPUT 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_video_cyclic
  label: Source VIDEO Cyclic
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_video_rca
  label: Source VIDEO (RCA)
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_video_s
  label: Source VIDEO (S)
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_video_ycbcr
  label: Source VIDEO (YCbCr)
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_video_ypbpr
  label: Source VIDEO (YPbPr)
  kind: action
  command: "SOURCE 44"
  params: []

- id: source_usb_easyp
  label: Source USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

- id: source_hdmi2_hdmi
  label: Source HDMI2 (HDMI)
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_hdmi2_digital_rgb
  label: Source HDMI2 Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_hdmi2_rgb_video
  label: Source HDMI2 RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_hdmi2_ycbcr
  label: Source HDMI2 YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_hdmi2_ypbpr
  label: Source HDMI2 YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_wirelesshd
  label: Source HDMI WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_wirelesshd_digital_rgb
  label: Source WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_wirelesshd_rgb_video
  label: Source WirelessHD RGB-Video
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
```

## Feedbacks
```yaml
- id: set_command_ack
  type: enum
  values: [":"]
  description: Projector returns a colon after executing a set command.

- id: get_command_response
  type: string
  description: Projector returns a response parameter after executing a get command (command + ?).
  # UNRESOLVED: per-command response value formats not enumerated in source

- id: null_command_ack
  type: enum
  values: [":"]
  description: Projector returns a colon for the null command (0x0D); confirms projector is in operation.

- id: error_response
  type: enum
  values: ["ERR"]
  description: >-
    Projector returns "ERR" plus a return key code (0x0D) and a colon when it
    receives invalid commands.
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters (volume/gain/brightness) documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
- id: tw200_power_on_enable
  label: TW200/TW200H PWR ON enablement
  steps:
    - "Turn on the projector"
    - "Wait until projector can receive ESC/VP21 commands"
    - "Send SPWRLVL 01"
    - "Turn off the projector once; after standby state is reached, PWRON works"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Get-command format: command + `?`; projector returns the response parameter (section 2.2). Specific query rows are not enumerated in the source.
- Set-command parameters are either fixed values (ON, OFF, 21) or step parameters: INC (increment), DEC (decrement), INIT (initialize).
- TW500 requires "Network Monitoring" (Operation in Setting menu) set to ON to validate PWRON; projector must be turned off once into standby first.
- TW10/TW10H does not support User Logo (MSEL02).
- Source model-compatibility tables (section 4) mark per-model availability for each SOURCE code; availability differs by model generation.
- ESC/VP21 is transport-independent; USB and TCP/IP network transmission are mentioned, with TCP details deferred to the ESC/VP.net protocol manual (not covered by this source).
<!-- UNRESOLVED: EB-L Series not in the source's applicable-models list — verify command set against an EB-L-specific document before use -->
<!-- UNRESOLVED: USB serial parameters and TCP port/configuration not stated in source -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T20:02:14.075Z
last_checked_at: 2026-09-09T22:18:37.499Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-09T22:18:37.499Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions match their wire literals verbatim in the source command tables, transport is verified, and source catalogue is fully represented. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the ESC/VP21 \"Home Projectors\" guide whose applicable-models list (ELP-TW100 … TW9000W) does NOT include EB-L Series; command set may differ on EB-L hardware"
- "specific query commands (e.g. \"PWR?\") not enumerated as rows in source; only the generic get format \"command + ?\" is documented"
- "USB and TCP/IP transports mentioned as possible but not specified in this source (TCP details deferred to ESC/VP.net manual)"
- "per-command response value formats not enumerated in source"
- "no settable continuous parameters (volume/gain/brightness) documented in source"
- "no unsolicited notifications documented in source"
- "no safety warnings or interlock procedures stated in source"
- "EB-L Series not in the source's applicable-models list — verify command set against an EB-L-specific document before use"
- "USB serial parameters and TCP port/configuration not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
