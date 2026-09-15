---
spec_id: admin/epson-cbz-ebz-powerliteproz-series1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson CBZ EBZ PowerLiteProZ Series1 Control Spec"
manufacturer: Epson
model_family: "Epson CBZ EBZ PowerLiteProZ Series1"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "Epson CBZ EBZ PowerLiteProZ Series1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T15:50:21.917Z
last_checked_at: 2026-09-08T22:16:42.433Z
generated_at: 2026-09-08T22:16:42.433Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the ESC/VP21 guide for home projector models (TW/PowerLite Home Cinema/Pro Cinema series); \"PowerLiteProZ Series1\" is not in the source's applicable-models list — command availability per model varies and is not confirmed for this entity"
  - "TCP port number not stated (source defers to ESC/VP.net protocol manual, not included)"
  - "USB transport is mentioned but no USB enum exists in the transport schema; not represented in protocols[]"
  - "TCP port not stated in source; see ESC/VP.net manual"
  - "response value set not enumerated in source - get format documented generically (command + \"?\" returns response parameter)"
  - "no concrete settable variables enumerated in source"
  - "no unsolicited notifications documented in source"
  - "source (as extracted) contains no safety warnings or interlock procedures;"
  - "firmware version compatibility not stated in source"
  - "TCP port and ESC/VP.net session details not stated in source"
  - "\"note4\" (PWR OFF footnote) content missing from extraction"
  - "whether \"PowerLiteProZ Series1\" supports any of these commands is unconfirmed — model not in source's applicable-models list"
verification:
  verdict: verified
  checked_at: 2026-09-08T22:16:42.433Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions match source verbatim; serial transport (9600/8/N/1/none) confirmed; source catalogue fully covered. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson CBZ EBZ PowerLiteProZ Series1 Control Spec

## Summary
Epson home/installed projector controlled via the ESC/VP21 ASCII command protocol over RS-232C serial, USB, or TCP/IP network (ESC/VP.net). This spec covers power, mute, source selection (SOURCE/MSEL commands), null command, and serial communication parameters as documented in the ESC/VP21 Command User's Guide for Home Projectors.

<!-- UNRESOLVED: source document is the ESC/VP21 guide for home projector models (TW/PowerLite Home Cinema/Pro Cinema series); "PowerLiteProZ Series1" is not in the source's applicable-models list — command availability per model varies and is not confirmed for this entity -->
<!-- UNRESOLVED: TCP port number not stated (source defers to ESC/VP.net protocol manual, not included) -->
<!-- UNRESOLVED: USB transport is mentioned but no USB enum exists in the transport schema; not represented in protocols[] -->

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
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source; see ESC/VP.net manual
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable  - inferred from PWRON/PWROFF command examples
# routable   - inferred from SOURCE command examples
# queryable  - inferred from documented get-command format (command + "?"); no concrete query commands enumerated in source
traits:
  - powerable
  - routable
  - queryable
```

## Actions
```yaml
# ESC/VP21 set commands: projector returns ":" after execution; "ERR" + CR + ":" on invalid command.
# Get format (command + "?") is documented generically; no specific get commands are enumerated in this source.
- id: power_on
  label: Power On
  kind: action
  command: "PWRON"
  params: []
  notes: "Requires preparation on TW200/TW200H (see Macros); TW500 requires Network Monitoring ON. Availability flag (*1) in source."

- id: power_off
  label: Power Off
  kind: action
  command: "PWROFF"
  params: []
  notes: "Source marks this row 'PWR OFF (note4)'; note4 content not present in extracted text."

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

- id: source_black
  label: Select Black Source
  kind: action
  command: "MSEL00"
  params: []

- id: source_blue
  label: Select Blue Source
  kind: action
  command: "MSEL01"
  params: []

- id: source_user_logo
  label: Select User Logo Source
  kind: action
  command: "MSEL02"
  params: []
  notes: "Not supported on TW10/TW10H per source (*2)."

- id: spwrlvl_set
  label: Set Power Level (SPWRLVL)
  kind: action
  command: "SPWRLVL 01"
  params: []
  notes: "Only value 01 documented; used in TW200/TW200H PWR ON preparation (see Macros)."

- id: null_command
  label: Null Command (keepalive check)
  kind: action
  command: "0x0D"
  params: []
  notes: "Return key code (Hex 0D); projector returns ':'. Confirms projector is in operation."

# SOURCE commands - each distinct source row in the source command tables.
# Availability varies by model; see per-model tables in source.
- id: source_input1_cyclic
  label: INPUT 1/A Cyclic Select
  kind: action
  command: "SOURCE 10"
  params: []
  notes: "Cycles within SOURCE 1x group."

- id: source_input1_analog_rgb
  label: INPUT 1/A Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_input1_digital_rgb
  label: INPUT 1/A Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_input1_rgb_video
  label: INPUT 1/A RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_input1_ycbcr
  label: INPUT 1/A YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_input1_ypbpr
  label: INPUT 1/A YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_input1_auto
  label: INPUT 1/A Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_input2_cyclic
  label: INPUT 2/B Cyclic Select
  kind: action
  command: "SOURCE 20"
  params: []
  notes: "Cycles within SOURCE 2x group."

- id: source_input2_analog_rgb
  label: INPUT 2/B Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_input2_rgb_video
  label: INPUT 2/B RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_input2_ycbcr
  label: INPUT 2/B YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_input2_ypbpr
  label: INPUT 2/B YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_input2_ypbpr_alt
  label: INPUT 2/B YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_input2_auto
  label: INPUT 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_input3_cyclic
  label: INPUT 3 Cyclic Select
  kind: action
  command: "SOURCE 30"
  params: []
  notes: "Cycles within SOURCE 3x group."

- id: source_input3_digital_rgb
  label: INPUT 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_input3_rgb_video
  label: INPUT 3 RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: source_input3_ycbcr
  label: INPUT 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_input3_ypbpr
  label: INPUT 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

- id: source_input5_cyclic
  label: INPUT 5 Cyclic Select
  kind: action
  command: "SOURCE C0"
  params: []
  notes: "Cycles within SOURCE Cx group."

- id: source_input5_scart
  label: INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_input5_ycbcr
  label: INPUT 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_input5_ypbpr
  label: INPUT 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_input5_auto
  label: INPUT 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_video_cyclic
  label: VIDEO Cyclic Select
  kind: action
  command: "SOURCE 40"
  params: []
  notes: "Cycles within SOURCE 4x group."

- id: source_video_rca
  label: VIDEO (RCA)
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_video_s
  label: VIDEO (S)
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_video_ycbcr
  label: VIDEO (YCbCr)
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_video_ypbpr
  label: VIDEO (YPbPr)
  kind: action
  command: "SOURCE 44"
  params: []

- id: source_usb_easypy
  label: USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

- id: source_hdmi2
  label: HDMI2
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_hdmi2_digital_rgb
  label: HDMI Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_hdmi2_rgb_video
  label: HDMI RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_hdmi2_ycbcr
  label: HDMI YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_hdmi2_ypbpr
  label: HDMI YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_wirelesshd
  label: WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_wirelesshd_digital_rgb
  label: WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_wirelesshd_rgb_video
  label: WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_wirelesshd_ycbcr
  label: WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_wirelesshd_ypbpr
  label: WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []
```

## Feedbacks
```yaml
- id: set_command_ack
  type: enum
  values: [":"]
  notes: "Projector returns a colon after executing a set command."

- id: get_command_response
  type: string
  # UNRESOLVED: response value set not enumerated in source - get format documented generically (command + "?" returns response parameter)
  notes: "Get command (command + '?') returns a response parameter."

- id: illegal_command_error
  type: enum
  values: ["ERR"]
  notes: "Returned with a return key code (Hex 0D) and a colon when an invalid command is received."

- id: null_command_ack
  type: enum
  values: [":"]
  notes: "Null command (Hex 0D) returns a colon; confirms projector is in operation."
```

## Variables
```yaml
# Source documents step parameters INC (increment), DEC (decrement), INIT (initialize)
# as parameter types applicable to set commands, but enumerates no concrete
# settable parameter commands with value ranges.
# UNRESOLVED: no concrete settable variables enumerated in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
- id: enable_pwr_on_tw200_tw200h
  label: Enable PWR ON on TW200/TW200H
  steps:
    - "Turn on the projector"
    - "Send 'SPWRLVL 01' after the projector reaches the state where it can receive ESC/VP21 commands"
    - "Turn off the projector once"
    - "'PWR ON' (PWRON) becomes usable once the projector returns to standby state"

- id: enable_pwr_on_tw500
  label: Enable PWR ON on TW500
  steps:
    - "Set 'Network Monitoring' of 'Operation' in the 'Setting' menu to ON"
    - "Turn off the projector once"
    - "'PWR ON' (PWRON) becomes usable once the projector reaches standby state"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source (as extracted) contains no safety warnings or interlock procedures;
# "note4" on PWR OFF is referenced but its content is not present in the extracted text.
```

## Notes
- ESC/VP21 command codes are ASCII; commands can be sent from a PC terminal emulator.
- ESC/VP21 is transport-independent: serial (RS-232C), USB, and TCP/IP network are supported. Network use requires establishing a TCP session first (see ESC/VP.net protocol manual, not included in this source). USB transport has no schema enum and is omitted from `protocols[]`.
- Serial: select "RS-232C" at Advanced Setting of the projector menu. Connector: D-Sub 9 pin, projector input: Control (RS-232C).
- Set commands take fixed parameters (e.g. ON, OFF, 21) or step parameters: INC (increment by one), DEC (decrement by one), INIT (initialize).
- Null command is a lone return key code (Hex 0D); usable as an operational check.
- Source command tables mark per-model availability (OK/-); several SOURCE codes are only valid on specific models. (*7) SOURCE 14 is get-only on TW420/TW450. (*3) TW10 source cycling does not stay within a terminal's selectable signals.
- Extracted source table for PWR/MUTE/MSEL rows was malformed; commands transcribed verbatim as printed (PWRON, PWROFF, "MUTE ON", "MUTE OFF", MSEL00–MSEL02).
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP port and ESC/VP.net session details not stated in source -->
<!-- UNRESOLVED: "note4" (PWR OFF footnote) content missing from extraction -->
<!-- UNRESOLVED: whether "PowerLiteProZ Series1" supports any of these commands is unconfirmed — model not in source's applicable-models list -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T15:50:21.917Z
last_checked_at: 2026-09-08T22:16:42.433Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-08T22:16:42.433Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions match source verbatim; serial transport (9600/8/N/1/none) confirmed; source catalogue fully covered. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the ESC/VP21 guide for home projector models (TW/PowerLite Home Cinema/Pro Cinema series); \"PowerLiteProZ Series1\" is not in the source's applicable-models list — command availability per model varies and is not confirmed for this entity"
- "TCP port number not stated (source defers to ESC/VP.net protocol manual, not included)"
- "USB transport is mentioned but no USB enum exists in the transport schema; not represented in protocols[]"
- "TCP port not stated in source; see ESC/VP.net manual"
- "response value set not enumerated in source - get format documented generically (command + \"?\" returns response parameter)"
- "no concrete settable variables enumerated in source"
- "no unsolicited notifications documented in source"
- "source (as extracted) contains no safety warnings or interlock procedures;"
- "firmware version compatibility not stated in source"
- "TCP port and ESC/VP.net session details not stated in source"
- "\"note4\" (PWR OFF footnote) content missing from extraction"
- "whether \"PowerLiteProZ Series1\" supports any of these commands is unconfirmed — model not in source's applicable-models list"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
