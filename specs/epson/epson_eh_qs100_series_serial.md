---
spec_id: admin/epson-eh-qs100-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson EH-QS100 Series Control Spec"
manufacturer: Epson
model_family: "EH-QS100 Series"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "EH-QS100 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-05-03T09:03:33.104Z
last_checked_at: 2026-05-14T18:17:15.725Z
generated_at: 2026-05-14T18:17:15.725Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.725Z
  matched_actions: 45
  action_count: 45
  confidence: high
  summary: "All 48 spec actions matched literal commands in ESC/VP21 reference; transport parameters verbatim in source communication specification."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Epson EH-QS100 Series Control Spec

## Summary
The Epson EH-QS100 Series is a home projector controllable via the ESC/VP21 protocol over RS-232C serial, USB, or TCP/IP network. Commands are ASCII-based and include power control, mute, and input source selection. This spec is derived from the general ESC/VP21 Command User's Guide for Home Projectors.

<!-- UNRESOLVED: EH-QS100 Series is not explicitly listed in the "Applicable models" section of the source document. The source covers many older Epson projector models; command availability for EH-QS100 Series should be verified against device-specific documentation. -->
<!-- UNRESOLVED: TCP/IP details (port number, session setup) are deferred to the ESC/VP.net protocol manual, which was not provided. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from "Network connection" / "TCP session" mention
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: D-Sub 9pin
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source; refer to ESC/VP.net manual
auth:
  type: none  # inferred: no authentication procedure described in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from PWR ON / PWR OFF commands
  - routable     # inferred from SOURCE selection commands
  - muteable     # inferred from MUTE ON / MUTE OFF commands
  - queryable    # inferred from get command format (command + "?")
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "PWR ON"
    description: Turns the projector on
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "PWR OFF"
    description: Turns the projector off
    params: []

  - id: mute_on
    label: Mute On
    kind: action
    command: "MUTE ON"
    description: Enables A/V mute (black screen)
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "MUTE OFF"
    description: Disables A/V mute
    params: []

  - id: source_select_input1_cycle
    label: Select Input 1/A (Cycle)
    kind: action
    command: "SOURCE 10"
    description: Cycle through signals on Input 1/A
    params: []

  - id: source_select_input1_analog_rgb
    label: Select Input 1/A Analog RGB
    kind: action
    command: "SOURCE 11"
    params: []

  - id: source_select_input1_digital_rgb
    label: Select Input 1/A Digital RGB
    kind: action
    command: "SOURCE 12"
    params: []

  - id: source_select_input1_rgb_video
    label: Select Input 1/A RGB Video
    kind: action
    command: "SOURCE 13"
    params: []

  - id: source_select_input1_ycbcr
    label: Select Input 1/A YCbCr
    kind: action
    command: "SOURCE 14"
    params: []

  - id: source_select_input1_ypbpr
    label: Select Input 1/A YPbPr
    kind: action
    command: "SOURCE 15"
    params: []

  - id: source_select_input1_auto
    label: Select Input 1/A Auto
    kind: action
    command: "SOURCE 1F"
    params: []

  - id: source_select_input2_cycle
    label: Select Input 2/B (Cycle)
    kind: action
    command: "SOURCE 20"
    params: []

  - id: source_select_input2_analog_rgb
    label: Select Input 2/B Analog RGB
    kind: action
    command: "SOURCE 21"
    params: []

  - id: source_select_input2_rgb_video
    label: Select Input 2/B RGB Video
    kind: action
    command: "SOURCE 22"
    params: []

  - id: source_select_input2_ycbcr
    label: Select Input 2/B YCbCr
    kind: action
    command: "SOURCE 23"
    params: []

  - id: source_select_input2_ypbpr
    label: Select Input 2/B YPbPr
    kind: action
    command: "SOURCE 24"
    params: []

  - id: source_select_input2_auto
    label: Select Input 2/B Auto
    kind: action
    command: "SOURCE 2F"
    params: []

  - id: source_select_input3_cycle
    label: Select Input 3 (Cycle)
    kind: action
    command: "SOURCE 30"
    params: []

  - id: source_select_input3_digital_rgb
    label: Select Input 3 Digital RGB
    kind: action
    command: "SOURCE 31"
    params: []

  - id: source_select_input3_rgb_video
    label: Select Input 3 RGB Video
    kind: action
    command: "SOURCE 33"
    params: []

  - id: source_select_input3_ycbcr
    label: Select Input 3 YCbCr
    kind: action
    command: "SOURCE 34"
    params: []

  - id: source_select_input3_ypbpr
    label: Select Input 3 YPbPr
    kind: action
    command: "SOURCE 35"
    params: []

  - id: source_select_input5_cycle
    label: Select Input 5 (Cycle)
    kind: action
    command: "SOURCE C0"
    params: []

  - id: source_select_input5_ycbcr
    label: Select Input 5 YCbCr
    kind: action
    command: "SOURCE C4"
    params: []

  - id: source_select_input5_ypbpr
    label: Select Input 5 YPbPr
    kind: action
    command: "SOURCE C5"
    params: []

  - id: source_select_input5_auto
    label: Select Input 5 Auto
    kind: action
    command: "SOURCE CF"
    params: []

  - id: source_select_video_cycle
    label: Select Video (Cycle)
    kind: action
    command: "SOURCE 40"
    params: []

  - id: source_select_video_rca
    label: Select Video RCA
    kind: action
    command: "SOURCE 41"
    params: []

  - id: source_select_video_s
    label: Select Video S-Video
    kind: action
    command: "SOURCE 42"
    params: []

  - id: source_select_hdmi2
    label: Select HDMI 2
    kind: action
    command: "SOURCE A0"
    params: []

  - id: source_select_hdmi2_digital_rgb
    label: Select HDMI 2 Digital RGB
    kind: action
    command: "SOURCE A1"
    params: []

  - id: source_select_hdmi2_rgb_video
    label: Select HDMI 2 RGB Video
    kind: action
    command: "SOURCE A3"
    params: []

  - id: source_select_hdmi2_ycbcr
    label: Select HDMI 2 YCbCr
    kind: action
    command: "SOURCE A4"
    params: []

  - id: source_select_hdmi2_ypbpr
    label: Select HDMI 2 YPbPr
    kind: action
    command: "SOURCE A5"
    params: []

  - id: source_select_wirelesshd
    label: Select WirelessHD
    kind: action
    command: "SOURCE D0"
    params: []

  - id: null_command
    label: Null Command
    kind: action
    command: "\r"
    description: Sends a carriage return (0x0D); projector replies with a colon to confirm it is operational
    params: []
  - id: source_select_input2_ypbpr_b
    label: Select Input 2/B YPbPr (B)
    kind: action
    command: "SOURCE 25"
    params: []

  - id: source_select_video_ycbcr
    label: Select Video YCbCr
    kind: action
    command: "SOURCE 43"
    params: []

  - id: source_select_video_ypbpr
    label: Select Video YPbPr
    kind: action
    command: "SOURCE 44"
    params: []

  - id: source_select_usb_easymp
    label: Select USB EasyMP
    kind: action
    command: "SOURCE 52"
    params: []

  - id: source_select_input5_scart
    label: Select Input 5 SCART
    kind: action
    command: "SOURCE C3"
    params: []

  - id: source_select_wirelesshd_digital_rgb
    label: Select WirelessHD Digital RGB
    kind: action
    command: "SOURCE D1"
    params: []

  - id: source_select_wirelesshd_rgb_video
    label: Select WirelessHD RGB-Video
    kind: action
    command: "SOURCE D3"
    params: []

  - id: source_select_wirelesshd_ycbcr
    label: Select WirelessHD YCbCr
    kind: action
    command: "SOURCE D4"
    params: []

  - id: source_select_wirelesshd_ypbpr
    label: Select WirelessHD YPbPr
    kind: action
    command: "SOURCE D5"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    command: "PWR?"
    values: [ON, OFF]
    description: Returns current power state

  - id: mute_state
    label: Mute State
    type: enum
    command: "MUTE?"
    values: [ON, OFF]
    description: Returns current mute state

  - id: source_current
    label: Current Source
    type: string
    command: "SOURCE?"
    description: Returns the currently selected input source identifier

  - id: error_response
    label: Error Response
    type: string
    response: "ERR"
    description: Projector returns ERR followed by 0x0D and a colon when an invalid command is received

  - id: command_ack
    label: Command Acknowledge
    type: string
    response: ":"
    description: Projector returns a colon after successfully executing a set command
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables (e.g. volume, brightness, lens shift) documented in this source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements documented in this source. Note: some models require specific
# preparation before PWR ON works (e.g. SPWRLVL 01 for TW200/TW200H,
# Network Monitoring ON for TW500) - applicability to EH-QS100 is unknown.
```

## Notes
- ESC/VP21 is protocol-independent; serial, USB, and TCP/IP are all valid transports. TCP/IP details are in the separate ESC/VP.net protocol manual.
- Set commands return a colon (`:`) on success and `ERR` followed by `0x0D` and `:` on failure.
- Get commands append `?` to the command name; the projector returns the current parameter value.
- The `INC`, `DEC`, and `INIT` step parameters may apply to some commands but are not detailed with specific commands in this source.
- RS-232C must be selected in the projector's Advanced Settings menu before serial control works.
- Source selection commands vary significantly by model; the full command table is included above. Not all SOURCE commands are valid for every model.
<!-- UNRESOLVED: EH-QS100 Series not listed in applicable models — command set needs verification against device-specific documentation -->
<!-- UNRESOLVED: TCP port, session establishment, and ESC/VP.net protocol details not available in this source -->
<!-- UNRESOLVED: No volume, brightness, keystone, lens shift, or other adjustment commands documented in this source -->
<!-- UNRESOLVED: No warm-up/cooldown timing constraints documented -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-05-03T09:03:33.104Z
last_checked_at: 2026-05-14T18:17:15.725Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.725Z
matched_actions: 45
action_count: 45
confidence: high
summary: "All 48 spec actions matched literal commands in ESC/VP21 reference; transport parameters verbatim in source communication specification."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
