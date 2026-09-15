---
spec_id: admin/epson-eb-w16-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson EB-W16 Series Control Spec"
manufacturer: Epson
model_family: "EB-W16 Series"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "EB-W16 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T15:33:03.077Z
last_checked_at: 2026-09-09T22:18:57.112Z
generated_at: 2026-09-09T22:18:57.112Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EB-W16 does not appear in the source's applicable-models list (source covers ELP-TW100 through TW9000W families); command availability per model varies and is not confirmed for EB-W16. TCP port, USB details, and ESC/VP.net specifics not in source."
  - "TCP port not stated in source"
  - "no specific variable objects with ranges documented in source."
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented beyond the TW200/TW200H"
  - "source contains no safety warnings or interlock procedures."
  - "EB-W16 not listed in source's applicable models; per-command availability for EB-W16 unconfirmed."
  - "TCP port and ESC/VP.net framing not stated in source."
  - "USB control parameters not stated in source."
  - "firmware version compatibility not stated in source."
  - "specific get-command response values (e.g. PWR? return strings) not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-09-09T22:18:57.112Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec wire tokens (PWR/MUTE/MSEL/SOURCE variants/SPWRLVL/null/get) match source verbatim; serial params and transport protocols grounded. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson EB-W16 Series Control Spec

## Summary
Epson home projector controlled via the ESC/VP21 ASCII command protocol. ESC/VP21 is transport-independent; this source documents RS-232C serial parameters explicitly and states USB and TCP/IP network connections are also possible (network details deferred to the ESC/VP.net protocol manual). Covers power, A/V mute, source selection, and blank-source (no-signal display) commands.

<!-- UNRESOLVED: EB-W16 does not appear in the source's applicable-models list (source covers ELP-TW100 through TW9000W families); command availability per model varies and is not confirmed for EB-W16. TCP port, USB details, and ESC/VP.net specifics not in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: source states "After establishing a TCP session, ESC/VP21 commands can be sent" (details in ESC/VP.net manual, not this source)
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

Note: source also states a USB interface can control the projector (no parameters given); USB is not a supported protocol enum and is therefore omitted.

## Traits
```yaml
# - powerable    (PWR ON / PWR OFF commands present)
# - routable     (SOURCE xx input-selection commands present)
# - queryable    (get command format "command + ?" documented)
traits:
  - powerable
  - routable
  - queryable
```

## Actions
```yaml
# Set commands return ":" after execution. Parameters are fixed values or step
# params (INC increment / DEC decrement / INIT initialize).
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
- id: blank_black
  label: Blank Source Black
  kind: action
  command: "MSEL00"
  params: []
- id: blank_blue
  label: Blank Source Blue
  kind: action
  command: "MSEL01"
  params: []
- id: blank_user_logo
  label: Blank Source User Logo
  kind: action
  command: "MSEL02"
  params: []
- id: source_input1_cyclic
  label: Select Input 1/A (cyclic)
  kind: action
  command: "SOURCE 10"
  params: []
- id: source_input1_analog_rgb
  label: Select Input 1/A Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []
- id: source_input1_digital_rgb
  label: Select Input 1/A Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []
- id: source_input1_rgb_video
  label: Select Input 1/A RGB Video
  kind: action
  command: "SOURCE 13"
  params: []
- id: source_input1_ycbcr
  label: Select Input 1/A YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []
- id: source_input1_ypbpr
  label: Select Input 1/A YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []
- id: source_input1_auto
  label: Select Input 1/A Auto
  kind: action
  command: "SOURCE 1F"
  params: []
- id: source_input2_cyclic
  label: Select Input 2/B (cyclic)
  kind: action
  command: "SOURCE 20"
  params: []
- id: source_input2_analog_rgb
  label: Select Input 2/B Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []
- id: source_input2_rgb_video
  label: Select Input 2/B RGB Video
  kind: action
  command: "SOURCE 22"
  params: []
- id: source_input2_ycbcr
  label: Select Input 2/B YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []
- id: source_input2_ypbpr
  label: Select Input 2/B YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []
- id: source_input2_ypbpr_alt
  label: Select Input 2/B YPbPr
  kind: action
  command: "SOURCE 25"
  params: []
- id: source_input2_auto
  label: Select Input 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []
- id: source_input3_cyclic
  label: Select Input 3 (cyclic)
  kind: action
  command: "SOURCE 30"
  params: []
- id: source_input3_digital_rgb
  label: Select Input 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []
- id: source_input3_rgb_video
  label: Select Input 3 RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []
- id: source_input3_ycbcr
  label: Select Input 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []
- id: source_input3_ypbpr
  label: Select Input 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []
- id: source_input5_cyclic
  label: Select Input 5 (cyclic)
  kind: action
  command: "SOURCE C0"
  params: []
- id: source_input5_scart
  label: Select Input 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []
- id: source_input5_ycbcr
  label: Select Input 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []
- id: source_input5_ypbpr
  label: Select Input 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []
- id: source_input5_auto
  label: Select Input 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []
- id: source_video_cyclic
  label: Select VIDEO (cyclic)
  kind: action
  command: "SOURCE 40"
  params: []
- id: source_video_rca
  label: Select VIDEO (RCA)
  kind: action
  command: "SOURCE 41"
  params: []
- id: source_video_s
  label: Select VIDEO (S)
  kind: action
  command: "SOURCE 42"
  params: []
- id: source_video_ycbcr
  label: Select VIDEO (YCbCr)
  kind: action
  command: "SOURCE 43"
  params: []
- id: source_video_ypbpr
  label: Select VIDEO (YPbPr)
  kind: action
  command: "SOURCE 44"
  params: []
- id: source_usb_easyp
  label: Select USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []
- id: source_hdmi2
  label: Select HDMI2
  kind: action
  command: "SOURCE A0"
  params: []
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
- id: source_wirelesshd_digital_rgb
  label: Select HDMI WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []
- id: source_wirelesshd_rgb_video
  label: Select HDMI WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []
- id: source_wirelesshd_ycbcr
  label: Select HDMI WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []
- id: source_wirelesshd_ypbpr
  label: Select HDMI WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []
- id: set_power_on_level
  label: Set Power On Level (enable PWR ON on TW200/TW200H)
  kind: action
  command: "SPWRLVL 01"
  params: []
  # Documented in note (*1): preparation required before PWR ON works on
  # TW200/TW200H. TW500 instead requires "Network Monitoring" set to ON.
- id: null_command
  label: Null Command (confirm projector in operation)
  kind: query
  command: "0D"  # return key code, hex; projector returns ":"
  params: []
- id: get_command
  label: Get Command (generic)
  kind: query
  command: "{command}?"  # source: "A get command consists of a command and ?"
  params:
    - name: command
      type: string
      description: Command code to query (e.g. PWR, MUTE, SOURCE)
```

## Feedbacks
```yaml
- id: set_ack
  type: enum
  values: [":"]
  description: Projector returns a colon after executing a set command (and after the null command).
- id: get_response
  type: string
  description: Projector returns a response parameter after executing a get command.
- id: error
  type: enum
  values: ["ERR"]
  description: Projector returns "ERR" plus return key code (hex 0D) and a colon when it receives invalid commands.
```

## Variables
```yaml
# Set commands accept fixed parameters (ON, OFF, 21) or step parameters
# (INC increments by one, DEC decrements by one, INIT initializes).
# UNRESOLVED: no specific variable objects with ranges documented in source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented beyond the TW200/TW200H
# PWR ON preparation procedure (see power_on_level action and Notes).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
```

## Notes
- ESC/VP21 commands are ASCII; usable from a PC terminal emulator. Protocol is transport-independent: serial, USB, or TCP/IP network.
- Serial: select RS-232C at Advanced Setting of the menu. Connector D-Sub 9pin, projector input "Control(RS-232C)". Baud 9600bps, 8 data bits, no parity, 1 stop bit, no flow control.
- Per-model availability: SOURCE command support varies heavily across the applicable-models matrix (each row above marked OK/- per model family). (*2) TW10/TW10H does not support User Logo. (*3) On TW10, source is not cycled within a terminal's selectable signals. (*7) SOURCE 14 on TW420/HC700 and TW450/HC705HD is get-only.
- TW200/TW200H PWR ON procedure: turn projector on, send "SPWRLVL 01" once it can receive ESC/VP21, turn projector off; PWR ON then works from standby. TW500: set "Network Monitoring" (Operation in Setting menu) to ON, power-cycle once, then PWR ON works from standby.
- Network control requires ESC/VP.net protocol manual (not included in this source).

<!-- UNRESOLVED: EB-W16 not listed in source's applicable models; per-command availability for EB-W16 unconfirmed. -->
<!-- UNRESOLVED: TCP port and ESC/VP.net framing not stated in source. -->
<!-- UNRESOLVED: USB control parameters not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: specific get-command response values (e.g. PWR? return strings) not enumerated in source. -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T15:33:03.077Z
last_checked_at: 2026-09-09T22:18:57.112Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-09T22:18:57.112Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec wire tokens (PWR/MUTE/MSEL/SOURCE variants/SPWRLVL/null/get) match source verbatim; serial params and transport protocols grounded. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EB-W16 does not appear in the source's applicable-models list (source covers ELP-TW100 through TW9000W families); command availability per model varies and is not confirmed for EB-W16. TCP port, USB details, and ESC/VP.net specifics not in source."
- "TCP port not stated in source"
- "no specific variable objects with ranges documented in source."
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented beyond the TW200/TW200H"
- "source contains no safety warnings or interlock procedures."
- "EB-W16 not listed in source's applicable models; per-command availability for EB-W16 unconfirmed."
- "TCP port and ESC/VP.net framing not stated in source."
- "USB control parameters not stated in source."
- "firmware version compatibility not stated in source."
- "specific get-command response values (e.g. PWR? return strings) not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
